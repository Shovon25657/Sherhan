import { assignedAdminEmail, createSession, readAdmin, saveAdmin, verifyCode } from '../../../../src/lib/auth';

export async function POST(request) {
  const { email = '', code = '', username = '', password = '' } = await request.json().catch(() => ({}));
  if (await readAdmin()) return Response.json({ error: 'The owner account is already configured.' }, { status: 409 });
  if (email.trim().toLowerCase() !== assignedAdminEmail() || !verifyCode(email, code)) return Response.json({ error: 'The verification code is invalid or expired.' }, { status: 401 });
  if (!/^[a-zA-Z0-9_.-]{3,32}$/.test(username)) return Response.json({ error: 'Username must be 3–32 letters, numbers, dots, dashes or underscores.' }, { status: 400 });
  if (password.length < 10 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) return Response.json({ error: 'Use at least 10 characters with a letter, number and symbol.' }, { status: 400 });
  await saveAdmin({ email: email.toLowerCase(), username, password });
  await createSession(username);
  return Response.json({ ok: true });
}
