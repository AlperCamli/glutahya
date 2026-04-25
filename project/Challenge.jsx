
const { useState, useEffect, useRef } = React;
const _r = (id, path) => (window.__resources && window.__resources[id]) || path;

function useRevealC() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const MILESTONES = {
  1:  { label: 'Day 1', icon: '✦', msg: 'Your ritual begins. The first step is the most powerful.' },
  7:  { label: 'Week 1', icon: '◈', msg: 'Skin is beginning to feel softer. Keep going — you\'re building real change.' },
  14: { label: 'Halfway', icon: '◉', msg: 'Two weeks in. Your body skin is noticeably transformed.' },
  21: { label: 'Champion', icon: '★', msg: 'You did it. 21 days of showing up for your skin. This is your new glow.' },
};

function GlowMeter({ progress }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: T.lavender, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>Glow</span>
      <div style={{ width: '10px', height: '160px', background: 'rgba(0,0,0,0.06)', borderRadius: '10px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.8)' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${progress}%`, background: `linear-gradient(to top, ${T.lavender}, ${T.blue}, ${T.mint})`, borderRadius: '10px', transition: 'height 0.6s ease', boxShadow: `0 0 16px ${T.lavender}` }}></div>
      </div>
      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', fontStyle: 'italic', color: T.lavender }}>{Math.round(progress)}%</span>
    </div>
  );
}

function ProgressRing({ percent, size, stroke }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * percent / 100;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#ringGrad)" strokeWidth={stroke} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.6s ease' }} />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(78% 0.08 292)" />
          <stop offset="50%" stopColor="oklch(82% 0.07 228)" />
          <stop offset="100%" stopColor="oklch(84% 0.07 162)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ChallengeSection() {
  const [ref, visible] = useRevealC();
  const STORAGE_KEY = 'vg_challenge_days';
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  });
  const [hovered, setHovered] = useState(null);

  const toggle = (day) => {
    setCompleted(prev => {
      const next = prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const count = completed.length;
  const pct = (count / 21) * 100;
  let streak = 0;
  for (let i = 1; i <= 21; i++) { if (completed.includes(i)) streak++; else break; }
  const activeMilestone = [21, 14, 7, 1].find(m => count >= m);
  const ms = activeMilestone ? MILESTONES[activeMilestone] : null;

  return (
    <section id="challenge" style={{ background: `radial-gradient(ellipse 60% 60% at 80% 20%, oklch(78% 0.08 292 / 0.2) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 10% 80%, oklch(84% 0.07 162 / 0.18) 0%, transparent 60%), radial-gradient(ellipse 30% 30% at 50% 50%, oklch(82% 0.07 228 / 0.12) 0%, transparent 60%), #f1f2f8`, padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none', opacity: 0.5 }}></div>

      <div ref={ref} style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.9s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ width: '28px', height: '1px', background: 'rgba(0,0,0,0.15)' }}></span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: T.muted }}>The Heart of the Movement</span>
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px,5vw,68px)', fontWeight: 300, color: T.text, lineHeight: 1.08, marginBottom: '16px' }}>
            Your 21-Day<br/>
            <em style={{ fontStyle: 'italic', background: `linear-gradient(120deg, ${T.lavender}, ${T.blue}, ${T.mint})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Glow Challenge</em>
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: T.body, maxWidth: '480px', margin: '0 auto', lineHeight: 1.65 }}>
            Tap a day when you've completed your ritual. Watch your glow build with every check-in.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 200px', gap: '40px', alignItems: 'start' }}>

          {/* Main tracker */}
          <div>
            {/* Stats */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Days Done', value: count, unit: `/ 21` },
                { label: 'Streak', value: streak, unit: 'days' },
                { label: 'Progress', value: Math.round(pct), unit: '%' },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(255,255,255,0.95)', borderRadius: '16px', padding: '20px 24px', flex: 1, backdropFilter: 'blur(16px)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 300, color: T.text, lineHeight: 1 }}>
                    {s.value}<span style={{ fontSize: '16px', color: T.muted, marginLeft: '4px' }}>{s.unit}</span>
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: T.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '6px' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', marginBottom: '28px' }}>
              {Array.from({ length: 21 }, (_, i) => i + 1).map(day => {
                const done = completed.includes(day);
                const isMilestone = [7, 14, 21].includes(day);
                const isHovered = hovered === day;
                return (
                  <button key={day} onClick={() => toggle(day)}
                    onMouseEnter={() => setHovered(day)} onMouseLeave={() => setHovered(null)}
                    style={{
                      aspectRatio: '1', borderRadius: '14px',
                      background: done
                        ? `linear-gradient(135deg, ${T.lavender}, ${T.blue})`
                        : isHovered ? 'rgba(255,255,255,0.9)' : isMilestone ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.5)',
                      border: done
                        ? `1px solid ${T.lavender}`
                        : isMilestone ? `1px solid ${T.lavender}55` : '1px solid rgba(255,255,255,0.9)',
                      color: done ? '#fff' : isMilestone ? T.lavender : T.body,
                      fontFamily: done ? 'DM Sans, sans-serif' : 'Cormorant Garamond, serif',
                      fontSize: done ? '18px' : '20px',
                      fontWeight: done ? 700 : 300,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: done ? `0 4px 16px ${T.lavender}55` : isHovered ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
                      transform: isHovered && !done ? 'scale(1.07)' : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexDirection: 'column', gap: '2px',
                      backdropFilter: 'blur(12px)',
                    }}>
                    {done ? '✓' : day}
                    {isMilestone && !done && <span style={{ fontSize: '8px', letterSpacing: '0.08em', fontFamily: 'DM Sans, sans-serif', opacity: 0.7 }}>{day === 7 ? 'WK1' : day === 14 ? 'HALF' : 'END'}</span>}
                  </button>
                );
              })}
            </div>

            {/* Milestone message */}
            {ms && (
              <div style={{ background: 'rgba(255,255,255,0.8)', border: `1px solid ${T.lavender}44`, borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', backdropFilter: 'blur(16px)', boxShadow: `0 8px 32px ${T.lavender}22`, animation: 'expandIn 0.4s ease' }}>
                <span style={{ fontSize: '24px', background: `linear-gradient(135deg, ${T.lavender}, ${T.blue})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', flexShrink: 0 }}>{ms.icon}</span>
                <div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: T.lavender, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>{ms.label} Milestone Unlocked</div>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontStyle: 'italic', color: T.text }}>{ms.msg}</p>
                </div>
              </div>
            )}

            {count === 0 && (
              <div style={{ textAlign: 'center', padding: '20px', color: T.muted, fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }}>
                Tap any day above to begin tracking your ritual ↑
              </div>
            )}
          </div>

          {/* Progress ring */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ProgressRing percent={pct} size={140} stroke={8} />
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 300, color: T.text, lineHeight: 1 }}>{count}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: T.muted, letterSpacing: '0.1em' }}>DAYS</div>
              </div>
            </div>
            <GlowMeter progress={pct} />
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>Milestones</div>
            {Object.entries(MILESTONES).map(([day, m]) => {
              const unlocked = count >= parseInt(day);
              return (
                <div key={day} style={{ background: unlocked ? `linear-gradient(135deg, ${T.lavender}22, ${T.blue}18)` : 'rgba(255,255,255,0.5)', border: unlocked ? `1px solid ${T.lavender}44` : '1px solid rgba(255,255,255,0.9)', borderRadius: '14px', padding: '14px 16px', transition: 'all 0.4s ease', backdropFilter: 'blur(12px)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: unlocked ? T.lavender : T.muted, fontSize: '14px' }}>{m.icon}</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600, color: unlocked ? T.lavender : T.muted, letterSpacing: '0.05em' }}>{m.label}</span>
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: T.muted, letterSpacing: '0.08em' }}>Day {day}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowToSection() {
  const [ref, visible] = useRevealC();
  const steps = [
    { num: '01', title: 'Post-Shower Window', desc: 'Apply within 3 minutes of showering. Skin absorbs up to 70% more moisture when slightly damp. This is your optimal moment.', time: 'Right after shower' },
    { num: '02', title: 'Pair with Face Care', desc: 'Already moisturizing your face? Make body lotion the next step — same routine, full-body results. Habit stacking at its best.', time: 'Same routine' },
    { num: '03', title: 'Mirror Adjacent', desc: 'Keep your Gluta-Hya next to your mirror. Visibility = consistency. Out of sight, out of habit.', time: 'Daily reminder' },
  ];

  return (
    <section id="howto" style={{ background: `radial-gradient(ellipse 50% 50% at 90% 20%, oklch(86% 0.06 352 / 0.2) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 5% 80%, oklch(87% 0.07 58 / 0.18) 0%, transparent 60%), #f4f3f9`, padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>
      <div ref={ref} style={{ maxWidth: '1100px', margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.9s ease' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ width: '28px', height: '1px', background: 'rgba(0,0,0,0.15)' }}></span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: T.muted }}>How to Make It Stick</span>
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,4vw,56px)', fontWeight: 300, color: T.text, lineHeight: 1.1, marginBottom: '20px' }}>
              Turn moisturizing<br/>into a ritual,<br/>
              <em style={{ fontStyle: 'italic', background: `linear-gradient(120deg, ${T.blush}, ${T.lavender})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>not a reminder.</em>
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: T.body, lineHeight: 1.7 }}>
              The Gluta-Hya serum-lotion formula absorbs in seconds — no heavy residue, no waiting. That's how friction disappears and habits begin.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {steps.map((step, i) => (
              <div key={i}
                style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.72)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'transform 0.25s, box-shadow 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'; }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 300, lineHeight: 1, flexShrink: 0, background: `linear-gradient(135deg, ${T.lavender}, ${T.blue})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: 0.75 }}>{step.num}</div>
                <div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: T.lavender, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 600 }}>{step.time}</div>
                  <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 500, color: T.text, marginBottom: '8px' }}>{step.title}</h4>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: T.body, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  const [ref, visible] = useRevealC();
  const posts = [
    { handle: '@zeynep.glows', day: 'Day 14', img: _r('pink', 'uploads/pembe.webp'), text: 'Two weeks in and my skin literally glows in the morning light. Never going back.', color: T.blush },
    { handle: '@sofiaradiant', day: 'Day 7', img: _r('gold', 'uploads/sar\u0131.webp'), text: 'Day 7 streak! My tone is so much more even. The gold one is everything.', color: T.peach },
    { handle: '@a.wellness', day: 'Day 21', img: _r('blue', 'uploads/mavi.webp'), text: 'DONE. 21 days complete. The bumps on my arms? Gone. This challenge changed me.', color: T.blue },
    { handle: '@glowwithmia', day: 'Day 3', img: _r('orange', 'uploads/turuncu.webp'), text: 'Already obsessed with the SPF one for morning. Ritual unlocked.', color: T.peach },
  ];

  return (
    <section style={{ background: `radial-gradient(ellipse 50% 50% at 15% 25%, oklch(82% 0.07 228 / 0.2) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 85% 70%, oklch(86% 0.06 352 / 0.18) 0%, transparent 60%), #eef0f6`, padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.9s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ width: '28px', height: '1px', background: 'rgba(0,0,0,0.15)' }}></span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: T.muted }}>Community</span>
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,4.5vw,58px)', fontWeight: 300, color: T.text, lineHeight: 1.1, marginBottom: '12px' }}>
            The movement<br/>
            <em style={{ fontStyle: 'italic', background: `linear-gradient(120deg, ${T.lavender}, ${T.blue})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>is already growing.</em>
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: T.body, maxWidth: '380px', margin: '0 auto' }}>Real women. Real rituals. Real results.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '44px' }}>
          {posts.map((post, i) => (
            <div key={i}
              style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.95)', borderRadius: '20px', overflow: 'hidden', backdropFilter: 'blur(16px)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.09)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'; }}>
              <div style={{ background: `radial-gradient(circle at 60% 40%, ${post.color.replace(')', ' / 0.25)')} 0%, rgba(240,241,246,0.6) 100%)`, padding: '28px 20px', display: 'flex', justifyContent: 'center', minHeight: '170px', alignItems: 'center' }}>
                <img src={post.img} alt={post.handle} style={{ height: '120px', objectFit: 'contain', mixBlendMode: 'multiply', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.12))' }} />
              </div>
              <div style={{ padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: T.text }}>{post.handle}</span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: post.color, background: `${post.color.replace(')', ' / 0.12)')}`, borderRadius: '100px', padding: '3px 10px', fontWeight: 600, border: `1px solid ${post.color.replace(')', ' / 0.25)')}` }}>{post.day}</span>
                </div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: T.body, lineHeight: 1.6 }}>{post.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['#GlowUpMovement', '#21DayChallenge', '#VaselineGlutaHya', '#BodyGlow'].map(tag => (
              <span key={tag} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: T.lavender, letterSpacing: '0.04em', fontWeight: 500 }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const [ref, visible] = useRevealC();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section style={{ background: `${iridOrbs}, ${T.bg}`, padding: 'clamp(100px,12vw,160px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none', opacity: 0.6 }}></div>
      <div ref={ref} style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.9s ease' }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(13px,1.5vw,15px)', fontStyle: 'italic', color: T.lavender, letterSpacing: '0.04em', marginBottom: '24px' }}>21 days. 5 variants. 1 movement.</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px,6vw,80px)', fontWeight: 300, color: T.text, lineHeight: 1.05, marginBottom: '28px', letterSpacing: '-0.015em' }}>
          Your glow is<br/>
          <em style={{ fontStyle: 'italic', background: `linear-gradient(120deg, ${T.lavender}, ${T.blue}, ${T.mint})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>21 days away.</em>
        </h2>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', color: T.body, lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 48px', textWrap: 'pretty' }}>
          Start today. One pump, once a day, for three weeks. Your body will feel the difference — and so will you.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
          <button onClick={() => scrollTo('challenge')}
            style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '15px', background: T.dark, color: '#fff', border: 'none', borderRadius: '100px', padding: '18px 48px', cursor: 'pointer', letterSpacing: '0.05em', boxShadow: '0 8px 40px rgba(23,24,31,0.2)', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { e.target.style.transform='scale(1.05)'; e.target.style.boxShadow='0 16px 60px rgba(23,24,31,0.3)'; }}
            onMouseLeave={e => { e.target.style.transform='scale(1)'; e.target.style.boxShadow='0 8px 40px rgba(23,24,31,0.2)'; }}>
            Start My 21-Day Challenge
          </button>
          <button onClick={() => scrollTo('products')}
            style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '15px', background: 'rgba(255,255,255,0.72)', color: T.body, border: '1px solid rgba(255,255,255,0.95)', borderRadius: '100px', padding: '18px 40px', cursor: 'pointer', letterSpacing: '0.04em', backdropFilter: 'blur(16px)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', transition: 'background 0.2s' }}
            onMouseEnter={e => { e.target.style.background='rgba(255,255,255,0.95)'; }}
            onMouseLeave={e => { e.target.style.background='rgba(255,255,255,0.72)'; }}>
            Find My Variant
          </button>
        </div>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '40px' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 300, color: T.text, marginBottom: '4px' }}>Vaseline <em style={{ fontStyle: 'italic', color: T.muted }}>Gluta-Hya</em></div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Healthy Bright · Serum-Infused Body Lotion</div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ChallengeSection, HowToSection, SocialSection, CTASection });
