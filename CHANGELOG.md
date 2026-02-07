# Version Log

All notable changes to Eduardo Nogueira's portfolio website.

---

## [Initial Build] - 2026-02-05/06

### 🎨 Design System
- Implemented minimalistic design
- Set up Tailwind CSS with custom design tokens
- Configured responsive spacing system (120px/60px/32px for desktop/tablet/mobile)
- Established vibrant color palette with primary blue (#0061FF)
- Set up Work Sans as primary typeface (local font files)
- Unified font weight to `font-medium` (500) throughout site for Swiss-style typography

### 🏗️ Core Structure
- Initialized Next.js 14 with TypeScript and App Router
- Created three-page structure: Home, Contact, Projects
- Built dynamic project routing (`/projects/[slug]`)
- Implemented responsive navigation with burger menu (mobile)
- Added scroll-aware header (changes style on scroll)
- Created reusable animation system with Framer Motion

### 🎭 Components Built

#### Layout Components
- **Header**: Fixed position, scroll-aware background blur
- **Navigation**: Desktop horizontal menu + mobile burger menu with full-screen overlay
- **Footer**: Simple footer with social links

#### Home Page Components
- **Hero**: Large typography with animated underline accent
- **ProjectGrid**: 2-column responsive grid with scroll-triggered stagger animations
- **ProjectCard**: Hover effects, image scaling, primary accent bar

#### Project Detail Components
- **ProjectHero**: Parallax hero image with overlay gradient
- **ProjectContent**: Structured sections (Overview, Challenge, Solution, Results)
- **ProjectNavigation**: Previous/Next project navigation

#### Shared Components
- **AnimatedSection**: Reusable scroll-triggered animation wrapper (fadeIn, fadeInUp, fadeInScale, slideIn variants)
- **Button**: Animated button with hover/tap states

### 📝 Content Added

#### Projects
1. **Upday News App Redesign** (2024–Present)
   - Lead Product Designer
   - News platform transformation
   - 10% retention increase, 20% time spent increase
   - Light blue accent (#64B5F6) → changed to primary

2. **Media Player SDK** (2024)
   - Lead Product Designer
   - Unified SDK for WELT & Bild
   - 8% media retention improvement, 15% audio consumption increase
   - Black accent (#1D1D1D) → changed to primary

3. **NMT Product Suite** (2024–2026)
   - Product Designer (clarified role from "Lead")
   - Design system & organizational transformation
   - Adopted by 8 teams
   - Black accent (#1D1D1D) → changed to primary

4. **Figma Content Plugin** (2026)
   - Designer + Developer
   - 1-day build, 10x faster template creation
   - Purple accent (#7B68EE) → changed to primary

### ✨ Animations & Interactions
- Scroll-triggered fade-in and scale animations
- Staggered grid animations (0.1s delay per item)
- Parallax hero images on project pages
- Smooth page transitions
- Hover effects on cards and buttons
- Navigation active state with animated underline
- Respects `prefers-reduced-motion` for accessibility

### 🎯 Design Decisions

#### Typography Evolution
- Started with Inter + Space Grotesk (Google Fonts)
- Switched to Work Sans (Google Fonts)
- **Final**: Work Sans (local font files, normal + italic variable fonts)
- Changed all headings from `font-bold` (700) to `font-medium` (500)

#### Color System Evolution
- Started with per-project accent colors (light blue, black, purple)
- **Final**: Unified to single primary accent color (#0061FF) throughout

#### Results Section Evolution
- Started with: Small colored dots + gray text in bordered cards
- Iteration 1: Large colored text (too big)
- Iteration 2: Medium colored text with 12px padding (too loose)
- **Final**: `text-xl md:text-2xl`, `p-4` padding, `leading-tight`, primary color, `md:aspect-square` on desktop

### 🔧 Technical Configuration
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS v3.4 with custom theme
- Framer Motion for animations
- Local font files in `/app/fonts/`
- Image optimization via Next.js Image component
- Responsive breakpoints: mobile (default), tablet (768px), desktop (1024px+)

### 📱 Responsive Design
- Mobile-first approach
- Burger menu activates below 768px (md breakpoint)
- Grid layout: 1 column (mobile) → 2 columns (tablet/desktop)
- Navigation reduces gap from 12 to 6 for tighter spacing
- Container padding scales: 32px → 60px → 120px
- Typography scales responsively across breakpoints

### ♿ Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- `prefers-reduced-motion` media query support
- Sufficient color contrast ratios
- Alt text on all images

---

## Future Enhancements (Planned)

### Content
- [ ] Replace placeholder images with real project screenshots
- [ ] Add 5 images per project
- [ ] Update contact email and social links
- [ ] Consider adding case study PDFs

### Features
- [ ] Add data visualizations for project results
- [ ] Implement persona cards for Upday project
- [ ] Add before/after comparisons
- [ ] Consider lightbox for image galleries

### Performance
- [ ] Optimize all images (WebP format)
- [ ] Run Lighthouse audit (target: 90+ performance)
- [ ] Implement lazy loading for below-fold images

### Deployment
- [ ] Deploy to Vercel
- [ ] Set up custom domain
- [ ] Add analytics (Vercel Analytics or Google Analytics)
- [ ] Configure SEO metadata

---

## Design System Reference

### Colors
- **Primary**: #0061FF (Blue)
- **Accent 1**: #FFD02F (Yellow) - not currently used
- **Accent 2**: #FF6B6B (Red/Pink) - not currently used
- **Accent 3**: #7B68EE (Purple) - not currently used
- **Accent 4**: #00D9B1 (Cyan/Green) - not currently used
- **Foreground**: #1E1E1E (Near black)
- **Background**: #FFFFFF (White)

### Typography
- **Font**: Work Sans (Variable font, 100-900 weights)
- **Default Weight**: 500 (medium)
- **Base Size**: 16px
- **Scale**: xs(12px) → sm(14px) → base(16px) → lg(18px) → xl(24px) → 2xl(32px) → 3xl(48px) → 4xl(60px)

### Spacing
- **Section Padding**: 120px (lg) / 80px (md) / 60px (sm)
- **Container Margins**: 120px (lg) / 60px (md) / 32px (sm)
- **Element Gap**: Typically 6px navigation, 12px-20px content sections

### Border Radius
- Cards/Containers: `rounded-2xl` (16px)
- Buttons: `rounded-full`

---

## Notes
- Project uses Tailwind CSS utility classes (no custom CSS beyond globals)
- All animations use Framer Motion with cubic-bezier easing: [0.25, 0.1, 0.25, 1]
- Font files stored in `/app/fonts/` for optimal Next.js integration
- Placeholder images use Unsplash URLs (to be replaced)
