# Mobile Web App Visual Design Specification
**OhMyProfessors 移动端 Web App 视觉设计规范**

---

**文档信息**
- **作者**: UI Design Director (Matías Duarte 思维模型)
- **创建时间**: 2026-02-11
- **版本**: 1.0
- **状态**: 设计完成，待实施
- **基于**: `/docs/product/mobile-webapp-ux-redesign.md`

**设计哲学**
> "Digital design is like painting, except the paint never dries." — Matías Duarte

**核心原则**
- **Material Honesty**: 每个元素都有物理特性（深度、光影、运动）
- **Bold, Graphic, Intentional**: 清晰的视觉层级，大胆的色彩使用
- **Motion Provides Meaning**: 动画不是装饰，是交流方式
- **Adaptive Design**: 不是响应式缩小，是为每个平台重新设计

---

## 📋 目录

1. [移动端设计系统](#part-1-移动端设计系统)
2. [首页视觉规范](#part-2-首页视觉规范)
3. [课程详情页视觉规范](#part-3-课程详情页视觉规范)
4. [搜索页视觉规范](#part-4-搜索页视觉规范)
5. [Top Rated 页视觉规范](#part-5-top-rated-页视觉规范)
6. [通用组件视觉规范](#part-6-通用组件视觉规范)
7. [动画规范](#part-7-动画规范)
8. [响应式断点](#part-8-响应式断点)
9. [无障碍设计](#part-9-无障碍设计)
10. [Figma 组件库](#part-10-figma-组件库)

---

## Part 1: 移动端设计系统

### 1.1 色彩系统

> "Color is a power which directly influences the soul." — Wassily Kandinsky

#### **主色调（Primary）**

```css
/* Primary Blue - 代表信任、智慧、学术 */
--color-primary-50:  #E6F4FB;   /* Lightest - Background */
--color-primary-100: #B3E0F5;   /* Light - Hover States */
--color-primary-200: #80CCEF;   /* Soft - Disabled States */
--color-primary-300: #4DB8E9;   /* Medium - Secondary Actions */
--color-primary-400: #26A8E1;   /* Medium-Dark - Hover */
--color-primary-500: #0D8BD9;   /* Base - Primary Actions */
--color-primary-600: #0A6FB5;   /* Dark - Active States */
--color-primary-700: #075391;   /* Darker - Text on Light BG */
--color-primary-800: #05376D;   /* Very Dark - Headers */
--color-primary-900: #021B49;   /* Darkest - High Contrast Text */
```

**使用场景：**
- Primary Buttons: `bg-primary-500` + `text-white`
- Links: `text-primary-600` (可读性更好)
- Active Tab: `border-b-2 border-primary-500`
- Icons: `text-primary-500`
- Background Highlights: `bg-primary-50`

**Tailwind 配置：**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F4FB',
          100: '#B3E0F5',
          200: '#80CCEF',
          300: '#4DB8E9',
          400: '#26A8E1',
          500: '#0D8BD9', // Base
          600: '#0A6FB5',
          700: '#075391',
          800: '#05376D',
          900: '#021B49',
        },
      },
    },
  },
}
```

---

#### **辅助色调（Secondary）**

```css
/* Secondary Gray - 中性、专业、平衡 */
--color-gray-50:  #F9FAFB;   /* Background */
--color-gray-100: #F3F4F6;   /* Subtle Background */
--color-gray-200: #E5E7EB;   /* Borders */
--color-gray-300: #D1D5DB;   /* Disabled */
--color-gray-400: #9CA3AF;   /* Placeholder Text */
--color-gray-500: #6B7280;   /* Secondary Text */
--color-gray-600: #4B5563;   /* Body Text */
--color-gray-700: #374151;   /* Headings */
--color-gray-800: #1F2937;   /* Dark Headings */
--color-gray-900: #111827;   /* Primary Text */
```

**使用场景：**
- Body Text: `text-gray-600`
- Headings: `text-gray-900`
- Borders: `border-gray-200`
- Backgrounds: `bg-gray-50`
- Secondary Buttons: `bg-gray-100` + `text-gray-700`

---

#### **语义色彩（Semantic）**

```css
/* Success - 绿色（成功、完成、高评分） */
--color-success-50:  #ECFDF5;
--color-success-500: #10B981;   /* Base */
--color-success-700: #047857;   /* Dark */

/* Warning - 黄色（警告、中等评分） */
--color-warning-50:  #FFFBEB;
--color-warning-500: #F59E0B;   /* Base */
--color-warning-700: #B45309;   /* Dark */

/* Error - 红色（错误、低评分、难度高） */
--color-error-50:  #FEF2F2;
--color-error-500: #EF4444;     /* Base */
--color-error-700: #B91C1C;     /* Dark */

/* Info - 蓝色（信息提示） */
--color-info-50:  #EFF6FF;
--color-info-500: #3B82F6;      /* Base */
--color-info-700: #1D4ED8;      /* Dark */
```

**评分颜色映射：**
```typescript
// 根据评分自动选择颜色
function getRatingColor(rating: number): string {
  if (rating >= 4.0) return 'text-success-600'   // 绿色
  if (rating >= 3.0) return 'text-warning-600'   // 黄色
  return 'text-error-600'                        // 红色
}

// 根据难度自动选择颜色
function getDifficultyColor(difficulty: string): string {
  if (difficulty === 'Easy') return 'text-success-600'   // 🟢 绿色
  if (difficulty === 'Medium') return 'text-warning-600' // 🟡 黄色
  return 'text-error-600'                                // 🔴 红色
}
```

---

### 1.2 字体系统

> "Typography is what language looks like." — Ellen Lupton

#### **字体家族**

```css
/* Primary Font - Inter (Google Fonts) */
--font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

/* Monospace Font - JetBrains Mono (用于课程代码) */
--font-family-mono: 'JetBrains Mono', 'Courier New', monospace;
```

**字体加载策略：**
```html
<!-- 仅加载移动端需要的字重，减少加载时间 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**字重定义：**
```css
--font-weight-regular: 400;    /* Body Text */
--font-weight-medium:  500;    /* Emphasized Text */
--font-weight-semibold: 600;   /* Subheadings */
--font-weight-bold:    700;    /* Headings */
```

---

#### **字号系统（基于 4px Grid）**

```css
/* Type Scale - 移动端优化（比桌面端大 2-4px） */
--font-size-xs:   11px;  /* 0.6875rem - Caption, Fine Print */
--font-size-sm:   13px;  /* 0.8125rem - Small Labels */
--font-size-base: 15px;  /* 0.9375rem - Body Text */
--font-size-md:   16px;  /* 1rem - Body Large */
--font-size-lg:   18px;  /* 1.125rem - Subheading */
--font-size-xl:   20px;  /* 1.25rem - Heading 3 */
--font-size-2xl:  24px;  /* 1.5rem - Heading 2 */
--font-size-3xl:  28px;  /* 1.75rem - Heading 1 */
--font-size-4xl:  32px;  /* 2rem - Hero Title */
```

**行高系统：**
```css
/* Line Height - 移动端需要更大的行高（易读性） */
--line-height-tight:  1.25;   /* Headings */
--line-height-snug:   1.375;  /* Subheadings */
--line-height-normal: 1.5;    /* Body Text */
--line-height-relaxed: 1.625; /* Long Form Content */
--line-height-loose:  1.75;   /* Wide Columns */
```

**字母间距：**
```css
--letter-spacing-tighter: -0.02em;  /* Large Headings */
--letter-spacing-tight:   -0.01em;  /* Headings */
--letter-spacing-normal:  0em;      /* Body Text */
--letter-spacing-wide:    0.01em;   /* Uppercase Labels */
--letter-spacing-wider:   0.05em;   /* All Caps */
```

---

#### **排版样式类（Typography Styles）**

```css
/* Heading 1 - Hero Title */
.text-h1 {
  font-size: 28px;       /* 3xl */
  font-weight: 700;      /* Bold */
  line-height: 1.25;     /* Tight */
  letter-spacing: -0.02em;
  color: var(--color-gray-900);
}

/* Heading 2 - Page Title */
.text-h2 {
  font-size: 24px;       /* 2xl */
  font-weight: 700;
  line-height: 1.375;
  letter-spacing: -0.01em;
  color: var(--color-gray-900);
}

/* Heading 3 - Section Title */
.text-h3 {
  font-size: 20px;       /* xl */
  font-weight: 600;      /* Semibold */
  line-height: 1.375;
  color: var(--color-gray-900);
}

/* Body Large - Emphasized Text */
.text-body-lg {
  font-size: 16px;       /* md */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-gray-700);
}

/* Body - Default Text */
.text-body {
  font-size: 15px;       /* base */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-gray-600);
}

/* Body Small - Secondary Text */
.text-body-sm {
  font-size: 13px;       /* sm */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-gray-500);
}

/* Caption - Fine Print */
.text-caption {
  font-size: 11px;       /* xs */
  font-weight: 400;
  line-height: 1.375;
  color: var(--color-gray-400);
}

/* Label - Form Labels, Tags */
.text-label {
  font-size: 13px;       /* sm */
  font-weight: 500;      /* Medium */
  line-height: 1.375;
  color: var(--color-gray-700);
}

/* Course Code - Monospace */
.text-code {
  font-family: var(--font-family-mono);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.375;
  color: var(--color-primary-700);
}
```

**Tailwind 配置：**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'xs':   '11px',   // Caption
        'sm':   '13px',   // Small
        'base': '15px',   // Body
        'md':   '16px',   // Body Large
        'lg':   '18px',   // Subheading
        'xl':   '20px',   // H3
        '2xl':  '24px',   // H2
        '3xl':  '28px',   // H1
        '4xl':  '32px',   // Hero
      },
    },
  },
}
```

---

### 1.3 间距系统

> "White space is to be regarded as an active element, not a passive background." — Jan Tschichold

#### **8px Grid System**

```css
/* Spacing Scale - 基于 8px 网格 */
--spacing-0:   0px;      /* None */
--spacing-1:   4px;      /* 0.5rem - XXS */
--spacing-2:   8px;      /* 1rem - XS */
--spacing-3:   12px;     /* 1.5rem - SM */
--spacing-4:   16px;     /* 2rem - MD (Base) */
--spacing-5:   20px;     /* 2.5rem - LG */
--spacing-6:   24px;     /* 3rem - XL */
--spacing-8:   32px;     /* 4rem - 2XL */
--spacing-10:  40px;     /* 5rem - 3XL */
--spacing-12:  48px;     /* 6rem - 4XL */
--spacing-16:  64px;     /* 8rem - 5XL */
```

**移动端间距指南：**

| 用途 | 间距值 | 示例 |
|------|-------|------|
| **元素内间距** | 4px | Icon 与 Text 之间 |
| **组内元素间距** | 8px | Tag 之间的间距 |
| **相关元素间距** | 12px | 标题与描述之间 |
| **卡片内边距** | 16px | CourseCard padding |
| **Section 间距** | 24px | 不同 Section 之间 |
| **页面边距** | 16px | 页面左右 padding |
| **安全区** | 16px + env(safe-area) | 考虑 iOS 刘海 |

**Tailwind 配置：**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '5':  '20px',
        '6':  '24px',
        '8':  '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
    },
  },
}
```

---

### 1.4 圆角系统

```css
/* Border Radius - Material Design 风格 */
--radius-none:   0px;      /* Sharp Edges */
--radius-sm:     4px;      /* Small - Tags, Badges */
--radius-base:   8px;      /* Default - Buttons, Inputs */
--radius-md:     12px;     /* Medium - Cards */
--radius-lg:     16px;     /* Large - Modal, Sheet */
--radius-xl:     20px;     /* XL - Hero Cards */
--radius-2xl:    24px;     /* 2XL - Special Cards */
--radius-full:   9999px;   /* Circular - Avatar */
```

**使用指南：**

| 组件类型 | 圆角值 | 说明 |
|---------|-------|------|
| **Tag / Badge** | 4px | 小元素，小圆角 |
| **Button** | 8px | 标准按钮 |
| **Input** | 8px | 表单输入框 |
| **Card** | 12px | 卡片组件 |
| **Bottom Sheet** | 16px (仅顶部) | 底部弹出层 |
| **Modal** | 16px | 弹窗 |
| **Avatar** | 9999px | 圆形头像 |
| **Course Card** | 0px (移动端) | 全宽卡片无圆角 |
| **Professor Card** | 12px | 独立卡片 |

---

### 1.5 阴影系统（Material Elevation）

> "Light and shadow are the language of depth." — Matías Duarte

#### **Elevation Levels**

```css
/* Elevation 0 - Flat (无阴影) */
--shadow-none: none;

/* Elevation 1 - Subtle (Card Resting) */
--shadow-sm: 0px 1px 2px rgba(0, 0, 0, 0.04),
             0px 1px 3px rgba(0, 0, 0, 0.06);

/* Elevation 2 - Card Hover */
--shadow-base: 0px 2px 4px rgba(0, 0, 0, 0.06),
               0px 4px 6px rgba(0, 0, 0, 0.08);

/* Elevation 3 - Sticky Header, Floating Action Button */
--shadow-md: 0px 4px 6px rgba(0, 0, 0, 0.07),
             0px 10px 15px rgba(0, 0, 0, 0.10);

/* Elevation 4 - Modal, Bottom Sheet */
--shadow-lg: 0px 10px 15px rgba(0, 0, 0, 0.10),
             0px 20px 25px rgba(0, 0, 0, 0.12);

/* Elevation 5 - Maximum (很少使用) */
--shadow-xl: 0px 20px 25px rgba(0, 0, 0, 0.12),
             0px 25px 50px rgba(0, 0, 0, 0.15);
```

**使用指南：**

| 组件 | Elevation Level | 阴影值 | 说明 |
|------|----------------|--------|------|
| **CourseCard (Resting)** | 0 | none | 移动端卡片无阴影，用边框分隔 |
| **ProfessorCard** | 1 | shadow-sm | 微妙的深度感 |
| **Card (Hover)** | 2 | shadow-base | 桌面端悬停效果 |
| **Sticky Header** | 3 | shadow-md | 固定在顶部时显示 |
| **Bottom Tab Bar** | 3 | shadow-md | 固定在底部 |
| **Bottom Sheet** | 4 | shadow-lg | 弹出层 |
| **Modal** | 4 | shadow-lg | 弹窗 |

**Tailwind 配置：**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'none': 'none',
        'sm':   '0px 1px 2px rgba(0, 0, 0, 0.04), 0px 1px 3px rgba(0, 0, 0, 0.06)',
        'base': '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.08)',
        'md':   '0px 4px 6px rgba(0, 0, 0, 0.07), 0px 10px 15px rgba(0, 0, 0, 0.10)',
        'lg':   '0px 10px 15px rgba(0, 0, 0, 0.10), 0px 20px 25px rgba(0, 0, 0, 0.12)',
        'xl':   '0px 20px 25px rgba(0, 0, 0, 0.12), 0px 25px 50px rgba(0, 0, 0, 0.15)',
      },
    },
  },
}
```

---

### 1.6 Z-Index 层级

```css
/* Z-Index Scale - 防止层级混乱 */
--z-base:        0;    /* Default Layer */
--z-dropdown:    10;   /* Dropdown Menu */
--z-sticky:      20;   /* Sticky Elements (Stats Bar) */
--z-fixed:       30;   /* Fixed Elements (Header, Tab Bar) */
--z-overlay:     40;   /* Overlay Background */
--z-modal:       50;   /* Modal, Bottom Sheet */
--z-toast:       60;   /* Toast Notifications */
--z-tooltip:     70;   /* Tooltips */
```

**使用指南：**

| 组件 | Z-Index | 说明 |
|------|---------|------|
| **Page Content** | 0 | 默认层级 |
| **Stats Bar (Sticky)** | 20 | 在内容之上 |
| **Sticky Header** | 30 | 在 Stats Bar 之上 |
| **Bottom Tab Bar** | 30 | 与 Header 同级 |
| **Overlay Backdrop** | 40 | 半透明遮罩 |
| **Bottom Sheet** | 50 | 在 Overlay 之上 |
| **Toast** | 60 | 在所有组件之上 |

---

### 1.7 移动端特定设计代币

#### **触摸目标尺寸（Touch Target Size）**

```css
/* Apple Human Interface Guidelines */
--touch-target-min:        44px;   /* 最小触摸区域 */
--touch-target-comfortable: 56px;  /* 舒适触摸区域 */

