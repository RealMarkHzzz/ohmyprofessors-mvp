import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * 首页入场动画 - Staggered Reveal
 * 服务体验：渐进式展示内容，引导用户视觉焦点
 */
export const animatePageEntry = (elements: {
  header?: HTMLElement | null
  hero?: HTMLElement | null
  searchBar?: HTMLElement | null
  stats?: HTMLElement | null
  professorList?: HTMLElement | null
}) => {
  const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // 1. Header淡入（快速）
  if (elements.header) {
    timeline.from(elements.header, {
      y: -20,
      opacity: 0,
      duration: 0.6,
    })
  }

  // 2. Hero标题展开（品牌感）
  if (elements.hero) {
    timeline.from(
      elements.hero.querySelectorAll('h2, p'),
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      },
      '-=0.3'
    )
  }

  // 3. 搜索框弹出（核心功能突出）
  if (elements.searchBar) {
    timeline.from(
      elements.searchBar,
      {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
      },
      '-=0.4'
    )
  }

  // 4. 统计卡片依次出现
  if (elements.stats) {
    timeline.from(
      elements.stats.children,
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      },
      '-=0.3'
    )
  }

  // 5. 教授列表淡入
  if (elements.professorList) {
    timeline.from(
      elements.professorList,
      {
        opacity: 0,
        duration: 0.6,
      },
      '-=0.2'
    )
  }

  return timeline
}

/**
 * 教授卡片交互动画 - Hover Lift
 * 服务体验：提供触觉反馈，暗示可点击
 */
export const setupProfessorCardHover = (card: HTMLElement) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -8,
      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
      duration: 0.3,
      ease: 'power2.out',
    })
  })

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      duration: 0.3,
      ease: 'power2.out',
    })
  })
}

/**
 * 教授列表Stagger加载
 * 服务体验��分批展示，避免一次性加载的视觉冲击
 */
export const animateProfessorList = (cards: HTMLElement[]) => {
  gsap.from(cards, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.08,
    ease: 'power2.out',
    clearProps: 'all',
  })
}

/**
 * 搜索结果更新动画 - Crossfade
 * 服务体验：平滑过渡，避免突兀的内容切换
 */
export const animateSearchResults = (
  container: HTMLElement,
  onUpdate: () => void
) => {
  const timeline = gsap.timeline()

  // 淡出旧内容
  timeline.to(container, {
    opacity: 0,
    y: -10,
    duration: 0.2,
    ease: 'power2.in',
  })

  // 更新DOM
  timeline.call(onUpdate)

  // 淡入新内容
  timeline.to(container, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: 'power2.out',
  })

  return timeline
}

/**
 * 教授详情页入场动画 - Sequential Reveal
 * 服务体验：引导用户按优先级阅读信息
 */
export const animateProfessorDetailEntry = (elements: {
  backButton?: HTMLElement | null
  header?: HTMLElement | null
  stats?: HTMLElement | null
  reviewList?: HTMLElement | null
  cta?: HTMLElement | null
}) => {
  const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // 1. 返回按钮（导航优先）
  if (elements.backButton) {
    timeline.from(elements.backButton, {
      x: -20,
      opacity: 0,
      duration: 0.4,
    })
  }

  // 2. 教授信息头部（快速展示关键信息）
  if (elements.header) {
    timeline.from(
      elements.header,
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
      },
      '-=0.2'
    )
  }

  // 3. 评价统计（数据可信度）
  if (elements.stats) {
    timeline.from(
      elements.stats.children,
      {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      },
      '-=0.3'
    )
  }

  // 4. 评价列表（核心内容）
  if (elements.reviewList) {
    timeline.from(
      elements.reviewList,
      {
        opacity: 0,
        duration: 0.6,
      },
      '-=0.2'
    )
  }

  // 5. CTA按钮（行动引导）
  if (elements.cta) {
    timeline.from(
      elements.cta,
      {
        scale: 0.9,
        opacity: 0,
        duration: 0.4,
      },
      '-=0.2'
    )
  }

  return timeline
}

/**
 * 评价卡片Scroll Reveal
 * 服务体验：长列表分批显示，性能优化 + 视觉节奏
 */
export const setupReviewScrollReveal = (cards: HTMLElement[]) => {
  cards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.05,
      ease: 'power2.out',
    })
  })
}

/**
 * CTA按钮脉冲动画 - Attention Draw
 * 服务体验：引导用户行动，但不过分干扰
 */
export const setupCTAPulse = (button: HTMLElement) => {
  gsap.to(button, {
    scale: 1.05,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    paused: false,
  })
}

/**
 * 清理所有GSAP动画
 */
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  gsap.killTweensOf('*')
}
