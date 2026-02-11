# Twitter-Style Three-Column Layout - Visual Specification

**Project:** OhMyProfessors  
**Version:** 1.0  
**Last Updated:** 2026-02-11  
**Design Philosophy:** Material Design Flat + Academic Excellence

---

## Design Principles

### Core Values
1. **Clarity Over Complexity** - Every pixel serves a purpose
2. **Flat Design** - No gradients, shadows only for elevation hierarchy
3. **8px Grid System** - All measurements align to 8px increments
4. **Golden Accent** - `#D4AF37` represents academic excellence
5. **Material Elevation** - Subtle shadows define depth, not decoration

### Matías Duarte's Three Questions
- **What is this?** → Academic platform for professor reviews
- **What can I do here?** → Search, read reviews, write reviews
- **Where am I?** → Clear navigation hierarchy, persistent orientation

---

## 1. Three-Column Layout Dimensions

### Overall Structure
```
Total Width: 1240px
├─ Left Sidebar:    240px
├─ Gap:              0px (border serves as separator)
├─ Center Feed:     600px
├─ Gap:              0px (border serves as separator)
└─ Right Sidebar:   320px

Margins: 40px (left + right)
Content Area: 1160px
```

### Column Specifications

#### Left Sidebar (Navigation)
```css
Width:       240px
Background:  #FFFFFF
Border:      right 1px solid #E5E7EB
Position:    sticky
Top:         0
Height:      100vh
Overflow-y:  auto
```

#### Center Feed (Main Content)
```css
Width:       600px
Background:  #FFFFFF
Border:      left 1px solid #E5E7EB
             right 1px solid #E5E7EB
Min-height:  100vh
```

#### Right Sidebar (Widgets)
```css
Width:       320px
Background:  #F9FAFB
Border:      left 1px solid #E5E7EB
Position:    sticky
Top:         0
Height:      100vh
Overflow-y:  auto
```

---

## 2. Left Navigation Sidebar Design

### Logo Area
```
Height:        64px
Padding:       12px 16px
Alignment:     Horizontal flex, center-aligned

Logo Icon:
  Size:        40×40px
  Format:      SVG (preferred) or PNG @2x
  Margin:      right 12px

Wordmark:
  Font:        'Inter' or 'SF Pro Display'
  Size:        16px
  Weight:      600 (Semibold)
  Color:       #111827
  Line-height: 24px
```

### Navigation Menu Items
```
Structure:     Vertical list, 8px gap between items

Each Item:
  Height:      48px
  Padding:     12px 16px
  Border-radius: 12px
  Margin:      0 8px (for hover/active effect)
  Cursor:      pointer
  Transition:  background 200ms ease

Icon:
  Size:        24×24px
  Margin:      right 16px
  Color:       #6B7280 (default)
           → #6366F1 (active)

Text:
  Font:        'Inter'
  Size:        16px
  Weight:      500 (Medium)
  Color:       #374151 (default)
           → #6366F1 (active)

States:
  Default:     background transparent
  Hover:       background #F3F4F6
  Active:      background #E5E7FF
               color #6366F1 (icon + text)
```

### Primary CTA (Write a Review)
```
Position:      Bottom of menu (or after last item)
Margin:        16px 16px 24px 16px

Button:
  Width:       208px (240px - 32px margin)
  Height:      48px
  Background:  #D4AF37 (Golden)
  Border-radius: 24px (pill)
  Border:      none
  Box-shadow:  0 2px 4px rgba(212, 175, 55, 0.2)

Text:
  Font:        'Inter'
  Size:        16px
  Weight:      600 (Semibold)
  Color:       #FFFFFF
  Letter-spacing: 0.01em

States:
  Hover:       background #C49F2F
               box-shadow 0 4px 8px rgba(212, 175, 55, 0.3)
  Active:      background #B58F27
               transform scale(0.98)
  Disabled:    background #E5E7EB
               color #9CA3AF
               cursor not-allowed
```

---

## 3. Center Content Feed Design

