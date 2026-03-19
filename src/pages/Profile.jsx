import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { AppLayout } from '@/components/layout'
import { Card, Button, Badge, XPBar, StatCard, FormField, Select, InfoBox, Spinner } from '@/components/ui'
import { getProgress, getInterviews, updateProfile, uploadAvatar } from '@/services/supabase/db'
import { getLevelData, getLevelTitle, getInitials, TRAIL_META, LEVEL_META } from '@/lib/gamification'
import toast from 'react-hot-toast'

export default function Profile() {
  const navigate = useNavigate()
  const { user, profile, logout, refreshProfile } = useAuth()
  const [progress, setProgress] = useState([])
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [prefs, setPrefs] = useState({ nivel_ingles: '', trilha_ativa: '' })
  const fileRef = useRef()

  useEffect(() => {
    if (!user) return
    if (profile) {
      setPrefs({ nivel_ingles: profile?.nivel_ingles || 'iniciante', trilha_ativa: profile?.trilha_ativa || 'data-science' })
    }
    Promise.all([getProgress(user.id), getInterviews(user.id)])
      .then(([p, i]) => { setProgress(p); setInterviews(i) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user, profile?.id])

  if (!user || loading) return (
    <AppLayout>
      <div className="flex justify-center items-center h-64"><Spinner size="lg"/></div>
    </AppLayout>
  )
  
  // Profile not loaded yet — show skeleton
  if (!profile) return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="skeleton h-32 rounded-2xl mb-5"/>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[1,2,3,4].map(i => <div key={i} className="skeleton h-24 rounded-2xl"/>)}
        </div>
      </div>
    </AppLayout>
  )

  const lvl = getLevelData(profile?.xp || 0)
  const title = getLevelTitle(lvl.level)
  const initials = getInitials(profile?.nome || '')
  const trail = TRAIL_META[profile?.trilha_ativa]
  const totalNodes = progress.length
  const totalInterviews = interviews.length
  const avgScore = interviews.length
    ? Math.round(interviews.reduce((a,b) => a + (b.score||0), 0) / interviews.length * 10) / 10
    : 0

  async function handleAvatar(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 3 * 1024 * 1024) { toast.error('Imagem muito grande. Máx 3MB.'); return }
    setUploading(true)
    try {
      const url = await uploadAvatar(user.id, file)
      refreshProfile({ foto_url: url })
      toast.success('Foto atualizada! 📸')
    } catch (err) {
      toast.error('Erro ao enviar foto: ' + err.message)
    } finally { setUploading(false) }
  }

  async function handleSavePrefs() {
    setSaving(true)
    try {
      await updateProfile(user.id, prefs)
      refreshProfile(prefs)
      toast.success('Preferências salvas!')
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto anim-up">
        {/* Header card */}
        <Card glow className="mb-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                onClick={() => fileRef.current?.click()}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold border-2 border-[#1e2d47] overflow-hidden cursor-pointer group relative"
              >
                {profile?.foto_url
                  ? <img src={profile?.foto_url} alt="avatar" className="w-full h-full object-cover"/>
                  : <span>{initials}</span>
                }
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                  {uploading ? <Spinner size="sm" color="white"/> : <span className="text-lg">📷</span>}
                </div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar}/>
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-xs border-2 border-[#111827] cursor-pointer"
                onClick={() => fileRef.current?.click()}>✏️</div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-heading text-xl font-bold">{profile?.nome}</h2>
              <p className="text-[#8899bb] text-sm mb-2">@{profile?.username}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
                <Badge color="purple">{title}</Badge>
                {trail && <Badge color="blue">{trail.icon} {trail.label}</Badge>}
                <Badge color={LEVEL_META[profile?.nivel_ingles]?.badge || 'gray'}>
                  {LEVEL_META[profile?.nivel_ingles]?.icon} {LEVEL_META[profile?.nivel_ingles]?.label}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-[#4a5980] mb-1.5">
                <span>Nível {lvl.level}</span>
                <span>{lvl.current}/{lvl.needed} XP</span>
              </div>
              <XPBar pct={lvl.pct}/>
            </div>

            {/* XP */}
            <div className="text-center flex-shrink-0">
              <p className="font-heading text-3xl font-bold text-blue-300">{(profile?.xp||0).toLocaleString()}</p>
              <p className="text-xs text-[#4a5980]">XP total</p>
            </div>
          </div>
        </Card>

        {/* Stats */}
        {loading ? (
          <div className="flex justify-center py-8"><Spinner/></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
            <StatCard icon="📦" label="Módulos completos" value={totalNodes} color="text-blue-300"/>
            <StatCard icon="🎤" label="Entrevistas" value={totalInterviews} color="text-purple-300"/>
            <StatCard icon="⭐" label="Nota média" value={avgScore||'—'} color="text-yellow-300" className="col-span-2 sm:col-span-1"/>
          </div>
        )}

        {/* Preferences */}
        <Card className="mb-5">
          <h3 className="font-heading text-base font-bold mb-4">⚙️ Preferências</h3>
          <div className="flex flex-col gap-3">
            <FormField label="Trilha principal">
              <Select value={prefs.trilha_ativa} onChange={e => setPrefs(p=>({...p,trilha_ativa:e.target.value}))}>
                {Object.entries(TRAIL_META).map(([k,v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
              </Select>
            </FormField>
            <FormField label="Nível de inglês">
              <Select value={prefs.nivel_ingles} onChange={e => setPrefs(p=>({...p,nivel_ingles:e.target.value}))}>
                {Object.entries(LEVEL_META).map(([k,v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
              </Select>
            </FormField>
            <Button variant="secondary" onClick={handleSavePrefs} loading={saving} className="self-start">
              💾 Salvar preferências
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d47] space-y-2 text-sm">
            <div className="flex justify-between text-[#8899bb]"><span>Email</span><span className="text-white">{user.email}</span></div>
            <div className="flex justify-between text-[#8899bb]"><span>Username</span><span className="text-white">@{profile?.username}</span></div>
          </div>
        </Card>

        {/* Danger zone */}
        <Button variant="danger" onClick={logout} fullWidth>🚪 Sair da conta</Button>
      </div>
    </AppLayout>
  )
}
