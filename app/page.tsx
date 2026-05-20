// app/page.tsx — Javari Outdoors
// Complete AI outdoor adventure planning — real API calls
// CR AudioViz AI, LLC · EIN 39-3646201 · May 2026
'use client'
import { useState } from 'react'
import { ACTIONS, getFields } from '@/lib/tool-data'


export default function OutdoorsPage() {
  const [action, setAction] = useState(ACTIONS[0])
  const [values, setValues] = useState({})
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function setV(id: string, val: string) { setValues(p => ({ ...p, [id]: val })) }

  async function generate() {
    setLoading(true); setError(''); setOutput('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: action.id, input: action.prompt(values) }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Generation failed')
      setOutput(data.result || '')
    } catch (e) { setError(e instanceof Error ? e.message : 'Something went wrong') }
    setLoading(false)
  }

  return (
    <div style={{ background: '#060d08', minHeight: '100vh', color: '#dde8d8', fontFamily: 'Outfit, system-ui, sans-serif' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(6,13,8,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(34,197,94,0.12)', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <a href="https://craudiovizai.com" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{ fontSize: 22 }}>🌲</span>
          <span style={{ fontWeight: 800, fontSize: 15, color: '#4ade80', letterSpacing: '-0.02em' }}>Javari Outdoors</span>
        </a>
        <a href="https://craudiovizai.com/auth/signup" style={{ background: 'linear-gradient(135deg, #16a34a, #166534)', color: 'white', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Free Access →</a>
      </nav>
      <div style={{ height: 60 }} />

      <section style={{ textAlign: 'center', padding: '52px 24px 36px', maxWidth: 700, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          AI Adventure <span style={{ color: '#4ade80' }}>Planner</span>
        </h1>
        <p style={{ fontSize: 16, color: '#6b7280', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
          Trail recommendations, gear lists, safety plans, and route optimization — 
          powered by AI. <strong style={{ color: '#4ade80' }}>Free to start.</strong>
        </p>
      </section>

      <section style={{ maxWidth: 980, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.5fr)', gap: 20, alignItems: 'start' }}>
        <div>
          <div style={{ background: '#0c1a0e', border: '1px solid rgba(34,197,94,0.1)', borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
            {ACTIONS.map(a => (
              <button key={a.id} onClick={() => { setAction(a); setValues({}); setOutput('') }}
                style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: action.id === a.id ? 'rgba(34,197,94,0.08)' : 'transparent', borderLeft: action.id === a.id ? '3px solid #22c55e' : '3px solid transparent', border: 'none', cursor: 'pointer', borderBottom: '1px solid rgba(34,197,94,0.05)', display: 'block' }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: action.id === a.id ? '#86efac' : '#9ca3af' }}>{a.label}</div>
                <div style={{ fontSize: 11, color: '#374151', marginTop: 2 }}>{a.desc}</div>
              </button>
            ))}
          </div>
          <div style={{ background: '#0c1a0e', border: '1px solid rgba(34,197,94,0.1)', borderRadius: 14, padding: '18px' }}>
            {COMMON_FIELDS.map(f => (
              <div key={f.id} style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 5, fontWeight: 500 }}>{f.label}</label>
                <input value={values[f.id] || ''} onChange={e => setV(f.id, e.target.value)} placeholder={f.placeholder}
                  style={{ width: '100%', background: '#060d08', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 8, padding: '9px 13px', color: '#dde8d8', fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
              </div>
            ))}
            <button onClick={generate} disabled={loading}
              style={{ width: '100%', background: loading ? '#0c1a0e' : 'linear-gradient(135deg, #16a34a, #166534)', color: loading ? '#374151' : 'white', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 8 }}>
              {loading ? '⏳ Planning...' : `Plan with AI: ${action.label}`}
            </button>
            {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 10 }}>⚠ {error}</p>}
          </div>
        </div>
        <div style={{ background: '#0c1a0e', border: '1px solid rgba(34,197,94,0.1)', borderRadius: 14, overflow: 'hidden', position: 'sticky', top: 80 }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(34,197,94,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI Plan</span>
            {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }} style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: copied ? '#4ade80' : '#6b7280', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>{copied ? '✓ Copied' : 'Copy'}</button>}
          </div>
          {output ? (
            <textarea value={output} readOnly style={{ width: '100%', background: 'transparent', border: 'none', padding: '20px', color: '#dde8d8', fontSize: 14, lineHeight: 1.75, resize: 'vertical', minHeight: 440, boxSizing: 'border-box', outline: 'none' }} />
          ) : (
            <div style={{ padding: '60px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{loading ? '⏳' : '🌲'}</div>
              <p style={{ color: '#1a2e1a', fontSize: 13, lineHeight: 1.7 }}>{loading ? 'Building your adventure plan...' : 'Fill in your trip details
and select a planning tool.
3 free credits per generation.'}</p>
            </div>
          )}
        </div>
      </section>
      <footer style={{ background: '#040a06', borderTop: '1px solid rgba(34,197,94,0.06)', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: '#0c1a0e', fontSize: 12, margin: 0 }}>© 2026 CR AudioViz AI, LLC — EIN: 39-3646201 · Fort Myers, Florida · Your Story. Our Design.</p>
      </footer>
    </div>
  )
}
