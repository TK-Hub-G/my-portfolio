// タイピングゲームの難易度別設定。
export const DIFFICULTIES = {
  easy: {
    label: 'Easy',
    timeLimit: 20,
    words: ['git', 'css', 'html', 'node', 'vite', 'npm', 'api', 'json', 'vue', 'sass'],
  },
  normal: {
    label: 'Normal',
    timeLimit: 15,
    words: [
      'react', 'laravel', 'docker', 'python', 'javascript',
      'tailwind', 'github', 'vercel', 'component', 'database',
    ],
  },
  hard: {
    label: 'Hard',
    timeLimit: 12,
    words: [
      'typescript', 'kubernetes', 'microservices', 'elasticsearch',
      'websocket', 'algorithm', 'authentication', 'middleware',
      'serverless', 'asynchronous',
    ],
  },
};

export const HIGH_SCORE_KEY_PREFIX = 'typing-game:highscore:';
