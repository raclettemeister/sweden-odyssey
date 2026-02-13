# Sweden Trail — Project Vision & Decisions

This document captures the key decisions and plans for the project. It's a living document — update it as things evolve.

## The Big Picture

**What:** A narrative adventure game based on a real 2-week Boy Scout trip across Sweden in 2008.

**Who:** 20 members of that original trip, collaborating together.

**Goal:** A full game release on Steam.

**Core constraint:** Nobody on the team is a programmer. All code is AI-generated using tools like Claude Code and Cursor. No manual coding. No code review.

## Key Decisions Made

### Engine: Ren'Py

We evaluated several engines for compatibility with AI-only development:

| Engine | AI-Compatible? | Verdict |
|--------|---------------|---------|
| **Ren'Py** | Excellent | **CHOSEN.** Python-based, text files only, built for narrative games, hundreds of titles on Steam, AI handles it perfectly. |
| Godot | Good | GDScript is AI-friendly, text-based scenes. Good general-purpose option but overkill for a narrative game. |
| Unity | Mediocre | C# code is fine for AI but scene files are binary — AI can't read them. Requires constant GUI work. |
| Unreal | Poor | C++ is error-prone for AI. Blueprint visual scripting can't be AI-driven. |
| HTML/Electron | Perfect for AI | We started here. Could wrap for Steam via Electron. But feels like "web game in a window." |

**Why Ren'Py wins for us:**
- 100% text-based files — AI tools can read and edit everything
- Purpose-built for our game type (narrative + choices + resource management)
- Built-in systems for dialogue, choices, character sprites, backgrounds, music, saves, menus
- Native Steam integration (achievements, cloud saves, etc.)
- Massive community with tons of examples for AI to reference
- Free and open source

### Development Approach: AI-Only

Rules:
- **No manual coding.** Every line of code is AI-generated.
- **No code review.** None of us understand code. We rely on: does it run? Does it do what we asked?
- **AI tools:** Claude Code, Cursor, or similar AI coding assistants.
- **One person per feature/file at a time** to avoid merge conflicts.
- **Automated tests** (written by AI, run by CI) to catch breakage.

### Risks of AI-Only Development

These are real and we need to plan for them:
- **Merge conflicts** when two people edit the same area
- **AI tools overwriting each other's work** across sessions
- **Bugs nobody can diagnose** — we can only describe symptoms to AI
- **Inconsistent code quality** making AI context worse over time
- **Scope creep** — AI makes it easy to add features, hard to know when to stop

Mitigations:
- Modular architecture (each day/chapter = separate file)
- Clear ownership of files/features
- Automated testing as the source of truth
- Regular playtesting by the whole team

## Roadmap

### Phase 0: HTML Demo (Current)
**Purpose:** Personal proof of concept and recruitment tool.
- Oregon Trail-inspired browser game in a single HTML file
- Playable at `sweden_trip.html`
- Shows the concept, the route, the gameplay loop
- Used to pitch the project to the other 19 trip members

### Phase 1: Ren'Py Learning & Prototype
**Purpose:** Prove that AI-driven Ren'Py development works before committing the team.

Steps:
1. Install Ren'Py, make a tiny 5-minute test game (unrelated to Sweden Trail)
2. Test how well AI tools handle Ren'Py script files
3. If that works: port Day 1 of Sweden Trail to Ren'Py
4. If THAT works: this becomes the Ren'Py demo to show the group

**What the tiny test game should cover:**
- Basic dialogue and narration
- A choice with branching paths
- One background image
- One music track
- Building a distributable .exe

### Phase 2: Organization & Recruitment
**Purpose:** Get the team together and structured.

- Set up a Discord server (or similar)
- Contact all 19 trip members with the demo
- Survey skills and interest levels (expect 5-8 active contributors)
- Assign roles: who manages what, who contributes content, who tests
- Write a detailed Game Design Document (GDD)
- Define contribution workflow for non-coders

