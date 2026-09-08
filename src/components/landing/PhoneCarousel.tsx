'use client'

import { useState, useRef, useEffect } from 'react'

const C = {
  cream: '#FAF8F3',
  creamElev: '#FFFFFF',
  creamDeep: '#F1ECE2',
  creamBorder: '#E9E3D8',
  creamBorderStrong: '#DCD3C4',
  navy: '#0F1B33',
  navyMid: '#1A2D4D',
  ocean: '#2563EB',
  oceanDeep: '#1D4ED8',
  oceanLight: '#93B4FB',
  terra: '#F59E0B',
  terraSoft: '#FDE9C4',
  hueso: '#6B7793',
}

// ─── Shell ───────────────────────────────────────────────────────────────────

const SLIDE_W = 264

const SLIDES = [
  { label: 'La Charla', sub: 'Conversacional' },
  { label: 'El Deck', sub: 'Situacional' },
  { label: 'El Espectro', sub: 'Posición' },
  { label: 'Las Palabras', sub: 'Selección' },
  { label: 'Los Dos Mundos', sub: 'Elección binaria' },
]

export function PhoneCarousel() {
  const [cur, setCur] = useState(0)
  const [trackOffset, setTrackOffset] = useState(0)
  const viewRef = useRef<HTMLDivElement>(null)
  const curRef = useRef(0)
  const touchX = useRef(0)

  const updateOffset = (idx: number) => {
    if (!viewRef.current) return
    const w = viewRef.current.offsetWidth
    setTrackOffset(w / 2 - 124 - idx * SLIDE_W)
  }

  const [timerKey, setTimerKey] = useState(0)

  const go = (idx: number) => {
    const c = Math.max(0, Math.min(4, idx))
    curRef.current = c
    setCur(c)
    updateOffset(c)
    setTimerKey(k => k + 1)
  }

  useEffect(() => {
    updateOffset(0)
    const onResize = () => updateOffset(curRef.current)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const id = setInterval(() => {
      const next = (curRef.current + 1) % SLIDES.length
      curRef.current = next
      setCur(next)
      updateOffset(next)
    }, 10000)
    return () => clearInterval(id)
  }, [timerKey])

  return (
    <div className="w-full select-none">
      <div
        ref={viewRef}
        className="overflow-hidden py-4"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          const diff = touchX.current - e.changedTouches[0].clientX
          if (Math.abs(diff) > 40) go(cur + (diff > 0 ? 1 : -1))
        }}
      >
        <div
          className="flex"
          style={{ gap: 16, transform: `translateX(${trackOffset}px)`, transition: 'transform 0.42s cubic-bezier(0.4,0,0.2,1)' }}
        >
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.label}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer"
              style={{ width: 248, opacity: idx === cur ? 1 : 0.38, transform: idx === cur ? 'scale(1)' : 'scale(0.91)', transition: 'opacity 0.3s, transform 0.3s' }}
              onClick={() => go(idx)}
            >
              {/* Phone frame */}
              <div style={{
                width: 232, height: 470,
                background: C.navy,
                borderRadius: 33,
                border: `1.5px solid ${C.navyMid}`,
                overflow: 'hidden', position: 'relative', flexShrink: 0,
                boxShadow: '0 24px 48px rgba(15,27,51,0.18)',
              }}>
                {/* Dynamic island */}
                <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 58, height: 18, background: C.navyMid, borderRadius: 10, zIndex: 100 }} />
                {/* Screen */}
                <div style={{ width: '100%', height: '100%', paddingTop: 34, display: 'flex', flexDirection: 'column', background: C.cream, overflow: 'hidden' }}>
                  {idx === 0 && <Slide1 />}
                  {idx === 1 && <Slide2 />}
                  {idx === 2 && <Slide3 />}
                  {idx === 3 && <Slide4 />}
                  {idx === 4 && <Slide5 />}
                </div>
              </div>
              <p style={{ marginTop: 12, fontSize: 13, fontWeight: 500, color: C.navy, textAlign: 'center' }}>{slide.label}</p>
              <p style={{ marginTop: 3, fontSize: 11, color: C.hueso, textAlign: 'center' }}>{slide.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <NavBtn onClick={() => go(cur - 1)} disabled={cur === 0}>&#8249;</NavBtn>
        <div className="flex gap-1.5 items-center">
          {SLIDES.map((_, idx) => (
            <div
              key={idx}
              onClick={() => go(idx)}
              className="cursor-pointer"
              style={{
                height: 5, borderRadius: idx === cur ? 2.5 : '50%',
                width: idx === cur ? 18 : 5,
                background: idx === cur ? C.navy : C.creamBorderStrong,
                transition: 'all 0.22s',
              }}
            />
          ))}
        </div>
        <NavBtn onClick={() => go(cur + 1)} disabled={cur === 4}>&#8250;</NavBtn>
      </div>
    </div>
  )
}

