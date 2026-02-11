# Course-First UX Design
## OhMyProfessors 课程优先重构方案

**设计总监:** Product Design (Don Norman 思维模型)  
**日期:** 2026-02-11  
**版本:** 1.0  
**状态:** ✅ Design Complete

---

## Executive Summary

本文档基于 Don Norman 的用户中心设计原则，为 OhMyProfessors 提供课程优先（Course-First）的完整 UX 重构方案。核心目标：**让用户在 3 秒内理解"我可以找到每门课最好的教授"**。

### 设计哲学

> "好的设计是看不见的。用户应该专注于他们的目标（选课），而不是我们的界面。"  
> — Don Norman, *The Design of Everyday Things*

**核心原则：**
1. **可见性（Visibility）**: 课程是第一视觉焦点，教授是次级信息
2. **反馈（Feedback）**: 每个操作都有明确的视觉反馈
3. **映射（Mapping）**: 课程→教授→评价的自然心智模型
4. **约束（Constraints）**: 引导用户沿着正确的路径（课程优先）
5. **一致性（Consistency）**: 整个系统使用统一的信息层级

---

## Part 1: 核心设计原则

### 1.1 课程优先的认知模型

#### 当前（教授优先）的心智模型
```
用户思维: "我想找一个好教授" 
问题: ❌ 用户不知道该找谁
     ❌ 浏览无目的
     ❌ 最终可能选了不相关的课程
```

#### 课程优先的心智模型
```
用户思维: "我要上 COMP 1012，哪个教授最好？"
优势: ✅ 目标明确
     ✅ 可比较（同一课程的不同教授）
     ✅ 决策有意义（真的会选这门课）
```

**设计含义：**
- 首页 = 课程目录，不是教授名人堂
- 搜索框 = 课程搜索，不是教授搜索
- 评价 = 基于课程的教学质量，不是教授人品

### 1.2 信息层级设计（视觉优先级）

**三层信息架构：**

```
Level 1 (Primary): 课程
├─ 课程代码（COMP 1012）
├─ 课程名称（Computer Science I）
└─ 大学名称

Level 2 (Secondary): 教授统计
├─ 教授数量
├─ 平均评分
└─ 评价总数

Level 3 (Tertiary): 行动召唤
└─ Compare Professors CTA
```

**视觉实现：**
- Level 1: 24-32px 字体，粗体，高对比度
- Level 2: 14-16px 字体，中等权重，图标辅助
- Level 3: 按钮形式，次要色彩

### 1.3 用户路径优化

#### 主路径（Happy Path）
```
1. 到达首页
   ↓
2. 看到课程卡片列表 (立即理解"这是课程搜索平台")
   ↓
3. 搜索或浏览课程 (输入 "COMP 1012" 或点击 Trending Courses)
   ↓
4. 点击课程卡片
   ↓
5. 查看教授对比表 (并排比较所有教授)
   ↓
6. 点击某个教授
   ↓
7. 阅读该教授的详细评价
   ↓
8. 决策 & 离开 (或写评价)
```

**每一步的设计目标：**
- Step 1-2: **3 秒内**建立"课程优先"认知
- Step 3: 零摩擦搜索（自动补全、容错输入）
- Step 4: 即时导航（无加载延迟感）
- Step 5: 一眼对比（表格设计，而非卡片堆叠）
- Step 6-7: 深度阅读（评价质量 > 数量）
- Step 8: 低压力离开（不强制注册）

#### 次要路径
```
探索路径: 首页 → Browse by Department → 点击学院 → 课程列表
发现路径: 首页 → Trending Courses → 点击课程
搜索路径: 任何页面 → 全局搜索框 → 搜索结果页
```

---

## Part 2: 首页重新设计

### 2.1 Hero Section 调整

#### 当前问题
```html
<!-- ❌ 教授优先 -->
<h1>Find Your Perfect Professor</h1>
<p>Browse reviews from students at top universities</p>
<input placeholder="Search by professor name..." />
```

**用户理解:** "这是教授搜索引擎"（错误心智模型）

#### 课程优先设计
```html
<!-- ✅ 课程优先 -->
<h1>Find the Best Professor for Every Course</h1>
<p>Real student reviews from Australia's top G8 universities</p>
<input placeholder="Search courses (e.g., COMP 1012, Data Structures, Calculus)..." />
```

**视觉规范：**
- H1 字号: 48px (桌面) / 32px (移动)
- 副标题: 18px, 70% 透明度
- 搜索框: 
  - 宽度: 600px (max-width 90vw)
  - 高度: 56px
  - 圆角: 28px (完全圆角)
  - 内边距: 20px 24px
  - 图标: 🔍 左侧，课程图标（📚）右侧作为视觉提示

**交互行为：**
```typescript
// 搜索框自动补全逻辑
onInput: (value) => {
  if (value.length < 2) return;
  
  // 优先匹配课程代码
  if (/^[A-Z]{4}\s?\d{4}$/i.test(value)) {
    showCourseCodeSuggestions(value);
  }
  // 其次匹配课程名称
  else if (value.length >= 3) {
    showCourseNameSuggestions(value);
  }
}

// 支持的搜索格式
Examples:
- "COMP 1012" → 精确匹配
- "comp1012" → 自动格式化为 "COMP 1012"
- "computer science" → 模糊匹配课程名称
- "data structures" → 跨课程搜索
```

### 2.2 课程卡片��表设计

#### 布局规范
```
桌面端 (>1024px):
┌─────────────────────────────────────────┐
│ [Nav] │ [Main Content]    │ [Sidebar]  │
│  240px│      560px        │   280px    │
└─────────────────────────────────────────┘

主内容区:
- 3 列卡片 (在超宽屏 >1400px)
- 2 列卡片 (标准宽度)
- 卡片间距: 16px
- 卡片宽度: 100% (flex-grow)
```

#### 默认显示内容
```
首页加载时显示:
1. Trending Courses (按评价数排序, Top 6)
2. Recently Reviewed Courses (最近有新评价, Top 6)
3. Top Rated Courses (按平均分排序, Top 6)

每个分组可展开 "See More"
```

### 2.3 右侧栏内容调整

#### 当前 (教授优先)
```
❌ Trending Professors
❌ Recent Reviews (教授头像)
❌ Top Rated Professors
```

