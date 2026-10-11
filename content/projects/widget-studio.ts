import type { ProjectContent } from '@/lib/projects'

/*
 * DRAFT — structural scaffold, not final copy.
 *
 * Sections marked [TO CONFIRM] need facts from the brief at
 * scratchpad/widget-studio-brief.md (sections 1, 2, 4, 5, 6, 7).
 * Nothing factual here is invented: every number, quote, and outcome
 * is left as an explicit gap rather than a plausible guess.
 */
export const widgetStudio: ProjectContent = {
  slug: 'widget-studio',
  title: 'Widget Studio',
  category: 'Desktop Tool / AI Agent Design',
  year: '2026',
  role: 'Senior Product Designer — design system packages, desktop UX, agent guardrails',
  team: 'Axel Springer — with the business innovation team and developers',
  timeline: '[TO CONFIRM: start → now]',
  skills: [
    'Desktop Product Design',
    'AI Agent Design',
    'Design Systems',
    'Guardrail & Failure-Mode Design',
    'Editorial Tooling',
  ],
  thumbnail: '/images/projects/widget-studio/thumbnail.jpg',
  heroImage: '/images/projects/widget-studio/hero.jpg',
  tagline: 'A non-technical editor directs an agent. The system keeps it on brand.',
  overview:
    "Newspaper editors want interactive elements inside their articles — and every one of them costs a developer. Widget Studio is a desktop tool that lets an editor build one by directing an AI agent instead. The design work was not the widget builder. It was the constraint surface: what the agent is allowed to produce, what it is prevented from doing, and what happens when an editor asks for something off-brand or impossible.",
  results: [
    'Multi-brand from day one — built on Blatt’s shared semantic token conventions, so onboarding a new brand is integration, not a rebuild.',
    '[TO CONFIRM: time/effort — before → after, on which task]',
    '[TO CONFIRM: widgets built, by how many editors]',
    '[TO CONFIRM: how many shipped without a developer touching them]',
    '[TO CONFIRM: adoption stage — pilot, rollout, or daily use]',
    '[TO CONFIRM: what editor testing produced that can be quantified]',
  ],
  sections: [
    {
      id: 'context',
      title: 'Context',
      subtitle: 'How it reached me',
      body:
        "I was hired at Axel Springer to work on WELT. On the strength of that work the company's CTO started pulling me onto projects with the business innovation team — work outside my original remit, and the reason I went from mid-level to senior in two years. Widget Studio came from that side of the house.\n\n[TO CONFIRM: what the actual ask was, and who framed it — CTO, innovation team, or the newsroom. Was there a brief, or was it \"go find out if this is possible\"? If you redefined what the project was about, that reframe is this section's ending.]",
    },
    {
      id: 'problem',
      title: 'Before',
      subtitle: 'What an interactive element used to cost',
      body:
        "[TO CONFIRM — this is the section the whole case study rests on. Walk the old path step by step: an editor wants an interactive element in an article. Who do they ask? How long do they wait? What does the request queue look like?]\n\n[TO CONFIRM: the wrong diagnosis. What did someone — maybe you — believe the problem was at the start, before talking to editors corrected it? That reframe is the pivot this section needs.]",
      items: [
        '[TO CONFIRM: time data — before → after, on a named task]',
        '[TO CONFIRM: an editor quote from testing or interviews that stuck with you]',
      ],
      image: 'problem.jpg',
    },
    {
      id: 'packages',
      title: 'The constraint surface',
      subtitle: 'Why this was only possible because of Blatt',
      body:
        "Widget Studio is multi-brand because it didn't have to solve multi-brand. Blatt — the cross-brand editorial design system I led — had already established shared semantic token conventions across Axel Springer's brands: identical token names, values resolving per brand. So an agent generating a widget doesn't need to know which newspaper it's writing for. It writes against one vocabulary, and the brand package resolves it.\n\nThat is also the reason the agent can be constrained at all. A design system is usually described as a shortcut for humans. Here it functions as the agent's constraint surface: the set of things it is able to say. Off-brand output isn't caught after generation — it's mostly unreachable, because the tokens the agent can reference are the only design decisions available to it.\n\n[TO CONFIRM: what is actually inside a brand package — tokens, components, templates? What are the concrete steps to onboard a new brand, and how long does it take?]\n\n[TO CONFIRM: the counterfactual. Without Blatt, what would this have cost — or would it have been possible at all? That answer is the proof of the argument above.]",
      image: 'solution.jpg',
    },
    {
      id: 'desktop',
      title: 'The desktop tool',
      subtitle: 'Blank state to published widget',
      body:
        "[TO CONFIRM: the main surfaces of the app — canvas, data panel, preview, publish? How does an editor get from blank state to a published widget, as one continuous path?]\n\n[TO CONFIRM: the hardest layout or state problem you had to solve. This is the section that carries the complex-desktop-product argument, so the more specific the better.]\n\n[TO CONFIRM: what you deliberately left out, and the reason.]",
      imageLayout: 'two-col',
      image: 'feature-01.jpg',
      image2: 'feature-02.jpg',
    },
    {
      id: 'guardrails',
      title: 'Guardrails',
      subtitle: 'Designed failure modes',
      body:
        "The interesting design question in an agent tool isn't what happens when it works. It's what happens when an editor asks for something off-brand, impossible, or subtly wrong — and whether the system refuses, warns, asks, or silently corrects. Those are four different products. Choosing between them per failure type was the bulk of the work, and it was done with the developers who built the CLI.\n\n[TO CONFIRM: what the CLI does, and who runs it — editors or developers. Is it a second door into the same system, or a pipeline stage behind the desktop app?]\n\n[TO CONFIRM: the specific guardrails. What is the agent prevented from doing?]\n\n[TO CONFIRM: the failure story. What did the agent get wrong in an early version that made a guardrail necessary? One concrete incident is worth more than the list of rules.]\n\n[TO CONFIRM: what you had to argue for with the developers, and where you disagreed.]",
      image: 'feature-03.jpg',
    },
    {
      id: 'vocabulary',
      title: 'Steering vocabulary',
      subtitle: 'Skills and commands',
      body:
        "Guardrails define what the agent can't do. Skills and commands define what an editor can ask for — the vocabulary a non-technical person uses to steer a generation toward what they actually meant.\n\n[TO CONFIRM: name a few real skills/commands. What does an editor type or click to invoke one?]\n\n[TO CONFIRM: how the vocabulary was decided. Did editors' own words shape the naming? If so, say which word you took from them and what it replaced.]\n\n[TO CONFIRM: one refinement loop, start to finish — editor asks, agent responds, editor adjusts.]",
      image: 'feature-04.jpg',
    },
    {
      id: 'impact',
      title: 'Impact, and what it doesn’t fix',
      body:
        "[TO CONFIRM: outcomes — time/effort before → after, widgets built, editors using it, how many went live without a developer, adoption stage.]\n\n[TO CONFIRM: the honest part. What still doesn't work? Where does the agent still need a human? What would you do differently, and where did you personally get it wrong? Every other case study on this site ends here — this one should too.]",
    },
  ],
}
