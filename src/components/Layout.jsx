import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from './NavBar';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  // useOutlet() でその時点のページ要素を固定して受け取る。
  // <Outlet/> のままだと退場アニメーション中のラッパーの中身まで
  // 新しいページに差し替わってしまい、遷移が二重に見えたり
  // レンダリングが衝突して真っ白になる原因になる。
  const element = useOutlet();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <NavBar />

      <main className="flex-1 relative z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {element}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
