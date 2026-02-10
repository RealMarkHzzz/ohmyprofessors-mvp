# Round 2.5 - 1:1 视觉复制设计规范

## 项目信息
- **参考模板**: https://ui-ux-pro-max-skill.nextlevelbuilder.io/demo/ai-chatbot-platform
- **分析日期**: 2026-02-11
- **设计系统**: Tailwind CSS + Custom CSS Variables
- **字体**: Space Grotesk (标题) + DM Sans (正文)

---

## 1. 完整视觉系统提取

### 1.1 配色方案 (Color Palette)

#### CSS 变量定义
```css
:root {
  /* Primary Colors */
  --primary: #6366F1;           /* Indigo-600 */
  --primary-dark: #4F46E5;      /* Indigo-700 */
  --primary-light: #E0E7FF;     /* Indigo-100 */
  
  /* Secondary Colors */
  --secondary: #10B981;          /* Emerald-500 */
  --cta: #6366F1;                /* Same as primary */
  
  /* Background Colors */
  --bg: #F5F5F5;                 /* Gray-100 */
  --bg-white: #FFFFFF;           /* Pure White */
  --bg-gray-50: #F9FAFB;         /* Gray-50 */
  
  /* Text Colors */
  --text: #111827;               /* Gray-900 */
  --text-muted: #6B7280;         /* Gray-500 */
  --text-gray-700: #374151;      /* Gray-700 */
  --text-gray-600: #4B5563;      /* Gray-600 */
  
  /* Border Colors */
  --border: #E5E7EB;             /* Gray-200 */
  --border-gray-300: #D1D5DB;    /* Gray-300 */
  
  /* Neutral Scale (完整灰度色阶) */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
}
```

#### RGB 格式色值（用于 Tailwind）
```css
/* 实际测量的 RGB 值 */
--primary-rgb: rgb(99, 102, 241);
--primary-dark-rgb: rgb(79, 70, 229);
--secondary-rgb: rgb(16, 185, 129);

--bg-rgb: rgb(245, 245, 245);
--bg-white-rgb: rgb(255, 255, 255);

--text-rgb: rgb(17, 24, 39);
--text-muted-rgb: rgb(107, 114, 128);

--border-rgb: rgb(229, 231, 235);
```

#### Tailwind CSS 颜色映射
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
          light: '#E0E7FF',
        },
        secondary: {
          DEFAULT: '#10B981',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      }
    }
  }
}
```

### 1.2 字体系统 (Typography System)

#### 字体族 (Font Families)
```css
/* Google Fonts 引入 */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}

body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 24px;
  color: var(--text);
}
```

#### 标题样式 (Headings)
```css
/* H1 - Hero Title */
h1, .text-h1 {
  font-family: var(--font-heading);
  font-size: 60px;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: normal;
  color: var(--text);
}

/* H2 - Section Title */
h2, .text-h2 {
  font-family: var(--font-heading);
  font-size: 36px;
  font-weight: 700;
  line-height: 40px;
  color: var(--text);
}

/* H3 - Card Title */
h3, .text-h3 {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  color: var(--text);
}

/* Body Text */
p, .text-body {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--text);
}

/* Small Text */
.text-sm {
  font-size: 14px;
  line-height: 20px;
}
```

#### Tailwind 字体类名
```html
<!-- H1 -->
<h1 class="font-['Space_Grotesk'] text-6xl font-bold leading-tight text-gray-900">

<!-- H2 -->
<h2 class="font-['Space_Grotesk'] text-4xl font-bold leading-10 text-gray-900">

<!-- H3 -->
<h3 class="font-['Space_Grotesk'] text-lg font-semibold leading-7 text-gray-900">

<!-- Body -->
<p class="font-['DM_Sans'] text-base leading-6 text-gray-900">

<!-- Muted Text -->
<p class="text-sm text-gray-500">
```

### 1.3 间距系统 (Spacing System)

#### Section 垂直间距
```css
/* Section Padding - 标准值: 80px */
.section {
  padding-top: 80px;    /* py-20 */
  padding-bottom: 80px; /* py-20 */
}