### Phase 3: Vertical Slice
**Purpose:** Build one complete, polished day of the game in Ren'Py.

- Real art (or AI-generated art with consistent style)
- Real music and sound effects
- Complete gameplay for one day with all mechanics working
- This proves the team can ship something together

### Phase 4: Full Production
- Build out all 14 days
- Add the real stories and photos from all trip members
- Polish gameplay, art, audio
- QA and playtesting
- Steamworks integration (store page, achievements, cloud saves)
- Marketing materials (trailer, screenshots, description)

## HTML → Ren'Py Transfer Map

The current HTML game maps cleanly to Ren'Py concepts:

| HTML game concept | Ren'Py equivalent |
|---|---|
| Each "day" screen | A `label` (like a chapter) |
| Choice buttons (1/2/3) | `menu:` blocks (built-in) |
| Stats (health, food, morale, energy) | Python variables |
| Random events | `renpy.random.choice()` |
| Shop screen | Custom screen with buttons |
| Story text typing out | Built-in `what_slow_cps` |
| Retro CRT look | Custom GUI theme |
| `story.json` data | Python can read JSON natively |

## Team Roles (To Be Defined)

Possible roles for non-coders working with AI tools:
- **Project lead** — coordinates, makes decisions, manages the repo
- **AI wranglers** — people who get comfortable with Claude Code/Cursor and generate game code
- **Content creators** — write trip stories, provide photos, write dialogue
- **Artists** — create or direct AI-generated visual assets (backgrounds, sprites, UI)
- **Musicians** — create or source music and sound effects
- **Testers** — play the game, find bugs, report issues
- **Community manager** — keeps the Discord active, organizes playtests

## Visual Style: Classic Oregon Trail Pixel Art

**Decision: Full-screen pixel art in the style of the original Oregon Trail (1990 MECC version).**

This is not the green-text terminal look from the Phase 0 demo. The real game uses illustrated pixel art scenes that fill the entire screen, with UI elements overlaid on top.

### Why Pixel Art

- **Nostalgia factor.** Oregon Trail is universally recognized. People immediately understand the game type.
- **AI-generatable.** Pixel art has clear rules and constraints — AI image tools can produce consistent results.
- **Forgiving style.** Pixel art doesn't need to be photorealistic. A slightly "off" tree still looks like a tree.
- **Performance.** Tiny file sizes, runs on anything, loads instantly.
- **Consistency.** Easier to maintain a cohesive look across 14 days of content than with realistic art.
- **Charm.** Matches the scout trip vibe — nostalgic, warm, slightly rough around the edges.

### Art Specifications

- **Resolution:** 960×540 base (scales to 1920×1080 at 2×). Clean pixel boundaries at all scales.
- **Color palette:** Limited palette per scene (32-64 colors). Swedish nature tones — deep greens, blue lakes, grey mountains, warm campfire oranges, midnight sun golds.
- **Style reference:** Oregon Trail (1990), The Banner Saga (for Nordic landscapes), Owlboy (for detailed pixel environments).
- **Scene composition:** Full-screen backgrounds with layered elements (sky, far terrain, mid-ground, foreground). Parallax scrolling possible for travel sequences.

### Scene Types Needed (Per Location Type)

| Location Type | Morning Scene | Afternoon Scene | Camp Scene |
|---|---|---|---|
| **City** (Stockholm, Uppsala) | Cobblestone streets, old buildings, morning light | Market squares, churches, crowds | Hostel/indoor sleeping, city lights |
| **Town** (Sigtuna, Mora, Sala) | Small-town main street, shops opening | Lake shores, local landmarks | Campground near town, fire pit |
| **Wilderness** (Orsa Finnmark, Rogen) | Dense forest trail, misty morning | Deep woods, river crossings, wildlife | Tent camp in clearing, campfire |
| **Lake** (Siljan, Grovelsjon) | Lake shore at dawn, mist on water | Canoeing, swimming, fishing scenes | Lakeside camp, sunset reflections |
| **Mountain** (Fulufjället, Sylarna) | Mountain trail, fog lifting | Summit views, alpine meadows, streams | Exposed mountain camp, wind, stars |

