import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Building2, Stethoscope, Clock, Settings,
  ChevronLeft, ChevronRight, Hospital, Bell, Search,
  Menu, X, ChevronDown, User, LogOut, HelpCircle,
} from 'lucide-react'

const navItems = [
  { to: '/',             icon: LayoutDashboard, label: 'Dashboard'          },
  { to: '/departments',  icon: Building2,       label: 'Departments'        },
  { to: '/services',     icon: Stethoscope,     label: 'Services'           },
  { to: '/consultation', icon: Clock,           label: 'Consultation Types' },
  { to: '/settings',     icon: Settings,        label: 'Settings'           },
]

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed]     = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const currentPage = navItems.find(n => n.to === location.pathname)?.label || 'Dashboard'

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed lg:relative z-50 lg:z-auto inset-y-0 left-0 flex flex-col
          bg-sidebar text-white transition-all duration-300 ease-in-out
          ${collapsed ? 'w-[72px]' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 flex-shrink-0 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
            <Hospital size={20} className="text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold leading-none text-white truncate">Advifiction HMS</p>
              <p className="text-[10px] text-white/50 mt-0.5">Hospital Management</p>
            </div>
          )}
          {/* Close button — mobile only */}
          {!collapsed && (
            <button
              className="lg:hidden ml-auto p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition"
              onClick={() => setMobileOpen(false)}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Module label */}
        {!collapsed && (
          <div className="px-4 pt-5 pb-2">
            <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">Module 3</p>
          </div>
        )}

        {/* Nav items — scrollable */}
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 lg:py-2.5 rounded-xl text-sm font-medium
                 transition-all duration-150 group relative
                 ${isActive
                   ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/30'
                   : 'text-white/60 hover:bg-white/10 hover:text-white'
                 }
                 ${collapsed ? 'justify-center' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={19} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
                  {!collapsed && <span className="truncate">{label}</span>}
                  {/* Tooltip when collapsed (desktop) */}
                  {collapsed && (
                    <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-800 text-white text-xs rounded-lg
                                    opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                      {label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-white/10 space-y-0.5 flex-shrink-0">
          <button
            className={`w-full flex items-center gap-3 px-3 py-3 lg:py-2.5 rounded-xl
                        text-white/60 hover:bg-white/10 hover:text-white text-sm transition
                        ${collapsed ? 'justify-center' : ''}`}
          >
            <HelpCircle size={19} className="flex-shrink-0" />
            {!collapsed && <span>Help & Support</span>}
          </button>

          {/* Collapse toggle — desktop only */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-xl
                        text-white/40 hover:bg-white/10 hover:text-white text-sm transition
                        ${collapsed ? 'justify-center' : ''}`}
          >
            {collapsed
              ? <ChevronRight size={18} />
              : <><ChevronLeft size={18} /><span>Collapse</span></>
            }
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top header */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center gap-2 sm:gap-4 px-3 sm:px-4 lg:px-6 flex-shrink-0 shadow-sm">
          {/* Hamburger — mobile/tablet only */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition flex-shrink-0"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Page title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{currentPage}</h1>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search — hidden on xs, shown sm+ */}
            <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition">
              <Search size={18} />
            </button>

            {/* Notifications */}
            <button className="relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 pl-1 pr-2 sm:pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">AD</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-gray-800 leading-none">Admin</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Super Admin</p>
                </div>
                <ChevronDown size={13} className="text-gray-400 hidden sm:block" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                    <button className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      <User size={15} className="text-gray-400" /> Profile
                    </button>
                    <button className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      <Settings size={15} className="text-gray-400" /> Preferences
                    </button>
                    <div className="my-1 border-t border-gray-100" />
                    <button className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50">
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content — extra bottom padding on mobile for the bottom nav */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 pb-20 lg:pb-6">
          {children}
        </main>
      </div>

      {/* ── Mobile bottom nav bar ── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-gray-200 flex items-stretch shadow-lg">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors
               ${isActive ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all
                  ${isActive ? 'bg-primary-50' : ''}`}>
                  <Icon size={19} />
                </div>
                <span className="truncate w-full text-center px-0.5 leading-none">
                  {label === 'Consultation Types' ? 'Consult.' : label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

    </div>
  )
}
