'use client'

export type ViewMode = 'all' | 'phone' | 'desktop'

const C = { creamDeep: '#F1ECE2', creamElev: '#FFFFFF', navy: '#0F1B33', hueso: '#6B7793' }

type Props = {
  value: ViewMode
  onChange: (v: ViewMode) => void
  options?: ViewMode[]
}

const ALL_OPTS: { id: ViewMode; label: string }[] = [
  { id: 'all', label: 'Ver todo' },
  { id: 'phone', label: 'Teléfono' },
  { id: 'desktop', label: 'Computadora' },
]

export function ViewToggle({ value, onChange, options }: Props) {
  const OPTS = options ? ALL_OPTS.filter(o => options.includes(o.id)) : ALL_OPTS
  return (
    <div style={{ display: 'inline-flex', background: C.creamDeep, borderRadius: 999, padding: 3, gap: 2 }}>
      {OPTS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          style={{
            padding: '6px 15px', borderRadius: 999, fontSize: 12, cursor: 'pointer',
            fontWeight: value === id ? 500 : 400, border: 'none',
            background: value === id ? C.creamElev : 'transparent',
            color: value === id ? C.navy : C.hueso,
            boxShadow: value === id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.15s',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
