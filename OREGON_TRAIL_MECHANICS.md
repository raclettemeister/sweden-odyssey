# Oregon Trail Mechanics - Sweden Odyssey

## ✅ **PROPER OREGON TRAIL STATS IMPLEMENTED**

The game now uses authentic Oregon Trail mechanics instead of generic RPG stats.

---

## 📊 **Main Stats (HUD Display)**

### CONDITIONS SECTION
1. **Météo (Weather)**
   - `Clair` / `Pluie` / `Tempête` / `Neige`
   - Affects travel distance
   - Storms can damage health

2. **Santé (Health)** - Text-based, NOT a bar!
   - `Bonne` (Good) - Everyone healthy
   - `Correcte` (Fair) - Some tired
   - `Mauvaise` (Poor) - Group suffering
   - `Très mauvaise` (Very Poor) - Critical condition
   - `Morte` (Dead) - Game over
   - Color-coded: Green → Yellow → Orange → Red

3. **Allure (Pace)** - How fast you travel
   - `Tranquille` (Relaxed) - 15-20 km/day, less fatigue
   - `Normale` (Steady) - 20-30 km/day, balanced
   - `Forcée` (Grueling) - 30-45 km/day, exhausting, damages health

4. **Rations** - How much you feed the group
   - `Normales` (Filling) - 3 kg/scout/day, maintains health
   - `Réduites` (Meager) - 2 kg/scout/day, economical
   - `Minimales` (Bare Bones) - 1 kg/scout/day, damages health

### PROVISIONS SECTION
5. **Nourriture (Food)** - In kilograms
   - Consumed daily based on rations × scouts
   - Game over if it reaches 0

6. **Argent (Money)** - Swedish Kronor (SEK)
   - Used to buy food and equipment in towns

### GROUPE SECTION
7. **Scouts** - Number alive
   - Start: 20
   - Game over if < 5
   - Critical warning if < 10

8. **Prochain (Next)** - Distance to next landmark
   - In kilometers
   - Updated daily based on travel

---

## 🎮 **Core Mechanics**

### Daily Cycle (Oregon Trail Style)

**MORNING PHASE**
- Check status
- Change pace/rations
- Buy supplies (in towns)
- Choose when to depart

**AFTERNOON PHASE (Travel)**
- Automatic travel based on:
  - Pace setting
  - Health condition
  - Weather
  - Terrain
- Food consumed automatically
- Random events trigger
- Distance tracked

**CAMP PHASE**
- Status report
- Optional activities:
  - Fishing minigame
  - Hunting minigame
  - Rest (may improve health)
- Sleep to next day

### Food Consumption Formula

```
Daily Consumption = Scouts × Ration Level

Filling: 20 scouts × 3 kg = 60 kg/day
Meager: 20 scouts × 2 kg = 40 kg/day
Bare Bones: 20 scouts × 1 kg = 20 kg/day
```

**Starting food: 500 kg**
- Filling = ~8 days
- Meager = ~12 days
- Bare Bones = ~25 days (but health suffers!)

### Travel Distance Formula

```
Base Distance = 25 km/day

Pace Modifiers:
- Relaxed: × 0.7 = 17.5 km/day
- Steady: × 1.0 = 25 km/day
- Grueling: × 1.5 = 37.5 km/day

Health Modifiers:
- Good: × 1.0
- Fair: × 0.9
- Poor: × 0.7
- Very Poor: × 0.5

Weather Modifiers:
- Clear: × 1.0
- Rain: × 0.8
- Storm: × 0.5
- Snow: × 0.6

Final Distance = Base × Pace × Health × Weather
```

**Example:**
- Grueling pace + Fair health + Rain
- 25 × 1.5 × 0.9 × 0.8 = **27 km**

### Health System

**Health Improves:**
- ✅ Filling rations (random chance)
- ✅ Resting at camp
- ✅ Staying in towns for rest days

**Health Degrades:**
- ❌ Bare bones rations (high chance)
- ❌ Grueling pace (random chance)
- ❌ Storm weather exposure
- ❌ Random events (injuries, diseases)

**Health Levels:**
```
Good → Fair → Poor → Very Poor → Dead
  ↑      ↑      ↑       ↑          (Game Over)
  Can improve through rest/food
```

---

## 🎯 **Comparison to Original Oregon Trail**

### What's THE SAME ✅
- Text-based health status (not bars!)
- Pace/rations as core settings
- Food in pounds/kg (not abstract points)
- Money for supplies
- Weather affects travel
- Daily consumption formula
- Distance tracking to landmarks
- Morning decision phase
- Shopping in towns
- Random events during travel
- Health degrades from poor rations/pace
- Multiple death conditions

### What's ADAPTED 🔄
- **20 scouts** instead of 1-4 family members
- **Kilometers** instead of miles (it's Sweden!)
- **Swedish kronor (SEK)** instead of dollars
- **Kilograms** instead of pounds
- **14 days** instead of months
- **Minigames** for hunting/fishing (not shooting gallery)
- **Named characters** with personalities

### What's REMOVED ❌
- Individual health bars (RPG-style)
- Morale stat (Oregon Trail didn't have this)
- Energy stat (Oregon Trail didn't have this)
- Progress bars for stats

---

## 🎮 **Player Strategy**

### Optimal Strategy
1. **Start with steady pace + filling rations**
2. **Monitor food supply** - buy more before running out
3. **Switch to meager rations** when food is scarce
4. **Use grueling pace ONLY** when desperate to reach town
5. **Rest in towns** to recover health
6. **Never let health drop below "Fair"**
7. **Hunt/fish at camp** to supplement food

### Death Spiral Warning Signs
- ⚠️ Health = "Poor" or worse
- ⚠️ Food < 100 kg
- ⚠️ Scouts < 10
- ⚠️ Can't afford food in shops
- ⚠️ Using bare bones rations for multiple days

### Town Strategy
- **Always buy food** if money allows
- **Rest a day** if health is not "Good"
- **Check pace/rations** before leaving

---

## 🏆 **Victory Conditions**

Reach Storlien (Day 14) with:
- 20/20 scouts = "Impossible. Tu as triché. (Légendaire)"
- 15-19 = "Grande Expédition"
- 10-14 = "Expédition Difficile"
- 5-9 = "Catastrophe"

---

## 💀 **Game Over Conditions**

1. **< 5 scouts alive** - "Pas assez pour continuer"
2. **Food = 0** - "Famine"
3. **Health = Dead** - "Trop de maladies"

---

## 🎨 **UI Display**

The stats window now shows:
- **3 sections** with dividers (Oregon Trail style)
- **Text-based health** with color coding
- **Current settings** always visible (pace/rations)
- **No progress bars** for health/morale/energy
- **Clean, information-dense** display

Just like the original Oregon Trail status screen!

---

This is now a TRUE Oregon Trail experience set in Sweden! 🇸🇪🎮
