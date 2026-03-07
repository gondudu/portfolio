export interface CaseStudy {
  context: string
  researchFindings: string[]
  keyDecisions: { decision: string; outcome: string }[]
  tradeoffs: string[]
  retrospective: string
}

export interface Project {
  slug: string
  title: string
  category: string
  year: string
  role: string
  thumbnail: string
  heroImage: string
  overview: string
  challenge: string
  solution: string
  results: string[]
  images: string[]
  nextProject?: string
  caseStudy?: CaseStudy
}

export const projects: Project[] = [
  {
    slug: 'upday-news-app-redesign',
    title: 'Upday News App Redesign',
    category: 'Mobile App / News Platform',
    year: '2024–Present',
    role: 'Lead Product Designer',
    thumbnail: '/images/img_upday_cover.jpg',
    heroImage: '/images/img_upday_cover.jpg',
    overview: 'Upday was a news app preinstalled on every Samsung phone, serving millions of users across Europe. When Samsung ended the partnership and replaced Upday with Google News, the company had one option: migrate its existing user base to a standalone app and acquire new users — fast. I led the redesign under survival conditions: a stripped-down team, compressed timelines, and a product that needed to justify its own existence.',
    challenge: 'Analytics showed that 80% of users only ever opened the top news feed. The app\'s identity was tied to Samsung hardware that no longer shipped it. At the same time, Upday was transitioning from a news aggregator to an in-house editorial model with AI-written content — a fundamental shift in what the product was, not just how it looked. The challenge was redesigning an experience that felt fresh and ownable while migrating users who expected familiarity. Not every decision went the way I wanted: I argued to keep the aggregator model and lost.',
    solution: 'I audited the existing product, worked with the research team to define three user personas — the News Seeker, the Explorer, and the Passive Reader — and focused the redesign on the 80% use case first. I introduced two new typefaces to move the brand away from a generic Roboto stack, giving the UI editorial personality without losing credibility. A new brand color was planned in phases to avoid disorienting migrating users. Features with low engagement and high infrastructure cost — including the aggregator and local news — were cut after advocating for their retention with data.',
    results: [
      '10% increase in user retention',
      '20% increase in time spent in app',
      'Information architecture rebuilt around the dominant use case',
      'New type system reduced perceived genericness of the product',
      'Phased color rollout prevented disruption during a high-risk user migration',
    ],
    images: [
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    ],
    nextProject: 'media-player-sdk-axel-springer',
    caseStudy: {
      context: 'Upday had been preinstalled on Samsung phones for years, serving millions of users as a bundled news app. When Samsung ended the partnership and replaced Upday with Google News, the stakes were immediate: users switching to newer Samsung phones would have to manually install the app, and the company needed to migrate its existing base while acquiring new users — fast. The team and budget were stripped down to survival mode. Build fast or be sunset.',
      researchFindings: [
        '80% of users only used the top news feed — personalization and local features had far lower engagement than assumed',
        'User reviews and interviews surfaced three core needs: fresher content, a simpler experience, and quicker updates',
        'Local news had a consistent and loyal niche — comparable segment sizes to regional news outlets elsewhere in the Axel Springer portfolio',
        'The transition from news aggregator to AI-written editorial content was a fundamental product shift, not just a redesign',
        'Three user personas defined: the News Seeker (fast, reliable), the Explorer (diverse perspectives), the Passive Reader (AI summaries)',
      ],
      keyDecisions: [
        {
          decision: 'Cut the news aggregator model and local news to reduce infrastructure costs',
          outcome: 'Eduardo advocated for keeping local news using engagement data from sister publications, but accepted the business rationale. Retrospectively: the shift to AI-written content hurt the product more than any feature cut.',
        },
        {
          decision: 'Introduce two new typefaces to replace Roboto',
          outcome: 'Gave the brand more personality while keeping editorial credibility. The previous generic type stack made the UI feel transitional and undifferentiated.',
        },
        {
          decision: 'Phase the brand color change instead of shipping it immediately',
          outcome: 'The original accent color — a bright pool green (#1DB8DA) — failed accessibility contrast checks and gave the brand a pastelized feeling. Rather than confuse migrating users with too much change at once, a phased rollout was planned. New brand blue (#002BFF) introduced in a later phase.',
        },
      ],
      tradeoffs: [
        'Speed vs. quality — the app needed to ship fast to survive, which limited how much the experience could be rethought',
        'Feature breadth vs. cost — beloved features (aggregator, local news) were cut to make the economics work',
        'Brand improvement vs. migration comfort — color and identity changes were deferred to avoid disorienting a large transitioning user base',
      ],
      retrospective: 'I would have fought harder to keep the aggregator model. The content quality shift to AI-written articles hurt the product\'s value proposition in ways that good design alone couldn\'t compensate for. The design system work and brand direction held up — but the editorial pivot was the decision I disagreed with most.',
    },
  },
  {
    slug: 'media-player-sdk-axel-springer',
    title: 'Media Player SDK',
    category: 'Platform Design / Consumer Media',
    year: '2024',
    role: 'Lead Product Designer',
    thumbnail: '/images/bhxnu-s2HHseW10Pc-unsplash.jpg',
    heroImage: '/images/bhxnu-s2HHseW10Pc-unsplash.jpg',
    overview: 'WELT and Bild — Axel Springer\'s two largest news brands — each had separate contracts with video infrastructure providers, with their developers independently solving the same problems. I led the design of a unified media player SDK that consolidates that effort into a single shared foundation, while giving each brand full freedom to express its own visual identity on top.',
    challenge: 'Users arriving at article pages via SEO or direct traffic were running into two consistent drop-off points: no Picture-in-Picture support on iOS, and audio that stopped the moment they left the page. Both issues required platform-level changes that neither brand had prioritized individually. The brief came from management as a cost-cutting initiative — my job was to make it a user experience improvement at the same time. The hardest part was designing a system flexible enough for two distinct brand identities without it fracturing into two separate products.',
    solution: 'Working with a lean team alongside UX researchers and one designer from each brand, I scoped the MVP around the two highest-impact fixes: persistent PiP and continuous audio playback. Co-designing with brand designers from WELT and Bild meant the architecture reflected real product constraints from the start. The result was a shared behavioral core with a flexible styling layer — each brand implements the same SDK but applies its own visual identity independently.',
    results: [
      '8% improvement in media retention',
      '15% increase in audio consumption',
      'Shipped to WELT and Bild iOS apps within 6 months',
      'Eliminated duplicate infrastructure contracts across brands',
      'Single SDK foundation for all future Axel Springer media products',
    ],
    images: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop',
    ],
    nextProject: 'nmt-product-suite-design-system',
    caseStudy: {
      context: 'WELT and Bild — Axel Springer\'s two largest news brands — each had separate contracts with media providers like Bitmovin for video infrastructure. Their developers were independently solving identical problems. Management\'s goal was cost reduction through consolidation. Eduardo\'s concern: use that consolidation as an opportunity to fix the user experience, not just the invoice.',
      researchFindings: [
        'Users on iOS had no consistent Picture-in-Picture experience — a friction point that broke media consumption flows',
        'Audio playback was page-contained: users who left the article page lost the audio, causing significant drop-off',
        'WELT\'s audience arrives primarily via SEO; Bild\'s via direct traffic — different user behaviors but shared media consumption patterns',
        'Both brand dev teams were working in parallel on the same problems with no shared infrastructure or design language',
        'Competitive analysis revealed that persistent audio and PiP were table-stakes features in leading news and media apps',
      ],
      keyDecisions: [
        {
          decision: 'Scope the MVP around the two highest-impact UX fixes: PiP and persistent audio',
          outcome: 'Rather than trying to redesign the entire media experience, focusing on the two biggest drop-off causes gave the project clear success metrics and a manageable scope for a lean team.',
        },
        {
          decision: 'Co-design with brand designers rather than designing for them',
          outcome: 'Bringing in one designer from WELT and one from Bild to iterate on concepts meant the final system reflected the real constraints of each brand\'s product — not just Eduardo\'s assumptions from the outside.',
        },
        {
          decision: 'Design a shared foundation that each brand could independently extend',
          outcome: 'The SDK defined core component behavior and interaction patterns while leaving visual customization to each brand. This preserved brand identity without duplicating engineering effort.',
        },
      ],
      tradeoffs: [
        'Management\'s cost-reduction goal vs. user experience investment — resolved by framing UX improvements as retention drivers with measurable ROI',
        'Shared foundation vs. brand differentiation — the modular architecture let each brand apply its own visual layer on top of a common behavioral core',
        'Speed of delivery vs. depth of research — lean team meant making confident decisions on behavioral research rather than extensive primary user testing',
      ],
      retrospective: 'The project proved that a well-argued case for UX quality can align with a business cost-cutting mandate rather than fight against it. The shared SDK shipped to both WELT and Bild iOS apps within 6 months — a fast cycle in a large corporate environment.',
    },
  },
  {
    slug: 'nmt-product-suite-design-system',
    title: 'Blatt Design System',
    category: 'Design System / Organizational Transformation',
    year: '2024–2026',
    role: 'Product Designer',
    thumbnail: '/images/blatt.jpg',
    heroImage: '/images/blatt.jpg',
    overview: 'Blatt is the unified design system supporting all digital products within Axel Springer — B2B and B2C, editorial and infrastructure. This was as much a cultural project as a design one: building design maturity inside a traditionally decentralized organization, finding allies across business units, and making the case that systematic design is a strategic investment, not overhead.',
    challenge: 'Every team at Axel Springer built independently. There was no shared foundation, no common workflow — even within the design team itself. Designers without engineering context were building components that were aesthetically free but inconsistent and costly to implement. The resistance wasn\'t technical; it was about changing how people work. Introducing design tokens, shared libraries, and contribution workflows meant asking colleagues to rethink habits that had been in place for years. Getting teams to invest time in the system while still shipping their own roadmaps was a tension that never fully went away.',
    solution: 'I started a pilot team with one designer from each major brand — WELT, Bild, Editorial — and focused on education before governance. Workshops, monthly meetings, and shared documentation built familiarity slowly. The turning point was demonstrating that Blatt\'s tokens made Claude-powered prototyping dramatically more on-brand than anything before — colleagues saw the immediate value and wanted in. I also built the tooling layer: a Figma plugin for component evaluation and contribution flows, a token export plugin that replaced Token Studio, and CSS conversion scripts I wrote to connect Figma variables directly to the WELT codebase. I now maintain the WELT design system repository on GitHub.',
    results: [
      'Adopted by 8 teams across the organization',
      'Replaced Token Studio with a custom-built plugin, cutting external tooling costs',
      'Design tokens structured for LLM consumption — enabling AI-assisted on-brand prototyping',
      'Direct Figma-to-production CSS pipeline, reducing design-to-dev handoff friction',
      'Design function established with strategic input on product decisions across brands',
    ],
    images: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&h=800&fit=crop',
    ],
    nextProject: 'figma-content-plugin',
    caseStudy: {
      context: 'Axel Springer\'s decentralized structure meant every product team built independently — no shared foundations, growing design debt, and duplicated effort across brands. Beyond the technical complexity, the deeper challenge was organizational: building design maturity inside a company with limited design culture, and convincing management that systematic design was a strategic investment, not overhead. The project was as much about cultural change as component libraries.',
      researchFindings: [
        'Internal audit revealed scattered infrastructure, inconsistent patterns, and redundant work across teams',
        'Within the design team itself: no common workflow, no shared tooling conventions, designers unaccustomed to system thinking or code constraints',
        'Designers were building in an unconstrained way — aesthetically free, but generating components that were hard to implement consistently',
        'Management skepticism: design systems create additional workload for teams who didn\'t ask for it, with benefits that are long-term and indirect',
        'Opportunity identified: design tokens as machine-readable context could unlock AI-assisted prototyping workflows',
      ],
      keyDecisions: [
        {
          decision: 'Start with a pilot team of one designer per brand rather than a top-down mandate',
          outcome: 'Reduced resistance by building the system with the people who would use it, not for them. Created internal ambassadors in each team from day one.',
        },
        {
          decision: 'Use Claude-powered prototyping as a proof-of-value demo',
          outcome: 'When Eduardo showed colleagues that design tokens enabled Claude to generate on-brand coded prototypes automatically, abstract system value became concrete and immediately desirable. Adoption followed the demo.',
        },
        {
          decision: 'Build internal tooling to eliminate friction at adoption points',
          outcome: 'Created a Figma plugin for component evaluation and contribution flows. Built a token export plugin that replaced Token Studio — eliminating a paid tool while improving the Figma-to-code pipeline. Eduardo wrote the CSS variable conversion scripts and maintains the WELT design system GitHub repo.',
        },
      ],
      tradeoffs: [
        'Creating additional workload (the system itself) for teams already under delivery pressure — required sustained stakeholder management',
        'System consistency vs. team autonomy — governance models had to balance standardization with room for brand-specific expression',
        'Long-term investment vs. short-term velocity — made the case repeatedly that the system pays back its upfront cost through reduced decision fatigue and faster shipping',
      ],
      retrospective: 'This project showed me the future of the design profession. A designer who understands tokens, version control, and AI-assisted workflows can multiply their impact in ways that pure craft work cannot. The hardest part was never the system — it was the culture. Getting a seat at the table for design in a traditional organization requires patience, allies, and proof that you speak the language of the business.',
    },
  },
  {
    slug: 'figma-content-plugin',
    title: 'Figma Content Plugin',
    category: 'Internal Tool / Side Project',
    year: '2026',
    role: 'Designer + Developer',
    thumbnail: '/images/figmaplug_cover.jpg',
    heroImage: '/images/figmaplug_cover.jpg',
    overview: 'While working on the Blatt design system, I started exploring what it meant for a designer to build software. One afternoon I was laying out a prototype and needed real German content — not lorem ipsum. The manual process of hunting through publications was something every designer on the team did, every day. I built a Figma plugin with Claude that solves it in a button press. Conceived, designed, and shipped in a single day.',
    challenge: 'Our multilingual team constantly hunted for real German content to populate mockups. Placeholder text broke design authenticity — character counts were wrong, line breaks unpredictable, and the resulting designs often broke in production. Template creation was slow and repetitive. For a team working at the pace of a news organization, this friction compounded daily. The limit of the solution was scope: it solves the content problem but does nothing to address the deeper workflow of keeping designs in sync with a continuously changing publication.',
    solution: 'I built a Figma plugin that pulls live publication content directly into selected text layers. The interface is a single button. The aesthetic was intentionally playful — originally a nostalgic early-2000s keygen vibe, now updated to match the terminal aesthetic of this portfolio. The design principle: work is serious enough. Every time a colleague opens this tool, it should make them smile. It was also the project that proved to me — and to the team — that designers can ship working software.',
    results: [
      '10x faster template creation',
      'Real publication content in designs, eliminating lorem ipsum entirely',
      'Solved German character count guesswork for the multilingual team',
      'Conceived, designed, and shipped in 1 day',
      'Sparked a wider movement of designer-built tooling across the team',
    ],
    images: [
      'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop',
    ],
    nextProject: 'upday-news-app-redesign',
    caseStudy: {
      context: 'During the Blatt design system project, Eduardo started exploring Figma plugin development — learning how accessible it had become to build internal tools with Claude. One afternoon, while laying out a prototype for a new website, he needed to insert real, dynamic German content. The manual process — searching publications, copying text, guessing character counts — was a daily friction point for the entire multilingual team. He thought: there has to be a way to automate this. A few hours later, there was.',
      researchFindings: [
        'The team constantly searched for real German content to populate design mockups — placeholder text broke authenticity and made designs harder to evaluate',
        'For a multilingual team, German character counts and line breaks were unpredictable with lorem ipsum — designs often broke in production',
        'Template creation was slow and repetitive — the same content-hunting process repeated for every new design',
        'The plugin concept was immediately validated: colleagues across the team identified the same friction before the tool even existed',
      ],
      keyDecisions: [
        {
          decision: 'Build and ship in a single day rather than planning a longer project',
          outcome: 'The problem was clear, the solution was focused, the user was himself. Shipping fast proved the point: the best design solves a clear problem without over-engineering it.',
        },
        {
          decision: 'Design the UI for delight, not just function',
          outcome: 'An internal tool could have been purely utilitarian. Eduardo chose an aesthetic deliberately — originally a nostalgic early-2000s keygen vibe, later updated to the Alien/console terminal aesthetic. The reasoning: work is serious enough. Every time a colleague opens this plugin, it should make them smile.',
        },
        {
          decision: 'Use Claude as a coding partner throughout the build',
          outcome: 'This project proved to Eduardo — and later to his colleagues — that designers could ship working software independently. It became an early proof-of-concept for the designer-as-builder capability that later drove Blatt\'s tooling layer.',
        },
      ],
      tradeoffs: [
        'Solve it now vs. solve it right — chose speed and clarity over architecture; the tool does one thing and does it well',
        'Functional vs. delightful — invested time in the aesthetic even for an internal tool, because delight is a legitimate design goal',
      ],
      retrospective: 'This project crystallized something I\'d felt for a while: the best design is often the simplest intervention at the right moment. I didn\'t need a brief, a research plan, or a stakeholder approval. I saw a problem I had myself, built the solution in a day, and my colleagues were immediately happier. Sometimes that\'s what design is.',
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getNextProject(currentSlug: string): Project | undefined {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug)
  if (currentIndex === -1) return undefined
  const nextIndex = (currentIndex + 1) % projects.length
  return projects[nextIndex]
}
