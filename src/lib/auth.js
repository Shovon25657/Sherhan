import 'server-only';

import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { cookies } from 'next/headers';

const dataDirectory = path.join(process.cwd(), '.data');
const credentialsFile = path.join(dataDirectory, 'admin.json');
const sessionName = 'sherhan_admin_session';
const pendingCodes = new Map();

const secret = () => {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  if (process.env.NODE_ENV === 'production') throw new Error('SESSION_SECRET is required in production.');
  return 'local-development-only-sherhan-session-secret';
};
const sign = value => crypto.createHmac('sha256', secret()).update(value).digest('base64url');
const safeEqual = (first, second) => {
  const a = Buffer.from(first || '');
  const b = Buffer.from(second || '');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
};

export async function readAdmin() {
  try { return JSON.parse(await fs.readFile(credentialsFile, 'utf8')); }
  catch { return null; }
}

export async function saveAdmin({ email, username, password }) {
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = await new Promise((resolve, reject) => crypto.scrypt(password, salt, 64, (error, key) => error ? reject(error) : resolve(key.toString('hex'))));
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(credentialsFile, JSON.stringify({ email, username, salt, passwordHash }, null, 2));
}

export async function verifyPassword(password, admin) {
  const hash = await new Promise((resolve, reject) => crypto.scrypt(password, admin.salt, 64, (error, key) => error ? reject(error) : resolve(key.toString('hex'))));
  return safeEqual(hash, admin.passwordHash);
}

export function issueCode(email) {
  const code = String(crypto.randomInt(100000, 1000000));
  pendingCodes.set(email.toLowerCase(), { codeHash: sign(code), expires: Date.now() + 10 * 60 * 1000 });
  return code;
}

export function verifyCode(email, code) {
  const record = pendingCodes.get(email.toLowerCase());
  if (!record || record.expires < Date.now() || !safeEqual(sign(code), record.codeHash)) return false;
  pendingCodes.delete(email.toLowerCase());
  return true;
}

export async function createSession(username) {
  const expires = Date.now() + 12 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ username, expires })).toString('base64url');
  (await cookies()).set(sessionName, `${payload}.${sign(payload)}`, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 12 * 60 * 60 });
}

export async function getSession() {
  try {
    const value = (await cookies()).get(sessionName)?.value;
    const [payload, signature] = value?.split('.') || [];
    if (!payload || !safeEqual(sign(payload), signature)) return null;
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return session.expires > Date.now() ? session : null;
  } catch { return null; }
}

export async function clearSession() { (await cookies()).delete(sessionName); }
export function assignedAdminEmail() { return (process.env.ADMIN_EMAIL || 'caffinixtech@gmail.com').toLowerCase(); }