### Simplified Hero Section
```
Height:        120px
Padding:       24px 16px
Background:    #FFFFFF
Border-bottom: 1px solid #E5E7EB

Slogan:
  Font:        'Inter'
  Size:        24px
  Weight:      700 (Bold)
  Color:       #111827
  Align:       center
  Margin:      bottom 16px
  
Search Bar:
  Width:       580px
  Height:      48px
  Margin:      0 auto
  Border:      1px solid #D1D5DB
  Border-radius: 24px
  Background:  #F9FAFB
  Padding:     0 20px
  
  Icon:
    Size:      20×20px
    Color:     #6B7280
    Position:  left 20px
  
  Input:
    Font:      'Inter'
    Size:      15px
    Weight:    400
    Color:     #111827
    Placeholder: #9CA3AF
```

### Sticky Search Bar (Scroll State)
```
Position:      sticky
Top:           0
Z-index:       10
Background:    #FFFFFF
Box-shadow:    0 2px 8px rgba(0, 0, 0, 0.1)
Border-bottom: 1px solid #E5E7EB

Animation:
  Trigger:     scroll > 120px
  Transition:  box-shadow 300ms ease
```

### Professor Card List
```
Padding:       16px

Card Container:
  Width:       568px (600px - 32px padding)
  Margin:      0 auto 12px auto
  
Card:
  Background:  #FFFFFF
  Border:      1px solid #E5E7EB
  Border-radius: 12px
  Padding:     16px
  Transition:  border-color 200ms ease,
               box-shadow 200ms ease
  
  States:
    Hover:     border-color #6366F1
               box-shadow 0 2px 8px rgba(99, 102, 241, 0.1)
    
Card Header:
  Display:     flex
  Align:       items-start
  Margin:      bottom 12px
  
  Avatar:
    Size:      48×48px
    Border-radius: 50%
    Margin:    right 12px
  
  Name:
    Font:      'Inter'
    Size:      16px
    Weight:    600
    Color:     #111827
    Line-height: 20px
  
  Department:
    Font:      'Inter'
    Size:      14px
    Weight:    400
    Color:     #6B7280
    Line-height: 18px

Rating Display:
  Display:     inline-flex
  Align:       center
  Gap:         4px
  
  Star Icons:
    Size:      16×16px
    Color:     #D4AF37 (filled)
               #E5E7EB (empty)
  
  Score:
    Font:      'Inter'
    Size:      14px
    Weight:    600
    Color:     #111827
```

---

## 4. Right Sidebar Widgets Design

### Widget Container Standards
```
Width:         288px
Margin:        0 16px 16px 16px (first has margin-top: 16px)
Background:    #FFFFFF
Border:        1px solid #E5E7EB
Border-radius: 12px
Padding:       20px
Box-shadow:    0 1px 3px rgba(0, 0, 0, 0.05)
```

### Quick Stats Widget
```
Header:
  Text:        "Quick Stats"
  Font:        'Inter'
  Size:        14px
  Weight:      600
  Color:       #111827
  Margin:      bottom 16px
  
Stat Item:
  Display:     block
  Margin:      bottom 12px (last: 0)
  
  Number:
    Font:      'Inter'
    Size:      24px
    Weight:    700
    Color:     #111827
    Line-height: 32px
  
  Label:
    Font:      'Inter'
    Size:      12px
    Weight:    400
    Color:     #6B7280
    Line-height: 16px
    Margin:    top 2px
```

### Trending Professors Widget
```
Header:
  Text:        "Trending Professors"
  Font:        'Inter'
  Size:        14px
  Weight:      600
  Color:       #111827
  Margin:      bottom 16px

List Item:
  Height:      56px
  Display:     flex
  Align:       center
  Padding:     8px 0
  Border-bottom: 1px solid #F3F4F6 (except last)
  
  Avatar:
    Size:      40×40px
    Border-radius: 50%
    Margin:    right 12px
  
  Info:
    Flex:      1
    
    Name:
      Font:    'Inter'
      Size:    14px
      Weight:  600
      Color:   #111827
      Line-height: 18px
      Margin:  bottom 2px
    
    Rating:
      Display: inline-flex
      Align:   center
      Gap:     4px
      
      Stars:
        Size:  12×12px
        Color: #D4AF37
      
      Score:
        Font:  'Inter'
        Size:  12px
        Weight: 500
        Color: #6B7280
```

