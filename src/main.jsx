import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const projects = [
  { title: 'Courtyard House', type: 'Residential', year: '2025', location: 'Dhaka', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=88', summary: 'A climate-aware family home organised around a shaded garden, bringing daylight, breeze and everyday rituals into the centre of the plan.' },
  { title: 'Brick & Breeze', type: 'Hospitality', year: '2025', location: 'Chattogram', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=88', summary: 'Tactile brickwork, deep openings and layered planting create a quiet retreat where building and landscape meet.' },
  { title: 'Folded Light', type: 'Cultural', year: '2024', location: 'Sylhet', image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=88', summary: 'A public pavilion composed as a sequence of folded planes, animated throughout the day by movement and changing sunlight.' },
  { title: 'House No. 08', type: 'Residential', year: '2024', location: 'Gazipur', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=88', summary: 'A low, horizontal residence framing long garden views and generous shared rooms for a multi-generational family.' },
  { title: 'Common Ground', type: 'Workplace', year: '2023', location: 'Dhaka', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=88', summary: 'A flexible studio shaped by warm timber, honest structure and shared tables for focus, exchange and creative work.' },
  { title: 'Riverstone Retreat', type: 'Hospitality', year: '2023', location: 'Bandarban', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=88', summary: 'A hillside retreat that follows the natural contours, pairing local stone and timber with framed views across the valley.' },
  { title: 'The Green Spine', type: 'Residential', year: '2022', location: 'Dhaka', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=88', summary: 'A compact urban home organised around a planted circulation spine that carries light and air through every level.' },
  { title: 'Arc Gallery', type: 'Cultural', year: '2022', location: 'Rajshahi', image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1200&q=88', summary: 'A calm sequence of vaulted rooms creates an adaptable setting for exhibitions, workshops and public gatherings.' },
  { title: 'Terracotta Court', type: 'Mixed Use', year: '2021', location: 'Khulna', image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=88', summary: 'A shaded courtyard and perforated terracotta screens temper the tropical climate while giving the building a distinct civic identity.' },
  { title: 'Lightwell Studio', type: 'Workplace', year: '2021', location: 'Dhaka', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=88', summary: 'An adaptive workspace centred on a generous lightwell, with flexible rooms designed for collaboration and focused making.' },
];

const SvgIcon = ({ name, size = 22 }) => {
  const paths = {
    home: <><path d="M3 11.2 12 4l9 7.2"/><path d="M5.5 10v10h13V10M9.5 20v-6h5v6"/></>,
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.6-4 3-6 7-6s6.4 2 7 6"/></>,
    bag: <><path d="M4 8h16v12H4zM8 8V5h8v3M4 12h16"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 7 9-7"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
    linkedin: <><path d="M6 9v10M6 5.5v.1M10 19v-6c0-2.2 1.3-4 3.8-4 2.2 0 3.2 1.5 3.2 4v6M10 9v10"/></>,
  };
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

const previewNames = {
  blueprint: '01 / BLUEPRINT REVEAL',
  cascade: '02 / LETTER CASCADE',
  panels: '03 / PANEL REVEAL',
  print: '04 / RETRO PRINT',
};

function IntroWord({ children, offset = 0 }) {
  return <span className="intro-word" data-text={children}>
    {[...children].map((letter, index) => <i className="intro-letter" style={{ '--letter': index + offset }} key={`${letter}-${index}`}>{letter}</i>)}
  </span>;
}

function Intro({ finish, variant }) {
  const [exit, setExit] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 3400);
    return () => clearTimeout(timer);
  }, []);
  const enter = () => {
    if (!ready || exit) return;
    setExit(true);
    setTimeout(finish, 900);
  };
  return <div className={`intro intro--${variant} ${ready ? 'is-ready' : ''} ${exit ? 'is-exiting' : ''}`}>
    <div className="intro-construction" aria-hidden="true"><i/><i/><i/><i/></div>
    <div className="intro-panels" aria-hidden="true"><i/><i/><i/><i/></div>
    <div className="intro-name" aria-label="Sherhan Hossain"><IntroWord>SHERHAN</IntroWord><IntroWord offset={7}>HOSSAIN</IntroWord></div>
    <p>ARCHITECTURE / SPACES / STORIES</p>
    <div className="intro-rule"><i/></div>
    <button className="intro-enter" onClick={enter} disabled={!ready}>ENTER STUDIO <b>→</b></button>
  </div>;
}

function Tool({ label, mark, tone }) {
  return <div className={`tool tool--${tone}`}><div className="tool-burst"><span>{mark}</span></div><small>{label}</small></div>;
}

function Modal({ type, project, close }) {
  return <div className="modal" role="dialog" aria-modal="true" onMouseDown={e => e.target === e.currentTarget && close()}>
    <div className="modal-card">
      <button className="modal-close" onClick={close} aria-label="Close"><SvgIcon name="close"/></button>
      {type === 'project' && <div className="project-modal">
        <img src={project.image} alt={project.title}/>
        <div className="modal-copy"><div className="eyebrow">{project.type} / {project.year}</div><h2>{project.title}</h2><p>{project.summary}</p><div className="project-meta"><span>Location</span><b>{project.location}</b><span>Discipline</span><b>Architecture</b></div></div>
      </div>}
      {type === 'portfolio' && <div className="modal-copy portfolio-modal"><div className="eyebrow">PERSONAL PORTFOLIO</div><h2>Selected work,<br/>across the web.</h2><div className="big-links"><a href="https://www.behance.net/" target="_blank" rel="noreferrer">BEHANCE <span>↗</span></a><a href="https://dribbble.com/" target="_blank" rel="noreferrer">DRIBBBLE <span>↗</span></a><a href="https://www.archdaily.com/" target="_blank" rel="noreferrer">ARCHDAILY <span>↗</span></a></div></div>}
      {type === 'contact' && <div className="modal-copy contact-modal"><div className="eyebrow">READY TO WORK?</div><h2>LET'S SHAPE<br/><span>YOUR SPACE.</span></h2><p>For architecture, interior and visualisation enquiries, start with a quick email.</p><a className="talk-link" href="mailto:hello@sherhanhossain.com">HELLO@SHERHANHOSSAIN.COM <SvgIcon name="arrow"/></a></div>}
    </div>
  </div>;
}

function App() {
  const introVariant = 'panels';
  const [intro, setIntro] = useState(true);
  const [modal, setModal] = useState(null);
  const [activeProject, setActiveProject] = useState(projects[0]);
  const rail = useRef(null);

  useEffect(() => {
    document.title = 'Sherhan Hossain — Architect & Designer';
    const onKey = e => e.key === 'Escape' && setModal(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [introVariant]);

  useEffect(() => {
    const element = rail.current;
    if (!element) return undefined;
    let frame = null;

    const onWheel = e => {
      e.preventDefault();
      const axisDelta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const unit = e.deltaMode === 1 ? 18 : e.deltaMode === 2 ? element.clientWidth : 1;
      const delta = axisDelta * unit;

      if (frame) cancelAnimationFrame(frame);

      // Trackpads already provide small, frequent deltas and feel best one-to-one.
      if (Math.abs(delta) < 24) {
        element.scrollLeft += delta;
        frame = null;
        return;
      }

      // Ease a single mouse-wheel notch briefly without storing momentum.
      const from = element.scrollLeft;
      const maxScroll = element.scrollWidth - element.clientWidth;
      const distance = Math.sign(delta) * Math.min(Math.abs(delta) * 0.62, 92);
      const to = Math.max(0, Math.min(maxScroll, from + distance));
      const startedAt = performance.now();
      const duration = 90;

      const step = now => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.scrollLeft = from + (to - from) * eased;
        frame = progress < 1 ? requestAnimationFrame(step) : null;
      };

      frame = requestAnimationFrame(step);
    };

    element.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      element.removeEventListener('wheel', onWheel);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const openProject = project => { setActiveProject(project); setModal('project'); };

  return <>
    {intro && <Intro variant={introVariant} finish={() => setIntro(false)}/>} 
    <main className="stage">
      <section className="portfolio-shell" aria-label="Sherhan Hossain architecture portfolio">
        <header className="topbar">
          <div className="avatar-frame">
            <img className="avatar" src={`${import.meta.env.BASE_URL}dp.jpg`} alt="Sherhan Hossain"/>
          </div>
          <nav aria-label="Main navigation">
            <button aria-label="Home" data-label="HOME"><SvgIcon name="home"/></button>
            <button aria-label="About Sherhan" data-label="ABOUT" onClick={() => setModal('contact')}><SvgIcon name="user"/></button>
            <button aria-label="View portfolio" data-label="PORTFOLIO" onClick={() => setModal('portfolio')}><SvgIcon name="bag"/></button>
          </nav>
          <button className="talk-button" onClick={() => setModal('contact')}><i>✱</i> LET'S TALK <i>✱</i></button>
        </header>

        <section className="hero-panel">
          <div className="eyebrow">HELLO, I'M SHERHAN HOSSAIN</div>
          <h1><span>ARCHITECT</span><br/><b>&amp;</b> <em>DESIGNER</em></h1>
          <p>CRAFTING PURPOSEFUL SPACES FOR<br/>PEOPLE, PLACE &amp; EVERYDAY LIFE.</p>
          <div className="hero-actions">
            <div className="socials" aria-label="Social links">
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><SvgIcon name="linkedin"/></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><SvgIcon name="instagram"/></a>
              <a href="mailto:hello@sherhanhossain.com" aria-label="Email"><SvgIcon name="mail"/></a>
            </div>
            <button className="ready-button" onClick={() => setModal('contact')}>✱ READY TO WORK ✱</button>
          </div>
        </section>

        <section className="tools-panel">
          <h2>TOOLS</h2>
          <div className="tools-row">
            <Tool label="AUTOCAD" mark="A" tone="red"/>
            <Tool label="REVIT" mark="R" tone="pink"/>
            <Tool label="SKETCHUP" mark="S" tone="red"/>
            <Tool label="RHINO" mark="R" tone="pink"/>
            <Tool label="ENSCAPE" mark="E" tone="red"/>
          </div>
        </section>

        <button className="portfolio-panel" onClick={() => setModal('portfolio')}>
          <span>✱</span><i>✹</i> PERSONAL PORTFOLIO <i>✹</i><span>✱</span>
        </button>

        <section className="services-panel">
          <h2>SERVICES</h2>
          <div className="service-grid">
            <div>ARCHITECTURE</div><div>INTERIOR DESIGN</div><div>SPACE PLANNING</div><div>3D VISUALIZATION</div><div>CONCEPT DESIGN</div><div>SITE CONSULTANCY</div>
          </div>
        </section>

        <section className="works-panel">
          <div className="works-heading"><h2>WORK</h2><span>HOVER + SCROLL →</span></div>
          <div className="works-rail" ref={rail}>
            {projects.map((project, index) => <button className="work-card" key={project.title} onClick={() => openProject(project)} aria-label={`Open ${project.title}`}>
              <img src={project.image} alt=""/>
              <span><b>{String(index + 1).padStart(2, '0')}</b><em>{project.title}</em><small>{project.year}</small></span>
            </button>)}
          </div>
          <button className="view-more" onClick={() => openProject(projects[0])}>VIEW MORE</button>
        </section>
      </section>
    </main>
    {modal && <Modal type={modal} project={activeProject} close={() => setModal(null)}/>} 
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
