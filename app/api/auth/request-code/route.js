import { assignedAdminEmail, issueCode, readAdmin } from '../../../../src/lib/auth';

export async function POST(request) {
  const { email = '' } = await request.json().catch(() => ({}));
  if (await readAdmin()) return Response.json({ error: 'The owner account is already configured.' }, { status: 409 });
  if (email.trim().toLowerCase() !== assignedAdminEmail()) return Response.json({ error: 'Use the email assigned to this portfolio.' }, { status: 403 });
  const code = issueCode(email);
  // Production delivery will be connected to the client's verified email provider.
  if (process.env.NODE_ENV === 'production') return Response.json({ error: 'Email delivery is not configured yet.' }, { status: 503 });
  return Response.json({ ok: true, developmentCode: code, message: 'Local verification code generated.' });
}
