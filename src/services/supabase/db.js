import { supabase } from './client'

// ── AUTH ──────────────────────────────────────────────────
export async function signUp({ nome, username, email, password, trilha, nivel }) {
  const { data: ex } = await supabase.from('profiles').select('id').eq('username', username.toLowerCase()).maybeSingle()
  if (ex) throw new Error('Username já em uso. Tente outro.')
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { emailRedirectTo: `${window.location.origin}/login` },
  })
  if (error) throw error
  if (data.user) {
    const { error: pe } = await supabase.from('profiles').insert({
      id: data.user.id, nome, username: username.toLowerCase(),
      email, xp: 0, nivel_ingles: nivel || 'iniciante',
      trilha_ativa: trilha || 'data-science',
    })
    if (pe) console.error('profile insert:', pe)
  }
  return data
}

export async function signIn({ identifier, password }) {
  let email = identifier
  if (!identifier.includes('@')) {
    const { data: p } = await supabase.from('profiles').select('email').eq('username', identifier.toLowerCase()).maybeSingle()
    if (!p) throw new Error('Usuário não encontrado.')
    email = p.email
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  await supabase.auth.signOut()
}

// ── PROFILE ───────────────────────────────────────────────
export async function getProfile(userId) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
  if (error) throw error
  return data
}

export async function updateProfile(userId, updates) {
  const { error } = await supabase.from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() }).eq('id', userId)
  if (error) throw error
}

export async function uploadAvatar(userId, file) {
  const ext = file.name.split('.').pop()
  const path = `avatars/${userId}.${ext}`
  const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
  if (error) throw error
  const { data } = supabase.storage.from('avatars').getPublicUrl(path)
  await updateProfile(userId, { foto_url: data.publicUrl })
  return data.publicUrl
}

// ── XP helpers ────────────────────────────────────────────
async function addXP(userId, amount) {
  const { data } = await supabase.from('profiles').select('xp').eq('id', userId).single()
  const newXP = (data?.xp || 0) + amount
  await supabase.from('profiles').update({ xp: newXP }).eq('id', userId)
  return newXP
}

// ── PROGRESS ──────────────────────────────────────────────
export async function getProgress(userId) {
  const { data } = await supabase.from('progresso').select('*').eq('user_id', userId)
  return data || []
}

export async function markNodeComplete(userId, nodeId, trailId) {
  const { data: ex } = await supabase.from('progresso').select('id').eq('user_id', userId).eq('node_id', nodeId).maybeSingle()
  if (ex) return
  await supabase.from('progresso').insert({ user_id: userId, node_id: nodeId, trail_id: trailId, completed_at: new Date().toISOString() })
  return await addXP(userId, 15)
}

export async function saveExerciseResult(userId, nodeId, correct) {
  await supabase.from('exercicios_resultado').insert({
    user_id: userId, node_id: nodeId, correct, answered_at: new Date().toISOString(),
  })
  return await addXP(userId, correct ? 10 : 3)
}

// ── ENGLISH PROGRESS ──────────────────────────────────────
export async function saveVocabResult(userId, wordId, correct) {
  await supabase.from('vocab_resultado').insert({
    user_id: userId, word_id: wordId, correct, answered_at: new Date().toISOString(),
  })
  return await addXP(userId, correct ? 5 : 1)
}

export async function getVocabProgress(userId) {
  const { data } = await supabase.from('vocab_resultado').select('*').eq('user_id', userId)
  return data || []
}

// ── COURSES ───────────────────────────────────────────────
export async function getUserCourses(userId) {
  const { data } = await supabase.from('cursos_usuario').select('*').eq('user_id', userId).order('created_at', { ascending: false })
  return data || []
}

export async function saveUserCourse(userId, course) {
  const { error } = await supabase.from('cursos_usuario').insert({ user_id: userId, ...course })
  if (error) throw error
}

export async function deleteUserCourse(id) {
  await supabase.from('cursos_usuario').delete().eq('id', id)
}

// ── INTERVIEWS ────────────────────────────────────────────
export async function saveInterviewResult(userId, trailId, jobTitle, nivel, score, total, feedback) {
  await supabase.from('entrevistas').insert({
    user_id: userId, trail_id: trailId, job_title: jobTitle,
    nivel, score, total, feedback, done_at: new Date().toISOString(),
  })
  return await addXP(userId, Math.round(score * 8))
}

export async function getInterviews(userId) {
  const { data } = await supabase.from('entrevistas').select('*').eq('user_id', userId).order('done_at', { ascending: false })
  return data || []
}

// ── RANKING ───────────────────────────────────────────────
export async function getRanking(limit = 50) {
  const { data } = await supabase.from('profiles')
    .select('id, nome, username, xp, trilha_ativa, nivel_ingles, foto_url')
    .order('xp', { ascending: false }).limit(limit)
  return data || []
}
