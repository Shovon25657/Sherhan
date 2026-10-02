import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';
import { projects as sampleProjects } from '../data/portfolio';

const dataDirectory = path.join(process.cwd(), '.data');
const projectsFile = path.join(dataDirectory, 'projects.json');

export async function getProjects() {
  try {
    const saved = JSON.parse(await fs.readFile(projectsFile, 'utf8'));
    return [...saved, ...sampleProjects];
  } catch { return sampleProjects; }
}

export async function addProject(project, files) {
  const uploadDirectory = path.join(process.cwd(), 'public', 'uploads');
  await Promise.all([fs.mkdir(dataDirectory, { recursive: true }), fs.mkdir(uploadDirectory, { recursive: true })]);
  const images = [];
  for (const [index, file] of files.entries()) {
    const imageTypes = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif' };
    if (!file?.size || !imageTypes[file.type] || file.size > 8 * 1024 * 1024) continue;
    const extension = imageTypes[file.type];
    const filename = `${project.id}-${index + 1}.${extension}`;
    await fs.writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()));
    images.push(`/uploads/${filename}`);
  }
  if (!images.length) throw new Error('Add at least one valid image under 8 MB.');
  let saved = [];
  try { saved = JSON.parse(await fs.readFile(projectsFile, 'utf8')); } catch {}
  const complete = { ...project, image: images[0], images };
  saved.unshift(complete);
  await fs.writeFile(projectsFile, JSON.stringify(saved, null, 2));
  return complete;
}
