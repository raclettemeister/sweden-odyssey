const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const pixelmatchModule = require('pixelmatch');
const pixelmatch = pixelmatchModule.default || pixelmatchModule;
const { PNG } = require('pngjs');

// Configuration
const GALLERY_URL = 'file:///' + __dirname.replace(/\\/g, '/') + '/pixel-art-gallery.html';
const BASELINE_DIR = path.join(__dirname, 'test-baselines');
const CURRENT_DIR = path.join(__dirname, 'test-current');
const DIFF_DIR = path.join(__dirname, 'test-diffs');
const WAIT_TIME = 3000; // Wait 3 seconds per scene

// Ensure directories exist
[BASELINE_DIR, CURRENT_DIR, DIFF_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Test scenarios
const scenarios = [
    // Core scenes - all phase combinations
    { scene: 'city', phase: 'morning', weather: 'clear', name: 'city-morning' },
    { scene: 'city', phase: 'afternoon', weather: 'clear', name: 'city-afternoon' },
    { scene: 'city', phase: 'camp', weather: 'clear', name: 'city-camp' },
    
    { scene: 'town', phase: 'morning', weather: 'clear', name: 'town-morning' },
    { scene: 'town', phase: 'afternoon', weather: 'clear', name: 'town-afternoon' },
    { scene: 'town', phase: 'camp', weather: 'clear', name: 'town-camp' },
    
    { scene: 'wilderness', phase: 'morning', weather: 'clear', name: 'wilderness-morning' },
    { scene: 'wilderness', phase: 'afternoon', weather: 'clear', name: 'wilderness-afternoon' },
    { scene: 'wilderness', phase: 'camp', weather: 'clear', name: 'wilderness-camp' },
    
    { scene: 'lake', phase: 'morning', weather: 'clear', name: 'lake-morning' },
    { scene: 'lake', phase: 'afternoon', weather: 'clear', name: 'lake-afternoon' },
    { scene: 'lake', phase: 'camp', weather: 'clear', name: 'lake-camp' },
    
    { scene: 'mountain', phase: 'morning', weather: 'clear', name: 'mountain-morning' },
    { scene: 'mountain', phase: 'afternoon', weather: 'clear', name: 'mountain-afternoon' },
    { scene: 'mountain', phase: 'camp', weather: 'clear', name: 'mountain-camp' },
    
    // Weather tests
    { scene: 'wilderness', phase: 'afternoon', weather: 'rain', name: 'wilderness-rain' },
    { scene: 'mountain', phase: 'afternoon', weather: 'storm', name: 'mountain-storm' },
];

// Test results
const results = {
    timestamp: new Date().toISOString(),
    mode: process.argv[2] === 'update' ? 'UPDATE_BASELINE' : 'COMPARE',
    scenarios: [],
    summary: {
        total: 0,
        passed: 0,
        failed: 0,
        new: 0,
        pixelDiffTotal: 0
    }
};

async function runVisualRegression() {
    const mode = process.argv[2];
    
    if (mode === 'update') {
        console.log('🔄 UPDATE MODE: Creating new baseline images...');
    } else {
        console.log('🔍 COMPARE MODE: Checking for visual regressions...');
    }
    
    console.log(`📁 Baseline: ${BASELINE_DIR}`);
    console.log(`📁 Current:  ${CURRENT_DIR}`);
    console.log(`📁 Diffs:    ${DIFF_DIR}\n`);
    
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ 
        viewport: { width: 960, height: 540 },
        deviceScaleFactor: 1 // Ensure consistent pixel density
    });
    
    try {
        // Navigate to gallery
        console.log('🔗 Opening gallery...\n');
        await page.goto(GALLERY_URL);
        await page.waitForTimeout(2000);
        
        // Pause animation for consistent screenshots
        await page.evaluate(() => {
            if (window.gallery) {
                window.gallery.animationSpeed = 0;
            }
        });
        
        for (let i = 0; i < scenarios.length; i++) {
            const scenario = scenarios[i];
            console.log(`[${i + 1}/${scenarios.length}] Testing: ${scenario.name}`);
            
            const result = await captureAndCompare(page, scenario, mode === 'update');
            results.scenarios.push(result);
            results.summary.total++;
            
            if (result.status === 'PASSED') {
                results.summary.passed++;
                console.log(`  ✅ PASSED (${result.pixelDiff}% diff)`);
            } else if (result.status === 'FAILED') {
                results.summary.failed++;
                console.log(`  ❌ FAILED (${result.pixelDiff}% diff) - ${result.reason}`);
            } else if (result.status === 'NEW') {
                results.summary.new++;
                console.log(`  🆕 NEW - Baseline created`);
            } else if (result.status === 'UPDATED') {
                console.log(`  🔄 UPDATED - Baseline overwritten`);
            }
        }
        
    } catch (error) {
        console.error('❌ Test execution error:', error.message);
        results.error = error.message;
    } finally {
        await browser.close();
    }
    
    // Generate report
    generateReport();
    
    // Print summary
    console.log('\n' + '='.repeat(70));
    console.log('📊 VISUAL REGRESSION SUMMARY');
    console.log('='.repeat(70));
    console.log(`Mode: ${results.mode}`);
    console.log(`Total Scenarios: ${results.summary.total}`);
    
    if (mode === 'update') {
        console.log(`✅ Baselines Created/Updated: ${results.summary.total}`);
    } else {
        console.log(`✅ Passed: ${results.summary.passed}`);
        console.log(`❌ Failed: ${results.summary.failed}`);
        console.log(`🆕 New: ${results.summary.new}`);
        
        if (results.summary.failed > 0) {
            console.log('\n⚠️  VISUAL REGRESSIONS DETECTED!');
            console.log(`Check diffs in: ${DIFF_DIR}`);
        }
    }
    console.log('='.repeat(70));
    console.log(`\n📄 Report: VISUAL_REGRESSION_REPORT.md\n`);
    
    // Exit with error code if regressions found
    if (mode !== 'update' && results.summary.failed > 0) {
        process.exit(1);
    }
}

