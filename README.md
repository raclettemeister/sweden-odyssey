# Sweden Odyssey

**Une histoire vraie. Une odyssée mortelle.**

20 scouts. 14 jours. Stockholm jusqu'à la frontière norvégienne.

Un jeu d'aventure Oregon Trail dans un navigateur, basé sur un vrai camp scout en Suède en 2008.

---

## 🎮 Comment Jouer

### Démarrage Rapide
1. Ouvrez `index.html` dans votre navigateur
2. Aucune installation requise — HTML/CSS/JS pur
3. Fonctionne hors ligne

### Contrôles
- **Souris** : Cliquez sur les choix et boutons
- **Clavier** : A, B, C pour les choix multiples
- **Onglets** : CARTE, JOURNAL, ÉQUIPE, INVENTAIRE accessibles en haut

---

## 📖 L'Histoire

Été 2008. 20 scouts français partent pour une expédition de 2 semaines à travers la Suède. De Stockholm à Storlien, 750 kilomètres à pied à travers forêts, lacs, et montagnes.

C'était censé être une aventure pédagogique.

Ce fut... autre chose.

Inspiré d'Oregon Trail, ce jeu raconte cette histoire avec un humour noir pince-sans-rire. Les scouts peuvent — et VONT — mourir de manière absurde et tragique. Un camp scout devient une expédition mortelle. Une randonnée devient une survie.

Le jeu le prend COMPLÈTEMENT AU SÉRIEUX avec un visage de pierre — c'est ce qui le rend drôle.

---

## 🎯 Gameplay

### Structure des Jours
Chaque jour a 3 phases :

1. **MATIN** — Réveil, petit déjeuner, planification. Décisions stratégiques.
2. **APRÈS-MIDI** — Voyage, événements aléatoires, rencontres. Phase principale.
3. **CAMP** — Installation, cuisine, feu de camp, repos. Phase réflexive.

**42 segments de jeu au total** (14 jours × 3 phases)

### Ressources à Gérer
- **Scouts** : 20/20 au départ. Le chiffre le plus important.
- **Santé** : Moyenne du groupe. Blessures, maladies, fatigue.
- **Moral** : Bonheur du groupe. Tombe = mutinerie.
- **Énergie** : Capacité à marcher. Se draine chaque jour.
- **Nourriture** : Provisions. 20 bouches à nourrir.
- **SEK** : Couronnes suédoises. Achats en ville.

### Événements Aléatoires
- Élans sur le sentier
- Tempêtes
- Baies sauvages (peut-être empoisonnées)
- Chevilles tordues
- Traces d'ours
- Traversées de rivières
- Aurores boréales
- Stampedes de rennes
- Points de vue vertigineux
- Et plus...

**Chaque événement = choix avec conséquences**

### Mini-Jeux
- **Pêche** : Attrapez des poissons pour +nourriture
- **Lance-pierre** : Chassez petits animaux
- **Construction de radeau** : Set piece épique (photos réelles!)

### Les Personnages

#### Héros Nommés (personnalité unique)
- **Dingo** — Narrateur, voit tout
- **Paka** — Chef avec tomahawk, fun et taré
- **Surikat** — Chef sérieux
- **Shikra** — Courageux et fort
- **Oslo** — Costaud mais pas malin
- **Mustak** — Fragile, survit miraculeusement
- **Chiakri** — Optimiste mais TRÈS maladroit
- **Argali** — Leader naturel
- **Rodéo** — Ne veut JAMAIS s'arrêter
- **Kana** — Maintient le moral
- **Ourson** — Râleur avec cœur en or
- **Jaguar** — Égoïste, pense à lui d'abord

Plus 8 scouts secondaires.

**Les scouts nommés peuvent MOURIR.** C'est Oregon Trail.

---

## 🎨 Style Visuel

### Pixel Art Scandinave
- **Résolution base** : 960×540 (scale-up propre)
- **Palette** : Verts de pin profonds, bleus de montagne, ambre de feu de camp, blancs neige
- **Parallax scrolling** : 3+ couches par scène
- **Cycle jour/nuit** : Aurore dorée (matin) → Plein jour → Crépuscule (camp)
- **Effets particules** : Brume, pluie, neige, lucioles, étincelles de feu
- **Sprites animés** : Ligne de scouts marchant automatiquement (chemises rouges, sacs à dos)

### Types de Scènes
- **Ville** (Stockholm, Uppsala) — Bâtiments, rues pavées
- **Village** (Sigtuna, Mora) — Petites maisons, lacs proches
- **Nature sauvage** (Orsa Finnmark) — Forêts de pins denses
- **Lac** (Siljan) — Rivages, reflets, roseaux
- **Montagne** (Fulufjället, Sylarna) — Sommets rocheux, neige en été

