import Link from 'next/link'

export const metadata = {
  title: 'Rhythmus 21 — Sound design | Eduardo Nogueira',
  description: 'Reimagined soundtrack for the Hans Richter classic.',
}

export default function Rhythmus21Page() {
  return (
    <article className="page-x max-w-page mx-auto py-section-md">
      <header className="grid-12 mb-section-md">
        <div className="col-span-12">
          <Link
            href="/"
            className="text-label uppercase text-muted hover:text-ink transition-colors duration-200 ease-swiss"
          >
            ← Work
          </Link>
        </div>
        <h1 className="col-span-12 md:col-span-8 text-display text-ink text-balance mt-6">
          Rhythmus 21 — Sound design
        </h1>
        <p className="col-span-12 md:col-span-4 md:col-start-9 text-body text-muted mt-6 md:mt-8">
          A reimagined soundtrack for Hans Richter&apos;s 1921 abstract film.
        </p>
      </header>

      <video controls className="w-full block bg-black">
        <source src="/images/projects/project-06/rythmus.mp4" type="video/mp4" />
      </video>
    </article>
  )
}
