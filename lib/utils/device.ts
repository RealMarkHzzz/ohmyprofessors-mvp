/**
 * Device Detection Utilities
 * 设备检测工具
 */

/**
 * 检测是否为移动设备（服务端，基于 User-Agent）
 */
export function isMobileDevice(userAgent: string): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
}

/**
 * 获取设备类型
 */
export function getDeviceType(userAgent: string): 'mobile' | 'tablet' | 'desktop' {
  if (/iPhone|iPod/i.test(userAgent)) return 'mobile'
  if (/iPad|Android/i.test(userAgent)) return 'tablet'
  return 'desktop'
}

/**
 * 检测是否为 iOS 设备
 */
export function isIOSDevice(userAgent: string): boolean {
  return /iPhone|iPad|iPod/i.test(userAgent)
}

/**
 * 检测是否为 Android 设备
 */
export function isAndroidDevice(userAgent: string): boolean {
  return /Android/i.test(userAgent)
}
