# Engineering the First Open Source GSC Injector for Black Ops 2 (MS Store)

Writing a custom GSC (Game Script Code) injector for *Call of Duty: Black Ops II* (T6) on PC is a notoriously difficult challenge. For years, the community has relied on closed-source tools like *GSC Studio*, which makes learning and porting mods to new environments—like the modern UWP / Microsoft Store release of the game—virtually impossible.

Determined to break this barrier, I set out to build a **100% open-source GSC Injector** specifically tailored for the Black Ops 2 Microsoft Store version (as no BO2 GSC PC Injectors are open source lol). Here's the deep-dive story of how it evolved from a simple database hook to a full-blown inline execution detour and x86-to-x64 bytecode transpiler.

---

## Iteration 1: The Experimental Hook

My journey started by looking for the foundational function responsible for loading game assets: `DB_FindXAssetHeaderInternal`.

Through reverse engineering with IDA Pro, I successfully located this function at `base + 0x213650`. 
I wrote my first experimental build (`gsc_injector_EXPERIMENTAL.cpp`) that placed a detour hook directly on this function. 

The logic was straightforward:
1. Intercept calls to `DB_FindXAssetHeaderInternal`.
2. Check if the game is requesting `ASSET_TYPE_SCRIPT_PARSETREE` (Type 48).
3. Wait for the engine to request `_clientids.gsc`.
4. Trigger a standard Windows `OpenFileDialog` to let the user select a custom compiled `.gsc` file.
5. Overwrite the returned asset's bytecode pointer and length with our custom buffer.

### The 64-bit Hashing Problem
The Microsoft Store version of BO2 is compiled as a native **64-bit application**, unlike the original Steam release - This means that the GSC VM is **also x64**. This meant that the classic 32-bit FNV-1a hashes used in the GSC Exports/Imports tables were completely incompatible. 

To fix this, the experimental injector dynamically parsed the bytecode header, resolved the string table, and re-hashed all function names (Exports, Imports, Globals) using a custom 64-bit FNV-1a algorithm (`Hash64`) masked to 63-bits to match the modern engine's specifications:

```cpp
// FNV-1a 64-bit hash masked to 63-bits (matching 64-bit Call of Duty engine)
uint64_t Hash64(const std::string& str) {
    uint64_t hash = 0xcbf29ce484222325;
    for (char c : str) {
        char lower_c = (c >= 'A' && c <= 'Z') ? (c + 32) : c;
        if (lower_c == '\\') lower_c = '/';
        hash = (hash ^ lower_c) * 0x100000001b3;
    }
    return hash & 0x7fffffffffffffff; // 63-bit mask
}
```

This successfully loaded strings, but it proved to be a fragile method. `DB_FindXAssetHeaderInternal` is queried extremely often, and replacing bytecode *after* the asset header is queried can lead to horrific race conditions, memory leaks across map reloads, and broken dependencies.

---

## Iteration 2: The Final Architecture

After studying my findings from Black Ops 1 (T5), I realized that hooking the asset database was too low-level. To achieve perfect execution timing, I needed to go straight to the scripting engine.

I moved on to a second, fully functional iteration (`gsc_injector.cpp`) with a completely revamped architecture. This iteration bypasses `DB_FindXAssetHeaderInternal` entirely and hooks directly into the core script loading and execution thread dispatchers.

### 1. Dynamic Code Caves (`Scr_LoadScript` & `Scr_ExecThread`)

To seamlessly intercept the game's script execution flow, I built dynamic **Code Caves** using `VirtualAlloc` near the engine's execution `.text` section (within the +/- 2GB jump limit). By writing pure x64 assembly trampolines (`ArmLoadCodeCave` and `ArmDispatcherCodeCave`), I hooked into:
- `Scr_LoadScript` (`base + 0x506460`)
- `Scr_ExecThread` (`base + 0x51dd10`)

Here is an excerpt of the custom x64 trampoline injected for `Scr_LoadScript`:

