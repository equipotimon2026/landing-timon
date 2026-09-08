'use client'

import { useState, useRef, useEffect } from 'react'
import { ViewToggle, ViewMode } from './ViewToggle'

const C = {
  cream: '#FAF8F3',
  creamElev: '#FFFFFF',
  creamDeep: '#F1EEE7',
  creamBorder: '#E3E8F0',
  creamBorderStrong: '#D3DAE6',
  navy: '#0F1F36',
  navyMid: '#1E2F4D',
  ocean: '#2563EB',
  oceanLight: '#93B4FB',
  terra: '#F59E0B',
  hueso: '#5A6B85',
  green: '#10B981',
  amber: '#F59E0B',
}

// ── Shared primitives ─────────────────────────────────────────────────────────

function NavBtn({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} disabled={disabled} className="w-8 h-8 rounded-full flex items-center justify-center text-xl transition-all cursor-pointer disabled:opacity-25 disabled:cursor-default" style={{ border: `1px solid ${C.creamBorderStrong}`, color: C.hueso }}>
      {children}
    </button>
  )
}

function MacMenuBar({ section }: { section: string }) {
  return (
    <div style={{ padding: '7px 14px 6px', background: C.creamElev, borderBottom: `1px solid ${C.creamBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
      <div style={{ display: 'flex', gap: 5 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
      </div>
      <span style={{ fontSize: 10, fontWeight: 600, color: C.navy }}>Reporte Timon — Juan Pérez</span>
      <span style={{ fontSize: 8.5, fontFamily: 'monospace', color: C.hueso, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{section}</span>
    </div>
  )
}

function Bar({ pct, color = C.ocean, height = 3 }: { pct: number; color?: string; height?: number }) {
  return (
    <div style={{ height, background: C.creamBorderStrong, borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 999 }} />
    </div>
  )
}

// ── MacBook Air frame ─────────────────────────────────────────────────────────

function MacBookFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: '100%', maxWidth: 700, margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(160deg, #EBEBEB 0%, #D5D5D5 100%)', borderRadius: '12px 12px 0 0', padding: '7px 7px 0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.06)' }}>
        <div style={{ background: '#111', borderRadius: '7px 7px 0 0', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 80, height: 18, background: '#111', zIndex: 20, borderRadius: '0 0 10px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#2E2E2E' }} />
          </div>
          <div style={{ paddingTop: 18, height: 400, background: C.cream, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {children}
          </div>
        </div>
      </div>
      <div style={{ background: 'linear-gradient(180deg, #D5D5D5 0%, #C8C8C8 100%)', height: 28, borderRadius: '0 0 8px 8px', boxShadow: '0 8px 28px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 50, height: 12, background: 'rgba(0,0,0,0.07)', borderRadius: 3, border: '0.5px solid rgba(0,0,0,0.06)' }} />
      </div>
    </div>
  )
}

// ── Phone frame (output) ──────────────────────────────────────────────────────

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: 232, height: 470, background: C.navy, borderRadius: 33, border: `1.5px solid ${C.navyMid}`, overflow: 'hidden', position: 'relative', flexShrink: 0, boxShadow: '0 24px 48px rgba(15,27,51,0.18)' }}>
      <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 58, height: 18, background: C.navyMid, borderRadius: 10, zIndex: 100 }} />
      <div style={{ width: '100%', height: '100%', paddingTop: 34, display: 'flex', flexDirection: 'column', background: C.cream, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const CAREERS_DATA = [
  {
    rank: 1, name: 'Ingeniería en Software', field: 'Tecnología', pct: 94,
    why: [
      'Tu dominancia analítica (A: 82%) encaja con el diseño de sistemas complejos',
      'Preferís autonomía — los equipos de software tienen esa cultura por default',
      'Alta demanda y sueldos competitivos desde los primeros años',
    ],
    duration: '5 años', demand: 'Muy alta',
    paths: [
      { name: 'Backend Dev', desc: 'APIs, bases de datos, lógica del servidor' },
      { name: 'Frontend Dev', desc: 'Interfaces, React, diseño de producto digital' },
      { name: 'DevOps / Cloud', desc: 'Infraestructura, CI/CD, AWS y GCP' },
      { name: 'Machine Learning', desc: 'Modelos predictivos, IA aplicada a productos' },
    ],
  },
  {
    rank: 2, name: 'Lic. en Ciencia de Datos', field: 'Tecnología', pct: 91,
    why: [
      'Siempre querés saber "por qué" — acá eso es el trabajo diario',
      'Tu orientación a datos (79%) es el núcleo de esta carrera',
      'Disfrutás el ciclo de probar ideas y verificarlas con evidencia',
    ],
    duration: '5 años', demand: 'Alta',
    paths: [
      { name: 'Data Analyst', desc: 'Dashboards, reportes y análisis exploratorio' },
      { name: 'ML Engineer', desc: 'Modelos en producción, MLOps, pipelines' },
      { name: 'Data Scientist', desc: 'Investigación aplicada, estadística avanzada' },
      { name: 'Data Engineer', desc: 'Arquitecturas de datos, streaming, data lakes' },
    ],
  },
  {
    rank: 3, name: 'Ingeniería Industrial', field: 'Ingeniería', pct: 87,
    why: [
      'Buscar la forma más eficiente es literalmente la descripción del puesto',
      'Te gustan los problemas del mundo real, no los puramente teóricos',
      'La carrera más flexible: tech, finanzas, consultoría o emprendimiento',
    ],
    duration: '5–6 años', demand: 'Alta',
    paths: [
      { name: 'Consultoría', desc: 'Proyectos de mejora y optimización en empresas' },
      { name: 'Supply Chain', desc: 'Logística, operaciones, cadena de suministro' },
      { name: 'Finanzas Corp.', desc: 'Control de gestión, análisis financiero' },
      { name: 'Emprendimiento', desc: 'Recursos y redes para fundar startups' },
    ],
  },
  {
    rank: 4, name: 'Lic. en Economía', field: 'Cs. Sociales', pct: 83,
    why: [
      'Te copa entender cómo funcionan los sistemas grandes — acá es el eje',
      'Tu orientación a datos te pone adelante del promedio en la carrera',
      'Buena salida en sector público, banca, consultoría e investigación',
    ],
    duration: '5 años', demand: 'Media',
    paths: [
      { name: 'Economista público', desc: 'Política económica, organismos del Estado' },
      { name: 'Analista financiero', desc: 'Banca, fondos de inversión, fintech' },
      { name: 'Consultor económico', desc: 'Estudios privados, grandes corporaciones' },
      { name: 'Investigador', desc: 'Universidades, think tanks, organismos int.' },
    ],
  },
  {
    rank: 5, name: 'Lic. en Finanzas', field: 'Negocios', pct: 79,
    why: [
      'Te gustan los números y tomar decisiones con datos duros',
      'De las carreras con mejor salida inicial y sueldos en Argentina',
      'Más corta que las ingenierías — arrancás a trabajar antes',
    ],
    duration: '4–5 años', demand: 'Media-Alta',
    paths: [
      { name: 'Analista financiero', desc: 'Valuaciones, M&A, finanzas corporativas' },
      { name: 'Trader / Quant', desc: 'Mercados, derivados, estrategias cuantitativas' },
      { name: 'Controller', desc: 'Control de gestión, presupuesto, KPIs' },
      { name: 'Risk Analyst', desc: 'Gestión de riesgo en bancos y aseguradoras' },
    ],
  },
]

const LABOR_DATA = [
  {
    career: 'Ing. Software',
    roles: ['Dev Junior', 'Dev Senior', 'Tech Lead', 'Staff Eng.'],
    salaryMin: 1200, salaryMax: 5500, usdMin: 800, usdMax: 2500,
    demand: 'Muy alta', demandColor: C.ocean, autoRisk: 'Bajo', autoColor: C.green,
    trajectory: [
      { level: 'Junior', years: '0–2 años', ars: '$800k – 1.4M ARS', usd: 'USD 800 – 1.200' },
      { level: 'Semi-Senior', years: '2–4 años', ars: '$1.5M – 2.5M ARS', usd: 'USD 1.500 – 2.200' },
      { level: 'Senior', years: '4–7 años', ars: '$2.5M – 5M ARS', usd: 'USD 2.500 – 4.000' },
      { level: 'Lead / Staff', years: '7+ años', ars: '$5M – 8M ARS', usd: 'USD 3.500 – 6.000' },
    ],
  },
  {
    career: 'Ciencia Datos',
    roles: ['Data Analyst', 'ML Engineer', 'Data Scientist', 'Data PM'],
    salaryMin: 1400, salaryMax: 4800, usdMin: 900, usdMax: 2200,
    demand: 'Alta', demandColor: C.oceanLight, autoRisk: 'Bajo-Medio', autoColor: C.amber,
    trajectory: [
      { level: 'Analyst', years: '0–2 años', ars: '$900k – 1.5M ARS', usd: 'USD 900 – 1.400' },
      { level: 'Semi-Senior', years: '2–4 años', ars: '$1.5M – 2.8M ARS', usd: 'USD 1.600 – 2.400' },
      { level: 'Senior DS', years: '4–7 años', ars: '$2.8M – 4.8M ARS', usd: 'USD 2.400 – 3.800' },
      { level: 'Principal', years: '7+ años', ars: '$4.5M – 7M ARS', usd: 'USD 3.200 – 5.500' },
    ],
  },
  {
    career: 'Ing. Industrial',
    roles: ['Consultor Jr', 'Operaciones', 'Supply Chain', 'Finanzas Corp.'],
    salaryMin: 900, salaryMax: 4200, usdMin: 700, usdMax: 1800,
    demand: 'Alta', demandColor: C.oceanLight, autoRisk: 'Medio', autoColor: C.amber,
    trajectory: [
      { level: 'Junior', years: '0–2 años', ars: '$600k – 1M ARS', usd: 'USD 600 – 1.000' },
      { level: 'Semi-Senior', years: '2–4 años', ars: '$1M – 1.8M ARS', usd: 'USD 1.000 – 1.800' },
      { level: 'Senior', years: '4–7 años', ars: '$1.8M – 3.5M ARS', usd: 'USD 1.500 – 2.800' },
      { level: 'Gerencia', years: '7+ años', ars: '$3M – 6M ARS', usd: 'USD 2.500 – 4.500' },
    ],
  },
]

const UNIVERSITIES_DATA = [
  {
    rank: 1, name: 'Universidad de Buenos Aires', abbr: 'UBA', type: 'Pública', match: 94,
    modality: 'Presencial', duration: '5 + 1 año CBC', location: 'CABA',
    monthlyFee: 'Gratuita',
    careers: ['Ing. Informática', 'Lic. Computación', 'Ing. Industrial', 'Economía'],
    scholarship: 'Beca Sarmiento — 100% materiales + estipendio mensual',
    pros: ['Reconocimiento internacional', 'Red de egresados muy amplia', 'Exigencia académica alta'],
    cons: ['CBC de 1 año antes de la facultad', 'Cursada presencial intensa'],
  },
  {
    rank: 2, name: 'Inst. Tecnológico de Buenos Aires', abbr: 'ITBA', type: 'Privada', match: 89,
    modality: 'Presencial', duration: '5 años', location: 'Puerto Madero, CABA',
    monthlyFee: '$250k – 320k ARS/mes',
    careers: ['Ing. Informática', 'Analítica Empresarial', 'Ing. Industrial'],
    scholarship: 'Beca Excelencia — 50% al 100% de la cuota',
    pros: ['Excelencia técnica reconocida en tech', 'Red laboral muy activa', 'Ubicación y campus top'],
    cons: ['Costo alto sin beca', 'Requiere rendimiento sostenido para mantener beca'],
  },
  {
    rank: 3, name: 'Univ. Tecnológica Nacional', abbr: 'UTN', type: 'Pública', match: 87,
    modality: 'Híbrida', duration: '5 años', location: 'Almagro, CABA',
    monthlyFee: 'Gratuita',
    careers: ['Ing. en Sistemas', 'Ing. Industrial'],
    scholarship: 'Beca Progresar — $80.000 – $120.000/mes',
    pros: ['Reconocimiento sólido en sector privado', 'Modalidad híbrida flexible', 'Redes profesionales activas'],
    cons: ['Menos internacional que UBA o ITBA', 'Variabilidad entre seccionales'],
  },
  {
    rank: 4, name: 'Univ. Torcuato Di Tella', abbr: 'UTDT', type: 'Privada', match: 82,
    modality: 'Presencial', duration: '4 años', location: 'Núñez, CABA',
    monthlyFee: '$200k – 280k ARS/mes',
    careers: ['Lic. Economía', 'Economía Empresarial', 'Finanzas'],
    scholarship: 'Beca Académica — 25% al 100%',
    pros: ['La mejor economía privada del país', 'Duración más corta (4 años)', 'Ambiente muy académico'],
    cons: ['Foco en economía/finanzas, poca oferta tech', 'Costo elevado'],
  },
  {
    rank: 5, name: 'Universidad de San Andrés', abbr: 'UdeSA', type: 'Privada', match: 76,
    modality: 'Presencial', duration: '4 años', location: 'Victoria, Bs. As.',
    monthlyFee: '$180k – 250k ARS/mes',
    careers: ['Lic. Economía', 'Administración y Finanzas'],
    scholarship: 'Beca Completa — 100% cuota + estipendio',
    pros: ['Campus íntimo y académico', 'Excelente reputación en economía', 'Red de egresados de calidad'],
    cons: ['Fuera de CABA (transporte a considerar)', 'Poca oferta tech'],
  },
]

// ── Desktop Slide 1: Análisis de persona ─────────────────────────────────────

const PERSONA_CATS = [
  'Cómo llegamos acá',
  'Tu forma de pensar',
  'Tu mapa interno',
  'Tu energía',
  'Lo que te atrae',
  'Lo que no te atrae',
  'Tipo de vida',
  'En resumen',
] as const
type PersonaCat = typeof PERSONA_CATS[number]

const PERSONA_BLURBS: Record<PersonaCat, string> = {
  'Cómo llegamos acá': 'Respondiste cinco módulos sobre intereses, forma de procesar información y estilo de vida. Lo que ves acá es el resultado de analizar esos patrones de forma personalizada, no un test estándar.',
  'Tu forma de pensar': 'Procesás la información de manera analítica y sistemática. Antes de actuar, necesitás entender el mecanismo completo. Tu dominancia cognitiva es lógico-matemática, con orientación a datos muy por encima del promedio.',
  'Tu mapa interno': 'Tu perfil RIASEC muestra dominancia Investigadora y Realista. Encontrás sentido en resolver problemas concretos con evidencia, no en abstracciones ni en interacciones sociales intensas o prolongadas.',
  'Tu energía': 'Te activás con desafíos que tienen solución alcanzable y criterios claros de éxito. Te drena el trabajo repetitivo sin posibilidad de mejora y los ambientes donde las decisiones se toman por jerarquía en lugar de mérito.',
  'Lo que te atrae': 'Tecnología, ciencia de datos, economía e ingeniería de sistemas aparecen con mayor resonancia. No como herramientas sino como campos de pensamiento donde podés profundizar y especializarte indefinidamente.',
  'Lo que no te atrae': 'Roles centrados en atención al público continua, ambientes muy jerarquizados o carreras de expresión artística subjetiva no generan energía. No porque no puedas, sino porque no te dan satisfacción genuina.',
  'Tipo de vida': 'Preferís estructura con autonomía: objetivos claros y libertad para elegir cómo llegás. Rendís mejor en equipos chicos o trabajando de forma independiente. El trabajo remoto o híbrido es muy compatible con vos.',
  'En resumen': 'Sos alguien que necesita entender cómo funcionan las cosas antes de actuar. Encontrás satisfacción en resolver problemas complejos con lógica. Buscás un camino donde crecer siendo cada vez más específico en lo que hacés.',
}

function SlidePersona() {
  return (
    <>
      <MacMenuBar section="Secciones 01 – 08" />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: 158, borderRight: `1px solid ${C.creamBorder}`, display: 'flex', flexDirection: 'column', background: 'rgba(15,27,51,0.02)', flexShrink: 0, overflowY: 'auto', scrollbarWidth: 'none' }}>
          <p style={{ padding: '9px 10px 7px', fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.15em', color: C.ocean, borderBottom: `1px solid ${C.creamBorder}`, flexShrink: 0 }}>01 · Entenderte</p>
          {PERSONA_CATS.map((c, i) => (
            <div key={c} style={{ padding: '6px 10px', display: 'flex', alignItems: 'flex-start', gap: 6, borderBottom: `1px solid ${C.creamBorder}` }}>
              <span style={{ fontSize: 7, fontFamily: 'monospace', color: C.creamBorderStrong, flexShrink: 0, marginTop: 1 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 9, color: C.hueso, lineHeight: 1.3 }}>{c}</span>
            </div>
          ))}
        </div>

        {/* Right panel — all sections scrollable */}
        <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 11 }}>
          {PERSONA_CATS.map((cat, i) => (
            <div key={cat} style={{ paddingBottom: 11, borderBottom: i < PERSONA_CATS.length - 1 ? `1px solid ${C.creamBorder}` : 'none' }}>
              <p style={{ fontSize: 8, fontWeight: 600, color: C.navy, marginBottom: 5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cat}</p>
              <div style={{ filter: 'blur(4px)', userSelect: 'none', pointerEvents: 'none' }}>
                <p style={{ fontSize: 9, color: C.hueso, lineHeight: 1.65 }}>{PERSONA_BLURBS[cat]}</p>
              </div>
            </div>
          ))}
          <div style={{ padding: '7px 10px', borderRadius: 8, background: 'rgba(37,99,235,0.04)', border: '1px solid rgba(37,99,235,0.09)', textAlign: 'center' }}>
            <p style={{ fontSize: 8.5, color: C.hueso, fontStyle: 'italic' }}>Tu análisis completo aparece cuando hacés el recorrido</p>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Desktop Slide 2: Carreras ─────────────────────────────────────────────────

function SlideCarreras() {
  const [sel, setSel] = useState(0)
  const [detailTab, setDetailTab] = useState<'why' | 'paths'>('why')
  const c = CAREERS_DATA[sel]

  const handleSelect = (i: number) => {
    setSel(i)
    setDetailTab('why')
  }

  return (
    <>
      <MacMenuBar section="Acto 02 — Los caminos" />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* List */}
        <div style={{ width: 210, borderRight: `1px solid ${C.creamBorder}`, background: C.creamElev, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <p style={{ padding: '8px 12px 5px', fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.14em', color: C.hueso }}>Tus 5 carreras</p>
          {CAREERS_DATA.map((career, i) => (
            <button key={career.rank} onClick={() => handleSelect(i)} style={{ width: '100%', textAlign: 'left', padding: '8px 12px', cursor: 'pointer', background: i === sel ? C.cream : 'transparent', borderLeft: `2px solid ${i === sel ? C.ocean : 'transparent'}`, transition: 'all 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: 0, marginRight: 6 }}>
                  <p style={{ fontSize: 9.5, fontWeight: i === sel ? 600 : 400, color: i === sel ? C.navy : C.hueso, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{career.name}</p>
                  <p style={{ fontSize: 7, color: C.hueso, marginTop: 1.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{career.field}</p>
                </div>
                <span style={{ fontSize: 12, fontWeight: 300, color: i === sel ? C.ocean : C.hueso, flexShrink: 0 }}>{career.pct}%</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ padding: '12px 16px 0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ flex: 1, minWidth: 0, marginRight: 10 }}>
                <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.14em', color: C.hueso, marginBottom: 3 }}>#{c.rank} · {c.field}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.navy, lineHeight: 1.2, letterSpacing: '-0.02em' }}>{c.name}</p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontSize: 28, fontWeight: 200, color: C.navy, letterSpacing: '-0.04em', lineHeight: 1 }}>{c.pct}%</p>
                <p style={{ fontSize: 7.5, color: C.hueso, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>match</p>
              </div>
            </div>
            <Bar pct={c.pct} height={3} />
            {/* Sub tabs */}
            <div style={{ display: 'flex', marginTop: 10, borderBottom: `1px solid ${C.creamBorder}` }}>
              {(['why', 'paths'] as const).map(t => (
                <button key={t} onClick={() => setDetailTab(t)} style={{ padding: '5px 12px', fontSize: 8.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', color: detailTab === t ? C.ocean : C.hueso, borderBottom: detailTab === t ? `2px solid ${C.ocean}` : '2px solid transparent', marginBottom: -1, background: 'none', transition: 'color 0.15s' }}>
                  {t === 'why' ? 'Por qué encaja' : 'Caminos'}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, padding: '10px 16px', overflowY: 'auto', scrollbarWidth: 'none' }}>
            {detailTab === 'why' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {c.why.map((w, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '7px 10px', background: 'rgba(37,99,235,0.04)', borderRadius: 8, border: '1px solid rgba(37,99,235,0.09)' }}>
                    <span style={{ color: C.ocean, fontSize: 8.5, fontWeight: 700, flexShrink: 0, marginTop: 0.5 }}>✓</span>
                    <span style={{ fontSize: 9, lineHeight: 1.5, color: C.navy, opacity: 0.85 }}>{w}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 7, marginTop: 4 }}>
                  {[{ label: 'Duración', value: c.duration }, { label: 'Demanda', value: c.demand }].map(stat => (
                    <div key={stat.label} style={{ flex: 1, padding: '7px 9px', background: C.creamElev, borderRadius: 9, border: `1px solid ${C.creamBorder}` }}>
                      <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: C.hueso, marginBottom: 2 }}>{stat.label}</p>
                      <p style={{ fontSize: 10, fontWeight: 500, color: C.navy }}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detailTab === 'paths' && (
              <div>
                <p style={{ fontSize: 8, color: C.hueso, lineHeight: 1.5, marginBottom: 10 }}>
                  Con {c.name} podés especializarte en distintos caminos según lo que más te apasione dentro de la carrera.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                  {c.paths.map(path => (
                    <div key={path.name} style={{ padding: '10px 12px', background: C.creamElev, borderRadius: 10, border: `1px solid ${C.creamBorder}` }}>
                      <p style={{ fontSize: 10, fontWeight: 600, color: C.navy, marginBottom: 4 }}>{path.name}</p>
                      <p style={{ fontSize: 8.5, color: C.hueso, lineHeight: 1.45 }}>{path.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

// ── Desktop Slide 3: Salida laboral ──────────────────────────────────────────

function SlideLaboral() {
  const [sel, setSel] = useState(0)
  const [labTab, setLabTab] = useState<'roles' | 'trayectoria'>('roles')
  const d = LABOR_DATA[sel]

  const handleSelect = (i: number) => {
    setSel(i)
    setLabTab('roles')
  }

  return (
    <>
      <MacMenuBar section="Acto 02 — Mercado laboral" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 16px', gap: 10, overflow: 'hidden' }}>
        {/* Career chips + sub tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {LABOR_DATA.map((item, i) => (
              <button key={item.career} onClick={() => handleSelect(i)} style={{ padding: '5px 12px', borderRadius: 999, fontSize: 9.5, cursor: 'pointer', background: i === sel ? C.navy : C.creamElev, color: i === sel ? C.creamElev : C.hueso, border: `1px solid ${i === sel ? C.navy : C.creamBorder}`, fontWeight: i === sel ? 500 : 400, transition: 'all 0.15s' }}>
                {item.career}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            {(['roles', 'trayectoria'] as const).map(t => (
              <button key={t} onClick={() => setLabTab(t)} style={{ padding: '4px 10px', fontSize: 8, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', color: labTab === t ? C.ocean : C.hueso, borderBottom: labTab === t ? `1.5px solid ${C.ocean}` : '1.5px solid transparent', background: 'none', transition: 'color 0.15s' }}>
                {t === 'roles' ? 'Roles' : 'Trayectoria'}
              </button>
            ))}
          </div>
        </div>

        {labTab === 'roles' && (
          <>
            <div style={{ flexShrink: 0 }}>
              <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.14em', color: C.hueso, marginBottom: 6 }}>Roles disponibles</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
                {d.roles.map((role, i) => (
                  <div key={role} style={{ padding: '8px 9px', borderRadius: 9, textAlign: 'center', background: i === 0 ? C.navy : C.creamElev, border: `1px solid ${i === 0 ? C.navy : C.creamBorder}` }}>
                    <p style={{ fontSize: 6.5, color: i === 0 ? 'rgba(245,237,224,0.45)' : C.hueso, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{i === 0 ? 'Entrada' : i === 1 ? 'Mid' : i === 2 ? 'Senior' : 'Top'}</p>
                    <p style={{ fontSize: 9, fontWeight: 500, color: i === 0 ? C.creamElev : C.navy, lineHeight: 1.3 }}>{role}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '11px 13px', background: C.creamElev, borderRadius: 10, border: `1px solid ${C.creamBorder}`, flexShrink: 0 }}>
              <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.14em', color: C.hueso, marginBottom: 8 }}>Rango salarial Argentina</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                <span style={{ fontSize: 10, fontWeight: 500, color: C.navy, flexShrink: 0 }}>${d.salaryMin}k ARS</span>
                <div style={{ flex: 1, height: 6, background: C.creamBorderStrong, borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: `linear-gradient(90deg, ${C.oceanLight}, ${C.ocean})`, borderRadius: 999 }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 500, color: C.navy, flexShrink: 0 }}>${d.salaryMax}k ARS</span>
              </div>
              <p style={{ fontSize: 8, color: C.hueso }}>Remoto internacional: USD ${d.usdMin} – ${d.usdMax}/mes</p>
            </div>
            <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
              {[
                { label: 'Demanda actual', value: d.demand, dot: d.demandColor },
                { label: 'Riesgo de automatización', value: d.autoRisk, dot: d.autoColor },
              ].map(stat => (
                <div key={stat.label} style={{ flex: 1, padding: '9px 11px', background: C.creamElev, borderRadius: 10, border: `1px solid ${C.creamBorder}` }}>
                  <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: C.hueso, marginBottom: 5 }}>{stat.label}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: stat.dot, flexShrink: 0 }} />
                    <p style={{ fontSize: 11, fontWeight: 600, color: C.navy }}>{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {labTab === 'trayectoria' && (
          <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
            <p style={{ fontSize: 8, color: C.hueso, lineHeight: 1.5, marginBottom: 12 }}>
              Proyección de carrera para <strong style={{ color: C.navy }}>{d.career}</strong> en Argentina. Los valores incluyen salarios locales y opciones de trabajo remoto internacional.
            </p>
            {d.trajectory.map((t, i) => (
              <div key={t.level} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '11px 0', borderBottom: i < d.trajectory.length - 1 ? `1px solid ${C.creamBorder}` : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 2 }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: C.ocean, opacity: 0.3 + (i * 0.22) }} />
                  {i < d.trajectory.length - 1 && <div style={{ width: 1, height: 28, background: C.creamBorder, marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: C.navy }}>{t.level}</span>
                      <span style={{ fontSize: 8.5, color: C.hueso, marginLeft: 7 }}>{t.years}</span>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontSize: 10, fontWeight: 500, color: C.navy }}>{t.ars}</p>
                      <p style={{ fontSize: 8.5, color: C.hueso, marginTop: 1 }}>{t.usd}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(37,99,235,0.04)', border: '1px solid rgba(37,99,235,0.09)' }}>
              <p style={{ fontSize: 8, color: C.hueso, lineHeight: 1.5 }}>Los rangos ARS reflejan mercado local 2025. Remoto internacional: ingresos en USD para empresas del exterior, que pueden duplicar o triplicar los valores locales.</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

// ── Desktop Slide 4: Universidades ────────────────────────────────────────────

function SlideUniversidades() {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <>
      <MacMenuBar section="Acto 03 — Dónde estudiar" />
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '8px 12px' }}>
        {UNIVERSITIES_DATA.map((u, i) => (
          <div key={u.rank} style={{ marginBottom: 5, borderRadius: 10, border: `1px solid ${expanded === i ? C.ocean : C.creamBorder}`, background: expanded === i ? 'rgba(37,99,235,0.025)' : C.creamElev, overflow: 'hidden', transition: 'border-color 0.15s' }}>
            <div onClick={() => setExpanded(expanded === i ? null : i)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', cursor: 'pointer' }}>
              <span style={{ fontSize: 10, fontWeight: 300, color: 'rgba(15,27,51,0.22)', width: 14, textAlign: 'center', flexShrink: 0 }}>{u.rank}</span>
              <div style={{ width: 30, height: 30, background: C.navy, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 6.5, fontWeight: 700, color: C.creamElev, fontFamily: 'monospace' }}>{u.abbr}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 9.5, fontWeight: 500, color: C.navy, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</p>
                <div style={{ display: 'flex', gap: 5, marginTop: 2, alignItems: 'center' }}>
                  <span style={{ padding: '1px 5px', borderRadius: 999, fontSize: 6.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, background: u.type === 'Pública' ? 'rgba(37,99,235,0.1)' : 'rgba(15,27,51,0.07)', color: u.type === 'Pública' ? C.ocean : C.hueso }}>{u.type}</span>
                  <span style={{ fontSize: 8, color: C.hueso }}>{u.duration}</span>
                  <span style={{ fontSize: 8, color: C.hueso }}>·</span>
                  <span style={{ fontSize: 8, color: C.hueso }}>{u.modality}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 300, color: expanded === i ? C.ocean : C.navy }}>{u.match}%</span>
                <p style={{ fontSize: 6.5, color: C.hueso, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>match</p>
              </div>
            </div>

            {expanded === i && (
              <div style={{ padding: '8px 10px 11px', borderTop: `1px solid ${C.creamBorder}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* Careers + location */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 7, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: C.hueso, marginBottom: 4 }}>Carreras disponibles</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {u.careers.map(c => (
                        <span key={c} style={{ padding: '2px 7px', borderRadius: 999, fontSize: 7.5, background: C.creamDeep, color: C.navy, border: `1px solid ${C.creamBorder}` }}>{c}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <p style={{ fontSize: 7, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: C.hueso, marginBottom: 4 }}>Ubicación</p>
                    <p style={{ fontSize: 8.5, color: C.navy }}>{u.location}</p>
                  </div>
                </div>

                {/* Cost + pros/cons */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ padding: '7px 10px', borderRadius: 8, background: u.type === 'Pública' ? 'rgba(16,185,129,0.06)' : 'rgba(15,27,51,0.04)', border: `1px solid ${C.creamBorder}`, flexShrink: 0 }}>
                    <p style={{ fontSize: 7, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: C.hueso, marginBottom: 2 }}>Cuota</p>
                    <p style={{ fontSize: 10, fontWeight: 600, color: u.type === 'Pública' ? C.green : C.navy }}>{u.monthlyFee}</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 7, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', color: C.green, marginBottom: 4 }}>A favor</p>
                        {u.pros.map(p => (
                          <div key={p} style={{ display: 'flex', gap: 4, alignItems: 'flex-start', marginBottom: 3 }}>
                            <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.green, marginTop: 3.5, flexShrink: 0 }} />
                            <span style={{ fontSize: 7.5, color: C.navy, opacity: 0.8, lineHeight: 1.4 }}>{p}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 7, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', color: C.hueso, marginBottom: 4 }}>A tener en cuenta</p>
                        {u.cons.map(c => (
                          <div key={c} style={{ display: 'flex', gap: 4, alignItems: 'flex-start', marginBottom: 3 }}>
                            <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.hueso, marginTop: 3.5, flexShrink: 0 }} />
                            <span style={{ fontSize: 7.5, color: C.navy, opacity: 0.65, lineHeight: 1.4 }}>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scholarship */}
                <div style={{ padding: '7px 10px', borderRadius: 8, background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.1)' }}>
                  <p style={{ fontSize: 7, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: C.ocean, marginBottom: 2 }}>Beca destacada</p>
                  <p style={{ fontSize: 8.5, color: C.navy, lineHeight: 1.4 }}>{u.scholarship}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

const SLIDE_META = [
  { label: 'Análisis de Persona', sub: 'Personalidad · Cognitivo · Intereses · Energía · Vida ideal', Component: SlidePersona },
  { label: 'Carreras que Hacen Match', sub: 'Top 5 · Por qué encaja · Caminos posibles', Component: SlideCarreras },
  { label: 'Salida Laboral', sub: 'Roles · Trayectoria salarial · Demanda · Automatización', Component: SlideLaboral },
  { label: 'Universidades', sub: 'Pública y privada · Cuotas · Becas · Pros y contras', Component: SlideUniversidades },
]

// ── Phone output slides ───────────────────────────────────────────────────────

const PHONE_PERSONA_BLURBS = [
  'Cinco módulos de preguntas sobre intereses, forma de pensar y motivaciones.',
  'Dominancia analítica y sistemática, orientación a datos por encima del promedio.',
  'Perfil RIASEC Investigador-Realista. Preferís evidencia sobre intuición.',
  'Te activás con desafíos claros. Te drena la jerarquía sin mérito y lo repetitivo.',
  'Tecnología, ciencia, economía e ingeniería son los campos de mayor resonancia.',
  'Roles de atención pública intensa y ambientes muy jerárquicos no van con vos.',
  'Estructura con autonomía. Equipos chicos o solo. Compatible con trabajo remoto.',
  'Satisfacción profunda en ir a fondo y especializarte en lo que elegís hacer.',
]

function PhoneSlidePersona() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.cream }}>
      <div style={{ padding: '8px 11px 7px', borderBottom: `1px solid ${C.creamBorder}`, background: C.creamElev, flexShrink: 0 }}>
        <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: C.ocean }}>01 · Entenderte</p>
      </div>
      <div style={{ flex: 1, padding: '6px 11px 8px', overflowY: 'auto', scrollbarWidth: 'none' }}>
        {PERSONA_CATS.map((cat, i) => (
          <div key={cat} style={{ padding: '7px 0', borderBottom: i < PERSONA_CATS.length - 1 ? `1px solid ${C.creamBorder}` : 'none' }}>
            <p style={{ fontSize: 8.5, fontWeight: 500, color: C.navy, marginBottom: 3 }}>{cat}</p>
            <div style={{ filter: 'blur(4px)', userSelect: 'none', pointerEvents: 'none' }}>
              <p style={{ fontSize: 8, color: C.hueso, lineHeight: 1.4 }}>{PHONE_PERSONA_BLURBS[i]}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '6px 11px', borderTop: `1px solid ${C.creamBorder}`, textAlign: 'center', flexShrink: 0 }}>
        <p style={{ fontSize: 8, color: C.hueso, fontStyle: 'italic' }}>Disponible en tu reporte completo</p>
      </div>
    </div>
  )
}

function PhoneSlideCarreras() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.cream }}>
      <div style={{ padding: '8px 11px 7px', borderBottom: `1px solid ${C.creamBorder}`, background: C.creamElev, flexShrink: 0 }}>
        <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: C.hueso }}>Acto 02 · Tus carreras</p>
      </div>
      <div style={{ flex: 1, padding: '14px 11px', overflowY: 'auto', scrollbarWidth: 'none' }}>
        <p style={{ fontSize: 8, color: C.hueso, marginBottom: 14, letterSpacing: '0.02em' }}>5 carreras ordenadas por compatibilidad con tu perfil</p>
        {CAREERS_DATA.map((c, i) => (
          <div key={c.rank} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <div>
                <span style={{ fontSize: 7.5, color: C.hueso, marginRight: 5 }}>#{c.rank}</span>
                <span style={{ fontSize: 10.5, fontWeight: i === 0 ? 600 : 400, color: C.navy }}>{c.name}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 300, color: C.ocean }}>{c.pct}%</span>
            </div>
            <Bar pct={c.pct} height={3} color={i === 0 ? C.ocean : C.creamBorderStrong} />
            <p style={{ fontSize: 7.5, color: C.hueso, marginTop: 3 }}>{c.field} · {c.duration}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function PhoneSlideLaboral() {
  const [sel, setSel] = useState(0)
  const d = LABOR_DATA[sel]
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.cream }}>
      <div style={{ padding: '8px 11px 7px', borderBottom: `1px solid ${C.creamBorder}`, background: C.creamElev, flexShrink: 0 }}>
        <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: C.hueso }}>Acto 02 · Mercado laboral</p>
      </div>
      <div style={{ flex: 1, padding: '8px 11px', display: 'flex', flexDirection: 'column', gap: 9 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {LABOR_DATA.map((item, i) => (
            <button key={item.career} onClick={() => setSel(i)} style={{ flex: 1, padding: '4px 6px', borderRadius: 6, fontSize: 8, cursor: 'pointer', background: i === sel ? C.navy : C.creamElev, color: i === sel ? C.creamElev : C.hueso, border: `1px solid ${i === sel ? C.navy : C.creamBorder}`, transition: 'all 0.15s' }}>
              {item.career}
            </button>
          ))}
        </div>
        <div>
          <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: C.hueso, marginBottom: 7 }}>Rango salarial</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 9, fontWeight: 500, color: C.navy, flexShrink: 0 }}>${d.salaryMin}k</span>
            <div style={{ flex: 1, height: 5, background: C.creamBorderStrong, borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: `linear-gradient(90deg, ${C.oceanLight}, ${C.ocean})`, borderRadius: 999 }} />
            </div>
            <span style={{ fontSize: 9, fontWeight: 500, color: C.navy, flexShrink: 0 }}>${d.salaryMax}k ARS</span>
          </div>
          <p style={{ fontSize: 8, color: C.hueso }}>Remoto: USD ${d.usdMin}–{d.usdMax}/mes</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { label: 'Demanda', value: d.demand, dot: d.demandColor },
            { label: 'Auto. riesgo', value: d.autoRisk, dot: d.autoColor },
          ].map(stat => (
            <div key={stat.label} style={{ flex: 1, padding: '8px 9px', background: C.creamElev, borderRadius: 9, border: `1px solid ${C.creamBorder}` }}>
              <p style={{ fontSize: 7, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', color: C.hueso, marginBottom: 4 }}>{stat.label}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: stat.dot, flexShrink: 0 }} />
                <span style={{ fontSize: 9.5, fontWeight: 600, color: C.navy }}>{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: C.hueso, marginBottom: 6 }}>Trayectoria</p>
          {d.trajectory.map((t) => (
            <div key={t.level} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: `1px solid ${C.creamBorder}` }}>
              <span style={{ fontSize: 9, color: C.navy }}>{t.level}</span>
              <span style={{ fontSize: 8.5, color: C.hueso }}>{t.usd}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PhoneSlideUniversidades() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.cream }}>
      <div style={{ padding: '8px 11px 7px', borderBottom: `1px solid ${C.creamBorder}`, background: C.creamElev, flexShrink: 0 }}>
        <p style={{ fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: C.hueso }}>Acto 03 · Universidades</p>
      </div>
      <div style={{ flex: 1, padding: '12px 11px', overflowY: 'auto', scrollbarWidth: 'none' }}>
        {UNIVERSITIES_DATA.map((u) => (
          <div key={u.rank} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 0', borderBottom: `1px solid ${C.creamBorder}` }}>
            <span style={{ fontSize: 10, fontWeight: 300, color: 'rgba(15,27,51,0.25)', width: 12, flexShrink: 0 }}>{u.rank}</span>
            <div style={{ width: 28, height: 28, background: C.navy, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 6, fontWeight: 700, color: C.creamElev, fontFamily: 'monospace' }}>{u.abbr}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 9, fontWeight: 500, color: C.navy, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</p>
              <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
                <span style={{ padding: '1px 4px', borderRadius: 999, fontSize: 6, fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 600, background: u.type === 'Pública' ? 'rgba(37,99,235,0.1)' : 'rgba(15,27,51,0.07)', color: u.type === 'Pública' ? C.ocean : C.hueso }}>{u.type}</span>
                <span style={{ fontSize: 8, color: C.hueso }}>{u.duration}</span>
              </div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 300, color: C.navy, flexShrink: 0 }}>{u.match}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PHONE_SLIDE_META = [
  { label: 'Análisis de Persona', sub: 'Secciones 01–08', Component: PhoneSlidePersona },
  { label: 'Carreras', sub: 'Ranking de compatibilidad', Component: PhoneSlideCarreras },
  { label: 'Salida Laboral', sub: 'Salarios · Demanda', Component: PhoneSlideLaboral },
  { label: 'Universidades', sub: 'Pública y privada', Component: PhoneSlideUniversidades },
]

// ── Phone output view ─────────────────────────────────────────────────────────

const SLIDE_W = 264

function PhoneOutputView({ cur, setCur }: { cur: number; setCur: (i: number) => void }) {
  const viewRef = useRef<HTMLDivElement>(null)
  const [trackOffset, setTrackOffset] = useState(0)
  const [timerKey, setTimerKey] = useState(0)
  const curRef = useRef(cur)
  const touchX = useRef(0)

  const updateOffset = (idx: number) => {
    if (!viewRef.current) return
    const w = viewRef.current.offsetWidth
    setTrackOffset(w / 2 - 124 - idx * SLIDE_W)
  }

  const go = (idx: number) => {
    const c = Math.max(0, Math.min(PHONE_SLIDE_META.length - 1, idx))
    curRef.current = c
    setCur(c)
    updateOffset(c)
    setTimerKey(k => k + 1)
  }

  useEffect(() => {
    updateOffset(cur)
    const onResize = () => updateOffset(curRef.current)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [cur])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const id = setInterval(() => {
      const next = (curRef.current + 1) % PHONE_SLIDE_META.length
      curRef.current = next
      setCur(next)
      updateOffset(next)
    }, 10000)
    return () => clearInterval(id)
  }, [timerKey])

  return (
    <div className="w-full select-none">
      <div ref={viewRef} className="overflow-hidden py-4" onTouchStart={(e) => { touchX.current = e.touches[0].clientX }} onTouchEnd={(e) => { const diff = touchX.current - e.changedTouches[0].clientX; if (Math.abs(diff) > 40) go(cur + (diff > 0 ? 1 : -1)) }}>
        <div className="flex" style={{ gap: 16, transform: `translateX(${trackOffset}px)`, transition: 'transform 0.42s cubic-bezier(0.4,0,0.2,1)' }}>
          {PHONE_SLIDE_META.map((slide, idx) => (
            <div key={slide.label} className="flex-shrink-0 flex flex-col items-center cursor-pointer" style={{ width: 248, opacity: idx === cur ? 1 : 0.38, transform: idx === cur ? 'scale(1)' : 'scale(0.91)', transition: 'opacity 0.3s, transform 0.3s' }} onClick={() => go(idx)}>
              <PhoneShell>
                <slide.Component />
              </PhoneShell>
              <p style={{ marginTop: 12, fontSize: 13, fontWeight: 500, color: C.navy, textAlign: 'center' }}>{slide.label}</p>
              <p style={{ marginTop: 3, fontSize: 11, color: C.hueso, textAlign: 'center' }}>{slide.sub}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-2">
        <NavBtn onClick={() => go(cur - 1)} disabled={cur === 0}>&#8249;</NavBtn>
        <div className="flex gap-1.5 items-center">
          {PHONE_SLIDE_META.map((_, idx) => (
            <div key={idx} onClick={() => go(idx)} className="cursor-pointer" style={{ height: 5, borderRadius: idx === cur ? 2.5 : '50%', width: idx === cur ? 18 : 5, background: idx === cur ? C.navy : C.creamBorderStrong, transition: 'all 0.22s' }} />
          ))}
        </div>
        <NavBtn onClick={() => go(cur + 1)} disabled={cur === PHONE_SLIDE_META.length - 1}>&#8250;</NavBtn>
      </div>
    </div>
  )
}

// ── All view (card grid) ──────────────────────────────────────────────────────

const ALL_CARDS = [
  {
    badge: 'Análisis completo',
    label: 'Análisis de tu persona',
    desc: 'Un espejo de cómo pensás, qué te activa y cómo te relacionás con el entorno — construido desde tus propias respuestas, no un test genérico.',
    highlights: ['Qué te activa y qué te drena energía', 'Cómo procesás información y tomás decisiones', 'Tus intereses y valores dominantes'],
    accent: C.navy, idx: 0,
  },
  {
    badge: 'Acto 02 — Los caminos',
    label: 'Las carreras que van con vos',
    desc: 'Las 5 más compatibles con tu perfil, explicadas en función de lo que sos — con los caminos disponibles dentro de cada una.',
    highlights: ['Por qué cada carrera encaja con tu forma de ser', 'Caminos de especialización dentro de cada opción', 'Duración y demanda actual del mercado'],
    accent: C.ocean, idx: 1,
  },
  {
    badge: 'Acto 02 — Mercado',
    label: 'Salida laboral',
    desc: 'Roles disponibles, salarios reales en Argentina, trayectoria por seniority y riesgo de automatización para tus carreras.',
    highlights: ['Rango salarial en ARS y USD remoto', 'Trayectoria desde junior hasta senior', 'Demanda actual y riesgo de automatización'],
    accent: C.terra, idx: 2,
  },
  {
    badge: 'Acto 03 — Dónde estudiar',
    label: 'Universidades donde podés estudiarlas',
    desc: 'Públicas y privadas, cuotas, duración y ubicación — con pros, contras y becas disponibles para cada opción.',
    highlights: ['Match personalizado por universidad', 'Cuotas, becas y costos reales', 'Modalidad, duración y ubicación'],
    accent: C.hueso, idx: 3,
  },
]

function AllView({ onJump }: { onJump: (idx: number) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {ALL_CARDS.map(card => (
        <div
          key={card.label}
          onClick={() => onJump(card.idx)}
          className="cursor-pointer group"
          style={{ padding: '20px 22px', borderRadius: 16, background: C.creamElev, border: `1px solid ${C.creamBorder}`, transition: 'box-shadow 0.18s, border-color 0.18s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.07)'; (e.currentTarget as HTMLDivElement).style.borderColor = C.creamBorderStrong }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.borderColor = C.creamBorder }}
        >
          <span style={{ display: 'inline-block', fontSize: 7.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.14em', color: card.accent, padding: '2px 7px', border: `1px solid ${card.accent}`, borderRadius: 999, opacity: 0.65, marginBottom: 10 }}>{card.badge}</span>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: C.navy, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 8 }}>{card.label}</h3>
          <p style={{ fontSize: 12.5, color: C.hueso, lineHeight: 1.6, marginBottom: 12 }}>{card.desc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
            {card.highlights.map(h => (
              <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: card.accent, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: C.navy }}>{h}</span>
              </div>
            ))}
          </div>
          <span style={{ fontSize: 11.5, color: card.accent }}>Explorar en detalle →</span>
        </div>
      ))}
    </div>
  )
}

// ── Desktop carousel wrapper ──────────────────────────────────────────────────

function DesktopView({ cur, setCur }: { cur: number; setCur: (i: number) => void }) {
  const touchX = useRef(0)
  const curRef = useRef(cur)
  const [timerKey, setTimerKey] = useState(0)

  useEffect(() => { curRef.current = cur }, [cur])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const id = setInterval(() => {
      const next = (curRef.current + 1) % SLIDE_META.length
      curRef.current = next
      setCur(next)
    }, 10000)
    return () => clearInterval(id)
  }, [timerKey])

  const navigate = (idx: number) => {
    const c = Math.max(0, Math.min(SLIDE_META.length - 1, idx))
    setCur(c)
    setTimerKey(k => k + 1)
  }

  const prev = () => navigate(cur - 1)
  const next = () => navigate(cur + 1)
  const { Component, label, sub } = SLIDE_META[cur]

  return (
    <div className="w-full select-none">
      <div onTouchStart={(e) => { touchX.current = e.touches[0].clientX }} onTouchEnd={(e) => { const diff = touchX.current - e.changedTouches[0].clientX; if (Math.abs(diff) > 40) diff > 0 ? next() : prev() }}>
        <div key={cur} className="animate-fade-in">
          <MacBookFrame><Component /></MacBookFrame>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 14 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: C.navy }}>{label}</p>
        <p style={{ fontSize: 11, color: C.hueso, marginTop: 3 }}>{sub}</p>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        <NavBtn onClick={prev} disabled={cur === 0}>&#8249;</NavBtn>
        <div className="flex gap-1.5 items-center">
          {SLIDE_META.map((_, idx) => (
            <div key={idx} onClick={() => navigate(idx)} className="cursor-pointer" style={{ height: 5, borderRadius: idx === cur ? 2.5 : '50%', width: idx === cur ? 18 : 5, background: idx === cur ? C.navy : C.creamBorderStrong, transition: 'all 0.22s' }} />
          ))}
        </div>
        <NavBtn onClick={next} disabled={cur === SLIDE_META.length - 1}>&#8250;</NavBtn>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export function ReportCarousel() {
  const [isMobile, setIsMobile] = useState(true)
  const [view, setView] = useState<ViewMode>('phone')
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setView(v => v === 'phone' ? 'desktop' : v)
      if (mobile) setView(v => v === 'desktop' ? 'phone' : v)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleViewChange = (v: ViewMode) => {
    setView(v)
    setCur(0)
  }

  const handleJump = (idx: number) => {
    setCur(idx)
    setView(isMobile ? 'phone' : 'desktop')
  }

  return (
    <div className="w-full">
      <div style={{ marginBottom: 20 }}>
        <ViewToggle value={view} onChange={handleViewChange} options={isMobile ? ['all', 'phone'] : undefined} />
      </div>
      {view === 'all' && <AllView onJump={handleJump} />}
      {view === 'phone' && <PhoneOutputView cur={cur} setCur={setCur} />}
      {view === 'desktop' && <DesktopView cur={cur} setCur={setCur} />}
    </div>
  )
}
