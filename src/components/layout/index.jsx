import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { getLevelData, getInitials, TRAIL_META } from '@/lib/gamification'
import { XPBar } from '@/components/ui'

const NAV = [
  { path:'/dashboard',  icon:'🗺️', label:'Trilhas'    },
  { path:'/english',    icon:'🇺🇸', label:'Inglês'     },
  { path:'/interview',  icon:'🎤', label:'Entrevistas' },
  { path:'/progress',   icon:'📈', label:'Progresso'   },
  { path:'/courses',    icon:'➕', label:'Meus Cursos'  },
  { path:'/ranking',    icon:'🏆', label:'Ranking'     },
  { path:'/profile',    icon:'👤', label:'Perfil'      },
]

export function Navbar() {
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const lvl = getLevelData(profile?.xp || 0)
  const initials = getInitials(profile?.nome || '')
  const trail = TRAIL_META[profile?.trilha_ativa]

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 border-b border-[#1e2d47] bg-[#050810]/85 backdrop-blur-md">
      <button onClick={() => navigate(user ? '/dashboard' : '/')}
        className="font-heading text-lg sm:text-xl font-extrabold grad-logo flex-shrink-0">
        ⚡ LearnPath
      </button>

      {user ? (
        <div className="flex items-center gap-2 sm:gap-3">
          {trail && (
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-[#8899bb] bg-[#111827] border border-[#1e2d47] rounded-lg px-3 py-1.5">
              {trail.icon} {trail.label}
            </span>
          )}
          <span className="hidden md:block text-xs text-[#8899bb]">Nv.{lvl.level} · {profile?.xp||0} XP</span>
          <button onClick={() => navigate('/profile')}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold border-2 border-[#1e2d47] hover:border-blue-500 transition-colors overflow-hidden flex-shrink-0">
            {profile?.foto_url
              ? <img src={profile.foto_url} alt="" className="w-full h-full object-cover"/>
              : initials
            }
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/login')}
            className="px-3 py-1.5 rounded-lg border border-[#1e2d47] text-[#8899bb] text-sm hover:bg-[#111827] hover:text-white transition-all">
            Entrar
          </button>
          <button onClick={() => navigate('/register')}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-[0_0_16px_rgba(59,130,246,0.25)]">
            Começar
          </button>
        </div>
      )}
    </nav>
  )
}

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, profile } = useAuth()
  const lvl = getLevelData(profile?.xp || 0)

  return (
    <aside className="sidebar-wrap w-52 min-w-[208px] border-r border-[#1e2d47] bg-[#090d18] flex flex-col overflow-y-auto">
      {/* XP section */}
      <div className="p-4 border-b border-[#1e2d47]">
        <div className="flex items-center justify-between text-xs text-[#4a5980] mb-1.5">
          <span>Nível {lvl.level}</span>
          <span>{lvl.current}/{lvl.needed} XP</span>
        </div>
        <XPBar pct={lvl.pct} height={5}/>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 p-2 flex-1">
        {NAV.map(item => {
          const active = location.pathname === item.path
          return (
            <button key={item.path} onClick={() => navigate(item.path)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm w-full text-left transition-all ${active ? 'bg-blue-600/15 text-blue-300 border border-blue-500/20 font-semibold' : 'text-[#8899bb] hover:bg-[#111827] hover:text-white'}`}>
              <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-[#1e2d47]">
        <button onClick={logout}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#8899bb] hover:bg-red-500/10 hover:text-red-400 transition-all w-full text-left">
          <span className="w-5 text-center">🚪</span><span>Sair</span>
        </button>
      </div>
    </aside>
  )
}

export function MobileNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const SHORT = [
    { path:'/dashboard', icon:'🗺️', label:'Trilhas'   },
    { path:'/english',   icon:'🇺🇸', label:'Inglês'    },
    { path:'/interview', icon:'🎤', label:'Entrevista' },
    { path:'/ranking',   icon:'🏆', label:'Ranking'   },
    { path:'/profile',   icon:'👤', label:'Perfil'    },
  ]
  return (
    <nav className="bottom-nav">
      {SHORT.map(item => {
        const active = location.pathname === item.path
        return (
          <button key={item.path} onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${active ? 'text-blue-400' : 'text-[#4a5980]'}`}>
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar/>
        <main className="flex-1 overflow-y-auto main-pad">{children}</main>
      </div>
      <MobileNav/>
    </div>
  )
}

export function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1">{children}</main>
    </div>
  )
}
