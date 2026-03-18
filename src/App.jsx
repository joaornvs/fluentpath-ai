import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/hooks/useAuth'
import { LoadingScreen } from '@/components/ui'
import { Landing, Register, Login, ConfirmEmail, Dashboard, Progress, Interview, Courses, Ranking, Profile } from '@/pages'

function Private({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  return children
}

function PublicOnly({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
      <Route path="/login"    element={<PublicOnly><Login /></PublicOnly>} />
      <Route path="/register" element={<PublicOnly><Register /></PublicOnly>} />
      <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
      <Route path="/progress"  element={<Private><Progress /></Private>} />
      <Route path="/interview" element={<Private><Interview /></Private>} />
      <Route path="/courses"   element={<Private><Courses /></Private>} />
      <Route path="/ranking"   element={<Private><Ranking /></Private>} />
      <Route path="/profile"   element={<Private><Profile /></Private>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
