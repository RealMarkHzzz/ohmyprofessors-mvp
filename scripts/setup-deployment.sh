#!/bin/bash
# OhMyProfessors - 自动配置脚本
# 用途: 配置 Vercel 环境变量和 Supabase 设置

set -e  # 遇到错误立即退出

echo "🚀 OhMyProfessors 自动配置开始..."
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 项目信息
PROJECT_DIR="/Users/mark/.openclaw/workspace/projects/ohmyprofessors"
SUPABASE_PROJECT_ID="bybpdituoktqmhpsssbo"
SUPABASE_URL="https://bybpdituoktqmhpsssbo.supabase.co"

echo "📍 项目信息:"
echo "  - 项目目录: $PROJECT_DIR"
echo "  - Supabase 项目 ID: $SUPABASE_PROJECT_ID"
echo "  - Supabase URL: $SUPABASE_URL"
echo ""

# ============================================================================
# Step 1: 检查 Vercel CLI 登录状态
# ============================================================================

echo "🔐 Step 1: 检查 Vercel 登录状态..."

if vercel whoami &>/dev/null; then
    VERCEL_USER=$(vercel whoami 2>/dev/null)
    echo -e "${GREEN}✓${NC} 已登录 Vercel (用户: $VERCEL_USER)"
else
    echo -e "${YELLOW}⚠${NC} 未登录 Vercel"
    echo "请运行: vercel login"
    echo "然后重新执行此脚本"
    exit 1
fi

echo ""

# ============================================================================
# Step 2: 获取 Supabase 凭证
# ============================================================================

echo "🔑 Step 2: 配置 Supabase 凭证..."
echo ""
echo -e "${YELLOW}请按照以下步骤操作:${NC}"
echo ""
echo "1. 访问: https://supabase.com/dashboard/project/$SUPABASE_PROJECT_ID/settings/api"
echo "2. 复制 'anon public' key (绿色方框)"
echo ""

read -p "粘贴 anon public key: " SUPABASE_ANON_KEY

echo ""
echo "3. 复制 'service_role' key (红色方框)"
echo ""

read -sp "粘贴 service_role key (不会显示): " SUPABASE_SERVICE_KEY
echo ""
echo ""

# 验证输入
if [ -z "$SUPABASE_ANON_KEY" ] || [ -z "$SUPABASE_SERVICE_KEY" ]; then
    echo -e "${RED}✗${NC} 错误: Supabase keys 不能为空"
    exit 1
fi

echo -e "${GREEN}✓${NC} Supabase 凭证已输入"
echo ""

# ============================================================================
# Step 3: 配置 Vercel 环境变量
# ============================================================================

echo "⚙️  Step 3: 配置 Vercel 环境变量..."

cd "$PROJECT_DIR"

# 检查项目是否已链接
if [ ! -f ".vercel/project.json" ]; then
    echo -e "${YELLOW}⚠${NC} 项目未链接到 Vercel"
    echo "正在链接..."
    vercel link --yes
fi

echo ""
echo "添加环境变量..."

# 添加 NEXT_PUBLIC_SUPABASE_URL
echo "  - NEXT_PUBLIC_SUPABASE_URL"
vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development <<EOF
$SUPABASE_URL
EOF

# 添加 NEXT_PUBLIC_SUPABASE_ANON_KEY
echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development <<EOF
$SUPABASE_ANON_KEY
EOF

# 添加 SUPABASE_SERVICE_ROLE_KEY (仅 production)
echo "  - SUPABASE_SERVICE_ROLE_KEY"
vercel env add SUPABASE_SERVICE_ROLE_KEY production <<EOF
$SUPABASE_SERVICE_KEY
EOF

echo -e "${GREEN}✓${NC} 环境变量配置完成"
echo ""

# ============================================================================
# Step 4: 触发重新部署
# ============================================================================

echo "🔄 Step 4: 触发 Vercel 重新部署..."

# 获取最新的生产部署
LATEST_DEPLOYMENT=$(vercel ls --prod | grep "Ready" | head -1 | awk '{print $1}')

if [ -n "$LATEST_DEPLOYMENT" ]; then
    echo "  - 当前生产部署: $LATEST_DEPLOYMENT"
    echo "  - 触发 Redeploy..."
    
    vercel redeploy "$LATEST_DEPLOYMENT" --yes
    
    echo -e "${GREEN}✓${NC} Redeploy 已触发"
else
    echo -e "${YELLOW}⚠${NC} 未找到生产部署，使用 vercel deploy 代替"
    vercel deploy --prod --yes
fi

echo ""

# ============================================================================
# Step 5: 创建本地 .env.local
# ============================================================================

echo "📝 Step 5: 创建本地 .env.local..."

cat > "$PROJECT_DIR/.env.local" <<EOF
# OhMyProfessors - Local Environment Variables
# Auto-generated on $(date)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_KEY

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Node
NODE_ENV=development
EOF

echo -e "${GREEN}✓${NC} .env.local 已创建"
echo ""

# ============================================================================
# Step 6: 验证配置
# ============================================================================

echo "✅ Step 6: 验证配置..."
echo ""

echo "Vercel 环境变量:"
vercel env ls

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ 配置完成！${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo "📊 接下来的步骤:"
echo ""
echo "1. 等待 Vercel 重新部署完成 (2-3 分钟)"
echo "   - 查看状态: https://vercel.com/markhz/ohmyprofessors_web/deployments"
echo ""
echo "2. 验证网站可访问:"
echo "   - 生产: https://ohmyprofessors.com"
echo ""
echo "3. 配置 Supabase Auth 回调 URL:"
echo "   - 访问: https://supabase.com/dashboard/project/$SUPABASE_PROJECT_ID/auth/url-configuration"
echo "   - Site URL: https://ohmyprofessors.com"
echo "   - Redirect URLs: https://ohmyprofessors.com/auth/callback"
echo ""
echo "4. 执行数据库 Schema:"
echo "   - 访问: https://supabase.com/dashboard/project/$SUPABASE_PROJECT_ID/sql/new"
echo "   - 复制并执行: docs/CTO_ARCHITECTURE.md 第 3 节 SQL"
echo ""
echo "详细指导: docs/QUICK_START.md"
echo ""
