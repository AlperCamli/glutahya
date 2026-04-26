
const { useState, useRef, useEffect } = React;
const _r = (id, path) => (window.__resources && window.__resources[id]) || path;
const useIsMobile = window.useIsMobile;

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
      <span style={{ width: '28px', height: '1px', background: 'rgba(0,0,0,0.15)' }}></span>
      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: T.muted, fontWeight: 500 }}>{text}</span>
    </div>
  );
}

function WhyHabitSection() {
  const [ref, visible] = useReveal();
  const isMobile = useIsMobile(768);
  const signals = [
    { icon: '◑', label: 'Dullness', desc: 'Skin that looks flat or lifeless — even after sleep.', color: T.lavender },
    { icon: '◻', label: 'Dryness', desc: 'Tight, flaky patches — your skin barrier calling for help.', color: T.blue },
    { icon: '◈', label: 'Roughness', desc: 'Bumpy texture or uneven areas on arms and legs.', color: T.mint },
    { icon: '◎', label: 'Tightness', desc: 'That stretched feeling after a shower — lost moisture.', color: T.peach },
  ];

  return (
    <section id="why" style={{ background: `radial-gradient(ellipse 60% 50% at 80% 20%, oklch(84% 0.07 162 / 0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 10% 80%, oklch(78% 0.08 292 / 0.18) 0%, transparent 60%), #f2f2f8`, padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.9s ease' }}>

        {/* Top row: text + signal cards */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '80px', alignItems: 'center', marginBottom: '48px' }}>
          <div>
            <SectionLabel text="Why Your Body Needs This" />
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(38px,4.5vw,62px)', fontWeight: 300, color: T.text, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.01em' }}>
              Your face gets<br/>
              <em style={{ fontStyle: 'italic', background: `linear-gradient(120deg, ${T.blush}, ${T.lavender})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>all the attention.</em><br/>
              Your body<br/>deserves the same.
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: T.body, lineHeight: 1.72, maxWidth: '400px' }}>
              Most skincare routines stop at the neckline. But your body skin loses moisture daily — without consistent care, it signals with dullness, dryness, and roughness.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {signals.map(s => (
              <div key={s.label}
                style={{ background: 'rgba(255,255,255,0.72)', borderRadius: '20px', padding: '28px 24px', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'transform 0.25s, box-shadow 0.25s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'; }}>
                <div style={{ fontSize: '22px', color: s.color, marginBottom: '12px' }}>{s.icon}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 500, color: T.text, marginBottom: '8px' }}>{s.label}</div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: T.body, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Before / After */}
        <div style={{ background: 'rgba(255,255,255,0.75)', borderRadius: '24px', padding: isMobile ? '32px 24px' : '48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto 1fr', gap: isMobile ? '24px' : '40px', alignItems: 'center', border: '1px solid rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
          <div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>Before</div>
            {['Tight after showering', 'Grey, flat appearance', 'Rough to the touch', 'Feels uncomfortable'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ width: '16px', height: '1px', background: 'rgba(0,0,0,0.15)', flexShrink: 0 }}></span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: T.muted }}>{t}</span>
              </div>
            ))}
          </div>

          {/* Separator */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <div style={{ width: isMobile ? '40px' : '1px', height: isMobile ? '1px' : '40px', background: `linear-gradient(to ${isMobile ? 'right' : 'bottom'}, transparent, ${T.lavender})` }}></div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `linear-gradient(135deg, ${T.lavender}, ${T.blue})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#fff', flexShrink: 0, boxShadow: `0 8px 24px oklch(78% 0.08 292 / 0.3)` }}>{isMobile ? '↓' : '→'}</div>
            <div style={{ width: isMobile ? '40px' : '1px', height: isMobile ? '1px' : '40px', background: `linear-gradient(to ${isMobile ? 'left' : 'top'}, transparent, ${T.mint})` }}></div>
          </div>

          <div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', background: `linear-gradient(90deg, ${T.lavender}, ${T.mint})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 600 }}>Day 21</div>
            {['Soft, hydrated all day', 'Radiant, luminous glow', 'Visibly smooth texture', 'Confident in your skin'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ width: '16px', height: '1px', background: `${T.mint}`, flexShrink: 0 }}></span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: T.body, fontWeight: 500 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GlowMovementSection() {
  const [ref, visible] = useReveal();
  const isMobile = useIsMobile(768);
  const quotes = [
    { text: 'I never thought body lotion could change how I feel about myself. Day 14 was the moment I noticed.', handle: '@zeynep.glows' },
    { text: 'Treating my body care like my skincare routine was a game-changer. My skin has never felt this alive.', handle: '@sofiaradiant' },
    { text: 'The ritual became meditative. It\'s not just lotion — it\'s 5 minutes of showing up for yourself.', handle: '@a.wellness' },
  ];
  const slogans = ['Glow is a habit, not a gift.', 'Head-to-toe radiance.', 'Your body, your ritual.', '21 days. Real results.', 'Science meets self-care.'];

  return (
    <section id="movement" style={{ background: `radial-gradient(ellipse 50% 60% at 90% 30%, oklch(86% 0.06 352 / 0.25) 0%, transparent 60%), radial-gradient(ellipse 45% 55% at 5% 70%, oklch(82% 0.07 228 / 0.2) 0%, transparent 60%), #eeeef5`, padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', overflow: 'hidden', position: 'relative' }}>
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.9s ease' }}>
        <div style={{ maxWidth: '740px', marginBottom: '60px' }}>
          <SectionLabel text="The Glow Up Movement" />
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(42px,5vw,72px)', fontWeight: 300, color: T.text, lineHeight: 1.08, marginBottom: '28px', letterSpacing: '-0.015em' }}>
            This isn't just<br/>moisturizing.<br/>
            <em style={{ fontStyle: 'italic', background: `linear-gradient(120deg, ${T.lavender}, ${T.blue}, ${T.mint})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>It's a movement.</em>
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', color: T.body, lineHeight: 1.7, maxWidth: '520px' }}>
            Thousands of women are reclaiming their body care ritual. One pump. Every day. For 21 days. The science is clear: it takes 21 days to build a habit that lasts a lifetime.
          </p>
        </div>

        {/* Slogan ticker */}
        <div style={{ overflow: 'hidden', marginBottom: '60px' }}>
          <div style={{ display: 'flex', gap: '48px', animation: 'ticker 18s linear infinite', whiteSpace: 'nowrap' }}>
            {[...slogans, ...slogans, ...slogans].map((s, i) => (
              <span key={i} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px,2.5vw,28px)', fontStyle: 'italic', color: i % 2 === 0 ? T.muted : T.lavender, letterSpacing: '0.02em', flexShrink: 0 }}>{s} ·</span>
            ))}
          </div>
        </div>

        {/* Quote cards */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '18px', marginBottom: '52px' }}>
          {quotes.map((q, i) => (
            <div key={i}
              style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.95)', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.05)'; }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', color: T.lavender, lineHeight: 0.8, marginBottom: '16px' }}>"</div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontStyle: 'italic', color: T.text, lineHeight: 1.6, marginBottom: '20px' }}>{q.text}</p>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: T.lavender, letterSpacing: '0.05em', fontWeight: 500 }}>{q.handle}</span>
            </div>
          ))}
        </div>

        {/* Hashtags */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['#GlowUpMovement', '#21DayChallenge', '#VaselineGlutaHya', '#BodyGlow', '#HealthyBright'].map(tag => (
            <span key={tag} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: T.body, background: 'rgba(255,255,255,0.75)', borderRadius: '100px', padding: '8px 18px', border: '1px solid rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', letterSpacing: '0.02em' }}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  { id: 'gold', name: 'Flawless Bright', sub: 'Anti-Spot & Brightening', color: T.peach, image: _r('gold', 'project/uploads/sarı.webp'), concern: 'Dark spots & uneven tone', benefit: 'Visibly reduces dark spots in 5 days', ingredients: ['GlutaGlow Complex', 'Hyaluronic Acid', 'Pro-Retinol'], moment: 'Morning — before getting dressed', tag: 'Anti-Spot' },
  { id: 'pink', name: 'Dewy Radiance', sub: 'Glow & Hydration Booster', color: T.blush, image: _r('pink', 'project/uploads/pembe.webp'), concern: 'Dullness & loss of luminosity', benefit: 'Luminous skin in 5 days', ingredients: ['GlutaGlow Complex', 'Hyaluronic Acid', 'Niacinamide'], moment: 'Everyday glow — morning or night', tag: 'Glow Boost' },
  { id: 'blue', name: 'Smoothing Perfector', sub: 'Texture & Renewal Formula', color: T.blue, image: _r('blue', 'project/uploads/mavi.webp'), concern: 'Rough texture & body acne', benefit: 'Renewed, smooth skin in 5 days', ingredients: ['GlutaGlow Complex', 'Hyaluronic Acid', 'AHA · BHA · PHA'], moment: 'Post-shower — after exfoliating', tag: 'Smooth + Renew' },
  { id: 'red', name: 'Pro Age Restore', sub: 'Firming & Elasticity Formula', color: T.blush, image: _r('red', 'project/uploads/kırmızı.webp'), concern: 'Loss of firmness & elasticity', benefit: 'Firmer, more elastic skin in 5 days', ingredients: ['GlutaGlow Complex', 'Hyaluronic Acid', 'Collagen Booster'], moment: 'Evening — night ritual', tag: 'Firm & Restore' },
  { id: 'orange', name: 'SPF 50 Shield', sub: 'Daily Sun Protection + Glow', color: T.peach, image: _r('orange', 'project/uploads/turuncu.webp'), concern: 'Sun damage & UV-induced spots', benefit: 'UVA + UVB protection with glow', ingredients: ['GlutaGlow Complex', 'Hyaluronic Acid', 'UVA/UVB Filters SPF50'], moment: 'Morning — before going outdoors', tag: 'Daily Protection' },
];

function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: 'rgba(255,255,255,0.7)', border: `1px solid ${expanded ? product.color + '66' : 'rgba(255,255,255,0.95)'}`, borderRadius: '24px', padding: '32px 28px', cursor: 'pointer', transition: 'all 0.35s ease', transform: hovered ? 'translateY(-6px)' : 'none', boxShadow: hovered || expanded ? '0 20px 60px rgba(0,0,0,0.09)' : '0 4px 20px rgba(0,0,0,0.05)', backdropFilter: 'blur(16px)' }}
    >
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <div style={{ position: 'relative', width: '90px', flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', background: `radial-gradient(circle, ${product.color.replace(')', ' / 0.25)')} 0%, transparent 70%)`, filter: 'blur(8px)' }}></div>
          <img src={product.image} alt={product.name} style={{ width: '90px', objectFit: 'contain', position: 'relative', transform: hovered ? 'translateY(-4px) scale(1.04)' : 'none', transition: 'transform 0.4s ease', mixBlendMode: 'multiply' }} />
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: 600, color: product.color, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>{product.tag}</span>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 500, color: T.text, marginBottom: '4px', lineHeight: 1.2 }}>{product.name}</h3>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: T.muted, marginBottom: '12px' }}>{product.sub}</p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: T.body, lineHeight: 1.55 }}>{product.benefit}</p>
        </div>
        <div style={{ color: product.color, fontSize: '18px', transition: 'transform 0.3s', transform: expanded ? 'rotate(90deg)' : 'none', flexShrink: 0 }}>›</div>
      </div>
      {expanded && (
        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: `1px solid ${product.color}33`, animation: 'expandIn 0.3s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: product.color, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Skin Concern</div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: T.body, lineHeight: 1.5 }}>{product.concern}</p>
            </div>
            <div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: product.color, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Best Moment</div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: T.body, lineHeight: 1.5 }}>{product.moment}</p>
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: product.color, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 600 }}>Key Ingredients</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.ingredients.map(ing => (
                  <span key={ing} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', background: `${product.color.replace(')', ' / 0.12)')}`, color: product.color, borderRadius: '100px', padding: '5px 14px', border: `1px solid ${product.color.replace(')', ' / 0.25)')}` }}>{ing}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductsSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="products" style={{ background: `radial-gradient(ellipse 50% 50% at 20% 30%, oklch(87% 0.07 58 / 0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 85% 75%, oklch(78% 0.08 292 / 0.18) 0%, transparent 60%), #f3f2f8`, padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.9s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <SectionLabel text="The Gluta-Hya Family" />
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(38px,4.5vw,60px)', fontWeight: 300, color: T.text, lineHeight: 1.1, marginBottom: '16px' }}>
            Five formulas.<br/>
            <em style={{ fontStyle: 'italic', background: `linear-gradient(120deg, ${T.blush}, ${T.lavender})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>One ritual.</em>
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: T.body, maxWidth: '500px', margin: '0 auto', lineHeight: 1.65 }}>Each variant targets a specific skin need. Tap any card to discover the formula made for you.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '14px' }}>
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

const COMBOS = [
  { title: 'Night-Owl Set', desc: 'Deep repair and glow while you sleep.', products: [PRODUCTS[3], PRODUCTS[1]], accent: T.blush, tags: ['Firming', 'Radiance'] },
  { title: 'Beach-Ready Set', desc: 'Protect, brighten, and glow in the sun.', products: [PRODUCTS[0], PRODUCTS[4]], accent: T.peach, tags: ['Anti-Spot', 'SPF50'] },
  { title: 'Office Glow Set', desc: 'Smooth skin and daily luminosity.', products: [PRODUCTS[2], PRODUCTS[1]], accent: T.blue, tags: ['Smooth', 'Glow'] },
];

function CombosSection() {
  const [ref, visible] = useReveal();
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile(768);
  const c = COMBOS[active];

  return (
    <section style={{ background: `radial-gradient(ellipse 55% 55% at 10% 30%, oklch(82% 0.07 228 / 0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 90% 70%, oklch(84% 0.07 162 / 0.18) 0%, transparent 60%), #eef0f5`, padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.9s ease', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '48px', position: 'relative', zIndex: 2 }}>
          <SectionLabel text="Smart Combinations" />
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(38px,4.5vw,60px)', fontWeight: 300, color: T.text, lineHeight: 1.1, marginBottom: '16px' }}>
            Build your<br/>
            <em style={{ fontStyle: 'italic', position: 'relative', display: 'inline-block', color: T.text, zIndex: 0 }}>
              <span style={{ position: 'absolute', inset: '0 -0.08em', borderRadius: '999px', background: `linear-gradient(120deg, ${c.accent}, ${T.lavender})`, opacity: 0.28, filter: 'blur(14px)', transform: 'translateY(0.08em)', zIndex: -1, transition: 'background 0.45s ease, opacity 0.45s ease' }}></span>
              <span style={{ position: 'relative', zIndex: 1, color: c.accent, textShadow: '0 1px 0 rgba(255,255,255,0.75)', transition: 'color 0.35s ease' }}>body care wardrobe.</span>
            </em>
          </h2>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          {COMBOS.map((combo, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: i === active ? 600 : 400, background: i === active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)', color: i === active ? T.text : T.body, border: `1px solid ${i === active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)'}`, borderRadius: '100px', padding: '12px 28px', cursor: 'pointer', transition: 'all 0.3s ease', backdropFilter: 'blur(12px)', boxShadow: i === active ? '0 4px 20px rgba(0,0,0,0.08)' : 'none', minHeight: '48px' }}>{combo.title}</button>
          ))}
        </div>

        {/* Combo card */}
        <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.95)', borderRadius: '28px', padding: isMobile ? '32px 24px' : '48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : '48px', alignItems: 'center', boxShadow: '0 8px 48px rgba(0,0,0,0.06)', transition: 'all 0.5s ease' }}>
          <div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: 300, color: T.text, marginBottom: '12px' }}>{c.title}</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: T.body, lineHeight: 1.65, marginBottom: '24px' }}>{c.desc}</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
              {c.tags.map(t => <span key={t} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: c.accent, background: `${c.accent.replace(')', ' / 0.12)')}`, borderRadius: '100px', padding: '6px 16px', border: `1px solid ${c.accent.replace(')', ' / 0.3)')}` }}>{t}</span>)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {c.products.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.7)', borderRadius: '14px', padding: '14px 18px', border: '1px solid rgba(255,255,255,0.95)' }}>
                  <img src={p.image} alt={p.name} style={{ width: '44px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  <div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '17px', color: T.text }}>{p.name}</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: T.muted }}>{p.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product image preview */}
          {!isMobile && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
              {c.products.map((p, i) => (
                <React.Fragment key={p.id}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <div style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', background: `radial-gradient(circle, ${p.color.replace(')', ' / 0.2)')} 0%, transparent 70%)`, filter: 'blur(12px)' }}></div>
                      <img src={p.image} alt={p.name} style={{ height: '160px', objectFit: 'contain', position: 'relative', mixBlendMode: 'multiply' }} />
                    </div>
                    <span style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: p.color, marginTop: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{p.tag}</span>
                  </div>
                  {i === 0 && <div style={{ color: T.muted, fontSize: '28px', flexShrink: 0 }}>+</div>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { WhyHabitSection, GlowMovementSection, ProductsSection, CombosSection, PRODUCTS });
