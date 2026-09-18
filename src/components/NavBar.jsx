import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/typing-game', label: 'Typing Game' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function navLinkClass({ isActive }) {
  return [
    'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
    isActive
      ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent',
  ].join(' ');
}

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-bold text-slate-100" onClick={() => setOpen(false)}>
          <Terminal size={20} className="text-indigo-400" />
          Portfolio
        </NavLink>

        <nav className="hidden sm:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800/60"
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
            className="sm:hidden overflow-hidden border-t border-slate-800/80"
          >
            <div className="px-6 py-3 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
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
