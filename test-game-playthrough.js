const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const GAME_URL = 'file:///' + __dirname.replace(/\\/g, '/') + '/index.html';
const SCREENSHOTS_DIR = path.join(__dirname, 'game-playthrough-screenshots');
const WAIT_TIME = 2000;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Ensure directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const gameReport = {
    timestamp: new Date().toISOString(),
    screenshots: [],
    interactions: [],
    observations: [],
    bugs: [],
    suggestions: [],
    gameplay: {
        started: false,
        completed: false,
        daysReached: 0,
        scoutsRemaining: 20,
        decisions: []
    }
};

let screenshotCounter = 1;

async function captureScreenshot(page, description) {
    const filename = `${String(screenshotCounter).padStart(3, '0')}-${description.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`;
    const filepath = path.join(SCREENSHOTS_DIR, filename);
    
    await page.screenshot({ path: filepath, fullPage: true });
    
    gameReport.screenshots.push({
        number: screenshotCounter,
        filename: filename,
        description: description,
        timestamp: new Date().toISOString()
    });
    
    screenshotCounter++;
    console.log(`📸 Screenshot ${screenshotCounter - 1}: ${description}`);
}

async function extractGameState(page) {
    return await page.evaluate(() => {
        if (!window.Game || !window.Game.state) {
            return null;
        }
        
        const state = window.Game.state;
        return {
            day: state.day,
            phase: state.phase,
            scouts: state.scouts,
            health: state.health,
            food: state.food,
            money: state.money,
            weather: state.weather,
            location: state.location,
            gameOver: state.gameOver
        };
    });
}

async function getVisibleText(page, selector) {
    try {
        return await page.$eval(selector, el => el.textContent || el.innerText);
    } catch (e) {
        return null;
    }
}

