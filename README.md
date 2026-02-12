# Sweden Trail - A Scout Adventure

An Oregon Trail-inspired HTML video game about a 2-week Boy Scout trip across Sweden.

## Play Now

Open `sweden_trip.html` in any modern browser. No install or server required.

## The Story

You are 18 years old, setting off on a 14-day Boy Scout trek from Stockholm to Storlien (the Norwegian border). Manage your health, food, morale, and energy as you hike through forests, mountains, and lake country. Make choices, survive random events, and experience the Swedish wilderness.

## Features

- **14 days** of travel across real Swedish locations
- **Resource management** - health, food, morale, energy, and Swedish kronor
- **20+ random events** - moose encounters, northern lights, bear tracks, fika breaks, and more
- **Supply shop** - buy gear before departure that changes gameplay outcomes
- **3 difficulty levels** - Scout (easy), Venturer (normal), Rover (hard)
- **Item-dependent outcomes** - your gear affects what choices are available
- **Personal story layer** - your real trip photos and stories show between game days
- **Retro CRT aesthetic** with scanlines and pixel fonts
- **Chiptune sound effects** via Web Audio API
- **Keyboard support** - press 1/2/3 for choices, Enter to continue
- **Single HTML file** - no dependencies, no build step

## Route

Stockholm > Sigtuna > Uppsala > Sala > Lake Siljan > Mora > Orsa Finnmark > Fulufjallet > Idre > Grovelsjon > Rogen Reserve > Funäsdalen > Sylarna > Storlien

## How To Play

1. Enter your scout name and patrol
2. Buy supplies at the Stockholm scout shop
3. Each day: read the situation, make a choice from 3 options
4. After each day, your real trip story/photo shows (if added)
5. Manage resources to survive all 14 days
6. Reach Storlien to win

---

## Adding Your Content (Phone + Desktop Workflow)

The game loads personal stories and photos from `data/story.json` and `photos/`.

### Project Structure

```
sweden_trip.html     <-- the game (don't need to touch this)
data/
  story.json         <-- edit this! your stories for each day
photos/
  day01-stockholm.jpg   <-- upload your trip photos here
  day02-sigtuna.jpg
  ...
```

### From Your Phone (GitHub mobile / web)

1. Go to `data/story.json`
2. Tap the edit (pencil) icon
3. Find the day you want, replace the placeholder text in `"realStory"`:
```json
{
  "day": 1,
  "location": "Stockholm",
  "realStory": "We arrived at Stockholm central station at 6am. The whole troop was exhausted from the overnight ferry but buzzing with excitement...",
  "photo": "",
  "photoCaption": ""
}
```
4. Commit directly to the branch

### From Your Desktop

1. Upload photos to the `photos/` folder (drag and drop on GitHub, or git push)
2. Edit `data/story.json` to point each day's `"photo"` to the file:
```json
{
  "day": 1,
  "location": "Stockholm",
  "realStory": "We arrived at Stockholm central station...",
  "photo": "photos/day01-stockholm.jpg",
  "photoCaption": "The whole troop at Stockholm Central, 6am, barely awake"
}
```
3. Commit and push

### What Happens in the Game

- If a day has a **photo**, it shows as a thumbnail during gameplay (click to expand)
- After each day's game event, a **"From The Real Trip"** screen shows your story + photo
- Days with no content yet just skip the interstitial (game works fine empty)
- You can fill in stories gradually - one day at a time, phone or desktop

### Bonus: Memories

At the bottom of `story.json` there's a `"memories"` array for extra stories that don't fit a specific day:
```json
"memories": [
  {
    "title": "The Night We Got Lost",
    "text": "It was day 7 and the compass was wrong...",
    "photo": "photos/lost-night.jpg"
  }
]
```

## Also In This Repo

- `index.html` - Chez Julien Simulator (cheese shop business sim)
