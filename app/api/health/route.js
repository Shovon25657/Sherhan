export async function GET() {
  return Response.json({
    ok: true,
    service: 'sherhan-portfolio',
    runtime: 'nextjs',
    timestamp: new Date().toISOString(),
  });
}