#### 课程优先重构
```html
<!-- Sidebar Section 1: Trending Courses -->
<section class="trending-courses">
  <h3>🔥 Trending Courses</h3>
  <p class="subtitle">Most reviewed this week</p>
  
  <ul>
    <li>
      <span class="course-code">COMP 1012</span>
      <span class="stats">45 reviews</span>
    </li>
    <li>
      <span class="course-code">MATH 2201</span>
      <span class="stats">38 reviews</span>
    </li>
    <!-- ... -->
  </ul>
</section>

<!-- Sidebar Section 2: Browse by Department -->
<section class="departments">
  <h3>📚 Browse by Department</h3>
  
  <ul>
    <li>
      <a href="/departments/computer-science">
        💻 Computer Science
        <span class="count">127 courses</span>
      </a>
    </li>
    <li>
      <a href="/departments/mathematics">
        🔢 Mathematics
        <span class="count">98 courses</span>
      </a>
    </li>
    <!-- ... -->
  </ul>
</section>

<!-- Sidebar Section 3: Quick Stats -->
<section class="stats">
  <h3>📊 Platform Stats</h3>
  <div class="stat-grid">
    <div>
      <strong>1,247</strong>
      <span>Courses</span>
    </div>
    <div>
      <strong>3,891</strong>
      <span>Professors</span>
    </div>
    <div>
      <strong>12,456</strong>
      <span>Reviews</span>
    </div>
  </div>
</section>
```

**设计规范：**
- Section 间距: 24px
- Section 内边距: 20px
- 标题字号: 16px, 粗体
- Subtitle: 13px, 60% 透明度
- 列表项高度: 40px
- Hover 状态: 背景色 +5% 亮度

---

## Part 3: 课程详情页设计

### 3.1 页面布局

**URL 结构:**
```
/courses/[university]-[code]
例: /courses/adelaide-comp-1012
```

**页面结构:**
```
┌──────────────────────────────────────────────┐
│ 顶部面包屑导航                                  │
├──────────────────────────────────────────────┤
│ 课程信息卡片 (Hero)                            │
├──────────────────────────────────────────────┤
│ 筛选器栏 (学期、评分、难度)                      │
├──────────────────────────────────────────────┤
│ 教授对比表 (核心内容)                           │
├──────────────────────────────────────────────┤
│ 所有评价列表 (分页)                             │
└──────────────────────────────────────────────┘
```

### 3.2 顶部课程信息卡片

```tsx
// CourseHero.tsx
<div className="course-hero">
  {/* 左侧：课程信息 */}
  <div className="course-info">
    <h1>
      <span className="code">COMP 1012</span>
      <span className="name">Computer Science I</span>
    </h1>
    
    <div className="meta">
      <span>🏛️ University of Adelaide</span>
      <span>📚 Computer Science</span>
      <span>💳 3 Credits</span>
    </div>
    
    <p className="description">
      Introduction to computer programming using a high-level language.
      Topics include variables, control structures, functions, arrays, 
      and basic algorithms.
    </p>
  </div>
  
  {/* 右侧：统计数据 */}
  <div className="course-stats">
    <div className="stat-card primary">
      <div className="value">⭐ 4.2</div>
      <div className="label">Average Rating</div>
    </div>
    
    <div className="stat-card">
      <div className="value">👥 3</div>
      <div className="label">Professors</div>
    </div>
    
    <div className="stat-card">
      <div className="value">✍️ 45</div>
      <div className="label">Reviews</div>
    </div>
  </div>
</div>
```

**视觉规范：**
- 背景: 渐变色（从课程主色派生）
- 高度: 自适应 (min-height: 240px)
- 内边距: 40px
- 课程代码: 36px, 粗体
- 课程名称: 24px, 中等权重
- 统计卡片: 白色背景，圆角 12px，阴影

### 3.3 教授对比表

**设计目标：** 用户可以一眼比较所有教授的关键指标

#### 表格设计规范

```tsx
// ProfessorComparisonTable.tsx
<table className="professor-comparison">
  <thead>
    <tr>
      <th>Professor</th>
      <th>
        <button onClick={() => sortBy('rating')}>
          Rating ⭐
          {sortField === 'rating' && <SortIcon />}
        </button>
      </th>
      <th>
        <button onClick={() => sortBy('difficulty')}>
          Difficulty 📊
          {sortField === 'difficulty' && <SortIcon />}
        </button>
      </th>
      <th>
        <button onClick={() => sortBy('reviewCount')}>
          Reviews ✍️
          {sortField === 'reviewCount' && <SortIcon />}
        </button>
      </th>
      <th>Highlights</th>
      <th>Actions</th>
    </tr>
  </thead>
  
  <tbody>
    <tr className="professor-row">
      <td className="professor-cell">
        <img src="/avatars/sarah-j.jpg" alt="" />
        <div>
          <strong>Dr. Sarah Johnson</strong>
          <span className="dept">Computer Science</span>
        </div>
      </td>
      
      <td className="rating-cell">
        <div className="rating-badge high">
          <span className="value">4.5</span>
          <span className="stars">⭐⭐⭐⭐⭐</span>
        </div>
      </td>
      
      <td className="difficulty-cell">
        <div className="difficulty-badge easy">
          <span className="dot"></span>
          Easy
        </div>
      </td>
      
      <td className="review-count">
        24 reviews
      </td>
      
      <td className="highlights">
        <div className="tags">
          <span className="tag positive">Clear explanations</span>
          <span className="tag positive">Helpful</span>
          <span className="tag">Fair grading</span>
        </div>
      </td>
      
      <td className="actions">
        <a href="/professors/sarah-johnson?course=comp-1012">
          View Reviews →
        </a>
      </td>
    </tr>
    
    <!-- 更多教授行 -->
  </tbody>
</table>
```

**难度指示器设计：**
```
Easy:   🟢 绿色点 + "Easy"
Medium: 🟡 黄色点 + "Medium"
Hard:   🔴 红色点 + "Hard"
```

**评分徽章设计：**
```
4.5-5.0:  深绿色背景 (#059669)
4.0-4.4:  浅绿色背景 (#10b981)
3.5-3.9:  黄色背景 (#f59e0b)
3.0-3.4:  橙色背景 (#f97316)
<3.0:     红色背景 (#ef4444)
```

