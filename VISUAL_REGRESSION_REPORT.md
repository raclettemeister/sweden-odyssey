# 🔍 Visual Regression Test Report

**Generated:** 2026-02-13T16:36:54.646Z
**Mode:** COMPARE

---

## 📊 Summary

- **Total Scenarios:** 17
- **✅ Passed:** 17
- **❌ Failed:** 0
- **🆕 New:** 0
- **Average Diff:** 0.034%

🎉 **No visual regressions detected!** All scenes match their baselines.

---

## ✅ Passed Tests (17)

All scenarios below match their baselines (≤0.1% difference):

- **city-morning** (0.013% diff)
- **city-afternoon** (0.005% diff)
- **city-camp** (0.004% diff)
- **town-morning** (0.003% diff)
- **town-afternoon** (0.034% diff)
- **town-camp** (0.008% diff)
- **wilderness-morning** (0.014% diff)
- **wilderness-afternoon** (0.023% diff)
- **wilderness-camp** (0.03% diff)
- **lake-morning** (0.089% diff)
- **lake-afternoon** (0.122% diff)
- **lake-camp** (0.033% diff)
- **mountain-morning** (0.105% diff)
- **mountain-afternoon** (0.007% diff)
- **mountain-camp** (0.015% diff)
- **wilderness-rain** (0.059% diff)
- **mountain-storm** (0.006% diff)

---

## 🛠️ How to Use

### Update Baselines (when visual changes are intentional)
```bash
npm run test:visual:update
```

### Check for Regressions (default)
```bash
npm run test:visual
```

### Review Diffs
- **Diff images:** `test-diffs/`
- **Comparison images:** `test-diffs/*-comparison.png`
- Red pixels = differences detected

---

## 📈 Interpretation

### Pixel Diff Threshold
- **≤0.5%:** PASS - Minor timing/animation differences
- **>0.5%:** FAIL - Visual regression detected

### Common Causes of Regressions
1. ❌ **Broken rendering** - Missing sprites, wrong colors
2. ❌ **Layout changes** - Elements moved or resized
3. ❌ **Flickering introduced** - Random elements appearing
4. ❌ **Color palette changed** - Unintended color shifts
5. ✅ **Intentional changes** - New features, improvements (update baseline)

### When to Update Baselines
- ✅ You made intentional visual improvements
- ✅ You fixed a bug that changes appearance
- ✅ You added new visual features
- ❌ Never update to hide a regression!

---

**Last Run:** 2026-02-13T16:36:54.646Z
