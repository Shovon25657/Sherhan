import { createSession, readAdmin, verifyPassword } from '../../../../src/lib/auth';

export async function POST(request) {
  const { username = '', password = '' } = await request.json().catch(() => ({}));
  const admin = await readAdmin();
  if (!admin) return Response.json({ error: 'Complete first-time setup before signing in.' }, { status: 409 });
  if (username !== admin.username || !(await verifyPassword(password, admin))) return Response.json({ error: 'Username or password is incorrect.' }, { status: 401 });
  await createSession(admin.username);
  return Response.json({ ok: true });
}
