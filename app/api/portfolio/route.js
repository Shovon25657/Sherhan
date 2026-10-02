import { portfolioData } from '../../../src/data/portfolio';
import { getProjects } from '../../../src/lib/content';

export async function GET() {
  return Response.json({ ...portfolioData, projects: await getProjects() });
}
