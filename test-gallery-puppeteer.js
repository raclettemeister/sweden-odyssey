const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Configuration
const GALLERY_URL = 'file:///' + __dirname.replace(/\\/g, '/') + '/pixel-art-gallery.html';
const SCREENSHOTS_DIR = path.join(__dirname, 'test-screenshots-puppeteer');
const WAIT_TIME = 3000;

// Ensure directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Test scenarios
const tests = [
    { scene: 'city', phase: 'morning', weather: 'clear', name: '01-city-morning' },
    { scene: 'city', phase: 'afternoon', weather: 'clear', name: '02-city-afternoon' },
    { scene: 'city', phase: 'camp', weather: 'clear', name: '03-city-camp' },
    { scene: 'town', phase: 'morning', weather: 'clear', name: '04-town-morning' },
    { scene: 'town', phase: 'afternoon', weather: 'clear', name: '05-town-afternoon' },
    { scene: 'town', phase: 'camp', weather: 'clear', name: '06-town-camp' },
    { scene: 'wilderness', phase: 'morning', weather: 'clear', name: '07-wilderness-morning' },
    { scene: 'wilderness', phase: 'afternoon', weather: 'clear', name: '08-wilderness-afternoon' },
    { scene: 'wilderness', phase: 'camp', weather: 'clear', name: '09-wilderness-camp' },
    { scene: 'lake', phase: 'morning', weather: 'clear', name: '10-lake-morning' },
    { scene: 'lake', phase: 'afternoon', weather: 'clear', name: '11-lake-afternoon' },
    { scene: 'lake', phase: 'camp', weather: 'clear', name: '12-lake-camp' },
    { scene: 'mountain', phase: 'morning', weather: 'clear', name: '13-mountain-morning' },
    { scene: 'mountain', phase: 'afternoon', weather: 'clear', name: '14-mountain-afternoon' },
    { scene: 'mountain', phase: 'camp', weather: 'clear', name: '15-mountain-camp' },
    { scene: 'wilderness', phase: 'afternoon', weather: 'rain', name: '16-wilderness-rain' },
    { scene: 'mountain', phase: 'afternoon', weather: 'storm', name: '17-mountain-storm' },
];

// Test results
const results = {
    timestamp: new Date().toISOString(),
    engine: 'Puppeteer',
    tests: [],
    summary: { total: 0, passed: 0, failed: 0, warnings: 0 }
};

