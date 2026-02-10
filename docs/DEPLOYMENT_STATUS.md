# OhMyProfessors - 部署状态与配置

**更新时间:** 2026-02-10  
**状态:** ✅ 已部署（生产环境）

---

## 📍 部署信息

### **生产环境**

| 服务 | URL | 状态 |
|------|-----|------|
| **网站** | https://ohmyprofessors.com | ✅ 已部署 |
| **Vercel** | https://vercel.com/markhz/ohmyprofessors_web | ✅ 活跃 |
| **Supabase** | https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo | ✅ 活跃 |

### **项目标识符**

```bash
# Supabase
PROJECT_ID: bybpdituoktqmhpsssbo
REGION: Sydney (ap-southeast-2)
URL: https://bybpdituoktqmhpsssbo.supabase.co

# Vercel
ORG: markhz
PROJECT: ohmyprofessors_web
DOMAIN: ohmyprofessors.com

# Git Repository
# (需确认 GitHub/GitLab 仓库地址)
```

---

## 🔧 配置清单

### **Step 1: 获取 Supabase 凭证**

1. 访问 [Supabase API Settings](https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/settings/api)
2. 复制以下内容：

```bash
# Project URL
NEXT_PUBLIC_SUPABASE_URL=https://bybpdituoktqmhpsssbo.supabase.co

# anon/public key
NEXT_PUBLIC_SUPABASE_ANON_KEY=[从 Dashboard 复制]

# service_role key (仅服务端，勿泄露)
SUPABASE_SERVICE_ROLE_KEY=[从 Dashboard 复制]
```

### **Step 2: 配置 Vercel 环境变量**

