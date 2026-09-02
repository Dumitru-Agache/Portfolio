import { useState } from 'react'
import About from './components/about'
import Navbar from './components/navbar'
import Projects from './components/projects'
import Contact from './components/contact'

function App() {
  const [language, setLanguage] = useState('ro')

  const content = {
    ro: {
      role: 'DIMA WEB DEVELOPER',
      availability: 'DISPONIBIL PENTRU PROIECTE',
      description:
        'Transform ideile în experiențe web clare, funcționale și construite pentru probleme reale.',
      projects: 'VEZI PROIECTELE',
    },

    en: {
      role: 'DIMA WEB DEVELOPER',
      availability: 'AVAILABLE FOR PROJECTS',
      description:
        'I turn ideas into clear, functional web experiences built to solve real problems.',
      projects: 'VIEW PROJECTS',
    },
  }

  const text = content[language]

  return (
    <>
      <Navbar
        language={language}
        setLanguage={setLanguage}
      />

      <main className="hero" id="home">
  <div className="hero-top">
    <p>{text.role}</p>
    <a href="#contact">{text.availability}</a>
  </div>

  <div className="hero-center">
    <div className="light">
      <div className="light-cable"></div>

      <div className="light-bulb">
        <div className="light-glow"></div>
      </div>
    </div>

    <div className="hero-title">
      <h1>
        <span className="clarity-text">BRING CLARITY.</span>
        <span className="work-text">MAKE IT WORK.</span>
      </h1>

      <p className="hero-subtitle">
        {text.description}
      </p>
    </div>
  </div>

  <div className="hero-bottom">
    <a href="#projects" className="hero-project-link">
      <span>{text.projects} </span>
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        >
        <path
          d="M4 12L12 4M6 4h6v6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          />
      </svg>
    </a>
  </div>
</main>
      <About language={language} />
      <Projects language={language} />
      <Contact language={language} />
    </>
  )
}

export default App