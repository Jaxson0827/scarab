'use client'

import type { Accessory } from '@/types/product'
import AccessoryCard from '@/components/product/AccessoryCard'
import { useQuoteBuilder } from '@/hooks/useQuoteBuilder'

interface Props {
  accessories: Accessory[]
  productSlug: string
}

export default function AccessoriesGrid({ accessories, productSlug }: Props) {
  const { toggle, isSelected } = useQuoteBuilder(productSlug)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {accessories.map((accessory) => (
        <AccessoryCard
          key={accessory.id}
          accessory={accessory}
          isSelected={isSelected(accessory.id)}
          onToggle={() => toggle(accessory.id)}
        />
      ))}
    </div>
  )
}
