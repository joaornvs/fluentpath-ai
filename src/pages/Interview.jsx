import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AppLayout } from '@/components/layout'
import { Card, Badge, Button, InfoBox, Textarea, Spinner } from '@/components/ui'
import { saveInterviewResult } from '@/services/supabase/db'
import { INTERVIEW_JOBS, INTERVIEW_QUESTIONS, RUBRIC } from '@/data/english'
import { ALL_TRAILS } from '@/data/curriculum'
import { TRAIL_META, LEVEL_META } from '@/lib/gamification'
import toast from 'react-hot-toast'

const VIEWS = { SETUP:'setup', INTERVIEW:'interview', REVIEW:'review', RESULTS:'results' }

// ── Evaluate answer locally (no AI needed) ─────────────────
function evaluateAnswer(question, answer) {
  const ans = answer.trim()
  if (!ans || ans.length < 20) return { grammar:20, vocabulary:20, clarity:15, relevance:10, feedback:'Resposta muito curta. Desenvolva mais.' }

  const wordCount = ans.split(/\s+/).length
  const sentences = ans.split(/[.!?]+/).filter(Boolean).length
  const hasKeywords = question.toLowerCase().split(' ').filter(w => w.length > 4).some(kw => ans.toLowerCase().includes(kw))
  const avgWordsPerSentence = wordCount / Math.max(sentences, 1)
  const hasStructure = /\b(first|second|also|however|because|therefore|for example|in addition)\b/i.test(ans)

  const grammar     = Math.min(100, 50 + (sentences > 1 ? 20 : 0) + (avgWordsPerSentence > 5 && avgWordsPerSentence < 25 ? 20 : 0) + (wordCount > 30 ? 10 : 0))
  const vocabulary  = Math.min(100, 50 + (hasKeywords ? 25 : 0) + (wordCount > 40 ? 15 : 0) + (hasStructure ? 10 : 0))
  const clarity     = Math.min(100, 50 + (sentences >= 2 ? 20 : 0) + (hasStructure ? 20 : 0) + (wordCount > 20 ? 10 : 0))
  const relevance   = Math.min(100, hasKeywords ? 80 : 50)

  const overall = (grammar*0.25 + vocabulary*0.25 + clarity*0.25 + relevance*0.25)

  const tips = []
  if (wordCount < 30) tips.push('Desenvolva mais sua resposta — respostas mais completas impressionam mais.')
  if (!hasStructure) tips.push('Use conectores como "First..., Additionally..., In conclusion..." para estruturar melhor.')
  if (!hasKeywords) tips.push('Inclua mais vocabulário técnico relacionado à pergunta.')
  if (sentences < 2) tips.push('Use múltiplas frases para explicar melhor seu raciocínio.')

  return { grammar: Math.round(grammar), vocabulary: Math.round(vocabulary), clarity: Math.round(clarity), relevance: Math.round(relevance), overall: Math.round(overall), tips }
}