**响应式设计（移动端）：**
```
<1024px: 表格转换为卡片堆叠
每个教授一张卡片，包含所有信息
保留排序功能（顶部下拉菜单）
```

### 3.4 筛选器设计

```tsx
// CourseFilters.tsx
<div className="course-filters">
  <div className="filter-group">
    <label>学期</label>
    <select>
      <option value="">All Semesters</option>
      <option value="2025-s1">2025 Semester 1</option>
      <option value="2025-s2">2025 Semester 2</option>
      <option value="2024-s2">2024 Semester 2</option>
    </select>
  </div>
  
  <div className="filter-group">
    <label>最低评分</label>
    <select>
      <option value="">All Ratings</option>
      <option value="4.5">4.5+ ⭐</option>
      <option value="4.0">4.0+ ⭐</option>
      <option value="3.5">3.5+ ⭐</option>
    </select>
  </div>
  
  <div className="filter-group">
    <label>难度</label>
    <div className="checkbox-group">
      <label>
        <input type="checkbox" value="easy" />
        <span>🟢 Easy</span>
      </label>
      <label>
        <input type="checkbox" value="medium" />
        <span>🟡 Medium</span>
      </label>
      <label>
        <input type="checkbox" value="hard" />
        <span>🔴 Hard</span>
      </label>
    </div>
  </div>
  
  <button className="reset-filters">
    Clear Filters
  </button>
</div>
```

### 3.5 评价展示逻辑

**显示优先级：**
1. 最有帮助的评价 (Most Helpful, 按点赞数)
2. 最新评价 (Most Recent)
3. 按教授分组（可切换）

**评价卡片设计：**
```tsx
<div className="review-card">
  <div className="review-header">
    <div className="professor-badge">
      <img src="/avatars/sarah-j.jpg" alt="" />
      <span>Dr. Sarah Johnson</span>
    </div>
    
    <div className="review-meta">
      <span className="rating">⭐ 4.5</span>
      <span className="difficulty">🟢 Easy</span>
      <span className="semester">2025 S1</span>
    </div>
  </div>
  
  <div className="review-tags">
    <span className="tag">Clear explanations</span>
    <span className="tag">Fair grading</span>
    <span className="tag">Helpful</span>
  </div>
  
  <p className="review-text">
    Dr. Johnson is an excellent instructor for COMP 1012. She explains
    complex concepts in a very clear and accessible way. The assignments
    are challenging but fair, and she's always available during office hours.
  </p>
  
  <div className="review-footer">
    <button className="helpful-btn">
      👍 Helpful (12)
    </button>
    <span className="date">2 weeks ago</span>
  </div>
</div>
```

---

## Part 4: 搜索体验设计

### 4.1 搜索框行为

**自动补全逻辑流程图：**
```
用户输入
    ↓
1. 检测输入类型
    ├─ 课程代码格式 (COMP 1012) → 精确匹配
    ├─ 课程名称 (Computer Science) → 模糊匹配
    └─ 教授名 (Sarah Johnson) → 跨模式搜索
    ↓
2. 实时查询 (Debounce 300ms)
    ↓
3. 显示分组结果
    ├─ Courses (Top 5)
    ├─ Professors (Top 3, 显示他们教的课程)
    └─ Departments (Top 2)
```

**自动补全 UI 设计：**
```tsx
<div className="search-autocomplete">
  {/* 课程结果组 */}
  <div className="result-group">
    <div className="group-header">📚 Courses</div>
    
    <a href="/courses/adelaide-comp-1012" className="result-item">
      <div className="main">
        <strong>COMP 1012</strong> - Computer Science I
      </div>
      <div className="meta">
        University of Adelaide · 3 professors
      </div>
    </a>
    
    <a href="/courses/adelaide-comp-2003" className="result-item">
      <div className="main">
        <strong>COMP 2003</strong> - Data Structures
      </div>
      <div className="meta">
        University of Adelaide · 2 professors
      </div>
    </a>
  </div>
  
  {/* 教授结果组 (仅当搜索可能是教授名时显示) */}
  <div className="result-group">
    <div className="group-header">👤 Professors</div>
    
    <a href="/professors/sarah-johnson" className="result-item">
      <div className="main">
        <img src="/avatars/sarah-j.jpg" />
        <strong>Dr. Sarah Johnson</strong>
      </div>
      <div className="meta">
        Teaching COMP 1012, COMP 2003, COMP 3005
      </div>
    </a>
  </div>
  
  {/* 快速操作 */}
  <div className="quick-actions">
    <button>View all results for "comp"</button>
  </div>
</div>
```

**交互��范：**
- 自动补全框宽度: 与搜索框相同
- 最大高度: 480px (可滚动)
- 键盘导航: ↑↓ 选择, Enter 确认, Esc 关闭
- 高亮匹配: 黄色背景标记匹配的字符

### 4.2 搜索容错处理

**支持的输入格式：**
```typescript
// 课程代码格式容错
"comp1012"      → "COMP 1012"
"COMP1012"      → "COMP 1012"
"comp 1012"     → "COMP 1012"
"Comp 1012"     → "COMP 1012"

// 课程名称模糊匹配
"computer sci"  → "Computer Science I"
"data struct"   → "Data Structures"
"calc"          → "Calculus I", "Calculus II"

// 拼写纠错
"compter"       → "Did you mean: computer?"
"strutures"     → "Did you mean: structures?"
```

**无结果处理：**
```tsx
<div className="no-results">
  <div className="icon">🔍</div>
  <h3>No courses found for "{query}"</h3>
  
  <div className="suggestions">
    <p>Try:</p>
    <ul>
      <li>Checking your spelling</li>
      <li>Using course code (e.g., COMP 1012)</li>
      <li>Browsing by <a href="/departments">department</a></li>
    </ul>
  </div>
  
  <button className="request-course">
    Request this course to be added
  </button>
</div>
```

### 4.3 搜索结果页设计

**URL:** `/search?q={query}`

**页面布局：**
```
┌──────────────────────────────────────────────┐
│ 搜索框 (保留用户输入)                          │
├──────────────────────────────────────────────┤
│ 结果统计 & 筛选器                              │
│ "Found 24 courses for 'computer science'"   │
│ [Sort by: Relevance ▾] [Filters]            │
├──────────────────────────────────────────────┤
│ 课程卡片列表 (与首页相同设计)                   │
│ ┌────────────┐ ┌────────────┐               │
│ │ COMP 1012  │ │ COMP 2003  │               │
│ └────────────┘ └────────────┘               │
├──────────────────────────���───────────────────┤
│ 分页器                                        │
└──────────────────────────────────────────────┘
```

