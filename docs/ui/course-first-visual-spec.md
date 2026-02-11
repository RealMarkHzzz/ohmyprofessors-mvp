# Course-First Visual Design Specification
## OhMyProfessors 课程优先模式视觉规范

**设计总监:** UI Design (Matías Duarte 思维模型)  
**日期:** 2026-02-11  
**版本:** 1.0  
**状态:** ✅ Complete

> "Design is not just what it looks like and feels like. Design is how it works."  
> — Matías Duarte, Google Material Design

---

## Executive Summary

本文档定义 OhMyProfessors 课程优先模式的完整视觉设计规范，基于 Material Design 原则，结合 Flat Design 美学，为开发团队提供精确的实施指南。

**核心目标：**
- 3 秒内建立"课程优先"认知
- 保持蓝色主题的视觉一致性
- 8px Grid 系统对齐
- 无障碍 WCAG 2.1 AA 标准

---

## Part 1: 设计原则

### 1.1 课程优先的视觉层级

#### 信息优先级系统（三层结构）

```
┌─────────────────────────────────────────┐
│ Level 1: PRIMARY (课程核心信息)         │
├─────────────────────────────────────────┤
│ • 课程代码 (COMP 1012)                  │
│ • 课程名称 (Computer Science I)        │
│ • 大学名称                              │
│                                         │
│ 视觉特征:                               │
│ - 字号: 24-32px                        │
│ - 字重: 700 (Bold)                     │
│ - 颜色: #111827 (高对比度)             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Level 2: SECONDARY (统计与元数据)       │
├─────────────────────────────────────────┤
│ • 教授数量                              │
│ • 平均评分                              │
│ • 评价总数                              │
│                                         │
│ 视觉特征:                               │
│ - 字号: 14-16px                        │
│ - 字重: 500 (Medium)                   │
│ - 颜色: #6B7280 (中等对比度)           │
│ - 图标辅助 (emoji/icons)               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Level 3: TERTIARY (行动召唤)            │
├─────────────────────────────────────────┤
│ • CTA 按钮 (Compare Professors)        │
│ • 辅助链接                              │
│                                         │
│ 视觉特征:                               │
│ - 字号: 14px                           │
│ - 字重: 500-600                        │
│ - 颜色: #3B82F6 (品牌蓝)               │
│ - 交互反馈 (Hover/Focus)               │
└─────────────────────────────────────────┘
```

#### 对比：教授优先 vs 课程优先

| 元素 | 教授优先（旧） | 课程优先（新） |
|------|---------------|---------------|
| **视觉焦点** | 教授头像（图片） | 课程代码（文字） |
| **最大元素** | 教授姓名 20px | 课程代码 24px |
| **次要信息** | 教授系别 | 教授数量 |
| **CTA** | View Profile | Compare Professors |
| **卡片高度** | 240px | 200px |

### 1.2 颜色系统

#### 品牌色（Primary Palette）

```css
/* 主色调：蓝色系 */
--blue-900: #1E3A8A;    /* 深蓝 - 标题 */
--blue-700: #1D4ED8;    /* 品牌蓝 - 链接 */
--blue-600: #2563EB;    /* 主蓝 - CTA Hover */
--blue-500: #3B82F6;    /* 蓝色 - Primary CTA */
--blue-400: #60A5FA;    /* 浅蓝 - Disabled */
--blue-100: #DBEAFE;    /* 极浅蓝 - 背景 */
--blue-50:  #EFF6FF;    /* 几乎白 - Hover 背景 */
```

**使用规范：**
- `--blue-500`: 主要 CTA 按钮、可点击链接
- `--blue-600`: Hover 状态
- `--blue-100`: 4.0-4.4 评分徽章背景
- `--blue-50`: 卡片 Hover 背景、表格行 Hover

#### 语义色（Semantic Colors）

```css
/* 成功/高评分 - 绿色系 */
--green-700: #047857;   /* 深绿 - 文字 */
--green-600: #059669;   /* 绿色 - 高评分徽章 */
--green-100: #D1FAE5;   /* 浅绿 - 高评分背景 */

/* 警告/中等评分 - 黄色系 */
--yellow-700: #B45309;  /* 深黄 - 文字 */
--yellow-600: #D97706;  /* 黄色 - 中等评分 */
--yellow-100: #FEF3C7;  /* 浅黄 - 背景 */

/* 危险/低评分 - 红色系 */
--red-700: #B91C1C;     /* 深红 - 文字 */
--red-600: #DC2626;     /* 红色 - 低评分 */
--red-100: #FEE2E2;     /* 浅红 - 背景 */
```

**评分���色映射：**
```
⭐ 4.5-5.0  → Green (bg-green-100 text-green-700)
⭐ 4.0-4.4  → Blue (bg-blue-100 text-blue-700)
⭐ 3.5-3.9  → Yellow (bg-yellow-100 text-yellow-700)
⭐ 3.0-3.4  → Orange (bg-orange-100 text-orange-700)
⭐ <3.0     → Red (bg-red-100 text-red-700)
```

#### 中性色（Neutral Palette）

```css
/* 灰度系统 */
--gray-950: #030712;    /* 黑 - 主标题 */
--gray-900: #111827;    /* 深灰 - 副标题 */
--gray-700: #374151;    /* 灰 - 正文 */
--gray-600: #4B5563;    /* 中灰 - 辅助文字 */
--gray-500: #6B7280;    /* 浅灰 - 禁用状态 */
--gray-300: #D1D5DB;    /* 极浅灰 - 分割线 */
--gray-100: #F3F4F6;    /* 背景灰 - 表头 */
--gray-50:  #F9FAFB;    /* 几乎白 - 次级背景 */
--white:    #FFFFFF;    /* 白色 - 卡片背景 */
```

#### 难度指示器颜色

```css
/* 难度等级 */
.difficulty-easy {
  color: #059669;        /* 绿色圆点 */
  background: #D1FAE5;   /* 浅绿背景 (可选) */
}

.difficulty-medium {
  color: #D97706;        /* 黄色圆点 */
  background: #FEF3C7;   /* 浅黄背景 */
}

.difficulty-hard {
  color: #DC2626;        /* 红色圆点 */
  background: #FEE2E2;   /* 浅红背景 */
}
```

### 1.3 字体规范

#### 字体家族

```css
/* 主字体：Inter（开源，优秀的屏幕显示效果） */
--font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 
                    'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 
                    sans-serif;

/* 代码字体 */
--font-family-mono: 'SF Mono', 'Consolas', 'Liberation Mono', 
                    'Menlo', monospace;
```

