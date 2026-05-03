import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
  Row,
  Column,
} from '@react-email/components'

interface QuoteConfirmationProps {
  firstName: string
  lastName: string
  company: string
  product: string
  accessories: string[]
  reference: string
  industry: string
  payload: number
  width: number
}

const PRODUCT_NAMES: Record<string, string> = {
  'scarab-x5': 'Scarab X5',
}

const ACCESSORY_NAMES: Record<string, string> = {
  'extended-remote': 'Extended Range Remote (100m)',
  'low-profile-deck': 'Low-Profile Deck Insert',
  'side-guide-rails': 'Side Guide Rail Kit',
  'hydraulic-ramps': 'Hydraulic Loading Ramps',
  'rotation-motor': 'Platform Rotation Motor (360°)',
  'aux-power': '48V Auxiliary Power Kit',
}

export function QuoteConfirmationEmail({
  firstName,
  lastName,
  company,
  product,
  accessories = [],
  reference,
  industry,
  payload,
  width,
}: QuoteConfirmationProps) {
  const productName = PRODUCT_NAMES[product] ?? product

  return (
    <Html lang="en">
      <Head>
        <title>Traxon Quote Request Received — {reference}</title>
      </Head>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          {/* Header */}
          <Section style={headerStyle}>
            <Heading style={logoStyle}>TRAX<span style={{ color: '#00c2ff' }}>ON</span></Heading>
            <Text style={headerTagStyle}>INDUSTRIAL TRACKED CARRIERS</Text>
          </Section>

          {/* Content */}
          <Section style={contentStyle}>
            <Heading as="h2" style={h2Style}>
              Quote Request Received
            </Heading>

            <Text style={bodyTextStyle}>
              Hi {firstName},
            </Text>
            <Text style={bodyTextStyle}>
              We&apos;ve received your quote request for the <strong style={{ color: '#00c2ff' }}>{productName}</strong>. Our team will review your requirements and respond within <strong>4 business hours</strong>.
            </Text>

            {/* Reference */}
            <Section style={refBoxStyle}>
              <Text style={{ ...labelStyle, marginBottom: '4px' }}>Reference Number</Text>
              <Text style={{ ...valueStyle, fontSize: '18px', letterSpacing: '0.1em' }}>{reference}</Text>
            </Section>

            <Hr style={hrStyle} />

            {/* Summary */}
            <Heading as="h3" style={h3Style}>Your Request Summary</Heading>

            <Row>
              <Column style={colStyle}>
                <Text style={labelStyle}>Product</Text>
                <Text style={valueStyle}>{productName}</Text>
              </Column>
              <Column style={colStyle}>
                <Text style={labelStyle}>Industry</Text>
                <Text style={valueStyle}>{industry}</Text>
              </Column>
            </Row>
            <Row>
              <Column style={colStyle}>
                <Text style={labelStyle}>Payload</Text>
                <Text style={valueStyle}>{payload.toLocaleString()} lbs</Text>
              </Column>
              <Column style={colStyle}>
                <Text style={labelStyle}>Access Width</Text>
                <Text style={valueStyle}>{width} mm</Text>
              </Column>
            </Row>
            <Row>
              <Column style={colStyle}>
                <Text style={labelStyle}>Company</Text>
                <Text style={valueStyle}>{company}</Text>
              </Column>
            </Row>

            {accessories.length > 0 && (
              <>
                <Text style={labelStyle}>Accessories Requested</Text>
                {accessories.map((acc) => (
                  <Text key={acc} style={bulletStyle}>
                    › {ACCESSORY_NAMES[acc] ?? acc}
                  </Text>
                ))}
              </>
            )}

            <Hr style={hrStyle} />

            <Text style={bodyTextStyle}>
              While you wait, you can{' '}
              <Link href={`https://traxon.com/products/${product}`} style={linkStyle}>
                view the full {productName} spec sheet
              </Link>{' '}
              or explore{' '}
              <Link href="https://traxon.com/case-studies" style={linkStyle}>
                how other companies are using the Scarab series
              </Link>.
            </Text>

            <Section style={ctaContainerStyle}>
              <Link href="https://traxon.com/contact?intent=demo" style={ctaStyle}>
                Book a Demo Call
              </Link>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              Questions? Reply to this email or call us at{' '}
              <Link href="tel:+18008729661" style={linkStyle}>+1 (800) TRAXON-1</Link>
            </Text>
            <Text style={footerTextStyle}>
              Traxon Industrial Carriers · 1200 Industrial Blvd, Houston, TX 77015
            </Text>
            <Text style={{ ...footerTextStyle, color: '#3a4458' }}>
              Reference: {reference} · {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// ─── Styles ────────────────────────────────────────────────────────────────

const bodyStyle = { backgroundColor: '#080a0d', margin: '0', padding: '20px 0', fontFamily: "'DM Sans', Arial, sans-serif" }
const containerStyle = { maxWidth: '560px', margin: '0 auto', backgroundColor: '#0e1218', border: '1px solid #1e2530' }
const headerStyle = { backgroundColor: '#080a0d', padding: '24px 32px', borderBottom: '1px solid #1e2530', textAlign: 'center' as const }
const logoStyle = { color: '#f0f3f7', fontSize: '28px', letterSpacing: '0.15em', margin: '0', fontFamily: 'Arial Black, Arial, sans-serif' }
const headerTagStyle = { color: '#6b7585', fontSize: '10px', letterSpacing: '0.25em', margin: '4px 0 0', textTransform: 'uppercase' as const }
const contentStyle = { padding: '32px' }
const h2Style = { color: '#f0f3f7', fontSize: '24px', fontWeight: '700', margin: '0 0 20px', letterSpacing: '-0.01em' }
const h3Style = { color: '#f0f3f7', fontSize: '16px', fontWeight: '600', margin: '0 0 16px', letterSpacing: '0.05em', textTransform: 'uppercase' as const }
const bodyTextStyle = { color: '#9aa4b2', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }
const labelStyle = { color: '#6b7585', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, margin: '0 0 4px', fontWeight: '500' }
const valueStyle = { color: '#e8ecf2', fontSize: '15px', margin: '0 0 16px', fontWeight: '500' }
const bulletStyle = { color: '#9aa4b2', fontSize: '14px', margin: '2px 0', paddingLeft: '8px' }
const colStyle = { paddingRight: '16px', width: '50%' }
const hrStyle = { borderColor: '#1e2530', margin: '24px 0' }
const refBoxStyle = { backgroundColor: '#141820', border: '1px solid #00c2ff22', padding: '16px', margin: '20px 0' }
const linkStyle = { color: '#00c2ff' }
const ctaContainerStyle = { textAlign: 'center' as const, margin: '24px 0' }
const ctaStyle = { backgroundColor: '#00c2ff', color: '#080a0d', fontSize: '12px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase' as const, padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }
const footerStyle = { backgroundColor: '#080a0d', padding: '20px 32px', borderTop: '1px solid #1e2530', textAlign: 'center' as const }
const footerTextStyle = { color: '#6b7585', fontSize: '12px', lineHeight: '1.5', margin: '4px 0' }
