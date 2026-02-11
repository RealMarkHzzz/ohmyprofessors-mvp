# Package.json 依赖更新建议

## 需要添加的核心依赖

```bash
# Supabase
npm install @supabase/supabase-js @supabase/ssr

# 表单 & 验证
npm install react-hook-form @hookform/resolvers zod

# UI 增强
npm install sonner vaul cmdk

# 工具
npm install date-fns nanoid
```

## 推荐的开发依赖

```bash
# 测试
npm install -D vitest @testing-library/react @testing-library/jest-dom @playwright/test

# Git hooks & 代码质量
npm install -D husky lint-staged prettier prettier-plugin-tailwindcss

# TypeScript
npm install -D @types/node
```

## 可选依赖（根据需要）

```bash
# 状态管理（仅在需要时）
npm install zustand

# 图片优化（生产环境）
npm install sharp

# 速率限制（生产环境）
npm install @upstash/ratelimit @vercel/kv
```

## 建议移除的依赖

- `radix-ui` (单独的包) - 已通过 shadcn/ui 组件包含
- 考虑移除 `gsap` 或 `framer-motion` 其中之一（推荐保留 framer-motion）

## 完整的 package.json 参考

```json
{
  "name": "ohmyprofessors_web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "prepare": "husky install",
    "supabase:types": "npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.0",
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.45.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.33.0",
    "lucide-react": "^0.563.0",
    "nanoid": "^5.0.0",
    "next": "16.1.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-hook-form": "^7.53.0",
    "sonner": "^1.5.0",
    "tailwind-merge": "^3.4.0",
    "vaul": "^1.1.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@playwright/test": "^1.48.0",
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.6",
    "husky": "^9.1.0",
    "lint-staged": "^15.2.0",
    "prettier": "^3.3.0",
    "prettier-plugin-tailwindcss": "^0.6.0",
    "shadcn": "^3.8.4",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5",
    "vitest": "^2.0.0"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```
