import { useState, useMemo } from 'react'
import {
  Clock, Plus, Pencil, Trash2, ChevronDown,
  CheckCircle2, XCircle, Timer, Palette,
} from 'lucide-react'
import { initialConsultationTypes } from '../data/mockData'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import Toggle from '../components/ui/Toggle'
import EmptyState from '../components/ui/EmptyState'
import SearchBar from '../components/ui/SearchBar'

const PRESET_COLORS = [
  '#3b82f6','#10b981','#ef4444','#8b5cf6','#f59e0b',
  '#06b6d4','#ec4899','#14b8a6','#f97316','#6366f1',
]

const EMPTY_FORM = {
  name: '', code: '', defaultDuration: 30, color: '#3b82f6', description: '', status: 'active',
}

function ConsultForm({ form, setForm, onSubmit, onCancel, isEdit }) {
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit() }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className="label">Type Name <span className="text-red-500">*</span></label>
          <input required className="input" placeholder="e.g. Follow-up" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="label">Code <span className="text-red-500">*</span></label>
          <input required className="input uppercase" placeholder="e.g. FOLLOWUP" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} />
        </div>
        <div className="col-span-2">
          <label className="label">Default Duration (minutes) <span className="text-red-500">*</span></label>
          <div className="flex items-center gap-3">
            <input
              required
              type="range"
              min="5"
              max="180"
              step="5"
              value={form.defaultDuration}
              onChange={e => setForm(f => ({ ...f, defaultDuration: Number(e.target.value) }))}
              className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary-600"
            />
            <div className="w-20 flex-shrink-0">
              <input
                type="number"
                min="5"
                max="480"
                value={form.defaultDuration}
                onChange={e => setForm(f => ({ ...f, defaultDuration: Number(e.target.value) }))}
                className="input text-center font-bold"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {form.defaultDuration < 60
              ? `${form.defaultDuration} min`
              : `${Math.floor(form.defaultDuration / 60)}h ${form.defaultDuration % 60 > 0 ? `${form.defaultDuration % 60}m` : ''}`
            }
          </p>
        </div>
        <div className="col-span-2">
          <label className="label">Colour</label>
          <div className="flex flex-wrap gap-2">
            {PRESET_COLORS.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setForm(f => ({ ...f, color: c }))}
                className={`w-8 h-8 rounded-full transition-all ${form.color === c ? 'ring-2 ring-offset-2 ring-gray-700 scale-110' : 'hover:scale-105'}`}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
            <label className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition relative overflow-hidden" title="Custom colour">
              <Palette size={14} className="text-gray-400" />
              <input
                type="color"
                value={form.color}
                onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </label>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: form.color }} />
            <span className="text-xs text-gray-500 font-mono">{form.color}</span>
          </div>
        </div>
        <div className="col-span-2">
          <label className="label">Description</label>
          <textarea rows={2} className="input resize-none" placeholder="Brief description…" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        </div>
        <div className="col-span-2 flex items-center gap-3">
          <Toggle checked={form.status === 'active'} onChange={v => setForm(f => ({ ...f, status: v ? 'active' : 'inactive' }))} />
          <span className="text-sm text-gray-600">{form.status === 'active' ? 'Active' : 'Inactive'}</span>
        </div>
      </div>
      <div className="flex gap-3 pt-2 border-t border-gray-100">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 justify-center">Cancel</button>
        <button type="submit" className="btn-primary flex-1 justify-center">{isEdit ? 'Save changes' : 'Add type'}</button>
      </div>
    </form>
  )
}

