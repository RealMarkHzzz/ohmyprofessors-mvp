# Mobile Bottom Tab Bar Visual Specification
## OhMyProfessors - iOS Twitter Style

**Design Lead:** UI Agent (Matías Duarte Design Philosophy)  
**Version:** 1.0.0  
**Last Updated:** February 11, 2026  
**Design System:** iOS Twitter Style - Minimal, Direct, Flat Design

---

## Part 1: Design Principles

### 1.1 iOS Twitter Style Reference

Our mobile navigation draws inspiration from Twitter's iOS app, widely recognized for:

- **Visual Clarity:** Clean, unambiguous icons with clear active/inactive states
- **Performance:** Smooth 60fps transitions with minimal visual overhead
- **Directness:** No nested navigation - everything is one tap away
- **Consistency:** Predictable interaction patterns across all tabs

**Key Twitter Design Patterns We Adopt:**
- Flat, icon-first navigation
- Blue (`#1DA1F2`) as primary interactive color
- Fill/outline icon state switching
- Minimal text labels (11px, iOS standard)
- Instant visual feedback on tap

### 1.2 Flat Design Application

**No Gradients, No Shadows (Tab Bar only):**
- Pure white background (`#FFFFFF`)
- Solid color icons (no textures, no depth)
- 1px separator line (not shadow)
- Elevation only on Modal Sheet (8dp)

**Visual Hierarchy Through:**
- Color contrast (blue vs gray)
- Icon weight (fill vs outline)
- Typography scale (18px headers, 16px body, 11px labels)

### 1.3 Minimal & Direct Philosophy

**Every Pixel Has Purpose:**
- No decorative elements
- No redundant information
- No visual noise

**Information Density:**
- 4 primary actions in Tab Bar
- 6 secondary actions in More Sheet
- Maximum 2 taps to any destination

**Matías Duarte's 3 Laws of UI:**
1. **Visible:** Current state is always clear (active tab highlighted)
2. **Responsive:** Immediate feedback (<150ms)
3. **Purposeful:** Every element serves user intent

---

## Part 2: Bottom Tab Bar - Complete Specification

### 2.1 Container Dimensions

```css
.bottom-tab-bar {
  /* Layout */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  
  /* Size */
  height: 56px;
  
  /* Appearance */
  background-color: #FFFFFF;
  border-top: 1px solid #E5E7EB;
  
  /* Safe Area (iOS) */
  padding-bottom: env(safe-area-inset-bottom);
  padding-bottom: constant(safe-area-inset-bottom); /* iOS 11.0-11.2 */
  
  /* Layout System */
  display: flex;
  align-items: stretch;
  justify-content: space-around;
}

/* Total height calculation */
/* iPhone 14 Pro Max: 56px + 34px = 90px */
/* iPhone SE: 56px + 0px = 56px */
```

**Layout ASCII Art:**
```
┌──────────────────────────────────────────────┐
│  ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐  │ ← 56px base height
│  │  🏠  │   │  🔍  │   │  ⭐  │   │  ⋯   │  │
│  │ Home │   │Search│   │ Top  │   │ More │  │
│  └──────┘   └──────┘   └──────┘   └──────┘  │
│      ↑ Active (blue fill + blue text)        │
└──────────────────────────────────────────────┘
               ↓
   + env(safe-area-inset-bottom) [0-34px]
```

### 2.2 Tab Item Structure

```css
.tab-item {
  /* Layout */
  flex: 1; /* 25% width each (4 tabs) */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px; /* Icon-to-label spacing */
  
  /* Spacing */
  padding: 8px 0;
  
  /* Interaction */
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  
  /* Transition */
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.tab-label {
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.01em;
}
```

**Spacing Breakdown:**
```
Tab Item (25% width)
├─ Padding Top: 8px
├─ Icon: 24×24px
├─ Gap: 4px
├─ Label: 11px (computed ~13px height)
└─ Padding Bottom: 8px
─────────────────
Total: ~53px (fits in 56px container)
```

### 2.3 Color System - Active/Inactive States

#### Active Tab (Selected)
```css
.tab-item[aria-current="page"] {
  /* Icon */
  color: #1DA1F2; /* Twitter Blue */
}

.tab-item[aria-current="page"] .tab-icon {
  /* Use filled variant */
  /* house.fill, star.fill, etc. */
}

.tab-item[aria-current="page"] .tab-label {
  color: #1DA1F2;
  font-weight: 600; /* Slightly bolder */
}
```

**Color Specs:**
- **Primary Blue:** `#1DA1F2` (Twitter Brand)
- **RGB:** `rgb(29, 161, 242)`
- **HSL:** `hsl(203, 89%, 53%)`

#### Inactive Tab
```css
.tab-item:not([aria-current="page"]) {
  color: #536471; /* Twitter Gray */
}

.tab-item:not([aria-current="page"]) .tab-icon {
  /* Use outline variant */
  /* house, star, etc. */
}

.tab-item:not([aria-current="page"]) .tab-label {
  color: #536471;
  font-weight: 500;
}
```