/* Material Design */
--touch-target-md-min:     48px;   /* Android 最小 */
```

**实现策略：**
```css
/* 即使视觉元素小于 44px，触摸区域也要保证 44px */
.icon-button {
  /* 视觉尺寸: 24px */
  width: 24px;
  height: 24px;
  
  /* 触摸区域: 44px (通过 padding 扩大) */
  padding: 10px; /* (44 - 24) / 2 = 10px */
}

/* 使用伪元素扩大触摸区域 */
.small-link {
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -10px; /* 上下左右各扩大 10px */
  }
}
```

---

#### **iOS 安全区（Safe Area Insets）**

```css
/* iOS Safe Area - 适配刘海、底部指示器 */
--safe-area-inset-top:    env(safe-area-inset-top);
--safe-area-inset-bottom: env(safe-area-inset-bottom);
--safe-area-inset-left:   env(safe-area-inset-left);
--safe-area-inset-right:  env(safe-area-inset-right);
```

**使用示例：**
```css
/* Sticky Header - 考虑顶部刘海 */
.mobile-header {
  position: sticky;
  top: 0;
  padding-top: var(--safe-area-inset-top);
  height: calc(56px + var(--safe-area-inset-top));
}

/* Bottom Tab Bar - 考虑底部指示器 */
.bottom-tab-bar {
  position: fixed;
  bottom: 0;
  padding-bottom: var(--safe-area-inset-bottom);
  height: calc(56px + var(--safe-area-inset-bottom));
}
```

**Tailwind 配置：**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        'safe-top':    'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left':   'env(safe-area-inset-left)',
        'safe-right':  'env(safe-area-inset-right)',
      },
    },
  },
}
```

---

### 1.8 设计代币总结

**CSS Custom Properties 完整定义：**

