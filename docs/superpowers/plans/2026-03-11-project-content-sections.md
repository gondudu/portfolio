# Project Content Sections Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor project page content into per-project TypeScript files with a `sections[]` array, making images optional per section (imageless sections expand to 80vh on desktop).

**Architecture:** Define `Section` + `ProjectContent` types in `lib/projects.ts`, extract each project into `content/projects/{slug}.ts`, and update `ConsoleProjectPage.tsx` to render dynamically from `sections[]` instead of hardcoded blocks. The `app/projects/[slug]/page.tsx` type threading is updated to match.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion. Static export (`output: 'export'`). No testing framework in this repo — verify with `npm run build` and visual browser check.

**Spec:** `docs/superpowers/specs/2026-03-11-project-content-sections-design.md`

---

## Chunk 1: Types + Pilot Content File

### Task 1: Add `Section` and `ProjectContent` types to `lib/projects.ts`

**Files:**
- Modify: `lib/projects.ts` (top of file — add new interfaces above existing `CaseStudy`)

- [ ] **Step 1: Add the new interfaces at the top of `lib/projects.ts`**

Insert this block before the existing `export interface CaseStudy` line:

```typescript
export interface Section {
  id: string
  title: string
  subtitle?: string
  body?: string
  items?: string[]
  image?: string        // full filename e.g. 'problem.jpg' — if absent, section is imageless (80vh desktop)
  imageCaption?: string
  video?: { left: string; right: string }  // video pair, mutually exclusive with image
}

export interface ProjectContent {
  slug: string
  title: string
  category: string
  year: string
  role: string
  team?: string
  timeline?: string
  skills?: string[]
  thumbnail: string
  heroImage: string
  overview: string
  results: string[]
  nextProject?: string
  sections: Section[]
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd "/Users/enogueir/My portfolio" && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors (new interfaces don't break existing code)

---

### Task 2: Create `content/projects/blatt.ts`

**Files:**
- Create: `content/projects/blatt.ts`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p "/Users/enogueir/My portfolio/content/projects"
```

- [ ] **Step 2: Write `content/projects/blatt.ts`**

> **IMPORTANT:** Use `import type` (not `import`) for `ProjectContent`. Value imports from `lib/projects` inside content files are prohibited — they create a circular reference at runtime since `lib/projects.ts` will import these files in Task 6.

