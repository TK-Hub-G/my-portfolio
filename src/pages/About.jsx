import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { experience, skills } from '../data/experience';
import { site } from '../data/site';

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// 左に小ラベル、右に本文の「索引」レイアウト
function Section({ label, children }) {
  return (
    <div className="grid gap-6 border-t border-line py-10 sm:grid-cols-[180px_1fr] sm:gap-16 sm:py-12">
      <h2 className="text-sm font-semibold tracking-wide">{label}</h2>
      <div>{children}</div>
    </div>
  );
}

export default function About() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fade}
        className="pt-16 sm:pt-24 pb-10"
      >
        <p className="text-xs font-semibold tracking-[0.18em] text-ink-2">PROFILE</p>
        <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight">About</h1>
        <p className="mt-5 max-w-2xl font-jp text-base sm:text-lg leading-relaxed text-ink-2">
          要件定義から実装、GA4によるアクセス解析・改善まで一貫して携わってきた、フルスタック志向の学生エンジニアです。実務で得た現場感を大切にしながら、新しい技術にも挑戦しています。
        </p>
      </motion.header>

      <div>
        <Section label="EXPERIENCE">
          <div className="space-y-10">
            {experience.map((entry, i) => (
              <div key={i} className="space-y-2">
                <p className="text-sm font-medium text-ink-2">{entry.period}</p>
                <h3 className="font-jp text-xl sm:text-2xl font-bold tracking-tight">{entry.role}</h3>
                <p className="font-jp text-sm sm:text-base leading-relaxed text-ink-2">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section label="WHAT I DO">
          <div className="space-y-7">
            {site.strengths.map((item) => (
              <div key={item.title} className="space-y-1.5">
                <h3 className="font-jp text-lg font-bold">{item.title}</h3>
                <p className="font-jp text-sm sm:text-base leading-relaxed text-ink-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section label="SKILLS">
          <div className="space-y-6">
            {skills.map((group) => (
              <div key={group.category} className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {group.category}
                </p>
                <p className="font-jp text-base sm:text-lg font-medium">{group.items.join(', ')}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section label="CURRENTLY">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-accent">● Open to opportunities</p>
            <p className="max-w-xl font-jp text-base leading-relaxed text-ink-2">
              新しい技術と、価値ある課題を探しています。お気軽にご連絡ください。
            </p>
            <Link to="/contact" className="inline-block font-semibold text-accent">
              お問い合わせ →
            </Link>
          </div>
        </Section>

        <div className="border-t border-line" />
      </div>
    </div>
  );
}