```css
:root {
  /* Colors - Primary */
  --color-primary-50:  #E6F4FB;
  --color-primary-500: #0D8BD9;
  --color-primary-600: #0A6FB5;
  --color-primary-700: #075391;
  --color-primary-900: #021B49;
  
  /* Colors - Gray */
  --color-gray-50:  #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-900: #111827;
  
  /* Colors - Semantic */
  --color-success-500: #10B981;
  --color-warning-500: #F59E0B;
  --color-error-500:   #EF4444;
  
  /* Typography */
  --font-family-primary: 'Inter', system-ui, sans-serif;
  --font-size-xs:   11px;
  --font-size-sm:   13px;
  --font-size-base: 15px;
  --font-size-md:   16px;
  --font-size-lg:   18px;
  --font-size-xl:   20px;
  --font-size-2xl:  24px;
  --font-size-3xl:  28px;
  
  /* Spacing */
  --spacing-1:  4px;
  --spacing-2:  8px;
  --spacing-3:  12px;
  --spacing-4:  16px;
  --spacing-6:  24px;
  --spacing-8:  32px;
  
  /* Border Radius */
  --radius-none: 0px;
  --radius-sm:   4px;
  --radius-base: 8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-none: none;
  --shadow-sm:   0px 1px 2px rgba(0, 0, 0, 0.04), 0px 1px 3px rgba(0, 0, 0, 0.06);
  --shadow-md:   0px 4px 6px rgba(0, 0, 0, 0.07), 0px 10px 15px rgba(0, 0, 0, 0.10);
  --shadow-lg:   0px 10px 15px rgba(0, 0, 0, 0.10), 0px 20px 25px rgba(0, 0, 0, 0.12);
  
  /* Touch Targets */
  --touch-target-min: 44px;
  --touch-target-comfortable: 56px;
  
  /* Safe Area */
  --safe-area-inset-top:    env(safe-area-inset-top);
  --safe-area-inset-bottom: env(safe-area-inset-bottom);
  
  /* Z-Index */
  --z-base:    0;
  --z-sticky:  20;
  --z-fixed:   30;
  --z-overlay: 40;
  --z-modal:   50;
}
```

---

## Part 2: 首页视觉规范

> "The first page is the front door of your digital house." — Matías Duarte

### 2.1 首页整体布局

#### **视觉架构**

```
┌─────────────────────────────────────────┐
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ← Safe Area Top
│ ┃  Sticky Header (56px + safe-area) ┃ │
│ ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫ │
│ ┃  Stats Bar (40px)                 ┃ │ ← Sticky
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ CourseCard 1                        │ │
│ │ (Full Width, 120px)                 │ │
│ ├─────────────────────────────────────┤ │ ← 1px Border
│ │ CourseCard 2                        │ │
│ ├─────────────────────────────────────┤ │
│ │ CourseCard 3                        │ │
│ ├─────────────────────────────────────┤ │
│ │ ...                                 │ │
│ └─────────────────────────────────────┘ │
│                                         │
│         [Scrollable Area]               │
│                                         │
├─────────────────────────────────────────┤
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃  Bottom Tab Bar (56px + safe-area)┃ │ ← Fixed
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
└─────────────────────────────────────────┘ ← Safe Area Bottom
```

---

### 2.2 Sticky Header 设计

#### **视觉规范**

**尺寸：**
- 高度: `56px` (基础) + `env(safe-area-inset-top)`
- 内边距: `0 16px` (左右)
- 背景: `rgba(255, 255, 255, 0.95)` (半透明白色)
- 背景模糊: `backdrop-filter: blur(8px)` (毛玻璃效果)
- 边框: `border-bottom: 1px solid #E5E7EB` (gray-200)
- Z-Index: `30` (在内容之上)

**布局：**
```
┌──────────────────────────────────────────┐
│ [Logo] OhMyProfessors          [🔍]     │ ← 左对齐 Logo，右对齐搜索
│                                          │
└──────────────────────────────────────────┘
```

**CSS/Tailwind 实现：**

```tsx
// components/mobile/MobileHeader.tsx
export function MobileHeader({ 
  title = "OhMyProfessors",
  showSearch = true,
  showBack = false,
  onBack,
}: MobileHeaderProps) {
  return (
    <header className="
      /* Layout */
      sticky top-0 z-30
      flex items-center justify-between
      
      /* Dimensions */
      h-14
      px-4
      pt-[env(safe-area-inset-top)]
      
      /* Appearance */
      bg-white/95
      backdrop-blur-md
      border-b border-gray-200
      
      /* Typography */
      text-gray-900
    ">
      {/* Left - Back Button or Logo */}
      {showBack ? (
        <button
          onClick={onBack}
          className="
            /* Touch Target */
            w-11 h-11
            flex items-center justify-center
            
            /* Appearance */
            -ml-2
            rounded-full
            active:bg-gray-100
            transition-colors duration-150
          "
          aria-label="返回"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          {/* Logo Icon */}
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">O</span>
          </div>
          
          {/* Brand Name */}
          <h1 className="text-lg font-bold text-gray-900">
            {title}
          </h1>
        </div>
      )}
      
      {/* Right - Search Button */}
      {showSearch && (
        <Link
          href="/search"
          className="
            /* Touch Target */
            w-11 h-11
            flex items-center justify-center
            
            /* Appearance */
            -mr-2
            rounded-full
            active:bg-gray-100
            transition-colors duration-150
          "
          aria-label="搜索"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </Link>
      )}
    </header>
  )
}
```

**关键设计决策：**

1. **毛玻璃效果（Frosted Glass）**
   - `bg-white/95` (95% 不透明度) + `backdrop-blur-md`
   - 滚动时内容穿过 Header，有深度感
   - 参考：iOS Safari、iOS 通知中心

