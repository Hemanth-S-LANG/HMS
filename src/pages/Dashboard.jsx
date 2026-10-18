import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2, Stethoscope, Clock, Settings, TrendingUp,
  CheckCircle2, XCircle, ArrowRight, Activity, Globe,
  Phone, IndianRupee, Timer, BarChart3, PieChart,
  AlertCircle, ChevronRight,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart as RPieChart, Pie, Cell, Legend,
} from 'recharts'
import { initialDepartments, initialServices, initialConsultationTypes, initialSettings } from '../data/mockData'
import StatCard from '../components/ui/StatCard'

// ── Derived data ──────────────────────────────────────────────────────────────
const depts    = initialDepartments
const services = initialServices
const ctypes   = initialConsultationTypes
const settings = initialSettings

const activeDepts    = depts.filter(d => d.status === 'active')
const inactiveDepts  = depts.filter(d => d.status === 'inactive')
const activeServices = services.filter(s => s.status === 'active')
const activeTypes    = ctypes.filter(t => t.status === 'active')
const activeLanguages = settings.languages.filter(l => l.status === 'active')
const openDays = settings.openingHours.filter(h => !h.isClosed)

// Services per department chart
const deptServiceData = activeDepts.map(d => ({
  name: d.name.length > 12 ? d.name.slice(0, 12) + '…' : d.name,
  services: services.filter(s => s.deptId === d.id).length,
})).sort((a, b) => b.services - a.services).slice(0, 8)

// Service type distribution
const typeDistribution = (() => {
  const counts = {}
  services.forEach(s => { counts[s.type] = (counts[s.type] || 0) + 1 })
  return Object.entries(counts).map(([name, value]) => ({ name, value }))
})()

const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981', '#06b6d4']

// Top services by fee
const topServices = [...services]
  .sort((a, b) => b.fee - a.fee)
  .slice(0, 5)