---

## Day Phase System

Each of the 14 days is divided into **3 playable phases**. This gives 42 total gameplay segments (14 days × 3 phases) instead of 14 flat screens.

### Phase 1: Morning (Dawn — Break Camp — Plan)

**Visual:** Soft morning light. Camp being packed up. Mist, dew, early sun.

**Gameplay:**
- Wake-up status report — how did the group sleep? Any overnight events?
- Breakfast decision — use food supplies, forage, or skip (affects energy/morale)
- Route planning choice — which path to take today? (affects what afternoon events you encounter)
- Weather check — today's weather revealed, affects all phases
- Equipment check — did anything break overnight? Gear condition updates

**Tone:** Calm, strategic. This is the planning phase. Player sets up the day.

### Phase 2: Afternoon (Travel — Events — Encounters)

**Visual:** Full daylight. The main travel scene for this location type. Widest variety of backgrounds.

**Gameplay:**
- Main travel narrative — description of the landscape, the hike, the group's mood
- 1-2 random events from the event pool (location-type specific)
- Decision points with branching outcomes (the core Oregon Trail gameplay)
- Resource consumption — energy drains, food consumed, weather effects applied
- Discoveries — find items, meet locals, encounter wildlife
- Group dynamics — companions react to decisions, relationships shift

**Tone:** Active, unpredictable. This is where things happen. The meat of the game.

### Phase 3: Camp (Evening — Rest — Reflect)

**Visual:** Sunset/dusk, then firelight. Warm tones. Intimate campfire scenes.

**Gameplay:**
- Set up camp — choose campsite (sheltered vs. scenic vs. convenient)
- Cooking — use supplies to make dinner, share food, affects morale
- Campfire scene — group conversation, storytelling, singing (guitar if owned)
- Journal entry — player writes/reads the day's log (ties into the Journal tab)
- Rest/recovery — health and energy regeneration based on camp quality, tent, weather
- Night events — possible encounters (northern lights, bear near camp, rain soaking gear)
- **Real story overlay** — this is where real trip members' actual stories and photos appear, layered between the fictional gameplay and the real memories

**Tone:** Reflective, social. Morale is built or lost here. The emotional core of the game.

### Phase Flow

```
┌─────────────────────────────────────────────────────┐
│                    DAY N                              │
│                                                       │
│  ┌──────────┐   ┌──────────────┐   ┌──────────────┐ │
│  │ MORNING   │──▶│  AFTERNOON   │──▶│    CAMP      │ │
│  │           │   │              │   │              │ │
│  │ Plan      │   │ Travel       │   │ Rest         │ │
│  │ Eat       │   │ Events       │   │ Cook         │ │
│  │ Pack      │   │ Decisions    │   │ Campfire     │ │
│  │ Weather   │   │ Encounters   │   │ Journal      │ │
│  │           │   │              │   │ Real Stories  │ │
│  └──────────┘   └──────────────┘   └──────────────┘ │
│                                                       │
│              ──▶ DAY N+1 MORNING ──▶                 │
└─────────────────────────────────────────────────────┘
```

---

## UI Tabs (Always Accessible)

The game has a persistent tab bar along the top or bottom of the screen. These tabs can be opened at any time during gameplay, overlaying the current scene. Classic Oregon Trail had similar — you could always check supplies, look at the map, etc.

### Tab 1: Map

**What it shows:**
- Full illustrated pixel-art map of Sweden showing the complete route
- Stockholm (start) to Storlien (end) with all 14 stops marked
- Current position highlighted with a pulsing marker or scout icon
- Completed segments shown as a solid trail line
- Upcoming segments shown as a dotted line
- Distance remaining and days elapsed
- Small icons at each stop showing location type (city, lake, mountain, etc.)

