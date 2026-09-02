function About({ language }) {
  const content = {
    ro: {
      about: {
        label: 'DESPRE',
        text:
          'Transform ideile neclare în soluții web simple, funcționale și bine structurate.',
      },

      approach: {
        label: 'CUM LUCREZ',
        lines: ['ÎNȚELEG', 'CLARIFIC', 'CONSTRUIESC', 'RAFINEZ'],
      },

      focus: {
        label: 'FOCUS',
        lines: ['WEB DEVELOPMENT', 'UX / UI', 'PERFORMANȚĂ'],
      },
    },

    en: {
      about: {
        label: 'ABOUT',
        text:
          'I turn unclear ideas into simple, functional and well-structured web solutions.',
      },

      approach: {
        label: 'HOW I WORK',
        lines: ['UNDERSTAND', 'CLARIFY', 'BUILD', 'REFINE'],
      },

      focus: {
        label: 'FOCUS',
        lines: ['WEB DEVELOPMENT', 'UX / UI', 'PERFORMANCE'],
      },
    },
  }

  const text = content[language]

  return (
    <section className="about" id="about">
      <div className="about-column about-intro">
        <div className="about-heading">
          <span className="about-number">01 /</span>
          <span className="about-label">{text.about.label}</span>
        </div>

        <p>{text.about.text}</p>
      </div>

      <div className="about-column">
        <span className="about-label">{text.approach.label}</span>

        <div className="about-list">
          {text.approach.lines.map((item, index) => (
            <span 
               key={item}
               className={index === 1 ? 'about-highlight' : ''}
               >
                {item}
            </span>
          ))}
        </div>
      </div>

      <div className="about-column">
        <span className="about-label">{text.focus.label}</span>

        <div className="about-list">
          {text.focus.lines.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <div className="about-services">
  <div className="about-services-heading">
    <span className="about-number">01.1 /</span>
    <span className="about-label">
      {language === 'ro' ? 'CU CE POT AJUTA' : 'HOW I CAN HELP'}
    </span>
  </div>

  <div className="about-services-list">
    {(language === 'ro'
      ? [
          {
            title: 'WEBSITE-URI DE PREZENTARE',
            text: 'Site-uri moderne și bine structurate pentru afaceri, servicii și branduri personale.',
          },
          {
            title: 'LANDING PAGES',
            text: 'Pagini concentrate pe prezentarea clară a unui produs, serviciu sau campanii.',
          },
          {
            title: 'DEZVOLTARE FRONTEND',
            text: 'Transform idei și designuri în interfețe responsive, interactive și funcționale.',
          },
          {
            title: 'OPTIMIZARE',
            text: 'Îmbunătățiri de performanță, responsive design, UX și structură pentru site-uri existente.',
          },
        ]
      : [
          {
            title: 'PRESENTATION WEBSITES',
            text: 'Modern and well-structured websites for businesses, services and personal brands.',
          },
          {
            title: 'LANDING PAGES',
            text: 'Focused pages designed to clearly present a product, service or campaign.',
          },
          {
            title: 'FRONTEND DEVELOPMENT',
            text: 'I turn ideas and designs into responsive, interactive and functional interfaces.',
          },
          {
            title: 'OPTIMIZATION',
            text: 'Performance, responsive design, UX and structural improvements for existing websites.',
          },
        ]
    ).map((service, index) => (
      <div className="about-service-row" key={service.title}>
        <span className="about-service-index">
          0{index + 1}
        </span>

        <h3>{service.title}</h3>

        <p>{service.text}</p>
      </div>
    ))}
  </div>
</div>
    </section>
  )
}

export default About