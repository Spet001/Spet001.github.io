# Providing Open Source T6 Custom Game Modes GSC

For a long time, the *Call of Duty: Black Ops 2* (T6) modding community has seen incredible custom game modes created using GSC (Game Script Code). However, many of these amazing mods were kept closed-source, heavily obfuscated, or simply lost to time when their creators moved on.

In the spirit of preserving modding history and empowering the community to learn and build upon existing work, I am open-sourcing the raw GSC scripts for some of the most popular and complex custom game modes for Black Ops 2.

## The Repositories

This collection includes fully decompiled and documented source scripts for the following game modes:

### 1. Zombieland
Zombieland transforms the traditional multiplayer maps into a survival sandbox. The GSC scripts handle dynamic zombie spawning algorithms, custom economy systems (points for kills), wall-buys, and a mystery box implementation ported directly into the multiplayer engine.

### 2. Deathrun
A classic Garry's Mod and CS 1.6 staple brought to Black Ops 2. The code features intricate trigger management, physics manipulation for traps, player state handling for the "Activator" vs "Runners", and custom HUD elements to track rounds and surviving players.

### 3. Counter-Strike
A complete overhaul of the Search and Destroy gamemode to mimic the economy, round structure, and weapon buying mechanics of CS:GO. The GSC scripts demonstrate complex UI manipulation (creating a custom buy menu), persistent economy tracking across rounds, and restricted weapon loadouts based on the player's team and balance.

## Why Open Source?
GSC modding is inherently a community-driven effort. By providing these scripts open source, we ensure that:
- **Preservation:** These classic modes won't be lost to time.
- **Education:** New modders can study the code to understand complex engine mechanics like HUD element manipulation, entity spawning, and custom gametype rule enforcement.
- **Innovation:** The community can fork, improve, and port these modes to other titles (such as T7 or T9) using modern tools.

Feel free to dive into the codebase, submit pull requests, or use these as a foundation for your next big mod!
