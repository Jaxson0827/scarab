import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const PRODUCT_DATA: Record<string, { name: string; capacity: string; tagline: string }> = {
  'scarab-x5': { name: 'SCARAB X5', capacity: '4,000 LBS', tagline: 'The world\'s highest-payload compact tracked carrier' },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') ?? 'home'
  const slug = searchParams.get('slug')

  const product = slug ? PRODUCT_DATA[slug] : null

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: '#080a0d',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          fontFamily: 'Arial Black, Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(30,37,48,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(30,37,48,0.6) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Blue glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,194,255,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Top: logo + page label */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0px' }}>
            <span style={{ color: '#f0f3f7', fontSize: '36px', letterSpacing: '0.15em', fontWeight: '900' }}>
              TRAX
            </span>
            <span style={{ color: '#00c2ff', fontSize: '36px', letterSpacing: '0.15em', fontWeight: '900' }}>
              ON
            </span>
          </div>
          <span
            style={{
              color: '#6b7585',
              fontSize: '12px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              border: '1px solid #1e2530',
              padding: '6px 14px',
            }}
          >
            INDUSTRIAL TRACKED CARRIERS
          </span>
        </div>

        {/* Middle: main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
          {page === 'product' && product ? (
            <>
              <span style={{ color: '#6b7585', fontSize: '13px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                Product
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={{ color: '#f0f3f7', fontSize: '80px', letterSpacing: '-0.02em', fontWeight: '900', lineHeight: 1 }}>
                  {product.name}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: '#00c2ff', fontSize: '36px', fontWeight: '900' }}>
                  {product.capacity}
                </span>
                <span style={{ color: '#1e2530', fontSize: '36px' }}>|</span>
                <span style={{ color: '#6b7585', fontSize: '20px', fontWeight: '400' }}>
                  {product.tagline}
                </span>
              </div>
            </>
          ) : page === 'product' ? (
            <>
              <span style={{ color: '#6b7585', fontSize: '13px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Products</span>
              <span style={{ color: '#f0f3f7', fontSize: '72px', fontWeight: '900', lineHeight: 1 }}>The Scarab Series</span>
              <span style={{ color: '#9aa4b2', fontSize: '22px', fontWeight: '400' }}>One machine. One philosophy.</span>
            </>
          ) : page === 'why-traxon' ? (
            <>
              <span style={{ color: '#6b7585', fontSize: '13px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Why Traxon</span>
              <span style={{ color: '#f0f3f7', fontSize: '72px', fontWeight: '900', lineHeight: 1 }}>Every Spec.<br />Every Advantage.</span>
            </>
          ) : page === 'case-study' ? (
            <>
              <span style={{ color: '#6b7585', fontSize: '13px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Case Studies</span>
              <span style={{ color: '#f0f3f7', fontSize: '72px', fontWeight: '900', lineHeight: 1 }}>Proof.<br />Not Claims.</span>
            </>
          ) : (
            <>
              {/* Homepage */}
              <span style={{ color: '#6b7585', fontSize: '13px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                Move The Impossible. Load.
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                <span style={{ color: '#f0f3f7', fontSize: '88px', fontWeight: '900', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
                  4,000 LBS
                </span>
                <span style={{ color: '#00c2ff', fontSize: '88px', fontWeight: '900', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
                  THROUGH
                </span>
                <span style={{ color: '#f0f3f7', fontSize: '88px', fontWeight: '900', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
                  1 METRE.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Bottom: stat strip */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            paddingTop: '24px',
            borderTop: '1px solid #1e2530',
            position: 'relative',
          }}
        >
          {[
            { value: '4,000 lbs', label: 'Max Payload' },
            { value: '980 mm', label: 'Machine Width' },
            { value: '100 m', label: 'Remote Range' },
            { value: '10°', label: 'Max Gradient' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ color: '#00c2ff', fontSize: '22px', fontWeight: '900' }}>
                {stat.value}
              </span>
              <span style={{ color: '#6b7585', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: '60px',
            width: '1px',
            height: '100%',
            background: 'linear-gradient(to bottom, transparent, rgba(0,194,255,0.3), transparent)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