**字体加载策略：**
```html
<!-- 通过 Google Fonts 引入 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

#### 字体尺寸系统（8px Grid）

```css
/* 标题系统 */
--text-5xl: 48px;    /* Hero Title (Desktop) */
--text-4xl: 36px;    /* Page Title */
--text-3xl: 30px;    /* Section Title */
--text-2xl: 24px;    /* 课程代码 */
--text-xl:  20px;    /* 课程名称 */
--text-lg:  18px;    /* 副标题 */

/* 正文系统 */
--text-base: 16px;   /* 正文 */
--text-sm:   14px;   /* 辅助文字 */
--text-xs:   12px;   /* 标签、徽章 */

/* 行高系统 */
--leading-tight:  1.25;  /* 标题 */
--leading-snug:   1.375; /* 副标题 */
--leading-normal: 1.5;   /* 正文 */
--leading-relaxed: 1.625; /* 长文本 */
```

#### 字重系统

```css
--font-normal:    400;  /* 正文 */
--font-medium:    500;  /* 辅助信息 */
--font-semibold:  600;  /* 按钮、链接 */
--font-bold:      700;  /* 标题、课程代码 */
--font-extrabold: 800;  /* Hero Title */
```

**使用规则：**
| 元素 | 字号 | 字重 | 行高 |
|------|-----|------|------|
| Hero 标题 | 48px | 800 | 1.25 |
| 页面标题 | 36px | 700 | 1.25 |
| 课程代码 | 24px | 700 | 1.25 |
| 课程名称 | 16px | 500 | 1.375 |
| 正文 | 16px | 400 | 1.5 |
| 辅助文字 | 14px | 400 | 1.5 |
| 标签 | 12px | 500 | 1.375 |

### 1.4 间距系统（8px Grid）

```css
/* 8px 递增系统 */
--spacing-1:  8px;   /* 0.5rem */
--spacing-2:  16px;  /* 1rem */
--spacing-3:  24px;  /* 1.5rem */
--spacing-4:  32px;  /* 2rem */
--spacing-5:  40px;  /* 2.5rem */
--spacing-6:  48px;  /* 3rem */
--spacing-8:  64px;  /* 4rem */
--spacing-10: 80px;  /* 5rem */
--spacing-12: 96px;  /* 6rem */
```

**使用场景：**
- `8px`: 组件内小间距（图标与文字）
- `16px`: 组件内标准间距（段落、行）
- `24px`: 组件间小间距（卡片内分组）
- `32px`: 组件间标准间距（卡片间）
- `48px`: 区块间间距（Section）
- `64px`: 大区块间距（页面级）

### 1.5 圆角系统

```css
--radius-sm:   4px;   /* 标签、徽章 */
--radius-base: 8px;   /* 按钮、输入框 */
--radius-md:   12px;  /* 卡片 */
--radius-lg:   16px;  /* 大卡片、Modal */
--radius-xl:   24px;  /* Hero 区块 */
--radius-full: 9999px; /* 圆形、搜索框 */
```

### 1.6 阴影系统（Material Elevation）

```css
/* 0dp - 无阴影 */
--shadow-none: none;

/* 1dp - 轻微悬浮 */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* 2dp - 卡片默认 */
--shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
               0 1px 2px -1px rgba(0, 0, 0, 0.1);

/* 4dp - 卡片 Hover */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
             0 2px 4px -2px rgba(0, 0, 0, 0.1);

/* 8dp - Dropdown、Modal */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
             0 4px 6px -4px rgba(0, 0, 0, 0.1);

/* 16dp - 弹窗、浮动面板 */
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
             0 8px 10px -6px rgba(0, 0, 0, 0.1);

/* 24dp - Modal 顶层 */
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

**使用规则：**
| 元素 | 默认阴影 | Hover 阴影 | Active 阴影 |
|------|---------|-----------|------------|
| 卡片 | shadow-base | shadow-md | shadow-sm |
| 按钮 | shadow-sm | shadow-base | none |
| Dropdown | shadow-lg | - | - |
| Modal | shadow-2xl | - | - |

---

## Part 2: CourseCard 完整规范

### 2.1 尺寸规范

```css
.course-card {
  /* 布局 */
  width: 100%;              /* 父容器宽度 */
  min-height: 200px;        /* 最小高度 */
  
  /* 间距 */
  padding: 20px;            /* 内边距 */
  gap: 16px;                /* 子元素间距 */
  
  /* 边框 */
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  
  /* 阴影 */
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  
  /* 背景 */
  background: #FFFFFF;
  
  /* 布局方式 */
  display: flex;
  flex-direction: column;
}
```

#### 响应式尺寸

```css
/* 桌面端（≥1280px）*/
.course-card {
  width: 568px;  /* (600px - 32px padding) */
}

/* 平板端（768-1279px）*/
@media (max-width: 1279px) {
  .course-card {
    width: 100%;   /* 自适应容器 */
    max-width: 600px;
  }
}

/* 移动端（<768px）*/
@media (max-width: 767px) {
  .course-card {
    width: 100%;
    padding: 16px;  /* 减小内边距 */
    min-height: 180px;
  }
}
```

### 2.2 信息层级

```
┌────────────────────────────────────┐
│ ┌────────────────────────────────┐ │ ← 20px padding
│ │ COMP 1012          [⭐ 4.2]    │ │ ← Level 1: 课程代码 + 评分徽章
│ │ 24px/Bold          12px/Badge  │ │
│ │                                │ │
│ │ Computer Science I             │ │ ← Level 1: 课程名称
│ │ 16px/Medium                    │ │
│ └────────────────────────────────┘ │
│                                    │ ← 16px gap
│ ┌────────────────────────────────┐ │
│ │ 🏛️ University of Adelaide      │ │ ← Level 2: 大学
│ │ 14px/Normal                    │ │
│ └────────────────────────────────┘ │
│                                    │ ← 16px gap
│ ┌────────────────────────────────┐ │
│ │ 👥 3 professors teaching       │ │ ← Level 2: 统计信息
│ │ 📝 45 reviews                  │ │
│ │ 14px/Normal                    │ │
│ └────────────────────────────────┘ │
│                                    │ ← 16px gap
│ ┌────────────────────────────────┐ │
│ │      [Compare Professors →]    │ │ ← Level 3: CTA
│ │      14px/Semibold/Blue        │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘
```

### 2.3 完整 HTML 结构

```html
<a href="/courses/adelaide-comp-1012" class="course-card">
  <!-- Header: 课程代码 + 评分 -->
  <div class="course-header">
    <h3 class="course-code">COMP 1012</h3>
    <div class="rating-badge rating-high">
      <span class="icon">⭐</span>
      <span class="value">4.2</span>
    </div>
  </div>
  
  <!-- 课程名称 -->
  <p class="course-name">Computer Science I</p>
  
  <!-- 元数据 -->
  <div class="course-meta">
    <span class="university">
      <span class="icon">🏛️</span>
      University of Adelaide
    </span>
  </div>
  
  <!-- 统计信息 -->
  <div class="course-stats">
    <div class="stat">
      <span class="icon">👥</span>
      <span class="value">3</span>
      <span class="label">professors</span>
    </div>
    <div class="stat">
      <span class="icon">📝</span>
      <span class="value">45</span>
      <span class="label">reviews</span>
    </div>
  </div>
  
  <!-- CTA -->
  <div class="course-cta">
    <span class="cta-text">Compare Professors</span>
    <span class="cta-arrow">→</span>
  </div>
</a>
```

