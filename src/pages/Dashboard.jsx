import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AppLayout } from '@/components/layout'
import { Card, Badge, XPBar, ProgressRing, Spinner } from '@/components/ui'
import { getProgress, markNodeComplete, saveExerciseResult } from '@/services/supabase/db'
import { ALL_TRAILS } from '@/data/curriculum'
import { LEVEL_META, getLevelData } from '@/lib/gamification'
import toast from 'react-hot-toast'

// ── Node ──────────────────────────────────────────────────
function Node({ node, levelKey, completed, unlocked, onClick }) {
  const lm = LEVEL_META[levelKey] || LEVEL_META.iniciante
  const colors = { iniciante:'#10b981', intermediario:'#f59e0b', avancado:'#ef4444' }
  const color = colors[levelKey] || '#3b82f6'

  return (
    <button
      onClick={() => unlocked && onClick({ ...node, level: levelKey })}
      disabled={!unlocked}
      className={`group relative w-full max-w-xs text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
        completed   ? 'border-emerald-500/60 bg-emerald-500/6'
        : unlocked  ? 'border-[#1e2d47] hover:border-blue-500/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10 bg-[#111827]'
        : 'border-[#1e2d47]/50 bg-[#0d1220]/50 opacity-40 cursor-not-allowed'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="font-heading font-bold text-sm leading-tight">{node.title}</p>
        <span className="text-base flex-shrink-0">{completed ? '✅' : unlocked ? '🔓' : '🔒'}</span>
      </div>
      <p className="text-xs text-[#8899bb] leading-relaxed line-clamp-2 mb-3">{node.description}</p>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold"
          style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
          {lm.icon} {lm.label}
        </span>
        <span className="text-xs text-[#4a5980]">⏱ {node.duration}</span>
      </div>
    </button>
  )
}

// ── Level Section ─────────────────────────────────────────
function LevelSection({ levelKey, nodes, completedIds, onNodeClick }) {
  const [open, setOpen] = useState(levelKey === 'iniciante')
  const lm   = LEVEL_META[levelKey] || LEVEL_META.iniciante
  const done = nodes.filter(n => completedIds.has(n.id)).length
  const colors = { iniciante:'#10b981', intermediario:'#f59e0b', avancado:'#ef4444' }
  const color  = colors[levelKey] || '#3b82f6'

  return (
    <div className="mb-3">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#1e2d47] bg-[#111827] hover:border-[#243552] transition-all mb-3 text-left">
        <span className="text-xl">{lm.icon}</span>
        <div className="flex-1">
          <p className="font-heading font-bold text-sm" style={{ color }}>{lm.label}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex-1 h-1 bg-[#1e2d47] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${nodes.length ? (done/nodes.length)*100 : 0}%`, background: color }}/>
            </div>
            <span className="text-xs text-[#4a5980] flex-shrink-0">{done}/{nodes.length}</span>
          </div>
        </div>
        <span className="text-[#4a5980] text-sm">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="flex flex-col gap-2 pl-2 anim-up">
          {nodes.map((node, i) => {
            const prereqs  = node.prerequisites || []
            const unlocked = prereqs.length === 0 || prereqs.every(p => completedIds.has(p))
            const completed = completedIds.has(node.id)
            return (
              <div key={node.id} className="flex items-start gap-2">
                {/* Connector */}
                <div className="flex flex-col items-center pt-5 flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full border-2 ${completed ? 'bg-emerald-500 border-emerald-500' : unlocked ? 'bg-blue-500 border-blue-500' : 'bg-transparent border-[#1e2d47]'}`}/>
                  {i < nodes.length - 1 && (
                    <div className={`w-0.5 mt-1 flex-1 min-h-[24px] rounded-full ${completed ? 'bg-emerald-500/40' : 'bg-[#1e2d47]'}`}/>
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <Node node={node} levelKey={levelKey} completed={completed} unlocked={unlocked} onClick={onNodeClick}/>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Node Modal ────────────────────────────────────────────
function NodeModal({ node, completed, onComplete, onClose }) {
  const [tab,       setTab]       = useState('content')
  const [answers,   setAnswers]   = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score,     setScore]     = useState(0)
  if (!node) return null
  const lm    = LEVEL_META[node.level] || LEVEL_META.iniciante
  const hasEx = node.exercises?.length > 0

  function handleSubmit() {
    let c = 0
    node.exercises.forEach(ex => { if (answers[ex.id] === ex.answer) c++ })
    setScore(c); setSubmitted(true)
    onComplete(node, c, node.exercises.length)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#0d1220] border border-[#1e2d47] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[92vh] flex flex-col shadow-2xl shadow-blue-500/10 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#1e2d47] flex-shrink-0 bg-[#111827]">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-500/12 text-blue-300 border border-blue-500/20">
                  {lm.icon} {lm.label}
                </span>
                <span className="text-xs text-[#4a5980]">⏱ {node.duration}</span>
                {completed && <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/12 text-emerald-300 border border-emerald-500/20">✅ Completo</span>}
              </div>
              <h2 className="font-heading text-lg font-bold">{node.title}</h2>
              <p className="text-sm text-[#8899bb] mt-0.5">{node.description}</p>
            </div>
            <button onClick={onClose} className="text-[#4a5980] hover:text-white text-xl p-1 flex-shrink-0">✕</button>
          </div>
          <div className="flex gap-1">
            {[['content','📖 Conteúdo'], hasEx && ['exercises','✍️ Exercícios']].filter(Boolean).map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${tab===id ? 'bg-blue-600 text-white' : 'text-[#8899bb] hover:text-white'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#0d1220]">
          {tab === 'content' && (
            <div className="flex flex-col gap-5">
              {/* Topics */}
              <div>
                <p className="text-xs font-semibold text-[#4a5980] uppercase tracking-wider mb-2.5">📋 Tópicos</p>
                <div className="flex flex-wrap gap-2">
                  {node.topics?.map((t,i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-[#161f30] border border-[#1e2d47] text-xs text-[#8899bb]">{t}</span>
                  ))}
                </div>
              </div>

              {/* English words */}
              {node.englishWords?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[#4a5980] uppercase tracking-wider mb-2.5">🇺🇸 Vocabulário em inglês</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {node.englishWords.map((w,i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#111827] border border-[#1e2d47] hover:border-blue-500/30 transition-colors">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-mono font-bold text-blue-300">{w.word}</span>
                          <span className="text-xs text-[#4a5980] font-mono">[{w.pronunciation}]</span>
                        </div>
                        <p className="text-xs text-[#8899bb]">🇧🇷 <strong className="text-white">{w.pt}</strong></p>
                        <p className="text-xs text-[#4a5980] italic mt-0.5">"{w.example}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phrases */}
              {node.englishPhrases?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[#4a5980] uppercase tracking-wider mb-2.5">💬 Frases práticas</p>
                  <div className="flex flex-col gap-2">
                    {node.englishPhrases.map((ph,i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#111827] border border-[#1e2d47]">
                        <p className="text-sm font-medium">🇺🇸 {ph.en}</p>
                        <p className="text-xs text-[#8899bb] mt-0.5">🇧🇷 {ph.pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source */}
              <div className="p-3 rounded-xl bg-blue-500/8 border border-blue-500/15 text-sm text-blue-200">
                📚 <strong>Fonte:</strong> {node.source}
              </div>

              {/* CTA */}
              {!completed && !hasEx && (
                <button onClick={() => { onComplete(node,0,0); onClose() }}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all">
                  ✅ Marcar como completo (+15 XP)
                </button>
              )}
              {!completed && hasEx && (
                <button onClick={() => setTab('exercises')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold transition-all">
                  ✍️ Fazer exercícios para completar →
                </button>
              )}
              {completed && (
                <div className="text-center p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold">
                  ✅ Módulo concluído! Bom trabalho.
                </div>
              )}
            </div>
          )}

          {tab === 'exercises' && (
            <div className="flex flex-col gap-4">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3">{score===node.exercises.length?'🏆':score>0?'🎉':'💪'}</div>
                  <h3 className="font-heading text-xl font-bold mb-1">{score}/{node.exercises.length} corretas</h3>
                  <p className="text-[#8899bb] text-sm mb-5">+{score*10+15} XP ganhos!</p>
                  {node.exercises.map(ex => (
                    <div key={ex.id} className={`text-left p-4 rounded-xl border mb-3 ${answers[ex.id]===ex.answer?'border-emerald-500/30 bg-emerald-500/5':'border-red-500/30 bg-red-500/5'}`}>
                      <p className="text-sm font-semibold mb-2">{ex.question}</p>
                      <p className={`text-sm mb-1 ${answers[ex.id]===ex.answer?'text-emerald-300':'text-red-300'}`}>
                        {answers[ex.id]===ex.answer?'✅':'❌'} {ex.options?.[answers[ex.id]] ?? '(sem resposta)'}
                      </p>
                      {answers[ex.id]!==ex.answer && <p className="text-sm text-blue-300">✔ {ex.options?.[ex.answer]}</p>}
                      <p className="text-xs text-[#8899bb] mt-2 italic">{ex.explanation}</p>
                    </div>
                  ))}
                  <button onClick={onClose} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all mt-2">Fechar</button>
                </div>
              ) : (
                <>
                  {node.exercises.map((ex, qi) => (
                    <div key={ex.id} className="p-4 rounded-xl border border-[#1e2d47] bg-[#111827]">
                      <p className="text-sm font-semibold mb-3">{qi+1}. {ex.question}</p>
                      <div className="flex flex-col gap-2">
                        {ex.options?.map((opt, oi) => (
                          <button key={oi} onClick={() => setAnswers(a => ({...a,[ex.id]:oi}))}
                            className={`text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${answers[ex.id]===oi?'border-blue-500 bg-blue-500/10 text-blue-200':'border-[#1e2d47] hover:border-[#243552] text-[#8899bb]'}`}>
                            <span className="font-bold mr-2">{String.fromCharCode(65+oi)}.</span>{opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={handleSubmit} disabled={Object.keys(answers).length < node.exercises.length}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    Enviar respostas ✓
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────
export default function Dashboard() {
  const { user, profile, refreshProfile } = useAuth()
  const [activeTrail,   setActiveTrail]   = useState(ALL_TRAILS[0])
  const [completedIds,  setCompletedIds]  = useState(new Set())
  const [selectedNode,  setSelectedNode]  = useState(null)
  const [loadingNodes,  setLoadingNodes]  = useState(true)

  // Set trail from profile when it loads
  useEffect(() => {
    if (!profile?.trilha_ativa) return
    const t = ALL_TRAILS.find(x => x.id === profile.trilha_ativa)
    if (t) setActiveTrail(t)
  }, [profile?.trilha_ativa])

  // Load progress
  useEffect(() => {
    if (!user) { setLoadingNodes(false); return }
    getProgress(user.id)
      .then(data => setCompletedIds(new Set(data.map(d => d.node_id))))
      .catch(() => {})
      .finally(() => setLoadingNodes(false))
  }, [user?.id])

  async function handleComplete(node, correctCount, totalExercises) {
    if (!user) return
    const newXP = await markNodeComplete(user.id, node.id, activeTrail.id)
    if (totalExercises > 0) await saveExerciseResult(user.id, node.id, correctCount > 0)
    setCompletedIds(prev => new Set([...prev, node.id]))
    if (newXP) refreshProfile({ xp: newXP })
    toast.success(`✅ "${node.title}" completo! +15 XP`)
    setSelectedNode(null)
  }

  const allNodes        = Object.values(activeTrail.levels).flat()
  const completedInTrail = allNodes.filter(n => completedIds.has(n.id)).length
  const pct             = allNodes.length ? Math.round((completedInTrail / allNodes.length) * 100) : 0

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 anim-up">

        {/* Trail tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none">
          {ALL_TRAILS.map(t => (
            <button key={t.id} onClick={() => setActiveTrail(t)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                activeTrail.id===t.id
                  ? 'text-white font-bold shadow-lg'
                  : 'border-[#1e2d47] text-[#8899bb] hover:border-[#243552] hover:text-white'
              }`}
              style={activeTrail.id===t.id ? { borderColor: t.color, background: `${t.color}18`, color: t.color } : {}}>
              <span>{t.icon}</span>{t.title}
            </button>
          ))}
        </div>

        {/* Progress card */}
        <div className="mb-6 p-4 rounded-2xl border border-[#1e2d47] bg-[#111827] flex items-center gap-4"
          style={{ borderColor: `${activeTrail.color}30` }}>
          <ProgressRing pct={pct} size={56} color={activeTrail.color}>
            <span className="font-heading font-bold text-xs">{pct}%</span>
          </ProgressRing>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-heading font-bold text-sm" style={{ color: activeTrail.color }}>{activeTrail.title}</p>
              <span className="text-xs text-[#4a5980]">{completedInTrail}/{allNodes.length} módulos</span>
            </div>
            <XPBar pct={pct} color={activeTrail.color} height={5}/>
          </div>
          {pct === 100 && <span className="text-2xl flex-shrink-0">🏆</span>}
        </div>

        {/* Trail tree */}
        {loadingNodes ? (
          <div className="flex justify-center py-20"><Spinner size="lg"/></div>
        ) : (
          <div className="max-w-sm mx-auto lg:max-w-md">
            {/* Trail header */}
            <div className="text-center mb-5 p-5 rounded-2xl border bg-[#111827]"
              style={{ borderColor: `${activeTrail.color}25` }}>
              <div className="text-4xl mb-2">{activeTrail.icon}</div>
              <h2 className="font-heading text-lg font-bold mb-1">{activeTrail.title}</h2>
              <p className="text-xs text-[#8899bb] leading-relaxed">{activeTrail.description}</p>
            </div>

            {Object.entries(activeTrail.levels).map(([levelKey, nodes]) => (
              <LevelSection key={levelKey} levelKey={levelKey} nodes={nodes}
                completedIds={completedIds} onNodeClick={setSelectedNode}/>
            ))}
          </div>
        )}
      </div>

      {selectedNode && (
        <NodeModal node={selectedNode} completed={completedIds.has(selectedNode.id)}
          onComplete={handleComplete} onClose={() => setSelectedNode(null)}/>
      )}
    </AppLayout>
  )
}
