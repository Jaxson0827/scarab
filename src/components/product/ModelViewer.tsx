'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import type { Hotspot } from '@/types/product'

/* ─── Image Carousel (renders when no GLB model is available) ─────────────── */

interface CarouselProps {
  images: string[]
  productName: string
  tier: string
}

function ImageCarousel({ images, productName, tier }: CarouselProps) {
  const [active, setActive] = useState(0)
  const hasImages = images.length > 0

  return (
    <div className="relative w-full aspect-[16/9] bg-surface-2 overflow-hidden select-none">
      {/* Main display */}
      {hasImages ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={images[active]}
          alt={`${productName} — view ${active + 1}`}
          className="w-full h-full object-contain"
          draggable={false}
        />
      ) : (
        /* Placeholder — no image available yet */
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              opacity: 0.2,
            }}
          />
          <div className="relative flex flex-col items-center gap-3 text-center px-8">
            <span className="font-label text-mono-sm uppercase tracking-[0.2em] text-blue opacity-60">
              {tier}
            </span>
            <span className="font-display text-[clamp(48px,8vw,96px)] text-white leading-none">
              {productName.toUpperCase()}
            </span>
            <span className="font-label text-mono-sm uppercase tracking-[0.2em] text-muted">
              3D model · Photography coming soon
            </span>
          </div>
        </div>
      )}

      {/* Navigation arrows — only with multiple images */}
      {hasImages && images.length > 1 && (
        <>
          <button
            onClick={() => setActive((p) => (p - 1 + images.length) % images.length)}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface border border-border flex items-center justify-center text-mild hover:text-white hover:border-blue transition-colors duration-200"
          >
            ←
          </button>
          <button
            onClick={() => setActive((p) => (p + 1) % images.length)}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface border border-border flex items-center justify-center text-mild hover:text-white hover:border-blue transition-colors duration-200"
          >
            →
          </button>
        </>
      )}

      {/* Thumbnail strip */}
      {hasImages && images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={[
                'w-12 h-8 border overflow-hidden transition-colors duration-200',
                i === active ? 'border-blue' : 'border-border hover:border-border-2',
              ].join(' ')}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Three.js Scene (lazy loaded, only when modelUrl provided) ───────────── */

function ThreeScene({
  modelUrl,
  selectedColor,
  hotspots,
}: {
  modelUrl: string
  selectedColor: 'black' | 'grey'
  hotspots?: Hotspot[]
}) {
  // Dynamic imports to keep Three.js out of the initial bundle
  const [R3F, setR3F] = useState<{
    Canvas: React.ComponentType<React.PropsWithChildren<{ camera: object; shadows: boolean; className?: string }>>
    OrbitControls: React.ComponentType<{
      autoRotate?: boolean
      autoRotateSpeed?: number
      enableZoom?: boolean
      minDistance?: number
      maxDistance?: number
    }>
    ambientLight: unknown
  } | null>(null)

  useEffect(() => {
    Promise.all([
      import('@react-three/fiber'),
      import('@react-three/drei'),
    ]).then(([fiber, drei]) => {
      setR3F({
        Canvas: fiber.Canvas,
        OrbitControls: drei.OrbitControls,
        ambientLight: null,
      })
    })
  }, [])

  if (!R3F) {
    return (
      <div className="w-full aspect-[16/9] bg-surface-2 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue border-t-transparent rounded-full animate-spin" />
          <span className="font-label text-mono-sm text-muted uppercase tracking-[0.2em]">
            Loading viewer
          </span>
        </div>
      </div>
    )
  }

  const { Canvas, OrbitControls } = R3F

  return (
    <div className="w-full aspect-[16/9] bg-surface-2">
      <Canvas
        camera={{ position: [0, 1.5, 5] as [number, number, number], fov: 45 }}
        shadows
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-3, 2, -3]} intensity={0.4} />
        <Suspense fallback={null}>
          <ModelMesh
            url={modelUrl}
            color={selectedColor}
            hotspots={hotspots}
          />
        </Suspense>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom
          minDistance={2}
          maxDistance={8}
        />
      </Canvas>
    </div>
  )
}

function ModelMesh({
  url,
  color,
  hotspots: _hotspots,
}: {
  url: string
  color: 'black' | 'grey'
  hotspots?: Hotspot[]
}) {
  const meshRef = useRef<{ scene: { traverse: (fn: (child: unknown) => void) => void } }>(null)

  // Dynamically use R3F hooks
  useEffect(() => {
    // Color update happens via useGLTF hook inside R3F context
    // This is a placeholder until actual GLB files are available
    void url
    void color
    void meshRef
  }, [url, color])

  // Placeholder box until GLB available
  return (
    <mesh>
      <boxGeometry args={[2, 0.5, 3.5]} />
      <meshStandardMaterial color={color === 'grey' ? '#808080' : '#1a1a1a'} />
    </mesh>
  )
}

/* ─── Public ModelViewer Component ───────────────────────────────────────── */

interface ModelViewerProps {
  modelUrl?: string
  images?: string[]
  selectedColor?: 'black' | 'grey'
  hotspots?: Hotspot[]
  productName: string
  tier: string
}

export default function ModelViewer({
  modelUrl,
  images = [],
  selectedColor = 'black',
  hotspots,
  productName,
  tier,
}: ModelViewerProps) {
  return modelUrl ? (
    <ThreeScene
      modelUrl={modelUrl}
      selectedColor={selectedColor}
      hotspots={hotspots}
    />
  ) : (
    <ImageCarousel
      images={images}
      productName={productName}
      tier={tier}
    />
  )
}
