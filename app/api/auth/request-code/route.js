import { assignedAdminEmail, issueCode, readAdmin } from '../../../../src/lib/auth';
import { isSmtpConfigured, sendVerificationCode } from '../../../../src/lib/mail';

export const runtime = 'nodejs';

export async function POST(request) {
  const { email = '' } = await request.json().catch(() => ({}));
  if (await readAdmin()) return Response.json({ error: 'The owner account is already configured.' }, { status: 409 });
  if (email.trim().toLowerCase() !== assignedAdminEmail()) return Response.json({ error: 'Use the email assigned to this portfolio.' }, { status: 403 });
  const normalizedEmail = email.trim().toLowerCase();
  const code = issueCode(normalizedEmail);
  if (!isSmtpConfigured()) {
    if (process.env.NODE_ENV === 'production') return Response.json({ error: 'Verification email delivery is not configured.' }, { status: 503 });
    return Response.json({ ok: true, developmentCode: code, message: 'Local verification code generated. Add Gmail SMTP settings to send it by email.' });
  }
  try {
    await sendVerificationCode({ email: normalizedEmail, code });
    return Response.json({ ok: true, message: 'A six-digit secret code was sent to the assigned email.' });
  } catch (error) {
    console.error('Verification email delivery failed:', error instanceof Error ? error.message : error);
    return Response.json({ error: 'The verification email could not be sent. Check the Gmail SMTP settings and try again.' }, { status: 502 });
  }
}
