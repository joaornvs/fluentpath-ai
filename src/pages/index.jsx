// ============================================================
// PAGES — LearnPath
// ============================================================
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { AppLayout, PublicLayout } from '@/components/layout'
import { Button, Card, Badge, Spinner, XPBar, InfoBox, FormField, LoadingScreen, ProgressRing } from '@/components/ui'
import TrailTree from '@/components/trail/TrailTree'
import NodeModal from '@/components/trail/NodeModal'
import { ALL_TRAILS, INTERVIEW_QUESTIONS, LEVELS_CONFIG } from '@/data/curriculum'
import { getLevelData, getLevelTitle, getInitials } from '@/lib/gamification'
import { getProgress, markNodeComplete, saveExerciseResult, getUserCourses, saveUserCourse, deleteUserCourse, saveInterviewResult, getRanking, updateProfile, signUp, signIn } from '@/services/supabase/db'
import toast from 'react-hot-toast'

// ── LANDING ───────────────────────────────────────────────
export function Landing() {
  const navigate = useNavigate()
  return (
    <PublicLayout>
      <section className="flex flex-col items-center text-center px-4 py-24 max-w-3xl mx-auto animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-sm text-blue-300 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
          Trilhas baseadas nos melhores livros técnicos
        </div>
        <h1 className="font-heading text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-5">
          Aprenda Tech com<br /><span className="grad-logo">trilhas estruturadas</span>
        </h1>
        <p className="text-lg text-[#8899bb] leading-relaxed max-w-xl mb-9">
          Data Science, GenAI e Programação em trilhas progressivas do iniciante ao avançado. Conteúdo curado de livros como Deep Learning (Goodfellow), Data Science from Scratch e NLP with Transformers.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-14">
          <button onClick={() => navigate('/register')} className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-base transition-all shadow-[0_0_32px_rgba(59,130,246,0.3)] hover:-translate-y-px">
            Começar grátis 🚀
          </button>
          <button onClick={() => navigate('/login')} className="px-7 py-3 rounded-xl border border-[#1c2840] text-[#8899bb] hover:bg-[#111624] hover:text-white text-base transition-all">
            Já tenho conta
          </button>
        </div>

        {/* Trail preview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          {ALL_TRAILS.map(t => {
            const total = Object.values(t.levels).flat().length
            return (
              <div key={t.id} className="bg-[#111624] border border-[#1c2840] rounded-2xl p-5 text-left hover:border-blue-500/30 transition-all">
                <div className="text-3xl mb-3">{t.icon}</div>
                <h3 className="font-heading font-bold mb-1" style={{ color: t.color }}>{t.title}</h3>
                <p className="text-xs text-[#8899bb] mb-3 leading-relaxed">{t.description.slice(0, 80)}...</p>
                <p className="text-xs text-[#4a5980]">{total} módulos · 3 níveis</p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl text-center">
          {[['📚','Baseado em livros'], ['🎯','Trilhas por nível'], ['🎤','Entrevistas técnicas'], ['🏆','Ranking global']].map(([icon, label]) => (
            <div key={label} className="p-4 rounded-xl border border-[#1c2840] bg-[#111624]">
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-xs text-[#8899bb]">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  )
}

// ── REGISTER ──────────────────────────────────────────────
export function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const set = k => e => { setForm(p => ({ ...p, [k]: e.target.value })); setError('') }

  async function handle(e) {
    e.preventDefault()
    if (form.password.length < 6) { setError('Senha mínimo 6 caracteres.'); return }
    setLoading(true)
    try { await signUp(form); navigate('/confirm-email', { state: { email: form.email } }) }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }
  return (
    <PublicLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-70px)] px-4 py-10">
        <div className="w-full max-w-md animate-fade-in bg-[#111624] border border-[#1c2840] rounded-2xl p-8">
          <h2 className="font-heading text-2xl font-bold mb-1">Criar conta</h2>
          <p className="text-[#8899bb] text-sm mb-6">Comece sua trilha de aprendizado hoje</p>
          <InfoBox type="info" className="mb-5">📧 Você receberá um email de confirmação para ativar a conta.</InfoBox>
          <form onSubmit={handle} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Nome"><input value={form.nome} onChange={set('nome')} placeholder="João Silva" required /></FormField>
              <FormField label="Username"><input value={form.username} onChange={set('username')} placeholder="joao123" required /></FormField>
            </div>
            <FormField label="Email"><input type="email" value={form.email} onChange={set('email')} placeholder="joao@email.com" required /></FormField>
            <FormField label="Senha (mín. 6)"><input type="password" value={form.password} onChange={set('password')} placeholder="••••••" required /></FormField>
            {error && <InfoBox type="error">{error}</InfoBox>}
            <Button type="submit" loading={loading} className="w-full mt-1">Criar conta →</Button>
          </form>
          <p className="text-center text-sm text-[#8899bb] mt-5">Já tem conta? <Link to="/login" className="text-blue-400 hover:underline">Entrar</Link></p>
        </div>
      </div>
    </PublicLayout>
  )
}

// ── LOGIN ─────────────────────────────────────────────────
export function Login() {
  const navigate = useNavigate()
  const { reloadProfile } = useAuth()
  const [form, setForm] = useState({ identifier: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const set = k => e => { setForm(p => ({ ...p, [k]: e.target.value })); setError('') }

  async function handle(e) {
    e.preventDefault(); setLoading(true)
    try { await signIn(form); await reloadProfile(); navigate('/dashboard') }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }
  return (
    <PublicLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-70px)] px-4 py-10">
        <div className="w-full max-w-md animate-fade-in bg-[#111624] border border-[#1c2840] rounded-2xl p-8">
          <h2 className="font-heading text-2xl font-bold mb-1">Bem-vindo de volta 👋</h2>
          <p className="text-[#8899bb] text-sm mb-8">Entre para continuar sua trilha</p>
          <form onSubmit={handle} className="flex flex-col gap-4">
            <FormField label="Email ou Username"><input value={form.identifier} onChange={set('identifier')} placeholder="joao@email.com ou joao123" required /></FormField>
            <FormField label="Senha"><input type="password" value={form.password} onChange={set('password')} placeholder="••••••" required /></FormField>
            {error && <InfoBox type="error">{error}</InfoBox>}
            <Button type="submit" loading={loading} className="w-full mt-1">Entrar →</Button>
          </form>
          <p className="text-center text-sm text-[#8899bb] mt-5">Não tem conta? <Link to="/register" className="text-blue-400 hover:underline">Criar agora</Link></p>
        </div>
      </div>
    </PublicLayout>
  )
}

// ── CONFIRM EMAIL ─────────────────────────────────────────
export function ConfirmEmail() {
  const { state } = window.history.state?.usr ? window.history.state : { state: {} }
  return (
    <PublicLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-70px)] px-4">
        <div className="w-full max-w-md text-center animate-fade-in bg-[#111624] border border-[#1c2840] rounded-2xl p-10">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="font-heading text-2xl font-bold mb-3">Confirme seu email!</h2>
          <p className="text-[#8899bb] text-sm mb-5 leading-relaxed">Enviamos um link de confirmação. Clique nele para ativar sua conta e depois entre aqui.</p>
          <InfoBox type="warning" className="mb-5 text-left">💡 Não recebeu? Verifique a pasta de <strong>spam</strong>.</InfoBox>
          <Link to="/login"><Button className="w-full">Já confirmei → Entrar</Button></Link>
        </div>
      </div>
    </PublicLayout>
  )
}

// ── DASHBOARD (Trail selector + Tree) ─────────────────────
export function Dashboard() {
  const { user, profile } = useAuth()
  const [activeTrail, setActiveTrail] = useState(ALL_TRAILS[0])
  const [completedIds, setCompletedIds] = useState(new Set())
  const [selectedNode, setSelectedNode] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getProgress(user.id).then(data => {
      setCompletedIds(new Set(data.map(d => d.node_id)))
      setLoading(false)
    })
  }, [user])

  async function handleComplete(node, correctCount, totalExercises) {
    if (!user) return
    await markNodeComplete(user.id, node.id, activeTrail.id)
    if (totalExercises > 0) await saveExerciseResult(user.id, node.id, 'batch', correctCount > 0)
    setCompletedIds(prev => new Set([...prev, node.id]))
    toast.success(`✅ "${node.title}" completo! +15 XP`)
  }

  const totalNodes = Object.values(activeTrail.levels).flat().length
  const completedInTrail = Object.values(activeTrail.levels).flat().filter(n => completedIds.has(n.id)).length
  const pct = totalNodes > 0 ? Math.round((completedInTrail / totalNodes) * 100) : 0

  return (
    <AppLayout>
      <div className="animate-fade-in">
        {/* Trail selector */}
        <div className="flex flex-wrap gap-3 mb-6">
          {ALL_TRAILS.map(t => (
            <button key={t.id} onClick={() => setActiveTrail(t)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${activeTrail.id === t.id ? 'border-blue-500 bg-blue-500/10 text-blue-300' : 'border-[#1c2840] text-[#8899bb] hover:border-blue-500/40 hover:text-white'}`}>
              <span>{t.icon}</span> {t.title}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-6 p-4 rounded-xl border border-[#1c2840] bg-[#111624] flex items-center gap-4">
          <ProgressRing pct={pct} size={56} color={activeTrail.color}>
            <span className="text-xs font-bold">{pct}%</span>
          </ProgressRing>
          <div className="flex-1">
            <p className="font-medium text-sm mb-1">{activeTrail.title} — progresso</p>
            <XPBar pct={pct} color={activeTrail.color} />
            <p className="text-xs text-[#4a5980] mt-1">{completedInTrail}/{totalNodes} módulos completos</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : (
          <TrailTree trail={activeTrail} completedIds={completedIds} onNodeClick={setSelectedNode} />
        )}
      </div>

      {selectedNode && (
        <NodeModal
          node={selectedNode}
          completed={completedIds.has(selectedNode.id)}
          onComplete={handleComplete}
          onClose={() => setSelectedNode(null)}
          userId={user?.id}
        />
      )}
    </AppLayout>
  )
}

// ── PROGRESS ──────────────────────────────────────────────
export function Progress() {
  const { user, profile } = useAuth()
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)
  const lvl = getLevelData(profile?.xp || 0)
  const title = getLevelTitle(lvl.level)

  useEffect(() => {
    if (!user) return
    getProgress(user.id).then(d => { setProgress(d); setLoading(false) })
  }, [user])

  const byTrail = ALL_TRAILS.map(t => {
    const allNodes = Object.values(t.levels).flat()
    const done = allNodes.filter(n => progress.some(p => p.node_id === n.id))
    return { trail: t, total: allNodes.length, done: done.length, pct: allNodes.length ? Math.round((done.length / allNodes.length) * 100) : 0 }
  })

  return (
    <AppLayout>
      <div className="animate-fade-in max-w-2xl">
        <h1 className="font-heading text-2xl font-bold mb-6">📈 Meu Progresso</h1>

        {/* XP Card */}
        <Card className="mb-5 flex items-center gap-6 flex-wrap">
          <ProgressRing pct={lvl.pct} size={80} color="#3b82f6">
            <span className="font-heading text-base font-bold">{lvl.level}</span>
          </ProgressRing>
          <div className="flex-1">
            <p className="font-heading text-xl font-bold mb-0.5">{profile?.nome}</p>
            <p className="text-sm text-[#8899bb] mb-2">{title}</p>
            <p className="text-xs text-[#4a5980]">{lvl.current}/{lvl.needed} XP para nível {lvl.level + 1}</p>
            <XPBar pct={lvl.pct} className="mt-2" />
          </div>
          <div className="text-right">
            <p className="font-heading text-3xl font-bold text-blue-300">{profile?.xp || 0}</p>
            <p className="text-xs text-[#4a5980]">XP total</p>
          </div>
        </Card>

        {/* Per trail */}
        <div className="flex flex-col gap-3 mb-5">
          {byTrail.map(({ trail, total, done, pct }) => (
            <Card key={trail.id}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{trail.icon}</span>
                <div className="flex-1">
                  <p className="font-heading font-bold" style={{ color: trail.color }}>{trail.title}</p>
                  <p className="text-xs text-[#4a5980]">{done}/{total} módulos</p>
                </div>
                <Badge color={pct === 100 ? 'green' : pct > 0 ? 'blue' : 'gray'}>{pct}%</Badge>
              </div>
              <XPBar pct={pct} color={trail.color} />
            </Card>
          ))}
        </div>

        {/* Recent completions */}
        {loading ? <Spinner /> : progress.length > 0 && (
          <Card>
            <h3 className="font-heading text-base font-bold mb-3">🕐 Módulos recentes</h3>
            <div className="flex flex-col gap-2">
              {progress.slice(-5).reverse().map((p, i) => {
                const trail = ALL_TRAILS.find(t => t.id === p.trail_id)
                const allNodes = trail ? Object.values(trail.levels).flat() : []
                const node = allNodes.find(n => n.id === p.node_id)
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#161d2e]">
                    <span className="text-lg">{trail?.icon || '📦'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{node?.title || p.node_id}</p>
                      <p className="text-xs text-[#4a5980]">{trail?.title} · {new Date(p.completed_at).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <Badge color="green">+15 XP</Badge>
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

// ── INTERVIEW ─────────────────────────────────────────────
export function Interview() {
  const { user, profile } = useAuth()
  const [view, setView] = useState('setup')
  const [config, setConfig] = useState({ trailId: 'data-science', nivel: 'iniciante' })
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  function startInterview() {
    const qs = INTERVIEW_QUESTIONS[config.trailId]?.[config.nivel] || []
    if (!qs.length) { toast.error('Sem perguntas para este nível ainda.'); return }
    setQuestions(qs); setAnswers([]); setCurrent(0); setSubmitted(false); setScore(0); setView('quiz')
  }

  function handleAnswer(answer) {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    if (current + 1 < questions.length) { setCurrent(c => c + 1) }
    else {
      const sc = newAnswers.filter((a, i) => a === questions[i].id).length
      setScore(sc)
      setSubmitted(true)
      if (user) saveInterviewResult(user.id, config.trailId, config.nivel, newAnswers.length, questions.length)
      toast.success(`Entrevista concluída! +${newAnswers.length * 5} XP`)
    }
  }

  const trail = ALL_TRAILS.find(t => t.id === config.trailId)

  return (
    <AppLayout>
      <div className="animate-fade-in max-w-2xl">
        <h1 className="font-heading text-2xl font-bold mb-2">🎤 Entrevistas Técnicas</h1>
        <p className="text-sm text-[#8899bb] mb-6">Perguntas reais de entrevista baseadas nos livros de referência</p>

        {view === 'setup' && (
          <div className="flex flex-col gap-4">
            <InfoBox type="warning" className="text-center">
              <div className="text-3xl mb-2">⚠️</div>
              <strong>Responda com suas próprias palavras.</strong><br />
              <span className="text-sm">O objetivo é fixar o vocabulário técnico em inglês.</span>
            </InfoBox>
            <Card>
              <h3 className="font-heading text-base font-bold mb-4">⚙️ Configure a entrevista</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-[#8899bb] uppercase tracking-wide block mb-2">Trilha</label>
                  <div className="grid grid-cols-3 gap-2">
                    {ALL_TRAILS.map(t => (
                      <button key={t.id} onClick={() => setConfig(p => ({ ...p, trailId: t.id }))}
                        className={`p-3 rounded-xl border text-sm text-center transition-all ${config.trailId === t.id ? 'border-blue-500 bg-blue-500/10 text-blue-300' : 'border-[#1c2840] text-[#8899bb] hover:border-blue-500/40'}`}>
                        <div className="text-2xl mb-1">{t.icon}</div>{t.title}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#8899bb] uppercase tracking-wide block mb-2">Nível</label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(LEVELS_CONFIG).map(([k, v]) => (
                      <button key={k} onClick={() => setConfig(p => ({ ...p, nivel: k }))}
                        className={`p-3 rounded-xl border text-sm text-center transition-all ${config.nivel === k ? 'border-blue-500 bg-blue-500/10 text-blue-300' : 'border-[#1c2840] text-[#8899bb] hover:border-blue-500/40'}`}>
                        <div className="text-2xl mb-1">{v.icon}</div>{v.label}
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={startInterview} className="w-full">🚀 Iniciar entrevista</Button>
              </div>
            </Card>
          </div>
        )}

        {view === 'quiz' && !submitted && questions[current] && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4 text-sm text-[#8899bb]">
              <span>Pergunta {current + 1} de {questions.length}</span>
              <span className="flex items-center gap-2">{trail?.icon} {trail?.title} · {LEVELS_CONFIG[config.nivel]?.label}</span>
            </div>
            <div className="h-1 bg-[#1c2840] rounded-full mb-6"><div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>

            <Card className="mb-5">
              <Badge color="blue" className="mb-3">{questions[current].category}</Badge>
              <p className="text-base font-medium leading-relaxed mb-6">{questions[current].question}</p>
              <div className="p-4 rounded-xl bg-[#161d2e] border border-[#1c2840]">
                <p className="text-xs text-[#4a5980] mb-2 uppercase tracking-wide">Resposta modelo (estude este padrão):</p>
                <p className="text-sm text-[#8899bb] leading-relaxed">{questions[current].answer}</p>
              </div>
            </Card>
            <Button onClick={() => handleAnswer(questions[current].id)} className="w-full">
              {current + 1 < questions.length ? 'Próxima pergunta →' : 'Finalizar entrevista'}
            </Button>
          </div>
        )}

        {submitted && (
          <div className="animate-fade-in text-center">
            <Card className="mb-4">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="font-heading text-xl font-bold mb-2">Entrevista concluída!</h3>
              <p className="text-[#8899bb] text-sm mb-4">{questions.length} perguntas respondidas · +{questions.length * 5} XP</p>
              <div className="flex justify-center gap-4 text-sm text-[#8899bb] mb-4">
                <span>{trail?.icon} {trail?.title}</span>
                <span>{LEVELS_CONFIG[config.nivel]?.icon} {LEVELS_CONFIG[config.nivel]?.label}</span>
              </div>
              <InfoBox type="success">💡 Revise as respostas acima e tente explicar com suas próprias palavras. A fluência vem com a repetição!</InfoBox>
            </Card>
            <Button onClick={() => setView('setup')} className="w-full">🔄 Nova entrevista</Button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}

// ── MY COURSES (custom) ────────────────────────────────────
export function Courses() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ titulo: '', descricao: '', url: '', categoria: 'Data Science', nivel: 'iniciante', duracao: '' })
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  useEffect(() => {
    if (!user) return
    getUserCourses(user.id).then(d => { setCourses(d); setLoading(false) })
  }, [user])

  async function handleAdd(e) {
    e.preventDefault()
    try {
      await saveUserCourse(user.id, form)
      const updated = await getUserCourses(user.id)
      setCourses(updated)
      setShowForm(false)
      setForm({ titulo: '', descricao: '', url: '', categoria: 'Data Science', nivel: 'iniciante', duracao: '' })
      toast.success('Curso adicionado!')
    } catch (err) { toast.error(err.message) }
  }

  async function handleDelete(id) {
    if (!confirm('Remover este curso?')) return
    await deleteUserCourse(id)
    setCourses(c => c.filter(x => x.id !== id))
    toast.success('Curso removido.')
  }

  return (
    <AppLayout>
      <div className="animate-fade-in max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-2xl font-bold">➕ Meus Cursos</h1>
            <p className="text-sm text-[#8899bb] mt-1">Adicione seus próprios cursos e recursos de estudo</p>
          </div>
          <Button onClick={() => setShowForm(s => !s)} variant={showForm ? 'outline' : 'primary'}>
            {showForm ? '✕ Cancelar' : '+ Adicionar'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-5 animate-fade-in">
            <h3 className="font-heading text-base font-bold mb-4">Novo curso</h3>
            <form onSubmit={handleAdd} className="flex flex-col gap-3">
              <FormField label="Título do curso"><input value={form.titulo} onChange={set('titulo')} placeholder="Ex: Machine Learning Crash Course" required /></FormField>
              <FormField label="Descrição"><textarea value={form.descricao} onChange={set('descricao')} placeholder="O que você vai aprender..." rows={2} required /></FormField>
              <FormField label="URL (opcional)"><input value={form.url} onChange={set('url')} placeholder="https://..." /></FormField>
              <div className="grid grid-cols-3 gap-3">
                <FormField label="Categoria">
                  <select value={form.categoria} onChange={set('categoria')}>
                    {['Data Science','GenAI','Programação','Estatística','Outro'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Nível">
                  <select value={form.nivel} onChange={set('nivel')}>
                    <option value="iniciante">Iniciante</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avancado">Avançado</option>
                  </select>
                </FormField>
                <FormField label="Duração"><input value={form.duracao} onChange={set('duracao')} placeholder="Ex: 8h" /></FormField>
              </div>
              <Button type="submit" className="w-full">Salvar curso</Button>
            </form>
          </Card>
        )}

        {loading ? <div className="flex justify-center py-10"><Spinner /></div> : courses.length === 0 ? (
          <div className="text-center py-16 text-[#8899bb]">
            <div className="text-4xl mb-3">📭</div>
            <p>Nenhum curso adicionado ainda.</p>
            <p className="text-sm mt-1 text-[#4a5980]">Adicione cursos que você está fazendo ou pretende fazer!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {courses.map(c => (
              <Card key={c.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-heading font-bold text-base">{c.titulo}</p>
                      <Badge color={c.nivel === 'iniciante' ? 'green' : c.nivel === 'intermediario' ? 'yellow' : 'red'}>{c.nivel}</Badge>
                      <Badge color="blue">{c.categoria}</Badge>
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
        )}
      </div>
    </AppLayout>
  )
}

// ── RANKING ───────────────────────────────────────────────
export function Ranking() {
  const { profile } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const medals = ['🥇', '🥈', '🥉']

  useEffect(() => { getRanking(50).then(d => { setUsers(d); setLoading(false) }) }, [])

  return (
    <AppLayout>
      <div className="animate-fade-in max-w-2xl">
        <h1 className="font-heading text-2xl font-bold mb-2">🏆 Ranking Global</h1>
        <p className="text-sm text-[#8899bb] mb-6">Os estudantes com mais XP na plataforma</p>
        {loading ? <div className="flex justify-center py-20"><Spinner size="lg" /></div> : (
          <div className="flex flex-col gap-2">
            {users.map((u, i) => {
              const lvl = getLevelData(u.xp || 0)
              const isMe = u.id === profile?.id
              const trail = ALL_TRAILS.find(t => t.id === u.trilha_ativa)
              return (
                <div key={u.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${isMe ? 'border-blue-500/50 bg-blue-500/8' : i < 3 ? 'border-yellow-500/20 bg-yellow-500/4' : 'border-[#1c2840] bg-[#111624]'}`}>
                  <div className="w-8 text-center font-heading font-bold text-lg flex-shrink-0">
                    {i < 3 ? medals[i] : <span className="text-[#4a5980] text-sm">#{i + 1}</span>}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold border-2 border-[#1c2840] flex-shrink-0">
                    {getInitials(u.nome)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm truncate">{u.nome}</p>
                      {isMe && <span className="text-xs text-blue-300 font-bold">• você</span>}
                    </div>
                    <p className="text-xs text-[#4a5980] truncate">@{u.username} · {trail?.icon} {trail?.title || '—'}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-heading font-bold text-blue-300">{(u.xp || 0).toLocaleString()}</p>
                    <p className="text-xs text-[#4a5980]">Nível {lvl.level}</p>
                  </div>
                </div>
              )
            })}
            {users.length === 0 && <div className="text-center py-16 text-[#8899bb]"><div className="text-4xl mb-3">🏜️</div><p>Sem usuários ainda. Seja o primeiro!</p></div>}
          </div>
        )}
      </div>
    </AppLayout>
  )
}