function NavBtn({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 rounded-full flex items-center justify-center text-xl transition-all cursor-pointer disabled:opacity-25 disabled:cursor-default"
      style={{ border: `1px solid ${C.creamBorderStrong}`, color: C.hueso }}
    >
      {children}
    </button>
  )
}

// ─── Slide 1: La Charla ──────────────────────────────────────────────────────

const S1_QUESTIONS = [
  {
    step: '1 de 3',
    q: 'Alguien te trae un problema complicado. ¿Qué hacés primero?',
    opts: ['Analizo antes de hablar', 'Le hago preguntas para entender bien', 'Propongo algo rápido y ajusto'],
  },
  {
    step: '2 de 3',
    q: '¿Cómo preferís aprender algo nuevo?',
    opts: ['Leyendo y reflexionando solo', 'Viendo ejemplos y practicando', 'Probando directamente por mi cuenta'],
  },
]

function Slide1() {
  const [qIdx, setQIdx] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState('')

  const question = S1_QUESTIONS[qIdx % S1_QUESTIONS.length]

  const pick = (opt: string) => {
    if (answered) return
    setSelected(opt)
    setAnswered(true)
  }

  const next = () => {
    setQIdx(i => i + 1)
    setAnswered(false)
    setSelected('')
  }

  return (
    <>
      <div style={{ padding: '8px 11px 7px', borderBottom: `1px solid ${C.creamBorder}`, display: 'flex', alignItems: 'center', gap: 7, background: C.creamElev }}>
        <div style={{ width: 25, height: 25, borderRadius: '50%', background: C.ocean, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: C.creamElev, flexShrink: 0 }}>T</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.navy }}>Timon</div>
          <div style={{ fontSize: 8, color: C.ocean }}>• activo</div>
        </div>
        <div style={{ fontSize: 8, color: C.hueso, fontFamily: 'monospace' }}>{question.step}</div>
      </div>

      <div style={{ flex: 1, padding: '12px 11px 8px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', scrollbarWidth: 'none' }}>
        <div style={{ alignSelf: 'flex-start', padding: '9px 11px', background: C.creamElev, border: `1px solid ${C.creamBorder}`, borderRadius: '11px 11px 11px 3px', maxWidth: '90%' }}>
          <p style={{ fontSize: 11, color: C.navy, lineHeight: 1.4 }}>{question.q}</p>
        </div>

        {!answered ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ fontSize: 8, color: C.hueso, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 2 }}>elegí una</div>
            {question.opts.map(opt => (
              <ChatOpt key={opt} label={opt} onClick={() => pick(opt)} disabled={false} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <div style={{ alignSelf: 'flex-end', padding: '7px 10px', borderRadius: '11px 11px 3px 11px', background: C.ocean, color: C.creamElev, fontSize: 10, fontWeight: 500, lineHeight: 1.4, maxWidth: '85%' }}>
              {selected}
            </div>
            <div style={{ alignSelf: 'flex-start', padding: '7px 10px', borderRadius: '11px 11px 11px 3px', background: C.creamElev, border: `1px solid ${C.creamBorder}`, color: C.navy, fontSize: 10, lineHeight: 1.4, maxWidth: '85%' }}>
              Perfecto, lo tenemos en cuenta.
            </div>
            <button onClick={next} style={{ marginTop: 4, padding: '8px', borderRadius: 10, fontSize: 10, fontWeight: 600, cursor: 'pointer', border: 'none', background: C.ocean, color: C.creamElev }}>
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </>
  )
}

function ChatOpt({ label, onClick, disabled }: { label: string; onClick: () => void; disabled: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: '6px 9px', borderRadius: 8, fontSize: 10, textAlign: 'left', width: '100%', cursor: 'pointer',
        border: `1px solid ${hov ? C.ocean : C.creamBorder}`,
        color: hov ? C.ocean : C.hueso,
        background: hov ? 'rgba(37,99,235,0.05)' : C.creamElev,
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  )
}

// ─── Slide 2: El Deck ────────────────────────────────────────────────────────

const DECK_CARDS = [
  { tag: 'Foco', text: '"Cuando algo me atrapa, pierdo la noción del tiempo."', sub: '¿Esto te pasa?' },
  { tag: 'Método', text: '"Trabajo mejor con un objetivo claro que con libertad total."', sub: 'Primera reacción.' },
  { tag: 'Rol', text: '"En grupo suelo ser el que organiza aunque nadie me lo pida."', sub: 'Sin filtro.' },
  { tag: 'Estilo', text: '"Prefiero hacer las cosas bien antes que rápido."', sub: 'Lo que más te representa.' },
  { tag: 'Motor', text: '"Necesito ver el impacto de lo que hago para seguir motivado."', sub: 'Pensá en los últimos meses.' },
]

function Slide2() {
  const [idx, setIdx] = useState(2)
  const [exit, setExit] = useState<'left' | 'right' | null>(null)
  const [busy, setBusy] = useState(false)

  const swipe = (dir: 'yes' | 'no') => {
    if (busy) return
    setBusy(true)
    setExit(dir === 'yes' ? 'right' : 'left')
    setTimeout(() => {
      setIdx(i => (i + 1 >= DECK_CARDS.length ? 0 : i + 1))
      setExit(null)
      setBusy(false)
    }, 280)
  }

  const card = DECK_CARDS[idx] ?? DECK_CARDS[0]

  const frontTransform = exit === 'left'
    ? 'translate(calc(-50% - 160px), -50%) rotate(-14deg)'
    : exit === 'right'
    ? 'translate(calc(-50% + 160px), -50%) rotate(14deg)'
    : 'translate(-50%, -50%)'

  return (
    <>
      <div style={{ padding: '9px 11px 0', display: 'flex', gap: 2, background: C.creamElev }}>
        {DECK_CARDS.map((_, i) => (
          <div key={i} style={{
            height: 2, flex: 1, borderRadius: 1,
            background: i < idx ? C.ocean : i === idx ? `${C.ocean}55` : C.creamBorderStrong,
            transition: 'background 0.2s',
          }} />
        ))}
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: C.creamElev }}>
        <div style={{ position: 'absolute', width: 186, height: 190, top: '50%', left: '50%', background: C.creamBorderStrong, borderRadius: 16, transform: 'translate(-50%, calc(-50% + 16px)) scale(0.86)', zIndex: 1 }} />
        <div style={{ position: 'absolute', width: 186, height: 190, top: '50%', left: '50%', background: C.creamDeep, borderRadius: 16, transform: 'translate(-50%, calc(-50% + 8px)) scale(0.93)', zIndex: 2 }} />
        <div style={{
          position: 'absolute', width: 186, height: 190, top: '50%', left: '50%',
          background: C.creamElev, border: `1px solid ${C.creamBorder}`, borderRadius: 16, padding: '15px 14px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 3,
          transform: frontTransform, opacity: exit ? 0 : 1,
          transition: 'transform 0.3s cubic-bezier(0.34,1.2,0.64,1), opacity 0.2s',
          boxShadow: '0 8px 24px rgba(15,27,51,0.08)',
        }}>
          <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: C.ocean }}>{card.tag}</div>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: C.navy, lineHeight: 1.3 }}>{card.text}</div>
          <div style={{ fontSize: 10, color: C.hueso, lineHeight: 1.35 }}>{card.sub}</div>
        </div>
      </div>

      <div style={{ padding: '0 11px 10px', display: 'flex', gap: 6, background: C.creamElev }}>
        <button onClick={() => swipe('no')} style={{ flex: 1, padding: 8, borderRadius: 10, fontSize: 10, fontWeight: 600, cursor: 'pointer', border: `1px solid ${C.creamBorderStrong}`, background: C.cream, color: C.hueso, transition: 'all .15s' }}>No va</button>
        <button onClick={() => swipe('yes')} style={{ flex: 1, padding: 8, borderRadius: 10, fontSize: 10, fontWeight: 600, cursor: 'pointer', border: 'none', background: C.ocean, color: C.creamElev, transition: 'all .15s' }}>Me representa</button>
      </div>
    </>
  )
}

