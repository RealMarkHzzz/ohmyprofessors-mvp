# OhMyProfessors - 技术实现方案 v2.0
**Core-First, Light Gamification**

**Version:** 2.0  
**Date:** 2026-02-10  
**原则：** 查课评价为核心，游戏化为润滑剂

---

## 🎯 核心设计原则（Design Principles）

### 战略调整声明

**用户反馈：** "不要过重的游戏化，查课和评价功能应为最重要"

**设计原则重排序：**

| 优先级 | 功能类型 | 占比 | 说明 |
|--------|---------|------|------|
| **P0** | 查课功能 | 40% | 搜索、筛选、对比、详情 |
| **P0** | 评价功能 | 40% | 查看、提交、点赞、举报 |
| **P1** | 轻量反馈 | 15% | 简单提示、进度条、小徽章 |
| **P2** | 可选游戏化 | 5% | 用户可关闭的高级功能 |

**核心判断标准：**
> 任何功能必须回答："这能帮助用户更好地选课吗？"  
> 如果答案是"不能"或"间接帮助"，则降级为可选功能。

---

## 一、核心功能架构（Core Features First）

### 1.1 查课功能（Course Discovery）

**功能矩阵：**

| 功能 | 优先级 | 实现复杂度 | MVP包含 |
|------|--------|-----------|---------|
| 教授搜索（名字） | P0 | 低 | ✅ |
| 课程代码搜索 | P0 | 低 | ✅ |
| 系别筛选 | P0 | 低 | ✅ |
| 难度筛选 | P0 | 中 | ✅ |
| 工作量筛选 | P0 | 中 | ✅ |
| 推荐度筛选 | P0 | 低 | ✅ |
| 对比功能（2-3个） | P0 | 中 | ✅ |
| 排序（评分/难度） | P0 | 低 | ✅ |
| AI推荐 | P1 | 高 | ❌ (Phase 2) |
| 课程组合建议 | P1 | 高 | ❌ (Phase 2) |

**UI 实现：**

```tsx
// 首页 - 搜索为中心
export default function HomePage() {
  return (
    <div>
      {/* 核心：大搜索框 */}
      <SearchBar 
        placeholder="搜索教授、课程代码或系别..."
        autoFocus
      />
      
      {/* 快速筛选（紧随搜索框） */}
      <QuickFilters>
        <Filter icon="📚" label="难度" />
        <Filter icon="⏰" label="工作量" />
        <Filter icon="⭐" label="推荐度" />
      </QuickFilters>
      
      {/* 核心：课程列表（占据主要空间��� */}
      <CourseList>
        {courses.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </CourseList>
      
      {/* 轻量：底部小提示（不干扰核心） */}
      <LightHint>
        💡 提示：点击课程卡片查看详细评价
      </LightHint>
    </div>
  )
}
```

**交互设计：**
- 搜索框始终在顶部（固定）
- 结果实时更新（无需点击按钮）
- 筛选器展开/收起（不占用过多空间）
- 卡片设计简洁（关键信息优先）

### 1.2 评价功能（Review System）

**功能矩阵：**

| 功能 | 优先级 | 实现复杂度 | MVP包含 |
|------|--------|-----------|---------|
| 查看评价列表 | P0 | 低 | ✅ |
| 评价详情展开 | P0 | 低 | ✅ |
| 提交评价表单 | P0 | 中 | ✅ |
| 结构化评分 | P0 | 中 | ✅ |
| 点赞评价 | P0 | 低 | ✅ |
| 举报评价 | P0 | 中 | ✅ |
| 评价排序（有用/最新） | P0 | 低 | ✅ |
| 评价筛选（学期） | P1 | 中 | ✅ |
| 评论评价 | P1 | 中 | ❌ (Phase 2) |

**UI 实现：**

