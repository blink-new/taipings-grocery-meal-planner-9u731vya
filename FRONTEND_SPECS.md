# Taiping's Grocery - Frontend Implementation Specifications

## Project Overview
**Platform**: Australian Meal Planning Web Application  
**Core Function**: Generate store-categorized shopping lists from weekly meal plans  
**Target Users**: Australian families seeking organized meal planning  
**Tech Stack**: React + TypeScript + Vite + Tailwind CSS + ShadCN UI

## Design Philosophy & Brand Identity

### Visual Style
- **Aesthetic**: Modern, clean, minimalist with premium feel
- **Personality**: Trustworthy, efficient, family-oriented, approachable
- **Inspiration**: Apple's simplicity, Notion's organization, Airbnb's warmth

### Color Palette (Australian-Friendly)
```css
Primary Colors:
- Forest Green: #2D5A3D (primary brand color)
- Ocean Blue: #1E4A5F (secondary actions)
- Warm Earth: #8B4513 (accent highlights)

Neutral Colors:
- Cream White: #FEFEFE (backgrounds)
- Soft Grey: #F7F8FA (section dividers)
- Medium Grey: #6B7280 (text secondary)
- Dark Charcoal: #1F2937 (text primary)

Success/Status Colors:
- Success Green: #10B981
- Warning Orange: #F59E0B
- Error Red: #EF4444
- Info Blue: #3B82F6
```

### Typography Hierarchy
```css
Font Family: 'Inter' (primary), system-ui (fallback)

Headings:
- H1: 32px, font-weight: 700, line-height: 1.2
- H2: 24px, font-weight: 600, line-height: 1.3
- H3: 20px, font-weight: 600, line-height: 1.4
- H4: 18px, font-weight: 500, line-height: 1.4

Body Text:
- Large: 16px, font-weight: 400, line-height: 1.6
- Regular: 14px, font-weight: 400, line-height: 1.5
- Small: 12px, font-weight: 400, line-height: 1.4

Interface Text:
- Button: 14px, font-weight: 500
- Label: 12px, font-weight: 500, uppercase, letter-spacing: 0.5px
- Caption: 11px, font-weight: 400
```

## Layout & Component Specifications

### 1. Overall Layout Structure
```
┌─────────────────────────────────────────────┐
│ Navigation Bar (sticky top)                 │
├─────────────────────────────────────────────┤
│ Main Content Area                           │
│ ┌─────────────┬─────────────┬─────────────┐ │
│ │ Recipe      │ Weekly      │ Shopping    │ │
│ │ Browser     │ Planner     │ List        │ │
│ │ (Sidebar)   │ (Main)      │ (Panel)     │ │
│ │             │             │             │ │
│ │             │             │             │ │
│ └─────────────┴─────────────┴─────────────┘ │
└─────────────────────────────────────────────┘
```

### 2. Navigation Bar Specifications
- **Height**: 64px
- **Background**: Translucent white with blur effect
- **Border**: 1px solid rgba(0,0,0,0.05)
- **Shadow**: Subtle drop shadow on scroll
- **Logo**: "Taiping's Grocery" with Australian leaf icon
- **Navigation Items**: Dashboard, Recipes, Shopping, Profile
- **Mobile**: Hamburger menu collapse at <768px

### 3. Weekly Planner (Main Component)
#### Calendar Grid Layout
```css
Display: CSS Grid
Grid Template: 7 columns (equal width)
Gap: 12px between columns, 8px between rows
Minimum Height: 120px per day cell
```

#### Day Cell Design
- **Background**: White with subtle border radius (8px)
- **Border**: 1px solid #E5E7EB
- **Hover State**: Slight elevation (box-shadow)
- **Drop Zone Active**: Dashed border, background tint
- **Header**: Day name + date, centered, bold

#### Meal Slots Per Day
```css
Breakfast: Light yellow background (#FEF3C7)
Lunch: Light blue background (#DBEAFE)
Dinner: Light green background (#D1FAE5)
Snack: Light purple background (#E9D5FF)

Each slot:
- Height: 80px minimum
- Padding: 8px
- Border radius: 6px
- Margin: 4px 0
```

### 4. Recipe Browser (Sidebar)
- **Width**: 320px on desktop, full width on mobile
- **Background**: #FAFAFA
- **Border**: Right border 1px solid #E5E7EB

#### Recipe Card Design
```css
Width: 100%
Height: 120px
Background: White
Border radius: 8px
Shadow: 0 1px 3px rgba(0,0,0,0.1)
Padding: 12px
Margin bottom: 8px

Layout:
- Recipe image: 60x60px, rounded corners
- Title: 14px, font-weight 500, 2 lines max
- Metadata: Prep time, difficulty, cuisine type
- Drag handle: Subtle grip icon
```

#### Search & Filter Interface
- **Search Input**: Full width, 40px height, rounded
- **Filter Chips**: Cuisine, Time, Difficulty, Store Type
- **Active Filters**: Highlighted with close buttons

### 5. Shopping List Panel
- **Width**: 300px on desktop
- **Background**: White
- **Border**: Left border 1px solid #E5E7EB

