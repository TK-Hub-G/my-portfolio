import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { site } from '../data/site';
import ProjectRow from '../components/ProjectRow';

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
      {/* ヒーロー */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fade}
        className="pt-16 sm:pt-24 pb-14 sm:pb-20"
      >
        <p className="text-xs font-semibold tracking-[0.18em] text-ink-2">
          {site.role.toUpperCase()}
        </p>
        <h1 className="mt-6 font-jp text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.12]">
          {site.heroHeadline.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <div className="mt-9 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <p className="max-w-xl font-jp text-base sm:text-lg leading-relaxed text-ink-2">
            {site.heroIntro}
          </p>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 font-semibold text-accent shrink-0"
          >
            作品を見る
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.section>

      {/* 実績サマリー */}
      <section className="border-t border-line py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
          {site.stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight">{s.value}</span>
              <span className="font-jp text-sm text-ink-2">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Work */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fade}
        className="pt-16 pb-4"
      >
        <div className="flex items-end justify-between pb-1">
          <h2 className="text-sm font-semibold">Selected Work</h2>
          <Link
            to="/projects"
            className="text-sm font-medium text-ink-2 hover:text-ink transition-colors"
          >
            All projects →
          </Link>
        </div>
        <div>
          {featured.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
          <div className="border-t border-line" />
        </div>
      </motion.section>
    </div>
  );
}
