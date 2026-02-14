// Sweden Odyssey — Game Engine
// Core game state and loop

const Game = {
    canvas: null,
    ctx: null,
    width: 960,
    height: 540,
    
    state: {
        day: 1,
        phase: 'morning', // morning, afternoon, camp
        location: 'Stockholm',
        locationType: 'city',
        
        // Oregon Trail style resources
        scouts: 20,
        maxScouts: 20,
        health: 'good', // good, fair, poor, very poor, dead
        food: 500, // pounds of food
        money: 450, // Swedish kronor
        
        // Oregon Trail mechanics
        pace: 'steady', // relaxed, steady, grueling
        rations: 'filling', // filling, meager, bare bones
        weather: 'clear', // clear, rain, storm, snow
        
        // Progress tracking
        distanceToNext: 45, // km to next landmark
        kmPerDay: 25, // base km per day
        
        // Party members
        party: [],
        deadScouts: [],
        
        // Progress
        distanceCovered: 0,
        journalEntries: [],
        
        // Inventory
        inventory: [],
        
        // Weather effects
        temperature: 18, // Celsius
        
        // Scene state
        sceneTime: 0,
        travelOffset: 0,
        particles: [],
        
        // Game flags
        gameOver: false,
        victory: false,
        
        // Current scene/event
        currentEvent: null,
        inMinigame: false
    },
    
    // Route data
    route: [
        { day: 1, location: 'Stockholm', type: 'city', distance: 0 },
        { day: 2, location: 'Sigtuna', type: 'town', distance: 45 },
        { day: 3, location: 'Uppsala', type: 'city', distance: 70 },
        { day: 4, location: 'Sala', type: 'town', distance: 120 },
        { day: 5, location: 'Lake Siljan', type: 'lake', distance: 200 },
        { day: 6, location: 'Mora', type: 'town', distance: 240 },
        { day: 7, location: 'Orsa Finnmark', type: 'wilderness', distance: 270 },
        { day: 8, location: 'Fulufjället', type: 'mountain', distance: 350 },
        { day: 9, location: 'Idre', type: 'mountain', distance: 400 },
        { day: 10, location: 'Grovelsjon', type: 'lake', distance: 450 },
        { day: 11, location: 'Rogen Reserve', type: 'wilderness', distance: 520 },
        { day: 12, location: 'Funäsdalen', type: 'mountain', distance: 600 },
        { day: 13, location: 'Sylarna', type: 'mountain', distance: 680 },
        { day: 14, location: 'Storlien', type: 'town', distance: 750 }
    ],
    
    init() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Initialize party
        this.initParty();
        
        // Initialize inventory
        this.initInventory();
        
        // Setup UI
        UI.init();
        
        // Start game loop
        this.lastTime = performance.now();
        this.loop();
        
        // Show intro
        this.showIntro();
    },
    
    initParty() {
        // Named hero scouts
        const heroes = [
            { name: 'Dingo', role: 'Narrateur', trait: 'Voit tout, commente tout', isHero: true },
            { name: 'Paka', role: 'Chef', trait: 'Porte un tomahawk. Fun et taré.', isHero: true },
            { name: 'Surikat', role: 'Chef', trait: 'Sérieux et organisé', isHero: true },
            { name: 'Shikra', role: 'Scout', trait: 'Courageux et fort. Fiable.', isHero: true },
            { name: 'Oslo', role: 'Scout', trait: 'Super costaud, pas très malin', isHero: true },
            { name: 'Mustak', role: 'Scout', trait: 'Fragile. Survit miraculeusement.', isHero: true },
            { name: 'Chiakri', role: 'Scout', trait: 'Optimiste mais maladroit', isHero: true },
            { name: 'Argali', role: 'Scout', trait: 'Leader naturel, lit le terrain', isHero: true },
            { name: 'Rodéo', role: 'Scout', trait: 'Ne veut JAMAIS s\'arrêter', isHero: true },
            { name: 'Kana', role: 'Scout', trait: 'Joyeux, maintient le moral', isHero: true },
            { name: 'Ourson', role: 'Scout', trait: 'Râleur mais cœur en or', isHero: true },
            { name: 'Jaguar', role: 'Scout', trait: 'Égoïste, pense à lui d\'abord', isHero: true },
            { name: 'Reedunka', role: 'Scout', trait: 'Scout secondaire', isHero: false },
            { name: 'Malamut', role: 'Scout', trait: 'Scout secondaire', isHero: false },
            { name: 'Lemming', role: 'Scout', trait: 'Scout secondaire', isHero: false },
            { name: 'Corsak', role: 'Scout', trait: 'Scout secondaire', isHero: false }
        ];
        
        // Add generic scouts to reach 20
        const genericNames = ['Renard', 'Loup', 'Cerf', 'Aigle'];
        for (let i = 0; i < 4; i++) {
            heroes.push({
                name: genericNames[i],
                role: 'Scout',
                trait: 'Membre du groupe',
                isHero: false
            });
        }
        
        this.state.party = heroes.map(h => ({
            ...h,
            health: 100,
            morale: 80,
            alive: true
        }));
    },
    
    initInventory() {
        this.state.inventory = [
            { name: 'Tentes (4x)', condition: 'Bon', desc: 'Protège le groupe' },
            { name: 'Réchaud de camping', condition: 'Bon', desc: 'Pour cuisiner' },
            { name: 'Canne à pêche', condition: 'Bon', desc: 'Permet de pêcher' },
            { name: 'Lance-pierre', condition: 'Bon', desc: 'Chasse petite game' },
            { name: 'Carte & boussole', condition: 'Bon', desc: 'Navigation' },
            { name: 'Trousse premiers soins', condition: 'Bon', desc: '10 bandages' },
            { name: 'Vêtements de pluie', condition: 'Bon', desc: 'Protection météo' },
            { name: 'Guitare', condition: 'Bon', desc: '+moral au camp' }
        ];
    },
    
    loop(currentTime = 0) {
        const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;
        
        // Update
        this.update(dt);
        
        // Render
        this.render();
        
        requestAnimationFrame((t) => this.loop(t));
    },
    
    update(dt) {
        if (this.state.gameOver || this.state.inMinigame) return;
        
        this.state.sceneTime += dt;
        
        // Update particles
        this.state.particles = this.state.particles.filter(p => {
            p.life -= dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            return p.life > 0;
        });
        
        // Limit particle count to prevent performance issues
        if (this.state.particles.length > 100) {
            this.state.particles = this.state.particles.slice(-100);
        }
        
        // Slowly drain resources during travel
        if (this.state.phase === 'afternoon' && !this.state.currentEvent) {
            this.state.travelOffset += dt * 20; // Scroll speed
            
            // Resource drain
            if (Math.random() < dt * 0.1) {
                this.modifyResource('energy', -0.5);
            }
        }
    },
    
    render() {
        const ctx = this.ctx;
        
        // Clear
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, this.width, this.height);
        
        // Render current scene
        Scenes.render(ctx, this.state);
        
        // Update UI
        UI.updateStats(this.state);
    },
    
    showIntro() {
        UI.showText(
            `SUÈDE, ÉTÉ 2008\n\n20 scouts. 14 jours. Stockholm jusqu'à la frontière norvégienne.\n\nC'était censé être un camp scout. Une aventure pédagogique.\n\nCe fut... autre chose.\n\nBasé sur une histoire vraie.`,
            [
                { text: 'Commencer l\'odyssée', action: () => this.startDay() }
            ]
        );
    },
    
    startDay() {
        const dayData = this.route[this.state.day - 1];
        this.state.location = dayData.location;
        this.state.locationType = dayData.type;
        this.state.phase = 'morning';
        this.state.sceneTime = 0;
        this.state.travelOffset = 0;
        
        UI.updateDayInfo(this.state);
        
        if (this.state.day === 1) {
            this.day1Morning();
        } else if (this.state.day === 2) {
            this.day2Morning();
        } else if (this.state.day === 3) {
            this.day3Morning();
        } else {
            this.genericMorning();
        }
    },
    
    // DAY 1 - Stockholm
    day1Morning() {
        UI.showText(
            `JOUR 1 — STOCKHOLM — MATIN\n\nGare centrale de Stockholm. L'air sent le diesel et l'aventure. 20 scouts, sacs à dos neufs, sourires enthousiastes.\n\nTout est encore possible. Personne n'est mort.\n\nPour l'instant.`,
            [
                { text: 'Changer allure et rations', action: () => this.showTravelMenu() },
                { text: 'Acheter provisions', action: () => this.showShop() },
                { text: 'Partir vers Sigtuna', action: () => this.day1Afternoon() }
            ]
        );
    },
    
    // Oregon Trail travel menu
    showTravelMenu() {
        const paceInfo = {
            'relaxed': '15-20 km/jour • Moins de fatigue',
            'steady': '20-30 km/jour • Équilibré',
            'grueling': '30-45 km/jour • Épuisant'
        };
        
        const rationsInfo = {
            'filling': '3 kg/scout/jour • Bonne santé',
            'meager': '2 kg/scout/jour • Économique',
            'bare bones': '1 kg/scout/jour • Dangereux'
        };
        
        UI.showText(
            `RÉGLAGES DE VOYAGE\n\nAllure actuelle: ${paceInfo[this.state.pace]}\nRations actuelles: ${rationsInfo[this.state.rations]}\n\nModifier les réglages?`,
            [
                { text: 'Modifier l\'allure', action: () => this.changePace() },
                { text: 'Modifier les rations', action: () => this.changeRations() },
                { text: 'Retour', action: () => this.day1Morning() }
            ]
        );
    },
    
    changePace() {
        UI.showText(
            `CHOISIR L'ALLURE\n\nComment voulez-vous voyager?`,
            [
                { text: 'Tranquille (15-20 km/jour)', action: () => { this.setPace('relaxed'); this.showTravelMenu(); } },
                { text: 'Normale (20-30 km/jour)', action: () => { this.setPace('steady'); this.showTravelMenu(); } },
                { text: 'Forcée (30-45 km/jour)', action: () => { this.setPace('grueling'); this.showTravelMenu(); } }
            ]
        );
    },
    
    changeRations() {
        UI.showText(
            `CHOISIR LES RATIONS\n\nCombien nourrir le groupe?`,
            [
                { text: 'Normales (3 kg/scout/jour)', action: () => { this.setRations('filling'); this.showTravelMenu(); } },
                { text: 'Réduites (2 kg/scout/jour)', action: () => { this.setRations('meager'); this.showTravelMenu(); } },
                { text: 'Minimales (1 kg/scout/jour)', action: () => { this.setRations('bare bones'); this.showTravelMenu(); } }
            ]
        );
    },
    
    showShop() {
        UI.showText(
            `MAGASIN — STOCKHOLM\n\nVotre argent: ${this.state.money} SEK\nVotre nourriture: ${Math.floor(this.state.food)} kg\n\nQue voulez-vous acheter?`,
            [
                { text: 'Nourriture (50 kg = 100 SEK)', action: () => this.buyFood() },
                { text: 'Équipement médical (150 SEK)', action: () => this.buyMedkit() },
                { text: 'Retour', action: () => this.day1Morning() }
            ]
        );
    },
    
    buyFood() {
        if (this.state.money >= 100) {
            this.modifyResource('money', -100);
            this.modifyResource('food', 50);
            UI.showText(
                `Vous achetez 50 kg de nourriture.\n\n-100 SEK`,
                [{ text: 'Continuer', action: () => this.showShop() }]
            );
        } else {
            UI.showText(
                `Pas assez d'argent.`,
                [{ text: 'Retour', action: () => this.showShop() }]
            );
        }
    },
    
    buyMedkit() {
        if (this.state.money >= 150) {
            this.modifyResource('money', -150);
            // Add medical kit logic here
            UI.showText(
                `Trousse médicale achetée.\n\n-150 SEK`,
                [{ text: 'Continuer', action: () => this.showShop() }]
            );
        } else {
            UI.showText(
                `Pas assez d'argent.`,
                [{ text: 'Retour', action: () => this.showShop() }]
            );
        }
    },
    
    
    day1Afternoon() {
        this.state.phase = 'afternoon';
        UI.updateDayInfo(this.state);
        
        // Oregon Trail style travel
        const distance = this.calculateDailyDistance();
        const foodConsumed = this.consumeDailyFood();
        this.state.distanceToNext -= distance;
        this.state.distanceCovered += distance;
        
        // Weather affects health
        if (this.state.weather === 'storm' && Math.random() > 0.7) {
            this.modifyResource('health', -1);
        }
        
        // Check if we reached next location
        if (this.state.distanceToNext <= 0) {
            UI.showText(
                `SIGTUNA ATTEINT!\n\nVous avez parcouru ${distance} km aujourd'hui.\nNourriture consommée: ${foodConsumed} kg\n\nVous êtes arrivés à Sigtuna!`,
                [{ text: 'Continuer', action: () => this.day1Camp() }]
            );
        } else {
            // Trigger random event or continue
            if (Math.random() < 0.7) {
                Events.trigger(this.state, () => this.day1Camp());
            } else {
                UI.showText(
                    `L'après-midi se passe sans incident majeur.\n\nDistance parcourue: ${distance} km\nNourriture consommée: ${foodConsumed} kg\n\nProchain arrêt: ${Math.floor(this.state.distanceToNext)} km`,
                    [{ text: 'Continuer vers le camp', action: () => this.day1Camp() }]
                );
            }
        }
    },
    
    day1Camp() {
        this.state.phase = 'camp';
        UI.updateDayInfo(this.state);
        
        // Evening status report
        const healthStatus = {
            'good': 'Le groupe est en bonne santé.',
            'fair': 'Quelques scouts sont fatigués.',
            'poor': 'Le groupe souffre. Des blessures s\'accumulent.',
            'very poor': 'Plusieurs scouts sont malades. La situation est grave.'
        };
        
        UI.showText(
            `JOUR 1 — CAMP — SOIR\n\nPremier camp. Tentes montées maladroitement. Feu de camp crépitant.\n\n${healthStatus[this.state.health]}\n\nNourriture restante: ${Math.floor(this.state.food)} kg`,
            [
                { text: 'Pêcher (minijeu)', action: () => this.launchFishing() },
                { text: 'Chasse au lance-pierre', action: () => this.launchSlingshot() },
                { text: 'Repos et histoires', action: () => this.campStories() },
                { text: 'Dormir', action: () => this.endDay() }
            ]
        );
    },
    
    launchFishing() {
        if (!this.hasItem('Canne à pêche')) {
            UI.showText(
                `Pas de canne à pêche disponible.`,
                [{ text: 'Autre activité', action: () => this.day1Camp() }]
            );
            return;
        }
        
        Minigames.fishing((result) => {
            if (result > 0) {
                this.modifyResource('food', result * 5);
                UI.showText(
                    `Tu as attrapé ${result} poisson${result > 1 ? 's' : ''} ! +${result * 5} nourriture.\n\nLe groupe mange bien ce soir.`,
                    [{ text: 'Continuer', action: () => this.endDay() }]
                );
            } else {
                UI.showText(
                    `Aucune prise. Les poissons se moquent de toi.`,
                    [{ text: 'Continuer', action: () => this.endDay() }]
                );
            }
        });
    },
    
    campStories() {
        // Resting improves health slightly
        if (this.state.health !== 'good' && Math.random() > 0.6) {
            this.modifyResource('health', 1);
        }
        this.addJournalEntry('Jour 1 soir : Histoires autour du feu.');
        UI.showText(
            `Paka raconte l'histoire du radeau. "On va traverser des lacs en construisant nos propres radeaux."\n\nLe groupe applaudit. Chiakri tombe dans le feu. Personne n'est blessé.\n\n(Cette fois.)`,
            [{ text: 'Dormir', action: () => this.endDay() }]
        );
    },
    
    // DAY 2 - Sigtuna
    day2Morning() {
        this.state.distanceToNext = 70; // km to Uppsala
        UI.showText(
            `JOUR 2 — SIGTUNA — MATIN\n\nLa ville viking la plus ancienne de Suède. Pierres runiques, rues médiévales.\n\nOslo essaie de lire une rune. Il lit à l'envers. "Ça dit... 'danger' ?"\n\nNon, Oslo. Ça dit "boulangerie."`,
            [
                { text: 'Changer allure et rations', action: () => this.showTravelMenu2() },
                { text: 'Acheter provisions', action: () => this.showShop2() },
                { text: 'Partir vers Uppsala', action: () => this.day2Afternoon() }
            ]
        );
    },
    
    showTravelMenu2() {
        const paceInfo = {
            'relaxed': '15-20 km/jour',
            'steady': '20-30 km/jour',
            'grueling': '30-45 km/jour'
        };
        
        const rationsInfo = {
            'filling': '3 kg/scout/jour',
            'meager': '2 kg/scout/jour',
            'bare bones': '1 kg/scout/jour'
        };
        
        UI.showText(
            `RÉGLAGES\n\nAllure: ${paceInfo[this.state.pace]}\nRations: ${rationsInfo[this.state.rations]}`,
            [
                { text: 'Modifier l\'allure', action: () => this.changePace2() },
                { text: 'Modifier les rations', action: () => this.changeRations2() },
                { text: 'Retour', action: () => this.day2Morning() }
            ]
        );
    },
    
    changePace2() {
        UI.showText(
            `CHOISIR L'ALLURE`,
            [
                { text: 'Tranquille', action: () => { this.setPace('relaxed'); this.showTravelMenu2(); } },
                { text: 'Normale', action: () => { this.setPace('steady'); this.showTravelMenu2(); } },
                { text: 'Forcée', action: () => { this.setPace('grueling'); this.showTravelMenu2(); } }
            ]
        );
    },
    
    changeRations2() {
        UI.showText(
            `CHOISIR LES RATIONS`,
            [
                { text: 'Normales', action: () => { this.setRations('filling'); this.showTravelMenu2(); } },
                { text: 'Réduites', action: () => { this.setRations('meager'); this.showTravelMenu2(); } },
                { text: 'Minimales', action: () => { this.setRations('bare bones'); this.showTravelMenu2(); } }
            ]
        );
    },
    
    showShop2() {
        UI.showText(
            `MAGASIN — SIGTUNA\n\nArgent: ${this.state.money} SEK\nNourriture: ${Math.floor(this.state.food)} kg`,
            [
                { text: 'Acheter nourriture (50 kg = 100 SEK)', action: () => this.buyFood2() },
                { text: 'Retour', action: () => this.day2Morning() }
            ]
        );
    },
    
    buyFood2() {
        if (this.state.money >= 100) {
            this.modifyResource('money', -100);
            this.modifyResource('food', 50);
            UI.showText(`+50 kg, -100 SEK`, [{ text: 'Continuer', action: () => this.showShop2() }]);
        } else {
            UI.showText(`Pas assez d'argent.`, [{ text: 'Retour', action: () => this.showShop2() }]);
        }
    },
    
    day2Afternoon() {
        this.state.phase = 'afternoon';
        UI.updateDayInfo(this.state);
        
        const distance = this.calculateDailyDistance();
        const foodConsumed = this.consumeDailyFood();
        this.state.distanceToNext -= distance;
        this.state.distanceCovered += distance;
        
        Events.trigger(this.state, () => this.day2Camp());
    },
    
    day2Camp() {
        this.state.phase = 'camp';
        UI.updateDayInfo(this.state);
        
        const healthStatus = {
            'good': 'Tout le monde va bien.',
            'fair': 'Quelques scouts sont fatigués.',
            'poor': 'Le groupe souffre.',
            'very poor': 'Situation grave.'
        };
        
        UI.showText(
            `JOUR 2 — CAMP — SOIR\n\nCamp au bord d'un petit lac. ${healthStatus[this.state.health]}\n\nNourriture: ${Math.floor(this.state.food)} kg`,
            [
                { text: 'Pêcher', action: () => this.launchFishing() },
                { text: 'Chasse', action: () => this.launchSlingshot() },
                { text: 'Repos', action: () => this.restCamp() }
            ]
        );
    },
    
    launchSlingshot() {
        if (!this.hasItem('Lance-pierre')) {
            UI.showText(`Pas de lance-pierre.`, [{ text: 'Retour', action: () => this.day2Camp() }]);
            return;
        }
        
        Minigames.slingshot((result) => {
            if (result > 0) {
                this.modifyResource('food', result * 8);
                UI.showText(
                    `Tu as touché ${result} animal${result > 1 ? 'aux' : ''} ! +${result * 8} nourriture.\n\nChiakri a essayé. Il a touché un arbre.`,
                    [{ text: 'Continuer', action: () => this.endDay() }]
                );
            } else {
                UI.showText(
                    `Aucune prise. Les lapins suédois sont rapides.`,
                    [{ text: 'Continuer', action: () => this.endDay() }]
                );
            }
        });
    },
    
    restCamp() {
        if (this.state.health !== 'good' && Math.random() > 0.5) {
            this.modifyResource('health', 1);
        }
        UI.showText(
            `Nuit paisible. Aurores boréales dans le ciel.\n\nKana chante doucement. Jaguar dort déjà.`,
            [{ text: 'Jour suivant', action: () => this.endDay() }]
        );
    },
    
    // DAY 3 - Uppsala  
    day3Morning() {
        this.state.distanceToNext = 120; // km to Sala
        UI.showText(
            `JOUR 3 — UPPSALA — MATIN\n\nLa ville universitaire. Cathédrale massive.\n\nLe groupe est fatigué. Trois jours de marche.\n\nSanté du groupe: ${this.state.health}\nNourriture: ${Math.floor(this.state.food)} kg`,
            [
                { text: 'Changer réglages', action: () => this.showTravelMenu3() },
                { text: 'Acheter provisions', action: () => this.showShop3() },
                { text: 'Jour de repos', action: () => this.day3Rest() },
                { text: 'Partir vers Sala', action: () => this.day3Afternoon() }
            ]
        );
    },
    
    showTravelMenu3() {
        UI.showText(
            `RÉGLAGES\n\nAllure: ${this.state.pace}\nRations: ${this.state.rations}`,
            [
                { text: 'Modifier', action: () => this.changePace3() },
                { text: 'Retour', action: () => this.day3Morning() }
            ]
        );
    },
    
    changePace3() {
        UI.showText(`ALLURE`, [
            { text: 'Tranquille', action: () => { this.setPace('relaxed'); this.day3Morning(); } },
            { text: 'Normale', action: () => { this.setPace('steady'); this.day3Morning(); } },
            { text: 'Forcée', action: () => { this.setPace('grueling'); this.day3Morning(); } }
        ]);
    },
    
    showShop3() {
        UI.showText(
            `MAGASIN\n\nArgent: ${this.state.money} SEK`,
            [
                { text: 'Nourriture (50 kg = 100 SEK)', action: () => { 
                    if (this.state.money >= 100) { 
                        this.modifyResource('money', -100); 
                        this.modifyResource('food', 50); 
                        this.showShop3(); 
                    } else { 
                        this.day3Morning(); 
                    } 
                }},
                { text: 'Retour', action: () => this.day3Morning() }
            ]
        );
    },
    
    day3Rest() {
        this.modifyResource('health', 2);
        UI.showText(
            `Jour de repos à Uppsala. Le groupe se repose, répare le matériel.\n\nSanté améliorée!`,
            [{ text: 'Continuer', action: () => this.day3Afternoon() }]
        );
    },
    day3Afternoon() {
        this.state.phase = 'afternoon';
        UI.updateDayInfo(this.state);
        
        const distance = this.calculateDailyDistance();
        const foodConsumed = this.consumeDailyFood();
        this.state.distanceToNext -= distance;
        this.state.distanceCovered += distance;
        
        Events.trigger(this.state, () => this.day3Camp());
    },
    
    day3Camp() {
        this.state.phase = 'camp';
        UI.updateDayInfo(this.state);
        
        UI.showText(
            `JOUR 3 — CAMP — SOIR\n\nTrois jours accomplis.\n\nSanté: ${this.state.health}\nNourriture: ${Math.floor(this.state.food)} kg\n\nLa réalité s'installe : c'est long. C'est dur.`,
            [
                { text: 'Repos et chants', action: () => this.day3Sing() },
                { text: 'Pêche/chasse', action: () => this.launchFishing() },
                { text: 'Dormir', action: () => this.endDay() }
            ]
        );
    },
    
    day3Sing() {
        if (this.state.health !== 'good' && Math.random() > 0.5) {
            this.modifyResource('health', 1);
        }
        this.addJournalEntry('Jour 3 soir : Chants et repos.');
        UI.showText(
            `Kana prend la guitare. Le groupe chante.\n\n"Un kilomètre à pied..."\n\nMême Jaguar chante. Moral remonté.`,
            [{ text: 'Dormir', action: () => this.endDay() }]
        );
    },
    
    // Generic days for 4-14
    genericMorning() {
        UI.showText(
            `JOUR ${this.state.day} — ${this.state.location.toUpperCase()} — MATIN\n\nSanté: ${this.state.health}\nNourriture: ${Math.floor(this.state.food)} kg`,
            [
                { text: 'Réglages voyage', action: () => this.genericTravelMenu() },
                { text: 'Partir', action: () => this.genericAfternoon() }
            ]
        );
    },
    
    genericTravelMenu() {
        UI.showText(
            `Allure: ${this.state.pace}\nRations: ${this.state.rations}`,
            [
                { text: 'Modifier allure', action: () => this.genericChangePace() },
                { text: 'Modifier rations', action: () => this.genericChangeRations() },
                { text: 'Retour', action: () => this.genericMorning() }
            ]
        );
    },
    
    genericChangePace() {
        UI.showText(`ALLURE`, [
            { text: 'Tranquille', action: () => { this.setPace('relaxed'); this.genericMorning(); } },
            { text: 'Normale', action: () => { this.setPace('steady'); this.genericMorning(); } },
            { text: 'Forcée', action: () => { this.setPace('grueling'); this.genericMorning(); } }
        ]);
    },
    
    genericChangeRations() {
        UI.showText(`RATIONS`, [
            { text: 'Normales', action: () => { this.setRations('filling'); this.genericMorning(); } },
            { text: 'Réduites', action: () => { this.setRations('meager'); this.genericMorning(); } },
            { text: 'Minimales', action: () => { this.setRations('bare bones'); this.genericMorning(); } }
        ]);
    },
    
    genericAfternoon() {
        this.state.phase = 'afternoon';
        UI.updateDayInfo(this.state);
        
        const distance = this.calculateDailyDistance();
        const foodConsumed = this.consumeDailyFood();
        this.state.distanceToNext -= distance;
        this.state.distanceCovered += distance;
        
        Events.trigger(this.state, () => this.genericCamp());
    },
    
    genericCamp() {
        this.state.phase = 'camp';
        UI.updateDayInfo(this.state);
        
        UI.showText(
            `CAMP — SOIR\n\nSanté: ${this.state.health}\nNourriture: ${Math.floor(this.state.food)} kg`,
            [
                { text: 'Repos', action: () => { if (Math.random() > 0.6) this.modifyResource('health', 1); this.endDay(); } },
                { text: 'Chasse/pêche', action: () => this.launchFishing() }
            ]
        );
    },
    
    endDay() {
        // Check game over conditions
        if (this.state.scouts < 5) {
            this.gameOver('Plus assez de scouts. L\'expédition est annulée.');
            return;
        }
        
        if (this.state.food <= 0) {
            this.gameOver('La nourriture est épuisée. La famine n\'est pas une activité pédagogique.');
            return;
        }
        
        if (this.state.health === 'dead') {
            this.gameOver('Le groupe ne peut plus continuer. Trop de maladies.');
            return;
        }
        
        // Advance to next day
        this.state.day++;
        
        if (this.state.day > 14) {
            this.victory();
            return;
        }
        
        this.startDay();
    },
    
    gameOver(reason) {
        this.state.gameOver = true;
        UI.showText(
            `GAME OVER\n\n${reason}\n\nScouts survivants : ${this.state.scouts}/20\nJours accomplis : ${this.state.day - 1}/14\nDistance : ${this.state.distanceCovered} km`,
            [{ text: 'Recommencer', action: () => location.reload() }]
        );
    },
    
    victory() {
        this.state.victory = true;
        const rating = this.state.scouts === 20 ? 'IMPOSSIBLE. TU AS TRICHÉ. (Légendaire)' :
                      this.state.scouts >= 15 ? 'Grande Expédition' :
                      this.state.scouts >= 10 ? 'Expédition Difficile' :
                      'Catastrophe';
        
        UI.showText(
            `VICTOIRE !\n\nSTORLIEN ATTEINT !\n\nScouts survivants : ${this.state.scouts}/20\n${rating}\n\nVous avez parcouru 750 km à travers la Suède.\n\nBasé sur une histoire vraie.`,
            [{ text: 'Rejouer', action: () => location.reload() }]
        );
    },
    
    // Utility functions - Oregon Trail style
    modifyResource(resource, amount) {
        if (resource === 'scouts') {
            this.state.scouts = Math.max(0, Math.min(this.state.scouts + amount, this.state.maxScouts));
        } else if (resource === 'food' || resource === 'money') {
            this.state[resource] = Math.max(0, this.state[resource] + amount);
        } else if (resource === 'health') {
            // Health is text-based: good, fair, poor, very poor
            const healthLevels = ['dead', 'very poor', 'poor', 'fair', 'good'];
            const currentIndex = healthLevels.indexOf(this.state.health);
            const newIndex = Math.max(0, Math.min(currentIndex + amount, healthLevels.length - 1));
            this.state.health = healthLevels[newIndex];
        }
    },
    
    // Oregon Trail-style daily consumption
    consumeDailyFood() {
        let consumption = 0;
        
        // Base consumption per person per day (in pounds)
        if (this.state.rations === 'filling') {
            consumption = this.state.scouts * 3; // 3 lbs per person
        } else if (this.state.rations === 'meager') {
            consumption = this.state.scouts * 2; // 2 lbs per person
        } else if (this.state.rations === 'bare bones') {
            consumption = this.state.scouts * 1; // 1 lb per person
        }
        
        this.state.food -= consumption;
        
        // Health effects of rations
        if (this.state.rations === 'bare bones' && Math.random() > 0.7) {
            this.modifyResource('health', -1);
        } else if (this.state.rations === 'filling' && this.state.health !== 'good' && Math.random() > 0.8) {
            this.modifyResource('health', 1);
        }
        
        return consumption;
    },
    
    // Calculate travel distance based on pace and health
    calculateDailyDistance() {
        let baseDistance = this.state.kmPerDay;
        
        // Pace modifiers
        if (this.state.pace === 'relaxed') {
            baseDistance *= 0.7;
        } else if (this.state.pace === 'grueling') {
            baseDistance *= 1.5;
        }
        
        // Health modifiers
        if (this.state.health === 'fair') {
            baseDistance *= 0.9;
        } else if (this.state.health === 'poor') {
            baseDistance *= 0.7;
        } else if (this.state.health === 'very poor') {
            baseDistance *= 0.5;
        }
        
        // Weather modifiers
        if (this.state.weather === 'rain') {
            baseDistance *= 0.8;
        } else if (this.state.weather === 'storm') {
            baseDistance *= 0.5;
        } else if (this.state.weather === 'snow') {
            baseDistance *= 0.6;
        }
        
        return Math.round(baseDistance);
    },
    
    setPace(pace) {
        this.state.pace = pace;
        // Grueling pace damages health over time
        if (pace === 'grueling' && Math.random() > 0.6) {
            this.modifyResource('health', -1);
        }
    },
    
    setRations(rations) {
        this.state.rations = rations;
    },
    
    killScout(causeOfDeath) {
        if (this.state.scouts <= 0) return null;
        
        // Try to kill a non-hero first
        let victim = this.state.party.find(s => s.alive && !s.isHero);
        
        // If all non-heroes dead, pick a hero
        if (!victim) {
            const aliveHeroes = this.state.party.filter(s => s.alive && s.isHero);
            victim = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];
        }
        
        if (victim) {
            victim.alive = false;
            this.state.scouts--;
            this.state.deadScouts.push({ name: victim.name, cause: causeOfDeath });
            this.addJournalEntry(`${victim.name} : ${causeOfDeath}`);
            return victim.name;
        }
        
        return null;
    },
    
    addJournalEntry(text) {
        this.state.journalEntries.push({
            day: this.state.day,
            phase: this.state.phase,
            text: text
        });
    },
    
    hasItem(itemName) {
        return this.state.inventory.some(i => i.name.includes(itemName) && i.condition !== 'Cassé');
    },
    
    damageItem(itemName) {
        const item = this.state.inventory.find(i => i.name.includes(itemName));
        if (item) {
            if (item.condition === 'Bon') item.condition = 'Usé';
            else if (item.condition === 'Usé') item.condition = 'Abîmé';
            else item.condition = 'Cassé';
        }
    }
};

