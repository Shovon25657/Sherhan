'use client';

/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { projects as initialProjects, services } from './data/portfolio';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === 'true';
const publicAsset = path => `${basePath}${path}`;
const adminTriggerPositionKey = 'sherhan-admin-trigger-position';

const SvgIcon = ({ name, size = 22 }) => {
  const paths = {
    home: <><path d="M3 11.2 12 4l9 7.2"/><path d="M5.5 10v10h13V10M9.5 20v-6h5v6"/></>,
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.6-4 3-6 7-6s6.4 2 7 6"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 7 9-7"/></>,
    copy: <><rect x="8" y="8" width="11" height="11" rx="1"/><path d="M16 8V5H5v11h3"/></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5"/><path d="M5 20h14"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    left: <path d="m15 18-6-6 6-6"/>, right: <path d="m9 18 6-6-6-6"/>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
    linkedin: <><path d="M6 9v10M6 5.5v.1M10 19v-6c0-2.2 1.3-4 3.8-4 2.2 0 3.2 1.5 3.2 4v6M10 9v10"/></>,
  };
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

function DraggableAdminTrigger() {
  const triggerRef = useRef(null);
  const gesture = useRef(null);
  const latestPosition = useRef(null);
  const suppressClick = useRef(false);
  const [position, setPosition] = useState(null);
  const [dragging, setDragging] = useState(false);

  const clampToViewport = (x, y) => {
    const rect = triggerRef.current?.getBoundingClientRect();
    const width = rect?.width || 46;
    const height = rect?.height || 46;
    const gutter = 10;
    return {
      x: Math.min(Math.max(x, gutter), Math.max(gutter, window.innerWidth - width - gutter)),
      y: Math.min(Math.max(y, gutter), Math.max(gutter, window.innerHeight - height - gutter)),
    };
  };

  const rememberPosition = next => {
    latestPosition.current = next;
    setPosition(next);
  };

  useEffect(() => {
    let restoreFrame;
    try {
      const saved = JSON.parse(window.localStorage.getItem(adminTriggerPositionKey));
      if (Number.isFinite(saved?.x) && Number.isFinite(saved?.y)) {
        restoreFrame = window.requestAnimationFrame(() => rememberPosition(clampToViewport(saved.x, saved.y)));
      }
    } catch { /* Keep the default corner when storage is unavailable. */ }

    const keepVisible = () => setPosition(current => {
      if (!current) return current;
      const next = clampToViewport(current.x, current.y);
      latestPosition.current = next;
      return next;
    });
    window.addEventListener('resize', keepVisible);
    return () => {
      if (restoreFrame) window.cancelAnimationFrame(restoreFrame);
      window.removeEventListener('resize', keepVisible);
    };
  }, []);

  const startDrag = event => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    gesture.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      moved: false,
    };
    suppressClick.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveTrigger = event => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    if (!current.moved && Math.hypot(event.clientX - current.startX, event.clientY - current.startY) >= 5) {
      current.moved = true;
      setDragging(true);
    }
    if (!current.moved) return;
    event.preventDefault();
    rememberPosition(clampToViewport(event.clientX - current.offsetX, event.clientY - current.offsetY));
  };

  const finishDrag = event => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    suppressClick.current = current.moved;
    gesture.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (current.moved && latestPosition.current) {
      try { window.localStorage.setItem(adminTriggerPositionKey, JSON.stringify(latestPosition.current)); } catch { /* Position persistence is optional. */ }
    }
  };

  const handleClick = event => {
    if (!suppressClick.current) return;
    event.preventDefault();
    suppressClick.current = false;
  };

  return <Link
    ref={triggerRef}
    className={`admin-trigger ${dragging ? 'is-dragging' : ''}`}
    href="/admin/login"
    aria-label="Open owner administration. Drag to move this button."
    title="Drag to move • Click for owner admin"
    draggable={false}
    style={position ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' } : undefined}
    onPointerDown={startDrag}
    onPointerMove={moveTrigger}
    onPointerUp={finishDrag}
    onPointerCancel={finishDrag}
    onClick={handleClick}
  >S</Link>;
}

function IntroWord({ children, offset = 0 }) {
  return <span className="intro-word" data-text={children}>{[...children].map((letter, index) => <i className="intro-letter" style={{ '--letter': index + offset }} key={`${letter}-${index}`}>{letter}</i>)}</span>;
}

