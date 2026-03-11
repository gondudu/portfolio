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
