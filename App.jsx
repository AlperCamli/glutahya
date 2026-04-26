
const { useState, useEffect } = React;

function App() {
  const [tweaks, setTweaks] = useState(window.TWEAK_DEFAULTS || {});

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaks(t => ({ ...t, _showTweaks: true }));
      if (e.data?.type === '__deactivate_edit_mode') setTweaks(t => ({ ...t, _showTweaks: false }));
    });
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  }, []);

  return (
    <div>
      <Nav />
      <HeroSection tweaks={tweaks} />
      <WhyHabitSection />
      <GlowMovementSection />
      <ProductsSection />
      <CombosSection />
      <ChallengeSection tweaks={tweaks} />
      <HowToSection />
      <SocialSection />
      <CTASection />
      {tweaks._showTweaks && (
        <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} />
      )}
    </div>
  );
}

function TweaksPanel({ tweaks, setTweaks }) {
  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, background: 'rgba(15,15,28,0.95)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '24px', width: '280px', fontFamily: 'DM Sans, sans-serif', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#f5f0e8', letterSpacing: '0.05em' }}>Tweaks</span>
        <button onClick={() => setTweaks(t => ({ ...t, _showTweaks: false }))} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '18px', padding: 0 }}>×</button>
      </div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>Challenge</div>
      <button onClick={() => { localStorage.removeItem('vg_challenge_days'); window.location.reload(); }} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '13px', marginBottom: '8px' }}>Reset Challenge</button>
      <button onClick={() => { localStorage.setItem('vg_challenge_days', JSON.stringify([1,2,3,4,5,6,7,8,9,10,11,12,13,14])); window.location.reload(); }} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '13px', marginBottom: '8px' }}>Simulate Day 14</button>
      <button onClick={() => { localStorage.setItem('vg_challenge_days', JSON.stringify([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21])); window.location.reload(); }} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '13px', marginBottom: '20px' }}>Simulate Day 21</button>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '12px' }}>↑ Top</button>
        <button onClick={() => document.getElementById('challenge')?.scrollIntoView({ behavior: 'smooth' })} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '12px' }}>Challenge</button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