```typescript
import type { ProjectContent } from '@/lib/projects'

export const blatt: ProjectContent = {
  slug: 'nmt-product-suite-design-system',
  title: "Meet Blatt: Axel Springer's Editorial Design System",
  category: 'Design System / Organisational Transformation',
  year: '2024–2026',
  role: 'Product Designer',
  team: 'Cross-brand product teams',
  timeline: '2024 – ongoing',
  skills: ['Design Systems', 'Figma', 'Workshops', 'Developer Alignment'],
  thumbnail: '/images/projects/nmt-product-suite-design-system/thumbnail.jpg',
  heroImage: '/images/projects/nmt-product-suite-design-system/hero.jpg',
  overview:
    "Axel Springer SE is Germany's largest digital publishing house and one of the most significant media conglomerates in Europe.",
  results: [
    'Adopted by 8 teams across the organisation',
    'Migration phase active — WELT and Bild currently refactoring components to the Blatt standard',
    'Automated Figma-to-production CSS pipeline, reducing design-to-dev handoff friction',
    'Design tokens structured for LLM consumption — AI-assisted on-brand prototyping now possible',
    'Internal tooling ecosystem built collectively across the design team, distributed company-wide via the Designers Toolkit',
    'Design function has strategic input on product decisions across brands that it did not have before',
  ],
  nextProject: 'figma-content-plugin',
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "When I joined Axel Springer, I quickly noticed legacy structures holding back modern product development. That drove me to write my bachelor's thesis on the company's design culture — interviewing colleagues, mapping workflow fragmentation, and identifying what was slowing teams down. That research gave me the credibility to start building Blatt.",
      image: 'intro.jpg',
    },
    {
      id: 'problem',
      title: 'Problem',
      body: "The problem was never technical — it was cultural. Designers without engineering context were building in an aesthetically free but system-hostile way: components that looked right in Figma and often broke in production.",
      items: [
        'Teams across Axel Springer editorial brands built independently',
        'Designers worked often without engineering context',
        'Developers and designers lacked a shared vocabulary',
        'Learnings were not always shared and documented',
      ],
      image: 'problem.jpg',
    },
    {
      id: 'research',
      title: 'Research',
      items: [
        'Understand how other companies solve the same problem',
        'Audit the current system looking for synergies and design debt',
        'Interview product teams to understand pain points and opportunities for design',
        'Understand how technology can support workflows',
      ],
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "I started with a pattern library for WELT — an immediate speed-up that created buy-in before any governance existed. I ran workshops and onboarding sessions early — not to document the system, but to make it feel like something colleagues had helped build. The goal wasn't compliance; it was understanding.",
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: 'Feature 01',
      subtitle: 'Start with a pattern library for WELT, not a company-wide mandate',
      body: "Created an immediate speed-up for the team I knew best — early proof of value before asking anyone else to invest. Buy-in preceded governance.",
    },
    {
      id: 'feature-02',
      title: 'Feature 02',
      subtitle: 'Education before governance — workshops and onboarding before contribution rules',
      body: "Designers needed to understand why the system worked the way it did before following it. Mandating adoption without that understanding generates resistance. Building it generates allies.",
    },
    {
      id: 'feature-03',
      title: 'Feature 03',
      subtitle: 'Align with developers and build a real pipeline, not just a Figma library',
      body: "Syncing naming conventions and repositories made the system live in production code, not just in design files. The mutual education — developers teaching me about codebases, me teaching them about design decisions — is what made the handoff workflow replicable across teams.",
    },
  ],
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd "/Users/enogueir/My portfolio" && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
cd "/Users/enogueir/My portfolio" && git add lib/projects.ts content/projects/blatt.ts && git commit -m "feat: add Section/ProjectContent types and blatt content file"
```

---

## Chunk 2: Update ConsoleProjectPage + `getNextProject`

### Task 3: Update `ConsoleProjectPage.tsx` to accept `ProjectContent` and render from `sections[]`

**Files:**
- Modify: `components/projects/ConsoleProjectPage.tsx`

**Key changes:**
1. Import `ProjectContent` instead of `Project`
2. Update `Props` interface
3. Update `ContentImageOrPlaceholder` to accept full filename (no `.jpg` appended)
4. Replace hardcoded section blocks with `sections[]` map
5. Add imageless 80vh wrapper
6. Append Impact section after the loop
7. Remove `videoPairSrc` detection from `project.images` (now in `Section.video`)

- [ ] **Step 1: Update the import and Props**

In `components/projects/ConsoleProjectPage.tsx`, change:
```typescript
// Before
import { Project, projects, getNextProject } from '@/lib/projects'

interface Props {
  project: Project
}
```
To:
```typescript
// After
import { ProjectContent, projects, getNextProject } from '@/lib/projects'

interface Props {
  project: ProjectContent
}
```

- [ ] **Step 2: Update `ContentImageOrPlaceholder` — remove auto-appended `.jpg`**

Change:
```typescript
// Before (line ~90)
function ContentImageOrPlaceholder({ slug, section, caption, aspectRatio = '16 / 9' }: { slug: string; section: string; caption?: string; aspectRatio?: string }) {
  const [errored, setErrored] = React.useState(false)
  const src = `/images/projects/${slug}/${section}.jpg`
  // ...
  // label passed to PlaceholderImage:
  <PlaceholderImage label={`${section}.jpg`} aspectRatio={aspectRatio} />
```
To:
```typescript
// After — section is now a full filename like 'problem.jpg'
function ContentImageOrPlaceholder({ slug, section, caption, aspectRatio = '16 / 9' }: { slug: string; section: string; caption?: string; aspectRatio?: string }) {
  const [errored, setErrored] = React.useState(false)
  const src = `/images/projects/${slug}/${section}`
  // ...
  // label passed to PlaceholderImage — section already includes extension:
  <PlaceholderImage label={section} aspectRatio={aspectRatio} />
```

