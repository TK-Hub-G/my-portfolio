import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectRow from '../components/ProjectRow';

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
    <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fade}
        className="pt-16 sm:pt-24 pb-10"
      >
        <p className="text-xs font-semibold tracking-[0.18em] text-ink-2">SELECTED WORK — 2026</p>
        <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight">Projects</h1>
        <p className="mt-5 max-w-xl font-jp leading-relaxed text-ink-2">
          要件定義から実装・改善まで、手を動かして形にしてきた制作物です。タグで絞り込めます。
        </p>
      </motion.header>

      <div className="flex flex-wrap gap-x-6 gap-y-2 pb-6">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`text-sm font-medium transition-colors ${
              activeTag === tag ? 'text-ink' : 'text-muted hover:text-ink-2'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="pb-4">
        {filtered.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
        {filtered.length > 0 ? (
          <div className="border-t border-line" />
        ) : (
          <p className="border-t border-line py-12 text-sm text-ink-2">
            該当するプロジェクトはありません。
          </p>
        )}
      </div>
    </div>
  );
}
