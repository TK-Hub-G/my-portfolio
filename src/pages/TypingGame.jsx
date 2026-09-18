import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, RotateCcw, Sparkles, Trophy, Zap } from 'lucide-react';
import { DIFFICULTIES, HIGH_SCORE_KEY_PREFIX } from '../data/typingWords';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function readHighScore(difficulty) {
  const raw = localStorage.getItem(`${HIGH_SCORE_KEY_PREFIX}${difficulty}`);
  return raw ? Number(raw) : 0;
}

function writeHighScore(difficulty, score) {
  localStorage.setItem(`${HIGH_SCORE_KEY_PREFIX}${difficulty}`, String(score));
}

export default function TypingGame() {
  const [difficulty, setDifficulty] = useState('normal');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTIES.normal.timeLimit);
  const [highScore, setHighScore] = useState(() => readHighScore('normal'));
  const [isNewRecord, setIsNewRecord] = useState(false);

  const inputRef = useRef(null);
  const config = DIFFICULTIES[difficulty];

  useEffect(() => {
    setHighScore(readHighScore(difficulty));
  }, [difficulty]);

  const nextWord = (level = difficulty) => {
    const words = DIFFICULTIES[level].words;
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  };

  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setIsNewRecord(false);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setTimeLeft(config.timeLimit);
    setInputWord('');
    nextWord();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (!isPlaying) return undefined;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      setIsGameOver(true);
      setScore((finalScore) => {
        if (finalScore > highScore) {
          writeHighScore(difficulty, finalScore);
          setHighScore(finalScore);
          setIsNewRecord(true);
        }
        return finalScore;
      });
      return undefined;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, difficulty, highScore]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputWord(value);
    if (value.toLowerCase() === currentWord) {
      setScore((prev) => prev + 1);
      setCombo((prev) => {
        const next = prev + 1;
        setBestCombo((best) => Math.max(best, next));
        return next;
      });
      setInputWord('');
      nextWord();
    }
  };

  const changeDifficulty = (level) => {
    if (isPlaying) return;
    setDifficulty(level);
    setIsGameOver(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 pt-10 pb-20 space-y-8">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
      >
        <ArrowLeft size={16} /> Projects に戻る
      </Link>

      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="text-emerald-400" />
          <h1 className="text-3xl font-bold">Dev Typing Game</h1>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Reactの状態管理とタイマー制御を活かしたミニタイピングゲーム。難易度ごとにハイスコアがブラウザに保存されます。
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {Object.entries(DIFFICULTIES).map(([key, d]) => (
              <button
                key={key}
                type="button"
                onClick={() => changeDifficulty(key)}
                disabled={isPlaying}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                  difficulty === key
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Trophy size={14} className="text-amber-400" />
            Best: <strong className="text-amber-400">{highScore}</strong>
          </div>
        </div>

        <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 text-center relative overflow-hidden min-h-[220px] flex items-center justify-center">
          {!isPlaying && !isGameOver && (
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all text-lg"
            >
              <Play size={18} /> ゲームスタート
            </button>
          )}

          {isPlaying && (
            <div className="w-full space-y-4">
              <div className="flex justify-between text-xs text-slate-400">
                <span>
                  Time: <strong className="text-emerald-400">{timeLeft}s</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Zap size={14} className="text-amber-400" /> Combo:{' '}
                  <strong className="text-amber-400">{combo}</strong>
                </span>
                <span>
                  Score: <strong className="text-emerald-400">{score}</strong>
                </span>
              </div>
              <div className="text-3xl font-mono font-bold tracking-wider text-indigo-300">
                {currentWord}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={inputWord}
                onChange={handleInputChange}
                placeholder="ここに入力..."
                autoComplete="off"
                spellCheck={false}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-center focus:outline-none focus:border-emerald-400 font-mono text-base"
              />
            </div>
          )}

          {isGameOver && (
            <div className="space-y-3">
              <div className="text-lg font-bold text-slate-200">
                タイムアップ！ {isNewRecord && <span className="text-amber-400">New Best!</span>}
              </div>
              <div className="flex justify-center gap-6 text-sm text-slate-400">
                <span>
                  Score: <strong className="text-emerald-400 text-lg">{score}</strong>
                </span>
                <span>
                  Best Combo: <strong className="text-amber-400 text-lg">{bestCombo}</strong>
                </span>
              </div>
              <button
                onClick={startGame}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium transition-all"
              >
                <RotateCcw size={14} /> もう一度遊ぶ
              </button>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex justify-between text-xs text-slate-500">
          <span>React / Hooks / localStorage</span>
          <span className="text-emerald-400 font-medium">Playable</span>
        </div>
      </motion.div>
    </div>
  );
}
