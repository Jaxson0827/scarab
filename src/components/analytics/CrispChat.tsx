'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $crisp: any[]
    CRISP_WEBSITE_ID: string
  }
}

export default function CrispChat() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
    if (!id || typeof window === 'undefined') return

    const timer = setTimeout(() => {
      window.$crisp = []
      window.CRISP_WEBSITE_ID = id

      const script = document.createElement('script')
      script.src = 'https://client.crisp.chat/l.js'
      script.async = true
      document.head.appendChild(script)

      // 30-second dwell message
      const dwellTimer = setTimeout(() => {
        if (window.$crisp) {
          window.$crisp.push(['do', 'chat:open'])
          window.$crisp.push([
            'do',
            'message:show',
            ['text', "Can we help you find the right machine for your job? Tell us your payload and access width."],
          ])
        }
      }, 30000)

      return () => clearTimeout(dwellTimer)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return null
}
