# Round 2.5 实施指南 - 快速上手

## 1. 环境准备

### 1.1 安装依赖

```bash
# 安装 Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 或使用 yarn
yarn add -D tailwindcss postcss autoprefixer
```

### 1.2 Tailwind 配置文件

创建或更新 `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
          light: '#E0E7FF',
        },
        secondary: {
          DEFAULT: '#10B981',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      maxWidth: {
        '6xl': '1152px',
      },
      boxShadow: {
        'card': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 8px 10px -6px rgba(37, 99, 235, 0.1)',
        'button-hover': '0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -4px rgba(37, 99, 235, 0.3)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
```

### 1.3 全局 CSS 文件

创建 `styles/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Primary Colors */
    --primary: #6366F1;
    --primary-dark: #4F46E5;
    --primary-light: #E0E7FF;
    
    /* Secondary */
    --secondary: #10B981;
    
    /* Background */
    --bg: #F5F5F5;
    --bg-white: #FFFFFF;
    
    /* Text */
    --text: #111827;
    --text-muted: #6B7280;
    
    /* Border */
    --border: #E5E7EB;
  }
  
  .dark {
    --bg: #0F172A;
    --bg-white: #1E293B;
    --text: #F8FAFC;
    --text-muted: #94A3B8;
    --border: rgba(255, 255, 255, 0.1);
  }
  
  body {
    @apply font-sans text-base text-gray-900 bg-gray-100;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

@layer components {
  /* Button Primary */
  .btn-primary {
    @apply px-8 py-3.5 text-base font-semibold text-white 
           bg-gradient-to-r from-blue-600 to-blue-500
           rounded-xl transition-all duration-200
           hover:-translate-y-0.5 hover:shadow-button-hover
           active:translate-y-0;
  }
  
  /* Button Secondary */
  .btn-secondary {
    @apply px-8 py-3.5 text-base font-semibold 
           bg-white border-2 border-gray-200 text-slate-900
           rounded-xl transition-all duration-200
           hover:bg-gray-50 hover:border-gray-300
           dark:bg-white/5 dark:border-white/10 dark:text-slate-50
           dark:hover:bg-white/10;
  }
  
  /* Card */
  .card {
    @apply bg-white border border-gray-200 rounded-2xl p-6
           transition-all duration-200
           dark:bg-white/5 dark:border-white/10;
  }
  
  /* Card Hover */
  .card-hover {
    @apply card cursor-pointer
           hover:border-gray-300 hover:shadow-card-hover;
  }
  
  /* Glass Card */
  .glass-card {
    @apply bg-white/80 border border-gray-200 rounded-2xl
           backdrop-blur-3xl shadow-sm
           hover:bg-white hover:border-gray-300 hover:shadow-card-hover
           transition-all duration-200
           dark:bg-white/5 dark:border-white/10;
  }
  
  /* Input */
  .input {
    @apply bg-gray-100 border border-gray-200 rounded-xl 
           px-4 py-3 text-sm text-gray-900 
           placeholder:text-gray-500
           focus:outline-none focus:border-primary
           transition-colors duration-200;
  }
  
  /* Container */
  .container-custom {
    @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  /* Section */
  .section {
    @apply py-12 sm:py-16 lg:py-20;
  }
}

@layer utilities {
  .gradient-text {
    @apply bg-gradient-to-r from-blue-600 to-blue-500 
           bg-clip-text text-transparent;
  }
}
```

---

## 2. 组件库创建

### 2.1 按钮组件 (`components/Button.jsx`)

