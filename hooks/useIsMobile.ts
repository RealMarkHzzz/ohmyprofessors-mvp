/**
 * Client-side Mobile Detection Hook
 * 客户端移动设备检测 Hook
 */
'use client'

import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }
    
    // 初始检测
    checkMobile()
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])
  
  return isMobile
}

/**
 * 检测是否为触摸设备
 */
export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  useEffect(() => {
    setIsTouchDevice(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    )
  }, [])
  
  return isTouchDevice
}
