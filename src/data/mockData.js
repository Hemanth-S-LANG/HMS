// ── Departments ──────────────────────────────────────────────────────────────
export const initialDepartments = [
  { id: 'dept-1', name: 'Cardiology',       code: 'CARD', head: 'Dr. Arjun Mehta',    floor: '3rd Floor', status: 'active',   serviceCount: 8,  description: 'Specialises in heart diseases and cardiovascular conditions.' },
  { id: 'dept-2', name: 'Neurology',        code: 'NEUR', head: 'Dr. Priya Sharma',   floor: '4th Floor', status: 'active',   serviceCount: 6,  description: 'Focuses on disorders of the nervous system.' },
  { id: 'dept-3', name: 'Orthopaedics',     code: 'ORTH', head: 'Dr. Raj Patel',      floor: '2nd Floor', status: 'active',   serviceCount: 10, description: 'Treats musculoskeletal conditions, fractures and joint issues.' },
  { id: 'dept-4', name: 'Paediatrics',      code: 'PAED', head: 'Dr. Sunita Rao',     floor: '5th Floor', status: 'active',   serviceCount: 7,  description: 'Medical care for infants, children and adolescents.' },
  { id: 'dept-5', name: 'Dermatology',      code: 'DERM', head: 'Dr. Kavita Nair',    floor: '1st Floor', status: 'active',   serviceCount: 5,  description: 'Diagnosis and treatment of skin, hair and nail conditions.' },
  { id: 'dept-6', name: 'Ophthalmology',    code: 'OPHT', head: 'Dr. Suresh Kumar',   floor: '1st Floor', status: 'inactive', serviceCount: 4,  description: 'Eye care services including surgery and vision correction.' },
  { id: 'dept-7', name: 'Gynaecology',      code: 'GYNO', head: 'Dr. Meena Iyer',     floor: '6th Floor', status: 'active',   serviceCount: 9,  description: "Women's reproductive health and obstetric care." },
  { id: 'dept-8', name: 'Psychiatry',       code: 'PSYC', head: 'Dr. Amit Desai',     floor: '7th Floor', status: 'active',   serviceCount: 5,  description: 'Mental health diagnosis, therapy and medication management.' },
  { id: 'dept-9', name: 'General Medicine', code: 'GENM', head: 'Dr. Ritu Verma',     floor: 'Ground',    status: 'active',   serviceCount: 12, description: 'Primary care and general health consultations.' },
  { id: 'dept-10', name: 'Radiology',       code: 'RADI', head: 'Dr. Vikram Singh',   floor: 'Basement',  status: 'inactive', serviceCount: 6,  description: 'Imaging diagnostics including MRI, CT scan and X-ray.' },
];

// ── Services ──────────────────────────────────────────────────────────────────
export const initialServices = [
  { id: 'svc-1',  deptId: 'dept-1', name: 'ECG',                     code: 'ECG-01',   type: 'Diagnostic',    status: 'active',   fee: 800,   duration: 20 },
  { id: 'svc-2',  deptId: 'dept-1', name: 'Echocardiography',        code: 'ECHO-01',  type: 'Diagnostic',    status: 'active',   fee: 2500,  duration: 45 },
  { id: 'svc-3',  deptId: 'dept-1', name: 'Cardiac Consultation',    code: 'CARD-CON', type: 'Consultation',  status: 'active',   fee: 1200,  duration: 30 },
  { id: 'svc-4',  deptId: 'dept-2', name: 'Neurology Consultation',  code: 'NEUR-CON', type: 'Consultation',  status: 'active',   fee: 1500,  duration: 30 },
  { id: 'svc-5',  deptId: 'dept-2', name: 'EEG',                     code: 'EEG-01',   type: 'Diagnostic',    status: 'active',   fee: 1800,  duration: 60 },
  { id: 'svc-6',  deptId: 'dept-3', name: 'Fracture Treatment',      code: 'ORTH-FX',  type: 'Procedure',     status: 'active',   fee: 3500,  duration: 90 },
  { id: 'svc-7',  deptId: 'dept-3', name: 'Joint Replacement',       code: 'ORTH-JR',  type: 'Surgery',       status: 'active',   fee: 45000, duration: 180},
  { id: 'svc-8',  deptId: 'dept-4', name: 'Child Wellness Check',    code: 'PAED-WC',  type: 'Consultation',  status: 'active',   fee: 600,   duration: 20 },
  { id: 'svc-9',  deptId: 'dept-5', name: 'Skin Biopsy',             code: 'DERM-BP',  type: 'Procedure',     status: 'active',   fee: 2000,  duration: 30 },
  { id: 'svc-10', deptId: 'dept-5', name: 'Dermatology Consultation',code: 'DERM-CON', type: 'Consultation',  status: 'active',   fee: 800,   duration: 20 },
  { id: 'svc-11', deptId: 'dept-7', name: 'Antenatal Check-up',      code: 'GYNO-ANC', type: 'Consultation',  status: 'active',   fee: 1000,  duration: 30 },
  { id: 'svc-12', deptId: 'dept-9', name: 'General OPD',             code: 'GENM-OPD', type: 'Consultation',  status: 'active',   fee: 400,   duration: 15 },
  { id: 'svc-13', deptId: 'dept-9', name: 'Blood Test (Basic)',      code: 'LAB-BLD',  type: 'Diagnostic',    status: 'active',   fee: 500,   duration: 20 },
  { id: 'svc-14', deptId: 'dept-6', name: 'Vision Test',             code: 'OPHT-VT',  type: 'Diagnostic',    status: 'inactive', fee: 300,   duration: 15 },
];

