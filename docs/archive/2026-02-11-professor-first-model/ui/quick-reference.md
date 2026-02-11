# OhMyProfessors UI 设计系统快速参考卡

**给开发者的 5 分钟速查手册**

---

## 🎨 配色方案（直接复制使用）

```css
:root {
  /* Primary Colors */
  --color-primary: #171717;       /* 黑色 - 主要文字/图标 */
  --color-secondary: #404040;     /* 深灰 - 次要文字 */
  --color-cta: #D4AF37;           /* 金色 - CTA 按钮 */
  
  /* Backgrounds */
  --color-bg: #FFFFFF;            /* 纯白 - 主背景 */
  --color-bg-subtle: #F8FAFC;     /* 浅灰蓝 - 次要背景 */
  
  /* Text */
  --color-text-primary: #171717;  /* 主要文字 */
  --color-text-muted: #94A3B8;    /* 占位符/次要说明 */
  
  /* Borders */
  --color-border: #E2E8F0;        /* 默认边框 */
  --color-border-focus: #171717;  /* 聚焦边框 */
  
  /* Semantic */
  --color-success: #10B981;       /* 成功/已验证 */
  --color-warning: #F59E0B;       /* 警告/中等评分 */
  --color-error: #EF4444;         /* 错误/负面 */
  --color-info: #3B82F6;          /* 信息/链接 */
}
```

---

## 📏 Spacing System（8px Grid）

```css
:root {
  --space-1: 4px;    /* 0.25rem - 极紧凑 */
  --space-2: 8px;    /* 0.5rem  - 紧凑 */
  --space-3: 12px;   /* 0.75rem - 标准 */
  --space-4: 16px;   /* 1rem    - 常规 */
  --space-6: 24px;   /* 1.5rem  - 宽松 */
  --space-8: 32px;   /* 2rem    - 大 */
  --space-12: 48px;  /* 3rem    - 超大 */
  --space-16: 64px;  /* 4rem    - 巨大 */
}
```

**快速规则**：
- 按钮内边距：`12px 24px`（垂直 水平）
- 卡片内边距：`24px`（标准）/ `32px`（宽松）
- Section 间距：`64px`（移动）/ `80px`（桌面）

---

## 🔤 Typography（Inter 单一字体族）

### Google Fonts 引入

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Inter', sans-serif;
}
```

### 字号阶梯

| 元素 | 桌面 | 移动 | 字重 | 行高 |
|------|------|------|------|------|
| **H1** | 48px | 28px | 700 | 1.2 |
| **H2** | 36px | 28px | 600 | 1.3 |
| **H3** | 28px | 22px | 600 | 1.4 |
| **Body** | 16px | 16px | 400 | 1.6 |
| **Small** | 14px | 14px | 400 | 1.5 |

### CSS 快速实现

```css
h1 {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-primary);
}

@media (max-width: 767px) {
  h1 { font-size: 28px; }
}

body {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text-primary);
}
```

---

## 🔘 按钮样式

### Primary Button（金色 CTA）

```html
<button class="btn-primary">立即搜索</button>
```

```css
.btn-primary {
  background: var(--color-cta);
  color: #FFFFFF;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  min-height: 56px;  /* 移动端触控友好 */
}

.btn-primary:hover {
  background: rgba(212, 175, 55, 0.9);
  transform: translateY(-1px);
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
}

@media (max-width: 767px) {
  .btn-primary {
    width: 100%;  /* 移动端全宽 */
  }
}
```

### Secondary Button（边框按钮）

```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-secondary:hover {
  background: var(--color-bg-subtle);
}
```

---

## 📦 卡片样式

### Standard Card

```html
<div class="card">
  <h3>卡片标题</h3>
  <p>卡片内容...</p>
</div>
```

```css
.card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  transition: all 200ms ease;
}

.card:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  cursor: pointer;
}
```

### Feature Card（带图标）

```html
<div class="feature-card">
  <div class="icon-wrapper">
    <svg><!-- Lucide 图标 --></svg>
  </div>
  <h4>功能标题</h4>
  <p>功能描述...</p>
</div>
```

```css
.feature-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  transition: all 200ms ease;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  background: var(--color-bg-subtle);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.icon-wrapper svg {
  width: 64px;
  height: 64px;
  color: var(--color-primary);
}
```

---

## 🔍 搜索框

```html
<div class="search-container">
  <input 
    type="text" 
    class="search-input" 
    placeholder="搜索课程代码（如 COMP 1012）或教授名..."
  />
  <button class="btn-primary">立即搜索</button>
</div>
```

```css
.search-container {
  display: flex;
  gap: 12px;
  max-width: 800px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  height: 56px;
  padding: 12px 16px;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  font-size: 16px;  /* 移动端防止自动缩放 */
  transition: all 200ms ease;
}

