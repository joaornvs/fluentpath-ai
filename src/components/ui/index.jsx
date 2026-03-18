export function Button({ children, variant = 'primary', className = '', disabled, loading, onClick, type = 'button' }) {
  const base = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
  const v = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:-translate-y-px',
    outline: 'bg-transparent border border-[#1c2840] text-[#8899bb] hover:bg-[#111624] hover:text-white',
    ghost:   'bg-transparent text-[#8899bb] hover:bg-[#111624] hover:text-white',
    danger:  'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20',
    green:   'bg-emerald-600 hover:bg-emerald-700 text-white',
    purple:  'bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_20px_rgba(139,92,246,0.25)]',
  }
  return <button type={type} onClick={onClick} disabled={disabled || loading} className={`${base} ${v[variant]} ${className}`}>
    {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spin" />}
    {children}
  </button>
}

export function Card({ children, className = '', onClick }) {
  return <div onClick={onClick} className={`bg-[#111624] border border-[#1c2840] rounded-2xl p-5 ${onClick ? 'cursor-pointer hover:border-blue-500/30 hover:-translate-y-0.5 transition-all' : ''} ${className}`}>{children}</div>
}

export function Badge({ children, color = 'blue', size = 'sm' }) {
  const colors = { blue: 'bg-blue-500/15 text-blue-300 border-blue-500/20', green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20', yellow: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/20', purple: 'bg-purple-500/15 text-purple-300 border-purple-500/20', red: 'bg-red-500/15 text-red-300 border-red-500/20', gray: 'bg-gray-500/15 text-gray-300 border-gray-500/20' }
  const sizes = { sm: 'px-2.5 py-0.5 text-xs', md: 'px-3 py-1 text-sm' }
  return <span className={`inline-flex items-center gap-1 rounded-lg border font-semibold ${colors[color]} ${sizes[size]}`}>{children}</span>
}

export function Spinner({ size = 'md' }) {
  const s = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-2', lg: 'w-12 h-12 border-3' }
  return <div className={`${s[size]} border-[#1c2840] border-t-blue-500 rounded-full spin`} />
}

export function XPBar({ pct, color = '#3b82f6', className = '' }) {
  return <div className={`h-2 bg-[#1c2840] rounded-full overflow-hidden ${className}`}>
    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, pct)}%`, background: color }} />
  </div>
}

export function InfoBox({ children, type = 'info', className = '' }) {
  const t = { info: 'bg-blue-500/8 border-blue-500/20 text-blue-200', success: 'bg-emerald-500/8 border-emerald-500/20 text-emerald-200', warning: 'bg-yellow-500/8 border-yellow-500/20 text-yellow-200', error: 'bg-red-500/8 border-red-500/20 text-red-200' }
  return <div className={`p-4 border rounded-xl text-sm leading-relaxed ${t[type]} ${className}`}>{children}</div>
}

export function LoadingScreen({ text = 'Carregando...' }) {
  return <div className="fixed inset-0 bg-[#07090f] flex items-center justify-center z-50 flex-col gap-4">
    <Spinner size="lg" />
    <p className="text-[#8899bb] text-sm">{text}</p>
  </div>
}

export function FormField({ label, children, error }) {
  return <div className="flex flex-col gap-1.5">
    {label && <label className="text-xs font-medium text-[#8899bb] uppercase tracking-wide">{label}</label>}
    {children}
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
}

export function ProgressRing({ pct, size = 64, color = '#3b82f6', children }) {
  const r = (size - 8) / 2, c = 2 * Math.PI * r, dash = (pct / 100) * c
  return <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1c2840" strokeWidth="8" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={`${dash} ${c}`} strokeLinecap="round" style={{ transition: 'stroke-dasharray .7s ease' }} />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">{children}</div>
  </div>
}
