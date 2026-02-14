const puppeteer = require('puppeteer');

const GAME_URL = 'file:///' + __dirname.replace(/\\/g, '/') + '/index.html';

async function diagnoseGame() {
    console.log('🔍 Running Game Diagnostic...\n');
    
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1920,1080'],
        defaultViewport: { width: 1920, height: 1080 }
    });
    
    const page = await browser.newPage();
    
    const errors = [];
    const logs = [];
    
    // Capture all console messages
    page.on('console', msg => {
        const type = msg.type();
        const text = msg.text();
        const log = `[Browser ${type.toUpperCase()}] ${text}`;
        console.log(log);
        logs.push(log);
    });
    
    // Capture page errors
    page.on('pageerror', error => {
        const errorMsg = `[Browser ERROR] ${error.message}\n${error.stack}`;
        console.log(errorMsg);
        errors.push(errorMsg);
    });
    
    // Capture failed requests
    page.on('requestfailed', request => {
        console.log('[Request FAILED]', request.url(), request.failure().errorText);
    });
    
    try {
        console.log(`Opening: ${GAME_URL}\n`);
        await page.goto(GAME_URL, { waitUntil: 'networkidle0' });
        
        // Wait a bit
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Check what's loaded
        const diagnosis = await page.evaluate(() => {
            const result = {
                windowObjects: Object.keys(window).filter(k => k.match(/Game|UI|Scenes|Events/i)),
                gameExists: !!window.Game,
                canvasExists: !!document.getElementById('game-canvas'),
                scripts: Array.from(document.querySelectorAll('script')).map(s => s.src || 'inline'),
                bodyContent: document.body ? document.body.innerHTML.length : 0
            };
            
            if (window.Game) {
                result.gameState = {
                    hasCanvas: !!window.Game.canvas,
                    hasCtx: !!window.Game.ctx,
                    hasState: !!window.Game.state,
                    canvasWidth: window.Game.canvas?.width,
                    canvasHeight: window.Game.canvas?.height
                };
            }
            
            return result;
        });
        
        console.log('\n📊 Diagnostic Results:\n');
        console.log('Window Objects:', diagnosis.windowObjects);
        console.log('Game Exists:', diagnosis.gameExists ? '✅' : '❌');
        console.log('Canvas Exists:', diagnosis.canvasExists ? '✅' : '❌');
        console.log('Scripts Loaded:', diagnosis.scripts.length);
        console.log('Body Content Length:', diagnosis.bodyContent);
        
        if (diagnosis.gameState) {
            console.log('\n🎮 Game State:');
            console.log(diagnosis.gameState);
        }
        
        // Try to manually init if needed
        if (diagnosis.gameExists && !diagnosis.gameState?.hasCanvas) {
            console.log('\n🔧 Attempting manual initialization...');
            const initResult = await page.evaluate(() => {
                try {
                    if (window.Game && typeof window.Game.init === 'function') {
                        window.Game.init();
                        return { success: true, message: 'Init called' };
                    }
                    return { success: false, message: 'No init function' };
                } catch (e) {
                    return { success: false, message: e.message };
                }
            });
            console.log('Init Result:', initResult);
        }
        
        console.log('\n📋 Console Logs:', logs.length);
        console.log('❌ Errors:', errors.length);
        
        if (errors.length > 0) {
            console.log('\n🐛 JavaScript Errors Found:\n');
            errors.forEach((err, idx) => console.log(`${idx + 1}. ${err}\n`));
        }
        
        console.log('\n✅ Diagnostic complete. Browser will stay open for 60 seconds...\n');
        await new Promise(resolve => setTimeout(resolve, 60000));
        
    } catch (error) {
        console.error('❌ Diagnostic error:', error.message);
    } finally {
        await browser.close();
    }
}

diagnoseGame().catch(console.error);
