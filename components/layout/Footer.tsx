export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0a0a] text-gray-400 py-4 md:py-4 border-t border-gray-800">
      <div className="px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-xs text-gray-400">
              © {currentYear} Eduardo Nogueira. All rights reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
