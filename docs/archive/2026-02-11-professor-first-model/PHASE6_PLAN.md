# OhMyProfessors - Phase 6 开发计划
**生成时间:** 2026-02-11 07:22 ACST  
**基于:** CEO + CTO + Product + Fullstack 联合评估  
**战略决策:** 延后全澳扩展，先验证 Adelaide 单校 PMF

---

## 📊 战略共识

### 核心结论
**所有 4 个 Agent 一致同意：现在不应该做全澳数据获取**

**原因：**
1. **CEO 判断：** 当前使用 Mock 数据，PMF 未验证，扩展是「单向门」决策（不可逆）
2. **CTO 分析：** 多校数据架构复杂度高，独立开发者应保持简单
3. **产品设计：** 用户真实需求是「更多本校评价」，不是「其他学校数据」
4. **全栈开发：** 应先用真实数据替换 Mock，验证产品价值

---

## 🎯 Phase 6 目标（接下来 30 天）

### 核心任务：**从 Mock 数据到真实 Adelaide 数据**

```
当前状态: Mock 数据（12 个教授样本）
目标状态: 真实数据（100+ 教授，覆盖 50 门热门课程）
成功指标: 数据覆盖率 > 80%，每周新增评价 > 20 条
```

---

## 📋 具体任务拆解

### Task 1: Adelaide 数据爬取（P0，7 天）

**目标：** 获取 Adelaide 100+ 教授的真实数据

**数据来源：**
- Adelaide 官网 Staff Directory
- Course Planner（课程-教授映射）
- Handbook（课程大纲）

**技术方案（CTO 推荐）：**
- 工具：Playwright（处理 JS 渲染）
- 频率：手动触发（非自动化）
- 存储：直接写入 Supabase

**数据字段（Product 优先级 P0）：**
```typescript
interface Professor {
  id: string
  name: string              // P0
  title: string             // P0 (Dr./Prof./Lecturer)
  department: string        // P0
  email: string             // P1
  office_location: string   // P1
  courses: string[]         // P0 (课程代码列表)
  research_areas: string[]  // P2
  profile_url: string       // P0 (来源链接)
}

interface Course {
  code: string              // P0 (e.g., "COMP SCI 1012")
  name: string              // P0
  level: number             // P0 (1xxx-7xxx)
  units: number             // P1
  semester: string[]        // P1 (Semester 1/2/Summer)
  description: string       // P2
}
```

**产出：**
- [ ] `scripts/scrape-adelaide.ts`（爬虫脚本）
- [ ] `data/adelaide-professors.json`（原始数据）
- [ ] Supabase 导入脚本

---

### Task 2: Supabase Schema 迁移（P0，3 天）

**目标：** 从 Mock 数据结构迁移到生产 Schema

**Schema 设计（CTO 方案）：**
```sql
-- Universities 表
CREATE TABLE universities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,  -- "Adelaide"
  country TEXT DEFAULT 'Australia',
  state TEXT,
  city TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Professors 表
CREATE TABLE professors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  university_id UUID REFERENCES universities(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,  -- "john-smith-adelaide"
  title TEXT,
  department TEXT,
  email TEXT,
  office_location TEXT,
  profile_url TEXT,
  research_areas TEXT[],
  average_rating NUMERIC(3,2),
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses 表
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  university_id UUID REFERENCES universities(id),
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  level INTEGER,
  units INTEGER,
  semester TEXT[],
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Professor-Course 映射表
CREATE TABLE professor_courses (
  professor_id UUID REFERENCES professors(id),
  course_id UUID REFERENCES courses(id),
  PRIMARY KEY (professor_id, course_id)
);

-- Reviews 表（保持现有结构，添加 university_id）
ALTER TABLE reviews ADD COLUMN university_id UUID REFERENCES universities(id);
```

**产出：**
- [ ] `supabase/migrations/002_production_schema.sql`
- [ ] 数据迁移脚本（Mock → Production）
- [ ] RLS 策略更新

---

### Task 3: 前端数据层重构（P0，5 天）

**目标：** 替换 Mock 数据为 Supabase 查询

**需要修改的文件：**
```
app/
├── page.tsx                    // 首页教授列表
├── professors/[slug]/page.tsx  // 教授详情页
├── lib/
│   ├── mock-data.ts            // ❌ 删除
│   ├── supabase.ts             // ✅ 新增 Supabase client
│   └── api/
│       ├── professors.ts       // ✅ 新增 API 层
│       └── reviews.ts          // ✅ 重构 reviews API
```

