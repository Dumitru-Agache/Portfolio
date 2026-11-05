import ArrowUpRight from './ArrowUpRight'
function Contact({ language }) {
  const content = {
    ro: {
      label: 'CONTACT',
      title: 'AI O IDEE? HAI SĂ O FACEM SĂ FUNCȚIONEZE.',
      text:
        'Dacă ai nevoie de un website nou sau vrei să îmbunătățești unul existent, spune-mi puțin despre proiect.',
      email: 'EMAIL',
      linkedin: 'LINKEDIN',
      github: 'GITHUB',
      button: 'SCRIE-MI',
    },

    en: {
      label: 'CONTACT',
      title: 'HAVE AN IDEA? LET’S MAKE IT WORK.',
      text:
        'If you need a new website or want to improve an existing one, tell me a little about the project.',
      email: 'EMAIL',
      linkedin: 'LINKEDIN',
      github: 'GITHUB',
      button: 'CONTACT ME',
    },
  }

  const text = content[language]

  return (
    <section className="contact" id="contact">
      <div className="contact-heading">
        <span className="contact-number">03 /</span>
        <span>{text.label}</span>
      </div>

      <div className="contact-content">
        <div className="contact-main">
          <h2>{text.title}</h2>

          <p>{text.text}</p>

          <a
            className="contact-button"
            href="mailto:contact@dimabuilds.dev"
          >
            {text.button} <ArrowUpRight />
          </a>
        </div>

        <div className="contact-links">
          <a href="mailto:contact@dimabuilds.dev">
            <span>{text.email}</span>
            <strong>contact@dimabuilds.dev<ArrowUpRight /> </strong>
          </a>

          <a
            href="https://www.linkedin.com/in/dumitru-agache-512b11294/"
            target="_blank"
            rel="noreferrer"
          >
            <span>{text.linkedin}</span>
            <strong>LinkedIn <ArrowUpRight /> </strong>
          </a>

          <a
            href="https://github.com/Dumitru-Agache"
            target="_blank"
            rel="noreferrer"
          >
            <span>{text.github}</span>
            <strong>GitHub <ArrowUpRight /> </strong>
          </a>
        </div>
      </div>

      <div className="contact-footer">
        <span>DIMA</span>
        <span>BRING CLARITY. MAKE IT WORK.</span>
        <span>© 2026</span>
      </div>
    </section>
  )
}

export default Contact