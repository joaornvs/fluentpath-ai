// ── Progress Page ──────────────────────────────────────────
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AppLayout } from '@/components/layout'
import { Card, Badge, StatCard, XPBar, ProgressRing, Spinner, Button, FormField, Select, InfoBox } from '@/components/ui'
import { getProgress, getInterviews, getUserCourses, saveUserCourse, deleteUserCourse } from '@/services/supabase/db'
import { ALL_TRAILS } from '@/data/curriculum'
import { getLevelData, getLevelTitle, TRAIL_META, LEVEL_META } from '@/lib/gamification'
import toast from 'react-hot-toast'

export function Progress() {
  const { user, profile } = useAuth()
  const [progress, setProgress] = useState([])
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    Promise.all([getProgress(user.id), getInterviews(user.id)])
      .then(([p,i]) => { setProgress(p); setInterviews(i) })
      .finally(() => setLoading(false))
  }, [user])

  if (!profile) return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="skeleton h-32 rounded-2xl mb-5"/>
        <div className="grid grid-cols-2 gap-3">
          {[1,2,3].map(i => <div key={i} className="skeleton h-24 rounded-2xl"/>)}
        </div>
      </div>
    </AppLayout>
  )

  const lvl = getLevelData(profile?.xp || 0)
  const title = getLevelTitle(lvl.level)

  const byTrail = ALL_TRAILS.map(t => {
    const allNodes = Object.values(t.levels).flat()
    const done = allNodes.filter(n => progress.some(p => p.node_id === n.id))
    const pct = allNodes.length ? Math.round((done.length/allNodes.length)*100) : 0
    return { trail:t, total:allNodes.length, done:done.length, pct }
  })

  const totalInterviews = interviews.length
  const avgInterviewScore = interviews.length
    ? Math.round(interviews.reduce((a,b) => a+(b.score||0),0) / interviews.length * 10) / 10
    : 0

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto anim-up">
        <h1 className="font-heading text-2xl font-bold mb-6">📈 Meu Progresso</h1>

        {/* XP card */}
        <Card glow className="mb-5 flex items-center gap-5 flex-wrap">
          <ProgressRing pct={lvl.pct} size={80} color="#3b82f6">
            <span className="font-heading font-bold text-base">{lvl.level}</span>
          </ProgressRing>
          <div className="flex-1 min-w-0">
            <p className="font-heading text-xl font-bold">{profile?.nome}</p>
            <p className="text-sm text-[#8899bb] mb-2">{title}</p>
            <div className="flex justify-between text-xs text-[#4a5980] mb-1">
              <span>Nível {lvl.level}</span><span>{lvl.current}/{lvl.needed} XP</span>
            </div>
            <XPBar pct={lvl.pct}/>
          </div>
          <div className="text-right">
            <p className="font-heading text-3xl font-bold text-blue-300">{(profile?.xp||0).toLocaleString()}</p>
            <p className="text-xs text-[#4a5980]">XP total</p>
          </div>
        </Card>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          <StatCard icon="📦" label="Módulos" value={progress.length} color="text-blue-300"/>
          <StatCard icon="🎤" label="Entrevistas" value={totalInterviews} color="text-purple-300"/>
          <StatCard icon="⭐" label="Nota média" value={avgInterviewScore||'—'} color="text-yellow-300" className="col-span-2 sm:col-span-1"/>
        </div>

        {/* Per trail */}
        {loading ? <div className="flex justify-center py-8"><Spinner/></div> : (
          <div className="flex flex-col gap-3 mb-5">
            {byTrail.map(({ trail, total, done, pct }) => {
              const meta = TRAIL_META[trail.id]
              return (
                <Card key={trail.id}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{trail.icon}</span>
                    <div className="flex-1">
                      <p className="font-heading font-bold text-sm" style={{color:trail.color}}>{trail.title}</p>
                      <p className="text-xs text-[#4a5980]">{done}/{total} módulos</p>
                    </div>
                    <Badge color={pct===100?'green':pct>0?'blue':'gray'}>{pct}%</Badge>
                  </div>
                  <XPBar pct={pct} color={trail.color}/>
                </Card>
              )
            })}
          </div>
        )}

        {/* Recent completions */}
        {progress.length > 0 && (
          <Card>
            <h3 className="font-heading text-base font-bold mb-3">🕐 Concluídos recentemente</h3>
            <div className="flex flex-col gap-2">
              {[...progress].reverse().slice(0,5).map((p,i) => {
                const trail = ALL_TRAILS.find(t => t.id === p.trail_id)
                const allNodes = trail ? Object.values(trail.levels).flat() : []
                const node = allNodes.find(n => n.id === p.node_id)
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#161f30]">
                    <span className="text-lg">{trail?.icon||'📦'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{node?.title||p.node_id}</p>
                      <p className="text-xs text-[#4a5980]">{new Date(p.completed_at).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <Badge color="green" size="xs">+15 XP</Badge>
                  </div>
                )
              })}
            </div>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}

// ── Courses Page ───────────────────────────────────────────
export function Courses() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ titulo:'', descricao:'', url:'', categoria:'Data Science', nivel:'iniciante', duracao:'' })
  const [saving, setSaving] = useState(false)
  const set = k => e => setForm(p=>({...p,[k]:e.target.value}))

  useEffect(() => {
    if (!user) return
    getUserCourses(user.id).then(d => { setCourses(d); setLoading(false) })
  }, [user])

  async function handleAdd(e) {
    e.preventDefault(); setSaving(true)
    try {
      await saveUserCourse(user.id, form)
      const updated = await getUserCourses(user.id)
      setCourses(updated)
      setShowForm(false)
      setForm({ titulo:'', descricao:'', url:'', categoria:'Data Science', nivel:'iniciante', duracao:'' })
      toast.success('Curso adicionado! 📚')
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  async function handleDelete(id) {
    if (!confirm('Remover este curso?')) return
    await deleteUserCourse(id)
    setCourses(c => c.filter(x => x.id !== id))
    toast.success('Removido.')
  }

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto anim-up">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="font-heading text-2xl font-bold">➕ Meus Cursos</h1>
            <p className="text-sm text-[#8899bb] mt-1">Adicione seus próprios recursos de estudo</p>
          </div>
          <Button onClick={() => setShowForm(s=>!s)} variant={showForm?'outline':'primary'}>
            {showForm ? '✕ Cancelar' : '+ Adicionar'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-5 anim-up">
            <h3 className="font-heading font-bold text-base mb-4">Novo curso</h3>
            <form onSubmit={handleAdd} className="flex flex-col gap-3">
              <FormField label="Título"><input className="inp" value={form.titulo} onChange={set('titulo')} placeholder="Machine Learning Crash Course" required/></FormField>
              <FormField label="Descrição"><textarea className="inp" rows={2} value={form.descricao} onChange={set('descricao')} placeholder="O que você vai aprender..." required/></FormField>
              <FormField label="URL (opcional)"><input className="inp" value={form.url} onChange={set('url')} placeholder="https://..."/></FormField>
              <div className="grid grid-cols-3 gap-3">
                <FormField label="Categoria">
                  <Select value={form.categoria} onChange={set('categoria')}>
                    {['Data Science','GenAI','Programação','Estatística','Inglês','Outro'].map(c => <option key={c}>{c}</option>)}
                  </Select>
                </FormField>
                <FormField label="Nível">
                  <Select value={form.nivel} onChange={set('nivel')}>
                    <option value="iniciante">Iniciante</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avancado">Avançado</option>
                  </Select>
                </FormField>
                <FormField label="Duração"><input className="inp" value={form.duracao} onChange={set('duracao')} placeholder="8h"/></FormField>
              </div>
              <Button type="submit" loading={saving} fullWidth>Salvar curso</Button>
            </form>
          </Card>
        )}

        {loading ? <div className="flex justify-center py-10"><Spinner/></div> :
          courses.length === 0 ? (
            <div className="text-center py-16 text-[#8899bb]">
              <div className="text-4xl mb-3">📭</div>
              <p>Nenhum curso adicionado ainda.</p>
              <p className="text-sm mt-1 text-[#4a5980]">Adicione cursos, livros ou outros recursos que você usa!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {courses.map(c => (
                <Card key={c.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-heading font-bold text-base">{c.titulo}</p>
                        <Badge color={c.nivel==='iniciante'?'green':c.nivel==='intermediario'?'yellow':'red'} size="xs">{c.nivel}</Badge>
                        <Badge color="blue" size="xs">{c.categoria}</Badge>
                        {c.duracao && <span className="text-xs text-[#4a5980]">⏱ {c.duracao}</span>}
                      </div>
                      <p className="text-sm text-[#8899bb] leading-relaxed">{c.descricao}</p>
                      {c.url && <a href={c.url} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline mt-1 inline-block">🔗 Abrir recurso</a>}
                    </div>
                    <button onClick={() => handleDelete(c.id)} className="text-[#4a5980] hover:text-red-400 transition-colors text-lg flex-shrink-0">🗑</button>
                  </div>
                </Card>
              ))}
            </div>
          )
        }
      </div>
    </AppLayout>
  )
}
