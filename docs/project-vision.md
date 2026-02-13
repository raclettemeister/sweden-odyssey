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

## Open Questions

- What's the visual style? Pixel art? Hand-drawn? AI-generated realistic? Stylized?
- What's the exact game genre in Ren'Py? Pure visual novel? VN + resource management hybrid?
- How do we handle real people's stories/likenesses? Do we need consent forms?
- What's the minimum viable game if only 3-5 people stay active?
- Free or paid on Steam? If paid, how do we split revenue?
- Do we want voice acting?
- What's the age rating target?