- [ ] **Step 2b: Fix `getNextProject` to respect `nextProject` field** *(do this now, before the component change, so navigation is correct from the first build)*

In `lib/projects.ts`, replace `getNextProject`:

```typescript
export function getNextProject(currentSlug: string): ProjectContent | undefined {
  const current = projects.find(p => p.slug === currentSlug)
  if (!current) return undefined
  if (current.nextProject) return projects.find(p => p.slug === current.nextProject)
  const idx = projects.findIndex(p => p.slug === currentSlug)
  return projects[(idx + 1) % projects.length]
}
```

Also update `getProjectBySlug` return type to `ProjectContent | undefined`:
```typescript
export function getProjectBySlug(slug: string): ProjectContent | undefined {
  return projects.find((project) => project.slug === slug)
}
```

- [ ] **Step 3: Remove `videoPairSrc` detection and the intro block `VideoPair` branch**

Delete this line (currently around line 270):
```typescript
const videoPairSrc = project.images.find(s => s.startsWith('video-pair::'))
```

In the intro `<AnimatedSection>` block, replace the conditional `videoPairSrc` render with a plain `ContentImageOrPlaceholder` for `intro.jpg`:
```tsx
{/* ── Content Image: intro ── */}
<AnimatedSection variant="fadeInScale">
  <ContentImageOrPlaceholder slug={project.slug} section="intro.jpg" />
</AnimatedSection>
```

- [ ] **Step 3b: Fix the Quote block — replace `project.caseStudy?.context` and `project.challenge` with `project.overview`**

The "Quote + Metadata" section (currently lines ~363–410 in the component, above the section loop range) references fields that do not exist on `ProjectContent`. Replace the left column content:

```tsx
{/* Left: large quote — was project.caseStudy?.context || project.challenge */}
<div className="flex-1" style={{ borderTop: `1px solid ${lt.border}`, paddingTop: '24px' }}>
  <AnimatedSection variant="fadeInUp">
    <p style={{
      fontFamily: 'var(--font-jost)',
      fontWeight: 400,
      fontSize: '32px',
      lineHeight: 1.3,
      color: lt.text,
      margin: 0,
    }}>
      {project.overview}
    </p>
  </AnimatedSection>
</div>
```

- [ ] **Step 4: Remove the hardcoded case study sections and replace with `sections[]` map**

Delete everything between `{/* ── Case Study Sections ── */}` and `{/* ── Next Mission Footer ── */}` (lines ~412–519 in the current file). This includes both the `{project.caseStudy && (...)}` block and the `{!project.caseStudy && (...)}` fallback block.

Replace with this sections loop + Impact section:

```tsx
{/* ── Sections Loop ── */}
{project.sections.map((section) => {
  const hasMedia = Boolean(section.image) || Boolean(section.video)
  return (
    <React.Fragment key={section.id}>
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

{/* ── Impact / Results ── */}
{project.results.length > 0 && (
  <TwoColSection title="Impact">
    <div className="flex flex-col gap-4">
      {project.results.map((r, i) => (
        <AnimatedSection key={i} variant="fadeInUp" delay={i * 0.05}>
          <div style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '20px',
            lineHeight: 1.6,
            color: lt.text,
            paddingLeft: '16px',
            borderLeft: `3px solid ${lt.border}`,
          }}>
            {r}
          </div>
        </AnimatedSection>
      ))}
    </div>
  </TwoColSection>
)}
```

- [ ] **Step 5: Update `metadataFields` — no change needed**

The spread syntax `...(project.team ? [...] : [])` still works with `ProjectContent`.

