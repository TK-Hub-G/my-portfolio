import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from './NavBar';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  // useOutlet() でその時点のページ要素を固定して受け取る（退場アニメ中の描画衝突を防ぐ）
  const element = useOutlet();

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <NavBar />

      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
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
