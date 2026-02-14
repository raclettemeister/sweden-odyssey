// Sweden Odyssey — 16-bit Pixel Art Scene Rendering
// Beautiful adventure game style scenes using the PixelArt engine

const Scenes = {
    render(ctx, state) {
        const type = state.locationType;
        const phase = state.phase;
        
        // Clear
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, Game.width, Game.height);
        
        // Draw sky first (background layer)
        PixelArt.drawSky(ctx, Game.width, Game.height, phase);
        
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
        
        // Render scouts walking (if afternoon phase)
        if (phase === 'afternoon' && !state.currentEvent) {
            this.renderScoutsLine(ctx, state);
        }
        
        // Render particles (fire sparks, etc.)
        this.renderParticles(ctx, state);
    },
    
    renderCity(ctx, state, phase) {
        // Far background - distant buildings
        for (let i = 0; i < 5; i++) {
            const x = i * 220 - (state.travelOffset * 0.15) % 220;
            const h = 100 + Math.sin(i * 1.2) * 40;
            const y = Game.height - 350;
            
            PixelArt.drawBuilding(
                ctx, x, y, 180, h,
                [PixelArt.palette.stone[1], PixelArt.palette.stone[2]],
                [PixelArt.palette.stone[2], PixelArt.palette.stone[3]],
                phase === 'camp' ? PixelArt.palette.campfireAmber : 'rgba(200, 220, 255, 0.3)'
            );
        }
        
        // Middle layer - main buildings
        for (let i = 0; i < 4; i++) {
            const x = i * 280 - (state.travelOffset * 0.4) % 280;
            const h = 180 + Math.sin(i * 0.8) * 60;
            const y = Game.height - h - 80;
            
            const roofColors = [
                [PixelArt.palette.stone[2], PixelArt.palette.stone[3]],
                ['#8B4513', '#654321'],
                ['#CC6633', '#994422']
            ];
            
            const wallColors = [
                ['#D4B896', '#C4A886', '#B49876'],
                ['#E8D4B4', '#D8C4A4', '#C8B494'],
                ['#F0E8D8', '#E0D8C8', '#D0C8B8']
            ];
            
            PixelArt.drawBuilding(
                ctx, x, y, 240, h,
                roofColors[i % 3],
                wallColors[i % 3],
                phase === 'camp' ? PixelArt.palette.campfireAmber : 'rgba(180, 200, 255, 0.4)'
            );
        }
        
        // Street/ground
        const groundY = Game.height - 80;
        PixelArt.drawPixelRect(ctx, 0, groundY, Game.width, 80, PixelArt.palette.stone[1]);
        
        // Cobblestone pattern
        for (let y = 0; y < 80; y += 8) {
            for (let x = 0; x < Game.width; x += 8) {
                const stoneX = (x - state.travelOffset) % Game.width;
                if (Math.random() > 0.7) {
                    PixelArt.drawPixelRect(ctx, stoneX, groundY + y, 7, 7, PixelArt.palette.stone[2]);
                    PixelArt.drawPixelRect(ctx, stoneX + 1, groundY + y + 1, 5, 5, PixelArt.palette.stone[0]);
                }
            }
        }
        
        // Campfire if camp phase
        if (phase === 'camp') {
            PixelArt.drawCampfire(ctx, Game.width / 2, groundY - 20, state.sceneTime);
            
            // Tents around fire
            this.drawTent(ctx, Game.width / 2 - 150, groundY - 60);
            this.drawTent(ctx, Game.width / 2 + 150, groundY - 60);
            this.drawTent(ctx, Game.width / 2 - 100, groundY - 90);
            this.drawTent(ctx, Game.width / 2 + 100, groundY - 90);
        }
    },
    
    renderTown(ctx, state, phase) {
        // Far background - distant forest
        for (let i = 0; i < 20; i++) {
            const x = (i * 50 - state.travelOffset * 0.2) % (Game.width + 100);
            const y = Game.height - 300 + Math.sin(i * 0.5) * 20;
            this.drawSmallTree(ctx, x, y, 0.5);
        }
        
        // Middle layer - small town buildings
        for (let i = 0; i < 5; i++) {
            const x = i * 200 - (state.travelOffset * 0.5) % 200;
            const y = Game.height - 180;
            const buildingType = i % 3;
            
            if (buildingType === 0) {
                // House
                PixelArt.drawBuilding(
                    ctx, x, y, 120, 100,
                    ['#CC6633', '#994422'],
                    ['#D4A574', '#C49564', '#B48554'],
                    phase === 'camp' ? PixelArt.palette.campfireAmber : 'rgba(200, 220, 255, 0.3)'
                );
            } else if (buildingType === 1) {
                // Shop
                PixelArt.drawBuilding(
                    ctx, x, y, 140, 90,
                    ['#8B6633', '#6B4622'],
                    ['#E8D4B4', '#D8C4A4', '#C8B494'],
                    phase === 'camp' ? PixelArt.palette.campfireAmber : 'rgba(200, 220, 255, 0.3)'
                );
            } else {
                // Church/tall building
                PixelArt.drawBuilding(
                    ctx, x, y - 40, 100, 140,
                    ['#666666', '#555555'],
                    ['#CCCCCC', '#BBBBBB', '#AAAAAA'],
                    phase === 'camp' ? PixelArt.palette.campfireAmber : 'rgba(200, 220, 255, 0.3)'
                );
            }
        }
        
        // Ground - grass and path
        const groundY = Game.height - 80;
        PixelArt.drawGrassTile(ctx, 0, groundY, Game.width, 80);
        
        // Dirt path
        PixelArt.drawPixelRect(ctx, 0, groundY + 20, Game.width, 30, PixelArt.palette.dirt[1]);
        for (let i = 0; i < Game.width; i += 6) {
            const pathX = (i - state.travelOffset) % Game.width;
            PixelArt.drawPixelRect(ctx, pathX, groundY + 22, 4, 2, PixelArt.palette.dirt[2]);
            PixelArt.drawPixelRect(ctx, pathX + 1, groundY + 28, 3, 2, PixelArt.palette.dirt[0]);
        }
        
        // Campfire if camp phase
        if (phase === 'camp') {
            PixelArt.drawCampfire(ctx, Game.width / 2, groundY + 10, state.sceneTime);
            this.drawTent(ctx, Game.width / 2 - 120, groundY - 30);
            this.drawTent(ctx, Game.width / 2 + 100, groundY - 30);
        }
    },
    
    renderWilderness(ctx, state, phase) {
        // Far mountains
        for (let i = 0; i < 3; i++) {
            const x = i * 400 - (state.travelOffset * 0.1) % 400 - 100;
            const y = Game.height - 280;
            PixelArt.drawMountain(
                ctx, x, y, 450, 180,
                PixelArt.palette.mountain,
                [PixelArt.palette.mountain[0], PixelArt.palette.mountain[1]],
                PixelArt.palette.snow
            );
        }
        
        // Mid forest layer - big trees
        for (let i = 0; i < 8; i++) {
            const x = (i * 130 - state.travelOffset * 0.5) % (Game.width + 150);
            const y = Game.height - 220;
            this.drawBigTree(ctx, x, y, 0.7);
        }
        
        // Near forest layer - closest trees
        for (let i = 0; i < 6; i++) {
            const x = (i * 180 - state.travelOffset) % (Game.width + 180);
            const y = Game.height - 150;
            this.drawBigTree(ctx, x, y, 1.0);
        }
        
        // Forest floor
        const groundY = Game.height - 100;
        PixelArt.drawPixelRect(ctx, 0, groundY, Game.width, 100, PixelArt.palette.pineGreen[0]);
        
        // Moss patches (deterministic - no flickering)
        for (let i = 0; i < 30; i++) {
            const x = (i * 35 - state.travelOffset * 0.8) % Game.width;
            const y = groundY + 10 + Math.sin(i) * 15;
            const size = 15 + (Math.sin(i * 2.3) * 0.5 + 0.5) * 20; // Deterministic size
            const colorIndex = Math.floor((Math.sin(i * 1.7) * 0.5 + 0.5) * 4); // Deterministic color
            PixelArt.drawPixelRect(ctx, x, y, size, size * 0.6, PixelArt.palette.moss[colorIndex]);
        }
        
        // Ferns and undergrowth
        for (let i = 0; i < 20; i++) {
            const x = (i * 50 - state.travelOffset * 0.9) % Game.width;
            const y = groundY + 20;
            this.drawFern(ctx, x, y);
        }
        
        // Campfire if camp phase
        if (phase === 'camp') {
            // Clear a space for camp
            PixelArt.drawPixelRect(ctx, Game.width / 2 - 200, groundY, 400, 100, PixelArt.palette.pineGreen[0]);
            
            PixelArt.drawCampfire(ctx, Game.width / 2, groundY + 40, state.sceneTime);
            
            // Tents in clearing
            this.drawTent(ctx, Game.width / 2 - 140, groundY + 10);
            this.drawTent(ctx, Game.width / 2 + 120, groundY + 10);
            this.drawTent(ctx, Game.width / 2 - 80, groundY - 10);
            this.drawTent(ctx, Game.width / 2 + 60, groundY - 10);
            
            // Spawn fireflies (controlled rate)
            if (state.particles.length < 20 && Math.random() < 0.05) {
                state.particles.push({
                    x: Game.width / 2 - 200 + Math.random() * 400,
                    y: groundY - 50 + Math.random() * 50,
                    vx: (Math.random() - 0.5) * 20,
                    vy: (Math.random() - 0.5) * 20,
                    life: 2 + Math.random() * 2,
                    color: '#FFFF99',
                    size: 3
                });
            }
        }
    },
    
    renderLake(ctx, state, phase) {
        // Far shore with trees
        const farShoreY = Game.height - 380;
        PixelArt.drawPixelRect(ctx, 0, farShoreY, Game.width, 80, PixelArt.palette.pineGreen[1]);
        
        for (let i = 0; i < 15; i++) {
            const x = (i * 70 - state.travelOffset * 0.2) % (Game.width + 70);
            this.drawSmallTree(ctx, x, farShoreY + 10, 0.6);
        }
        
        // Water (main feature)
        const waterY = Game.height - 300;
        PixelArt.drawWater(ctx, 0, waterY, Game.width, 220, state.sceneTime);
        
        // Reeds in water (near shore)
        for (let i = 0; i < 25; i++) {
            const x = (i * 40 - state.travelOffset * 0.7) % Game.width;
            const y = Game.height - 120 + Math.sin(state.sceneTime * 2 + i) * 3;
            this.drawReed(ctx, x, y, state.sceneTime);
        }
        
        // Shore/beach
        const shoreY = Game.height - 80;
        PixelArt.drawPixelRect(ctx, 0, shoreY, Game.width, 80, PixelArt.palette.dirt[2]);
        
        // Rocks on shore (deterministic)
        for (let i = 0; i < 15; i++) {
            const x = (i * 70 - state.travelOffset * 0.85) % Game.width;
            const y = shoreY + 20 + (Math.sin(i * 3.2) * 0.5 + 0.5) * 30; // Deterministic y
            const size = 8 + (Math.sin(i * 2.1) * 0.5 + 0.5) * 12; // Deterministic size
            PixelArt.drawPixelRect(ctx, x, y, size, size * 0.8, PixelArt.palette.stone[0]);
            PixelArt.drawPixelRect(ctx, x + 1, y + 1, size - 2, size * 0.8 - 2, PixelArt.palette.stone[1]);
        }
        
        // Campfire if camp phase
        if (phase === 'camp') {
            PixelArt.drawCampfire(ctx, Game.width / 2, shoreY + 10, state.sceneTime);
            this.drawTent(ctx, Game.width / 2 - 130, shoreY - 30);
            this.drawTent(ctx, Game.width / 2 + 110, shoreY - 30);
        }
    },
    
    renderMountain(ctx, state, phase) {
        // Far mountain range
        for (let i = 0; i < 4; i++) {
            const x = i * 350 - (state.travelOffset * 0.1) % 350 - 100;
            const y = Game.height - 340;
            PixelArt.drawMountain(
                ctx, x, y, 400, 240,
                PixelArt.palette.mountain,
                [PixelArt.palette.mountain[0], PixelArt.palette.mountain[1]],
                PixelArt.palette.snow
            );
        }
        
        // Mid mountains
        for (let i = 0; i < 3; i++) {
            const x = i * 450 - (state.travelOffset * 0.3) % 450 - 50;
            const y = Game.height - 260;
            PixelArt.drawMountain(
                ctx, x, y, 500, 180,
                PixelArt.palette.stone,
                [PixelArt.palette.stone[0], PixelArt.palette.stone[1]],
                PixelArt.palette.snow
            );
        }
        
        // Snow patches on ground (deterministic)
        for (let i = 0; i < 10; i++) {
            const x = (i * 100 - state.travelOffset * 0.6) % Game.width;
            const y = Game.height - 180 + Math.sin(i * 0.7) * 40;
            const w = 60 + (Math.sin(i * 1.9) * 0.5 + 0.5) * 80; // Deterministic width
            const h = 30 + (Math.sin(i * 2.3) * 0.5 + 0.5) * 20; // Deterministic height
            
            // Snow patch
            PixelArt.drawPixelRect(ctx, x, y, w, h, PixelArt.palette.snow[2]);
            PixelArt.drawPixelRect(ctx, x + 5, y + 5, w - 10, h - 10, PixelArt.palette.snow[3]);
            
            // Snow highlights (deterministic)
            for (let j = 0; j < 5; j++) {
                const hx = x + 10 + (Math.sin((i + j) * 4.2) * 0.5 + 0.5) * (w - 20);
                const hy = y + 5 + (Math.sin((i + j) * 3.7) * 0.5 + 0.5) * (h - 10);
                PixelArt.drawPixel(ctx, hx, hy, PixelArt.palette.snow[3], 2);
            }
        }
        
        // Rocky ground
        const groundY = Game.height - 100;
        PixelArt.drawPixelRect(ctx, 0, groundY, Game.width, 100, PixelArt.palette.stone[1]);
        
        // Rocks scattered (deterministic)
        for (let i = 0; i < 25; i++) {
            const x = (i * 45 - state.travelOffset * 0.9) % Game.width;
            const y = groundY + 15 + (Math.sin(i * 2.8) * 0.5 + 0.5) * 60; // Deterministic y
            const size = 12 + (Math.sin(i * 3.4) * 0.5 + 0.5) * 25; // Deterministic size
            
            PixelArt.drawPixelRect(ctx, x, y, size, size * 0.9, PixelArt.palette.stone[0]);
            PixelArt.drawPixelRect(ctx, x + 2, y + 2, size - 4, size * 0.9 - 4, PixelArt.palette.stone[2]);
            PixelArt.drawPixel(ctx, x + size - 4, y + size * 0.9 - 4, PixelArt.palette.stone[3], 3);
        }
        
        // Sparse mountain vegetation
        for (let i = 0; i < 12; i++) {
            const x = (i * 85 - state.travelOffset * 0.85) % Game.width;
            const y = groundY + 20;
            // Small hardy plant
            PixelArt.drawPixelRect(ctx, x, y, 2, 8, PixelArt.palette.moss[1]);
            PixelArt.drawPixelRect(ctx, x - 2, y + 4, 2, 2, PixelArt.palette.moss[2]);
            PixelArt.drawPixelRect(ctx, x + 2, y + 5, 2, 2, PixelArt.palette.moss[2]);
        }
        
        // Campfire if camp phase
        if (phase === 'camp') {
            PixelArt.drawCampfire(ctx, Game.width / 2, groundY + 20, state.sceneTime);
            this.drawTent(ctx, Game.width / 2 - 140, groundY - 10);
            this.drawTent(ctx, Game.width / 2 + 120, groundY - 10);
        }
        
        // Morning mist (controlled rate)
        if (phase === 'morning' && state.particles.length < 15) {
            if (Math.random() < 0.02) {
                state.particles.push({
                    x: Math.random() * Game.width,
                    y: groundY - 100 + Math.random() * 80,
                    vx: 10 + Math.random() * 15,
                    vy: -2 + Math.random() * 4,
                    life: 6 + Math.random() * 6,
                    color: 'rgba(240, 240, 240, 0.25)',
                    size: 50 + Math.random() * 60
                });
            }
        }
    },
    
    // Draw line of scouts walking (16-bit sprite style)
    renderScoutsLine(ctx, state) {
        const scoutCount = Math.min(state.scouts, 12); // Show max 12 on screen
        const spacing = 45;
        const baseY = Game.height - 105;
        const baseX = 120;
        
        // Backpack colors based on weather (rain covers only in rain/storm)
        const hasRainCover = (state.weather === 'rain' || state.weather === 'storm');
        
        // Bright rain covers (only when raining)
        const rainCoverColors = [
            PixelArt.palette.scoutRed,    // Red
            '#66CC66',                      // Green
            '#FFCC00',                      // Yellow
            '#6666FF'                       // Blue
        ];
        
        // Normal backpack colors (dark, realistic)
        const normalBackpackColors = [
            '#2a2a2a',  // Black
            '#1a3a4a',  // Dark blue
            '#3a2a1a',  // Brown
            '#2a1a2a',  // Dark purple
            '#1a2a1a',  // Very dark green
            '#4a3a2a'   // Dark brown
        ];
        
        // Small colored accents (straps, pockets)
        const accentColors = [
            '#CC3333',  // Red accent
            '#4a8a4a',  // Green accent
            '#8a6a3a',  // Yellow/tan accent
            '#4a6a8a'   // Blue accent
        ];
        
        for (let i = 0; i < scoutCount; i++) {
            const x = baseX + i * spacing;
            const walkCycle = Math.floor(state.sceneTime * 4 + i * 0.5) % 3;
            const bobOffset = Math.sin(state.sceneTime * 4 + i * 0.5) * 2;
            const y = baseY + bobOffset;
            
            // Choose sprite based on walk cycle
            let sprite;
            if (walkCycle === 0) {
                sprite = PixelArt.sprites.scoutWalk1;
            } else if (walkCycle === 1) {
                sprite = PixelArt.sprites.scoutFront;
            } else {
                sprite = PixelArt.sprites.scoutWalk2;
            }
            
            // Color map for scout
            const colorMap = {
                0: null, // transparent
                1: PixelArt.palette.scoutRed, // shirt
                2: PixelArt.palette.scoutOrange, // neckerchief
                3: PixelArt.palette.skin[2], // skin
                8: '#000000' // black details
            };
            
            // Draw backpack behind scout with appropriate colors
            let packColorMap;
            if (hasRainCover) {
                // Bright colored rain covers
                packColorMap = {
                    0: null,
                    4: rainCoverColors[i % 4],
                    5: rainCoverColors[i % 4]
                };
            } else {
                // Dark realistic backpacks with small colored accents
                const baseColor = normalBackpackColors[i % normalBackpackColors.length];
                const accent = accentColors[i % accentColors.length];
                packColorMap = {
                    0: null,
                    4: baseColor,        // Main backpack body (dark)
                    5: accent            // Small colored details (straps, pockets)
                };
            }
            
            PixelArt.drawSprite(ctx, PixelArt.sprites.backpack, x - 10, y - 20, packColorMap, 2);
            
            // Draw scout
            PixelArt.drawSprite(ctx, sprite, x, y, colorMap, 2);
        }
    },
    
    // Helper: Draw a big tree using pine tree sprite
    drawBigTree(ctx, x, y, scale) {
        const colorMap = {
            0: null,
            1: PixelArt.palette.pineGreen[0], // dark outline
            2: PixelArt.palette.pineGreen[1], // dark green
            3: PixelArt.palette.pineGreen[2], // light green
            4: PixelArt.palette.wood[0], // trunk dark
            5: PixelArt.palette.wood[2]  // trunk light
        };
        
        PixelArt.drawSprite(ctx, PixelArt.sprites.pineTree, x - 16 * scale, y - 48 * scale, colorMap, scale);
    },
    
    // Helper: Draw a small tree (simplified)
    drawSmallTree(ctx, x, y, scale) {
        // Simplified tree for distant background
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
        ctx.moveTo(x, y - foliageH * 0.7);
        ctx.lineTo(x - foliageW / 3, y - foliageH * 0.2);
        ctx.lineTo(x + foliageW / 3, y - foliageH * 0.2);
        ctx.closePath();
        ctx.fill();
    },
    
    // Helper: Draw tent
    drawTent(ctx, x, y) {
        const w = 50;
        const h = 35;
        
        // Tent body (triangle)
        ctx.fillStyle = PixelArt.palette.scoutOrange;
        ctx.beginPath();
        ctx.moveTo(x, y - h);
        ctx.lineTo(x - w / 2, y);
        ctx.lineTo(x + w / 2, y);
        ctx.closePath();
        ctx.fill();
        
        // Tent shading
        ctx.fillStyle = PixelArt.palette.scoutRed;
        ctx.beginPath();
        ctx.moveTo(x, y - h);
        ctx.lineTo(x + w / 2, y);
        ctx.lineTo(x + w / 4, y);
        ctx.closePath();
        ctx.fill();
        
        // Tent outline
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y - h);
        ctx.lineTo(x - w / 2, y);
        ctx.lineTo(x + w / 2, y);
        ctx.closePath();
        ctx.stroke();
        
        // Door flap
        ctx.fillStyle = '#000000';
        ctx.fillRect(x - 8, y - 20, 16, 20);
    },
    
    // Helper: Draw fern (deterministic)
    drawFern(ctx, x, y) {
        const height = 20 + (Math.sin(x * 0.1) * 0.5 + 0.5) * 15; // Based on x position
        const fronds = 6;
        
        // Stem
        PixelArt.drawPixelRect(ctx, x, y - height, 2, height, PixelArt.palette.moss[1]);
        
        // Fronds
        for (let i = 0; i < fronds; i++) {
            const fy = y - height + (i * height / fronds);
            const fw = (fronds - i) * 2;
            
            // Left frond
            ctx.fillStyle = PixelArt.palette.moss[2];
            ctx.beginPath();
            ctx.moveTo(x, fy);
            ctx.lineTo(x - fw, fy - 3);
            ctx.lineTo(x - fw + 2, fy);
            ctx.closePath();
            ctx.fill();
            
            // Right frond
            ctx.beginPath();
            ctx.moveTo(x + 2, fy);
            ctx.lineTo(x + fw + 2, fy - 3);
            ctx.lineTo(x + fw, fy);
            ctx.closePath();
            ctx.fill();
        }
    },
    
    // Helper: Draw reed (deterministic)
    drawReed(ctx, x, y, time) {
        const height = 40 + (Math.sin(x * 0.15) * 0.5 + 0.5) * 25; // Based on x position
        const sway = Math.sin((time || 0) * 2 + x * 0.1) * 3;
        
        // Reed stem
        ctx.strokeStyle = PixelArt.palette.moss[1];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + sway, y - height);
        ctx.stroke();
        
        // Reed top
        PixelArt.drawPixelRect(ctx, x + sway - 3, y - height - 8, 6, 8, PixelArt.palette.moss[3]);
    },
    
    // Render particles (fire sparks, mist, fireflies)
    renderParticles(ctx, state) {
        // Save context state
        ctx.save();
        
        for (let p of state.particles) {
            if (!p || p.life <= 0) continue; // Safety check
            
            if (p.size > 10) {
                // Large particles (mist) - use circles
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 4));
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Small particles (sparks, fireflies)
                ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 2));
                PixelArt.drawPixelRect(ctx, p.x, p.y, p.size, p.size, p.color);
            }
        }
        
        // Restore context state
        ctx.restore();
    }
};