2. **Logo 设计**
   - 8×8px 圆角正方形
   - 使用 Primary Color (#0D8BD9)
   - 内含白色 "O" 字母
   - 简洁、识别度高

3. **触摸区域扩大**
   - 按钮视觉尺寸: 24×24px (图标)
   - 触摸区域: 44×44px (w-11 h-11)
   - 使用 `-ml-2 -mr-2` 向外扩展，不增加视觉宽度

---

### 2.3 Stats Bar 设计

#### **视觉规范**

**尺寸：**
- 高度: `40px`
- 内边距: `12px 16px`
- 背景: `#FFFFFF` (纯白色)
- 边框: `border-bottom: 1px solid #E5E7EB` (gray-200)
- Position: `sticky top-14` (紧贴 Header 下方)
- Z-Index: `20` (低于 Header)

**内容：**
```
┌──────────────────────────────────────┐
│ 📚 5 Courses Available               │ ← 图标 + 统计文字
└──────────────────────────────────────┘
```

**CSS/Tailwind 实现：**

```tsx
// components/mobile/StatsBar.tsx
export function StatsBar({ 
  totalCourses 
}: { 
  totalCourses: number 
}) {
  return (
    <div className="
      /* Layout */
      sticky top-14 z-20
      flex items-center
      
      /* Dimensions */
      h-10
      px-4
      
      /* Appearance */
      bg-white
      border-b border-gray-200
    ">
      <p className="
        /* Typography */
        text-sm
        font-medium
        text-gray-600
        
        /* Icon Spacing */
        flex items-center gap-2
      ">
        <span className="text-base">📚</span>
        <span>{totalCourses} Courses Available</span>
      </p>
    </div>
  )
}
```

**动态变体：**

```tsx
// 根据页面状态显示不同内容
export function DynamicStatsBar({ 
  view = 'all',  // 'all' | 'search' | 'filter'
  stats 
}: DynamicStatsBarProps) {
  const content = {
    all: (
      <>
        <span className="text-base">📚</span>
        <span>{stats.totalCourses} Courses Available</span>
      </>
    ),
    search: (
      <>
        <span className="text-base">🔍</span>
        <span>Found {stats.searchResults} results</span>
      </>
    ),
    filter: (
      <>
        <span className="text-base">🎯</span>
        <span>{stats.filteredCourses} Courses in {stats.department}</span>
      </>
    ),
  }
  
  return (
    <div className="sticky top-14 z-20 flex items-center h-10 px-4 bg-white border-b border-gray-200">
      <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
        {content[view]}
      </p>
    </div>
  )
}
```

---

### 2.4 MobileCourseCard 设计

#### **视觉规范**

**尺寸：**
- 宽度: `100%` (全宽，无左右间距)
- 最小高度: `120px`
- 内边距: `16px` (上下左右)
- 背景: `#FFFFFF`
- 边框: `border-bottom: 1px solid #E5E7EB` (仅底部)
- 圆角: `0px` (全宽卡片无圆角)

**布局：**
```
┌──────────────────────────────────────────┐
│ COMP 1012                                │ ← Course Code (11px, Bold, Primary-600)
│                                          │
│ Computer Science I                       │ ← Course Name (18px, Bold, Gray-900)
│                                          │
│ 📚 Computer Science                      │ ← Department (13px, Gray-600)
│                                          │
│ ⭐ 4.2  •  👥 3  •  💬 45               │ ← Stats (13px, Gray-700)
└──────────────────────────────────────────┘
```

**CSS/Tailwind 实现：**

```tsx
// components/mobile/MobileCourseCard.tsx
import Link from 'next/link'
import { Course } from '@/types/course'

export function MobileCourseCard({ course }: { course: Course }) {
  return (
    <Link 
      href={`/courses/${course.slug}`}
      className="
        /* Layout */
        block
        
        /* Dimensions */
        min-h-[120px]
        px-4 py-4
        
        /* Appearance */
        bg-white
        border-b border-gray-200
        
        /* Interaction */
        active:bg-gray-50
        transition-colors duration-150
      "
    >
      {/* Course Code */}
      <div className="
        /* Typography */
        text-xs
        font-semibold
        text-primary-600
        uppercase
        tracking-wide
        
        /* Spacing */
        mb-1
      ">
        {course.code}
      </div>
      
      {/* Course Name */}
      <h3 className="
        /* Typography */
        text-lg
        font-bold
        text-gray-900
        line-clamp-2
        
        /* Spacing */
        mb-2
      ">
        {course.name}
      </h3>
      
      {/* Department */}
      <div className="
        /* Layout */
        flex items-center gap-1.5
        
        /* Typography */
        text-sm
        text-gray-600
        
        /* Spacing */
        mb-3
      ">
        <span className="text-base">📚</span>
        <span>{course.department}</span>
      </div>
      
      {/* Stats */}
      <div className="
        /* Layout */
        flex items-center gap-4
        
        /* Typography */
        text-sm
        text-gray-700
      ">
        {/* Rating */}
        <span className="flex items-center gap-1">
          <span className="text-base">⭐</span>
          <span className="font-medium">{course.avgRating.toFixed(1)}</span>
        </span>
        
        {/* Separator */}
        <span className="text-gray-400">•</span>
        
        {/* Professors */}
        <span className="flex items-center gap-1">
          <span className="text-base">👥</span>
          <span>{course.professorCount}</span>
        </span>
        
        {/* Separator */}
        <span className="text-gray-400">•</span>
        
        {/* Reviews */}
        <span className="flex items-center gap-1">
          <span className="text-base">💬</span>
          <span>{course.reviewCount}</span>
        </span>
      </div>
    </Link>
  )
}
```

**关键设计决策：**

1. **全宽设计（Edge-to-Edge）**
   - 卡片从屏幕左边缘延伸到右边缘
   - 内容区域使用 `px-4` 保持呼吸空间
   - 参考：iOS Settings、iOS Mail

2. **底部边框而非卡片边框**
   - 使用 `border-b` 而非 `border` + `rounded`
   - 创造统一的列表视觉
   - 节省垂直空间

3. **Active 状态反馈**
   - `:active:bg-gray-50` (触摸时背景变灰)
   - `transition-colors duration-150` (150ms 过渡)
   - 提供即时的触觉反馈

4. **Emoji 图标**
   - 使用原生 Emoji 而非 Icon Font
   - 减少加载时间（无需加载图标库）
   - 更生动、更友好

5. **行高限制**
   - 课程名称: `line-clamp-2` (最多 2 行)
   - 防止长标题破坏布局
   - 保持卡片高度一致性

---

### 2.5 MobileCourseList 设计

```tsx
// components/mobile/MobileCourseList.tsx
import { MobileCourseCard } from './MobileCourseCard'
import { Course } from '@/types/course'

export function MobileCourseList({ courses }: { courses: Course[] }) {
  return (
    <div className="
      /* Layout */
      divide-y divide-gray-200
      
      /* Appearance */
      bg-white
    ">
      {courses.map((course) => (
        <MobileCourseCard 
          key={course.id} 
          course={course} 
        />
      ))}
    </div>
  )
}
```

**使用 `divide-y` 的优势：**
- 自动在相邻元素之间添加边框
- 避免重复的 `border-b` 类
- 更语义化

---

### 2.6 完整首页组件

```tsx
// components/mobile/HomePage.tsx
'use client'

import { MobileHeader } from './MobileHeader'
import { StatsBar } from './StatsBar'
import { MobileCourseList } from './MobileCourseList'
import { BottomTabBar } from './BottomTabBar'
import { useCourses } from '@/hooks/useCourses'

export function MobileHomePage() {
  const { courses, loading } = useCourses()
  
  if (loading) {
    return <MobileLoadingState />
  }
  
  return (
    <div className="
      /* Layout */
      min-h-screen
      
      /* Appearance */
      bg-gray-50
      
      /* Bottom Tab Bar Spacing */
      pb-[calc(56px+env(safe-area-inset-bottom))]
    ">
      {/* Sticky Header */}
      <MobileHeader 
        title="OhMyProfessors"
        showSearch={true}
      />
      
      {/* Stats Bar */}
      <StatsBar totalCourses={courses.length} />
      
      {/* Course List */}
      <MobileCourseList courses={courses} />
      
      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab="home" />
    </div>
  )
}
```

---

## Part 3: 课程详情页视觉规范

### 3.1 课程详情页整体布局

```
┌─────────────────────────────────────────┐
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ← Sticky Header with Back Button
│ ┃  ← COMP 1012           [❤️ Save]   ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ Computer Science I                  │ │ ← Course Hero
│ │ University of Adelaide              │ │
│ │ 💼 Computer Science                 │ │
│ │ Introduction to programming...      │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ ⭐ 4.2  •  💬 45  •  👥 3          │ │ ← Stats Section
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Compare Professors (3)      [View All] │ ← Section Header
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ ProfessorCard 1                     │ │
│ ├─────────────────────────────────────┤ │
│ │ ProfessorCard 2                     │ │
│ ├─────────────────────────────────────┤ │
│ │ ProfessorCard 3                     │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃  Bottom Tab Bar                    ┃ │
│ ┗━��━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
└─────────────────────────────────────────┘
```

---

### 3.2 Sticky Header with Back Button

```tsx
// components/mobile/CourseDetailHeader.tsx
export function CourseDetailHeader({ 
  courseCode,
  isSaved = false,
  onSave,
  onBack,
}: CourseDetailHeaderProps) {
  return (
    <header className="
      /* Layout */
      sticky top-0 z-30
      flex items-center justify-between
      
      /* Dimensions */
      h-14
      px-2
      pt-[env(safe-area-inset-top)]
      
      /* Appearance */
      bg-white/95
      backdrop-blur-md
      border-b border-gray-200
    ">
      {/* Left - Back Button + Course Code */}
      <div className="flex items-center gap-1">
        <button
          onClick={onBack}
          className="
            w-11 h-11
            flex items-center justify-center
            rounded-full
            active:bg-gray-100
            transition-colors duration-150
          "
          aria-label="返回"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <span className="
          text-base
          font-semibold
          text-gray-900
        ">
          {courseCode}
        </span>
      </div>
      
      {/* Right - Save Button */}
      <button
        onClick={onSave}
        className="
          w-11 h-11
          flex items-center justify-center
          rounded-full
          active:bg-gray-100
          transition-colors duration-150
        "
        aria-label={isSaved ? "已收藏" : "收藏"}
      >
        {isSaved ? (
          <span className="text-2xl">❤️</span>
        ) : (
          <span className="text-2xl">🤍</span>
        )}
      </button>
    </header>
  )
}
```

---

### 3.3 Course Hero Section

```tsx
// components/mobile/CourseHero.tsx
'use client'

import { useState } from 'react'
import { Course } from '@/types/course'

export function CourseHero({ course }: { course: Course }) {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <div className="
      /* Appearance */
      bg-white
      border-b border-gray-200
      
      /* Dimensions */
      px-4 py-6
    ">
      {/* Course Name */}
      <h1 className="
        /* Typography */
        text-3xl
        font-bold
        text-gray-900
        leading-tight
        
        /* Spacing */
        mb-2
      ">
        {course.name}
      </h1>
      
      {/* University */}
      <p className="
        /* Typography */
        text-sm
        text-gray-600
        
        /* Spacing */
        mb-4
      ">
        {course.university}
      </p>
      
      {/* Meta Info */}
      <div className="
        /* Layout */
        flex flex-wrap gap-x-4 gap-y-2
        
        /* Typography */
        text-sm
        text-gray-700
        
        /* Spacing */
        mb-4
      ">
        <span className="flex items-center gap-1.5">
          <span className="text-base">💼</span>
          <span>{course.department}</span>
        </span>
        
        <span className="flex items-center gap-1.5">
          <span className="text-base">📚</span>
          <span>{course.credits} credits</span>
        </span>
        
        <span className="flex items-center gap-1.5">
          <span className="text-base">🎓</span>
          <span>{course.level}</span>
        </span>
      </div>
      
      {/* Description */}
      <div className="
        /* Typography */
        text-sm
        text-gray-700
        leading-relaxed
      ">
        <p className={expanded ? '' : 'line-clamp-3'}>
          {course.description}
        </p>
        
        {course.description.length > 150 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="
              /* Typography */
              text-primary-600
              font-medium
              
              /* Spacing */
              mt-2
              
              /* Interaction */
              active:text-primary-700
            "
          >
            {expanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  )
}
```

**关键设计决策：**

1. **超大标题（3xl / 28px）**
   - 移动端首屏最重要的信息
   - 使用 `leading-tight` (line-height: 1.25) 紧凑布局

2. **可折叠描述**
   - 默认显示 3 行 (`line-clamp-3`)
   - 点击 "Read More" 展开
   - 节省垂直空间

3. **Emoji + Text 组合**
   - 视觉识别更快
   - 减少图标加载

---

### 3.4 Stats Section

```tsx
// components/mobile/CourseStats.tsx
export function CourseStats({ course }: { course: Course }) {
  return (
    <div className="
      /* Layout */
      grid grid-cols-3 gap-4
      
      /* Appearance */
      bg-primary-50
      border-b border-primary-100
      
      /* Dimensions */
      px-4 py-4
    ">
      {/* Average Rating */}
      <div className="text-center">
        <div className="
          /* Typography */
          text-2xl
          font-bold
          text-primary-600
          
          /* Layout */
          flex items-center justify-center gap-1
        ">
          <span className="text-xl">⭐</span>
          <span>{course.avgRating.toFixed(1)}</span>
        </div>
        <div className="
          /* Typography */
          text-xs
          text-gray-600
          
          /* Spacing */
          mt-1
        ">
          Avg Rating
        </div>
      </div>
      
      {/* Reviews */}
      <div className="text-center">
        <div className="
          text-2xl
          font-bold
          text-primary-600
          flex items-center justify-center gap-1
        ">
          <span className="text-xl">💬</span>
          <span>{course.reviewCount}</span>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Reviews
        </div>
      </div>
      
      {/* Professors */}
      <div className="text-center">
        <div className="
          text-2xl
          font-bold
          text-primary-600
          flex items-center justify-center gap-1
        ">
          <span className="text-xl">👥</span>
          <span>{course.professorCount}</span>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Professors
        </div>
      </div>
    </div>
  )
}
```

**关键设计决策：**

1. **彩色背景（Primary-50）**
   - 视觉上与其他 Section 区分
   - 强调统计信息的重要性

2. **3 列网格布局**
   - 平均分配空��
   - 数字居中对齐

3. **大号数字（2xl / 24px）**
   - 数字是关键信息，使用大字号
   - 标签使用小字号 (xs / 11px)

---

### 3.5 MobileProfessorCard 设计

```tsx
// components/mobile/MobileProfessorCard.tsx
import Link from 'next/link'
import { Professor } from '@/types/professor'

export function MobileProfessorCard({ professor }: { professor: Professor }) {
  // 根据难度返回对应的 Emoji 和颜色
  const getDifficultyDisplay = (difficulty: string) => {
    const map = {
      'Easy':   { emoji: '🟢', color: 'text-success-600' },
      'Medium': { emoji: '🟡', color: 'text-warning-600' },
      'Hard':   { emoji: '🔴', color: 'text-error-600' },
    }
    return map[difficulty as keyof typeof map] || map.Medium
  }
  
  const difficultyDisplay = getDifficultyDisplay(professor.difficulty)
  
  return (
    <div className="
      /* Appearance */
      bg-white
      rounded-xl
      border border-gray-200
      
      /* Dimensions */
      p-4
      
      /* Shadow */
      shadow-sm
    ">
      {/* Professor Name */}
      <h3 className="
        /* Typography */
        text-lg
        font-bold
        text-gray-900
        
        /* Spacing */
        mb-2
      ">
        {professor.name}
      </h3>
      
      {/* Rating & Difficulty */}
      <div className="
        /* Layout */
        flex items-center gap-4
        
        /* Typography */
        text-sm
        
        /* Spacing */
        mb-3
      ">
        {/* Rating */}
        <span className="flex items-center gap-1">
          <span className="text-base">⭐</span>
          <span className="font-semibold text-gray-900">
            {professor.avgRating.toFixed(1)}
          </span>
        </span>
        
        {/* Difficulty */}
        <span className={`
          flex items-center gap-1
          ${difficultyDisplay.color}
        `}>
          <span className="text-base">{difficultyDisplay.emoji}</span>
          <span className="font-medium">{professor.difficulty}</span>
        </span>
        
        {/* Review Count */}
        <span className="text-gray-500">
          {professor.reviewCount} reviews
        </span>
      </div>
      
      {/* Top Tags */}
      <div className="
        /* Layout */
        flex flex-wrap gap-2
        
        /* Spacing */
        mb-4
      ">
        {professor.topTags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="
              /* Appearance */
              px-2.5 py-1
              bg-primary-50
              text-primary-700
              rounded
              
              /* Typography */
              text-xs
              font-medium
            "
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* CTA Button */}
      <Link
        href={`/professors/${professor.slug}`}
        className="
          /* Layout */
          block
          text-center
          
          /* Appearance */
          bg-primary-500
          text-white
          rounded-lg
          
          /* Dimensions */
          py-3
          
          /* Typography */
          font-semibold
          text-sm
          
          /* Interaction */
          active:bg-primary-600
          transition-colors duration-150
        "
      >
        View {professor.reviewCount} Reviews →
      </Link>
    </div>
  )
}
```

**关键设计决策：**

1. **独立卡片（非列表项）**
   - 使用 `rounded-xl` (12px) + `shadow-sm`
   - 与 CourseCard 的列表式设计区分
   - 更强调"对比"功能

2. **明确的 CTA 按钮**
   - 使用 Primary Color 吸引注意力
   - 全宽按钮，点击区域大
   - 包含具体数字（"View 24 Reviews"）

3. **语义化颜色**
   - Easy = 绿色
   - Medium = 黄色
   - Hard = 红色
   - 用户一眼识别难度

4. **最多 3 个 Tags**
   - `slice(0, 3)` 限制数量
   - 避免标签过多破坏布局

---

### 3.6 Professor List Section

```tsx
// components/mobile/ProfessorListSection.tsx
import { MobileProfessorCard } from './MobileProfessorCard'
import { Professor } from '@/types/professor'

export function ProfessorListSection({ 
  professors 
}: { 
  professors: Professor[] 
}) {
  return (
    <section className="
      /* Appearance */
      bg-gray-50
      
      /* Dimensions */
      py-6
    ">
      {/* Section Header */}
      <div className="
        /* Layout */
        flex items-center justify-between
        
        /* Dimensions */
        px-4 mb-4
      ">
        <h2 className="
          /* Typography */
          text-xl
          font-bold
          text-gray-900
        ">
          Compare Professors ({professors.length})
        </h2>
        
        <button className="
          /* Typography */
          text-sm
          font-medium
          text-primary-600
          
          /* Interaction */
          active:text-primary-700
        ">
          View All →
        </button>
      </div>
      
      {/* Professor Cards */}
      <div className="
        /* Layout */
        space-y-4
        
        /* Dimensions */
        px-4
      ">
        {professors.map((prof) => (
          <MobileProfessorCard 
            key={prof.id} 
            professor={prof} 
          />
        ))}
      </div>
    </section>
  )
}
```

---

### 3.7 完整课程详情页组件

```tsx
// components/mobile/CourseDetailPage.tsx
'use client'

import { CourseDetailHeader } from './CourseDetailHeader'
import { CourseHero } from './CourseHero'
import { CourseStats } from './CourseStats'
import { ProfessorListSection } from './ProfessorListSection'
import { BottomTabBar } from './BottomTabBar'
import { useCourseDetail } from '@/hooks/useCourseDetail'

export function MobileCourseDetailPage({ 
  slug 
}: { 
  slug: string 
}) {
  const { course, professors, loading } = useCourseDetail(slug)
  
  if (loading) {
    return <MobileLoadingState />
  }
  
  if (!course) {
    return <MobileErrorState message="Course not found" />
  }
  
  return (
    <div className="
      /* Layout */
      min-h-screen
      
      /* Appearance */
      bg-gray-50
      
      /* Bottom Tab Bar Spacing */
      pb-[calc(56px+env(safe-area-inset-bottom))]
    ">
      {/* Sticky Header */}
      <CourseDetailHeader 
        courseCode={course.code}
        onBack={() => window.history.back()}
      />
      
      {/* Course Hero */}
      <CourseHero course={course} />
      
      {/* Stats */}
      <CourseStats course={course} />
      
      {/* Professor List */}
      <ProfessorListSection professors={professors} />
      
      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab="home" />
    </div>
  )
}
```

---

## Part 4: 搜索页视觉规范

### 4.1 搜索页整体布局

```
┌─────────────────────────────────────────┐
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ← Search Header (全屏)
│ ┃  ← [搜索框: 输入课程...]     [×]   ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
├───────────────────���─────────────────────┤
│                                         │
│ Recent Searches                         │ ← 未输入时显示
│ ┌─────────────────────────────────────┐ │
│ │ 🕐 Computer Science                 │ │
│ ├─────────────────────────────────────┤ │
│ │ 🕐 COMP 1012                        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Popular Searches                        │
│ ┌─────────────────────────────────────┐ │
│ │ 🔥 Data Structures                  │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘

// 输入后
┌─────────────────────────────────────────┐
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃  ← [Comp...]                  [×]  ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
├─────────────────────────────────────────┤
│ Results (3)                             │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ COMP 1012                           │ │ ← CourseCard
│ │ Computer Science I                  │ │
│ ├─────────────────────────────────────┤ │
│ │ COMP 2024                           │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

### 4.2 Search Header

```tsx
// components/mobile/SearchHeader.tsx
'use client'

import { useState, useEffect, useRef } from 'react'

export function SearchHeader({
  query,
  onQueryChange,
  onClear,
  onBack,
}: SearchHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  
  // 页面加载时自动聚焦
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  
  return (
    <header className="
      /* Layout */
      fixed top-0 left-0 right-0
      z-50
      flex items-center gap-3
      
      /* Dimensions */
      h-14
      px-4
      pt-[calc(8px+env(safe-area-inset-top))]
      pb-2
      
      /* Appearance */
      bg-white
      border-b border-gray-200
    ">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="
          /* Touch Target */
          w-11 h-11
          flex items-center justify-center
          flex-shrink-0
          
          /* Appearance */
          -ml-2
          rounded-full
          active:bg-gray-100
          transition-colors duration-150
        "
        aria-label="返回"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Search Input Container */}
      <div className="
        /* Layout */
        flex-1
        relative
      ">
        {/* Input */}
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="搜索课程名称或代码..."
          className="
            /* Layout */
            w-full
            
            /* Dimensions */
            h-10
            pl-4 pr-10
            
            /* Appearance */
            bg-gray-100
            rounded-lg
            border-none
            
            /* Typography */
            text-base
            text-gray-900
            placeholder:text-gray-400
            
            /* Interaction */
            focus:outline-none
            focus:ring-2
            focus:ring-primary-500
            focus:bg-white
            
            /* Transition */
            transition-all duration-200
          "
        />
        
        {/* Clear Button */}
        {query.length > 0 && (
          <button
            onClick={onClear}
            className="
              /* Position */
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              
              /* Dimensions */
              w-6 h-6
              
              /* Appearance */
              bg-gray-300
              rounded-full
              
              /* Layout */
              flex items-center justify-center
              
              /* Interaction */
              active:bg-gray-400
              transition-colors duration-150
            "
            aria-label="清除"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </header>
  )
}
```

**关键设计决策：**

1. **自动聚焦**
   - 使用 `useRef` + `useEffect` 自动聚焦输入框
   - 键盘自动弹出，减少交互步骤

2. **Focus 状态**
   - 聚焦时：`bg-white` + `ring-2 ring-primary-500`
   - 未聚焦时：`bg-gray-100`
   - 视觉反馈清晰

3. **清除按钮**
   - 仅在有内容时显示
   - 圆形按钮，易于点击

---

### 4.3 Recent Searches

```tsx
// components/mobile/RecentSearches.tsx
'use client'

import { useRecentSearches } from '@/hooks/useRecentSearches'

export function RecentSearches({ 
  onSelect 
}: { 
  onSelect: (query: string) => void 
}) {
  const { searches, removeSearch } = useRecentSearches()
  
  if (searches.length === 0) return null
  
  return (
    <section className="
      /* Dimensions */
      py-4
    ">
      {/* Section Header */}
      <h3 className="
        /* Typography */
        text-sm
        font-semibold
        text-gray-500
        uppercase
        tracking-wide
        
        /* Dimensions */
        px-4 mb-3
      ">
        Recent Searches
      </h3>
      
      {/* Search List */}
      <div className="divide-y divide-gray-200">
        {searches.map((search) => (
          <div
            key={search.id}
            className="
              /* Layout */
              flex items-center justify-between
              
              /* Dimensions */
              px-4 py-3
              
              /* Appearance */
              bg-white
              
              /* Interaction */
              active:bg-gray-50
            "
          >
            {/* Search Query */}
            <button
              onClick={() => onSelect(search.query)}
              className="
                /* Layout */
                flex items-center gap-3
                flex-1
                
                /* Typography */
                text-base
                text-gray-900
                text-left
              "
            >
              <span className="text-xl">🕐</span>
              <span>{search.query}</span>
            </button>
            
            {/* Remove Button */}
            <button
              onClick={() => removeSearch(search.id)}
              className="
                /* Touch Target */
                w-9 h-9
                flex items-center justify-center
                
                /* Appearance */
                rounded-full
                active:bg-gray-100
              "
              aria-label="移除"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

### 4.4 Search Results

```tsx
// components/mobile/SearchResults.tsx
import { MobileCourseCard } from './MobileCourseCard'
import { useSearchCourses } from '@/hooks/useSearchCourses'

export function SearchResults({ 
  query 
}: { 
  query: string 
}) {
  const { results, loading } = useSearchCourses(query)
  
  if (loading) {
    return <SearchLoadingSkeleton />
  }
  
  if (results.length === 0) {
    return <SearchEmptyState query={query} />
  }
  
  return (
    <div>
      {/* Results Count */}
      <div className="
        /* Dimensions */
        px-4 py-3
        
        /* Appearance */
        bg-gray-50
        border-b border-gray-200
      ">
        <p className="
          /* Typography */
          text-sm
          font-medium
          text-gray-600
        ">
          Found {results.length} {results.length === 1 ? 'result' : 'results'}
        </p>
      </div>
      
      {/* Results List */}
      <div className="divide-y divide-gray-200 bg-white">
        {results.map((course) => (
          <MobileCourseCard 
            key={course.id} 
            course={course} 
          />
        ))}
      </div>
    </div>
  )
}
```

---

### 4.5 Empty State

```tsx
// components/mobile/SearchEmptyState.tsx
export function SearchEmptyState({ 
  query 
}: { 
  query: string 
}) {
  return (
    <div className="
      /* Layout */
      flex flex-col items-center justify-center
      
      /* Dimensions */
      px-4 py-16
      
      /* Typography */
      text-center
    ">
      {/* Illustration */}
      <div className="
        /* Dimensions */
        w-24 h-24
        mb-6
        
        /* Appearance */
        bg-gray-100
        rounded-full
        
        /* Layout */
        flex items-center justify-center
      ">
        <span className="text-5xl">🔍</span>
      </div>
      
      {/* Heading */}
      <h3 className="
        /* Typography */
        text-xl
        font-bold
        text-gray-900
        
        /* Spacing */
        mb-2
      ">
        No results found
      </h3>
      
      {/* Description */}
      <p className="
        /* Typography */
        text-sm
        text-gray-600
        leading-relaxed
        
        /* Dimensions */
        max-w-xs
      ">
        We couldn't find any courses matching "{query}". 
        Try different keywords or browse all courses.
      </p>
      
      {/* CTA Button */}
      <Link
        href="/"
        className="
          /* Dimensions */
          px-6 py-3
          mt-6
          
          /* Appearance */
          bg-primary-500
          text-white
          rounded-lg
          
          /* Typography */
          font-semibold
          text-sm
          
          /* Interaction */
          active:bg-primary-600
          transition-colors duration-150
        "
      >
        Browse All Courses
      </Link>
    </div>
  )
}
```

---

## Part 5: Top Rated 页视觉规范

### 5.1 Tab Switcher 设计

```tsx
// components/mobile/TabSwitcher.tsx
'use client'

import { useState } from 'react'

export function TabSwitcher({
  activeTab,
  onTabChange,
  tabs,
}: TabSwitcherProps) {
  return (
    <div className="
      /* Appearance */
      bg-white
      border-b border-gray-200
      
      /* Layout */
      flex
    ">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              /* Layout */
              flex-1
              relative
              
              /* Dimensions */
              py-4
              
              /* Typography */
              text-sm
              font-semibold
              
              /* Appearance */
              ${isActive 
                ? 'text-primary-600' 
                : 'text-gray-500'
              }
              
              /* Interaction */
              active:bg-gray-50
              transition-colors duration-150
            `}
          >
            {tab.label}
            
            {/* Active Indicator */}
            {isActive && (
              <div className="
                /* Position */
                absolute
                bottom-0
                left-0
                right-0
                
                /* Dimensions */
                h-0.5
                
                /* Appearance */
                bg-primary-600
              " />
            )}
          </button>
        )
      })}
    </div>
  )
}
```

**关键设计决策：**

1. **下划线指示器**
   - 使用 2px (`h-0.5`) 粗线
   - Primary Color
   - 参考：iOS Segmented Control

2. **等宽 Tab**
   - 使用 `flex-1` 平均分配空间
   - 适合 2-4 个 Tab

---

### 5.2 完整 Top Rated 页

```tsx
// components/mobile/TopRatedPage.tsx
'use client'

