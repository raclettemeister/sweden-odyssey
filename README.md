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

### HTML Demo Features
- 14 days of travel across real Swedish locations
- Resource management — health, food, morale, energy, Swedish kronor
- 20+ random events — moose encounters, northern lights, bear tracks, fika breaks
- Supply shop with gear that changes gameplay outcomes
- 3 difficulty levels
- Personal story/photo layer from the real trip
- Retro CRT aesthetic with scanlines and pixel fonts

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
sweden_trip.html        ← HTML demo (playable now)
data/
  story.json            ← your real trip stories and photo references
photos/                 ← trip photos (upload here)
docs/
  project-vision.md     ← full project vision, roadmap, and decisions
```

## How We Work

- **No manual coding.** All code is AI-generated using Claude Code, Cursor, or similar tools.
- **No code review.** None of us are programmers. We rely on AI + automated testing.
- **One person per feature/file at a time** to avoid merge conflicts.
- **GitHub is our hub** for code, docs, and coordination.

## The Team

20 members of the original 2008 Sweden scout trip, collaborating to turn our shared memory into a game.
