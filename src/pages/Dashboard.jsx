import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AppLayout } from '@/components/layout'
import { Card, Badge, Button, XPBar, Spinner, ProgressRing } from '@/components/ui'
import { getProgress, markNodeComplete, saveExerciseResult } from '@/services/supabase/db'
import { ALL_TRAILS } from '@/data/curriculum'
import { TRAIL_META, LEVEL_META, getLevelData } from '@/lib/gamification'
import toast from 'react-hot-toast'

// ── Node component ─────────────────────────────────────────
function TrailNode({ node, completed, unlocked, onClick }) {
  const levelColors = {
    iniciante:     { border: '#10b981', bg: 'rgba(16,185,129,0.06)',  text: '#10b981' },
    intermediario: { border: '#f59e0b', bg: 'rgba(245,158,11,0.06)',  text: '#f59e0b' },
    avancado:      { border: '#ef4444', bg: 'rgba(239,68,68,0.06)',   text: '#ef4444' },
  }
  // Fallback safe — never crash if level is missing
  const c = levelColors[node.level] || levelColors.iniciante
  const statusIcon = completed ? '✅' : unlocked ? '🔓' : '🔒'

  return (
    <div
      onClick={() => unlocked && onClick(node)}
      className={`relative w-64 p-4 rounded-2xl border-2 transition-all duration-200 ${unlocked ? 'cursor-pointer hover:-translate-y-1' : 'cursor-not-allowed opacity-40'}`}
      style={{ borderColor: completed ? '#10b981' : unlocked ? c.border : '#1e2d47', background: c.bg }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-sm leading-tight mb-1 truncate">{node.title}</p>
          <p className="text-xs text-[#8899bb] line-clamp-2 leading-relaxed">{node.description}</p>
        </div>
        <span className="text-lg flex-shrink-0">{statusIcon}</span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <Badge color={completed?'green':unlocked?'blue':'gray'} size="xs">
          {LEVEL_META[node.level]?.icon} {LEVEL_META[node.level]?.label}
        </Badge>
        <span className="text-xs text-[#4a5980]">⏱ {node.duration}</span>
      </div>
    </div>
  )
}

// ── Connector ──────────────────────────────────────────────
function Connector({ done }) {
  return (
    <div className="flex justify-center my-0.5">
      <div className={`w-0.5 h-6 rounded-full transition-colors ${done ? 'bg-emerald-500' : 'bg-[#1e2d47]'}`}/>
    </div>
  )
}

// ── Level Section ──────────────────────────────────────────
function LevelSection({ levelKey, nodes, completedIds, onNodeClick }) {
  const [open, setOpen] = useState(levelKey === 'iniciante')
  const meta = LEVEL_META[levelKey] || LEVEL_META['iniciante']
  const done = nodes.filter(n => completedIds.has(n.id)).length

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#1e2d47] bg-[#111827] hover:border-[#243552] transition-all mb-3"
      >
        <span className="text-2xl">{meta.icon}</span>
        <div className="flex-1 text-left">
          <p className="font-heading font-bold text-sm" style={{ color: meta.color }}>{meta.label}</p>
          <p className="text-xs text-[#4a5980]">{nodes.length} módulos</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#4a5980]">{done}/{nodes.length}</span>
          <span className="text-[#4a5980]">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className="anim-up">
          {nodes.map((node, i) => {
            const prereqs = node.prerequisites || []; const unlocked = prereqs.length === 0 || prereqs.every(p => completedIds.has(p))
            const completed = completedIds.has(node.id)
            return (
              <div key={node.id}>
                {i > 0 && <Connector done={completedIds.has(nodes[i-1].id)}/>}
                <div className="flex justify-center">
                  <TrailNode node={{...node, level: levelKey}} completed={completed} unlocked={unlocked} onClick={onNodeClick}/>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Node Modal ─────────────────────────────────────────────
function NodeModal({ node, completed, onComplete, onClose }) {
  const [tab, setTab] = useState('content')
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  if (!node) return null
  const meta = LEVEL_META[node.level] || LEVEL_META['iniciante']
  const hasEx = node.exercises?.length > 0

  function handleSubmit() {
    let c = 0
    node.exercises.forEach(ex => { if (answers[ex.id] === ex.answer) c++ })
    setScore(c)
    setSubmitted(true)
    onComplete(node, c, node.exercises.length)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="bg-[#111827] border border-[#1e2d47] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[92vh] flex flex-col anim-up overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#1e2d47] flex-shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <Badge color={meta.badge} size="xs">{meta.icon} {meta.label}</Badge>
                <span className="text-xs text-[#4a5980]">⏱ {node.duration}</span>
                {completed && <Badge color="green" size="xs">✅ Completo</Badge>}
              </div>
              <h2 className="font-heading text-lg font-bold leading-tight">{node.title}</h2>
              <p className="text-sm text-[#8899bb] mt-1">{node.description}</p>
            </div>
            <button onClick={onClose} className="text-[#4a5980] hover:text-white text-xl flex-shrink-0 p-1">✕</button>
          </div>
          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            {[['content','📖 Conteúdo'], hasEx && ['exercises','✍️ Exercícios']].filter(Boolean).map(([id,label]) => (
              <button key={id} onClick={() => setTab(id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${tab===id ? 'bg-blue-600 text-white' : 'text-[#8899bb] hover:text-white'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === 'content' && (
            <div className="flex flex-col gap-5">
              {/* Topics */}
              <div>
                <h3 className="font-heading font-bold text-sm mb-2.5 text-[#8899bb] uppercase tracking-wide">📋 Tópicos</h3>
                <div className="flex flex-wrap gap-2">
                  {node.topics.map((t,i) => <span key={i} className="px-3 py-1 rounded-lg bg-[#161f30] border border-[#1e2d47] text-xs text-[#8899bb]">{t}</span>)}
                </div>
              </div>

              {/* English words */}
              <div>
                <h3 className="font-heading font-bold text-sm mb-2.5 text-[#8899bb] uppercase tracking-wide">🇺🇸 Vocabulário em inglês</h3>
                <div className="flex flex-col gap-2">
                  {node.englishWords?.map((w,i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#161f30] border border-[#1e2d47]">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono font-bold text-blue-300 text-base">{w.word}</span>
                        <span className="text-xs text-[#4a5980] font-mono">[{w.pronunciation}]</span>
                        <span className="text-xs text-[#8899bb]">= <strong className="text-white">{w.pt}</strong></span>
                      </div>
                      <p className="text-xs text-[#8899bb] mt-1 italic">"{w.example}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phrases */}
              {node.englishPhrases?.length > 0 && (
                <div>
                  <h3 className="font-heading font-bold text-sm mb-2.5 text-[#8899bb] uppercase tracking-wide">💬 Frases práticas</h3>
                  <div className="flex flex-col gap-2">
                    {node.englishPhrases.map((p,i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#161f30] border border-[#1e2d47]">
                        <p className="text-sm font-medium">🇺🇸 {p.en}</p>
                        <p className="text-xs text-[#8899bb] mt-0.5">🇧🇷 {p.pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source */}
              <div className="p-3 rounded-xl bg-blue-500/8 border border-blue-500/20 text-sm text-blue-200">
                📚 <strong>Fonte:</strong> {node.source}
              </div>

              {/* Complete button */}
              {!completed && !hasEx && (
                <Button onClick={() => { onComplete(node,0,0); onClose() }} fullWidth>
                  ✅ Marcar como completo (+15 XP)
                </Button>
              )}
              {!completed && hasEx && (
                <Button onClick={() => setTab('exercises')} fullWidth>
                  ✍️ Fazer exercícios para completar →
                </Button>
              )}
              {completed && (
                <div className="text-center p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold">
                  ✅ Módulo concluído!
                </div>
              )}
            </div>
          )}

          {tab === 'exercises' && (
            <div className="flex flex-col gap-4">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="text-5xl mb-3">{score===node.exercises.length?'🎉':score>0?'👍':'💪'}</div>
                  <h3 className="font-heading text-xl font-bold mb-1">{score}/{node.exercises.length} corretas</h3>
                  <p className="text-[#8899bb] text-sm mb-5">+{score*10+15} XP ganhos!</p>
                  {node.exercises.map(ex => (
                    <div key={ex.id} className={`text-left p-4 rounded-xl border mb-3 ${answers[ex.id]===ex.answer?'border-emerald-500/30 bg-emerald-500/5':'border-red-500/30 bg-red-500/5'}`}>
                      <p className="text-sm font-semibold mb-2">{ex.question}</p>
                      <p className={`text-sm mb-1 ${answers[ex.id]===ex.answer?'text-emerald-300':'text-red-300'}`}>
                        {answers[ex.id]===ex.answer?'✅':'❌'} {ex.options[answers[ex.id]]??'(sem resposta)'}
                      </p>
                      {answers[ex.id]!==ex.answer && <p className="text-sm text-blue-300">✔ {ex.options[ex.answer]}</p>}
                      <p className="text-xs text-[#8899bb] mt-2 italic">{ex.explanation}</p>
                    </div>
                  ))}
                  <Button onClick={onClose} fullWidth>Fechar</Button>
                </div>
              ) : (
                <>
                  {node.exercises.map((ex,qi) => (
                    <div key={ex.id} className="p-4 rounded-xl border border-[#1e2d47] bg-[#161f30]">
                      <p className="text-sm font-semibold mb-3">{qi+1}. {ex.question}</p>
                      <div className="flex flex-col gap-2">
                        {ex.options.map((opt,oi) => (
                          <button key={oi} onClick={() => setAnswers(a=>({...a,[ex.id]:oi}))}
                            className={`text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${answers[ex.id]===oi?'border-blue-500 bg-blue-500/10 text-blue-200':'border-[#1e2d47] hover:border-[#243552] text-[#8899bb]'}`}>
                            <span className="font-bold mr-2">{String.fromCharCode(65+oi)}.</span>{opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button onClick={handleSubmit} disabled={Object.keys(answers).length<node.exercises.length} fullWidth>
                    Enviar respostas ✓
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Dashboard ──────────────────────────────────────────────
export default function Dashboard() {
  const { user, profile, refreshProfile } = useAuth()
  const [activeTrail, setActiveTrail] = useState(ALL_TRAILS[0])
  const [completedIds, setCompletedIds] = useState(new Set())
  const [selectedNode, setSelectedNode] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    const trail = ALL_TRAILS.find(t => t.id === profile.trilha_ativa) || ALL_TRAILS[0]
    setActiveTrail(trail)
  }, [profile?.trilha_ativa])

  useEffect(() => {
    if (!user) { setLoading(false); return }
    getProgress(user.id)
      .then(data => setCompletedIds(new Set(data.map(d => d.node_id))))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  async function handleComplete(node, correctCount, totalExercises) {
    if (!user) return
    const newXP = await markNodeComplete(user.id, node.id, activeTrail.id)
    if (totalExercises > 0) await saveExerciseResult(user.id, node.id, correctCount > 0)
    setCompletedIds(prev => new Set([...prev, node.id]))
    if (newXP) refreshProfile({ xp: newXP })
    toast.success(`✅ "${node.title}" completo! +15 XP`)
  }

  const allNodes = Object.values(activeTrail.levels).flat()
  const completedInTrail = allNodes.filter(n => completedIds.has(n.id)).length
  const pct = allNodes.length ? Math.round((completedInTrail/allNodes.length)*100) : 0

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 anim-up">
        {/* Trail selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none">
          {ALL_TRAILS.map(t => {
            const meta = TRAIL_META[t.id]
            return (
              <button key={t.id} onClick={() => setActiveTrail(t)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${activeTrail.id===t.id?'border-blue-500 bg-blue-500/10 text-blue-300':'border-[#1e2d47] text-[#8899bb] hover:border-[#243552] hover:text-white'}`}>
                <span>{t.icon}</span>{t.title}
              </button>
            )
          })}
        </div>

        {/* Progress bar */}
        <Card className="mb-6 flex items-center gap-4 flex-wrap">
          <ProgressRing pct={pct} size={60} color={activeTrail.color}>
            <span className="font-heading font-bold text-sm">{pct}%</span>
          </ProgressRing>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-bold text-base mb-0.5">{activeTrail.title}</p>
            <XPBar pct={pct} color={activeTrail.color}/>
            <p className="text-xs text-[#4a5980] mt-1">{completedInTrail}/{allNodes.length} módulos completos</p>
          </div>
        </Card>

        {/* Trail tree */}
        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="lg"/></div>
        ) : (
          <div className="max-w-sm mx-auto">
            {/* Trail header */}
            <div className="text-center mb-6 p-5 rounded-2xl border border-[#1e2d47] bg-[#111827]">
              <div className="text-5xl mb-2">{activeTrail.icon}</div>
              <h2 className="font-heading text-xl font-bold mb-1">{activeTrail.title}</h2>
              <p className="text-sm text-[#8899bb]">{activeTrail.description}</p>
            </div>

            {Object.entries(activeTrail.levels).map(([levelKey, nodes]) => (
              <LevelSection key={levelKey} levelKey={levelKey} nodes={nodes} completedIds={completedIds} onNodeClick={setSelectedNode}/>
            ))}
          </div>
        )}
      </div>

      {selectedNode && (
        <NodeModal
          node={selectedNode}
          completed={completedIds.has(selectedNode.id)}
          onComplete={handleComplete}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </AppLayout>
  )
}
