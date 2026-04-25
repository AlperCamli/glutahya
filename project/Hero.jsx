
const { useState, useEffect, useRef } = React;

// Resource helper — uses bundled blob URLs when available, falls back to file paths in dev
const _r = (id, path) => (window.__resources && window.__resources[id]) || path;

const T = {
  bg: '#f0f1f6',
  bgAlt: '#ececf3',
  text: '#17181f',
  body: '#4a4b5a',
  muted: '#8a8b9e',
  lavender: 'oklch(78% 0.08 292)',
  mint: 'oklch(84% 0.07 162)',
  blue: 'oklch(82% 0.07 228)',
  blush: 'oklch(86% 0.06 352)',
  peach: 'oklch(87% 0.07 58)',
  dark: '#17181f',
};

const iridOrbs = `
  radial-gradient(ellipse 55% 70% at 15% 25%, oklch(78% 0.08 292 / 0.38) 0%, transparent 60%),
  radial-gradient(ellipse 45% 55% at 85% 15%, oklch(84% 0.07 162 / 0.28) 0%, transparent 60%),
  radial-gradient(ellipse 40% 50% at 65% 80%, oklch(82% 0.07 228 / 0.32) 0%, transparent 60%),
  radial-gradient(ellipse 30% 40% at 40% 55%, oklch(86% 0.06 352 / 0.22) 0%, transparent 60%),
  radial-gradient(ellipse 35% 45% at 70% 40%, oklch(87% 0.07 58 / 0.2) 0%, transparent 55%)
`;

