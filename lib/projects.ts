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
    overview: 'Leading the complete redesign of Upday, a European news platform serving millions of users. After the Samsung partnership ended, we transformed the app to meet modern standards, expand the user base, and unlock new monetization opportunities while migrating existing users to a standalone experience.',
    challenge: 'The post-partnership transition required modernizing the entire experience, improving information architecture, and rebuilding trust around the Upday brand. Through user reviews, interviews, and direct feedback, three critical needs emerged: users wanted fresher content, a simpler experience, and quicker updates. The challenge was migrating a large established user base while addressing these fundamental needs.',
    solution: 'I designed a modular, future-proof system on Flutter with Material Design components, guided by two core principles: speed and discovery. The redesign brought back meaningful features while expanding AI capabilities for content curation and personalization. Working with the research team, I defined three user personas to guide decisions: the News Seeker (quick, reliable updates), the Explorer (diverse perspectives), and the Passive Reader (AI-generated summaries). This persona-driven approach enabled faster development cycles, improved personalization, and a cleaner interface.',
    results: [
      '10% increase in user retention',
      '20% increase in time spent in app',
      'Higher satisfaction with content freshness',
      'Improved overall usability scores',
      'Scalable foundation for AI-driven features',
      'Successful migration of existing user base',
    ],
    images: [
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    ],
    nextProject: 'media-player-sdk-axel-springer',
  },
  {
    slug: 'media-player-sdk-axel-springer',
    title: 'Media Player SDK',
    category: 'Design System / B2B Product',
    year: '2024',
    role: 'Lead Product Designer',
    thumbnail: '/images/bhxnu-s2HHseW10Pc-unsplash.jpg',
    heroImage: '/images/bhxnu-s2HHseW10Pc-unsplash.jpg',
    overview: 'Designed a unified audio and video SDK for Axel Springer\'s major publishers WELT and Bild. The system enables seamless media playback across products while maintaining flexibility for individual brand expression, styling, and monetization strategies. It provides an out-of-the-box solution that reduces development effort across the digital portfolio.',
    challenge: 'The core challenge was designing a single player capable of adapting to multiple products with distinct brand identities (from hard news to lifestyle content) without compromising performance or user experience. It needed to handle video, audio, and complex advertising logic within one flexible system, while meeting the needs of editorial teams, ad-tech stakeholders, and maintaining strong accessibility standards across device contexts.',
    solution: 'I designed a modular, highly customizable system where core components (play controls, progress bars, ad markers) were standardized for consistency, while flexible styling layers allowed each brand to apply its unique visual identity. The system included built-in support for ads and analytics, with clear token structures and component APIs that simplified integration. Working closely with developers, I ensured aligned behavior, smooth animations, and optimal performance across platforms.',
    results: [
      'Successfully implemented in 2 major products (WELT & Bild iOS apps)',
      '8% improvement in media retention',
      '15% increase in audio consumption',
      '6-month development cycle for dual implementation',
      'Accelerated time to market in corporate environment',
      'Scalable foundation for future Axel Springer products',
    ],
    images: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop',
    ],
    nextProject: 'nmt-product-suite-design-system',
  },
  {
    slug: 'nmt-product-suite-design-system',
    title: 'NMT Product Suite',
    category: 'Design System / Organizational Transformation',
    year: '2024–2026',
    role: 'Product Designer',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1600&h=900&fit=crop',
    overview: 'Helped build a unified design system supporting all digital products within Axel Springer, both B2B and B2C. This project was as much about cultural transformation as technical architecture: building design maturity in an organization that historically lacked strong design culture, finding allies across business units, and convincing management of the strategic value of systematic design.',
    challenge: 'Beyond the technical complexity of unifying a scattered infrastructure across diverse products, the deeper challenge was organizational. Axel Springer\'s decentralized structure and limited design tradition meant we had to build consensus across skeptical stakeholders, demonstrate ROI to management, and establish design as a strategic function. The system needed to work across internal tools and consumer apps, multiple brands and tech stacks, providing structure without stifling innovation.',
    solution: 'I led internal audits and stakeholder interviews to identify recurring usability issues, inconsistent patterns, and redundant efforts. Working with a core team, we built a coalition of allies and demonstrated value through pilot implementations. I designed the system architecture, layering brand-neutral primitives (colors, typography, spacing) with semantic components (buttons, forms, cards) that teams could customize. Design tokens ensured cross-platform consistency and seamless design-to-dev handoff. We established governance models, comprehensive documentation, and onboarding programs to drive adoption. The result was a Figma-and-code-integrated system with clear usage guidelines and an accessible, adaptable visual language.',
    results: [
      'Successfully adopted by 8 teams across the organization',
      'Significantly reduced time to development',
      'Eliminated design debt and redundant work',
      'Enabled leaner, more scalable implementations',
      'Accelerated feature shipping velocity',
      'Design tokens optimized for LLM integration via MCP',
      'Established design as a strategic function within Axel Springer',
    ],
    images: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&h=800&fit=crop',
    ],
    nextProject: 'figma-content-plugin',
  },
  {
    slug: 'figma-content-plugin',
    title: 'Figma Content Plugin',
    category: 'Internal Tool / Side Project',
    year: '2026',
    role: 'Designer + Developer',
    thumbnail: '/images/figmaplug_cover.jpg',
    heroImage: '/images/figmaplug_cover.jpg',
    overview: 'Built a Figma plugin in one day that lets designers inject real content from company publications directly into their designs. What started as a simple productivity hack became a game-changer for our multilingual team, especially for those unfamiliar with German translations. Sometimes the best design just solves a clear problem.',
    challenge: 'Our design team was constantly hunting for real German content to use in templates and mockups. For a multilingual team, this created friction. Designers would use placeholder text, breaking the authenticity of the work. Creating realistic templates was painfully slow. We needed real content, fast.',
    solution: 'I coded a Figma plugin with Claude that pulls actual publication content directly into designs. Inspired by the nostalgic aesthetic of early 2000s software keygens, I gave it a playful, un-corporate visual style. The interface is simple: select your text layer, hit a button, get real content. No more lorem ipsum, no more guessing at German character counts.',
    results: [
      '10x faster template creation',
      'Real content in designs, every time',
      'Eliminated translation guesswork for multilingual team',
      'Built and shipped in 1 day',
      'Nostalgic keygen aesthetic made colleagues happy',
      'Proved that the best design solves clear problems',
    ],
    images: [
      'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop',
    ],
    nextProject: 'personify-ai-companion',
  },
  {
    slug: 'personify-ai-companion',
    title: 'Personify',
    category: 'Concept / AI Interface',
    year: '2025',
    role: 'Principal Designer',
    thumbnail: '/images/personify_cover.jpg',
    heroImage: '/images/personify_cover.jpg',
    overview: 'Personify began as an experimental interface exploring human–AI collaboration and creative reasoning. Over time, the project evolved into Personify, a conceptual avatar companion app designed to make digital intelligence feel personal, emotional, and embodied. The goal was to reimagine how people interact with AI—not as a chat window or command interface, but as a living digital presence that learns, adapts, and expresses personality.',
    challenge: 'Despite rapid advances in conversational AI, most interactions remain disembodied and transactional. As a product designer, I wanted to explore: How might AI take on a visual and emotional identity that users can connect with? What does it mean to design for trust, empathy, and continuity in long-term AI companionship? How can we give users a sense of agency and co-authorship in shaping their AI\'s personality?',
    solution: 'The design process for Personify focused on giving AI a relatable emotional presence. Research into existing companions revealed that most felt impersonal, inspiring the creation of a modular avatar system that visually and behaviorally adapts to user interactions. By combining expressive motion design with a transparent view of the AI\'s learning process, the product transformed abstract intelligence into something tangible and empathetic. User testing confirmed that this sense of embodiment deepened trust and emotional engagement, showing how thoughtful design can humanize digital companions. Designing for AI requires balancing agency and predictability—users want both mystery and control.',
    results: [
      'Led to the release of Cosma app, Axel Springer\'s first AI companion trial',
      'Created strategic vision for company ventures in AI companion space',
      'Helped teams understand AI conversations from technical perspective',
      'Established foundation for future AI companion product development',
      'Ongoing exploration and optimization in progress',
    ],
    images: [
      '/images/personify_cover.jpg',
    ],
    nextProject: 'upday-news-app-redesign',
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
