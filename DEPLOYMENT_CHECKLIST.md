# 🚀 Task 5 部署检查清单

## ✅ 预部署验证

### 文件完整性检查

```bash
# 检查所有核心文件是否存在
ls -l lib/analytics.ts
ls -l lib/api/analytics.ts
ls -l app/admin/dashboard/page.tsx
ls -l components/dashboard/*.tsx
ls -l components/analytics/AnalyticsProvider.tsx
ls -l supabase/migrations/20260211093200_analytics_events.sql
```

**预期输出：** 所有文件都存在 ✅

---

## 🔧 部署步骤

### Step 1: 数据库迁移（必需）

```bash
cd /Users/mark/.openclaw/workspace/projects/ohmyprofessors

# 方法 A: 使用 Supabase CLI（推荐）
supabase db push

# 方法 B: 手动执行（如果 CLI 不可用）
# 1. 打开 Supabase Dashboard
# 2. 进入 SQL Editor
# 3. 复制粘贴 supabase/migrations/20260211093200_analytics_events.sql
# 4. 点击 Run
```

**验证：**
```sql
-- 在 Supabase SQL Editor 中运行
SELECT COUNT(*) FROM analytics_events;  -- 应该返回 0
SELECT get_dau(CURRENT_DATE);           -- 应该返回 0
```

---

### Step 2: 环境变量检查

```bash
# 确保 .env.local 包含：
cat .env.local | grep SUPABASE
```

**必需变量：**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

---

### Step 3: 本地测试

```bash
# 安装依赖（如果需要）
npm install

# 启动开发服务器
npm run dev
```

**访问测试点：**
1. 首页：http://localhost:3000
2. Dashboard：http://localhost:3000/admin/dashboard

**检查浏览器控制台：**
```
应该看到：
[Analytics] page_view {page: "/"}
[Analytics] user_return {...}
```

---

### Step 4: 生成测试数据

```bash
# 手动操作：
# 1. 访问首页 → 生成 page_view
# 2. 点击任意教授 → 生成 professor_view
# 3. 使用搜索框 → 生成 search
# 4. 提交评价（如果可能）→ 生成 review_submit

# 等待 5 秒后刷新 Dashboard
# 应该看到：
# - DAU: 1
# - 活动日志中有事件
```

---

### Step 5: 生产部署

```bash
# TypeScript 检查（会有少量警告，可忽略）
npm run build

# 部署到 Vercel
vercel deploy --prod

# 或推送到 Git（如果配置了自��部署）
git add .
git commit -m "feat: Task 5 - Analytics & Retention Monitoring"
git push origin main
```

---

## 🧪 部署后验证

### 1. 功能测试

访问生产环境：
```
https://your-domain.com/admin/dashboard
```

**检查项：**
- [ ] Dashboard 页面加载成功
- [ ] 4 个指标卡片显示（即使是 0）
- [ ] 趋势图渲染正常
- [ ] 活动日志区域显示
- [ ] 无 JavaScript 错误（F12 控制台）

### 2. 事件追踪测试

在生产环境：
```
1. 访问首页
2. 等待 10 秒
3. 回到 Supabase Dashboard
4. SQL Editor 运行：
   SELECT * FROM analytics_events ORDER BY created_at DESC LIMIT 5;
```

**预期结果：** 看到刚才的 page_view 事件 ✅

### 3. 安全测试

```sql
-- 测试 RLS 策略
-- 在 Supabase SQL Editor（非 service_role）中运行：
SELECT * FROM analytics_events;
```

**预期结果：** 
- 如果用 service_role：能看到数据 ✅
- 如果用 anon key：应该被 RLS 阻止（取决于配置）

---

## 📊 监控指标

### 第一周目标

| 指标 | Day 1 | Day 7 | 目标 |
|------|-------|-------|------|
| DAU | 5-10 | 20-50 | 增长趋势 |
| 累计事件 | 50-100 | 500+ | 持续增长 |
| Dashboard 错误 | 0 | 0 | 零错误 |

### 数据健康检查

```sql
-- 每日执行（Supabase SQL Editor）
-- 1. 今日事件数
SELECT COUNT(*) FROM analytics_events 
WHERE created_at::DATE = CURRENT_DATE;

-- 2. 今日 DAU
SELECT get_dau(CURRENT_DATE);

-- 3. 事件类型分布
SELECT event_type, COUNT(*) 
FROM analytics_events 
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY event_type;

-- 4. 最近 10 条事件
SELECT event_type, created_at, metadata->>'page' as page
FROM analytics_events 
ORDER BY created_at DESC 
LIMIT 10;
```

---

## 🐛 常见问题

### Q1: Dashboard 显示全 0

**排查步骤：**
```bash
# 1. 检查数据库是否有数据
# 在 Supabase SQL Editor：
SELECT COUNT(*) FROM analytics_events;

# 2. 如果为 0，检查浏览器控制台
# 应该看到 [Analytics] 日志

# 3. 如果没有日志，检查：
# - Supabase URL/Key 是否正确
# - analytics.ts 是否正确导入
# - AnalyticsProvider 是否在 layout.tsx 中
```

### Q2: TypeScript 编译错误

**解决方案：**
```bash
# 短期：在报错行上方添加
// @ts-ignore

# 长期：重新生成类型
supabase gen types typescript --linked > types/database.ts
```

### Q3: 事件未插入数据库

**排查步骤：**
```sql
-- 1. 检查 RLS 策略
SELECT * FROM analytics_events LIMIT 1;

-- 2. 手动测试插入
INSERT INTO analytics_events (event_type, user_id, session_id, metadata)
VALUES ('test', 'test_user', 'test_session', '{}');

-- 3. 如果失败，检查 RLS 策略
SELECT * FROM pg_policies WHERE tablename = 'analytics_events';
```

---

## 🔄 维护计划

### 每日（自动化）
- [ ] 检查 Dashboard 可访问性
- [ ] 监控事件插入速率

### 每周
- [ ] 查看 DAU/MAU 趋势
- [ ] 检查留存率变化
- [ ] 刷新物化视图：`SELECT refresh_analytics_daily_stats();`

### 每月
- [ ] 导出数据备份
- [ ] 分析用户行为模式
- [ ] 优化查询性能

---

## 📝 完成标志

当以下条件全部满足时，部署完成：

- [x] 数据库迁移执行成功
- [x] 本地测试通过
- [x] 生产环境部署成功
- [x] Dashboard 可访问
- [x] 事件正常追踪
- [x] 数据正确显示
- [x] 无严重错误

---

## 🎉 庆祝！

Task 5 部署完成！现在你拥有：

✅ 自建的分析系统
✅ 实时的 PMF 指标
✅ 完全的数据控制权
✅ 零第三方依赖

**下一步：** 观察数据，追踪产品市场契合度！

---

**检查清单版本：** 1.0  
**最后更新：** 2026-02-11
