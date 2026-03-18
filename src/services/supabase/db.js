import { supabase } from './client'

// ── AUTH ──────────────────────────────────────────────────
export async function signUp({ nome, username, email, password }) {
  const { data: ex } = await supabase.from('profiles').select('id').eq('username', username.toLowerCase()).single()
  if (ex) throw new Error('Username já está em uso.')
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { emailRedirectTo: `${window.location.origin}/login` },
  })
  if (error) throw error
  if (data.user) {
    await supabase.from('profiles').insert({
      id: data.user.id, nome, username: username.toLowerCase(), email,
      nivel_escolhido: 'iniciante', trilha_ativa: 'data-science', xp: 0,
    })
  }
  return data
}

export async function signIn({ identifier, password }) {
  let email = identifier
  if (!identifier.includes('@')) {
    const { data: p } = await supabase.from('profiles').select('email').eq('username', identifier.toLowerCase()).single()
    if (!p) throw new Error('Usuário não encontrado.')
    email = p.email
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// ── PROFILE ───────────────────────────────────────────────
export async function getProfile(userId) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
  if (error) throw error
  return data
}

export async function updateProfile(userId, updates) {
  const { error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
  if (error) throw error
}

// ── PROGRESS ──────────────────────────────────────────────
export async function getProgress(userId) {
  const { data } = await supabase.from('progresso').select('*').eq('user_id', userId)
  return data || []
}

export async function markNodeComplete(userId, nodeId, trailId) {
  const { data: existing } = await supabase
    .from('progresso').select('id').eq('user_id', userId).eq('node_id', nodeId).single()
  if (existing) return
  await supabase.from('progresso').insert({
    user_id: userId, node_id: nodeId, trail_id: trailId,
    completed_at: new Date().toISOString(),
  })
  const { data: prof } = await supabase.from('profiles').select('xp').eq('id', userId).single()
  await supabase.from('profiles').update({ xp: (prof?.xp || 0) + 15 }).eq('id', userId)
}

export async function saveExerciseResult(userId, nodeId, exerciseId, correct) {
  await supabase.from('exercicios_resultado').insert({
    user_id: userId, node_id: nodeId, exercise_id: exerciseId,
    correct, answered_at: new Date().toISOString(),
  })
  const { data: prof } = await supabase.from('profiles').select('xp').eq('id', userId).single()
  await supabase.from('profiles').update({ xp: (prof?.xp || 0) + (correct ? 10 : 3) }).eq('id', userId)
}

// ── CUSTOM COURSES ────────────────────────────────────────
export async function getUserCourses(userId) {
  const { data } = await supabase
    .from('cursos_usuario').select('*').eq('user_id', userId)
    .order('created_at', { ascending: false })
  return data || []
}

export async function saveUserCourse(userId, course) {
  const { error } = await supabase.from('cursos_usuario').insert({ user_id: userId, ...course })
  if (error) throw error
}

export async function deleteUserCourse(id) {
  const { error } = await supabase.from('cursos_usuario').delete().eq('id', id)
  if (error) throw error
}

// ── INTERVIEW RESULTS ─────────────────────────────────────
export async function saveInterviewResult(userId, trailId, nivel, score, total) {
  await supabase.from('entrevistas').insert({
    user_id: userId, trail_id: trailId, nivel, score, total,
    done_at: new Date().toISOString(),
  })
  const { data: prof } = await supabase.from('profiles').select('xp').eq('id', userId).single()
  await supabase.from('profiles').update({ xp: (prof?.xp || 0) + score * 5 }).eq('id', userId)
}

// ── RANKING ───────────────────────────────────────────────
export async function getRanking(limit = 30) {
  const { data } = await supabase
    .from('profiles')
    .select('id, nome, username, xp, trilha_ativa, nivel_escolhido')
    .order('xp', { ascending: false })
    .limit(limit)
  return data || []
}
