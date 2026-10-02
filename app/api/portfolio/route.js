import { portfolioData } from '../../../src/data/portfolio';

export async function GET() {
  return Response.json(portfolioData);
}