// Minigames namespace
const Minigames = {
    fishing(callback) {
        Game.state.inMinigame = true;
        const container = document.getElementById('minigame-container');
        container.classList.remove('hidden');
        
        let caught = 0;
        let attempts = 3;
        let waiting = false;
        let fishY = 0;
        let lineY = 150;
        
        container.innerHTML = `
            <div class="minigame-title">PÊCHE</div>
            <canvas class="minigame-canvas" id="fishing-canvas" width="400" height="300"></canvas>
            <div class="minigame-instructions">
                Clique quand la ligne est au niveau du poisson !<br>
                Tentatives restantes : <span id="attempts">${attempts}</span> | Prises : <span id="caught">${caught}</span>
            </div>
        `;
        
        const canvas = document.getElementById('fishing-canvas');
        const ctx = canvas.getContext('2d');
        
        const spawnFish = () => {
            fishY = 100 + Math.random() * 150;
            waiting = true;
            setTimeout(() => {
                waiting = false;
                attempts--;
                document.getElementById('attempts').textContent = attempts;
                if (attempts > 0) {
                    setTimeout(spawnFish, 1500);
                } else {
                    endGame();
                }
            }, 2000);
        };
        
        const endGame = () => {
            Game.state.inMinigame = false;
            container.classList.add('hidden');
            callback(caught);
        };
        
        canvas.addEventListener('click', () => {
            if (!waiting) return;
            
            const distance = Math.abs(lineY - fishY);
            if (distance < 20) {
                caught++;
                document.getElementById('caught').textContent = caught;
                waiting = false;
            }
        });
        
        const render = () => {
            ctx.fillStyle = '#6B8FA3';
            ctx.fillRect(0, 0, 400, 300);
            
            // Water
            ctx.fillStyle = '#4A6B8A';
            ctx.fillRect(0, 180, 400, 120);
            
            // Fishing line
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(200, 50);
            ctx.lineTo(200, lineY);
            ctx.stroke();
            
            // Hook
            ctx.fillStyle = '#888';
            ctx.fillRect(195, lineY - 5, 10, 10);
            
            // Fish (if waiting)
            if (waiting) {
                ctx.fillStyle = '#E87B35';
                ctx.fillRect(170, fishY - 10, 30, 20);
                ctx.fillStyle = '#000';
                ctx.fillRect(192, fishY - 5, 3, 3);
            }
            
            if (Game.state.inMinigame) requestAnimationFrame(render);
        };
        
        spawnFish();
        render();
    },
    
    slingshot(callback) {
        Game.state.inMinigame = true;
        const container = document.getElementById('minigame-container');
        container.classList.remove('hidden');
        
        let hit = 0;
        let shots = 5;
        let targets = [];
        
        container.innerHTML = `
            <div class="minigame-title">LANCE-PIERRE</div>
            <canvas class="minigame-canvas" id="slingshot-canvas" width="500" height="400"></canvas>
            <div class="minigame-instructions">
                Clique sur les animaux !<br>
                Pierres restantes : <span id="shots">${shots}</span> | Touchés : <span id="hit">${hit}</span>
            </div>
        `;
        
        const canvas = document.getElementById('slingshot-canvas');
        const ctx = canvas.getContext('2d');
        
        // Spawn targets
        for (let i = 0; i < 6; i++) {
            targets.push({
                x: 50 + Math.random() * 400,
                y: 50 + Math.random() * 300,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                alive: true
            });
        }
        
        canvas.addEventListener('click', (e) => {
            if (shots <= 0) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            shots--;
            document.getElementById('shots').textContent = shots;
            
            // Check hit
            for (let t of targets) {
                if (!t.alive) continue;
                const dist = Math.sqrt((t.x - x) ** 2 + (t.y - y) ** 2);
                if (dist < 20) {
                    t.alive = false;
                    hit++;
                    document.getElementById('hit').textContent = hit;
                    break;
                }
            }
            
            if (shots <= 0) {
                setTimeout(() => {
                    Game.state.inMinigame = false;
                    container.classList.add('hidden');
                    callback(hit);
                }, 1000);
            }
        });
        
        const render = () => {
            ctx.fillStyle = '#2D5016';
            ctx.fillRect(0, 0, 500, 400);
            
            // Ground
            ctx.fillStyle = '#4a7c3a';
            ctx.fillRect(0, 350, 500, 50);
            
            // Update and draw targets
            for (let t of targets) {
                if (!t.alive) continue;
                
                t.x += t.vx;
                t.y += t.vy;
                
                if (t.x < 20 || t.x > 480) t.vx *= -1;
                if (t.y < 20 || t.y > 330) t.vy *= -1;
                
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(t.x - 15, t.y - 10, 30, 20);
                ctx.fillStyle = '#000';
                ctx.fillRect(t.x + 8, t.y - 5, 3, 3);
            }
            
            if (Game.state.inMinigame) requestAnimationFrame(render);
        };
        
        render();
    }
};
