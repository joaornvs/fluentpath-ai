import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AppLayout } from '@/components/layout'
import { Card, Badge, Button, Tabs, InfoBox } from '@/components/ui'
import { saveVocabResult, getVocabProgress } from '@/services/supabase/db'
import { VOCAB_SETS } from '@/data/english'
import { TRAIL_META } from '@/lib/gamification'
import toast from 'react-hot-toast'

// ── Flashcard ──────────────────────────────────────────────
function Flashcard({ word, onResult }) {
  const [flipped, setFlipped] = useState(false)
  const [answered, setAnswered] = useState(false)

  function answer(correct) {
    setAnswered(true)
    onResult(word.id, correct)
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Card flip */}
      <div
        onClick={() => !answered && setFlipped(f => !f)}
        className={`relative h-52 rounded-2xl border-2 ${flipped?'border-blue-500':'border-[#1e2d47]'} bg-[#111827] cursor-pointer transition-all duration-300 hover:border-[#243552] mb-4`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {!flipped ? (
            <>
              <p className="text-3xl font-heading font-bold text-blue-300 mb-2">{word.word}</p>
              <p className="text-sm text-[#4a5980] font-mono">[{word.pronunciation}]</p>
              <p className="text-xs text-[#4a5980] mt-3">Clique para ver a tradução</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-white mb-1">{word.pt}</p>
              <p className="text-sm text-[#8899bb] italic mb-3">"{word.example}"</p>
              {word.tip && <p className="text-xs text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-1.5">💡 {word.tip}</p>}
            </>
          )}
        </div>
      </div>

      {/* Answer buttons */}
      {flipped && !answered && (
        <div className="grid grid-cols-2 gap-3 anim-up">
          <Button variant="danger" onClick={() => answer(false)} fullWidth>
            😕 Não sabia
          </Button>
          <Button variant="success" onClick={() => answer(true)} fullWidth>
            🎯 Sabia!
          </Button>
        </div>
      )}

      {answered && (
        <div className="text-center p-3 rounded-xl bg-[#161f30] text-sm text-[#8899bb]">
          Próxima palavra →
        </div>
      )}
    </div>
  )
}

