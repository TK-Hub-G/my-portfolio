import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getProjectById } from '../data/projects';

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
    <div className="mx-auto w-full max-w-3xl px-6 sm:px-10 pt-14 sm:pt-20 pb-4">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink transition-colors"
      >
        <ArrowLeft size={16} /> Projects
      </Link>

      <motion.article initial="hidden" animate="visible" variants={fade} className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          {project.category} — {project.status}
        </p>
        <h1 className="mt-4 font-jp text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
          {project.title}
        </h1>
        <p className="mt-5 font-jp text-lg leading-relaxed text-ink-2">{project.summary}</p>

        <div className="mt-10 space-y-5 border-t border-line pt-10">
          {project.description.map((paragraph, i) => (
            <p key={i} className="font-jp text-base leading-[1.9] text-ink-2">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 border-t border-line pt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Tech Stack</p>
          <p className="mt-2 text-base font-medium">{project.stack.join('  ·  ')}</p>
        </div>

        {(project.links?.github || project.links?.demo) && (
          <div className="mt-8 flex flex-wrap gap-6 text-sm font-semibold">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors"
              >
                GitHub
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-accent"
              >
                Live Demo
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        )}
      </motion.article>
    </div>
  );
}
