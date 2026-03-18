// ── Button ─────────────────────────────────────────────────
export function Button({ children, variant='primary', size='md', className='', disabled, loading, onClick, type='button', fullWidth=false }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap'
  const s = { sm:'px-3 py-1.5 text-xs', md:'px-5 py-2.5 text-sm', lg:'px-6 py-3 text-base', xl:'px-8 py-4 text-lg' }
  const v = {
    primary:  'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_24px_rgba(59,130,246,0.2)] hover:shadow-[0_0_36px_rgba(59,130,246,0.35)] hover:-translate-y-px active:translate-y-0',
    secondary:'bg-[#161f30] hover:bg-[#1e2d47] text-white border border-[#1e2d47] hover:border-[#243552]',
    outline:  'bg-transparent border border-[#1e2d47] text-[#8899bb] hover:bg-[#111827] hover:text-white hover:border-[#243552]',
    ghost:    'bg-transparent text-[#8899bb] hover:bg-[#111827] hover:text-white',
    danger:   'bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500/20',
    success:  'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20',
    purple:   'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_24px_rgba(139,92,246,0.2)] hover:-translate-y-px',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white hover:-translate-y-px shadow-[0_0_32px_rgba(99,102,241,0.25)]',
    pink:     'bg-pink-600 hover:bg-pink-500 text-white hover:-translate-y-px shadow-[0_0_24px_rgba(236,72,153,0.2)]',
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled||loading}
      className={`${base} ${s[size]||s.md} ${v[variant]||v.primary} ${fullWidth?'w-full':''} ${className}`}>
      {loading && <div className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full spin flex-shrink-0"/>}
      {children}
    </button>
  )
}

// ── Card ───────────────────────────────────────────────────
export function Card({ children, className='', onClick, hover=false, padding='p-5', glow=false }) {
  return (
    <div onClick={onClick}
      className={`bg-[#111827] border border-[#1e2d47] rounded-2xl ${padding} ${glow?'shadow-[0_0_40px_rgba(59,130,246,0.07)]':''} ${(onClick||hover)?'card-hover cursor-pointer':''} ${className}`}>
      {children}
    </div>
  )
}

