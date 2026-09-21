# Bypassing MS Store / UWP License Checks for Call of Duty DLCs

When the *Call of Duty* titles started appearing on the Microsoft Store (such as *Advanced Warfare* and *WWII*), the community quickly noticed a major shift in how DLCs were handled. In the Steam era, buying a DLC meant downloading gigabytes of new maps and assets. On the UWP / Microsoft Store ecosystem, the reality is entirely different.

The "DLC" you purchase on the MS Store is nothing more than a 10MB dummy package. All the actual DLC assets—maps, zombie modes, weapons—are **already pre-installed natively** inside the massive 100GB+ base game download. The 10MB package simply acts as a cryptographic "Activator" or license token for the Windows to validate.

I developed a module that dynamically emulates the Microsoft GDK (Game Development Kit) API. This allows custom clients, offline users, or anyone with the base game files to unlock all DLCs without tampering with the game's executable.

Here is a deep dive into how I completely spoofed the UWP `XPackage` and `XStore` APIs natively.

---

## 1. Evading Arxan and Game Tamper Checks

Most traditional game cracks modify the `.text` section of the game executable to bypass license checks. However, modern Call of Duty titles employ Arxan anti-tamper, which aggressively scans memory for modifications.

To bypass this, my unlocker does **zero modifications** to the game executable itself. Instead, it hooks the Microsoft GDK runtime (`xgameruntime.dll`). 
Upon injection (which must happen precisely during the intro logos to avoid COM initialization race conditions), the module locates the exported `QueryApiImpl` function. 

Whenever the game requests a COM interface from the OS, I intercept the request. If the game asks for the `XPackage` or `XStore` GUIDs, I dynamically hook their VTables:

```cpp
if (is_target_api(*first, *second, "af406016-e850-4aa8-a88d-2f3dcb9dac7e", ...)) {
    LOG("UWP", INFO, "Hooking XPackage interfaces...");
    x_package_mount_with_ui_async_hook.create(get_vt_function(*api_out, 37), x_package_mount_with_ui_async_stub);
    x_package_get_mount_path_hook.create(get_vt_function(*api_out, 25), x_package_get_mount_path_stub);
    // ...
}
```

For S2 (COD WW2), Arxan checks for DLLs loaded in the game startup... The workaround: Injecting the DLLs after startup (during the intro video, before it calls the COm interfaces from Windows). Arxan only checks on startup for S2.

---

## 2. Spoofing XPackage Mounts

In a normal UWP environment, the DLC loading flow looks like this:
1. Game enumerates installed packages (`XPackageEnumeratePackages`).
2. Game asks the OS to mount the DLC package (`XPackageMountWithUiAsync`).
3. **The OS checks the Microsoft Account License.** If the user doesn't own it, it returns `803F8001` (Access Denied).
4. The game aborts loading the DLC.

To break this chain, we intercept `XPackageMountWithUiAsync`. We stop the call from ever reaching the Windows Kernel. Instead, we spin up a fake asynchronous thread that instantly triggers the game's callback, simulating a successful mount operation:

```cpp
inline DWORD WINAPI fake_async_thread(LPVOID param) {
    uwp::XAsyncBlock* async = (uwp::XAsyncBlock*)param;
    Sleep(1); // Simulate I/O delay
    void(*cb)(uwp::XAsyncBlock*) = *(void(**)(uwp::XAsyncBlock*))((uint8_t*)async + 16);
    if (cb) cb(async);
    return 0;
}
```

When the game requests the resulting Mount Handle (`XPackageMountWithUiResult`), we simply `malloc(0x10)` and hand the game a fake pointer.

---

## 3. Path Spoofing

Once the game thinks the DLC is successfully mounted, it asks the OS: *"Where are the physical files located?"* via `XPackageGetMountPath`.

Since the MS Store pre-installs all DLC `.pak` and `.ff` ect files directly into the base game's `zone` (or base) folder, we just need to redirect the game to its own directory:

```cpp
inline HRESULT x_package_get_mount_path_stub(void* _this, void* handle, uint64_t out_size, char* out_buf) {
    if (fake_mount_handles.contains(handle)) {
        char path[MAX_PATH];
        GetModuleFileNameA(nullptr, path, MAX_PATH); // Get base game path
        // ... string manipulation to get the directory ...
        strncpy_s(out_buf, out_size, dir.c_str(), _TRUNCATE);
        return S_OK;
    }
    return original_func(_this, handle, out_size, out_buf);
}
```

Because of this redirection, the engine organically loads the maps and zombies modes that were already sitting on the hard drive.

---

## 4. Bypassing XStore Entitlements

Some games (like *Advanced Warfare*) are more aggressive and actively query the MS Store for explicit product licenses using `XStoreQueryEntitledProductsAsync`. 

If we outright block this, the game fails to verify its own Base Game license and locks you out. The trick is to filter the requests. If the game queries `XStoreProductKind::Game` (0x04), we let it pass to the real API. Otherwise, we intercept it, redirect it to an associated products query, and patch the resulting `XStoreProduct` structs in memory to fake ownership:

```cpp
inline bool hook_get_products_callback(const uwp::XStoreProduct* product, void* ctx) {
    auto* p = const_cast<uwp::XStoreProduct*>(product);
    p->has_digital_download_ = true;
    p->is_in_user_collection_ = true;
    
    // Deep patching of the underlying SKU data to forge the license signature
    PatchProductSkuData(reinterpret_cast<uint8_t*>(p));
    
    return original_callback(product, ctx);
}
```

By emulating the GDK environment at the COM interface level, we achieve a 100% clean,  DLC unlocker that is invisible to game-level anti-tamper mechanisms and restores offline preservation capabilities for modern UWP titles!
