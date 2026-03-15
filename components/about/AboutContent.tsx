import Image from 'next/image'
import AnimatedSection from '@/components/shared/AnimatedSection'

const META_FIELDS = [
  { label: 'LOCATION', value: 'Berlin, Germany' },
  { label: 'CURRENTLY', value: 'Product Designer at Axel Springer' },
  { label: 'EDUCATION', value: 'B.Sc. Interaction Design — CODE University, Berlin (2024)' },
]

const SKILLS = ['Digital Product Design', 'UI/UX', 'Design Systems', 'Prototyping', 'Figma', 'Service Design']

export default function AboutContent() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-section">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16">

        {/* Photo + metadata — mobile: first, desktop: second column */}
        <AnimatedSection variant="fadeInUp" delay={0.1} className="md:order-2">
          <div className="relative w-full aspect-[4/5] mb-8 overflow-hidden">
            <Image
              src="/images/bio_pic.jpg"
              alt="Eduardo Nogueira"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
          <div className="space-y-6 pt-2 md:pt-0">
            {META_FIELDS.map((field) => (
              <div key={field.label}>
                <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-1">
                  {field.label}
                </p>
                <p className="font-sans text-xs text-foreground leading-snug">
                  {field.value}
                </p>
              </div>
            ))}
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-2">
                SKILLS
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      color: '#1a1a1a',
                      fontSize: '13px',
                      backgroundColor: '#ffb731',
                      padding: '3px 10px',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-jost)',
                      fontWeight: 700,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Bio — mobile: second, desktop: first column */}
        <AnimatedSection variant="fadeInUp" className="md:order-1">
          <div className="font-sans text-base text-foreground leading-relaxed space-y-5">
            <p>
              Brazilian product designer based in Berlin. Five years at Axel Springer, where I&apos;ve led design systems, redesigned consumer products, and built the kind of shared infrastructure that makes teams stop reinventing and start building.
            </p>
            <p>
              I came from graphic design, which still shapes how I think about design and branding. I like to question structures that don&apos;t serve people — and then build what should replace them.
            </p>
            <p>
              Currently interested in where AI actually helps users and where it&apos;s just an expensive gamble. Outside of work, I climb, play music, and collect records.
            </p>
            <div className="flex gap-6">
              <a
                href="mailto:eduardobnog@gmail.com"
                className="inline-block font-sans text-base text-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                Get in touch
              </a>
              <a
                href="/images/eduardo_nogueira_cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-sans text-base text-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                Download CV
              </a>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  )
}
