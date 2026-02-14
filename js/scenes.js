// Sweden Odyssey — ENHANCED 16-bit Pixel Art Scene Rendering
// Massively detailed authentic Swedish adventure game scenes

const Scenes = {
    render(ctx, state) {
        const type = state.locationType;
        const phase = state.phase;
        
        // Clear
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, Game.width, Game.height);
        
        // Draw sky with weather effects
        this.renderSky(ctx, state, phase);
        
        // Render based on location type and phase
        if (type === 'city') {
            this.renderCity(ctx, state, phase);
        } else if (type === 'town') {
            this.renderTown(ctx, state, phase);
        } else if (type === 'wilderness') {
            this.renderWilderness(ctx, state, phase);
        } else if (type === 'lake') {
            this.renderLake(ctx, state, phase);
        } else if (type === 'mountain') {
            this.renderMountain(ctx, state, phase);
        }
        
        // Weather overlay effects
        this.renderWeatherEffects(ctx, state);
        
        // Render scouts walking (if afternoon phase)
        if (phase === 'afternoon' && !state.currentEvent) {
            this.renderScoutsLine(ctx, state);
        }
        
        // Render particles (fire sparks, rain, snow, etc.)
        this.renderParticles(ctx, state);
    },
    
    // Enhanced sky rendering with clouds
    renderSky(ctx, state, phase) {
        // Base sky
        PixelArt.drawSky(ctx, Game.width, Game.height, phase);
        
        // Add clouds (moving)
        if (state.weather !== 'storm') {
            const cloudCount = state.weather === 'rain' ? 8 : 5;
            for (let i = 0; i < cloudCount; i++) {
                const x = (i * 220 - state.sceneTime * 5 + i * 30) % (Game.width + 100) - 50;
                const y = 30 + Math.sin(i * 2.3) * 40;
                const cloudSize = 0.6 + (Math.sin(i * 1.7) * 0.5 + 0.5) * 0.6;
                this.drawCloud(ctx, x, y, cloudSize, state.weather === 'rain');
            }
        }
        
        // Add birds in clear weather
        if (state.weather === 'clear' && phase !== 'camp') {
            for (let i = 0; i < 4; i++) {
                const x = (i * 300 - state.sceneTime * 30 + i * 60) % (Game.width + 200) - 100;
                const y = 80 + Math.sin(state.sceneTime * 2 + i) * 20;
                this.drawBird(ctx, x, y, state.sceneTime);
            }
        }
    },
    
    // CITY SCENE - Stockholm/Uppsala style with more details
    renderCity(ctx, state, phase) {
        // FURTHEST: Distant hills and church spires
        for (let i = 0; i < 3; i++) {
            const x = i * 350 - (state.travelOffset * 0.08) % 350;
            const y = Game.height - 380;
            this.drawDistantChurch(ctx, x + 150, y, 0.4);
        }
        
        // Far background - distant city skyline
        for (let i = 0; i < 7; i++) {
            const x = i * 160 - (state.travelOffset * 0.12) % 160;
            const h = 80 + Math.sin(i * 1.4) * 35;
            const y = Game.height - 320;
            
            PixelArt.drawBuilding(
                ctx, x, y, 140, h,
                [PixelArt.palette.stone[1], PixelArt.palette.stone[2]],
                [PixelArt.palette.stone[2], PixelArt.palette.stone[3]],
                phase === 'camp' ? PixelArt.palette.campfireAmber : 'rgba(200, 220, 255, 0.2)'
            );
        }
        
        // Middle layer - main city buildings with variety
        for (let i = 0; i < 5; i++) {
            const x = i * 240 - (state.travelOffset * 0.4) % 240;
            const buildingType = i % 5;
            let h, roofColors, wallColors;
            
            if (buildingType === 0) {
                // Tall apartment building
                h = 220;
                roofColors = [PixelArt.palette.stone[2], PixelArt.palette.stone[3]];
                wallColors = ['#D4B896', '#C4A886', '#B49876'];
            } else if (buildingType === 1) {
                // Classic Swedish building (tan/cream)
                h = 180;
                roofColors = ['#8B4513', '#654321'];
                wallColors = ['#E8D4B4', '#D8C4A4', '#C8B494'];
            } else if (buildingType === 2) {
                // White modern building
                h = 200;
                roofColors = ['#666666', '#555555'];
                wallColors = ['#F0E8D8', '#E0D8C8', '#D0C8B8'];
            } else if (buildingType === 3) {
                // Orange/terracotta building
                h = 190;
                roofColors = ['#CC6633', '#994422'];
                wallColors = ['#E8B896', '#D8A886', '#C89876'];
            } else {
                // Grey stone building
                h = 210;
                roofColors = ['#777777', '#666666'];
                wallColors = ['#AAAAAA', '#999999', '#888888'];
            }
            
            const y = Game.height - h - 80;
            
            PixelArt.drawBuilding(
                ctx, x, y, 210, h,
                roofColors,
                wallColors,
                phase === 'camp' ? PixelArt.palette.campfireAmber : 'rgba(180, 200, 255, 0.4)'
            );
            
            // Add chimneys
            this.drawChimney(ctx, x + 40, y - 8, phase);
            if (i % 2 === 0) {
                this.drawChimney(ctx, x + 150, y - 8, phase);
            }
            
            // Add balconies (Swedish detail)
            if (i % 3 === 0) {
                for (let b = 0; b < 3; b++) {
                    const balconyY = y + 60 + b * 40;
                    this.drawBalcony(ctx, x + 180, balconyY);
                }
            }
        }
        
        // Near layer - street-level details
        const groundY = Game.height - 80;
        
        // Cobblestone street
        PixelArt.drawPixelRect(ctx, 0, groundY, Game.width, 80, PixelArt.palette.stone[1]);
        
        // Cobblestone pattern (deterministic)
        for (let y = 0; y < 80; y += 8) {
            for (let x = 0; x < Game.width; x += 8) {
                const stoneX = (x - state.travelOffset * 1.2) % Game.width;
                const pattern = Math.sin(x * 0.3) * Math.cos(y * 0.2);
                if (pattern > 0.3) {
                    PixelArt.drawPixelRect(ctx, stoneX, groundY + y, 7, 7, PixelArt.palette.stone[2]);
                    PixelArt.drawPixelRect(ctx, stoneX + 1, groundY + y + 1, 5, 5, PixelArt.palette.stone[0]);
                }
            }
        }
        
        // Streetlamps
        for (let i = 0; i < 8; i++) {
            const x = i * 130 - (state.travelOffset * 1.1) % 130;
            this.drawStreetlamp(ctx, x, groundY - 10, phase === 'camp');
        }
        
        // Park benches
        for (let i = 0; i < 5; i++) {
            const x = i * 210 - (state.travelOffset * 1.1) % 210 + 80;
            this.drawBench(ctx, x, groundY + 25);
        }
        
        // Trees along street (deciduous)
        for (let i = 0; i < 6; i++) {
            const x = i * 180 - (state.travelOffset * 1.05) % 180 + 50;
            this.drawDeciduousTree(ctx, x, groundY - 5, 0.6);
        }
        
        // Campfire if camp phase
        if (phase === 'camp') {
            // Urban camping (parking lot or courtyard)
            PixelArt.drawCampfire(ctx, Game.width / 2, groundY + 15, state.sceneTime);
            
            // Tents clustered
            this.drawTent(ctx, Game.width / 2 - 150, groundY - 30);
            this.drawTent(ctx, Game.width / 2 + 150, groundY - 30);
            this.drawTent(ctx, Game.width / 2 - 100, groundY - 55);
            this.drawTent(ctx, Game.width / 2 + 100, groundY - 55);
            this.drawTent(ctx, Game.width / 2 - 200, groundY - 15);
            this.drawTent(ctx, Game.width / 2 + 200, groundY - 15);
        }
    },
    
    // TOWN SCENE - Small Swedish town with red wooden houses
    renderTown(ctx, state, phase) {
        // Far background - forest edge
        const forestY = Game.height - 320;
        PixelArt.drawPixelRect(ctx, 0, forestY, Game.width, 120, PixelArt.palette.pineGreen[1]);
        
        for (let i = 0; i < 25; i++) {
            const x = (i * 45 - state.travelOffset * 0.15) % (Game.width + 100);
            const y = forestY + 10 + Math.sin(i * 0.6) * 25;
            this.drawSmallTree(ctx, x, y, 0.5);
        }
        
        // Middle layer - Swedish town buildings (varied types)
        for (let i = 0; i < 6; i++) {
            const x = i * 180 - (state.travelOffset * 0.5) % 180 - 20;
            const y = Game.height - 190;
            const buildingType = i % 4;
            
            if (buildingType === 0) {
                // Classic red Swedish wooden house (Falu röd)
                this.drawSwedishRedHouse(ctx, x, y, 120, 110);
            } else if (buildingType === 1) {
                // Yellow wooden house (common in Sweden)
                this.drawSwedishYellowHouse(ctx, x, y, 130, 100);
            } else if (buildingType === 2) {
                // Small shop/store
                PixelArt.drawBuilding(
                    ctx, x, y, 140, 95,
                    ['#8B6633', '#6B4622'],
                    ['#E8D4B4', '#D8C4A4', '#C8B494'],
                    phase === 'camp' ? PixelArt.palette.campfireAmber : 'rgba(200, 220, 255, 0.3)'
                );
                // Store sign
                PixelArt.drawPixelRect(ctx, x + 10, y + 40, 30, 15, '#6B4622');
                PixelArt.drawPixelRect(ctx, x + 12, y + 42, 26, 11, '#E8D4B4');
            } else {
                // Church with steeple
                this.drawSmallChurch(ctx, x, y - 30);
            }
            
            // Swedish flag on some buildings
            if (i % 3 === 0) {
                this.drawSwedishFlag(ctx, x + 20, y - 15, 0.4);
            }
        }
        
        // Ground - grass with wildflowers
        const groundY = Game.height - 90;
        PixelArt.drawGrassTile(ctx, 0, groundY, Game.width, 90);
        
        // Wildflowers (Swedish wildflowers - daisies, lupines)
        for (let i = 0; i < 40; i++) {
            const x = (i * 25 - state.travelOffset * 1.0) % Game.width;
            const y = groundY + 15 + (Math.sin(i * 2.8) * 0.5 + 0.5) * 30;
            this.drawWildflower(ctx, x, y, i);
        }
        
        // Dirt path through town
        PixelArt.drawPixelRect(ctx, 0, groundY + 25, Game.width, 35, PixelArt.palette.dirt[1]);
        
        // Path details (ruts, stones)
        for (let i = 0; i < Game.width; i += 8) {
            const pathX = (i - state.travelOffset * 1.2) % Game.width;
            PixelArt.drawPixelRect(ctx, pathX, groundY + 27, 5, 2, PixelArt.palette.dirt[2]);
            PixelArt.drawPixelRect(ctx, pathX + 2, groundY + 32, 4, 2, PixelArt.palette.dirt[0]);
            
            // Small stones
            if (Math.sin(i * 0.5) > 0.6) {
                PixelArt.drawPixelRect(ctx, pathX + 3, groundY + 30, 3, 3, PixelArt.palette.stone[2]);
            }
        }
        
        // Wooden fence along path
        for (let i = 0; i < 15; i++) {
            const x = i * 70 - (state.travelOffset * 1.1) % 70;
            this.drawWoodenFence(ctx, x, groundY + 5);
        }
        
        // Birch trees (very Swedish!)
        for (let i = 0; i < 8; i++) {
            const x = (i * 130 - state.travelOffset * 0.9) % (Game.width + 130);
            const y = groundY - 5;
            this.drawBirchTree(ctx, x, y, 0.7);
        }
        
        // Campfire if camp phase
        if (phase === 'camp') {
            PixelArt.drawCampfire(ctx, Game.width / 2, groundY + 30, state.sceneTime);
            
            // Tents in meadow
            this.drawTent(ctx, Game.width / 2 - 140, groundY);
            this.drawTent(ctx, Game.width / 2 + 120, groundY);
            this.drawTent(ctx, Game.width / 2 - 80, groundY - 20);
            this.drawTent(ctx, Game.width / 2 + 60, groundY - 20);
            
            // Scouts sitting around (silhouettes)
            this.drawSittingScout(ctx, Game.width / 2 - 50, groundY + 25);
            this.drawSittingScout(ctx, Game.width / 2 + 40, groundY + 25);
        }
    },
    
    // WILDERNESS SCENE - Deep Swedish forest with lots of detail
    renderWilderness(ctx, state, phase) {
        // FURTHEST: Distant mountain ridge
        for (let i = 0; i < 4; i++) {
            const x = i * 300 - (state.travelOffset * 0.05) % 300 - 50;
            const y = Game.height - 350;
            PixelArt.drawMountain(
                ctx, x, y, 350, 120,
                PixelArt.palette.mountain,
                [PixelArt.palette.mountain[0], PixelArt.palette.mountain[1]],
                PixelArt.palette.snow
            );
        }
        
        // Far background - rolling forest hills
        for (let i = 0; i < 3; i++) {
            const x = i * 400 - (state.travelOffset * 0.1) % 400;
            const y = Game.height - 280 + Math.sin(i * 1.2) * 20;
            const w = 450;
            const h = 80;
            
            // Hill shape
            ctx.fillStyle = PixelArt.palette.pineGreen[1];
            ctx.beginPath();
            ctx.moveTo(x, y + h);
            ctx.quadraticCurveTo(x + w / 2, y, x + w, y + h);
            ctx.lineTo(x, y + h);
            ctx.closePath();
            ctx.fill();
        }
        
        // Far forest - distant trees
        for (let i = 0; i < 30; i++) {
            const x = (i * 35 - state.travelOffset * 0.2) % (Game.width + 100);
            const y = Game.height - 250 + Math.sin(i * 0.7) * 20;
            this.drawSmallTree(ctx, x, y, 0.4);
        }
        
        // Mid forest layer - medium trees with variety
        for (let i = 0; i < 12; i++) {
            const x = (i * 90 - state.travelOffset * 0.45) % (Game.width + 120);
            const y = Game.height - 210;
            const treeType = Math.floor(Math.sin(i * 3.7) * 0.5 + 0.5) * 3;
            
            if (treeType === 0) {
                this.drawBigTree(ctx, x, y, 0.6);
            } else if (treeType === 1) {
                this.drawBirchTree(ctx, x, y, 0.6);
            } else {
                this.drawDeciduousTree(ctx, x, y, 0.5);
            }
        }
        
        // Near forest layer - big close trees
        for (let i = 0; i < 8; i++) {
            const x = (i * 140 - state.travelOffset * 0.95) % (Game.width + 180);
            const y = Game.height - 160;
            const treeType = Math.floor(Math.sin(i * 2.3) * 0.5 + 0.5) * 3;
            
            if (treeType < 2) {
                this.drawBigTree(ctx, x, y, 0.95);
            } else {
                this.drawBirchTree(ctx, x, y, 0.9);
            }
        }
        
        // Forest floor - rich undergrowth
        const groundY = Game.height - 100;
        PixelArt.drawPixelRect(ctx, 0, groundY, Game.width, 100, PixelArt.palette.pineGreen[0]);
        
        // Moss patches (deterministic, thick coverage)
        for (let i = 0; i < 40; i++) {
            const x = (i * 28 - state.travelOffset * 0.75) % Game.width;
            const y = groundY + 8 + Math.sin(i * 1.8) * 20;
            const size = 18 + (Math.sin(i * 2.1) * 0.5 + 0.5) * 25;
            const colorIndex = Math.floor((Math.sin(i * 1.9) * 0.5 + 0.5) * 4);
            PixelArt.drawPixelRect(ctx, x, y, size, size * 0.7, PixelArt.palette.moss[colorIndex]);
        }
        
        // Ferns (lots of them)
        for (let i = 0; i < 30; i++) {
            const x = (i * 35 - state.travelOffset * 0.85) % Game.width;
            const y = groundY + 25;
            this.drawFern(ctx, x, y);
        }
        
        // Mushrooms (Swedish forest detail)
        for (let i = 0; i < 15; i++) {
            const x = (i * 70 - state.travelOffset * 0.8) % Game.width;
            const y = groundY + 40 + (Math.sin(i * 2.7) * 0.5 + 0.5) * 30;
            this.drawMushroom(ctx, x, y, i);
        }
        
        // Fallen logs
        for (let i = 0; i < 4; i++) {
            const x = (i * 250 - state.travelOffset * 0.9) % Game.width;
            const y = groundY + 35;
            this.drawFallenLog(ctx, x, y);
        }
        
        // Boulders
        for (let i = 0; i < 10; i++) {
            const x = (i * 110 - state.travelOffset * 0.88) % Game.width;
            const y = groundY + 30 + (Math.sin(i * 2.2) * 0.5 + 0.5) * 40;
            const size = 15 + (Math.sin(i * 3.1) * 0.5 + 0.5) * 20;
            this.drawBoulder(ctx, x, y, size);
        }
        
        // Small stream crossing
        const streamX = (state.travelOffset * 0.6) % 300;
        if (streamX < Game.width) {
            this.drawSmallStream(ctx, streamX, groundY + 20, state.sceneTime);
        }
        
        // Campfire if camp phase
        if (phase === 'camp') {
            // Clear a nice space
            PixelArt.drawPixelRect(ctx, Game.width / 2 - 220, groundY, 440, 100, PixelArt.palette.pineGreen[0]);
            
            // Big campfire
            PixelArt.drawCampfire(ctx, Game.width / 2, groundY + 45, state.sceneTime);
            
            // Log seats around fire
            this.drawLogSeat(ctx, Game.width / 2 - 80, groundY + 55);
            this.drawLogSeat(ctx, Game.width / 2 + 60, groundY + 55);
            
            // Tents in forest clearing
            this.drawTent(ctx, Game.width / 2 - 180, groundY + 15);
            this.drawTent(ctx, Game.width / 2 + 150, groundY + 15);
            this.drawTent(ctx, Game.width / 2 - 120, groundY - 10);
            this.drawTent(ctx, Game.width / 2 + 90, groundY - 10);
            this.drawTent(ctx, Game.width / 2 - 60, groundY - 30);
            this.drawTent(ctx, Game.width / 2 + 30, groundY - 30);
            
            // Backpacks leaning against trees
            this.drawBackpackLeaning(ctx, Game.width / 2 - 200, groundY + 30);
            this.drawBackpackLeaning(ctx, Game.width / 2 + 180, groundY + 30);
            
            // Fireflies (controlled spawn)
            if (state.particles.length < 25 && Math.random() < 0.06) {
                state.particles.push({
                    x: Game.width / 2 - 220 + Math.random() * 440,
                    y: groundY - 60 + Math.random() * 60,
                    vx: (Math.random() - 0.5) * 15,
                    vy: (Math.random() - 0.5) * 15,
                    life: 2 + Math.random() * 3,
                    color: '#FFFF99',
                    size: 3
                });
            }
        }
        
        // Wildlife - deer or moose silhouette in distance
        if (phase === 'afternoon' && Math.sin(state.sceneTime * 0.5) > 0.8) {
            const animalX = Game.width * 0.7;
            const animalY = Game.height - 240;
            this.drawDeerSilhouette(ctx, animalX, animalY);
        }
    },
    
    // LAKE SCENE - Swedish lake with rich details
    renderLake(ctx, state, phase) {
        // Far shore - mountains
        for (let i = 0; i < 3; i++) {
            const x = i * 400 - (state.travelOffset * 0.08) % 400 - 100;
            const y = Game.height - 400;
            PixelArt.drawMountain(
                ctx, x, y, 450, 160,
                PixelArt.palette.mountain,
                [PixelArt.palette.mountain[0], PixelArt.palette.mountain[1]],
                PixelArt.palette.snow
            );
        }
        
        // Far shore with forest
        const farShoreY = Game.height - 370;
        PixelArt.drawPixelRect(ctx, 0, farShoreY, Game.width, 90, PixelArt.palette.pineGreen[1]);
        
        for (let i = 0; i < 20; i++) {
            const x = (i * 55 - state.travelOffset * 0.15) % (Game.width + 70);
            this.drawSmallTree(ctx, x, farShoreY + 12, 0.5);
        }
        
        // Cabins on far shore (Swedish stugor)
        for (let i = 0; i < 3; i++) {
            const x = i * 350 - (state.travelOffset * 0.15) % 350 + 100;
            this.drawSwedishCabin(ctx, x, farShoreY + 30, 0.3);
        }
        
        // Water (main feature) - beautiful Swedish lake
        const waterY = Game.height - 280;
        PixelArt.drawWater(ctx, 0, waterY, Game.width, 200, state.sceneTime);
        
        // Reflections of distant shore
        ctx.save();
        ctx.globalAlpha = 0.3;
        for (let i = 0; i < 8; i++) {
            const x = (i * 130 - state.travelOffset * 0.15) % Game.width;
            const refY = waterY + 20 + Math.sin(state.sceneTime + i) * 2;
            ctx.fillStyle = PixelArt.palette.pineGreen[2];
            ctx.fillRect(x, refY, 50, 40 + Math.sin(state.sceneTime * 2 + i) * 8);
        }
        ctx.restore();
        
        // Lily pads (Swedish lake detail)
        for (let i = 0; i < 20; i++) {
            const x = (i * 50 - state.travelOffset * 0.4) % Game.width;
            const y = waterY + 80 + Math.sin(state.sceneTime + i) * 5;
            this.drawLilyPad(ctx, x, y);
        }
        
        // Reeds (lots of them, near shore)
        for (let i = 0; i < 35; i++) {
            const x = (i * 30 - state.travelOffset * 0.65) % Game.width;
            const y = Game.height - 110 + Math.sin(state.sceneTime * 2 + i) * 4;
            this.drawReed(ctx, x, y, state.sceneTime);
        }
        
        // Cattails
        for (let i = 0; i < 20; i++) {
            const x = (i * 52 - state.travelOffset * 0.7) % Game.width;
            const y = Game.height - 100;
            this.drawCattail(ctx, x, y);
        }
        
        // Shore/beach
        const shoreY = Game.height - 80;
        PixelArt.drawPixelRect(ctx, 0, shoreY, Game.width, 80, PixelArt.palette.dirt[2]);
        
        // Sandy patches
        for (let i = 0; i < 15; i++) {
            const x = (i * 70 - state.travelOffset * 0.82) % Game.width;
            const y = shoreY + 10 + (Math.sin(i * 2.4) * 0.5 + 0.5) * 30;
            const w = 30 + (Math.sin(i * 3.1) * 0.5 + 0.5) * 40;
            ctx.fillStyle = '#D4C4A4';
            ctx.fillRect(x, y, w, 15 + Math.sin(i) * 8);
        }
        
        // Rocks on shore (deterministic, varied sizes)
        for (let i = 0; i < 25; i++) {
            const x = (i * 45 - state.travelOffset * 0.85) % Game.width;
            const y = shoreY + 18 + (Math.sin(i * 3.2) * 0.5 + 0.5) * 35;
            const size = 6 + (Math.sin(i * 2.1) * 0.5 + 0.5) * 15;
            this.drawBoulder(ctx, x, y, size);
        }
        
        // Driftwood
        for (let i = 0; i < 6; i++) {
            const x = (i * 180 - state.travelOffset * 0.88) % Game.width;
            const y = shoreY + 25;
            this.drawDriftwood(ctx, x, y);
        }
        
        // Wooden dock/pier
        const dockX = (state.travelOffset * 0.3) % 400;
        if (dockX < Game.width) {
            this.drawWoodenDock(ctx, dockX, waterY + 80);
        }
        
        // Fishing rod leaning (Swedish tradition)
        if (phase !== 'afternoon') {
            this.drawFishingRod(ctx, Game.width * 0.7, shoreY + 20);
        }
        
        // Campfire if camp phase
        if (phase === 'camp') {
            PixelArt.drawCampfire(ctx, Game.width / 2, shoreY + 18, state.sceneTime);
            
            // Tents along shore
            this.drawTent(ctx, Game.width / 2 - 150, shoreY - 25);
            this.drawTent(ctx, Game.width / 2 + 130, shoreY - 25);
            this.drawTent(ctx, Game.width / 2 - 90, shoreY - 45);
            this.drawTent(ctx, Game.width / 2 + 70, shoreY - 45);
            
            // Cooking pot on fire
            this.drawCookingPot(ctx, Game.width / 2 + 15, shoreY + 5);
        }
    },
    
    // MOUNTAIN SCENE - Scandinavian mountains with alpine details
    renderMountain(ctx, state, phase) {
        // FURTHEST: Distant peaks (Norwegian border mountains)
        for (let i = 0; i < 5; i++) {
            const x = i * 280 - (state.travelOffset * 0.05) % 280 - 100;
            const y = Game.height - 420;
            PixelArt.drawMountain(
                ctx, x, y, 350, 280,
                PixelArt.palette.mountain,
                [PixelArt.palette.mountain[0], PixelArt.palette.mountain[1]],
                PixelArt.palette.snow
            );
        }
        
        // Far mountain range
        for (let i = 0; i < 4; i++) {
            const x = i * 350 - (state.travelOffset * 0.1) % 350 - 80;
            const y = Game.height - 360;
            PixelArt.drawMountain(
                ctx, x, y, 420, 250,
                PixelArt.palette.stone,
                [PixelArt.palette.stone[0], PixelArt.palette.stone[1]],
                PixelArt.palette.snow
            );
        }
        
        // Mid mountains with more snow
        for (let i = 0; i < 3; i++) {
            const x = i * 480 - (state.travelOffset * 0.25) % 480 - 60;
            const y = Game.height - 280;
            PixelArt.drawMountain(
                ctx, x, y, 550, 200,
                PixelArt.palette.stone,
                [PixelArt.palette.stone[0], PixelArt.palette.stone[1]],
                PixelArt.palette.snow
            );
        }
        
        // Alpine meadow patches (between snow)
        for (let i = 0; i < 8; i++) {
            const x = (i * 130 - state.travelOffset * 0.5) % Game.width;
            const y = Game.height - 200 + Math.sin(i * 0.9) * 35;
            const w = 70 + (Math.sin(i * 2.1) * 0.5 + 0.5) * 60;
            
            // Green meadow patch
            ctx.fillStyle = PixelArt.palette.moss[2];
            ctx.fillRect(x, y, w, 30 + Math.sin(i * 1.7) * 15);
            
            // Alpine flowers (tiny specks of color)
            for (let f = 0; f < 8; f++) {
                const fx = x + (Math.sin(f * 4.2 + i) * 0.5 + 0.5) * w;
                const fy = y + (Math.sin(f * 3.7 + i) * 0.5 + 0.5) * 20;
                const flowerColor = ['#FF6B9D', '#FFFF66', '#66B3FF', '#FFFFFF'][f % 4];
                PixelArt.drawPixel(ctx, fx, fy, flowerColor, 2);
            }
        }
        
        // Snow fields (extensive, deterministic)
        for (let i = 0; i < 15; i++) {
            const x = (i * 75 - state.travelOffset * 0.55) % Game.width;
            const y = Game.height - 190 + Math.sin(i * 0.8) * 45;
            const w = 70 + (Math.sin(i * 1.9) * 0.5 + 0.5) * 90;
            const h = 35 + (Math.sin(i * 2.3) * 0.5 + 0.5) * 30;
            
            // Snow patch with depth
            PixelArt.drawPixelRect(ctx, x, y, w, h, PixelArt.palette.snow[1]);
            PixelArt.drawPixelRect(ctx, x + 5, y + 5, w - 10, h - 10, PixelArt.palette.snow[2]);
            PixelArt.drawPixelRect(ctx, x + 10, y + 10, w - 20, h - 15, PixelArt.palette.snow[3]);
            
            // Snow sparkles (deterministic)
            for (let j = 0; j < 6; j++) {
                const sx = x + 12 + (Math.sin((i + j) * 4.2) * 0.5 + 0.5) * (w - 24);
                const sy = y + 8 + (Math.sin((i + j) * 3.7) * 0.5 + 0.5) * (h - 16);
                PixelArt.drawPixel(ctx, sx, sy, PixelArt.palette.snow[3], 2);
            }
        }
        
        // Rocky ground with scree
        const groundY = Game.height - 110;
        PixelArt.drawPixelRect(ctx, 0, groundY, Game.width, 110, PixelArt.palette.stone[1]);
        
        // Scree (loose rocks)
        for (let i = 0; i < 40; i++) {
            const x = (i * 28 - state.travelOffset * 0.92) % Game.width;
            const y = groundY + 12 + (Math.sin(i * 2.8) * 0.5 + 0.5) * 70;
            const size = 5 + (Math.sin(i * 3.4) * 0.5 + 0.5) * 12;
            
            ctx.fillStyle = PixelArt.palette.stone[Math.floor((Math.sin(i * 1.9) * 0.5 + 0.5) * 3)];
            ctx.fillRect(x, y, size, size * 0.9);
        }
        
        // Larger boulders
        for (let i = 0; i < 15; i++) {
            const x = (i * 75 - state.travelOffset * 0.88) % Game.width;
            const y = groundY + 20 + (Math.sin(i * 2.2) * 0.5 + 0.5) * 55;
            const size = 18 + (Math.sin(i * 3.1) * 0.5 + 0.5) * 30;
            this.drawBoulder(ctx, x, y, size);
        }
        
        // Hardy mountain shrubs
        for (let i = 0; i < 18; i++) {
            const x = (i * 60 - state.travelOffset * 0.85) % Game.width;
            const y = groundY + 30;
            this.drawMountainShrub(ctx, x, y);
        }
        
        // Mountain goats or reindeer in distance
        if (Math.sin(state.sceneTime * 0.3) > 0.7) {
            const animalX = Game.width * 0.3;
            const animalY = Game.height - 190;
            this.drawReindeerSilhouette(ctx, animalX, animalY);
        }
        
        // Hiking trail markers (Swedish trail marker - orange)
        for (let i = 0; i < 5; i++) {
            const x = i * 220 - (state.travelOffset * 0.9) % 220;
            this.drawTrailMarker(ctx, x, groundY + 15);
        }
        
        // Campfire if camp phase (sheltered spot)
        if (phase === 'camp') {
            // Wind shelter made of rocks
            this.drawStoneWindShelter(ctx, Game.width / 2, groundY + 25);
            
            // Fire inside shelter
            PixelArt.drawCampfire(ctx, Game.width / 2, groundY + 35, state.sceneTime);
            
            // Tents secured with extra guy-lines (windy mountain)
            this.drawTent(ctx, Game.width / 2 - 160, groundY - 5);
            this.drawTent(ctx, Game.width / 2 + 140, groundY - 5);
            this.drawTent(ctx, Game.width / 2 - 100, groundY - 25);
            this.drawTent(ctx, Game.width / 2 + 80, groundY - 25);
            
            // Extra guy-lines visible
            ctx.strokeStyle = PixelArt.palette.stone[3];
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(Game.width / 2 - 170, groundY - 10);
            ctx.lineTo(Game.width / 2 - 210, groundY + 20);
            ctx.stroke();
        }
        
        // Morning mist (controlled spawn, mountain fog)
        if (phase === 'morning' && state.particles.length < 18) {
            if (Math.random() < 0.03) {
                state.particles.push({
                    x: Math.random() * Game.width,
                    y: groundY - 120 + Math.random() * 100,
                    vx: 8 + Math.random() * 12,
                    vy: -1 + Math.random() * 3,
                    life: 8 + Math.random() * 8,
                    color: 'rgba(240, 245, 250, 0.30)',
                    size: 60 + Math.random() * 80
                });
            }
        }
    },
    
    // Weather overlay effects (rain, snow, etc.)
    renderWeatherEffects(ctx, state) {
        if (state.weather === 'rain') {
            // Rain streaks
            if (state.particles.length < 80 && Math.random() < 0.4) {
                state.particles.push({
                    x: Math.random() * Game.width,
                    y: -10,
                    vx: -20 - Math.random() * 10,
                    vy: 200 + Math.random() * 100,
                    life: 1.5,
                    color: 'rgba(180, 200, 220, 0.4)',
                    size: 1,
                    type: 'rain'
                });
            }
        } else if (state.weather === 'storm') {
            // Heavy rain
            if (state.particles.length < 120 && Math.random() < 0.6) {
                state.particles.push({
                    x: Math.random() * Game.width,
                    y: -10,
                    vx: -40 - Math.random() * 20,
                    vy: 300 + Math.random() * 150,
                    life: 1.2,
                    color: 'rgba(160, 180, 200, 0.5)',
                    size: 2,
                    type: 'rain'
                });
            }
        } else if (state.weather === 'snow') {
            // Snowflakes
            if (state.particles.length < 60 && Math.random() < 0.3) {
                state.particles.push({
                    x: Math.random() * Game.width,
                    y: -10,
                    vx: (Math.random() - 0.5) * 30,
                    vy: 30 + Math.random() * 40,
                    life: 5 + Math.random() * 5,
                    color: '#FFFFFF',
                    size: 3 + Math.random() * 2,
                    type: 'snow'
                });
            }
        }
    },
    
    // SCOUT LINE - render walking scouts (already good, keep as is)
    renderScoutsLine(ctx, state) {
        const scoutCount = Math.min(state.scouts, 12);
        const spacing = 45;
        const baseY = Game.height - 105;
        const baseX = 120;
        
        const hasRainCover = (state.weather === 'rain' || state.weather === 'storm');
        
        const rainCoverColors = [
            PixelArt.palette.scoutRed,
            '#66CC66',
            '#FFCC00',
            '#6666FF'
        ];
        
        const normalBackpackColors = [
            '#2a2a2a', '#1a3a4a', '#3a2a1a',
            '#2a1a2a', '#1a2a1a', '#4a3a2a'
        ];
        
        const accentColors = [
            '#CC3333', '#4a8a4a', '#8a6a3a', '#4a6a8a'
        ];
        
        for (let i = 0; i < scoutCount; i++) {
            const x = baseX + i * spacing;
            const walkCycle = Math.floor(state.sceneTime * 4 + i * 0.5) % 3;
            const bobOffset = Math.sin(state.sceneTime * 4 + i * 0.5) * 2;
            const y = baseY + bobOffset;
            
            let sprite;
            if (walkCycle === 0) {
                sprite = PixelArt.sprites.scoutWalk1;
            } else if (walkCycle === 1) {
                sprite = PixelArt.sprites.scoutFront;
            } else {
                sprite = PixelArt.sprites.scoutWalk2;
            }
            
            const colorMap = {
                0: null,
                1: PixelArt.palette.scoutRed,
                2: PixelArt.palette.scoutOrange,
                3: PixelArt.palette.skin[2],
                8: '#000000'
            };
            
            let packColorMap;
            if (hasRainCover) {
                packColorMap = {
                    0: null,
                    4: rainCoverColors[i % 4],
                    5: rainCoverColors[i % 4]
                };
            } else {
                const baseColor = normalBackpackColors[i % normalBackpackColors.length];
                const accent = accentColors[i % accentColors.length];
                packColorMap = {
                    0: null,
                    4: baseColor,
                    5: accent
                };
            }
            
            PixelArt.drawSprite(ctx, PixelArt.sprites.backpack, x - 10, y - 20, packColorMap, 2);
            PixelArt.drawSprite(ctx, sprite, x, y, colorMap, 2);
        }
    },
    
    // PARTICLE RENDERING (keep existing, working well)
    renderParticles(ctx, state) {
        ctx.save();
        
        for (let p of state.particles) {
            if (p.life <= 0) continue;
            
            if (p.type === 'rain') {
                // Rain streak
                ctx.strokeStyle = p.color;
                ctx.lineWidth = p.size;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.vx * 0.05, p.y + p.vy * 0.05);
                ctx.stroke();
            } else if (p.type === 'snow') {
                // Snowflake
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                // Snowflake cross
                ctx.fillRect(p.x - p.size, p.y, p.size * 2, 1);
                ctx.fillRect(p.x, p.y - p.size, 1, p.size * 2);
            } else {
                // Fire spark or firefly
                ctx.globalAlpha = Math.min(p.life / 2, 1);
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
            }
        }
        
        ctx.restore();
    },
    
    // ========================================
    // HELPER FUNCTIONS - New detailed elements
    // ========================================
    
    // Cloud
    drawCloud(ctx, x, y, scale, dark) {
        const baseColor = dark ? 'rgba(140, 150, 160, 0.7)' : 'rgba(250, 250, 255, 0.8)';
        const sizes = [40, 50, 45, 35, 42];
        
        ctx.fillStyle = baseColor;
        for (let i = 0; i < 5; i++) {
            const cx = x + i * 20 * scale;
            const cy = y + Math.sin(i * 2) * 8 * scale;
            const r = sizes[i] * scale;
            
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fill();
        }
    },
    
    // Bird
    drawBird(ctx, x, y, time) {
        const wingAngle = Math.sin(time * 8) * 0.3;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        
        ctx.save();
        ctx.translate(x, y);
        
        // Left wing
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-10, -5 + wingAngle * 10, -18, -3);
        ctx.stroke();
        
        // Right wing
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(10, -5 - wingAngle * 10, 18, -3);
        ctx.stroke();
        
        ctx.restore();
    },
    
    // Distant church spire
    drawDistantChurch(ctx, x, y, scale) {
        const w = 30 * scale;
        const h = 80 * scale;
        
        // Tower
        PixelArt.drawPixelRect(ctx, x - w / 2, y, w, h, PixelArt.palette.stone[2]);
        
        // Spire
        ctx.fillStyle = PixelArt.palette.stone[3];
        ctx.beginPath();
        ctx.moveTo(x, y - h * 0.3);
        ctx.lineTo(x - w / 2, y);
        ctx.lineTo(x + w / 2, y);
        ctx.closePath();
        ctx.fill();
        
        // Cross on top
        PixelArt.drawPixelRect(ctx, x - 1, y - h * 0.4, 2, 8 * scale, '#666666');
        PixelArt.drawPixelRect(ctx, x - 3, y - h * 0.35, 6, 2, '#666666');
    },
    
    // Chimney with smoke
    drawChimney(ctx, x, y, phase) {
        PixelArt.drawPixelRect(ctx, x, y, 8, 20, PixelArt.palette.stone[2]);
        PixelArt.drawPixelRect(ctx, x + 1, y + 1, 6, 18, PixelArt.palette.stone[1]);
        
        // Smoke if camp phase or morning
        if (phase === 'camp' || phase === 'morning') {
            ctx.fillStyle = 'rgba(200, 200, 200, 0.4)';
            for (let i = 0; i < 3; i++) {
                const sy = y - 10 - i * 12;
                const sw = 10 + i * 4;
                ctx.beginPath();
                ctx.arc(x + 4, sy, sw / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    },
    
    // Balcony
    drawBalcony(ctx, x, y) {
        // Railing
        PixelArt.drawPixelRect(ctx, x, y, 25, 2, PixelArt.palette.wood[2]);
        // Vertical bars
        for (let i = 0; i < 5; i++) {
            PixelArt.drawPixelRect(ctx, x + i * 5, y - 8, 2, 8, PixelArt.palette.wood[1]);
        }
    },
    
    // Streetlamp
    drawStreetlamp(ctx, x, y, lit) {
        // Pole
        PixelArt.drawPixelRect(ctx, x, y, 3, 60, PixelArt.palette.stone[2]);
        
        // Lamp head
        PixelArt.drawPixelRect(ctx, x - 6, y - 5, 15, 8, PixelArt.palette.stone[3]);
        
        // Light (if lit)
        if (lit) {
            ctx.fillStyle = 'rgba(255, 230, 150, 0.6)';
            ctx.beginPath();
            ctx.arc(x + 6, y, 30, 0, Math.PI * 2);
            ctx.fill();
            
            PixelArt.drawPixelRect(ctx, x + 2, y, 6, 5, '#FFEE99');
        }
    },
    
    // Bench
    drawBench(ctx, x, y) {
        // Seat
        PixelArt.drawPixelRect(ctx, x, y, 30, 4, PixelArt.palette.wood[2]);
        // Backrest
        PixelArt.drawPixelRect(ctx, x, y - 12, 3, 12, PixelArt.palette.wood[1]);
        PixelArt.drawPixelRect(ctx, x, y - 14, 30, 4, PixelArt.palette.wood[2]);
        // Legs
        PixelArt.drawPixelRect(ctx, x + 2, y + 4, 3, 8, PixelArt.palette.wood[1]);
        PixelArt.drawPixelRect(ctx, x + 25, y + 4, 3, 8, PixelArt.palette.wood[1]);
    },
    
    // Deciduous tree
    drawDeciduousTree(ctx, x, y, scale) {
        const trunkH = 35 * scale;
        const trunkW = 8 * scale;
        
        // Trunk
        PixelArt.drawPixelRect(ctx, x - trunkW / 2, y, trunkW, trunkH, PixelArt.palette.wood[0]);
        PixelArt.drawPixelRect(ctx, x - trunkW / 2 + 2 * scale, y, 2 * scale, trunkH, PixelArt.palette.wood[2]);
        
        // Foliage (rounded)
        ctx.fillStyle = PixelArt.palette.moss[2];
        ctx.beginPath();
        ctx.arc(x, y - 25 * scale, 30 * scale, 0, Math.PI * 2);
        ctx.fill();
        
        // Foliage highlights
        ctx.fillStyle = PixelArt.palette.moss[3];
        ctx.beginPath();
        ctx.arc(x - 10 * scale, y - 30 * scale, 12 * scale, 0, Math.PI * 2);
        ctx.fill();
    },
    
    // Swedish red wooden house (Falu röd paint)
    drawSwedishRedHouse(ctx, x, y, w, h) {
        // Walls (classic Swedish red)
        PixelArt.drawPixelRect(ctx, x, y + h * 0.3, w, h * 0.7, '#8B2F2F');
        
        // Wooden planks texture
        for (let i = 0; i < h * 0.7; i += 8) {
            PixelArt.drawPixelRect(ctx, x, y + h * 0.3 + i, w, 2, '#7B1F1F');
        }
        
        // White trim (Swedish detail)
        PixelArt.drawPixelRect(ctx, x - 2, y + h * 0.3, 2, h * 0.7, '#FFFFFF');
        PixelArt.drawPixelRect(ctx, x + w, y + h * 0.3, 2, h * 0.7, '#FFFFFF');
        
        // Grey roof
        ctx.fillStyle = '#666666';
        ctx.beginPath();
        ctx.moveTo(x - 5, y + h * 0.3);
        ctx.lineTo(x + w / 2, y);
        ctx.lineTo(x + w + 5, y + h * 0.3);
        ctx.closePath();
        ctx.fill();
        
        // Windows (white frames)
        const windowY1 = y + h * 0.45;
        const windowY2 = y + h * 0.7;
        
        this.drawSwedishWindow(ctx, x + 15, windowY1);
        this.drawSwedishWindow(ctx, x + w - 30, windowY1);
        this.drawSwedishWindow(ctx, x + w / 2 - 8, windowY2);
    },
    
    // Swedish yellow wooden house
    drawSwedishYellowHouse(ctx, x, y, w, h) {
        // Walls (classic Swedish yellow/ochre)
        PixelArt.drawPixelRect(ctx, x, y + h * 0.3, w, h * 0.7, '#E8C84A');
        
        // Wooden planks
        for (let i = 0; i < h * 0.7; i += 8) {
            PixelArt.drawPixelRect(ctx, x, y + h * 0.3 + i, w, 2, '#D8B83A');
        }
        
        // White trim
        PixelArt.drawPixelRect(ctx, x - 2, y + h * 0.3, 2, h * 0.7, '#FFFFFF');
        PixelArt.drawPixelRect(ctx, x + w, y + h * 0.3, 2, h * 0.7, '#FFFFFF');
        
        // Red roof (Swedish style)
        ctx.fillStyle = '#8B2F2F';
        ctx.beginPath();
        ctx.moveTo(x - 5, y + h * 0.3);
        ctx.lineTo(x + w / 2, y);
        ctx.lineTo(x + w + 5, y + h * 0.3);
        ctx.closePath();
        ctx.fill();
        
        // Windows
        this.drawSwedishWindow(ctx, x + 15, y + h * 0.5);
        this.drawSwedishWindow(ctx, x + w - 30, y + h * 0.5);
    },
    
    // Swedish window
    drawSwedishWindow(ctx, x, y) {
        // White frame
        PixelArt.drawPixelRect(ctx, x, y, 16, 20, '#FFFFFF');
        // Glass (slightly blue tint)
        PixelArt.drawPixelRect(ctx, x + 2, y + 2, 12, 16, 'rgba(180, 200, 255, 0.6)');
        // Window cross (classic Swedish design)
        PixelArt.drawPixelRect(ctx, x + 7, y, 2, 20, '#FFFFFF');
        PixelArt.drawPixelRect(ctx, x, y + 9, 16, 2, '#FFFFFF');
    },
    
    // Small church
    drawSmallChurch(ctx, x, y) {
        // Main building
        PixelArt.drawPixelRect(ctx, x, y + 60, 90, 70, '#CCCCCC');
        
        // Tower
        PixelArt.drawPixelRect(ctx, x + 30, y, 30, 100, '#BBBBBB');
        
        // Steeple
        ctx.fillStyle = '#666666';
        ctx.beginPath();
        ctx.moveTo(x + 45, y - 20);
        ctx.lineTo(x + 30, y);
        ctx.lineTo(x + 60, y);
        ctx.closePath();
        ctx.fill();
        
        // Cross
        PixelArt.drawPixelRect(ctx, x + 44, y - 30, 2, 12, '#555555');
        PixelArt.drawPixelRect(ctx, x + 40, y - 24, 10, 2, '#555555');
        
        // Windows
        PixelArt.drawPixelRect(ctx, x + 10, y + 75, 10, 15, 'rgba(100, 150, 200, 0.5)');
        PixelArt.drawPixelRect(ctx, x + 70, y + 75, 10, 15, 'rgba(100, 150, 200, 0.5)');
        PixelArt.drawPixelRect(ctx, x + 40, y + 20, 10, 15, 'rgba(100, 150, 200, 0.5)');
    },
    
    // Swedish flag
    drawSwedishFlag(ctx, x, y, scale) {
        const w = 30 * scale;
        const h = 20 * scale;
        
        // Flagpole
        PixelArt.drawPixelRect(ctx, x, y, 2, 60 * scale, PixelArt.palette.wood[1]);
        
        // Flag (blue background)
        PixelArt.drawPixelRect(ctx, x + 2, y + 10 * scale, w, h, '#006AA7');
        
        // Yellow cross (Nordic cross)
        PixelArt.drawPixelRect(ctx, x + 2 + w * 0.3, y + 10 * scale, w * 0.15, h, '#FECC00');
        PixelArt.drawPixelRect(ctx, x + 2, y + 10 * scale + h * 0.4, w, h * 0.2, '#FECC00');
    },
    
    // Wildflower
    drawWildflower(ctx, x, y, seed) {
        const flowerType = Math.floor((Math.sin(seed * 2.7) * 0.5 + 0.5) * 3);
        
        // Stem
        PixelArt.drawPixelRect(ctx, x, y, 1, 8, PixelArt.palette.moss[2]);
        
        // Flower
        if (flowerType === 0) {
            // Daisy (white with yellow center)
            PixelArt.drawPixel(ctx, x - 2, y - 2, '#FFFFFF', 2);
            PixelArt.drawPixel(ctx, x + 2, y - 2, '#FFFFFF', 2);
            PixelArt.drawPixel(ctx, x, y - 4, '#FFFFFF', 2);
            PixelArt.drawPixel(ctx, x, y, '#FFFF66', 2);
        } else if (flowerType === 1) {
            // Lupine (purple spike)
            PixelArt.drawPixel(ctx, x, y - 6, '#9966CC', 2);
            PixelArt.drawPixel(ctx, x, y - 4, '#9966CC', 2);
            PixelArt.drawPixel(ctx, x, y - 2, '#BB88EE', 2);
        } else {
            // Buttercup (yellow)
            PixelArt.drawPixel(ctx, x - 1, y - 1, '#FFFF00', 2);
            PixelArt.drawPixel(ctx, x + 1, y - 1, '#FFFF00', 2);
            PixelArt.drawPixel(ctx, x, y - 2, '#FFFF00', 2);
        }
    },
    
    // Wooden fence
    drawWoodenFence(ctx, x, y) {
        // Posts
        PixelArt.drawPixelRect(ctx, x, y, 3, 25, PixelArt.palette.wood[1]);
        PixelArt.drawPixelRect(ctx, x + 20, y, 3, 25, PixelArt.palette.wood[1]);
        
        // Horizontal rails
        PixelArt.drawPixelRect(ctx, x, y + 5, 23, 3, PixelArt.palette.wood[2]);
        PixelArt.drawPixelRect(ctx, x, y + 15, 23, 3, PixelArt.palette.wood[2]);
    },
    
    // Birch tree (very Swedish!)
    drawBirchTree(ctx, x, y, scale) {
        const trunkH = 50 * scale;
        const trunkW = 10 * scale;
        
        // White trunk with black marks
        PixelArt.drawPixelRect(ctx, x - trunkW / 2, y, trunkW, trunkH, '#F0F0F0');
        
        // Black birch marks (characteristic)
        for (let i = 0; i < 5; i++) {
            const markY = y + 5 * scale + i * 10 * scale;
            PixelArt.drawPixelRect(ctx, x - trunkW / 2, markY, trunkW, 3 * scale, '#222222');
        }
        
        // Light green foliage (birch leaves)
        ctx.fillStyle = '#90C090';
        ctx.beginPath();
        ctx.arc(x, y - 20 * scale, 25 * scale, 0, Math.PI * 2);
        ctx.fill();
        
        // Foliage highlights
        ctx.fillStyle = '#A0D0A0';
        ctx.beginPath();
        ctx.arc(x - 8 * scale, y - 25 * scale, 12 * scale, 0, Math.PI * 2);
        ctx.fill();
    },
    
    // Sitting scout silhouette
    drawSittingScout(ctx, x, y) {
        ctx.fillStyle = '#333333';
        // Body
        ctx.fillRect(x, y, 12, 15);
        // Head
        ctx.fillRect(x + 2, y - 8, 8, 8);
        // Legs
        ctx.fillRect(x - 2, y + 10, 6, 8);
        ctx.fillRect(x + 8, y + 10, 6, 8);
    },
    
    // ========================================
    // EXISTING HELPER FUNCTIONS (from original)
    // ========================================
    
    // Big pine tree
    drawBigTree(ctx, x, y, scale) {
        const colorMap = {
            0: null,
            1: PixelArt.palette.pineGreen[0],
            2: PixelArt.palette.pineGreen[1],
            3: PixelArt.palette.pineGreen[2],
            4: PixelArt.palette.wood[0],
            5: PixelArt.palette.wood[2]
        };
        
        PixelArt.drawSprite(ctx, PixelArt.sprites.pineTree, x - 16 * scale, y - 48 * scale, colorMap, scale);
    },
    
    // Small tree (simplified)
    drawSmallTree(ctx, x, y, scale) {
        const trunkH = 30 * scale;
        const trunkW = 8 * scale;
        const foliageW = 25 * scale;
        const foliageH = 35 * scale;
        
        // Trunk
        PixelArt.drawPixelRect(ctx, x - trunkW / 2, y, trunkW, trunkH, PixelArt.palette.wood[0]);
        PixelArt.drawPixelRect(ctx, x - trunkW / 2 + 2 * scale, y, 2 * scale, trunkH, PixelArt.palette.wood[2]);
        
        // Foliage (triangle)
        ctx.fillStyle = PixelArt.palette.pineGreen[1];
        ctx.beginPath();
        ctx.moveTo(x, y - foliageH);
        ctx.lineTo(x - foliageW / 2, y);
        ctx.lineTo(x + foliageW / 2, y);
        ctx.closePath();
        ctx.fill();
        
        // Foliage highlight
        ctx.fillStyle = PixelArt.palette.pineGreen[2];
        ctx.beginPath();
        ctx.moveTo(x, y - foliageH + 5 * scale);
        ctx.lineTo(x - foliageW * 0.3, y);
        ctx.lineTo(x + foliageW * 0.3, y);
        ctx.closePath();
        ctx.fill();
    },
    
    // Tent
    drawTent(ctx, x, y) {
        // Tent body
        ctx.fillStyle = '#668844';
        ctx.beginPath();
        ctx.moveTo(x, y - 35);
        ctx.lineTo(x - 30, y);
        ctx.lineTo(x + 30, y);
        ctx.closePath();
        ctx.fill();
        
        // Tent shading
        ctx.fillStyle = '#557733';
        ctx.beginPath();
        ctx.moveTo(x, y - 35);
        ctx.lineTo(x + 30, y);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();
        
        // Tent entrance
        PixelArt.drawPixelRect(ctx, x - 8, y - 20, 16, 20, '#334422');
        
        // Tent stakes
        PixelArt.drawPixelRect(ctx, x - 35, y, 2, 8, PixelArt.palette.wood[1]);
        PixelArt.drawPixelRect(ctx, x + 33, y, 2, 8, PixelArt.palette.wood[1]);
        
        // Guy-lines
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 20, y - 25);
        ctx.lineTo(x - 35, y);
        ctx.moveTo(x + 20, y - 25);
        ctx.lineTo(x + 35, y);
        ctx.stroke();
    },
    
    // Fern
    drawFern(ctx, x, y) {
        // Stem
        PixelArt.drawPixelRect(ctx, x, y, 2, 20, PixelArt.palette.moss[1]);
        
        // Fronds
        for (let i = 0; i < 5; i++) {
            const fy = y + i * 4;
            const fw = 8 - i;
            
            // Left frond
            ctx.fillStyle = PixelArt.palette.moss[2];
            ctx.beginPath();
            ctx.moveTo(x, fy);
            ctx.lineTo(x - fw, fy + 3);
            ctx.lineTo(x - fw + 2, fy + 4);
            ctx.lineTo(x, fy + 2);
            ctx.closePath();
            ctx.fill();
            
            // Right frond
            ctx.beginPath();
            ctx.moveTo(x + 2, fy);
            ctx.lineTo(x + 2 + fw, fy + 3);
            ctx.lineTo(x + fw, fy + 4);
            ctx.lineTo(x + 2, fy + 2);
            ctx.closePath();
            ctx.fill();
        }
    },
    
    // Reed (swaying in water)
    drawReed(ctx, x, y, time) {
        const height = 40 + (Math.sin(x * 0.15) * 0.5 + 0.5) * 25;
        const sway = Math.sin((time || 0) * 2 + x * 0.1) * 3;
        
        // Stem
        ctx.strokeStyle = PixelArt.palette.moss[1];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + sway, y - height / 2, x + sway * 2, y - height);
        ctx.stroke();
        
        // Reed head
        PixelArt.drawPixelRect(ctx, x + sway * 2 - 2, y - height - 8, 4, 8, PixelArt.palette.wood[2]);
    },
    
    // ========================================
    // NEW HELPER FUNCTIONS (Swedish details)
    // ========================================
    
    // Swedish cabin (stuga)
    drawSwedishCabin(ctx, x, y, scale) {
        const w = 60 * scale;
        const h = 40 * scale;
        
        // Walls (red)
        PixelArt.drawPixelRect(ctx, x, y, w, h, '#8B2F2F');
        
        // Roof (grey/brown)
        ctx.fillStyle = '#666666';
        ctx.beginPath();
        ctx.moveTo(x - 5 * scale, y);
        ctx.lineTo(x + w / 2, y - 15 * scale);
        ctx.lineTo(x + w + 5 * scale, y);
        ctx.closePath();
        ctx.fill();
        
        // Window
        PixelArt.drawPixelRect(ctx, x + w / 2 - 4 * scale, y + h / 2 - 4 * scale, 8 * scale, 8 * scale, '#FFEE88');
    },
    
    // Lily pad
    drawLilyPad(ctx, x, y) {
        ctx.fillStyle = PixelArt.palette.moss[2];
        ctx.beginPath();
        ctx.ellipse(x, y, 12, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Cut-out notch
        ctx.fillStyle = PixelArt.palette.water[1];
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 6, y - 4);
        ctx.lineTo(x - 4, y);
        ctx.closePath();
        ctx.fill();
        
        // Small flower occasionally
        if (Math.random() > 0.7) {
            PixelArt.drawPixel(ctx, x + 2, y - 2, '#FF99CC', 3);
        }
    },
    
    // Cattail
    drawCattail(ctx, x, y) {
        // Stem
        PixelArt.drawPixelRect(ctx, x, y, 2, 35, PixelArt.palette.moss[1]);
        
        // Cattail head (brown)
        PixelArt.drawPixelRect(ctx, x - 2, y - 40, 6, 12, '#654321');
    },
    
    // Boulder
    drawBoulder(ctx, x, y, size) {
        // Main rock
        PixelArt.drawPixelRect(ctx, x, y, size, size * 0.85, PixelArt.palette.stone[0]);
        PixelArt.drawPixelRect(ctx, x + 2, y + 2, size - 4, size * 0.85 - 4, PixelArt.palette.stone[2]);
        
        // Highlight
        PixelArt.drawPixel(ctx, x + size - 5, y + size * 0.85 - 5, PixelArt.palette.stone[3], 3);
    },
    
    // Driftwood
    drawDriftwood(ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(0.2);
        
        // Weathered log
        PixelArt.drawPixelRect(ctx, 0, 0, 50, 8, PixelArt.palette.wood[1]);
        PixelArt.drawPixelRect(ctx, 2, 1, 46, 6, PixelArt.palette.dirt[2]);
        
        // Broken ends
        ctx.fillStyle = PixelArt.palette.wood[0];
        ctx.fillRect(0, 0, 5, 8);
        ctx.fillRect(45, 0, 5, 8);
        
        ctx.restore();
    },
    
    // Wooden dock
    drawWoodenDock(ctx, x, y) {
        const w = 80;
        const h = 120;
        
        // Dock supports (underwater)
        for (let i = 0; i < 4; i++) {
            PixelArt.drawPixelRect(ctx, x + i * 25, y + 10, 6, h - 10, PixelArt.palette.wood[0]);
        }
        
        // Dock planks
        for (let i = 0; i < h; i += 8) {
            PixelArt.drawPixelRect(ctx, x, y + i, w, 6, PixelArt.palette.wood[2]);
            PixelArt.drawPixelRect(ctx, x, y + i + 1, w, 1, PixelArt.palette.wood[1]);
        }
    },
    
    // Fishing rod
    drawFishingRod(ctx, x, y) {
        // Rod
        ctx.strokeStyle = PixelArt.palette.wood[2];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x - 40, y - 60);
        ctx.stroke();
        
        // Line
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 40, y - 60);
        ctx.lineTo(x - 50, y - 30);
        ctx.stroke();
        
        // Handle
        PixelArt.drawPixelRect(ctx, x - 5, y + 20, 10, 8, PixelArt.palette.wood[1]);
    },
    
    // Cooking pot
    drawCookingPot(ctx, x, y) {
        // Pot body
        PixelArt.drawPixelRect(ctx, x - 12, y, 24, 18, PixelArt.palette.stone[2]);
        PixelArt.drawPixelRect(ctx, x - 10, y + 2, 20, 14, PixelArt.palette.stone[1]);
        
        // Handle
        ctx.strokeStyle = PixelArt.palette.stone[3];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y - 5, 15, 0, Math.PI);
        ctx.stroke();
        
        // Steam
        ctx.fillStyle = 'rgba(240, 240, 240, 0.4)';
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(x - 5 + i * 5, y - 10 - i * 8, 4 + i * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    },
    
    // Mushroom
    drawMushroom(ctx, x, y, seed) {
        const mushroomType = Math.floor((Math.sin(seed * 3.2) * 0.5 + 0.5) * 2);
        
        if (mushroomType === 0) {
            // Red with white spots (fly agaric)
            // Cap
            ctx.fillStyle = '#CC3333';
            ctx.beginPath();
            ctx.ellipse(x, y - 5, 8, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Spots
            PixelArt.drawPixel(ctx, x - 4, y - 6, '#FFFFFF', 2);
            PixelArt.drawPixel(ctx, x + 3, y - 7, '#FFFFFF', 2);
            PixelArt.drawPixel(ctx, x, y - 8, '#FFFFFF', 1);
            
            // Stem
            PixelArt.drawPixelRect(ctx, x - 2, y, 4, 8, '#F0F0F0');
        } else {
            // Brown (edible)
            // Cap
            ctx.fillStyle = '#8B6633';
            ctx.beginPath();
            ctx.ellipse(x, y - 4, 6, 4, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Stem
            PixelArt.drawPixelRect(ctx, x - 2, y, 4, 6, '#D4C4A4');
        }
    },
    
    // Fallen log
    drawFallenLog(ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);
        
        // Log
        PixelArt.drawPixelRect(ctx, 0, 0, 80, 12, PixelArt.palette.wood[1]);
        PixelArt.drawPixelRect(ctx, 2, 2, 76, 8, PixelArt.palette.wood[2]);
        
        // Moss on log
        PixelArt.drawPixelRect(ctx, 10, 0, 20, 4, PixelArt.palette.moss[1]);
        PixelArt.drawPixelRect(ctx, 45, 0, 15, 3, PixelArt.palette.moss[2]);
        
        ctx.restore();
    },
    
    // Log seat (for campfire)
    drawLogSeat(ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);
        
        // Log
        PixelArt.drawPixelRect(ctx, 0, 0, 50, 10, PixelArt.palette.wood[2]);
        PixelArt.drawPixelRect(ctx, 1, 1, 48, 8, PixelArt.palette.wood[1]);
        
        // End rings
        ctx.fillStyle = PixelArt.palette.wood[3];
        ctx.beginPath();
        ctx.arc(2, 5, 4, 0, Math.PI * 2);
        ctx.arc(48, 5, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    },
    
    // Small stream
    drawSmallStream(ctx, x, y, time) {
        const streamW = 60;
        
        // Water
        ctx.fillStyle = PixelArt.palette.water[1];
        ctx.fillRect(x, y, streamW, 30);
        
        // Flow lines (animated)
        ctx.strokeStyle = PixelArt.palette.water[2];
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
            const flowX = (x + i * 15 + time * 50) % streamW + x;
            ctx.beginPath();
            ctx.moveTo(flowX, y + 5);
            ctx.lineTo(flowX + 10, y + 8);
            ctx.lineTo(flowX + 15, y + 15);
            ctx.stroke();
        }
        
        // Rocks in stream
        PixelArt.drawPixelRect(ctx, x + 15, y + 10, 8, 6, PixelArt.palette.stone[2]);
        PixelArt.drawPixelRect(ctx, x + 40, y + 15, 6, 5, PixelArt.palette.stone[1]);
    },
    
    // Backpack leaning against tree
    drawBackpackLeaning(ctx, x, y) {
        const colorMap = {
            0: null,
            4: '#2a3a4a',
            5: '#CC3333'
        };
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-0.3);
        
        PixelArt.drawSprite(ctx, PixelArt.sprites.backpack, 0, 0, colorMap, 2.5);
        
        ctx.restore();
    },
    
    // Deer silhouette (distant wildlife)
    drawDeerSilhouette(ctx, x, y) {
        ctx.fillStyle = 'rgba(80, 60, 40, 0.6)';
        
        // Body
        ctx.fillRect(x, y, 30, 20);
        
        // Neck and head
        ctx.fillRect(x + 25, y - 15, 8, 20);
        ctx.fillRect(x + 28, y - 20, 8, 8);
        
        // Antlers
        ctx.strokeStyle = 'rgba(80, 60, 40, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + 32, y - 20);
        ctx.lineTo(x + 30, y - 28);
        ctx.lineTo(x + 28, y - 32);
        ctx.moveTo(x + 32, y - 20);
        ctx.lineTo(x + 35, y - 30);
        ctx.stroke();
        
        // Legs
        ctx.fillRect(x + 5, y + 20, 4, 15);
        ctx.fillRect(x + 15, y + 20, 4, 15);
        ctx.fillRect(x + 22, y + 20, 4, 12);
    },
    
    // Reindeer silhouette
    drawReindeerSilhouette(ctx, x, y) {
        ctx.fillStyle = 'rgba(90, 70, 50, 0.6)';
        
        // Body (bulkier than deer)
        ctx.fillRect(x, y, 35, 22);
        
        // Neck and head
        ctx.fillRect(x + 28, y - 12, 10, 18);
        ctx.fillRect(x + 32, y - 18, 10, 10);
        
        // Large antlers (characteristic reindeer rack)
        ctx.strokeStyle = 'rgba(90, 70, 50, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Left antler
        ctx.moveTo(x + 35, y - 18);
        ctx.lineTo(x + 32, y - 26);
        ctx.lineTo(x + 30, y - 32);
        ctx.moveTo(x + 35, y - 18);
        ctx.lineTo(x + 33, y - 30);
        // Right antler
        ctx.moveTo(x + 40, y - 18);
        ctx.lineTo(x + 43, y - 26);
        ctx.lineTo(x + 45, y - 32);
        ctx.moveTo(x + 40, y - 18);
        ctx.lineTo(x + 42, y - 30);
        ctx.stroke();
        
        // Legs
        ctx.fillRect(x + 6, y + 22, 5, 16);
        ctx.fillRect(x + 18, y + 22, 5, 16);
        ctx.fillRect(x + 25, y + 22, 5, 14);
    },
    
    // Mountain shrub (hardy alpine plant)
    drawMountainShrub(ctx, x, y) {
        // Small hardy bush
        ctx.fillStyle = PixelArt.palette.moss[1];
        ctx.beginPath();
        ctx.ellipse(x, y, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Sparse branches
        PixelArt.drawPixelRect(ctx, x - 2, y - 3, 1, 6, PixelArt.palette.wood[1]);
        PixelArt.drawPixelRect(ctx, x + 2, y - 2, 1, 5, PixelArt.palette.wood[1]);
    },
    
    // Trail marker (Swedish/Norwegian trail marker - orange)
    drawTrailMarker(ctx, x, y) {
        // Post
        PixelArt.drawPixelRect(ctx, x, y, 4, 30, PixelArt.palette.wood[1]);
        
        // Orange marker (T-shape, Swedish standard)
        PixelArt.drawPixelRect(ctx, x - 10, y + 5, 24, 8, '#FF8800');
        PixelArt.drawPixelRect(ctx, x - 1, y + 5, 6, 20, '#FF8800');
        
        // White border
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - 10, y + 5, 24, 8);
        ctx.strokeRect(x - 1, y + 5, 6, 20);
    },
    
    // Stone wind shelter (mountain camping)
    drawStoneWindShelter(ctx, x, y) {
        // Semi-circle of rocks
        const rocks = [
            { x: x - 60, y: y, size: 20 },
            { x: x - 50, y: y - 10, size: 18 },
            { x: x - 40, y: y - 15, size: 22 },
            { x: x - 25, y: y - 18, size: 20 },
            { x: x - 10, y: y - 18, size: 24 },
            { x: x + 5, y: y - 18, size: 20 },
            { x: x + 20, y: y - 15, size: 22 },
            { x: x + 35, y: y - 12, size: 18 },
            { x: x + 50, y: y - 5, size: 20 },
            { x: x + 60, y: y, size: 18 }
        ];
        
        for (let rock of rocks) {
            this.drawBoulder(ctx, rock.x, rock.y, rock.size);
        }
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Scenes;
}
