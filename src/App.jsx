import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/hooks/useAuth'
import { LoadingScreen } from '@/components/ui'

import Landing           from '@/pages/Landing'
import { Register, Login, ConfirmEmail } from '@/pages/Auth'
import Dashboard         from '@/pages/Dashboard'
import English           from '@/pages/English'
import { Progress }      from '@/pages/ProgressAndCourses'
import { Courses }       from '@/pages/ProgressAndCourses'
import Ranking           from '@/pages/Ranking'
import Profile           from '@/pages/Profile'

function Private({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen/>
  if (!user) return <Navigate to="/login" replace/>
  return children
}
function PublicOnly({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen/>
  if (user) return <Navigate to="/dashboard" replace/>
  return children
}

function Router() {
  return (
    <Routes>
      <Route path="/"              element={<Landing/>}/>
      <Route path="/confirm-email" element={<ConfirmEmail/>}/>
      <Route path="/login"         element={<PublicOnly><Login/></PublicOnly>}/>
      <Route path="/register"      element={<PublicOnly><Register/></PublicOnly>}/>
      <Route path="/dashboard"     element={<Private><Dashboard/></Private>}/>
      <Route path="/english"       element={<Private><English/></Private>}/>
      <Route path="/progress"      element={<Private><Progress/></Private>}/>
      <Route path="/courses"       element={<Private><Courses/></Private>}/>
      <Route path="/ranking"       element={<Private><Ranking/></Private>}/>
      <Route path="/profile"       element={<Private><Profile/></Private>}/>
      <Route path="*"              element={<Navigate to="/" replace/>}/>
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <div className="relative z-10"><Router/></div>
    </AuthProvider>
  )
}