```tsx
// 教授详情页 - 评价为核心
export default function ProfessorPage({ professor }) {
  return (
    <div>
      {/* 教授基础信息（简洁） */}
      <ProfessorHeader>
        <h1>{professor.name}</h1>
        <p>{professor.department}</p>
      </ProfessorHeader>
      
      {/* 核心：评价统计（一目了然） */}
      <ReviewStats>
        <Stat label="平均难度" value="3.8/5" />
        <Stat label="工作量" value="12h/周" />
        <Stat label="推荐度" value="85%" />
      </ReviewStats>
      
      {/* 核心：评价列表（占据主要空间） */}
      <ReviewList>
        {reviews.map(review => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </ReviewList>
      
      {/* 核心：快速提交入口（始终可见） */}
      <FloatingButton onClick={openReviewForm}>
        ✍️ 写评价
      </FloatingButton>
    </div>
  )
}
```

**评价表单设计：**

```tsx
// 评价提交表单 - 简洁高效
export function ReviewForm({ professorId, courseCode }) {
  return (
    <form>
      {/* 核心字段（必填） */}
      <Field required>
        <Label>课程代码</Label>
        <Input placeholder="e.g., COMP1012" />
      </Field>
      
      <Field required>
        <Label>难度评分</Label>
        <StarRating max={5} />
      </Field>
      
      <Field required>
        <Label>工作量（小时/周）</Label>
        <Slider min={0} max={40} />
      </Field>
      
      <Field required>
        <Label>是否推荐</Label>
        <Radio options={['推荐', '一般', '不推荐']} />
      </Field>
      
      <Field required>
        <Label>评价内容</Label>
        <Textarea 
          placeholder="分享你的学习体验..."
          minLength={20}
        />
      </Field>
      
      {/* 可选字段（折叠） */}
      <Collapsible label="更多信息（可选）">
        <Field>
          <Label>考试形式</Label>
          <Checkbox options={['开卷', '闭卷', '论文']} />
        </Field>
      </Collapsible>
      
      {/* 提交 */}
      <Button type="submit">提交评价</Button>
    </form>
  )
}
```

---

## 二、轻量反馈机制（Light Feedback）

### 2.1 设计原则

**什么是"轻量"？**
- 不打断用户主流程
- 不强制用户互动
- 可以被忽略
- 视觉克制（不花哨）

**什么要避免？**
- ❌ 弹窗庆祝动画
- ❌ 强制观看成就解锁
- ❌ 复杂的积分规则
- ❌ 过多的推送通知

### 2.2 轻量反馈实现

**场景1：提交评价后**

```tsx
// 简洁的成功提示（3秒后自动消失）
<Toast type="success">
  ✅ 评价已提交，感谢你的贡献！
</Toast>

// 不要：
// ❌ 弹窗："恭喜！你获得了10积分！解锁了新徽章！"
// ❌ 全屏动画："Achievement Unlocked!"
```

**场景2：浏览课程时**

```tsx
// 底部小提示（不干扰浏览）
<BottomHint>
  💡 已浏览3门课程，可以收藏感兴趣的课程
</BottomHint>

// 不要：
// ❌ 进度条："课程探索进度：3/10"
// ❌ 弹窗："继续浏览7门课程解锁筛选功能"
```

**场景3：点赞评价后**

```tsx
// 简单的动画反馈（图标变色）
<LikeButton 
  active={liked}
  onPress={() => {
    setLiked(!liked)
    // 轻量反馈：数字+1，图标高亮
  }}
>
  👍 {likeCount}
</LikeButton>

// 不要：
// ❌ "+5 XP" 飘字动画
// ❌ "你帮助了这��同学！"弹窗
```

### 2.3 进度可视化（克制版）

**仅在有实际意义时显示进度：**

| 场景 | 显示进度 | 原因 |
|------|---------|------|
| 填写评价表单 | ✅ 是 | 帮助用户知道还需填什么 |
| 浏览课程 | ❌ 否 | 无实际意义 |
| 收藏课程 | ❌ 否 | 无明确目标 |
| 选课季倒计时 | ✅ 是 | 有实际deadline |

**实现示例：**

```tsx
// 评价表单 - 显示进度有意义
<FormProgress current={3} total={5}>
  已完成 3/5 个必填项
</FormProgress>

// 首页 - 不显示无意义的进度
// ❌ 不要：<Progress>今日浏览进度：3/10门课程</Progress>
```

---

## 三、可选游戏化（Optional Gamification）

### 3.1 设计原则

