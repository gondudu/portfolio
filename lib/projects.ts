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
    slug: 'nmt-product-suite-design-system',
    title: 'Blatt Design System',
    category: 'Design System / Organisational Transformation',
    year: '2024–2026',
    role: 'Product Designer',
    thumbnail: '/images/blatt.jpg',
    heroImage: '/images/blatt.jpg',
    overview:
      'Axel Springer\'s product teams built independently — separate components, separate conventions, no shared foundation across brands. I came to this through my bachelor\'s thesis — written while on an Axel Springer scholarship at CODE University Berlin, it mapped the state of design culture across the company through interviews with colleagues. That research gave me the credibility to propose the system. Blatt is the result: a unified design infrastructure for WELT and Bild, currently in active migration across both brands.',
    challenge:
      'The problem was never technical — it was cultural. Designers without engineering context were building in an aesthetically free but system-hostile way: components that looked right in Figma and broke in production. Introducing design tokens, shared libraries, and contribution workflows meant asking colleagues to change habits that had been in place for years — while still shipping their own roadmaps. Without management patience and protected roadmap space, this system simply wouldn\'t exist. That tension has never fully gone away.',
    solution:
      'I started with a pattern library for WELT — an immediate speed-up that created buy-in before any governance existed. I ran workshops and onboarding sessions early — not to document the system, but to make it feel like something colleagues had helped build. The goal wasn\'t compliance; it was understanding. The real breakthrough came from aligning with developers: we synced naming conventions, documentation standards, and repositories — creating an automated pipeline between Figma and production code. Developers taught me how their codebases worked; I taught them how design decisions were made. That mutual education changed the collaboration model. Across the team, designers started building tooling: a colleague built a Figma plugin to replace Token Studio — the licensed alternative was too expensive at scale. My contribution was a content plugin for populating designs with live publication data, later integrated into the company-wide Designers Toolkit and distributed to every Axel Springer employee.',
    results: [
      'Adopted by 8 teams across the organisation',
      'Migration phase active — WELT and Bild currently refactoring components to the Blatt standard',
      'Automated Figma-to-production CSS pipeline, reducing design-to-dev handoff friction',
      'Design tokens structured for LLM consumption — AI-assisted on-brand prototyping now possible',
      'Internal tooling ecosystem built collectively across the design team, distributed company-wide via the Designers Toolkit',
      'Design function has strategic input on product decisions across brands that it did not have before',
    ],
    images: [
      '/images/blatt.jpg',
      '/images/brand-guidelins/Slide 16_9 - 48.png',
      '/images/brand-guidelins/Slide 16_9 - 50.png',
      '/images/brand-guidelins/Slide 16_9 - 55.png',
      '/images/brand-guidelins/Slide 16_9 - 51.png',
      '/images/brand-guidelins/Slide 16_9 - 49.png',
    ],
    nextProject: 'figma-content-plugin',
    caseStudy: {
      context:
        'I came to Blatt through an unusual path. While studying at CODE University Berlin on an Axel Springer scholarship, I wrote my bachelor\'s thesis on the state of design culture at the company — interviewing colleagues, mapping workflow fragmentation, documenting exactly what was keeping teams from better product development. That research gave me the credibility to propose the system, and I was hired after graduation to build it. Blatt launched in mid-2025.',
      researchFindings: [
        'Teams across Axel Springer brands built independently — no shared components, no common conventions, growing design debt and duplicated effort',
        'Designers without engineering context were building components that were aesthetically free but expensive to implement and impossible to maintain at scale',
        'Token Studio: too expensive to license per employee across multiple brands — an opening for internal tooling built by the team itself',
        'Developers and designers lacked a shared vocabulary — naming conventions, documentation standards, and handoff workflows were inconsistent across brands',
        'Structuring tokens for LLM consumption would extend the system\'s reach into AI-assisted prototyping — design decisions readable not just by humans, but by AI coding tools',
      ],
      keyDecisions: [
        {
          decision: 'Start with a pattern library for WELT, not a company-wide mandate',
          outcome:
            'Created an immediate speed-up for the team I knew best — early proof of value before asking anyone else to invest. Buy-in preceded governance.',
        },
        {
          decision: 'Education before governance — workshops and onboarding before contribution rules',
          outcome:
            'Designers needed to understand why the system worked the way it did before following it. Mandating adoption without that understanding generates resistance. Building it generates allies.',
        },
        {
          decision: 'Align with developers and build a real pipeline, not just a Figma library',
          outcome:
            'Syncing naming conventions and repositories made the system live in production code, not just in design files. The mutual education — developers teaching me about codebases, me teaching them about design decisions — is what made the handoff workflow replicable across teams.',
        },
      ],
      tradeoffs: [
        'Management expects quick results; design systems require long-term cultural change — the project exists at the mercy of roadmap space that other teams control',
        'System consistency vs. team autonomy — governance had to leave room for brand-specific expression, or teams would simply build outside the system',
        'The tooling ecosystem was a collective effort across the design team — I contributed significantly but did not build everything. The work was collaborative, not a solo achievement.',
      ],
      retrospective:
        'The hardest part was never the components — it was the culture. A design system is only as strong as the management patience that protects its roadmap space. That\'s still the thing I can\'t fully control, and it\'s the thing that would break this if it disappeared.',
    },
  },
  {
    slug: 'upday-news-app-redesign',
    title: 'Upday News App Redesign',
    category: 'Mobile App / News Platform',
    year: '2024–Present',
    role: 'Lead Product Designer',
    thumbnail: '/images/UPDAY.jpg',
    heroImage: '/images/brand-guidelins/upday_cover.jpg',
    overview:
      'Upday came preinstalled on every Samsung Galaxy phone in Europe — seventy million monthly users who never chose to download it. When Samsung replaced it with Google News in 2024, the product had to survive on its own for the first time. I led the redesign as part of a ten-person cross-functional team, working against a six-month deadline and a new backend. What we thought was a visual refresh turned into a harder question: without Samsung\'s distribution, what reason does anyone have to install this?',
    challenge:
      'The brief was to modernise the interface. Then we pulled the analytics. Eighty percent of users had never left the top news feed — the personalisation features, local news, and discovery tools the team treated as differentiators had almost no one using them. The problem wasn\'t visual. It was that the product had been designed for a captive audience that no longer existed. I argued to keep the local news feed using engagement data from sister publications at Axel Springer. I lost.',
    solution:
      'I audited the full existing product — surfacing the iOS home widget as a critical retention feature for power users, and identifying the old accent colour (#1DB8DA) as an accessibility failure: roughly 2.7:1 contrast against white on buttons and chips, below the WCAG minimum. Navigation went from five tabs to four — Top News, My News, Shorts, and Games — with profile moved to the top bar. Two Google Fonts replaced Roboto: Freeman for display (condensed, giving more control across the app\'s seven language editions, and with the editorial personality Roboto never had) and Gothic A1 for body and labels. I considered Gotham Condensed and Futura — proven, well-established typefaces I\'d have preferred — but the team needed to avoid typefoundry licensing costs. The new colour, #002BFF, passed WCAG. Rolled out in phases to avoid disorienting users mid-migration.',
    results: [
      '10% increase in user retention',
      '20% increase in time spent in app',
      'Information architecture rebuilt around the dominant 80% use case',
      'Accessibility corrected: #1DB8DA → #002BFF, WCAG contrast restored on all interactive elements',
      'iOS home widget retained through migration — essential for power users, identified in audit',
      'Ads shipped before UI issues resolved — I flagged the risk; business proceeded',
    ],
    images: [
      '/images/UPDAY.jpg',
      '/images/brand-guidelins/upday-notificaciones.jpg',
      '/images/brand-guidelins/big-news-in-short-time-die-individualisierbare-nachrichten-app-upday-informiert-aktuell-und-kompakt-zum-tagesgeschehen,72118_proportional_6.jpg',
      '/images/brand-guidelins/Slide 16_9 - 8.jpg',
      '/images/brand-guidelins/Slide 16_9 - 34@2x.jpg',
    ],
    nextProject: 'media-player-sdk-axel-springer',
    caseStudy: {
      context:
        'Upday had been Samsung\'s default swipe-left news surface across Europe — preinstalled on Galaxy devices, never downloaded by choice. When Samsung replaced it with Google News in 2024, the product faced the open market for the first time. A ten-person cross-functional team — developers, product owners, business managers, the CTO, and me leading UI/UX — had roughly six months to ship a version that could survive without the preinstall.',
      researchFindings: [
        '80% of users had never left the top news feed — the personalisation, local news, and discovery features the team treated as differentiators had almost no one using them',
        'Three user personas defined: News Seeker (fast, reliable updates), Explorer (diverse perspectives), Passive Reader (AI summaries)',
        'Local news retained a loyal niche — I used engagement data from sister Axel Springer publications to argue for keeping it',
        'Old accent colour #1DB8DA failed WCAG contrast requirements on buttons and chips against white (~2.7:1) — identified during design system audit, not flagged externally',
        'iOS home widget: identified as essential for power users during the product audit; at risk of being cut in the migration sprint',
      ],
      keyDecisions: [
        {
          decision: 'Rebuild navigation around the 80% use case — four tabs instead of five',
          outcome:
            'Discover and Local were cut despite my advocating for their retention with data. The decision was driven by infrastructure cost and the new AI-editorial backend. Profile moved to the top bar. The aggregator model ended with this redesign.',
        },
        {
          decision: 'Replace Roboto with Freeman (display) and Gothic A1 (body)',
          outcome:
            'Considered Gotham Condensed and Futura — established, better-proven typefaces I would have preferred. Budget ruled them out. Freeman\'s condensed style handles the app\'s seven language editions more efficiently: headlines stay tighter across longer words in German, Polish, and Dutch. Gothic A1 chosen for readability in short reading sessions. Both are Google Fonts, avoiding typefoundry licensing costs entirely.',
        },
        {
          decision: 'Fix the accessibility failure and phase the colour rebrand separately',
          outcome:
            '#1DB8DA on white was running at ~2.7:1 contrast — below WCAG AA minimum for interactive UI components. Self-identified during the audit. #002BFF replaced it. The rollout was phased to avoid disorienting users who were already navigating a product migration.',
        },
        {
          decision: 'Add Games as a fourth core tab',
          outcome:
            'Supported by patterns across Axel Springer news products: news consumption is largely entertainment-driven, and games fit that habit for a meaningful user segment. I was genuinely convinced — this was not a compromise.',
        },
      ],
      tradeoffs: [
        'Ads shipped before UI quality issues were resolved — I raised the risk; the business made the call. The concern was documented.',
        'Local news and the aggregator model were cut despite engagement data supporting their retention — timeline and infrastructure cost won',
        'Google Fonts instead of professional typefoundry licences — a reasonable constraint-driven compromise, but a compromise on typographic craft',
      ],
      retrospective:
        'The iOS home widget is the work I\'m most proud of that isn\'t in the case study — finding it in the audit and making sure it survived the migration mattered to the users who relied on it daily. The ad timing decision is the one I\'d push harder on next time. Design can\'t fix what monetisation breaks.',
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
    overview:
      'WELT and Bild — Axel Springer\'s two largest news brands — each ran separate video infrastructure contracts, with engineers at both brands independently solving identical problems. I came into this project already knowing WELT\'s media experience from the inside: I\'d mapped its failure points through heuristic evaluation before the brief existed. The cost consolidation mandate gave us the opening to fix what I\'d already found.',
    challenge:
      'Our videos performed well on YouTube. On our own products, they didn\'t. Users who arrived at an article page faced the same sequence: find the teaser, navigate to the article, locate the video container, press play — and lose the audio the moment they left the page. No Picture-in-Picture. No playlists. No suggested content after a video ended. The experience was article-locked in a product where users had every reason to keep scrolling.',
    solution:
      'I led the design alongside one designer from WELT and one from Bild, working in shared Figma files. I set the design vision and architecture; brand designers defined how it had to express each brand. The result: a shared behavioural core — persistent PiP, continuous audio, playlist and suggestion patterns — with a flexible visual layer on top. The chassis is shared; neither brand is wearing the other\'s paint. One tradeoff I couldn\'t fully resolve: WELT chose to trigger the PiP container from teasers without opening a new page. I argued against it — the interface is already dense, and this adds more visual weight to an already crowded layout. They knew their users better in theory. In practice I\'m not sure the decision was right.',
    results: [
      '8% improvement in media retention',
      '15% increase in audio consumption',
      'Shipped to WELT and Bild iOS apps within 6 months',
      'Eliminated duplicate infrastructure contracts across brands',
      'Single SDK foundation for all future Axel Springer media products',
    ],
    images: [
      '/images/bhxnu-s2HHseW10Pc-unsplash.jpg',
      '/images/brand-guidelins/Slide 16_9 - 41.jpg',
      '/images/brand-guidelins/Slide 16_9 - 42.png',
      '/images/brand-guidelins/Slide 16_9 - 44.png',
      '/images/brand-guidelins/Slide 16_9 - 54.png',
    ],
    nextProject: 'nmt-product-suite-design-system',
    caseStudy: {
      context:
        'WELT and Bild ran separate contracts with video infrastructure providers. Developers at both brands were independently solving the same problems. Management\'s goal was consolidation and cost reduction. My goal: use that mandate to fix a user experience that had been falling behind for years. I came in with a head start — having already mapped WELT\'s media UX through heuristic evaluation before the project brief existed.',
      researchFindings: [
        'Video performed well on YouTube but not on own products — isolating the experience, not the content, as the problem',
        'Core UX failures: article-locked playback (users lost audio on navigation), no PiP on iOS, no playlists, no content discovery after a video ended',
        'WELT audience primarily SEO-driven, cold-start users; Bild audience direct traffic, habitual returners — different behaviours, shared media consumption friction',
        'Both brand dev teams working in parallel on the same problems with no shared infrastructure or design language',
        'No external user testing conducted — internal stakeholder reviews and prototype walkthroughs used to mitigate risk; I would not make this call again',
      ],
      keyDecisions: [
        {
          decision: 'Scope the MVP to the two highest-impact fixes: persistent PiP and continuous audio',
          outcome:
            'Article-locked audio was the clearest drop-off point. Scoping tightly gave the project measurable success criteria and a delivery cycle fast enough to get management support.',
        },
        {
          decision: 'Co-design with one designer from each brand, not design for them',
          outcome:
            'I set the structural vision and component architecture. Brand designers from WELT and Bild defined the visual criteria. The final system reflected real constraints from each product — not assumptions from the outside.',
        },
        {
          decision: 'Shared behavioural core with a flexible visual layer',
          outcome:
            'Colours, typography, iconography, and spacing are brand-specific. Everything else is shared. The risk of a less carefully considered abstraction was a system where one brand felt like the other with different paint. That was avoided.',
        },
      ],
      tradeoffs: [
        'No external user testing — too fast. Internal reviews and stakeholder walkthroughs mitigated risk but left uncertainty about real user behaviour that I carry forward',
        'Brand autonomy over player trigger design — WELT chose teaser-to-PiP without a new page; I disagreed on grounds of visual density, but brands were given final say over trigger patterns',
        'Video discovery still broken post-launch — the player works; the path to it doesn\'t. Videos remain scattered across the product, and users who want to consume video still lack a dedicated surface to do so',
      ],
      retrospective:
        'The player improved media retention. But the bigger problem — how users find video content before they reach the player — wasn\'t in scope and still isn\'t solved. A well-designed feature that\'s hard to find is a partial win at best.',
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
    overview:
      'While working on the Blatt design system, I was laying out a WELT prototype that needed real news content — ten teasers, populated with actual headlines and text. The manual process: open the website, find an article that fits, copy it in. Five minutes per teaser, twenty minutes minimum for a full page. I had been building vibe coding skills through the Blatt project. This time I built the solution instead of doing the task. First version scraped the website directly. Second used the RSS feed — stable, shareable, deployable to the whole team. Conceived, designed, and shipped in a day.',
    challenge:
      'Our multilingual team populated mockups with placeholder text by default — hunting through live publications when they needed something real, guessing how German character counts would behave, discovering that designs broke in production when the real content arrived. It was a daily friction point that compounded across every designer, every project.',
    solution:
      'A Figma plugin with a single button. Press it: selected text layers populate with live content from the publication\'s RSS feed. No configuration, no field mapping, no options. The interface is minimal — the complexity is hidden, the interaction is instant. The aesthetic was deliberate: I started with a keygen reference (early-2000s software cracking tools — playful, good energy for a tool that makes something tedious disappear). Later updated to match the terminal aesthetic of this portfolio — with a practical reason too: Figma plugins can\'t be moved outside the viewport, so a minimal UI means less interface covering your work. The plugin was integrated into the Designers Toolkit — a collective Figma plugin built during the Blatt project — making it available to every Axel Springer employee.',
    results: [
      '60x faster content population: ~5 minutes per teaser → ~5 seconds (observed estimate)',
      'Real publication content in designs, eliminating lorem ipsum entirely',
      'Integrated into the Designers Toolkit — distributed to all Axel Springer employees',
      'First designer on the team to independently ship working software',
      'Contributed to a wider movement of designer-built tooling, including a team-built Token Studio replacement',
    ],
    images: [
      '/images/figmaplug_cover.jpg',
      'video-pair::/images/Screen Recording 2026-03-09 at 20.37.53.mov::/images/2.Screen Recording 2026-03-09 at 20.37.53.mov',
      '/images/brand-guidelins/welt_teasers_03.jpg',
    ],
    nextProject: 'upday-news-app-redesign',
    caseStudy: {
      context:
        'I was working on a WELT prototype — a full page of news teasers that needed real content. I\'d done this manually hundreds of times: open the site, find articles, copy them in. Five minutes each, twenty minutes for a page. This time was different: I\'d been building vibe coding skills through the Blatt project, experimenting with Claude, learning how to prototype software. I decided to build the solution instead of doing the task again.',
      researchFindings: [
        'Every designer on the team encountered the same friction daily — populating mockups with real content was a manual process with no shortcut',
        'German character counts, line breaks, and typographic behaviour were unpredictable with placeholder text — designs regularly broke in production',
        'Colleagues validated the problem before the tool existed — I knew this was a shared pain, not a personal one',
        'V1 (website scraping) worked but was fragile and couldn\'t be released externally; V2 (RSS feed) was stable enough to share across the company',
      ],
      keyDecisions: [
        {
          decision: 'Switch from website scraping to RSS feed for v2',
          outcome:
            'Scraping breaks when page structure changes and can\'t be distributed as a shared tool. The RSS feed is stable, publicly accessible, and maintenance-free. This is what made company-wide distribution possible.',
        },
        {
          decision: 'One button. No configuration, no options.',
          outcome:
            'A more complex version would have added content filters, field mapping, and language selection. All of that would have made it slower to use and harder to explain. The constraint — it does one thing — is what made adoption instant.',
        },
        {
          decision: 'Design the aesthetic for delight, not just function',
          outcome:
            'Keygen reference first — playful, a bit transgressive, good energy for a tool that makes something tedious disappear. Later updated to terminal aesthetic for portfolio consistency and to reduce viewport intrusion. An internal tool people enjoy opening gets used more than one they don\'t.',
        },
      ],
      tradeoffs: [
        'Solve it now vs. solve it right — shipped in a day, no architecture planning. It does one thing well. That\'s the correct scope for a problem this focused.',
        'The plugin populates content once, at design time — designs still drift from live content over time. The deeper problem of design-reality sync remains unsolved.',
      ],
      retrospective:
        'This was the first piece of working software I shipped independently on this team. No brief, no stakeholder approval — just a problem I had myself, a solution I could build, and a day to build it. When I showed colleagues, there was no pushback. Just people asking if they could use it. Sometimes that\'s what design is.',
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