**API 设计：**
```typescript
// lib/api/professors.ts
export async function getProfessors(filters: {
  university?: string
  department?: string
  search?: string
  page?: number
}) {
  const supabase = createClient()
  
  let query = supabase
    .from('professors')
    .select(`
      *,
      university:universities(name, short_name),
      courses:professor_courses(course:courses(*))
    `)
  
  if (filters.university) {
    query = query.eq('university.short_name', filters.university)
  }
  
  // ... 其他筛选逻辑
  
  return query
}
```

**产出：**
- [ ] Supabase client 配置
- [ ] API 层实现
- [ ] 前端组件更新
- [ ] 删除所有 Mock 数据引用

---

### Task 4: UGC 激励机制（P0，5 天）

**目标：** 启动「查看评价需先贡献」机制

**Product 设计方案：**
```
用户首次访问 → 可查看 3 个教授评价（免费）
第 4 个教授 → 弹窗："贡献 1 条评价，解锁无限查看"
提交评价后 → 永久解锁（存储在 local storage）
```

**技术实现：**
```typescript
// lib/ugc-gate.ts
export function canViewProfessor(viewCount: number): boolean {
  const hasContributed = localStorage.getItem('has_contributed')
  if (hasContributed) return true
  return viewCount < 3
}

export function recordContribution() {
  localStorage.setItem('has_contributed', 'true')
  localStorage.setItem('contribution_date', new Date().toISOString())
}
```

**UI 组件：**
- [ ] `components/UGCGate.tsx`（贡献��示弹窗）
- [ ] `components/ContributionBadge.tsx`（已贡献标识）
- [ ] 首页添加「贡献评价」入口

**产出：**
- [ ] UGC Gate 实现
- [ ] 贡献流程优化
- [ ] 数据埋点（追踪转化率）

---

### Task 5: 留存监控 Dashboard（P1，3 天）

**目标：** 建立数据监控，追踪 PMF 指标

**关键指标（CEO 要求）：**
```
- DAU (Daily Active Users)
- MAU (Monthly Active Users)
- DAU/MAU 比例（目标 > 20%）
- 7-day Retention（目标 > 30%）
- 每周新增评价数（目标 > 20 条）
```

**技术方案：**
- 使用 Supabase Analytics（内置）
- 自定义事件追踪：
  - `page_view`（页面浏览）
  - `professor_view`（教授详情查看）
  - `review_submit`（评价提交）
  - `user_return`（用户回访）

**Dashboard 设计：**
```
/admin/dashboard
├─ 实时数据卡片（今日 DAU、新增评价）
├─ 留存曲线图（D1/D3/D7/D14/D30）
├─ 漏斗分析（访问 → 查看 → 贡献）
└─ 用户行为热力图
```

**产出：**
- [ ] Supabase Analytics 配置
- [ ] 自定义事件埋点
- [ ] Admin Dashboard 页面

---

## 🚀 技术实现细节（Fullstack 方案）

### 爬虫 POC 代码

```typescript
// scripts/scrape-adelaide.ts
import { chromium } from 'playwright'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

async function scrapeAdelaideProfessors() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  // 1. 访问 Staff Directory
  await page.goto('https://www.adelaide.edu.au/directory/')
  
  // 2. 搜索 "Computer Science"
  await page.fill('input[name="search"]', 'Computer Science')
  await page.click('button[type="submit"]')
  
  // 3. 提取教授列表
  const professors = await page.$$eval('.staff-card', (cards) => {
    return cards.map((card) => ({
      name: card.querySelector('h3')?.textContent?.trim(),
      title: card.querySelector('.title')?.textContent?.trim(),
      department: card.querySelector('.department')?.textContent?.trim(),
      email: card.querySelector('a[href^="mailto:"]')?.getAttribute('href')?.replace('mailto:', ''),
      profile_url: card.querySelector('a')?.href
    }))
  })
  
  // 4. 写入 Supabase
  for (const prof of professors) {
    await supabase.from('professors').insert({
      university_id: 'adelaide-uuid',
      name: prof.name,
      slug: generateSlug(prof.name),
      title: prof.title,
      department: prof.department,
      email: prof.email,
      profile_url: prof.profile_url
    })
  }
  
  await browser.close()
}
```

### 不需要清单（DHH 原则）

