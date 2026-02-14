// Sweden Odyssey — 16-bit Pixel Art Renderer
// Authentic adventure game style pixel art system

const PixelArt = {
    // 16-bit Scandinavian Palette (limited like SNES)
    palette: {
        // Sky colors
        skyMorning: ['#FFD4A3', '#FFB87A', '#FF9C5C', '#E88D4E'],
        skyDay: ['#87CEEB', '#6BBADD', '#5AA6CF', '#4992C1'],
        skyEvening: ['#FF6B4A', '#CC5544', '#994433', '#663322'],
        skyNight: ['#2A1A4A', '#1A0A3A', '#0A0020', '#000010'],
        
        // Nature colors
        pineGreen: ['#1a2f0c', '#2D5016', '#3a6320', '#4a7c3a'],
        moss: ['#4a7c3a', '#5a8c4a', '#6a9c5a', '#7aac6a'],
        mountain: ['#3a3a4a', '#4A6B8A', '#5a7b9a', '#6a8baa'],
        snow: ['#C0D0E0', '#D0E0F0', '#E0F0F0', '#F0F0F0'],
        
        // Water colors
        water: ['#4A6B8A', '#5a7b9a', '#6B8FA3', '#7b9fb3'],
        
        // Fire colors
        fire: ['#661100', '#CC3300', '#FF6600', '#FFAA00', '#FFFF66'],
        
        // Scout colors
        scoutRed: '#CC3333',
        scoutOrange: '#E87B35',
        skin: ['#D4A574', '#E8B896', '#FFDBAC'],
        
        // Ground colors
        dirt: ['#5a4a3a', '#6a5a4a', '#7a6a5a', '#8a7a6a'],
        stone: ['#4a4a5a', '#5a5a6a', '#6a6a7a', '#7a7a8a'],
        grass: ['#3a5a2a', '#4a6a3a', '#5a7a4a', '#6a8a5a'],
        
        // Wood colors
        wood: ['#3a2a1a', '#4a3a2a', '#5a4a3a', '#6a5a4a'],
        
        // Misc
        campfireAmber: '#E8A832',
        black: '#000000',
        white: '#FFFFFF'
    },
    
    // Sprite data (8x8 or 16x16 tiles)
    sprites: {
        // Scout sprite (16x16) - front view
        scoutFront: [
            [0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0],
            [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
            [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
            [0,0,0,0,3,8,8,3,3,8,8,3,0,0,0,0],
            [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
            [0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0],
            [0,0,0,0,8,8,8,0,0,8,8,8,0,0,0,0],
            [0,0,0,0,8,8,8,0,0,8,8,8,0,0,0,0],
            [0,0,0,8,8,8,0,0,0,0,8,8,8,0,0,0],
            [0,0,0,8,8,8,0,0,0,0,8,8,8,0,0,0],
            [0,0,8,8,8,0,0,0,0,0,0,8,8,8,0,0]
        ],
        
        // Scout walking (16x16) - side view frame 1
        scoutWalk1: [
            [0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0],
            [0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0],
            [0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0],
            [0,0,0,0,3,8,8,3,3,3,3,0,0,0,0,0],
            [0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0],
            [0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,8,8,0,0,0,8,8,8,0,0,0,0],
            [0,0,0,8,8,8,0,0,0,8,8,8,0,0,0,0],
            [0,0,8,8,8,0,0,0,0,0,8,8,0,0,0,0],
            [0,0,8,8,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        
        // Scout walking frame 2
        scoutWalk2: [
            [0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0],
            [0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0],
            [0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0],
            [0,0,0,0,3,8,8,3,3,3,3,0,0,0,0,0],
            [0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0],
            [0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0],
            [0,0,0,8,8,8,0,8,8,0,0,0,0,0,0,0],
            [0,0,0,8,8,8,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,8,8,0,0,0,8,8,8,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0]
        ],
        
        // Backpack sprite (12x16)
        // 4 = main body, 5 = straps/accents
        backpack: [
            [0,0,0,0,5,5,5,5,0,0,0,0],      // Top straps
            [0,0,0,5,4,4,4,4,5,0,0,0],      // Strap + body
            [0,0,5,4,4,4,4,4,4,5,0,0],      // Main body starts
            [0,5,4,4,4,4,4,4,4,4,5,0],
            [0,5,4,4,4,4,4,4,4,4,5,0],      // Main pack body (dark)
            [5,4,4,4,4,4,4,4,4,4,4,5],
            [5,4,4,4,4,4,4,4,4,4,4,5],
            [5,4,4,4,4,4,4,4,4,4,4,5],
            [5,4,4,4,4,4,4,4,4,4,4,5],
            [5,4,4,4,4,4,4,4,4,4,4,5],
            [5,4,4,4,5,5,5,5,4,4,4,5],      // Front pocket (accent)
            [5,4,4,4,5,4,4,5,4,4,4,5],
            [5,4,4,4,4,4,4,4,4,4,4,5],      // Bottom straps
            [0,5,4,4,4,4,4,4,4,4,5,0],
            [0,0,5,5,4,4,4,4,5,5,0,0],
            [0,0,0,5,5,5,5,5,5,0,0,0]       // Bottom straps
        ],
        
        // Pine tree (32x48) - tall tree
        pineTree: [
            // Top of tree (triangle shape)
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,1,1,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,1,1,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,1,1,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0],
            [0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0],
            [0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0],
            [0,0,0,0,1,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,3,3,2,2,2,1,0,0,0,0],
            // Middle sections
            [0,0,0,1,1,2,2,3,3,3,3,2,2,2,2,2,2,2,2,2,2,3,3,3,3,2,2,1,1,0,0,0],
            [0,0,1,1,2,2,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,2,2,1,1,0,0],
            [0,0,1,2,2,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,2,2,1,0,0],
            [0,1,1,2,2,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,2,2,1,1,0],
            [0,1,2,2,2,2,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,2,2,2,2,1,0],
            [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
            [1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            // Lower branches
            [0,1,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,2,2,2,1,0],
            [0,1,1,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,2,2,1,1,0],
            [0,0,1,2,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,2,2,2,1,0,0],
            [0,0,1,1,2,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,3,3,3,3,2,2,2,1,1,0,0,0],
            [0,0,0,1,1,2,2,2,3,3,3,2,2,2,2,2,2,2,3,3,3,3,2,2,2,1,1,0,0,0,0,0],
            [0,0,0,0,1,1,2,2,2,3,3,2,2,2,2,2,2,2,3,3,2,2,2,2,1,1,0,0,0,0,0,0],
            [0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0,0],
            // Trunk
            [0,0,0,0,0,0,0,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,4,4,5,5,4,4,4,5,5,4,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,4,5,5,5,4,4,4,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,4,5,5,5,4,4,4,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,4,4,5,5,4,4,4,4,5,4,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,1,4,4,4,4,4,4,4,4,1,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,1,1,1,4,4,4,4,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        
        // Color key for sprites
        // 0 = transparent
        // 1 = dark outline
        // 2 = pine green dark
        // 3 = pine green light
        // 4 = brown dark
        // 5 = brown light
        // 8 = black (details)
    },
    
    // Render a sprite to canvas
    drawSprite(ctx, sprite, x, y, colorMap, scale = 1) {
        const height = sprite.length;
        const width = sprite[0].length;
        
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const colorIndex = sprite[row][col];
                if (colorIndex === 0) continue; // Transparent
                
                const color = colorMap[colorIndex];
                if (color) {
                    ctx.fillStyle = color;
                    ctx.fillRect(
                        Math.floor(x + col * scale),
                        Math.floor(y + row * scale),
                        scale,
                        scale
                    );
                }
            }
        }
    },
    
    // Draw a scaled pixel
    drawPixel(ctx, x, y, color, size = 2) {
        ctx.fillStyle = color;
        ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
    },
    
    // Draw a rect with pixel-perfect edges
    drawPixelRect(ctx, x, y, w, h, color) {
        ctx.fillStyle = color;
        ctx.fillRect(Math.floor(x), Math.floor(y), w, h);
    },
    
    // Dithering pattern for gradients (16-bit style)
    ditherPattern: [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5]
    ],
    
    // Draw dithered gradient
    drawDitheredGradient(ctx, x, y, w, h, color1, color2) {
        for (let row = 0; row < h; row++) {
            for (let col = 0; col < w; col++) {
                const threshold = this.ditherPattern[row % 4][col % 4];
                const ratio = row / h;
                const useColor2 = (ratio * 16) > threshold;
                ctx.fillStyle = useColor2 ? color2 : color1;
                ctx.fillRect(x + col, y + row, 1, 1);
            }
        }
    },
    
    // Draw building (16-bit adventure style)
    drawBuilding(ctx, x, y, width, height, roofColor, wallColor, windowColor) {
        // Walls
        this.drawPixelRect(ctx, x, y + height * 0.3, width, height * 0.7, wallColor[0]);
        
        // Wall shading
        for (let i = 0; i < width; i += 4) {
            this.drawPixelRect(ctx, x + i, y + height * 0.3, 2, height * 0.7, wallColor[1]);
        }
        
        // Roof
        ctx.fillStyle = roofColor[0];
        ctx.beginPath();
        ctx.moveTo(x - 5, y + height * 0.3);
        ctx.lineTo(x + width / 2, y);
        ctx.lineTo(x + width + 5, y + height * 0.3);
        ctx.closePath();
        ctx.fill();
        
        // Roof shading
        ctx.fillStyle = roofColor[1];
        ctx.beginPath();
        ctx.moveTo(x + width / 2, y);
        ctx.lineTo(x + width + 5, y + height * 0.3);
        ctx.lineTo(x + width, y + height * 0.3);
        ctx.closePath();
        ctx.fill();
        
        // Windows
        const windowsPerRow = Math.floor(width / 20);
        const windowRows = Math.floor(height * 0.5 / 20);
        
        for (let row = 0; row < windowRows; row++) {
            for (let col = 0; col < windowsPerRow; col++) {
                const wx = x + 10 + col * 20;
                const wy = y + height * 0.4 + row * 20;
                
                // Window frame
                this.drawPixelRect(ctx, wx, wy, 8, 10, this.palette.stone[2]);
                // Window pane
                this.drawPixelRect(ctx, wx + 1, wy + 1, 6, 8, windowColor);
                // Window cross
                this.drawPixelRect(ctx, wx + 3, wy, 2, 10, this.palette.stone[3]);
                this.drawPixelRect(ctx, wx, wy + 4, 8, 2, this.palette.stone[3]);
            }
        }
    },
    
    // Draw mountain (16-bit layered style)
    drawMountain(ctx, x, y, width, height, baseColor, shadowColor, snowColor) {
        // Mountain outline (triangular)
        ctx.fillStyle = baseColor[2];
        ctx.beginPath();
        ctx.moveTo(x, y + height);
        ctx.lineTo(x + width * 0.3, y + height * 0.4);
        ctx.lineTo(x + width * 0.5, y);
        ctx.lineTo(x + width * 0.7, y + height * 0.5);
        ctx.lineTo(x + width, y + height);
        ctx.closePath();
        ctx.fill();
        
        // Shadow side
        ctx.fillStyle = shadowColor[0];
        ctx.beginPath();
        ctx.moveTo(x + width * 0.5, y);
        ctx.lineTo(x + width * 0.7, y + height * 0.5);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x + width * 0.5, y + height);
        ctx.closePath();
        ctx.fill();
        
        // Snow cap
        ctx.fillStyle = snowColor[2];
        ctx.beginPath();
        ctx.moveTo(x + width * 0.4, y + height * 0.2);
        ctx.lineTo(x + width * 0.5, y);
        ctx.lineTo(x + width * 0.6, y + height * 0.25);
        ctx.lineTo(x + width * 0.55, y + height * 0.3);
        ctx.lineTo(x + width * 0.45, y + height * 0.28);
        ctx.closePath();
        ctx.fill();
        
        // Snow highlights (deterministic - no flickering)
        ctx.fillStyle = snowColor[3];
        for (let i = 0; i < 5; i++) {
            const sx = x + width * 0.4 + (Math.sin(x * 0.1 + i * 2.1) * 0.5 + 0.5) * width * 0.2;
            const sy = y + height * 0.15 + (Math.sin(x * 0.15 + i * 3.4) * 0.5 + 0.5) * height * 0.2;
            const sw = 2 + (Math.sin(x * 0.2 + i * 1.8) * 0.5 + 0.5) * 4;
            const sh = 2 + (Math.sin(x * 0.18 + i * 2.6) * 0.5 + 0.5) * 3;
            this.drawPixelRect(ctx, sx, sy, sw, sh, snowColor[3]);
        }
    },
    
    // Draw campfire (animated, 16-bit style)
    drawCampfire(ctx, x, y, time) {
        // Logs
        const logPositions = [
            { x: x - 25, y: y, w: 50, h: 8, angle: 0 },
            { x: x - 30, y: y - 5, w: 60, h: 8, angle: 0.3 },
            { x: x - 20, y: y + 5, w: 40, h: 6, angle: -0.2 }
        ];
        
        logPositions.forEach(log => {
            ctx.save();
            ctx.translate(log.x + log.w / 2, log.y + log.h / 2);
            ctx.rotate(log.angle);
            
            // Log body
            this.drawPixelRect(ctx, -log.w / 2, -log.h / 2, log.w, log.h, this.palette.wood[1]);
            // Log bark texture
            for (let i = 0; i < log.w; i += 6) {
                this.drawPixelRect(ctx, -log.w / 2 + i, -log.h / 2, 2, log.h, this.palette.wood[0]);
            }
            // Log highlight
            this.drawPixelRect(ctx, -log.w / 2, -log.h / 2 + 2, log.w, 2, this.palette.wood[2]);
            
            ctx.restore();
        });
        
        // Fire flames (animated)
        const flames = [
            { x: x - 12, y: y - 10, height: 25 + Math.sin(time * 4) * 8, width: 12 },
            { x: x, y: y - 15, height: 35 + Math.sin(time * 5 + 1) * 10, width: 16 },
            { x: x + 10, y: y - 8, height: 22 + Math.sin(time * 4.5 + 2) * 6, width: 10 }
        ];
        
        flames.forEach(flame => {
            // Base (red)
            ctx.fillStyle = this.palette.fire[1];
            ctx.beginPath();
            ctx.moveTo(flame.x, y);
            ctx.lineTo(flame.x - flame.width / 2, y - flame.height * 0.3);
            ctx.lineTo(flame.x, y - flame.height * 0.6);
            ctx.lineTo(flame.x + flame.width / 2, y - flame.height * 0.3);
            ctx.closePath();
            ctx.fill();
            
            // Middle (orange)
            ctx.fillStyle = this.palette.fire[2];
            ctx.beginPath();
            ctx.moveTo(flame.x, y - flame.height * 0.2);
            ctx.lineTo(flame.x - flame.width / 3, y - flame.height * 0.5);
            ctx.lineTo(flame.x, y - flame.height * 0.8);
            ctx.lineTo(flame.x + flame.width / 3, y - flame.height * 0.5);
            ctx.closePath();
            ctx.fill();
            
            // Top (yellow)
            ctx.fillStyle = this.palette.fire[3];
            ctx.beginPath();
            ctx.moveTo(flame.x, y - flame.height * 0.5);
            ctx.lineTo(flame.x - flame.width / 4, y - flame.height * 0.75);
            ctx.lineTo(flame.x, y - flame.height);
            ctx.lineTo(flame.x + flame.width / 4, y - flame.height * 0.75);
            ctx.closePath();
            ctx.fill();
            
            // Bright tip
            this.drawPixelRect(ctx, flame.x - 2, y - flame.height - 2, 4, 4, this.palette.fire[4]);
        });
        
        // Embers/sparks
        for (let i = 0; i < 8; i++) {
            const angle = (time * 2 + i) % (Math.PI * 2);
            const distance = 15 + Math.sin(time * 3 + i) * 10;
            const sx = x + Math.cos(angle) * distance;
            const sy = y - 20 - Math.abs(Math.sin(angle)) * 15;
            const brightness = Math.sin(time * 4 + i * 0.7);
            
            if (brightness > 0) {
                this.drawPixelRect(ctx, sx, sy, 2, 2, this.palette.fire[3]);
            }
        }
    },
    
    // Draw water with reflection (16-bit style)
    drawWater(ctx, x, y, width, height, time) {
        // Base water color (horizontal bands)
        for (let i = 0; i < height; i += 4) {
            const colorIndex = Math.floor((i / height) * 3);
            this.drawPixelRect(ctx, x, y + i, width, 4, this.palette.water[colorIndex]);
        }
        
        // Wave animation
        for (let wave = 0; wave < 6; wave++) {
            const waveY = y + (wave * height / 6) + Math.sin(time * 2 + wave) * 3;
            const waveLength = 40 + wave * 10;
            
            for (let wx = 0; wx < width; wx += waveLength) {
                const waveX = wx + (time * 30 + wave * 20) % waveLength;
                
                // Highlight
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.beginPath();
                ctx.moveTo(x + waveX, waveY);
                ctx.lineTo(x + waveX + 20, waveY);
                ctx.lineTo(x + waveX + 18, waveY + 2);
                ctx.lineTo(x + waveX + 2, waveY + 2);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        // Dithered darker areas (depth)
        for (let dy = 0; dy < height; dy++) {
            for (let dx = 0; dx < width; dx += 4) {
                if (this.ditherPattern[dy % 4][(dx / 4) % 4] > 8) {
                    this.drawPixelRect(ctx, x + dx, y + dy, 2, 1, 'rgba(0, 0, 0, 0.1)');
                }
            }
        }
    },
    
    // Draw grass/ground tiles (deterministic - no flickering)
    drawGrassTile(ctx, x, y, width, height) {
        // Base grass color
        this.drawPixelRect(ctx, x, y, width, height, this.palette.grass[1]);
        
        // Grass blades (scattered, deterministic)
        const bladeCount = Math.floor(width / 4);
        for (let i = 0; i < bladeCount; i++) {
            const bx = x + (i * 4) + (Math.sin(i * 3.7) * 0.5 + 0.5) * 2; // Deterministic offset
            const by = y + (Math.sin(i * 2.9) * 0.5 + 0.5) * height; // Deterministic y
            const bladeHeight = 2 + (Math.sin(i * 4.1) * 0.5 + 0.5) * 3; // Deterministic height
            
            // Blade
            this.drawPixelRect(ctx, bx, by - bladeHeight, 1, bladeHeight, this.palette.grass[2]);
            // Blade tip
            this.drawPixel(ctx, bx, by - bladeHeight - 1, this.palette.grass[3], 1);
        }
        
        // Darker patches (deterministic pattern)
        for (let dy = 0; dy < height; dy += 4) {
            for (let dx = 0; dx < width; dx += 4) {
                // Use dither pattern for consistent dark patches
                if (this.ditherPattern[dy % 4][dx % 4] > 10) {
                    this.drawPixelRect(ctx, x + dx, y + dy, 3, 3, this.palette.grass[0]);
                }
            }
        }
    },
    
    // Sky gradient (16-bit dithered style)
    drawSky(ctx, width, height, phase) {
        let colors;
        if (phase === 'morning') {
            colors = this.palette.skyMorning;
        } else if (phase === 'camp') {
            colors = this.palette.skyEvening;
        } else {
            colors = this.palette.skyDay;
        }
        
        // Gradient in bands
        const bandHeight = Math.floor(height / colors.length);
        for (let i = 0; i < colors.length; i++) {
            this.drawPixelRect(ctx, 0, i * bandHeight, width, bandHeight, colors[i]);
        }
        
        // Dithered transitions between bands
        for (let i = 0; i < colors.length - 1; i++) {
            const transY = (i + 1) * bandHeight - 4;
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < width; col++) {
                    const threshold = this.ditherPattern[row % 4][col % 4];
                    if ((row / 8) * 16 > threshold) {
                        this.drawPixel(ctx, col, transY + row, colors[i + 1], 1);
                    }
                }
            }
        }
    }
};
