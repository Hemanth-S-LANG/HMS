import { useState, useMemo } from 'react'
import {
  Stethoscope, Plus, Pencil, Trash2, ChevronDown,
  CheckCircle2, XCircle, IndianRupee, Clock, Filter,
} from 'lucide-react'
import { initialServices, initialDepartments } from '../data/mockData'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import Toggle from '../components/ui/Toggle'
import EmptyState from '../components/ui/EmptyState'
import SearchBar from '../components/ui/SearchBar'

const SERVICE_TYPES = ['Consultation', 'Diagnostic', 'Procedure', 'Surgery', 'Therapy', 'Other']
const EMPTY_FORM = { deptId: '', name: '', code: '', type: 'Consultation', fee: '', duration: '', status: 'active' }

function ServiceForm({ form, setForm, onSubmit, onCancel, isEdit, departments }) {
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit() }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="label">Department <span className="text-red-500">*</span></label>
          <div className="relative">
            <select
              required
              value={form.deptId}
              onChange={e => setForm(f => ({ ...f, deptId: e.target.value }))}
              className="input appearance-none pr-8"
            >
              <option value="">Select department…</option>
              {departments.filter(d => d.status === 'active').map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="label">Service Name <span className="text-red-500">*</span></label>
          <input required className="input" placeholder="e.g. ECG" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="label">Service Code <span className="text-red-500">*</span></label>
          <input required className="input uppercase" placeholder="e.g. ECG-01" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="label">Type <span className="text-red-500">*</span></label>
          <div className="relative">
            <select required value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="input appearance-none pr-8">
              {SERVICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="label">Duration (minutes) <span className="text-red-500">*</span></label>
          <input required type="number" min="5" max="480" className="input" placeholder="e.g. 30" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
        </div>
        <div className="col-span-2">
          <label className="label">Fee (₹) <span className="text-red-500">*</span></label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
            <input required type="number" min="0" className="input pl-7" placeholder="e.g. 1200" value={form.fee} onChange={e => setForm(f => ({ ...f, fee: e.target.value }))} />
          </div>
        </div>
        <div className="col-span-2 flex items-center gap-3">
          <Toggle checked={form.status === 'active'} onChange={v => setForm(f => ({ ...f, status: v ? 'active' : 'inactive' }))} />
          <span className="text-sm text-gray-600">{form.status === 'active' ? 'Active' : 'Inactive'}</span>
        </div>
      </div>
      <div className="flex gap-3 pt-2 border-t border-gray-100">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 justify-center">Cancel</button>
        <button type="submit" className="btn-primary flex-1 justify-center">{isEdit ? 'Save changes' : 'Add service'}</button>
      </div>
    </form>
  )
}

const TYPE_COLORS = {
  Consultation: 'badge-blue',
  Diagnostic:   'badge-purple',
  Procedure:    'badge-orange',
  Surgery:      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200',
  Therapy:      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200',
  Other:        'badge-inactive',
}