// Recent departments
const recentDepts = [...depts].slice(-4).reverse()

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-gray-900 text-white px-3 py-2 rounded-xl text-xs shadow-xl">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: <span className="font-bold">{p.value}</span></p>
        ))}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const totalFees = services.reduce((s, x) => s + x.fee, 0)
  const avgDuration = ctypes.length ? Math.round(ctypes.reduce((s, t) => s + t.defaultDuration, 0) / ctypes.length) : 0

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-white translate-y-1/2" />
        </div>
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-primary-200 text-sm font-medium mb-1">Module 3 — Departments & Settings</p>
              <h2 className="text-2xl font-bold mb-1">{settings.hospital.name}</h2>
              <p className="text-primary-200 text-sm">{settings.hospital.tagline}</p>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-1 text-right">
              <div className="text-xs text-primary-200">Registration</div>
              <div className="text-sm font-mono font-semibold">{settings.hospital.registrationNo}</div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              { icon: Phone, label: settings.hospital.phone },
              { icon: Globe, label: settings.hospital.website },
              { icon: Building2, label: `${settings.hospital.city}, ${settings.hospital.state}` },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-primary-100 bg-white/10 px-3 py-1.5 rounded-full">
                <Icon size={12} /> {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Departments"
          value={depts.length}
          trendLabel={`${activeDepts.length} active · ${inactiveDepts.length} inactive`}
          icon={Building2}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend="up"
        />
        <StatCard
          title="Total Services"
          value={services.length}
          trendLabel={`${activeServices.length} active`}
          icon={Stethoscope}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          trend="up"
        />
        <StatCard
          title="Consultation Types"
          value={ctypes.length}
          trendLabel={`${activeTypes.length} active · avg ${avgDuration} min`}
          icon={Clock}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Languages Supported"
          value={activeLanguages.length}
          trendLabel={`${openDays.length} days/week open`}
          icon={Globe}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          trend="up"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar chart: services per dept */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Services per Department</h3>
              <p className="text-xs text-gray-400 mt-0.5">Active departments ranked by service count</p>
            </div>
            <BarChart3 size={18} className="text-gray-300" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptServiceData} barSize={28} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="services" name="Services" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart: service type distribution */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Service Types</h3>
              <p className="text-xs text-gray-400 mt-0.5">Distribution by category</p>
            </div>
            <PieChart size={18} className="text-gray-300" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RPieChart>
              <Pie
                data={typeDistribution}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {typeDistribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              />
            </RPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top services by fee */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Top Services by Fee</h3>
            <Link to="/services" className="text-xs text-primary-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2.5">
            {topServices.map((svc, i) => {
              const dept = depts.find(d => d.id === svc.deptId)
              const maxFee = topServices[0].fee
              return (
                <div key={svc.id} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-300 w-4 flex-shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-gray-800 truncate">{svc.name}</p>
                      <span className="text-xs font-bold text-gray-900 ml-2 flex-shrink-0">₹{svc.fee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400"
                          style={{ width: `${(svc.fee / maxFee) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">{dept?.name.slice(0, 8) || '—'}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Consultation types quick view */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Consultation Types</h3>
            <Link to="/consultation" className="text-xs text-primary-600 hover:underline flex items-center gap-1">
              Manage <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {ctypes.map(ct => (
              <div key={ct.id} className={`flex items-center gap-3 p-3 rounded-xl border ${ct.status === 'active' ? 'border-gray-100 bg-gray-50/50' : 'border-gray-100 bg-gray-50 opacity-60'}`}>
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: ct.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{ct.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono">{ct.code}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                  <Timer size={11} className="text-gray-400" />
                  {ct.defaultDuration >= 60
                    ? `${Math.floor(ct.defaultDuration / 60)}h ${ct.defaultDuration % 60 > 0 ? `${ct.defaultDuration % 60}m` : ''}`
                    : `${ct.defaultDuration}m`}
                </div>
                {ct.status === 'active'
                  ? <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
                  : <XCircle size={13} className="text-gray-300 flex-shrink-0" />
                }
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent departments */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Departments Overview</h3>
            <Link to="/departments" className="text-xs text-primary-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="table-th pl-0">Name</th>
                  <th className="table-th hidden sm:table-cell">Head</th>
                  <th className="table-th hidden sm:table-cell">Services</th>
                  <th className="table-th">Status</th>
                  <th className="table-th text-right pr-0"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {depts.slice(0, 6).map(dept => (
                  <tr key={dept.id} className="hover:bg-gray-50/70">
                    <td className="table-td pl-0">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${dept.status === 'active' ? 'bg-primary-50' : 'bg-gray-100'}`}>
                          <Building2 size={13} className={dept.status === 'active' ? 'text-primary-600' : 'text-gray-400'} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{dept.name}</p>
                          <p className="text-[10px] font-mono text-gray-400">{dept.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-td hidden sm:table-cell text-xs text-gray-500">{dept.head || '—'}</td>
                    <td className="table-td hidden sm:table-cell">
                      <span className="text-xs font-bold text-gray-700">{dept.serviceCount}</span>
                    </td>
                    <td className="table-td">
                      {dept.status === 'active'
                        ? <span className="badge-active"><CheckCircle2 size={9} /> Active</span>
                        : <span className="badge-inactive"><XCircle size={9} /> Inactive</span>
                      }
                    </td>
                    <td className="table-td text-right pr-0">
                      <Link to="/departments" className="p-1.5 rounded-lg text-gray-300 hover:text-primary-600 hover:bg-primary-50 transition inline-flex">
                        <ChevronRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Opening hours + escalation */}
        <div className="flex flex-col gap-4">
          {/* Opening hours summary */}
          <div className="card p-5 flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Opening Hours</h3>
              <Link to="/settings" className="text-xs text-primary-600 hover:underline">Edit</Link>
            </div>
            <div className="space-y-1.5">
              {settings.openingHours.map(h => (
                <div key={h.day} className="flex items-center justify-between text-xs">
                  <span className={`font-medium ${h.isClosed ? 'text-gray-400' : 'text-gray-700'}`}>{h.day.slice(0, 3)}</span>
                  {h.isClosed
                    ? <span className="text-gray-400 italic">Closed</span>
                    : <span className="text-gray-600 font-mono">{h.open} – {h.close}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Escalation quick info */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Escalation</h3>
              <Link to="/settings" className="text-xs text-primary-600 hover:underline">Edit</Link>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Phone size={12} className="text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Primary</p>
                  <p className="text-xs font-semibold text-gray-800">{settings.escalation.primaryNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Phone size={12} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Secondary</p>
                  <p className="text-xs font-semibold text-gray-800">{settings.escalation.secondaryNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                <AlertCircle size={12} className="text-amber-500" />
                <p className="text-[10px] text-amber-600">SLA: {settings.escalation.responseTime} min response</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { to: '/departments',  icon: Building2,    label: 'Departments',       desc: `${depts.length} total`,           color: 'bg-blue-50 hover:bg-blue-100 border-blue-100',   iconColor: 'text-blue-600',   iconBg: 'bg-blue-100'   },
          { to: '/services',     icon: Stethoscope,  label: 'Services',          desc: `${services.length} total`,        color: 'bg-purple-50 hover:bg-purple-100 border-purple-100', iconColor: 'text-purple-600', iconBg: 'bg-purple-100' },
          { to: '/consultation', icon: Clock,        label: 'Consult. Types',    desc: `${ctypes.length} types`,          color: 'bg-amber-50 hover:bg-amber-100 border-amber-100', iconColor: 'text-amber-600',  iconBg: 'bg-amber-100'  },
          { to: '/settings',     icon: Settings,     label: 'Settings',          desc: 'Hospital config',                 color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-100', iconColor: 'text-emerald-600', iconBg: 'bg-emerald-100' },
        ].map(({ to, icon: Icon, label, desc, color, iconColor, iconBg }) => (
          <Link
            key={to}
            to={to}
            className={`card p-4 border flex items-center gap-3 transition-all ${color} group`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
              <Icon size={18} className={iconColor} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{label}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
            <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 ml-auto flex-shrink-0 transition" />
          </Link>
        ))}
      </div>
    </div>
  )
}