// ─── Slide 3: El Espectro ────────────────────────────────────────────────────

const ESPECTRO = [
  { max: 18, text: 'Muy independiente', color: C.navy },
  { max: 38, text: 'Prefiero trabajar solo', color: C.navyMid },
  { max: 62, text: 'Un poco de los dos', color: C.hueso },
  { max: 82, text: 'Prefiero trabajar con otros', color: C.ocean },
  { max: 100, text: 'Muy colaborativo', color: C.oceanDeep },
]

function Slide3() {
  const [pct, setPct] = useState(50)
  const trackRef = useRef<HTMLDivElement>(null)

  const lbl = ESPECTRO.find(l => pct <= l.max) ?? ESPECTRO[ESPECTRO.length - 1]

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    setPct(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)))
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '10px 13px 12px', background: C.cream }}>
      <div style={{ fontSize: 8, color: C.hueso, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>Paso 5 de 13</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.navy, lineHeight: 1.3, marginBottom: 5 }}>¿Cómo preferís trabajar la mayoría de las veces?</div>
      <div style={{ fontSize: 10, color: C.hueso, lineHeight: 1.5 }}>No hay respuesta correcta. Pensá en cómo te sentís de verdad.</div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 9.5, fontWeight: 500, color: C.hueso, maxWidth: 58, lineHeight: 1.3 }}>Solo, a mi ritmo</div>
          <div style={{ fontSize: 9.5, fontWeight: 500, color: C.hueso, maxWidth: 58, lineHeight: 1.3, textAlign: 'right' }}>Con otros, en movimiento</div>
        </div>

        <div ref={trackRef} onClick={handleClick} style={{ padding: '8px 0', cursor: 'pointer' }}>
          <div style={{ height: 3, background: C.creamBorderStrong, borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: C.ocean, borderRadius: 2, width: `${pct}%`, transition: 'width .08s' }} />
            <div style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%,-50%)', width: 16, height: 16, background: C.ocean, borderRadius: '50%', transition: 'left .08s', cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }} />
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: 11, fontWeight: 600, color: lbl.color, textAlign: 'center', minHeight: 17, transition: 'color .2s' }}>
          {lbl.text}
        </div>
      </div>

      <button onClick={() => setPct(50)} style={{ width: '100%', padding: 10, background: C.ocean, color: C.creamElev, border: 'none', borderRadius: 10, fontSize: 10, fontWeight: 700, cursor: 'pointer', marginTop: 14 }}>
        Siguiente →
      </button>
    </div>
  )
}