**核心：用户可完全关闭**

所有游戏化元素必须满足：
1. 可以在设置中一键关闭
2. 关闭后不影响核心功能
3. 不会反复提醒用户开启

**实现：**

```tsx
// 设置页面
export function SettingsPage() {
  const [gamificationEnabled, setGamificationEnabled] = useState(true)
  
  return (
    <Settings>
      <Toggle
        label="简洁模式"
        description="关闭徽章、积分等游戏化元素"
        value={!gamificationEnabled}
        onChange={(v) => setGamificationEnabled(!v)}
      />
      
      {/* 其他设置 */}
    </Settings>
  )
}

// 全局使用
export function useGamification() {
  const enabled = useSettings('gamificationEnabled')
  
  return {
    showBadge: enabled,
    showXP: enabled,
    showStreak: enabled,
  }
}
```

### 3.2 极简游戏化元素

**仅保留最有价值的3个：**

| 元素 | 保留 | 原因 | 实现方式 |
|------|-----|------|---------|
| 徽章 | ✅ | 认可贡献，社交价值 | 用户主页显示，不弹窗 |
| 积分 | ❌ | 无实际意义 | 移除 |
| 等级 | ❌ | 过于游戏化 | 移除 |
| 连续打卡 | ❌ | 与选课场景不符 | 移除 |
| 贡献统计 | ✅ | 展示影响力 | "已帮助X个同学" |
| 排行榜 | ❌ | 可能引发内卷 | 移除 |
| 每日任务 | ❌ | 偏离核心价值 | 移除 |
| 成就系统 | ✅ | 里程碑认可 | 仅重大事件（如首次评价） |

**实现示例：**

```tsx
// 用户主页 - 极简展示
export function UserProfile({ user }) {
  const { showBadge } = useGamification()
  
  return (
    <div>
      <h1>{user.name}</h1>
      
      {/* 核心统计（始终显示） */}
      <Stats>
        <Stat label="评价数" value={user.reviewCount} />
        <Stat label="帮助同学" value={user.helpedCount} />
      </Stats>
      
      {/* 可选：徽章（可关闭） */}
      {showBadge && user.badges.length > 0 && (
        <Badges>
          {user.badges.map(badge => (
            <Badge key={badge.id} {...badge} />
          ))}
        </Badges>
      )}
      
      {/* 核心：评价历史 */}
      <ReviewHistory reviews={user.reviews} />
    </div>
  )
}
```

---

## 四、技术实现方案（Technical Architecture）

### 4.1 核心功能优先级

**Phase 1（Week 1-2）：核心查课评价**

```
Sprint 1:
├─ 教授搜索页面
├─ 教授详情页面
├─ 评价列表展示
└─ 基础筛选（难度、系别）

Sprint 2:
├─ 评价提交表单
├─ 用户认证（.edu.au邮箱）
├─ 评价点赞功能
└─ 评价举报功能
```

**Phase 2（Week 3-4）：增强功能**

```
Sprint 3:
├─ 高级筛选（工作量、学期）
├─ 课程对比功能
├─ 评价排序（有用度、最新）
└─ 用户主页

Sprint 4:
├─ 收藏功能
├─ 评价编辑/删除
├─ 搜索历史
└─ 推荐课程（基础算法）
```

**Phase 3（Week 5-6）：可选游戏化**

```
Sprint 5:
├─ 徽章系统（3-5个）
├─ 贡献统计
└─ 简洁模式开关

Sprint 6:
├─ 成就通知（克制版）
├─ 用户设置页面
└─ 数据导出功能
```

### 4.2 数据模型（Database Schema）

**核心表（已存在）：**
- `universities` - 大学
- `professors` - 教授
- `reviews` - 评价
- `users` - 用户
- `review_votes` - 点赞

**新增表（轻量游戏化）：**

