import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import reactLogo from '../assets/react.svg';

export interface NavItem {
  to: string;
  label: string;
}

interface LayoutProps {
  navLinks: NavItem[];
}

function Layout({ navLinks }: LayoutProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const closeNav = () => setIsNavOpen(false);

  return (
    <div className="min-h-screen bg-surface text-text-primary flex relative">
      {isNavOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={closeNav}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 flex flex-col gap-6 bg-[#0f172a] border-r border-white/5 px-4 py-6 transform transition-transform duration-200 md:static md:translate-x-0 md:flex z-40 ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
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
        <header className="h-14 border-b border-white/5 px-4 md:px-6 flex items-center justify-between bg-[#0f172a]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-text-muted hover:text-white hover:bg-white/5 transition"
              onClick={() => setIsNavOpen(true)}
              aria-label="Open navigation"
            >
              <span className="block w-5 border-t border-current" />
              <span className="block w-5 border-t border-current mt-1.5" />
              <span className="block w-5 border-t border-current mt-1.5" />
            </button>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-[0.18em]">
                Vite + React + TS
              </p>
              <p className="font-semibold">Admin Dashboard Starter</p>
            </div>
          </div>
          <div className="text-sm text-text-muted">Mock API & Query ready</div>
        </header>

        <main className="flex-1 overflow-auto bg-surface px-4 py-6 md:px-8 md:py-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {!isNavOpen && (
        <button
          type="button"
          className="md:hidden fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-brand-600 text-surface px-4 py-2 shadow-lg shadow-brand-600/40 hover:bg-brand-500 transition"
          onClick={() => setIsNavOpen(true)}
          aria-label="Open navigation"
        >
          <span className="block w-4 border-t border-current" />
          <span className="block w-4 border-t border-current" />
          <span className="block w-4 border-t border-current" />
          <span className="text-sm font-semibold">Menu</span>
        </button>
      )}
    </div>
  );
}

export default Layout;
