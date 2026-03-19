import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AppLayout } from '@/components/layout'
import { Card, Badge, Spinner, XPBar } from '@/components/ui'
import { getRanking } from '@/services/supabase/db'
import { getLevelData, getLevelTitle, getInitials, TRAIL_META } from '@/lib/gamification'

const MEDALS = [
  { icon:'🥇', border:'border-yellow-500/40', bg:'bg-yellow-500/8', text:'text-yellow-400' },
  { icon:'🥈', border:'border-gray-400/40',   bg:'bg-gray-400/8',   text:'text-gray-300'  },
  { icon:'🥉', border:'border-orange-600/40', bg:'bg-orange-600/8', text:'text-orange-400' },
]

function Podium({ users }) {
  if (users.length < 1) return null
  const order  = [users[1], users[0], users[2]].filter(Boolean)
  const realIdx = [1, 0, 2]
  const heights = ['h-20', 'h-32', 'h-16']

  return (
    <div className="flex items-end justify-center gap-3 mb-8 pt-2">
      {order.map((u, i) => {
        const ri    = realIdx[i]
        const medal = MEDALS[ri]
        const lvl   = getLevelData(u.xp || 0)
        const isFirst = ri === 0

        return (
          <div key={u.id} className={`flex flex-col items-center gap-2 ${isFirst ? 'scale-105' : ''}`}>
            {isFirst && <div className="text-2xl">👑</div>}
            <div className={`${isFirst ? 'w-16 h-16' : 'w-12 h-12'} rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold border-2 ${medal.border} overflow-hidden relative`}
              style={isFirst ? { boxShadow:'0 0 24px rgba(250,204,21,0.25)' } : {}}>
              {u.foto_url
                ? <img src={u.foto_url} alt="" className="w-full h-full object-cover"/>
                : <span className={isFirst ? 'text-lg' : 'text-sm'}>{getInitials(u.nome)}</span>
              }
              <div className="absolute -bottom-1 -right-1 text-sm">{medal.icon}</div>
            </div>
            <div className="text-center">
              <p className={`font-heading font-bold ${isFirst ? 'text-sm' : 'text-xs'} max-w-[80px] truncate`}>{u.nome?.split(' ')[0]}</p>
              <p className={`font-heading font-bold ${medal.text} ${isFirst ? 'text-lg' : 'text-base'}`}>{(u.xp||0).toLocaleString()}</p>
              <p className="text-xs text-[#4a5980]">Nv.{lvl.level}</p>
            </div>
            <div className={`${heights[i]} w-20 rounded-t-xl ${medal.bg} border-t border-x ${medal.border} flex items-start justify-center pt-2`}>
              <span className={`font-heading font-extrabold text-2xl ${medal.text}`}>{ri+1}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Ranking() {
  const { profile } = useAuth()
  const [users,  setUsers]  = useState([])
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState('all')

  useEffect(() => {
    getRanking(50)
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? users : users.filter(u => u.trilha_ativa === filter)
  const myRank   = users.findIndex(u => u.id === profile?.id) + 1

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto anim-up">
        <div className="text-center mb-6">
          <h1 className="font-heading text-3xl font-bold mb-1">🏆 Ranking Global</h1>
          <p className="text-[#8899bb] text-sm">Os estudantes mais dedicados da plataforma</p>
          {myRank > 0 && (
            <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300">
              🎯 Sua posição: <strong>#{myRank}</strong>
            </div>
          )}
        </div>

        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none">
          {[['all','🌎 Todos'],['data-science','📊 DS'],['genai','🤖 GenAI'],['programacao','💻 Dev'],['estatistica','📈 Stats']].map(([k,l]) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all ${filter===k?'bg-blue-600 border-blue-600 text-white':'border-[#1e2d47] text-[#8899bb] hover:text-white'}`}>
              {l}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="lg"/></div>
        ) : (
          <>
            {filter === 'all' && filtered.length >= 3 && <Podium users={filtered.slice(0,3)}/>}

            <div className="flex flex-col gap-2">
              {filtered.map((u, i) => {
                const lvl   = getLevelData(u.xp || 0)
                const isMe  = u.id === profile?.id
                const trail = TRAIL_META[u.trilha_ativa]
                const rank  = i + 1
                const medal = MEDALS[i]

                return (
                  <div key={u.id}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${
                      isMe        ? 'border-blue-500/40 bg-blue-500/8 shadow-[0_0_20px_rgba(59,130,246,0.08)]'
                      : rank <= 3 ? `border-[#1e2d47] ${medal?.bg||''}`
                      : 'border-[#1e2d47] bg-[#111827] hover:border-[#243552]'
                    }`}>
                    <div className="w-8 text-center flex-shrink-0">
                      {rank <= 3
                        ? <span className="text-xl">{MEDALS[rank-1].icon}</span>
                        : <span className="text-sm font-bold text-[#4a5980]">#{rank}</span>
                      }
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold border-2 border-[#1e2d47] overflow-hidden flex-shrink-0">
                      {u.foto_url ? <img src={u.foto_url} alt="" className="w-full h-full object-cover"/> : getInitials(u.nome)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-semibold text-sm truncate">{u.nome}</p>
                        {isMe && <Badge color="blue" size="xs">você</Badge>}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-[#4a5980]">@{u.username}</p>
                        {trail && <p className="text-xs text-[#4a5980]">{trail.icon} {trail.label}</p>}
                      </div>
                      <XPBar pct={lvl.pct} height={3} color={trail?.color||'#3b82f6'} className="mt-1.5"/>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-heading font-bold text-base" style={{color: trail?.color||'#60a5fa'}}>
                        {(u.xp||0).toLocaleString()}
                      </p>
                      <p className="text-xs text-[#4a5980]">Nível {lvl.level}</p>
                    </div>
                  </div>
                )
              })}

              {filtered.length === 0 && (
                <div className="text-center py-16 text-[#8899bb]">
                  <div className="text-4xl mb-3">🏜️</div>
                  <p>Sem usuários ainda nesta trilha.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}