**关键词高亮：**
```tsx
// 高亮匹配的关键词
<h3>
  <Highlight text="COMP 1012 - Computer Science I" 
             query="comp" />
</h3>

// 渲染为:
// <strong className="highlight">COMP</strong> 1012 - 
// <strong className="highlight">Comp</strong>uter Science I
```

**排序选项：**
```
- Relevance (默认)
- Highest Rated
- Most Reviewed
- Course Code (A-Z)
- Recently Added
```

---

## Part 5: 导航逻辑

### 5.1 左侧导航栏调整

**当前 (教授优先):**
```
🏠 Home
🔍 Search
⭐ Top Rated         ← "教授"
👤 Browse Professors ← 错误的主路径
📚 Departments
✍️ Write Review
```

**课程优先重构:**
```tsx
<nav className="sidebar-nav">
  <a href="/" className="nav-item active">
    <span className="icon">🏠</span>
    <span className="label">Home</span>
  </a>
  
  <a href="/search" className="nav-item">
    <span className="icon">🔍</span>
    <span className="label">Search</span>
  </a>
  
  <a href="/courses/top-rated" className="nav-item">
    <span className="icon">⭐</span>
    <span className="label">Top Rated</span>
    <span className="badge">Courses</span>
  </a>
  
  <a href="/universities" className="nav-item">
    <span className="icon">🏛️</span>
    <span className="label">Universities</span>
  </a>
  
  <a href="/departments" className="nav-item">
    <span className="icon">📚</span>
    <span className="label">Departments</span>
  </a>
  
  <a href="/tags" className="nav-item">
    <span className="icon">🏷️</span>
    <span className="label">Tags</span>
  </a>
  
  <hr className="nav-divider" />
  
  <a href="/reviews/new" className="nav-item primary">
    <span className="icon">✍️</span>
    <span className="label">Write Review</span>
  </a>
  
  {/* 次要导航 */}
  <div className="nav-secondary">
    <a href="/professors" className="nav-item-small">
      Browse Professors
    </a>
    <a href="/about" className="nav-item-small">
      About
    </a>
    <a href="/contact" className="nav-item-small">
      Contact
    </a>
  </div>
</nav>
```

