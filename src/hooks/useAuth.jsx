import { useState, useEffect, createContext, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/services/supabase/client'
import { getProfile, signOut } from '@/services/supabase/db'

const Ctx = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate  = useNavigate()
  const mounted   = useRef(true)

  useEffect(() => {
    mounted.current = true
    const timeout = setTimeout(() => { if (mounted.current) setLoading(false) }, 4000)

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted.current) return
      clearTimeout(timeout)
      if (session?.user) {
        setUser(session.user)
        // Load profile in background — don't block
        getProfile(session.user.id)
          .then(p => { if (mounted.current && p) setProfile(p) })
          .catch(() => {})
      }
      setLoading(false)
    }).catch(() => { if (mounted.current) setLoading(false) })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (ev, session) => {
      if (!mounted.current) return
      if (ev === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        getProfile(session.user.id).then(p => { if (mounted.current && p) setProfile(p) }).catch(() => {})
      }
      if (ev === 'SIGNED_OUT') { setUser(null); setProfile(null); navigate('/') }
    })

    return () => { mounted.current = false; clearTimeout(timeout); subscription.unsubscribe() }
  }, [])

  async function logout() {
    try { await signOut() } catch { setUser(null); setProfile(null); navigate('/') }
  }

  function refreshProfile(updates) { setProfile(p => p ? { ...p, ...updates } : updates) }
  function reloadProfile() { if (user) getProfile(user.id).then(p => p && setProfile(p)).catch(() => {}) }

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
