# OhMyProfessors - Enterprise Architecture Summary

## 📋 项目概述

**技术栈:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 + Supabase

**当前状态:** ✅ 架构设计完成，准备开发

---

## 🏗️ 架构要点

### 1. 系统架构分层
```
Client Layer (Next.js 16 + React 19)
    ↓
Caching Layer (Next.js ISR + CDN)
    ↓
API Layer (Route Handlers + Server Actions)
    ↓
Database Layer (Supabase PostgreSQL + RLS)
```

### 2. 前端架构
- **路由结构:** App Router route groups
  - `(auth)` - 认证页面
  - `(marketing)` - 公开页面
  - `(dashboard)` - 受保护路由
- **组件分层:** Atomic Design
  - `ui/` - shadcn/ui 原子组件
  - `common/` - 共享分子组件
  - `features/` - 功能特定组件
  - `layouts/` - 布局组件

### 3. 数据模型设计
**核心表:**
- `users` - 用户信息（扩展 Supabase auth）
- `universities` - 大学信息
- `professors` - 教授档案 + 聚合评分
- `reviews` - 学生评价
- `review_votes` - 评价投票（防止重复）
- `saved_professors` - 用户收藏

**关键特性:**
- ✅ Row-Level Security (RLS) 全表启用
- ✅ 自动触发器计算教授评分
- ✅ 索引优化（全文搜索、评分排序）
- ✅ Soft delete（保留数据完整性）

### 4. 缓存策略
| 路由类型 | 渲染方式 | 缓存时长 | 适用场景 |
|---------|---------|---------|---------|
| 首页 | SSG | Static | 营销内容 |
| 教授列表 | SSR | 无缓存 | 实时搜索 |
| 教授详情 | ISR | 60s | 教授档案 |
| API | Dynamic | 自定义 | API 端点 |

### 5. 性能目标
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1
- **Bundle Size:** < 250KB (gzipped)

---

## 📁 目录结构

```
ohmyprofessors/
├── app/                      # Next.js App Router
│   ├── (auth)/              # 认证路由组
│   ├── (marketing)/         # 公开路由组
│   ├── (dashboard)/         # 受保护路由组
│   └── api/                 # API 路由
├── components/              # React 组件
│   ├── ui/                  # shadcn/ui 组件
│   ├── common/              # 共享组件
│   ├── features/            # 功能组件
│   └── layouts/             # 布局组件
├── lib/                     # 核心库
│   ├── supabase/           # Supabase 客户端
│   ├── validations/        # Zod 验证模式
│   ├── utils/              # 工具函数
│   └── constants/          # 常量配置
├── hooks/                   # 自定义 Hooks
├── types/                   # TypeScript 类型
├── actions/                 # Server Actions
├── supabase/               # 数据库迁移
│   └── migrations/
└── docs/                    # 文档
    └── CTO_ARCHITECTURE.md  # 完整架构文档
```

---

## 🚀 快速开始

### 1. 环境配置
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑 .env.local 填入 Supabase 凭证
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 2. 安装依赖
```bash
# 安装基础依赖
npm install

# 安装推荐依赖（见 docs/DEPENDENCIES.md）
npm install @supabase/supabase-js @supabase/ssr react-hook-form @hookform/resolvers zod sonner
```

### 3. 数据库设置
```bash
# 如果使用本地 Supabase（需要 Docker）
npx supabase start
npx supabase db reset

# 或在 Supabase 云端执行
# 复制 docs/CTO_ARCHITECTURE.md 中的完整 SQL schema
```

### 4. 生成类型
```bash
# 从 Supabase 生成 TypeScript 类型
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
```

### 5. 启动开发服务器
```bash
npm run dev
# 打开 http://localhost:3000
```

---

## 📚 关键文档

- **[CTO_ARCHITECTURE.md](./docs/CTO_ARCHITECTURE.md)** - 完整架构设计（必读）
- **[DEPENDENCIES.md](./docs/DEPENDENCIES.md)** - 依赖管理指南
- **Database Schema** - 见 CTO_ARCHITECTURE.md 第 3 节
- **API Documentation** - 待创建

---

## 🛠️ 开发规范

### TypeScript 严格模式
```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

### Git 工作流
```
main            # 生产环境
develop         # 开发环境
feature/<name>  # 新功能
bugfix/<name>   # Bug 修复
```

### 提交规范（Conventional Commits）
```
feat: add professor search filter
fix: resolve rating calculation bug
docs: update API documentation
style: format code with prettier
refactor: optimize database queries
test: add review form tests
```

---

## 🔒 安全特性

- ✅ Row-Level Security (RLS) 强制执行
- ✅ Zod 验证所有用户输入
- ✅ JWT 认证（Supabase Auth）
- ✅ HTTPS 强制（Vercel 自动）
- ✅ Rate limiting（生产环境推荐）
- ✅ GDPR 兼容（软删除 + 数据导出）

---

## 📊 监控 & 分析

- **Vercel Analytics** - 页面访问统计
- **Speed Insights** - Core Web Vitals
- **Sentry** - 错误追踪（可选）
- **Supabase Dashboard** - 数据库性能

---

## 🧪 测试策略

```bash
# 单元测试
npm run test

# E2E 测试
npm run test:e2e

# 类型检查
npm run type-check

# Lint
npm run lint
```

---

## 📦 部署

### Vercel（推荐）
```bash
# 连接到 Vercel
npx vercel

# 生产部署
npx vercel --prod
```

### 环境变量设置
在 Vercel Dashboard 中设置：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`（仅服务器）

---

## 🎯 下一步行动

### Phase 1: 基础设施（1-2周）
- [ ] 安装所有必需依赖
- [ ] 在 Supabase 执行完整数据库 schema
- [ ] 配置 ESLint + Prettier + Husky
- [ ] 实现认证流程

### Phase 2: 核心功能（3-5周）
- [ ] 教授列表 & 详情页
- [ ] 评价提交表单
- [ ] 搜索 & 筛选功能
- [ ] 用户个人资料

### Phase 3: 优化（6-7周）
- [ ] 图片优化
- [ ] SEO 优化（metadata, sitemap）
- [ ] 性能审计
- [ ] 缓存策略实施

### Phase 4: 上线准备（8周）
- [ ] 无障碍审计
- [ ] 跨浏览器测试
- [ ] 负载测试
- [ ] 文档完善

---

## 🤝 贡献指南

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

---

## 📄 许可证

MIT License - 详见 LICENSE 文件

---

## 📞 联系方式

- **项目负责人:** CTO Team
- **技术支持:** [创建 GitHub Issue](https://github.com/your-org/ohmyprofessors/issues)
- **文档:** [完整架构文档](./docs/CTO_ARCHITECTURE.md)

---

**最后更新:** 2026-02-10  
**架构版本:** 1.0