### 2.4 完整 CSS 规范

```css
/* ====================
   CourseCard 基础样式
   ==================== */

.course-card {
  /* 布局 */
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  /* 尺寸 */
  width: 100%;
  min-height: 200px;
  padding: 20px;
  
  /* 视觉 */
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  
  /* 交互 */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

/* ====================
   Header: 课程代码 + 评分
   ==================== */

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.course-code {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.25;
  color: #111827;
  margin: 0;
  letter-spacing: -0.02em;
}

/* 评分徽章 */
.rating-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
}

.rating-badge .icon {
  font-size: 14px;
}

/* 评分颜色系统 */
.rating-high {        /* 4.5+ */
  background: #D1FAE5;
  color: #047857;
}

.rating-good {        /* 4.0-4.4 */
  background: #DBEAFE;
  color: #1D4ED8;
}

.rating-medium {      /* 3.5-3.9 */
  background: #FEF3C7;
  color: #B45309;
}

.rating-low {         /* <3.5 */
  background: #F3F4F6;
  color: #6B7280;
}

/* ====================
   课程名称
   ==================== */

.course-name {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.375;
  color: #374151;
  margin: 0;
}

/* ====================
   元数据
   ==================== */

.course-meta {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
}

.course-meta .icon {
  margin-right: 6px;
}

/* ====================
   统计信息
   ==================== */

.course-stats {
  display: flex;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
}

.course-stats .stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  line-height: 1.375;
}

.course-stats .icon {
  font-size: 14px;
}

.course-stats .value {
  font-weight: 600;
  color: #111827;
}

.course-stats .label {
  color: #9CA3AF;
}

/* ====================
   CTA
   ==================== */

.course-cta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 14px;
  font-weight: 600;
  color: #3B82F6;
}

.cta-arrow {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ====================
   交互状态
   ==================== */

/* Hover 状态 */
.course-card:hover {
  transform: translateY(-2px);
  border-color: #3B82F6;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
}

.course-card:hover .cta-arrow {
  transform: translateX(4px);
}

/* Focus 状态（键盘导航）*/
.course-card:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

/* Active 状态（点击）*/
.course-card:active {
  transform: translateY(0px);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
}

/* ====================
   响应式调整
   ==================== */

@media (max-width: 767px) {
  .course-card {
    padding: 16px;
    gap: 12px;
    min-height: 180px;
  }
  
  .course-code {
    font-size: 20px;
  }
  
  .course-name {
    font-size: 15px;
  }
  
  .course-stats {
    flex-direction: column;
    gap: 8px;
  }
}
```

### 2.5 交互状态定义

#### Normal 状态
```css
background: #FFFFFF;
border: 1px solid #E5E7EB;
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
transform: translateY(0);
```

#### Hover 状态
```css
background: #FFFFFF;
border: 1px solid #3B82F6;          /* 蓝色边框 */
box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
transform: translateY(-2px);        /* 上浮 2px */
.cta-arrow { transform: translateX(4px); } /* 箭头右移 */
```

#### Focus 状态
```css
outline: 2px solid #3B82F6;
outline-offset: 2px;
/* 保持 Normal 状态的其他样式 */
```

#### Active 状态
```css
transform: translateY(0px);         /* 按下效果 */
box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
```

---

## Part 3: ProfessorComparisonTable 规范

### 3.1 桌面端表格设计

#### 表格布局规范

```
┌───────────────────────────────────────────────────────────────────┐
│ Compare Professors Teaching This Course                          │ ← 24px padding
│ Computer Science I                                                │   14px subtitle
├──────────────┬──────────┬────────────┬──────────┬────────────────┤
│ Professor    │ Rating   │ Difficulty │ Reviews  │ Top Tags       │ ← 表头 (48px 高)
│              │          │            │          │                │   bg-gray-50
├──────────────┼──────────┼────────────┼──────────┼────────────────┤
│ [头像 48px]  │ ⭐ 4.5   │ 🟢 Easy    │ 24       │ Clear, Helpful │ ← 行 (72px 高)
│ Dr. Sarah J. │          │            │          │                │   Hover: bg-blue-50
│ CS Dept      │          │            │          │                │
├──────────────┼──────────┼────────────┼──────────┼────────────────┤
│ [头像 48px]  │ ⭐ 4.2   │ 🟡 Medium  │ 18       │ Fair, Engaging │
│ Prof. Michael│          │            │          │                │
│ CS Dept      │          │            │          │                │
├──────────────┼──────────┼───���────────┼──────────┼────────────────┤
│ [头像 48px]  │ ⭐ 3.8   │ 🔴 Hard    │ 12       │ Tough, Strict  │
│ Dr. Emma W.  │          │            │          │                │
│ CS Dept      │          │            │          │                │
└──────────────┴──────────┴────────────┴──────────┴────────────────┘
```

#### 列宽分配（基于 1200px 容器）

```css
.col-professor {   width: 28%;  }  /* 336px - 教授信息 */
.col-rating {      width: 14%;  }  /* 168px - 评分 */
.col-difficulty {  width: 14%;  }  /* 168px - 难度 */
.col-reviews {     width: 12%;  }  /* 144px - 评价数 */
.col-highlights {  width: 24%;  }  /* 288px - 标签 */
.col-actions {     width: 8%;   }  /* 96px - 操作 */
```

### 3.2 完整 HTML 结构

