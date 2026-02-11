/**
 * Mobile Design Tokens
 * 移动端设计代币
 */

export const mobileDesignTokens = {
  // 间距（基于 8px 网格）
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
  },
  
  // 字体大小（基于 4px 网格）
  fontSize: {
    xs: '0.75rem',   // 12px - Caption
    sm: '0.875rem',  // 14px - Body Small
    base: '1rem',    // 16px - Body
    lg: '1.125rem',  // 18px - Body Large
    xl: '1.25rem',   // 20px - Heading 3
    '2xl': '1.5rem', // 24px - Heading 2
    '3xl': '2rem',   // 32px - Heading 1
  },
  
  // 点击区域（Apple HIG）
  touchTarget: {
    min: '2.75rem',        // 44px - 最小点击区域
    comfortable: '3.5rem', // 56px - 舒适点击区域
  },
  
  // 安全区（iOS）
  safeArea: {
    top: 'env(safe-area-inset-top)',
    bottom: 'env(safe-area-inset-bottom)',
    left: 'env(safe-area-inset-left)',
    right: 'env(safe-area-inset-right)',
  },
  
  // Z-index 层级
  zIndex: {
    bottomNav: 50,
    stickyHeader: 40,
    overlay: 30,
    modal: 60,
    card: 1,
  },
  
  // 布局高度
  layout: {
    headerHeight: '3.5rem',     // 56px
    bottomNavHeight: '4rem',    // 64px
    tabBarHeight: '3rem',       // 48px
  },
}

export type MobileDesignTokens = typeof mobileDesignTokens