```jsx
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'text-gray-500 hover:text-gray-900 px-4 py-2',
  };
  
  const sizes = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3.5 px-8',
    lg: 'text-lg py-4 px-10',
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

**使用示例：**
```jsx
<Button>Try Now — It's Free</Button>
<Button variant="secondary">View Documentation</Button>
<Button variant="ghost" size="sm">Sign In</Button>
```

### 2.2 卡片组件 (`components/Card.jsx`)

```jsx
export const Card = ({ 
  children, 
  hover = false,
  glass = false,
  className = '',
  ...props 
}) => {
  const baseClass = glass ? 'glass-card' : hover ? 'card-hover' : 'card';
  
  return (
    <div className={`${baseClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card hover>
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </Card>
  );
};
```

**使用示例：**
```jsx
<FeatureCard 
  icon={<CodeIcon />}
  title="Multi-Model Support"
  description="Access GPT-4, Claude, Gemini, and more through a single unified API."
/>
```

### 2.3 导航栏组件 (`components/Navbar.jsx`)

```jsx
'use client';
import { useState } from 'react';
import { Button } from './Button';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.svg" className="w-6 h-6" alt="Logo" />
            <span className="font-heading font-bold text-lg">NexusAI</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#demo" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Demo
            </a>
            <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="#docs" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Docs
            </a>
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button size="sm">Try Free</Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a href="#features" className="block text-sm text-gray-500">Features</a>
            <a href="#demo" className="block text-sm text-gray-500">Demo</a>
            <a href="#pricing" className="block text-sm text-gray-500">Pricing</a>
            <a href="#docs" className="block text-sm text-gray-500">Docs</a>
            <div className="pt-4 space-y-2">
              <Button variant="ghost" size="sm" className="w-full">Sign In</Button>
              <Button size="sm" className="w-full">Try Free</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
```

### 2.4 输入框组件 (`components/Input.jsx`)

```jsx
export const Input = ({ 
  placeholder, 
  type = 'text',
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`input ${className}`}
      {...props}
    />
  );
};
```

---

## 3. 页面布局示例

### 3.1 Hero Section (`components/HeroSection.jsx`)

```jsx
import { Button } from './Button';
import { Card } from './Card';

export const HeroSection = () => {
  return (
    <section className="section bg-white pt-20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
              <img src="/logo.svg" className="w-4 h-4" alt="" />
              <span className="text-xs text-gray-600">Powered by GPT-4 & Claude</span>
            </div>
            
            {/* Heading */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Your AI Assistant for{' '}
              <span className="gradient-text">Everything</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Build intelligent chatbots and AI assistants in minutes. 
              No coding required. Enterprise-ready from day one.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button>Try Now — It's Free</Button>
              <Button variant="secondary">View Documentation</Button>
            </div>
          </div>
          
          {/* Right - Chat Demo */}
          <Card className="shadow-xl">
            {/* Chat Header */}
            <div className="flex items-center gap-3 mb-4">
              <img src="/avatar.svg" className="w-10 h-10 rounded-full" alt="" />
              <div>
                <div className="font-semibold text-gray-900">NexusAI Assistant</div>
                <div className="text-sm text-green-500">Online</div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="space-y-4 mb-4">
              <div className="text-sm text-gray-600">
                What can you help me with?
              </div>
              <div className="flex gap-3">
                <img src="/ai-avatar.svg" className="w-6 h-6" alt="" />
                <p className="text-sm text-gray-800">
                  I can help you analyze data, write code, answer questions, and much more.
                </p>
              </div>
            </div>
            
            {/* Input */}
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type your message..."
                className="input flex-1"
              />
              <button className="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors">
                →
              </button>
            </div>
          </Card>
          
        </div>
      </div>
    </section>
  );
};
```

### 3.2 Features Section (`components/FeaturesSection.jsx`)

```jsx
import { FeatureCard } from './Card';

export const FeaturesSection = () => {
  const features = [
    {
      icon: '🤖',
      title: 'Multi-Model Support',
      description: 'Access GPT-4, Claude, Gemini, and more through a single unified API.',
    },
    {
      icon: '💻',
      title: 'Code Generation',
      description: 'Generate, explain, and debug code in 50+ programming languages.',
    },
    {
      icon: '📄',
      title: 'Document Analysis',
      description: 'Upload PDFs, docs, and images. Get instant summaries and insights.',
    },
    {
      icon: '🧠',
      title: 'Context Memory',
      description: 'Long-term memory that remembers your preferences and past conversations.',
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with end-to-end encryption and data privacy controls.',
    },
    {
      icon: '⚡',
      title: 'Streaming Responses',
      description: 'Real-time streaming for instant feedback. No waiting for complete responses.',
    },
  ];
  
  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built for <span className="gradient-text">Developers</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to build powerful AI applications, 
            from simple chatbots to complex agents.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
```

---

## 4. 快速检查清单

### ✅ 安装与配置
- [ ] 安装 Tailwind CSS
- [ ] 配置 `tailwind.config.js`
- [ ] 创建 `globals.css`
- [ ] 引入 Google Fonts (Space Grotesk, DM Sans)

### ✅ 组件开发
- [ ] Button 组件 (primary, secondary, ghost)
- [ ] Card 组件 (基础, hover, glass)
- [ ] Input 组件
- [ ] Navbar 组件

### ✅ 页面布局
- [ ] Hero Section
- [ ] Features Section
- [ ] Pricing Section
- [ ] Footer

### ✅ 样式验证
- [ ] 主色 #6366F1 应用正确
- [ ] 字体 Space Grotesk / DM Sans 加载
- [ ] 圆角 12px/16px 正确
- [ ] 阴影效果正确
- [ ] Hover 动效流畅

### ✅ 响应式测试
- [ ] Mobile (< 640px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)

---

## 5. 常见问题

### Q: 字体没有加载？
A: 确保在 `globals.css` 顶部添加了 Google Fonts 的 `@import` 语句。

### Q: Tailwind 类名不生效？
A: 检查 `tailwind.config.js` 的 `content` 配置是否包含了所有组件文件路径。

### Q: 阴影效果不对？
A: 使用自定义阴影类 `shadow-card`, `shadow-card-hover`, `shadow-button-hover`。

### Q: 渐变色不显示？
A: 确保使用 `bg-gradient-to-r from-blue-600 to-blue-500`，并且在按钮上没有其他背景色覆盖。

### Q: Dark Mode 如何启用？
A: 在 `<html>` 标签上添加 `class="dark"` 即可切换。

---

**文档生成**: 2026-02-11  
**参考规范**: ROUND2.5_VISUAL_CLONE_SPEC.md  
**技术栈**: React + Tailwind CSS v3