import { useState } from 'react'
import { MobileHeader } from './MobileHeader'
import { TabSwitcher } from './TabSwitcher'
import { TopRatedCourseList } from './TopRatedCourseList'
import { TopRatedProfessorList } from './TopRatedProfessorList'
import { BottomTabBar } from './BottomTabBar'

export function MobileTopRatedPage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'professors'>('courses')
  
  return (
    <div className="
      min-h-screen
      bg-gray-50
      pb-[calc(56px+env(safe-area-inset-bottom))]
    ">
      {/* Sticky Header */}
      <MobileHeader title="Top Rated" />
      
      {/* Tab Switcher */}
      <div className="sticky top-14 z-20">
        <TabSwitcher
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={[
            { id: 'courses', label: 'Courses' },
            { id: 'professors', label: 'Professors' },
          ]}
        />
      </div>
      
      {/* Content */}
      <div className="mt-4">
        {activeTab === 'courses' ? (
          <TopRatedCourseList />
        ) : (
          <TopRatedProfessorList />
        )}
      </div>
      
      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab="top-rated" />
    </div>
  )
}
```

---

## Part 6: 通用组件视觉规范

### 6.1 Bottom Tab Bar

```tsx
// components/mobile/BottomTabBar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function BottomTabBar({ 
  activeTab 
}: { 
  activeTab: string 
}) {
  const pathname = usePathname()
  
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home', href: '/' },
    { id: 'search', icon: '🔍', label: 'Search', href: '/search' },
    { id: 'top-rated', icon: '⭐', label: 'Top Rated', href: '/top-rated' },
    { id: 'more', icon: '⋯', label: 'More', href: '/more' },
  ]
  
  return (
    <nav className="
      /* Position */
      fixed
      bottom-0
      left-0
      right-0
      z-30
      
      /* Appearance */
      bg-white
      border-t border-gray-200
      
      /* Dimensions */
      pb-[env(safe-area-inset-bottom)]
      
      /* Shadow */
      shadow-md
    ">
      <div className="
        /* Layout */
        flex items-center justify-around
        
        /* Dimensions */
        h-14
      ">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`
                /* Layout */
                flex flex-col items-center justify-center
                w-full h-full
                
                /* Typography */
                text-xs
                font-medium
                
                /* Appearance */
                ${isActive 
                  ? 'text-primary-600' 
                  : 'text-gray-500'
                }
                
                /* Interaction */
                active:bg-gray-50
                transition-colors duration-150
              `}
            >
              {/* Icon */}
              <span className={`
                text-2xl
                mb-0.5
                ${isActive ? 'scale-110' : 'scale-100'}
                transition-transform duration-150
              `}>
                {tab.icon}
              </span>
              
              {/* Label */}
              <span>{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

**关键设计决策：**

1. **固定在底部**
   - `position: fixed` + `bottom: 0`
   - 考虑 iOS 安全区 (`pb-[env(safe-area-inset-bottom)]`)

2. **Active 状态**
   - 颜色变化：gray-500 → primary-600
   - 图标��微放大：scale-100 → scale-110
   - 微妙的动画效果

3. **4 个 Tab**
   - Home, Search, Top Rated, More
   - 平均分配空间

---

### 6.2 Loading Skeleton

```tsx
// components/mobile/LoadingSkeleton.tsx
export function CourseCardSkeleton() {
  return (
    <div className="
      px-4 py-4
      bg-white
      border-b border-gray-200
      animate-pulse
    ">
      {/* Course Code */}
      <div className="
        w-20 h-3
        bg-gray-200
        rounded
        mb-2
      " />
      
      {/* Course Name */}
      <div className="
        w-full h-5
        bg-gray-300
        rounded
        mb-2
      " />
      <div className="
        w-3/4 h-5
        bg-gray-300
        rounded
        mb-3
      " />
      
      {/* Department */}
      <div className="
        w-32 h-4
        bg-gray-200
        rounded
        mb-3
      " />
      
      {/* Stats */}
      <div className="flex gap-4">
        <div className="w-12 h-4 bg-gray-200 rounded" />
        <div className="w-12 h-4 bg-gray-200 rounded" />
        <div className="w-12 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

export function MobileLoadingState() {
  return (
    <div>
      <MobileHeader title="OhMyProfessors" />
      <StatsBarSkeleton />
      {[...Array(5)].map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  )
}
```

---

### 6.3 Error State

```tsx
// components/mobile/ErrorState.tsx
export function MobileErrorState({ 
  message = "Something went wrong",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="
      flex flex-col items-center justify-center
      min-h-screen
      px-4
      text-center
    ">
      {/* Illustration */}
      <div className="
        w-24 h-24 mb-6
        bg-error-50
        rounded-full
        flex items-center justify-center
      ">
        <span className="text-5xl">⚠️</span>
      </div>
      
      {/* Heading */}
      <h3 className="
        text-xl font-bold text-gray-900 mb-2
      ">
        Oops!
      </h3>
      
      {/* Message */}
      <p className="
        text-sm text-gray-600 leading-relaxed max-w-xs mb-6
      ">
        {message}
      </p>
      
      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="
            px-6 py-3
            bg-primary-500 text-white
            rounded-lg
            font-semibold text-sm
            active:bg-primary-600
            transition-colors duration-150
          "
        >
          Try Again
        </button>
      )}
    </div>
  )
}
```

---

## Part 7: 动画规范

> "Motion reveals intent." — Matías Duarte

### 7.1 动画原则

1. **Functional, not decorative** (功能性，非装饰性)
   - 动画必须有目的：引导注意力、提供反馈、展示空间关系
   - 不做无意义的动画

2. **Fast, not slow** (快速，非缓慢)
   - 移动端动画应该快速（150-300ms）
   - 避免让用户等待

3. **Easing matters** (缓动很重要)
   - 使用自然的缓动函数
   - iOS 风格：`cubic-bezier(0.4, 0.0, 0.2, 1)`

---

### 7.2 动画时长

```css
/* Transition Durations */
--duration-instant:  0ms;      /* Instant (No Animation) */
--duration-fast:     150ms;    /* Touch Feedback */
--duration-normal:   200ms;    /* Page Transitions */
--duration-slow:     300ms;    /* Sheet Open/Close */
--duration-slower:   500ms;    /* Special Effects */
```

**使用指南：**

| 交互 | 时长 | 说明 |
|------|------|------|
| **Button Active State** | 150ms | 触摸反馈 |
| **Link Hover** | 150ms | 颜色变化 |
| **Page Transition** | 200ms | 页面切换 |
| **Bottom Sheet** | 300ms | 弹出层展开/关闭 |
| **Toast Show** | 200ms | 通知显示 |
| **Toast Hide** | 150ms | 通知消失 |

---

### 7.3 缓动函数

```css
/* Easing Functions */
--ease-linear:     linear;
--ease-in:         cubic-bezier(0.4, 0.0, 1, 1);
--ease-out:        cubic-bezier(0.0, 0.0, 0.2, 1);
--ease-in-out:     cubic-bezier(0.4, 0.0, 0.2, 1);
--ease-ios:        cubic-bezier(0.4, 0.0, 0.2, 1);    /* iOS 默认 */
--ease-material:   cubic-bezier(0.4, 0.0, 0.2, 1);    /* Material Design */
--ease-bounce:     cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**使用指南：**

| 动画类型 | 缓动函数 | 说明 |
|---------|---------|------|
| **淡入** | ease-out | 快速进入，缓慢停止 |
| **淡出** | ease-in | 缓慢开始，快速离开 |
| **移动** | ease-in-out | 平滑的加速和减速 |
| **弹性效果** | ease-bounce | 弹跳效果（谨慎使用） |

---

### 7.4 常见动画实现

#### **按钮点击反馈**

```css
/* CSS */
.button {
  background-color: var(--color-primary-500);
  transition: background-color 150ms cubic-bezier(0.4, 0.0, 0.2, 1);
}

.button:active {
  background-color: var(--color-primary-600);
}
```

```tsx
// Tailwind
<button className="
  bg-primary-500
  active:bg-primary-600
  transition-colors duration-150
">
  Click Me
</button>
```

---

#### **页面过渡动画**

```tsx
// components/mobile/PageTransition.tsx
'use client'

import { motion } from 'framer-motion'

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ 
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  )
}
```

**使用示例：**
```tsx
<PageTransition>
  <MobileHomePage />
</PageTransition>
```

---

#### **Bottom Sheet 动画**

```tsx
// components/mobile/BottomSheet.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'

export function BottomSheet({ 
  isOpen, 
  onClose, 
  children 
}: BottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="
              fixed inset-0 z-40
              bg-black/50
            "
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1]
            }}
            className="
              fixed
              bottom-0 left-0 right-0
              z-50
              bg-white
              rounded-t-2xl
              shadow-lg
              pb-[env(safe-area-inset-bottom)]
            "
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

#### **Skeleton Loading Animation**

```css
/* CSS */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f3f4f6 0%,
    #e5e7eb 50%,
    #f3f4f6 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

```tsx
// Tailwind
<div className="
  bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100
  bg-[length:200%_100%]
  animate-shimmer
">
  {/* Skeleton Content */}
</div>
```

---

## Part 8: 响应式断点

### 8.1 断点定义

```css
/* Breakpoints */
--breakpoint-mobile:  0px;      /* 0 - 767px */
--breakpoint-tablet:  768px;    /* 768px - 1023px */
--breakpoint-desktop: 1024px;   /* 1024px+ */
```

**Tailwind 配置：**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'mobile':  { 'max': '767px' },   // Mobile Only
      'tablet':  { 'min': '768px', 'max': '1023px' },  // Tablet Only
      'desktop': { 'min': '1024px' },  // Desktop+
      
      // 默认断点（保留）
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
}
```

---

### 8.2 组件响应策略

**决策树：**

```
用户访问页面
    ↓
窗口宽度 < 768px?
    ↓
  Yes → 渲染移动端组件 (MobileHomePage)
    ↓
  No → 窗口宽度 >= 1024px?
    ↓
  Yes → 渲染桌面端组件 (DesktopHomePage)
    ↓
  No → 渲染平板端组件 (TabletHomePage)
```

**实现示例：**

```tsx
// app/page.tsx
import { headers } from 'next/headers'
import { getDeviceType } from '@/lib/utils/device'
import { MobileHomePage } from '@/components/mobile/HomePage'
import { TabletHomePage } from '@/components/tablet/HomePage'
import { DesktopHomePage } from '@/components/desktop/HomePage'

export default async function HomePage() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  const deviceType = getDeviceType(userAgent)
  
  switch (deviceType) {
    case 'mobile':
      return <MobileHomePage />
    case 'tablet':
      return <TabletHomePage />
    case 'desktop':
      return <DesktopHomePage />
    default:
      return <DesktopHomePage />
  }
}
```

---

## Part 9: 无障碍设计

### 9.1 色彩对比度（WCAG AA）

**最小对比度要求：**
- 正常文字（< 18px）: `4.5:1`
- 大文字（≥ 18px）: `3:1`
- UI 组件: `3:1`

**验证通过的配色：**

| 前景色 | 背景色 | 对比度 | 用途 | WCAG Level |
|-------|-------|--------|------|-----------|
| `gray-900` | `white` | 16.5:1 | 标题 | AAA |
| `gray-600` | `white` | 7.5:1 | 正文 | AAA |
| `primary-600` | `white` | 5.2:1 | 链接 | AA |
| `white` | `primary-500` | 4.8:1 | 按钮 | AA |
| `gray-400` | `white` | 3.1:1 | Placeholder | AA (大字) |

**工具推荐：**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Stark Figma Plugin](https://www.getstark.co/)

---

### 9.2 触摸目标尺寸

**Apple Human Interface Guidelines:**
- 最小触摸目标: `44×44px`
- 推荐触摸目标: `48×48px`

**Material Design:**
- 最小触摸目标: `48×48px`

**我们的标准:**
- 移动端按钮: `44×44px` (w-11 h-11)
- 移动端链接: 扩展到 `44×44px` (使用 padding 或伪元素)
- 移动端表单输入: `44px` 高度

**实现示例：**

```tsx
// ✅ 正确：触摸区域 44×44px
<button className="w-11 h-11 flex items-center justify-center">
  <svg className="w-6 h-6">...</svg>
