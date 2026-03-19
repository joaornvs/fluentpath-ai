import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AppLayout } from '@/components/layout'
import { Card, Badge, StatCard, XPBar, ProgressRing, Spinner, Button, FormField } from '@/components/ui'
import { getProgress, getInterviews, getUserCourses, saveUserCourse, deleteUserCourse } from '@/services/supabase/db'
import { ALL_TRAILS } from '@/data/curriculum'
import { getLevelData, getLevelTitle, TRAIL_META } from '@/lib/gamification'
import toast from 'react-hot-toast'

// ── Progress ───────────────────────────────────────────────
export function Progress() {
  const { user, profile } = useAuth()
  const [progress, setProgress]     = useState([])
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    Promise.all([
      getProgress(user.id),
      getInterviews(user.id),
    ]).then(([p, i]) => {
      setProgress(p)
      setInterviews(i)
    }).catch(console.error)
    .finally(() => setLoading(false))
  }, [user?.id])

  const lvl   = getLevelData(profile?.xp || 0)
  const title = getLevelTitle(lvl.level)

  const byTrail = ALL_TRAILS.map(t => {
    const allNodes = Object.values(t.levels).flat()
    const done = allNodes.filter(n => progress.some(p => p.node_id === n.id)).length
    const pct  = allNodes.length ? Math.round((done / allNodes.length) * 100) : 0
    return { trail: t, total: allNodes.length, done, pct }
  })

  const avgScore = interviews.length
    ? Math.round(interviews.reduce((a, b) => a + (b.score || 0), 0) / interviews.length * 10) / 10
    : 0

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto anim-up">
        <h1 className="font-heading text-2xl font-bold mb-6">📈 Meu Progresso</h1>

        {/* XP card */}
        <Card glow className="mb-5 flex items-center gap-5 flex-wrap">
          <ProgressRing pct={lvl.pct} size={72} color="#3b82f6">
            <span className="font-heading font-bold text-sm">{lvl.level}</span>
          </ProgressRing>
          <div className="flex-1 min-w-0">
            <p className="font-heading text-lg font-bold">{profile?.nome || '...'}</p>
            <p className="text-sm text-[#8899bb] mb-2">{title}</p>
            <div className="flex justify-between text-xs text-[#4a5980] mb-1">
              <span>Nível {lvl.level}</span>
              <span>{lvl.current}/{lvl.needed} XP</span>
            </div>
            <XPBar pct={lvl.pct}/>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-heading text-3xl font-bold text-blue-300">{(profile?.xp || 0).toLocaleString()}</p>
            <p className="text-xs text-[#4a5980]">XP total</p>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          <StatCard icon="📦" label="Módulos"    value={loading ? '...' : progress.length}    color="text-blue-300"/>
          <StatCard icon="🎤" label="Entrevistas" value={loading ? '...' : interviews.length}  color="text-purple-300"/>
          <StatCard icon="⭐" label="Nota média"  value={loading ? '...' : (avgScore || '—')}  color="text-yellow-300" className="col-span-2 sm:col-span-1"/>
        </div>

        {/* Per trail */}
        <div className="flex flex-col gap-3 mb-5">
          {byTrail.map(({ trail, total, done, pct }) => (
            <Card key={trail.id}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{trail.icon}</span>
                <div className="flex-1">
                  <p className="font-heading font-bold text-sm" style={{ color: trail.color }}>{trail.title}</p>
                  <p className="text-xs text-[#4a5980]">{done}/{total} módulos</p>
                </div>
                <Badge color={pct === 100 ? 'green' : pct > 0 ? 'blue' : 'gray'}>{pct}%</Badge>
              </div>
              <XPBar pct={pct} color={trail.color}/>
            </Card>
          ))}
        </div>

        {/* Recent */}
        {!loading && progress.length > 0 && (
          <Card>
            <h3 className="font-heading font-bold text-sm mb-3">🕐 Concluídos recentemente</h3>
            <div className="flex flex-col gap-2">
              {[...progress].reverse().slice(0, 5).map((p, i) => {
                const trail = ALL_TRAILS.find(t => t.id === p.trail_id)
                const node  = trail ? Object.values(trail.levels).flat().find(n => n.id === p.node_id) : null
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#161f30]">
                    <span className="text-lg">{trail?.icon || '📦'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{node?.title || p.node_id}</p>
                      <p className="text-xs text-[#4a5980]">{new Date(p.completed_at).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <Badge color="green" size="xs">+15 XP</Badge>
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        {!loading && progress.length === 0 && (
          <div className="text-center py-10 text-[#4a5980]">
            <div className="text-4xl mb-2">📭</div>
            <p>Nenhum módulo completo ainda. Comece pelas Trilhas!</p>
          </div>
        )}
      </div>
    </AppLayout>
  )
}

// ── Courses ────────────────────────────────────────────────
export function Courses() {
  const { user } = useAuth()
  const [courses, setCourses]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [form, setForm] = useState({
    titulo: '', descricao: '', url: '',
    categoria: 'Data Science', nivel: 'iniciante', duracao: '',
  })
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  useEffect(() => {
    if (!user) { setLoading(false); return }
    getUserCourses(user.id)
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user?.id])

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.titulo.trim()) { toast.error('Título obrigatório.'); return }
    setSaving(true)
    try {
      await saveUserCourse(user.id, form)
      const updated = await getUserCourses(user.id)
      setCourses(updated)
      setShowForm(false)
      setForm({ titulo: '', descricao: '', url: '', categoria: 'Data Science', nivel: 'iniciante', duracao: '' })
      toast.success('Curso adicionado! 📚')
    } catch (err) {
      toast.error('Erro ao salvar: ' + (err.message || 'tente novamente'))
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Remover este curso?')) return
    try {
      await deleteUserCourse(id)
      setCourses(c => c.filter(x => x.id !== id))
      toast.success('Removido.')
    } catch (err) {
      toast.error('Erro ao remover.')
    }
  }

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto anim-up">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="font-heading text-2xl font-bold">➕ Meus Cursos</h1>
            <p className="text-sm text-[#8899bb] mt-1">Adicione seus próprios recursos de estudo</p>
          </div>
          <button
            onClick={() => setShowForm(s => !s)}
            className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${showForm ? 'border-[#1e2d47] text-[#8899bb]' : 'bg-blue-600 border-blue-600 text-white hover:bg-blue-500'}`}
          >
            {showForm ? '✕ Cancelar' : '+ Adicionar'}
          </button>
        </div>

        {showForm && (
          <Card className="mb-5 anim-up">
            <h3 className="font-heading font-bold text-base mb-4">Novo curso</h3>
            <form onSubmit={handleAdd} className="flex flex-col gap-3">
              <FormField label="Título">
                <input className="inp" value={form.titulo} onChange={set('titulo')} placeholder="Machine Learning Crash Course" required/>
              </FormField>
              <FormField label="Descrição">
                <textarea className="inp" rows={2} value={form.descricao} onChange={set('descricao')} placeholder="O que você vai aprender..."/>
              </FormField>
              <FormField label="URL (opcional)">
                <input className="inp" value={form.url} onChange={set('url')} placeholder="https://..."/>
              </FormField>
              <div className="grid grid-cols-3 gap-3">
                <FormField label="Categoria">
                  <select className="inp" value={form.categoria} onChange={set('categoria')}>
                    {['Data Science','GenAI','Programação','Estatística','Inglês','Outro'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Nível">
                  <select className="inp" value={form.nivel} onChange={set('nivel')}>
                    <option value="iniciante">Iniciante</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avancado">Avançado</option>
                  </select>
                </FormField>
                <FormField label="Duração">
                  <input className="inp" value={form.duracao} onChange={set('duracao')} placeholder="8h"/>
                </FormField>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all disabled:opacity-50"
              >
                {saving ? '⏳ Salvando...' : 'Salvar curso'}
              </button>
            </form>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center py-16"><Spinner size="lg"/></div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16 text-[#8899bb]">
            <div className="text-4xl mb-3">📭</div>
            <p className="font-semibold">Nenhum curso adicionado ainda.</p>
            <p className="text-sm mt-1 text-[#4a5980]">Adicione cursos, livros ou recursos que você usa!</p>
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
                    {c.descricao && <p className="text-sm text-[#8899bb] leading-relaxed">{c.descricao}</p>}
                    {c.url && (
                      <a href={c.url} target="_blank" rel="noreferrer"
                        className="text-sm text-blue-400 hover:underline mt-1 inline-block">
                        🔗 Abrir recurso
                      </a>
                    )}
                  </div>
                  <button onClick={() => handleDelete(c.id)}
                    className="text-[#4a5980] hover:text-red-400 transition-colors text-lg flex-shrink-0 p-1">
                    🗑
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
