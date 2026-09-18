import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-800/80 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <span>&copy; {new Date().getFullYear()} Portfolio</span>
        <div className="flex gap-4">
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
          >
            <Globe size={16} /> GitHub
          </a>
          <a
            href="https://x.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
          >
            <Globe size={16} /> X (Twitter)
          </a>
        </div>
      </div>
    </footer>
  );
}
