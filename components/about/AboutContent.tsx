import Image from 'next/image'
import AnimatedSection from '@/components/shared/AnimatedSection'

const META_FIELDS = [
  { label: 'LOCATION', value: 'Berlin, Germany' },
  { label: 'CURRENTLY', value: 'Product Designer at Axel Springer' },
  { label: 'EDUCATION', value: 'B.Sc. Software Engineering — CODE University, Berlin (2024)' },
  { label: 'SKILLS', value: 'Product Design · Design Systems · Prototyping · Figma · React · TypeScript' },
]

export default function AboutContent() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-section">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16">

        {/* Left: bio */}
        <AnimatedSection variant="fadeInUp">
          <div className="font-sans text-base text-foreground leading-relaxed space-y-5">
            <p>
              I&apos;m a Product Designer based in Berlin, focused on digital products that are both purposeful and refined. My background spans graphic design, UX, and frontend engineering — which means I think about design from concept through implementation.
            </p>
            <p>
              Currently at Axel Springer, I work across WELT and Bild building the Blatt design system and shipping product improvements for millions of readers. Before that, I studied software engineering at CODE University, where I wrote my thesis on design culture at scale.
            </p>
            <p>
              I care about the intersection of rigour and craft — systems that hold together, interfaces that feel considered, and teams that build the right thing.
            </p>
            <a
              href="mailto:eduardobnog@gmail.com"
              className="inline-block font-sans text-base text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Send me an email
            </a>
          </div>
        </AnimatedSection>

        {/* Right: photo + metadata */}
        <AnimatedSection variant="fadeInUp" delay={0.1}>
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
          </div>
        </AnimatedSection>

      </div>
    </div>
  )
}