function Intro({ finish }) {
  const [exit, setExit] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setReady(true), 3400); return () => clearTimeout(timer); }, []);
  const enter = () => { if (!ready || exit) return; setExit(true); setTimeout(finish, 900); };
  return <div className={`intro intro--panels ${ready ? 'is-ready' : ''} ${exit ? 'is-exiting' : ''}`}>
    <div className="intro-construction" aria-hidden="true"><i/><i/><i/><i/></div><div className="intro-panels" aria-hidden="true"><i/><i/><i/><i/></div>
    <div className="intro-name" aria-label="Sherhan Hossain"><IntroWord>SHERHAN</IntroWord><IntroWord offset={7}>HOSSAIN</IntroWord></div>
    <p>ARCHITECTURE / SPACES / STORIES</p><div className="intro-rule"><i/></div>
    <button className="intro-enter" onClick={enter} disabled={!ready}>ENTER STUDIO <b>→</b></button>
  </div>;
}

function Tool({ label, mark, tone }) { return <div className={`tool tool--${tone}`}><div className="tool-burst"><span>{mark}</span></div><small>{label}</small></div>; }

function ResumeModal({ close }) {
  return <div className="modal" role="dialog" aria-modal="true" aria-label="Sherhan Hossain resume" onMouseDown={event => event.target === event.currentTarget && close()}>
    <div className="modal-card resume-window"><div className="retro-window-bar"><span>ABOUT / RESUME</span><div className="window-actions"><a href={publicAsset('/resume.png')} download="Sherhan-Hossain-Resume.png" aria-label="Download Sherhan Hossain resume" title="Download resume"><SvgIcon name="download"/></a><button onClick={close} aria-label="Close"><SvgIcon name="close"/></button></div></div><div className="resume-paper"><img src={publicAsset('/resume.png')} alt="Sherhan Hossain resume"/></div></div>
  </div>;
}

function ProjectViewer({ project, close }) {
  const [slide, setSlide] = useState(0);
  const [turn, setTurn] = useState(null);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef(null);
  const images = project.images?.length ? project.images : [project.image];
  const move = direction => {
    if (turn || images.length < 2) return;
    const next = (slide + direction + images.length) % images.length;
    setTurn({ direction, next });
  };
  const finishTurn = () => { if (turn) { setSlide(turn.next); setTurn(null); } };
  const startGesture = event => {
    if (event.target.closest('button') || turn || images.length < 2) return;
    gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId, deltaX: 0, deltaY: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };
  const trackGesture = event => {
    if (!gesture.current || gesture.current.id !== event.pointerId) return;
    const deltaX = event.clientX - gesture.current.x;
    const deltaY = event.clientY - gesture.current.y;
    if (Math.abs(deltaX) > Math.abs(gesture.current.deltaX)) gesture.current.deltaX = deltaX;
    if (Math.abs(deltaY) > Math.abs(gesture.current.deltaY)) gesture.current.deltaY = deltaY;
  };
  const endGesture = event => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const deltaX = start.deltaX || event.clientX - start.x;
    const deltaY = start.deltaY || event.clientY - start.y;
    gesture.current = null;
    setDragging(false);
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) move(deltaX < 0 ? 1 : -1);
  };
  return <div className="project-viewer" role="dialog" aria-modal="true" aria-label={project.title}>
    <button className="viewer-close" onClick={close} aria-label="Back to projects"><SvgIcon name="close"/></button>
    <div className={`viewer-image ${dragging ? 'is-dragging' : ''}`} onPointerDown={startGesture} onPointerMove={trackGesture} onPointerUp={endGesture} onPointerCancel={endGesture}>
      <img className="album-base" src={images[slide]} alt={`${project.title}, view ${slide + 1}`} draggable="false"/>
      {turn && <><img className={`album-page album-page--incoming album-page--${turn.direction > 0 ? 'next' : 'previous'}`} src={images[turn.next]} alt="" draggable="false"/><img className={`album-page album-page--outgoing album-page--${turn.direction > 0 ? 'next' : 'previous'}`} src={images[slide]} alt="" draggable="false" onAnimationEnd={finishTurn}/></>}
      {images.length > 1 && <><div className="album-binding" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index}/>)}</div><div className="album-page-corner" aria-label={`Image ${slide + 1} of ${images.length}`}><span>{slide + 1}/{images.length}</span></div></>}
    </div>
    <aside><span className="eyebrow">PROJECT {String(project.serial).padStart(2, '0')} / {project.type}</span><h2>{project.title}</h2><p>{project.summary}</p><dl><div><dt>LOCATION</dt><dd>{project.location}</dd></div><div><dt>YEAR</dt><dd>{project.year}</dd></div></dl></aside>
  </div>;
}

