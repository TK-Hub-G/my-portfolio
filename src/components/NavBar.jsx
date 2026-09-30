import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { site } from '../data/site';

// メニュー項目。並べ替え・追加・削除はこの配列を編集するだけ
const NAV_ITEMS = [
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/typing-game', label: 'Typing Game' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur border-b border-line">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="text-[15px] font-medium tracking-tight hover:opacity-70 transition-opacity"
        >
          {site.name}
        </Link>

        <nav className="hidden sm:flex items-center gap-7 text-sm">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `font-medium transition-colors ${isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="font-semibold text-accent hover:opacity-70 transition-opacity"
          >
            Contact
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden -mr-1 p-1 text-ink"
          aria-label="メニューを開閉する"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden overflow-hidden border-t border-line"
          >
            <div className="px-6 py-4 flex flex-col gap-4 text-sm">
              {[...NAV_ITEMS, { to: '/contact', label: 'Contact' }].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    item.to === '/contact'
                      ? 'font-semibold text-accent'
                      : `font-medium ${isActive ? 'text-ink' : 'text-ink-2'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
