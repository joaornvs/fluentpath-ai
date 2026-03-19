import { supabase } from './client'

// ── AUTH ──────────────────────────────────────────────────
export async function signUp({ nome, username, email, password, trilha, nivel }) {
  const { data: ex } = await supabase.from('profiles').select('id').eq('username', username.toLowerCase()).maybeSingle()
  if (ex) throw new Error('Username já em uso.')
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { emailRedirectTo: `${window.location.origin}/login` },
  })
  if (error) throw error
  if (data.user) {
    await supabase.from('profiles').insert({
      id: data.user.id, nome, username: username.toLowerCase(),
      email, xp: 0, nivel_ingles: nivel || 'iniciante',
      trilha_ativa: trilha || 'data-science',
    })
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
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
  if (error) { console.error('getProfile:', error); return null }
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

// ── XP ────────────────────────────────────────────────────
async function addXP(userId, amount) {
  try {
    const { data } = await supabase.from('profiles').select('xp').eq('id', userId).maybeSingle()
    const newXP = (data?.xp || 0) + amount
    await supabase.from('profiles').update({ xp: newXP }).eq('id', userId)
    return newXP
  } catch(e) {
    console.error('addXP error:', e)
    return null
  }
}

// ── PROGRESS ──────────────────────────────────────────────
export async function getProgress(userId) {
  try {
    const { data, error } = await supabase.from('progresso').select('*').eq('user_id', userId)
    if (error) { console.error('getProgress:', error); return [] }
    return data || []
  } catch(e) { return [] }
}

export async function markNodeComplete(userId, nodeId, trailId) {
  try {
    const { data: ex } = await supabase.from('progresso').select('id').eq('user_id', userId).eq('node_id', nodeId).maybeSingle()
    if (ex) return null
    await supabase.from('progresso').insert({
      user_id: userId, node_id: nodeId, trail_id: trailId,
      completed_at: new Date().toISOString()
    })
    return await addXP(userId, 15)
  } catch(e) { console.error('markNodeComplete:', e); return null }
}

export async function saveExerciseResult(userId, nodeId, correct) {
  try {
    await supabase.from('exercicios_resultado').insert({
      user_id: userId, node_id: nodeId, correct,
      answered_at: new Date().toISOString(),
    })
    return await addXP(userId, correct ? 10 : 3)
  } catch(e) { console.error('saveExerciseResult:', e); return null }
}

// ── VOCAB ─────────────────────────────────────────────────
export async function saveVocabResult(userId, wordId, correct) {
  try {
    await supabase.from('vocab_resultado').insert({
      user_id: userId, word_id: wordId, correct,
      answered_at: new Date().toISOString(),
    })
    return await addXP(userId, correct ? 5 : 1)
  } catch(e) { console.error('saveVocabResult:', e); return null }
}

export async function getVocabProgress(userId) {
  try {
    const { data, error } = await supabase.from('vocab_resultado').select('*').eq('user_id', userId)
    if (error) return []
    return data || []
  } catch(e) { return [] }
}

// ── COURSES ───────────────────────────────────────────────
export async function getUserCourses(userId) {
  try {
    const { data, error } = await supabase.from('cursos_usuario').select('*')
      .eq('user_id', userId).order('created_at', { ascending: false })
    if (error) { console.error('getUserCourses:', error); return [] }
    return data || []
  } catch(e) { return [] }
}

export async function saveUserCourse(userId, course) {
  const { error } = await supabase.from('cursos_usuario').insert({ user_id: userId, ...course })
  if (error) throw error
}

export async function deleteUserCourse(id) {
  const { error } = await supabase.from('cursos_usuario').delete().eq('id', id)
  if (error) throw error
}

// ── INTERVIEWS ────────────────────────────────────────────
export async function saveInterviewResult(userId, trailId, jobTitle, nivel, score, total, feedback) {
  try {
    await supabase.from('entrevistas').insert({
      user_id: userId, trail_id: trailId, job_title: jobTitle,
      nivel, score, total, feedback, done_at: new Date().toISOString(),
    })
    return await addXP(userId, Math.round(score * 8))
  } catch(e) { console.error('saveInterviewResult:', e); return null }
}

export async function getInterviews(userId) {
  try {
    const { data, error } = await supabase.from('entrevistas').select('*')
      .eq('user_id', userId).order('done_at', { ascending: false })
    if (error) return []
    return data || []
  } catch(e) { return [] }
}

// ── RANKING ───────────────────────────────────────────────
export async function getRanking(limit = 50) {
  try {
    const { data, error } = await supabase.from('profiles')
      .select('id, nome, username, xp, trilha_ativa, nivel_ingles, foto_url')
      .order('xp', { ascending: false }).limit(limit)
    if (error) { console.error('getRanking:', error); return [] }
    return data || []
  } catch(e) { return [] }
}
