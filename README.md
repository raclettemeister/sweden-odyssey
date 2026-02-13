# Sweden Trail

A collaborative game about a real 2-week Boy Scout trip across Sweden in 2008. 20 people. 14 days. Stockholm to the Norwegian border.

## What Is This?

This started as one person's memory of a scout trip and is becoming a **full game built by the 20 people who were actually there**. The goal is a Steam release built entirely with AI coding tools (Claude Code, Cursor) — none of us are programmers.

## Current Status

### Phase 0: HTML Demo (NOW)
An Oregon Trail-inspired browser game that serves as our proof of concept and recruitment tool.

**Play it:** Open `sweden_trip.html` in any browser. No install needed.

### Phase 1: Ren'Py Prototype (NEXT)
We're moving to [Ren'Py](https://www.renpy.org/) — a Python-based visual novel engine perfect for narrative adventure games. Hundreds of Ren'Py games are on Steam. AI tools work excellently with its text-based codebase.

### Phase 2+: Full Production
See `docs/project-vision.md` for the full roadmap.

## The Game

You are 18 years old, setting off on a 14-day Boy Scout trek from Stockholm to Storlien (the Norwegian border). Manage your health, food, morale, and energy as you hike through forests, mountains, and lake country.

### Route
Stockholm → Sigtuna → Uppsala → Sala → Lake Siljan → Mora → Orsa Finnmark → Fulufjället → Idre → Grovelsjon → Rogen Reserve → Funäsdalen → Sylarna → Storlien

### Visual Style
Full-screen pixel art in the classic Oregon Trail tradition. Every scene is an illustrated pixel art landscape — Swedish forests, mountain trails, lakeshores, campfires under the midnight sun. No terminal text screens — the art IS the game.

### Day Phase System
Each of the 14 days plays out across 3 phases (42 total gameplay segments):

- **Morning** — Wake up, eat, check weather, plan your route. The strategic phase.
- **Afternoon** — Travel, events, encounters, decisions. The action phase.
- **Camp** — Set up camp, cook, campfire conversations, journal, rest. The reflective phase. Real trip stories surface here.

### Game Tabs (Always Accessible)
- **Map** — Illustrated pixel-art map of Sweden, current position, route progress
- **Journal** — Log book of events, choices, and unlocked real trip memories
- **Status** — Party member health, morale, roles, and relationships
- **Inventory** — Equipment and items with condition tracking
- **Resources** — Food, money (SEK), energy, consumption forecasts

### Core Features
- 14 days × 3 phases = 42 gameplay segments across real Swedish locations
- Full-screen pixel art backgrounds (5 location types × 3 lighting states)
- Resource management — health, food, morale, energy, Swedish kronor
- Party management — scout companions with individual stats and personalities
- 20+ random events — moose encounters, northern lights, bear tracks, fika breaks
- Embedded decision-making — choices appear over the scene art, not on separate screens
- Supply shop with gear that changes gameplay outcomes
- 3 difficulty levels
- Personal story/photo layer from the real trip (surfaces during Camp phases)

### HTML Demo (Phase 0 — Current)
The current `sweden_trip.html` is a CRT-terminal-style proof of concept. The full game described above is the target for the Ren'Py build.

## Adding Your Real Trip Content

The game loads personal stories and photos from `data/story.json` and `photos/`.

### From Your Phone (GitHub web)
1. Go to `data/story.json`
2. Tap the edit (pencil) icon
3. Find your day, replace the placeholder text in `"realStory"`
4. Commit

### From Desktop
1. Upload photos to `photos/` (drag and drop on GitHub)
2. Edit `data/story.json` to add your story and point to the photo
3. Commit and push

## Project Structure

```
sweden_trip.html        ← HTML demo (playable now, Phase 0 proof of concept)
data/
  story.json            ← your real trip stories and photo references
photos/                 ← trip photos (upload here)
docs/
  project-vision.md     ← full project vision, visual design, phase system, roadmap
```

## How We Work

- **No manual coding.** All code is AI-generated using Claude Code, Cursor, or similar tools.
- **No code review.** None of us are programmers. We rely on AI + automated testing.
- **One person per feature/file at a time** to avoid merge conflicts.
- **GitHub is our hub** for code, docs, and coordination.

## The Team

20 members of the original 2008 Sweden scout trip, collaborating to turn our shared memory into a game.
