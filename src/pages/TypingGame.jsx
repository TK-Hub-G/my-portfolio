import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, RotateCcw, Trophy, Zap } from 'lucide-react';
import { DIFFICULTIES, HIGH_SCORE_KEY_PREFIX } from '../data/typingWords';

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
    <div className="mx-auto w-full max-w-3xl px-6 sm:px-10 pt-14 sm:pt-20 pb-4">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink transition-colors"
      >
        <ArrowLeft size={16} /> Projects
      </Link>

      <motion.header initial="hidden" animate="visible" variants={fade} className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">React Game · Playable</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">Dev Typing Game</h1>
        <p className="mt-5 max-w-xl font-jp leading-relaxed text-ink-2">
          Reactの状態管理とタイマー制御を活かしたミニタイピングゲーム。難易度ごとにハイスコアがブラウザに保存されます。
        </p>
      </motion.header>

      <div className="mt-10 border-t border-line pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {Object.entries(DIFFICULTIES).map(([key, d]) => (
              <button
                key={key}
                type="button"
                onClick={() => changeDifficulty(key)}
                disabled={isPlaying}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  difficulty === key
                    ? 'bg-ink text-paper'
                    : 'text-ink-2 hover:text-ink'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-ink-2">
            <Trophy size={15} className="text-accent" />
            Best: <strong className="text-ink">{highScore}</strong>
          </div>
        </div>

        <div className="mt-6 flex min-h-[240px] items-center justify-center border border-line p-8 text-center">
          {!isPlaying && !isGameOver && (
            <button
              onClick={startGame}
              className="group inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-85"
            >
              <Play size={18} /> ゲームスタート
            </button>
          )}

          {isPlaying && (
            <div className="w-full space-y-6">
              <div className="flex justify-between text-sm text-ink-2">
                <span>
                  Time: <strong className="text-ink">{timeLeft}s</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Zap size={14} className="text-accent" /> Combo:{' '}
                  <strong className="text-ink">{combo}</strong>
                </span>
                <span>
                  Score: <strong className="text-ink">{score}</strong>
                </span>
              </div>
              <div className="font-mono text-4xl font-bold tracking-wider text-ink">
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
                className="w-full border-b border-ink-2 bg-transparent py-2 text-center font-mono text-lg placeholder:text-muted focus:border-accent focus:outline-none"
              />
            </div>
          )}

          {isGameOver && (
            <div className="space-y-4">
              <div className="text-xl font-bold">
                タイムアップ！ {isNewRecord && <span className="text-accent">New Best!</span>}
              </div>
              <div className="flex justify-center gap-8 text-sm text-ink-2">
                <span>
                  Score: <strong className="text-ink text-lg">{score}</strong>
                </span>
                <span>
                  Best Combo: <strong className="text-ink text-lg">{bestCombo}</strong>
                </span>
              </div>
              <button
                onClick={startGame}
                className="inline-flex items-center gap-1.5 border border-line px-4 py-2 text-sm font-medium hover:border-ink-2 transition-colors"
              >
                <RotateCcw size={14} /> もう一度遊ぶ
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between border-t border-line pt-4 text-xs text-muted">
          <span>React · Hooks · localStorage</span>
          <span className="font-medium text-ink-2">Playable</span>
        </div>
      </div>
    </div>
  );
}