async function playGame() {
    console.log('🎮 Starting Autonomous Game Playthrough...');
    console.log(`🌐 Game URL: ${GAME_URL}`);
    console.log(`📁 Screenshots: ${SCREENSHOTS_DIR}\n`);
    
    const browser = await puppeteer.launch({
        headless: false,  // Keep visible to see what's happening
        args: [
            '--window-size=1920,1080',
            '--start-maximized'
        ],
        defaultViewport: { width: 1920, height: 1080 }
    });
    
    const page = await browser.newPage();
    
    // Monitor console
    page.on('console', msg => {
        if (msg.type() === 'error') {
            gameReport.bugs.push(`Console error: ${msg.text()}`);
        }
    });
    
    try {
        console.log('🔗 Opening game...\n');
        await page.goto(GAME_URL, { waitUntil: 'networkidle0' });
        await wait(2000);
        
        // Initial screenshot
        await captureScreenshot(page, 'game-loaded-initial-screen');
        
        // Wait for game to render (canvas should have content)
        console.log('⏳ Waiting for game to render...');
        await wait(3000);  // Give it time to render first frame
        
        // Check if canvas has content
        const hasContent = await page.evaluate(() => {
            const canvas = document.getElementById('game-canvas');
            if (!canvas) return false;
            
            const ctx = canvas.getContext('2d');
            const imageData = ctx.getImageData(400, 300, 100, 100);
            const pixels = imageData.data;
            
            // Check if any non-black pixels exist
            for (let i = 0; i < pixels.length; i += 4) {
                if (pixels[i] > 10 || pixels[i+1] > 10 || pixels[i+2] > 10) {
                    return true;  // Found non-black pixel
                }
            }
            return false;
        });
        
        if (!hasContent) {
            gameReport.bugs.push('WARNING: Canvas appears blank/black');
            console.log('⚠️  Canvas appears blank, but continuing...');
        } else {
            console.log('✅ Game rendering successfully\n');
            gameReport.observations.push('Game rendering correctly - city scene visible');
            gameReport.gameplay.started = true;
        }
        
        // Get initial state (may be null if window.Game not accessible)
        let gameState = await extractGameState(page);
        if (gameState) {
            console.log('📊 Initial State:', gameState);
        } else {
            console.log('📊 Game state not accessible via window.Game, using UI observation...');
            gameReport.observations.push('Using UI-based observation instead of direct state access');
        }
        
        // Look for intro/start button
        console.log('\n🎬 Looking for intro or start screen...');
        
        // Check for text box
        const textBoxVisible = await page.evaluate(() => {
            const textBox = document.getElementById('text-box');
            return textBox && textBox.style.display !== 'none';
        });
        
        if (textBoxVisible) {
            const introText = await getVisibleText(page, '#text-content');
            console.log('📖 Intro text found:', introText?.substring(0, 100) + '...');
            gameReport.interactions.push({
                action: 'Read intro text',
                content: introText?.substring(0, 200)
            });
            
            await captureScreenshot(page, 'intro-text');
            
            // Look for continue button
            const continueBtnExists = await page.$('#continue-btn');
            if (continueBtnExists) {
                // Wait for it to be visible and clickable
                try {
                    await page.waitForSelector('#continue-btn', { visible: true, timeout: 5000 });
                    console.log('🖱️  Clicking continue button...');
                    await page.click('#continue-btn');
                    await wait(2000);
                    
                    gameReport.interactions.push({ action: 'Clicked continue' });
                    gameReport.gameplay.started = true;
                    
                    await captureScreenshot(page, 'after-continue-click');
                } catch (e) {
                    console.log(`⚠️  Continue button found but not clickable: ${e.message}`);
                    gameReport.observations.push('Continue button not clickable');
                }
            }
        }
        
        // Try to play through multiple phases
        console.log('\n🎯 Starting gameplay loop...\n');
        
        for (let i = 0; i < 10; i++) {  // Play through 10 interactions
            await wait(1000);
            
            console.log(`\n--- Interaction ${i + 1} ---`);
            
            // Try to get game state
            gameState = await extractGameState(page);
            
            if (gameState) {
                console.log(`Day: ${gameState.day}, Phase: ${gameState.phase}`);
                console.log(`Scouts: ${gameState.scouts}, Health: ${gameState.health}`);
                console.log(`Food: ${gameState.food} kg, Money: ${gameState.money} SEK`);
                
                gameReport.gameplay.daysReached = gameState.day;
                gameReport.gameplay.scoutsRemaining = gameState.scouts;
                
                // Check if game over
                if (gameState.gameOver) {
                    console.log('\n💀 GAME OVER detected!');
                    await captureScreenshot(page, 'game-over-screen');
                    gameReport.gameplay.completed = true;
                    break;
                }
                
                // Take screenshot
                await captureScreenshot(page, `day-${gameState.day}-${gameState.phase}`);
            } else {
                // No direct state access, rely on UI observation
                console.log('Observing UI...');
                
                // Read day info from HUD
                const dayInfo = await getVisibleText(page, '#day-info');
                if (dayInfo) {
                    console.log(`HUD: ${dayInfo}`);
                    gameReport.observations.push(`UI shows: ${dayInfo}`);
                }
                
                // Take screenshot anyway
                await captureScreenshot(page, `interaction-${i + 1}`);
            }
            
            // Check for choices
            const choicesVisible = await page.evaluate(() => {
                const choiceBox = document.getElementById('choice-box');
                return choiceBox && choiceBox.style.display !== 'none';
            });
            
            if (choicesVisible) {
                // Get choice buttons
                const choices = await page.$$('.choice-btn');
                
                if (choices.length > 0) {
                    // Get choice text
                    const choiceTexts = await Promise.all(
                        choices.map(btn => btn.evaluate(el => el.textContent))
                    );
                    
                    console.log(`\n📋 Choices available (${choices.length}):`);
                    choiceTexts.forEach((text, idx) => {
                        console.log(`  ${idx + 1}. ${text}`);
                    });
                    
                    // Make a decision (alternate between options)
                    const choiceIndex = i % choices.length;
                    const choiceText = choiceTexts[choiceIndex];
                    
                    console.log(`\n✅ Selecting choice ${choiceIndex + 1}: "${choiceText}"`);
                    
                    await captureScreenshot(page, `choice-before-${i}`);
                    
                    await choices[choiceIndex].click();
                    await wait(1500);
                    
                    gameReport.gameplay.decisions.push({
                        day: gameState ? gameState.day : 0,
                        phase: gameState ? gameState.phase : 'unknown',
                        choice: choiceText,
                        options: choiceTexts
                    });
                    
                    await captureScreenshot(page, `choice-after-${i}`);
                }
            } else {
                // No choices, check for continue button
                const continueBtn = await page.$('#continue-btn');
                if (continueBtn) {
                    const isVisible = await continueBtn.evaluate(el => {
                        return el.offsetParent !== null;
                    });
                    
                    if (isVisible) {
                        console.log('🖱️  Clicking continue...');
                        await continueBtn.click();
                        await wait(1500);
                        
                        gameReport.interactions.push({ action: 'Clicked continue' });
                    }
                }
            }
            
            // Check for events or special screens
            const eventText = await getVisibleText(page, '#text-content');
            if (eventText && eventText.length > 10) {
                console.log(`\n📜 Event/Text: ${eventText.substring(0, 100)}...`);
                gameReport.observations.push(`Event: ${eventText.substring(0, 150)}`);
            }
            
            // Check UI tabs
            const statsVisible = await page.evaluate(() => {
                const tabOverlay = document.getElementById('tab-overlay');
                return tabOverlay && tabOverlay.style.display !== 'none';
            });
            
            if (i === 3) {  // On 4th interaction, try opening tabs
                console.log('\n🗂️  Testing UI tabs...');
                
                const tabs = ['map', 'journal', 'status', 'inventory'];
                for (const tabName of tabs) {
                    const tabBtn = await page.$(`[data-tab="${tabName}"]`);
                    if (tabBtn) {
                        console.log(`  Opening ${tabName} tab...`);
                        await tabBtn.click();
                        await wait(1000);
                        await captureScreenshot(page, `tab-${tabName}`);
                        
                        // Close tab
                        const closeBtn = await page.$('.close-tab');
                        if (closeBtn) {
                            await closeBtn.click();
                            await wait(500);
                        }
                    }
                }
            }
        }
        
        // Final state
        gameState = await extractGameState(page);
        console.log('\n📊 Final State:', gameState);
        
        await captureScreenshot(page, 'final-state');
        
        // Analyze gameplay
        console.log('\n📈 Analyzing gameplay...');
        
        if (gameReport.gameplay.daysReached > 1) {
            gameReport.observations.push(`Successfully progressed to Day ${gameReport.gameplay.daysReached}`);
        }
        
        if (gameReport.gameplay.scoutsRemaining < 20) {
            gameReport.observations.push(`Lost ${20 - gameReport.gameplay.scoutsRemaining} scouts during gameplay`);
        }
        
        if (gameReport.gameplay.decisions.length > 0) {
            gameReport.observations.push(`Made ${gameReport.gameplay.decisions.length} decisions`);
        }
        
    } catch (error) {
        console.error('❌ Error during playthrough:', error.message);
        gameReport.bugs.push(`Critical error: ${error.message}`);
        await captureScreenshot(page, 'error-state');
    } finally {
        console.log('\n🎬 Playthrough complete. Keeping browser open for review...');
        console.log('⏸️  Press Ctrl+C to close browser and generate report.\n');
        
        // Keep browser open for manual review
        await wait(30000);  // Keep open for 30 seconds
        
        await browser.close();
        generateReport();
    }
}

