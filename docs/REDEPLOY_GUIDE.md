# 完整重新部署指南 - 纯网页端操作

**目标:** 删除旧项目 → 创建新项目 → 部署企业级架构  
**方式:** 100% 网页端操作（无需本地访问）  
**耗时:** 约 20 分钟

---

## ⚠️ 警告

**此操作将永久删除：**
- Vercel 项目: `ohmyprofessors_web`
- Supabase 项目: `bybpdituoktqmhpsssbo`
- 所有现有数据和配置

**建议先备份重要数据！**

---

## 📋 完整操作清单

### **Phase 1: 删除旧项目 (5 分钟)**

#### **1.1 删除 Vercel 项目**

1. 访问 👉 https://vercel.com/markhz/ohmyprofessors_web/settings/advanced
2. 滚动到底部 → 找到 **"Delete Project"**
3. 输入项目名称确认: `ohmyprofessors_web`
4. 点击 **"Delete"**

✅ **Vercel 项目已删除**

---

#### **1.2 删除 Supabase 项目**

1. 访问 👉 https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/settings/general
2. 滚动到底部 → 找到 **"Delete project"**
3. 输入项目名称确认: `bybpdituoktqmhpsssbo`
4. 点击 **"I understand, delete this project"**

✅ **Supabase 项目已删除**

---

### **Phase 2: 创建新 Supabase 项目 (5 分钟)**

#### **2.1 创建项目**

1. 访问 👉 https://supabase.com/dashboard/projects
2. 点击 **"New project"**
3. 填写信息:
   - **Name:** `OhMyProfessors`
   - **Database Password:** 生成强密码（保存到安全地方！）
   - **Region:** `Sydney (ap-southeast-2)`
   - **Pricing Plan:** `Free`
4. 点击 **"Create new project"**
5. 等待 2-3 分钟（项目创建中...）

✅ **Supabase 项目创建完成**

---

#### **2.2 获取项目信息**

**项目创建完成后：**

1. 记录 **Project ID**（从 URL 获取）
   ```
   https://supabase.com/dashboard/project/[这里是Project ID]
   ```
   
2. 访问 API Settings 👉 https://supabase.com/dashboard/project/[你的Project ID]/settings/api

3. 复制并保存以下信息：
   - **Project URL:** `https://[project-id].supabase.co`
   - **anon public key:** (绿色方框)
   - **service_role key:** (红色方框，点击 Reveal)

**保存格式示例：**
```
Project ID: xyz123abc456
Project URL: https://xyz123abc456.supabase.co
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

#### **2.3 ���置 Auth**

1. 访问 👉 https://supabase.com/dashboard/project/[你的Project ID]/auth/url-configuration

2. 填写：
   - **Site URL:** `https://ohmyprofessors.com`
   - **Redirect URLs:**
     ```
     https://ohmyprofessors.com/auth/callback,
     http://localhost:3000/auth/callback
     ```
3. 点击 **"Save"**

---

#### **2.4 启用 Email Auth**

1. 访问 👉 https://supabase.com/dashboard/project/[你的Project ID]/auth/providers
2. 确认 **Email** 已启用（绿色开关）
3. 启用 **"Email OTP"**（推荐）
4. 点击 **"Save"**

---

#### **2.5 执行数据库 Schema**

1. 访问 👉 https://supabase.com/dashboard/project/[你的Project ID]/sql/new

2. 复制以下完整 SQL（我会在下面提供）

3. 粘贴到 SQL Editor

4. 点击 **"Run"** 执行

**SQL Schema:** 见本文档末尾 "附录 A: 数据库 Schema"

---

### **Phase 3: 创建新 Vercel 项目 (5 分钟)**

#### **3.1 从 Git 导入项目**

**如果有 GitHub 仓库：**

1. 访问 👉 https://vercel.com/new
2. 选择 **"Import Git Repository"**
3. 选择你的仓库（需要先连接 GitHub）
4. 项目配置：
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** 默认
   - **Output Directory:** 默认
5. 点击 **"Deploy"**

**如果没有 GitHub 仓库（上传代码）：**

**方式 A: 先推送到 GitHub**
```bash
# 本地执行（如果可访问）
cd /Users/mark/.openclaw/workspace/projects/ohmyprofessors
git init
git add .
git commit -m "Initial commit: Enterprise-grade architecture"
git remote add origin https://github.com/markhz/ohmyprofessors.git
git push -u origin main
```

