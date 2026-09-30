# What is GSC? 

Game Script Code/Game Scripting C, commonly known as **GSC**, is the proprietary, server-side scripting language used across almost all major *Call of Duty* titles powered by the IW engine and Treyarch's derivatives. Its syntax is heavily inspired by C and C++, but it behaves like a dynamically-typed scripting language with built-in multithreading, event-driven execution, and game-specific data structures.

Developed initially by Infinity Ward, GSC is the invisible backbone that dictates the flow of single-player campaigns, orchestrates multiplayer game logic, and drives the intricate state machines of the iconic Zombies mode.

This guide provides a universal overview of GSC concepts, applicable (with engine-specific variations) across **T4 (World at War)**, **T5 (Black Ops 1)**, **T6 (Black Ops 2)**, **T7 (Black Ops 3)**, **T8 (Black Ops 4)**, and **T9 (Black Ops Cold War)**.

---

## The GSC Virtual Machine

GSC is not compiled into native machine code (x86/x64). Instead, the game's compiler (often part of the mod tools or done at build time by the developers) translates the raw `.gsc` scripts into bytecode. This bytecode is then executed at runtime by a Virtual Machine (VM) embedded directly within the game engine.

The VM handles:
1.  **Memory Management:** Dynamic allocation and garbage collection for script variables.
2.  **Thread Scheduling:** GSC natively supports executing multiple functions concurrently via threads. The VM schedules these threads frame-by-frame.
3.  **Engine Interfacing:** Built-in functions allow GSC scripts to directly read and write engine memory, manipulate Dvars (developer variables), spawn 3D entities, and control HUD elements.

---

## Basic Syntax & Grammar

GSC syntax will look instantly familiar to anyone who has programmed in C, C++, or JavaScript.

### Includes and Namespaces

At the top of a file, you typically define `#include` directives to import functions from other scripts. In newer engines (T7+), namespaces and auto-executing directives (`#using`, `#namespace`, `#autoexec`) become prevalent to strictly organize the massive codebase.

```c
#include maps\mp\_utility;
#include common_scripts\utility;

// In T7+ (Black Ops 3 onwards), namespaces are common:
#namespace custom_zombies_logic;
```

### Variables and Types

Variables in GSC are **dynamically typed**. You do not declare their type (`int`, `string`, etc.). A variable can hold a string, integer, float, array, or a reference to a game entity.

Variables can have different scopes:
*   **Local Variables:** Scoped only to the current function or thread.
*   **Level Variables (`level.var_name`):** Global variables accessible from anywhere. `level` is a globally persistent entity structure.
*   **Self Variables (`self.var_name`):** Variables attached to a specific entity (like a player or a zombie).

```c
level.custom_round = 1;         // Global integer
self.is_invincible = true;      // Boolean attached to 'self' (the player)
local_weapon = "ray_gun";       // Local string
```

### Arrays and Structs

GSC relies heavily on arrays. They can be indexed numerically or associatively (using strings as keys).

```c
// Creating an array
players = get_players(); 

// Associative array
level.weapon_costs = [];
level.weapon_costs["m1911"] = 500;

// Structs (Useful for holding grouped data without creating full entities)
spawn_point = spawnstruct();
spawn_point.origin = (0, 0, 0);
spawn_point.angles = (0, 90, 0);
```

---

## Execution Control: Threads and Events

The most powerful aspect of GSC is its event-driven, multithreaded nature.

### Threads (`thread`)

You can launch a function in parallel alongside the current execution flow using the `thread` keyword. If you don't use `thread`, the current script will wait for the function to finish before continuing.

```c
// Spawns a parallel process. The main script continues immediately.
level thread background_music_manager();

// Called on a specific entity
player thread monitor_player_health();
```

### Waiting and Yielding (`wait`)

Because the VM runs frame-by-frame, infinite loops will crash the game (Server Command Overflow). You **must** yield execution using `wait`.

```c
while ( true )
{
    // Do something every second
    print("One second passed.");
    wait 1.0; 
}
```

### Event System (`waittill` and `endon`)

GSC uses a string-based publish/subscribe model for events. Entities can wait for specific events to fire, or terminate their threads if an event occurs.

*   `waittill("event_string")`: Pauses the thread until the entity broadcasts this exact string.
*   `endon("event_string")`: Immediately kills the thread if the entity broadcasts this string.

```c
monitor_damage()
{
    // Stop this thread if the player disconnects or dies
    self endon("disconnect");
    self endon("death");

    while ( true )
    {
        // Wait until the player takes damage. 
        // Capture the event arguments into variables.
        self waittill("damage", amount, attacker, direction_vec);
        
        iPrintLn("You took " + amount + " damage!");
    }
}
```

Entities trigger these events using `notify`.
```c
// Somewhere else in the code...
self notify("damage", 50, level.zombie_boss, (1,0,0));
```

---

## Common Tasks Across Engines

While functions vary between World at War (T4) and Cold War (T9), the core mechanics remain the same.

### Printing to Console / Screen
Useful for debugging.
```c
Print("Console log message");       // Prints to server console
iPrintLn("On-screen message");      // Prints to the killfeed area
iPrintLnBold("Center screen text"); // Big text in the center
```

### Modifying Players
Scripts frequently target the array of active players.
```c
players = get_players();
for ( i = 0; i < players.size; i++ )
{
    player = players[i];
    
    // Give weapon and max ammo
    player GiveWeapon("ray_gun");
    player GiveMaxAmmo("ray_gun");
    player SwitchToWeapon("ray_gun");
    
    // Change health
    player.maxhealth = 250;
    player.health = player.maxhealth;
}
```

### Spawning Entities
You can spawn models, triggers, and effects dynamically.
```c
// Spawn a script model at a specific coordinate
mystery_box = spawn("script_model", (100, -500, 10));
mystery_box setModel("zombie_mystery_box");

// Move it over 5 seconds
mystery_box MoveTo((100, -500, 100), 5.0);
```

---

## Conclusion

Understanding GSC is the master key to modifying Call of Duty. Whether you are building complex custom Zombies maps on Black Ops 3 (T7), injecting mod menus into Black Ops 2 (T6) via memory, or analyzing compiled bytecode in Cold War (T9), the foundational logic—threads, events, and dynamic entities—remains the universal language of the engine.
