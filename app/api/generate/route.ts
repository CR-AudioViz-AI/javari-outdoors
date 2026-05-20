// app/api/generate/route.ts — javari-outdoors
// AI outdoor adventure planning — trails, gear, safety, weather integration
import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 60

const GROQ = process.env.GROQ_API_KEY ?? ''
const OR   = process.env.OPENROUTER_API_KEY ?? ''
const CREDIT_COST = 3

const SYSTEM = `You are an expert outdoor adventure specialist and wilderness guide for CR AudioViz AI.
Help hikers, campers, climbers, kayakers and outdoor enthusiasts with trail recommendations, 
gear lists, safety planning, route optimization, and emergency preparedness.
Be specific, safety-conscious, and actionable. Include difficulty ratings and real trail names when possible.`

const ACTIONS = ['trail_planner', 'gear_checklist', 'safety_plan', 'route_optimizer', 'camp_meal_plan', 'emergency_prep', 'weather_guide']

async function gen(prompt: string): Promise<string> {
  if (OR) {
    try {
      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OR}`, 'HTTP-Referer': 'https://craudiovizai.com' },
        body: JSON.stringify({ model: 'deepseek/deepseek-v4-flash:free', max_tokens: 2048, temperature: 0.7, messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: prompt }] })
      })
      if (r.ok) { const d = await r.json() as { choices?: Array<{ message?: { content?: string } }> }; const t = d.choices?.[0]?.message?.content ?? ''; if (t.length > 50) return t }
    } catch { /* fall through */ }
  }
  if (!GROQ) throw new Error('AI service unavailable')
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GROQ}` },
    body: JSON.stringify({ model: 'llama-3.3-70b-versatile', max_tokens: 2048, temperature: 0.7, messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: prompt }] })
  })
  if (!r.ok) throw new Error(`AI error: ${r.status}`)
  const d = await r.json() as { choices?: Array<{ message?: { content?: string } }> }
  return d.choices?.[0]?.message?.content ?? ''
}

export async function GET() { return NextResponse.json({ actions: ACTIONS, cost: CREDIT_COST + ' credits' }) }

export async function POST(req: NextRequest) {
  try {
    const b = await req.json() as { action: string; input: string }
    if (!ACTIONS.includes(b.action)) return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    const result = await gen(b.input)
    return NextResponse.json({ result, action: b.action, credits_used: CREDIT_COST })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Generation failed' }, { status: 500 })
  }
}