然后回到 Vercel 从 GitHub 导入。

**方式 B: 使用 Vercel CLI**（需本地访问，见 `redeploy-fresh.sh` 脚本）

---

#### **3.2 配置环境变量**

**部署完成后：**

1. 访问 👉 https://vercel.com/markhz/[项目名]/settings/environment-variables

2. 添加 4 个变量：

| Key | Value | Environments |
|-----|-------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://[你的Project ID].supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `[从 Supabase 复制]` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `[从 Supabase 复制]` | Production only |
| `NEXT_PUBLIC_APP_URL` | `https://ohmyprofessors.com` | Production |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | Preview, Development |

3. 添加完成后，点击顶部 **"Redeploy"**

---

#### **3.3 配置域名**

1. 访问 👉 https://vercel.com/markhz/[项目名]/settings/domains

2. 添加域名：
   - 输入: `ohmyprofessors.com`
   - 点击 **"Add"**

3. 如果域名已在其他项目，先删除旧绑定

4. 等待 DNS 生效（可能需要几分钟）

---

### **Phase 4: 验证部署 (5 分钟)**

#### **4.1 验证网站**

1. 访问 👉 https://ohmyprofessors.com
2. 确认页面正常加载（非 404）
3. 打开浏览器控制台（F12）
4. 查看是否有错误

---

#### **4.2 测试认证**

1. 点击 **"Sign Up"** 或 **"Register"**
2. 输入邮箱（建议用 .edu.au 测试）
3. 检查邮箱收到验证码
4. 输入验证码完成注册

---

#### **4.3 测试核心功能**

- [ ] 搜索教授
- [ ] 查看教授详情
- [ ] 提交评价
- [ ] 查看评价列表

---

## ✅ 完成检查清单

### **Supabase 配置**
- [ ] 项目已创建
- [ ] Auth 回调 URL 已配置
- [ ] Email Auth 已启用
- [ ] 数据库 Schema 已执行（7 个表）

### **Vercel 配置**
- [ ] 项目已创建并部署
- [ ] 4 个环境变量已添加
- [ ] 域名已绑定
- [ ] 已触发 Redeploy

### **功能验证**
- [ ] 网站可访问
- [ ] 注册流程正常
- [ ] 登录流程正常
- [ ] 核心功能正常

---

## 📊 新项目信息记录

**填写以下信息：**

```
Supabase:
  - Project ID: ___________________
  - URL: https://___________________.supabase.co
  - Dashboard: https://supabase.com/dashboard/project/___________________

Vercel:
  - Project Name: ___________________
  - URL: https://___________________.vercel.app
  - Domain: https://ohmyprofessors.com
  - Dashboard: https://vercel.com/markhz/___________________

Database Password: ___________________ (保存到密码管理器！)
```

---

## 🚨 故障排查

### **问题 1: Vercel 部署失败**
**查看日志:**
- https://vercel.com/markhz/[项目名]/deployments
- 点击失败的部署 → 查看 "Build Logs"

**常见原因:**
- 环境变量未配置
- Next.js 版本不兼容
- TypeScript 编译错误

### **问题 2: Supabase 连接错误**
**检查:**
- 环境变量是否正确（URL 和 Keys）
- Vercel 是否已 Redeploy
- 浏览器控制台是否有 CORS 错误

### **问题 3: Auth 回调失败**
**检查:**
- Redirect URLs 是否包含正确的域名
- Site URL 是否正确
- Email Provider 是否已启用

---

## 📞 获取帮助

**文档参考:**
- `docs/QUICK_START.md` - 快速启动指南
- `docs/CTO_ARCHITECTURE.md` - 技术架构
- `docs/DEPLOYMENT_STATUS.md` - 部署状态

**社区支持:**
- Vercel: https://vercel.com/support
- Supabase: https://supabase.com/support

---

## 附录 A: 数据库 Schema

**⚠️ 此 SQL 较长（约 200 行），请等待生成...**

*我会在你确认要执行时单独生成完整 SQL*

---

**文档版本:** 2.0  
**最后更新:** 2026-02-10  
**预计耗时:** 20 分钟
