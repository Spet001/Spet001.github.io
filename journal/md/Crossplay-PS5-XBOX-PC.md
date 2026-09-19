# POC: BO2 Crossplay Relay (PS5 x MS Store PC)

Today I decided to share some findings about one of our most ambitious projects: the **Call of Duty: Black Ops II (T6) Crossplay Relay**. 
The goal of this project (codenamed ZPGDK BO2CrossplayRelay) is to create a protocol translation bridge between the PC version (specifically Win32 / GDK x64 MS Store) and consoles (PS3 / PS5 and Xbox 360) via *LAN System Link*.

You can check out the repository here: [t6-zpgdk-crossplay-relay](https://gitlab.com/Spet001/t6-zpgdk-crossplay-relay)

Current status:
- **PS5 x GDK PC:** Working almost flawlessly on the first try! The PlayStation network stack doesn't have the same aggressive packet filtering/security checks that block spoofed packets, making our life a lot easier.
- **Xbox 360 x GDK PC:** Still a Work In Progress (WIP). The Xbox 360 uses Native System Link with XNet VHost beacons (0x68 / 0x69) and Big-Endian XNADDR structures that are a nightmare to translate in real-time. 

### The Xbox 360 Challenge
For the 360, it still doesn't work 100% like it does on PS. It requires a modified console (RGH/BadAvatar/etc) where you must go into Dashlaunch settings -> Network, **enable pingpatch**, and **disable devlink**. This disables the native network card security checks on the 360. Even with these settings, it only connects successfully 1 out of 100 attempts right now.

## How does the Magic happen?

The biggest challenge with crossplay on legacy titles is the strict incompatibility at the network layer (Netchan) and discovery beacons. Our architecture involves:

1. **Layer-2 Npcap Sniffing & Injection:** 
   Since the native game binds to UDP port `3074`, we can't simply open a socket in the middle. The solution was to use Npcap to intercept and inject raw Ethernet packets. We even recalculate the RFC 768 *checksum* over the IPv4 pseudo-header to bypass the console's extremely strict TCP/IP stack.

2. **Envelope Decapsulation and PS5 Translation:** 
   PS4/PS5 uses Netfield challenge matching mechanisms. We decapsulate and translate everything in real-time so that the PC engine thinks it's talking to another PC, while the PS5 swears that the PC is just another console on the same LAN.

3. **Dynamic Memory Synchronization:**
   On PC, we use Python scripts (`online_relay.py`, `xbox360_discovery.py`, etc.) to dynamically synchronize Dvars (`mapname`, `gametype`, `hostname`) directly in memory, detecting the `XNKID` / `XNKEY` session keys on the fly.

This project is highly experimental but proves that, with enough packet reverse engineering, platform barriers created over 10 years ago can still be broken. A huge shoutout to the modding community (Xirus, rolltide11, AAA, Waffle, and Heretics) who make this possible.

If you have experience analyzing packets and reverse engineering T7 Durango/XONE or PS4, feel free to contribute!
