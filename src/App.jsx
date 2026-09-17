import React from 'react';
import { motion } from 'framer-motion';
import { Code, Sparkles, Terminal, Cpu, ExternalLink, Globe } from 'lucide-react';

export default function App() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      
      {/* 背景グラデーション */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 pt-16 space-y-16 relative z-10">
        
        {/* ヘッダー */}
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
            要件定義などの上流工程から実装、アクセス分析まで一貫して対応可能[cite: 1]。
            実務2年で培った現場感と、常に新しい技術へ挑む姿勢を強みとしています[cite: 1]。
          </p>

          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <a href="https://github.com/your-username" target="_blank" rel="noreferrer" 
               className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:scale-105">
              <Globe size={18} /> GitHub
            </a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" 
               className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:scale-105">
              <Globe size={18} /> X (Twitter)
            </a>
          </div>
        </motion.header>

        {/* 成果物（Projects） */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="space-y-6">
          <div className="flex items-center gap-2">
            <Code className="text-indigo-400" />
            <h2 className="text-2xl font-bold">Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* ライフログ */}
            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-lg">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Web App</span>
                  <ExternalLink size={16} className="text-slate-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">ライフログ (日記アプリ)</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  個人チームで開発中の多機能日記アプリ。実用性を追求し、設計から実装まで思考プロセスを重ねて進行中[cite: 1]。
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between text-xs text-slate-500">
                <span>Laravel / Python</span>
                <span className="text-indigo-400 font-medium">公開準備中</span>
              </div>
            </motion.div>

            {/* ミニゲーム */}
            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-lg">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">React Game</span>
                  <Sparkles size={16} className="text-emerald-400 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Mini Game</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Reactの状態管理（State）や動的演出を盛り込んだ、ポートフォリオ内で直感的に遊べるWebゲーム（制作予定）。
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between text-xs text-slate-500">
                <span>React / Framer Motion</span>
                <span className="text-emerald-400 font-medium">Coming Soon</span>
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* 実務経験 */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="space-y-6">
          <div className="flex items-center gap-2">
            <Cpu className="text-indigo-400" />
            <h2 className="text-2xl font-bold">Experience & Skills</h2>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="border-l-2 border-indigo-500 pl-4 space-y-2">
              <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">実務経験 約2年</span>
              <h3 className="text-lg font-bold">IT企業 Web開発エンジニア（学生アルバイト）[cite: 1]</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                出社状況管理システムの要件定義〜設計・実装（Laravel, Docker, GitLab）を担当[cite: 1]。
                またGA4/Search Consoleを活用したアクセス解析と、自社サイトの大規模改修プロジェクトを推進[cite: 1]。
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-indigo-400 block font-bold mb-1">Languages</span>
                PHP, JS, Ruby, Python[cite: 1]
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-indigo-400 block font-bold mb-1">Frameworks</span>
                Laravel, Rails, React[cite: 1]
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-indigo-400 block font-bold mb-1">Dev Tools</span>
                Docker, Git, GA4, Vercel[cite: 1]
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}