/* Hero Section - 顶部 80px, 底部 64px */
.hero-section {
  padding-top: 80px;    /* pt-20 */
  padding-bottom: 64px; /* pb-16 */
}
```

#### 容器间距
```css
/* Container Padding */
.container {
  max-width: 1152px;     /* max-w-6xl */
  margin: 0 auto;
  padding-left: 16px;    /* px-4 (mobile) */
  padding-right: 16px;
}

@media (min-width: 640px) {
  .container {
    padding-left: 24px;  /* sm:px-6 */
    padding-right: 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 32px;  /* lg:px-8 */
    padding-right: 32px;
  }
}
```

#### 组件内边距
```css
/* Card Padding */
.card {
  padding: 24px;         /* p-6 */
}

/* Button Padding */
.btn-primary {
  padding: 14px 32px;    /* py-3.5 px-8 */
}

.btn-secondary {
  padding: 14px 32px;    /* py-3.5 px-8 */
}

/* Input Padding */
input, textarea {
  padding: 12px 16px;    /* py-3 px-4 */
}
```

#### Tailwind 间距类名映射
```
padding: 24px    → p-6
padding: 16px    → p-4
padding: 12px    → p-3
padding: 8px     → p-2

gap: 24px        → gap-6
gap: 16px        → gap-4
gap: 12px        → gap-3

margin: 80px     → my-20
margin: 64px     → my-16
margin: 32px     → my-8
```

### 1.4 圆角系统 (Border Radius)

```css
:root {
  --radius-sm: 8px;      /* rounded-lg */
  --radius-md: 12px;     /* rounded-xl */
  --radius-lg: 16px;     /* rounded-2xl */
  --radius-full: 9999px; /* rounded-full */
}

/* 应用示例 */
.btn-primary {
  border-radius: 12px;   /* rounded-xl */
}

.btn-secondary {
  border-radius: 12px;   /* rounded-xl */
}

.card {
  border-radius: 16px;   /* rounded-2xl */
}

.input {
  border-radius: 12px;   /* rounded-xl */
}

.badge {
  border-radius: 9999px; /* rounded-full */
}

.icon-container {
  border-radius: 8px;    /* rounded-lg */
}
```

#### Tailwind 圆角类名
```
8px   → rounded-lg
12px  → rounded-xl
16px  → rounded-2xl
9999px → rounded-full
```

### 1.5 阴影系统 (Box Shadow)

```css
/* 卡片阴影 - XL Shadow */
.shadow-xl {
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* 按钮 Hover 阴影 */
.btn-primary:hover {
  box-shadow: 
    0 10px 15px -3px rgba(37, 99, 235, 0.3),
    0 4px 6px -4px rgba(37, 99, 235, 0.3);
}

/* 卡片 Hover 阴影 (带蓝色光晕) */
.card-hover:hover {
  box-shadow: 
    0 20px 25px -5px rgba(37, 99, 235, 0.1),
    0 8px 10px -6px rgba(37, 99, 235, 0.1);
}

/* Glass Card 阴影 */
.glass-card {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* 无阴影 */
.shadow-none {
  box-shadow: none;
}
```

#### Tailwind 阴影类名
```html
<!-- XL Shadow (feature cards) -->
<div class="shadow-xl">

<!-- Hover Shadow (primary button) -->
<button class="hover:shadow-[0_10px_15px_-3px_rgba(37,99,235,0.3),0_4px_6px_-4px_rgba(37,99,235,0.3)]">

<!-- Light Shadow (glass card) -->
<div class="shadow-sm">

<!-- No Shadow -->
<div class="shadow-none">
```

---

## 2. 布局精确测量

### 2.1 容器宽度 (Container Width)

```css
/* 主容器 */
.container {
  max-width: 1152px;     /* Tailwind: max-w-6xl */
  margin-left: auto;
  margin-right: auto;
}

/* Tailwind 断点对应的最大宽度 */
.max-w-6xl {
  max-width: 1152px;     /* 72rem */
}
```

#### 响应式容器
```html
<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- 内容 -->
</div>
```

### 2.2 栅格系统 (Grid System)

```css
/* Feature Cards Grid - 3列布局 */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;  /* gap-6 */
}

@media (max-width: 1024px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}

/* Pricing Cards Grid - 3列等宽 */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;  /* gap-8 */
}