- [ ] **Step 5b: Wire up next-project thumbnail in the Next Mission footer**

The current footer renders a grey placeholder box with hardcoded text `THUMBNAIL`. Since `ProjectContent` has a `thumbnail` field, wire it up:

```tsx
{/* Replace the grey placeholder box with an actual thumbnail */}
<div style={{
  width: '160px',
  height: '90px',
  flexShrink: 0,
  overflow: 'hidden',
  backgroundColor: '#b8b8b8',
}}>
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
    src={nextProject.thumbnail}
    alt={nextProject.title}
    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
  />
</div>
```

- [ ] **Step 6: Update `frameNumber` lookup — still uses `projects` array, must remain compatible**

The `projects` array will be updated in Task 6 to return `ProjectContent[]`. No change needed here, `findIndex` works with either type.

- [ ] **Step 7: Verify TypeScript compiles**

```bash
cd "/Users/enogueir/My portfolio" && npx tsc --noEmit 2>&1 | head -40
```

Expected: errors about `app/projects/[slug]/page.tsx` passing `Project` to a component that now expects `ProjectContent`. These will be fixed in Task 4.

---

### Task 4: Update `app/projects/[slug]/page.tsx` type threading

**Files:**
- Modify: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Read the current file**

```bash
cat -n "/Users/enogueir/My portfolio/app/projects/[slug]/page.tsx"
```

- [ ] **Step 2: Update import and type usage**

Change:
```typescript
import { Project, getProjectBySlug } from '@/lib/projects'
```
To:
```typescript
import { ProjectContent, getProjectBySlug } from '@/lib/projects'
```

If the file uses `project: Project` in a type annotation, change to `project: ProjectContent`. The `getProjectBySlug()` return type will be updated in Task 5 to return `ProjectContent | undefined`.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd "/Users/enogueir/My portfolio" && npx tsc --noEmit 2>&1 | head -40
```

---

### Task 5: Update `lib/projects.ts` — fix `getNextProject`, update `getProjectBySlug` return type

**Files:**
- Modify: `lib/projects.ts`

- [ ] **Step 1: Replace the old `projects` array with a temporary empty one**

Remove the existing `export const projects: Project[] = [...]` (the large inline array). Add a temporary empty array:

```typescript
// Populated in Task 6 — importing from content/projects/*
export const projects: ProjectContent[] = []
```

Keep old `Project` and `CaseStudy` interfaces for now — they'll be removed in Task 8.

> **Note:** This is a transient state. Do NOT run a full build or `tsc --noEmit` after this step — TypeScript verification is intentionally deferred to Task 6 Step 5 when all 4 projects are imported.

- [ ] **Step 2: Skip** — `getProjectBySlug` and `getNextProject` were already updated in Task 3 Step 2b. Verify they are present in the file with correct return types (`ProjectContent | undefined`).

- [ ] **Step 3: Skip to Task 6** — TypeScript verification deferred until all 4 content files are imported.

---

## Chunk 3: Migrate Remaining 3 Projects

### Task 6: Create content files for upday, media-player-sdk, figma-content-plugin

**Files:**
- Create: `content/projects/upday.ts`
- Create: `content/projects/media-player-sdk.ts`
- Create: `content/projects/figma-content-plugin.ts`
- Modify: `lib/projects.ts` (import all 4, export as `projects[]`)

- [ ] **Step 1: Create `content/projects/upday.ts`**

> **Reminder:** Always use `import type` (not `import`) for `ProjectContent` in all content files — value imports from `lib/projects` would create a circular reference.

```typescript
import type { ProjectContent } from '@/lib/projects'

