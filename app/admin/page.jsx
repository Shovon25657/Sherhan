import Link from 'next/link';
import { projects, services, tools } from '../../src/data/portfolio';

export const metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

const sections = [
  { label: 'Projects', count: projects.length, note: 'Manage work cards, project details and ordering.' },
  { label: 'Services', count: services.length, note: 'Edit the services displayed on the portfolio.' },
  { label: 'Tools', count: tools.length, note: 'Maintain software and skills shown in the tools panel.' },
  { label: 'Profile', count: 1, note: 'Update biography, portrait, links and contact details.' },
];

export default function AdminPage() {
  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div>
          <span className="admin-kicker">SH / STUDIO</span>
          <h1>PORTFOLIO<br />ADMIN</h1>
        </div>
        <nav aria-label="Admin navigation">
          <a className="is-active" href="#overview">Overview</a>
          <a href="#content">Content</a>
          <a href="#roadmap">Roadmap</a>
        </nav>
        <Link href="/">← View portfolio</Link>
      </aside>

      <section className="admin-content">
        <header className="admin-header" id="overview">
          <div>
            <span className="admin-kicker">DASHBOARD FOUNDATION</span>
            <h2>Good morning.</h2>
            <p>The portfolio content is ready to be connected to a database and secure editing workflow.</p>
          </div>
          <span className="admin-status"><i /> LOCAL DEVELOPMENT</span>
        </header>

        <div className="admin-grid" id="content">
          {sections.map((section, index) => (
            <article className="admin-card" key={section.label}>
              <span>0{index + 1}</span>
              <strong>{section.count}</strong>
              <h3>{section.label}</h3>
              <p>{section.note}</p>
              <button type="button" disabled title="Editing will be enabled in the next dashboard phase">COMING NEXT</button>
            </article>
          ))}
        </div>

        <section className="admin-roadmap" id="roadmap">
          <div>
            <span className="admin-kicker">IMPLEMENTATION ROADMAP</span>
            <h2>Built to grow without redesigning the portfolio.</h2>
          </div>
          <ol>
            <li><b>01</b><span><strong>Authentication</strong>Secure owner sign-in and protected admin routes.</span></li>
            <li><b>02</b><span><strong>Content storage</strong>Database-backed projects, services, tools and profile content.</span></li>
            <li><b>03</b><span><strong>Media library</strong>Optimised project-image uploads and profile-photo management.</span></li>
            <li><b>04</b><span><strong>Publishing</strong>Draft, preview and publish workflow with validation.</span></li>
          </ol>
        </section>
      </section>
    </main>
  );
}