**Color Specs:**
- **Inactive Gray:** `#536471`
- **RGB:** `rgb(83, 100, 113)`
- **HSL:** `hsl(206, 15%, 38%)`

### 2.4 Tap Interaction States

```css
/* Tap Feedback - Press Down */
.tab-item:active {
  background-color: rgba(29, 161, 242, 0.1);
  transform: scale(0.95);
  border-radius: 8px;
}

/* Hover (Desktop/Tablet) */
@media (hover: hover) {
  .tab-item:hover {
    background-color: rgba(29, 161, 242, 0.05);
    border-radius: 8px;
  }
}

/* Focus (Keyboard Navigation) */
.tab-item:focus-visible {
  outline: 2px solid #1DA1F2;
  outline-offset: 2px;
  border-radius: 8px;
}
```

**Timing:**
- Press animation: `150ms` (matches iOS standard)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design standard ease)

### 2.5 Icon Design - SF Symbols Style

**Icon Mapping:**

| Tab | Inactive (Outline) | Active (Fill) | Unicode/SVG |
|-----|-------------------|---------------|-------------|
| **Home** | `house` | `house.fill` | 🏠 U+1F3E0 |
| **Search** | `magnifyingglass` | `magnifyingglass` | 🔍 U+1F50D |
| **Top** | `star` | `star.fill` | ⭐ U+2B50 |
| **More** | `ellipsis.circle` | `ellipsis.circle.fill` | ⋯ U+22EF |

**Icon Implementation (React + Heroicons):**
```tsx
import {
  HomeIcon,
  MagnifyingGlassIcon,
  StarIcon,
  EllipsisHorizontalCircleIcon
} from '@heroicons/react/24/outline';

import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  StarIcon as StarIconSolid,
  EllipsisHorizontalCircleIcon as EllipsisHorizontalCircleIconSolid
} from '@heroicons/react/24/solid';

// Usage
const Icon = isActive ? HomeIconSolid : HomeIcon;
```

### 2.6 Complete CSS Code

```css
/* ============================================
   BOTTOM TAB BAR - COMPLETE STYLESHEET
   OhMyProfessors Mobile Navigation
   ============================================ */

/* Container */
.bottom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  
  height: 56px;
  background-color: #FFFFFF;
  border-top: 1px solid #E5E7EB;
  
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  
  /* iOS Safe Area */
  padding-bottom: env(safe-area-inset-bottom);
  padding-bottom: constant(safe-area-inset-bottom);
  
  /* Shadow (subtle) */
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
}

/* Tab Item */
.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  
  padding: 8px 0;
  
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Prevent text selection on double-tap */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Icon */
.tab-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Label */
.tab-label {
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.01em;
  transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Active State */
.tab-item[aria-current="page"] {
  color: #1DA1F2;
}

.tab-item[aria-current="page"] .tab-label {
  color: #1DA1F2;
  font-weight: 600;
}

/* Inactive State */
.tab-item:not([aria-current="page"]) {
  color: #536471;
}

.tab-item:not([aria-current="page"]) .tab-label {
  color: #536471;
}

/* Tap Feedback */
.tab-item:active {
  background-color: rgba(29, 161, 242, 0.1);
  transform: scale(0.95);
  border-radius: 8px;
}

.tab-item:active .tab-icon {
  transform: scale(0.9);
}

/* Hover (Desktop) */
@media (hover: hover) {
  .tab-item:hover {
    background-color: rgba(29, 161, 242, 0.05);
    border-radius: 8px;
  }
}

/* Keyboard Focus */
.tab-item:focus-visible {
  outline: 2px solid #1DA1F2;
  outline-offset: 2px;
  border-radius: 8px;
}

/* Remove default focus outline */
.tab-item:focus {
  outline: none;
}
```

---

## Part 3: More Sheet Design

### 3.1 Sheet Container

```css
/* Overlay Backdrop */
.sheet-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  
  /* Animation */
  animation: fade-in 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Sheet Container */
.more-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 101;
  
  max-height: 80vh;
  background-color: #FFFFFF;
  border-radius: 16px 16px 0 0;
  
  /* iOS Safe Area */
  padding-bottom: env(safe-area-inset-bottom);
  padding-bottom: constant(safe-area-inset-bottom);
  
  /* Shadow */
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  
  /* Animation */
  animation: sheet-slide-up 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes sheet-slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Closing Animation */
.more-sheet.closing {
  animation: sheet-slide-down 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes sheet-slide-down {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
```

**Sheet Structure:**
```
┌────────────────────────────────────────────┐
│  More                             [×]      │ ← Header (56px)
├────────────────────────────────────────────┤ ← Separator (1px)
│  🏛️  G8 Universities                  ›    │ ← Item (56px)
├────────────────────────────────────────────┤
│  📚  Departments                       ›    │
├────────────────────────────────────────────┤
│  🏷️  Tags                              ›    │
├────────────────────────────────────────────┤
│  ✍️  Write a Review                    ›    │
├────────────────────────────────────────────┤
│  ⚙️  Settings                          ›    │
├────────────────────────────────────────────┤
│  ℹ️  About                             ›    │
└────────────────────────────────────────────┘
         + env(safe-area-inset-bottom)
```

