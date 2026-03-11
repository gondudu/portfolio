# Project Content Sections — Design Spec

**Date:** 2026-03-11
**Status:** Approved

## Problem

- Every section in `ConsoleProjectPage.tsx` is hardcoded. Adding/removing sections requires editing the component.
- Every section always renders an image placeholder, even when no image is intended. There is no way to mark a section as intentionally imageless.
- All project content lives in one large `lib/projects.ts` — hard to navigate and edit per project.

## Goals

1. Make images optional per section. If no image → section occupies `80vh` (desktop only; mobile stacks normally).
2. Extract per-project content into individual files (`content/projects/{slug}.ts`).
3. `ConsoleProjectPage.tsx` renders dynamically from a `sections[]` array — no hardcoded section logic.

---

## Data Model

### `Section` interface

```typescript
interface Section {
  id: string            // unique key
  title: string         // left-column label
  subtitle?: string     // optional secondary label (dimmer color)
  body?: string         // paragraph text — if present, rendered as BodyText
  items?: string[]      // bullet list — if present, rendered with ListItems (below or after body)
  image?: string        // full filename e.g. 'problem.jpg', 'solution.webp' — if absent, section is imageless (80vh desktop)
  imageCaption?: string
  video?: { left: string; right: string }  // video-pair — mutually exclusive with image; used for figma-content-plugin demo
}
```

**Rendering rules (no `type` field — inferred from content):**

| `body` | `items` | Renders |
|--------|---------|---------|
| ✓ | — | BodyText paragraph |
| — | ✓ | ListItems bullets |
| ✓ | ✓ | BodyText then ListItems |
| — | — | Empty right column (valid for results-only sections) |

The `results` field on `ProjectContent` renders as a distinct Impact section (staggered left-border style) appended after all sections in the loop.

### `ProjectContent` interface

```typescript
interface ProjectContent {
  // Identity
  slug: string
  title: string
  category: string
  year: string
  role: string
  team?: string
  timeline?: string
  skills?: string[]

  // Content
  overview: string        // intro section paragraph (right column)
  results: string[]       // rendered as Impact section after sections loop

  // Images (always needed for home page card + hero)
  thumbnail: string       // e.g. '/images/projects/blatt/thumbnail.jpg'
  heroImage: string       // e.g. '/images/projects/blatt/hero.jpg'

  // Navigation
  nextProject?: string    // slug of next project (overrides array order)

  // Sections loop
  sections: Section[]
}
```

**Note:** `images[]` and `caseStudy` from the old `Project` interface are dropped. `thumbnail` and `heroImage` are retained — they are required by the home page `ProjectCard` and metadata generation in `app/projects/[slug]/page.tsx`. The `video-pair` pattern moves from `images[]` into `Section.video`.

### Intro image handling

The intro block (`ContentImageOrPlaceholder` for `intro.jpg`) is rendered above the sections loop. If `intro.jpg` does not exist, the placeholder is shown — same behavior as today. The 80vh rule does NOT apply to the intro block (it has distinct layout). To hide the intro image entirely, add a `showIntroImage?: boolean` flag — defaults to `true`. (This is a future concern; not in scope for this implementation.)

---

## File Structure

```
content/
  projects/
    blatt.ts
    upday.ts
    media-player-sdk.ts
    figma-content-plugin.ts
lib/
  projects.ts             ← defines ProjectContent + Section types, imports from content/, exports projects[]
components/projects/
  ConsoleProjectPage.tsx  ← accepts ProjectContent, maps over sections[]
app/projects/[slug]/
  page.tsx                ← updated: getProjectBySlug() returns ProjectContent; passes to ConsoleProjectPage
```

---

## ConsoleProjectPage Rendering Logic

### Intro block (hardcoded, above loop)

```tsx
{/* Title + overview */}
{/* ContentImageOrPlaceholder for intro.jpg (always shown with placeholder fallback) */}
{/* Quote/context + metadata */}
```

### Section loop

```tsx
{project.sections.map((section) => {
  const hasMedia = Boolean(section.image) || Boolean(section.video)
  return (
    <React.Fragment key={section.id}>
      {/* On md+ screens: 80vh wrapper when no media */}
      <div className={!hasMedia ? 'md:min-h-[80vh] md:flex md:flex-col md:justify-center' : ''}>
        <TwoColSection title={section.title} subtitle={section.subtitle}>
          <div className="flex flex-col gap-6">
            {section.body && <BodyText>{section.body}</BodyText>}
            {section.items && <ListItems items={section.items} />}
          </div>
        </TwoColSection>
      </div>

      {section.video && (
        <AnimatedSection variant="fadeInScale">
          <VideoPair leftSrc={section.video.left} rightSrc={section.video.right} />
        </AnimatedSection>
      )}

      {section.image && !section.video && (
        <AnimatedSection variant="fadeInScale">
          <ContentImageOrPlaceholder
            slug={project.slug}
            section={section.image}
            caption={section.imageCaption}
          />
        </AnimatedSection>
      )}
    </React.Fragment>
  )
})}
```

### Impact section (appended after loop)

```tsx
<TwoColSection title="Impact">
  <div className="flex flex-col gap-4">
    {project.results.map((r, i) => (
      <AnimatedSection key={i} variant="fadeInUp" delay={i * 0.05}>
        <div style={{ borderLeft: '3px solid ...', paddingLeft: '16px' }}>{r}</div>
      </AnimatedSection>
    ))}
  </div>
</TwoColSection>
```

### `ContentImageOrPlaceholder` update

Change `section` param from `string` (used to build path) to accept a **full filename** (e.g. `problem.jpg`). Update the src construction:

```tsx
// Before: src = `/images/projects/${slug}/${section}.jpg`
// After:  src = `/images/projects/${slug}/${section}` (section already includes extension)
```

Update all call sites accordingly.

---

## Type Threading in `app/projects/[slug]/page.tsx`

```tsx
// Before
import { Project, getProjectBySlug } from '@/lib/projects'
// page receives: project: Project
// ConsoleProjectPage Props: { project: Project }

// After
import { ProjectContent, getProjectBySlug } from '@/lib/projects'
// page receives: project: ProjectContent
// ConsoleProjectPage Props: { project: ProjectContent }
```

---

## `getNextProject()` fix

The current implementation ignores `project.nextProject` and always returns the next array item. Update to respect the field:

```typescript
export function getNextProject(currentSlug: string): ProjectContent | undefined {
  const current = projects.find(p => p.slug === currentSlug)
  if (!current) return undefined
  if (current.nextProject) return projects.find(p => p.slug === current.nextProject)
  const idx = projects.findIndex(p => p.slug === currentSlug)
  return projects[(idx + 1) % projects.length]
}
```

---

## Migration Order

1. Define `Section` + `ProjectContent` types in `lib/projects.ts`
2. Create `content/projects/blatt.ts` (pilot)
3. Update `ConsoleProjectPage.tsx` + `app/projects/[slug]/page.tsx` to use `ProjectContent`
4. Update `ContentImageOrPlaceholder` to accept full filename
5. Migrate remaining 3 projects
6. Remove old `Project` interface + `caseStudy` type once all 4 build cleanly (`npm run build` passes with no type errors)