**Design:** Think Oregon Trail map screen — a hand-drawn/illustrated top-down map, not a realistic satellite view. Parchment or field-journal style. Could scroll vertically since the route goes roughly north.

### Tab 2: Journal (Log Book)

**What it shows:**
- Chronological log of everything that has happened
- Each entry auto-generated from game events: "Day 3 Morning — Woke to rain. Decided to push through to Sala despite the weather."
- Player choices recorded: "Chose to explore the silver mine instead of resting."
- Key outcomes noted: "Found old mining equipment. Morale +10."
- Real trip stories unlocked during Camp phases appear here too
- Can scroll back through all previous days

**Design:** Looks like a physical journal/field notebook. Handwriting-style pixel font. Maybe small sketches or stamps for special events (a moose stamp when you see one, a fish stamp when you catch one).

### Tab 3: Status (Party Members)

**What it shows:**
- Each scout/companion in the group displayed with a small pixel portrait
- Individual stats per member:
  - **Health** — injury status, illness, fatigue
  - **Morale** — happy, neutral, grumbling, miserable
  - **Role** — navigator, cook, scout leader, medic, etc.
  - **Special trait** — what unique ability/quirk this person has
- Group average stats shown at top
- Visual status indicators (green/yellow/red faces, or health bar colors)
- Relationship indicators — who gets along, recent conflicts or bonding moments

**Design:** Character roster screen. Grid of pixel portraits with stat bars. Click/hover a member for detail view. Inspired by party management screens in RPGs.

### Tab 4: Inventory

**What it shows:**
- Grid of owned items with pixel art icons
- Each item shows: name, quantity, condition (new/worn/damaged), effect description
- Categories: Equipment, Food, Medical, Tools, Special
- Items acquired from the shop at start, plus anything found during the trip
- Consumable items show remaining uses
- Broken/damaged items highlighted

**Item examples:**
- Tent (condition: good/worn/leaking)
- Fishing rod (uses remaining)
- First aid kit (bandages left)
- Compass & map (always working or lost?)
- Guitar (morale booster at camp)
- Rain gear (weather protection)
- Phrasebook (helps in town encounters)

**Design:** Classic inventory grid. Pixel art item icons on a backpack/rucksack background. Drag-and-drop not needed — just view and use.

### Tab 5: Resources

**What it shows:**
- **Food** — total supply with daily consumption rate. "12 days of food remaining at current pace." Breakdown: dried food, fresh food, foraged.
- **Money (SEK)** — remaining Swedish kronor. Purchase history. Can buy supplies in towns.
- **Energy** — group average energy level. Affected by sleep, food, terrain difficulty, weather.
- **Water** — not a separate resource (Sweden has plenty of clean water) but noted when relevant.
- **Fuel/Fire** — firewood supply for cooking and warmth. Matters in wet weather.
- Daily consumption forecast: "At current pace, food runs out in 4 days."
- Graph or visual showing resource trends over the past few days (going up or down?)

**Design:** Dashboard-style. Clean stat bars with numbers. Maybe a simple trend arrow (↑↓→) next to each resource. Warning indicators when supplies are low.

### Tab Bar Layout