**Filtre CRT optionnel** (clin d'œil au prototype terminal)

---

## 🗺️ La Route

1. **Stockholm** (Jour 1) — Gare centrale, départ
2. **Sigtuna** (Jour 2) — Ville viking la plus ancienne
3. **Uppsala** (Jour 3) — Cathédrale, ville universitaire
4. **Sala** (Jour 4) — Mines d'argent anciennes
5. **Lake Siljan** (Jour 5) — Lac de cratère météorite
6. **Mora** (Jour 6) — Porte de la nature sauvage
7. **Orsa Finnmark** (Jour 7) — Forêt boréale profonde
8. **Fulufjället** (Jour 8) — Plus haute cascade de Suède
9. **Idre** (Jour 9) — Village de montagne
10. **Grovelsjon** (Jour 10) — Lac alpin
11. **Rogen Reserve** (Jour 11) — Lacs infinis, terrain rocheux
12. **Funäsdalen** (Jour 12) — Village de fjeld
13. **Sylarna** (Jour 13) — Station de montagne légendaire
14. **Storlien** (Jour 14) — **FRONTIÈRE NORVÉGIENNE** 🎯

**Distance totale : 750 km**

---

## ⚰️ Game Over / Victoire

### Game Over Si :
- Scouts < 5 (trop peu pour continuer)
- Nourriture = 0 (famine)
- Moral = 0 (mutinerie)
- Tous les chefs morts (pas d'adultes)

### Victoire : Atteindre Storlien
**Classement basé sur survivants :**
- 20/20 = "Impossible. Tu as triché. (Légendaire)"
- 15-19 = "Grande Expédition"
- 10-14 = "Expédition Difficile"
- 5-9 = "Catastrophe"

---

## 🔧 Structure Technique

```
sweden-odyssey/
├── index.html          # Point d'entrée
├── css/
│   └── style.css       # Styles, palette, animations
├── js/
│   ├── game.js         # Moteur principal, boucle, état
│   ├── scenes.js       # Rendu pixel art des scènes
│   ├── events.js       # Événements aléatoires et décisions
│   └── ui.js           # HUD, menus, dialogues, onglets
├── data/
│   └── story.json      # Données du vrai voyage
├── docs/
│   └── project-vision.md  # Vision complète du projet
└── photos/             # 44 vraies photos du voyage
```

### Technologies
- **HTML5 Canvas** pour le rendu pixel art
- **Vanilla JavaScript** — pas de frameworks
- **CSS3** pour l'UI overlay
- **RequestAnimationFrame** pour la boucle de jeu
- **Aucun build requis** — ouvrez index.html et jouez

---

## 🎯 Phase 0 Demo — Statut

### ✅ Implémenté
- Jours 1-3 entièrement jouables (9 segments)
- 15+ événements aléatoires avec choix
- Mini-jeux pêche et lance-pierre
- 20 scouts avec personnalités uniques
- Système de mort Oregon Trail-style
- Messages de mort pince-sans-rire
- Commentaires méta-humour des scouts
- Onglets Carte/Journal/Équipe/Inventaire
- 5 types de scènes avec pixel art parallax
- Particules (feu, brume, lucioles)
- Scouts animés marchant sur l'écran
- Cycle jour/nuit visuel
- Filtre CRT optionnel
- Gestion complète des ressources
- Système de journal automatique

### 🚧 Phase Suivante
- Jours 4-14 avec scénarios complets
- Plus de mini-jeux (arc et flèches)
- Scène de construction de radeau complète
- Intégration des vraies histoires (data/story.json)
- Plus d'événements par type de lieu
- Amélioration du pixel art
- Sons/musique d'ambiance
- Système de sauvegarde

---

## 💀 Exemples de Messages de Mort

Le jeu livre les morts avec un sérieux absolu :

> "Oslo est tombé de la montagne. Il a rebondi deux fois."

> "Le fleuve a pris Mustak. Le fleuve ne rend rien."

> "Chiakri a mangé les mauvais champignons. Il est mort en faisant ce qu'il aimait : la cueillette."

> "La montagne était indifférente."

> "L'ours n'était pas une métaphore."

> "Il a zigué. Il aurait dû zaguer."

**C'est iconique PARCE QUE c'est deadpan.**

---

## 🎭 Ton du Jeu

**Drame de survie à l'humour noir.**

Le jeu ne cligne JAMAIS de l'œil. Pas de "haha c'est une blague." Le texte s'engage à fond dans le drame. L'humour vient du fossé absurde entre "c'est un camp scout" et "trois personnes viennent de mourir en traversant une rivière."

Pensez à "You have died of dysentery" d'Oregon Trail — iconique parce que livré sans expression.

**MAIS** : Les vrais moments de l'histoire (autour du feu de camp, moments réflexifs) sont authentiques et sincères. C'est le contraste qui rend le jeu spécial.

---

## 📝 Crédits

**Basé sur le vrai voyage scout en Suède, été 2008**

Développement : Cursor AI + Claude Sonnet 4.5  
Concept & Direction : Julien (Dingo)  
Photos : Archives du groupe scout 2008  

Ce jeu est un projet personnel/pitch pour rallier les 19 autres participants du voyage.

---

## 🚀 Prochaines Étapes

1. **Tester cette démo** avec les anciens participants
2. **Collecter les vraies histoires** de chacun
3. **Développer Days 4-14** avec plus d'événements
4. **Migration vers Ren'Py** pour version finale Steam
5. **Art professionnel** (ou AI + retouches)
6. **Musique d'ambiance** scandinave
7. **Sortie Steam** comme jeu narratif complet

---

## 🎮 Pour Jouer Maintenant

```bash
# Cloner ou télécharger le repo
# Ouvrir index.html dans Chrome/Firefox/Edge
# Pas d'installation, pas de serveur nécessaire
# Juste un navigateur moderne
```

**Que l'odyssée commence.**

---

*"C'était censé être un camp scout."*