export const upday: ProjectContent = {
  slug: 'upday-news-app-redesign',
  title: 'Upday News App Redesign',
  category: 'Mobile App / News Platform',
  year: '2024–Present',
  role: 'Lead Product Designer',
  team: '10-person cross-functional',
  timeline: '~6 months',
  skills: ['UI/UX Design', 'Analytics', 'Typography', 'Accessibility'],
  thumbnail: '/images/projects/upday-news-app-redesign/thumbnail.jpg',
  heroImage: '/images/projects/upday-news-app-redesign/hero.jpg',
  overview:
    "Upday was Samsung's default news application across Europe — preinstalled on Galaxy devices, never downloaded by choice. When Samsung replaced it in 2024, the product faced the open market for the first time. A cross-functional team inside Axel Springer had roughly six months to ship a version that could survive without the preinstall. I led UI/UX as part of this team.",
  results: [
    '1 million users migrated',
    '10% increase in user retention',
    '20% increase in time spent in app',
  ],
  nextProject: 'media-player-sdk-axel-springer',
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "Upday was Samsung's default news application across Europe — preinstalled on Galaxy devices, never downloaded by choice. When Samsung replaced it in 2024, the product faced the open market for the first time. A cross-functional team — developers, product owners, business managers, the CTO, and me leading UI/UX — had roughly six months to ship a version that could survive without the preinstall.",
      image: 'intro.jpg',
    },
    {
      id: 'problem',
      title: 'Problem',
      body: "We audited the existing product, collected analytics, and mapped user behaviour against four news consumption moments. The data reframed the problem.",
      items: [
        "80% of users had never left the top news feed — personalisation, local news, and discovery features had almost no engaged users",
        "Local news retained a loyal niche (~19%) — I used engagement data from sister publications to argue for keeping it. Timeline and infrastructure cost won.",
        "Accent colour #1DB8DA failed WCAG contrast on buttons and chips against white (~2.7:1) — identified during audit, not flagged externally",
        "Users had built routines around the app — breaking established habits during migration risked backlash",
      ],
      image: 'problem.jpg',
    },
    {
      id: 'research',
      title: 'Research',
      items: [
        "Local news and the aggregator model were cut despite engagement data supporting their retention — timeline and infrastructure cost won",
        "Google Fonts instead of professional typefoundry licences — a reasonable constraint-driven compromise, but a compromise on typographic craft",
        "No documented component standards existed — every component decision had to be made from scratch, adding significant time",
      ],
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "Navigation went from five tabs to four: Top News, My News, Shorts, and Games. Profile moved to the top bar. Discover and Local were cut — despite my advocating for Local's retention with data. Two typefaces replaced Roboto: Freeman for display and Gothic A1 for body — both Google Fonts. Brand colour moved from #1DB8DA to #002BFF.",
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: 'Feature 01',
      subtitle: 'Rebuild navigation around the 80% use case — four tabs instead of five',
      body: "Discover and Local were cut despite my advocating for Local's retention with data. The decision was driven by infrastructure cost and the shift to an AI-editorial backend. Profile moved to the top bar. The aggregator model ended with this redesign.",
    },
    {
      id: 'feature-02',
      title: 'Feature 02',
      subtitle: 'Introduce Shorts and Games for Time-Filler audiences',
      body: "Persona research showed a significant segment consuming news passively — as entertainment, not obligation. These formats compete directly with social media for the same idle moments. I was genuinely convinced — this was not a compromise.",
    },
    {
      id: 'feature-03',
      title: 'Feature 03',
      subtitle: 'Redesign brand foundation and rebuild component library',
      body: "Freeman and Gothic A1 replaced Roboto — both Google Fonts, avoiding typefoundry costs. Brand colour moved from #1DB8DA to #002BFF, proposed based on colours the brand had used historically. Component library rebuilt from the ground up, validated across seven language editions.",
    },
    {
      id: 'feature-04',
      title: 'Feature 04',
      subtitle: 'Release in parallel with Samsung edition to test assumptions',
      body: "First version launched while the Samsung edition was still active. This let us observe real usage patterns with a smaller user base before full migration — testing persona research assumptions against actual behaviour.",
    },
  ],
}
```

- [ ] **Step 2: Create `content/projects/media-player-sdk.ts`**

```typescript
import type { ProjectContent } from '@/lib/projects'