// ─── Slide 4: Las Palabras ───────────────────────────────────────────────────

const WORDS: { w: string; size: 'large' | 'base' | 'small' }[] = [
  { w: 'crear', size: 'large' }, { w: 'resolver', size: 'base' }, { w: 'escuchar', size: 'small' },
  { w: 'liderar', size: 'large' }, { w: 'analizar', size: 'base' }, { w: 'diseñar', size: 'small' },
  { w: 'convencer', size: 'base' }, { w: 'explorar', size: 'large' }, { w: 'cuidar', size: 'small' },
  { w: 'construir', size: 'base' }, { w: 'imaginar', size: 'large' }, { w: 'ordenar', size: 'small' },
]

function Slide4() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [done, setDone] = useState(false)
  const count = selected.size

  const toggle = (w: string) => {
    if (done) return
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(w)) { next.delete(w) } else if (next.size < 5) { next.add(w) }
      return next
    })
  }

  if (done) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 10, justifyContent: 'center', background: C.cream }}>
        <div style={{ fontSize: 10, color: C.hueso, lineHeight: 1.6 }}>
          Perfecto. Con esas palabras arrancamos.<br /><br />
          <span style={{ color: C.ocean, fontWeight: 600 }}>Siguiente: el colegio y vos →</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 10, background: C.cream }}>
      <div style={{ fontSize: 8, color: C.hueso, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>Módulo 1 — Vibe Check</div>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: C.navy, lineHeight: 1.3, marginBottom: 4 }}>¿Cuáles de estas palabras suenan como vos?</div>
      <div style={{ fontSize: 9, color: C.hueso, marginBottom: 8 }}>
        Elegí entre 3 y 5 · <span style={{ color: C.ocean, fontWeight: 600 }}>{count}</span> seleccionadas
      </div>

      <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 5, alignContent: 'flex-start', overflow: 'hidden' }}>
        {WORDS.map(({ w, size }) => <WordPill key={w} word={w} size={size} selected={selected.has(w)} onToggle={() => toggle(w)} />)}
      </div>

      <button
        disabled={count < 3}
        onClick={() => setDone(true)}
        style={{
          marginTop: 8, width: '100%', padding: 9, borderRadius: 10, fontSize: 10, fontWeight: 600,
          border: `1px solid ${count >= 3 ? C.ocean : C.creamBorderStrong}`,
          background: count >= 3 ? C.ocean : C.creamElev,
          color: count >= 3 ? C.creamElev : C.hueso,
          cursor: count >= 3 ? 'pointer' : 'not-allowed', transition: 'all .2s',
        }}
      >
        Seguir →
      </button>
    </div>
  )
}

