import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Departments from './pages/Departments'
import Services from './pages/Services'
import ConsultationTypes from './pages/ConsultationTypes'
import Settings from './pages/Settings'

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/"             element={<Dashboard />}         />
        <Route path="/departments"  element={<Departments />}       />
        <Route path="/services"     element={<Services />}          />
        <Route path="/consultation" element={<ConsultationTypes />} />
        <Route path="/settings"     element={<Settings />}          />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  )
}
