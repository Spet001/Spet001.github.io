# DEVLOG: Rebuilding Outcaster from Scratch in Unity 6 — Live 3D HUD Tooling & Zombies Survival

> **Project Update & Gameplay Preview:**  
> I have completely rebuilt **Outcaster** from the ground up! Re-engineered natively in **Unity 6.4 (6000.4.5f1)** on DirectX 11, the new iteration (*Ou2caster*) features a radically modernized modular architecture, custom real-time editor tooling for 2.5D weapon authoring, and a brand-new **Zombies-inspired Survival Mode**.
>
> Check out the gameplay and in-engine tooling preview below:

<div style="margin: 2rem 0; border-radius: 1rem; overflow: hidden; border: 1px solid rgba(0, 170, 255, 0.35); box-shadow: 0 20px 45px rgba(0,0,0,0.7); background: #000;">
    <video controls autoplay loop muted playsinline style="width: 100%; height: auto; display: block;">
        <source src="/assets/ou2caster_devlog_preview.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <div style="padding: 0.75rem 1rem; background: rgba(5, 12, 24, 0.85); font-family: monospace; font-size: 0.75rem; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
        <span>🎮 <strong>Ou2caster Early In-Engine Preview</strong> (Unity 6.4 6000.4.5f1 DX11)</span>
        <span style="color: #00aaff;">FpsTestArena // Live HUD Studio & Survival Mode</span>
    </div>
</div>

---

## Why Rebuild from Scratch?

The original *Outcaster* proved that fast-paced retro FPS locomotion and boomer shooter mechanics could thrive in Unity. However, like many ambitious prototypes, the original codebase suffered from technical debt: weapon sprite rendering, camera bobbing, ballistic raycasts, and state machines were tightly coupled. Tweaking a single weapon required touching multiple scripts and manually calibrating camera offsets.

With **Unity 6.4 (6000.4.5f1)** bringing massive performance gains, improved DX11 pipelines, and modernized C# runtime features, I decided to start with a blank canvas and engineer a clean, decoupled foundation:
- **100% Data-Driven Architecture**: Every weapon, enemy type, projectile, and damage profile is defined via modular ScriptableObjects (`Assets/Config/Weapons/Weapon_0` through `Weapon_15`).
- **Zero-Allocation Garbage Collection**: Hot gameplay loops (bullet trajectories, particle pooling, and collision queries) generate zero GC allocations during combat.
- **Custom Editor Tooling**: Empowering rapid design iteration directly in the Unity Inspector.

---

## The Breakthrough Tool: LIVE 3D HUD PREVIEW (No Play-Mode Needed!)

In classic 2.5D FPS development (think *DOOM*, *Blood*, or *Duke Nukem 3D*), positioning 2D weapon sprites in front of a 3D perspective camera is notoriously tedious:
1. Enter Play Mode.
2. Fire a few shots and observe the weapon alignment.
3. Exit Play Mode.
4. Manually guess new XYZ floating-point values in the inspector.
5. Repeat 50 times until it looks right.

To eliminate this friction forever, I engineered a dedicated custom editor extension: **`LIVE 3D HUD PREVIEW`** (dockable weapon studio).

```text
[ Unity 6 Custom Inspector ] ───> [ Live Render Pipeline Preview ]
                                          │
    ├── Global Weapon XYZ Offsets          ├── Real-time Sprite Rotation (Pitch, Yaw, Roll)
    ├── Interactive Stretch Scale         ├── Push & Head-Bob Rest Heights
    └── Frame Animation Stepper           └── Instant Zero-Play-Mode Feedback
```

### Key Capabilities:
- **Real-Time 3D Viewport in Inspector**: Renders the weapon model and sprite directly inside the editor inspector without hitting Play.
- **Micro-Adjustment Gizmos**: Sliders for Global Weapon Position (X, Y, Z), Stretch Scale (X, Y), Sprite Rotation (Pitch, Yaw, Roll), and Weapon Push / Recoil offsets.
- **Animation Verification**: Frame-by-frame animation scrubber to test muzzle flash alignment, recoil resets, and melee swing arcs instantly.
- What previously took hours of trial-and-error now takes **under 30 seconds**.

---

## Survival Mode: Call of Duty Zombies Meets Boomer Shooter

The gameplay showcase featured in the video demonstrates the brand-new **Survival Mode**:

### 1. The Core Loop
Taking inspiration from the legendary Treyarch *Call of Duty Zombies* formula:
- **Round-Based Waves**: Endless hordes escalating in velocity, aggression, and enemy count.
- **Barricades & Environmental Control**: Repairable window boards and airlock security doors ("*Atmosphere depressurizing*") that players can seal to manage wave flow.
- **Perk Machines & Upgrades**: Dedicated stations providing movement boosts, reload acceleration, and health survivability.
- **Tactical Black Ops 2 Melee**: Starting pistol paired with an authentic fast-recovery tactical knife slash that rewards aggressive close-quarters timing.

### 2. Visceral Boomer Shooter Combat Feel
While the survival rules echo classic Zombies, the combat dynamics are built on the adrenaline-fueled heritage of **Ion Fury**, **Dusk**, and **DOOM**:
- Heavy futuristic weaponry delivering devastating explosive impacts, screen shake, and visceral demon dismemberment.
- Atmospheric dynamic lighting where muzzle flashes and projectile flares cut through gloomy, industrial corridors.
- Agile player locomotion rewarding continuous strafing, bunny-hopping, and split-second spatial awareness.

---

## What's Next for Ou2caster?

With the core weapon tooling and survival gameplay loop firmly established in Unity 6:
- **Expanding Enemies & Arsenal**: Designing new monster archetypes and fleshing out the remaining weapon roster (`Weapon_0` through `Weapon_15`).
- **Deep Modular Prefab Architecture**: Once every game element (spawners, barricades, perk machines, doors) is standardized into reusable prefabs, assembling and balancing new Survival arenas becomes seamless and fast.
- **Retro Texture & Asset Polish via SLADE**: Upgrading environmental textures by exploring classic DOOM PK3 mods and vintage WADs, extracting authentic asset archives using **SLADE** and using them as creative inspiration for grungy, industrial sci-fi fidelity.
- **Map Layouts & Sound Design**: Tuning flow, navigation cues, and crunching audio feedback for upcoming public playtests on Itch.io.

Stay tuned for more devlogs as development charges forward!