function WordPill({ word, size, selected, onToggle }: { word: string; size: 'large' | 'base' | 'small'; selected: boolean; onToggle: () => void }) {
  const [hov, setHov] = useState(false)
  const fs = size === 'large' ? 11.5 : size === 'small' ? 9 : 10
  const pad = size === 'large' ? '5px 11px' : size === 'small' ? '4px 7px' : '5px 9px'
  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: pad, borderRadius: 20, fontSize: fs, cursor: 'pointer', userSelect: 'none', transition: 'all 0.15s',
        border: `1px solid ${selected ? C.ocean : hov ? C.oceanLight : C.creamBorder}`,
        color: selected ? C.ocean : hov ? C.navy : C.hueso,
        background: selected ? 'rgba(37,99,235,0.08)' : C.creamElev,
      }}
    >
      {word}
    </div>
  )
}

// ─── Slide 5: Los Dos Mundos (Tinder-style) ─────────────────────────────────

const DOS_MUNDOS = [
  {
    q: '¿Qué te genera más satisfacción?',
    a: 'Resolver algo difícil solo',
    b: 'Lograr algo con otros',
  },
  {
    q: '¿Dónde ponés más energía?',
    a: 'En pensar y entender',
    b: 'En hacer y construir',
  },
]

function Slide5() {
  const [qIdx, setQIdx] = useState(0)
  const [dir, setDir] = useState<'left' | 'right' | null>(null)
  const [hover, setHover] = useState<'left' | 'right' | null>(null)
  const [busy, setBusy] = useState(false)
  const d = DOS_MUNDOS[qIdx % DOS_MUNDOS.length]

  const swipe = (side: 'left' | 'right') => {
    if (busy) return
    setBusy(true)
    setDir(side)
    setTimeout(() => {
      setDir(null)
      setHover(null)
      setQIdx(i => i + 1)
      setBusy(false)
    }, 430)
  }

  const tx = dir === 'left' ? -230 : dir === 'right' ? 230 : 0
  const rot = dir === 'left' ? -18 : dir === 'right' ? 18 : hover === 'left' ? -4 : hover === 'right' ? 4 : 0

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '8px 0 8px', background: C.cream }}>
      <div style={{ padding: '0 12px 8px' }}>
        <div style={{ fontSize: 8, color: C.hueso, letterSpacing: '.12em', textTransform: 'uppercase' }}>Módulo 4 · Dominancia</div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', width: 174, height: 196, background: C.creamBorderStrong, borderRadius: 16, transform: 'rotate(4deg) translateY(5px)', zIndex: 1 }} />
        <div style={{ position: 'absolute', width: 174, height: 196, background: C.creamDeep, borderRadius: 16, transform: 'rotate(-2.5deg) translateY(2px)', zIndex: 2 }} />

        <div style={{
          position: 'relative', zIndex: 10, width: 174,
          transform: `translateX(${tx}px) rotate(${rot}deg)`,
          opacity: dir ? 0 : 1,
          transition: dir ? 'transform 0.38s ease-out, opacity 0.28s' : 'transform 0.18s ease-out',
        }}>
          <div style={{
            position: 'absolute', top: 10, left: 10, zIndex: 20,
            padding: '2px 6px', border: `1.5px solid ${C.terra}`, borderRadius: 4,
            color: C.terra, fontSize: 8, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase',
            transform: 'rotate(-8deg)',
            opacity: hover === 'left' || dir === 'left' ? 1 : 0,
            transition: 'opacity 0.12s',
          }}>No va</div>

          <div style={{
            position: 'absolute', top: 10, right: 10, zIndex: 20,
            padding: '2px 6px', border: `1.5px solid ${C.ocean}`, borderRadius: 4,
            color: C.ocean, fontSize: 8, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase',
            transform: 'rotate(8deg)',
            opacity: hover === 'right' || dir === 'right' ? 1 : 0,
            transition: 'opacity 0.12s',
          }}>Me va</div>

          <div style={{
            background: hover === 'left' ? `rgba(245,158,11,0.06)` : hover === 'right' ? 'rgba(37,99,235,0.06)' : C.creamElev,
            border: `1px solid ${hover === 'left' ? `rgba(245,158,11,0.3)` : hover === 'right' ? 'rgba(37,99,235,0.22)' : C.creamBorder}`,
            borderRadius: 16, overflow: 'hidden',
            transition: 'background 0.18s, border-color 0.18s',
            boxShadow: '0 8px 24px rgba(15,27,51,0.08)',
          }}>
            <div style={{ padding: '36px 14px 12px', fontSize: 12, fontWeight: 600, color: C.navy, lineHeight: 1.35, textAlign: 'center' }}>
              {d.q}
            </div>

            <div style={{ display: 'flex', borderTop: `1px solid ${C.creamBorder}` }}>
              <div
                onMouseEnter={() => !busy && setHover('left')}
                onMouseLeave={() => setHover(null)}
                onClick={() => swipe('left')}
                style={{
                  flex: 1, padding: '9px 10px 11px', cursor: 'pointer',
                  borderRight: `1px solid ${C.creamBorder}`,
                  background: hover === 'left' ? 'rgba(245,158,11,0.08)' : 'transparent',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{ fontSize: 7.5, color: hover === 'left' ? C.terra : C.creamBorderStrong, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 3, transition: 'color 0.15s' }}>← swipe</div>
                <div style={{ fontSize: 9.5, fontWeight: 500, color: hover === 'left' ? C.terra : C.hueso, lineHeight: 1.3, transition: 'color 0.15s' }}>{d.a}</div>
              </div>
              <div
                onMouseEnter={() => !busy && setHover('right')}
                onMouseLeave={() => setHover(null)}
                onClick={() => swipe('right')}
                style={{
                  flex: 1, padding: '9px 10px 11px', cursor: 'pointer',
                  background: hover === 'right' ? 'rgba(37,99,235,0.07)' : 'transparent',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{ fontSize: 7.5, color: hover === 'right' ? C.ocean : C.creamBorderStrong, letterSpacing: '.1em', textTransform: 'uppercase', textAlign: 'right', marginBottom: 3, transition: 'color 0.15s' }}>swipe →</div>
                <div style={{ fontSize: 9.5, fontWeight: 500, color: hover === 'right' ? C.ocean : C.hueso, lineHeight: 1.3, textAlign: 'right', transition: 'color 0.15s' }}>{d.b}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, padding: '6px 0 0' }}>
        {DOS_MUNDOS.map((_, i) => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: '50%',
            background: i === qIdx % DOS_MUNDOS.length ? C.ocean : C.creamBorderStrong,
            transition: 'background 0.2s',
          }} />
        ))}
      </div>
    </div>
  )
}