async function runTests() {
    console.log('🎭 Starting Puppeteer Gallery Tests...');
    console.log(`📁 Screenshots: ${SCREENSHOTS_DIR}`);
    console.log(`🌐 URL: ${GALLERY_URL}\n`);
    
    // Launch browser with optimized settings
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--window-size=1400,800'
        ]
    });
    
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1400, height: 800 });
    
    // Monitor console
    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });
    
    // Monitor page errors
    page.on('pageerror', error => {
        consoleErrors.push(error.message);
    });
    
    try {
        // Navigate
        console.log('🔗 Opening gallery...\n');
        await page.goto(GALLERY_URL, { waitUntil: 'networkidle0' });
        await wait(2000);
        
        // Run all tests
        for (let i = 0; i < tests.length; i++) {
            const test = tests[i];
            console.log(`[${i + 1}/${tests.length}] Testing: ${test.name}`);
            
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
        
        // Test asset gallery
        console.log(`\n[18/18] Testing: Asset Gallery View`);
        await page.click('[data-view="assets"]');
        await wait(1000);
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, '18-asset-gallery.png'),
            clip: { x: 0, y: 0, width: 1400, height: 800 }
        });
        console.log('  ✅ Asset gallery captured');
        
        // Test pause control
        console.log('\n🎮 Testing controls...');
        await page.click('[data-view="scene"]');
        await page.click('#pause-btn');
        await wait(500);
        const pauseText = await page.$eval('#pause-btn', el => el.textContent);
        console.log(`  Pause button: ${pauseText.includes('Play') ? '✅ Works' : '❌ Failed'}`);
        
        // Performance metrics
        const metrics = await page.metrics();
        console.log(`\n📊 Performance:`);
        console.log(`  - JS Heap: ${(metrics.JSHeapUsedSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`  - DOM Nodes: ${metrics.Nodes}`);
        console.log(`  - JS Event Listeners: ${metrics.JSEventListeners}`);
        
    } catch (error) {
        console.error('❌ Test execution error:', error.message);
        results.error = error.message;
    } finally {
        await browser.close();
    }
    
    // Generate report
    generateReport();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 PUPPETEER TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${results.summary.total}`);
    console.log(`✅ Passed: ${results.summary.passed}`);
    console.log(`⚠️  Warnings: ${results.summary.warnings}`);
    console.log(`❌ Failed: ${results.summary.failed}`);
    console.log('='.repeat(60));
    console.log(`\n📄 Report: PUPPETEER_TEST_REPORT.md\n`);
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
        // Click scene
        await page.click(`[data-scene="${test.scene}"]`);
        await wait(300);
        
        // Click phase
        await page.click(`[data-phase="${test.phase}"]`);
        await wait(300);
        
        // Click weather
        await page.click(`[data-weather="${test.weather}"]`);
        await wait(WAIT_TIME);
        
        // Take screenshot
        const screenshotPath = path.join(SCREENSHOTS_DIR, `${test.name}.png`);
        await page.screenshot({
            path: screenshotPath,
            clip: { x: 0, y: 150, width: 960, height: 540 }
        });
        
        // Analyze canvas
        const canvasAnalysis = await page.evaluate(() => {
            const canvas = document.getElementById('pixel-canvas');
            if (!canvas) return { error: 'Canvas not found' };
            
            const ctx = canvas.getContext('2d');
            const samples = [];
            
            // Sample pixels
            for (let y = 100; y < 400; y += 50) {
                for (let x = 100; x < 800; x += 50) {
                    const pixel = ctx.getImageData(x, y, 1, 1).data;
                    samples.push({ r: pixel[0], g: pixel[1], b: pixel[2] });
                }
            }
            
            // Check if blank
            const allBlack = samples.every(p => p.r < 10 && p.g < 10 && p.b < 10);
            const allSame = samples.every(p =>
                Math.abs(p.r - samples[0].r) < 5 &&
                Math.abs(p.g - samples[0].g) < 5 &&
                Math.abs(p.b - samples[0].b) < 5
            );
            
            return {
                isBlank: allBlack || allSame,
                sampleCount: samples.length,
                avgColor: {
                    r: samples.reduce((a, p) => a + p.r, 0) / samples.length,
                    g: samples.reduce((a, p) => a + p.g, 0) / samples.length,
                    b: samples.reduce((a, p) => a + p.b, 0) / samples.length
                }
            };
        });
        
        if (canvasAnalysis.error) {
            result.issues.push(canvasAnalysis.error);
            result.status = 'FAILED';
        } else if (canvasAnalysis.isBlank) {
            result.issues.push('Canvas is blank/black');
            result.status = 'FAILED';
        }
        
        // Check for console errors
        if (consoleErrors.length > 0) {
            result.observations.push(`Console errors: ${consoleErrors.length}`);
        }
        
        // Get scene info
        const sceneInfo = await page.evaluate(() => ({
            scene: document.getElementById('current-scene')?.textContent,
            phase: document.getElementById('current-phase')?.textContent,
            weather: document.getElementById('current-weather')?.textContent
        }));
        
        result.observations.push(`Scene: ${sceneInfo.scene}, Phase: ${sceneInfo.phase}`);
        
        // Weather-specific checks
        if (test.weather !== 'clear') {
            const backpackInfo = await page.$eval('#backpack-info', el => el.textContent);
            if (test.weather === 'rain' || test.weather === 'storm') {
                if (!backpackInfo.includes('Bright colored rain covers')) {
                    result.issues.push('Backpack colors not updated for weather');
                    result.status = 'WARNING';
                } else {
                    result.observations.push('Backpack colors correct for weather');
                }
            }
        }
        
    } catch (error) {
        result.status = 'FAILED';
        result.issues.push(`Error: ${error.message}`);
    }
    
    return result;
}

function generateReport() {
    let report = `# 🎭 Puppeteer Gallery Test Report\n\n`;
    report += `**Generated:** ${results.timestamp}\n`;
    report += `**Engine:** ${results.engine}\n\n`;
    report += `---\n\n`;
    
    report += `## 📊 Summary\n\n`;
    report += `- **Total Tests:** ${results.summary.total}\n`;
    report += `- **✅ Passed:** ${results.summary.passed}\n`;
    report += `- **⚠️ Warnings:** ${results.summary.warnings}\n`;
    report += `- **❌ Failed:** ${results.summary.failed}\n\n`;
    
    if (results.error) {
        report += `## ⚠️ Critical Error\n\n\`\`\`\n${results.error}\n\`\`\`\n\n`;
    }
    
    if (results.summary.failed === 0 && results.summary.warnings === 0) {
        report += `🎉 **All tests passed!** Gallery renders correctly with Puppeteer.\n\n`;
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
            test.issues.forEach(issue => report += `- ❌ ${issue}\n`);
        }
        
        if (test.observations.length > 0) {
            report += `\n**Observations:**\n`;
            test.observations.forEach(obs => report += `- ${obs}\n`);
        }
        
        report += `\n**Screenshot:** \`test-screenshots-puppeteer/${test.name}.png\`\n\n`;
        report += `---\n\n`;
    }
    
    report += `## 🆚 Puppeteer vs Playwright\n\n`;
    report += `**Puppeteer Advantages:**\n`;
    report += `- ✅ Mature and stable (by Google Chrome team)\n`;
    report += `- ✅ Excellent Chrome DevTools integration\n`;
    report += `- ✅ Performance monitoring built-in\n`;
    report += `- ✅ Large community and ecosystem\n`;
    report += `- ✅ Detailed metrics (heap, nodes, listeners)\n\n`;
    
    report += `**Use Puppeteer When:**\n`;
    report += `- You need Chrome-specific features\n`;
    report += `- You want detailed performance profiling\n`;
    report += `- You're scraping complex SPAs\n`;
    report += `- You need PDF generation\n\n`;
    
    fs.writeFileSync(path.join(__dirname, 'PUPPETEER_TEST_REPORT.md'), report);
}

// Run tests
runTests().catch(console.error);
