import { useState, useRef, useEffect } from 'react'

function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return <img src="/logo.svg" alt="Ilan Capital" width={size} height={size} className={`logo-icon ${className}`} />
}

const NAV_LINKS = ['Home', 'About Us', 'Services', 'Contact']

const STATS = [
  { value: '$12.4B', label: 'Assets Under Management' },
  { value: '26+', label: 'Years of Excellence' },
  { value: '340+', label: 'Institutional Clients' },
  { value: '98%', label: 'Client Retention Rate' },
]

const SERVICES = [
  {
    title: 'Wealth Management',
    desc: 'Personalised portfolio strategies tailored to your financial goals, risk tolerance, and time horizon.',
    img: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=400&fit=crop',
  },
  {
    title: 'Institutional Advisory',
    desc: 'Strategic counsel for endowments, pension funds, and family offices seeking consistent long-term returns.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
  },
  {
    title: 'Global Equity Research',
    desc: 'Proprietary insights across developed and emerging markets backed by a 40-analyst research desk.',
    img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
  },
  {
    title: 'Alternative Investments',
    desc: 'Access to private equity, real assets, and hedge fund strategies for qualified investors.',
    img: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=600&h=400&fit=crop',
  },
]

const TEAM = [
  {
    name: 'Victoria Chen',
    role: 'Managing Partner & CEO',
    bio: '20+ years in asset management. Former MD at Goldman Sachs.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'James Harrington',
    role: 'Chief Investment Officer',
    bio: 'Led $8B in allocations across public and private markets.',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Amara Osei',
    role: 'Head of Research',
    bio: 'PhD Economics, Oxford. 15 years of sell-side equity research.',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Daniel Reeves',
    role: 'Director, Client Relations',
    bio: 'Trusted advisor to 100+ family offices and endowments.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
]

const TRUSTED_LOGOS = [
  { name: 'Company 1', svg: <svg viewBox="0 0 120 30" fill="currentColor"><circle cx="12" cy="15" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M8 15h8M12 11v8" stroke="currentColor" strokeWidth="1.5"/><text x="26" y="20" fontSize="13" fontWeight="700" fontFamily="inherit">Company 1</text></svg> },
  { name: 'Company 2', svg: <svg viewBox="0 0 120 30" fill="currentColor"><rect x="3" y="7" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><text x="24" y="20" fontSize="13" fontWeight="700" fontFamily="inherit">Company 2</text></svg> },
  { name: 'Company 3', svg: <svg viewBox="0 0 120 30" fill="currentColor"><polygon points="11,4 20,24 2,24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/><text x="24" y="20" fontSize="13" fontWeight="700" fontFamily="inherit">Company 3</text></svg> },
  { name: 'Company 4', svg: <svg viewBox="0 0 120 30" fill="currentColor"><path d="M4 24V10l7-6 7 6v14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><text x="22" y="20" fontSize="13" fontWeight="700" fontFamily="inherit">Company 4</text></svg> },
  { name: 'Company 5', svg: <svg viewBox="0 0 120 30" fill="currentColor"><path d="M3 15a9 9 0 1 1 18 0 9 9 0 0 1-18 0z" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="12" cy="15" r="4" fill="currentColor"/><text x="24" y="20" fontSize="13" fontWeight="700" fontFamily="inherit">Company 5</text></svg> },
  { name: 'Company 6', svg: <svg viewBox="0 0 120 30" fill="currentColor"><rect x="3" y="8" width="7" height="14" rx="1" fill="currentColor" opacity="0.6"/><rect x="12" y="5" width="7" height="17" rx="1" fill="currentColor"/><text x="24" y="20" fontSize="13" fontWeight="700" fontFamily="inherit">Company 6</text></svg> },
  { name: 'Company 7', svg: <svg viewBox="0 0 120 30" fill="currentColor"><path d="M3 20 8 8l5 8 5-12 5 16" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/><text x="28" y="20" fontSize="13" fontWeight="700" fontFamily="inherit">Company 7</text></svg> },
  { name: 'Company 8', svg: <svg viewBox="0 0 120 30" fill="currentColor"><path d="M6 6h10v18H6z" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M6 12h10M11 6v18" stroke="currentColor" strokeWidth="1.2"/><text x="20" y="20" fontSize="13" fontWeight="700" fontFamily="inherit">Company 8</text></svg> },
]

const TESTIMONIALS = [
  {
    quote: 'Ilan has been our primary allocation partner for over a decade. Their discipline through volatile markets is unmatched.',
    name: 'Sarah Mitchell',
    title: 'CIO, Lakewood Family Office',
    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face',
  },
  {
    quote: 'The research team consistently surfaces alpha opportunities that other firms miss. Truly a best-in-class operation.',
    name: 'Richard Tanaka',
    title: 'Managing Director, Pacific Endowment',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
  {
    quote: 'Transparent, responsive, and fiercely aligned with our long-term goals. We trust Ilan completely.',
    name: 'Elena Vasquez',
    title: 'Treasurer, Horizon Foundation',
    img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face',
  },
]

type User = { id: string; email: string; name: string; role: string }

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ─── Shared conversation page (public, no auth required) ─── */

function SharedConversation({ sessionId }: { sessionId: string }) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/chat/sessions/${sessionId}`, { credentials: 'include' })
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then((data) => {
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages)
        } else {
          setError(true)
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [sessionId])

  return (
    <div className="shared-page">
      <header className="shared-header">
        <a className="logo" href="/">
          <LogoMark size={34} /> Ilan Capital
        </a>
      </header>
      <div className="shared-container">
        <div className="shared-panel">
          <div className="chat-panel-header">
            <LogoMark size={28} className="chat-panel-logo" />
            <span className="chat-panel-title">Ilan AI</span>
            <span className="shared-badge">Shared conversation</span>
          </div>
          <div className="chat-panel-body">
            {loading && <div className="shared-status">Loading conversation...</div>}
            {error && <div className="shared-status">Conversation not found.</div>}
            {messages.map((m, i) => (
              m.role === 'assistant'
                ? <div key={i} className="chat-bubble chat-bubble--bot" dangerouslySetInnerHTML={{ __html: m.content }} />
                : m.role === 'user'
                  ? <div key={i} className="chat-bubble chat-bubble--user">{m.content}</div>
                  : null
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Login / Register page ─── */

function LoginPage({ onLogin }: { onLogin: (user: User) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const reset = () => { setError(''); setEmail(''); setPassword(''); setName('') }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'register') {
        const regRes = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password, name }),
        })
        if (!regRes.ok) {
          const data = await regRes.json().catch(() => ({}))
          throw new Error(data.detail || 'Registration failed')
        }
      }

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || 'Invalid credentials')
      }
      const user = await res.json()
      onLogin(user)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <LogoMark size={48} />
          <h1>Ilan Capital</h1>
          <p>{mode === 'login' ? 'Sign in to your account' : 'Create a new account'}</p>
        </div>

        <div className="login-tabs">
          <button
            className={`login-tab ${mode === 'login' ? 'login-tab--active' : ''}`}
            onClick={() => { setMode('login'); reset() }}
            type="button"
          >
            Sign In
          </button>
          <button
            className={`login-tab ${mode === 'register' ? 'login-tab--active' : ''}`}
            onClick={() => { setMode('register'); reset() }}
            type="button"
          >
            Register
          </button>
        </div>

        <form onSubmit={submit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          {mode === 'register' && (
            <div className="login-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. James Whitfield"
                required
                autoFocus
              />
            </div>
          )}

          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoFocus={mode === 'login'}
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'register' ? 'Choose a password' : 'Enter your password'}
              required
            />
          </div>

          <button type="submit" className="btn btn--lg login-submit" disabled={loading}>
            {loading
              ? (mode === 'register' ? 'Creating account...' : 'Signing in...')
              : (mode === 'register' ? 'Create Account' : 'Sign In')
            }
          </button>
        </form>

        <p className="login-footer-text">
          Secure client portal &middot; Ilan Capital Group
        </p>
      </div>
    </div>
  )
}

/* ─── Chat widget ─── */

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([
    { from: 'bot', text: 'Welcome to Ilan Capital. How can I assist you today?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ session_id: sessionId, message: text }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setSessionId(data.session_id)
      setMessages((prev) => [...prev, { from: 'bot', text: data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: 'Sorry, something went wrong. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const shareConversation = () => {
    if (!sessionId) return
    const url = `${window.location.origin}/share/${sessionId}`
    navigator.clipboard.writeText(url)
    setShareUrl(url)
    setShowShareModal(true)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {open && (
        <div className="chat-panel">
          <div className="chat-panel-header">
            <LogoMark size={28} className="chat-panel-logo" />
            <span className="chat-panel-title">Ilan AI</span>
            <div className="chat-panel-header-actions">
              <button className="chat-panel-close" onClick={() => setOpen(false)} aria-label="Close chat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="chat-panel-body">
            {messages.map((m, i) => (
              m.from === 'bot'
                ? <div key={i} className="chat-bubble chat-bubble--bot" dangerouslySetInnerHTML={{ __html: m.text }} />
                : <div key={i} className="chat-bubble chat-bubble--user">{m.text}</div>
            ))}
            {loading && messages[messages.length - 1]?.from === 'user' && (
              <div className="chat-bubble chat-bubble--bot chat-bubble--typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}
            <div ref={endRef} />
          </div>
          {sessionId && (
            <div className="chat-share-bar">
              <button className="chat-share-btn" onClick={shareConversation}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                {copied ? 'Link Copied!' : 'Share Chat Snapshot'}
              </button>
            </div>
          )}
          <div className="chat-panel-composer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Message Ilan AI…"
              disabled={loading}
            />
            <button className={`chat-send ${input.trim() ? 'chat-send--active' : ''}`} onClick={send} aria-label="Send" disabled={!input.trim() || loading}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {showShareModal && shareUrl && (
        <div className="share-modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Chat Snapshot Link</h3>
              <button className="share-modal-close" onClick={() => setShowShareModal(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="share-modal-desc">Anyone with this link can view this conversation:</p>
            <div className="share-modal-url-box">
              <a href={shareUrl} target="_blank" rel="noopener noreferrer">{shareUrl}</a>
            </div>
            <div className="share-modal-actions">
              <button className="btn btn--sm" onClick={() => { navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <button className="btn btn--sm btn--outline share-modal-open" onClick={() => window.open(shareUrl, '_blank')}>
                Open in New Tab
              </button>
            </div>
          </div>
        </div>
      )}
      <button className="chat-fab" onClick={() => setOpen((o) => !o)} aria-label="Ask AI">
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Ask AI
          </>
        )}
      </button>
    </>
  )
}

/* ─── Main site ─── */

function MainSite({ user, onLogout, onLoginClick }: { user: User | null; onLogout: () => void; onLoginClick: () => void }) {
  const [mobileNav, setMobileNav] = useState(false)

  return (
    <>
      {/* ── Header ── */}
      <header className="header">
        <div className="container header-inner">
          <a className="logo" href="#" onClick={() => scrollTo('home')}>
            <LogoMark size={34} /> Ilan Capital
          </a>
          <button className="nav-toggle" onClick={() => setMobileNav((v) => !v)} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <nav className={`nav ${mobileNav ? 'nav--open' : ''}`}>
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => { setMobileNav(false); scrollTo(l.toLowerCase().replace(/\s+/g, '-')) }}
              >
                {l}
              </a>
            ))}
            {user ? (
              <div className="nav-user">
                <span className="nav-user-name">{user.name}</span>
                <span className={`nav-user-role nav-user-role--${user.role}`}>{user.role}</span>
                <button className="btn btn--sm btn--outline nav-logout" onClick={onLogout}>Sign Out</button>
              </div>
            ) : (
              <button className="btn btn--sm" onClick={() => { setMobileNav(false); onLoginClick() }}>
                Log In
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="container hero-inner">
          <div className="hero-text">
            <p className="hero-eyebrow">Trusted Since 2000</p>
            <h1>Building Legacies Through Intelligent Investing</h1>
            <p>
              For over two decades, Ilan Capital Group has delivered disciplined, research-driven
              strategies that preserve and grow wealth across generations.
            </p>
            <div className="hero-actions">
              <button className="btn btn--lg" onClick={() => scrollTo('contact')}>Schedule a Consultation</button>
              <button className="btn btn--outline btn--lg" onClick={() => scrollTo('services')}>Our Approach</button>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop"
              alt="Executive team in a strategy meeting"
            />
          </div>
        </div>
      </section>

      {/* ── Trusted By ── */}
      <section className="trusted">
        <p className="trusted-label">Trusted by leading institutions worldwide</p>
        <div className="marquee">
          <div className="marquee-track">
            {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((l, i) => (
              <span key={`${l.name}-${i}`} className="marquee-item" aria-label={l.name}>{l.svg}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats">
        <div className="container stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section className="section" id="about-us">
        <div className="container two-col">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=700&h=500&fit=crop"
              alt="Partners discussing strategy in a corner office"
            />
          </div>
          <div className="about-content">
            <p className="section-eyebrow">About the Firm</p>
            <h2 className="section-title">Who We Are</h2>
            <p>
              Founded in 2000, Ilan Capital Group is a privately held investment management firm
              headquartered in New York. We serve a select group of institutional investors, family
              offices, and high-net-worth individuals who demand rigorous analysis and transparent
              stewardship of their assets.
            </p>
            <p>
              Our philosophy is simple: combine deep fundamental research with disciplined risk
              management, and let compounding do the rest. Every decision we make is guided by a
              fiduciary mindset and a long-term horizon.
            </p>
            <div className="about-values">
              <div className="value-card"><strong>Integrity</strong><span>Transparency in every interaction.</span></div>
              <div className="value-card"><strong>Discipline</strong><span>Process over prediction.</span></div>
              <div className="value-card"><strong>Partnership</strong><span>Your goals are our mandate.</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section section--alt" id="services">
        <div className="container">
          <p className="section-eyebrow center">Our Capabilities</p>
          <h2 className="section-title center">What We Offer</h2>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="service-card">
                <div className="service-img">
                  <img src={s.img} alt={s.title} />
                </div>
                <div className="service-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <a href="#contact" className="service-link" onClick={() => scrollTo('contact')}>Learn more →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section" id="team">
        <div className="container">
          <p className="section-eyebrow center">Our People</p>
          <h2 className="section-title center">Leadership</h2>
          <div className="team-grid">
            {TEAM.map((t) => (
              <div key={t.name} className="team-card">
                <img className="team-avatar" src={t.img} alt={t.name} />
                <h4>{t.name}</h4>
                <p className="team-role">{t.role}</p>
                <p className="team-bio">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section section--alt" id="testimonials">
        <div className="container">
          <p className="section-eyebrow center">Client Voices</p>
          <h2 className="section-title center">What Our Clients Say</h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-card">
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <img src={t.img} alt={t.name} />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact / CTA ── */}
      <section className="cta" id="contact">
        <div className="container cta-inner">
          <h2>Ready to Start a Conversation?</h2>
          <p>
            Whether you are an institutional allocator or an individual investor, we would love to
            learn about your objectives. Reach out and a member of our team will be in touch within
            24 hours.
          </p>
          <div className="cta-form">
            <input type="text" placeholder="Full name" />
            <input type="email" placeholder="Email address" />
            <button className="btn btn--gold">Request a Meeting</button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <LogoMark size={34} /> Ilan Capital Group
            </div>
            <div className="footer-cols">
              <div>
                <h5>Company</h5>
                <a href="#about-us">About Us</a>
                <a href="#team">Leadership</a>
                <a href="#">Careers</a>
              </div>
              <div>
                <h5>Services</h5>
                <a href="#services">Wealth Management</a>
                <a href="#services">Advisory</a>
                <a href="#services">Research</a>
              </div>
              <div>
                <h5>Contact</h5>
                <a href="#">info@ilancap.com</a>
                <a href="#">+1 (212) 555-0140</a>
                <a href="#">New York, NY</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Ilan Capital Group, LLC. All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Disclosures</a>
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </>
  )
}

/* ─── App root -- router ─── */

export default function App() {
  const shareMatch = window.location.pathname.match(/^\/share\/(.+)$/)
  if (shareMatch) {
    return <SharedConversation sessionId={shareMatch[1]} />
  }
  const loginMatch = window.location.pathname === '/login'
  if (loginMatch) {
    return <LoginRoute />
  }
  return <SiteWithAuth />
}

function LoginRoute() {
  const handleLogin = (user: User) => {
    void user
    window.location.href = '/'
  }
  return <LoginPage onLogin={handleLogin} />
}

function SiteWithAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => { if (!r.ok) throw new Error(); return r.json() })
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setChecking(false))
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    setUser(null)
  }

  const handleLoginClick = () => {
    window.location.href = '/login'
  }

  if (checking) {
    return null
  }

  return <MainSite user={user} onLogout={handleLogout} onLoginClick={handleLoginClick} />
}
