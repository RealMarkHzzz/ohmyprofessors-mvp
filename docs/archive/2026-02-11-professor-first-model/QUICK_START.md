# OhMyProfessors - 立即行动清单

**生成时间:** 2026-02-10 19:41 ACST  
**部署状态:** ✅ 已部署（Vercel + Supabase）  
**网址:** https://ohmyprofessors.com

---

## 🚀 立即执行（5 分钟）

### **Step 1: 获取 Supabase 凭证**

访问 👉 https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/settings/api

复制以下内容：

```bash
# 1. Project URL
https://bybpdituoktqmhpsssbo.supabase.co

# 2. anon public (绿色方框)
eyJhbGciOi...  （点击复制）

# 3. service_role (红色方框，勿泄露！)
eyJhbGciOi...  （点击复制）
```

---

### **Step 2: 配置 Vercel 环境变量**

访问 👉 https://vercel.com/markhz/ohmyprofessors_web/settings/environment-variables

**添加 3 个变量：**

| Key | Value | Environments |
|-----|-------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://bybpdituoktqmhpsssbo.supabase.co` | ✅ Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `[从 Step 1 复制]` | ✅ Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `[从 Step 1 复制]` | ✅ Production only (加密) |

**操作：**
1. 点击 "Add" → 填写 Key/Value
2. 勾选适用环境
3. 点击 "Save"
4. 重复 3 次（3 个变量）
5. 点击顶部 **"Redeploy"** 按钮

---

### **Step 3: 验证网站状态**

打开浏览器：👉 https://ohmyprofessors.com

**预期结果：**
- ✅ 网站正常加载（非 404）
- ✅ 无浏览器控制台错误
- ✅ HTTPS 绿锁图标

**如果看到错误：**
- 等待 2-3 分钟（Vercel 重新部署中）
- 刷新页面（Ctrl+Shift+R 强制刷新）
- 查看 Vercel 部署日志

---

## 📊 今天完成（30 分钟）

### **Step 4: 执行数据库 Schema**

访问 👉 https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/sql/new

**操作：**
1. 打开本地文件：`docs/CTO_ARCHITECTURE.md`
2. 复制第 3 节 "Data Model (Supabase Schema)" 的完整 SQL
3. 粘贴到 SQL Editor
4. 点击 **"Run"** 按钮
5. 等待执行完成（~30 秒）

**验证：**
```sql
-- 在 SQL Editor 运行
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

**应返回 7 个表：**
- professor_tags
- professors
- profiles
- review_votes
- reviews
- saved_professors
- universities

---

### **Step 5: 配置 Auth 回调 URL**

访问 👉 https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/auth/url-configuration

**操作：**
1. **Site URL** 设置为：`https://ohmyprofessors.com`
2. **Redirect URLs** 添加（逗号分隔）：
   ```
   https://ohmyprofessors.com/auth/callback,
   http://localhost:3000/auth/callback
   ```
3. 点击 **"Save"**

---

### **Step 6: 启用 Email Auth**

访问 👉 https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/auth/providers

**操作：**
1. 找到 "Email" 提供商
2. 确认 **已启用**（绿色开关）
3. 启用 **"Email OTP"**（无密码登录，推荐）
4. 点击 **"Save"**

---

## 🧪 本周测试（1 小时）

### **Step 7: 端到端测试**

**测试流程：**

1. **注册流程**
   - 访问 https://ohmyprofessors.com
   - 点击 "Sign Up"
   - 输入 .edu.au 邮箱（如：test@adelaide.edu.au）
   - 检查邮箱收到验证码
   - 输入验证码完成注册

2. **登录流程**
   - 点击 "Log In"
   - 输入注册的邮箱
   - 收到 OTP 验证码
   - 输入完成登录

3. **核心功能**
   - 搜索教授（如果已有数据）
   - 查看教授详情页
   - 提交评价表单
   - 查看自己的评价

**记录测试结果：**
- [ ] 注册成功
- [ ] 邮件正常到达
- [ ] 登录成功
- [ ] 搜索功能正常
- [ ] 表单提交成功

---

### **Step 8: 导入初始数据（可选）**

如果需要测试数据，在 Supabase SQL Editor 运行：

```sql
-- 插入 Adelaide 大学
INSERT INTO universities (name, slug, location, website)
VALUES (
  'University of Adelaide',
  'university-of-adelaide',
  'Adelaide, SA',
  'https://www.adelaide.edu.au'
);

-- 插入示例教授
INSERT INTO professors (university_id, name, slug, department, email)
SELECT 
  id as university_id,
  'Dr. John Smith',
  'dr-john-smith',
  'Computer Science',
  'john.smith@adelaide.edu.au'
FROM universities
WHERE slug = 'university-of-adelaide';

-- 验证数据
SELECT * FROM universities;
SELECT * FROM professors;
```

---

## 📊 检查清单

### **部署配置（必须完成）**
- [ ] ✅ Vercel 环境变量已配置（Step 2）
- [ ] ✅ Vercel 已重新部署
- [ ] ✅ 网站可正常访问（Step 3）

### **数据库配置（必须完成）**
- [ ] ✅ Schema 已执行（7 个表创建成功，Step 4）
- [ ] ✅ Auth 回调 URL 已配置（Step 5）
- [ ] ✅ Email Auth 已启用（Step 6）

### **功能验证（本周完成）**
- [ ] 🔄 注册流程测试通过（Step 7）
- [ ] 🔄 登录流程测试通过
- [ ] 🔄 核心功能测试通过
- [ ] 🔄 初始数据已导入（Step 8，可选）

---

## 🚨 常见问题快速修复

### **Q1: Vercel 部署后仍报错 "Supabase not configured"**
**A:** 环境变量配置后需要 **Redeploy**，等待 2-3 分钟生效

### **Q2: 邮件收不到验证码**
**A:** 
1. 检查垃圾邮件文件夹
2. Supabase 默认使用内置 SMTP，可能被标记为垃圾邮件
3. 配置自定义邮件服务（Resend/SendGrid）

### **Q3: 数据库查询返回空**
**A:** 
1. 确认 Schema 执行成功（Step 4）
2. 检查 RLS 策略是否过于严格
3. 确认已插入测试数据（Step 8）

### **Q4: Auth 回调 404**
**A:** 确认 Redirect URLs 已添加（Step 5）

---

## 📞 获取帮助

**文档参考：**
- `docs/DEPLOYMENT_STATUS.md` - 完整部署指南
- `docs/CTO_ARCHITECTURE.md` - 技术架构
- `docs/CEO_STRATEGY.md` - 产品战略

**外部资源：**
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

**快速链接：**
- [Vercel Dashboard](https://vercel.com/markhz/ohmyprofessors_web)
- [Supabase Dashboard](https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo)

---

## ✅ 完成后的状态

**当所有步骤完成后，你将拥有：**
- ✅ 功能���整的生产环境（https://ohmyprofessors.com）
- ✅ 配置正确的数据库（7 表 + RLS + 索引）
- ✅ 可用的认证系统（Email OTP）
- ✅ 测试通过的核心流程（注册 → 登录 → 使用）

**然后可以：**
- 🎨 开始 UI/UX 优化
- 📊 导入真实教授数据
- 🚀 邀请 Beta 测试用户
- 📈 启动 Go-to-Market 策略

---

**预计总时间:** 35-45 分钟  
**难度:** 🟢 简单（按步骤操作即可）  
**风险:** 🟢 低（可随时回滚）

**立即开始 → Step 1** 👆