function generateReport() {
    console.log('\n📝 Generating playthrough report...\n');
    
    let report = `# 🎮 Sweden Odyssey - Autonomous Playthrough Report\n\n`;
    report += `**Generated:** ${gameReport.timestamp}\n`;
    report += `**Playthrough Method:** Autonomous browser automation (Puppeteer)\n\n`;
    report += `---\n\n`;
    
    // Summary
    report += `## 📊 Summary\n\n`;
    report += `- **Game Started:** ${gameReport.gameplay.started ? '✅ Yes' : '❌ No'}\n`;
    report += `- **Days Reached:** ${gameReport.gameplay.daysReached}\n`;
    report += `- **Scouts Remaining:** ${gameReport.gameplay.scoutsRemaining}/20\n`;
    report += `- **Decisions Made:** ${gameReport.gameplay.decisions.length}\n`;
    report += `- **Screenshots Captured:** ${gameReport.screenshots.length}\n`;
    report += `- **Bugs Found:** ${gameReport.bugs.length}\n`;
    report += `- **Game Completed:** ${gameReport.gameplay.completed ? '✅ Yes' : '⏳ In Progress'}\n\n`;
    
    // Bugs
    if (gameReport.bugs.length > 0) {
        report += `## 🐛 Bugs & Issues\n\n`;
        gameReport.bugs.forEach((bug, idx) => {
            report += `${idx + 1}. ❌ ${bug}\n`;
        });
        report += `\n`;
    } else {
        report += `## ✅ No Critical Bugs Found\n\n`;
        report += `The game played smoothly without major issues.\n\n`;
    }
    
    // Decisions
    if (gameReport.gameplay.decisions.length > 0) {
        report += `## 🎯 Decisions Made\n\n`;
        gameReport.gameplay.decisions.forEach((decision, idx) => {
            report += `### Decision ${idx + 1} (Day ${decision.day}, ${decision.phase})\n\n`;
            report += `**Options:**\n`;
            decision.options.forEach(opt => {
                const chosen = opt === decision.choice ? '✅' : '  ';
                report += `- ${chosen} ${opt}\n`;
            });
            report += `\n`;
        });
    }
    
    // Observations
    if (gameReport.observations.length > 0) {
        report += `## 👁️ Observations\n\n`;
        gameReport.observations.forEach((obs, idx) => {
            report += `${idx + 1}. ${obs}\n`;
        });
        report += `\n`;
    }
    
    // Screenshots
    report += `## 📸 Screenshots\n\n`;
    report += `Total captured: ${gameReport.screenshots.length}\n\n`;
    gameReport.screenshots.forEach(shot => {
        report += `### ${shot.number}. ${shot.description}\n\n`;
        report += `![${shot.description}](game-playthrough-screenshots/${shot.filename})\n\n`;
        report += `---\n\n`;
    });
    
    // Recommendations
    report += `## 💡 Recommendations\n\n`;
    
    if (gameReport.gameplay.daysReached < 3) {
        report += `- ⚠️ **Limited Progress:** Only reached Day ${gameReport.gameplay.daysReached}. Consider:\n`;
        report += `  - Simplifying initial tutorial\n`;
        report += `  - Clearer UI prompts\n`;
        report += `  - Better onboarding\n\n`;
    }
    
    if (gameReport.gameplay.scoutsRemaining < 15) {
        report += `- ⚠️ **High Scout Mortality:** Lost ${20 - gameReport.gameplay.scoutsRemaining} scouts early. Consider:\n`;
        report += `  - Balancing difficulty\n`;
        report += `  - More forgiving early events\n`;
        report += `  - Better warnings for dangerous choices\n\n`;
    }
    
    if (gameReport.bugs.length > 0) {
        report += `- ⚠️ **${gameReport.bugs.length} Bug(s) Found:** Review and fix issues listed above\n\n`;
    }
    
    report += `---\n\n`;
    report += `**Review Location:** \`game-playthrough-screenshots/\`\n`;
    report += `**Next Steps:** Review screenshots and address any issues found.\n`;
    
    fs.writeFileSync(path.join(__dirname, 'GAME_PLAYTHROUGH_REPORT.md'), report);
    
    console.log('✅ Report generated: GAME_PLAYTHROUGH_REPORT.md');
    console.log(`📸 Screenshots saved: ${SCREENSHOTS_DIR}`);
    console.log(`\n🎯 Game Playthrough Summary:`);
    console.log(`   Days Reached: ${gameReport.gameplay.daysReached}`);
    console.log(`   Scouts: ${gameReport.gameplay.scoutsRemaining}/20`);
    console.log(`   Decisions: ${gameReport.gameplay.decisions.length}`);
    console.log(`   Bugs: ${gameReport.bugs.length}`);
    console.log(`   Screenshots: ${gameReport.screenshots.length}\n`);
}

// Run playthrough
playGame().catch(console.error);
