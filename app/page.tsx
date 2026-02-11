/**
 * Home Page - Course First Mode with Device Detection
 * 课程优先模式首页（设备检测 + 组件级分叉）
 * 
 * 策略：同一个 URL，根据设备类型渲染完全不同的组件
 * - 桌面端：三列布局（侧边栏 + 主内容 + 面板）
 * - 移动端：单列全屏布局 + 底部导航栏
 */

import { headers } from 'next/headers'
import { isMobileDevice } from '@/lib/utils/device'
import { DesktopHomePage } from '@/components/desktop/DesktopHomePage'
import { MobileHomePage } from '@/components/mobile/MobileHomePage'
import { getCourses } from '@/lib/api/courses'

export const metadata = {
  title: 'OhMyProfessors - Find Your Best Course & Professor',
  description: 'Compare professors by course. Real student reviews for Australian universities. Make informed decisions about your classes.',
}

export default async function HomePage() {
  // Server-side Device Detection
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  const isMobile = isMobileDevice(userAgent)
  
  // Fetch courses from database
  let courses: Awaited<ReturnType<typeof getCourses>> = []
  try {
    courses = await getCourses()
  } catch (error) {
    console.error('Error fetching courses:', error)
    courses = []
  }
  
  // 根据设备类型渲染不同组件
  if (isMobile) {
    return <MobileHomePage courses={courses} />
  }
  
  return <DesktopHomePage courses={courses} />
}