/* Integration Icons Grid - 4x2布局 */
.integration-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;  /* gap-4 */
}
```

#### Tailwind Grid 类名
```html
<!-- Feature Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Pricing Cards -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">

<!-- Integration Icons -->
<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
```

### 2.3 组件尺寸 (Component Dimensions)

#### 按钮尺寸
```css
/* Primary Button */
.btn-primary {
  height: auto;
  padding: 14px 32px;      /* 实际测量 */
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
}

/* Small Primary Button (导航栏) */
.btn-primary.text-sm {
  padding: 8px 16px;       /* py-2 px-4 */
  font-size: 14px;
}

/* Secondary Button */
.btn-secondary {
  height: auto;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  border: 2px solid var(--border);
}
```

#### 输入框尺寸
```css
input, textarea {
  height: 46px;            /* 实际测量 */
  padding: 12px 16px;      /* py-3 px-4 */
  font-size: 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background-color: #F5F5F5;
}
```

#### 卡片尺寸
```css
/* Feature Card */
.feature-card {
  padding: 24px;           /* p-6 */
  border-radius: 16px;     /* rounded-2xl */
  border: 1px solid var(--border);
  background: white;
}

/* Chat Bubble Card (Hero Section) */
.chat-card {
  padding: 24px;
  border-radius: 16px;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* Pricing Card */
.pricing-card {
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--border);
}
```

### 2.4 留白比例 (Vertical Spacing)

```css
/* Section 之间的垂直间距 */
section {
  padding-top: 80px;       /* py-20 */
  padding-bottom: 80px;    /* py-20 */
}

/* Hero Section */
.hero-section {
  padding-top: 80px;       /* pt-20 */
  padding-bottom: 64px;    /* pb-16 */
}

/* 元素之间的间距 */
.section-title {
  margin-bottom: 16px;     /* mb-4 */
}

.section-subtitle {
  margin-bottom: 48px;     /* mb-12 */
}

.card-title {
  margin-bottom: 8px;      /* mb-2 */
}

