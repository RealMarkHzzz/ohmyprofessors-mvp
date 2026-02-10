# Design Specification - Oh My Professors

## 1. 技术栈 (Tech Stack)
- **Frontend**: Next.js (App Router) - 提供高性能的 SSR/ISR 渲染。
- **Backend/Database**: Supabase - 集成 Auth, PostgreSQL, Storage。
- **Data Layer**: Python - 用于爬虫 (Scraper) 和数据分析 (Analytics)。

## 2. 核心数据库 Schema (Core Database Schema)

### `universities`
- `id`: uuid (PK)
- `name`: text
- `country`: text

### `professors`
- `id`: uuid (PK)
- `university_id`: uuid (FK)
- `name`: text
- `department`: text
- `rating_avg`: float
- `review_count`: int

### `reviews`
- `id`: uuid (PK)
- `professor_id`: uuid (FK)
- `user_id`: uuid (FK)
- `rating`: int
- `difficulty`: int
- `comment`: text
- `created_at`: timestamp

## 3. API 接口概览 (API Overview)

### Public APIs (Next.js Routes)
- `GET /api/professors`: 搜索与筛选教授列表。
- `GET /api/professors/[id]`: 获取教授详细评价与统计。
- `POST /api/reviews`: 提交新评价 (需 Auth)。

### Internal APIs (Python/Supabase Functions)
- `POST /internal/scrape`: 触发特定学校数据更新。
- `GET /internal/analytics`: 导出教授多维分析报告。
