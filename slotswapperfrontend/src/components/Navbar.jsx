import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Logo from './ui/Logo'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  const navClass = (path, compact = false) =>
    `${compact ? 'block w-full' : ''} px-4 py-2 text-sm font-medium transition-colors ${
      loc.pathname === path 
        ? 'text-blue-600 border-b-2 border-blue-600' 
        : 'text-slate-600 hover:text-slate-900'
    }`

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <Logo textClass="font-semibold text-slate-900 text-lg" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link to="/" className={navClass('/')}>Dashboard</Link>
          <Link to="/requests" className={navClass('/requests')}>Requests</Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 md:inline">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            Online
          </span>
          <span className="hidden text-sm text-slate-700 md:inline">{user?.name}</span>
          <button 
            onClick={logout} 
            className="hidden md:inline rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Sign out
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-3">
            <Link to="/" onClick={() => setOpen(false)} className={navClass('/', true)}>Dashboard</Link>
            <Link to="/requests" onClick={() => setOpen(false)} className={navClass('/requests', true)}>Requests</Link>
            <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
              <div className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">{user?.name}</div>
              <button 
                onClick={logout} 
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