```html
<div class="professor-comparison">
  <!-- 表格标题 -->
  <div class="table-header">
    <h2>Compare Professors Teaching This Course</h2>
    <p class="subtitle">Computer Science I (COMP 1012)</p>
  </div>
  
  <!-- 表格 -->
  <table class="comparison-table">
    <thead>
      <tr>
        <th class="col-professor">Professor</th>
        <th class="col-rating sortable" data-sort="rating">
          <button>
            Rating ⭐
            <span class="sort-icon">↕</span>
          </button>
        </th>
        <th class="col-difficulty sortable" data-sort="difficulty">
          <button>
            Difficulty 📊
            <span class="sort-icon">↕</span>
          </button>
        </th>
        <th class="col-reviews sortable" data-sort="reviewCount">
          <button>
            Reviews ✍️
            <span class="sort-icon">↕</span>
          </button>
        </th>
        <th class="col-highlights">Top Tags</th>
        <th class="col-actions"></th>
      </tr>
    </thead>
    
    <tbody>
      <!-- 行 1: 高评分教授（绿色高亮）-->
      <tr class="professor-row highlight-best">
        <td class="professor-cell">
          <img src="/avatars/sarah-j.jpg" alt="" class="avatar" />
          <div class="info">
            <strong class="name">Dr. Sarah Johnson</strong>
            <span class="department">Computer Science</span>
          </div>
        </td>
        
        <td class="rating-cell">
          <div class="rating-badge rating-high">
            <span class="icon">⭐</span>
            <span class="value">4.5</span>
          </div>
        </td>
        
        <td class="difficulty-cell">
          <div class="difficulty-badge difficulty-easy">
            <span class="dot"></span>
            <span class="text">Easy</span>
          </div>
        </td>
        
        <td class="review-count">
          <span class="value">24</span>
          <span class="label">reviews</span>
        </td>
        
        <td class="highlights">
          <div class="tags">
            <span class="tag tag-positive">Clear explanations</span>
            <span class="tag tag-positive">Helpful</span>
            <span class="tag">Fair grading</span>
          </div>
        </td>
        
        <td class="actions">
          <a href="/professors/sarah-johnson?course=comp-1012" 
             class="view-reviews-btn">
            View →
          </a>
        </td>
      </tr>
      
      <!-- 更多行... -->
    </tbody>
  </table>
</div>
```

### 3.3 完整 CSS 规范

```css
/* ====================
   容器
   ==================== */

.professor-comparison {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

/* ====================
   表格标题
   ==================== */

.table-header {
  padding: 24px;
  border-bottom: 1px solid #E5E7EB;
}

.table-header h2 {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
  color: #111827;
  margin: 0 0 4px 0;
}

.table-header .subtitle {
  font-size: 14px;
  color: #6B7280;
  margin: 0;
}

/* ====================
   表格
   ==================== */

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

/* ====================
   表头
   ==================== */

thead {
  background: #F9FAFB;
  border-bottom: 2px solid #E5E7EB;
}

th {
  padding: 12px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.5;
}

/* 可排序的列标题 */
th.sortable button {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
  transition: color 0.2s;
}

th.sortable button:hover {
  color: #3B82F6;
}

.sort-icon {
  font-size: 10px;
  color: #9CA3AF;
}

th.sortable.active .sort-icon {
  color: #3B82F6;
}

/* ====================
   表格行
   ==================== */

tbody tr {
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;
}

tbody tr:hover {
  background: #F9FAFB;
  cursor: pointer;
}

/* 高亮最佳教授（可选）*/
tbody tr.highlight-best {
  background: #ECFDF5;  /* 极浅绿 */
}

tbody tr.highlight-best:hover {
  background: #D1FAE5;  /* 浅绿 */
}

td {
  padding: 16px;
  vertical-align: middle;
}

/* ====================
   教授单元格
   ==================== */

.professor-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.professor-cell .avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #F3F4F6;
}

.professor-cell .info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.professor-cell .name {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.375;
  color: #111827;
}

.professor-cell .department {
  font-size: 13px;
  line-height: 1.375;
  color: #6B7280;
}

/* ====================
   评分单元格
   ==================== */

.rating-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.rating-badge .icon {
  font-size: 16px;
}

/* 评分颜色（同 CourseCard）*/
.rating-high {
  background: #D1FAE5;
  color: #047857;
}

.rating-good {
  background: #DBEAFE;
  color: #1D4ED8;
}

.rating-medium {
  background: #FEF3C7;
  color: #B45309;
}

.rating-low {
  background: #F3F4F6;
  color: #6B7280;
}

/* ====================
   难度单元格
   ==================== */

.difficulty-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
}

.difficulty-badge .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

/* Easy: 绿色 */
.difficulty-easy {
  color: #059669;
}

.difficulty-easy .dot {
  background: #10B981;
}

/* Medium: 黄色 */
.difficulty-medium {
  color: #D97706;
}

.difficulty-medium .dot {
  background: #F59E0B;
}

/* Hard: 红色 */
.difficulty-hard {
  color: #DC2626;
}

.difficulty-hard .dot {
  background: #EF4444;
}

/* ====================
   评价数单元格
   ==================== */

.review-count {
  font-size: 14px;
  line-height: 1.5;
}

.review-count .value {
  font-weight: 600;
  color: #111827;
}

.review-count .label {
  color: #9CA3AF;
  margin-left: 4px;
}

/* ====================
   标签单元格
   ==================== */

.highlights .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  display: inline-block;
  padding: 4px 10px;
  background: #F3F4F6;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.375;
  color: #4B5563;
  white-space: nowrap;
}

.tag-positive {
  background: #D1FAE5;
  color: #065F46;
}

.tag-negative {
  background: #FEE2E2;
  color: #991B1B;
}

/* ====================
   操作单元格
   ==================== */

.view-reviews-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: #3B82F6;
  color: #FFFFFF;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s;
}

.view-reviews-btn:hover {
  background: #2563EB;
}

.view-reviews-btn:active {
  background: #1D4ED8;
}

/* ====================
   响应式设计（平板）
   ==================== */

@media (max-width: 1279px) {
  /* 减小列宽 */
  .col-professor {   width: 32%;  }
  .col-rating {      width: 13%;  }
  .col-difficulty {  width: 13%;  }
  .col-reviews {     width: 11%;  }
  .col-highlights {  width: 23%;  }
  .col-actions {     width: 8%;   }
}
```

### 3.4 移动端卡片设计

#### 移动端 HTML 结构

```html
<!-- 移动端 (<768px) 转换为卡片 -->
<div class="professor-comparison mobile">
  <div class="professor-card">
    <!-- 头部：头像 + 姓名 + 评分 -->
    <div class="card-header">
      <img src="/avatars/sarah-j.jpg" alt="" class="avatar" />
      <div class="info">
        <strong class="name">Dr. Sarah Johnson</strong>
        <div class="rating">
          <span class="icon">⭐</span>
          <span class="value">4.5</span>
          <span class="count">(24 reviews)</span>
        </div>
      </div>
    </div>
    
    <!-- 主体：难度 + 标签 -->
    <div class="card-body">
      <div class="meta-item">
        <span class="label">Difficulty:</span>
        <div class="difficulty-badge difficulty-easy">
          <span class="dot"></span>
          <span class="text">Easy</span>
        </div>
      </div>
      
      <div class="meta-item">
        <span class="label">Top Tags:</span>
        <div class="tags">
          <span class="tag">Clear explanations</span>
          <span class="tag">Helpful</span>
        </div>
      </div>
    </div>
    
    <!-- 底部：CTA -->
    <div class="card-footer">
      <a href="/professors/sarah-johnson?course=comp-1012" 
         class="view-reviews-btn">
        View Reviews →
      </a>
    </div>
  </div>
  
  <!-- 更多卡片... -->
</div>
```