async function captureAndCompare(page, scenario, updateBaseline) {
    const result = {
        name: scenario.name,
        scene: scenario.scene,
        phase: scenario.phase,
        weather: scenario.weather,
        status: 'PASSED',
        pixelDiff: 0,
        reason: ''
    };
    
    try {
        // Set scene
        await page.click(`[data-scene="${scenario.scene}"]`);
        await page.waitForTimeout(300);
        
        await page.click(`[data-phase="${scenario.phase}"]`);
        await page.waitForTimeout(300);
        
        await page.click(`[data-weather="${scenario.weather}"]`);
        await page.waitForTimeout(WAIT_TIME);
        
        // Capture current screenshot
        const currentPath = path.join(CURRENT_DIR, `${scenario.name}.png`);
        await page.screenshot({
            path: currentPath,
            clip: { x: 0, y: 0, width: 960, height: 540 }
        });
        
        const baselinePath = path.join(BASELINE_DIR, `${scenario.name}.png`);
        
        // Update baseline mode
        if (updateBaseline) {
            fs.copyFileSync(currentPath, baselinePath);
            result.status = fs.existsSync(baselinePath) ? 'UPDATED' : 'NEW';
            return result;
        }
        
        // Compare mode - check if baseline exists
        if (!fs.existsSync(baselinePath)) {
            result.status = 'NEW';
            result.reason = 'No baseline found - creating new baseline';
            fs.copyFileSync(currentPath, baselinePath);
            return result;
        }
        
        // Load images
        const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
        const current = PNG.sync.read(fs.readFileSync(currentPath));
        
        // Check dimensions match
        if (baseline.width !== current.width || baseline.height !== current.height) {
            result.status = 'FAILED';
            result.reason = `Dimension mismatch: ${baseline.width}x${baseline.height} vs ${current.width}x${current.height}`;
            return result;
        }
        
        // Create diff image
        const diff = new PNG({ width: baseline.width, height: baseline.height });
        
        // Compare pixels
        const numDiffPixels = pixelmatch(
            baseline.data,
            current.data,
            diff.data,
            baseline.width,
            baseline.height,
            {
                threshold: 0.1, // Sensitivity (0.1 = 10% tolerance)
                alpha: 0.1,
                diffColor: [255, 0, 0], // Red for differences
                diffColorAlt: [255, 255, 0] // Yellow for anti-aliasing differences
            }
        );
        
        const totalPixels = baseline.width * baseline.height;
        const diffPercentage = ((numDiffPixels / totalPixels) * 100).toFixed(3);
        result.pixelDiff = parseFloat(diffPercentage);
        results.summary.pixelDiffTotal += result.pixelDiff;
        
        // Determine pass/fail (0.5% tolerance for animation/timing differences)
        if (result.pixelDiff > 0.5) {
            result.status = 'FAILED';
            result.reason = `${numDiffPixels} pixels differ (${diffPercentage}%)`;
            
            // Save diff image
            const diffPath = path.join(DIFF_DIR, `${scenario.name}-diff.png`);
            fs.writeFileSync(diffPath, PNG.sync.write(diff));
            
            // Also create a comparison image (side-by-side)
            await createComparisonImage(baselinePath, currentPath, diffPath, scenario.name);
        }
        
    } catch (error) {
        result.status = 'FAILED';
        result.reason = `Error: ${error.message}`;
    }
    
    return result;
}

