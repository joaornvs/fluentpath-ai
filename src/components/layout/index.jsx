import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { getLevelData, getInitials } from '@/lib/gamification'

const NAV = [
  { path: '/dashboard', icon: '🗺️', label: 'Trilhas' },
  { path: '/progress',  icon: '📈', label: 'Progresso' },
  { path: '/interview', icon: '🎤', label: 'Entrevistas' },
  { path: '/courses',   icon: '➕', label: 'Meus Cursos' },
  { path: '/ranking',   icon: '🏆', label: 'Ranking' },
  { path: '/profile',   icon: '👤', label: 'Perfil' },
]

export function Navbar({ minimal = false }) {
  const navigate = useNavigate()
  const { user, profile, logout } = useAuth()
  const lvl = getLevelData(profile?.xp || 0)
  const initials = getInitials(profile?.nome || '')

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 border-b border-[#1c2840] bg-[#07090f]/80 backdrop-blur-md">
      <button onClick={() => navigate(user ? '/dashboard' : '/')} className="font-heading text-xl font-extrabold grad-logo">
        ⚡ LearnPath
      </button>
      {!minimal && (
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-[#8899bb] hidden sm:block">Nível {lvl.level} · {profile?.xp || 0} XP</span>
              <button onClick={() => navigate('/profile')} className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold border-2 border-[#1c2840] hover:border-blue-500 transition-colors">{initials}</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="px-4 py-2 rounded-lg border border-[#1c2840] text-[#8899bb] text-sm hover:bg-[#111624] hover:text-white transition-all">Entrar</button>
              <button onClick={() => navigate('/register')} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all">Criar conta</button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()
  return (
    <aside className="w-52 min-w-[208px] border-r border-[#1c2840] bg-[#0c0f1a] p-3 flex flex-col">
      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map(item => {
          const active = location.pathname === item.path
          return (
            <button key={item.path} onClick={() => navigate(item.path)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full text-left transition-all ${active ? 'bg-blue-600/15 text-blue-300 border border-blue-500/20' : 'text-[#8899bb] hover:bg-[#111624] hover:text-white'}`}>
              <span className="w-5 text-center">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
      <div className="border-t border-[#1c2840] pt-3">
        <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#8899bb] hover:bg-red-500/10 hover:text-red-400 transition-all w-full text-left">
          <span className="w-5 text-center">🚪</span><span>Sair</span>
        </button>
      </div>
    </aside>
  )
}

export function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

export function PublicLayout({ children }) {
  return <div className="min-h-screen flex flex-col"><Navbar /><main className="flex-1">{children}</main></div>
}
