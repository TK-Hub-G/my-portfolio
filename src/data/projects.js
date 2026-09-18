// プロジェクト情報を一元管理するデータソース。
// ここに追加するだけで Home / Projects 一覧 / 詳細ページに反映される。
export const projects = [
  {
    id: 'lifelog',
    title: 'ライフログ（日記アプリ）',
    category: 'Web App',
    color: 'indigo',
    tags: ['Laravel', 'Python'],
    status: '公開準備中',
    featured: true,
    summary:
      '個人チームで開発中の多機能日記アプリ。実用性を追求し、設計から実装まで思考プロセスを重ねて進行中。',
    description: [
      '要件定義から画面設計、DB設計、実装までを個人チームで担当している日記アプリです。',
      '「書く手間を減らして続けられること」をコンセプトに、入力補助やタグ付け、振り返り機能などの検討を重ねています。',
      '設計段階から実装、リリース後の改善までを見据え、要件定義書やER図をベースに機能を優先度付けしながら開発を進めています。',
    ],
    stack: ['Laravel', 'Python', 'MySQL', 'Docker'],
    links: {
      github: null,
      demo: null,
    },
  },
  {
    id: 'typing-game',
    title: 'Dev Typing Game',
    category: 'React Game',
    color: 'emerald',
    tags: ['React', 'Hooks'],
    status: 'Playable',
    featured: true,
    summary: 'Reactの状態管理とタイマー制御を活かしたミニタイピングゲーム。難易度別のスコア記録付き。',
    description: [
      'Reactの useState / useEffect / useRef を使って、タイマー制御と入力判定をゼロから実装したタイピングゲームです。',
      '難易度ごとに単語セットと制限時間を切り替えられ、ハイスコアはブラウザの localStorage に保存されます。',
      'もとはトップページの1カードとして埋め込んでいましたが、単独ページとして切り出し、機能を拡張しました。',
    ],
    stack: ['React', 'Hooks', 'localStorage'],
    internalRoute: '/typing-game',
    links: {
      github: null,
      demo: null,
    },
  },
];

export function getProjectById(id) {
  return projects.find((p) => p.id === id);
}