export default function ConsultationTypes() {
  const [types, setTypes]     = useState(initialConsultationTypes)
  const [search, setSearch]   = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm]       = useState(EMPTY_FORM)

  const filtered = useMemo(() => {
    let list = [...types]
    if (search)                 list = list.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.code.toLowerCase().includes(search.toLowerCase()))
    if (filterStatus !== 'all') list = list.filter(t => t.status === filterStatus)
    return list.sort((a, b) => a.name.localeCompare(b.name))
  }, [types, search, filterStatus])

  const openAdd  = () => { setForm(EMPTY_FORM); setEditTarget(null); setModalOpen(true) }
  const openEdit = (t) => { setForm({ ...t }); setEditTarget(t.id); setModalOpen(true) }

  const handleSubmit = () => {
    if (editTarget) {
      setTypes(ts => ts.map(x => x.id === editTarget ? { ...x, ...form } : x))
    } else {
      setTypes(ts => [...ts, { ...form, id: `ct-${Date.now()}` }])
    }
    setModalOpen(false)
  }

  const handleDelete = () => setTypes(ts => ts.filter(x => x.id !== deleteTarget.id))
  const toggleStatus = (id) => setTypes(ts => ts.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x))

  const avgDuration = types.length ? Math.round(types.reduce((s, t) => s + t.defaultDuration, 0) / types.length) : 0

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">Consultation Types</h2>
          <p className="text-sm text-gray-500 mt-0.5">Define consultation categories, default durations and colour codes.</p>
        </div>
        <button onClick={openAdd} className="btn-primary self-start sm:self-auto">
          <Plus size={16} /> Add Type
        </button>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Total types', value: types.length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { label: 'Active', value: types.filter(t => t.status === 'active').length, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
          { label: 'Avg duration', value: `${avgDuration} min`, color: 'bg-purple-50 text-purple-700 border-purple-200' },
        ].map(p => (
          <div key={p.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${p.color}`}>
            {p.label}: <span className="font-bold">{p.value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or code…" />
        <div className="relative sm:ml-auto">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={Clock}
            title="No consultation types found"
            description="Try adjusting your search or add a new type."
            action={<button onClick={openAdd} className="btn-primary"><Plus size={15} /> Add Type</button>}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(ct => (
            <div key={ct.id} className={`card p-5 flex flex-col gap-3 transition-all hover:shadow-md ${ct.status === 'inactive' ? 'opacity-60' : ''}`}>
              {/* Colour bar */}
              <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: ct.color }} />
              
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{ct.name}</h3>
                  <span className="font-mono text-xs text-gray-400">{ct.code}</span>
                </div>
                <div className="flex-shrink-0 flex gap-1">
                  <button onClick={() => openEdit(ct)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => setDeleteTarget(ct)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Duration badge */}
              <div className="flex items-center gap-2 py-2.5 px-3 rounded-xl" style={{ backgroundColor: `${ct.color}18` }}>
                <Timer size={15} style={{ color: ct.color }} />
                <div>
                  <p className="text-xs text-gray-500 leading-none">Default Duration</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: ct.color }}>
                    {ct.defaultDuration >= 60
                      ? `${Math.floor(ct.defaultDuration / 60)}h ${ct.defaultDuration % 60 > 0 ? `${ct.defaultDuration % 60}m` : ''}`
                      : `${ct.defaultDuration} min`}
                  </p>
                </div>
              </div>

              {ct.description && (
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{ct.description}</p>
              )}

              <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-100">
                <Toggle checked={ct.status === 'active'} onChange={() => toggleStatus(ct.id)} />
                {ct.status === 'active'
                  ? <span className="badge-active"><CheckCircle2 size={10} /> Active</span>
                  : <span className="badge-inactive"><XCircle size={10} /> Inactive</span>
                }
              </div>
            </div>
          ))}

          {/* Add new card */}
          <button
            onClick={openAdd}
            className="card p-5 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all min-h-[180px] text-gray-400 hover:text-primary-600"
          >
            <div className="w-10 h-10 rounded-xl border-2 border-dashed border-current flex items-center justify-center">
              <Plus size={20} />
            </div>
            <span className="text-sm font-medium">Add type</span>
          </button>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Consultation Type' : 'Add Consultation Type'} size="md">
        <ConsultForm form={form} setForm={setForm} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} isEdit={!!editTarget} />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Consultation Type"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
      />
    </div>
  )
}
