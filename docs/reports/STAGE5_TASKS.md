# 🔧 Stage 5 修复任务清单

**自动修复优先级**: BLOCKER → HIGH → MEDIUM  
**预计总时间**: 8-10 小时

---

## 🔴 Critical - 必须修复（阻塞发布）

### ✅ TASK-01: 修复 React Hooks useCallback 错误
**优先级**: P0  
**预计时间**: 30 分钟  
**文件**: `components/home/ProfessorListClient.tsx`

**当前代码** (Line 32-37):
```typescript
const debouncedSearch = useCallback(
  debounce((value: string) => {
    setSearchQuery(value)
  }, 300),
  []
)
```

**修复方案**:
```typescript
const debouncedSearch = useMemo(
  () => debounce((value: string) => {
    setSearchQuery(value)
  }, 300),
  []
)
```

**验证**:
```bash
npm run lint -- components/home/ProfessorListClient.tsx
```

---

### ✅ TASK-02: 替换 <img> 为 Next.js <Image> (教授详情页)
**优先级**: P0  
**预计时间**: 30 分钟  
**文件**: `app/professors/[slug]/page.tsx`

**当前代码** (Line 133-137):
```jsx
{professor.avatar_url && (
  <img 
    src={professor.avatar_url}
    alt={professor.name}
    className="w-32 h-32 rounded-full object-cover flex-shrink-0"
  />
)}
```

**修复方案**:
```jsx
import Image from 'next/image'

{professor.avatar_url && (
  <Image 
    src={professor.avatar_url}
    alt={professor.name}
    width={128}
    height={128}
    className="rounded-full object-cover flex-shrink-0"
    priority={true}
  />
)}
```

---

### ✅ TASK-03: 替换 <img> 为 Next.js <Image> (教授卡片)
**优先级**: P0  
**预计时间**: 20 分钟  
**文件**: `components/shared/ProfessorCard.tsx`

**当前代码** (Line 115-119):
```jsx
{avatar_url && (
  <img 
    src={avatar_url} 
    alt={name}
    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
  />
)}
```

**修复方案**:
```jsx
import Image from 'next/image'

{avatar_url && (
  <Image 
    src={avatar_url} 
    alt={name}
    width={64}
    height={64}
    className="rounded-full object-cover flex-shrink-0"
    loading="lazy"
  />
)}
```

---

### ✅ TASK-04: 配置 Next.js Image domains
**优先级**: P0  
**预计时间**: 10 分钟  
**文件**: `next.config.ts`

**当前代码**:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

**修复方案**:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

---

### ✅ TASK-05: 修复 Input 组件空接口
**优先级**: P0  
**预计时间**: 15 分钟  
**文件**: `components/ui/Input.tsx`

**当前代码**:
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => {
  return <input {...props} className={cn('input', className)} />
}
```

**修复方案**:
```typescript
import { forwardRef } from 'react'

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return <input ref={ref} {...props} className={cn('input', className)} />
})

