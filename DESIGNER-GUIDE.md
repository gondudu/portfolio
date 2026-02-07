# Designer's Guide to Tailwind CSS

A practical guide for designers working on this portfolio website. No coding experience required!

---

## Table of Contents
1. [What is Tailwind CSS?](#what-is-tailwind-css)
2. [How to Find and Edit Styles](#how-to-find-and-edit-styles)
3. [Common Tailwind Classes](#common-tailwind-classes)
4. [Quick Reference](#quick-reference)
5. [Tips & Tricks](#tips--tricks)

---

## What is Tailwind CSS?

Tailwind is a different way of styling websites. Instead of writing custom CSS, you apply pre-built classes directly in your HTML/JSX.

**Traditional CSS:**
```css
.my-button {
  padding: 16px 32px;
  background-color: blue;
  border-radius: 8px;
}
```

**Tailwind CSS:**
```html
<button className="px-8 py-4 bg-blue-500 rounded-lg">
```

### Why Tailwind?
- ✅ Faster to design and iterate
- ✅ Consistent spacing/sizing across the site
- ✅ No need to name things (no more `button-primary-large-v2`)
- ✅ Responsive design built-in
- ✅ Changes apply instantly (hot reload)

---

## How to Find and Edit Styles

### Step 1: Find the Component

All visual components are in the `/components/` folder:

```
/components/
├── home/           # Home page components
│   ├── Hero.tsx
│   ├── ProjectGrid.tsx
│   └── ProjectCard.tsx
├── projects/       # Project detail components
│   ├── ProjectHero.tsx
│   ├── ProjectContent.tsx
│   └── ProjectNavigation.tsx
├── layout/         # Header, Footer, Navigation
└── shared/         # Reusable components (Button, AnimatedSection)
```

**Example**: To change the hero text on the home page, open `/components/home/Hero.tsx`

### Step 2: Locate the `className`

Look for the `className` attribute. This contains all the Tailwind styles:

```tsx
<h1 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl">
  Product Designer
</h1>
```

### Step 3: Modify the Classes

Just edit the class names! Change `text-4xl` to `text-5xl` to make it bigger.

```tsx
<h1 className="font-display font-medium text-5xl md:text-6xl lg:text-7xl">
```

### Step 4: Save and See Changes

The site updates automatically. No refresh needed! ✨

---

## Common Tailwind Classes

### 📏 Sizing

#### Text Size
```
text-xs      = 12px
text-sm      = 14px
text-base    = 16px (default)
text-lg      = 18px
text-xl      = 24px
text-2xl     = 32px
text-3xl     = 48px
text-4xl     = 60px
```

**Usage:**
```tsx
<h1 className="text-3xl">Big Heading</h1>
<p className="text-base">Normal text</p>
```

#### Spacing (Padding & Margin)
Tailwind uses a scale where 1 unit = 4px:
```
p-0   = 0px
p-1   = 4px
p-2   = 8px
p-3   = 12px
p-4   = 16px
p-6   = 24px
p-8   = 32px
p-12  = 48px
```

**Directional spacing:**
- `pt-4` = padding-top: 16px
- `pb-4` = padding-bottom: 16px
- `px-4` = padding left + right: 16px
- `py-4` = padding top + bottom: 16px
- `m-4` = margin: 16px (same directions as padding)

**Usage:**
```tsx
<div className="p-4">Padding all sides</div>
<div className="px-8 py-4">Padding horizontal + vertical</div>
<div className="mt-6 mb-12">Margin top + bottom</div>
```

### 🎨 Colors

#### Text Colors
```tsx
text-black
text-white
text-gray-500     # Medium gray
text-gray-700     # Dark gray
text-primary      # #0061FF (custom blue)
```

#### Background Colors
```tsx
bg-white
bg-black
bg-gray-100       # Light gray
bg-primary        # #0061FF
```

**Usage:**
```tsx
<div className="bg-white text-black">White background, black text</div>
<span className="text-primary">Blue text</span>
```

### ✍️ Typography

#### Font Weight
```
font-thin        = 100
font-extralight  = 200
font-light       = 300
font-normal      = 400
font-medium      = 500 (current site default)
font-semibold    = 600
font-bold        = 700
font-extrabold   = 800
font-black       = 900
```

#### Line Height
```
leading-none     = 1
leading-tight    = 1.25
leading-snug     = 1.375
leading-normal   = 1.5
leading-relaxed  = 1.625
leading-loose    = 2
```

#### Font Family
```
font-sans        # Work Sans (body text)
font-display     # Work Sans (headings)
```

**Usage:**
```tsx
<h1 className="font-display font-medium text-4xl leading-tight">
  Heading
</h1>
<p className="font-sans font-normal text-base leading-relaxed">
  Body text
</p>
```

### 📐 Layout

#### Flexbox
```tsx
flex                # Enable flexbox
items-center        # Vertical center
justify-center      # Horizontal center
justify-between     # Space between
gap-4               # Gap between items (16px)
```

**Usage:**
```tsx
<div className="flex items-center justify-between gap-6">
  <span>Left</span>
  <span>Right</span>
</div>
```

#### Grid
```tsx
grid                    # Enable grid
grid-cols-1            # 1 column
grid-cols-2            # 2 columns
md:grid-cols-2         # 2 columns on tablet+
gap-6                  # Gap between cells
```

**Usage:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
</div>
```

### 🎯 Common Properties

#### Border
```tsx
border              # 1px border
border-2            # 2px border
border-gray-200     # Light gray border
rounded-lg          # 8px border radius
rounded-2xl         # 16px border radius
rounded-full        # Fully rounded (pills/circles)
```

#### Aspect Ratio
```tsx
aspect-square       # 1:1 (square)
aspect-video        # 16:9 (widescreen)
aspect-[4/3]        # 4:3 (custom)
```

---

## Quick Reference

### Responsive Design

Tailwind uses breakpoints to adapt styles:

```
(default)  = Mobile (0px+)
sm:        = Small tablet (640px+)
md:        = Tablet (768px+)
lg:        = Desktop (1024px+)
xl:        = Large desktop (1280px+)
```

**How to use:**
```tsx
<h1 className="text-2xl md:text-4xl lg:text-6xl">
  Small on mobile → Medium on tablet → Large on desktop
</h1>

<div className="grid grid-cols-1 md:grid-cols-2">
  1 column on mobile → 2 columns on tablet+
</div>
```

### Custom Values

If you need a specific value not in Tailwind's defaults, use square brackets:

```tsx
<div className="w-[450px]">Exact 450px width</div>
<p className="text-[22px]">Exact 22px font size</p>
<div className="mt-[18px]">Exact 18px margin</div>
<h1 className="font-[650]">Exact 650 font weight</div>
```

### Hover & Transitions

```tsx
hover:bg-gray-100       # Background on hover
hover:text-primary      # Text color on hover
transition-colors       # Smooth color transition
duration-300            # Transition duration (300ms)
```

**Usage:**
```tsx
<button className="bg-white hover:bg-gray-100 transition-colors duration-300">
  Smooth hover effect
</button>
```

---

## Tips & Tricks

### 1. **Start with Mobile, Add Larger Styles**

Always design mobile-first, then add tablet/desktop:

```tsx
<!-- ✅ Good -->
<h1 className="text-2xl md:text-4xl lg:text-5xl">

<!-- ❌ Avoid -->
<h1 className="lg:text-5xl md:text-4xl text-2xl">
```

### 2. **Use Consistent Spacing**

Stick to the spacing scale (4, 8, 12, 16, 24, 32, 48, 64):
- Small gaps: `gap-2` (8px), `gap-3` (12px)
- Medium gaps: `gap-4` (16px), `gap-6` (24px)
- Large gaps: `gap-8` (32px), `gap-12` (48px)

### 3. **Group Related Classes**

For readability, organize classes by category:

```tsx
<!-- Layout → Spacing → Typography → Colors → Effects -->
<div className="flex items-center gap-4 px-6 py-4 text-lg font-medium text-primary hover:text-blue-600 transition-colors">
```

### 4. **Find Examples in the Codebase**

Not sure how to do something? Search the codebase:
- Want to change button styles? Look at `/components/shared/Button.tsx`
- Want to change card hover effects? Check `/components/home/ProjectCard.tsx`
- Want to change animations? See `/components/shared/AnimatedSection.tsx`

### 5. **Use the Tailwind Docs**

Best reference: [tailwindcss.com/docs](https://tailwindcss.com/docs)

Or use a cheat sheet: [nerdcave.com/tailwind-cheat-sheet](https://nerdcave.com/tailwind-cheat-sheet)

### 6. **Browser DevTools is Your Friend**

Right-click → Inspect → Styles panel shows all applied classes. You can toggle them on/off to see the effect!

---

## Common Design Tasks

### Change Hero Heading Size

**File:** `/components/home/Hero.tsx` (around line 12)

```tsx
<!-- Make it bigger -->
<h1 className="font-display font-medium text-5xl md:text-6xl lg:text-7xl">

<!-- Make it smaller -->
<h1 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl">
```

### Change Project Card Spacing

**File:** `/components/home/ProjectGrid.tsx` (around line 30)

```tsx
<!-- More space between cards -->
<div className="grid grid-cols-1 md:grid-cols-2 gap-20">

<!-- Less space between cards -->
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
```

### Change Button Colors

**File:** `/components/shared/Button.tsx` (around line 22)

```tsx
<!-- Primary button background -->
primary: 'bg-primary text-white hover:bg-blue-600'

<!-- Change to black button -->
primary: 'bg-black text-white hover:bg-gray-800'
```

### Change Container Padding

**File:** `/components/home/Hero.tsx` or any section

```tsx
<!-- Default -->
<section className="px-container-sm md:px-container-md lg:px-container">

<!-- Custom padding -->
<section className="px-8 md:px-16 lg:px-32">
```

### Change Font Weight Globally

Search for `font-medium` across all files and replace with:
- `font-normal` (lighter)
- `font-semibold` (slightly heavier)
- `font-bold` (heavier)

### Change Primary Color

**File:** `/tailwind.config.ts` (line 13)

```ts
colors: {
  primary: '#0061FF',  // Change this hex code
}
```

Then save and the whole site updates!

---

## Important Files

### Design Configuration
- **`tailwind.config.ts`** - Colors, fonts, spacing, breakpoints
- **`app/globals.css`** - Global CSS (minimal, mostly Tailwind imports)

### Layout Components
- **`components/layout/Header.tsx`** - Site header
- **`components/layout/Navigation.tsx`** - Menu and burger menu
- **`components/layout/Footer.tsx`** - Site footer

### Content
- **`lib/projects.ts`** - All project data (text, images, links)

### Typography
- **`app/fonts/`** - Work Sans font files
- **`app/layout.tsx`** - Font configuration

---

## Need Help?

### Can't Find Something?
Use VS Code search (Cmd/Ctrl + Shift + F) to find text or class names across all files.

### Made a Mistake?
Git makes it easy to undo:
```bash
git status              # See what changed
git checkout <file>     # Undo changes to a file
git reset --hard        # Undo ALL changes (careful!)
```

### Want to Experiment Safely?
Create a new git branch:
```bash
git checkout -b design-experiments
# Make changes, test them
# If you like it: git checkout main && git merge design-experiments
# If not: git checkout main (changes stay in the branch)
```

---

## Summary

**Remember:**
1. Find the component file
2. Locate the `className`
3. Add/remove/change Tailwind classes
4. Save and see changes instantly
5. Use responsive prefixes (`md:`, `lg:`) for different screen sizes
6. When in doubt, check [tailwindcss.com/docs](https://tailwindcss.com/docs)

**You got this!** 🎨✨