#### 移动端 CSS

```css
/* ====================
   移动端卡片布局
   ==================== */

@media (max-width: 767px) {
  /* 隐藏桌面表格 */
  .professor-comparison:not(.mobile) {
    display: none;
  }
  
  /* 显示卡片布局 */
  .professor-comparison.mobile {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
  
  .professor-card {
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  /* 卡片头部 */
  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .card-header .avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .card-header .info {
    flex: 1;
  }
  
  .card-header .name {
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 4px;
  }
  
  .card-header .rating {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: #6B7280;
  }
  
  .card-header .value {
    font-weight: 600;
    color: #111827;
  }
  
  /* 卡片主体 */
  .card-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid #F3F4F6;
  }
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  
  .meta-item .label {
    color: #6B7280;
    min-width: 80px;
  }
  
  /* 卡片底部 */
  .card-footer {
    padding-top: 12px;
    border-top: 1px solid #F3F4F6;
  }
  
  .card-footer .view-reviews-btn {
    width: 100%;
    justify-content: center;
  }
}
```

---

## Part 4: CourseInfoCard 规范

### 4.1 布局设计

```
┌──────────────────────────────────────────────────────┐
│                                                      │ ← 32px padding
│ COMP 1012                                            │ ← 32px bold
│ Computer Science I                                   │ ← 20px medium
│                                                      │
│ 🏛️ University of Adelaide · 💼 School of CS         │ ← 14px meta
│ 📚 3 credit hours · 📅 Semester 1 & 2               │
│                                                      │
│ ⭐ 4.2 average rating (45 reviews)                   │ ← 16px stats
│                                                      │
│ 📝 Course Description:                               │ ← 14px label
│ Introduction to computer programming using a         │ ← 15px body
│ high-level language. Topics include variables,       │
│ control structures, functions, arrays, and basic     │
│ algorithms.                                          │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### 4.2 完整 HTML 结构

```html
<div class="course-info-card">
  <!-- 左侧：课程信息 -->
  <div class="course-main">
    <h1 class="course-code">COMP 1012</h1>
    <p class="course-name">Computer Science I</p>
    
    <!-- 元数据行 1 -->
    <div class="course-meta">
      <span class="meta-item">
        <span class="icon">🏛️</span>
        University of Adelaide
      </span>
      <span class="separator">·</span>
      <span class="meta-item">
        <span class="icon">💼</span>
        School of Computer Science
      </span>
    </div>
    
    <!-- 元数据行 2 -->
    <div class="course-meta">
      <span class="meta-item">
        <span class="icon">📚</span>
        3 credit hours
      </span>
      <span class="separator">·</span>
      <span class="meta-item">
        <span class="icon">📅</span>
        Semester 1 & 2
      </span>
    </div>
    
    <!-- 评分统计 -->
    <div class="course-rating">
      <span class="icon">⭐</span>
      <strong class="value">4.2</strong>
      <span class="label">average rating</span>
      <span class="count">(45 reviews)</span>
    </div>
    
    <!-- 课程描述 -->
    <div class="course-description">
      <h3 class="label">📝 Course Description:</h3>
      <p class="text">
        Introduction to computer programming using a high-level language. 
        Topics include variables, control structures, functions, arrays, 
        and basic algorithms.
      </p>
    </div>
  </div>
  
  <!-- 右侧：统计卡片（可选）-->
  <div class="course-stats-panel">
    <div class="stat-card primary">
      <div class="value">⭐ 4.2</div>
      <div class="label">Average Rating</div>
    </div>
    
    <div class="stat-card">
      <div class="value">👥 3</div>
      <div class="label">Professors</div>
    </div>
    
    <div class="stat-card">
      <div class="value">✍️ 45</div>
      <div class="label">Reviews</div>
    </div>
  </div>
</div>
```

### 4.3 完整 CSS 规范

```css
/* ====================
   CourseInfoCard 容器
   ==================== */

.course-info-card {
  display: flex;
  gap: 32px;
  padding: 32px;
  background: linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%);
  border: 2px solid #3B82F6;
  border-radius: 16px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

/* ====================
   左侧：课程信息
   ==================== */

.course-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.course-code {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.25;
  color: #111827;
  margin: 0;
  letter-spacing: -0.02em;
}

.course-name {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.375;
  color: #374151;
  margin: 0;
}

/* ====================
   元数据
   ==================== */

.course-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
}

.course-meta .meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.course-meta .separator {
  color: #D1D5DB;
}

/* ====================
   评分统计
   ==================== */

.course-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  margin-top: 8px;
}

.course-rating .icon {
  font-size: 20px;
}

.course-rating .value {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.course-rating .label {
  color: #6B7280;
}

.course-rating .count {
  color: #9CA3AF;
}

/* ====================
   课程描述
   ==================== */

.course-description {
  margin-top: 12px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
}

.course-description .label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
}

.course-description .text {
  font-size: 15px;
  line-height: 1.625;
  color: #6B7280;
  margin: 0;
}

/* ====================
   右侧：统计卡片
   ==================== */

.course-stats-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 160px;
}

.stat-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-card.primary {
  background: #3B82F6;
  color: #FFFFFF;
  border: none;
}

.stat-card .value {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 4px;
}

.stat-card .label {
  font-size: 12px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-card.primary .label {
  color: rgba(255, 255, 255, 0.9);
}

/* ====================
   响应式调整
   ==================== */

@media (max-width: 1023px) {
  .course-info-card {
    flex-direction: column;
  }
  
  .course-stats-panel {
    flex-direction: row;
    min-width: auto;
  }
  
  .stat-card {
    flex: 1;
  }
}

@media (max-width: 767px) {
  .course-info-card {
    padding: 24px;
  }
  
  .course-code {
    font-size: 28px;
  }
  
  .course-name {
    font-size: 18px;
  }
  
  .course-stats-panel {
    flex-direction: column;
  }
}
```

---

## Part 5: 搜索框调整

### 5.1 Placeholder 修改

```html
<!-- ❌ 旧版（教授优先）-->
<input 
  type="search" 
  placeholder="Search by professor name, course code, or university..."
/>

<!-- ✅ 新版（课程优先）-->
<input 
  type="search" 
  placeholder="Search courses (e.g., COMP 1012, Data Structures, Calculus)..."
/>
```

### 5.2 搜索框样式规范

```css
/* ====================
   搜索框容器
   ==================== */

.search-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

/* ====================
   搜索输入框
   ==================== */

.search-input {
  /* 尺寸 */
  width: 100%;
  height: 56px;
  padding: 16px 24px 16px 56px;  /* 左侧留空给图标 */
  
  /* 视觉 */
  background: #FFFFFF;
  border: 2px solid #E5E7EB;
  border-radius: 28px;  /* 完全圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  /* 文字 */
  font-size: 16px;
  font-weight: 400;
  color: #111827;
  line-height: 1.5;
  
  /* 交互 */
  transition: all 0.2s;
}

/* Placeholder 样式 */
.search-input::placeholder {
  color: #9CA3AF;
}

/* Focus 状态 */
.search-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* ====================
   搜索图标
   ==================== */

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9CA3AF;
  pointer-events: none;
}

