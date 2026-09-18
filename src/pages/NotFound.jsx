import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-24 pb-20 text-center space-y-6">
      <h1 className="text-6xl font-extrabold text-slate-700">404</h1>
      <p className="text-slate-400">お探しのページは見つかりませんでした。</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold transition-all"
      >
        <ArrowLeft size={16} /> トップに戻る
      </Link>
    </div>
  );
}