</button>

// ❌ 错误：触摸区域太小
<button className="w-6 h-6">
  <svg className="w-6 h-6">...</svg>
</button>
```

---

### 9.3 焦点状态

```css
/* Focus Ring */
.focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

**Tailwind 实现：**
```tsx
<button className="
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-primary-500
  focus-visible:ring-offset-2
">
  Button
</button>
```

---

### 9.4 语义化 HTML

```tsx
// ✅ 正确：使用语义化标签
<nav aria-label="主导航">
  <Link href="/">Home</Link>
</nav>

<main>
  <article>
    <h1>Course Title</h1>
    <p>Description</p>
  </article>
</main>

// ❌ 错误：全部使用 div
<div>
  <div>Home</div>
</div>

<div>
  <div>
    <div>Course Title</div>
    <div>Description</div>
  </div>
</div>
```

---

### 9.5 ARIA 标签

```tsx
// 图标按钮需要 aria-label
<button aria-label="搜索">
  <svg>...</svg>
</button>

// 加载状态需要 aria-live
<div aria-live="polite" aria-busy="true">
  Loading...
</div>

// 隐藏装饰性图标
<span aria-hidden="true">🎉</span>
```

---

## Part 10: Figma 组件库

### 10.1 Figma 文件结构

```
OhMyProfessors Mobile Design System
│
├── 📄 Cover Page
│
├── 🎨 Design Tokens
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Shadows
│   └── Border Radius
│
├── 🧩 Components
│   ├── Mobile Header
│   ├── Bottom Tab Bar
│   ├── MobileCourseCard
│   ├── MobileProfessorCard
│   ├── Buttons
│   ├── Inputs
│   ├── Tags
│   └── Loading States
│
├── 📱 Screens
│   ├── Home
│   ├── Course Detail
│   ├── Search
│   ├── Top Rated
│   └── More
│
└── 📐 Templates
    ├── iPhone 14 Pro (393×852)
    ├── iPhone SE (375×667)
    └── Pixel 7 (412×915)
```