// ── Consultation Types ────────────────────────────────────────────────────────
export const initialConsultationTypes = [
  { id: 'ct-1', name: 'First Visit',       code: 'FIRST',    defaultDuration: 30, color: '#3b82f6', description: 'Initial consultation for new patients.',         status: 'active'   },
  { id: 'ct-2', name: 'Follow-up',         code: 'FOLLOWUP', defaultDuration: 15, color: '#10b981', description: 'Routine follow-up after previous treatment.',     status: 'active'   },
  { id: 'ct-3', name: 'Emergency',         code: 'EMRG',     defaultDuration: 45, color: '#ef4444', description: 'Urgent unscheduled consultations.',               status: 'active'   },
  { id: 'ct-4', name: 'Tele-consultation', code: 'TELE',     defaultDuration: 20, color: '#8b5cf6', description: 'Remote video or phone-based consultation.',       status: 'active'   },
  { id: 'ct-5', name: 'Procedure',         code: 'PROC',     defaultDuration: 60, color: '#f59e0b', description: 'In-clinic procedures and minor surgeries.',       status: 'active'   },
  { id: 'ct-6', name: 'Annual Check-up',   code: 'ANNUAL',   defaultDuration: 45, color: '#06b6d4', description: 'Comprehensive annual health screening.',          status: 'active'   },
  { id: 'ct-7', name: 'Pre-surgery',       code: 'PRESURG',  defaultDuration: 30, color: '#ec4899', description: 'Pre-operative assessment and counselling.',       status: 'inactive' },
];

// ── Settings ──────────────────────────────────────────────────────────────────
export const initialSettings = {
  hospital: {
    name:          'Advifiction General Hospital',
    tagline:       'Caring for life, every day.',
    registrationNo:'REG-MH-2018-004512',
    gstin:         '27AADCA1234B1Z5',
    phone:         '+91 22 4567 8900',
    email:         'info@advifictionhospital.in',
    website:       'www.advifictionhospital.in',
    address:       '14, Medical Complex, Andheri East',
    city:          'Mumbai',
    state:         'Maharashtra',
    pincode:       '400069',
    country:       'India',
    logo:          '',
  },
  openingHours: [
    { day: 'Monday',    open: '08:00', close: '20:00', isClosed: false },
    { day: 'Tuesday',   open: '08:00', close: '20:00', isClosed: false },
    { day: 'Wednesday', open: '08:00', close: '20:00', isClosed: false },
    { day: 'Thursday',  open: '08:00', close: '20:00', isClosed: false },
    { day: 'Friday',    open: '08:00', close: '20:00', isClosed: false },
    { day: 'Saturday',  open: '09:00', close: '14:00', isClosed: false },
    { day: 'Sunday',    open: '09:00', close: '13:00', isClosed: true  },
  ],
  languages: [
    { id: 'lang-1', name: 'English',   code: 'en', isDefault: true,  status: 'active' },
    { id: 'lang-2', name: 'Hindi',     code: 'hi', isDefault: false, status: 'active' },
    { id: 'lang-3', name: 'Marathi',   code: 'mr', isDefault: false, status: 'active' },
    { id: 'lang-4', name: 'Gujarati',  code: 'gu', isDefault: false, status: 'inactive' },
  ],
  escalation: {
    primaryNumber:   '+91 98765 43210',
    secondaryNumber: '+91 98765 43211',
    email:           'escalation@advifictionhospital.in',
    responseTime:    '15',
    notes:           'Contact duty manager first. If unavailable, escalate to Medical Superintendent.',
  },
};
