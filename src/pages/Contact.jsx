import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Globe, Check } from 'lucide-react';

const CONTACT_EMAIL = 'your-email@example.com';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', message: '' });
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`ポートフォリオを見ました - ${form.name || '名前未入力'}`);
    const body = encodeURIComponent(form.message);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // クリップボードAPIが使えない環境ではメールリンクから直接送ってもらう
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 pt-10 pb-20 space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-2">
        <div className="flex items-center gap-2">
          <Mail className="text-indigo-400" />
          <h1 className="text-3xl font-bold">Contact</h1>
        </div>
        <p className="text-slate-400 text-sm">
          お問い合わせは下記フォーム（メールアプリが開きます）または各SNSからお気軽にどうぞ。
        </p>
      </motion.div>

      <motion.form
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        onSubmit={handleSubmit}
        className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4"
      >
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-medium text-slate-400">
            お名前
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm focus:outline-none focus:border-indigo-500"
            placeholder="山田 太郎"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="message" className="text-xs font-medium text-slate-400">
            メッセージ
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm focus:outline-none focus:border-indigo-500 resize-none"
            placeholder="お仕事のご相談やフィードバックなど"
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold transition-all"
        >
          <Send size={16} /> メールアプリで送信
        </button>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          ※ このフォームはサーバーを持たないため、送信ボタンを押すとお使いのメールソフトが開きます。
        </p>
      </motion.form>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="flex flex-wrap items-center gap-3 text-sm font-medium"
      >
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
        >
          {copied ? <Check size={16} className="text-emerald-400" /> : <Mail size={16} />}
          {copied ? 'コピーしました' : CONTACT_EMAIL}
        </button>
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
        >
          <Globe size={18} /> GitHub
        </a>
        <a
          href="https://x.com/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
        >
          <Globe size={18} /> X (Twitter)
        </a>
      </motion.div>
    </div>
  );
}