// ── Word Quiz ──────────────────────────────────────────────
function WordQuiz({ words, onDone }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [results, setResults] = useState([])

  const word = words[current]
  if (!word) {
    const correct = results.filter(r => r).length
    return (
      <div className="text-center py-8 max-w-md mx-auto">
        <div className="text-5xl mb-3">{correct===words.length?'🏆':correct>words.length/2?'🎉':'💪'}</div>
        <h3 className="font-heading text-xl font-bold mb-1">{correct}/{words.length} acertos</h3>
        <p className="text-[#8899bb] text-sm mb-5">+{correct*5} XP ganhos!</p>
        <Button onClick={onDone} fullWidth>Continuar</Button>
      </div>
    )
  }

  // Generate wrong options from other words
  const others = words.filter(w => w.id !== word.id).map(w => w.pt).sort(() => Math.random() - 0.5).slice(0, 3)
  const options = [...others, word.pt].sort(() => Math.random() - 0.5)

  function handleSelect(opt) {
    if (selected !== null) return
    setSelected(opt)
    const correct = opt === word.pt
    setResults(r => [...r, correct])
    setTimeout(() => { setSelected(null); setCurrent(c => c+1) }, 1200)
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between text-xs text-[#4a5980] mb-3">
        <span>Pergunta {current+1} de {words.length}</span>
        <span>✅ {results.filter(Boolean).length} corretas</span>
      </div>
      <div className="h-1 bg-[#1e2d47] rounded-full mb-5">
        <div className="h-full bg-blue-500 rounded-full transition-all" style={{width:`${(current/words.length)*100}%`}}/>
      </div>

      <Card className="text-center mb-4 py-8">
        <p className="text-3xl font-heading font-bold text-blue-300 mb-1">{word.word}</p>
        <p className="text-sm text-[#4a5980] font-mono">[{word.pronunciation}]</p>
        <p className="text-xs text-[#8899bb] mt-2">Qual é a tradução?</p>
      </Card>

      <div className="grid grid-cols-2 gap-2">
        {options.map((opt,i) => {
          let cls = 'border-[#1e2d47] text-[#8899bb] hover:border-[#243552] hover:text-white'
          if (selected !== null) {
            if (opt === word.pt) cls = 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
            else if (opt === selected) cls = 'border-red-500 bg-red-500/10 text-red-300'
          }
          return (
            <button key={i} onClick={() => handleSelect(opt)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${cls}`}>
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Pronunciation Guide ────────────────────────────────────
function PronunciationGuide({ words }) {
  const [filter, setFilter] = useState('')
  const filtered = words.filter(w => w.word.toLowerCase().includes(filter.toLowerCase()) || w.pt.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <input
        className="inp mb-4"
        placeholder="🔍 Buscar palavra..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <div className="flex flex-col gap-2">
        {filtered.map(w => (
          <div key={w.id} className="p-4 rounded-xl border border-[#1e2d47] bg-[#161f30] flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <span className="font-mono font-bold text-blue-300 text-base">{w.word}</span>
                <span className="text-xs text-[#4a5980] font-mono">[{w.pronunciation}]</span>
                <span className="text-xs text-[#8899bb]">= {w.pt}</span>
              </div>
              <p className="text-xs text-[#8899bb] italic">"{w.example}"</p>
              {w.tip && <p className="text-xs text-yellow-300 mt-1">💡 {w.tip}</p>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center text-[#4a5980] py-8">Nenhuma palavra encontrada.</p>}
      </div>
    </div>
  )
}

// ── Main English Page ──────────────────────────────────────
export default function English() {
  const { user, profile } = useAuth()
  const [activeTrail, setActiveTrail] = useState(profile?.trilha_ativa || 'data-science')
  const [activeLevel, setActiveLevel] = useState('iniciante')
  const [activeTab, setActiveTab] = useState('flashcard')
  const [cardIndex, setCardIndex] = useState(0)
  const [quizMode, setQuizMode] = useState(false)
  const [vocabProgress, setVocabProgress] = useState([])

  useEffect(() => {
    if (user) getVocabProgress(user.id).then(setVocabProgress)
  }, [user])

  const trailVocab = VOCAB_SETS[activeTrail]?.[activeLevel] || []
  const learnedIds = new Set(vocabProgress.filter(v => v.correct).map(v => v.word_id))
  const trailMeta = TRAIL_META[activeTrail]

  async function handleVocabResult(wordId, correct) {
    if (!user) return
    await saveVocabResult(user.id, wordId, correct)
    setVocabProgress(p => [...p, { word_id: wordId, correct }])
    setTimeout(() => {
      setCardIndex(i => Math.min(i+1, trailVocab.length-1))
    }, 1200)
  }

  const word = trailVocab[cardIndex]

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto anim-up">
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-bold mb-1">🇺🇸 Inglês Técnico</h1>
          <p className="text-sm text-[#8899bb]">Vocabulário, pronúncia e frases por área profissional</p>
        </div>

        {/* Trail selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {Object.entries(TRAIL_META).map(([k,v]) => (
            VOCAB_SETS[k] && (
              <button key={k} onClick={() => { setActiveTrail(k); setCardIndex(0) }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all ${activeTrail===k?'border-blue-500 bg-blue-500/10 text-blue-300':'border-[#1e2d47] text-[#8899bb] hover:border-[#243552] hover:text-white'}`}>
                {v.icon} {v.label}
              </button>
            )
          ))}
        </div>

        {/* Level selector */}
        <div className="flex gap-2 mb-5">
          {['iniciante','intermediario','avancado'].map(l => (
            VOCAB_SETS[activeTrail]?.[l]?.length > 0 && (
              <button key={l} onClick={() => { setActiveLevel(l); setCardIndex(0) }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold capitalize transition-all ${activeLevel===l?'border-blue-500 bg-blue-500/10 text-blue-300':'border-[#1e2d47] text-[#4a5980] hover:text-white'}`}>
                {l}
              </button>
            )
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-5 p-4 rounded-2xl bg-[#111827] border border-[#1e2d47]">
          <div className="text-center">
            <p className="font-heading font-bold text-xl text-blue-300">{trailVocab.length}</p>
            <p className="text-xs text-[#4a5980]">Palavras</p>
          </div>
          <div className="h-8 w-px bg-[#1e2d47]"/>
          <div className="text-center">
            <p className="font-heading font-bold text-xl text-emerald-400">{learnedIds.size}</p>
            <p className="text-xs text-[#4a5980]">Aprendidas</p>
          </div>
          <div className="h-8 w-px bg-[#1e2d47]"/>
          <div className="flex-1">
            <div className="h-2 bg-[#1e2d47] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all"
                style={{width:`${trailVocab.length ? (learnedIds.size/trailVocab.length)*100 : 0}%`}}/>
            </div>
            <p className="text-xs text-[#4a5980] mt-1">{trailVocab.length ? Math.round((learnedIds.size/trailVocab.length)*100) : 0}% completo</p>
          </div>
        </div>

        {/* Mode tabs */}
        <Tabs
          tabs={[{id:'flashcard',label:'🃏 Flashcards'},{id:'quiz',label:'🧪 Quiz'},{id:'guide',label:'📖 Guia'}]}
          active={activeTab}
          onChange={t => { setActiveTab(t); setCardIndex(0) }}
        />
        <div className="mt-5">
          {trailVocab.length === 0 ? (
            <InfoBox type="warning">Vocabulário para este nível ainda não disponível. Em breve!</InfoBox>
          ) : activeTab === 'flashcard' ? (
            <div>
              {word ? (
                <>
                  <div className="flex justify-between text-xs text-[#4a5980] mb-3">
                    <span>{cardIndex+1}/{trailVocab.length}</span>
                    <button onClick={() => setCardIndex(0)} className="text-[#4a5980] hover:text-white">↺ Reiniciar</button>
                  </div>
                  <Flashcard key={word.id} word={word} onResult={(id,correct) => { handleVocabResult(id,correct); setTimeout(() => setCardIndex(i => Math.min(i+1,trailVocab.length-1)),1500) }}/>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">🎉</div>
                  <p className="font-heading font-bold text-xl mb-2">Todas as palavras revisadas!</p>
                  <p className="text-[#8899bb] text-sm mb-5">Ótimo trabalho!</p>
                  <Button onClick={() => setCardIndex(0)}>↺ Reiniciar</Button>
                </div>
              )}
            </div>
          ) : activeTab === 'quiz' ? (
            <WordQuiz key={`${activeTrail}-${activeLevel}`} words={trailVocab} onDone={() => setCardIndex(0)}/>
          ) : (
            <PronunciationGuide words={trailVocab}/>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
