import { useNavigate } from 'react-router-dom'
import { PublicLayout } from '@/components/layout'
import { TRAIL_META } from '@/lib/gamification'

export default function Landing() {
  const navigate = useNavigate()

  const features = [
    { icon:'🗺️', title:'Trilhas Estruturadas',    desc:'Árvores de aprendizado progressivas do iniciante ao avançado, com pré-requisitos e módulos desbloqueáveis.' },
    { icon:'🇺🇸', title:'Inglês Técnico',          desc:'Vocabulário, pronúncia e frases de cada área. Aprenda os termos certos para comunicação profissional.' },
    { icon:'🎤', title:'Simulador de Entrevista', desc:'Pratique entrevistas reais em inglês para vagas de Data Science, Dev, GenAI e mais. Com feedback e nota.' },
    { icon:'📚', title:'Baseado em Livros',       desc:'Conteúdo curado de Deep Learning (Goodfellow), Data Science from Scratch, NLP with Transformers e mais.' },
    { icon:'🏆', title:'Ranking Global',          desc:'Compete com outros estudantes. XP, níveis e títulos que evoluem conforme você aprende.' },
    { icon:'➕', title:'Personalizável',          desc:'Adicione seus próprios cursos, recursos e materiais. Expanda as trilhas com novos PDFs.' },
  ]

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative flex flex-col items-center text-center px-4 py-16 sm:py-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/25 bg-blue-500/8 text-sm text-blue-300 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-dot"/>
          Trilhas de Tech · Inglês Técnico · Entrevistas
        </div>

        <h1 className="hero-h grad-logo mb-5">
          Aprenda Tech.<br/>Fale em Inglês.
        </h1>

        <p className="text-lg sm:text-xl text-[#8899bb] leading-relaxed max-w-2xl mb-8">
          Data Science, GenAI e Programação em trilhas estruturadas com foco em inglês técnico. Conteúdo baseado nos melhores livros do mercado.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <button onClick={() => navigate('/register')}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-base transition-all shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:-translate-y-px">
            Começar grátis 🚀
          </button>
          <button onClick={() => navigate('/login')}
            className="px-7 py-3.5 rounded-xl border border-[#1e2d47] text-[#8899bb] hover:bg-[#111827] hover:text-white font-semibold text-base transition-all">
            Já tenho conta
          </button>
        </div>

        {/* Trail cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full max-w-3xl mb-16 stagger">
          {Object.entries(TRAIL_META).map(([k,v]) => (
            <div key={k} className="anim-up bg-[#111827] border border-[#1e2d47] rounded-2xl p-4 text-center hover:border-[#243552] hover:-translate-y-1 transition-all cursor-pointer"
              onClick={() => navigate('/register')}>
              <div className="text-3xl mb-2">{v.icon}</div>
              <p className="text-xs font-semibold text-[#8899bb]">{v.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-20 max-w-5xl mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-10">
          Tudo que você precisa para <span className="grad-logo">evoluir</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
          {features.map((f, i) => (
            <div key={i} className="anim-up bg-[#111827] border border-[#1e2d47] rounded-2xl p-6 hover:border-[#243552] hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-heading font-bold text-base mb-2">{f.title}</h3>
              <p className="text-sm text-[#8899bb] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-600/15 to-purple-600/15 border border-blue-500/20 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3">Pronto para começar?</h2>
          <p className="text-[#8899bb] mb-7">Grátis. Sem cartão. Começa agora.</p>
          <button onClick={() => navigate('/register')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-lg transition-all shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:-translate-y-px">
            Criar conta grátis 🚀
          </button>
        </div>
      </section>
    </PublicLayout>
  )
}