// ── Badge ──────────────────────────────────────────────────
export function Badge({ children, color='blue', size='sm', dot=false, className='' }) {
  const c = {
    blue:   'bg-blue-500/12 text-blue-300 border-blue-500/20',
    green:  'bg-emerald-500/12 text-emerald-300 border-emerald-500/20',
    yellow: 'bg-yellow-500/12 text-yellow-300 border-yellow-500/20',
    purple: 'bg-purple-500/12 text-purple-300 border-purple-500/20',
    red:    'bg-red-500/12 text-red-300 border-red-500/20',
    pink:   'bg-pink-500/12 text-pink-300 border-pink-500/20',
    cyan:   'bg-cyan-500/12 text-cyan-300 border-cyan-500/20',
    gray:   'bg-gray-500/10 text-gray-400 border-gray-500/15',
    white:  'bg-white/8 text-white border-white/12',
  }
  const s = { xs:'px-1.5 py-0.5 text-xs', sm:'px-2.5 py-1 text-xs', md:'px-3 py-1.5 text-sm' }
  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-lg border ${c[color]||c.gray} ${s[size]||s.sm} ${className}`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current pulse-dot"/>}
      {children}
    </span>
  )
}

// ── Spinner ────────────────────────────────────────────────
export function Spinner({ size='md', color='blue' }) {
  const s = { xs:'w-3 h-3 border', sm:'w-4 h-4 border-2', md:'w-8 h-8 border-2', lg:'w-12 h-12 border-[3px]', xl:'w-16 h-16 border-[3px]' }
  const c = { blue:'border-t-blue-500', purple:'border-t-purple-500', green:'border-t-emerald-500', white:'border-t-white', pink:'border-t-pink-500' }
  return <div className={`${s[size]||s.md} border-[#1e2d47] ${c[color]||c.blue} rounded-full spin`}/>
}

// ── XPBar ──────────────────────────────────────────────────
export function XPBar({ pct=0, color, height=6, className='' }) {
  const bg = color || 'linear-gradient(90deg,#3b82f6,#8b5cf6)'
  return (
    <div className={`rounded-full overflow-hidden bg-[#1e2d47] ${className}`} style={{height}}>
      <div className="h-full rounded-full xp-fill" style={{width:`${Math.min(100,Math.max(0,pct))}%`,background:bg}}/>
    </div>
  )
}

// ── ProgressRing ───────────────────────────────────────────
export function ProgressRing({ pct=0, size=72, stroke=6, color='#3b82f6', children, className='' }) {
  const r = (size-stroke)/2
  const circ = 2*Math.PI*r
  const offset = circ - (pct/100)*circ
  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`} style={{width:size,height:size}}>
      <svg width={size} height={size} style={{transform:'rotate(-90deg)'}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e2d47" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{transition:'stroke-dashoffset .8s cubic-bezier(.4,0,.2,1)'}}/>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}

// ── InfoBox ────────────────────────────────────────────────
export function InfoBox({ children, type='info', className='' }) {
  const t = {
    info:    'bg-blue-500/8 border-blue-500/20 text-blue-200',
    success: 'bg-emerald-500/8 border-emerald-500/20 text-emerald-200',
    warning: 'bg-yellow-500/8 border-yellow-500/20 text-yellow-200',
    error:   'bg-red-500/8 border-red-500/20 text-red-200',
    purple:  'bg-purple-500/8 border-purple-500/20 text-purple-200',
  }
  return <div className={`p-4 border rounded-xl text-sm leading-relaxed ${t[type]||t.info} ${className}`}>{children}</div>
}

// ── FormField ──────────────────────────────────────────────
export function FormField({ label, error, children, hint, className='' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-xs font-semibold text-[#8899bb] uppercase tracking-wider">{label}</label>}
      {children}
      {hint && <p className="text-xs text-[#4a5980]">{hint}</p>}
      {error && <p className="text-xs text-red-400 flex items-center gap-1">⚠ {error}</p>}
    </div>
  )
}

// ── Input ──────────────────────────────────────────────────
export function Input({ className='', ...props }) {
  return <input className={`inp ${className}`} {...props}/>
}
export function Select({ className='', children, ...props }) {
  return <select className={`inp ${className}`} {...props}>{children}</select>
}
export function Textarea({ className='', ...props }) {
  return <textarea className={`inp resize-none ${className}`} {...props}/>
}

// ── LoadingScreen ──────────────────────────────────────────
export function LoadingScreen({ text='Carregando...' }) {
  return (
    <div className="fixed inset-0 bg-[#050810] flex flex-col items-center justify-center z-50 gap-4">
      <div className="text-2xl font-heading font-bold grad-logo">⚡ LearnPath</div>
      <Spinner size="lg"/>
      <p className="text-[#8899bb] text-sm">{text}</p>
    </div>
  )
}

// ── Empty state ────────────────────────────────────────────
export function Empty({ icon='📭', title, desc, action }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="text-5xl mb-3">{icon}</div>
      <p className="font-heading font-bold text-lg mb-1">{title}</p>
      {desc && <p className="text-[#8899bb] text-sm mb-5 max-w-xs mx-auto">{desc}</p>}
      {action}
    </div>
  )
}

// ── StatCard ───────────────────────────────────────────────
export function StatCard({ label, value, sub, color='', icon, className='' }) {
  return (
    <Card className={className}>
      <p className="text-xs uppercase tracking-widest text-[#4a5980] mb-1 flex items-center gap-1">{icon} {label}</p>
      <p className={`font-heading text-3xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-[#8899bb] mt-0.5">{sub}</p>}
    </Card>
  )
}

// ── Tab bar ────────────────────────────────────────────────
export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 p-1 bg-[#0d1220] rounded-xl border border-[#1e2d47]">
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${active===t.id ? 'bg-blue-600 text-white shadow' : 'text-[#8899bb] hover:text-white'}`}>
          {t.label}
        </button>
      ))}
    </div>
  )
}

// ── Divider ────────────────────────────────────────────────
export function Divider({ label, className='' }) {
  if (!label) return <div className={`h-px bg-[#1e2d47] ${className}`}/>
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-px bg-[#1e2d47]"/>
      <span className="text-xs text-[#4a5980] font-medium">{label}</span>
      <div className="flex-1 h-px bg-[#1e2d47]"/>
    </div>
  )
}