function PortfolioModal({ projects, selected, close }) {
  const categories = ['All', ...services];
  const [category, setCategory] = useState('All');
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [active, setActive] = useState(selected || null);
  const visible = category === 'All' ? projects : projects.filter(project => project.type.toLowerCase() === category.toLowerCase());
  const openProject = (event, project) => { event.currentTarget.closest('.portfolio-overlay')?.scrollTo({ top: 0 }); setActive(project); };
  if (active) return <div className="modal portfolio-overlay"><ProjectViewer project={active} close={() => setActive(null)}/></div>;
  return <div className="modal portfolio-overlay" role="dialog" aria-modal="true" aria-label="Personal portfolio">
    <div className="portfolio-browser"><header><h2>PERSONAL <span>PORTFOLIO</span></h2><button onClick={close} aria-label="Close"><SvgIcon name="close"/></button></header>
      <div className="category-filter"><div className="category-menu"><button className="category-trigger" aria-expanded={categoriesOpen} aria-controls="project-category-menu" onClick={() => setCategoriesOpen(open => !open)}><span>CATEGORY</span><b>{category === 'All' ? 'ALL CATEGORIES' : category}</b><i>{categoriesOpen ? '-' : '+'}</i></button>{categoriesOpen && <div className="category-popover" id="project-category-menu" role="menu">{categories.map((item, index) => <button key={item} role="menuitemradio" aria-checked={category === item} className={category === item ? 'is-active' : ''} onClick={() => { setCategory(item); setCategoriesOpen(false); }}>{item !== 'All' && <b>{String(index).padStart(2, '0')}</b>}<span>{item === 'All' ? 'All categories' : item}</span><i>{category === item ? '*' : '>'}</i></button>)}</div>}</div><small>{String(visible.length).padStart(2, '0')} PROJECTS</small></div>
      <div className="project-grid">{visible.map(project => <button key={project.id} className="project-tile" onClick={event => openProject(event, project)}><img src={project.image} alt=""/><span><b>{String(project.serial).padStart(2, '0')}</b><strong>{project.title}</strong><small>{project.location} / {project.year}</small></span></button>)}</div>
      {!visible.length && <p className="empty-projects">Projects in this category will appear here when the owner publishes them.</p>}
    </div>
  </div>;
}

