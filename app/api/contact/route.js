import fs from 'node:fs/promises';
import path from 'node:path';

export async function POST(request) {
  const { name = '', email = '', message = '' } = await request.json().catch(() => ({}));
  if (name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(email) || message.trim().length < 10) return Response.json({ error: 'Please complete every field and write at least 10 characters.' }, { status: 400 });
  const directory = path.join(process.cwd(), '.data');
  const file = path.join(directory, 'messages.json');
  await fs.mkdir(directory, { recursive: true });
  let messages = [];
  try { messages = JSON.parse(await fs.readFile(file, 'utf8')); } catch {}
  messages.push({ name: name.trim(), email: email.trim(), message: message.trim(), receivedAt: new Date().toISOString() });
  await fs.writeFile(file, JSON.stringify(messages, null, 2));
  return Response.json({ ok: true, message: 'Your note is safely received.' });
}