---

## 5. Sticky Behavior Specifications

### Left Sidebar
```css
.left-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Scrollbar styling (optional) */
.left-sidebar::-webkit-scrollbar {
  width: 6px;
}

.left-sidebar::-webkit-scrollbar-thumb {
  background: #D1D5DB;
  border-radius: 3px;
}
```

### Right Sidebar
```css
.right-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.right-sidebar::-webkit-scrollbar {
  width: 6px;
}

.right-sidebar::-webkit-scrollbar-thumb {
  background: #D1D5DB;
  border-radius: 3px;
}
```

### Center Feed Sticky Search
```css
.search-sticky {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #FFFFFF;
  transition: box-shadow 300ms ease;
}

.search-sticky.scrolled {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #E5E7EB;
}
```

---

## 6. Responsive Design Breakpoints

### Desktop (≥1280px)
```
Layout:        Three columns visible
Left Sidebar:  240px
Center:        600px
Right Sidebar: 320px
Container:     1240px max-width
```

### Tablet (768px - 1279px)
```
Layout:        Collapsed left + center + right

Left Sidebar:
  Width:       80px (icon-only)
  Text:        hidden
  Logo:        icon only
  CTA:         icon only (edit pencil)

Center:        Flexible width (100% - 80px - 320px)
Right Sidebar: 320px (unchanged)

Total:         100vw
```

### Mobile (<768px)
```
Layout:        Single column

Left Sidebar:  Hidden (replaced by bottom nav)
Center:        100vw
Right Sidebar: Hidden

Bottom Navigation:
  Height:      64px
  Position:    fixed bottom
  Background:  #FFFFFF
  Border-top:  1px solid #E5E7EB
  Items:       4-5 icons
  Icon size:   24×24px
  Active:      #6366F1
```

---

## 7. Design System Tokens

### Color Palette
```scss
// Primary Colors
$primary-gold:      #D4AF37;
$primary-gold-dark: #C49F2F;
$primary-blue:      #6366F1;
$primary-blue-light: #E5E7FF;

// Neutral Colors
$black:         #111827;
$gray-900:      #1F2937;
$gray-800:      #374151;
$gray-700:      #4B5563;
$gray-600:      #6B7280;
$gray-500:      #9CA3AF;
$gray-400:      #D1D5DB;
$gray-300:      #E5E7EB;
$gray-200:      #F3F4F6;
$gray-100:      #F9FAFB;
$white:         #FFFFFF;

// Semantic Colors
$success:       #10B981;
$warning:       #F59E0B;
$error:         #EF4444;
$info:          #3B82F6;
```

### Typography Scale
```scss
// Font Family
$font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;

// Font Sizes (8px base)
$text-xs:   12px;  // 1.5 × 8px
$text-sm:   14px;  // 1.75 × 8px
$text-base: 16px;  // 2 × 8px
$text-lg:   18px;  // 2.25 × 8px
$text-xl:   20px;  // 2.5 × 8px
$text-2xl:  24px;  // 3 × 8px
$text-3xl:  30px;  // 3.75 × 8px
$text-4xl:  36px;  // 4.5 × 8px

// Font Weights
$weight-regular:  400;
$weight-medium:   500;
$weight-semibold: 600;
$weight-bold:     700;

// Line Heights
$leading-tight:   1.25;
$leading-normal:  1.5;
$leading-relaxed: 1.75;
```

### Spacing Scale (8px Grid)
```scss
$space-0:  0px;
$space-1:  8px;
$space-2:  16px;
$space-3:  24px;
$space-4:  32px;
$space-5:  40px;
$space-6:  48px;
$space-8:  64px;
$space-10: 80px;
$space-12: 96px;
```

### Border Radius
```scss
$radius-sm:   4px;   // 0.5 × 8px
$radius-base: 8px;   // 1 × 8px
$radius-md:   12px;  // 1.5 × 8px
$radius-lg:   16px;  // 2 × 8px
$radius-xl:   24px;  // 3 × 8px (pill buttons)
$radius-full: 50%;   // circles
```

