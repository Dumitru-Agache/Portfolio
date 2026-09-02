function Navbar({ language, setLanguage }) {
  const navigation = {
    ro: {
      about: 'DESPRE',
      projects: 'PROIECTE',
      contact: 'CONTACT',
    },

    en: {
      about: 'ABOUT',
      projects: 'PROJECTS',
      contact: 'CONTACT',
    },
  }

  const text = navigation[language]

  return (
    <header className="navbar">
      <a href="#home" className="navbar-logo">
        <img 
          src="/logo.svg"
          alt="Dima"
        />
      </a>

      <div className="navbar-right">
        <nav className="navbar-links">
          <a href="#about">{text.about}</a>
          <a href="#projects">{text.projects}</a>
          <a href="#contact">{text.contact}</a>
        </nav>

        <div className="language-switch">
          <button
            className={language === 'ro' ? 'language-active' : ''}
            onClick={() => setLanguage('ro')}
            aria-pressed={language ==='ro'}
          >
            RO
          </button>

          <span>/</span>

          <button
            className={language === 'en' ? 'language-active' : ''}
            onClick={() => setLanguage('en')}
            aria-pressed={language ==='en'}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar