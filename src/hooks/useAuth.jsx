import { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/services/supabase/client'
import { signOut } from '@/services/supabase/db'

const Ctx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  async function loadProfile(uid) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', uid)
        .maybeSingle()

      if (data) {
        setProfile(data)
      } else {
        // Profile missing — create it from auth metadata
        const { data: { user: authUser } } = await supabase.auth.getUser()
        const meta = authUser?.user_metadata || {}
        const fallback = {
          id: uid,
          nome: meta.nome || authUser?.email?.split('@')[0] || 'Usuário',
          username: meta.username || uid.slice(0, 8),
          email: authUser?.email || '',
          xp: 0,
          nivel_ingles: 'iniciante',
          trilha_ativa: 'data-science',
        }
        await supabase.from('profiles').upsert(fallback)
        setProfile(fallback)
      }
    } catch (e) {
      console.error('loadProfile error:', e)
    }
  }

  useEffect(() => {
    // Timeout de segurança — nunca fica carregando para sempre
    const timeout = setTimeout(() => setLoading(false), 5000)

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      clearTimeout(timeout)
      if (session?.user) {
        setUser(session.user)
        await loadProfile(session.user.id)
      }
      setLoading(false)
    }).catch(() => {
      clearTimeout(timeout)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (ev, session) => {
      if (ev === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        await loadProfile(session.user.id)
      }
      if (ev === 'SIGNED_OUT') {
        setUser(null)
        setProfile(null)
        navigate('/')
      }
    })

    return () => {
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [])

  async function logout() {
    try { await signOut() }
    catch {
      setUser(null)
      setProfile(null)
      navigate('/')
    }
  }

  function refreshProfile(updates) {
    setProfile(p => ({ ...p, ...updates }))
  }

  function reloadProfile() {
    if (user) loadProfile(user.id)
  }

  return (
    <Ctx.Provider value={{ user, profile, loading, logout, refreshProfile, reloadProfile }}>
      {children}
    </Ctx.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
