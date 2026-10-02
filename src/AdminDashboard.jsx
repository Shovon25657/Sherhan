'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const greeting = hour => hour < 12 ? 'Good morning.' : hour < 18 ? 'Good afternoon.' : 'Good evening.';

export default function AdminDashboard({ username, initialCount, serviceCount, toolCount }) {
  const router = useRouter();
  const [salutation] = useState(() => greeting(new Date().getHours()));
  const [count, setCount] = useState(initialCount);
  const [formStatus, setFormStatus] = useState({ busy: false, message: '', error: false });
  const submitProject = async event => {
    event.preventDefault(); setFormStatus({ busy: true, message: '', error: false });
    const form = event.currentTarget;
    const response = await fetch('/api/projects', { method: 'POST', body: new FormData(form) });
    const result = await response.json();
    setFormStatus({ busy: false, message: result.error || 'Project published to the portfolio.', error: !response.ok });
    if (response.ok) { form.reset(); setCount(value => value + 1); }
  };
  const logout = async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.replace('/admin/login'); };
  const sections = [{ label: 'Projects', count }, { label: 'Services', count: serviceCount }, { label: 'Tools', count: toolCount }, { label: 'Profile', count: 1 }];
  return <main className="admin-page"><aside className="admin-sidebar"><div><span className="admin-kicker">SH / STUDIO</span><h1>PORTFOLIO<br/>ADMIN</h1></div><nav aria-label="Admin navigation"><a className="is-active" href="#overview">Overview</a><a href="#projects">Projects</a><a href="#roadmap">Roadmap</a></nav><div className="admin-side-actions"><Link href="/">← View portfolio</Link><button onClick={logout}>Sign out</button></div></aside><section className="admin-content"><header className="admin-header" id="overview"><div><span className="admin-kicker">OWNER / {username.toUpperCase()}</span><h2>{salutation}</h2><p>Curate the work visitors see across both the moving work reel and the full personal portfolio.</p></div><span className="admin-status"><i/> OWNER SESSION ACTIVE</span></header><div className="admin-grid">{sections.map((section, index) => <article className="admin-card" key={section.label}><span>0{index + 1}</span><strong>{section.count}</strong><h3>{section.label}</h3><p>{section.label === 'Projects' ? 'Published work and gallery entries.' : `Portfolio ${section.label.toLowerCase()} foundation.`}</p><a href={section.label === 'Projects' ? '#projects' : '#roadmap'}>{section.label === 'Projects' ? 'ADD PROJECT' : 'PLANNED'}</a></article>)}</div><section className="project-editor" id="projects"><div><span className="admin-kicker">PUBLISH A PROJECT</span><h2>One upload.<br/>Two destinations.</h2><p>New work appears in the automatic landing-page reel and the categorized portfolio browser.</p></div><form onSubmit={submitProject}><div className="editor-fields"><label>PROJECT TITLE<input name="title" required/></label><label>CATEGORY<select name="category" required><option value="">Choose one</option><option>Architecture</option><option>Interior Design</option><option>Space Planning</option><option>3D Visualization</option><option>Concept Design</option><option>Site Consultancy</option></select></label><label>SERIAL NUMBER<input name="serial" type="number" min="1" required/></label><label>LOCATION<input name="location" required/></label><label>YEAR<input name="year" inputMode="numeric" pattern="[0-9]{4}" required/></label><label className="wide">SHORT DESCRIPTION<textarea name="description" rows="4" minLength="10" required/></label><label className="wide upload-field">PROJECT IMAGES<input name="images" type="file" accept="image/*" multiple required/><span>Upload one or more JPG, PNG or WebP files (8 MB each).</span></label></div><button disabled={formStatus.busy}>{formStatus.busy ? 'PUBLISHING…' : 'PUBLISH PROJECT →'}</button>{formStatus.message && <p className={formStatus.error ? 'form-error' : 'form-success'}>{formStatus.message}</p>}</form></section><section className="admin-roadmap" id="roadmap"><div><span className="admin-kicker">NEXT DASHBOARD PHASE</span><h2>Content control without changing the design.</h2></div><ol><li><b>01</b><span><strong>Production database</strong>Move local prototype content into durable hosted storage.</span></li><li><b>02</b><span><strong>Media library</strong>Cloud image optimisation, reordering and deletion.</span></li><li><b>03</b><span><strong>Full editing</strong>Edit services, profile, links and existing projects.</span></li><li><b>04</b><span><strong>Publishing</strong>Draft, preview and publish workflow with validation.</span></li></ol></section></section></main>;
}
