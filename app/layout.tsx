// app/layout.tsx — Javari Outdoors
import type { Metadata } from 'next'
import './globals.css'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Javari Outdoors | Javari by CR AudioViz AI',
  description: 'Outdoor recreation',
}
import AppShell from '@/components/AppShell'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body style={{ margin: 0, padding: 0 }}><AppShell appName="Javari Outdoors" appColor="#10b981" appEmoji="🌲" appDesc="Outdoor recreation">{children}</AppShell></body></html>)
}
