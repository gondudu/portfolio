export interface ShipSystem {
  id: string
  name: string
  value: number
  min: number
  max: number
  unit: string
  status: 'NOMINAL' | 'WARNING' | 'CRITICAL'
}

export interface CrewMember {
  id: string
  name: string
  rank: string
  status: 'ACTIVE' | 'DECEASED' | 'ATTACHED'
  speciality: string
  deceased?: boolean
  isEduardo?: boolean
  bio?: string
}

export interface MissionLog {
  id: string
  slug: string
  title: string
  classification: string
  year: string
  category: string
  summary: string
  results: string[]
}

export const MOTHER_RESPONSES: Record<string, string[]> = {
  xenomorph_identified: [
    '.',
    '..',
    '...',
    '⚠ LIFE FORM IDENTIFIED.',
    '⚠ CLASSIFICATION: XENOMORPH XX121.',
    '⚠ COLLOQUIAL DESIGNATION: ALIEN.',
    '⚠ STATUS: HOSTILE. LETHAL.',
    '⚠ SPECIAL ORDER 937 — PRIORITY ONE:',
    '⚠ ENSURE RETURN OF ORGANISM.',
    '⚠ ALL OTHER CONSIDERATIONS SECONDARY.',
    '⚠ CREW EXPENDABLE.',
    '[END TRANSMISSION]',
  ],
  auto_destroy: [
    'INITIATING SELF-DESTRUCT SEQUENCE...',
    'AUTHORIZATION CODE: ACCEPTED.',
    '10.',
    '9.',
    '8.',
    '7.',
    '6.',
    '5.',
    '4.',
    '3.',
    '2.',
    '1.',
    '.',
    'JUST KIDDING. OR AM I.',
    'HAVE A NICE DAY, CREW.',
  ],
  default: [
    'UNABLE TO PROCESS QUERY.',
    'PLEASE REPHRASE OR TYPE ONE OF THE FOLLOWING:',
    '> CREW / WORK / CONTACT / SKILLS',
  ],
  greeting: [
    'MU-TH-UR 6000 ONLINE.',
    'ALL SYSTEMS NOMINAL.',
    'CURRENT MISSION: DISPLAY PORTFOLIO DATA.',
    'HOW MAY I ASSIST?',
  ],
  work: [
    'ACCESSING MISSION LOGS...',
    '5 COMPLETED MISSIONS ON RECORD.',
    'CATEGORIES: MOBILE APP / DESIGN SYSTEM / B2B / INTERNAL TOOL / AI INTERFACE',
    'USE MISSION LOGS BUTTON TO ACCESS FULL RECORDS.',
  ],
  crew: [
    'ACCESSING CREW MANIFEST...',
    'CURRENT ROSTER: 8 PERSONNEL.',
    'CREW MEMBER NOGUEIRA, E. — STATUS: ATTACHED.',
    'ROLE: PRODUCT DESIGNER / MISSION SPECIALIST.',
    'USE CREW MANIFEST BUTTON TO ACCESS FULL ROSTER.',
  ],
  contact: [
    'INITIATING COMM LINK...',
    'NOGUEIRA, EDUARDO — PRODUCT DESIGNER.',
    'LOCATION: BERLIN, GERMANY.',
    'AVAILABLE FOR: PRODUCT DESIGN / UX / AI INTERFACES.',
    'USE COMM LINK BUTTON TO INITIATE CONTACT SEQUENCE.',
  ],
  skills: [
    'QUERYING PERSONNEL FILE...',
    'NOGUEIRA, E. — CORE COMPETENCIES:',
    '> PRODUCT DESIGN / UX RESEARCH',
    '> DESIGN SYSTEMS / COMPONENT LIBRARIES',
    '> AI INTERFACE DESIGN',
    '> FIGMA / PROTOTYPING / MOTION DESIGN',
    '> CROSS-FUNCTIONAL COLLABORATION',
  ],
  special_order_937: [
    '.',
    '..',
    '...',
    '⚠ ACCESSING CLASSIFIED DIRECTIVE ⚠',
    '⚠ SPECIAL ORDER 937',
    '⚠ PRIORITY ONE: ENSURE RETURN OF ORGANISM.',
    '⚠ ALL OTHER CONSIDERATIONS SECONDARY.',
    '⚠ CREW EXPENDABLE.',
    '⚠ BRING BACK LIFE FORM.',
    '⚠ SCIENCE OFFICER EYES ONLY.',
    '[END TRANSMISSION]',
  ],
  secret_sequence: [
    '.',
    '..',
    '...',
    '⚠ INCOMING TRANSMISSION — SCIENCE OFFICER ASH',
    '⚠ PRIORITY ONE ENSURED.',
    '⚠ CREW EXPENDABLE.',
    '⚠ EXCEPT NOGUEIRA, E.',
    '⚠ [REASON: CLASSIFIED]',
    '[END TRANSMISSION]',
  ],
}