.card-description {
  margin-top: 8px;         /* mt-2 */
}
```

---

## 3. 组件级设计规范

### 3.1 按钮组件 (Buttons)

#### 主按钮 (Primary Button)
```css
.btn-primary {
  /* 基础样式 */
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  
  /* 渐变背景 */
  background: linear-gradient(to right, #2563EB, #3B82F6);
  color: white;
  border: none;
  
  /* 过渡效果 */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 光标 */
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 10px 15px -3px rgba(37, 99, 235, 0.3),
    0 4px 6px -4px rgba(37, 99, 235, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}
```

**Tailwind 实现：**
```html
<button class="
  btn-primary 
  px-8 py-3.5 
  text-base font-semibold 
  text-white 
  bg-gradient-to-r from-blue-600 to-blue-500
  rounded-xl 
  transition-all duration-200 
  hover:-translate-y-0.5 
  hover:shadow-[0_10px_15px_-3px_rgba(37,99,235,0.3),0_4px_6px_-4px_rgba(37,99,235,0.3)]
  active:translate-y-0
">
  Try Now — It's Free
</button>
```

#### 次按钮 (Secondary Button)
```css
.btn-secondary {
  /* 基础样式 */
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  
  /* 边框样式 */
  background: white;
  color: #0F172A;
  border: 2px solid #E5E7EB;
  
  /* 过渡效果 */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.btn-secondary:hover {
  background: #F9FAFB;
  border-color: #D1D5DB;
}
```

**Tailwind 实现：**
```html
<button class="
  btn-secondary
  px-8 py-3.5 
  text-base font-semibold 
  text-slate-900 
  bg-white 
  border-2 border-gray-200
  rounded-xl 
  transition-all duration-200 
  hover:bg-gray-50 hover:border-gray-300
">
  View Documentation
</button>
```

#### 小尺寸按钮 (导航栏)
```html
<button class="
  btn-primary 
  text-sm 
  py-2 px-4
  font-medium
  rounded-xl
">
  Try Free
</button>
```

#### 幽灵按钮 (Ghost Button) - 导航链接
```html
<button class="
  text-sm 
  text-gray-500 
  font-medium 
  px-4 py-2
  hover:text-gray-900
  transition-colors duration-200
">
  Sign In
</button>
```

### 3.2 输入框组件 (Input Fields)

#### 文本输入框
```css
input[type="text"],
input[type="email"],
textarea {
  /* 尺寸 */
  height: 46px;
  padding: 12px 16px;
  
  /* 样式 */
  font-size: 14px;
  color: var(--text);
  background-color: #F5F5F5;
  border: 1px solid var(--border);
  border-radius: 12px;
  
  /* 过渡 */
  transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

input::placeholder {
  color: var(--text-muted);
}

input:focus {
  outline: none;
  border-color: var(--primary);
}
```

**Tailwind 实现：**
```html
<input 
  type="text" 
  placeholder="Type your message..."
  class="
    flex-1 
    bg-gray-100 
    border border-gray-200 
    rounded-xl 
    px-4 py-3 
    text-sm 
    text-gray-900 
    placeholder:text-gray-500 
    focus:outline-none 
    focus:border-primary 
    transition-colors duration-200
  "
/>
```

### 3.3 卡片组件 (Cards)

#### 基础卡片
```css
.card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Tailwind 实现：**
```html
<div class="
  card 
  bg-white 
  border border-gray-200 
  rounded-2xl 
  p-6
  transition-all duration-200
">
  <!-- 内容 -->
</div>
```

#### Hover 卡片 (Feature Cards)
```css
.card-hover {
  background: white;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  border-color: #D1D5DB;
  background: white;
  box-shadow: 
    0 20px 25px -5px rgba(37, 99, 235, 0.1),
    0 8px 10px -6px rgba(37, 99, 235, 0.1);
}
```

**Tailwind 实现：**
```html
<div class="
  card card-hover 
  bg-white 
  border border-gray-200 
  rounded-2xl 
  p-6 
  cursor-pointer
  transition-all duration-200
  hover:border-gray-300
  hover:shadow-[0_20px_25px_-5px_rgba(37,99,235,0.1),0_8px_10px_-6px_rgba(37,99,235,0.1)]
">
  <!-- Feature content -->
</div>
```

#### 带阴影卡片 (Chat Demo Card)
```html
<div class="
  card 
  bg-white 
  border border-gray-200 
  rounded-2xl 
  p-6 
  shadow-xl
">
  <!-- Chat interface -->
</div>
```

#### Glass Card (毛玻璃卡片)
```css
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--border);
  border-radius: 16px;
  backdrop-filter: blur(24px);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.glass-card:hover {
  background: white;
  border-color: #D1D5DB;
  box-shadow: 
    0 20px 25px -5px rgba(37, 99, 235, 0.1),
    0 8px 10px -6px rgba(37, 99, 235, 0.1);
}
```

**Tailwind 实现：**
```html
<div class="
  glass-card
  bg-white/80
  border border-gray-200
  rounded-2xl
  backdrop-blur-3xl
  shadow-sm
  hover:bg-white
  hover:border-gray-300
  hover:shadow-[0_20px_25px_-5px_rgba(37,99,235,0.1),0_8px_10px_-6px_rgba(37,99,235,0.1)]
  transition-all duration-200
">
  <!-- Content -->
</div>
```

### 3.4 导航栏 (Navbar)

```css
nav {
  /* 定位 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  
  /* 尺寸 */
  height: 65px;
  
  /* 样式 */
  background: rgba(var(--bg-white-rgb), 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  
  /* 过渡 */
  transition: all 0.2s ease;
}
```

**Tailwind 实现：**
```html
<nav class="
  fixed top-0 left-0 right-0 
  z-50 
  bg-white/80 
  backdrop-blur-md 
  border-b border-gray-200
">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <img src="logo.svg" class="w-6 h-6" />
        <span class="font-['Space_Grotesk'] font-bold text-lg">NexusAI</span>
      </div>
      
      <!-- Nav Links -->
      <div class="hidden md:flex items-center gap-8">
        <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          Features
        </a>
        <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          Demo
        </a>
        <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          Pricing
        </a>
        <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          Docs
        </a>
      </div>
      
      <!-- CTA Buttons -->
      <div class="flex items-center gap-4">
        <button class="text-sm text-gray-500 hover:text-gray-900 font-medium px-4 py-2">
          Sign In
        </button>
        <button class="btn-primary text-sm py-2 px-4">
          Try Free
        </button>
      </div>
    </div>
  </div>
</nav>
```

---

## 4. 动效规范

### 4.1 过渡时间 (Transition Duration)

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
}

/* 标准过渡 - 200ms */
.transition-standard {
  transition: all 0.2s;
}

/* 快速过渡 - 150ms */
.transition-fast {
  transition: all 0.15s;
}

/* 慢速过渡 - 300ms */
.transition-slow {
  transition: all 0.3s;
}
```

**Tailwind 类名：**
```
duration-150  (150ms)
duration-200  (200ms - 默认)
duration-300  (300ms)
```

### 4.2 缓动函数 (Easing Functions)

```css
:root {
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);  /* ease-in-out */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 应用 */
button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Tailwind 类名：**
```
ease-in
ease-out
ease-in-out  (默认)
```

### 4.3 Hover 效果

#### 按钮 Hover
```css
/* Primary Button Hover */
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 10px 15px -3px rgba(37, 99, 235, 0.3),
    0 4px 6px -4px rgba(37, 99, 235, 0.3);
}

/* Card Hover */
.card-hover:hover {
  border-color: #D1D5DB;
  box-shadow: 
    0 20px 25px -5px rgba(37, 99, 235, 0.1),
    0 8px 10px -6px rgba(37, 99, 235, 0.1);
}

/* Link Hover */
a:hover {
  color: var(--text);
  opacity: 1;
}
```

**Tailwind 实现：**
```html
<!-- Button Hover -->
<button class="
  hover:-translate-y-0.5 
  hover:shadow-[0_10px_15px_-3px_rgba(37,99,235,0.3)]
  transition-all duration-200
">

<!-- Card Hover -->
<div class="
  hover:border-gray-300 
  hover:shadow-[0_20px_25px_-5px_rgba(37,99,235,0.1)]
  transition-all duration-200
">

<!-- Link Hover -->
<a class="
  text-gray-500 
  hover:text-gray-900 
  transition-colors duration-200
">
```

### 4.4 页面入场动画

```css
/* Fade In Up Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Stagger Animation (Sequential) */
.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: 100ms; }
.stagger-item:nth-child(3) { animation-delay: 200ms; }
```

---

## 5. 响应式断点

### 5.1 断点定义

```javascript
// Tailwind Default Breakpoints
const breakpoints = {
  'sm': '640px',   // 小屏 (手机横屏)
  'md': '768px',   // 平板
  'lg': '1024px',  // 笔记本
  'xl': '1280px',  // 桌面
  '2xl': '1536px', // 大屏
}
```

### 5.2 各断点下的布局变化

#### 导航栏
```html
<!-- Mobile: 隐藏导航链接，显示汉堡菜单 -->
<nav>
  <div class="md:hidden">
    <button>☰</button>
  </div>
  
  <div class="hidden md:flex">
    <a href="#">Features</a>
    <a href="#">Demo</a>
  </div>
</nav>
```

#### Feature Cards Grid
```html
<div class="
  grid 
  grid-cols-1           /* Mobile: 1列 */
  md:grid-cols-2        /* Tablet: 2列 */
  lg:grid-cols-3        /* Desktop: 3列 */
  gap-6
">
```

#### 容器间距
```html
<div class="
  px-4                  /* Mobile: 16px */
  sm:px-6               /* Small: 24px */
  lg:px-8               /* Large: 32px */
">
```

#### 字体大小
```html
<h1 class="
  text-4xl              /* Mobile: 36px */
  md:text-5xl           /* Tablet: 48px */
  lg:text-6xl           /* Desktop: 60px */
">
```

#### Section 间距
```html
<section class="
  py-12                 /* Mobile: 48px */
  sm:py-16              /* Small: 64px */
  lg:py-20              /* Large: 80px */
">
```

---

## 6. 完整组件示例代码

### 6.1 Hero Section

```html
<section class="py-20 pt-20 pb-16 bg-white">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      
      <!-- Left Content -->
      <div class="space-y-8">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
          <img src="logo.svg" class="w-4 h-4" />
          <span class="text-xs text-gray-600">Powered by GPT-4 & Claude</span>
        </div>
        
        <!-- Heading -->
        <h1 class="font-['Space_Grotesk'] text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
          Your AI Assistant for <span class="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Everything</span>
        </h1>
        
        <!-- Description -->
        <p class="text-lg text-gray-600 leading-relaxed">
          Build intelligent chatbots and AI assistants in minutes. No coding required. Enterprise-ready from day one.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-4">
          <button class="btn-primary px-8 py-3.5 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(37,99,235,0.3)] transition-all duration-200">
            Try Now — It's Free
          </button>
          <button class="btn-secondary px-8 py-3.5 text-base font-semibold bg-white border-2 border-gray-200 text-slate-900 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
            View Documentation
          </button>
        </div>
      </div>
      
      <!-- Right - Chat Demo -->
      <div class="card bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
        <!-- Chat Header -->
        <div class="flex items-center gap-3 mb-4">
          <img src="avatar.svg" class="w-10 h-10 rounded-full" />
          <div>
            <div class="font-semibold text-gray-900">NexusAI Assistant</div>
            <div class="text-sm text-green-500">Online</div>
          </div>
        </div>
        
        <!-- Messages -->
        <div class="space-y-4">
          <!-- User Message -->
          <div class="text-sm text-gray-600">
            What can you help me with?
          </div>
          
          <!-- AI Response -->
          <div class="flex gap-3">
            <img src="ai-avatar.svg" class="w-6 h-6" />
            <p class="text-sm text-gray-800">
              I can help you analyze data, write code, answer questions, and much more. What would you like to explore today?
            </p>
          </div>
        </div>
        
        <!-- Input -->
        <div class="mt-4 flex gap-2">
          <input 
            type="text" 
            placeholder="Type your message..."
            class="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
          />
          <button class="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
      
    </div>
  </div>
</section>
```

### 6.2 Feature Card

```html
<div class="card card-hover bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:border-gray-300 hover:shadow-[0_20px_25px_-5px_rgba(37,99,235,0.1),0_8px_10px_-6px_rgba(37,99,235,0.1)]">
  <!-- Icon -->
  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <!-- Icon path -->
    </svg>
  </div>
  
  <!-- Title -->
  <h3 class="font-['Space_Grotesk'] text-lg font-semibold text-gray-900 mb-2">
    Multi-Model Support
  </h3>
  
  <!-- Description -->
  <p class="text-sm text-gray-600 leading-relaxed">
    Access GPT-4, Claude, Gemini, and more through a single unified API.
  </p>
</div>
```

### 6.3 Pricing Card

```html
<!-- Pro Plan (Most Popular) -->
<div class="relative bg-white border-2 border-blue-600 rounded-2xl p-6 shadow-xl">
  <!-- Most Popular Badge -->
  <div class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-semibold rounded-full">
    Most Popular
  </div>
  
  <!-- Header -->
  <div class="text-center mb-6">
    <h3 class="font-['Space_Grotesk'] text-2xl font-bold text-gray-900 mb-2">
      Pro
    </h3>
    <p class="text-sm text-gray-600">
      For professionals and small teams
    </p>
  </div>
  
  <!-- Price -->
  <div class="text-center mb-6">
    <div class="flex items-baseline justify-center gap-1">
      <span class="text-5xl font-bold text-gray-900">$29</span>
      <span class="text-gray-500">/month</span>
    </div>
  </div>
  
  <!-- Features -->
  <ul class="space-y-3 mb-6">
    <li class="flex items-center gap-3">
      <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
      <span class="text-sm text-gray-700">Unlimited messages</span>
    </li>
    <li class="flex items-center gap-3">
      <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
      <span class="text-sm text-gray-700">GPT-4 & Claude access</span>
    </li>
    <li class="flex items-center gap-3">
      <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
      <span class="text-sm text-gray-700">Custom chatbots</span>
    </li>
    <li class="flex items-center gap-3">
      <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
      <span class="text-sm text-gray-700">API access</span>
    </li>
    <li class="flex items-center gap-3">
      <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
      <span class="text-sm text-gray-700">Priority support</span>
    </li>
    <li class="flex items-center gap-3">
      <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
      <span class="text-sm text-gray-700">Analytics dashboard</span>
    </li>
  </ul>
  
  <!-- CTA Button -->
  <button class="w-full btn-primary px-8 py-3.5 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(37,99,235,0.3)] transition-all duration-200">
    Start Free Trial
  </button>
</div>
```

---

## 7. Light/Dark Mode 完整对照表

### 7.1 颜色变量 (Light Mode)

```css
:root {
  /* Primary */
  --primary: #6366F1;
  --primary-dark: #4F46E5;
  --primary-light: #E0E7FF;
  
  /* Background */
  --bg: #F5F5F5;
  --bg-white: #FFFFFF;
  --bg-gray-50: #F9FAFB;
  
  /* Text */
  --text: #111827;
  --text-muted: #6B7280;
  
  /* Border */
  --border: #E5E7EB;
}
```

### 7.2 颜色变量 (Dark Mode)

```css
.dark {
  /* Primary - 保持不变 */
  --primary: #6366F1;
  --primary-dark: #4F46E5;
  --primary-light: #3730A3;
  
  /* Background */
  --bg: #0F172A;              /* Slate-900 */
  --bg-white: #1E293B;        /* Slate-800 */
  --bg-gray-50: #334155;      /* Slate-700 */
  
  /* Text */
  --text: #F8FAFC;            /* Slate-50 */
  --text-muted: #94A3B8;      /* Slate-400 */
  
  /* Border */
  --border: rgba(255, 255, 255, 0.1);
}
```

### 7.3 组件 Dark Mode 样式

```css
/* Card - Dark Mode */
.dark .card {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

/* Button Secondary - Dark Mode */
.dark .btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #F8FAFC;
}

.dark .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Glass Card - Dark Mode */
.dark .glass-card {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}
```

### 7.4 Tailwind Dark Mode 实现

```html
<!-- Enable dark mode in tailwind.config.js -->
<script>
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
</script>

<!-- Card with dark mode -->
<div class="
  bg-white dark:bg-white/5
  border border-gray-200 dark:border-white/10
  text-gray-900 dark:text-slate-50
">
  <!-- Content -->
</div>

<!-- Button with dark mode -->
<button class="
  btn-secondary
  bg-white dark:bg-white/5
  border-2 border-gray-200 dark:border-white/10
  text-slate-900 dark:text-slate-50
  hover:bg-gray-50 dark:hover:bg-white/10
">
  Button
</button>
```

---

## 8. 关键测量数据总结

### 导航栏
- 高度: `65px`
- 背景: `白色 80% 透明度 + 毛玻璃`
- 边框: `底部 1px 灰色 (#E5E7EB)`
- 定位: `fixed`

### 容器
- 最大宽度: `1152px` (max-w-6xl)
- 水平内边距: `16px / 24px / 32px` (响应式)

### 按钮
- 主按钮: `padding: 14px 32px`, `font-size: 16px`, `border-radius: 12px`
- 次按钮: `padding: 14px 32px`, `border: 2px`, `border-radius: 12px`
- 小按钮: `padding: 8px 16px`, `font-size: 14px`

### 卡片
- 内边距: `24px`
- 圆角: `16px`
- 边框: `1px solid #E5E7EB`
- Hover 阴影: `0 20px 25px -5px rgba(37,99,235,0.1)`

### 输入框
- 高度: `46px`
- 内边距: `12px 16px`
- 字号: `14px`
- 圆角: `12px`

### Section 间距
- 垂直内边距: `80px` (py-20)
- Hero Section: `80px top / 64px bottom`

### 字体大小
- H1: `60px / 700 / 60px` (size/weight/line-height)
- H2: `36px / 700 / 40px`
- H3: `18px / 600 / 28px`
- Body: `16px / 400 / 24px`
- Small: `14px / 400 / 20px`

---

## 9. 快速参考 Tailwind 类名

### 颜色类
```
bg-primary → bg-[#6366F1]
text-primary → text-[#6366F1]
border-primary → border-[#6366F1]

bg-gray-100 → bg-[#F3F4F6]
text-gray-900 → text-[#111827]
text-gray-500 → text-[#6B7280]
border-gray-200 → border-[#E5E7EB]
```

### 间距类
```
p-6 → padding: 24px
px-8 py-3.5 → padding: 14px 32px
gap-6 → gap: 24px
py-20 → padding-top/bottom: 80px
```

### 圆角类
```
rounded-lg → 8px
rounded-xl → 12px
rounded-2xl → 16px
rounded-full → 9999px
```

### 阴影类
```
shadow-xl → 0 20px 25px -5px rgba(0,0,0,0.1)
shadow-sm → 0 1px 2px 0 rgba(0,0,0,0.05)
shadow-none → box-shadow: none
```

### 过渡类
```
transition-all duration-200
transition-colors duration-200
hover:-translate-y-0.5
hover:shadow-xl
```

---

## 10. 实施检查清单

### 设计系统设置
- [ ] 安装 Google Fonts (Space Grotesk, DM Sans)
- [ ] 配置 Tailwind CSS 颜色变量
- [ ] 定义 CSS 自定义属性 (:root)
- [ ] 设置 Dark Mode 配置

### 组件实现
- [ ] 导航栏 (固定、毛玻璃效果)
- [ ] 主按钮 (渐变、hover 上移、阴影)
- [ ] 次按钮 (边框、hover 效果)
- [ ] 卡片 (基础、hover、glass)
- [ ] 输入框 (focus 状态)
- [ ] Hero Section
- [ ] Feature Grid
- [ ] Pricing Cards

### 响应式测试
- [ ] Mobile (< 640px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)
- [ ] 导航菜单折叠
- [ ] Grid 列数变化
- [ ] 字体大小缩放

### 动效验证
- [ ] 按钮 hover 上移 2px
- [ ] 卡片 hover 阴影
- [ ] 链接 hover 颜色
- [ ] 过渡时间 200ms
- [ ] 页面入场动画

### 色彩验证
- [ ] 主色 #6366F1 应用正确
- [ ] 灰度色阶使用一致
- [ ] Dark Mode 色值正确
- [ ] 边框颜色 #E5E7EB
- [ ] 文字颜色对比度符合 WCAG

---

**文档生成时间**: 2026-02-11  
**参考源**: https://ui-ux-pro-max-skill.nextlevelbuilder.io/demo/ai-chatbot-platform  
**设计系统**: Tailwind CSS v3 + Custom CSS Variables  
**浏览器测试**: Chrome 最新版本

**下一步行动**:
1. 将此规范分享给开发团队
2. 创建 Tailwind 配置文件
3. 开发组件库
4. 进行视觉 QA 验证
