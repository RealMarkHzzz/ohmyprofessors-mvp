# OhMyProfessors 系统级重构 - 实施计划
**日期:** 2026-02-11  
**战略:** 课程模式转型 + Conversion-Optimized Landing Page  
**预期转化率提升:** +244% to +407%

---

## 📋 Master Todo List

### Phase 1: P0 紧急任务（5-6天）

#### Task 1: Hero Section 重构（2-3天）
- [ ] 1.1 新 Slogan："为每门课程找到最好的教授"
- [ ] 1.2 万能搜索框居中（600px × 56px）
- [ ] 1.3 删除右侧演示卡片（视觉噪音）
- [ ] 1.4 单一 Primary CTA："立即搜索"（金色按钮）
- [ ] 1.5 简化副标题（1行，解释如何工作）
- [ ] 1.6 搜索框 placeholder："搜索课程代码（如 COMP 1012）或教授名..."
- [ ] 1.7 响应式适配（48px桌面/32px移动）

#### Task 2: Social Proof Bar（1-2天）
- [ ] 2.1 实时统计模块（从数据库读取）
- [ ] 2.2 3个指标：评价数、学生数、Logo
- [ ] 2.3 Heroicons 图标（不用 Emoji）
- [ ] 2.4 水平布局（桌面）/ 垂直布局（移动）
- [ ] 2.5 Adelaide University Logo 集成

#### Task 3: CTA 逻辑重构（1天）
- [ ] 3.1 删除所有次要 CTA
- [ ] 3.2 Primary CTA 金色按钮（#D4AF37）
- [ ] 3.3 Secondary CTA 改为文字链接
- [ ] 3.4 Loading 状态优化（旋转动画）
- [ ] 3.5 Hover/Active 状态（金色加深）

#### Task 4: 视觉噪音清理（1天）
- [ ] 4.1 删除所有渐变（Flat Design）
- [ ] 4.2 简化阴影（仅 subtle drop shadow）
- [ ] 4.3 删除装饰性 Badge
- [ ] 4.4 删除假数据（Popular searches, Recent reviews）
- [ ] 4.5 减少圆角（12px 统一）

---

### Phase 2: P1 重要任务（2-3周）

#### Task 5: Feature Section 收益导向重构（2-3天）
- [ ] 5.1 3列网格布局（移动端1列）
- [ ] 5.2 卡片1："找到最好的教授"（数据支撑）
- [ ] 5.3 卡片2："避开烂课"（真实案例）
- [ ] 5.4 卡片3："提升 GPA"（量化收益）
- [ ] 5.5 Lucide Icons 图标（64×64px）
- [ ] 5.6 删除功能描述，改为用户收益

#### Task 6: Typography 系统升级（1天）
- [ ] 6.1 Inter 字体族（单一字体）
- [ ] 6.2 标题：48px/32px，字重700
- [ ] 6.3 正文：16px，行高1.6
- [ ] 6.4 次要文字：14px，字重400
- [ ] 6.5 WCAG AAA 对比度验证（≥7:1）

#### Task 7: 配色方案实施（1天）
- [ ] 7.1 Primary：#171717（黑色）
- [ ] 7.2 CTA：#D4AF37（金色）
- [ ] 7.3 Background：#FFFFFF（纯白）
- [ ] 7.4 Text：#171717 / #737373
- [ ] 7.5 删除所有渐变颜色

---

### Phase 3: P2 长期优化（3-4周）

#### Task 8: Testimonial Carousel（3-4天）
- [ ] 8.1 轮播组件开发
- [ ] 8.2 真实学生评价收集（3-5条）
- [ ] 8.3 头像处理（48×48px圆形）
- [ ] 8.4 SVG 引号图标
- [ ] 8.5 自动播放 + 手动切换

#### Task 9: 课程导向数据层（2天）
- [ ] 9.1 数据库 Schema 调整（courses 表）
- [ ] 9.2 Course-Professor 关联关系
- [ ] 9.3 API 层重构（/api/courses）
- [ ] 9.4 搜索算法优化（课程优先）

#### Task 10: 性能优化（1-2天）
- [ ] 10.1 图片 lazy loading
- [ ] 10.2 字体 font-display: swap
- [ ] 10.3 删除未使用的 CSS
- [ ] 10.4 Lighthouse 审计（目标 ≥95）

---

## 🎯 DAG 任务依赖图

```
[Task 1: Hero Section] → [Task 3: CTA 逻辑]
         ↓
[Task 2: Social Proof Bar]
         ↓
[Task 4: 视觉噪音清理] → [Task 7: 配色方案]
         ↓
[Task 5: Feature Section] → [Task 6: Typography]
         ↓
[Task 8: Testimonial]
         ↓
[Task 9: 数据层] → [Task 10: 性能优化]
```

**关键路径（Critical Path）：**
Task 1 → Task 3 → Task 4 → Task 7 → Task 6 → Task 10

**并行任务组：**
- Group A：Task 1 + Task 2（可并行）
- Group B：Task 5 + Task 6（可并行）
- Group C：Task 8 + Task 9（可并行）

---

## 👥 团队分工

### CTO（Werner Vogels）
- Task 9: 数据层架构（courses 表 + API）
- Task 10: 性能优化审计

### Fullstack（DHH）
- Task 1: Hero Section 开发
- Task 3: CTA 逻辑实现
- Task 5: Feature Section 重构

### UI（Matías Duarte）
- Task 4: 视觉噪音清理
- Task 6: Typography 实施
- Task 7: 配色方案应用
- Task 2: Social Proof Bar UI

### Product（Don Norman）
- Task 8: Testimonial 内容策划
- A/B 测试方案设计
- 转化率监控

### QA（James Bach）
- 所有 Task 的测试验证
- browser-use 自动化测试
- Lighthouse 审计

---

## 📊 成功指标

### P0 完成标准（1周内）
- [ ] Hero Section 加载时间 < 1.5秒
- [ ] 搜索框点击率 ≥ 60%
- [ ] CTA 按钮点击率 ≥ 25%
- [ ] Social Proof Bar 可见性 100%

### P1 完成标准（3周内）
- [ ] Feature Cards 阅读完成率 ≥ 70%
- [ ] 页面跳出率 ≤ 35%
- [ ] 移动端体验得分 ≥ 95

### P2 完成标准（4周内）
- [ ] 整体转化率 ≥ 12%（从 8%）
- [ ] Lighthouse Performance ≥ 95
- [ ] Lighthouse Accessibility ≥ 100

---

## 🚀 启动指令

**立即执行：** 派发 DAG 小组，按照以上任务依赖关系并行开发。

**关键约��：**
- 所有修改必须符合 Flat Design 原则（无渐变、无拟物）
- 所有颜色必须通过 WCAG AAA 验证（≥7:1）
- 所有交互元素必须有 browser-use 测试覆盖
- 不得修改 Supabase Schema 的核心字段（professors 表）

**风险预警：**
- Task 9（数据层）可能影响现有功能 → 需要回滚预案
- Task 8（Testimonial）依赖用户授权 → 可能延期
- Task 10（性能优化）可能与 GSAP 动画冲突 → 需要平衡

**准备就绪，开始实施！**
