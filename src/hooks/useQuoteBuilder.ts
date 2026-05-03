'use client'

import { useCallback, useEffect, useState } from 'react'

const KEY = 'traxon-quote-accessories'

export function useQuoteBuilder(productSlug: string) {
  const storageKey = `${KEY}-${productSlug}`
  const [accessories, setAccessories] = useState<string[]>([])

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) setAccessories(JSON.parse(stored) as string[])
    } catch {
      // localStorage unavailable (SSR edge case)
    }
  }, [storageKey])

  const persist = useCallback(
    (next: string[]) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        // ignore write errors
      }
    },
    [storageKey]
  )

  const toggle = useCallback(
    (id: string) => {
      setAccessories((prev) => {
        const next = prev.includes(id)
          ? prev.filter((a) => a !== id)
          : [...prev, id]
        persist(next)
        return next
      })
    },
    [persist]
  )

  const clear = useCallback(() => {
    setAccessories([])
    persist([])
  }, [persist])

  const isSelected = useCallback(
    (id: string) => accessories.includes(id),
    [accessories]
  )

  return { accessories, toggle, clear, isSelected, count: accessories.length }
}