.search-input:focus {
  border-color: var(--color-border-focus);
  outline: none;
  box-shadow: 0 0 0 3px rgba(23, 23, 23, 0.12);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

@media (max-width: 767px) {
  .search-container {
    flex-direction: column;
  }
}
```

---

## 📊 Social Proof Bar

```html
<div class="social-proof-bar">
  <div class="proof-item">
    <svg class="proof-icon"><!-- ChatBubbleLeftRightIcon --></svg>
    <div class="proof-number">50,000+</div>
    <div class="proof-label">条真实评价</div>
  </div>
  <div class="proof-item">
    <svg class="proof-icon"><!-- AcademicCapIcon --></svg>
    <div class="proof-number">1,200+</div>
    <div class="proof-label">门课程</div>
  </div>
  <div class="proof-item">
    <svg class="proof-icon"><!-- StarIcon --></svg>
    <div class="proof-number" style="color: var(--color-cta)">98%</div>
    <div class="proof-label">学生推荐</div>
  </div>
</div>
```

```css
.social-proof-bar {
  background: var(--color-bg-subtle);
  padding: 32px 16px;
  display: flex;
  justify-content: center;
  gap: 48px;
}

.proof-item {
  text-align: center;
}

.proof-icon {
  width: 32px;
  height: 32px;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.proof-number {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 4px;
}

.proof-label {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-secondary);
}

@media (max-width: 767px) {
  .social-proof-bar {
    flex-direction: column;
    gap: 24px;
  }
}
```

---

## 🗨️ Testimonial Card

```html
<div class="testimonial-card">
  <svg class="quote-icon"><!-- 引号图标 --></svg>
  <div class="testimonial-header">
    <img src="avatar.jpg" alt="李明" class="avatar" />
    <div>
      <div class="name">李明</div>
      <div class="title">数据科学 大四学生</div>
    </div>
  </div>
  <p class="testimonial-text">通过 OhMyProfessors...</p>
</div>
```

```css
.testimonial-card {
  background: var(--color-bg-subtle);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.quote-icon {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 24px;
  height: 24px;
  color: var(--color-cta);
  opacity: 0.8;
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #FFFFFF;
}

.name {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-primary);
}

.title {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-secondary);
}

.testimonial-text {
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-primary);
}
```

---

## 📱 响应式断点

```css
/* 移动优先（默认样式为移动端） */

/* 平板 */
@media (min-width: 768px) {
  /* 2 列布局、增大间距 */
}

/* 桌面 */
@media (min-width: 1024px) {
  /* 3 列布局、最大间距 */
}
```

### 快速示例（Feature Cards）

```css
.feature-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;  /* 移动端 1 列 */
}

@media (min-width: 768px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);  /* 平板 2 列 */
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .feature-grid {
    grid-template-columns: repeat(3, 1fr);  /* 桌面 3 列 */
  }
}
```

---

## ✅ Flat Design 检查清单

在提交代码前，确保符合 Flat Design 约束：

- [ ] **无渐变**：背景使用纯色（`background: #FFFFFF` ✅ / `background: linear-gradient(...)` ❌）
- [ ] **轻微阴影**：仅使用 `box-shadow: 0 4px 6px rgba(0,0,0,0.1)` 级别
- [ ] **边框优先**：卡片使用边框而非阴影区分
- [ ] **SVG 图标**：使用 Heroicons/Lucide（❌ 不用 Emoji）
- [ ] **cursor: pointer**：所有可点击元素必须有
- [ ] **过渡动画**：150-300ms `ease`

---

## 🚫 常见��误（避免）

### ❌ 错误示例

```css
/* 错误 1：使用渐变 */
background: linear-gradient(to right, #171717, #404040);

/* 错误 2：过度阴影 */
box-shadow: 0 20px 40px rgba(0,0,0,0.3);

/* 错误 3：拟物化效果 */
transform: perspective(1000px) rotateY(10deg);

/* 错误 4：复杂动画 */
transition: all 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* 错误 5：文字对比度不足 */
color: #94A3B8;  /* 在白色背景上仅 4.6:1，不符合正文标准 */
```

### ✅ 正确示例

```css
/* 正确 1：纯色背景 */
background: #FFFFFF;

/* 正确 2：轻微阴影 */
box-shadow: 0 4px 6px rgba(0,0,0,0.1);

/* 正确 3：简单变换 */
transform: translateY(-2px);

/* 正确 4：流畅动画 */
transition: all 200ms ease;

/* 正确 5：高对比度文字 */
color: #171717;  /* 对比度 14.2:1，WCAG AAA */
```

---

## 🎯 图标使用指南

### Heroicons（推荐用于 Social Proof/导航）

```html
<!-- 安装 -->
npm install @heroicons/react

<!-- 使用（React） -->
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

<ChatBubbleLeftRightIcon className="w-8 h-8 text-primary" />
```

### Lucide Icons（推荐用于 Feature Cards）

```html
<!-- CDN -->
<script src="https://unpkg.com/lucide@latest"></script>
<script>
  lucide.createIcons();
</script>

<!-- HTML -->
<i data-lucide="message-square" class="lucide-icon"></i>

<style>
.lucide-icon {
  width: 64px;
  height: 64px;
  color: var(--color-primary);
}
</style>
```

---

## ⚡ 性能优化检查

- [ ] 图片使用 `loading="lazy"`
- [ ] 字体使用 `font-display: swap`
- [ ] CSS Variables 定义在 `:root`
- [ ] 避免内联样式（使用 CSS 类）
- [ ] 移动端图片使用 `srcset`

```html
<!-- 响应式图片 -->
<img
  src="image-desktop.jpg"
  srcset="
    image-mobile.jpg 375w,
    image-tablet.jpg 768w,
    image-desktop.jpg 1024w
  "
  sizes="(max-width: 767px) 100vw, 1024px"
  loading="lazy"
  alt="课程评价截图"
/>
```

---

## 🔗 快速链接

- **完整设计系统**：`docs/ui/system-refactor-visual-spec.md`
- **转化率优化文档**：`docs/ui/conversion-optimization-rationale.md`
- **设计系统 Master**：`design-system/ohmyprofessors/MASTER.md`

---

## 💬 需要帮助？

遇到设计问题时，问自己：

1. **这符合 Flat Design 吗？**（无渐变/轻微阴影/边框优先）
2. **颜色对比度够吗？**（使用 WebAIM Contrast Checker）
3. **移动端能点击吗？**（触控目标 ≥ 44×44px）
4. **图标是 SVG 吗？**（不用 Emoji）
5. **有 hover/focus 状态吗？**（可访问性必须）

---

**版本**：1.0  
**更新**：2026-02-11  
**打印友好**：Ctrl/Cmd + P
