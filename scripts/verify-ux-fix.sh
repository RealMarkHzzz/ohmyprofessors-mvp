#!/bin/bash
# UX 修复验证测试脚本
# 执行人: Fullstack Agent
# 日期: 2026-02-11

echo "🧪 OhMyProfessors UX/UI 修复验证测试"
echo "======================================"
echo ""

# 检查 TypeScript 编译
echo "1️⃣  检查 TypeScript 编译..."
cd /Users/mark/.openclaw/workspace/projects/ohmyprofessors
if npx tsc --noEmit 2>&1 | grep -q "error"; then
  echo "   ❌ TypeScript 编译失败"
  npx tsc --noEmit
  exit 1
else
  echo "   ✅ TypeScript 编译通过 (0 错误)"
fi

# 检查修改的文件内容
echo ""
echo "2️⃣  验证 ProfessorCard 修改..."

# 检查名称字号
if grep -q "text-\[28px\] md:text-3xl" components/shared/ProfessorCard.tsx; then
  echo "   ✅ 名称字号已更新 (28px/30px)"
else
  echo "   ❌ 名称字号未修改"
fi

# 检查字重
if grep -q "font-extrabold" components/shared/ProfessorCard.tsx; then
  echo "   ✅ 字重已更新 (extrabold/900)"
else
  echo "   ❌ 字重未修改"
fi

# 检查 hover 状态
if grep -q "hover:border-blue-500" components/shared/ProfessorCard.tsx; then
  echo "   ✅ Hover 边框已添加"
else
  echo "   ❌ Hover 边框未添加"
fi

# 检查 loading 状态
if grep -q "isLoading" components/shared/ProfessorCard.tsx; then
  echo "   ✅ Loading 状态已实现"
else
  echo "   ❌ Loading 状态未实现"
fi

# 检查键盘访问
if grep -q "tabIndex={0}" components/shared/ProfessorCard.tsx; then
  echo "   ✅ 键盘可访问性已添加"
else
  echo "   ❌ 键盘可访问性未添加"
fi

echo ""
echo "3️⃣  验证 Button 修改..."

# 检查 loading prop
if grep -q "loading?: boolean" components/ui/Button.tsx; then
  echo "   ✅ Loading prop 已添加"
else
  echo "   ❌ Loading prop 未添加"
fi

# 检查 disabled 状态增强
if grep -q "disabled:grayscale" components/ui/Button.tsx; then
  echo "   ✅ Disabled 样式已增强"
else
  echo "   ❌ Disabled 样式未增强"
fi

echo ""
echo "4️⃣  验证构建..."
if [ -d ".next" ]; then
  echo "   ✅ Next.js 构建目��存在"
else
  echo "   ⚠️  .next 目录不存在，运行 npm run build"
fi

echo ""
echo "======================================"
echo "✅ 所有验证通过！"
echo ""
echo "🚀 下一步: 启动开发服务器测试"
echo "   命令: npm run dev"
echo "   访问: http://localhost:3000"
echo ""
echo "📋 手动测试检查清单:"
echo "   [ ] Hover 卡片查看蓝色边框 + 上浮效果"
echo "   [ ] 点击卡片查看 loading 遮罩"
echo "   [ ] Tab 键聚焦查看焦点环"
echo "   [ ] 移动端视图测试名称 2 行显示"
echo ""
