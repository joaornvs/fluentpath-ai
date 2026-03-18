import { useState } from 'react'
import { Button, Badge, InfoBox } from '@/components/ui'
import { LEVELS_CONFIG } from '@/data/curriculum'

export default function NodeModal({ node, completed, onComplete, onClose, userId }) {
  const [tab, setTab] = useState('content')
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  if (!node) return null
  const cfg = LEVELS_CONFIG[node.level]
  const hasExercises = node.exercises?.length > 0

  function handleSubmitExercises() {
    let correct = 0
    node.exercises.forEach(ex => { if (answers[ex.id] === ex.answer) correct++ })
    setScore(correct)
    setSubmitted(true)
    onComplete(node, correct, node.exercises.length)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#111624] border border-[#1c2840] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-[#1c2840]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge color={node.level === 'iniciante' ? 'green' : node.level === 'intermediario' ? 'yellow' : 'red'}>
                  {cfg.icon} {cfg.label}
                </Badge>
                <span className="text-xs text-[#4a5980]">⏱ {node.duration}</span>
                {completed && <Badge color="green">✅ Completo</Badge>}
              </div>
              <h2 className="font-heading text-xl font-bold">{node.title}</h2>
              <p className="text-sm text-[#8899bb] mt-1">{node.description}</p>
            </div>
            <button onClick={onClose} className="text-[#4a5980] hover:text-white text-xl flex-shrink-0">✕</button>
          </div>
          <div className="flex gap-1 mt-4">
            {['content', hasExercises && 'exercises'].filter(Boolean).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === t ? 'bg-blue-600 text-white' : 'text-[#8899bb] hover:text-white'}`}>
                {t === 'content' ? '📖 Conteúdo' : '✍️ Exercícios'}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'content' && (
            <div className="flex flex-col gap-5">
              {/* Topics */}
              <div>
                <h3 className="font-heading text-base font-bold mb-3">📋 Tópicos abordados</h3>
                <div className="flex flex-wrap gap-2">
                  {node.topics.map((t, i) => <span key={i} className="px-3 py-1 rounded-lg bg-[#161d2e] border border-[#1c2840] text-sm text-[#8899bb]">{t}</span>)}
                </div>
              </div>

              {/* English vocabulary */}
              <div>
                <h3 className="font-heading text-base font-bold mb-3">🇺🇸 Vocabulário técnico em inglês</h3>
                <div className="flex flex-wrap gap-2">
                  {node.englishFocus.map((w, i) => <span key={i} className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300 font-mono">{w}</span>)}
                </div>
              </div>

              {/* Source */}
              <InfoBox type="info">
                📚 <strong>Fonte:</strong> {node.source}
              </InfoBox>

              {/* Complete button */}
              {!completed && !hasExercises && (
                <Button onClick={() => { onComplete(node, 0, 0); onClose() }} className="w-full">
                  ✅ Marcar como completo (+15 XP)
                </Button>
              )}
              {!completed && hasExercises && (
                <Button onClick={() => setTab('exercises')} className="w-full">
                  ✍️ Fazer exercícios para completar
                </Button>
              )}
            </div>
          )}

          {tab === 'exercises' && (
            <div className="flex flex-col gap-5">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="text-5xl mb-3">{score === node.exercises.length ? '🎉' : score >= node.exercises.length / 2 ? '👍' : '💪'}</div>
                  <h3 className="font-heading text-xl font-bold mb-2">{score}/{node.exercises.length} corretas</h3>
                  <p className="text-[#8899bb] text-sm mb-4">+{score * 10 + 15} XP ganhos!</p>
                  {/* Show answers */}
                  {node.exercises.map(ex => (
                    <div key={ex.id} className={`text-left p-4 rounded-xl border mb-3 ${answers[ex.id] === ex.answer ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                      <p className="text-sm font-medium mb-2">{ex.question}</p>
                      <p className={`text-sm mb-1 ${answers[ex.id] === ex.answer ? 'text-emerald-300' : 'text-red-300'}`}>
                        {answers[ex.id] === ex.answer ? '✅' : '❌'} Sua resposta: {ex.options[answers[ex.id]] ?? '(sem resposta)'}
                      </p>
                      {answers[ex.id] !== ex.answer && <p className="text-sm text-blue-300">✔ Correta: {ex.options[ex.answer]}</p>}
                      <p className="text-xs text-[#8899bb] mt-2 italic">{ex.explanation}</p>
                    </div>
                  ))}
                  <Button onClick={onClose} className="w-full mt-2">Fechar</Button>
                </div>
              ) : (
                <>
                  {node.exercises.map((ex, qi) => (
                    <div key={ex.id} className="p-4 rounded-xl border border-[#1c2840] bg-[#161d2e]">
                      <p className="text-sm font-medium mb-3">{qi + 1}. {ex.question}</p>
                      <div className="flex flex-col gap-2">
                        {ex.options.map((opt, oi) => (
                          <button key={oi} onClick={() => setAnswers(a => ({ ...a, [ex.id]: oi }))}
                            className={`text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${answers[ex.id] === oi ? 'border-blue-500 bg-blue-500/10 text-blue-200' : 'border-[#1c2840] hover:border-blue-500/40 text-[#8899bb]'}`}>
                            {String.fromCharCode(65 + oi)}. {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button onClick={handleSubmitExercises} disabled={Object.keys(answers).length < node.exercises.length} className="w-full">
                    Enviar respostas
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
