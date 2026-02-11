# OhMyProfessors - Supabase Integration Guide

## Task 3 Complete: Frontend Data Layer Migration ✅

已完成从 Mock 数据切换到 Supabase 的前端数据层重构。

### 已实现的功能

#### 1. Supabase Client 配置
- ✅ Server Component Client (`lib/supabase/server.ts`)
- ✅ Browser Client (`lib/supabase/client.ts`)
- ✅ TypeScript 类型定义 (`types/database.ts`, `types/models.ts`)

#### 2. API 层实现
- ✅ `lib/api/professors.ts` - 教授数据 API
  - `getProfessors(filters)` - 获取教授列表（支持筛选）
  - `getProfessorBySlug(slug)` - 获取单个教授详情
  - `searchProfessors(query)` - 搜索教授
  - `getAllDepartments()` - 获取所有院系
  - `getAllTags()` - 获取所有标签
  
- ✅ `lib/api/reviews.ts` - 评价数据 API
  - `getReviewsByProfessorId(id)` - 获取教授的评价
  - `getRatingDistribution(id)` - 获取评分分布
  - `getAllReviews()` - 获取所有评价（用于首页统计）
  - `createReview(review)` - 创建新评价

#### 3. 前端组件更新
- ✅ `app/page.tsx` - 首页（Server Component，服务端数据获取）
- ✅ `components/home/ProfessorListClient.tsx` - 教授列表（Client Component）
- ✅ `app/professors/[slug]/page.tsx` - 教授详情页（Server Component）
- ✅ `app/professors/[slug]/page-client.tsx` - 详情页客户端逻辑

#### 4. 数据映射
将 Supabase 数据库字段映射到前端接口：
```typescript
// Database → Frontend
full_name → name
profile_image_url → avatar_url
rating_overall → overall_rating
rating_difficulty → difficulty_rating
research_interests → tags
```

### 配置步骤

#### 1. 设置 Supabase 项目

1. 访问 https://supabase.com/dashboard
2. 创建新项目或选择现有项目
3. 运行数据库迁移脚本（在 `supabase/migrations/` 目录）

#### 2. 配置环境变量

复制 `.env.local.example` 到 `.env.local`:

```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 并填入你的 Supabase 凭证：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**获取凭证：**
1. 进入 Supabase 项目仪表盘
2. Settings → API
3. 复制 "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
4. 复制 "anon public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### 3. 导入教授数据

你需要将爬取的 39 位 Adelaide 教授数据导入 Supabase。

有两种方式：

**方式 A: 使用 Supabase Dashboard**
1. 进入 Table Editor → `professors`
2. 点击 "Insert" → "Insert row"
3. 手动录入或批量导入

**方式 B: 使用 SQL（推荐）**
创建一个脚本 `scripts/import-professors.sql`:
```sql
INSERT INTO professors (full_name, slug, department, title, email, office_location, profile_image_url, bio, research_interests, university_id)
VALUES 
  ('Dr. Sarah Chen', 'sarah-chen', 'Computer Science', 'Associate Professor', 'sarah.chen@adelaide.edu.au', ...),
  -- ... 其他教授数据
```

#### 4. 启动开发服务器

```bash
npm install
npm run dev
```

访问 http://localhost:3000 查看效果。

### 架构设计（DHH 原则）

#### ✅ 简单直接
- 使用 Supabase JS Client（官方推荐）
- Server Components 优先（Next.js 15 最佳实践）
- 避免复杂的状态管理（无 Redux/Zustand）

#### ✅ 数据流
```
Server Component → Supabase API → Client Component (props)
                                ↓
                         Client-side filtering/sorting
```

#### ✅ 类型安全
- Database types 从 Supabase 生成
- API 层映射到前端友好的接口
- TypeScript 全覆盖

### 文件结构

```
lib/
├── api/
│   ├── professors.ts    # 教授 API 层
│   └── reviews.ts       # 评价 API 层
├── supabase/
│   ├── client.ts        # Browser Client
│   ├── server.ts        # Server Client
│   └── middleware.ts    # Auth middleware
└── search-utils.ts      # 客户端筛选/排序工具

types/
├── database.ts          # Supabase 生成的类型
└── models.ts            # 业务模型类型

app/
├── page.tsx             # 首页 (Server Component)
└── professors/
    └── [slug]/
        ├── page.tsx         # 服务端包装器
        └── page-client.tsx  # 客户端逻辑

components/
└── home/
    └── ProfessorListClient.tsx  # 教授列表 (Client Component)
```

### 性能优化

1. **Server-side Rendering**: 首屏数据在服务端获取，SEO 友好
2. **Client-side Filtering**: 搜索/筛选在客户端执行，无需额外请求
3. **Selective Data Fetching**: 只获取需要的字段
4. **TypeScript Tree-shaking**: 类型定义不影响打包体积

### 待办事项

- [ ] 导入 39 位教授数据到 Supabase
- [ ] 导入评价数据
- [ ] 配置 Supabase Row Level Security (RLS)
- [ ] 实现用户认证（可选）
- [ ] 添加 Loading 状态（Suspense）
- [ ] 错误边��处理

### 测试验证

1. 启动项目：`npm run dev`
2. 访问首页：http://localhost:3000
3. 检查教授列表是否显示
4. 测试搜索/筛选功能
5. 点击教授卡片查看详情页
6. 检查评价是否正确显示

### 故障排查

**问题: "Failed to fetch professors"**
- 检查 `.env.local` 是否配置正确
- 确认 Supabase 项目是否启动
- 检查网络连接

**问题: "No professors found"**
- 确认数据已导入 Supabase
- 检查 `deleted_at` 字段是否为 null
- 查看浏览器 Console 日志

**问题: TypeScript 错误**
- 运行 `npm run build` 检查编译错误
- 确认所有类型定义正确

### 下一步

1. 运行迁移脚本创建数据库表
2. 导入教授数据
3. 配置环境变量
4. 测试所有功能
5. 部署到生产环境（Vercel）

---

**技术栈：**
- Next.js 15 (App Router)
- Supabase (PostgreSQL + JS Client)
- TypeScript
- Tailwind CSS
- GSAP (动画)

**代码质量：**
- ✅ TypeScript 类型安全
- ✅ 错误处理
- ✅ 代码注释完整
- ✅ 遵循 DHH 原则（简单 > 复杂）
