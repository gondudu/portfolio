import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="page-x max-w-page mx-auto py-section">
      <div className="grid-12">
        <div className="col-span-12 md:col-span-7 rule-t pt-6">
          <p className="text-label uppercase text-muted">Error 404</p>
          <h1 className="text-display text-ink mt-6">Page not found</h1>
          <p className="text-body text-muted mt-6 max-w-measure">
            This page doesn&apos;t exist, or it moved. The work is all still here.
          </p>
          <Link
            href="/"
            className="inline-block text-body text-accent underline underline-offset-4 mt-8"
          >
            View all projects
          </Link>
        </div>
      </div>
    </div>
  )
}
