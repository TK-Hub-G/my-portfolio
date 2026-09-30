// サイト全体で使う「自分の情報」を一元管理するファイル。
// 名前・メール・SNS・実績数値などはここだけ直せば全ページに反映されます。
export const site = {
  name: 'Kentaro Takahashi',
  role: 'Full-Stack Student Engineer',
  email: 'ktakahashiipu@gmail.com',
  socials: {
    github: 'https://github.com/TK-Hub-G',
    x: 'https://x.com/brakeroomlk',
  },
  // トップの大見出し（配列の1要素 = 1行）
  heroHeadline: ['つくって、測って、', '改善する。'],
  heroIntro:
    '要件定義から実装、GA4での分析・改善まで一貫して。実務2年の現場感で、最後まで手を動かして届けます。',
  // トップと下部に出る実績サマリー。増やしたい項目を足すだけでOK。
  stats: [
    { value: '2年', label: '実務経験' },
    { value: '2', label: '制作プロジェクト' },
    { value: '12+', label: '技術スタック' },
    { value: 'GA4', label: 'アクセス解析' },
  ],
  // About の「What I do」。項目を足すだけで並びます。
  strengths: [
    { title: '要件定義・設計', description: '要件定義〜画面 / DB 設計まで、上流工程から関われます。' },
    { title: 'フルスタック実装', description: 'Laravel・React を中心に、フロント / バックの両方を実装。' },
    { title: '分析と改善', description: 'GA4 / Search Console でアクセス解析し、改善サイクルを回す。' },
  ],
};