export default function Services() {
  const [departments]            = useState(initialDepartments)
  const [services, setServices]  = useState(initialServices)
  const [search, setSearch]      = useState('')
  const [filterDept, setFilterDept] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [modalOpen, setModalOpen]  = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm]            = useState(EMPTY_FORM)

  const deptMap = useMemo(() => Object.fromEntries(departments.map(d => [d.id, d.name])), [departments])

  const filtered = useMemo(() => {
    let list = [...services]
    if (search)                 list = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase()))
    if (filterDept !== 'all')   list = list.filter(s => s.deptId === filterDept)
    if (filterType !== 'all')   list = list.filter(s => s.type === filterType)
    if (filterStatus !== 'all') list = list.filter(s => s.status === filterStatus)
    return list.sort((a, b) => a.name.localeCompare(b.name))
  }, [services, search, filterDept, filterType, filterStatus])

  const openAdd  = () => { setForm(EMPTY_FORM); setEditTarget(null); setModalOpen(true) }
  const openEdit = (svc) => { setForm({ ...svc, fee: String(svc.fee), duration: String(svc.duration) }); setEditTarget(svc.id); setModalOpen(true) }

  const handleSubmit = () => {
    const payload = { ...form, fee: Number(form.fee), duration: Number(form.duration) }
    if (editTarget) {
      setServices(s => s.map(x => x.id === editTarget ? { ...x, ...payload } : x))
    } else {
      setServices(s => [...s, { ...payload, id: `svc-${Date.now()}` }])
    }
    setModalOpen(false)
  }

  const handleDelete = () => setServices(s => s.filter(x => x.id !== deleteTarget.id))
  const toggleStatus = (id) => setServices(s => s.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x))

  const activeCount = services.filter(s => s.status === 'active').length

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">Services</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage clinical services, fees and durations across departments.</p>
        </div>
        <button onClick={openAdd} className="btn-primary self-start sm:self-auto">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Total', value: services.length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { label: 'Active', value: activeCount, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
          { label: 'Inactive', value: services.length - activeCount, color: 'bg-gray-100 text-gray-500 border-gray-200' },
        ].map(p => (
          <div key={p.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${p.color}`}>
            {p.label}: <span className="font-bold">{p.value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3 flex-wrap">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or code…" />
        <div className="flex gap-2 flex-wrap sm:ml-auto">
          {[
            { value: filterDept, set: setFilterDept, options: [['all', 'All Departments'], ...departments.map(d => [d.id, d.name])] },
            { value: filterType, set: setFilterType, options: [['all', 'All Types'], ...SERVICE_TYPES.map(t => [t, t])] },
            { value: filterStatus, set: setFilterStatus, options: [['all', 'All Status'], ['active', 'Active'], ['inactive', 'Inactive']] },
          ].map((f, i) => (
            <div key={i} className="relative">
              <select
                value={f.value}
                onChange={e => f.set(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                {f.options.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Stethoscope}
            title="No services found"
            description="Try adjusting your filters or add a new service."
            action={<button onClick={openAdd} className="btn-primary"><Plus size={15} /> Add Service</button>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="table-th">Service</th>
                  <th className="table-th hidden sm:table-cell">Code</th>
                  <th className="table-th hidden md:table-cell">Department</th>
                  <th className="table-th">Type</th>
                  <th className="table-th hidden sm:table-cell">Duration</th>
                  <th className="table-th hidden sm:table-cell">Fee</th>
                  <th className="table-th">Status</th>
                  <th className="table-th text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(svc => (
                  <tr key={svc.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="table-td">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${svc.status === 'active' ? 'bg-purple-50' : 'bg-gray-100'}`}>
                          <Stethoscope size={14} className={svc.status === 'active' ? 'text-purple-600' : 'text-gray-400'} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{svc.name}</p>
                          <p className="text-xs text-gray-400 md:hidden">{deptMap[svc.deptId]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-td hidden sm:table-cell">
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-600">{svc.code}</span>
                    </td>
                    <td className="table-td hidden md:table-cell text-gray-600 text-sm">{deptMap[svc.deptId]}</td>
                    <td className="table-td">
                      <span className={TYPE_COLORS[svc.type] || 'badge-inactive'}>{svc.type}</span>
                    </td>
                    <td className="table-td hidden sm:table-cell">
                      <div className="flex items-center gap-1 text-gray-600 text-xs">
                        <Clock size={12} className="text-gray-400" /> {svc.duration} min
                      </div>
                    </td>
                    <td className="table-td hidden sm:table-cell">
                      <span className="font-semibold text-gray-800 text-sm">₹{svc.fee.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="table-td">
                      <Toggle checked={svc.status === 'active'} onChange={() => toggleStatus(svc.id)} />
                    </td>
                    <td className="table-td text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(svc)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition" title="Edit">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => setDeleteTarget(svc)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">Showing {filtered.length} of {services.length} services</p>
            </div>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Service' : 'Add New Service'} size="md">
        <ServiceForm form={form} setForm={setForm} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} isEdit={!!editTarget} departments={departments} />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
      />
    </div>
  )
}