```cpp
// 1. push rax,rcx,rdx,r8,r9,r10,r11,rbx,rsi,rdi; pushfq
code[idx++] = 0x50; // push rax
code[idx++] = 0x51; // push rcx
// ... registers saved ...
code[idx++] = 0x9C; // pushfq

// 3. For each asset: memcpy pristine -> buf, then Scr_LoadScript(0, name_ptr)
for (auto& [name, asset] : g_InjectedAssets) {
    uintptr_t pristine_addr = reinterpret_cast<uintptr_t>(asset.pristine_bytecode.data());
    uintptr_t buf_addr = asset.runtime_address;
    uint32_t sz = static_cast<uint32_t>(asset.size);

    // mov rsi, pristine_addr
    code[idx++] = 0x48; code[idx++] = 0xBE;
    memcpy(&code[idx], &pristine_addr, 8); idx += 8;
    // mov rdi, buf_addr
    code[idx++] = 0x48; code[idx++] = 0xBF;
    memcpy(&code[idx], &buf_addr, 8); idx += 8;
    // mov ecx, sz
    code[idx++] = 0xB9;
    memcpy(&code[idx], &sz, 4); idx += 4;
    // rep movsb (Copy pristine bytecode to engine buffer)
    code[idx++] = 0xF3; code[idx++] = 0xA4;

    // Call engine's Scr_LoadScript(0, name_ptr)
    code[idx++] = 0x31; code[idx++] = 0xC9; // xor ecx, ecx
    // ...
    code[idx++] = 0xFF; code[idx++] = 0xD0; // call rax
}
```

This implementation allows the injector to completely overwrite the compiled GSC buffer with a pristine copy on every map reload, avoiding dirty bytecode states, while utilizing the engine's native `Scr_LoadScript` function to parse it properly.

---

### 2. The Final Boss: On-the-Fly Bytecode Transpiler (x86 -> x64)

The absolute biggest hurdle for the MS Store release: most custom GSC mods available online (such as the massive Zombie mod menus) are compiled specifically for the 32-bit Steam version of BO2 using older compilers. 

In a 64-bit engine, the bytecode execution model changes drastically:
- Instructions that load pointers (like `ScriptFunctionCall` or `GetFunction`) now require an 8-byte pointer slot instead of 4-byte.
- Because instructions grow in size, **all relative jump offsets** (`JumpOnFalse`, `JumpOnTrue`, `Jump`) become completely misaligned!

To solve this without forcing developers to recompile their mods from source, I built a full **x86 to x64 GSC Bytecode Transpiler** (`TranspileToX64`). 

The transpiler maps out the entire execution path using a custom OpCode dictionary (`G_OPS`):

```cpp
static const std::unordered_map<uint8_t, OpInfo> G_OPS = {
    { 0x00, { "End", OPK_TERM, 0, 0 } },
    { 0x04, { "GetByte", OPK_IMM, 1, 1 } },
    { 0x08, { "GetInteger", OPK_IMM, 4, 4 } },
    { 0x15, { "GetFunction", OPK_CALL0, 0, 0 } },
    { 0x2e, { "ScriptFunctionCall", OPK_CALL, 0, 0 } },
    { 0x3b, { "JumpOnFalse", OPK_JUMP, 0, 0 } },
    // ... over 50 opcodes defined
};
```

The transpilation process happens in 4 phases during injection:
1. **Execution Walk:** The injector linearly walks through the 32-bit bytecode, decoding instructions to map out every single jump origin, jump destination, and pointer slot.
2. **Padding Injection:** For every `OPK_CALL` (e.g. `ScriptFunctionCall` `0x2E`), the engine requires an 8-byte buffer for x64. The transpiler detects this, aligns the memory, and injects 4 bytes of padding (`0x01, 0x00, 0x00, 0x00`).
3. **Jump Recalculation:** Because padding was injected, the total size of the `.cseg` (code segment) grows. The transpiler goes back through the mapped `JumpOnFalse` and `JumpOnTrue` instructions and recalculates their relative int16 offsets to account for the new padding bytes.
4. **Header Fixups:** Finally, the Exports, Imports, and String tables are rebuilt with the shifted relative offsets.

---

### 3. Mod Packages & Dependency Resolution

A major limitation of traditional GSC injectors is the inability to cleanly load multi-file projects. To modernize the workflow, I added a JSON parser that reads a `package.json` manifest.

Developers can now organize their scripts in standard directory structures and define entry points:

```json
{
  "name": "ZeroProxy Debug Menu",
  "entry_asset": "maps/mp/_development_dvars",
  "entry_export": "init",
  "assets": [
    "maps/mp/_development_dvars.gsc",
    "maps/mp/gametypes/_clientids.gsc"
  ]
}
```

The injector recursively reads the folder, transpiles all `.gsc` files to x64, allocates them in memory, and wires the dependencies together via the `ArmDispatcherCodeCave` thread spawner.

### Conclusion

By combining low-level assembly code caves with dynamic, on-the-fly bytecode transpilation, this project stands as the first open-source, fully functional GSC injector for the 64-bit era of Black Ops 2. It opens the door for developers to easily port their legacy 32-bit mod menus into the modern UWP ecosystem without losing their minds over undocumented opcodes. No more relying on closed-source black boxes!