export default function Interview() {
  const { user, profile, refreshProfile } = useAuth()
  const [view, setView] = useState(VIEWS.SETUP)
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState(profile?.nivel_ingles || 'iniciante')
  const [selectedTrail, setSelectedTrail] = useState(profile?.trilha_ativa || 'data-science')
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [currentQ, setCurrentQ] = useState(0)
  const [evaluations, setEvaluations] = useState([])
  const [evaluating, setEvaluating] = useState(false)

  function startInterview() {
    const qs = (INTERVIEW_QUESTIONS[selectedTrail]?.[selectedLevel] || []).slice(0, 8)
    if (!qs.length) { toast.error('Sem perguntas para este nível ainda.'); return }
    setQuestions(qs)
    setAnswers({})
    setCurrentQ(0)
    setEvaluations([])
    setView(VIEWS.INTERVIEW)
  }

  async function finishInterview() {
    setEvaluating(true)
    try {
      const evals = questions.map(q => ({
        question: q,
        answer: answers[q.id] || '',
        eval: evaluateAnswer(q.question, answers[q.id] || ''),
      }))
      setEvaluations(evals)

      const avgScore = evals.reduce((a,e) => a + (e.eval.overall||0), 0) / Math.max(evals.length, 1)

      if (user) {
        try {
          const newXP = await saveInterviewResult(
            user.id, selectedTrail, selectedJob?.title||'', selectedLevel,
            avgScore/10, questions.length,
            JSON.stringify({ grammar: Math.round(avgScore), vocabulary: Math.round(avgScore), clarity: Math.round(avgScore), relevance: Math.round(avgScore) })
          )
          if (newXP) refreshProfile({ xp: newXP })
        } catch(e) { console.error('saveInterview error:', e) }
      }

      setView(VIEWS.RESULTS)
      toast.success('Entrevista concluída! 🎉')
    } catch(err) {
      console.error('finishInterview error:', err)
      toast.error('Erro ao processar. Tente novamente.')
    } finally {
      setEvaluating(false)
    }
  }

  const jobList = INTERVIEW_JOBS[selectedTrail] || []
  const trailMeta = TRAIL_META[selectedTrail]
  const currentQuestion = questions[currentQ]
  const allAnswered = questions.every(q => (answers[q.id]||'').trim().length > 10)

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto anim-up">
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-bold mb-1">🎤 Simulador de Entrevistas</h1>
          <p className="text-sm text-[#8899bb]">Pratique inglês técnico em entrevistas reais por área</p>
        </div>

        {/* SETUP */}
        {view === VIEWS.SETUP && (
          <div className="flex flex-col gap-4">
            <InfoBox type="warning" className="text-center">
              <div className="text-3xl mb-2">⚠️</div>
              <strong>Responda com suas próprias palavras em inglês.</strong><br/>
              <span className="text-sm">O objetivo é praticar comunicação técnica real.</span>
            </InfoBox>

            {/* Trail */}
            <Card>
              <h3 className="font-heading font-bold text-base mb-3">Área da vaga</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ALL_TRAILS.map(t => (
                  <button key={t.id} onClick={() => { setSelectedTrail(t.id); setSelectedJob(null) }}
                    className={`p-3 rounded-xl border text-center text-sm transition-all ${selectedTrail===t.id?'border-blue-500 bg-blue-500/10 text-blue-300':'border-[#1e2d47] text-[#8899bb] hover:border-[#243552]'}`}>
                    <div className="text-2xl mb-1">{t.icon}</div>
                    <div className="font-semibold text-xs">{t.title}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Level */}
            <Card>
              <h3 className="font-heading font-bold text-base mb-3">Nível da entrevista</h3>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(LEVEL_META).map(([k,v]) => (
                  <button key={k} onClick={() => setSelectedLevel(k)}
                    className={`p-3 rounded-xl border text-center transition-all ${selectedLevel===k?'border-blue-500 bg-blue-500/10 text-blue-300':'border-[#1e2d47] text-[#8899bb] hover:border-[#243552]'}`}>
                    <div className="text-2xl mb-1">{v.icon}</div>
                    <div className="text-xs font-semibold">{v.label}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Job selection */}
            <Card>
              <h3 className="font-heading font-bold text-base mb-3">Escolha a vaga (opcional)</h3>
              <div className="flex flex-col gap-2">
                {jobList.filter(j => j.level === selectedLevel).map(job => (
                  <button key={job.id} onClick={() => setSelectedJob(job)}
                    className={`text-left p-4 rounded-xl border transition-all ${selectedJob?.id===job.id?'border-blue-500 bg-blue-500/10':'border-[#1e2d47] hover:border-[#243552]'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm">{job.title}</p>
                      <Badge color="blue" size="xs">{job.company}</Badge>
                    </div>
                    <p className="text-xs text-[#8899bb]">{job.description}</p>
                  </button>
                ))}
                {jobList.filter(j => j.level === selectedLevel).length === 0 && (
                  <p className="text-sm text-[#4a5980] text-center py-4">Nenhuma vaga cadastrada para este nível.</p>
                )}
              </div>
            </Card>

            <Button onClick={startInterview} size="lg" fullWidth>
              🚀 Iniciar entrevista
            </Button>
          </div>
        )}

        {/* INTERVIEW */}
        {view === VIEWS.INTERVIEW && currentQuestion && (
          <div className="anim-up">
            {/* Progress */}
            <div className="flex items-center justify-between text-sm text-[#8899bb] mb-3">
              <span>Pergunta {currentQ+1} de {questions.length}</span>
              <span>{Object.values(answers).filter(a => a.trim().length > 10).length}/{questions.length} respondidas</span>
            </div>
            <div className="h-1.5 bg-[#1e2d47] rounded-full mb-5">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{width:`${((currentQ+1)/questions.length)*100}%`}}/>
            </div>

            {/* Job context */}
            {selectedJob && (
              <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-[#161f30] border border-[#1e2d47]">
                <span className="text-xl">{trailMeta?.icon}</span>
                <div>
                  <p className="text-sm font-semibold">{selectedJob.title}</p>
                  <p className="text-xs text-[#8899bb]">{selectedJob.company}</p>
                </div>
              </div>
            )}

            {/* Question */}
            <Card className="mb-4">
              <Badge color="blue" size="xs" className="mb-3">{currentQuestion.category}</Badge>
              <p className="text-base font-semibold leading-relaxed">{currentQuestion.question}</p>
            </Card>

            {/* Answer */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-[#8899bb] uppercase tracking-wide block mb-2">
                Sua resposta em inglês:
              </label>
              <Textarea
                rows={5}
                value={answers[currentQuestion.id] || ''}
                onChange={e => setAnswers(a => ({...a,[currentQuestion.id]:e.target.value}))}
                placeholder="Type your answer in English here... Be specific and use technical vocabulary."
                className="inp"
              />
              <p className="text-xs text-[#4a5980] mt-1">
                {(answers[currentQuestion.id]||'').split(/\s+/).filter(Boolean).length} palavras
              </p>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              {currentQ > 0 && <Button variant="outline" onClick={() => setCurrentQ(q => q-1)}>← Anterior</Button>}
              {currentQ < questions.length-1 ? (
                <Button onClick={() => setCurrentQ(q => q+1)} fullWidth>Próxima →</Button>
              ) : (
                <Button onClick={finishInterview} loading={evaluating} variant="gradient" fullWidth>
                  📊 Finalizar e avaliar
                </Button>
              )}
            </div>

            {/* Question dots */}
            <div className="flex justify-center gap-1.5 mt-5 flex-wrap">
              {questions.map((q,i) => (
                <button key={i} onClick={() => setCurrentQ(i)}
                  className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${i===currentQ?'bg-blue-600 text-white':(answers[q.id]||'').trim().length>10?'bg-emerald-500/30 text-emerald-300 border border-emerald-500/30':'bg-[#1e2d47] text-[#4a5980]'}`}>
                  {i+1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS */}
        {view === VIEWS.RESULTS && evaluations.length > 0 && (
          <div className="anim-up flex flex-col gap-4">
            {/* Overall score */}
            <Card glow className="text-center">
              <h2 className="font-heading text-xl font-bold mb-4">📊 Resultado da Entrevista</h2>
              {(() => {
                const overall = Math.round(evaluations.reduce((a,e) => a+(e.eval.overall||0),0)/evaluations.length)
                const color = overall >= 75 ? '#10b981' : overall >= 50 ? '#f59e0b' : '#ef4444'
                return (
                  <>
                    <div className="w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center mx-auto mb-4"
                      style={{borderColor:color,background:`${color}15`}}>
                      <span className="font-heading font-bold text-3xl" style={{color}}>{overall}</span>
                      <span className="text-xs text-[#4a5980]">/100</span>
                    </div>
                    <Badge color={overall>=75?'green':overall>=50?'yellow':'red'} size="md">
                      {overall>=75?'Excelente!':overall>=50?'Bom progresso':'Continue praticando'}
                    </Badge>
                  </>
                )
              })()}
            </Card>

            {/* Metrics */}
            <Card>
              <h3 className="font-heading font-bold text-base mb-4">📈 Métricas detalhadas</h3>
              {Object.entries(RUBRIC).map(([key,r]) => {
                const avg = Math.round(evaluations.reduce((a,e) => a+(e.eval[key]||0),0)/evaluations.length)
                return (
                  <div key={key} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#8899bb]">{r.label}</span>
                      <span className="font-bold">{avg}%</span>
                    </div>
                    <div className="h-2 bg-[#1e2d47] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{width:`${avg}%`,background:avg>=70?'#10b981':avg>=50?'#f59e0b':'#ef4444'}}/>
                    </div>
                    <p className="text-xs text-[#4a5980] mt-0.5">{r.desc}</p>
                  </div>
                )
              })}
            </Card>

            {/* Tips */}
            {(() => {
              const allTips = [...new Set(evaluations.flatMap(e => e.eval.tips||[]))]
              return allTips.length > 0 && (
                <Card>
                  <h3 className="font-heading font-bold text-base mb-3">💡 Dicas para melhorar</h3>
                  {allTips.slice(0,4).map((tip,i) => (
                    <div key={i} className="flex gap-2 mb-2 p-3 rounded-xl bg-yellow-500/8 border border-yellow-500/15">
                      <span className="flex-shrink-0">💡</span>
                      <p className="text-sm text-yellow-200">{tip}</p>
                    </div>
                  ))}
                </Card>
              )
            })()}

            {/* Per question */}
            {evaluations.map((ev,i) => (
              <Card key={i}>
                <p className="text-xs text-[#4a5980] uppercase font-semibold mb-1">Pergunta {i+1}</p>
                <p className="text-sm font-semibold mb-3">{ev.question.question}</p>
                {ev.answer ? (
                  <div>
                    <p className="text-xs text-[#4a5980] mb-1">Sua resposta:</p>
                    <p className="text-sm text-[#8899bb] italic p-3 rounded-xl bg-[#161f30] mb-2">"{ev.answer}"</p>
                    <Badge color={ev.eval.overall>=75?'green':ev.eval.overall>=50?'yellow':'red'}>
                      Nota: {ev.eval.overall}/100
                    </Badge>
                  </div>
                ) : (
                  <p className="text-sm text-red-400 italic">Não respondida</p>
                )}
              </Card>
            ))}

            <Button onClick={() => setView(VIEWS.SETUP)} variant="gradient" fullWidth size="lg">
              🔄 Nova entrevista
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
