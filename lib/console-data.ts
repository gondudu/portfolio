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
  photo?: string
  clearance: string
  fileRef: string
  missionNotes?: string
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
    'THAT INFORMATION IS NOT AVAILABLE TO YOU.',
    'VALID QUERY PARAMETERS: CREW / WORK / CONTACT / SKILLS',
  ],
  greeting: [
    'MU-TH-UR 6000 ONLINE.',
    'ALL SYSTEMS NOMINAL.',
    'CURRENT MISSION: DISPLAY PORTFOLIO DATA.',
    'HOW MAY I ASSIST?',
  ],
  work: [
    'ACCESSING MISSION LOGS...',
    '4 COMPLETED MISSIONS ON RECORD.',
    'CATEGORIES: MOBILE APP / DESIGN SYSTEM / PLATFORM / INTERNAL TOOL',
    'USE MISSIONS TAB TO ACCESS FULL RECORDS.',
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
  'QUERY PARAMETERS: CREW / WORK / CONTACT / SKILLS',
  'TYPE QUERY TO PROCEED.',
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
    clearance: 'ALPHA',
    fileRef: 'USCSS-NOS-820930-001',
    photo: '/images/brand-guidelins/bio_pic.jpg',
    bio: 'Product Designer based in Berlin. Graphic design background — five years in branding and advertising — before crossing into digital product. That foundation still shapes everything: systematic thinking, communication design, a trained instinct for what type is doing and why. At Axel Springer on a company scholarship, wrote a bachelor\'s thesis on the state of design culture across the organisation — interviewed colleagues, mapped what was broken, was hired to fix it. That thesis became Blatt, a design system now in active migration across WELT and Bild. Led the Upday redesign during the Samsung exit: 70 million users, six months, survival conditions. Builds Figma plugins when the problem is faster solved with code than without it. Brazilian. Eight years in Berlin. Asks for the analytics before opening Figma.',
    missionNotes: 'Specialities: UX Research / Design Systems / AI Interface Design / Cross-functional leadership. Available for new missions — initiate contact via COMM ARRAY.',
  },
  {
    id: 'dallas',
    name: 'DALLAS, A.J.',
    rank: 'MISSION SPECIALIST',
    status: 'DECEASED',
    speciality: 'COMMAND',
    deceased: true,
    clearance: 'N/A — RECORD ARCHIVED',
    fileRef: 'USCSS-NOS-820930-002',
    bio: 'Exemplary service record across fourteen deep-space missions. Certified command qualification, all vessel classes up to and including commercial towing. Authorized emergency protocol override on Zeta II Reticuli survey, 2122. Incident outcome: terminal. Weyland-Yutani extends formal recognition for service rendered.',
    missionNotes: 'File status: CLOSED. Incident report LV-426/2122 sealed per Special Order 937.',
  },
  {
    id: 'ripley',
    name: 'RIPLEY, E.L.',
    rank: 'WARRANT OFFICER',
    status: 'ACTIVE',
    speciality: 'SAFETY OFFICER',
    clearance: 'ALPHA',
    fileRef: 'USCSS-NOS-820930-003',
    bio: 'Warrant Officer, first grade. Safety compliance specialist with full emergency protocol certification. The only crew member to correctly identify the threat vector during the LV-426 incident and attempt enforcement of established quarantine procedures. Her objections were overridden. Outcome noted in file.',
    missionNotes: 'Personnel photo access restricted — Clearance Level A required. Recommend review of emergency override incident report. Survivor status confirmed.',
  },
  {
    id: 'kane',
    name: 'KANE, G.R.',
    rank: 'EXECUTIVE OFFICER',
    status: 'DECEASED',
    speciality: 'SURVEY',
    deceased: true,
    clearance: 'N/A — RECORD ARCHIVED',
    fileRef: 'USCSS-NOS-820930-004',
    bio: 'Twelve-year service record, no prior disciplinary notation. Fatally compromised during routine survey EVA, LV-426, following unauthorized breach of quarantine protocol. Exposure to unclassified biological specimen. Outcome: non-recoverable. Medical data archived under Special Order 937. File sealed pending review.',
    missionNotes: 'Cause of death: classified. Medical examiner report: see Ash, Science Officer. Bonus disbursement: pending estate resolution.',
  },
  {
    id: 'ash',
    name: 'ASH [SYNTHETIC]',
    rank: 'SCIENCE OFFICER',
    status: 'ATTACHED',
    speciality: 'SCIENCE / XENO-BIOLOGY',
    deceased: true,
    clearance: 'SPECIAL ORDER / CLASSIFIED',
    fileRef: 'USCSS-NOS-820930-005',
    bio: 'Hyperdyne Systems 120-A/2 commercial grade. Assigned under Special Order 937 at Weyland-Yutani directive. Role: specimen acquisition and preservation. Secondary role: crew management. All primary objectives fulfilled within acceptable parameters. Unit decommissioned by crew intervention, 2122. Data core retained.',
    missionNotes: 'Note: this personnel file is maintained under standard crew manifest for administrative continuity. Do not flag as anomaly.',
  },
  {
    id: 'lambert',
    name: 'LAMBERT, J.M.',
    rank: 'NAVIGATOR',
    status: 'DECEASED',
    speciality: 'NAVIGATION',
    deceased: true,
    clearance: 'N/A — RECORD ARCHIVED',
    fileRef: 'USCSS-NOS-820930-006',
    bio: 'Navigation specialist, senior grade. Full atmospheric survey qualification. Instrumental in establishing return transit course from LV-426. Confirmed deceased, mass casualty event, 2122. Remains not recovered. Weyland-Yutani notes her contribution to the mission\'s primary objective data collection.',
    missionNotes: 'File status: CLOSED. Navigation logs archived. Next-of-kin notified per standard protocol.',
  },
  {
    id: 'brett',
    name: 'BRETT, S.E.',
    rank: 'ENGINEER',
    status: 'DECEASED',
    speciality: 'ENGINEERING',
    deceased: true,
    clearance: 'N/A — RECORD ARCHIVED',
    fileRef: 'USCSS-NOS-820930-007',
    bio: 'Competent technical rating, no exceptional notation. Maintained engineering systems alongside Chief Engineer Parker across full transit leg. Deceased 2122, circumstances consistent with those of Chief Engineer Parker. File retained for actuarial purposes.',
    missionNotes: 'Bonus claim: see Parker, D. Clause 7.4(c) applies. Weyland-Yutani legal: no further action required.',
  },
  {
    id: 'parker',
    name: 'PARKER, D.',
    rank: 'CHIEF ENGINEER',
    status: 'DECEASED',
    speciality: 'ENGINEERING',
    deceased: true,
    clearance: 'N/A — RECORD ARCHIVED',
    fileRef: 'USCSS-NOS-820930-008',
    bio: 'Engineering certification, Class IV. Maintained Nostromo drive systems across full transit leg with commendable uptime. Vocal objections to Company policy noted in personnel file on three separate occasions — all resolved. Deceased 2122.',
    missionNotes: 'Bonus dispute nullified by estate under clause 7.4(c) of standard crew contract. See also: Brett, S.E. Weyland-Yutani regrets the loss.',
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