**视觉规范：**
- 导航宽度: 240px (可折叠至 80px, 仅显示图标)
- 导航项高度: 48px
- 活跃状态: 蓝色左边框 (4px) + 浅蓝色背景
- Hover 状态: 灰色背景 (#f3f4f6)
- 图标大小: 20px
- 字号: 15px, 中等权重

### 5.2 URL 结构

**课程优先的 URL 设计：**
```
/                                  → 首页 (课程列表)
/courses                           → 所有课程
/courses/[university]-[code]       → 课程详情页
  例: /courses/adelaide-comp-1012

/professors/[slug]                 → 教授详情页
  例: /professors/sarah-johnson

/professors/[slug]?course=[code]   → 教授的特定课程评价
  例: /professors/sarah-johnson?course=comp-1012

/departments                       → 所有学院
/departments/[slug]                → 学院的课程列表
  例: /departments/computer-science

/universities                      → 所有大学
/universities/[slug]               → 大学的课程列表
  例: /universities/adelaide

/universities/[slug]/[dept]        → 大学的特定学院
  例: /universities/adelaide/computer-science

/search?q=[query]                  → 搜索结果页
/reviews/new                       → 写评价
/tags/[tag]                        → 标签页 (如 /tags/clear-explanations)
```

**SEO 优化：**
- 课程详情页: `/courses/adelaide-comp-1012`
  - Title: "COMP 1012 - Computer Science I | University of Adelaide"
  - Meta: "Compare professors teaching COMP 1012 at Adelaide..."
  
- 教授详情页: `/professors/sarah-johnson`
  - Title: "Dr. Sarah Johnson Reviews | OhMyProfessors"
  - Meta: "Read student reviews of Dr. Sarah Johnson..."

### 5.3 面包屑导航

**显示规则：**
```
首页: 不显示面包屑

课程详情页:
Home > Computer Science > COMP 1012

教授详情页:
Home > Professors > Dr. Sarah Johnson

教授的课程评价页:
Home > Computer Science > COMP 1012 > Dr. Sarah Johnson

学院页:
Home > Departments > Computer Science

大学页:
Home > Universities > University of Adelaide
```

**设计规范：**
```tsx
<nav className="breadcrumbs">
  <a href="/">Home</a>
  <span className="separator">›</span>
  <a href="/departments/computer-science">Computer Science</a>
  <span className="separator">›</span>
  <span className="current">COMP 1012</span>
</nav>
```

---

## Part 6: 组件规范

### 6.1 CourseCard 设计规范

#### 尺寸规范
```
宽度: 100% (flex-grow in grid)
高度: auto (min-height: 200px)
内边距: 20px
圆角: 12px
边框: 1px solid #e5e7eb
阴影: 0 1px 3px rgba(0,0,0,0.1)

Hover 状态:
- 阴影: 0 4px 12px rgba(0,0,0,0.15)
- 边框: 1px solid #3b82f6
- Transform: translateY(-2px)
- Transition: all 0.2s ease
```

#### 完整组件代码
```tsx
// CourseCard.tsx
interface CourseCardProps {
  code: string;           // "COMP 1012"
  name: string;           // "Computer Science I"
  university: string;     // "University of Adelaide"
  professorCount: number; // 3
  averageRating: number;  // 4.2
  reviewCount: number;    // 45
  href: string;           // "/courses/adelaide-comp-1012"
}

export function CourseCard({
  code,
  name,
  university,
  professorCount,
  averageRating,
  reviewCount,
  href,
}: CourseCardProps) {
  return (
    <a href={href} className="course-card">
      {/* 顶部：课程代码 + 名称 */}
      <div className="course-header">
        <h3 className="course-code">{code}</h3>
        <p className="course-name">{name}</p>
      </div>
      
      {/* 中部：大学 */}
      <div className="course-meta">
        <span className="university">
          🏛️ {university}
        </span>
      </div>
      
      {/* 底部：统计信息 */}
      <div className="course-stats">
        <div className="stat">
          <span className="icon">👥</span>
          <span className="value">{professorCount}</span>
          <span className="label">professors</span>
        </div>
        
        <div className="stat">
          <span className="icon">⭐</span>
          <span className="value">{averageRating.toFixed(1)}</span>
          <span className="label">avg rating</span>
        </div>
        
        <div className="stat">
          <span className="icon">✍️</span>
          <span className="value">{reviewCount}</span>
          <span className="label">reviews</span>
        </div>
      </div>
      
      {/* CTA */}
      <div className="course-cta">
        <span className="cta-text">Compare Professors</span>
        <span className="cta-arrow">→</span>
      </div>
    </a>
  );
}
```

#### CSS 规范
```css
.course-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
  min-height: 200px;
}

.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #3b82f6;
}

/* 顶部：课程代码和名称 */
.course-header {
  flex: 1;
}

.course-code {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}

.course-name {
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
}

/* 中部：大学信息 */
.course-meta {
  font-size: 14px;
  color: #6b7280;
}

/* 底部：统计信息 */
.course-stats {
  display: flex;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
}

.course-stats .stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}

.course-stats .icon {
  font-size: 14px;
}

.course-stats .value {
  font-weight: 600;
  color: #111827;
}

.course-stats .label {
  color: #9ca3af;
}

/* CTA */
.course-cta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
  color: #3b82f6;
  font-weight: 500;
  font-size: 14px;
}

.course-card:hover .cta-arrow {
  transform: translateX(4px);
}

.cta-arrow {
  transition: transform 0.2s ease;
}
```

#### 交互状态定义

**Normal 状态:**
```
背景: #ffffff
边框: #e5e7eb
阴影: 0 1px 3px rgba(0,0,0,0.1)
```

**Hover 状态:**
```
背景: #ffffff
边框: #3b82f6 (蓝色)
阴影: 0 4px 12px rgba(0,0,0,0.15)
Transform: translateY(-2px)
CTA 箭头: translateX(4px)
```

**Focus 状态 (键盘导航):**
```
边框: 2px solid #3b82f6
Outline: 2px solid #93c5fd (浅蓝色外圈)
Outline-offset: 2px
```

**Active 状态 (点击):**
```
Transform: translateY(0px)
阴影: 0 2px 6px rgba(0,0,0,0.1)
```

### 6.2 ProfessorComparisonTable 设计规范

#### 表格结构
```tsx
// ProfessorComparisonTable.tsx
interface Professor {
  id: string;
  name: string;
  department: string;
  avatar: string;
  rating: number;
  difficulty: 'easy' | 'medium' | 'hard';
  reviewCount: number;
  highlights: string[];  // ["Clear explanations", "Helpful", ...]
}

interface ProfessorComparisonTableProps {
  courseCode: string;
  courseName: string;
  professors: Professor[];
}

export function ProfessorComparisonTable({
  courseCode,
  courseName,
  professors,
}: ProfessorComparisonTableProps) {
  const [sortField, setSortField] = useState<'rating' | 'difficulty' | 'reviewCount'>('rating');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const sortedProfessors = useMemo(() => {
    // 排序逻辑
  }, [professors, sortField, sortDirection]);
  
  return (
    <div className="professor-comparison">
      <div className="table-header">
        <h2>Compare Professors Teaching {courseCode}</h2>
        <p className="subtitle">{courseName}</p>
      </div>
      
      <table>
        <thead>
          <tr>
            <th className="col-professor">Professor</th>
            <th className="col-rating sortable" onClick={() => handleSort('rating')}>
              Rating ⭐
              {sortField === 'rating' && <SortIndicator direction={sortDirection} />}
            </th>
            <th className="col-difficulty sortable" onClick={() => handleSort('difficulty')}>
              Difficulty 📊
              {sortField === 'difficulty' && <SortIndicator direction={sortDirection} />}
            </th>
            <th className="col-reviews sortable" onClick={() => handleSort('reviewCount')}>
              Reviews ✍️
              {sortField === 'reviewCount' && <SortIndicator direction={sortDirection} />}
            </th>
            <th className="col-highlights">Top Tags</th>
            <th className="col-actions"></th>
          </tr>
        </thead>
        
        <tbody>
          {sortedProfessors.map((prof) => (
            <tr key={prof.id} className="professor-row">
              <td className="professor-cell">
                <img src={prof.avatar} alt="" className="avatar" />
                <div className="info">
                  <strong className="name">{prof.name}</strong>
                  <span className="department">{prof.department}</span>
                </div>
              </td>
              
              <td className="rating-cell">
                <RatingBadge rating={prof.rating} />
              </td>
              
              <td className="difficulty-cell">
                <DifficultyBadge difficulty={prof.difficulty} />
              </td>
              
              <td className="review-count">
                {prof.reviewCount} reviews
              </td>
              
              <td className="highlights">
                <div className="tags">
                  {prof.highlights.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </td>
              
              <td className="actions">
                <a 
                  href={`/professors/${prof.id}?course=${courseCode}`}
                  className="view-reviews-btn"
                >
                  View Reviews →
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

#### CSS 规范
```css
.professor-comparison {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.table-header {
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.table-header h2 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px 0;
}

.table-header .subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

/* 表格 */
table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
}

th {
  padding: 12px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

th.sortable {
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
}

th.sortable:hover {
  background: #f3f4f6;
}

/* 列宽 */
.col-professor { width: 25%; }
.col-rating { width: 12%; }
.col-difficulty { width: 12%; }
.col-reviews { width: 12%; }
.col-highlights { width: 27%; }
.col-actions { width: 12%; }

/* 行 */
tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.2s;
}

tbody tr:hover {
  background: #f9fafb;
}

td {
  padding: 16px;
  vertical-align: middle;
}

/* 教授单元格 */
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
}

.professor-cell .name {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

.professor-cell .department {
  display: block;
  font-size: 13px;
  color: #6b7280;
}

/* 评分徽章 */
.rating-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
}

.rating-badge.high {
  background: #d1fae5;
  color: #065f46;
}

.rating-badge.medium {
  background: #fef3c7;
  color: #92400e;
}

.rating-badge.low {
  background: #fee2e2;
  color: #991b1b;
}

/* 难度徽章 */
.difficulty-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
}

