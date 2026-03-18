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
        .single()
      if (!error && data) setProfile(data)
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