export const mediaPlayerSdk: ProjectContent = {
  slug: 'media-player-sdk-axel-springer',
  title: 'Media Player SDK',
  category: 'Platform Design / Consumer Media',
  year: '2024',
  role: 'Lead Product Designer',
  team: 'Cross-brand (WELT + Bild)',
  timeline: '2024',
  skills: ['Product Design', 'Co-design', 'Heuristic Evaluation'],
  thumbnail: '/images/projects/media-player-sdk-axel-springer/thumbnail.jpg',
  heroImage: '/images/projects/media-player-sdk-axel-springer/hero.jpg',
  overview:
    "WELT and Bild — Axel Springer's two largest news brands — each ran separate video infrastructure contracts, with engineers at both brands independently solving identical problems. I came into this project already knowing WELT's media experience from the inside: I'd mapped its failure points through heuristic evaluation before the brief existed. The cost consolidation mandate gave us the opening to fix what I'd already found.",
  results: [
    '8% improvement in media retention',
    '15% increase in audio consumption',
    'Shipped to WELT and Bild iOS apps within 6 months',
    'Eliminated duplicate infrastructure contracts across brands',
    'Single SDK foundation for all future Axel Springer media products',
  ],
  nextProject: 'nmt-product-suite-design-system',
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "WELT and Bild ran separate contracts with video infrastructure providers. Developers at both brands were independently solving the same problems. Management's goal was consolidation and cost reduction. My goal: use that mandate to fix a user experience that had been falling behind for years. I came in with a head start — having already mapped WELT's media UX through heuristic evaluation before the project brief existed.",
      image: 'intro.jpg',
    },
    {
      id: 'problem',
      title: 'Problem',
      body: "Our videos performed well on YouTube. On our own products, they didn't. Users who arrived at an article page faced the same sequence: find the teaser, navigate to the article, locate the video container, press play — and lose the audio the moment they left the page.",
      items: [
        "Video performed well on YouTube but not on own products — isolating the experience, not the content, as the problem",
        "Core UX failures: article-locked playback, no PiP on iOS, no playlists, no content discovery after a video ended",
        "WELT audience primarily SEO-driven cold-start users; Bild audience direct traffic habitual returners — different behaviours, shared friction",
        "No external user testing conducted — internal stakeholder reviews used to mitigate risk; I would not make this call again",
      ],
      image: 'problem.jpg',
    },
    {
      id: 'research',
      title: 'Research',
      items: [
        "No external user testing — too fast. Internal reviews and stakeholder walkthroughs mitigated risk but left uncertainty about real user behaviour",
        "Brand autonomy over player trigger design — WELT chose teaser-to-PiP without a new page; I disagreed on grounds of visual density",
        "Video discovery still broken post-launch — the player works; the path to it doesn't",
      ],
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "I led the design alongside one designer from WELT and one from Bild, working in shared Figma files. I set the design vision and architecture; brand designers defined how it had to express each brand. The result: a shared behavioural core — persistent PiP, continuous audio, playlist and suggestion patterns — with a flexible visual layer on top.",
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: 'Feature 01',
      subtitle: 'Scope the MVP to the two highest-impact fixes: persistent PiP and continuous audio',
      body: "Article-locked audio was the clearest drop-off point. Scoping tightly gave the project measurable success criteria and a delivery cycle fast enough to get management support.",
    },
    {
      id: 'feature-02',
      title: 'Feature 02',
      subtitle: 'Co-design with one designer from each brand, not design for them',
      body: "I set the structural vision and component architecture. Brand designers from WELT and Bild defined the visual criteria. The final system reflected real constraints from each product — not assumptions from the outside.",
    },
    {
      id: 'feature-03',
      title: 'Feature 03',
      subtitle: 'Shared behavioural core with a flexible visual layer',
      body: "Colours, typography, iconography, and spacing are brand-specific. Everything else is shared. The risk of a less carefully considered abstraction was a system where one brand felt like the other with different paint. That was avoided.",
    },
  ],
}
```

- [ ] **Step 3: Create `content/projects/figma-content-plugin.ts`**

```typescript
import type { ProjectContent } from '@/lib/projects'