```sql
-- 徽章定义（系统预设）
CREATE TABLE badges (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  criteria JSONB, -- 获得条件
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 用户徽章（仅记录已获得）
CREATE TABLE user_badges (
  user_id UUID REFERENCES users(id),
  badge_id UUID REFERENCES badges(id),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- 用户统计（缓存表，提升性能）
CREATE TABLE user_stats (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  review_count INT DEFAULT 0,
  helpful_count INT DEFAULT 0, -- 被点赞总数
  last_review_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**触发器（自动更新统计）：**

```sql
-- 自动更新用户统计
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_stats
  SET 
    review_count = (SELECT COUNT(*) FROM reviews WHERE user_id = NEW.user_id),
    last_review_at = NOW(),
    updated_at = NOW()
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER review_stats_trigger
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_user_stats();
```

### 4.3 API 设计

**核心 API（Phase 1）：**

```typescript
// 搜索 API
GET /api/search
  ?q=教授名或课程代码
  &department=Computer Science
  &difficulty=1-5
  &workload=0-40
  &recommended=true
  
// 教授详情 API
GET /api/professors/:slug
  
// 评价列表 API
GET /api/professors/:slug/reviews
  ?sort=helpful|latest
  &semester=2027-S1
  
// 提交评价 API
POST /api/reviews
  body: {
    professor_id: UUID,
    course_code: string,
    difficulty: number,
    workload: number,
    recommended: boolean,
    comment: string,
    exam_format?: string[]
  }
  
// 点赞评价 API
POST /api/reviews/:id/vote
  body: { vote_type: 'upvote' | 'downvote' }
```

**可选 API（Phase 3）：**

```typescript
// 用户统计 API
GET /api/users/:id/stats

// 徽章列表 API
GET /api/users/:id/badges

// 系统设置 API
PATCH /api/users/:id/settings
  body: { gamification_enabled: boolean }
```

### 4.4 前端组件架构

**核心组件（必须实现）：**

```
src/
├── app/
│   ├── page.tsx                    # 首页（搜索）
│   ├── professors/
│   │   └── [slug]/
│   │       └── page.tsx            # 教授详情
│   ├── reviews/
│   │   └── new/
│   │       └── page.tsx            # 提交评价
│   └── auth/
│       ├── login/page.tsx
│       └── register/page.tsx
├── components/
│   ├── SearchBar.tsx               # 搜索框
│   ├── CourseCard.tsx              # 课程卡片
│   ├── ReviewCard.tsx              # 评价卡片
│   ├── ReviewForm.tsx              # 评价表单
│   ├── QuickFilters.tsx            # 快速筛选
│   └── LightHint.tsx               # 轻量提示
└── lib/
    ├── supabase/
    │   ├── client.ts
    │   └── server.ts
    └── utils/
        ├── search.ts               # 搜索逻辑
        └── validation.ts           # 表单验证
```

**可选组件（Phase 3）：**

```
src/
├── components/
│   ├── Badge.tsx                   # 徽章组件
│   ├── UserStats.tsx               # 用户统计
│   └── SettingsPanel.tsx           # 设置面板
└── hooks/
    └── useGamification.ts          # 游戏化开关
```

---

## 五、用户体验流程（Simplified UX Flow）

### 5.1 核心流程：查找教授

```
用户打开APP
  ↓
首页自动聚焦搜索框
  ↓
输入"Sarah Johnson"或"COMP1012"
  ↓
实时显示结果（无需按回车）
  ↓
点击课程卡片
  ↓
进入教授详情页
  ↓
查看评价统计（难度、工作量、推荐度）
  ↓
滚动查看详细评价列表
  ↓
点赞有用的评价
  ↓
完成查询（可离开或继续浏览）
```

**关键设计：**
- 无干扰：整个流程无弹窗、无动画
- 快速：3次点击内完成目标
- 自然：符合直觉，无需学习

### 5.2 核心流程：提交评价

```
用户进入教授详情页
  ↓
点击"写评价"按钮（固定在底部）
  ↓
打开评价表单
  ↓
填写5个核心字段：
  1. 课程代码（自动补全）
  2. 难度评分（滑动星星）
  3. 工作量（拖动滑块）
  4. 推荐度（3选1）
  5. 评价内容（文本框）
  ↓
点击"提交评价"
  ↓
简单的成功提示（3秒）
  ↓
返回教授详情页（看到自己的评价）
  ↓
