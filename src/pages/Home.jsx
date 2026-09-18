import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Code, ArrowRight, Globe } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-20 space-y-16">
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Terminal size={160} />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
          <Sparkles size={14} /> Full-Stack Student Engineer
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent mb-4">
          Portfolio
        </h1>

        <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
          要件定義などの上流工程から実装、アクセス分析まで一貫して対応可能。
          実務2年で培った現場感と、常に新しい技術へ挑む姿勢を強みとしています。
        </p>

        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <Link
            to="/about"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold transition-all hover:scale-105"
          >
            経歴・スキルを見る <ArrowRight size={16} />
          </Link>
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:scale-105"
          >
            <Globe size={18} /> GitHub
          </a>
          <a
            href="https://x.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:scale-105"
          >
            <Globe size={18} /> X (Twitter)
          </a>
        </div>
      </motion.header>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="text-indigo-400" />
            <h2 className="text-2xl font-bold">Featured Projects</h2>
          </div>
          <Link
            to="/projects"
            className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
          >
            すべて見る <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}