.difficulty-badge.easy { color: #059669; }
.difficulty-badge.medium { color: #d97706; }
.difficulty-badge.hard { color: #dc2626; }

.difficulty-badge .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.difficulty-badge.easy .dot { background: #10b981; }
.difficulty-badge.medium .dot { background: #f59e0b; }
.difficulty-badge.hard .dot { background: #ef4444; }

/* 标签 */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  display: inline-block;
  padding: 4px 10px;
  background: #f3f4f6;
  border-radius: 12px;
  font-size: 12px;
  color: #4b5563;
}

.tag.positive {
  background: #d1fae5;
  color: #065f46;
}

/* 查看评价按钮 */
.view-reviews-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s;
}

.view-reviews-btn:hover {
  background: #2563eb;
}
```

#### 响应式设计（移动端）
```css
@media (max-width: 1024px) {
  /* 表格转换为卡片 */
  .professor-comparison table,
  .professor-comparison thead,
  .professor-comparison tbody,
  .professor-comparison tr,
  .professor-comparison td {
    display: block;
  }
  
  .professor-comparison thead {
    display: none; /* 隐藏表头 */
  }
  
  .professor-comparison tr {
    margin-bottom: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
  }
  
  .professor-comparison td {
    padding: 8px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .professor-comparison td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #6b7280;
    font-size: 13px;
    text-transform: uppercase;
  }
  
  .professor-cell {
    flex-direction: column !important;
    align-items: flex-start !important;
  }
}
```

---

## Part 7: 关键问题回答

### Q1: 如何在 3 秒内让用户理解"课程优先"？

**答案：通过三重信号同时作用**

#### 1️⃣ 视觉信号 (1 秒)
```
第一眼看到的是：课程卡片网格
- 大字号课程代码 (COMP 1012)
- 课程图标 (📚)
- 课程统计信息
```

**而不是：**
- ❌ 教授头像
- ❌ 教授名字
- ❌ "Find Your Perfect Professor"

#### 2️⃣ 文字信号 (1 秒)
```
Hero Slogan: "Find the Best Professor for Every Course"
              ^^^^^^^^^^^^^^^^^^^^^^^^^   ^^^^^^^^^^^
              明确的价值主张               课程是主体
```

**心理效应：**
- 用户立即理解：我需要先选课程，再选教授
- 与实际选课流程一致（学生先选课，再选老师）

#### 3️⃣ 交互信号 (1 秒)
```
搜索框 placeholder: "Search courses (e.g., COMP 1012, Data Structures)..."
                              ^^^^^^^
                              课程优先
```

**用户行为引导：**
- 鼠标悬停在搜索框 → 看到课程示例
- 开始输入 → 自动补全显示课程列表
- 点击课程卡片 → 进入课程详情页（不是教授页）

#### 总结：3 秒认知路径
```
第 1 秒: 视觉扫描 → "这是课程列表"
第 2 秒: 阅读标题 → "帮我找课程的最佳教授"
第 3 秒: 看到搜索框 → "我应该搜索课程"

✅ 建立正确的心智模型
```

---

### Q2: 课程卡片与教授卡片的视觉差异？

#### 课程卡片（主要）
```
┌────────────────────────────────┐
│ COMP 1012          ← 24px 粗体  │
│ Computer Science I ← 16px 普通  │
│                                │
│ 🏛️ University      ← 图标+文字  │
│ 👥 3 professors    ← 统计信息   │
│ ⭐ 4.2 avg rating              │
│                                │
│ [Compare Professors →] ← CTA   │
└────────────────────────────────┘

视觉特征:
- 课程代码是最大元素
- 无人像照片
- 强调"数量"（3 个教授可选）
- CTA 是"比较教授"（动作导向）
```

#### 教授卡片（次要，仅在教授列表页）
```
┌────────────────────────────────┐
│  ┌────┐                        │
│  │照片│ Dr. Sarah Johnson      │ ← 头像+姓名
│  └────┘ Computer Science       │
│                                │
│ ⭐ 4.5  📊 Easy  ✍️ 24 reviews │ ← 个人统计
│                                │
│ Teaching: COMP 1012, COMP 2003 │ ← 教的课程
│                                │
│ [View Profile →]               │
└────────────────────────────────┘

视觉特征:
- 头像是视觉焦点
- 教授名字最大
- 列出教的课程（次要信息）
- CTA 是"查看资料"
```

#### 对比总结
| 维度 | 课程卡片 | 教授卡片 |
|------|---------|---------|
| **视觉焦点** | 课程代码 (文字) | 教授头像 (图片) |
| **最大元素** | COMP 1012 (24px) | 教授姓名 (20px) |
| **统计信息** | 教授数量、平均分 | 评分、难度、评价数 |
| **次要信息** | 大学名称 | 教授教的课程 |
| **CTA** | Compare Professors | View Profile |
| **使用场景** | 首页、搜索结果 | 教授列表页（/professors） |

**设计原则：**
- 课程卡片 = 信息型（帮助比较）
- 教授卡片 = 人物型（建立信任）

---

### Q3: 如何避免用户迷失在课程-教授-评价的层级中？

#### 问题诊断
```
用户可能迷失的路径:
首页 → 课程 A → 教授 X → 评价 → 教授 Y → 评价 → 课程 B → ...
                  ↑
                  迷失点: 不知道自己在哪一层
```

#### 解决方案：三重导航系统

#### 1️⃣ 面包屑导航（Breadcrumbs）
```tsx
<nav className="breadcrumbs">
  <a href="/">Home</a> › 
  <a href="/departments/computer-science">Computer Science</a> › 
  <a href="/courses/adelaide-comp-1012">COMP 1012</a> › 
  <span className="current">Dr. Sarah Johnson</span>
</nav>
```

**作用：**
- 显示当前位置
- 提供快速返回路径
- 始终可见（固定在顶部）

#### 2️⃣ 上下文卡片（Context Card）
```tsx
// 在教授详情页顶部显示
<div className="context-card">
  <div className="icon">📚</div>
  <div className="info">
    <p className="label">You're viewing reviews for:</p>
    <h3>COMP 1012 - Computer Science I</h3>
    <a href="/courses/adelaide-comp-1012">← Back to course</a>
  </div>
</div>
```

**作用：**
- 提醒用户当前上下文（"你在看 COMP 1012 的评价"）
- 提供明确的返回路径

#### 3️⃣ URL 参数传递上下文
```
/professors/sarah-johnson?course=comp-1012
                           ^^^^^^^^^^^^^^^^
                           上下文参数
```

**作用：**
- 评价自动筛选到该课程
- 返回按钮链接到课程页（而不是教授列表页）
- URL 可分享且保留上下文

#### 4️⃣ 视觉层级指示器
```css
/* 使用背景色区分层级 */
.page-level-1 { background: #ffffff; }  /* 首页 */
.page-level-2 { background: #f9fafb; }  /* 课程详情 */
.page-level-3 { background: #f3f4f6; }  /* 教授详情 */
```

#### 完整示例：用户在教授详情页
```
┌──────────────────────────────────────────────┐
│ Home › Computer Science › COMP 1012 › Sarah │ ← 面包屑
├──────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ 📚 Viewing reviews for COMP 1012        │ │ ← 上下文卡片
│ │ ← Back to course                        │ │
│ └─────────────────────────────────────────┘ │
├──────────────────────────────────────────────┤
│ Dr. Sarah Johnson                            │
│ [教授信息和评价]                              │
└──────────────────────────────────────────────┘

URL: /professors/sarah-johnson?course=comp-1012
                                 ^^^^ 上下文参数
```

**用户永远知道：**
1. 我在哪里 (面包屑)
2. 我在看什么 (上下文卡片)
3. 如何回到上一级 (← Back 按钮)

---

### Q4: 如何处理一个课程有 10+ 个教授的情况？

#### 问题场景
```
ECON 1001 (Microeconomics) 有 15 个教授
- 显示所有教授？→ 表格太长，用户疲劳
- 只显示部分？→ 用户可能错过好教授
```

#### 解决方案：智能排序 + 分组 + 渐进展示

#### 1️⃣ 默认排序：推荐算法
```typescript
// 推荐评分计算
function calculateRecommendationScore(professor: Professor): number {
  const ratingScore = professor.rating * 20;           // 满分 100
  const reviewScore = Math.min(professor.reviewCount / 10, 10) * 5; // 满分 50
  const recencyScore = calculateRecencyScore(professor.lastReviewDate) * 10; // 满分 10
  
  return ratingScore + reviewScore + recencyScore;
}

// 排序规则
1. 推荐评分 > 85 分 → "Top Picks" 组
2. 推荐评分 60-85 分 → "Other Options" 组
3. 推荐评分 < 60 分 → 默认折叠
```

#### 2️⃣ 分组显示
```tsx
<div className="professor-comparison">
  {/* 组 1: 推荐教授 (自动展开) */}
  <div className="professor-group expanded">
    <h3>⭐ Top Picks for COMP 1012</h3>
    <p className="subtitle">Based on ratings and review count</p>
    
    <table>
      {/* 显示前 5 位推荐教授 */}
      {topProfessors.map(prof => <ProfessorRow {...prof} />)}
    </table>
  </div>
  
  {/* 组 2: 其他选择 (默认折叠) */}
  <details className="professor-group">
    <summary>
      Other Options (10 more professors)
      <ChevronIcon />
    </summary>
    
    <table>
      {otherProfessors.map(prof => <ProfessorRow {...prof} />)}
    </table>
  </details>
  
  {/* 组 3: 评价较少的教授 (默认折叠) */}
  <details className="professor-group">
    <summary>
      Professors with Limited Reviews (2)
      <InfoIcon tooltip="These professors have fewer than 5 reviews" />
    </summary>
    
    <table>
      {limitedDataProfessors.map(prof => <ProfessorRow {...prof} />)}
    </table>
  </details>
</div>
```

#### 3️⃣ 筛选器增强
```tsx
<div className="filter-bar">
  {/* 快速筛选器 */}
  <div className="quick-filters">
    <button 
      className={filter === 'recommended' ? 'active' : ''}
      onClick={() => setFilter('recommended')}
    >
      ⭐ Recommended
    </button>
    
    <button 
      className={filter === 'highest-rated' ? 'active' : ''}
      onClick={() => setFilter('highest-rated')}
    >
      🏆 Highest Rated
    </button>
    
    <button 
      className={filter === 'most-reviewed' ? 'active' : ''}
      onClick={() => setFilter('most-reviewed')}
    >
      📊 Most Reviewed
    </button>
    
    <button 
      className={filter === 'easiest' ? 'active' : ''}
      onClick={() => setFilter('easiest')}
    >
      🟢 Easiest
    </button>
  </div>
  
  {/* 高级筛选器 */}
  <details className="advanced-filters">
    <summary>Advanced Filters</summary>
    
    <div className="filter-grid">
      <div className="filter-group">
        <label>Semester</label>
        <select>
          <option>All Semesters</option>
          <option>2025 S1</option>
          <option>2024 S2</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>Minimum Rating</label>
        <input type="range" min="0" max="5" step="0.5" />
      </div>
    </div>
  </details>
</div>
```

#### 4️⃣ 视觉优化：虚拟滚动
```typescript
// 使用 react-window 进行虚拟滚动
import { FixedSizeList as List } from 'react-window';

function ProfessorList({ professors }: { professors: Professor[] }) {
  return (
    <List
      height={600}
      itemCount={professors.length}
      itemSize={80}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <ProfessorRow professor={professors[index]} />
        </div>
      )}
    </List>
  );
}
```

**作用：** 只渲染可见区域的教授，性能更好

#### 5️⃣ 对比工具
```tsx
<div className="comparison-toolbar">
  <p>Select up to 3 professors to compare side-by-side</p>
  
  <div className="selected-professors">
    {selectedProfessors.map(prof => (
      <div className="selected-chip">
        {prof.name}
        <button onClick={() => deselect(prof)}>×</button>
      </div>
    ))}
  </div>
  
  {selectedProfessors.length >= 2 && (
    <button className="compare-btn">
      Compare {selectedProfessors.length} Professors
    </button>
  )}
</div>
```

**交互流程：**
```
1. 用户勾选教授 (checkbox in table)
2. 顶部显示已选教授卡片
3. 点击 "Compare" 按钮
4. 打开对比视图（并排显示所有指标）
```

#### 完整示例：15 个教授的课程
```
┌──────────────���───────────────────────────────┐
│ COMP 1012 - 15 Professors Teaching          │
├──────────────────────────────────────────────┤
│ [⭐ Recommended] [🏆 Highest] [🟢 Easiest]   │ ← 快速筛选
├──────────────────────────────────────────────┤
│ ⭐ Top Picks (5 professors)                  │ ← 默认展开
│ ┌──────────────────────────────────────────┐ │
│ │ ☑️ Dr. Sarah Johnson    ⭐ 4.5  🟢 Easy  │ │
│ │ ☐ Prof. Michael Tang    ⭐ 4.4  🟡 Med   │ │
│ │ ☐ Dr. Emma Wilson       ⭐ 4.3  🟢 Easy  │ │
│ └──────────────────────────────────────────┘ │
├──────────────────────────────────────────────┤
│ ▶ Other Options (10 more) ← 点击展开         │
├──────────────────────────────────────────────┤
│ [Compare 1 Selected Professor]               │
└──────────────────────────────────────────────┘
```

**总结：处理 10+ 教授的策略**
1. **智能排序** - 推荐最相关的教授
2. **分组展示** - Top Picks 自动展开，其他折叠
3. **快速筛选** - 一键过滤到关键子集
4. **对比工具** - 勾选感兴趣的教授进行深度比较
5. **虚拟滚动** - 性能优化（当教授数量 > 20 时）

---

## Part 8: 实施路线图

### Phase 1: 核心组件开发 (Week 1-2)
```
✅ CourseCard 组件
✅ ProfessorComparisonTable 组件
✅ 课程搜索自动补全
✅ 面包屑导航
```

### Phase 2: 页面重构 (Week 3-4)
```
✅ 首页重新设计
✅ 课程详情页
✅ 搜索结果页
✅ 导航栏调整
```

### Phase 3: 交互优化 (Week 5)
```
✅ 筛选器逻辑
✅ 排序功能
✅ 教授对比工具
✅ 键盘导航支持
```

### Phase 4: 用户测试 (Week 6)
```
✅ A/B 测试（课程优先 vs 教授优先）
✅ 用户访谈（5-10 人）
✅ 热图分析（Hotjar）
✅ 转化率跟踪
```

### Phase 5: 迭代优化 (Week 7-8)
```
✅ 根据测试结果调整
✅ 性能优化
✅ 无障碍改进（WCAG 2.1 AA）
✅ SEO 优化
```

---

## Part 9: 成功指标

### 核心指标 (North Star Metrics)
```
1. 课程详情页访问率
   目标: >60% 的用户会点击课程卡片
   当前: ~35% (教授优先)

2. 搜索成功率
   目标: >80% 的搜索能找到课程
   当前: ~45% (教授名搜索失败率高)

3. 用户路径深度
   目标: 平均访问 3+ 页面
   当前: 1.8 页面

4. 转化率 (写评价)
   目标: >5% 的访问者写评价
   当前: 2.1%
```

### 用户体验指标
```
1. 3 秒认知率
   测试: 首次访问用户，3 秒后问"这个网站是做什么的？"
   目标: >90% 回答包含"课程"关键词
   
2. 任务完成时间
   任务: "找到 COMP 1012 评分最高的教授"
   目标: <30 秒完成

3. 用户满意度
   问卷: "这个网站的信息组织方式符合我的预期吗？"
   目标: >4.0/5.0 分
```

---

## Appendix A: 设计系统规范

### 颜色系统
```css
/* Primary Colors */
--color-primary: #3b82f6;      /* 主要 CTA */
--color-primary-hover: #2563eb;
--color-primary-light: #dbeafe;

/* Semantic Colors */
--color-success: #10b981;       /* 高评分 */
--color-warning: #f59e0b;       /* 中等评分 */
--color-danger: #ef4444;        /* 低评分 */

/* Neutral Colors */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;

/* Background */
--bg-primary: #ffffff;
--bg-secondary: #f9fafb;
--bg-tertiary: #f3f4f6;
```

### 字体系统
```css
/* Font Family */
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: "Fira Code", "Courier New", monospace;

/* Font Sizes */
--text-xs: 12px;
--text-sm: 13px;
--text-base: 14px;
--text-md: 15px;
--text-lg: 16px;
--text-xl: 18px;
--text-2xl: 20px;
--text-3xl: 24px;
--text-4xl: 32px;
--text-5xl: 48px;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 间距系统
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### 圆角系统
```css
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

### 阴影系统
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

---

## Appendix B: 无障碍清单

### WCAG 2.1 AA 合规
```
✅ 键盘导航支持
  - Tab 键遍历所有交互元素
  - Enter/Space 激活按钮
  - Esc 关闭模态框

✅ 颜色对比度
  - 正文文字: 至少 4.5:1
  - 大标题: 至少 3:1
  - 使用 WebAIM Contrast Checker 验证

✅ 屏幕阅读器支持
  - 所有图片有 alt 属性
  - 表格有 <th> 和 scope 属性
  - ARIA labels 用于图标按钮

✅ 焦点指示器
  - 所有可交互元素有清晰的焦点状态
  - 不依赖颜色传达信息

✅ 表单标签
  - 每个输入框有关联的 <label>
  - 错误信息与输入框关联 (aria-describedby)
```

---

## 结论

本 UX 设计方案基于 Don Norman 的用户中心设计原则，通过**课程优先**的信息架构，解决了当前教授优先模式的核心问题：

1. **认知清晰** - 用户 3 秒内理解产品价值
2. **决策高效** - 直接比较同一课程的教授
3. **路径自然** - 符合学生真实的选课流程
4. **信息完整** - 教授评价与课程上下文绑定

**下一步行动：**
1. 开发团队审查设计方案
2. 创建交互原型（Figma）
3. 进行用户测试（5-10 人）
4. 迭代优化并开发

**设计原则总结：**
> "Don't make me think. 学生想选课，就让他们从课程开始。"

---

**文档版本:** 1.0  
**最后更新:** 2026-02-11  
**下次审查:** 实施后 2 周

---

## 附录：参考文献

1. Norman, D. (2013). *The Design of Everyday Things*. Basic Books.
2. Krug, S. (2014). *Don't Make Me Think, Revisited*. New Riders.
3. Nielsen, J. (2000). *Designing Web Usability*. New Riders.
4. [Material Design Guidelines](https://material.io/design)
5. [Apple Human Interface Guidelines](https://developer.apple.com/design/)
