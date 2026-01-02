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
  return (
    <div className="min-h-screen bg-surface text-text-primary flex">
      <aside className="hidden md:flex w-64 flex-col gap-6 bg-[#0f172a] border-r border-white/5 px-4 py-6">
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
          <div>
            <p className="text-xs text-text-muted uppercase tracking-[0.18em]">Vite + React + TS</p>
            <p className="font-semibold">Admin Dashboard Starter</p>
          </div>
          <div className="text-sm text-text-muted">Mock API & Query ready</div>
        </header>

        <main className="flex-1 overflow-auto bg-surface px-4 py-6 md:px-8 md:py-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
