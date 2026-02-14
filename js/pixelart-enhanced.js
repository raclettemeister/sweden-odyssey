// Sweden Odyssey — PHOTO-ENHANCED 16-bit Pixel Art Renderer
// Massively improved with authentic details from 44 real trip photos
// Cross-referenced with photos 010, 032, 050, 006, 033, 053

const PixelArt = {
    // ENHANCED 16-bit Scandinavian Palette (photo-accurate colors)
    palette: {
        // Sky colors
        skyMorning: ['#FFD4A3', '#FFB87A', '#FF9C5C', '#E88D4E'],
        skyDay: ['#87CEEB', '#6BBADD', '#5AA6CF', '#4992C1'],
        skyEvening: ['#FF6B4A', '#CC5544', '#994433', '#663322'],
        skyNight: ['#2A1A4A', '#1A0A3A', '#0A0020', '#000010'],
        
        // Nature colors (PHOTO-ACCURATE from photo references)
        pineGreen: ['#0a1f0c', '#1a2f0c', '#2D5016', '#3a6320'], // Darker from photo 006
        moss: ['#4a7c3a', '#5a8c4a', '#6a9c5a', '#7aac6a'],
        mountain: ['#3a3a4a', '#4A6B8A', '#5a7b9a', '#6a8baa'],
        snow: ['#C0D0E0', '#D0E0F0', '#E0F0F0', '#F0F0F0'],
        
        // Water colors (PHOTO-ACCURATE from photo 032, 033)
        water: ['#4a5a6a', '#5a6a7a', '#6a7a8a', '#7a8a9a'], // Greyer from photos!
        waterDeep: ['#3a4a5a', '#4a5a6a'], // Deep water
        waterReflection: 'rgba(0, 0, 0, 0.3)', // For reflection darkening
        
        // Fire colors
        fire: ['#661100', '#CC3300', '#FF6600', '#FFAA00', '#FFFF66'],
        
        // Scout colors (PHOTO-ACCURATE from photos)
        scoutRed: '#CC3333', // From photo 032 - red shirts
        scoutOrange: '#E87B35', // Neckerchief color
        skin: ['#D4A574', '#E8B896', '#FFDBAC'],
        
        // BACKPACK COLORS (PHOTO-ACCURATE from photo 010, 050)
        backpackGreen: '#66CC00', // Bright lime green from photo 010
        backpackYellow: '#FFCC00', // High-vis yellow from photo 010
        backpackRed: '#CC3333', // Red from photo 050
        backpackBlue: '#4466DD', // Royal blue from photo 050
        backpackDark: '#2a2a2a', // Dark pack (no rain cover)
        backpackStraps: '#1a1a1a', // Strap color
        backpackAccent: '#3a3a3a', // Pocket/detail color
        
        // RAFT COLORS (PHOTO-ACCURATE from photo 032)
        birchBark: '#E8D4BC', // Birch log color - tan/white
        birchBarkDark: '#C4B4AC', // Birch shadow
        ropeLashing: '#2a1a0a', // Dark rope
        logEnd: '#8a6a4a', // Raw wood end
        
        // Ground colors
        dirt: ['#5a4a3a', '#6a5a4a', '#7a6a5a', '#8a7a6a'],
        stone: ['#4a4a5a', '#5a5a6a', '#6a6a7a', '#7a7a8a'],
        boulderGrey: ['#5a5a4a', '#6a6a5a', '#7a7a6a'], // With brown tint
        grass: ['#3a5a2a', '#4a6a3a', '#5a7a4a', '#6a8a5a'],
        
        // Wood colors
        wood: ['#3a2a1a', '#4a3a2a', '#5a4a3a', '#6a5a4a'],
        deadTreeBark: '#3a3a2a', // Dead tree color from photo 006
        
        // Cattails/reeds (from photo 032)
        reedGreen: '#4a6a3a',
        reedBrown: '#6a5a3a',
        
        // Misc
        campfireAmber: '#E8A832',
        black: '#000000',
        white: '#FFFFFF'
    },
    
    // MASSIVELY EXPANDED Sprite data
    sprites: {
        // ENHANCED Scout sprite (16x16) - front view with neckerchief
        scoutFront: [
            [0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0],
            [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
            [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
            [0,0,0,0,3,8,8,3,3,8,8,3,0,0,0,0],  // Eyes
            [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
            [0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],  // Neckerchief (2=orange)
            [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],  // Red shirt
            [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0],
            [0,0,0,0,8,8,8,0,0,8,8,8,0,0,0,0],  // Legs (dark)
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
            [0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0],  // Neckerchief
            [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,8,8,0,0,0,8,8,8,0,0,0,0],  // Walking pose
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
            [0,0,0,8,8,8,0,8,8,0,0,0,0,0,0,0],  // Walking pose alt
            [0,0,0,8,8,8,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,8,8,0,0,0,8,8,8,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0]
        ],
        
        // NEW: Scout tired/slouched variant
        scoutTired: [
            [0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0],
            [0,0,0,0,0,3,3,3,3,3,3,3,0,0,0,0],
            [0,0,0,0,0,3,3,3,3,3,3,3,0,0,0,0],
            [0,0,0,0,0,3,8,8,3,8,8,3,0,0,0,0],
            [0,0,0,0,0,3,3,3,3,3,3,3,0,0,0,0],
            [0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],  // Slouched forward
            [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0],
            [0,0,0,0,8,8,8,0,8,8,8,0,0,0,0,0],
            [0,0,0,0,8,8,8,0,8,8,8,0,0,0,0,0],
            [0,0,0,8,8,8,0,0,0,8,8,0,0,0,0,0],
            [0,0,0,8,8,0,0,0,0,8,8,0,0,0,0,0],
            [0,0,8,8,8,0,0,0,0,8,8,0,0,0,0,0]
        ],
        
        // NEW: ENHANCED Backpack sprites (14x20) - BIGGER and more detailed!
        // Color variants: use different color indices for rain covers
        
        // Base backpack template (6=rain cover color, 4=body, 5=straps)
        backpack: [
            [0,0,0,0,5,5,5,5,0,0,0,0,0,0],      // Straps
            [0,0,0,5,5,4,4,5,5,0,0,0,0,0],
            [0,0,5,5,4,4,4,4,5,5,0,0,0,0],
            [0,5,5,6,6,6,6,6,6,5,5,0,0,0],      // Rain cover starts (6=cover color)
            [5,5,6,6,6,6,6,6,6,6,5,5,0,0],
            [5,6,6,6,6,6,6,6,6,6,6,5,0,0],      // Main body
            [5,6,6,6,6,6,6,6,6,6,6,5,0,0],
            [5,6,6,6,6,6,6,6,6,6,6,5,0,0],
            [5,6,6,6,6,6,6,6,6,6,6,5,0,0],
            [5,6,6,6,6,6,6,6,6,6,6,5,0,0],
            [5,6,6,6,6,6,6,6,6,6,6,5,0,0],
            [5,6,6,5,5,5,5,5,5,6,6,5,0,0],      // Front pocket
            [5,6,6,5,4,4,4,4,5,6,6,5,0,0],
            [5,6,6,5,4,4,4,4,5,6,6,5,0,0],
            [5,6,6,6,6,6,6,6,6,6,6,5,0,0],
            [0,5,6,6,6,6,6,6,6,6,5,0,0,0],      // Bottom
            [0,5,5,6,6,6,6,6,6,5,5,0,0,0],
            [0,0,5,5,6,6,6,6,5,5,0,0,0,0],
            [0,0,0,5,5,5,5,5,5,0,0,0,0,0],
            [0,0,0,0,5,5,5,5,0,0,0,0,0,0]
        ],
        
        // NEW: Backpack held high (for river crossing) - rotated/horizontal
        backpackHeld: [
            [0,0,0,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0],
            [0,0,5,5,6,6,6,6,6,6,6,6,5,5,0,0,0,0],
            [0,5,5,6,6,6,6,6,6,6,6,6,6,5,5,0,0,0],
            [5,5,6,6,6,6,6,6,6,6,6,6,6,6,5,5,0,0],
            [5,6,6,6,6,6,5,5,5,6,6,6,6,6,6,5,0,0],
            [5,6,6,6,6,6,5,4,5,6,6,6,6,6,6,5,0,0],
            [5,6,6,6,6,6,5,5,5,6,6,6,6,6,6,5,0,0],
            [5,5,6,6,6,6,6,6,6,6,6,6,6,6,5,5,0,0],
            [0,5,5,6,6,6,6,6,6,6,6,6,6,5,5,0,0,0],
            [0,0,5,5,6,6,6,6,6,6,6,6,5,5,0,0,0,0],
            [0,0,0,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0]
        ],
        
        // NEW: Hiking stick accessory (4x20)
        hikingStick: [
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [0,4,4,0],
            [4,4,4,0],
            [4,4,0,0],
            [4,0,0,0],
            [0,0,0,0]
        ],
        
        // Pine tree (32x48) - tall tree (kept from original, good quality)
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
        
        // NEW: Dead tree sprite (16x64) - bare trunk with branch stubs
        deadTree: [
            [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,5,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,5,4,1,0,0,0,0,0],
            [0,0,0,0,1,4,4,4,4,4,1,0,0,0,0,0],  // Branch stub left
            [0,0,0,0,1,5,5,4,4,4,4,1,1,0,0,0],  // Branch stub right
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,5,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,5,4,1,0,0,0,0,0],
            [0,0,0,0,1,4,4,4,4,4,1,0,0,0,0,0],  // Branch stub
            [0,0,0,1,5,5,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,1,4,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,5,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,5,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,1,4,4,4,4,4,1,0,0,0,0,0],  // Lower stubs
            [0,0,0,1,5,5,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,1,4,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,5,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,5,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,5,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,5,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,5,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,5,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,4,4,4,4,1,0,0,0,0,0],
            [0,0,0,0,0,1,1,4,4,1,1,0,0,0,0,0],
            [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        
        // NEW: LOG RAFT SPRITES - THE KEY ADDITION!
        // Small raft (48x24) - Photo-accurate from photo 032
        raftSmall: [
            // 6=birch bark, 7=birch dark, 8=rope, 9=log end
            // Top view of birch logs with rope lashing
            [0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0],
            [9,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,9],  // Log 1
            [9,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,9],  // Bark pattern
            [9,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,6,9],
            [0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0],
            [9,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,9],  // Log 2
            [9,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,9],
            [9,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,6,9],
            [0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0],
            [9,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,9],  // Log 3
            [9,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,9],
            [9,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,6,9],
            [0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0],
            [9,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,9],  // Log 4
            [9,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,9],
            [9,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,6,9],
            [0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0],
            [9,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,9],  // Log 5
            [9,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,9],
            [9,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,6,9],
            [0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0],
            [9,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,9],  // Log 6
            [9,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,9],
            [9,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,7,7,6,6,6,9]
        ],
        
        // NEW: Cattails/reeds sprite (8x24)
        cattailsShort: [
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,2,2,2,2,0,0],  // Brown cattail head
            [0,0,2,2,2,2,0,0],
            [0,0,2,2,2,2,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,1,1,1,1,0,0],  // Leaves
            [0,1,1,1,1,1,1,0],
            [1,1,1,0,0,1,1,1],
            [1,1,0,0,0,0,1,1],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0]
        ],
        
        // NEW: Boulder with moss (32x24)
        boulderLarge: [
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0],
            [0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
            [0,0,1,2,2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,3,3,2,2,2,2,2,2,1,0,0,0,0],  // 3=moss
            [0,1,2,2,2,2,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,2,2,2,2,2,2,1,0,0,0],
            [0,1,2,2,2,3,3,3,3,3,3,2,2,2,2,2,2,3,3,3,3,3,3,2,2,2,2,2,1,0,0,0],
            [1,2,2,2,2,3,3,3,3,3,3,2,2,2,2,2,2,3,3,3,3,3,3,2,2,2,2,2,2,1,0,0],
            [1,2,2,2,2,2,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,2,2,2,2,2,2,2,1,0,0],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
            [1,2,2,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,2,2,2,1,0],  // 4=darker rock
            [1,2,4,4,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,4,4,2,2,2,1],
            [1,2,4,4,4,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,4,4,4,2,2,2,1],
            [1,2,2,4,4,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,4,4,2,2,2,2,1],
            [1,2,2,2,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,2,2,2,2,2,1],
            [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
            [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
            [0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0],
            [0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0],
            [0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0],
            [0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
            [0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0],
            [0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        
        // Color key for sprites
        // 0 = transparent
        // 1 = dark outline
        // 2 = pine green dark OR orange (neckerchief) OR boulder grey
        // 3 = pine green light OR skin tone OR moss green
        // 4 = brown dark OR darker rock
        // 5 = brown light OR straps
        // 6 = rain cover color (backpack) OR birch bark (raft)
        // 7 = birch bark dark
        // 8 = black (details) OR rope lashing
        // 9 = log end (raw wood)
    },
    
    // NEW: Get backpack sprite with specific rain cover color
    getBackpackSprite(coverColor) {
        // Return customized sprite with specified cover color
        const sprite = [];
        for (let row = 0; row < this.sprites.backpack.length; row++) {
            const newRow = [];
            for (let col = 0; col < this.sprites.backpack[row].length; col++) {
                newRow.push(this.sprites.backpack[row][col]);
            }
            sprite.push(newRow);
        }
        // Store color reference with sprite
        sprite._coverColor = coverColor;
        return sprite;
    },
    
    // NEW: Get color map for backpack with rain cover
    getBackpackColorMap(coverColor) {
        // coverColor should be one of: 'green', 'yellow', 'red', 'blue', 'dark'
        const colorMap = {
            1: this.palette.black, // Outline
            4: '#1a1a1a', // Dark body
            5: this.palette.backpackStraps, // Straps
            6: this.palette.backpackDark, // Default to dark
            8: this.palette.black // Details
        };
        
        // Set rain cover color based on type
        switch(coverColor) {
            case 'green':
                colorMap[6] = this.palette.backpackGreen;
                break;
            case 'yellow':
                colorMap[6] = this.palette.backpackYellow;
                break;
            case 'red':
                colorMap[6] = this.palette.backpackRed;
                break;
            case 'blue':
                colorMap[6] = this.palette.backpackBlue;
                break;
            case 'dark':
            default:
                colorMap[6] = this.palette.backpackDark;
                break;
        }
        
        return colorMap;
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
    
    // NEW: ENHANCED water with photo-accurate grey tone
    drawWater(ctx, x, y, width, height, time) {
        // Base water color (horizontal bands) - GREYER from photos!
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
                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // Reduced from 0.3
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
                    this.drawPixelRect(ctx, x + dx, y + dy, 2, 1, 'rgba(0, 0, 0, 0.15)'); // Increased from 0.1
                }
            }
        }
    },
    
    // NEW: Draw water reflection
    drawReflection(ctx, sourceY, waterY, width, height) {
        // Flip and darken everything above water
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.translate(0, waterY * 2);
        ctx.scale(1, -1);
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = this.palette.waterReflection;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
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
