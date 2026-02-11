'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Search } from 'lucide-react'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!containerRef.current) return

    // Enhanced entry animation with GSAP
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
    const container = containerRef.current

    const h1 = container.querySelector('h1')
    const subtitle = container.querySelector('.subtitle')
    const searchContainer = container.querySelector('.search-container')
    const searchHint = container.querySelector('.search-hint')

    if (h1) {
      timeline.from(h1, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      })
    }

    if (subtitle) {
      timeline.from(
        subtitle,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.4'
      )
    }

    if (searchContainer) {
      timeline.from(
        searchContainer,
        {
          scale: 0.95,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.3'
      )
    }

    if (searchHint) {
      timeline.from(
        searchHint,
        {
          y: 10,
          opacity: 0,
          duration: 0.4,
        },
        '-=0.2'
      )
    }

    return () => {
      timeline.kill()
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 实现搜索逻辑
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="bg-white pt-32 pb-24">
      <div className="container-custom">
        <div ref={containerRef} className="max-w-4xl mx-auto text-center">
          
          {/* 新 Slogan */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-950 mb-6 leading-tight">
            为每门课程找到最好的教授
          </h1>
          
          {/* 副标题 */}
          <p className="subtitle text-xl text-gray-600 mb-8 leading-relaxed">
            基于真实学生评价，帮你避开烂课，选对教授
          </p>
          
          {/* 万能搜索框 */}
          <div className="search-container w-full max-w-2xl mx-auto mb-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索课程代码（如 COMP 1012）或教授名..."
                  className="
                    w-full h-14 px-6 pr-32
                    text-base
                    border-2 border-gray-300
                    rounded-xl
                    focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20
                    focus:outline-none
                    transition-all
                  "
                />
                <button 
                  type="submit"
                  className="
                    absolute right-2 top-2 bottom-2
                    px-6
                    bg-[#D4AF37] text-white
                    font-semibold
                    rounded-lg
                    hover:bg-[#C19B2F]
                    transition-colors
                    flex items-center gap-2
                  "
                >
                  <Search className="w-4 h-4" />
                  立即搜索
                </button>
              </div>
            </form>
          </div>
          
          {/* 示例提示 */}
          <p className="search-hint text-sm text-gray-500 text-center">
            试试搜索 "COMP 1012" 或 "Sarah Johnson"
          </p>
          
        </div>
      </div>
    </section>
  )
}
