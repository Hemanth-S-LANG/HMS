import { useState } from 'react'
import {
  Hospital, Clock, Globe, Phone, Save, Plus, Trash2,
  CheckCircle2, Mail, MapPin, Globe2,
  AlertCircle, Star, ChevronDown,
} from 'lucide-react'
import { initialSettings } from '../data/mockData'
import Toggle from '../components/ui/Toggle'
import ConfirmDialog from '../components/ui/ConfirmDialog'

const TABS = [
  { id: 'hospital',   label: 'Hospital Info',  icon: Hospital },
  { id: 'hours',      label: 'Opening Hours',  icon: Clock    },
  { id: 'languages',  label: 'Languages',      icon: Globe    },
  { id: 'escalation', label: 'Escalation',     icon: Phone    },
]

const ALL_LANGS = ['Afrikaans','Arabic','Bengali','English','French','German','Gujarati',
                   'Hindi','Kannada','Malayalam','Marathi','Punjabi','Spanish','Tamil','Telugu','Urdu']

// ── Floating save bar ─────────────────────────────────────────────────────────
function SaveBar({ onSave }) {
  return (
    <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 z-30 px-3 sm:px-4 pb-3 sm:pb-4 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <div className="bg-gray-900 text-white rounded-2xl shadow-2xl
                        flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-4 sm:px-5 py-3.5">
          <div className="flex items-center gap-2.5 flex-1">
            <AlertCircle size={16} className="text-amber-400 flex-shrink-0" />
            <p className="text-sm">You have unsaved changes.</p>
          </div>
          <button onClick={onSave}
            className="btn-primary bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto flex-shrink-0">
            <Save size={15} /> Save changes
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Hospital Info ─────────────────────────────────────────────────────────────
function HospitalInfoTab({ data, onChange }) {
  const h   = data.hospital
  const set = (key, val) => onChange({ ...data, hospital: { ...h, [key]: val } })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="label">Hospital Name <span className="text-red-500">*</span></label>
          <input className="input" value={h.name} onChange={e => set('name', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Tagline / Slogan</label>
          <input className="input" placeholder="Optional tagline…" value={h.tagline} onChange={e => set('tagline', e.target.value)} />
        </div>
        <div>
          <label className="label">Registration No.</label>
          <input className="input" value={h.registrationNo} onChange={e => set('registrationNo', e.target.value)} />
        </div>
        <div>
          <label className="label">GSTIN</label>
          <input className="input" value={h.gstin} onChange={e => set('gstin', e.target.value)} />
        </div>
        <div>
          <label className="label">Phone</label>
          <input className="input" type="tel" value={h.phone} onChange={e => set('phone', e.target.value)} />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" value={h.email} onChange={e => set('email', e.target.value)} />
        </div>
        <div>
          <label className="label">Website</label>
          <input className="input" type="url" placeholder="www.example.com" value={h.website} onChange={e => set('website', e.target.value)} />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <MapPin size={15} className="text-gray-400" /> Address
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="label">Street Address</label>
            <input className="input" value={h.address} onChange={e => set('address', e.target.value)} />
          </div>
          <div>
            <label className="label">City</label>
            <input className="input" value={h.city} onChange={e => set('city', e.target.value)} />
          </div>
          <div>
            <label className="label">State</label>
            <input className="input" value={h.state} onChange={e => set('state', e.target.value)} />
          </div>
          <div>
            <label className="label">PIN Code</label>
            <input className="input" inputMode="numeric" value={h.pincode} onChange={e => set('pincode', e.target.value)} />
          </div>
          <div>
            <label className="label">Country</label>
            <input className="input" value={h.country} onChange={e => set('country', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Opening Hours ─────────────────────────────────────────────────────────────
function OpeningHoursTab({ data, onChange }) {
  const hours  = data.openingHours
  const setDay = (i, patch) => {
    const updated = hours.map((h, idx) => idx === i ? { ...h, ...patch } : h)
    onChange({ ...data, openingHours: updated })
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">Set the hospital's operational hours for each day of the week.</p>
      <div className="space-y-2">
        {hours.map((h, i) => (
          <div
            key={h.day}
            className={`rounded-xl border p-3 transition
              ${h.isClosed ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-200'}`}
          >
            {/* Top row: day name + toggle */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-800 w-24">{h.day}</span>
              <div className="flex items-center gap-2">
                <Toggle checked={!h.isClosed} onChange={v => setDay(i, { isClosed: !v })} />
                <span className={`text-xs font-medium w-12 ${h.isClosed ? 'text-gray-400' : 'text-emerald-600'}`}>
                  {h.isClosed ? 'Closed' : 'Open'}
                </span>
              </div>
            </div>
            {/* Time inputs — stacked on xs, inline on sm+ — only shown when open */}
            {!h.isClosed && (
              <div className="flex flex-col xs:flex-row sm:flex-row items-start sm:items-center gap-2">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-gray-400 w-8 flex-shrink-0">From</span>
                  <input
                    type="time" value={h.open}
                    onChange={e => setDay(i, { open: e.target.value })}
                    className="input flex-1 sm:w-32 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-gray-400 w-8 flex-shrink-0">To</span>
                  <input
                    type="time" value={h.close}
                    onChange={e => setDay(i, { close: e.target.value })}
                    className="input flex-1 sm:w-32 text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Weekly summary */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-xs font-semibold text-blue-700 mb-2">Weekly Summary</p>
        <div className="flex gap-1.5 flex-wrap">
          {hours.map(h => (
            <div key={h.day}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium
                ${h.isClosed ? 'bg-gray-200 text-gray-400' : 'bg-blue-600 text-white'}`}>
              {h.day.slice(0, 3)}
            </div>
          ))}
        </div>
        <p className="text-xs text-blue-600 mt-2">
          {hours.filter(h => !h.isClosed).length} days open · {hours.filter(h => h.isClosed).length} days closed
        </p>
      </div>
    </div>
  )
}

// ── Languages ─────────────────────────────────────────────────────────────────
function LanguagesTab({ data, onChange }) {
  const languages = data.languages
  const [newLang, setNewLang]   = useState('')
  const [newCode, setNewCode]   = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const setLangs = langs => onChange({ ...data, languages: langs })

  const addLang = () => {
    if (!newLang.trim()) return
    if (languages.find(l => l.name.toLowerCase() === newLang.toLowerCase())) return
    setLangs([...languages, {
      id: `lang-${Date.now()}`,
      name: newLang.trim(),
      code: newCode.trim().toLowerCase() || newLang.slice(0, 2).toLowerCase(),
      isDefault: false,
      status: 'active',
    }])
    setNewLang(''); setNewCode('')
  }

  const setDefault   = id => setLangs(languages.map(l => ({ ...l, isDefault: l.id === id })))
  const toggleStatus = id => setLangs(languages.map(l => l.id === id ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' } : l))
  const removeLang   = () => { setLangs(languages.filter(l => l.id !== deleteTarget.id)); setDeleteTarget(null) }

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-500">
        Configure the languages supported by this hospital for staff and patient communications.
      </p>

      {/* Add new */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-xs font-semibold text-gray-600 mb-3">Add a new language</p>
        {/* Stack on mobile, inline on sm+ */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <select value={newLang}
              onChange={e => { setNewLang(e.target.value); setNewCode(e.target.value.slice(0, 2).toLowerCase()) }}
              className="input appearance-none pr-8">
              <option value="">Select language…</option>
              {ALL_LANGS.filter(l => !languages.find(ex => ex.name === l)).map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <input className="input sm:w-24" placeholder="Code e.g. en"
            value={newCode} onChange={e => setNewCode(e.target.value)} />
          <button onClick={addLang} disabled={!newLang} className="btn-primary disabled:opacity-50 sm:flex-shrink-0">
            <Plus size={15} /> Add
          </button>
        </div>
      </div>

      {/* Language list */}
      <div className="space-y-2">
        {languages.map(lang => (
          <div key={lang.id}
            className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border
              ${lang.status === 'active' ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Globe2 size={16} className="text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-gray-800">{lang.name}</p>
                {lang.isDefault && (
                  <span className="badge-blue text-[10px] py-0 px-2">
                    <Star size={9} fill="currentColor" /> Default
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 font-mono">{lang.code}</p>
            </div>
            {/* Actions — more compact on mobile */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {!lang.isDefault && (
                <button onClick={() => setDefault(lang.id)}
                  className="hidden sm:inline-flex text-xs text-gray-400 hover:text-primary-600 transition px-2 py-1 rounded-lg hover:bg-primary-50">
                  Set default
                </button>
              )}
              <Toggle checked={lang.status === 'active'} onChange={() => toggleStatus(lang.id)} disabled={lang.isDefault} />
              {!lang.isDefault && (
                <button onClick={() => setDeleteTarget(lang)}
                  className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition flex items-center justify-center">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={removeLang}
        title="Remove Language" message={`Remove "${deleteTarget?.name}" from supported languages?`}
      />
    </div>
  )
}

// ── Escalation ────────────────────────────────────────────────────────────────
function EscalationTab({ data, onChange }) {
  const e   = data.escalation
  const set = (key, val) => onChange({ ...data, escalation: { ...e, [key]: val } })

  return (
    <div className="space-y-5">
      <div className="p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
        <AlertCircle size={17} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700">
          These numbers are used for urgent escalation calls from the voice agent and reception. Ensure they are always reachable.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Primary Escalation Number <span className="text-red-500">*</span></label>
          <div className="relative">
            <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input className="input pl-9" type="tel" value={e.primaryNumber}
              onChange={ev => set('primaryNumber', ev.target.value)} placeholder="+91 98765 43210" />
          </div>
        </div>
        <div>
          <label className="label">Secondary Number</label>
          <div className="relative">
            <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input className="input pl-9" type="tel" value={e.secondaryNumber}
              onChange={ev => set('secondaryNumber', ev.target.value)} placeholder="+91 98765 43211" />
          </div>
        </div>
        <div>
          <label className="label">Escalation Email</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input className="input pl-9" type="email" value={e.email}
              onChange={ev => set('email', ev.target.value)} />
          </div>
        </div>
        <div>
          <label className="label">Expected Response Time (min)</label>
          <input className="input" type="number" inputMode="numeric" min="1" max="120"
            value={e.responseTime} onChange={ev => set('responseTime', ev.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Escalation Notes / Protocol</label>
          <textarea rows={4} className="input resize-none" value={e.notes}
            onChange={ev => set('notes', ev.target.value)} placeholder="Describe the escalation procedure…" />
        </div>
      </div>

      {/* Quick reference card */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Quick Reference</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            { bg: 'bg-green-100', color: 'text-green-600', label: 'Primary',  val: e.primaryNumber   },
            { bg: 'bg-blue-100',  color: 'text-blue-600',  label: 'Secondary',val: e.secondaryNumber },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                <Phone size={13} className={item.color} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="font-semibold text-gray-800 truncate">{item.val || '—'}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 sm:col-span-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Clock size={13} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Response SLA</p>
              <p className="font-semibold text-gray-800">{e.responseTime} minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Settings page ────────────────────────────────────────────────────────
export default function Settings() {
  const [settings, setSettings]   = useState(initialSettings)
  const [saved, setSaved]         = useState(true)
  const [activeTab, setActiveTab] = useState('hospital')
  const [toastMsg, setToastMsg]   = useState('')

  const handleChange = updated => { setSettings(updated); setSaved(false) }

  const handleSave = () => {
    setSaved(true)
    setToastMsg('Settings saved successfully!')
    setTimeout(() => setToastMsg(''), 3000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5 pb-36 lg:pb-24">

      {/* Header */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Settings</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Configure hospital details, operating hours, languages and escalation contacts.
        </p>
      </div>

      {/* Tab bar — scrolls horizontally on mobile with a right-fade hint */}
      <div className="card p-1 relative">
        {/* Fade hint on the right edge */}
        <div className="absolute right-1 top-1 bottom-1 w-8 bg-gradient-to-l from-white to-transparent rounded-r-2xl pointer-events-none z-10" />
        <div className="flex gap-1 overflow-x-auto scrollbar-hide pr-6">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl
                          text-xs sm:text-sm font-medium transition whitespace-nowrap flex-shrink-0
                          ${activeTab === id
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                          }`}
            >
              <Icon size={14} className="flex-shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="card p-4 sm:p-6">
        {activeTab === 'hospital'   && <HospitalInfoTab  data={settings} onChange={handleChange} />}
        {activeTab === 'hours'      && <OpeningHoursTab  data={settings} onChange={handleChange} />}
        {activeTab === 'languages'  && <LanguagesTab     data={settings} onChange={handleChange} />}
        {activeTab === 'escalation' && <EscalationTab    data={settings} onChange={handleChange} />}
      </div>

      {/* Save bar — sits above bottom nav on mobile */}
      {!saved && <SaveBar onSave={handleSave} />}

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-20 lg:bottom-8 right-3 sm:right-4 z-50
                        flex items-center gap-2 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-2xl">
          <CheckCircle2 size={16} className="text-emerald-400" />
          {toastMsg}
        </div>
      )}
    </div>
  )
}
