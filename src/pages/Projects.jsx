import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Projects() {
  const tags = useMemo(() => {
    const all = projects.flatMap((p) => p.tags);
    return ['All', ...Array.from(new Set(all))];
  }, []);
  const [activeTag, setActiveTag] = useState('All');

  const filtered =
    activeTag === 'All' ? projects : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-20 space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-2">
        <div className="flex items-center gap-2">
          <Code className="text-indigo-400" />
          <h1 className="text-3xl font-bold">Projects</h1>
        </div>
        <p className="text-slate-400 text-sm">これまでに取り組んだプロジェクト・制作物の一覧です。</p>
      </motion.div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeTag === tag
                ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <motion.div layout className="grid md:grid-cols-2 gap-6">
        {filtered.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="text-slate-500 text-sm col-span-2">該当するプロジェクトはありません。</p>
        )}
      </motion.div>
    </div>
  );
}
