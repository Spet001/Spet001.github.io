# Leakers....Shame for you all

> **Public Integrity Notice & Declaration of Authorship:**
> The **BO2 Crossplay Relay** project was strictly a confidential, proprietary research project and **100% CLOSED SOURCE**. Recently, my private GitLab account was unlawfully compromised (hacked), and the private repository was leaked and dumped to the public without authorization.
>
> Immediately following the breach, opportunistic leakers and bad actors began redistributing the codebase, stripping repository history, and compiling builds while **BLATANTLY STEALING THE CREDITS** from those who actually researched, reverse-engineered, and engineered this breakthrough.
>
> Let this article stand as the **permanent, immutable historical record**:
>
> ### **THE TRUE AUTHORS & OFFICIAL CREDITS:**
> - **Xirus**
> - **rolltide11**
> - **AAA (Qurance)**
> - **Waffle**
> - **Heretics Software**
> - **Spet**
>
> **A Direct Warning to the Scene:**
> If you encounter any repository, binary, tool, GUI, or fork of this Crossplay Relay anywhere on the internet and these exact names (**Xirus, rolltide11, AAA (Qurance), Waffle, Heretics Software, Spet**) are not prominently and explicitly credited, **IT IS STOLEN SOURCE CODE**. Period.
>
> ### **The Theft of the ZPGDK GSC Injector:**
> And the shameless behavior doesn't stop with the Relay: people have also been actively stealing and rebranding my **ZPGDK GSC Injector**.
> Let this be etched into the record for the entire Call of Duty modding and reverse engineering ecosystem: **The first and only functional GSC injector for the Microsoft Store / Xbox PC (GDK) edition of Call of Duty was created by Spet. Anyone else claiming authorship of a Microsoft Store GSC injector is a fraud distributing stolen code.**

---

## What is the BO2 Crossplay Relay?

The **BO2 Crossplay Relay** is a real-time protocol translation engine and Layer-2 network emulator designed to bridge the modern PC platform (**Microsoft Store / Xbox PC GDK x64 / Win32**) with console generations (**PlayStation 5, PlayStation 4, and Xbox 360**) over the LAN System Link protocol of *Call of Duty: Black Ops II* (Treyarch T6 engine), with architectural modularity expandable to *Black Ops III* (T7).

Historically, enabling PC players to play with console players on pre-modern Call of Duty titles was considered **virtually impossible** by the development community. The architectural divide included:

1. **Network Protocol Version Mismatch:** The PS4/PS5 binary runs under wire protocol version `2095` (playlist `1735`), whereas the Microsoft Store PC client strictly operates on protocol `2092` (playlist `1734`).
2. **Interface & Gamestate Checksum Divergence:** In Custom Games, the console disconnects and rejects sessions whose LUI checksum differs from `0x0030A5F3`, while the Microsoft Store client broadcasts `0x297163A2`.
3. **Binary Incompatibility in `usercmd_t`:** The modern 64-bit Microsoft Store executable (`t6mp.exe`) introduced an exclusive wire field at offset `+0x3A` between `+0x28` and `+0x30` that does not exist in console binaries, corrupting player movement and viewangle serialization over the wire.
4. **Proprietary Cryptographic Framing:** The Windows Store build rejects unauthenticated packets and does not use legacy Steam XOR masks, demanding an authentic **HMAC-SHA1 + 3DES-CBC** cryptographic envelope.

Below is the exhaustive technical breakdown of how our team conquered every single one of these barriers.

---

## 1. Transport Security: Conquering HMAC-SHA1 + 3DES-CBC

During early experimental iterations, community speculation claimed that the Microsoft Store build (`1.1.12.0`) on System Link still used the 2012 Steam XOR packet obfuscation.

Our disassembly and live network captures proved conclusively that Store replies are **NOT Steam XOR packets**. Attempting to parse them with Steam routines yielded the fatal error:
```text
[ERROR] Invalid PC session marker
```

