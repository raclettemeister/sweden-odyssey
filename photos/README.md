# Photos — L'Odyssée Suédoise

## Structure

```
photos/
├── index.csv                    ← Index global de toutes les photos
├── README.md                    ← Ce fichier
├── 01-depart-wezembeek/         ← Préparation des sacs, départ
├── 02-voyage-nord-cologne/      ← Train, Cologne, gares, stations-service
├── 03-camp-intermediaire/       ← Arrivée en Suède, moules, maillots
├── 04-malmo/                    ← Malmö, dernière nuit en gare
├── 05-glacier-ascension/        ← Pied du glacier, grimpe, cascade, premier plateau
├── 06-traversee-neige/          ← Première neige, soleil de minuit, anniversaire
├── 07-grande-traversee/         ← Rivières, crevasses, élans, moustiques, bivouacs
├── 08-laktatjakka/              ← Arrivée au refuge, poste de train
├── 09-auto-stop/                ← 3 jours d'attente, camions
├── 10-construction-radeaux/     ← Radeaux, four en terre, promesse scoute
├── 11-voyage-radeau/            ← Navigation, pêche, îles, pluie
└── 12-retour-bruxelles/         ← Fin du voyage, retour
```

## Index CSV

Le fichier `index.csv` contient l'annotation de chaque photo :

| Colonne       | Description                                          |
|---------------|------------------------------------------------------|
| `fichier`     | Chemin relatif du fichier (ex: `01-depart/IMG_001.jpg`) |
| `chapitre`    | Numéro du chapitre (01 à 12)                         |
| `date`        | Date estimée (YYYY-MM-DD ou approximation)           |
| `personnes`   | Noms des personnes visibles, séparés par des `;`     |
| `lieu`        | Lieu géographique                                    |
| `description` | Description courte de la scène                       |
| `tags`        | Tags libres séparés par des `;` (paysage;faune;camp;nourriture;radeau;moustiques;soleil-de-minuit;etc.) |

## Comment ajouter des photos

1. Placer la photo dans le sous-dossier correspondant au chapitre
2. Ajouter une ligne dans `index.csv` avec les annotations
