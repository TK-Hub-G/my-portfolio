import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { experience, skills } from '../data/experience';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-20 space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-2">
        <div className="flex items-center gap-2">
          <Cpu className="text-indigo-400" />
          <h1 className="text-3xl font-bold">Experience & Skills</h1>
        </div>
        <p className="text-slate-400 text-sm">実務経験・使用技術の一覧です。</p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-8"
      >
        <div className="space-y-6">
          {experience.map((entry, i) => (
            <div key={i} className="border-l-2 border-indigo-500 pl-4 space-y-2">
              <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                {entry.period}
              </span>
              <h3 className="text-lg font-bold">{entry.role}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{entry.description}</p>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {skills.map((group) => (
            <div
              key={group.category}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300"
            >
              <span className="text-indigo-400 block font-bold mb-1">{group.category}</span>
              {group.items.join(', ')}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
