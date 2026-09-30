import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { site } from '../data/site';

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Section({ label, children }) {
  return (
    <div className="grid gap-6 border-t border-line py-10 sm:grid-cols-[180px_1fr] sm:gap-16 sm:py-12">
      <h2 className="text-sm font-semibold tracking-wide">{label}</h2>
      <div>{children}</div>
    </div>
  );
}

function Field({ label, name, value, onChange, placeholder, textarea }) {
  const cls =
    'w-full bg-transparent border-b border-ink-2 py-3 text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors';
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      form.subject || `ポートフォリオを見ました - ${form.name || '名前未入力'}`,
    );
    const body = encodeURIComponent(
      `${form.message}\n\n---\nお名前: ${form.name}\nメール: ${form.email}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const channels = [
    { label: 'EMAIL', value: site.email, href: `mailto:${site.email}` },
    { label: 'GITHUB', value: site.socials.github.replace(/^https?:\/\//, ''), href: site.socials.github },
    { label: 'X (TWITTER)', value: site.socials.x.replace(/^https?:\/\//, ''), href: site.socials.x },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fade}
        className="pt-16 sm:pt-24 pb-10"
      >
        <p className="text-xs font-semibold tracking-[0.18em] text-ink-2">CONTACT</p>
        <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight">Contact</h1>
        <p className="mt-5 max-w-xl font-jp leading-relaxed text-ink-2">
          お仕事のご相談・ご質問などお気軽にどうぞ。フォーム、または各SNS・メールからご連絡いただけます。
        </p>
      </motion.header>

      <div>
        <Section label="MESSAGE">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="お名前" name="name" value={form.name} onChange={handleChange} placeholder="山田 太郎" />
              <Field
                label="メールアドレス"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>
            <Field label="件名" name="subject" value={form.subject} onChange={handleChange} placeholder="ご相談の件名" />
            <Field
              label="メッセージ"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="ご相談内容をご記入ください。"
              textarea
            />
            <button
              type="submit"
              className="group inline-flex items-center gap-2 bg-ink px-8 py-3.5 text-sm font-semibold text-paper transition-opacity hover:opacity-85"
            >
              送信する
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-xs leading-relaxed text-muted">
              ※ サーバーを持たないため、送信ボタンでお使いのメールソフトが開きます。
            </p>
          </form>
        </Section>

        <Section label="CHANNELS">
          <div className="space-y-6">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group block"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">{c.label}</p>
                <p className="mt-1 text-lg font-medium transition-colors group-hover:text-accent">
                  {c.value}
                </p>
              </a>
            ))}
          </div>
        </Section>

        <div className="border-t border-line" />
      </div>
    </div>
  );
}