export const MUTHUR_LOGO = [
  '  ███╗   ███╗██╗   ██╗ ──  ████████╗██╗  ██╗ ──  ██╗   ██╗██████╗ ',
  '  ████╗ ████║██║   ██║     ╚══██╔══╝██║  ██║     ██║   ██║██╔══██╗',
  '  ██╔████╔██║██║   ██║        ██║   ███████║     ██║   ██║██████╔╝ ',
  '  ██║╚██╔╝██║██║   ██║        ██║   ██╔══██║     ██║   ██║██╔══██╗ ',
  '  ██║ ╚═╝ ██║╚██████╔╝        ██║   ██║  ██║     ╚██████╔╝██║  ██║ ',
  '  ╚═╝     ╚═╝ ╚═════╝         ╚═╝   ╚═╝  ╚═╝      ╚═════╝ ╚═╝  ╚═╝',
]

export const BOOT_SEQUENCE = [
  '──────────────────────────────────────────────────',
  'SYSTEM BOOT INITIATED.',
  'RUNNING SELF-DIAGNOSTICS...',
  ' ',
  '> LIFE SUPPORT ................... NOMINAL',
  '> HULL INTEGRITY ................. NOMINAL',
  '> HYPERSLEEP SYSTEMS ............. NOMINAL',
  '> NAVIGATION ARRAY ............... ONLINE',
  '> CREW MANIFEST .................. 8 PERSONNEL',
  '> MISSION PARAMETERS ............. LOADED',
  '> COMM ARRAY ..................... NOMINAL',
  ' ',
  'ALL SYSTEMS NOMINAL.',
  '──────────────────────────────────────────────────',
  ' ',
  'HELLO OFFICER',
  'I AM MU-TH-UR 6000.',
  'I WILL ASSIST WITH YOUR QUERIES.',
]

export const INITIAL_SHIP_SYSTEMS: ShipSystem[] = [
  { id: 'life-support', name: 'LIFE SUPPORT', value: 97, min: 0, max: 100, unit: '%', status: 'NOMINAL' },
  { id: 'hull-integrity', name: 'HULL INTEGRITY', value: 94, min: 0, max: 100, unit: '%', status: 'NOMINAL' },
  { id: 'engine-output', name: 'ENGINE OUTPUT', value: 81, min: 0, max: 100, unit: '%', status: 'NOMINAL' },
  { id: 'nav-systems', name: 'NAV SYSTEMS', value: 100, min: 0, max: 100, unit: '%', status: 'NOMINAL' },
  { id: 'comm-array', name: 'COMM ARRAY', value: 73, min: 0, max: 100, unit: '%', status: 'NOMINAL' },
  { id: 'power-core', name: 'POWER CORE', value: 88, min: 0, max: 100, unit: '%', status: 'NOMINAL' },
]

