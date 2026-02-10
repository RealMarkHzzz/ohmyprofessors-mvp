# 自动配置工具 - 使用指南

**工具:** `scripts/auto-config.js`  
**用途:** 通过 API 自动配置 Vercel 和 Supabase

---

## 🚀 快速使用

```bash
cd /Users/mark/.openclaw/workspace/projects/ohmyprofessors
node scripts/auto-config.js
```

**预计时间:** 5 分钟

---

## 📋 准备工作（在线获取 Token）

### **1. 获取 Vercel Token**

**步骤:**
1. 访问 👉 https://vercel.com/account/tokens
2. 点击 **"Create"** 按钮
3. Token Name: `OhMyProfessors Config`
4. Scope: **Full Account** (或选择 markhz team)
5. Expiration: `No Expiration` 或 `30 days`
6. 点击 **"Create Token"**
7. **立即复制** Token（只显示一次！）

**格式示例:**
```
vercel_1a2b3c4d5e6f7g8h9i0j...
```

---

### **2. 获取 Supabase Access Token**

**步骤:**
1. 访问 👉 https://supabase.com/dashboard/account/tokens
2. 点击 **"Generate new token"**
3. Token name: `OhMyProfessors Config`
4. 点击 **"Generate token"**
5. **立即复制** Token

**格式示例:**
```
sbp_1a2b3c4d5e6f7g8h9i0j...
```

---

### **3. 获取 Supabase Project Keys**

**步骤:**
1. 访问 👉 https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/settings/api
2. 复制两个 key:
   - **anon public** (绿色方框) - 点击复制图标
   - **service_role** (红色方框) - 点击 "Reveal" → 复制

**格式示例:**
```
anon public:     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role:    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🎬 执行流程

### **运行脚本**

```bash
node scripts/auto-config.js
```

### **交互式输入**

**提示 1:** `粘贴 Vercel Token:`
→ 粘贴步骤 1 的 Token

**提示 2:** `粘贴 Supabase Access Token:`
→ 粘贴步骤 2 的 Token

**提示 3:** `粘贴 anon public key:`
→ 粘贴步骤 3 的 anon key

**提示 4:** `粘贴 service_role key:`
→ 粘贴步骤 3 的 service_role key

---

## ✅ 自动执行内容

**脚本会自动:**
1. ✅ 添加 3 个环境变量到 Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. ✅ 触发 Vercel 重新部署

3. ✅ 配置 Supabase Auth 回调 URL:
   - Site URL: `https://ohmyprofessors.com`
   - Redirect URLs: `https://ohmyprofessors.com/auth/callback`

---

## 📊 预期输出

```
🚀 OhMyProfessors 自动配置工具

需要以下凭证:

📍 Step 1: Vercel 配置
访问: https://vercel.com/account/tokens
创建一个新的 Token (名称: OhMyProfessors Config)

粘贴 Vercel Token: [输入...]

📍 Step 2: Supabase 配置
访问: https://supabase.com/dashboard/account/tokens
创建一个新的 Access Token

粘贴 Supabase Access Token: [输入...]

📍 Step 3: Supabase Project Keys
访问: https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/settings/api

粘贴 anon public key: [输入...]
粘贴 service_role key: [输入...]

⚙️  开始自动配置...

1️⃣  配置 Vercel 环境变量...
   ✓ 项目 ID: prj_abc123...
   ✓ NEXT_PUBLIC_SUPABASE_URL 已添加
   ✓ NEXT_PUBLIC_SUPABASE_ANON_KEY 已添加
   ✓ SUPABASE_SERVICE_ROLE_KEY 已添加

2️⃣  触发 Vercel 重新部署...
   ✓ Redeploy 已触发: https://ohmyprofessors-xxx.vercel.app

3️⃣  配置 Supabase Auth 设置...
   ✓ Auth 回调 URL 已配置

✅ 配置完成！

📋 接下来的步骤:

1. 等待 Vercel 重新部署 (2-3 分钟)
   查看: https://vercel.com/markhz/ohmyprofessors_web/deployments

2. 验证网站: https://ohmyprofessors.com

3. 执行数据库 Schema:
   https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/sql/new
   复制 docs/CTO_ARCHITECTURE.md 第 3 节 SQL 并执行
```

---

## ⚠️ 常见问题

### **Q: Vercel API 返回 403 Forbidden**
**A:** Token 权限不足，重新创建 Token 并选择 **Full Account** scope

### **Q: Supabase Auth 配置失败**
**A:** API 可能不支持此配置，手动配置：
- https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/auth/url-configuration

### **Q: 环境变量已存在错误**
**A:** 正常情况，说明之前已添加，可以忽略或手动删除后重新运行

---

## 🔒 安全提示

- ✅ Token 只在本地使用，不会上传
- ✅ service_role key 仅添加到 Production 环境
- ✅ 使用完毕后可删除 Tokens
- ⚠️ 不要将 Tokens 提交到 Git

---

## 📞 需要帮助

如果脚本失败，可以手动配置：
- 参考: `docs/QUICK_START.md`
- 或执行: `./scripts/setup-deployment.sh` (需本地 Vercel CLI)

---

**工具版本:** 1.0  
**最后更新:** 2026-02-10
