# ポートフォリオサイト 運用マニュアル

このサイトの「何がどこにあって、どこを触れば何が変わるか」をまとめたものです。
**内容（文章・データ）を変えたいだけなら、ほとんどが [src/data/](src/data/) の中だけで完結します。**
まず「1. 起動する」で手元に表示し、次に「2. まず直す（実データ反映）」を上から進めてください。

---

## 目次

1. [起動する](#1-起動する)
2. [まず直す（実データ反映チェックリスト）](#2-まず直す実データ反映チェックリスト)
3. [自分の情報を変える（site.js）](#3-自分の情報を変えるsitejs)
4. [プロジェクトを追加・編集する（projects.js）](#4-プロジェクトを追加編集するprojectsjs)
5. [経歴・スキルを変える（experience.js）](#5-経歴スキルを変えるexperiencejs)
6. [タイピングゲームの単語・難易度（typingWords.js）](#6-タイピングゲームの単語難易度typingwordsjs)
7. [各ページの見出し・固定文言はどこにあるか](#7-各ページの見出し固定文言はどこにあるか)
8. [デザインの調整（色・フォント）](#8-デザインの調整色フォント)
9. [ナビの項目・順番を変える](#9-ナビの項目順番を変える)
10. [ページと URL・新しいページの追加](#10-ページと-url新しいページの追加)
11. [フォルダ構成](#11-フォルダ構成)
12. [公開（デプロイ）](#12-公開デプロイ)
13. [困ったとき](#13-困ったとき)

---

## 1. 起動する

初回だけ、必要なライブラリをインストールします。

```bash
npm install
```

開発用サーバーを起動します。

```bash
npm run dev
```

ターミナルに出る `http://localhost:5173/` をブラウザで開くと表示されます。
**ファイルを保存すると自動でブラウザに反映される**ので、起動したまま編集するのが基本です。止めるときはターミナルで `Ctrl + C`。

| コマンド | 役割 |
| --- | --- |
| `npm run dev` | 開発用サーバーを起動（編集しながら確認する用） |
| `npm run build` | 公開用のファイルを `dist/` に作る（push 前の確認にも） |
| `npm run preview` | `build` したものを手元で確認する |
| `npm run lint` | コードの書き方の問題をチェックする |

---

## 2. まず直す（実データ反映チェックリスト）

公開前に、仮のままになっている箇所を実際の値に置き換えてください。**ほぼ [src/data/site.js](src/data/site.js) の中だけ**です。

- [ ] **メールアドレス** … [src/data/site.js](src/data/site.js) の `email`（現在 `your-email@example.com` の仮値）。Contact ページ・フッターのメールリンクに使われます
- [ ] **氏名** … `name`（現在 `Kentaro Takahashi`）。ナビ左上・フッター・ブラウザのタブに反映
- [ ] **GitHub / X の URL** … `socials.github` / `socials.x`
- [ ] **実績サマリーの数値** … `stats`（実務年数・プロジェクト数など。実態に合わせて）
- [ ] **ブラウザタブのタイトル・説明** … [index.html](index.html) の `<title>` と `<meta name="description">`
- [ ] **プロジェクトの内容** … [src/data/projects.js](src/data/projects.js)（「4章」）
- [ ] **経歴・スキル** … [src/data/experience.js](src/data/experience.js)（「5章」）

> メールは今のところ「送信ボタンを押すとメールソフトが開く」方式です（サーバー不要）。`email` を正しくすれば、その宛先に届くメールが下書きされます。

---

## 3. 自分の情報を変える（site.js）

[src/data/site.js](src/data/site.js) が**あなたの情報の置き場所**です。ここを直すと全ページに反映されます。

```js
export const site = {
  name: 'Kentaro Takahashi',              // ナビ左上・フッター・タブ名
  role: 'Full-Stack Student Engineer',    // トップ最上部の小さなラベル
  email: 'your-email@example.com',        // Contact / フッターのメール
  socials: {
    github: 'https://github.com/TK-Hub-G',
    x: 'https://x.com/brakeroomlk',
  },
  heroHeadline: ['つくって、測って、', '改善する。'], // トップの大見出し（1要素 = 1行）
  heroIntro: '要件定義から実装、GA4での分析…',        // 大見出しの下の紹介文
  stats: [                                 // トップの実績サマリー（下記）
    { value: '2年', label: '実務経験' },
    …
  ],
  strengths: [                             // About の「What I do」（下記）
    { title: '要件定義・設計', description: '…' },
    …
  ],
};
```

| 項目 | どこに出るか | メモ |
| --- | --- | --- |
| `name` | ナビ左上・フッター・タブ名 | タブ名だけは [index.html](index.html) の `<title>` にも別途あります |
| `role` | トップ最上部の小さなラベル | 自動で大文字表示になります |
| `email` | Contact のメールリンク・フッターの大きなメール | |
| `socials.github` / `socials.x` | フッター・Contact の連絡先 | URL をまるごと入れる |
| `heroHeadline` | トップの大見出し | 配列の**1要素 = 1行**。行を増やせば改行が増える |
| `heroIntro` | 大見出しの下の紹介文 | |
| `stats` | トップと下部の実績サマリー | `{ value, label }` を増やすだけで並びが増えます |
| `strengths` | About の「WHAT I DO」 | `{ title, description }` を増やすだけで項目が増えます |

**実績サマリー（stats）を足す例**：

```js
stats: [
  { value: '2年', label: '実務経験' },
  { value: '5', label: '公開プロジェクト' },   // ← この行を足すだけ
],
```

---

## 4. プロジェクトを追加・編集する（projects.js）

[src/data/projects.js](src/data/projects.js) を編集するだけで、トップの「Selected Work」・Projects 一覧・詳細ページすべてに反映されます。
既存の `{ ... },` を1つコピーして、下に貼り付けて書き換えるのが一番簡単です。

```js
{
  id: 'my-new-app',            // URL になる（/projects/my-new-app）。半角英数字とハイフンで、他と重複させない
  title: 'アプリ名',
  category: 'Web App',         // カード左上・行に出るラベル
  tags: ['React', 'Firebase'], // Projects 一覧の絞り込みボタンになる
  status: '開発中',            // 一覧・詳細に出る状態表示
  featured: true,              // true にするとトップページの「Selected Work」にも出る
  summary: '一覧に出る短い説明文。',
  description: [               // 詳細ページの本文。1要素 = 1段落
    '1段落目の文章。',
    '2段落目の文章。',
  ],
  stack: ['React', 'Firebase'],// 詳細ページ下部の技術スタック表記
  links: {
    github: 'https://github.com/...', // 無ければ null（ボタンが出なくなる）
    demo: null,
  },
},
```

- 並び順は、このファイルに書いた順のままです。
- `tags` に書いた文字がそのまま一覧の絞り込みボタンになります。表記ゆれ（`React` と `react`）に注意。
- `featured: true` のものだけがトップに出ます。
- `internalRoute: '/typing-game'` のように書くと、詳細ページではなくそのURLへ直接飛びます（タイピングゲームがこの形）。通常は書かなくてOK。

> 補足：以前あった `color` は今のデザインでは使いません（書いても無視されるだけなので、残っていても問題ありません）。

---

## 5. 経歴・スキルを変える（experience.js）

[src/data/experience.js](src/data/experience.js) を編集します。About ページに反映されます。

- `experience`：経歴。`{ period, role, description }` のまとまりを増やせば、About に縦に並びます。
- `skills`：スキル。`category`（見出し）と `items`（中身の配列）の組み合わせ。グループを増やしてもOK。

```js
export const experience = [
  { period: '2023 – 2025 · 実務経験 約2年', role: '役職・所属', description: '担当したことの説明。' },
];

export const skills = [
  { category: 'Languages', items: ['PHP', 'JavaScript', 'Python'] },
];
```

> About の「WHAT I DO」（3つの強み）は経歴とは別で、[src/data/site.js](src/data/site.js) の `strengths` にあります（「3章」）。

---

## 6. タイピングゲームの単語・難易度（typingWords.js）

[src/data/typingWords.js](src/data/typingWords.js) を編集します。

- `timeLimit`：制限時間（秒）
- `words`：出題される単語。**小文字の半角英字**で書いてください（入力を小文字に変換して判定しているため、大文字を入れるとクリアできません）。
- 難易度を増やすときは、`hard: {...}` の下に `expert: { label: 'Expert', timeLimit: 10, words: [...] },` のように足すとボタンも自動で増えます。

ハイスコアは閲覧者のブラウザ（localStorage）に保存され、サーバーには送られません。

---

## 7. 各ページの見出し・固定文言はどこにあるか

トップ以外の「見出し・紹介文」は、データではなく各ページのファイルに直接書かれています。文言を変えたいときは下記を開いてください。

| 変えたい文言 | ファイル |
| --- | --- |
| トップの大見出し・紹介文・実績・強み | [src/data/site.js](src/data/site.js)（「3章」） |
| Projects ページの見出し「Projects」・紹介文 | [src/pages/Projects.jsx](src/pages/Projects.jsx) |
| About ページの見出し「About」・冒頭の紹介文 | [src/pages/About.jsx](src/pages/About.jsx) |
| About の各セクション名（EXPERIENCE / SKILLS など） | [src/pages/About.jsx](src/pages/About.jsx) |
| Contact ページの見出し・紹介文・フォームの項目名 | [src/pages/Contact.jsx](src/pages/Contact.jsx) |
| フッターの「GET IN TOUCH」などの文言 | [src/components/Footer.jsx](src/components/Footer.jsx) |
| プロジェクト詳細ページの表示 | [src/pages/ProjectDetail.jsx](src/pages/ProjectDetail.jsx) |

各ファイルを開くと、日本語の文章がそのまま `"..."` や `>...<` の形で入っているので、その部分を書き換えれば変わります。

---

## 8. デザインの調整（色・フォント）

このサイトの見た目は、**共通トークン（色・フォント）**＋ Tailwind CSS のクラスで決まっています。

### 色・フォントの一括変更（トークン）

[src/index.css](src/index.css) の `@theme { ... }` にまとまっています。ここの値を変えると全体に効きます。

```css
@theme {
  --color-paper:  #ffffff;   /* 背景（純白） */
  --color-ink:    #0a0a0a;   /* 文字（ほぼ黒） */
  --color-ink-2:  #6b6b6b;   /* 補助テキスト */
  --color-muted:  #b2b2b2;   /* さらに薄い文字・ラベル */
  --color-line:   #ececec;   /* 罫線（ヘアライン） */
  --color-accent: #ff3d00;   /* 差し色（リンク・ボタン・矢印） */
  --font-sans: "Geist", "Noto Sans JP", …;  /* 見出し・UI */
  --font-jp:   "Noto Sans JP", "Geist", …;  /* 和文の見出し・本文 */
}
```

- **差し色を変えたい** → `--color-accent` の値（例 `#ff3d00`）を好きな色コードに変えるだけ。サイト全体のリンク・ボタン・強調がその色になります。
- **フォントを変えたい** → Google Fonts の名前を `--font-sans` / `--font-jp` に入れ、[src/index.css](src/index.css) 冒頭の `@import url('https://fonts.googleapis.com/...')` にもそのフォントを追加します。

### クラスの読み方（コード内の `className="..."`）

上のトークンは、そのままクラス名として使えます。数字や色名を書き換えるだけで調整できます。

| クラス例 | 意味 |
| --- | --- |
| `text-ink` / `text-ink-2` / `text-muted` | 文字色（濃い→薄い） |
| `text-accent` / `bg-accent` | 差し色の文字 / 背景 |
| `border-line` | 罫線の色 |
| `font-jp` | 和文フォントを使う |
| `text-2xl` / `text-5xl` | 文字サイズ（`sm < base < lg < xl < 2xl < … < 7xl`） |
| `font-bold` / `font-semibold` | 太さ |
| `px-6` / `py-3` / `mt-8` | 余白（p=内側, m=外側 / x=左右, y=上下）。数字×4px |
| `max-w-6xl` | コンテンツの最大幅 |
| `sm:` / `md:` 付き | 画面幅が一定以上のときだけ適用（`sm`=640px〜） |

---

## 9. ナビの項目・順番を変える

[src/components/NavBar.jsx](src/components/NavBar.jsx) の先頭にある `NAV_ITEMS` を編集します。
並べ替えれば順番が変わり、行を消せばメニューから消えます（ページ自体は URL を直接開けば残ります）。「Contact」だけは差し色で別に配置しています。

```js
const NAV_ITEMS = [
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/typing-game', label: 'Typing Game' },
];
```

---

## 10. ページと URL・新しいページの追加

### ページと URL の対応

| URL | ページ | ファイル |
| --- | --- | --- |
| `/` | トップ | [src/pages/Home.jsx](src/pages/Home.jsx) |
| `/projects` | プロジェクト一覧 | [src/pages/Projects.jsx](src/pages/Projects.jsx) |
| `/projects/○○` | プロジェクト詳細 | [src/pages/ProjectDetail.jsx](src/pages/ProjectDetail.jsx) |
| `/typing-game` | タイピングゲーム | [src/pages/TypingGame.jsx](src/pages/TypingGame.jsx) |
| `/about` | 経歴・スキル | [src/pages/About.jsx](src/pages/About.jsx) |
| `/contact` | お問い合わせ | [src/pages/Contact.jsx](src/pages/Contact.jsx) |
| 上記以外 | 404 | [src/pages/NotFound.jsx](src/pages/NotFound.jsx) |

対応表は [src/App.jsx](src/App.jsx) にあります。

### 新しいページを追加する（例：`/blog`）

1. [src/pages/About.jsx](src/pages/About.jsx) をコピーして `src/pages/Blog.jsx` を作り、中身と関数名（`export default function Blog()`）を書き換える
2. [src/App.jsx](src/App.jsx) に2行追加
   ```jsx
   import Blog from './pages/Blog';                 // 上の import 群に追加
   <Route path="blog" element={<Blog />} />         // path="*" より上に追加
   ```
3. [src/components/NavBar.jsx](src/components/NavBar.jsx) の `NAV_ITEMS` に `{ to: '/blog', label: 'Blog' }` を追加

---

## 11. フォルダ構成

```
my-portfolio/
├─ index.html              タブのタイトル・説明・ファビコン
├─ vercel.json             公開用の設定（基本触らない）
└─ src/
   ├─ main.jsx             起動の入り口（基本触らない）
   ├─ App.jsx              URL とページの対応表
   ├─ index.css            色・フォントのトークン（8章）
   ├─ data/                ★ 内容・データを変えるならまずここ
   │  ├─ site.js           自分の情報（名前・メール・SNS・実績・強み）
   │  ├─ projects.js       プロジェクト一覧
   │  ├─ experience.js     経歴・スキル
   │  └─ typingWords.js    タイピングゲームの単語・難易度
   ├─ components/          共通の部品
   │  ├─ Layout.jsx        全ページ共通の枠・ページ切替アニメ
   │  ├─ NavBar.jsx        上部ナビ
   │  ├─ Footer.jsx        下部フッター
   │  └─ ProjectRow.jsx    プロジェクト1件分のリスト行
   └─ pages/               各ページ本体（7章の文言もここ）
```

**考え方のコツ**：「内容（文章・データ）」は [src/data/](src/data/)、「各ページ固有の見出し・文言」は [src/pages/](src/pages/)、「色・フォント」は [src/index.css](src/index.css)。

---

## 12. 公開（デプロイ）

GitHub リポジトリを Vercel に連携している場合は、**`main` ブランチに push するだけで自動的に公開サイトが更新されます。**

```bash
git add .
git commit -m "内容を更新"
git push
```

push 前に、手元で `npm run build` が成功することを確認しておくと安心です（ここで失敗するものは Vercel でも失敗します）。
`vercel.json` は「`/about` などに直接アクセスしても 404 にならないようにする」設定なので消さないでください。

> 現在このサイトは `ui-redesign` ブランチで作業しています。公開に反映するには、`main` へマージ（または `main` に push）する必要があります。

---

## 13. 困ったとき

| 症状 | よくある原因 |
| --- | --- |
| 画面が真っ白になった | 編集時の書き間違い。ブラウザで `F12` → Console タブに赤いエラーが出ています。`,` や `}` の付け忘れ・消しすぎ、`'` の閉じ忘れが多い |
| `npm run dev` でエラー | `npm install` をまだ実行していない／`node_modules` が壊れている → `npm install` をやり直す |
| 変更が反映されない | ファイルを保存していない、または開発サーバーが止まっている |
| 追加したプロジェクトの詳細が開けない | `id` が他と重複、または日本語・空白を含んでいる（半角英数字とハイフンに） |
| 一覧の絞り込みタグが増えすぎた | `tags` に書いた内容がそのままボタンになるため。表記ゆれ（`React`/`react`）に注意 |
| フォントが一瞬崩れて表示される | Google Fonts の読み込み待ち。通常は数百ミリ秒で整います |
| 元に戻したい | 保存前なら `Ctrl + Z`。コミット済みに戻すなら `git restore ファイル名`（編集内容は消えます） |