#### Store Category Sections
```css
Each category header:
- Background: #F9FAFB
- Padding: 12px 16px
- Font weight: 600
- Color: #374151
- Border bottom: 1px solid #E5E7EB

Australian Store Types:
1. Supermarket (Coles, Woolworths, IGA)
2. Butcher/Meat
3. Asian Supermarket
4. Fresh Produce
5. Bakery
6. Other Specialty
```

#### Shopping Item Design
```css
Each item:
- Padding: 8px 16px
- Border bottom: 1px solid #F3F4F6
- Checkbox: Custom styled, green check
- Item name: 14px regular
- Quantity: 12px, muted color
- Price estimate: Right aligned, bold
```

## Interactive Elements & Animations

### Drag & Drop Behavior
```css
Dragging Recipe:
- Opacity: 0.8
- Transform: rotate(2deg) scale(1.05)
- Shadow: 0 8px 25px rgba(0,0,0,0.15)
- Cursor: grabbing

Drop Zone Hover:
- Background: rgba(34, 197, 94, 0.1)
- Border: 2px dashed #22C55E
- Transform: scale(1.02)

Drop Success:
- Flash green background briefly
- Gentle bounce animation
```

### Micro-interactions
- **Button Hover**: Scale 1.02, shadow increase
- **Card Hover**: Lift effect (translateY: -2px)
- **Input Focus**: Border color change, subtle glow
- **Loading States**: Skeleton screens, pulse animations
- **Success Actions**: Green checkmark with fade-in

### Responsive Breakpoints
```css
Mobile: < 768px
- Single column layout
- Collapsible panels
- Bottom sheet for shopping list
- Larger touch targets (44px minimum)

Tablet: 768px - 1024px
- Two column layout (planner + sidebar)
- Expandable shopping list

Desktop: > 1024px
- Three column layout
- Full feature visibility
- Hover states active
```

## Australian-Specific Design Elements

### Store Integration Visual Cues
- **Coles**: Red accent color for items
- **Woolworths**: Green accent color
- **IGA**: Blue accent color
- **Store Logos**: Small icons next to relevant items

### Cultural Considerations
- **Currency**: Always show AUD ($) symbol
- **Date Format**: DD/MM/YYYY
- **Seasonal Indicators**: Autumn/Winter/Spring/Summer badges
- **Local Produce**: "Australian Grown" badges
- **Postcode Integration**: Location-based store suggestions

## Accessibility Requirements

### WCAG 2.1 Compliance
- **Color Contrast**: Minimum 4.5:1 for normal text
- **Keyboard Navigation**: Full tab order, focus indicators
- **Screen Reader**: Proper ARIA labels, semantic HTML
- **Touch Targets**: Minimum 44px on mobile
- **Motion**: Respect prefers-reduced-motion

### Focus Management
- **Drag Operations**: Keyboard alternative available
- **Modal Dialogs**: Focus trap, escape to close
- **Form Validation**: Clear error messaging
- **Loading States**: Screen reader announcements

## Performance & Technical Requirements

### CSS Architecture
- **Utility-First**: Tailwind CSS with custom components
- **Component Isolation**: CSS modules where needed
- **Critical CSS**: Above-fold styles inlined
- **Theme Variables**: CSS custom properties for colors

### Animation Performance
- **Hardware Acceleration**: transform and opacity only
- **Duration Guidelines**: < 200ms for micro-interactions
- **Easing**: Custom cubic-bezier for brand personality
- **Reduced Motion**: Fallbacks for accessibility

### Asset Optimization
- **Images**: WebP format, multiple sizes, lazy loading
- **Icons**: SVG sprite system
- **Fonts**: Variable fonts, font-display: swap
- **Bundle Size**: Critical CSS < 14KB, total CSS < 50KB

## Component Library Integration

### ShadCN UI Customization
- **Theme Extension**: Custom color palette integration
- **Component Variants**: Australian-specific styles
- **Custom Components**: Recipe card, day cell, shopping item
- **Icon System**: Lucide React with custom Australian icons

### State Management
- **Recipe Drag State**: Visual feedback system
- **Shopping List State**: Real-time updates
- **Filter State**: URL-synced parameters
- **Loading States**: Consistent skeleton patterns

## Quality Assurance Checklist

### Cross-Browser Testing
- **Chrome/Edge**: Primary targets
- **Safari**: iOS compatibility
- **Firefox**: Secondary support
- **Mobile Browsers**: Touch optimization

### Device Testing
- **iPhone**: Safari, responsive design
- **Android**: Chrome, touch interactions
- **iPad**: Hybrid layouts
- **Desktop**: Multiple screen sizes

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Deliverables Expected

1. **Component Styles**: All React component CSS implementations
2. **Global Styles**: Base styles, typography, utilities
3. **Theme Configuration**: Tailwind config with custom palette
4. **Animation Library**: Reusable transition components
5. **Responsive Layouts**: Mobile-first implementations
6. **Accessibility Features**: Focus management, ARIA attributes
7. **Performance Optimizations**: Critical CSS, lazy loading
8. **Documentation**: Component usage examples, style guide

This specification provides the complete foundation for implementing a world-class, Australian-focused meal planning interface that feels both modern and culturally relevant.