export function getLevelData(xp = 0) {
  let level = 1, acc = 0
  while (acc + level * 120 <= xp) { acc += level * 120; level++ }
  const current = xp - acc
  const needed  = level * 120
  return { level, current, needed, pct: Math.round((current / needed) * 100) }
}

export function getInitials(nome = '') {
  return nome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'
}

const TITLES = [
  [1,  'Rookie Learner'],
  [5,  'English Curious'],
  [10, 'Stack Overflow Survivor'],
  [15, 'Google Translate Addict'],
  [20, 'Junior Dev'],
  [25, 'Bug Hunter'],
  [30, 'Code Whisperer'],
  [40, 'Senior in Progress'],
  [50, 'Meeting Survivor'],
  [60, 'Tech Communicator'],
  [70, 'Bilingual Analyst'],
  [85, 'Global Professional'],
  [100,'English Legend'],
]

export function getLevelTitle(level) {
  let t = TITLES[0][1]
  for (const [l, n] of TITLES) { if (level >= l) t = n }
  return t
}

export const TRAIL_META = {
  'data-science': { label:'Data Science', icon:'📊', color:'#3b82f6', grad:'grad-ds', class:'trail-ds' },
  'genai':        { label:'GenAI & LLMs',  icon:'🤖', color:'#8b5cf6', grad:'grad-ai', class:'trail-ai' },
  'programacao':  { label:'Programação',   icon:'💻', color:'#10b981', grad:'grad-pr', class:'trail-pr' },
  'estatistica':  { label:'Estatística',   icon:'📈', color:'#f59e0b', grad:'grad-st', class:'trail-st' },
  'english':      { label:'Inglês Técnico',icon:'🇺🇸', color:'#ec4899', grad:'grad-en', class:'trail-en' },
}

export const LEVEL_META = {
  iniciante:     { label:'Iniciante',     color:'#10b981', icon:'🌱', badge:'green' },
  intermediario: { label:'Intermediário', color:'#f59e0b', icon:'📚', badge:'yellow' },
  avancado:      { label:'Avançado',      color:'#ef4444', icon:'🔥', badge:'red' },
}