.search-input:focus + .search-icon {
  color: #3B82F6;
}

/* ====================
   清除按钮
   ==================== */

.search-clear {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  padding: 0;
  background: #E5E7EB;
  border: none;
  border-radius: 50%;
  color: #6B7280;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.search-input:not(:placeholder-shown) + .search-icon + .search-clear {
  opacity: 1;
}

.search-clear:hover {
  background: #D1D5DB;
}
```

### 5.3 自动补全 UI

#### HTML 结构

```html
<div class="search-autocomplete">
  <!-- 课程分组 -->
  <div class="autocomplete-section">
    <div class="section-header">
      <span class="icon">🔍</span>
      <span class="title">Courses</span>
    </div>
    
    <a href="/courses/adelaide-comp-1012" class="autocomplete-item">
      <div class="item-main">
        <strong class="code">COMP 1012</strong>
        <span class="separator">-</span>
        <span class="name">Computer Science I</span>
      </div>
      <div class="item-meta">
        University of Adelaide · 3 professors
      </div>
    </a>
    
    <a href="/courses/adelaide-comp-2003" class="autocomplete-item">
      <div class="item-main">
        <strong class="code">COMP 2003</strong>
        <span class="separator">-</span>
        <span class="name">Data Structures</span>
      </div>
      <div class="item-meta">
        University of Adelaide · 2 professors
      </div>
    </a>
    
    <!-- 更多课程... -->
  </div>
  
  <!-- 教授分组（次要）-->
  <div class="autocomplete-section secondary">
    <div class="section-header">
      <span class="icon">👤</span>
      <span class="title">Professors</span>
    </div>
    
    <a href="/professors/sarah-johnson" class="autocomplete-item">
      <div class="item-main">
        <img src="/avatars/sarah-j.jpg" class="avatar" />
        <strong class="name">Dr. Sarah Johnson</strong>
      </div>
      <div class="item-meta">
        Teaching 3 courses
      </div>
    </a>
  </div>
  
  <!-- 查看所有结果 -->
  <div class="autocomplete-footer">
    <a href="/search?q=comp" class="view-all-btn">
      View all results for "comp" →
    </a>
  </div>
</div>
```

#### CSS 规范

```css
/* ====================
   自动补全容器
   ==================== */

.search-autocomplete {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  max-height: 480px;
  overflow-y: auto;
  z-index: 1000;
}

/* ====================
   分组
   ==================== */

.autocomplete-section {
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
}

.autocomplete-section:last-child {
  border-bottom: none;
}

/* 次要分组（教授）*/
.autocomplete-section.secondary {
  opacity: 0.9;
}

/* ====================
   分组标题
   ==================== */

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-header .icon {
  font-size: 14px;
}

/* ====================
   自动补全项
   ==================== */

.autocomplete-item {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: background 0.15s;
}

.autocomplete-item:hover {
  background: #F9FAFB;
}

/* 选中状态（键盘导航）*/
.autocomplete-item.active {
  background: #EFF6FF;
}

/* ====================
   项目主内容
   ==================== */

.item-main {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  line-height: 1.375;
  margin-bottom: 4px;
}

.item-main .code {
  font-weight: 700;
  color: #111827;
}

.item-main .separator {
  color: #D1D5DB;
}

.item-main .name {
  color: #374151;
}

/* 教授头像 */
.item-main .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 4px;
}

/* ====================
   项目元数据
   ==================== */

.item-meta {
  font-size: 13px;
  color: #9CA3AF;
  line-height: 1.375;
}

/* ====================
   底部
   ==================== */

.autocomplete-footer {
  padding: 12px 16px;
  border-top: 1px solid #F3F4F6;
}

.view-all-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 16px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #3B82F6;
  text-decoration: none;
  transition: background 0.2s;
}

.view-all-btn:hover {
  background: #EFF6FF;
}

/* ====================
   高亮匹配文本
   ==================== */

.highlight {
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  padding: 0 2px;
  border-radius: 2px;
}

/* ====================
   滚动条美化
   ==================== */

.search-autocomplete::-webkit-scrollbar {
  width: 8px;
}

.search-autocomplete::-webkit-scrollbar-track {
  background: #F9FAFB;
}

.search-autocomplete::-webkit-scrollbar-thumb {
  background: #D1D5DB;
  border-radius: 4px;
}

.search-autocomplete::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}
```

### 5.4 结果分组显示优先级

```typescript
// 自动补全结果优先级
interface AutocompleteResults {
  courses: Course[];      // 最多显示 5 个
  professors: Professor[]; // 最多显示 3 个（仅当输入可能是教授名时）
  departments: Department[]; // 最多显示 2 个
}

// 显示规则
function getAutocompleteResults(query: string): AutocompleteResults {
  // 1. 优先课程代码精确匹配
  if (/^[A-Z]{4}\s?\d{4}$/i.test(query)) {
    return {
      courses: getCoursesByCode(query, 5),
      professors: [],
      departments: []
    };
  }
  
  // 2. 课程名称模糊匹配
  const courses = getCoursesByName(query, 5);
  
  // 3. 教授名称匹配（仅当课程结果 < 3 时显示）
  const professors = courses.length < 3 
    ? getProfessorsByName(query, 3) 
    : [];
  
  // 4. 学院匹配（仅当总结果 < 5 时显示）
  const departments = (courses.length + professors.length) < 5
    ? getDepartmentsByName(query, 2)
    : [];
  
  return { courses, professors, departments };
}
```

---

## Part 6: 右侧栏调整

### 6.1 Trending Courses 模块

#### HTML 结构

```html
<aside class="sidebar">
  <!-- 模块 1: Trending Courses -->
  <section class="sidebar-section trending-courses">
    <div class="section-header">
      <h3 class="title">
        <span class="icon">🔥</span>
        Trending Courses
      </h3>
      <p class="subtitle">Most reviewed this week</p>
    </div>
    
    <ul class="trending-list">
      <li class="trending-item">
        <div class="rank">1</div>
        <div class="course-info">
          <strong class="code">COMP 1012</strong>
          <span class="name">Computer Science I</span>
          <div class="stats">
            <span class="rating">⭐ 4.5</span>
            <span class="separator">·</span>
            <span class="reviews">24 reviews</span>
          </div>
        </div>
      </li>
      
      <li class="trending-item">
        <div class="rank">2</div>
        <div class="course-info">
          <strong class="code">MATH 1014</strong>
          <span class="name">Calculus I</span>
          <div class="stats">
            <span class="rating">⭐ 4.2</span>
            <span class="separator">·</span>
            <span class="reviews">18 reviews</span>
          </div>
        </div>
      </li>
      
      <li class="trending-item">
        <div class="rank">3</div>
        <div class="course-info">
          <strong class="code">PHYS 1100</strong>
          <span class="name">Physics I</span>
          <div class="stats">
            <span class="rating">⭐ 4.0</span>
            <span class="separator">·</span>
            <span class="reviews">15 reviews</span>
          </div>
        </div>
      </li>
    </ul>
    
    <a href="/courses/trending" class="see-more-btn">
      See More →
    </a>
  </section>
  
  <!-- 更多模块... -->