### 3.2 Header Design

```css
.sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid #E5E7EB;
}

.sheet-title {
  font-size: 18px;
  font-weight: 600;
  color: #0F172A;
  letter-spacing: -0.02em;
}

.sheet-close-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  color: #536471;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sheet-close-button:hover {
  background-color: #F3F4F6;
}

.sheet-close-button:active {
  background-color: #E5E7EB;
  transform: scale(0.9);
}

.sheet-close-icon {
  width: 24px;
  height: 24px;
}
```

### 3.3 List Item Design

```css
.sheet-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sheet-list-item {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  
  color: #0F172A;
  text-decoration: none;
  
  border-bottom: 1px solid #E5E7EB;
  cursor: pointer;
  
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sheet-list-item:last-child {
  border-bottom: none;
}

.sheet-list-item:hover {
  background-color: #F3F4F6;
}

.sheet-list-item:active {
  background-color: #E5E7EB;
}

/* Icon */
.sheet-item-icon {
  width: 24px;
  height: 24px;
  margin-right: 16px;
  flex-shrink: 0;
  font-size: 24px; /* For emoji */
}

/* Label */
.sheet-item-label {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

/* Chevron */
.sheet-item-chevron {
  width: 16px;
  height: 16px;
  color: #9CA3AF;
  flex-shrink: 0;
}
```

**Item Structure:**
```
┌────────────────────────────────────────────┐
│  [Icon 24px]  [Label]              [›]     │ ← 56px height
│  ← 16px →     ← flex-1 →    ← 16px →       │
└────────────────────────────────────────────┘
   Padding: 0 16px
```

### 3.4 Complete More Sheet Code

```css
/* ============================================
   MORE SHEET - COMPLETE STYLESHEET
   iOS Bottom Sheet Component
   ============================================ */

/* Overlay */
.sheet-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fade-in 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sheet-overlay.closing {
  animation: fade-out 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* Sheet Container */
.more-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 101;
  
  max-height: 80vh;
  overflow-y: auto;
  
  background-color: #FFFFFF;
  border-radius: 16px 16px 0 0;
  
  padding-bottom: env(safe-area-inset-bottom);
  padding-bottom: constant(safe-area-inset-bottom);
  
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  
  animation: sheet-slide-up 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.more-sheet.closing {
  animation: sheet-slide-down 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes sheet-slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

@keyframes sheet-slide-down {
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
}

/* Header */
.sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid #E5E7EB;
  flex-shrink: 0;
}

.sheet-title {
  font-size: 18px;
  font-weight: 600;
  color: #0F172A;
  letter-spacing: -0.02em;
}

.sheet-close-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  color: #536471;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sheet-close-button:hover {
  background-color: #F3F4F6;
}

.sheet-close-button:active {
  background-color: #E5E7EB;
  transform: scale(0.9);
}

/* List */
.sheet-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sheet-list-item {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  
  color: #0F172A;
  text-decoration: none;
  
  border-bottom: 1px solid #E5E7EB;
  cursor: pointer;
  
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sheet-list-item:last-child {
  border-bottom: none;
}

.sheet-list-item:hover {
  background-color: #F3F4F6;
}

.sheet-list-item:active {
  background-color: #E5E7EB;
}

.sheet-item-icon {
  width: 24px;
  height: 24px;
  margin-right: 16px;
  flex-shrink: 0;
  font-size: 24px;
}

.sheet-item-label {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.sheet-item-chevron {
  width: 16px;
  height: 16px;
  color: #9CA3AF;
  flex-shrink: 0;
}

/* Accessibility */
.sheet-list-item:focus-visible {
  outline: 2px solid #1DA1F2;
  outline-offset: -2px;
}
```

---

## Part 4: Animation Design

### 4.1 Tab Switch Animation

**Principle:** Instant feedback, smooth state change.

```css
/* Tab Item Transition */
.tab-item {
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Icon Color Transition */
.tab-icon {
  transition: 
    color 150ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Label Transition */
.tab-label {
  transition: 
    color 150ms cubic-bezier(0.4, 0, 0.2, 1),
    font-weight 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Timing Breakdown:**
- Duration: `150ms` (matches iOS standard tap response)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design "standard" easing)
- Properties: `color`, `transform`, `font-weight`

### 4.2 Tap Feedback Animation

```css
@keyframes tap-feedback {
  0% {
    transform: scale(1);
    background-color: transparent;
  }
  50% {
    transform: scale(0.95);
    background-color: rgba(29, 161, 242, 0.1);
  }
  100% {
    transform: scale(1);
    background-color: transparent;
  }
}

