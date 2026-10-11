import type { ProjectContent } from '@/lib/projects'

export const caseFile: ProjectContent = {
  slug: 'case-file',
  title: 'Case File',
  category: 'AI systems / Run solo under pressure',
  year: '2026',
  role: 'Designer, operating as claimant',
  team: 'Solo',
  timeline: 'June – August 2026, ongoing',
  tagline: 'Six parallel proceedings, one source of truth, zero invented facts.',
  skills: [
    'AI-assisted investigation',
    'Evidence systems',
    'Agent design',
    'Information architecture',
    'Trust & safety',
  ],
  thumbnail: '/images/projects/case-file/thumbnail.jpg',
  heroImage: '/images/projects/case-file/hero.jpg',
  overview:
    "A sewage backflow destroyed my flat, and the emergency plumber the landlord told me to call turned out to be an organised fraud that took €6,000 under coercion in a single afternoon. That left me running six proceedings at once — criminal, tax, banking, insurance, tenancy, and a housing search — solo, in my second language, with no legal training. I used AI to run all of it. Not to write persuasive letters, which is what I assumed I'd need. To stop me from asserting a single thing I couldn't prove.",
  results: [
    '6 parallel proceedings run solo over 10 weeks: criminal complaint, tax-fraud report, bank chargeback, contents-insurance claim, landlord liability, and the search for a new home.',
    'Case escalated from a local police precinct to the state criminal investigation office, which requested a specific evidence bundle and received it as one compiled PDF; a photo line-up summons followed.',
    '5 separate corporate identities linked to a single card terminal — the analysis that turned a billing dispute into a fraud case.',
    '752-file evidence archive: 177 damage photos, 35 receipts, 26 numbered exhibits, every claim line traceable to a source.',
    'Damage list corrected downward under audit — 43 items, €3,815.80, with estimates and receipts marked separately.',
    'Insurance denial correctly assessed as unwinnable and repurposed as evidence for the liability claim it originally defeated.',
  ],
  sections: [
    {
      id: 'situation',
      title: 'Situation',
      body: "On 21 June 2026 a sewage pipe failed in my building and backed up into my ground-floor flat. Category 3 water, three to five fingers deep, across every room. Everything at floor level was contaminated — instruments, furniture, clothes, bedding.\n\nThe fire brigade came and left; the water was too shallow for their pump. The property manager didn't handle emergencies. My landlord told me to call an emergency plumbing service myself. The company that arrived operated under a name that appeared on no invoice, sent two large technicians who would not leave until I paid, and took €6,000 in two card transactions I hadn't agreed to split.\n\nBy that evening I had no habitable home, no €6,000, and a contaminated pile of everything I owned. Within four days that had become six separate proceedings, each with its own authority, deadline, evidentiary standard, and language I don't natively speak.",
    },
    {
      id: 'assumption',
      title: 'Act 1 — The wrong job',
      subtitle: 'I thought I needed a writer',
      body: "My first instinct was that AI's value here was language. I'm Brazilian; these letters go to German insurers, German police, a German tax office. Formal German legal register is not something I can produce under stress. So I used it as a drafting tool, and it was good at that.\n\nThen I audited the damage list, and it had drifted.\n\nAcross versions, items had crept upward on estimates I couldn't back. A waste bin sat at €17.99 from memory; the actual invoice showed €6.99. A bed was listed at a price the private-sale receipt contradicted. Some items were double-counted between the write-off list and the storage claim. When I forced every line to resolve to a receipt or an explicit estimate, **the total went down** — from €3,892 to €3,788, and finally to €3,815.80 once genuinely receipted items were added back.\n\nThat number moving downward was the whole project turning over. I was accidentally inflating a claim I was going to hand to police, a tax office, and an insurer — while my entire position depended on being the credible party in a dispute with people who forge documents for a living. One unprovable line in that spreadsheet and I become the one with the questionable paperwork.\n\nThe job was never persuasion. It was refusing to let me claim anything I couldn't source.",
      items: [
        'Damage list revised across 4 versions; total decreased under audit before settling at 43 items / €3,815.80.',
        'Corrections found: estimates contradicted by receipts, one item understated, several double-counted against the storage claim.',
        'Every proceeding shared the same underlying facts — so a single unsourced number would surface in five places at once.',
      ],
    },
    {
      id: 'provenance',
      title: 'Act 2 — Designing so fabrication can’t happen',
      subtitle: 'Provenance as an interface',
      body: "A hallucination in a normal project is a bug. In a criminal complaint it is a false statement to police, made by me, under my name. So I built the archive so that unsourced claims are structurally visible rather than dependent on anyone noticing.\n\n**Every line carries its provenance.** The damage list marks each item `√` receipt on file, `X` none, or `!` partial — and any replacement value that is an estimate rather than a receipted price carries an asterisk. You cannot read a row without also reading how much to trust it. Nothing is asserted flatly.\n\n**Unknown beats plausible.** The standing instruction was that a missing value gets written `Unknown` or `TBD`, never a reasonable-sounding guess. A washing machine sat unvalued for weeks rather than get a number I'd have to defend.\n\n**One source of truth, with a cross-check rule.** The master case file and the itemised damage list must agree, and the totals get reconciled before either is quoted in an outgoing document. Exports — the PDF catalogue, the CSV, the German claim text — are regenerated from the source by script, never hand-edited, because two hand-edited copies of a number is how the number becomes two numbers.\n\n**Exhibits are immutable.** Evidence is numbered `00`–`11` in the order the police filing attaches them, and that numbering is load-bearing — it's how an investigator navigates the bundle. Files in there don't get cropped, cleaned up, or renamed. Reference numbers get quoted character-exact, never paraphrased or rounded.\n\nThe alternative was the obvious one: keep everything in a chat and ask for a letter when I needed one. That fails the moment the same fact has to appear in five documents for five authorities with five different standards — which was week one.",
    },
    {
      id: 'analysis',
      title: 'Five names, one terminal',
      subtitle: 'The finding that changed the charge',
      body: "For the first days I had a bad invoice and a strong feeling. A bad invoice is a civil billing dispute. Police don't pursue those.\n\nWhat turned it was cross-referencing documents that had no obvious reason to be read together — the website, its legal imprint, the invoice header, the email the invoice actually arrived from, and the bank's record of who received the money. Five different corporate and personal identities, in three different cities. All five paid into **one card terminal**.\n\nThat's not a messy small business. That's a structure. Around it, the same cross-reference produced the rest: an imprint declaring no VAT number while the invoice charged 19% VAT; a director's name on the website that didn't match the one on the invoice; the invoice sent from a free personal Gmail account; a call-out fee charged twice under two labels; a legitimate firm in another city publishing a public fraud warning describing this exact scheme. And the detail I'd never have caught alone — the phone number on the website changed the same day, within hours of my payment, before I could call back. Premeditated exit, still running, still taking calls.\n\nAI didn't find those facts. Every one was already in a document I possessed. It made it possible to hold thirty documents in view at once and notice what only shows up between them — which is exactly the work I was too exhausted and too frightened to do on 21 June.\n\nThe file went to a local precinct. It ended up with the state criminal investigation office, which asked for a specific set of documents, received one compiled bundle with a cover sheet and an index, and followed up with a photo line-up summons. That escalation is the outcome I'm proudest of, and it's entirely a function of the bundle being legible.",
    },
    {
      id: 'fold',
      title: 'Knowing which fight to lose',
      body: "The contents insurer denied the claim: the loss was backflow, backflow needs a separate elemental-damage module, and I didn't have that module. My instinct was to appeal — it was €3,800 and I felt robbed twice.\n\nReading the actual policy conditions against the denial letter said the denial was substantively correct. Not unfair, not a fobbing-off. Correct. An appeal would have consumed weeks I did not have while changing nothing.\n\nSo the claim was abandoned, and the denial letter was re-read as an asset. To deny me, the insurer had to formally classify the cause as **building-side backflow** — in writing, on letterhead. That is precisely the finding required to pursue the landlord under §536a BGB for a defective building. The document that killed one route is the strongest exhibit for the route that replaced it.\n\nThree weeks later the flat flooded again, after heavy rain, with nothing repaired in between. A one-off blockage doesn't recur; a rain-triggered backflow is the signature of a missing or defective backflow valve, which the building code requires for fixtures below the backflow level. The recurrence turned a plausible liability theory into a documented one.",
    },
    {
      id: 'agent',
      title: 'The seventh proceeding',
      subtitle: 'And the one that nearly cost me my identity',
      body: "Underneath all of it I still had to find somewhere to live, in a market with roughly two thousand applicants per decent listing.\n\nI'd been doing it by hand, fast, because speed is how you win in Berlin. That's how — nine days after the flood — I sent a stranger my income statements, my rent-arrears clearance certificate and my identity documents within minutes of a listing appearing. The listing was pulled by the platform days later. It became a second police report.\n\nSo the flat search became an agent, and the lesson from the fraud went in first. **Speed was the attack surface, not the product.** I wrote the prohibitions before the capabilities: never attach a document, never open an external link, never let a request for paperwork-before-viewing pass unflagged.\n\nOver six days it triaged 278 listings — 272 eliminated by hard rule, 6 escalated to me as genuine judgment calls — and sent 29 applications. It caught five scam attempts. It refused one prompt injection embedded in a listing description, where the advertiser had hidden an instruction telling the reader to include a specific word in their application: harmless as a human screening trick, and an instruction arriving through a data channel as far as the agent was concerned. It skipped the listing rather than comply, then kept analysing it and flagged the €4,500 upfront 'furniture buyout' the instruction had distracted from.\n\nWhen a verified corporate landlord replied with a link to its own applicant portal, the agent's reasoning was correct and generous — real company, personalised message, no payment requested — and it still didn't click. It handed me the link and the analysis. Letting it judge link safety case by case fails the first time its judgment is good but wrong.\n\nIt found the flat I signed.",
    },
    {
      id: 'impact',
      title: 'What it fixed, and what it didn’t',
      subtitle: 'The limits are the honest part',
      body: "Ten weeks. Six proceedings plus a housing search, none dropped. A criminal case that climbed from a precinct desk to the state criminal investigation office with a photo line-up pending. A 752-file archive where every claimed euro resolves to a receipt or a marked estimate. A signed lease on a flat above the ground floor.\n\nWhat it did not fix: the €6,000 is still gone. The chargeback is unresolved. The insurance claim stayed denied. The landlord claim is drafted, not won. Nobody has been charged.\n\nAnd it changed nothing about the afternoon that started it. Two men were standing in my flooded flat refusing to leave until I paid, and there is no system, no archive, and no agent that helps with that. Every capable thing in this project happened afterwards, in the reconstruction — which is worth being precise about, because the story people want from AI is the rescue, and this wasn't one. It was the cleanup, done well enough that the cleanup became evidence.\n\nThe transferable part isn't the letters it drafted. It's that the design problem in a high-stakes AI system is almost never capability. It's constraint: deciding what the system is forbidden to do, what it must hand back to a human, and how it proves where every claim came from — and deciding all of that *before* the first run, because I now have direct evidence of what it costs to add a rule late. Five of my early applications went out naming my employer and my exact monthly income before I'd written the privacy rule. The agent flagged its own prior non-compliance on a later run and correctly reported it could not be retracted. Prohibitions are cheap before the first run and impossible after it.",
    },
  ],
}