// ── PROFILE ───────────────────────────────────────────────
export function Profile() {
  const navigate = useNavigate()
  const { user, profile, logout, refreshProfile, reloadProfile } = useAuth()
  const lvl = getLevelData(profile?.xp || 0)
  const [editNivel, setEditNivel] = useState(profile?.nivel_escolhido || 'iniciante')
  const [saving, setSaving] = useState(false)

  if (!profile) return <LoadingScreen />

  async function saveNivel() {
    setSaving(true)
    await updateProfile(user.id, { nivel_escolhido: editNivel })
    refreshProfile({ nivel_escolhido: editNivel })
    toast.success('Preferência salva!')
    setSaving(false)
  }

  return (
    <AppLayout>
      <div className="animate-fade-in max-w-xl">
        {/* Header */}
        <Card className="flex items-center gap-5 mb-5 flex-wrap">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold border-2 border-[#1c2840] flex-shrink-0">
            {getInitials(profile.nome)}
          </div>
          <div className="flex-1">
            <p className="font-heading text-xl font-bold">{profile.nome}</p>
            <p className="text-sm text-[#8899bb]">@{profile.username}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge color="purple">Nível {lvl.level} · {getLevelTitle(lvl.level)}</Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="font-heading text-3xl font-bold text-blue-300">{profile.xp || 0}</p>
            <p className="text-xs text-[#4a5980]">XP total</p>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="mb-5">
          <h3 className="font-heading text-base font-bold mb-4">⚙️ Preferências</h3>
          <div className="flex flex-col gap-3">
            <FormField label="Nível de inglês">
              <select value={editNivel} onChange={e => setEditNivel(e.target.value)}>
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
              </select>
            </FormField>
            <Button onClick={saveNivel} loading={saving} variant="outline" className="self-start">Salvar preferência</Button>
          </div>
          <div className="divider my-4 border-t border-[#1c2840]" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-[#8899bb]">Email</span><span>{user?.email}</span></div>
            <div className="flex justify-between"><span className="text-[#8899bb]">XP</span><span className="text-blue-300 font-bold">{profile.xp || 0}</span></div>
            <div className="flex justify-between"><span className="text-[#8899bb]">Nível</span><span>{lvl.level}</span></div>
          </div>
        </Card>

        <Button variant="danger" onClick={logout} className="w-full">🚪 Sair da conta</Button>
      </div>
    </AppLayout>
  )
}
