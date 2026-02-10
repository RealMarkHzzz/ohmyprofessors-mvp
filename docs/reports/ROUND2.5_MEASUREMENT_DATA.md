# Round 2.5 设计决策与测量数据记录

## 文档说明
本文档记录了从参考模板 (https://ui-ux-pro-max-skill.nextlevelbuilder.io/demo/ai-chatbot-platform) 提取的所有精确测量数据，用于确保 1:1 视觉复制的准确性。

---

## 1. 实际测量的 CSS 属性值

### 1.1 主按钮 (Primary Button)

**实际测量值：**
```css
{
  background-color: rgb(99, 102, 241);        /* #6366F1 */
  color: rgb(255, 255, 255);                  /* #FFFFFF */
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Hover 状态：**
```css
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 10px 15px -3px rgba(37, 99, 235, 0.3),
    0 4px 6px -4px rgba(37, 99, 235, 0.3);
}
```

**Active 状态：**
```css
.btn-primary:active {
  transform: translateY(0);
}
```

**CSS 渐变背景定义：**
```css
background: linear-gradient(to right, #2563EB, #3B82F6);
```

### 1.2 次按钮 (Secondary Button)

**实际测量值：**
```css
{
  background-color: rgb(255, 255, 255);       /* #FFFFFF */
  color: rgb(15, 23, 42);                     /* #0F172A */
  border: 2px solid rgb(229, 231, 235);       /* #E5E7EB */
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Hover 状态：**
```css
.btn-secondary:hover {
  background-color: rgb(249, 250, 251);       /* #F9FAFB */
  border-color: rgb(209, 213, 219);           /* #D1D5DB */
}
```

### 1.3 导航栏按钮 (小尺寸)

**实际测量值：**
```css
{
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 12px;
}
```

### 1.4 输入框

**实际测量值：**
```css
{
  height: 46px;
  background-color: rgb(245, 245, 245);       /* #F5F5F5 */
  border: 1px solid rgb(229, 231, 235);       /* #E5E7EB */
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  color: rgb(17, 24, 39);                     /* #111827 */
}
```

**Placeholder 颜色：**
```css
::placeholder {
  color: rgb(107, 114, 128);                  /* #6B7280 */
}
```

**Focus 状态：**
```css
input:focus {
  outline: none;
  border-color: rgb(99, 102, 241);            /* #6366F1 */
}
```

### 1.5 卡片组件

#### 基础卡片
```css
{
  background-color: rgb(255, 255, 255);       /* #FFFFFF */
  border: 1px solid rgb(229, 231, 235);       /* #E5E7EB */
  border-radius: 16px;
  padding: 24px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### 带阴影卡片 (Hero Chat Card)
```css
{
  box-shadow: 
    rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.1) 0px 8px 10px -6px;
}
```

#### Hover 卡片效果
```css
.card-hover:hover {
  border-color: rgb(209, 213, 219);           /* #D1D5DB */
  box-shadow: 
    rgba(37, 99, 235, 0.1) 0px 20px 25px -5px,
    rgba(37, 99, 235, 0.1) 0px 8px 10px -6px;
}
```

### 1.6 导航栏

**实际测量值：**
```css
{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 65px;
  background-color: rgba(255, 255, 255, 0.8); /* 80% 透明度 */
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgb(229, 231, 235);
}
```

### 1.7 容器

**主容器：**
```css
{
  max-width: 1152px;                          /* 72rem */
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;                         /* Desktop */
  padding-right: 32px;
}
```

**响应式内边距：**
```css
/* Mobile */
@media (max-width: 639px) {
  padding-left: 16px;
  padding-right: 16px;
}

/* Tablet */
@media (min-width: 640px) {
  padding-left: 24px;
  padding-right: 24px;
}

/* Desktop */
@media (min-width: 1024px) {
  padding-left: 32px;
  padding-right: 32px;
}
```

---

## 2. 字体系统精确测量

### 2.1 字体族

**标题字体：**
```css
font-family: "Space Grotesk", sans-serif;
```

**正文字体：**
```css
font-family: "DM Sans", sans-serif;
```

**等宽字体 (代码块)：**
```css
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
```

### 2.2 标题尺寸

#### H1 (Hero Title)
```css
{
  font-family: "Space Grotesk", sans-serif;
  font-size: 60px;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: normal;
  color: rgb(17, 24, 39);                     /* #111827 */
}
```

#### H2 (Section Title)
```css
{
  font-family: "Space Grotesk", sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 40px;
  color: rgb(17, 24, 39);
}
```

#### H3 (Card Title)
```css
{
  font-family: "Space Grotesk", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  color: rgb(17, 24, 39);
}
```

### 2.3 正文文本

#### Body Text
```css
{
  font-family: "DM Sans", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgb(0, 0, 0);
}
```

#### Small Text
```css
{
  font-size: 14px;
  line-height: 20px;
}
```

---

## 3. 间距系统测量

### 3.1 Section 垂直间距

**标准 Section：**
```css
{
  padding-top: 80px;
  padding-bottom: 80px;
}
```

**Hero Section：**
```css
{
  padding-top: 80px;
  padding-bottom: 64px;
}
```

### 3.2 元素间距

**Section 标题到内容：**
```css
margin-bottom: 48px;                          /* 12 * 4px */
```

**卡片标题到描述：**
```css
margin-bottom: 8px;                           /* 2 * 4px */
```

**按钮之间的间距：**
```css
gap: 16px;                                    /* 4 * 4px */
```

**Grid 间距：**
```css
/* Feature Cards */
gap: 24px;                                    /* 6 * 4px */

/* Pricing Cards */
gap: 32px;                                    /* 8 * 4px */
```

---

## 4. 颜色系统完整色值

### 4.1 Primary 色系

```
#6366F1 - Primary (Indigo-600)
rgb(99, 102, 241)

#4F46E5 - Primary Dark (Indigo-700)
rgb(79, 70, 229)

#E0E7FF - Primary Light (Indigo-100)
rgb(224, 231, 255)

#3730A3 - Primary Darker (Indigo-800)
rgb(55, 48, 163)
```

### 4.2 Secondary 色系

```
#10B981 - Secondary (Emerald-500)
rgb(16, 185, 129)
```

### 4.3 Neutral Gray Scale

```
#F9FAFB - Gray 50
rgb(249, 250, 251)

#F3F4F6 - Gray 100
rgb(243, 244, 246)

#E5E7EB - Gray 200 (主要边框色)
rgb(229, 231, 235)

#D1D5DB - Gray 300
rgb(209, 213, 219)

#9CA3AF - Gray 400
rgb(156, 163, 175)

#6B7280 - Gray 500 (Muted Text)
rgb(107, 114, 128)

#4B5563 - Gray 600
rgb(75, 85, 99)

#374151 - Gray 700
rgb(55, 65, 81)

#1F2937 - Gray 800
rgb(31, 41, 55)

#111827 - Gray 900 (主要文字色)
rgb(17, 24, 39)
```

### 4.4 Semantic Colors

```
#FFFFFF - White
rgb(255, 255, 255)

#000000 - Black
rgb(0, 0, 0)

#F5F5F5 - Background Gray
rgb(245, 245, 245)
```

### 4.5 渐变色定义

**主按钮渐变：**
```css
linear-gradient(to right, #2563EB, #3B82F6)
/* Blue-600 → Blue-500 */
```

**文字渐变：**
```css
linear-gradient(to right, #2563EB, #3B82F6, #F97316)
/* Blue-600 → Blue-500 → Orange-500 */
```

---

## 5. 阴影系统

### 5.1 标准阴影

**XL Shadow (Feature Cards):**
```css
box-shadow: 
  0 20px 25px -5px rgba(0, 0, 0, 0.1),
  0 8px 10px -6px rgba(0, 0, 0, 0.1);
```

**SM Shadow (Glass Cards):**
```css
box-shadow: 
  0 1px 2px 0 rgba(0, 0, 0, 0.05);
```

### 5.2 Hover 阴影

**Button Hover Shadow:**
```css
box-shadow: 
  0 10px 15px -3px rgba(37, 99, 235, 0.3),
  0 4px 6px -4px rgba(37, 99, 235, 0.3);
```

**Card Hover Shadow (蓝色光晕):**
```css
box-shadow: 
  0 20px 25px -5px rgba(37, 99, 235, 0.1),
  0 8px 10px -6px rgba(37, 99, 235, 0.1);
```

---

## 6. 圆角系统

```
8px   → 小圆角 (图标容器)
12px  → 中圆角 (按钮、输入框)
16px  → 大圆角 (卡片)
9999px → 完全圆形 (徽章、头像)
```

---

## 7. 动效参数

### 7.1 Transition Duration

```
150ms → 快速过渡
200ms → 标准过渡 (默认)
300ms → 慢速过渡
```

### 7.2 Easing Function

```
cubic-bezier(0.4, 0, 0.2, 1) → 标准缓动 (默认)
```

### 7.3 Transform Values

**按钮 Hover 上移：**
```css
transform: translateY(-2px);
```

**按钮 Active 状态：**
```css
transform: translateY(0);
```

---

## 8. 响应式断点

### 8.1 Tailwind 默认断点

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### 8.2 布局变化

#### 导航栏
- **< 768px**: 显示汉堡菜单，隐藏导航链接
- **≥ 768px**: 显示完整导航链接

#### Feature Grid
- **< 768px**: 1 列
- **768px - 1023px**: 2 列
- **≥ 1024px**: 3 列

#### Pricing Grid
- **< 768px**: 1 列
- **≥ 768px**: 3 列

#### 字体大小
- **< 768px**: H1 = 36px (text-4xl)
- **768px - 1023px**: H1 = 48px (text-5xl)
- **≥ 1024px**: H1 = 60px (text-6xl)

---

## 9. 从 CSS 样式表提取的关键类

### 9.1 自定义 CSS 类

**Glass Card:**
```css
.glass-card {
  border-radius: 1rem;
  border-width: 1px;
  border-color: rgb(229 231 235);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);
  backdrop-filter: blur(24px);
}
```

**Button Primary:**
```css
.btn-primary {
  border-radius: 0.75rem;
  background-image: linear-gradient(to right, #2563EB, #3B82F6);
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  color: rgb(255 255 255);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Button Secondary:**
```css
.btn-secondary {
  border-radius: 1rem;
  border: 1px solid rgb(229 231 235);
  background-color: rgb(255 255 255);
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  color: rgb(15 23 42);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Gradient Text:**
```css
.gradient-text {
  background-image: linear-gradient(to right, #2563EB, #3B82F6, #F97316);
  background-clip: text;
  color: transparent;
}
```

### 9.2 自定义 CSS 变量 (从 .ai-chatbot 类)

```css
.ai-chatbot {
  --primary: #6366F1;
  --primary-dark: #4F46E5;
  --secondary: #10B981;
  --cta: #6366F1;
  --bg: #F5F5F5;
  --bg-white: #FFFFFF;
  --text: #111827;
  --text-muted: #6B7280;
  --border: #E5E7EB;
  font-family: "DM Sans", sans-serif;
}
```

---

## 10. 组件尺寸精确测量

### 10.1 按钮尺寸

| 类型 | 高度 | 内边距 | 字号 | 字重 | 圆角 |
|------|------|--------|------|------|------|
| 主按钮 (大) | auto | 14px 32px | 16px | 600 | 12px |
| 主按钮 (小) | auto | 8px 16px | 14px | 500 | 12px |
| 次按钮 | auto | 14px 32px | 16px | 600 | 12px |
| 幽灵按钮 | auto | 8px 16px | 14px | 500 | 0 |

### 10.2 输入框尺寸

| 属性 | 值 |
|------|-----|
| 高度 | 46px |
| 内边距 | 12px 16px |
| 字号 | 14px |
| 圆角 | 12px |
| 边框 | 1px solid #E5E7EB |
| 背景 | #F5F5F5 |

### 10.3 卡片尺寸

| 类型 | 内边距 | 圆角 | 边框 | 阴影 |
|------|--------|------|------|------|
| 基础卡片 | 24px | 16px | 1px #E5E7EB | none |
| 带阴影卡片 | 24px | 16px | 1px #E5E7EB | xl shadow |
| Hover 卡片 | 24px | 16px | 1px #E5E7EB | hover shadow |

### 10.4 导航栏尺寸

| 属性 | 值 |
|------|-----|
| 高度 | 65px |
| 内容高度 | 64px (h-16) |
| 背景透明度 | 80% |
| 毛玻璃模糊 | 12px |
| 边框 | 底部 1px #E5E7EB |

---

## 11. Dark Mode 色值对照

### 11.1 背景色

| 元素 | Light Mode | Dark Mode |
|------|------------|-----------|
| 页面背景 | #F5F5F5 | #0F172A (Slate-900) |
| 卡片背景 | #FFFFFF | rgba(255,255,255,0.05) |
| 输入框背景 | #F5F5F5 | #1E293B (Slate-800) |

### 11.2 文字色

| 元素 | Light Mode | Dark Mode |
|------|------------|-----------|
| 主要文字 | #111827 (Gray-900) | #F8FAFC (Slate-50) |
| 次要文字 | #6B7280 (Gray-500) | #94A3B8 (Slate-400) |

### 11.3 边框色

| 元素 | Light Mode | Dark Mode |
|------|------------|-----------|
| 卡片边框 | #E5E7EB | rgba(255,255,255,0.1) |
| 输入框边框 | #E5E7EB | rgba(255,255,255,0.1) |

---

## 12. 实施验证清单

### ✅ 颜色验证
- [ ] Primary 色 #6366F1 应用正确
- [ ] 灰度色阶完全匹配
- [ ] 渐变色方向和色值正确
- [ ] Dark Mode 色值正确

### ✅ 字体验证
- [ ] Space Grotesk 用于所有标题
- [ ] DM Sans 用于所有正文
- [ ] 字号、字重、行高完全匹配

### ✅ 间距验证
- [ ] Section padding 为 80px
- [ ] 卡片 padding 为 24px
- [ ] 按钮 padding 为 14px 32px
- [ ] Grid gap 符合规范

### ✅ 圆角验证
- [ ] 按钮 12px
- [ ] 卡片 16px
- [ ] 输入框 12px
- [ ] 图标容器 8px

### ✅ 阴影验证
- [ ] XL shadow 应用正确
- [ ] Hover shadow 带蓝色光晕
- [ ] Button hover shadow 正确

### ✅ 动效验证
- [ ] Transition duration 200ms
- [ ] Easing function 正确
- [ ] Hover transform 上移 2px
- [ ] Active 状态正确

### ✅ 响应式验证
- [ ] 断点值匹配
- [ ] Grid 列数变化正确
- [ ] 字体大小响应式正确
- [ ] 导航栏折叠正确

---

**测量工具**: Chrome DevTools  
**测量日期**: 2026-02-11  
**测量精度**: ±1px  
**浏览器**: Chrome 最新版本  
**屏幕分辨率**: 1920x1080

**备注**: 所有颜色值均使用 computed style 实际测量，未进行推测。