</aside>
```

#### CSS 规范

```css
/* ====================
   Sidebar 容器
   ==================== */

.sidebar {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ====================
   Sidebar Section
   ==================== */

.sidebar-section {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* ====================
   Section Header
   ==================== */

.section-header {
  margin-bottom: 16px;
}

.section-header .title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}

.section-header .icon {
  font-size: 18px;
}

.section-header .subtitle {
  font-size: 13px;
  color: #6B7280;
  margin: 0;
}

/* ====================
   Trending List
   ==================== */

.trending-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.trending-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.15s;
  cursor: pointer;
}

.trending-item:hover {
  background: #F9FAFB;
}

/* ====================
   Rank 排名
   ==================== */

.trending-item .rank {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #EFF6FF;
  color: #3B82F6;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
}

/* Top 1 特殊样式 */
.trending-item:nth-child(1) .rank {
  background: linear-gradient(135deg, #FBBF24, #F59E0B);
  color: #FFFFFF;
}

/* ====================
   Course Info
   ==================== */

.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.course-info .code {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  line-height: 1.375;
}

.course-info .name {
  font-size: 13px;
  color: #6B7280;
  line-height: 1.375;
}

.course-info .stats {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
}

.course-info .stats .rating {
  color: #111827;
  font-weight: 600;
}

.course-info .stats .separator {
  color: #D1D5DB;
}

/* ====================
   See More Button
   ==================== */

.see-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 12px;
  padding: 10px 16px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #3B82F6;
  text-decoration: none;
  transition: background 0.2s;
}

.see-more-btn:hover {
  background: #EFF6FF;
}
```

### 6.2 Browse by Department 模块

#### HTML 结构

```html
<section class="sidebar-section departments">
  <div class="section-header">
    <h3 class="title">
      <span class="icon">📚</span>
      Browse by Department
    </h3>
  </div>
  
  <ul class="department-list">
    <li class="department-item">
      <a href="/departments/computer-science">
        <span class="icon">💻</span>
        <span class="name">Computer Science</span>
        <span class="count">127</span>
      </a>
    </li>
    
    <li class="department-item">
      <a href="/departments/mathematics">
        <span class="icon">🔢</span>
        <span class="name">Mathematics</span>
        <span class="count">98</span>
      </a>
    </li>
    
    <li class="department-item">
      <a href="/departments/physics">
        <span class="icon">⚛️</span>
        <span class="name">Physics</span>
        <span class="count">76</span>
      </a>
    </li>
    
    <li class="department-item">
      <a href="/departments/business">
        <span class="icon">💼</span>
        <span class="name">Business</span>
        <span class="count">143</span>
      </a>
    </li>
  </ul>
  
  <a href="/departments" class="see-more-btn">
    View All Departments →
  </a>
</section>
```

#### CSS 规范

```css
/* ====================
   Department List
   ==================== */

.department-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.department-item a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: background 0.15s;
}

.department-item a:hover {
  background: #F9FAFB;
}

.department-item .icon {
  font-size: 18px;
  flex-shrink: 0;
}

.department-item .name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.department-item .count {
  font-size: 12px;
  font-weight: 600;
  color: #9CA3AF;
  padding: 2px 8px;
  background: #F3F4F6;
  border-radius: 12px;
}

.department-item a:hover .name {
  color: #3B82F6;
}

.department-item a:hover .count {
  background: #EFF6FF;
  color: #3B82F6;
}
```

### 6.3 Quick Stats 模块

#### HTML 结构

```html
<section class="sidebar-section quick-stats">
  <div class="section-header">
    <h3 class="title">
      <span class="icon">📊</span>
      Platform Stats
    </h3>
  </div>
  
  <div class="stats-grid">
    <div class="stat-item">
      <div class="value">1,247</div>
      <div class="label">Courses</div>
    </div>
    
    <div class="stat-item">
      <div class="value">3,891</div>
      <div class="label">Professors</div>
    </div>
    
    <div class="stat-item">
      <div class="value">12,456</div>
      <div class="label">Reviews</div>
    </div>
    
    <div class="stat-item">
      <div class="value">8</div>
      <div class="label">Universities</div>
    </div>
  </div>
</section>
```

#### CSS 规范

```css
/* ====================
   Stats Grid
   ==================== */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-item {
  text-align: center;
  padding: 16px 12px;
  background: #F9FAFB;
  border-radius: 8px;
}

.stat-item .value {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  line-height: 1.25;
  margin-bottom: 4px;
}

