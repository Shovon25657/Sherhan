import crypto from 'node:crypto';
import { addProject, getProjects } from '../../../src/lib/content';
import { getSession } from '../../../src/lib/auth';

export async function GET() { return Response.json({ projects: await getProjects() }); }

export async function POST(request) {
  if (!(await getSession())) return Response.json({ error: 'Sign in as the owner first.' }, { status: 401 });
  const form = await request.formData();
  const title = String(form.get('title') || '').trim();
  const type = String(form.get('category') || '').trim();
  const summary = String(form.get('description') || '').trim();
  const location = String(form.get('location') || '').trim();
  const year = String(form.get('year') || '').trim();
  const serial = Number(form.get('serial'));
  if (title.length < 2 || !type || summary.length < 10 || !location || !/^\d{4}$/.test(year) || !Number.isFinite(serial)) return Response.json({ error: 'Complete every project field with valid information.' }, { status: 400 });
  try {
    const project = await addProject({ id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${crypto.randomBytes(3).toString('hex')}`, title, type, summary, location, year, serial }, form.getAll('images'));
    return Response.json({ ok: true, project }, { status: 201 });
  } catch (error) { return Response.json({ error: error.message }, { status: 400 }); }
}