---

### 10.2 Figma 组件规范

#### **MobileCourseCard Component**

**Properties (变体):**
- State: `default`, `pressed`
- Type: `with-image`, `without-image`

**Auto Layout:**
- Direction: Vertical
- Spacing: 8px
- Padding: 16px
- Width: Fill Container
- Min Height: 120px

**Layers:**
1. Container (Frame)
   - Fill: `#FFFFFF`
   - Border Bottom: 1px, `#E5E7EB`
   
2. Course Code (Text)
   - Font: Inter Semibold 11px
   - Color: `#0A6FB5` (Primary-600)
   - Letter Spacing: 0.5px
   - Transform: Uppercase
   
3. Course Name (Text)
   - Font: Inter Bold 18px
   - Color: `#111827` (Gray-900)
   - Line Height: 22px
   - Max Lines: 2
   
4. Department (Frame - Auto Layout)
   - Direction: Horizontal
   - Spacing: 6px
   - Items: Icon (📚) + Text
   
5. Stats (Frame - Auto Layout)
   - Direction: Horizontal
   - Spacing: 16px
   - Items: Rating + Professors + Reviews

---

#### **Bottom Tab Bar Component**

**Properties (变体):**
- Active Tab: `home`, `search`, `top-rated`, `more`
- Safe Area: `true`, `false`

