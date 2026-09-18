import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getProjectById } from '../data/projects';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectById(id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  if (project.internalRoute) {
    return <Navigate to={project.internalRoute} replace />;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-10 pb-20 space-y-8">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
      >
        <ArrowLeft size={16} /> Projects に戻る
      </Link>

      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {project.category}
            </span>
            <span className="text-xs font-medium text-indigo-400">{project.status}</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">{project.title}</h1>
          <p className="text-slate-400 leading-relaxed">{project.summary}</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          {project.description.map((paragraph, i) => (
            <p key={i} className="text-sm text-slate-300 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400"
            >
              {s}
            </span>
          ))}
        </div>

        {(project.links?.github || project.links?.demo) && (
          <div className="flex gap-3 text-sm font-medium">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
              >
                <ExternalLink size={16} /> GitHub
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 transition-all"
              >
                <ExternalLink size={16} /> Demo
              </a>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