By disassembling the native party dispatcher (`joinParty`) in IDA Pro, we proved that the Microsoft Store edition implements console-style cryptography combined with a 2-byte PC game checksum:

```text
[ Console PS5 Packet ] ───> [ 0x01-0x04 Association Handshake ] ───> [ 3DES-CBC Decryption ]
                                                                             │
                                                                             ▼
[ Real-Time Protocol Translation (2095 <-> 2092) ] <────────────────────────┘
                       │
                       ▼
[ RFC 768 UDP Checksum + 2-Byte Game Hash ] ───> [ HMAC-SHA1/3DES Framing ] ───> [ t6mp.exe UDP 3074 ]
```

### The Bidirectional Translation Pipeline:

#### A. PlayStation 5 ──> Microsoft Store (PC):
1. Intercepts and drives the 4-way association handshake (`0x01 -> 0x02 -> 0x03 -> 0x04`).
2. Captures the active Store session association key and validates the cryptographic signature against the PS5 HMAC.
3. Decrypts the console's type-06 packet.
4. Translates the protocol version header: `console_protocol = 2095` ──> `pc_protocol = 2092`.
5. Preserves playlist state if no local Store playlist is mapped.
6. Computes and appends the 2-byte engine checksum (`checksum(data)` little-endian).
7. Re-encrypts using Store-verified `HMAC-SHA1 + 3DES-CBC` framing and transmits directly to `t6mp.exe` on UDP port `3074`.

#### B. Microsoft Store (PC) ──> PlayStation 5:
1. Decodes Store responses using the associated `3DES-CBC` context.
2. Validates and removes the Store-specific 2-byte checksum.
3. Translates protocol integers back: `2092` ──> `2095`.
4. Translates party endpoints and gametype settings.
5. Re-encrypts into standard PlayStation framing and routes the reply to the console.

---

## 2. Resolving the "Incompatible UI Version" Crash: Dynamic LUI Checksum Translation

Even with transport handshakes succeeding, attempting to enter a Custom Game immediately crashed the console with:
```text
Incompatible UI Version
```

Dissecting segmented in-band transmissions in Wireshark and tracking gamestate buffer reconstruction in memory revealed the exact root cause:

In the final segmented gamestate fragment, the engine transmits a **raw-DEFLATE** (`zlib -13`) compressed stream preceded by `PC_DDL_HEADER`:
```hex
00 00 00 00 00 00 00 1e 00 00 00 02 be ef 00 00 ...
```

Immediately following the 523-byte decompressed DDL stream (at payload offset `497`), were exactly 5 trailing bytes:
```text
Payload Trailing Bytes: A2 63 71 29 0E
```
Where:
- `A2 63 71 29` is the **Microsoft Store LUI Checksum** in Little-Endian (`0x297163A2`).
- `0x0E` is the Treyarch fragment termination marker.
- The PS4/PS5, however, strictly demands the checksum `0x0030A5F3` (`F3 A5 30 00` in Little-Endian).

### The Surgical In-Flight Patch:
Rather than attempting reckless global memory replacements (which corrupted engine pointers), we developed a targeted stream parser in Python (`gametype_settings_translation.py`):

```python
def find_valid_ddl_stream(payload: bytes):
    for off in range(len(payload)):
        try:
            d = zlib.decompressobj(-13)
            out = d.decompress(payload[off:])
            consumed = len(payload[off:]) - len(d.unused_data)
        except zlib.error:
            continue
        if consumed > 0 and len(out) >= 48 and out[:48] == PC_DDL_HEADER:
            return off, consumed, len(out)
    return None
```

When the relay identifies the final segmented fragment with trailing byte `0x0E`, it dynamically patches the 4-byte checksum:
```text
Store: 0x297163A2 ───> Patched: 0x0030A5F3
```