.stat-item .label {
  font-size: 12px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## Part 7: 响应式设计

### 7.1 桌面端（≥1280px）

```css
/* ====================
   三栏布局
   ==================== */

.page-layout {
  display: flex;
  gap: 32px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px;
}

/* 左侧导航 */
.sidebar-nav {
  width: 240px;
  flex-shrink: 0;
}

/* 中间主内容 */
.main-content {
  flex: 1;
  min-width: 0;  /* 防止溢出 */
}

/* 右侧栏 */
.sidebar-right {
  width: 280px;
  flex-shrink: 0;
}

/* ====================
   课程卡片网格
   ==================== */

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
```

### 7.2 平板端（768-1279px）

```css
@media (max-width: 1279px) {
  /* ====================
     两栏布局（隐藏右侧栏）
     ==================== */
  
  .page-layout {
    gap: 24px;
    padding: 24px;
  }
  
  /* 左侧导航可折叠 */
  .sidebar-nav {
    width: 80px;  /* 仅图标模式 */
  }
  
  .sidebar-nav .label {
    display: none;
  }
  
  /* 右侧栏移到底部或隐藏 */
  .sidebar-right {
    display: none;
  }
  
  /* ====================
     课程卡片网格
     ==================== */
  
  .course-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }
  
  /* ====================
     教授对比表调整
     ==================== */
  
  .comparison-table {
    font-size: 13px;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 12px;
  }
  
  .professor-cell .avatar {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 1023px) {
  /* 左侧导航完全隐藏，改为顶部汉堡菜单 */
  .sidebar-nav {
    position: fixed;
    left: -100%;
    top: 0;
    bottom: 0;
    width: 240px;
    background: #FFFFFF;
    z-index: 1000;
    transition: left 0.3s;
  }
  
  .sidebar-nav.open {
    left: 0;
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.15);
  }
  
  /* 显示汉堡菜单按钮 */
  .menu-toggle {
    display: block;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1001;
  }
}
```

### 7.3 移动端（<768px）

```css
@media (max-width: 767px) {
  /* ====================
     单栏布局
     ==================== */
  
  .page-layout {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
  
  /* ====================
     课程卡片网格 → 列表
     ==================== */
  
  .course-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  /* ====================
     CourseCard 移动端调整
     ==================== */
  
  .course-card {
    padding: 16px;
    min-height: 180px;
  }
  
  .course-code {
    font-size: 20px;
  }
  
  .course-name {
    font-size: 15px;
  }
  
  .course-stats {
    flex-direction: column;
    gap: 8px;
  }
  
  /* ====================
     教授对比表 → 卡片
     ==================== */
  
  .comparison-table {
    display: none;
  }
  
  .professor-cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  /* ====================
     CourseInfoCard 移动端
     ==================== */
  
  .course-info-card {
    padding: 20px;
    flex-direction: column;
  }
  
  .course-code {
    font-size: 24px;
  }
  
  .course-name {
    font-size: 18px;
  }
  
  .course-stats-panel {
    flex-direction: column;
    gap: 12px;
  }
  
  /* ====================
     搜索框移动端
     ==================== */
  
  .search-input {
    height: 48px;
    font-size: 16px;  /* 防止 iOS 放大 */
    padding: 12px 20px 12px 48px;
  }
  
  /* ====================
     右侧栏移到底部
     ==================== */
  
  .sidebar-right {
    display: block;
    width: 100%;
    margin-top: 24px;
  }
  
  .sidebar-section {
    margin-bottom: 16px;
  }
  
  /* ====================
     底部导航（可选）
     ==================== */
  
  .mobile-bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: #FFFFFF;
    border-top: 1px solid #E5E7EB;
    display: flex;
    justify-content: space-around;
    padding: 8px 0;
    z-index: 100;
  }
  
  .mobile-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: #6B7280;
    text-decoration: none;
  }
  
  .mobile-nav-item.active {
    color: #3B82F6;
  }
  
  .mobile-nav-item .icon {
    font-size: 24px;
  }
}
```

### 7.4 响应式断点总结

| 断点 | 屏幕宽度 | 布局 | 课程卡片 | 教授对比 |
|------|---------|------|---------|---------|
| **桌面** | ≥1280px | 三栏（Nav + Main + Sidebar）| 网格 2-3 列 | 完整表格 |
| **平板** | 768-1279px | 两栏（Nav + Main）| 网格 2 列 | 简化表格 |
| **大手机** | 480-767px | 单栏 | 列表 | 卡片堆叠 |
| **小手机** | <480px | 单栏 | 列表 | 卡片堆叠 |

---

## Part 8: 附录

### 8.1 完整颜色变量表

```css
:root {
  /* Primary Blue */
  --blue-900: #1E3A8A;
  --blue-700: #1D4ED8;
  --blue-600: #2563EB;
  --blue-500: #3B82F6;
  --blue-400: #60A5FA;
  --blue-100: #DBEAFE;
  --blue-50:  #EFF6FF;
  
  /* Semantic Green */
  --green-700: #047857;
  --green-600: #059669;
  --green-100: #D1FAE5;
  
  /* Semantic Yellow */
  --yellow-700: #B45309;
  --yellow-600: #D97706;
  --yellow-100: #FEF3C7;
  
  /* Semantic Red */
  --red-700: #B91C1C;
  --red-600: #DC2626;
  --red-100: #FEE2E2;
  
  /* Neutral Gray */
  --gray-950: #030712;
  --gray-900: #111827;
  --gray-700: #374151;
  --gray-600: #4B5563;
  --gray-500: #6B7280;
  --gray-300: #D1D5DB;
  --gray-100: #F3F4F6;
  --gray-50:  #F9FAFB;
  --white:    #FFFFFF;
}
```

### 8.2 完整间距变量表

```css
:root {
  /* Spacing */
  --spacing-1:  8px;
  --spacing-2:  16px;
  --spacing-3:  24px;
  --spacing-4:  32px;
  --spacing-5:  40px;
  --spacing-6:  48px;
  --spacing-8:  64px;
  --spacing-10: 80px;
  --spacing-12: 96px;
  
  /* Radius */
  --radius-sm:   4px;
  --radius-base: 8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;
  
  /* Shadow */
  --shadow-sm:   0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md:   0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg:   0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl:   0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-2xl:  0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

### 8.3 Figma 设计文件结构

```
OhMyProfessors-UI-Design.fig
├── 🎨 Design System
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Shadows
│   └── Components
│
├── 📱 Components
│   ├── CourseCard
│   ├── ProfessorComparisonTable
│   ├── CourseInfoCard
│   ├── SearchBar
│   └─�� Sidebar Modules
│
├── 🖥️ Pages - Desktop
│   ├── Homepage
│   ├── Course Detail
│   ├── Search Results
│   └── Professor Profile
│
└── 📱 Pages - Mobile
    ├── Homepage
    ├── Course Detail
    └── Search
```

---

## 实施清单

### Phase 1: 核心组件开发
- [ ] 设置设计系统变量（颜色、字体、间距）
- [ ] 开发 CourseCard 组件
- [ ] 开发 ProfessorComparisonTable 组件
- [ ] 开发 CourseInfoCard 组件
- [ ] 开发搜索框 + 自动补全

### Phase 2: 页面重构
- [ ] 首页课程卡片网格
- [ ] 课程详情页
- [ ] 搜索结果页
- [ ] 右侧栏模块

### Phase 3: 响应式实现
- [ ] 平板端布局调整
- [ ] 移动端卡片设计
- [ ] 触摸交互优化

### Phase 4: 测试与优化
- [ ] 跨浏览器测试（Chrome, Safari, Firefox）
- [ ] 无障碍测试（WCAG 2.1 AA）
- [ ] 性能优化（Lighthouse 90+ 分）
- [ ] 用户测试与迭代

---

**文档版本:** 1.0  
**最后更新:** 2026-02-11  
**维护者:** UI Design Team

**相关文档：**
- [Course-First UX Design](../product/course-first-ux-design.md)
- [Technical Implementation Guide](../dev/course-first-implementation.md)
