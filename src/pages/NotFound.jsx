import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 sm:px-10 pt-28 pb-20">
      <p className="text-8xl font-bold tracking-tight text-ink">404</p>
      <p className="mt-6 font-jp text-lg text-ink-2">お探しのページは見つかりませんでした。</p>
      <Link
        to="/"
        className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        トップに戻る
      </Link>
    </div>
  );
}
