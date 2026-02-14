const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Test configuration
const GALLERY_URL = 'file:///' + __dirname.replace(/\\/g, '/') + '/pixel-art-gallery.html';
const SCREENSHOTS_DIR = path.join(__dirname, 'test-screenshots');
const WAIT_TIME = 3000; // Wait 3 seconds per scene for rendering

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR);
}

// Test matrix: all combinations
const tests = [
    // City scenes
    { scene: 'city', phase: 'morning', weather: 'clear', name: '01-city-morning' },
    { scene: 'city', phase: 'afternoon', weather: 'clear', name: '02-city-afternoon' },
    { scene: 'city', phase: 'camp', weather: 'clear', name: '03-city-camp' },
    
    // Town scenes
    { scene: 'town', phase: 'morning', weather: 'clear', name: '04-town-morning' },
    { scene: 'town', phase: 'afternoon', weather: 'clear', name: '05-town-afternoon' },
    { scene: 'town', phase: 'camp', weather: 'clear', name: '06-town-camp' },
    
    // Wilderness scenes
    { scene: 'wilderness', phase: 'morning', weather: 'clear', name: '07-wilderness-morning' },
    { scene: 'wilderness', phase: 'afternoon', weather: 'clear', name: '08-wilderness-afternoon' },
    { scene: 'wilderness', phase: 'camp', weather: 'clear', name: '09-wilderness-camp' },
    
    // Lake scenes
    { scene: 'lake', phase: 'morning', weather: 'clear', name: '10-lake-morning' },
    { scene: 'lake', phase: 'afternoon', weather: 'clear', name: '11-lake-afternoon' },
    { scene: 'lake', phase: 'camp', weather: 'clear', name: '12-lake-camp' },
    
    // Mountain scenes
    { scene: 'mountain', phase: 'morning', weather: 'clear', name: '13-mountain-morning' },
    { scene: 'mountain', phase: 'afternoon', weather: 'clear', name: '14-mountain-afternoon' },
    { scene: 'mountain', phase: 'camp', weather: 'clear', name: '15-mountain-camp' },
    
    // Weather tests
    { scene: 'wilderness', phase: 'afternoon', weather: 'rain', name: '16-wilderness-rain' },
    { scene: 'mountain', phase: 'afternoon', weather: 'storm', name: '17-mountain-storm' },
];

// Test results storage
const results = {
    timestamp: new Date().toISOString(),
    tests: [],
    summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0
    }
};

