'use client'

import { useState, useCallback, useRef } from 'react'
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/mapbox'
import type { Dealer } from '@/lib/dealers'
import 'mapbox-gl/dist/mapbox-gl.css'

interface Props {
  dealers: Dealer[]
  selectedId: string | null
  onSelectDealer: (id: string | null) => void
}

export default function DealerMap({ dealers, selectedId, onSelectDealer }: Props) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  const [popup, setPopup] = useState<Dealer | null>(null)
  const mapRef = useRef<Parameters<typeof Map>[0]['ref']>(null)

  const handleMarkerClick = useCallback((dealer: Dealer) => {
    setPopup(dealer)
    onSelectDealer(dealer.id)
  }, [onSelectDealer])

  if (!token) {
    return (
      <div className="w-full h-full bg-surface-2 border border-border flex items-center justify-center">
        <div className="text-center p-8">
          <p className="font-label text-mono-sm uppercase tracking-widest text-muted mb-2">
            Map Unavailable
          </p>
          <p className="font-body text-body-sm text-muted/60 font-light">
            Set NEXT_PUBLIC_MAPBOX_TOKEN to enable the interactive dealer map.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Map
      ref={mapRef as never}
      mapboxAccessToken={token}
      initialViewState={{ longitude: -40, latitude: 30, zoom: 2.2 }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      attributionControl={false}
    >
      <NavigationControl position="top-right" showCompass={false} />

      {dealers.map((dealer) => (
        <Marker
          key={dealer.id}
          longitude={dealer.lng}
          latitude={dealer.lat}
          anchor="center"
          onClick={() => handleMarkerClick(dealer)}
        >
          <button
            className={[
              'w-4 h-4 rounded-full border-2 transition-all duration-150 cursor-pointer',
              selectedId === dealer.id
                ? 'bg-blue border-blue scale-150 shadow-[0_0_12px_rgba(0,194,255,0.6)]'
                : 'bg-black border-blue/60 hover:border-blue hover:scale-125',
            ].join(' ')}
            aria-label={dealer.name}
          />
        </Marker>
      ))}

      {popup && (
        <Popup
          longitude={popup.lng}
          latitude={popup.lat}
          anchor="bottom"
          offset={12}
          onClose={() => setPopup(null)}
          closeButton={false}
          className="dealer-popup"
        >
          <div className="bg-surface border border-blue/30 p-3 min-w-[180px]">
            <p className="font-label text-[10px] uppercase tracking-widest text-blue mb-1">
              {popup.country} · {popup.state}
            </p>
            <p className="font-body text-[13px] text-white font-medium">
              {popup.name}
            </p>
          </div>
        </Popup>
      )}
    </Map>
  )
}
