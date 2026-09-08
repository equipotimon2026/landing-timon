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
  hueso: '#6B7793',
}

function MacMenuBar({ title }: { title: string }) {
  return (
    <div style={{ padding: '7px 14px 6px', background: C.creamElev, borderBottom: `1px solid ${C.creamBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
      <div style={{ display: 'flex', gap: 5 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
      </div>
      <span style={{ fontSize: 10, fontWeight: 600, color: C.navy }}>Timon — Orientación Vocacional</span>
      <span style={{ fontSize: 8.5, fontFamily: 'monospace', color: C.hueso, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{title}</span>
    </div>
  )
}

// ── Slide 1: La Charla (desktop) ─────────────────────────────────────────────

const S1_RESPONSES = [
  ['Procesás antes de actuar. Eso dice mucho.', '¿Eso te pasa solo con problemas ajenos o también con los tuyos?'],
  ['Entender antes de concluir. Buena señal.', '¿Eso lo hacés más en lo académico o en todo?'],
  ['Modo ejecutor. Acción primero, corrección después.', '¿Te resultó bien eso hasta ahora?'],
]
const S1_FOLLOW = ['Siempre fui así', 'Depende del contexto', 'Lo fui aprendiendo']

type ChatMsg = { text: string; isUser: boolean }

function ChatBubble({ msg }: { msg: ChatMsg }) {
  return (
    <div style={{
      maxWidth: '75%', padding: '9px 12px',
      borderRadius: msg.isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
      background: msg.isUser ? C.ocean : C.creamElev,
      border: msg.isUser ? 'none' : `1px solid ${C.creamBorder}`,
      color: msg.isUser ? C.creamElev : C.navy,
      fontSize: 12, lineHeight: 1.45, fontWeight: msg.isUser ? 500 : 400,
      alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
    }}>
      {msg.text}
    </div>
  )
}

function DesktopSlide1() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { text: 'Antes de arrancar, contame una cosa.', isUser: false },
    { text: 'Alguien te trae un problema complicado. ¿Qué hacés primero?', isUser: false },
  ])
  const [opts, setOpts] = useState(['Analizo antes de hablar', 'Le hago preguntas para entender bien', 'Propongo algo rápido y ajusto después'])
  const [busy, setBusy] = useState(false)
  const msgsRef = useRef<HTMLDivElement>(null)

  const pick = (text: string, idx: number) => {
    if (busy) return
    setBusy(true)
    setTimeout(() => setMsgs(p => [...p, { text, isUser: true }]), 200)
    const resp = S1_RESPONSES[idx] ?? S1_RESPONSES[0]
    setTimeout(() => setMsgs(p => [...p, { text: resp[0], isUser: false }]), 700)
    setTimeout(() => { setMsgs(p => [...p, { text: resp[1], isUser: false }]); setOpts(S1_FOLLOW); setBusy(false) }, 1400)
  }

  useEffect(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight }, [msgs])

  return (
    <>
      <MacMenuBar title="La Charla" />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: 200, borderRight: `1px solid ${C.creamBorder}`, background: C.creamElev, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '12px 14px', borderBottom: `1px solid ${C.creamBorder}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: C.ocean, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: C.creamElev }}>T</div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: C.navy }}>Timon</p>
                <p style={{ fontSize: 9, color: C.ocean }}>• activo</p>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, padding: '12px 14px' }}>
            <p style={{ fontSize: 9, color: C.hueso, lineHeight: 1.6 }}>Módulo 1 de 6 completados</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 8 }}>
              {['Conversacional', 'Situacional', 'Posición', 'Selección', 'Elección binaria', 'Contexto'].map((item, i) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 6, background: i === 0 ? 'rgba(37,99,235,0.08)' : 'transparent' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? C.ocean : C.creamBorderStrong, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: i === 0 ? C.ocean : C.hueso, fontWeight: i === 0 ? 500 : 400 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div ref={msgsRef} style={{ flex: 1, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', scrollbarWidth: 'none', background: C.cream }}>
            {msgs.map((m, i) => <ChatBubble key={i} msg={m} />)}
          </div>
          <div style={{ padding: '10px 18px 14px', background: C.creamElev, borderTop: `1px solid ${C.creamBorder}`, flexShrink: 0 }}>
            <p style={{ fontSize: 9, color: C.hueso, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 }}>elegí una opción</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {opts.map((o, i) => (
                <button key={o} onClick={() => pick(o, i)} disabled={busy} style={{ flex: 1, padding: '8px 12px', borderRadius: 10, fontSize: 11, textAlign: 'center', cursor: 'pointer', border: `1px solid ${C.creamBorder}`, color: C.navy, background: C.cream, transition: 'all 0.15s', opacity: busy ? 0.5 : 1 }}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Slide 2: El Deck (desktop) ────────────────────────────────────────────────

const DECK_CARDS = [
  { tag: 'Foco', text: '"Cuando algo me atrapa, pierdo la noción del tiempo."', sub: '¿Esto te pasa?' },
  { tag: 'Método', text: '"Trabajo mejor con un objetivo claro que con libertad total."', sub: 'Primera reacción.' },
  { tag: 'Rol', text: '"En grupo suelo ser el que organiza aunque nadie me lo pida."', sub: 'Sin filtro.' },
  { tag: 'Estilo', text: '"Prefiero hacer las cosas bien antes que rápido."', sub: 'Lo que más te representa.' },
  { tag: 'Motor', text: '"Necesito ver el impacto de lo que hago para seguir motivado."', sub: 'Pensá en los últimos meses.' },
]

function DesktopSlide2() {
  const [idx, setIdx] = useState(0)
  const [exit, setExit] = useState<'left' | 'right' | null>(null)
  const [busy, setBusy] = useState(false)
  const done = DECK_CARDS.slice(0, idx)

  const swipe = (dir: 'yes' | 'no') => {
    if (busy) return
    setBusy(true)
    setExit(dir === 'yes' ? 'right' : 'left')
    setTimeout(() => { setIdx(i => Math.min(i + 1, DECK_CARDS.length)); setExit(null); setBusy(false) }, 300)
  }

  const card = DECK_CARDS[idx]
  const progress = idx / DECK_CARDS.length

  return (
    <>
      <MacMenuBar title="El Deck" />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* History sidebar */}
        <div style={{ width: 200, borderRight: `1px solid ${C.creamBorder}`, background: C.creamElev, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '10px 14px 8px', borderBottom: `1px solid ${C.creamBorder}` }}>
            <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: C.hueso, marginBottom: 5 }}>Progreso</p>
            <div style={{ height: 3, background: C.creamBorderStrong, borderRadius: 999, overflow: 'hidden', marginBottom: 4 }}>
              <div style={{ width: `${progress * 100}%`, height: '100%', background: C.ocean, borderRadius: 999, transition: 'width 0.3s' }} />
            </div>
            <p style={{ fontSize: 9.5, color: C.navy }}>{idx} de {DECK_CARDS.length} tarjetas</p>
          </div>
          <div style={{ flex: 1, padding: '8px 10px', overflowY: 'auto', scrollbarWidth: 'none' }}>
            {done.length > 0 && <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: C.hueso, marginBottom: 6 }}>Respondidas</p>}
            {done.map((c, i) => (
              <div key={i} style={{ padding: '6px 8px', borderRadius: 7, border: `1px solid ${C.creamBorder}`, marginBottom: 5 }}>
                <p style={{ fontSize: 7.5, fontWeight: 600, color: C.ocean, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.tag}</p>
                <p style={{ fontSize: 9, color: C.navy, lineHeight: 1.3, marginTop: 2, opacity: 0.7 }}>{c.text.slice(1, 40)}…</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 30px', gap: 20, background: C.creamElev }}>
          {card ? (
            <>
              <div style={{ position: 'relative', width: 300, height: 220 }}>
                <div style={{ position: 'absolute', inset: 0, background: C.creamBorderStrong, borderRadius: 20, transform: 'rotate(2deg) translateY(6px)' }} />
                <div style={{ position: 'absolute', inset: 0, background: C.creamDeep, borderRadius: 20, transform: 'rotate(-1.5deg) translateY(3px)' }} />
                <div style={{
                  position: 'absolute', inset: 0, background: C.cream, border: `1px solid ${C.creamBorder}`, borderRadius: 20, padding: '22px 22px 18px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  boxShadow: '0 8px 28px rgba(15,27,51,0.08)',
                  transform: exit === 'left' ? 'translateX(-300px) rotate(-12deg)' : exit === 'right' ? 'translateX(300px) rotate(12deg)' : 'none',
                  opacity: exit ? 0 : 1,
                  transition: 'transform 0.3s ease-out, opacity 0.25s',
                }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: C.ocean }}>{card.tag}</span>
                  <p style={{ fontSize: 15, fontWeight: 600, color: C.navy, lineHeight: 1.35 }}>{card.text}</p>
                  <p style={{ fontSize: 12, color: C.hueso }}>{card.sub}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => swipe('no')} style={{ padding: '10px 28px', borderRadius: 12, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: `1px solid ${C.creamBorderStrong}`, background: C.cream, color: C.hueso, transition: 'all .15s' }}>
                  No va
                </button>
                <button onClick={() => swipe('yes')} style={{ padding: '10px 28px', borderRadius: 12, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', background: C.ocean, color: C.creamElev, transition: 'all .15s' }}>
                  Me representa
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 16, fontWeight: 600, color: C.navy, marginBottom: 6 }}>Módulo completado</p>
              <p style={{ fontSize: 13, color: C.hueso }}>Pasamos al siguiente.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ── Slide 3: El Espectro (desktop) ────────────────────────────────────────────

const AXES = [
  { id: 'trabajo', q: '¿Cómo preferís trabajar?', left: 'Solo, a mi ritmo', right: 'Con otros, en movimiento', default: 35 },
  { id: 'ritmo', q: '¿Cómo manejás el tiempo?', left: 'Con estructura clara', right: 'Con total libertad', default: 45 },
  { id: 'decisiones', q: '¿Cómo tomás decisiones?', left: 'Con datos y análisis', right: 'Con intuición y velocidad', default: 25 },
  { id: 'impacto', q: '¿Dónde querés impactar?', left: 'En lo técnico / profundo', right: 'En lo amplio / estratégico', default: 40 },
]

function DesktopSlide3() {
  const [values, setValues] = useState<Record<string, number>>(() => Object.fromEntries(AXES.map(a => [a.id, a.default])))

  const handleTrackClick = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    setValues(prev => ({ ...prev, [id]: pct }))
  }

  return (
    <>
      <MacMenuBar title="El Espectro" />
      <div style={{ flex: 1, padding: '18px 28px', display: 'flex', flexDirection: 'column', gap: 18, overflowY: 'auto', scrollbarWidth: 'none' }}>
        <div>
          <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.14em', color: C.hueso, marginBottom: 4 }}>Módulo 3 — Posición</p>
          <p style={{ fontSize: 12, color: C.navy, opacity: 0.7 }}>Deslizá cada eje al lugar que mejor te represente. No hay respuesta correcta.</p>
        </div>
        {AXES.map(axis => (
          <div key={axis.id}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 10 }}>{axis.q}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 10.5, color: C.hueso, width: 120, textAlign: 'right', lineHeight: 1.3 }}>{axis.left}</span>
              <div onClick={(e) => handleTrackClick(axis.id, e)} style={{ flex: 1, padding: '8px 0', cursor: 'pointer' }}>
                <div style={{ height: 4, background: C.creamBorderStrong, borderRadius: 999, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${values[axis.id]}%`, background: C.ocean, borderRadius: 999, transition: 'width 0.08s' }} />
                  <div style={{ position: 'absolute', top: '50%', left: `${values[axis.id]}%`, transform: 'translate(-50%,-50%)', width: 18, height: 18, background: C.ocean, borderRadius: '50%', transition: 'left 0.08s', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }} />
                </div>
              </div>
              <span style={{ fontSize: 10.5, color: C.hueso, width: 120, lineHeight: 1.3 }}>{axis.right}</span>
            </div>
          </div>
        ))}
        <button onClick={() => setValues(Object.fromEntries(AXES.map(a => [a.id, a.default])))} style={{ alignSelf: 'flex-start', padding: '10px 24px', background: C.ocean, color: C.creamElev, border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
          Siguiente →
        </button>
      </div>
    </>
  )
}

// ── Slide 4: Las Palabras (desktop) ───────────────────────────────────────────

const WORDS = [
  { w: 'crear', size: 'lg' }, { w: 'resolver', size: 'md' }, { w: 'escuchar', size: 'sm' },
  { w: 'liderar', size: 'lg' }, { w: 'analizar', size: 'md' }, { w: 'diseñar', size: 'sm' },
  { w: 'convencer', size: 'md' }, { w: 'explorar', size: 'lg' }, { w: 'cuidar', size: 'sm' },
  { w: 'construir', size: 'md' }, { w: 'imaginar', size: 'lg' }, { w: 'ordenar', size: 'sm' },
  { w: 'investigar', size: 'md' }, { w: 'enseñar', size: 'sm' }, { w: 'optimizar', size: 'lg' },
]

function DesktopSlide4() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [done, setDone] = useState(false)

  const toggle = (w: string) => {
    if (done) return
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(w)) { next.delete(w) } else if (next.size < 5) { next.add(w) }
      return next
    })
  }

  return (
    <>
      <MacMenuBar title="Las Palabras" />
      <div style={{ flex: 1, padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.14em', color: C.hueso, marginBottom: 5 }}>Módulo 1 — Vibe Check</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: C.navy, lineHeight: 1.3 }}>¿Cuáles de estas palabras suenan como vos?</p>
          <p style={{ fontSize: 11.5, color: C.hueso, marginTop: 4 }}>
            Elegí entre 3 y 5 · <span style={{ color: C.ocean, fontWeight: 600 }}>{selected.size}</span> seleccionadas
          </p>
        </div>
        {done ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 8 }}>Perfecto. Con esas palabras arrancamos.</p>
              <p style={{ fontSize: 13, color: C.hueso }}>Siguiente: posicionarte en ejes →</p>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1, alignContent: 'flex-start' }}>
              {WORDS.map(({ w, size }) => {
                const sel = selected.has(w)
                const fs = size === 'lg' ? 14 : size === 'sm' ? 10.5 : 12
                const pad = size === 'lg' ? '7px 16px' : size === 'sm' ? '5px 10px' : '6px 13px'
                return (
                  <div key={w} onClick={() => toggle(w)} style={{ padding: pad, borderRadius: 24, fontSize: fs, cursor: 'pointer', userSelect: 'none', transition: 'all 0.15s', border: `1px solid ${sel ? C.ocean : C.creamBorder}`, color: sel ? C.ocean : C.hueso, background: sel ? 'rgba(37,99,235,0.08)' : C.creamElev }}>
                    {w}
                  </div>
                )
              })}
            </div>
            <button disabled={selected.size < 3} onClick={() => setDone(true)} style={{ alignSelf: 'flex-start', padding: '10px 24px', borderRadius: 10, fontSize: 12, fontWeight: 600, border: `1px solid ${selected.size >= 3 ? C.ocean : C.creamBorderStrong}`, background: selected.size >= 3 ? C.ocean : C.creamElev, color: selected.size >= 3 ? C.creamElev : C.hueso, cursor: selected.size >= 3 ? 'pointer' : 'not-allowed', transition: 'all .2s' }}>
              Seguir →
            </button>
          </>
        )}
      </div>
    </>
  )
}

// ── Slide 5: Los Dos Mundos (desktop) ─────────────────────────────────────────

const DOS_MUNDOS = [
  { q: '¿Qué te genera más satisfacción?', a: 'Resolver algo difícil solo', b: 'Lograr algo con otros' },
  { q: '¿Dónde ponés más energía?', a: 'En pensar y entender', b: 'En hacer y construir' },
  { q: '¿Qué te resulta más natural?', a: 'Analizar y planificar', b: 'Probar y ajustar' },
]

function DesktopSlide5() {
  const [qIdx, setQIdx] = useState(0)
  const [hover, setHover] = useState<'a' | 'b' | null>(null)
  const [animating, setAnimating] = useState(false)
  const d = DOS_MUNDOS[qIdx % DOS_MUNDOS.length]

  const choose = (side: 'a' | 'b') => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => { setQIdx(i => i + 1); setHover(null); setAnimating(false) }, 350)
  }

  return (
    <>
      <MacMenuBar title="Los Dos Mundos" />
      <div style={{ flex: 1, padding: '20px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.14em', color: C.hueso, marginBottom: 6 }}>Módulo 4 · Dominancia</p>
          <p style={{ fontSize: 16, fontWeight: 600, color: C.navy, lineHeight: 1.3 }}>{d.q}</p>
        </div>
        <div style={{ display: 'flex', gap: 14, width: '100%', maxWidth: 480 }}>
          {[{ side: 'a' as const, label: d.a, color: C.terra }, { side: 'b' as const, label: d.b, color: C.ocean }].map(opt => (
            <div
              key={opt.side}
              onClick={() => choose(opt.side)}
              onMouseEnter={() => setHover(opt.side)}
              onMouseLeave={() => setHover(null)}
              style={{
                flex: 1, padding: '20px 18px', borderRadius: 16, cursor: 'pointer', textAlign: 'center',
                border: `2px solid ${hover === opt.side ? opt.color : C.creamBorder}`,
                background: hover === opt.side ? (opt.side === 'a' ? 'rgba(245,158,11,0.06)' : 'rgba(37,99,235,0.06)') : C.creamElev,
                transition: 'all 0.18s',
                opacity: animating ? 0.5 : 1,
              }}
            >
              <p style={{ fontSize: 8, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: hover === opt.side ? opt.color : C.hueso, marginBottom: 8, transition: 'color 0.15s' }}>
                {opt.side === 'a' ? '← swipe' : 'swipe →'}
              </p>
              <p style={{ fontSize: 14, fontWeight: 600, color: hover === opt.side ? opt.color : C.navy, lineHeight: 1.3, transition: 'color 0.15s' }}>{opt.label}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {DOS_MUNDOS.map((_, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i === qIdx % DOS_MUNDOS.length ? C.ocean : C.creamBorderStrong, transition: 'background 0.2s' }} />
          ))}
        </div>
      </div>
    </>
  )
}

// ── MacBook frame + slide carousel ────────────────────────────────────────────

const SLIDES = [
  { label: 'La Charla', sub: 'Conversacional', Component: DesktopSlide1 },
  { label: 'El Deck', sub: 'Situacional', Component: DesktopSlide2 },
  { label: 'El Espectro', sub: 'Posición', Component: DesktopSlide3 },
  { label: 'Las Palabras', sub: 'Selección', Component: DesktopSlide4 },
  { label: 'Los Dos Mundos', sub: 'Elección binaria', Component: DesktopSlide5 },
]

function NavBtn({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} disabled={disabled} className="w-8 h-8 rounded-full flex items-center justify-center text-xl transition-all cursor-pointer disabled:opacity-25 disabled:cursor-default" style={{ border: `1px solid ${C.creamBorderStrong}`, color: C.hueso }}>
      {children}
    </button>
  )
}

export function InputMacBook() {
  const [cur, setCur] = useState(0)
  const touchX = useRef(0)
  const { Component, label, sub } = SLIDES[cur]

  const prev = () => setCur(c => Math.max(0, c - 1))
  const next = () => setCur(c => Math.min(SLIDES.length - 1, c + 1))

  return (
    <div className="w-full select-none">
      <div onTouchStart={(e) => { touchX.current = e.touches[0].clientX }} onTouchEnd={(e) => { const diff = touchX.current - e.changedTouches[0].clientX; if (Math.abs(diff) > 40) diff > 0 ? next() : prev() }}>
        <div key={cur} className="animate-fade-in" style={{ width: '100%', maxWidth: 700, margin: '0 auto' }}>
          {/* Lid */}
          <div style={{ background: 'linear-gradient(160deg, #EBEBEB 0%, #D5D5D5 100%)', borderRadius: '12px 12px 0 0', padding: '7px 7px 0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.06)' }}>
            <div style={{ background: '#111', borderRadius: '7px 7px 0 0', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 80, height: 18, background: '#111', zIndex: 20, borderRadius: '0 0 10px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#2E2E2E' }} />
              </div>
              <div style={{ paddingTop: 18, height: 400, background: C.cream, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Component />
              </div>
            </div>
          </div>
          {/* Keyboard deck */}
          <div style={{ background: 'linear-gradient(180deg, #D5D5D5 0%, #C8C8C8 100%)', height: 28, borderRadius: '0 0 8px 8px', boxShadow: '0 8px 28px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 50, height: 12, background: 'rgba(0,0,0,0.07)', borderRadius: 3, border: '0.5px solid rgba(0,0,0,0.06)' }} />
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 14 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: C.navy }}>{label}</p>
        <p style={{ fontSize: 11, color: C.hueso, marginTop: 3 }}>{sub}</p>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <NavBtn onClick={prev} disabled={cur === 0}>&#8249;</NavBtn>
        <div className="flex gap-1.5 items-center">
          {SLIDES.map((_, idx) => (
            <div key={idx} onClick={() => setCur(idx)} className="cursor-pointer" style={{ height: 5, borderRadius: idx === cur ? 2.5 : '50%', width: idx === cur ? 18 : 5, background: idx === cur ? C.navy : C.creamBorderStrong, transition: 'all 0.22s' }} />
          ))}
        </div>
        <NavBtn onClick={next} disabled={cur === SLIDES.length - 1}>&#8250;</NavBtn>
      </div>
    </div>
  )
}