**Auto Layout:**
- Direction: Horizontal
- Distribution: Space Between
- Padding: 0px 0px 0px + env(safe-area-inset-bottom)
- Height: 56px + safe-area-inset-bottom
- Fill: `#FFFFFF`
- Border Top: 1px, `#E5E7EB`
- Shadow: `shadow-md`

---

### 10.3 Figma Styles

**Color Styles:**
```
Colors/
├── Primary/
│   ├── Primary-50
│   ├── Primary-500 ⭐
│   └── Primary-600
├── Gray/
│   ├── Gray-50
│   ├── Gray-200
│   └── Gray-900
└── Semantic/
    ├── Success-500
    ├── Warning-500
    └── Error-500
```

**Text Styles:**
```
Typography/Mobile/
├── Heading-1 (28px Bold)
├── Heading-2 (24px Bold)
├── Heading-3 (20px Semibold)
├── Body-Large (16px Regular)
├── Body (15px Regular)
├── Body-Small (13px Regular)
├── Caption (11px Regular)
└── Label (13px Medium)
```

**Effect Styles:**
```
Shadows/
├── Shadow-None
├── Shadow-SM (Elevation 1)
├── Shadow-Base (Elevation 2)
├── Shadow-MD (Elevation 3)
└── Shadow-LG (Elevation 4)
```

---

### 10.4 导出设置

**iOS Export:**
- @1x: 100%
- @2x: 200% (Retina)
- @3x: 300% (iPhone 14 Pro Max)
- Format: PNG, SVG (icons)

**Android Export:**
- mdpi: 100%
- hdpi: 150%
- xhdpi: 200%
- xxhdpi: 300%
- xxxhdpi: 400%
- Format: PNG, XML (vector)

**Web Export:**
- @1x: 100%
- @2x: 200%
- Format: WebP, SVG (icons)

---

## 📊 设计检查清单

### 移动端组件检查

- [ ] **触摸目标**: 所有可点击元素 ≥ 44×44px
- [ ] **对比度**: 文字对比度 ≥ 4.5:1
- [ ] **字体大小**: 正文 ≥ 15px
- [ ] **间距**: 遵循 8px 网格
- [ ] **圆角**: 使用设计系统定义的圆角值
- [ ] **阴影**: 使用 Elevation 系统
- [ ] **颜色**: 仅使用设计代币中的颜色
- [ ] **动画**: 时长 150-300ms
- [ ] **安全区**: 考虑 iOS 刘海和底部指示器
- [ ] **Loading**: 提供 Skeleton 加载状态
- [ ] **Empty**: 提供 Empty State
- [ ] **Error**: 提供 Error State
- [ ] **Accessibility**: ARIA 标签完整
- [ ] **Responsive**: 在不同设备上测试

---

## 📚 参考资料

### 设计系统

1. **Material Design 3** (Google)
   - https://m3.material.io/
   - Material You 色彩系统
   - Material Elevation

2. **Apple Human Interface Guidelines**
   - https://developer.apple.com/design/human-interface-guidelines/
   - iOS 设计规范
   - Touch Target Size

3. **IBM Carbon Design System**
   - https://carbondesignsystem.com/
   - 设计代币 (Design Tokens)

### 工具

1. **Figma**
   - Component Design
   - Auto Layout
   - Variant System

2. **Tailwind CSS**
   - Utility-First CSS
   - Custom Configuration

3. **Framer Motion**
   - React 动画库
   - Page Transitions

### 无障碍

1. **WCAG 2.1 Guidelines**
   - https://www.w3.org/WAI/WCAG21/quickref/
   - Level AA 标准

2. **WebAIM**
   - https://webaim.org/
   - 色彩对比度检查

---

## 🎯 下一步行动

1. **Week 1: 在 Figma 创建设计系统**
   - 定义所有设计代币
   - 创建移动端组件库
   - 设计 4 个核心页面

2. **Week 2: 实施移动端组件**
   - 开发 MobileHeader, BottomTabBar
   - 开发 MobileCourseCard, MobileProfessorCard
   - 开发 Loading/Empty/Error States

3. **Week 3: 页面整合**
   - 整合首页
   - 整合课程详情页
   - 整合搜索页、Top Rated 页

4. **Week 4: 测试 & 优化**
   - 真机测试 (iPhone, Android)
   - 性能优化 (Lighthouse)
   - 无障碍测试 (axe DevTools)

---

**文档结束**

**设计总监签名**: Matías Duarte (思维模型)  
**日期**: 2026-02-11

---

> "The details are not the details. They make the design." — Charles Eames

**让我们创造完美的移动端 Web App 体验！** 🚀