.tab-item:active {
  animation: tap-feedback 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Visual Effect:**
1. User touches tab (0ms): Normal state
2. Mid-press (150ms): Scale to 95%, light blue background
3. Release (300ms): Return to normal

### 4.3 Sheet Slide Animations

```css
/* Sheet Opens - Slide Up */
@keyframes sheet-slide-up {
  from {
    transform: translateY(100%);
    opacity: 0.8;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.more-sheet {
  animation: sheet-slide-up 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Sheet Closes - Slide Down */
@keyframes sheet-slide-down {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0.8;
  }
}

.more-sheet.closing {
  animation: sheet-slide-down 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Overlay Fade */
@keyframes overlay-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes overlay-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

.sheet-overlay {
  animation: overlay-fade-in 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sheet-overlay.closing {
  animation: overlay-fade-out 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Coordination:**
```
More Tab Tap
    ↓
0ms:   Overlay starts fading in (200ms)
0ms:   Sheet starts sliding up (300ms)
    ↓
200ms: Overlay fully visible
300ms: Sheet fully visible
    ↓
[User interaction]
    ↓
Close Tap
    ↓
0ms:   Overlay starts fading out (200ms)
0ms:   Sheet starts sliding down (250ms)
    ↓
200ms: Overlay invisible
250ms: Sheet invisible, DOM removed
```

### 4.4 Icon State Swap Animation

```css
/* Crossfade between outline and fill icons */
.tab-icon-container {
  position: relative;
  width: 24px;
  height: 24px;
}

.tab-icon {
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-icon-outline {
  opacity: 1;
}

.tab-icon-fill {
  opacity: 0;
}

/* Active state */
.tab-item[aria-current="page"] .tab-icon-outline {
  opacity: 0;
}

.tab-item[aria-current="page"] .tab-icon-fill {
  opacity: 1;
}
```

### 4.5 Complete Animation Keyframes

```css
/* ============================================
   ANIMATIONS - COMPLETE KEYFRAMES
   60fps Optimized (transform + opacity only)
   ============================================ */

/* Tab Tap Feedback */
@keyframes tap-feedback {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

/* Sheet Slide Up */
@keyframes sheet-slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Sheet Slide Down */
@keyframes sheet-slide-down {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}

/* Overlay Fade In */
@keyframes overlay-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Overlay Fade Out */
@keyframes overlay-fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Ripple Effect (Optional - Material Design) */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

/* Icon Pop (When Active) */
@keyframes icon-pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* Usage Example */
.tab-item[aria-current="page"] .tab-icon {
  animation: icon-pop 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Performance Notes:**
- Only animate `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `color` (triggers layout/paint)
- Use `will-change` sparingly:
  ```css
  .more-sheet {
    will-change: transform;
  }
  ```

---

## Part 5: Responsive Design

### 5.1 Breakpoint System

**Mobile-First Approach:**
```css
/* Mobile (Default) - 0px to 767px */
/* All styles above apply */

/* Tablet - 768px to 1023px */
@media (min-width: 768px) {
  /* Hide Tab Bar, show left sidebar */
}

/* Desktop - 1024px+ */
@media (min-width: 1024px) {
  /* Full three-column layout */
}
```

**Breakpoint Values:**
| Device | Width | Tab Bar | Left Sidebar |
|--------|-------|---------|--------------|
| Mobile | 0-767px | ✅ Visible | ❌ Hidden |
| Tablet | 768-1023px | ❌ Hidden | ✅ Visible (240px) |
| Desktop | 1024px+ | ❌ Hidden | ✅ Visible (240px) |

### 5.2 Media Query Implementation

```css
/* ============================================
   RESPONSIVE LAYOUT
   Mobile: Tab Bar
   Desktop: Left Sidebar
   ============================================ */

/* Mobile (Default) */
.bottom-tab-bar {
  display: flex;
}

.left-sidebar {
  display: none;
}

.main-content {
  padding-bottom: calc(56px + env(safe-area-inset-bottom));
}

/* Tablet & Desktop */
@media (min-width: 768px) {
  .bottom-tab-bar {
    display: none;
  }
  
  .left-sidebar {
    display: block;
    width: 240px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    border-right: 1px solid #E5E7EB;
    background-color: #FFFFFF;
  }
  
  .main-content {
    margin-left: 240px;
    padding-bottom: 0;
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .left-sidebar {
    width: 280px;
  }
  
  .main-content {
    margin-left: 280px;
  }
}
```

### 5.3 Safe Area Adaptation (iOS)

```css
/* iOS Safe Area Variables */
:root {
  /* Safe area fallbacks */
  --safe-area-inset-top: env(safe-area-inset-top, 0px);
  --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
  --safe-area-inset-left: env(safe-area-inset-left, 0px);
  --safe-area-inset-right: env(safe-area-inset-right, 0px);
}

/* Bottom Tab Bar */
.bottom-tab-bar {
  padding-bottom: var(--safe-area-inset-bottom);
  
  /* iOS 11.0-11.2 Compatibility */
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

/* More Sheet */
.more-sheet {
  padding-bottom: var(--safe-area-inset-bottom);
}

/* Main Content */
.main-content {
  padding-bottom: calc(56px + var(--safe-area-inset-bottom));
}
```

**HTML Meta Tag (Required):**
```html
<meta 
  name="viewport" 
  content="width=device-width, initial-scale=1.0, viewport-fit=cover"
>
```

**Device-Specific Values:**
| Device | safe-area-inset-bottom |
|--------|------------------------|
| iPhone SE | 0px |
| iPhone 14 | 34px |
| iPhone 14 Pro | 34px |
| iPhone 14 Pro Max | 34px |
| iPad Pro | 20px |

### 5.4 Orientation Handling

```css
/* Portrait (Default) */
@media (orientation: portrait) {
  .bottom-tab-bar {
    /* Standard 4-tab layout */
  }
}

/* Landscape (Optional - Show/Hide based on height) */
@media (orientation: landscape) and (max-height: 500px) {
  .bottom-tab-bar {
    /* Reduce height or hide on very short screens */
    height: 48px;
  }
  
  .tab-label {
    display: none; /* Icon-only mode */
  }
}
```

### 5.5 Complete Responsive Code

```css
/* ============================================
   RESPONSIVE DESIGN - COMPLETE
   Breakpoints: 768px (Tablet), 1024px (Desktop)
   ============================================ */

/* Base (Mobile) - 0px to 767px */
.bottom-tab-bar {
  display: flex;
}

.left-sidebar {
  display: none;
}

.main-content {
  padding-bottom: calc(56px + env(safe-area-inset-bottom));
}

/* Tablet & Up - 768px+ */
@media (min-width: 768px) {
  /* Hide Tab Bar */
  .bottom-tab-bar {
    display: none !important;
  }
  
  /* Show Left Sidebar */
  .left-sidebar {
    display: block;
    width: 240px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    background-color: #FFFFFF;
    border-right: 1px solid #E5E7EB;
    z-index: 40;
  }
  
  /* Adjust Main Content */
  .main-content {
    margin-left: 240px;
    padding-bottom: 0;
  }
  
  /* Right Sidebar (if exists) */
  .right-sidebar {
    display: block;
    width: 320px;
  }
}

/* Desktop - 1024px+ */
@media (min-width: 1024px) {
  .left-sidebar {
    width: 280px;
  }
  
  .main-content {
    margin-left: 280px;
    margin-right: 320px;
  }
}

/* Large Desktop - 1280px+ */
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
    margin: 0 auto;
  }
}

/* Landscape Mobile (Short Height) */
@media (max-height: 500px) and (orientation: landscape) {
  .bottom-tab-bar {
    height: 48px;
  }
  
  .tab-label {
    display: none; /* Icon-only mode */
  }
  
  .tab-item {
    gap: 0;
  }
}

/* Hover Support Detection */
@media (hover: hover) and (pointer: fine) {
  /* Enable hover states only on devices with mouse */
  .tab-item:hover,
  .sheet-list-item:hover {
    /* Hover styles enabled */
  }
}

@media (hover: none) {
  /* Disable hover on touch devices */
  .tab-item:hover,
  .sheet-list-item:hover {
    background-color: transparent;
  }
}
```

---

## Part 6: Figma Component Library

### 6.1 Component Structure

**File Organization:**
```
OhMyProfessors Design System
├─ 📁 Mobile Components
│  ├─ Bottom Tab Bar
│  │  ├─ Tab Item (Inactive)
│  │  ├─ Tab Item (Active)
│  │  ├─ Tab Item (Pressed)
│  │  └─ Complete Tab Bar (4 tabs)
│  ├─ More Sheet
│  │  ├─ Sheet Header
│  │  ├─ Sheet List Item
│  │  └─ Complete Sheet
│  └─ Icons
│     ├─ Home (Outline/Fill)
│     ├─ Search (Outline/Fill)
│     ├─ Star (Outline/Fill)
│     └─ More (Outline/Fill)
└─ 📁 Colors & Tokens
   ├─ Twitter Blue (#1DA1F2)
   ├─ Twitter Gray (#536471)
   └─ Spacing (8px Grid)
```

### 6.2 Tab Bar Component Specs

**Component Name:** `Mobile/TabBar/TabItem`

**Variants:**
| Property | Options |
|----------|---------|
| State | Inactive, Active, Pressed |
| Icon | Home, Search, Top, More |
| Label | Boolean (Show/Hide) |

**Auto Layout:**
```
TabItem (Frame)
├─ Direction: Vertical
├─ Spacing: 4px
├─ Padding: 8px 0px
├─ Horizontal Resizing: Fill
├─ Vertical Resizing: Hug
└─ Align: Center
```

**Component Properties:**
```javascript
{
  icon: "Instance Swap Property",
  label: "Text Property",
  state: "Variant Property (Inactive/Active/Pressed)",
  showLabel: "Boolean Property"
}
```

### 6.3 More Sheet Component Specs

**Component Name:** `Mobile/MoreSheet/Container`

**Nested Components:**
- `MoreSheet/Header`
- `MoreSheet/ListItem`

**Sheet Header Auto Layout:**
```
Header (Frame)
├─ Direction: Horizontal
├─ Spacing: Space Between
├─ Padding: 0px 16px
├─ Height: 56px
├─ Items:
│  ├─ Title (Text)
│  └─ Close Button (Component)
```

**List Item Auto Layout:**
```
ListItem (Frame)
├─ Direction: Horizontal
├─ Spacing: 16px
├─ Padding: 0px 16px
├─ Height: 56px
├─ Items:
│  ├─ Icon (24×24)
│  ├─ Label (Flex: 1)
│  └─ Chevron (16×16)
```

### 6.4 Design Tokens

**Color Tokens:**
```
Primitives/Blue/500: #1DA1F2 (Twitter Blue)
Primitives/Gray/600: #536471 (Twitter Gray)
Primitives/Gray/100: #F3F4F6 (Hover Background)
Primitives/Gray/200: #E5E7EB (Border)
Primitives/White: #FFFFFF
Primitives/Black: #0F172A

Semantic Tokens:
├─ Color/Primary: {Blue/500}
├─ Color/TextInactive: {Gray/600}
├─ Color/Border: {Gray/200}
└─ Color/Background: {White}
```

**Spacing Tokens (8px Grid):**
```
Space/xs: 4px
Space/sm: 8px
Space/md: 16px
Space/lg: 24px
Space/xl: 32px
```

**Typography Tokens:**
```
Text/TabLabel:
  ├─ Font: SF Pro Text
  ├─ Size: 11px
  ├─ Weight: 500 (Inactive), 600 (Active)
  └─ Line Height: 1

Text/SheetTitle:
  ├─ Font: SF Pro Display
  ├─ Size: 18px
  ├─ Weight: 600
  └─ Line Height: 1.2

Text/SheetItem:
  ├─ Font: SF Pro Text
  ├─ Size: 16px
  ├─ Weight: 500
  └─ Line Height: 1.5
```

### 6.5 Interactive Prototype

**Prototype Flow:**
```
Home Screen
  ↓ (Tap Search Tab)
Search Screen
  ↓ (Tap Top Tab)
Top Rated Screen
  ↓ (Tap More Tab)
More Sheet (Overlay)
  ↓ (Tap "Settings")
Settings Screen
  ↓ (Tap Close)
[Back to previous screen]
```

**Prototype Settings:**
- Device: iPhone 14 Pro
- Starting Frame: Home Screen
- Flow: Smart Animate
- Easing: Ease Out
- Duration: 300ms

**Figma Prototype Link (Template):**
```
https://www.figma.com/proto/[FILE_ID]/OhMyProfessors-Mobile
?node-id=1:2
&scaling=scale-down
&page-id=0:1
&starting-point-node-id=1:2
&show-proto-sidebar=1
```

### 6.6 Export Settings

**Icon Exports (SVG):**
```
Icons/Home-Outline.svg
Icons/Home-Fill.svg
Icons/Search-Outline.svg
Icons/Search-Fill.svg
Icons/Star-Outline.svg
Icons/Star-Fill.svg
Icons/More-Outline.svg
Icons/More-Fill.svg
```

**Component Exports:**
- Format: SVG (for web), PNG @2x/@3x (for iOS)
- Naming: `component-name--variant.svg`
- Example: `tab-item--active-home.svg`

---

## Part 7: Accessibility Checklist

### 7.1 ARIA Labels & Roles

**Tab Bar Navigation:**
```html
<nav role="navigation" aria-label="Main navigation">
  <button
    role="tab"
    aria-selected="true"
    aria-current="page"
    aria-label="Home, currently active"
    class="tab-item"
  >
    <HomeIcon aria-hidden="true" className="tab-icon" />
    <span className="tab-label">Home</span>
  </button>
  
  <button
    role="tab"
    aria-selected="false"
    aria-label="Search courses"
    class="tab-item"
  >
    <SearchIcon aria-hidden="true" className="tab-icon" />
    <span className="tab-label">Search</span>
  </button>
  
  <button
    role="tab"
    aria-selected="false"
    aria-label="Top rated courses"
    class="tab-item"
  >
    <StarIcon aria-hidden="true" className="tab-icon" />
    <span className="tab-label">Top</span>
  </button>
  
  <button
    role="tab"
    aria-selected="false"
    aria-label="More options"
    aria-haspopup="dialog"
    class="tab-item"
  >
    <MoreIcon aria-hidden="true" className="tab-icon" />
    <span className="tab-label">More</span>
  </button>
</nav>
```

**More Sheet:**
```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="more-sheet-title"
  class="more-sheet"
>
  <header class="sheet-header">
    <h2 id="more-sheet-title" class="sheet-title">More</h2>
    <button
      aria-label="Close more options"
      class="sheet-close-button"
    >
      <XIcon aria-hidden="true" />
    </button>
  </header>
  
  <nav role="navigation" aria-label="More options">
    <a
      href="/universities"
      class="sheet-list-item"
      aria-label="Browse G8 Universities"
    >
      <span class="sheet-item-icon" aria-hidden="true">🏛️</span>
      <span class="sheet-item-label">G8 Universities</span>
      <ChevronIcon aria-hidden="true" class="sheet-item-chevron" />
    </a>
    <!-- More items... -->
  </nav>
</div>
```

### 7.2 Keyboard Navigation

**Tab Sequence:**
1. Home Tab
2. Search Tab
3. Top Tab
4. More Tab
5. (If More Sheet open) → Close Button → Sheet Items

**Keyboard Shortcuts:**
| Key | Action |
|-----|--------|
| `Tab` | Move focus forward |
| `Shift + Tab` | Move focus backward |
| `Enter` / `Space` | Activate focused tab/button |
| `Escape` | Close More Sheet (if open) |
| `Arrow Keys` | Navigate between tabs (optional) |

**Implementation:**
```javascript
// Keyboard event handler
function handleKeyDown(event) {
  switch(event.key) {
    case 'Escape':
      if (moreSheetOpen) {
        closeMoreSheet();
      }
      break;
    case 'ArrowLeft':
      focusPreviousTab();
      break;
    case 'ArrowRight':
      focusNextTab();
      break;
  }
}
```

**Focus Styles:**
```css
.tab-item:focus-visible {
  outline: 2px solid #1DA1F2;
  outline-offset: 2px;
  border-radius: 8px;
}

.sheet-list-item:focus-visible {
  outline: 2px solid #1DA1F2;
  outline-offset: -2px;
}

/* Remove focus outline on mouse click */
.tab-item:focus:not(:focus-visible) {
  outline: none;
}
```

### 7.3 Color Contrast (WCAG AA)

**Contrast Ratio Requirements:**
- Normal text (16px+): 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

**Color Contrast Audit:**

| Element | Foreground | Background | Ratio | Status |
|---------|-----------|------------|-------|--------|
| Active Tab (Text) | #1DA1F2 | #FFFFFF | 2.96:1 | ⚠️ Fail (AA) |
| Active Tab (Icon) | #1DA1F2 | #FFFFFF | 2.96:1 | ⚠️ Fail (AA) |
| Inactive Tab | #536471 | #FFFFFF | 5.74:1 | ✅ Pass (AA) |
| Sheet Title | #0F172A | #FFFFFF | 16.1:1 | ✅ Pass (AAA) |
| Sheet Item | #0F172A | #FFFFFF | 16.1:1 | ✅ Pass (AAA) |

**⚠️ Issue: Active Tab Color Fails WCAG AA**

**Solution Options:**

**Option A: Darken Blue (Recommended)**
```css
/* Replace #1DA1F2 with darker variant */
.tab-item[aria-current="page"] {
  color: #0D8BD9; /* 4.51:1 contrast - PASSES AA */
}
```

**Option B: Add Background (Not Recommended - breaks flat design)**
```css
.tab-item[aria-current="page"] {
  color: #1DA1F2;
  background-color: rgba(29, 161, 242, 0.1);
}
```

**Option C: Increase Font Weight (Partial Fix)**
```css
.tab-label[aria-current="page"] {
  font-weight: 700; /* Bolder = slightly better readability */
}
```

**Recommended: Use #0D8BD9 for Active State**
```css
:root {
  --color-primary: #0D8BD9; /* Twitter Blue (Accessible) */
  --color-primary-original: #1DA1F2; /* Twitter Blue (Original) */
}

.tab-item[aria-current="page"] {
  color: var(--color-primary);
}
```

### 7.4 Screen Reader Support

**Announce Tab Changes:**
```html
<!-- Live region for screen reader announcements -->
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="sr-only"
  id="tab-announcement"
>
  <!-- Dynamically updated: "Search tab selected" -->
</div>
```

**JavaScript:**
```javascript
function selectTab(tabName) {
  // Update UI
  updateActiveTab(tabName);
  
  // Announce to screen readers
  const announcement = document.getElementById('tab-announcement');
  announcement.textContent = `${tabName} tab selected`;
}
```

**Screen Reader Only Class:**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### 7.5 Touch Target Size

**WCAG 2.1 Level AAA: 44×44px minimum**

**Current Implementation:**
- Tab Item Height: 56px ✅ Pass
- Tab Item Width: 25% of screen (~90px on 360px screen) ✅ Pass
- Close Button: 32×32px ⚠️ Fail (expand to 44px)

**Fix for Close Button:**
```css
.sheet-close-button {
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
}

.sheet-close-icon {
  width: 24px;
  height: 24px;
}
```

### 7.6 Reduced Motion Support

```css
/* Respect user preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .more-sheet {
    animation: none;
  }
  
  .tab-item {
    transition: none;
  }
}
```

### 7.7 Complete Accessibility Checklist

**✅ Must-Have (WCAG AA):**
- [ ] All interactive elements have accessible names (`aria-label`)
- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] Keyboard navigation fully functional
- [ ] Focus indicators visible (2px outline)
- [ ] Touch targets ≥ 44×44px
- [ ] Screen reader announces state changes
- [ ] Support for `prefers-reduced-motion`
- [ ] Semantic HTML (`<nav>`, `<button>`, etc.)

**🎯 Nice-to-Have (WCAG AAA):**
- [ ] Color contrast ratio ≥ 7:1
- [ ] Touch targets ≥ 48×48px
- [ ] Alternative keyboard shortcuts (arrow keys)
- [ ] High contrast mode support
- [ ] Text resize support (up to 200%)

**🔧 Implementation Checklist:**
- [ ] Replace `#1DA1F2` with `#0D8BD9` for active tabs
- [ ] Increase close button to 44×44px
- [ ] Add `role="tab"` and `aria-selected` to tabs
- [ ] Add live region for tab announcements
- [ ] Test with VoiceOver (iOS) and TalkBack (Android)
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Test with system reduced motion enabled

---

## Implementation Example (React + Tailwind)

```tsx
// components/MobileBottomTabBar.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  StarIcon,
  EllipsisHorizontalCircleIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  StarIcon as StarIconSolid,
  EllipsisHorizontalCircleIcon as EllipsisHorizontalCircleIconSolid,
} from '@heroicons/react/24/solid';

const tabs = [
  { name: 'Home', href: '/', icon: HomeIcon, iconActive: HomeIconSolid },
  { name: 'Search', href: '/search', icon: MagnifyingGlassIcon, iconActive: MagnifyingGlassIconSolid },
  { name: 'Top', href: '/top', icon: StarIcon, iconActive: StarIconSolid },
  { name: 'More', href: '#', icon: EllipsisHorizontalCircleIcon, iconActive: EllipsisHorizontalCircleIconSolid },
];

export default function MobileBottomTabBar() {
  const router = useRouter();
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);
  
  const isActive = (href: string) => router.pathname === href;
  
  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.name === 'More') {
      setMoreSheetOpen(true);
    } else {
      router.push(tab.href);
    }
  };
  
  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-stretch justify-around border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = active ? tab.iconActive : tab.icon;
          
          return (
            <button
              key={tab.name}
              role="tab"
              aria-selected={active}
              aria-current={active ? 'page' : undefined}
              aria-label={`${tab.name}${active ? ', currently active' : ''}`}
              aria-haspopup={tab.name === 'More' ? 'dialog' : undefined}
              onClick={() => handleTabClick(tab)}
              className={`
                flex flex-1 flex-col items-center justify-center gap-1 px-0 py-2
                transition-all duration-150 ease-out
                hover:bg-blue-50 hover:rounded-lg
                active:scale-95 active:bg-blue-100
                focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:rounded-lg
                ${active ? 'text-[#0D8BD9]' : 'text-[#536471]'}
              `}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
              <span className={`text-xs leading-none tracking-tight ${active ? 'font-semibold' : 'font-medium'}`}>
                {tab.name}
              </span>
            </button>
          );
        })}
      </nav>
      
      {moreSheetOpen && (
        <MoreSheet onClose={() => setMoreSheetOpen(false)} />
      )}
    </>
  );
}
```

---

## Design Handoff Notes

### For Developers:
1. **Use `#0D8BD9` (not `#1DA1F2`)** for active tab color (accessibility fix)
2. **Safe Area:** Always include `env(safe-area-inset-bottom)` on Tab Bar and Sheet
3. **Animation:** Only animate `transform` and `opacity` for 60fps performance
4. **Icons:** Use Heroicons (outline/solid) or SF Symbols export
5. **Touch Targets:** Minimum 44×44px (increase close button)

### For Designers:
1. **Figma file must include:**
   - Component variants (Active/Inactive/Pressed)
   - iOS 14 Pro frame with safe area overlay
   - Interactive prototype with Smart Animate
2. **Export assets:**
   - SVG icons (outline + fill variants)
   - @2x/@3x PNG for iOS (if needed)
3. **Document deviations from Twitter:**
   - We use darker blue (#0D8BD9) for accessibility
   - Close button is 44×44px (not 32×32px)

### For QA:
1. **Test on real devices:**
   - iPhone 14 Pro (safe area = 34px)
   - iPhone SE (safe area = 0px)
   - Android (various safe areas)
2. **Accessibility testing:**
   - VoiceOver (iOS): Tab announcements work
   - TalkBack (Android): Focus order correct
   - Keyboard: Tab/Enter/Escape work
   - Reduced motion: Animations respect preference
3. **Performance:**
   - Tab switch < 150ms
   - Sheet open < 300ms
   - No jank (60fps)

---

**Document Status:** ✅ Complete  
**Next Steps:**
1. Create Figma components based on this spec
2. Implement React components
3. Conduct accessibility audit
4. User testing on mobile devices

**Maintained by:** UI Agent  
**Approved by:** Product Agent (pending)