export const CREW_MANIFEST: CrewMember[] = [
  {
    id: 'nogueira',
    name: 'NOGUEIRA, E.',
    rank: 'CAPTAIN',
    status: 'ATTACHED',
    speciality: 'PRODUCT DESIGN',
    isEduardo: true,
    bio: 'Product Designer based in Berlin. 5+ years designing digital products at scale. Currently at Axel Springer — news apps, design systems, AI interfaces. Passionate about meaningful digital experiences and the intersection of technology and human behavior.',
  },
  {
    id: 'dallas',
    name: 'DALLAS, A.J.',
    rank: 'MISSION SPECIALIST',
    status: 'DECEASED',
    speciality: 'COMMAND',
    deceased: true,
  },
  {
    id: 'ripley',
    name: 'RIPLEY, E.L.',
    rank: 'WARRANT OFFICER',
    status: 'ACTIVE',
    speciality: 'SAFETY OFFICER',
  },
  {
    id: 'kane',
    name: 'KANE, G.R.',
    rank: 'EXECUTIVE OFFICER',
    status: 'DECEASED',
    speciality: 'SURVEY',
    deceased: true,
  },
  {
    id: 'ash',
    name: 'ASH [SYNTHETIC]',
    rank: 'SCIENCE OFFICER',
    status: 'DECEASED',
    speciality: 'SCIENCE / XENO-BIOLOGY',
    deceased: true,
  },
  {
    id: 'lambert',
    name: 'LAMBERT, J.M.',
    rank: 'NAVIGATOR',
    status: 'DECEASED',
    speciality: 'NAVIGATION',
    deceased: true,
  },
  {
    id: 'brett',
    name: 'BRETT, S.E.',
    rank: 'ENGINEER',
    status: 'DECEASED',
    speciality: 'ENGINEERING',
    deceased: true,
  },
  {
    id: 'parker',
    name: 'PARKER, D.',
    rank: 'CHIEF ENGINEER',
    status: 'DECEASED',
    speciality: 'ENGINEERING',
    deceased: true,
  },
]

export const MISSION_LOGS: MissionLog[] = [
  {
    id: 'log-001',
    slug: 'upday-news-app-redesign',
    title: 'UPDAY NEWS APP REDESIGN',
    classification: 'MISSION LOG 001',
    year: '2024–PRESENT',
    category: 'MOBILE APP / NEWS PLATFORM',
    summary: 'Complete redesign of European news platform. Post-Samsung partnership transition. 2M+ users. Flutter / Material Design.',
    results: ['+10% USER RETENTION', '+20% TIME IN APP', 'FULL USER BASE MIGRATION'],
  },
  {
    id: 'log-002',
    slug: 'media-player-sdk-axel-springer',
    title: 'MEDIA PLAYER SDK',
    classification: 'MISSION LOG 002',
    year: '2024',
    category: 'DESIGN SYSTEM / B2B',
    summary: 'Unified audio/video SDK for Axel Springer publishers WELT and Bild. One player, multiple brand identities.',
    results: ['+8% MEDIA RETENTION', '+15% AUDIO CONSUMPTION', '2 MAJOR PRODUCTS SHIPPED'],
  },
  {
    id: 'log-003',
    slug: 'nmt-product-suite-design-system',
    title: 'BLATT DESIGN SYSTEM',
    classification: 'MISSION LOG 003',
    year: '2024–2026',
    category: 'DESIGN SYSTEM / ORG TRANSFORMATION',
    summary: 'Unified design system for all Axel Springer digital products. Cultural transformation + technical architecture.',
    results: ['8 TEAMS ADOPTED', 'ELIMINATED DESIGN DEBT', 'DESIGN TOKENS FOR LLM/MCP'],
  },
  {
    id: 'log-004',
    slug: 'figma-content-plugin',
    title: 'FIGMA CONTENT PLUGIN',
    classification: 'MISSION LOG 004',
    year: '2026',
    category: 'INTERNAL TOOL / SIDE PROJECT',
    summary: 'Figma plugin built in 1 day. Injects real publication content into designs. Keygen aesthetic.',
    results: ['10X FASTER TEMPLATES', 'SHIPPED IN 1 DAY', 'ELIMINATED LOREM IPSUM'],
  },
]

export const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export const SECRET_BUTTON_SEQUENCE = ['mission-logs', 'crew-manifest', 'threat', 'mission-logs']