### Elevation System (Material Design)
```scss
// Shadows for depth hierarchy
$elevation-0: none;
$elevation-1: 0 1px 3px rgba(0, 0, 0, 0.05);
$elevation-2: 0 2px 4px rgba(0, 0, 0, 0.1);
$elevation-3: 0 2px 8px rgba(0, 0, 0, 0.1);
$elevation-4: 0 4px 12px rgba(0, 0, 0, 0.15);
$elevation-5: 0 8px 24px rgba(0, 0, 0, 0.15);

// Gold button elevation
$elevation-gold: 0 2px 4px rgba(212, 175, 55, 0.2);
$elevation-gold-hover: 0 4px 8px rgba(212, 175, 55, 0.3);

// Indigo accent elevation
$elevation-indigo: 0 2px 8px rgba(99, 102, 241, 0.1);
```

### Icon System
```
Icon Library:    Heroicons 2.0 (outline + solid variants)
Default Size:    24×24px
Small:           16×16px
Large:           32×32px
Format:          SVG inline (for color control)

Navigation Icons:
  - Home:        home (outline/solid)
  - Search:      magnifying-glass
  - Bookmarks:   bookmark
  - Profile:     user-circle
  - Write:       pencil-square

Action Icons:
  - Star:        star (outline/solid)
  - Heart:       heart
  - Share:       share
  - Filter:      funnel
  - More:        ellipsis-horizontal
```

---

## 8. Accessibility Guidelines

### Focus States
```css
/* Keyboard navigation */
:focus-visible {
  outline: 2px solid #6366F1;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Interactive elements */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #6366F1;
  outline-offset: 2px;
}
```

### Color Contrast
- Text on white: minimum AA compliance (4.5:1)
- Gold CTA white text: 4.8:1 ✓
- All interactive elements: minimum 3:1

### Screen Reader Support
- All icons: `aria-label` attributes
- Navigation: semantic `<nav>` tags
- Headings: proper hierarchy (h1 → h6)
- Forms: associated labels

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Implementation Checklist

### Phase 1: Foundation
- [ ] Set up design tokens (colors, spacing, typography)
- [ ] Create base grid system (8px alignment)
- [ ] Implement three-column layout structure
- [ ] Test sticky positioning across browsers

### Phase 2: Components
- [ ] Build left navigation sidebar
- [ ] Create search bar component
- [ ] Design professor card component
- [ ] Build right sidebar widgets

### Phase 3: Interactions
- [ ] Add hover/active states
- [ ] Implement scroll-triggered sticky search
- [ ] Add focus states for accessibility
- [ ] Test keyboard navigation

### Phase 4: Responsive
- [ ] Implement tablet breakpoint (collapsed sidebar)
- [ ] Create mobile layout
- [ ] Build bottom navigation for mobile
- [ ] Test on real devices

### Phase 5: Polish
- [ ] Add smooth transitions
- [ ] Optimize performance
- [ ] Accessibility audit
- [ ] Cross-browser testing

---

## 10. Design Rationale

### Why Twitter's Layout Works
1. **Scanning Pattern**: Left-to-right matches F-pattern eye tracking
2. **Persistent Navigation**: Always accessible without scrolling
3. **Focused Content**: Center column width optimized for reading
4. **Contextual Widgets**: Right sidebar provides supplementary info

### Adaptations for Academic Context
1. **Gold CTA**: Premium feel for quality contributions
2. **Cleaner Cards**: Less noise than social media
3. **Stats Widgets**: Data-driven academic culture
4. **Professional Tone**: Serious typography, restrained colors

### Material Design Alignment
- **Elevation**: Subtle shadows for depth, not decoration
- **Motion**: Purposeful transitions (200-300ms)
- **Grid**: 8px base ensures visual rhythm
- **Typography**: Clear hierarchy, readable at all sizes

---

**End of Visual Specification**

For component implementation details, refer to:
- `component-library.md` - React component specs
- `animation-guidelines.md` - Motion design details
- `accessibility-audit.md` - WCAG compliance checklist
