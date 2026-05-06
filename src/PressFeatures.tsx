interface PressFeaturesProps {
  lang: 'es' | 'en'
}

/**
 * Hero "As featured in" press attribution.
 *
 * Uses official brand SVG logos served from /public/press-logos/. CSS filter
 * (brightness(0) invert) renders them as pure foreground tone so they integrate
 * with the dark theme regardless of the source SVG's original fill colors.
 * WIRED first per editorial preference (first interview, better article).
 */
export function PressFeatures({ lang }: PressFeaturesProps) {
  const caption = lang === 'es' ? 'Aparezco en' : 'As featured in'
  return (
    <div className="mt-8 md:mt-10 flex flex-col items-center gap-3">
      <span className="press-caption text-[10px] uppercase tracking-[0.35em] font-medium">
        {caption}
      </span>
      <div className="flex items-center gap-10 md:gap-16">
        <a
          href="https://wired.com.gr/article/to-ai-ergaleio-pou-fernei-epanastasi-ston-tropo-pou-psachnoume-douleia/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="WIRED — Featured article on Career-Ops"
          className="group inline-flex items-center"
        >
          <img
            src="/press-logos/wired.svg"
            alt="WIRED"
            width={110}
            height={22}
            className="press-logo h-[22px] w-auto opacity-55 group-hover:opacity-100 transition-opacity duration-300"
          />
        </a>
        <a
          href="https://www.businessinsider.com/how-i-built-tool-filter-job-listings-landed-head-ai-2026-4"
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Business Insider — Featured article on Career-Ops"
          className="group inline-flex items-center"
        >
          <img
            src="/press-logos/business-insider.svg"
            alt="Business Insider"
            width={84}
            height={26}
            className="press-logo h-[26px] w-auto opacity-55 group-hover:opacity-100 transition-opacity duration-300"
          />
        </a>
      </div>
    </div>
  )
}