Input.displayName = 'Input'
```

---

## 🟡 High - 强烈建议修复

### ✅ TASK-06: 清理未使用的导入 - LoadingSpinner
**优先级**: P1  
**预计时间**: 5 分钟  
**文件**: `app/professors/[slug]/page.tsx`

**修复**: 删除 Line 5
```typescript
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'  // ❌ 删除
```

---

### ✅ TASK-07: 清理未使用的导入 - Professor 类型
**优先级**: P1  
**预计时间**: 5 分钟  
**文件**: `components/home/ProfessorListClient.tsx`

**修复**: 删除 Line 10
```typescript
import { Professor } from '@/lib/types'  // ❌ 删除
```

---

### ✅ TASK-08: 清理未使用的导入 - BookOpen
**优先级**: P1  
**预计时间**: 5 分钟  
**文件**: `components/reviews/ReviewCard.tsx`

**修复**: 删除 Line 6 中的 `BookOpen`
```typescript
import { Star, ThumbsUp, Calendar, BookOpen, TrendingUp } from 'lucide-react'
// 改为
import { Star, ThumbsUp, Calendar, TrendingUp } from 'lucide-react'
```

---

### ✅ TASK-09: 清理未使用的参数 - ProfessorCard id
**优先级**: P1  
**预计时间**: 5 分钟  
**文件**: `components/shared/ProfessorCard.tsx`

**修复**: 使用 `_id` 或删除参数（Line 77）
```typescript
export function ProfessorCard({
  id,  // ❌ 未使用
  name,
  // ...
```

**修复方案**:
```typescript
export function ProfessorCard({
  // 方案 1: 使用下划线前缀表示故意未使用
  _id,
  name,
  // ...

  // 或方案 2: 如果真的不需要就删除
  name,
  // ...
```

---

### ✅ TASK-10: 清理未使用的导入 - useEffect
**优先级**: P1  
**预计时间**: 5 分钟  
**文件**: `components/ui/I18nContext.tsx`

**修复**: 删除 Line 3 中的 `useEffect`
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react'
// 改为
import React, { createContext, useContext, useState } from 'react'
```

---

### ✅ TASK-11: 修复未使用的 error 变量 - Supabase server
**优先级**: P1  
**预计时间**: 5 分钟  
**文件**: `lib/supabase/server.ts`

**修复**: 使用 `_error` 命名约定 (Line 28, 35)
```typescript
const { data, error } = await supabase.auth.getUser()
// 改为
const { data, error: _error } = await supabase.auth.getUser()
```

---

### ✅ TASK-12: 替换 any 类型 - debounce 函数
**优先级**: P1  
**预计时间**: 15 分钟  
**文件**: `lib/utils.ts`

**当前代码** (Line 71):
```typescript
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void }
```

**修复方案**:
```typescript
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void }
```

---

### ✅ TASK-13: 优化课程代码验证规则
**优先级**: P1  
**预计时间**: 30 分钟  
**文件**: `lib/validations.ts`

**当前代码** (Line 63):
```typescript
.regex(/^[A-Z]{2,4}\d{4}$/, 'Course code must be in format like CS2510 or MATH1120')
```

**修复方案**:
```typescript
.regex(
  /^[A-Z]{2,6}[\s-]?\d{4}[A-Z]?$/i,
  'Course code format: CS2510, CS-2510, COMP2510A, etc.'
)
```

**测试用例**:
```typescript
// 应该通过的格式
'CS2510'      // ✅
'CS-2510'     // ✅
'COMP2510'    // ✅
'MATH1120A'   // ✅
'COMPSCI2510' // ✅

// 应该拒绝的格式
'cs2510'      // ❌ (小写)
'CS25'        // ❌ (数字不足)
'CS25100'     // ❌ (数字过多)
```

---

### ✅ TASK-14: 优化学期验证规则
**优先级**: P1  
**预计时间**: 45 分钟  
**文件**: `lib/validations.ts`

**当前代码** (Line 71):
```typescript
.regex(/^\d{4} Semester [12]$/, 'Semester must be in format like "2025 Semester 1"')
```

**修复方案 1 - 宽松正则**:
```typescript
.regex(
  /^\d{4}[\s-]?(Semester|S|Term|Summer|Winter)[\s-]?[12]?$/i,
  'Semester format: 2025 Semester 1, 2025-S1, Summer 2025, etc.'
)
```

**修复方案 2 - 下拉选择（推荐）**:
```typescript
// 改用 enum
semester: z.string().min(1, 'Please select a semester')

// 在组件中使用 <select>
const SEMESTERS = [
  '2026 Semester 1',
  '2025 Semester 2',
  '2025 Semester 1',
  '2024 Semester 2',
]
```

---

### ✅ TASK-15: 添加环境变量验证
**优先级**: P1  
**预计时间**: 30 分钟  
**新文件**: `lib/env.ts`

**创建新文件**:
```typescript
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

// 验证但不抛出错误（允许在开发环境使用 mock 数据）
const parseResult = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  NODE_ENV: process.env.NODE_ENV,
})

if (!parseResult.success) {
  console.warn('⚠️  环境变量未完全配置，使用 Mock 数据模式')
  console.warn('Missing:', parseResult.error.flatten().fieldErrors)
}

export const env = parseResult.success 
  ? parseResult.data 
  : {
      NEXT_PUBLIC_SUPABASE_URL: undefined,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: undefined,
      SUPABASE_SERVICE_ROLE_KEY: undefined,
      NODE_ENV: 'development' as const,
    }

export const isMockMode = !env.NEXT_PUBLIC_SUPABASE_URL
```

**在 `lib/supabase/client.ts` 中使用**:
```typescript
import { env, isMockMode } from '@/lib/env'

if (isMockMode) {
  console.log('🔄 Running in Mock Data mode')
}
```

---

## 🟢 Medium - 建议修复（可延后）

### ✅ TASK-16: 添加 Loading Skeleton
**优先级**: P2  
**预计时间**: 2 小时  

创建 `components/shared/ProfessorCardSkeleton.tsx`:
```typescript
export function ProfessorCardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-6 animate-pulse">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  )
}
```

---

### ✅ TASK-17: 配置安全头部
**优先级**: P2  
**预计时间**: 45 分钟  
**文件**: `next.config.ts`

```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
  ]
}
```

---

## ✅ 验证检查清单

修复完成后，运行以下命令验证：

```bash
# 1. TypeScript 检查
npx tsc --noEmit

# 2. ESLint 检查
npm run lint

# 3. 构建测试
npm run build

# 4. 本地运行测试
npm run dev

# 5. 测试关键功能
# - 首页加载
# - 搜索功能
# - 教授详情页
# - 评价表单提交
```

---

## 📊 修复进度追踪

| Task ID | 描述 | 优先级 | 时间 | 状态 |
|---------|------|--------|------|------|
| TASK-01 | 修复 useCallback | P0 | 30min | ⬜ |
| TASK-02 | Image 优化 (详情) | P0 | 30min | ⬜ |
| TASK-03 | Image 优化 (卡片) | P0 | 20min | ⬜ |
| TASK-04 | Next.js config | P0 | 10min | ⬜ |
| TASK-05 | Input 组件 | P0 | 15min | ⬜ |
| TASK-06 | 清理导入 1 | P1 | 5min | ⬜ |
| TASK-07 | 清理导入 2 | P1 | 5min | ⬜ |
| TASK-08 | 清理导入 3 | P1 | 5min | ⬜ |
| TASK-09 | 清理导入 4 | P1 | 5min | ⬜ |
| TASK-10 | 清理导入 5 | P1 | 5min | ⬜ |
| TASK-11 | 清理导入 6 | P1 | 5min | ⬜ |
| TASK-12 | 修复 any 类型 | P1 | 15min | ⬜ |
| TASK-13 | 课程代码验证 | P1 | 30min | ⬜ |
| TASK-14 | 学期验证 | P1 | 45min | ⬜ |
| TASK-15 | 环境变量验证 | P1 | 30min | ⬜ |
| TASK-16 | Loading Skeleton | P2 | 120min | ⬜ |
| TASK-17 | 安全头部 | P2 | 45min | ⬜ |

**总预计时间**: 
- P0 (Critical): 1 小时 45 分钟
- P1 (High): 2 小时 30 分钟
- P2 (Medium): 2 小时 45 分钟
- **总计**: 约 7 小时

---

**下一步**: 开始执行 Stage 5 自动修复