function ContactModal({ close }) {
  const [status, setStatus] = useState({ busy: false, message: '', error: false });
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    await navigator.clipboard.writeText('hello@sherhanhossain.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  const submit = async event => {
    event.preventDefault(); setStatus({ busy: true, message: '', error: false });
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    if (isStaticPreview) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${payload.name}`);
      const body = encodeURIComponent(`${payload.message}\n\nFrom: ${payload.name}\nEmail: ${payload.email}`);
      window.location.href = `mailto:hello@sherhanhossain.com?subject=${subject}&body=${body}`;
      setStatus({ busy: false, message: 'Your email app is ready with the message.', error: false });
      return;
    }
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json();
    setStatus({ busy: false, message: result.message || result.error, error: !response.ok });
    if (response.ok) form.reset();
  };
  return <div className="modal" role="dialog" aria-modal="true" onMouseDown={event => event.target === event.currentTarget && close()}><div className="modal-card contact-window"><button className="modal-close" onClick={close} aria-label="Close"><SvgIcon name="close"/></button><div className="contact-intro"><span className="eyebrow">LET’S MAKE SPACE FOR AN IDEA</span><h2>WHAT’S ON<br/><em>YOUR MIND?</em></h2><p>Share a thought, a site, or the start of a project. Sherhan would love to hear the story behind it.</p><div className="contact-email"><a href="mailto:hello@sherhanhossain.com">HELLO@SHERHANHOSSAIN.COM</a><button type="button" onClick={copyEmail} aria-label="Copy email address"><SvgIcon name="copy" size={17}/><span>{copied ? 'COPIED' : 'COPY'}</span></button></div></div><form className="contact-form" onSubmit={submit}><label>YOUR NAME<input name="name" required minLength="2" placeholder="How should I address you?"/></label><label>YOUR EMAIL<input name="email" type="email" required placeholder="you@example.com"/></label><label>YOUR MESSAGE<textarea name="message" required minLength="10" rows="6" placeholder="Tell me what you are imagining…"/></label><button disabled={status.busy}>{status.busy ? 'SENDING…' : 'SEND YOUR THOUGHT →'}</button>{status.message && <p className={status.error ? 'form-error' : 'form-success'} role="status">{status.message}</p>}</form></div></div>;
}

function ModalLayer({ type, projects, selected, close }) {
  if (type === 'resume') return <ResumeModal close={close}/>;
  if (type === 'portfolio') return <PortfolioModal projects={projects} selected={selected} close={close}/>;
  if (type === 'contact') return <ContactModal close={close}/>;
  return null;
}

export default function PortfolioApp() {
  const [intro, setIntro] = useState(true);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [projects, setProjects] = useState(initialProjects);
  const marqueeProjects = useMemo(() => [...projects, ...projects], [projects]);

  useEffect(() => {
    if (!isStaticPreview) fetch('/api/portfolio').then(response => response.ok ? response.json() : null).then(data => data?.projects?.length && setProjects(data.projects)).catch(() => {});
    const onKey = event => event.key === 'Escape' && setModal(null);
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);
  const openPortfolio = project => { setSelected(project || null); setModal('portfolio'); };

  return <>{intro && <Intro finish={() => setIntro(false)}/>}<main className="stage"><section className="portfolio-shell" aria-label="Sherhan Hossain architecture portfolio">
    <header className="topbar"><div className="avatar-frame"><img className="avatar" src={publicAsset('/dp.jpg')} alt="Sherhan Hossain"/></div><nav aria-label="Main navigation"><button aria-label="Home" data-label="HOME" onClick={() => setModal(null)}><SvgIcon name="home"/></button><button aria-label="About Sherhan" data-label="ABOUT" onClick={() => setModal('resume')}><SvgIcon name="user"/></button></nav><button className="talk-button" onClick={() => setModal('contact')}><i>✱</i> LET’S TALK <i>✱</i></button></header>
    <section className="hero-panel"><div className="eyebrow">HELLO, I’M SHERHAN HOSSAIN</div><h1><span>ARCHITECT</span><br/><b>&amp;</b> <em>DESIGNER</em></h1><p>CRAFTING PURPOSEFUL SPACES FOR<br/>PEOPLE, PLACE &amp; EVERYDAY LIFE.</p><div className="hero-actions"><div className="socials" aria-label="Social links"><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><SvgIcon name="linkedin"/></a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><SvgIcon name="instagram"/></a><a href="mailto:hello@sherhanhossain.com" aria-label="Email"><SvgIcon name="mail"/></a></div><button className="ready-button" onClick={() => setModal('contact')}>✱ READY TO WORK ✱</button></div></section>
    <section className="tools-panel"><h2>TOOLS</h2><div className="tools-row"><Tool label="AUTOCAD" mark="A" tone="red"/><Tool label="REVIT" mark="R" tone="pink"/><Tool label="SKETCHUP" mark="S" tone="red"/><Tool label="RHINO" mark="R" tone="pink"/><Tool label="ENSCAPE" mark="E" tone="red"/></div></section>
    <button className="portfolio-panel" onClick={() => openPortfolio()}><span>✱</span><i>✹</i> PERSONAL PORTFOLIO <i>✹</i><span>✱</span></button>
    <section className="services-panel"><h2>SERVICES</h2><div className="service-grid">{services.map(service => <div key={service}>{service.toUpperCase()}</div>)}</div></section>
    <section className="works-panel"><div className="works-heading"><h2>WORK</h2></div><div className="works-marquee"><div className="works-track">{marqueeProjects.map((project, index) => <button className="work-card" key={`${project.id}-${index}`} onClick={() => openPortfolio(project)} aria-label={`Explore ${project.title}`}><img src={project.image} alt=""/><span><b>{String(project.serial).padStart(2, '0')}</b><em>{project.title}</em><small>{project.year}</small></span></button>)}</div></div></section>
  </section><DraggableAdminTrigger/></main>{modal && <ModalLayer type={modal} projects={projects} selected={selected} close={() => setModal(null)}/>}</>;
}