Furthermore, because Black Ops II reuses segmented sequence IDs upon map reload, we built a session reset gate that clears cached fragment state on every new `0x01` (`session-init`) packet, permanently banishing UI version desyncs across consecutive matches.

---

## 3. Kernel Memory Patching: The Dynamic `usercmd +0x3A` Delta Bypass

Once in-game, consoles experienced severe movement desynchronization. 

Reverse-engineering the internal structs between console binaries and the 64-bit Windows Store binary revealed an internal change in `usercmd_t`:
The team that ported the game to modern Windows added a proprietary wire field at offset **`+0x3A`** (between `+0x28` and `+0x30`). This field does not exist on PlayStation or Xbox 360!

To solve this, we built a live memory patcher (`store_usercmd_patch.py`). The relay attaches to the running `t6mp.exe` process via Win32 APIs (`PROCESS_VM_READ | PROCESS_VM_WRITE | PROCESS_VM_OPERATION`) and executes a wildcard pattern scan across the code neighborhood `0x003A0000` to `0x003BFFFF`:

```python
# Wildcard signature for the live usercmd writer path
WRITER_PATTERN = [
    0x44, 0x0F, 0xB7, 0x4E, 0x3A,       # movzx r9d, word [rsi+3A]
    0x41, 0x8B, 0xD7,                   # mov edx, r15d
    0x44, 0x0F, 0xB7, 0x45, 0x3A,       # movzx r8d, word [rbp+3A]
    0x48, 0x8B, 0xCB,                   # mov rcx, rbx
    0xE8, None, None, None, None,       # call <delta writer>
    0x44, 0x0F, 0xBF, 0x4E, 0x30,       # next field +0x30
]
```

The algorithm discovers:
- **2 writer paths**
- **2 reader paths**

It dynamically patches the opcodes to skip the `+0x3A` block entirely, establishing perfect binary wire alignment with console structures (`ps4_ps5_layout`).

### Restart-Safe State Machine:
If the relay is restarted while `t6mp.exe` remains active, the scanner detects whether patches are already present (`already_patched_writer_hits = 2`, `already_patched_reader_hits = 2`) and safely skips re-patching, guaranteeing 100% crash immunity.

---

## 4. Layer-2 Npcap Ethernet Sniffing & Xbox 360 System Link

Why does the relay utilize **Npcap** in WinPcap-compatible mode?

When `t6mp.exe` launches on PC, it claims exclusive ownership of UDP port `3074`. A standard Windows UDP socket would fail with `WSAEADDRINUSE (10048)`.

Npcap operates at **Layer-2 (Ethernet 802.3)**:
- Intercepts raw network frames directly from the network adapter before the Windows socket layer processes them.
- Injects raw UDP frames into local network traffic.
- Re-computes **RFC 768** UDP checksums over IPv4 pseudo-headers in real time to prevent console network stacks from dropping packets.
- For **Xbox 360**, processes XNet VHost Beacons (`0x68 / 0x69`), parses `XSESSION_SEARCHRESULT` structs, converts Big-Endian `XNADDR` structures, and extracts live `XNKID` / `XNKEY` session tokens.

---

## Conclusion: Setting the Record Straight

The BO2 Crossplay Relay is not a trivial wrapper or a generic proxy. It is an **unprecedented feat of reverse engineering**, uniting x64 assembly hooking, real-time symmetric transport cryptography, zlib/DDL stream manipulation, and Layer-2 packet injection into a cohesive system link bridge.

Whoever breached my GitLab account or is currently redistributing this code without our names **did not write a single line of this architecture and could never recreate it from scratch**.

The code, the commits, and the signatures stand immutable. The true credits belong to:

### **Official Credits:**
* **Xirus**
* **rolltide11**
* **AAA (Qurance)**
* **Waffle**
* **Heretics Software**
* **Spet**

*Published on the Technical Journal of Eduardo Gelain (SpetDev) — September 19, 2026.*