**❌ 不需要做的事情：**
- ~~分布式爬虫系统~~（单机够用）
- ~~Scrapy-Redis 集群~~（过度工程）
- ~~实时数据同步~~（每周更新即可）
- ~~微服务架构~~（Monolith 更简单）
- ~~GraphQL API~~（REST 够用）
- ~~Redis 缓存层~~（Supabase 自带缓存）
- ~~Kubernetes 部署~~（Vercel 足够）
- ~~消息队列~~（pg_cron 够用）

---

## 📅 30 天 Sprint 计划

### Week 1（Day 1-7）
- [ ] Task 1: Adelaide 数据爬取（7 天）
  - Day 1-2: 爬虫脚本开发
  - Day 3-4: 数据清洗与验证
  - Day 5-7: Supabase 导入

### Week 2（Day 8-14）
- [ ] Task 2: Schema 迁移（3 天）
- [ ] Task 3: 前端数据层重构（5 天开始）

### Week 3（Day 15-21）
- [ ] Task 3: 前端数据层重构（完成）
- [ ] Task 4: UGC 激励机制（5 天）

### Week 4（Day 22-30）
- [ ] Task 5: 留存监控 Dashboard（3 天）
- [ ] 测试与修复 Bug（3 天）
- [ ] 部署到生产环境（2 天）

---

## ✅ 成功指标（30 天后）

### 必须达成（P0）
- ✅ 真实数据覆盖率 > 80%（100+ 教授，50+ 课程）
- ✅ 所有 Mock 数据已删除
- ✅ UGC 评价系统上线
- ✅ 留存监控 Dashboard 可用

### 期望达成（P1）
- ✅ 每周新增评价 > 20 条
- ✅ 7-day retention > 10%（baseline）
- ✅ DAU > 50（Adelaide 学生）

### 延后指标（P2）
- ⏳ 7-day retention > 30%（90 天目标）
- ⏳ MAU > 500（90 天目标）

---

## 🔄 60-90 天后重新评估

**决策树：**
```
30 天后评估:
├─ 数据覆盖率 > 80% ✅
├─ 新增评价 > 20/周 ✅
└─ Retention > 10% ✅
    │
    ▼
60 天后评估:
├─ Retention > 25% ？
│   ├─ YES → 继续优化 Adelaide
│   └─ NO  → 深度用户访谈，迭代产品
│
▼
90 天后评估:
├─ Retention > 30% ？
│   ├─ YES → 考虑墨尔本单校扩展（Phase 7）
│   └─ NO  → Pivot 或关闭项目
```

---

## 📝 关键文档

### 已生成文档
1. **CEO 战略文档**  
   `docs/ceo/data-acquisition-strategy.md`（12KB）  
   核心结论：延后全澳扩展，验证 PMF

2. **CTO 架构文档**  
   `docs/cto/data-architecture.md`（详细技术方案）  
   Schema 设计 + 爬虫架构

3. **产品需求文档**  
   `docs/product/data-requirements.md`（待确认路径）  
   数据字段优先级 + 用户需求验证

4. **全栈实现文档**  
   `docs/fullstack/implementation-plan.md`（待确认路径）  
   POC 代码 + 技术选型

---

## 💡 Bezos 思维总结

> **"问题不是'我们能不能爬全澳数据？'  
> 问题是'Adelaide 用户为什么要第二次打开我们？'"**

**Day 1 思维：**
- ✅ Customer Obsession（专注 Adelaide 学生真实需求）
- ✅ 长期主义（宁可慢一点，也要做对）
- ✅ 高速决策（30 天 Sprint，快速验证）
- ❌ 不追求虚荣指标（8 校很酷，但无意义）

**单向门测试：**
- 扩展全澳 = 单向门（不可逆）
- Adelaide PMF 验证 = 双向门（可调整）
- **结论：先走双向门**

---

## 🎯 下一步行动（立即执行）

### 今天（2026-02-11）
1. ✅ 确认 Phase 6 计划
2. ⏳ 创建 GitHub Issue Tracker
3. ⏳ 环境变量配置（Supabase credentials）

### 明天（2026-02-12）
1. ⏳ 开始 Task 1：编写 Adelaide 爬虫脚本
2. ⏳ 设置 Supabase 项目

### 本周内（2026-02-17 前）
1. ⏳ 完成首批 50 个教授数据爬取
2. ⏳ Schema 迁移脚本测试

---

**计划版本:** v1.0  
**生成时间:** 2026-02-11 07:22 ACST  
**下次评审:** 2026-02-18（Week 1 结束）
