import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Sparkles, Terminal, Cpu, ExternalLink, Globe, Play, RotateCcw } from 'lucide-react';

// タイピング用の単語リスト（エンジニア用語）
const WORDS = ['react', 'laravel', 'docker', 'python', 'javascript', 'tailwind', 'github', 'vercel', 'component', 'database'];

export default function App() {
  // タイピングゲーム用の状態（State）
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);
  
  const inputRef = useRef(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // ゲームスタート
  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(15);
    setInputWord('');
    nextWord();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // 次の単語をセット
  const nextWord = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(randomWord);
  };

  // タイマー処理
  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setIsGameOver(true);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // 入力チェック
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputWord(value);
    if (value.toLowerCase() === currentWord) {
      setScore((prev) => prev + 1);
      setInputWord('');
      nextWord();
    }
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

            {/* ミニゲーム（タイピングゲーム組み込み） */}
            <motion.div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-lg col-span-1 md:col-span-1">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">React Game</span>
                  <Sparkles size={16} className="text-emerald-400 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2">Dev Typing Game</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Reactの状態管理とタイマー制御を活かしたミニタイピングゲーム。
                </p>

                {/* プレイ画面 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center relative overflow-hidden">
                  {!isPlaying && !isGameOver && (
                    <button onClick={startGame} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all">
                      <Play size={16} /> ゲームスタート
                    </button>
                  )}

                  {isPlaying && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Time: <strong className="text-emerald-400">{timeLeft}s</strong></span>
                        <span>Score: <strong className="text-emerald-400">{score}</strong></span>
                      </div>
                      <div className="text-2xl font-mono font-bold tracking-wider text-indigo-300">
                        {currentWord}
                      </div>
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputWord}
                        onChange={handleInputChange}
                        placeholder="ここに入力..."
                        className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-center focus:outline-none focus:border-emerald-400 font-mono text-sm"
                      />
                    </div>
                  )}

                  {isGameOver && (
                    <div className="space-y-3">
                      <div className="text-sm font-bold text-slate-200">タイムアップ！</div>
                      <div className="text-xs text-slate-400">Score: <strong className="text-emerald-400 text-base">{score}</strong> words</div>
                      <button onClick={startGame} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium transition-all">
                        <RotateCcw size={14} /> もう一度遊ぶ
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between text-xs text-slate-500">
                <span>React / Hooks</span>
                <span className="text-emerald-400 font-medium">Playable</span>
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