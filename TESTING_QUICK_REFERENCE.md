# 🎯 Testing Quick Reference Card

## ⚡ **Fast Commands**

```bash
npm test                    # Playwright tests (73s) ✅
npm run test:puppeteer      # Puppeteer tests (72s) ✅
npm run test:visual         # Visual regression (71s) ✅
npm run test:all            # Everything (216s) 🎯
```

---

## 📊 **What Each Test Does**

| Command | Engine | What It Checks | When to Use |
|---------|--------|----------------|-------------|
| `npm test` | Playwright | Rendering, FPS, particles | After code changes |
| `npm run test:puppeteer` | Puppeteer | Rendering, memory, performance | Alternative verification |
| `npm run test:visual` | Playwright | Pixel-perfect visuals | After visual changes |
| `npm run test:all` | All 3 | Everything | Before committing |

---

## 🎨 **Visual Regression Workflow**

```bash
# 1. Make visual change
edit js/pixelart.js

# 2. Test detects it
npm run test:visual
# ❌ Failed: 5.2% diff

# 3. Review diff
npm run test:visual:diffs

# 4. If intentional, update baseline
npm run test:visual:update

# 5. Verify
npm run test:visual
# ✅ Passed: 0.034% diff
```

---

## 🚨 **When Tests Fail**

### **Functional Test Failed:**
```bash
# Check report
cat TEST_REPORT.md

# Or
cat PUPPETEER_TEST_REPORT.md

# Look for error details
```

### **Visual Regression Failed:**
```bash
# View diffs
npm run test:visual:diffs

# Review report
npm run test:visual:report

# Fix code OR update baseline
```

---

## 📁 **Important Locations**

```
test-screenshots/           # Playwright screenshots
test-screenshots-puppeteer/ # Puppeteer screenshots
test-baselines/             # Visual regression baselines ⭐
test-diffs/                 # Diff images (when failed)
```

---

## ✅ **Current Status**

```
Playwright:         17/17 ✅
Puppeteer:          17/17 ✅
Visual Regression:  17/17 ✅
Total:              51/51 ✅ (100%)
```

---

## 🔧 **Common Issues**

**Issue:** All tests failing  
**Fix:** `npm install && npx playwright install`

**Issue:** Visual regressions detected  
**Fix:** Review diffs, fix code OR update baseline

**Issue:** Tests timeout  
**Fix:** Increase WAIT_TIME in test scripts

---

## 📚 **Full Docs**

- **`COMPLETE_TESTING_INFRASTRUCTURE.md`** - Everything
- **`AUTONOMOUS_TESTING_SUCCESS.md`** - Browser automation
- **`VISUAL_REGRESSION_TESTING.md`** - Visual testing
- **`PUPPETEER_SETUP.md`** - Puppeteer guide

---

## 🎯 **Daily Use**

```bash
# Morning: Check everything works
npm test

# After changes: Quick check
npm test

# Before commit: Full verification
npm run test:all

# After visual work: Check pixels
npm run test:visual
```

---

**🎉 You're all set! Ship with confidence!** 🚀