Object.assign(window, { T, iridOrbs });

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      padding: '0 40px', height: '68px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      backdropFilter: scrolled ? 'blur(28px) saturate(1.8)' : 'none',
      background: scrolled ? 'rgba(240,241,246,0.88)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.7)' : 'none',
      transition: 'all 0.45s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 600, color: T.text, letterSpacing: '0.04em' }}>Vaseline</span>
        <span style={{ width: '1px', height: '14px', background: 'rgba(0,0,0,0.15)', margin: '0 2px' }}></span>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: 500, color: T.muted, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Gluta-Hya</span>
      </div>
      <div className="nav-links" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        {[['why', 'Why Habit'], ['movement', 'Movement'], ['products', 'Products'], ['challenge', 'Challenge']].map(([id, label]) => (
          <button key={id} onClick={() => scrollTo(id)} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: T.body, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.03em', padding: 0 }}>{label}</button>
        ))}
        <button onClick={() => scrollTo('challenge')} style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '13px', background: T.dark, color: '#fff', border: 'none', borderRadius: '100px', padding: '10px 26px', cursor: 'pointer', letterSpacing: '0.04em' }}>Join Now</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const products = [
    { img: _r('gold', 'uploads/sar\u0131.webp'), name: 'Flawless Bright', tag: 'Anti-Spot', color: T.peach },
    { img: _r('pink', 'uploads/pembe.webp'), name: 'Dewy Radiance', tag: 'Glow Boost', color: T.blush },
    { img: _r('blue', 'uploads/mavi.webp'), name: 'Smoothing Perfector', tag: 'Smooth + Renew', color: T.blue },
    { img: _r('red', 'uploads/k\u0131rm\u0131z\u0131.webp'), name: 'Pro Age Restore', tag: 'Firm & Restore', color: T.blush },
    { img: _r('orange', 'uploads/turuncu.webp'), name: 'SPF 50 Shield', tag: 'Daily Protection', color: T.peach },
  ];
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const t = setInterval(() => setActiveProduct(p => (p + 1) % products.length), 3200);
    return () => clearInterval(t);
  }, []);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const p = products[activeProduct];

  return (
    <section style={{ minHeight: '100vh', background: `${iridOrbs}, ${T.bg}`, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* Animated secondary orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, oklch(78% 0.08 292 / 0.22) 0%, transparent 65%)', filter: 'blur(60px)', animation: 'orbFloat1 9s ease-in-out infinite', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '5%', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, oklch(84% 0.07 162 / 0.2) 0%, transparent 65%)', filter: 'blur(50px)', animation: 'orbFloat2 11s ease-in-out infinite', pointerEvents: 'none' }}></div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(100px,14vw,140px) clamp(24px,5vw,60px) 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', width: '100%' }}>

        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px', background: 'rgba(255,255,255,0.65)', borderRadius: '100px', padding: '8px 18px', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: T.lavender, display: 'inline-block' }}></span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: T.body, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Glow Up Movement · 2024</span>
          </div>

          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(50px, 6vw, 86px)', fontWeight: 300, color: T.text, lineHeight: 1.04, marginBottom: '28px', letterSpacing: '-0.015em' }}>
            21 Days to<br/>
            <em style={{ fontStyle: 'italic', background: `linear-gradient(120deg, ${T.lavender}, ${T.blue}, ${T.mint})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Head-to-Toe</em><br/>
            Glow
          </h1>

          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(15px,1.5vw,17px)', color: T.body, lineHeight: 1.7, marginBottom: '14px', maxWidth: '440px' }}>
            Your body deserves the same ritual as your face. Build the habit that transforms your skin — in just 21 days.
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(17px,1.8vw,21px)', fontStyle: 'italic', color: T.lavender, marginBottom: '44px' }}>
            "Your Body Is Talking. Are You Listening?"
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => scrollTo('challenge')}
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '14px', background: T.dark, color: '#fff', border: 'none', borderRadius: '100px', padding: '16px 38px', cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 8px 32px rgba(23,24,31,0.18)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.target.style.transform='scale(1.04)'; e.target.style.boxShadow='0 12px 48px rgba(23,24,31,0.28)'; }}
              onMouseLeave={e => { e.target.style.transform='scale(1)'; e.target.style.boxShadow='0 8px 32px rgba(23,24,31,0.18)'; }}>
              Join the Challenge
            </button>
            <button onClick={() => scrollTo('movement')}
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '14px', background: 'rgba(255,255,255,0.65)', color: T.body, border: '1px solid rgba(255,255,255,0.9)', borderRadius: '100px', padding: '16px 38px', cursor: 'pointer', letterSpacing: '0.04em', backdropFilter: 'blur(12px)', transition: 'background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.9)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.65)'; }}>
              Explore the Movement
            </button>
          </div>

          <div style={{ display: 'flex', gap: '36px', marginTop: '52px', paddingTop: '36px', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
            {[['5', 'Variants'], ['21', 'Day Ritual'], ['5', 'Days to First Results']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 300, color: T.text, lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: T.muted, letterSpacing: '0.1em', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Product visual */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s' }}>
          <div style={{ position: 'absolute', width: '380px', height: '380px', borderRadius: '50%', background: `radial-gradient(circle, ${p.color.replace(')', ' / 0.18)')} 0%, transparent 65%)`, filter: 'blur(30px)', transition: 'background 0.8s ease', animation: 'orbFloat1 6s ease-in-out infinite' }}></div>
          <div style={{ position: 'absolute', width: '360px', height: '360px', borderRadius: '50%', border: `1.5px solid ${p.color.replace(')', ' / 0.35)')}`, transition: 'border-color 0.8s ease', animation: 'ringPulse 4s ease-in-out infinite' }}></div>
          <div style={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', border: `1px dashed ${p.color.replace(')', ' / 0.18)')}`, transition: 'border-color 0.8s ease' }}></div>

          <img key={activeProduct} src={p.img} alt={p.name} style={{ height: 'clamp(280px,35vw,400px)', objectFit: 'contain', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.14))', animation: 'bottleFloat 6s ease-in-out infinite', mixBlendMode: 'multiply' }} />

          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', borderRadius: '100px', padding: '10px 22px', whiteSpace: 'nowrap', transition: 'all 0.5s ease', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: T.lavender, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '8px' }}>{p.tag}</span>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: T.text, fontStyle: 'italic' }}>{p.name}</span>
          </div>

          <div style={{ position: 'absolute', right: '-16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {products.map((pr, i) => (
              <button key={i} onClick={() => setActiveProduct(i)} style={{ width: i === activeProduct ? '24px' : '8px', height: '8px', borderRadius: '100px', background: i === activeProduct ? T.lavender : 'rgba(0,0,0,0.15)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.35s ease' }}></button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', animation: 'fadeIn 1s ease 1.5s both' }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: T.muted, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Discover</span>
        <div style={{ width: '1px', height: '44px', background: `linear-gradient(to bottom, ${T.lavender}, transparent)` }}></div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, HeroSection });
