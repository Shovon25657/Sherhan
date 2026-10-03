import 'server-only';

import nodemailer from 'nodemailer';

const smtpSettings = () => ({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: (process.env.SMTP_SECURE || 'true').toLowerCase() === 'true',
  user: process.env.SMTP_USER || '',
  password: (process.env.SMTP_APP_PASSWORD || '').replace(/\s/g, ''),
  from: process.env.SMTP_FROM || process.env.SMTP_USER || '',
});

export function isSmtpConfigured() {
  const settings = smtpSettings();
  return Boolean(settings.user && settings.password && settings.from);
}

function verificationEmail(code) {
  return {
    subject: 'Hey Sherhan! Entering your secret place?',
    text: `Hey Sherhan!\n\nEntering your secret place? If yes, use this secret code: ${code}\n\nIt expires in 5 minutes. If this was not you, you can ignore this email.`,
    html: `<!doctype html><html><body style="margin:0;background:#f3ead7;color:#161616;font-family:Arial,sans-serif"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3ead7"><tr><td align="center" style="padding:28px 14px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;border:4px solid #161616;background:#ffd83d;box-shadow:10px 10px 0 #ef6257"><tr><td style="padding:14px 22px;border-bottom:4px solid #161616;background:#65d8e8;font:700 12px/1.2 monospace;letter-spacing:2px">SHERHAN HOSSAIN · OWNER ACCESS</td></tr><tr><td style="padding:36px 24px"><h1 style="max-width:500px;margin:0 0 16px;font:900 38px/1 Arial,sans-serif;text-transform:uppercase">Hey Sherhan!<br><span style="display:inline-block;margin-top:12px">Entering your secret place?</span></h1><p style="margin:0 0 28px;font-size:17px;line-height:1.6">If yes, use this secret code to continue into your studio control room.</p><div style="margin:0 0 28px"><span title="Select and copy this verification code" style="display:inline-block;padding:13px 18px;border:3px solid #161616;background:#fffaf0;box-shadow:4px 4px 0 #161616;color:#161616;font:700 28px/1 monospace;letter-spacing:12px;text-align:center;user-select:all">${code}</span><div style="margin-top:10px;font:700 11px/1.4 monospace;letter-spacing:1px">PRESS AND HOLD OR SELECT THE CODE TO COPY</div></div><p style="margin:0;font:700 13px/1.6 monospace">VALID FOR 5 MINUTES.<br>IF THIS WASN'T YOU, IGNORE THIS MESSAGE.</p></td></tr><tr><td style="padding:13px 22px;border-top:4px solid #161616;background:#ef6257;color:#fff;font:700 12px/1.2 monospace;letter-spacing:1px">KEEP THE CODE SECRET · SHERHAN STUDIO</td></tr></table></td></tr></table></body></html>`,
  };
}

export async function sendVerificationCode({ email, code }) {
  const settings = smtpSettings();
  if (!isSmtpConfigured()) throw new Error('SMTP_NOT_CONFIGURED');
  const transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: { user: settings.user, pass: settings.password },
  });
  const content = verificationEmail(code);
  await transporter.sendMail({
    from: `Sherhan Studio <${settings.from}>`,
    to: email,
    ...content,
  });
}
