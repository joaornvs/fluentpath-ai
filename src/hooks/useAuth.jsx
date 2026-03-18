import { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/services/supabase/client'
import { getProfile, signOut } from '@/services/supabase/db'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        await loadProfile(session.user.id)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        await loadProfile(session.user.id)
      }
      if (event === 'SIGNED_OUT') {
        setUser(null)
        setProfile(null)
        navigate('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function loadProfile(uid) {
    try {
      const p = await getProfile(uid)
      setProfile(p)
    } catch (e) {
      console.error('loadProfile error:', e)
    }
  }

  async function logout() {
    try {
      await signOut()
    } catch (e) {
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
    <AuthContext.Provider value={{ user, profile, loading, logout, refreshProfile, reloadProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
