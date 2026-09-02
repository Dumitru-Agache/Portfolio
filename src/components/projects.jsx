import { useEffect, useRef, useState } from 'react'

function Projects({ language }) {
  const [activeProject, setActiveProject] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const carouselRef = useRef(null)
  const trackRef = useRef(null)
  const firstSetRef = useRef(null)

  const sectionWidthRef = useRef(0)
  const offsetRef = useRef(0)

  const isDragging = useRef(false)
  const hasDragged = useRef(false)

  const startX = useRef(0)
  const startOffset = useRef(0)

  const pausedRef = useRef(false)

  const content = {
    ro: {
      label: 'PROIECTE REALIZATE',
      selectedWork: 'PORTOFOLIU',
      year: 'AN',
      viewProject: 'VEZI PROIECTUL',
      github: 'GITHUB',
      playing: 'PLAYING',
      paused: 'PAUSED',
    },

    en: {
      label: 'COMPLETED WORK',
      selectedWork: 'PORTFOLIO',
      year: 'YEAR',
      viewProject: 'VIEW PROJECT',
      github: 'GITHUB',
      playing: 'PLAYING',
      paused: 'PAUSED',
    },
  }

  const projects = [
    {
      id: 1,
      number: '01',
      title: 'BAR PHILOSOPHY',
      year: '2026',
      image: '/projects/bar-philosophy.jpg',

      stack: ['WEB DEVELOPMENT', 'REACT', 'CSS'],

      description: {
        ro: 'Website de prezentare pentru un bar cu identitate puternică, design elegant și o experiență de utilizare fluidă.',

        en: 'A presentation website for a bar with a strong identity, elegant design and a fluid user experience.',
      },

      liveUrl: 'https://barphilosophy.agdumitru787.workers.dev',
      githubUrl: '',
    },

    {
      id: 2,
      number: '02',
      title: 'YOUR NEXT PROJECT',
      year: '2026',

      stack: ['YOUR NEXT PROJECT'],

      description: {
        ro: 'Următorul proiect va apărea aici.',

        en: 'The next project will appear here.',
      },

      liveUrl: '',
      githubUrl: '',
    },

    {
      id: 3,
      number: '03',
      title: 'YOUR NEXT PROJECT',
      year: '2026',

      stack: ['YOUR NEXT PROJECT'],

      description: {
        ro: 'Spațiu rezervat pentru un proiect viitor.',

        en: 'Reserved for a future project.',
      },

      liveUrl: '',
      githubUrl: '',
    },
  ]

  const text = content[language]

  const selectedProject =
    projects.find((project) => project.id === activeProject) ??
    projects[0]

  /*
    Creăm 3 copii identice:

    SET 1 | SET 2 | SET 3

    Caruselul pornește din SET 2.
  */
  const copies = [0, 1, 2]

  /*
    Ținem pausedRef sincronizat cu state-ul.
  */
  useEffect(() => {
    pausedRef.current = isPaused
  }, [isPaused])

  /*
    LOOP AUTOMAT
  */
  useEffect(() => {
    const carousel = carouselRef.current
    const track = trackRef.current
    const firstSet = firstSetRef.current

    if (!carousel || !track || !firstSet) return

    let animationFrame
    let lastTime = performance.now()

    function applyTransform() {
      track.style.transform =
        `translate3d(${offsetRef.current}px, 0, 0)`
    }

    function normalizePosition() {
      const width = sectionWidthRef.current

      if (!width) return

      /*
        Dacă ajungem prea departe în dreapta,
        revenim cu o copie înapoi.

        Vizual nu se vede deoarece
        copiile sunt identice.
      */
      while (offsetRef.current <= -width * 2) {
        offsetRef.current += width
      }

      /*
        Dacă mergem prea mult spre stânga,
        sărim în copia identică următoare.
      */
      while (offsetRef.current >= 0) {
        offsetRef.current -= width
      }
    }

    function measure() {
      sectionWidthRef.current =
        firstSet.getBoundingClientRect().width

      /*
        La prima încărcare pornim
        în SET 2.
      */
      if (offsetRef.current === 0) {
        offsetRef.current =
          -sectionWidthRef.current
      }

      normalizePosition()
      applyTransform()
    }

    function animate(currentTime) {
      const deltaTime =
        currentTime - lastTime

      lastTime = currentTime

      /*
        Dacă nu este PAUSED
        și utilizatorul nu trage caruselul,
        îl mișcăm automat.

        30 = aproximativ 30px/secundă.
      */
      if (
        !pausedRef.current &&
        !isDragging.current
      ) {
        offsetRef.current -=
          (deltaTime / 1000) * 30

        normalizePosition()
        applyTransform()
      }

      animationFrame =
        requestAnimationFrame(animate)
    }

    measure()

    animationFrame =
      requestAnimationFrame(animate)

    /*
      Dacă se schimbă dimensiunea browserului,
      recalculăm dimensiunea unei copii.
    */
    const resizeObserver =
      new ResizeObserver(measure)

    resizeObserver.observe(firstSet)

    return () => {
      cancelAnimationFrame(animationFrame)

      resizeObserver.disconnect()
    }
  }, [])

  /*
    Refolosim aceste două funcții
    pentru drag, săgeți și trackpad.
  */
  function normalizeOffset() {
    const width = sectionWidthRef.current

    if (!width) return

    while (
      offsetRef.current <=
      -width * 2
    ) {
      offsetRef.current += width
    }

    while (offsetRef.current >= 0) {
      offsetRef.current -= width
    }
  }

  function updateTrack() {
    const track = trackRef.current

    if (!track) return

    track.style.transform =
      `translate3d(${offsetRef.current}px, 0, 0)`
  }

  /*
    DRAG CU MOUSE / TOUCH
  */
function handlePointerDown(event) {
  if (event.button !== 0) return

  isDragging.current = true
  hasDragged.current = false

  startX.current = event.clientX
  startOffset.current = offsetRef.current

  carouselRef.current?.classList.add('is-dragging')
}

  function handlePointerMove(event) {
    if (!isDragging.current) return

    const distance =
      event.clientX - startX.current

    if (Math.abs(distance) > 5) {
      hasDragged.current = true
    }

    offsetRef.current =
      startOffset.current + distance

    normalizeOffset()
    updateTrack()
  }

function handlePointerUp() {
  isDragging.current = false

  carouselRef.current?.classList.remove('is-dragging')
}

  /*
    TRACKPAD

    Pe Mac, mișcarea orizontală pe trackpad
    produce deltaX.

    Scroll-ul vertical normal al paginii
    rămâne neatins.
  */
  function handleWheel(event) {
    const horizontalMovement =
      Math.abs(event.deltaX) >
      Math.abs(event.deltaY)

    if (!horizontalMovement) return

    offsetRef.current -= event.deltaX

    normalizeOffset()
    updateTrack()
  }

  /*
    CLICK PE UN PROIECT
  */
function selectProject(id) {
  if (hasDragged.current) {
    hasDragged.current = false
    return
  }

  setActiveProject(id)
  setIsPaused(true)
}

  /*
    SĂGEȚILE
  */
  function moveCarousel(direction) {
    const track = trackRef.current

    if (!track) return

    const card =
      track.querySelector('.project-card')

    if (!card) return

    const gap = 30

    const distance =
      card.getBoundingClientRect().width +
      gap

    /*
      Săgeata dreapta:
      direction = 1

      Săgeata stânga:
      direction = -1
    */
    offsetRef.current -=
      distance * direction

    normalizeOffset()
    updateTrack()
  }

  return (
    <section
      className="projects"
      id="projects"
    >
      {/* HEADING */}

      <div className="projects-heading">
        <div className="projects-heading-title">
          <span className="projects-number">
            02 /
          </span>

          <span>
            {text.label}
          </span>
        </div>

        <div className="projects-light">
          <span className="projects-light-cable" />

          <span className="projects-light-bulb" />
        </div>

        <span className="projects-heading-right">
          {text.selectedWork}
        </span>
      </div>

      {/* CAROUSEL */}

      <div
        ref={carouselRef}
        className="projects-carousel"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        <div
          ref={trackRef}
          className="projects-track"
        >
          {copies.map((copyIndex) => (
            <div
              ref={
                copyIndex === 0
                  ? firstSetRef
                  : null
              }
              className="projects-set"
              key={copyIndex}
            >
              {projects.map((project) => (
                <button
                  type="button"
                  className={`project-card ${
                    activeProject === project.id
                      ? 'project-active'
                      : ''
                  }`}
                  key={`${copyIndex}-${project.id}`}
                  onClick={() =>
                    selectProject(project.id)
                  }
                >
                  <div className="project-card-visual">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        draggable="false"
                        loading="lazy"
                      />
                    ) : (
                      <span>
                        {project.title}
                      </span>
                    )}
                  </div>

                  <div className="project-card-title">
                    <span>
                      {project.number} /
                    </span>

                    <span>
                      {project.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CONTROALE */}

      <div className="projects-navigation">
        <button
          type="button"
          className="projects-status"
          onClick={() =>
            setIsPaused(
              (current) => !current
            )
          }
        >
          <span
            className={`status-dot ${
              isPaused
                ? 'status-paused'
                : ''
            }`}
          />

          {isPaused
            ? text.paused
            : text.playing}
        </button>

        <div className="projects-controls">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() =>
              moveCarousel(-1)
            }
          >
            ←
          </button>

          <button
            type="button"
            aria-label="Next project"
            onClick={() =>
              moveCarousel(1)
            }
          >
            →
          </button>
        </div>
      </div>

      {/* DETALII PROIECT */}

      <div className="project-details">
        <div className="project-details-number">
          {selectedProject.number}
        </div>

        <div className="project-details-main">
          <h2>
            {selectedProject.title}
          </h2>

          <p>
            {
              selectedProject
                .description[language]
            }
          </p>

          <div className="project-stack">
            {selectedProject.stack.map(
              (technology) => (
                <span key={technology}>
                  {technology}
                </span>
              )
            )}
          </div>
        </div>

<div className="project-details-links">
  <div>
    <strong>
      {selectedProject.year}
    </strong>

    <span>
      {text.year}
    </span>
  </div>

  <a
    href={selectedProject.liveUrl || '#'}
    target={selectedProject.liveUrl ? '_blank' : undefined}
    rel={selectedProject.liveUrl ? 'noreferrer' : undefined}
  >
    {text.viewProject} ↗
  </a>

  <a
    href={selectedProject.githubUrl || '#'}
    target={selectedProject.githubUrl ? '_blank' : undefined}
    rel={selectedProject.githubUrl ? 'noreferrer' : undefined}
  >
    {text.github} ↗
  </a>
</div>

        <button
          type="button"
          className="project-play-button"
          onClick={() =>
            setIsPaused(
              (current) => !current
            )
          }
          aria-label={
            isPaused
              ? 'Play carousel'
              : 'Pause carousel'
          }
        >
          {isPaused ? '▶' : 'Ⅱ'}
        </button>
      </div>
    </section>
  )
}

export default Projects