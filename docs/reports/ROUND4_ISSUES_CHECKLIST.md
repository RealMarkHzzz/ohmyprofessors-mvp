# Round 4 代码审查 - 问题清单

## 🔴 严重问题（Critical）

**无** ✅

---

## 🟡 中等问题（Medium Priority）

### M1. 搜索性能：缺少 Debounce 防抖
- **文件：** `components/home/ProfessorListClient.tsx:28-31`
- **影响：** 高频重复计算，用户体验差
- **修复：** 添加 300ms debounce
- **优先级：** P0（部署前）
- **预计时间：** 30 分钟
- **状态：** [ ] 待修复

---

### M2. 缺少错误边界（Error Boundary）
- **文件：** `app/professors/[slug]/page.tsx:60-70`
- **影响：** 运行时错误导致页面崩溃
- **修复：** 添加 ErrorBoundary 组件
- **优先级：** P0（部署前）
- **预计时间：** 1 小时
- **状态：** [ ] 待修复

---

### M3. 验证逻辑不一致
- **文件：** `lib/validations.ts` vs `lib/validations/review.ts`
- **影响：** 类型不匹配，潜在运行时错误
- **修复：** 删除 `validations.ts` 中的 reviewSchema，统一使用 `validations/review.ts`
- **优先级：** P0（部署前）
- **预计时间：** 1 小时
- **状态：** [ ] 待修复

---

### M4. 动画性能：频繁触发 GSAP 动画
- **文件：** `components/home/ProfessorListClient.tsx:70-82`
- **影响：** 性能浪费，可能卡顿
- **修复：** 添加 `gsap.killTweensOf()` 和 `usePrevious` hook
- **优先级：** P1（下周）
- **预计时间：** 2 小时
- **状态：** [ ] 待修复

---

### M5. Mock 数据硬编码 ID
- **文件：** `lib/data/mock-professors.ts`, `lib/data/mock-reviews.ts`
- **影响：** ID 格式与验证 Schema 不匹配（期望 UUID）
- **修复：** 放宽验证或使用真实 UUID
- **优先级：** P0（部署前）
- **预计时间：** 1 小时
- **状态：** [ ] 待修复

---

### M6. 缺少空状态处理
- **文件：** `components/home/ProfessorListClient.tsx:250-260`
- **影响：** 边缘情况用户体验差
- **修复：** 区分"无数据"、"无搜索结果"、"加载失败"
- **优先级：** P1（下周）
- **预计时间：** 1 小时
- **状态：** [ ] 待修复

---

## 🟢 轻微问题（Minor）

### N1. TypeScript 非空断言
- **文件：** `lib/search-utils.ts:34`
- **影响：** 代码不够优��
- **修复：** 使用类型收窄替代 `!`
- **优先级：** P2
- **状态：** [ ] 待修复

---

### N2. 魔法数字（Magic Numbers）
- **文件：** 多个文件（`ProfessorListClient.tsx:200`, `ReviewCard.tsx:60`）
- **影响：** 可维护性降低
- **修复：** 提取到 `lib/constants.ts`
- **优先级：** P2
- **状态：** [ ] 待修复

---

### N3. 缺少 PropTypes 注释
- **文件：** `components/shared/ProfessorCard.tsx:5-16`
- **影响：** 文档不完整
- **修复：** 添加 JSDoc 注释
- **优先级：** P2
- **状态：** [ ] 待修复

---

### N4. console.log 残留
- **文件：** 无明显发现
- **影响：** 生产环境污染
- **修复：** 添加 ESLint 规则检查
- **优先级：** P3
- **状态：** [ ] 待添加

---

### N5. 缺少 aria-label 无障碍支持
- **文件：** `components/home/ProfessorListClient.tsx:125`
- **影响：** 屏幕阅读器支持不足
- **修复：** 添加 `aria-label` 和 `role` 属性
- **优先级：** P2
- **状态：** [ ] 待修复

---

### N6. 日期格式化时区问题
- **文件：** `lib/utils.ts:35-40`
- **影响：** 硬编码 'en-US' 语言环境
- **修复：** 使用 `undefined` 自动检测或支持国际化
- **优先级：** P3
- **状态：** [ ] 待修复

---

## 📊 统计摘要

| 严重性 | 数量 | P0 | P1 | P2 | P3 |
|--------|------|----|----|----|----|
| 🔴 严重 | 0 | - | - | - | - |
| 🟡 中等 | 6 | 4 | 2 | - | - |
| 🟢 轻微 | 5 | - | - | 3 | 2 |
| **总计** | **11** | **4** | **2** | **3** | **2** |

---

## ✅ 验收标准

### P0 必须完成（部署前）
- [ ] M1 - 搜索 debounce
- [ ] M2 - 错误边界
- [ ] M3 - 统一验证
- [ ] M5 - Mock ID 修复

**预计工作量：3.5 小时**

### P1 强烈建议（1-2周内）
- [ ] M4 - 动画性能优化
- [ ] M6 - 空状态完善

**预计工作量：3 小时**

### P2 建议优化（迭代中）
- [ ] N1, N2, N3, N5 - 代码质量提升

**预计工作量：4 小时**

---

_最后更新：2026-02-11 01:24 ACDT_
