import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Security Guard Result Portal',
  description: 'Created for fun',
  generator: 'Security Guard Result',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
