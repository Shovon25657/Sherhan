import { assignedAdminEmail, getSession, readAdmin } from '../../../../src/lib/auth';

export async function GET() {
  const [admin, session] = await Promise.all([readAdmin(), getSession()]);
  return Response.json({ configured: Boolean(admin), authenticated: Boolean(session), assignedEmail: assignedAdminEmail().replace(/(^.).*(@.*$)/, '$1••••$2') });
}
