import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// プロジェクト1件分の「大きなリスト行」。Home と Projects 一覧で使い回す。
export default function ProjectRow({ project }) {
  const to = project.internalRoute ?? `/projects/${project.id}`;

  return (
    <Link to={to} className="group block border-t border-line py-8 sm:py-10">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-3">
          <h3 className="font-jp text-2xl sm:text-[2rem] font-bold tracking-tight leading-tight transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-ink-2">
            {project.summary}
          </p>
        </div>
        <ArrowUpRight
          size={28}
          className="mt-1 shrink-0 text-ink transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
      <div className="mt-4 text-xs sm:text-sm font-medium text-muted">
        {project.category} — {project.tags.join(', ')}
      </div>
    </Link>
  );
}
