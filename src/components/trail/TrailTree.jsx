import { useState } from 'react'
import { LEVELS_CONFIG } from '@/data/curriculum'
import { Badge } from '@/components/ui'

// ── Node Component ────────────────────────────────────────
function TrailNode({ node, completed, unlocked, onClick }) {
  const lvlCfg = LEVELS_CONFIG[node.level]
  const statusIcon = completed ? '✅' : unlocked ? '🔓' : '🔒'
  const borderColor = completed ? '#10b981' : unlocked ? lvlCfg.color : '#1c2840'
  const opacity = unlocked ? 1 : 0.45

  return (
    <div
      onClick={() => unlocked && onClick(node)}
      className={`relative flex flex-col gap-2 p-4 rounded-xl border-2 transition-all duration-200 w-64 ${unlocked ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg' : 'cursor-not-allowed'}`}
      style={{ borderColor, background: completed ? 'rgba(16,185,129,0.06)' : `${lvlCfg.bg}`, opacity }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-heading text-sm font-bold leading-tight">{node.title}</p>
          <p className="text-xs text-[#8899bb] mt-0.5 leading-snug line-clamp-2">{node.description}</p>
        </div>
        <span className="text-lg flex-shrink-0">{statusIcon}</span>
      </div>
      <div className="flex items-center justify-between mt-1">
        <Badge color={completed ? 'green' : unlocked ? 'blue' : 'gray'} size="sm">
          {lvlCfg.icon} {lvlCfg.label}
        </Badge>
        <span className="text-xs text-[#4a5980]">⏱ {node.duration}</span>
      </div>
    </div>
  )
}

// ── Connector Line ─────────────────────────────────────────
function Connector({ completed }) {
  return (
    <div className="flex justify-center my-1">
      <div className={`w-0.5 h-8 rounded-full ${completed ? 'bg-emerald-500' : 'bg-[#1c2840]'}`} />
    </div>
  )
}

// ── Level Section ─────────────────────────────────────────
function LevelSection({ levelKey, nodes, completedIds, onNodeClick }) {
  const cfg = LEVELS_CONFIG[levelKey]
  const [expanded, setExpanded] = useState(levelKey === 'iniciante')

  return (
    <div className="mb-6">
      <button
        onClick={() => setExpanded(e => !e)}
        className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border border-[#1c2840] bg-[#111624] hover:border-blue-500/30 transition-all mb-4"
      >
        <span className="text-2xl">{cfg.icon}</span>
        <div className="flex-1">
          <p className="font-heading font-bold" style={{ color: cfg.color }}>{cfg.label}</p>
          <p className="text-xs text-[#8899bb]">{nodes.length} módulos</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#4a5980]">
            {nodes.filter(n => completedIds.has(n.id)).length}/{nodes.length} completos
          </span>
          <span className="text-[#4a5980] text-lg">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {expanded && (
        <div className="animate-fade-in">
          {nodes.map((node, i) => {
            const prereqsDone = node.prerequisites.every(p => completedIds.has(p))
            const completed = completedIds.has(node.id)
            const unlocked = prereqsDone || node.prerequisites.length === 0
            return (
              <div key={node.id}>
                {i > 0 && <Connector completed={completedIds.has(nodes[i - 1].id)} />}
                <div className="flex justify-center">
                  <TrailNode node={node} completed={completed} unlocked={unlocked} onClick={onNodeClick} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Main Trail Tree ───────────────────────────────────────
export default function TrailTree({ trail, completedIds = new Set(), onNodeClick }) {
  return (
    <div className="max-w-lg mx-auto">
      {/* Trail header */}
      <div className="text-center mb-8 p-6 rounded-2xl border border-[#1c2840] bg-[#111624]">
        <div className="text-5xl mb-3">{trail.icon}</div>
        <h2 className="font-heading text-2xl font-bold mb-2" style={{ color: trail.color }}>{trail.title}</h2>
        <p className="text-sm text-[#8899bb] max-w-sm mx-auto">{trail.description}</p>
        <div className="mt-4 flex justify-center gap-4 text-xs text-[#4a5980]">
          {Object.entries(trail.levels).map(([l, nodes]) => (
            <span key={l}>{LEVELS_CONFIG[l].icon} {nodes.length} módulos</span>
          ))}
        </div>
      </div>

      {/* Levels */}
      {Object.entries(trail.levels).map(([levelKey, nodes]) => (
        <LevelSection key={levelKey} levelKey={levelKey} nodes={nodes} completedIds={completedIds} onNodeClick={onNodeClick} />
      ))}
    </div>
  )
}
