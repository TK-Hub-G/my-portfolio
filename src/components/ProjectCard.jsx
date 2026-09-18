import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';

const COLOR_STYLES = {
  indigo: {
    badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    hoverBorder: 'hover:border-indigo-500/50',
    status: 'text-indigo-400',
  },
  emerald: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    hoverBorder: 'hover:border-emerald-500/50',
    status: 'text-emerald-400',
  },
};

export default function ProjectCard({ project }) {
  const styles = COLOR_STYLES[project.color] ?? COLOR_STYLES.indigo;
  const to = project.internalRoute ?? `/projects/${project.id}`;

  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
      <Link
        to={to}
        className={`h-full p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between transition-all shadow-lg ${styles.hoverBorder}`}
      >
        <div>
          <div className="flex justify-between items-start mb-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${styles.badge}`}>
              {project.category}
            </span>
            {project.internalRoute ? (
              <Sparkles size={16} className={`${styles.status} animate-pulse`} />
            ) : (
              <ExternalLink size={16} className="text-slate-500" />
            )}
          </div>
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{project.summary}</p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between text-xs text-slate-500">
          <span>{project.tags.join(' / ')}</span>
          <span className={`font-medium ${styles.status}`}>{project.status}</span>
        </div>
      </Link>
    </motion.div>
  );
}
