import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/hooks/useAuth'
import { LoadingScreen } from '@/components/ui'
import { AppLayout } from '@/components/layout'

// Pages - Part 1
import Landing            from '@/pages/Landing'
import { Register, Login, ConfirmEmail } from '@/pages/Auth'
import Profile            from '@/pages/Profile'
import Ranking            from '@/pages/Ranking'

// Placeholder for pages coming in Part 2+
function ComingSoon({ title, icon }) {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center px-4">
        <div className="text-6xl">{icon}</div>
        <h2 className="font-heading text-2xl font-bold">{title}</h2>
        <p className="text-[#8899bb]">Em construção — vem na próxima parte! 🚀</p>
      </div>
    </AppLayout>
  )
}

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
      <Route path="/dashboard"     element={<Private><ComingSoon title="Trilhas de Aprendizado" icon="🗺️"/></Private>}/>
      <Route path="/english"       element={<Private><ComingSoon title="Inglês Técnico" icon="🇺🇸"/></Private>}/>
      <Route path="/interview"     element={<Private><ComingSoon title="Simulador de Entrevistas" icon="🎤"/></Private>}/>
      <Route path="/progress"      element={<Private><ComingSoon title="Progresso" icon="📈"/></Private>}/>
      <Route path="/courses"       element={<Private><ComingSoon title="Meus Cursos" icon="➕"/></Private>}/>
      <Route path="/ranking"       element={<Private><Ranking/></Private>}/>
      <Route path="/profile"       element={<Private><Profile/></Private>}/>
      <Route path="*"              element={<Navigate to="/" replace/>}/>
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <div className="relative z-10">
        <Router/>
      </div>
    </AuthProvider>
  )
}
