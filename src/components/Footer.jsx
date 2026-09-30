import { site } from '../data/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 py-16 sm:py-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-muted">GET IN TOUCH</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-4 inline-block text-3xl sm:text-5xl font-semibold tracking-tight text-accent hover:opacity-70 transition-opacity break-all"
        >
          {site.email}
        </a>

        <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
          <span className="text-muted">
            © {year} {site.name}
          </span>
          <div className="flex gap-6 text-ink-2">
            <a href={site.socials.github} target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">
              GitHub
            </a>
            <a href={site.socials.x} target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">
              X (Twitter)
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-ink transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
