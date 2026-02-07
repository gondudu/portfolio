# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 14 portfolio website for Eduardo Nogueira (Product Designer) featuring minimalistic design, scroll-triggered animations, and Framer Motion transitions. Built with TypeScript, Tailwind CSS, and the App Router.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Routing Structure

This project uses Next.js App Router with file-based routing:

- `/` - Home page with hero and project grid (`app/page.tsx`)
- `/projects/[slug]` - Dynamic project detail pages (`app/projects/[slug]/page.tsx`)
- `/contact` - Contact page (`app/contact/page.tsx`)

### Data Management

**Project data is centralized in `lib/projects.ts`**:

- `projects` array: All project data including metadata, images, and content
- `getProjectBySlug()`: Retrieves project by slug for detail pages
- `getNextProject()`: Navigation helper for project-to-project flow
- When adding/editing projects, modify this file only

### Component Organization

- `components/home/` - Home page specific (Hero, ProjectGrid, ProjectCard)
- `components/layout/` - Shared layout (Header, Footer, Navigation)
- `components/projects/` - Project detail pages (ProjectHero, ProjectContent, ProjectNavigation)
- `components/shared/` - Reusable components (AnimatedSection, Button)

### Animation System

All animations use **Framer Motion** via `components/shared/AnimatedSection.tsx`:

- Provides 5 animation variants: `fadeIn`, `fadeInUp`, `fadeInScale`, `slideInLeft`, `slideInRight`
- Uses `whileInView` with `viewport={{ once: true, margin: '-100px' }}` for scroll-triggered animations
- Supports delay prop for staggered animations
- All animations respect user's reduced motion preferences

### Styling

**Tailwind CSS** with custom theme in `tailwind.config.ts`:

- Custom colors: `primary`, `accent1-4`, `background`, `foreground`
- Custom spacing: `section`, `section-md`, `section-sm`, `container`, `container-md`, `container-sm`
- Typography: Work Sans (variable font loaded from `app/fonts/`)
- Font size scale: `xs` through `4xl`
- Path alias `@/*` maps to project root

### Image Handling

- **Next.js Image** component used throughout for optimization
- Remote images from `images.unsplash.com` (configured in `next.config.mjs`)
- To add new remote image domains, update `next.config.mjs` remotePatterns

### TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` points to project root
- Import components/utils with `@/components/...` or `@/lib/...`

## Key Patterns

### Adding New Projects

1. Edit `lib/projects.ts` and add object to `projects` array
2. Include all required fields: slug, title, category, year, role, thumbnail, heroImage, accentColor, overview, challenge, solution, results, images
3. Optionally set `nextProject` for custom navigation flow (defaults to next in array)
4. Project pages auto-generate via dynamic route `app/projects/[slug]/page.tsx`

### Creating Client Components

- Components using Framer Motion, hooks, or browser APIs must have `'use client'` directive
- All `components/shared/AnimatedSection.tsx` children are client components
- Layout components (Header, Footer) can remain server components

### Animation Best Practices

- Wrap sections in `<AnimatedSection>` for scroll animations
- Use `delay` prop for staggered reveals
- Choose appropriate `variant` based on desired effect
- Keep animations subtle with `ease: [0.25, 0.1, 0.25, 1]`

## Common Customization Tasks

### Update Personal Information

- Site metadata: `app/layout.tsx`
- Navigation links: `components/layout/Navigation.tsx`
- Contact details: `app/contact/page.tsx`
- Social links: `components/layout/Footer.tsx`

### Change Color Palette

Edit `tailwind.config.ts` colors object. Projects also have individual `accentColor` in `lib/projects.ts`.

### Replace Fonts

1. Add font files to `app/fonts/`
2. Update font loading in `app/layout.tsx`
3. Update `tailwind.config.ts` fontFamily

### Add New Remote Image Domains

Update `next.config.mjs`:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-domain.com',
    },
  ],
}
```
