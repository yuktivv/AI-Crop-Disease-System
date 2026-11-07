

import { useState } from 'react'
import Detection from './Detection'
import BackendStatus from './BackendStatus'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  if (currentPage === 'detection') {
    return (
      <>
        <button
          className="back-home"
          onClick={() => setCurrentPage('home')}
        >
          ← Back to Home
        </button>
        <Detection />
      </>
    )
  }

  return (
    <div className="app">
      <nav className="navbar">
        <a href="#" className="brand">
          <span className="brand-icon">✳</span>
          AGRO<span>VISION</span><small> AI</small>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#technology">Technology</a>
          <a href="#crops">Crops</a>
          <a href="#about">About</a>
        </div>

        <button
          className="nav-button"
          onClick={() => setCurrentPage('detection')}
        >
          Get Started ↗
        </button>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="pulse"></span>
              INTELLIGENCE FOR EVERY CROP
            </div>

            <h1>
              The Future of<br />
              Farming is <span>Intelligent.</span>
            </h1>

            <p>
              Detect crop diseases, understand plant health and make
              smarter farming decisions with AI-powered technology.
            </p>

            <div className="hero-actions">
              <button
                className="primary-btn"
                onClick={() => setCurrentPage('detection')}
              >
                Explore AI Detection <span>↗</span>
              </button>

              <a href="#technology" className="secondary-btn">
                Discover Technology →
              </a>
            </div>

            <div className="trust-line">
              <span>✳</span> SMARTER INSIGHTS. HEALTHIER CROPS.
            </div>

            <BackendStatus />
          </div>

          <div className="hero-visual">
            <div className="visual-glow"></div>
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>

            <div className="scan-card">
              <div className="scan-top">
                <span>◉ LIVE AI SCAN</span>
                <span className="live-dot">● LIVE</span>
              </div>

              <div className="leaf-visual">
                <div className="scan-ring"></div>
                <div className="leaf-symbol">❋</div>
                <div className="scan-line"></div>
                <span className="scan-point point-one"></span>
                <span className="scan-point point-two"></span>
              </div>

              <div className="scan-bottom">
                <div>
                  <small>AI ENGINE</small>
                  <strong>Plant Intelligence</strong>
                </div>
                <span className="scan-status">SYSTEM READY</span>
              </div>
            </div>

            <div className="floating-tag tag-top">
              <span>✳</span> AI POWERED
            </div>

            <div className="floating-tag tag-bottom">
              <span>↗</span> PRECISION AGRICULTURE
            </div>
          </div>
        </section>

        <section className="stats">
          <div>
            <strong>04</strong>
            <span>Target Crops</span>
          </div>
          <div>
            <strong>AI</strong>
            <span>Intelligent Detection</span>
          </div>
          <div>
            <strong>360°</strong>
            <span>Crop Monitoring Vision</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Digital Accessibility</span>
          </div>
        </section>

        <section className="technology" id="technology">
          <span className="section-label">01 / OUR TECHNOLOGY</span>
          <h2>See Beyond the <span>Surface.</span></h2>
          <p>
            Bringing artificial intelligence closer to agriculture
            through intelligent disease detection and crop monitoring.
          </p>

          <div className="feature-grid">
            <article className="feature-card">
              <span className="feature-icon">⌕</span>
              <h3>AI Disease Detection</h3>
              <p>Analyze crop leaf images and identify possible diseases.</p>
            </article>

            <article className="feature-card">
              <span className="feature-icon">◉</span>
              <h3>Severity Analysis</h3>
              <p>Understand the estimated level of disease impact.</p>
            </article>

            <article className="feature-card">
              <span className="feature-icon">⌁</span>
              <h3>Smart Monitoring</h3>
              <p>Track crop health and explore weather-based risk insights.</p>
            </article>
          </div>
        </section>

        <section className="crops" id="crops">
          <span className="section-label">02 / SUPPORTED CROPS</span>
          <h2>Built Around <span>Your Crops.</span></h2>

          <div className="crop-grid">
            {['Wheat', 'Maize', 'Rice', 'Cotton'].map((crop, index) => (
              <div className="crop-card" key={crop}>
                <span>0{index + 1}</span>
                <h3>{crop}</h3>
                <p>AI-powered crop health insights</p>
                <span className="crop-arrow">↗</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer id="about">
        <a href="#" className="brand">
          <span className="brand-icon">✳</span>
          AGRO<span>VISION</span><small> AI</small>
        </a>
        <p>Intelligence for Every Crop. © 2026 AGROVISION AI.</p>
      </footer>
    </div>
  )
}

export default App