export const figmaContentPlugin: ProjectContent = {
  slug: 'figma-content-plugin',
  title: 'Figma Content Plugin',
  category: 'Internal Tool / Side Project',
  year: '2026',
  role: 'Designer + Developer',
  team: 'Solo',
  timeline: '2025',
  skills: ['Vibe Coding', 'Plugin Development', 'RSS Integration'],
  thumbnail: '/images/projects/figma-content-plugin/thumbnail.jpg',
  heroImage: '/images/projects/figma-content-plugin/hero.jpg',
  overview:
    "While working on the Blatt design system, I was laying out a WELT prototype that needed real news content — ten teasers, populated with actual headlines and text. The manual process: open the website, find an article that fits, copy it in. Five minutes per teaser, twenty minutes minimum for a full page. I had been building vibe coding skills through the Blatt project. This time I built the solution instead of doing the task. First version scraped the website directly. Second used the RSS feed — stable, shareable, deployable to the whole team. Conceived, designed, and shipped in a day.",
  results: [
    '60x faster content population: ~5 minutes per teaser → ~5 seconds (observed estimate)',
    'Real publication content in designs, eliminating lorem ipsum entirely',
    'Integrated into the Designers Toolkit — distributed to all Axel Springer employees',
    'First designer on the team to independently ship working software',
    'Contributed to a wider movement of designer-built tooling, including a team-built Token Studio replacement',
  ],
  nextProject: 'upday-news-app-redesign',
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "I was working on a WELT prototype — a full page of news teasers that needed real content. I'd done this manually hundreds of times: open the site, find articles, copy them in. Five minutes each, twenty minutes for a page. This time was different: I'd been building vibe coding skills through the Blatt project, experimenting with Claude, learning how to prototype software. I decided to build the solution instead of doing the task again.",
      video: {
        left: '/images/Screen Recording 2026-03-09 at 20.37.53.mov',
        right: '/images/2.Screen Recording 2026-03-09 at 20.37.53.mov',
      },
    },
    {
      id: 'problem',
      title: 'Problem',
      body: "Our multilingual team populated mockups with placeholder text by default — hunting through live publications when they needed something real, guessing how German character counts would behave, discovering that designs broke in production when the real content arrived. It was a daily friction point that compounded across every designer, every project.",
      items: [
        "Every designer on the team encountered the same friction daily — populating mockups with real content was a manual process with no shortcut",
        "German character counts, line breaks, and typographic behaviour were unpredictable with placeholder text — designs regularly broke in production",
        "Colleagues validated the problem before the tool existed — I knew this was a shared pain, not a personal one",
      ],
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "A Figma plugin with a single button. Press it: selected text layers populate with live content from the publication's RSS feed. No configuration, no field mapping, no options. The interface is minimal — the complexity is hidden, the interaction is instant.",
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: 'Feature 01',
      subtitle: 'Switch from website scraping to RSS feed for v2',
      body: "Scraping breaks when page structure changes and can't be distributed as a shared tool. The RSS feed is stable, publicly accessible, and maintenance-free. This is what made company-wide distribution possible.",
    },
    {
      id: 'feature-02',
      title: 'Feature 02',
      subtitle: 'One button. No configuration, no options.',
      body: "A more complex version would have added content filters, field mapping, and language selection. All of that would have made it slower to use and harder to explain. The constraint — it does one thing — is what made adoption instant.",
    },
    {
      id: 'feature-03',
      title: 'Feature 03',
      subtitle: 'Design the aesthetic for delight, not just function',
      body: "Keygen reference first — playful, a bit transgressive, good energy for a tool that makes something tedious disappear. Later updated to terminal aesthetic for portfolio consistency and to reduce viewport intrusion. An internal tool people enjoy opening gets used more than one they don't.",
    },
  ],
}
```

- [ ] **Step 4: Update `lib/projects.ts` to import all 4 and export as `projects[]`**

Replace the temporary empty `projects[]` and the old inline array with:

```typescript
import { blatt } from '@/content/projects/blatt'
import { upday } from '@/content/projects/upday'
import { mediaPlayerSdk } from '@/content/projects/media-player-sdk'
import { figmaContentPlugin } from '@/content/projects/figma-content-plugin'

