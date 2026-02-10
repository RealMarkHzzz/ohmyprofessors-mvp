#!/bin/bash
# OhMyProfessors - 完整重新部署脚本
# 警告：此脚本会删除现有项目并重新创建

set -e

# 颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/Users/mark/.openclaw/workspace/projects/ohmyprofessors"
DOMAIN="ohmyprofessors.com"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  OhMyProfessors 完整重新部署${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${RED}⚠️  警告：此操作将删除以下内容：${NC}"
echo "  - Vercel 项目: ohmyprofessors_web"
echo "  - Supabase 项目: bybpdituoktqmhpsssbo"
echo "  - 所有数据和配置"
echo ""
read -p "确认继续? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "操作已取消"
    exit 0
fi

echo ""
echo -e "${YELLOW}开始执行...${NC}"
echo ""

cd "$PROJECT_DIR"

# ============================================================================
# Phase 1: 删除旧项目
# ============================================================================

echo -e "${RED}Phase 1: 删除旧项目${NC}"
echo ""

# 1.1 删除 Vercel 项目
echo "🗑️  删除 Vercel 项目..."
if vercel remove ohmyprofessors_web --yes &>/dev/null; then
    echo -e "  ${GREEN}✓${NC} Vercel 项目已删除"
else
    echo -e "  ${YELLOW}⚠${NC} Vercel 项目可能不存在或已删除"
fi

# 1.2 删除本地 Vercel 链接
echo "🗑️  清理本地 Vercel 配置..."
rm -rf .vercel
echo -e "  ${GREEN}✓${NC} 本地配置已清理"

echo ""
echo -e "${YELLOW}⚠️  Supabase 项目需要手动删除${NC}"
echo "  访问: https://supabase.com/dashboard/project/bybpdituoktqmhpsssbo/settings/general"
echo "  滚动到底部 → 点击 'Delete project'"
echo ""
read -p "Supabase 项目已删除? (yes/no): " SUPABASE_DELETED

if [ "$SUPABASE_DELETED" != "yes" ]; then
    echo "请先删除 Supabase 项目后再继续"
    exit 1
fi

# ============================================================================
# Phase 2: 创建新 Supabase 项目
# ============================================================================

echo ""
echo -e "${GREEN}Phase 2: 创建新 Supabase 项目${NC}"
echo ""

echo -e "${YELLOW}请按照以下步骤操作:${NC}"
echo ""
echo "1. 访问: https://supabase.com/dashboard/projects"
echo "2. 点击 'New project'"
echo "3. 配置:"
echo "   - Name: OhMyProfessors"
echo "   - Database Password: [生成强密码并保存]"
echo "   - Region: Sydney (ap-southeast-2)"
echo "   - Pricing Plan: Free"
echo "4. 点击 'Create new project'"
echo "5. 等待项目创建完成 (2-3 分钟)"
echo ""

read -p "Supabase 项目已创建? (yes/no): " SUPABASE_CREATED

if [ "$SUPABASE_CREATED" != "yes" ]; then
    echo "请先创建 Supabase 项目后再继续"
    exit 1
fi

echo ""
read -p "输入新的 Supabase Project ID (从 URL 获取): " NEW_SUPABASE_ID
read -p "输入 Supabase Project URL: " NEW_SUPABASE_URL
read -p "输入 anon public key: " NEW_SUPABASE_ANON
read -sp "输入 service_role key: " NEW_SUPABASE_SERVICE
echo ""

# ============================================================================
# Phase 3: 创建新 Vercel 项目
# ============================================================================

echo ""
echo -e "${GREEN}Phase 3: 创建新 Vercel 项目${NC}"
echo ""

echo "🚀 初始化 Vercel 项目..."
vercel --yes

# 获取新项目信息
NEW_VERCEL_URL=$(vercel inspect --json | jq -r '.url' 2>/dev/null || echo "unknown")
echo -e "  ${GREEN}✓${NC} Vercel 项目已创建: $NEW_VERCEL_URL"

# ============================================================================
# Phase 4: 配置环境变量
# ============================================================================

echo ""
echo -e "${GREEN}Phase 4: 配置环境变量${NC}"
echo ""

echo "⚙️  添加 Supabase 环境变量..."

# NEXT_PUBLIC_SUPABASE_URL
echo "$NEW_SUPABASE_URL" | vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development
echo -e "  ${GREEN}✓${NC} NEXT_PUBLIC_SUPABASE_URL"

# NEXT_PUBLIC_SUPABASE_ANON_KEY
echo "$NEW_SUPABASE_ANON" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development
echo -e "  ${GREEN}✓${NC} NEXT_PUBLIC_SUPABASE_ANON_KEY"

# SUPABASE_SERVICE_ROLE_KEY
echo "$NEW_SUPABASE_SERVICE" | vercel env add SUPABASE_SERVICE_ROLE_KEY production
echo -e "  ${GREEN}✓${NC} SUPABASE_SERVICE_ROLE_KEY"

# NEXT_PUBLIC_APP_URL
echo "https://$DOMAIN" | vercel env add NEXT_PUBLIC_APP_URL production
echo "http://localhost:3000" | vercel env add NEXT_PUBLIC_APP_URL preview development
echo -e "  ${GREEN}✓${NC} NEXT_PUBLIC_APP_URL"

# ============================================================================
# Phase 5: 配置域名
# ============================================================================

echo ""
echo -e "${GREEN}Phase 5: 配置域名${NC}"
echo ""

echo "🌐 添加域名 $DOMAIN..."
if vercel domains add "$DOMAIN" --yes; then
    echo -e "  ${GREEN}✓${NC} 域名已添加"
else
    echo -e "  ${YELLOW}⚠${NC} 域名可能已存在，跳过"
fi

# ============================================================================
# Phase 6: 部署到生产环境
# ============================================================================

echo ""
echo -e "${GREEN}Phase 6: 部署到生产环境${NC}"
echo ""

echo "🚀 执行生产部署..."
vercel --prod --yes

echo -e "  ${GREEN}✓${NC} 部署完成"

# ============================================================================
# Phase 7: 配置 Supabase
# ============================================================================

echo ""
echo -e "${GREEN}Phase 7: 配置 Supabase${NC}"
echo ""

echo -e "${YELLOW}请手动完成以下配置:${NC}"
echo ""
echo "1️⃣  配置 Auth 回调 URL:"
echo "   访问: https://supabase.com/dashboard/project/$NEW_SUPABASE_ID/auth/url-configuration"
echo "   - Site URL: https://$DOMAIN"
echo "   - Redirect URLs: https://$DOMAIN/auth/callback,http://localhost:3000/auth/callback"
echo ""
echo "2️⃣  启用 Email Auth:"
echo "   访问: https://supabase.com/dashboard/project/$NEW_SUPABASE_ID/auth/providers"
echo "   - 确认 Email 已启用"
echo "   - 启用 Email OTP"
echo ""
echo "3️⃣  执行数据库 Schema:"
echo "   访问: https://supabase.com/dashboard/project/$NEW_SUPABASE_ID/sql/new"
echo "   - 复制 docs/CTO_ARCHITECTURE.md 第 3 节 SQL"
echo "   - 粘贴并执行"
echo ""

read -p "按 Enter 继续..."

# ============================================================================
# Phase 8: 创建本地配置
# ============================================================================

echo ""
echo -e "${GREEN}Phase 8: 创建本地配置${NC}"
echo ""

cat > .env.local <<EOF
# OhMyProfessors - Local Environment Variables
# Generated: $(date)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=$NEW_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEW_SUPABASE_ANON
SUPABASE_SERVICE_ROLE_KEY=$NEW_SUPABASE_SERVICE

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Node
NODE_ENV=development
EOF

echo -e "  ${GREEN}✓${NC} .env.local 已创建"

# 更新 .env.example
cat > .env.example <<EOF
# OhMyProfessors - Environment Variables Template
# Copy to .env.local and fill in your values

# Supabase
NEXT_PUBLIC_SUPABASE_URL=$NEW_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Node
NODE_ENV=development
EOF

echo -e "  ${GREEN}✓${NC} .env.example 已更新"

# ============================================================================
# 完成
# ============================================================================

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ 重新部署完成！${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo "📊 新项目信息:"
echo ""
echo "Supabase:"
echo "  - Project ID: $NEW_SUPABASE_ID"
echo "  - URL: $NEW_SUPABASE_URL"
echo "  - Dashboard: https://supabase.com/dashboard/project/$NEW_SUPABASE_ID"
echo ""
echo "Vercel:"
echo "  - URL: $NEW_VERCEL_URL"
echo "  - Domain: https://$DOMAIN"
echo "  - Dashboard: https://vercel.com/markhz/ohmyprofessors"
echo ""

echo "📋 接下来:"
echo ""
echo "1. 完成 Supabase 手动配置 (见上方 Phase 7)"
echo "2. 等待域名 DNS 生效 (可能需要几分钟)"
echo "3. 访问 https://$DOMAIN 验证部署"
echo "4. 测试注册/登录流程"
echo ""

echo "📄 文档参考:"
echo "  - docs/QUICK_START.md"
echo "  - docs/CTO_ARCHITECTURE.md"
echo "  - docs/DEPLOYMENT_STATUS.md"
echo ""