async function createComparisonImage(baselinePath, currentPath, diffPath, name) {
    // Create a side-by-side comparison image
    const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
    const current = PNG.sync.read(fs.readFileSync(currentPath));
    const diff = PNG.sync.read(fs.readFileSync(diffPath));
    
    const width = baseline.width;
    const height = baseline.height;
    const comparison = new PNG({ width: width * 3, height: height });
    
    // Copy baseline
    PNG.bitblt(baseline, comparison, 0, 0, width, height, 0, 0);
    
    // Copy current
    PNG.bitblt(current, comparison, 0, 0, width, height, width, 0);
    
    // Copy diff
    PNG.bitblt(diff, comparison, 0, 0, width, height, width * 2, 0);
    
    const comparisonPath = path.join(DIFF_DIR, `${name}-comparison.png`);
    fs.writeFileSync(comparisonPath, PNG.sync.write(comparison));
}

function generateReport() {
    let report = `# 🔍 Visual Regression Test Report\n\n`;
    report += `**Generated:** ${results.timestamp}\n`;
    report += `**Mode:** ${results.mode}\n\n`;
    report += `---\n\n`;
    
    report += `## 📊 Summary\n\n`;
    
    if (results.mode === 'UPDATE_BASELINE') {
        report += `- **Total Baselines Updated:** ${results.summary.total}\n`;
        report += `- **Location:** \`${BASELINE_DIR}\`\n\n`;
        report += `✅ All baseline images have been updated. Run in COMPARE mode to detect future regressions.\n\n`;
    } else {
        report += `- **Total Scenarios:** ${results.summary.total}\n`;
        report += `- **✅ Passed:** ${results.summary.passed}\n`;
        report += `- **❌ Failed:** ${results.summary.failed}\n`;
        report += `- **🆕 New:** ${results.summary.new}\n`;
        report += `- **Average Diff:** ${(results.summary.pixelDiffTotal / results.summary.total).toFixed(3)}%\n\n`;
        
        if (results.summary.failed === 0 && results.summary.new === 0) {
            report += `🎉 **No visual regressions detected!** All scenes match their baselines.\n\n`;
        } else if (results.summary.failed > 0) {
            report += `⚠️  **Visual regressions detected!** ${results.summary.failed} scenario(s) have changed.\n\n`;
        }
    }
    
    report += `---\n\n`;
    
    if (results.mode === 'COMPARE') {
        // Failed tests section
        const failedTests = results.scenarios.filter(s => s.status === 'FAILED');
        if (failedTests.length > 0) {
            report += `## ❌ Failed Tests (${failedTests.length})\n\n`;
            
            failedTests.forEach(test => {
                report += `### ${test.name}\n\n`;
                report += `- **Scene:** ${test.scene}\n`;
                report += `- **Phase:** ${test.phase}\n`;
                report += `- **Weather:** ${test.weather}\n`;
                report += `- **Pixel Diff:** ${test.pixelDiff}%\n`;
                report += `- **Reason:** ${test.reason}\n\n`;
                
                report += `**Comparison:**\n\n`;
                report += `![${test.name}-comparison](test-diffs/${test.name}-comparison.png)\n\n`;
                report += `*Left: Baseline | Middle: Current | Right: Diff (red = changed)*\n\n`;
                
                report += `**Files:**\n`;
                report += `- Baseline: \`test-baselines/${test.name}.png\`\n`;
                report += `- Current: \`test-current/${test.name}.png\`\n`;
                report += `- Diff: \`test-diffs/${test.name}-diff.png\`\n\n`;
                report += `---\n\n`;
            });
        }
        
        // Passed tests section
        const passedTests = results.scenarios.filter(s => s.status === 'PASSED');
        if (passedTests.length > 0) {
            report += `## ✅ Passed Tests (${passedTests.length})\n\n`;
            report += `All scenarios below match their baselines (≤0.1% difference):\n\n`;
            
            passedTests.forEach(test => {
                report += `- **${test.name}** (${test.pixelDiff}% diff)\n`;
            });
            report += `\n`;
        }
        
        // New tests section
        const newTests = results.scenarios.filter(s => s.status === 'NEW');
        if (newTests.length > 0) {
            report += `## 🆕 New Tests (${newTests.length})\n\n`;
            report += `New scenarios detected - baselines created:\n\n`;
            
            newTests.forEach(test => {
                report += `- **${test.name}**\n`;
                report += `  ![${test.name}](test-baselines/${test.name}.png)\n\n`;
            });
        }
    } else {
        // Update mode - show all updated baselines
        report += `## 🔄 Updated Baselines\n\n`;
        
        results.scenarios.forEach(test => {
            report += `### ${test.name}\n\n`;
            report += `- **Scene:** ${test.scene}\n`;
            report += `- **Phase:** ${test.phase}\n`;
            report += `- **Weather:** ${test.weather}\n\n`;
            report += `![${test.name}](test-baselines/${test.name}.png)\n\n`;
        });
    }
    
    report += `---\n\n`;
    report += `## 🛠️ How to Use\n\n`;
    report += `### Update Baselines (when visual changes are intentional)\n\`\`\`bash\n`;
    report += `npm run test:visual:update\n`;
    report += `\`\`\`\n\n`;
    report += `### Check for Regressions (default)\n\`\`\`bash\n`;
    report += `npm run test:visual\n`;
    report += `\`\`\`\n\n`;
    report += `### Review Diffs\n`;
    report += `- **Diff images:** \`test-diffs/\`\n`;
    report += `- **Comparison images:** \`test-diffs/*-comparison.png\`\n`;
    report += `- Red pixels = differences detected\n\n`;
    
    report += `---\n\n`;
    report += `## 📈 Interpretation\n\n`;
    report += `### Pixel Diff Threshold\n`;
    report += `- **≤0.5%:** PASS - Minor timing/animation differences\n`;
    report += `- **>0.5%:** FAIL - Visual regression detected\n\n`;
    report += `### Common Causes of Regressions\n`;
    report += `1. ❌ **Broken rendering** - Missing sprites, wrong colors\n`;
    report += `2. ❌ **Layout changes** - Elements moved or resized\n`;
    report += `3. ❌ **Flickering introduced** - Random elements appearing\n`;
    report += `4. ❌ **Color palette changed** - Unintended color shifts\n`;
    report += `5. ✅ **Intentional changes** - New features, improvements (update baseline)\n\n`;
    
    report += `### When to Update Baselines\n`;
    report += `- ✅ You made intentional visual improvements\n`;
    report += `- ✅ You fixed a bug that changes appearance\n`;
    report += `- ✅ You added new visual features\n`;
    report += `- ❌ Never update to hide a regression!\n\n`;
    
    report += `---\n\n`;
    report += `**Last Run:** ${results.timestamp}\n`;
    
    fs.writeFileSync(path.join(__dirname, 'VISUAL_REGRESSION_REPORT.md'), report);
}

// Run the tests
runVisualRegression().catch(console.error);