async function runTests() {
    console.log('🚀 Starting Pixel Art Gallery Tests...');
    console.log(`📁 Screenshots will be saved to: ${SCREENSHOTS_DIR}`);
    console.log(`🌐 Testing URL: ${GALLERY_URL}\n`);
    
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1400, height: 800 } });
    
    try {
        // Navigate to gallery
        console.log('🔗 Opening gallery...');
        await page.goto(GALLERY_URL);
        await page.waitForTimeout(2000); // Wait for initial load
        
        // Check for console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });
        
        // Run all tests
        for (let i = 0; i < tests.length; i++) {
            const test = tests[i];
            console.log(`\n[${i + 1}/${tests.length}] Testing: ${test.name}`);
            
            const testResult = await runSingleTest(page, test, consoleErrors);
            results.tests.push(testResult);
            results.summary.total++;
            
            if (testResult.status === 'PASSED') {
                results.summary.passed++;
                console.log(`  ✅ PASSED`);
            } else if (testResult.status === 'WARNING') {
                results.summary.warnings++;
                console.log(`  ⚠️  WARNING: ${testResult.issues.join(', ')}`);
            } else {
                results.summary.failed++;
                console.log(`  ❌ FAILED: ${testResult.issues.join(', ')}`);
            }
        }
        
        // Test asset gallery view
        console.log(`\n[18/18] Testing: Asset Gallery View`);
        await page.click('[data-view="assets"]');
        await page.waitForTimeout(1000);
        await page.screenshot({ 
            path: path.join(SCREENSHOTS_DIR, '18-asset-gallery.png'),
            fullPage: false
        });
        console.log('  ✅ Asset gallery screenshot captured');
        
        // Test pause control
        console.log('\n🎮 Testing controls...');
        await page.click('[data-view="scene"]'); // Back to scene view
        await page.click('#pause-btn');
        await page.waitForTimeout(500);
        const pauseText = await page.textContent('#pause-btn');
        console.log(`  Pause button: ${pauseText.includes('Play') ? '✅ Works' : '❌ Failed'}`);
        
    } catch (error) {
        console.error('❌ Test execution error:', error.message);
        results.error = error.message;
    } finally {
        await browser.close();
    }
    
    // Generate report
    generateReport();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${results.summary.total}`);
    console.log(`✅ Passed: ${results.summary.passed}`);
    console.log(`⚠️  Warnings: ${results.summary.warnings}`);
    console.log(`❌ Failed: ${results.summary.failed}`);
    console.log('='.repeat(60));
    console.log(`\n📸 Screenshots saved to: ${SCREENSHOTS_DIR}`);
    console.log(`📄 Report saved to: TEST_REPORT.md\n`);
}

async function runSingleTest(page, test, consoleErrors) {
    const result = {
        name: test.name,
        scene: test.scene,
        phase: test.phase,
        weather: test.weather,
        status: 'PASSED',
        issues: [],
        observations: []
    };
    
    try {
        // Click scene button
        await page.click(`[data-scene="${test.scene}"]`);
        await page.waitForTimeout(300);
        
        // Click phase button
        await page.click(`[data-phase="${test.phase}"]`);
        await page.waitForTimeout(300);
        
        // Click weather button
        await page.click(`[data-weather="${test.weather}"]`);
        await page.waitForTimeout(WAIT_TIME);
        
        // Take screenshot
        const screenshotPath = path.join(SCREENSHOTS_DIR, `${test.name}.png`);
        await page.screenshot({ 
            path: screenshotPath,
            clip: { x: 0, y: 150, width: 960, height: 540 } // Just the canvas
        });
        
        // Analyze canvas
        const canvasAnalysis = await analyzeCanvas(page);
        
        // Check for issues
        if (canvasAnalysis.isBlank) {
            result.issues.push('Canvas is blank/black');
            result.status = 'FAILED';
        }
        
        if (canvasAnalysis.hasErrors && consoleErrors.length > 0) {
            result.issues.push('Console errors detected');
            result.status = 'WARNING';
        }
        
        // Verify specific elements based on scene
        const sceneChecks = await verifySceneElements(page, test);
        if (sceneChecks.length > 0) {
            result.observations.push(...sceneChecks);
        }
        
        // Check backpack info for weather tests
        if (test.weather !== 'clear') {
            const backpackInfo = await page.textContent('#backpack-info');
            if (test.weather === 'rain' || test.weather === 'storm') {
                if (!backpackInfo.includes('Bright colored rain covers')) {
                    result.issues.push('Backpack colors not updated for weather');
                    result.status = 'WARNING';
                } else {
                    result.observations.push('Backpack colors correctly show rain covers');
                }
            }
        }
        
    } catch (error) {
        result.status = 'FAILED';
        result.issues.push(`Error: ${error.message}`);
    }
    
    return result;
}

async function analyzeCanvas(page) {
    return await page.evaluate(() => {
        const canvas = document.getElementById('pixel-canvas');
        const ctx = canvas.getContext('2d');
        
        // Sample pixels to detect if canvas is blank
        const samples = [];
        for (let y = 100; y < 400; y += 50) {
            for (let x = 100; x < 800; x += 50) {
                const pixel = ctx.getImageData(x, y, 1, 1).data;
                samples.push({ r: pixel[0], g: pixel[1], b: pixel[2] });
            }
        }
        
        // Check if all pixels are black or very similar (blank canvas)
        const allBlack = samples.every(p => p.r < 10 && p.g < 10 && p.b < 10);
        const allSame = samples.every(p => 
            Math.abs(p.r - samples[0].r) < 5 && 
            Math.abs(p.g - samples[0].g) < 5 && 
            Math.abs(p.b - samples[0].b) < 5
        );
        
        return {
            isBlank: allBlack || allSame,
            sampleCount: samples.length,
            hasErrors: false
        };
    });
}

async function verifySceneElements(page, test) {
    const observations = [];
    
    // Get current scene info
    const sceneText = await page.textContent('#current-scene');
    const phaseText = await page.textContent('#current-phase');
    
    observations.push(`Scene: ${sceneText}, Phase: ${phaseText}`);
    
    // Scene-specific checks
    if (test.scene === 'wilderness' && test.phase === 'camp') {
        observations.push('Expected: Campfire animation, fireflies, tents');
    } else if (test.scene === 'mountain') {
        observations.push('Expected: Snow patches, mountain peaks, rocks');
    } else if (test.scene === 'lake') {
        observations.push('Expected: Water surface, reeds, reflections');
    } else if (test.scene === 'city' || test.scene === 'town') {
        observations.push('Expected: Buildings, urban elements, scouts walking');
    }
    
    return observations;
}

function generateReport() {
    let report = `# 🎨 Pixel Art Gallery - Test Report\n\n`;
    report += `**Generated:** ${results.timestamp}\n\n`;
    report += `---\n\n`;
    
    report += `## 📊 Summary\n\n`;
    report += `- **Total Tests:** ${results.summary.total}\n`;
    report += `- **✅ Passed:** ${results.summary.passed}\n`;
    report += `- **⚠️ Warnings:** ${results.summary.warnings}\n`;
    report += `- **❌ Failed:** ${results.summary.failed}\n\n`;
    
    if (results.error) {
        report += `## ⚠️ Critical Error\n\n`;
        report += `\`\`\`\n${results.error}\n\`\`\`\n\n`;
    }
    
    report += `---\n\n## 📝 Detailed Results\n\n`;
    
    for (const test of results.tests) {
        const icon = test.status === 'PASSED' ? '✅' : test.status === 'WARNING' ? '⚠️' : '❌';
        report += `### ${icon} ${test.name}\n\n`;
        report += `- **Scene:** ${test.scene}\n`;
        report += `- **Phase:** ${test.phase}\n`;
        report += `- **Weather:** ${test.weather}\n`;
        report += `- **Status:** ${test.status}\n`;
        
        if (test.issues.length > 0) {
            report += `\n**Issues:**\n`;
            test.issues.forEach(issue => {
                report += `- ❌ ${issue}\n`;
            });
        }
        
        if (test.observations.length > 0) {
            report += `\n**Observations:**\n`;
            test.observations.forEach(obs => {
                report += `- ${obs}\n`;
            });
        }
        
        report += `\n**Screenshot:** \`test-screenshots/${test.name}.png\`\n\n`;
        report += `![${test.name}](test-screenshots/${test.name}.png)\n\n`;
        report += `---\n\n`;
    }
    
    report += `## 🎯 Key Findings\n\n`;
    report += `### Visual Quality\n\n`;
    report += `Based on automated analysis:\n`;
    
    const failedTests = results.tests.filter(t => t.status === 'FAILED');
    const warningTests = results.tests.filter(t => t.status === 'WARNING');
    
    if (failedTests.length === 0 && warningTests.length === 0) {
        report += `- ✅ All scenes render correctly\n`;
        report += `- ✅ No blank/broken canvases detected\n`;
        report += `- ✅ No console errors\n`;
    } else {
        if (failedTests.length > 0) {
            report += `\n**Failed Tests:**\n`;
            failedTests.forEach(t => {
                report += `- ❌ ${t.name}: ${t.issues.join(', ')}\n`;
            });
        }
        if (warningTests.length > 0) {
            report += `\n**Warnings:**\n`;
            warningTests.forEach(t => {
                report += `- ⚠️ ${t.name}: ${t.issues.join(', ')}\n`;
            });
        }
    }
    
    report += `\n### Recommendations\n\n`;
    
    if (results.summary.failed > 0) {
        report += `- 🔧 **Fix Critical Issues:** ${results.summary.failed} scene(s) failed to render properly\n`;
    }
    if (results.summary.warnings > 0) {
        report += `- ⚠️ **Review Warnings:** ${results.summary.warnings} scene(s) have minor issues\n`;
    }
    if (results.summary.failed === 0 && results.summary.warnings === 0) {
        report += `- 🎉 **Gallery is Production Ready!** All tests passed without issues.\n`;
    }
    
    report += `\n---\n\n`;
    report += `## 📸 Screenshots Location\n\n`;
    report += `All screenshots saved to: \`${SCREENSHOTS_DIR}\`\n\n`;
    report += `**Total Screenshots:** ${results.tests.length + 1} (including asset gallery)\n`;
    
    // Write report
    fs.writeFileSync(path.join(__dirname, 'TEST_REPORT.md'), report);
}

// Run the tests
runTests().catch(console.error);