完成
```

**关键设计：**
- 简洁：5个字段，清晰明了
- 即时：提交后立即看到结果
- 克制：成功提示不打扰，3秒自动消失

### 5.3 可选流程：查看徽章（游戏化）

```
用户进入个人主页
  ↓
看到"已帮助12个同学"（核心统计）
  ↓
（可选）看到2个徽章："首次评价"、"热心助人"
  ↓
点击徽章查看详情
  ↓
了解徽章获得条件
  ↓
（可选）关闭游戏化元素
  ↓
完成
```

**关键设计：**
- 可选：徽章不是核心，可忽略
- 不打扰：不主动弹窗通知
- 可关闭：简洁模式完全隐藏

---

## 六、开发优先级（Implementation Priority）

### Week 1-2: 核心MVP

**必须完成：**
- [x] 教授搜索页面（含筛选）
- [x] 教授详情页面
- [x] 评价列表展示
- [x] 评价提交表单
- [x] 用户认证（.edu.au）
- [x] 评价点赞功能

**测试指标：**
- 搜索响应时间 <500ms
- 评价提交成功率 >95%
- 页面加载时间 <2s

### Week 3-4: 增强功能

**必须完成：**
- [x] 高级筛选（工作量、学期）
- [x] 课程对比功能（2-3个）
- [x] 评价排序（有用度、最新）
- [x] 用户主页（基础版）

**可选完成：**
- [ ] 收藏功能
- [ ] 搜索历史
- [ ] 推荐课程（基础）

### Week 5-6: 轻量游戏化（可选）

**仅在核心功能稳定后：**
- [ ] 3个核心徽章
- [ ] 用户统计展示
- [ ] 简洁模式开关
- [ ] 成就通知（克制版）

---

## 七、设计规范（Design Principles）

### 7.1 UI 视觉原则

**简洁 \u003e 华丽：**
- 颜色：最多3种主色调（蓝、灰、白）
- 图标：统一使用系统图标或emoji
- 动画：仅必要反馈（点击、加载）
- 字体：系统默认字体

**信息密度：**
- 课程卡片：3行核心信息（名字、系别、评分）
- 评价卡片：4行信息（难度、工作量、推荐度、评论摘要）
- 避免过度留白，但保持可读性

### 7.2 交互原则

**快速 \u003e 花哨：**
- 无不必要的页面跳转
- 无强制的引导动画
- 无自动播放的视频
- 无弹窗广告

**直观 \u003e 创新：**
- 使用标准UI模式（卡片、列表、表单）
- 避免非常规交互（左滑删除除外）
- 图标含义清晰（配文字说明）

---

## 八、性能指标（Performance Targets）

### 8.1 核心指标

| 指标 | 目标 | 测量方法 |
|------|------|---------|
| 首页加载时间 | <2s | Lighthouse |
| 搜索响应时间 | <500ms | 客户端计时 |
| 评价提交成功率 | >95% | 后端日志 |
| 页面跳转延迟 | <300ms | Navigation Timing API |
| 图片加载时间 | <1s | Resource Timing API |

### 8.2 优化策略

**前端优化：**
- 使用 Next.js ISR（60秒缓存）
- 图片懒加载
- 代码分割（按路由）
- 静态生成教授详情页

**后端优���：**
- 数据库索引（name, department, course_code）
- 查询缓存（Redis，5分钟）
- 分页加载（每页20条）

---

## 九、总结（Summary）

### 核心设计理念

```
核心功能（80%精力） + 轻量反馈（15%精力） + 可选游戏化（5%精力）
```

**不要做的事：**
- ❌ 复杂的积分系统
- ❌ 强制的每日任务
- ❌ 花哨的动画效果
- ❌ 不可关闭的游戏化元素
- ❌ 偏离选课核心的功能

**要做的事：**
- ✅ 快速准确的搜索
- ✅ 清晰有用的评价
- ✅ 简洁直观的UI
- ✅ 克制的反馈提示
- ✅ 可选的徽章系统

**最终目标：**
> 让用户说："这是我用过最好用的选课工具"  
> 而不是："这是一个有趣的选课游戏"

---

**END OF TECHNICAL IMPLEMENTATION PLAN v2.0**
