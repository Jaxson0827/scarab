'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    hj?: (...args: unknown[]) => void
    _hjSettings?: { hjid: number; hjsv: number }
  }
}

export default function HotjarScript() {
  useEffect(() => {
    const hjId = process.env.NEXT_PUBLIC_HOTJAR_ID
    if (!hjId || process.env.NODE_ENV !== 'production') return

    const timer = setTimeout(() => {
      window.hj =
        window.hj ||
        function (...args: unknown[]) {
          ;(window.hj as unknown as { q: unknown[] }).q =
            (window.hj as unknown as { q: unknown[] }).q || []
          ;(window.hj as unknown as { q: unknown[] }).q.push(args)
        }
      window._hjSettings = { hjid: Number(hjId), hjsv: 6 }

      const script = document.createElement('script')
      script.async = true
      script.src = `https://static.hotjar.com/c/hotjar-${hjId}.js?sv=6`
      document.head.appendChild(script)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return null
}