export const projects: ProjectContent[] = [blatt, upday, mediaPlayerSdk, figmaContentPlugin]
```

- [ ] **Step 5: Verify TypeScript compiles cleanly**

```bash
cd "/Users/enogueir/My portfolio" && npx tsc --noEmit 2>&1
```

Expected: no errors

- [ ] **Step 6: Run build**

```bash
cd "/Users/enogueir/My portfolio" && npm run build 2>&1 | tail -30
```

Expected: `✓ Compiled successfully` with no type errors

- [ ] **Step 7: Commit**

```bash
cd "/Users/enogueir/My portfolio" && git add content/ lib/projects.ts && git commit -m "feat: migrate all 4 projects to sections-based content files"
```

---

## Chunk 4: Fix Home Page Compatibility + Cleanup

### Task 7: Fix home page components that reference old `Project` type

**Files:**
- Read and modify: `components/home/ProjectCard.tsx` (if it uses `Project`)
- Read and modify: `components/home/ProjectGrid.tsx` (if it uses `Project`)

- [ ] **Step 1: Check which home components reference `Project`**

```bash
cd "/Users/enogueir/My portfolio" && grep -rn "Project" components/home/ --include="*.tsx" | grep -v "ProjectContent"
```

> **Note:** `MUTHURTerminal.tsx` imports only `{ projects }` (the array value), not the `Project` type. It will appear in grep results but requires no modification — `ProjectContent` retains the `thumbnail`, `title`, and `slug` fields it reads.

- [ ] **Step 2: Update imports in any affected files**

For each file that imports `Project` as a **type**, change to `ProjectContent`. Files that only import `{ projects }` (the array) need no change — the array is now `ProjectContent[]` and the fields used (`thumbnail`, `title`, `category`, `slug`) all exist on `ProjectContent`.

- [ ] **Step 3: Full build verify**

```bash
cd "/Users/enogueir/My portfolio" && npm run build 2>&1 | tail -30
```

Expected: clean build

---

### Task 8: Remove old `Project` + `CaseStudy` interfaces

**Files:**
- Modify: `lib/projects.ts`

- [ ] **Step 1: Delete the old `CaseStudy` and `Project` interfaces**

Remove from `lib/projects.ts`:
```typescript
export interface CaseStudy { ... }
export interface Project { ... }
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/enogueir/My portfolio" && npm run build 2>&1 | tail -30
```

Expected: clean

- [ ] **Step 3: Final commit**

```bash
cd "/Users/enogueir/My portfolio" && git add -A && git commit -m "refactor: remove legacy Project/CaseStudy types, complete sections migration"
```

---

## Visual Verification Checklist

After `npm run build` passes, start the dev server and check each project page:

```bash
cd "/Users/enogueir/My portfolio" && npm run dev
```

For each project at `http://localhost:3000/projects/{slug}`:
- [ ] Sticky header renders correctly
- [ ] Hero image loads (or gracefully hides if absent)
- [ ] Sections with `image` show the image below the text columns
- [ ] Sections without `image` have visible vertical height (≈80vh) on desktop
- [ ] On mobile (resize to 375px), imageless sections stack normally without excess whitespace
- [ ] Impact / Results section renders after the last section
- [ ] `figma-content-plugin` video pair renders in the context section
- [ ] Next Mission footer and fixed button navigate to the correct project
- [ ] Home page project grid renders all 4 cards correctly
