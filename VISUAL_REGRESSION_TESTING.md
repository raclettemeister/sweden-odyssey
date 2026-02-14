# 🔍 Visual Regression Testing - Complete Guide

## ✅ **Setup Complete!**

Visual regression testing with baseline images is now fully operational.

---

## 📊 **What is Visual Regression Testing?**

Visual regression testing automatically detects unintended visual changes by:
1. **Capturing screenshots** of all scenes
2. **Comparing** with baseline (reference) images
3. **Highlighting differences** pixel-by-pixel
4. **Generating reports** with visual diffs

### **Benefits:**

✅ **Catch bugs early** - Detect broken rendering immediately  
✅ **Prevent regressions** - Ensure fixes don't break other scenes  
✅ **Document changes** - Visual proof of what changed  
✅ **Save time** - Automated vs manual checking  
✅ **Confidence** - Deploy knowing visuals are correct  

---

## 🚀 **Quick Start**

### **1. Create/Update Baseline Images**

Run this when you've made intentional visual changes:

```bash
npm run test:visual:update
```

**This will:**
- Capture screenshots of all 17 scenes
- Save them as baseline images in `test-baselines/`
- Use these as reference for future tests

### **2. Check for Visual Regressions**

Run this to detect unintended visual changes:

```bash
npm run test:visual
```

**This will:**
- Capture current screenshots
- Compare with baselines
- Report any differences >0.5%
- Generate diff images if changes detected

### **3. View Results**

```bash
npm run test:visual:report    # Open report
npm run test:visual:diffs      # View diff images
```

---

## 📁 **Directory Structure**

```
sweden-odyssey/
├── test-baselines/           # ✅ Reference images (git tracked)
│   ├── city-morning.png
│   ├── wilderness-camp.png
│   └── ... (17 total)
│
├── test-current/             # 📸 Current run screenshots (gitignored)
│   └── (same filenames)
│
├── test-diffs/               # 🔍 Difference images (gitignored)
│   ├── scene-name-diff.png        # Red = differences
│   └── scene-name-comparison.png  # Side-by-side view
│
└── VISUAL_REGRESSION_REPORT.md    # 📄 Test results
```

---

## 🎯 **Test Scenarios (17 Total)**

### **Core Scenes (15):**

**City:**
- city-morning
- city-afternoon
- city-camp

**Town:**
- town-morning
- town-afternoon
- town-camp

**Wilderness:**
- wilderness-morning
- wilderness-afternoon
- wilderness-camp

**Lake:**
- lake-morning
- lake-afternoon
- lake-camp

**Mountain:**
- mountain-morning
- mountain-afternoon
- mountain-camp

### **Weather Tests (2):**

- wilderness-rain (tests rain particle system + backpack colors)
- mountain-storm (tests storm effects + backpack colors)

---

## 📈 **Understanding Results**

### **Test Output:**

```
[1/17] Testing: wilderness-camp
  ✅ PASSED (0.03% diff)
```

- **✅ PASSED** = Visual matches baseline (≤0.5% difference)
- **❌ FAILED** = Visual regression detected (>0.5% difference)
- **🆕 NEW** = No baseline exists, creating one
- **Percentage** = Pixel difference from baseline

### **Threshold: 0.5%**

- **≤0.5%:** Normal - Animation timing differences
- **>0.5%:** Regression - Actual visual change detected

### **Why 0.5%?**

Even with paused animations, some elements have slight variations:
- Particle spawn timing
- Random noise in gradients
- Anti-aliasing differences
- Sub-pixel rendering

0.5% allows for these while catching real issues.

---

## 🔧 **Common Workflows**

### **Workflow 1: Making Visual Changes**

```bash
# 1. Make your code changes
edit js/scenes.js

# 2. Test in browser
start pixel-art-gallery.html

# 3. Run visual regression test
npm run test:visual

# 4. Review differences
npm run test:visual:diffs

# 5. If changes are intentional, update baselines
npm run test:visual:update

# 6. Commit new baselines
git add test-baselines/
git commit -m "Update baselines after [feature]"
```

### **Workflow 2: Checking for Regressions**

```bash
# After any code change:
npm run test:visual

# If tests fail:
# - Check VISUAL_REGRESSION_REPORT.md
# - Review diff images in test-diffs/
# - Fix the regression OR update baseline if intentional
```

### **Workflow 3: CI/CD Integration**

```bash
# In your CI pipeline:
npm run test:visual

# Exit code:
# - 0 = All passed
# - 1 = Regressions detected (pipeline fails)
```

---

