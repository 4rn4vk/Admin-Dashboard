import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import reactLogo from '../assets/react.svg';

export interface NavItem {
  to: string;
  label: string;
}

interface LayoutProps {
  navLinks: NavItem[];
  headerTitle?: string;
  headerSubtitle?: string;
}

function Layout({
  navLinks,
  headerTitle = 'Vite + React + TS',
  headerSubtitle = 'Admin Dashboard Starter'
}: LayoutProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const closeNav = () => setIsNavOpen(false);

  return (
    <div
      className={`min-h-screen flex relative transition-colors duration-300 ${
        theme === 'dark' ? 'bg-surface text-text-primary' : 'bg-white text-black'
      }`}
    >
      {isNavOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={closeNav}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 flex flex-col gap-6 px-4 py-6 transform transition-transform duration-200 md:static md:translate-x-0 md:flex z-40 ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full'
        } ${theme === 'dark' ? 'bg-[#0f172a] border-r border-white/5 text-text-primary' : 'bg-white border-r border-gray-200 text-black'}`}
      >
        <div className="flex items-center gap-3">
          <img src={reactLogo} alt="Logo" className="h-10 w-10" />
          <div>
            <p className="text-sm text-text-muted">Admin</p>
            <p className="font-semibold">Dashboard</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Main">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeNav}
              className={({ isActive }) =>
                [
                  'px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition',
                  'hover:bg-white/5',
                  isActive ? 'bg-brand-600 text-surface shadow-panel' : 'text-text-muted'
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header
          className={`h-16 border-b px-4 md:px-6 flex items-center justify-between ${theme === 'dark' ? 'border-white/5 bg-[#0f172a] text-text-primary' : 'border-gray-200 bg-white text-black'}`}
        >
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <button
              type="button"
              className="md:hidden flex flex-col gap-1.5 justify-center rounded-md p-2 text-text-muted hover:text-white hover:bg-white/5 transition flex-shrink-0"
              onClick={() => setIsNavOpen(true)}
              aria-label="Open navigation"
            >
              <span className="block w-5 h-0.5 bg-current rounded" />
              <span className="block w-5 h-0.5 bg-current rounded" />
              <span className="block w-5 h-0.5 bg-current rounded" />
            </button>
            <div className="min-w-0">
              <p className="text-xs text-text-muted uppercase tracking-[0.18em]">{headerTitle}</p>
              <p className="font-semibold truncate">{headerSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="rounded px-3 py-1 border border-text-muted bg-transparent text-text-muted hover:bg-white/10 dark:hover:bg-black/10 transition"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
            <span className="text-sm text-text-muted hidden md:block flex-shrink-0">
              Mock API & Query ready
            </span>
          </div>
        </header>

        <main
          className={`flex-1 overflow-auto ${theme === 'dark' ? 'bg-surface' : 'bg-white'} px-4 py-6 md:px-8 md:py-8`}
        >
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
