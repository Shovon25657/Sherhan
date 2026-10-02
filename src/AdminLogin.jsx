'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ busy: false, message: '', error: false });
  useEffect(() => { fetch('/api/auth/status').then(response => response.json()).then(data => { if (!data.configured) setMode('setup'); if (data.authenticated) router.replace('/admin'); }); }, [router]);
  const call = async (url, payload) => {
    setStatus({ busy: true, message: '', error: false });
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json();
    setStatus({ busy: false, message: result.error || result.message || '', error: !response.ok });
    return { response, result };
  };
  const login = async event => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); const { response } = await call('/api/auth/login', data); if (response.ok) router.replace('/admin'); };
  const requestCode = async event => { event.preventDefault(); const value = new FormData(event.currentTarget).get('email'); setEmail(value); const { response, result } = await call('/api/auth/request-code', { email: value }); if (response.ok) { setStep('credentials'); if (result.developmentCode) setStatus({ busy: false, error: false, message: `Local preview code: ${result.developmentCode}` }); } };
  const setup = async event => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); const { response } = await call('/api/auth/setup', { ...data, email }); if (response.ok) router.replace('/admin'); };
  return <main className="auth-page"><section className="auth-brand"><Link href="/">← BACK TO STUDIO</Link><div><span>SH / OWNER ACCESS</span><h1>THE<br/>CONTROL<br/><em>ROOM.</em></h1><p>A private entrance for curating Sherhan’s work, stories and studio presence.</p></div><small>SECURE AREA / AUTHORISED OWNER ONLY</small></section><section className="auth-panel"><div className="auth-card"><i className="auth-mark">S</i><span className="admin-kicker">{mode === 'setup' ? 'FIRST-TIME OWNER SETUP' : 'OWNER SIGN IN'}</span><h2>{mode === 'setup' ? 'Create your studio key.' : 'Welcome back.'}</h2>
    {mode === 'login' ? <form key="login" onSubmit={login}><label>USERNAME<input name="username" required autoComplete="username"/></label><label>PASSWORD<input name="password" type="password" required autoComplete="current-password"/></label><button disabled={status.busy}>{status.busy ? 'CHECKING…' : 'ENTER DASHBOARD →'}</button><button className="auth-text-button" type="button" onClick={() => setMode('setup')}>Trying it for the first time?</button></form> : step === 'email' ? <form key="verify-email" onSubmit={requestCode}><p>Use the email assigned to this portfolio. We’ll verify ownership before creating credentials.</p><label>ASSIGNED EMAIL<input name="email" type="email" required autoComplete="email"/></label><button disabled={status.busy}>{status.busy ? 'PREPARING…' : 'SEND VERIFICATION CODE →'}</button><button className="auth-text-button" type="button" onClick={() => setMode('login')}>I already have an account</button></form> : <form key="create-credentials" onSubmit={setup}><p>Enter the six-digit code, then choose the username and password you’ll use from now on.</p><label>VERIFICATION CODE<input name="code" inputMode="numeric" pattern="[0-9]{6}" maxLength="6" required autoFocus/></label><label>USERNAME<input name="username" minLength="3" required autoComplete="username"/></label><label>CREATE PASSWORD<input name="password" type="password" minLength="10" required autoComplete="new-password"/></label><small>10+ characters with a letter, number and symbol.</small><button disabled={status.busy}>{status.busy ? 'CREATING…' : 'CREATE OWNER ACCESS →'}</button></form>}
    {status.message && <p className={status.error ? 'auth-message is-error' : 'auth-message'} role="status">{status.message}</p>}</div></section></main>;
}
