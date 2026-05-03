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

interface QuoteInternalProps {
  firstName: string
  lastName: string
  company: string
  email: string
  phone?: string
  message?: string
  product: string
  accessories: string[]
  industry: string
  payload: number
  width: number
  gradient: number
  reference: string
  submittedAt: string
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

export function QuoteInternalEmail({
  firstName,
  lastName,
  company,
  email,
  phone,
  message,
  product,
  accessories = [],
  industry,
  payload,
  width,
  gradient,
  reference,
  submittedAt,
}: QuoteInternalProps) {
  const productName = PRODUCT_NAMES[product] ?? product

  return (
    <Html lang="en">
      <Head>
        <title>New Quote: {company} — {productName} [{reference}]</title>
      </Head>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          {/* Alert header */}
          <Section style={alertHeaderStyle}>
            <Text style={alertTagStyle}>🔔 New Quote Request</Text>
            <Heading style={alertTitleStyle}>{company} — {productName}</Heading>
            <Text style={refStyle}>{reference} · {submittedAt}</Text>
          </Section>

          <Section style={contentStyle}>
            {/* Priority signal */}
            <Section style={priorityBoxStyle}>
              <Row>
                <Column>
                  <Text style={priorityLabelStyle}>Payload</Text>
                  <Text style={priorityValueStyle}>{payload.toLocaleString()} lbs</Text>
                </Column>
                <Column>
                  <Text style={priorityLabelStyle}>Width</Text>
                  <Text style={priorityValueStyle}>{width} mm</Text>
                </Column>
                <Column>
                  <Text style={priorityLabelStyle}>Product</Text>
                  <Text style={priorityValueStyle}>{productName}</Text>
                </Column>
                <Column>
                  <Text style={priorityLabelStyle}>Industry</Text>
                  <Text style={priorityValueStyle}>{industry}</Text>
                </Column>
              </Row>
            </Section>

            <Hr style={hrStyle} />

            {/* Contact info */}
            <Heading as="h3" style={sectionTitleStyle}>Contact</Heading>
            <Row>
              <Column style={colStyle}>
                <Text style={labelStyle}>Name</Text>
                <Text style={valueStyle}>{firstName} {lastName}</Text>
              </Column>
              <Column style={colStyle}>
                <Text style={labelStyle}>Company</Text>
                <Text style={valueStyle}>{company}</Text>
              </Column>
            </Row>
            <Row>
              <Column style={colStyle}>
                <Text style={labelStyle}>Email</Text>
                <Link href={`mailto:${email}`} style={linkStyle}>{email}</Link>
              </Column>
              <Column style={colStyle}>
                <Text style={labelStyle}>Phone</Text>
                <Text style={valueStyle}>{phone || '—'}</Text>
              </Column>
            </Row>

            <Hr style={hrStyle} />

            {/* Requirements */}
            <Heading as="h3" style={sectionTitleStyle}>Load Requirements</Heading>
            <Row>
              <Column style={colStyle}>
                <Text style={labelStyle}>Payload Weight</Text>
                <Text style={valueStyle}>{payload.toLocaleString()} lbs</Text>
              </Column>
              <Column style={colStyle}>
                <Text style={labelStyle}>Access Width</Text>
                <Text style={valueStyle}>{width} mm</Text>
              </Column>
            </Row>
            <Row>
              <Column style={colStyle}>
                <Text style={labelStyle}>Max Gradient</Text>
                <Text style={valueStyle}>{gradient}°</Text>
              </Column>
              <Column style={colStyle}>
                <Text style={labelStyle}>Industry</Text>
                <Text style={valueStyle}>{industry}</Text>
              </Column>
            </Row>

            <Hr style={hrStyle} />

            {/* Product config */}
            <Heading as="h3" style={sectionTitleStyle}>Requested Configuration</Heading>
            <Text style={labelStyle}>Product</Text>
            <Text style={{ ...valueStyle, color: '#00c2ff' }}>{productName}</Text>

            {accessories.length > 0 && (
              <>
                <Text style={labelStyle}>Accessories</Text>
                {accessories.map((acc) => (
                  <Text key={acc} style={bulletStyle}>
                    › {ACCESSORY_NAMES[acc] ?? acc}
                  </Text>
                ))}
              </>
            )}

            {message && (
              <>
                <Hr style={hrStyle} />
                <Heading as="h3" style={sectionTitleStyle}>Customer Message</Heading>
                <Section style={messageBoxStyle}>
                  <Text style={messageTextStyle}>{message}</Text>
                </Section>
              </>
            )}

            <Hr style={hrStyle} />

            {/* CTA */}
            <Section style={{ textAlign: 'center' as const, padding: '8px 0' }}>
              <Link href={`mailto:${email}?subject=Re: Your Traxon Quote Request [${reference}]`} style={ctaStyle}>
                Reply to {firstName} →
              </Link>
            </Section>
          </Section>

          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              Reference: {reference} · Submitted: {submittedAt}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// ─── Styles ────────────────────────────────────────────────────────────────

const bodyStyle = { backgroundColor: '#080a0d', margin: '0', padding: '20px 0', fontFamily: "'DM Sans', Arial, sans-serif" }
const containerStyle = { maxWidth: '580px', margin: '0 auto', backgroundColor: '#0e1218', border: '1px solid #1e2530' }
const alertHeaderStyle = { backgroundColor: '#0a1218', padding: '24px 32px', borderBottom: '2px solid #00c2ff' }
const alertTagStyle = { color: '#9aa4b2', fontSize: '12px', margin: '0 0 8px', letterSpacing: '0.1em' }
const alertTitleStyle = { color: '#f0f3f7', fontSize: '22px', margin: '0 0 6px', fontFamily: 'Arial Black, Arial, sans-serif', letterSpacing: '0.05em' }
const refStyle = { color: '#6b7585', fontSize: '12px', margin: '0', letterSpacing: '0.1em' }
const contentStyle = { padding: '28px 32px' }
const priorityBoxStyle = { backgroundColor: '#141820', border: '1px solid #1e2530', padding: '16px', marginBottom: '24px' }
const priorityLabelStyle = { color: '#6b7585', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, margin: '0 0 4px', fontWeight: '500' }
const priorityValueStyle = { color: '#00c2ff', fontSize: '16px', fontWeight: '700', margin: '0', fontFamily: 'Arial Black, Arial, sans-serif' }
const hrStyle = { borderColor: '#1e2530', margin: '20px 0' }
const sectionTitleStyle = { color: '#f0f3f7', fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, margin: '0 0 14px', fontWeight: '700' }
const labelStyle = { color: '#6b7585', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, margin: '0 0 4px' }
const valueStyle = { color: '#e8ecf2', fontSize: '14px', margin: '0 0 14px', fontWeight: '500' }
const bulletStyle = { color: '#9aa4b2', fontSize: '13px', margin: '3px 0', paddingLeft: '8px' }
const colStyle = { paddingRight: '16px', width: '50%' }
const linkStyle = { color: '#00c2ff', fontSize: '14px', display: 'block', marginBottom: '14px' }
const messageBoxStyle = { backgroundColor: '#141820', border: '1px solid #262e3a', padding: '16px', borderLeft: '3px solid #00c2ff44' }
const messageTextStyle = { color: '#9aa4b2', fontSize: '14px', lineHeight: '1.6', margin: '0', fontStyle: 'italic' }
const ctaStyle = { backgroundColor: '#00c2ff', color: '#080a0d', fontSize: '12px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase' as const, padding: '12px 28px', textDecoration: 'none', display: 'inline-block' }
const footerStyle = { backgroundColor: '#080a0d', padding: '16px 32px', borderTop: '1px solid #1e2530', textAlign: 'center' as const }
const footerTextStyle = { color: '#3a4458', fontSize: '11px', margin: '0' }
