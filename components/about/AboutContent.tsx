import Image from 'next/image'
import AnimatedSection from '@/components/shared/AnimatedSection'

const META = [
  { label: 'Location', value: 'Berlin, Germany' },
  { label: 'Currently', value: 'Senior Product Designer at Axel Springer' },
  { label: 'Education', value: 'B.Sc. Interaction Design — CODE University, Berlin (2024)' },
  {
    label: 'Skills',
    value: 'Design systems · Platform architecture · UI/UX · Prototyping · Figma · Service design',
  },
]

const LINKS = [
  { href: 'mailto:eduardobnog@gmail.com', label: 'Get in touch', a11y: 'Email Eduardo Nogueira' },
  {
    href: '/images/eduardo_nogueira_cv.pdf',
    label: 'Download CV',
    external: true,
    a11y: 'Download CV (PDF, opens in a new tab)',
  },
]

export default function AboutContent() {
  return (
    <div className="page-x max-w-page mx-auto py-section-md">
      <AnimatedSection variant="fadeIn">
        <h1 className="text-display text-ink text-balance max-w-[16ch] mb-section-md">
          Eduardo Nogueira
        </h1>
      </AnimatedSection>

      <div className="grid-12 gap-y-section-md">
        {/* ── Bio ───────────────────────────────────────────────── */}
        <AnimatedSection variant="fadeInUp" className="col-span-12 md:col-span-6 order-2 md:order-1">
          <div className="rule-t pt-6 flex flex-col gap-5 max-w-measure">
            <p className="text-lead text-ink">
              Brazilian product designer based in Berlin. I was hired at Axel Springer to work on
              WELT — one brand, one product. Five years on, the work spans design systems, internal
              tooling, and consumer redesigns across the company, because the CTO kept pulling me
              into problems outside my remit. Mid-level to senior in two years — the promotion
              followed the scope, not the other way around.
            </p>
            <p className="text-body text-ink">
              I came from graphic design, which still shapes how I think about structure and
              typography. I like to question systems that don&apos;t serve people — and then build
              what should replace them. Increasingly that means writing the software myself: two of
              the projects here are tools I designed and shipped.
            </p>
            <p className="text-body text-ink">
              Currently interested in where AI actually helps people work and where it&apos;s just an
              expensive guess. Outside of work, I climb, play music, and collect records.
            </p>

            <div className="flex gap-8 mt-3">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.a11y}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-body text-accent underline underline-offset-4 hover:text-ink transition-colors duration-200 ease-swiss"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ── Portrait + metadata ───────────────────────────────── */}
        <AnimatedSection
          variant="fadeInUp"
          delay={0.06}
          className="col-span-12 md:col-span-4 md:col-start-9 order-1 md:order-2"
        >
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#1C1C1A]">
            <Image
              src="/images/bio_pic.jpg"
              alt="Eduardo Nogueira"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>

          <dl className="rule-t mt-6">
            {META.map(({ label, value }) => (
              <div key={label} className="rule-b py-3">
                <dt className="text-label uppercase text-muted">{label}</dt>
                <dd className="text-small text-ink mt-1">{value}</dd>
              </div>
            ))}
          </dl>
        </AnimatedSection>
      </div>
    </div>
  )
}