## 🎨 **Interpreting Diff Images**

### **Comparison Image Format:**

```
[Baseline] | [Current] | [Diff]
```

- **Left:** What it should look like (baseline)
- **Middle:** What it currently looks like
- **Right:** Differences highlighted in red

### **Diff Colors:**

- 🔴 **Red pixels:** Changed areas
- 🟡 **Yellow pixels:** Anti-aliasing differences
- ⚫ **Black pixels:** Identical areas

### **Common Visual Regressions:**

#### **1. Broken Sprites**

```
Symptoms: Missing textures, solid colors
Diff: Large red areas where sprites should be
Fix: Check sprite rendering code
```

#### **2. Flickering Elements**

```
Symptoms: Elements in different positions
Diff: Red patches in random locations
Fix: Review deterministic rendering fixes
```

#### **3. Color Changes**

```
Symptoms: Different hues/saturation
Diff: Entire scene has red tint
Fix: Check palette definitions
```

#### **4. Layout Shifts**

```
Symptoms: Elements moved
Diff: Red outlines showing old + new positions
Fix: Review positioning logic
```

#### **5. Z-Order Issues**

```
Symptoms: Wrong layering
Diff: Red areas where overlap changed
Fix: Check render order
```

---

## 🧪 **Testing the System**

### **Test 1: Verify System Works**

```bash
# Run test (should pass)
npm run test:visual

# Expected output:
# ✅ Passed: 17
# ❌ Failed: 0
```

### **Test 2: Simulate a Regression**

```bash
# 1. Introduce a visual change
# Edit js/scenes.js - change a color value

# 2. Run test
npm run test:visual

# 3. Should detect the change
# ❌ Failed: 1 (or more)

# 4. Review diff
npm run test:visual:diffs

# 5. Revert change and rerun
git checkout js/scenes.js
npm run test:visual

# 6. Should pass again
# ✅ Passed: 17
```

### **Test 3: Update Baselines**

```bash
# 1. Make intentional improvement
edit js/pixelart.js  # Add new feature

# 2. Test shows "regression"
npm run test:visual  # ❌ Failed

# 3. Update baseline (this is expected)
npm run test:visual:update

# 4. Rerun - now passes
npm run test:visual  # ✅ Passed
```

---

## 📊 **Sample Report Output**

```markdown
# 🔍 Visual Regression Test Report

**Generated:** 2026-02-13T17:30:00Z
**Mode:** COMPARE

## 📊 Summary

- **Total Scenarios:** 17
- **✅ Passed:** 17
- **❌ Failed:** 0
- **🆕 New:** 0
- **Average Diff:** 0.035%

🎉 **No visual regressions detected!** All scenes match their baselines.

---

## ✅ Passed Tests (17)

All scenarios below match their baselines (≤0.5% difference):

- **city-morning** (0.013% diff)
- **city-afternoon** (0.005% diff)
- **wilderness-camp** (0.030% diff)
...
```

---

## ⚙️ **Advanced Configuration**

### **Adjust Threshold**

Edit `test-visual-regression.js`:

```javascript
// Line ~200
if (result.pixelDiff > 0.5) {  // Change this value
```

**Recommendations:**
- **0.1%:** Very strict - May fail on minor differences
- **0.5%:** Balanced - Catches real issues (default)
- **1.0%:** Lenient - Only major changes detected

### **Adjust Sensitivity**

```javascript
// Line ~180
const numDiffPixels = pixelmatch(
    baseline.data,
    current.data,
    diff.data,
    baseline.width,
    baseline.height,
    {
        threshold: 0.1,  // 0.0 = strict, 1.0 = lenient
        // ...
    }
);
```

### **Add More Scenarios**

Edit the `scenarios` array:

```javascript
const scenarios = [
    { scene: 'city', phase: 'morning', weather: 'clear', name: 'city-morning' },
    // Add more:
    { scene: 'city', phase: 'morning', weather: 'rain', name: 'city-morning-rain' },
];
```

---

## 🐛 **Troubleshooting**

### **Issue: All tests failing with high % diff**

**Cause:** Animation not paused properly  
**Fix:** Check that `gallery.animationSpeed = 0` works

### **Issue: Random failures**

**Cause:** Timing issues, particles spawning  
**Fix:** Increase `WAIT_TIME` or threshold

### **Issue: Baseline images look wrong**

**Cause:** Captured during broken state  
**Solution:**
```bash
# Fix the rendering issue first
# Then recreate baselines
npm run test:visual:update
```

### **Issue: Tests pass but visual looks broken**

