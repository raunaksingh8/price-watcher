import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landingpage.css';

/* ──────────────────────────────────────────────
   PriceDekhoApp — Landing Page Component
   ────────────────────────────────────────────── */

const STEPS = [
    {
        icon: '🔍',
        title: 'Search for an Item',
        desc: 'Type in any grocery or household item you need — from dal to detergent.',
    },
    {
        icon: '📍',
        title: 'See Nearby Prices',
        desc: 'Instantly compare prices from shops around you, sorted by distance and cost.',
    },
    {
        icon: '🏷️',
        title: 'Add a Price',
        desc: 'Spotted a great deal? Share it with the community and help everyone save.',
    },
];

const FEATURES = [
    {
        icon: '📌',
        title: 'Location-Based Comparisons',
        desc: 'Find the cheapest stores in your neighbourhood — no more guesswork.',
    },
    {
        icon: '🤝',
        title: 'Community-Powered Prices',
        desc: 'Real prices reported by real shoppers, kept fresh every day.',
    },
    {
        icon: '📈',
        title: 'Track Price Trends',
        desc: 'Watch how prices change over time and shop when the deal is right.',
    },
    {
        icon: '🆓',
        title: 'Completely Free',
        desc: 'No subscriptions, no hidden fees — just smarter shopping for everyone.',
    },
];

/* ── Navigation ─────────────────────────────── */
function Navbar({ onSignup, onLogin }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggle = useCallback(() => setMenuOpen((o) => !o), []);
    const close = useCallback(() => setMenuOpen(false), []);

    return (
        <nav className="navbar" role="navigation" aria-label="Main navigation">
            <div className="landing-container navbar-inner">
                {/* Logo */}
                <a href="/" className="navbar-logo" aria-label="PriceDekhoApp home">
                    {/* <span className="logo-icon">💰</span> */}
                    <span>
                        Price<span className="logo-highlight">Dekho</span>App
                    </span>
                </a>

                {/* Hamburger (mobile) */}
                <button
                    className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={toggle}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>

                {/* Overlay */}
                <div
                    className={`nav-overlay ${menuOpen ? 'visible' : ''}`}
                    onClick={close}
                    aria-hidden="true"
                />

                {/* Action buttons */}
                <div className={`navbar-actions ${menuOpen ? 'open' : ''}`}>
                    <button className="btn btn-ghost" onClick={onLogin}>
                        Login
                    </button>
                    <button className="btn btn-primary" onClick={onSignup}>
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
}

/* ── Hero ────────────────────────────────────── */
function Hero({ onGetStarted }) {
    return (
        <section className="hero" id="hero">
            <div className="landing-container hero-content">
                <span className="hero-badge">🚀 Smart grocery shopping starts here</span>

                <h1>
                    Find the <span className="gradient-text">Cheapest Stores</span> for
                    Your Everyday Essentials
                </h1>

                <p className="hero-subtitle">
                    Compare real-time prices from nearby shops, discover the best deals,
                    and help your community save money — all in one place.
                </p>

                <div className="hero-cta">
                    <button className="btn btn-primary btn-lg" onClick={onGetStarted}>
                        Get Started — It's Free
                    </button>
                </div>
            </div>
        </section>
    );
}

/* ── How It Works ────────────────────────────── */
function HowItWorks() {
    return (
        <section className="how-it-works" id="how-it-works">
            <div className="landing-container">
                <header className="section-header">
                    <span className="section-label">How It Works</span>
                    <h2 className="section-title">Three Steps to Smarter Shopping</h2>
                    <p className="section-subtitle">
                        Finding the best deal has never been simpler.
                    </p>
                </header>

                <div className="steps-grid">
                    {STEPS.map((step, i) => (
                        <div className="step-card" key={i}>
                            <div className="step-number">
                                <span className="step-icon">{step.icon}</span>
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Why PriceDekhoApp ───────────────────────── */
function WhySection() {
    return (
        <section className="why-section" id="why">
            <div className="landing-container">
                <header className="section-header">
                    <span className="section-label">Why PriceDekhoApp</span>
                    <h2 className="section-title">Built for Smart Shoppers</h2>
                    <p className="section-subtitle">
                        Everything you need to shop smarter, powered by your community.
                    </p>
                </header>

                <div className="features-grid">
                    {FEATURES.map((f, i) => (
                        <div className="feature-card" key={i}>
                            <div className="feature-icon">{f.icon}</div>
                            <div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Footer ──────────────────────────────────── */
function Footer() {
    return (
        <footer className="landing-footer">
            <div className="landing-container">
                <div className="footer-logo">
                    Price<span className="logo-highlight">Dekho</span>App
                </div>
                <p className="footer-tagline">
                    Compare prices. Save money. Help your community.
                </p>
                <p className="footer-copy">
                    &copy; {new Date().getFullYear()} PriceDekhoApp. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

/* ── Main Landing Page ───────────────────────── */
export default function LandingPage() {
    const navigate = useNavigate();

    const handleSignup = () => navigate('/signup');
    const handleLogin = () => navigate('/login');

    return (
        <div className="landing-page">
            {/* Floating colour blobs for glassmorphism depth */}
            <div className="blob blob--cyan" aria-hidden="true" />
            <div className="blob blob--pink" aria-hidden="true" />
            <div className="blob blob--purple" aria-hidden="true" />

            <Navbar onSignup={handleSignup} onLogin={handleLogin} />
            <Hero onGetStarted={handleSignup} />
            <HowItWorks />
            <WhySection />
            <Footer />
        </div>
    );
}
