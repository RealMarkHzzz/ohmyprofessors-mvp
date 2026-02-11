'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * Template Component - 路由过渡动画
 * 使用 View Transitions API 实现平滑的页面切换
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const previousPathname = useRef(pathname)
  
  useEffect(() => {
    // 检测路由变化
    if (previousPathname.current !== pathname) {
      // 支持 View Transitions API 的浏览器（Chrome 111+, Edge 111+）
      if ('startViewTransition' in document) {
        (document as any).startViewTransition(() => {
          previousPathname.current = pathname
        })
      } else {
        // 不支持的浏览器直接切换
        previousPathname.current = pathname
      }
    }
  }, [pathname])
  
  return <>{children}</>
}