```
┌──────────────────────────────────────────────────────────┐
│  [MAP]  [JOURNAL]  [STATUS]  [INVENTORY]  [RESOURCES]    │
├──────────────────────────────────────────────────────────┤
│                                                          │
│              Full-screen pixel art scene                  │
│                                                          │
│           + narrative text at bottom                     │
│           + choice buttons overlaid                      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Main Gameplay Screen Layout

The primary gameplay view (outside of tabs) fills the screen with pixel art and overlays the interactive elements:

```
┌──────────────────────────────────────────────────────────┐
│  [MAP] [JOURNAL] [STATUS] [INVENTORY] [RESOURCES]  Day 5 │  ← Tab bar (small, top)
├──────────────────────────────────────────────────────────┤
│                                                          │
│                                                          │
│            FULL-SCREEN PIXEL ART BACKGROUND              │
│                                                          │
│            (forest trail / lake shore / mountain          │
│             summit / town square / campfire)              │
│                                                          │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐  │
│  │  Narrative text box (semi-transparent background)  │  │  ← Story text with
│  │  "The trail narrows as you push deeper into the    │  │    typewriter effect
│  │   Orsa Finnmark. The trees here are ancient..."    │  │
│  ├────────────────────────────────────────────────────┤  │
│  │  [A] Follow the marked trail                       │  │  ← Choice buttons
│  │  [B] Cut through the forest (risky)                │  │    overlaid on scene
│  │  [C] Rest here and fish (requires fishing rod)     │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  HP ████░░  FOOD ██████  MORALE ████████  NRG ███░░░   │  ← Minimal HUD bar
└──────────────────────────────────────────────────────────┘
```

### Key Design Principles

1. **Art first, UI second.** The pixel art scene should dominate the screen. UI is minimal and semi-transparent.
2. **No clutter.** The HUD shows only the 4 core stats as small bars. Details live in the tabs.
3. **Text box is cinematic.** Think JRPG dialogue boxes — appears at bottom, doesn't cover the whole scene.
4. **Choices are embedded.** Decision buttons appear within/below the text box, part of the scene, not a separate screen.
5. **Phase transitions are visual.** Moving from Morning → Afternoon → Camp changes the lighting, sky color, and scene composition. The player feels time passing.
6. **Sound supports visuals.** Morning = birds, wind. Afternoon = footsteps, rustling. Camp = crackling fire, crickets, distant owl.

---

## Art Pipeline (How We Make the Pixel Art)

Since nobody on the team is a professional pixel artist, we have several options:

### Option A: AI-Generated Pixel Art (Most Likely)
- Use AI image generation tools (Midjourney, DALL-E, Stable Diffusion) with pixel art prompts
- Post-process to enforce consistent palette and resolution
- Manually touch up in Aseprite or Piskel (free pixel art editors)
- Advantages: Fast, cheap, scalable
- Risk: Consistency across 42+ scenes requires careful prompting and style guides

### Option B: Commission a Pixel Artist
- Hire a freelance pixel artist to create backgrounds and sprites
- Provide AI-generated concept art as reference
- Advantages: Highest quality, guaranteed consistency
- Risk: Cost (estimate €50-150 per background × 42+ scenes = €2,000-6,000+)

### Option C: Hybrid Approach (Recommended)
- AI generates the first draft of each scene
- One team member with art interest learns basic pixel art editing
- Touch up and enforce consistency manually
- Commission key scenes (title screen, victory, major landmarks) from a professional
- Best balance of speed, cost, and quality

### Asset List (Minimum for Demo)

For the HTML demo to show this vision, we need at minimum:
- 5 background templates (one per location type) × 3 lighting variants (morning/afternoon/evening) = **15 backgrounds**
- 1 map illustration
- Item icons for inventory (10-15 small sprites)
- Character portraits for party members (5-8 small sprites)
- UI elements (tab icons, stat bars, text box frame)
- Title screen art

---

## Open Questions (Remaining)

- ~~What's the visual style?~~ **Decided: Pixel art, Oregon Trail style.**
- ~~What's the exact game genre?~~ **Decided: Oregon Trail-style resource management + narrative adventure, with day phases.**
- How do we handle real people's stories/likenesses? Do we need consent forms?
- What's the minimum viable game if only 3-5 people stay active?
- Free or paid on Steam? If paid, how do we split revenue?
- Do we want voice acting? (Probably not — text + pixel art is the aesthetic)
- What's the age rating target?
- How many party members should the player manage? (3-5 feels right)
- Should party members be fictional characters or based on real trip members?
- Do we want a day/night cycle in the visuals, or just 3 static lighting states per phase?