1. 访问 [Vercel Project Settings](https://vercel.com/markhz/ohmyprofessors_web/settings/environment-variables)
2. 添加以下变量（适用于 Production, Preview, Development）：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL = https://bybpdituoktqmhpsssbo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = [从 Supabase 复制]
SUPABASE_SERVICE_ROLE_KEY = [从 Supabase 复制，仅加密存储]

# App
NEXT_PUBLIC_APP_URL = https://ohmyprofessors.com

# Node
NODE_ENV = production
```

3. 点击 **Redeploy** 使配置生效

### **Step 3: 验证域名配置**

1. 访问 [Vercel Domains](https://vercel.com/markhz/ohmyprofessors_web/settings/domains)
2. 确认 `ohmyprofessors.com` 已添加并生效
3. 验证 SSL 证书状态（应为 ✅ Valid）

---

## 🗄️ 数据库配置状态

### **当前 Schema 状态**

**检查清单:**
- [ ] 已执行完整 DDL（7 个核心表）
- [ ] 已启用 Row-Level Security（RLS）
- [ ] 已创建 16 个索引
- [ ] 已配置触发器（评分自动计算）
- [ ] 已设置 Auth 回调 URL

### **执行 Schema（如未完成）**

1. 访问 [Supabase SQL Editor](https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/sql)
2. 复制 `docs/CTO_ARCHITECTURE.md` 第 3 节的完整 DDL
3. 执行 SQL
4. 验证表创建成功：

```sql
-- 检查所有表
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- 应返回:
-- professor_tags
-- professors
-- profiles
-- review_votes
-- reviews
-- saved_professors
-- universities
```

---

## 🔐 Auth 配置

### **Supabase Auth 设置**

1. 访问 [Authentication Settings](https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/auth/url-configuration)
2. 配置 **Redirect URLs:**

```
# Site URL
https://ohmyprofessors.com

# Redirect URLs (逗号分隔)
https://ohmyprofessors.com/auth/callback
http://localhost:3000/auth/callback
```

3. 配置 **Email Auth:**
   - 启用 Email OTP（无密码登录）
   - 自定义邮件模板（可选）

4. 配置 **Email Provider:**
   - 可选择 Supabase 内置 SMTP 或自定义（Resend/SendGrid）

---

## 📊 当前部署架构

```
┌─────────────────────────────────────┐
│  ohmyprofessors.com                 │
│  (Vercel Edge Network)              │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  Next.js 16 App                     │
│  (Static + ISR + SSR)               │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  Supabase (Sydney)                  │
│  - PostgreSQL                       │
│  - Auth Service                     │
│  - Storage                          │
└─────────────────────────────────────┘
```

---

## ✅ 部署验证清单

### **必须验证（立即）**

- [ ] **网站可访问**: 访问 https://ohmyprofessors.com 是否正常加载
- [ ] **Supabase 连接**: 检查浏览器控制台是否有连接错误
- [ ] **Auth 流程**: 测试邮箱注册/登录是否正常
- [ ] **SSL 证书**: 检查 HTTPS 是否有效
- [ ] **环境变量**: Vercel 环境变量是否正确配置

### **应该验证（本周）**

- [ ] **数据库 Schema**: 7 个表是否已创建
- [ ] **RLS 策略**: Row-Level Security 是否启用
- [ ] **索引优化**: 16 个索引是否存在
- [ ] **触发器**: 评分自动计算是否工作
- [ ] **备份策略**: Supabase 自动备份是否启用

### **可选验证（本月）**

- [ ] **性能监控**: Vercel Analytics 数据
- [ ] **错误追踪**: Sentry 或 Vercel 错误日志
- [ ] **SEO**: Google Search Console 提交
- [ ] **CDN**: 静态资源是否通过 Vercel Edge 分发
- [ ] **邮件发送**: Auth 邮件是否正常到达

---

## 🚨 常见问题排查

### **问题 1: 网站显示 404**
**原因:** Vercel 部署失败或域名未正确配置  
**解决:**
```bash
# 检查 Vercel 部署日志
# https://vercel.com/markhz/ohmyprofessors_web/deployments

# 检查域名 DNS
nslookup ohmyprofessors.com

# 确认 Vercel 域名设置
# https://vercel.com/markhz/ohmyprofessors_web/settings/domains
```

### **问题 2: Supabase 连接错误**
**原因:** 环境变量未配置或 URL 错误  
**解决:**
```bash
# 验证环境变量
# Vercel Dashboard → Environment Variables

# 检查浏览器控制台
# 应看到: "Supabase initialized"
# 错误如: "Invalid API key" 说明 ANON_KEY 错误
```

### **问题 3: Auth 回调失败**
**原因:** Redirect URL 未添加到 Supabase 白名单  
**解决:**
```bash
# Supabase Dashboard → Authentication → URL Configuration
# 添加: https://ohmyprofessors.com/auth/callback
```

### **问题 4: 数据库查询失败**
**原因:** Schema 未创建或 RLS 策略过于严格  
**解决:**
```sql
-- 检查表是否存在
SELECT * FROM professors LIMIT 1;

-- 临时禁用 RLS 测试（仅开发环境）
ALTER TABLE professors DISABLE ROW LEVEL SECURITY;
```

---

## 📈 下一步行动

### **立即执行（今天）**

1. ✅ **验证网站可访问性**
   ```bash
   curl -I https://ohmyprofessors.com
   # 应返回 200 OK
   ```

2. ✅ **获取 Supabase 凭证**
   - 访问 [API Settings](https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/settings/api)
   - 复制 URL 和 Keys

3. ✅ **配置 Vercel 环境变量**
   - 添加 `NEXT_PUBLIC_SUPABASE_URL`
   - 添加 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - 添加 `SUPABASE_SERVICE_ROLE_KEY`
   - **Redeploy**

4. ✅ **验证 Auth 配置**
   - Redirect URLs 已添加
   - Email Auth 已启用

---

### **本周执行**

5. ✅ **执行数据库 Schema**
   - SQL Editor → 粘贴 DDL
   - 验证表创建成功

6. ✅ **导入初始数据**
   - Adelaide 大学信息
   - 500 个教授基础资料（姓名、学院）

7. ✅ **测试完整流程**
   - 注册 → 登录 → 搜索教授 → 提交评价

8. ✅ **配置监控**
   - Vercel Analytics（已自动启用）
   - Supabase Logs & Monitoring

---

### **本月执行**

9. 📊 **SEO 基础设置**
   - Google Search Console 提交
   - Sitemap 生成
   - Robots.txt 配置

10. 🔒 **安全加固**
    - Rate Limiting（Upstash Redis）
    - CORS 配置
    - Content Security Policy

11. 📧 **邮件服务配置**
    - Resend 或 SendGrid
    - 自定义邮件模板

12. 💾 **备份策略**
    - Supabase 自动备份验证
    - 数据导出脚本

---

## 🔗 快速链接

### **管理面板**
- [Vercel Dashboard](https://vercel.com/markhz/ohmyprofessors_web)
- [Supabase Dashboard](https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo)
- [Domain Registrar](https://ohmyprofessors.com) (需确认注册商)

### **开发资源**
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)

### **项目文档**
- `docs/CEO_STRATEGY.md` - 战略规划
- `docs/CTO_ARCHITECTURE.md` - 技术架构
- `docs/ROADMAP.md` - 实施路线图

---

## 📝 变更日志

### 2026-02-10
- ✅ 更新 `.env.example` 为真实 Supabase URL
- ✅ 创建部署状态文档
- 📝 待办：验证数据库 Schema 执行状态
- 📝 待办：配置 Vercel 环境变量

---

**文档维护者:** PA (Main Orchestrator)  
**下次更新:** Schema 执行后或重大配置变更时  
**紧急联系:** 参考项目 README.md
