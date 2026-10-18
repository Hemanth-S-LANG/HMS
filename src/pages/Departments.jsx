import { useState, useMemo } from 'react'
import {
  Building2, Plus, Pencil, Trash2, Search, Filter,
  ChevronDown, MoreHorizontal, Users, Stethoscope,
  MapPin, Hash, CheckCircle2, XCircle,
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
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit() }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className="label">Department Name <span className="text-red-500">*</span></label>
          <input
            required
            className="input"
            placeholder="e.g. Cardiology"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="label">Department Code <span className="text-red-500">*</span></label>
          <input
            required
            className="input uppercase"
            placeholder="e.g. CARD"
            value={form.code}
            onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="label">Head of Department</label>
          <input
            className="input"
            placeholder="e.g. Dr. Arjun Mehta"
            value={form.head}
            onChange={e => setForm(f => ({ ...f, head: e.target.value }))}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="label">Floor / Location</label>
          <input
            className="input"
            placeholder="e.g. 3rd Floor"
            value={form.floor}
            onChange={e => setForm(f => ({ ...f, floor: e.target.value }))}
          />
        </div>
        <div className="col-span-2">
          <label className="label">Description</label>
          <textarea
            rows={3}
            className="input resize-none"
            placeholder="Brief description of this department…"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
        </div>
        <div className="col-span-2 flex items-center gap-3">
          <Toggle
            checked={form.status === 'active'}
            onChange={v => setForm(f => ({ ...f, status: v ? 'active' : 'inactive' }))}
          />
          <span className="text-sm text-gray-600">
            {form.status === 'active' ? 'Active — visible to staff' : 'Inactive — hidden from staff'}
          </span>
        </div>
      </div>

      <div className="flex gap-3 pt-2 border-t border-gray-100">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 justify-center">
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1 justify-center">
          {isEdit ? 'Save changes' : 'Add department'}
        </button>
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
  const [form, setForm]               = useState(EMPTY_FORM)
  const [openMenuId, setOpenMenuId]   = useState(null)
  const [viewTarget, setViewTarget]   = useState(null)

  const filtered = useMemo(() => {
    let list = [...departments]
    if (search)                 list = list.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.code.toLowerCase().includes(search.toLowerCase()) || d.head.toLowerCase().includes(search.toLowerCase()))
    if (filterStatus !== 'all') list = list.filter(d => d.status === filterStatus)
    list.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'code') return a.code.localeCompare(b.code)
      if (sortBy === 'services') return b.serviceCount - a.serviceCount
      return 0
    })
    return list
  }, [departments, search, filterStatus, sortBy])

  const openAdd = () => { setForm(EMPTY_FORM); setEditTarget(null); setModalOpen(true) }
  const openEdit = (dept) => { setForm({ ...dept }); setEditTarget(dept.id); setModalOpen(true); setOpenMenuId(null) }

  const handleSubmit = () => {
    if (editTarget) {
      setDepartments(d => d.map(x => x.id === editTarget ? { ...x, ...form } : x))
    } else {
      setDepartments(d => [...d, { ...form, id: `dept-${Date.now()}`, serviceCount: 0 }])
    }
    setModalOpen(false)
  }

  const handleDelete = () => {
    setDepartments(d => d.filter(x => x.id !== deleteTarget.id))
  }

  const toggleStatus = (id) => {
    setDepartments(d => d.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x))
  }

  const activeCount   = departments.filter(d => d.status === 'active').length
  const inactiveCount = departments.filter(d => d.status === 'inactive').length

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">Departments</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage hospital departments, heads and their status.</p>
        </div>
        <button onClick={openAdd} className="btn-primary self-start sm:self-auto">
          <Plus size={16} /> Add Department
        </button>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Total', value: departments.length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { label: 'Active', value: activeCount, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
          { label: 'Inactive', value: inactiveCount, color: 'bg-gray-100 text-gray-500 border-gray-200' },
        ].map(p => (
          <div key={p.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${p.color}`}>
            {p.label}: <span className="font-bold">{p.value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, code or head…" />
        <div className="flex gap-2 flex-wrap sm:ml-auto">
          {/* Status filter */}
          <div className="relative">
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
          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              <option value="name">Sort: Name</option>
              <option value="code">Sort: Code</option>
              <option value="services">Sort: Services</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No departments found"
            description="Try adjusting your search or filters, or add a new department."
            action={<button onClick={openAdd} className="btn-primary"><Plus size={15} /> Add Department</button>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="table-th">Department</th>
                  <th className="table-th hidden sm:table-cell">Code</th>
                  <th className="table-th hidden md:table-cell">Head</th>
                  <th className="table-th hidden lg:table-cell">Floor</th>
                  <th className="table-th hidden sm:table-cell">Services</th>
                  <th className="table-th">Status</th>
                  <th className="table-th text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(dept => (
                  <tr key={dept.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="table-td">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${dept.status === 'active' ? 'bg-primary-50' : 'bg-gray-100'}`}>
                          <Building2 size={16} className={dept.status === 'active' ? 'text-primary-600' : 'text-gray-400'} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{dept.name}</p>
                          <p className="text-xs text-gray-400 sm:hidden">{dept.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-td hidden sm:table-cell">
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-600">{dept.code}</span>
                    </td>
                    <td className="table-td hidden md:table-cell text-gray-600">{dept.head || '—'}</td>
                    <td className="table-td hidden lg:table-cell">
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <MapPin size={12} /> {dept.floor || '—'}
                      </div>
                    </td>
                    <td className="table-td hidden sm:table-cell">
                      <div className="flex items-center gap-1 text-gray-600 text-xs">
                        <Stethoscope size={12} className="text-gray-400" />
                        <span className="font-medium">{dept.serviceCount}</span>
                      </div>
                    </td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <Toggle
                          checked={dept.status === 'active'}
                          onChange={() => toggleStatus(dept.id)}
                        />
                        <span className={`text-xs font-medium hidden lg:inline ${dept.status === 'active' ? 'text-emerald-600' : 'text-gray-400'}`}>
                          {dept.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="table-td text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewTarget(dept)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition text-xs font-medium hidden sm:inline-flex items-center gap-1"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openEdit(dept)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(dept)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-500">Showing {filtered.length} of {departments.length} departments</p>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? 'Edit Department' : 'Add New Department'}
        size="md"
      >
        <DeptForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          isEdit={!!editTarget}
        />
      </Modal>

      {/* View Modal */}
      <Modal open={!!viewTarget} onClose={() => setViewTarget(null)} title="Department Details" size="md">
        {viewTarget && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center">
                <Building2 size={24} className="text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{viewTarget.name}</h3>
                <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{viewTarget.code}</span>
              </div>
              <div className="ml-auto">
                {viewTarget.status === 'active'
                  ? <span className="badge-active"><CheckCircle2 size={11} /> Active</span>
                  : <span className="badge-inactive"><XCircle size={11} /> Inactive</span>
                }
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-400 mb-0.5">Head of Dept</p>
                <p className="font-medium text-gray-800">{viewTarget.head || '—'}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-400 mb-0.5">Floor</p>
                <p className="font-medium text-gray-800">{viewTarget.floor || '—'}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-400 mb-0.5">Services</p>
                <p className="font-medium text-gray-800">{viewTarget.serviceCount}</p>
              </div>
            </div>
            {viewTarget.description && (
              <div className="p-3 bg-gray-50 rounded-xl text-sm text-gray-600">
                {viewTarget.description}
              </div>
            )}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button onClick={() => { setViewTarget(null); openEdit(viewTarget) }} className="btn-secondary flex-1 justify-center">
                <Pencil size={14} /> Edit
              </button>
              <button onClick={() => setViewTarget(null)} className="btn-primary flex-1 justify-center">Close</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Department"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  )
}