**Cause:** Baseline itself is broken  
**Solution:**
```bash
# View baselines
start test-baselines

# If wrong, fix code then:
npm run test:visual:update
```

---

## 📦 **What Gets Tracked in Git**

### **DO Commit:**

✅ `test-baselines/` - Reference images (critical!)  
✅ `test-visual-regression.js` - Test script  
✅ `VISUAL_REGRESSION_REPORT.md` - Last test results  

### **DO NOT Commit:**

❌ `test-current/` - Temporary screenshots  
❌ `test-diffs/` - Diff images (gitignored)  
❌ `node_modules/` - Dependencies  

**Add to `.gitignore`:**
```
test-current/
test-diffs/
```

---

## 🎯 **Best Practices**

### **1. Update Baselines Intentionally**

```bash
# ❌ BAD: Update to hide a bug
npm run test:visual:update  # After breaking something

# ✅ GOOD: Update after feature complete
# Fix the bug first, THEN:
npm run test:visual:update
```

### **2. Review Diffs Before Updating**

```bash
# Always check what changed:
npm run test:visual          # See failures
npm run test:visual:diffs    # Review visually
# THEN decide if update is correct
```

### **3. Test Frequently**

```bash
# After each significant change:
npm run test:visual

# Before committing:
npm run test:visual

# In CI/CD:
npm run test:visual  # Fails pipeline if regressions
```

### **4. Keep Baselines Updated**

```bash
# When you intentionally change visuals:
npm run test:visual:update
git add test-baselines/
git commit -m "feat: improve campfire animation"
```

### **5. Document Changes**

```bash
git commit -m "fix: correct mountain snow rendering

Visual regression tests updated - snow patches
now render with correct brightness levels.

Before: Dim snow (incorrect)
After: Bright snow (matches photos)

Baseline images updated."
```

---

## 🚀 **Integration with Existing Tests**

### **Full Test Suite:**

```bash
# Run all tests:
npm test                  # Gallery functional tests
npm run test:visual       # Visual regression tests

# Comprehensive check:
npm test && npm run test:visual
```

### **Test Matrix:**

| Test Type | Command | What It Tests | Time |
|-----------|---------|---------------|------|
| **Functional** | `npm test` | Scenes render, no errors | 73s |
| **Visual** | `npm run test:visual` | No visual regressions | 71s |
| **Combined** | Both | Full coverage | 144s |

---

## 📈 **Metrics**

### **Current Coverage:**

- ✅ **17 scenes** tested
- ✅ **5 scene types** (city, town, wilderness, lake, mountain)
- ✅ **3 phases each** (morning, afternoon, camp)
- ✅ **2 weather conditions** (rain, storm)
- ✅ **517,680 pixels** per screenshot (960×540)
- ✅ **8.8 million pixels** total checked

### **Performance:**

- **Baseline creation:** ~71 seconds (17 scenes)
- **Comparison run:** ~71 seconds (17 scenes)
- **Average per scene:** ~4.2 seconds
- **Pixel comparison:** <100ms per scene

---

## 🎉 **Success Criteria**

### **System is Working When:**

✅ All 17 scenarios pass on clean baseline  
✅ Intentional changes detected (>0.5% diff)  
✅ Diff images clearly show changes  
✅ Report accurately describes status  
✅ Update mode creates valid baselines  

### **You Know It's Protecting You When:**

✅ Catches accidental color changes  
✅ Detects broken sprite rendering  
✅ Finds layout regressions  
✅ Notices flickering issues  
✅ Prevents deploying visual bugs  

---

## 📚 **Related Documentation**

- **`TEST_REPORT.md`** - Functional test results
- **`BUGFIXES.md`** - All bug fixes documented
- **`AUTONOMOUS_TESTING_SUCCESS.md`** - Browser automation setup
- **`MCP_BROWSER_SETUP.md`** - MCP integration guide

---

## 🏆 **Achievement Unlocked**

### **Visual Regression Testing: OPERATIONAL** ✅

**Before:**
- ❌ Manual visual checking
- ❌ Bugs slip through
- ❌ No proof of changes
- ❌ Time-consuming review

**Now:**
- ✅ Automated visual verification
- ✅ Instant regression detection
- ✅ Visual proof with diffs
- ✅ 17 scenes checked in 71 seconds
- ✅ CI/CD ready

**Your pixel art gallery is now protected by automated visual regression testing!** 🎨🔒

---

**Last Updated:** February 13, 2026  
**Status:** ✅ Fully Operational  
**Coverage:** 17 scenarios, 8.8M pixels  
**Threshold:** 0.5% tolerance
