import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Stethoscope,
  Clock,
  Settings,
  ChevronLeft,
  ChevronRight,
  Hospital,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  HelpCircle,
} from 'lucide-react'

const navItems = [
  { to: '/',               icon: LayoutDashboard, label: 'Dashboard'           },
  { to: '/departments',    icon: Building2,       label: 'Departments'         },
  { to: '/services',       icon: Stethoscope,     label: 'Services'            },
  { to: '/consultation',   icon: Clock,           label: 'Consultation Types'  },
  { to: '/settings',       icon: Settings,        label: 'Settings'            },
]

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()

  const currentPage = navItems.find(n => n.to === location.pathname)?.label || 'Dashboard'

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
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
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
            <Hospital size={20} className="text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold leading-none text-white truncate">Advifiction HMS</p>
              <p className="text-[10px] text-white/50 mt-0.5">Hospital Management</p>
            </div>
          )}
        </div>

        {/* Module label */}
        {!collapsed && (
          <div className="px-4 pt-5 pb-2">
            <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">Module 3</p>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative
                ${isActive
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/30'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
                }
                ${collapsed ? 'justify-center' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
                  {!collapsed && <span className="truncate">{label}</span>}
                  {collapsed && (
                    <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                      {label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-white/10 space-y-0.5">
          <button
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:bg-white/10 hover:text-white text-sm transition ${collapsed ? 'justify-center' : ''}`}
          >
            <HelpCircle size={18} className="flex-shrink-0" />
            {!collapsed && <span>Help & Support</span>}
          </button>

          {/* Collapse toggle — desktop only */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:bg-white/10 hover:text-white text-sm transition ${collapsed ? 'justify-center' : ''}`}
          >
            {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span>Collapse</span></>}
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center gap-4 px-4 lg:px-6 flex-shrink-0 shadow-sm">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Page title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-gray-900 truncate">{currentPage}</h1>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition hidden sm:flex">
              <Search size={18} />
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">AD</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-gray-800 leading-none">Admin</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Super Admin</p>
                </div>
                <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                  <button className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User size={15} className="text-gray-400" /> Profile
                  </button>
                  <button className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings size={15} className="text-gray-400" /> Preferences
                  </button>
                  <div className="my-1 border-t border-gray-100" />
                  <button className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={15} /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
