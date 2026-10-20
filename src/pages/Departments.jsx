import { useState, useMemo } from 'react'
import {
  Building2, Plus, Pencil, Trash2,
  ChevronDown, Stethoscope, MapPin,
  CheckCircle2, XCircle,
} from 'lucide-react'
import { initialDepartments } from '../data/mockData'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import Toggle from '../components/ui/Toggle'
import EmptyState from '../components/ui/EmptyState'
import SearchBar from '../components/ui/SearchBar'

const EMPTY_FORM = { name: '', code: '', head: '', floor: '', description: '', status: 'active' }

function DeptForm({ form, setForm, onSubmit, onCancel, isEdit }) {
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit() }} className="space-y-4">
      {/* All fields full-width on mobile, 2-col on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Department Name <span className="text-red-500">*</span></label>
          <input required className="input" placeholder="e.g. Cardiology"
            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div>
          <label className="label">Department Code <span className="text-red-500">*</span></label>
          <input required className="input uppercase" placeholder="e.g. CARD"
            value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} />
        </div>
        <div>
          <label className="label">Head of Department</label>
          <input className="input" placeholder="e.g. Dr. Arjun Mehta"
            value={form.head} onChange={e => setForm(f => ({ ...f, head: e.target.value }))} />
        </div>
        <div>
          <label className="label">Floor / Location</label>
          <input className="input" placeholder="e.g. 3rd Floor"
            value={form.floor} onChange={e => setForm(f => ({ ...f, floor: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Description</label>
          <textarea rows={3} className="input resize-none" placeholder="Brief description of this department…"
            value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        </div>
        <div className="sm:col-span-2 flex items-center gap-3">
          <Toggle checked={form.status === 'active'} onChange={v => setForm(f => ({ ...f, status: v ? 'active' : 'inactive' }))} />
          <span className="text-sm text-gray-600">
            {form.status === 'active' ? 'Active — visible to staff' : 'Inactive — hidden from staff'}
          </span>
        </div>
      </div>
      <div className="flex gap-3 pt-2 border-t border-gray-100">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">Cancel</button>
        <button type="submit" className="btn-primary flex-1">{isEdit ? 'Save changes' : 'Add department'}</button>
      </div>
    </form>
  )
}

export default function Departments() {
  const [departments, setDepartments] = useState(initialDepartments)
  const [search, setSearch]           = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy]           = useState('name')
  const [modalOpen, setModalOpen]     = useState(false)
  const [editTarget, setEditTarget]   = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [viewTarget, setViewTarget]   = useState(null)
  const [form, setForm]               = useState(EMPTY_FORM)

  const filtered = useMemo(() => {
    let list = [...departments]
    const q = search.toLowerCase()
    if (q) list = list.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.code.toLowerCase().includes(q) ||
      d.head.toLowerCase().includes(q)
    )
    if (filterStatus !== 'all') list = list.filter(d => d.status === filterStatus)
    list.sort((a, b) => {
      if (sortBy === 'name')     return a.name.localeCompare(b.name)
      if (sortBy === 'code')     return a.code.localeCompare(b.code)
      if (sortBy === 'services') return b.serviceCount - a.serviceCount
      return 0
    })
    return list
  }, [departments, search, filterStatus, sortBy])

  const openAdd  = () => { setForm(EMPTY_FORM); setEditTarget(null); setModalOpen(true) }
  const openEdit = (dept) => { setForm({ ...dept }); setEditTarget(dept.id); setModalOpen(true) }

  const handleSubmit = () => {
    if (editTarget) setDepartments(d => d.map(x => x.id === editTarget ? { ...x, ...form } : x))
    else            setDepartments(d => [...d, { ...form, id: `dept-${Date.now()}`, serviceCount: 0 }])
    setModalOpen(false)
  }

  const handleDelete  = () => setDepartments(d => d.filter(x => x.id !== deleteTarget.id))
  const toggleStatus  = id  => setDepartments(d => d.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x))

  const activeCount   = departments.filter(d => d.status === 'active').length
  const inactiveCount = departments.length - activeCount

  return (
    <div className="space-y-4 sm:space-y-5">

      {/* Page header */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Departments</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 hidden sm:block">
            Manage hospital departments, heads and their status.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary flex-shrink-0">
          <Plus size={15} /> <span className="hidden sm:inline">Add Department</span><span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Total',    value: departments.length, color: 'bg-blue-50    text-blue-700    border-blue-200'    },
          { label: 'Active',   value: activeCount,        color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
          { label: 'Inactive', value: inactiveCount,      color: 'bg-gray-100   text-gray-500    border-gray-200'    },
        ].map(p => (
          <div key={p.label} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border ${p.color}`}>
            {p.label}: <span className="font-bold">{p.value}</span>
          </div>
        ))}
      </div>

      {/* Filters — SearchBar full-width on mobile, inline on sm+ */}
      <div className="card p-3 sm:p-4 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search departments…" />
        {/* Filter selects scroll horizontally on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-0.5 sm:pb-0 sm:ml-auto">
          {[
            { value: filterStatus, set: setFilterStatus, opts: [['all','All Status'],['active','Active'],['inactive','Inactive']] },
            { value: sortBy,       set: setSortBy,       opts: [['name','Sort: Name'],['code','Sort: Code'],['services','Sort: Services']] },
          ].map((f, i) => (
            <div key={i} className="relative flex-shrink-0">
              <select
                value={f.value} onChange={e => f.set(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2.5 text-sm border border-gray-200 rounded-xl
                           bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No departments found"
            description="Try adjusting your search or filters."
            action={<button onClick={openAdd} className="btn-primary"><Plus size={15} /> Add Department</button>}
          />
        ) : (
          <>
            {/* ── Mobile card list (< sm) ── */}
            <div className="sm:hidden divide-y divide-gray-50">
              {filtered.map(dept => (
                <div key={dept.id} className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${dept.status === 'active' ? 'bg-primary-50' : 'bg-gray-100'}`}>
                    <Building2 size={18} className={dept.status === 'active' ? 'text-primary-600' : 'text-gray-400'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-gray-900 truncate">{dept.name}</p>
                      <span className="font-mono text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 flex-shrink-0">
                        {dept.code}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{dept.head || 'No head assigned'}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className={`text-[10px] font-medium ${dept.status === 'active' ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {dept.status === 'active' ? '● Active' : '● Inactive'}
                      </span>
                      {dept.floor && (
                        <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                          <MapPin size={9} />{dept.floor}
                        </span>
                      )}
                      <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                        <Stethoscope size={9} />{dept.serviceCount} services
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <Toggle checked={dept.status === 'active'} onChange={() => toggleStatus(dept.id)} />
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(dept)}
                        className="w-8 h-8 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition flex items-center justify-center">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteTarget(dept)}
                        className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition flex items-center justify-center">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Desktop table (sm+) ── */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="table-th">Department</th>
                    <th className="table-th">Code</th>
                    <th className="table-th hidden md:table-cell">Head</th>
                    <th className="table-th hidden lg:table-cell">Floor</th>
                    <th className="table-th hidden md:table-cell">Services</th>
                    <th className="table-th">Status</th>
                    <th className="table-th text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(dept => (
                    <tr key={dept.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="table-td">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                            ${dept.status === 'active' ? 'bg-primary-50' : 'bg-gray-100'}`}>
                            <Building2 size={16} className={dept.status === 'active' ? 'text-primary-600' : 'text-gray-400'} />
                          </div>
                          <p className="font-medium text-gray-900 text-sm">{dept.name}</p>
                        </div>
                      </td>
                      <td className="table-td">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-600">{dept.code}</span>
                      </td>
                      <td className="table-td hidden md:table-cell text-gray-600">{dept.head || '—'}</td>
                      <td className="table-td hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <MapPin size={12} /> {dept.floor || '—'}
                        </div>
                      </td>
                      <td className="table-td hidden md:table-cell">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Stethoscope size={12} className="text-gray-400" />
                          <span className="font-medium">{dept.serviceCount}</span>
                        </div>
                      </td>
                      <td className="table-td">
                        <div className="flex items-center gap-2">
                          <Toggle checked={dept.status === 'active'} onChange={() => toggleStatus(dept.id)} />
                          <span className={`text-xs font-medium hidden lg:inline ${dept.status === 'active' ? 'text-emerald-600' : 'text-gray-400'}`}>
                            {dept.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="table-td text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setViewTarget(dept)}
                            className="px-2 py-1 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition text-xs font-medium">
                            View
                          </button>
                          <button onClick={() => openEdit(dept)}
                            className="w-8 h-8 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition flex items-center justify-center">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => setDeleteTarget(dept)}
                            className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition flex items-center justify-center">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">Showing {filtered.length} of {departments.length} departments</p>
            </div>
          </>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}
        title={editTarget ? 'Edit Department' : 'Add New Department'} size="md">
        <DeptForm form={form} setForm={setForm} onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)} isEdit={!!editTarget} />
      </Modal>

      {/* View Modal */}
      <Modal open={!!viewTarget} onClose={() => setViewTarget(null)} title="Department Details" size="md">
        {viewTarget && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <Building2 size={22} className="text-primary-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">{viewTarget.name}</h3>
                <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{viewTarget.code}</span>
              </div>
              <div className="ml-auto flex-shrink-0">
                {viewTarget.status === 'active'
                  ? <span className="badge-active"><CheckCircle2 size={11} /> Active</span>
                  : <span className="badge-inactive"><XCircle    size={11} /> Inactive</span>
                }
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: 'Head of Dept', value: viewTarget.head       || '—' },
                { label: 'Floor',        value: viewTarget.floor      || '—' },
                { label: 'Services',     value: viewTarget.serviceCount       },
              ].map(item => (
                <div key={item.label} className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                  <p className="font-medium text-gray-800 text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            {viewTarget.description && (
              <div className="p-3 bg-gray-50 rounded-xl text-sm text-gray-600 leading-relaxed">
                {viewTarget.description}
              </div>
            )}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button onClick={() => { setViewTarget(null); openEdit(viewTarget) }} className="btn-secondary flex-1">
                <Pencil size={14} /> Edit
              </button>
              <button onClick={() => setViewTarget(null)} className="btn-primary flex-1">Close</button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete}
        title="Delete Department"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  )
}
