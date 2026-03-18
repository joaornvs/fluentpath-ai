import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PublicLayout } from '@/components/layout'
import { Button, Card, FormField, Input, InfoBox, Badge } from '@/components/ui'
import { signUp, signIn } from '@/services/supabase/db'
import { useAuth } from '@/hooks/useAuth'
import { TRAIL_META, LEVEL_META } from '@/lib/gamification'
import toast from 'react-hot-toast'

// ── Register ───────────────────────────────────────────────
export function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1=account, 2=preferences
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    nome:'', username:'', email:'', password:'',
    trilha:'data-science', nivel:'iniciante',
  })
  const set = k => e => { setForm(p=>({...p,[k]:e.target.value})); setError('') }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password.length < 6) { setError('Senha mínima: 6 caracteres.'); return }
    if (!/^[a-z0-9_]+$/.test(form.username.toLowerCase())) { setError('Username: apenas letras, números e _.'); return }
    setLoading(true)
    try {
      await signUp({ ...form, username: form.username.toLowerCase() })
      navigate('/confirm-email', { state: { email: form.email } })
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg anim-up">
          {/* Steps indicator */}
          <div className="flex items-center gap-2 justify-center mb-6">
            {[1,2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step>=s ? 'bg-blue-600 text-white' : 'bg-[#1e2d47] text-[#4a5980]'}`}>{s}</div>
                {s<2 && <div className={`w-12 h-0.5 rounded-full ${step>s ? 'bg-blue-600' : 'bg-[#1e2d47]'}`}/>}
              </div>
            ))}
          </div>

          <Card glow padding="p-8">
            <h2 className="font-heading text-2xl font-bold mb-1">
              {step===1 ? 'Criar conta 🚀' : 'Suas preferências 🎯'}
            </h2>
            <p className="text-[#8899bb] text-sm mb-6">
              {step===1 ? 'Comece sua jornada de aprendizado' : 'Personalize sua experiência'}
            </p>

            <InfoBox type="info" className="mb-5">
              📧 Você receberá um email de confirmação. Verifique também o spam.
            </InfoBox>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Nome completo">
                      <Input value={form.nome} onChange={set('nome')} placeholder="João Silva" required/>
                    </FormField>
                    <FormField label="Username">
                      <Input value={form.username} onChange={set('username')} placeholder="joao123" required/>
                    </FormField>
                  </div>
                  <FormField label="Email">
                    <Input type="email" value={form.email} onChange={set('email')} placeholder="joao@email.com" required/>
                  </FormField>
                  <FormField label="Senha (mín. 6 caracteres)">
                    <Input type="password" value={form.password} onChange={set('password')} placeholder="••••••••" required/>
                  </FormField>
                  {error && <InfoBox type="error">{error}</InfoBox>}
                  <Button type="button" onClick={() => {
                    if (!form.nome||!form.username||!form.email||!form.password) { setError('Preencha todos os campos.'); return }
                    if (form.password.length<6) { setError('Senha mínima: 6 caracteres.'); return }
                    setError(''); setStep(2)
                  }} fullWidth>Próximo →</Button>
                </>
              )}

              {step === 2 && (
                <>
                  <FormField label="Qual trilha principal você quer seguir?">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                      {Object.entries(TRAIL_META).map(([k,v]) => (
                        <button type="button" key={k} onClick={() => setForm(p=>({...p,trilha:k}))}
                          className={`p-3 rounded-xl border-2 text-left transition-all ${form.trilha===k ? 'border-blue-500 bg-blue-500/10' : 'border-[#1e2d47] hover:border-[#243552]'}`}>
                          <div className="text-2xl mb-1">{v.icon}</div>
                          <div className="text-xs font-semibold">{v.label}</div>
                        </button>
                      ))}
                    </div>
                  </FormField>

                  <FormField label="Seu nível de inglês">
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {Object.entries(LEVEL_META).map(([k,v]) => (
                        <button type="button" key={k} onClick={() => setForm(p=>({...p,nivel:k}))}
                          className={`p-3 rounded-xl border-2 text-center transition-all ${form.nivel===k ? 'border-blue-500 bg-blue-500/10' : 'border-[#1e2d47] hover:border-[#243552]'}`}>
                          <div className="text-xl mb-1">{v.icon}</div>
                          <div className="text-xs font-semibold">{v.label}</div>
                        </button>
                      ))}
                    </div>
                  </FormField>

                  {error && <InfoBox type="error">{error}</InfoBox>}
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>← Voltar</Button>
                    <Button type="submit" loading={loading} fullWidth>Criar conta 🚀</Button>
                  </div>
                </>
              )}
            </form>

            <p className="text-center text-sm text-[#8899bb] mt-5">
              Já tem conta? <Link to="/login" className="text-blue-400 hover:underline">Entrar</Link>
            </p>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}

// ── Login ──────────────────────────────────────────────────
export function Login() {
  const navigate = useNavigate()
  const { reloadProfile } = useAuth()
  const [form, setForm] = useState({ identifier:'', password:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const set = k => e => { setForm(p=>({...p,[k]:e.target.value})); setError('') }

  async function handle(e) {
    e.preventDefault(); setLoading(true)
    try { await signIn(form); reloadProfile(); navigate('/dashboard') }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md anim-up">
          <Card glow padding="p-8">
            <h2 className="font-heading text-2xl font-bold mb-1">Bem-vindo de volta 👋</h2>
            <p className="text-[#8899bb] text-sm mb-7">Entre para continuar sua trilha</p>
            <form onSubmit={handle} className="flex flex-col gap-4">
              <FormField label="Email ou Username">
                <Input value={form.identifier} onChange={set('identifier')} placeholder="joao@email.com ou joao123" required/>
              </FormField>
              <FormField label="Senha">
                <Input type="password" value={form.password} onChange={set('password')} placeholder="••••••••" required/>
              </FormField>
              {error && <InfoBox type="error">{error}</InfoBox>}
              <Button type="submit" loading={loading} fullWidth>Entrar →</Button>
            </form>
            <p className="text-center text-sm text-[#8899bb] mt-5">
              Não tem conta? <Link to="/register" className="text-blue-400 hover:underline">Criar agora</Link>
            </p>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}

// ── ConfirmEmail ───────────────────────────────────────────
export function ConfirmEmail() {
  const navigate = useNavigate()
  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4">
        <div className="w-full max-w-md anim-up">
          <Card glow padding="p-10" className="text-center">
            <div className="text-6xl mb-4">📧</div>
            <h2 className="font-heading text-2xl font-bold mb-3">Confirme seu email!</h2>
            <p className="text-[#8899bb] text-sm leading-relaxed mb-5">
              Enviamos um link de confirmação. Clique nele para ativar sua conta e depois volte aqui para entrar.
            </p>
            <InfoBox type="warning" className="text-left mb-6">
              💡 Não recebeu? Verifique a pasta de <strong>spam</strong> ou <strong>lixo eletrônico</strong>.
            </InfoBox>
            <div className="flex flex-col gap-3">
              <Button onClick={() => navigate('/login')} fullWidth>Já confirmei → Entrar</Button>
              <Button variant="outline" onClick={() => navigate('/')} fullWidth>Voltar ao início</Button>
            </div>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}
