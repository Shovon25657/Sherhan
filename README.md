# Sherhan Portfolio

An interactive architecture portfolio for Sherhan Hossain, built as a full-stack Next.js application.

## Local development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`. Owner access starts at `/admin/login` and is also linked by the retro `S` button on the portfolio.

Copy `.env.example` to `.env.local` and set `ADMIN_EMAIL` plus a long random `SESSION_SECRET` before testing owner setup. In local development, the verification code is shown in the setup interface; production email delivery still requires a provider integration.

Project uploads and contact messages currently use ignored local prototype storage (`.data` and `public/uploads`). Replace this with a production database, transactional email provider, and cloud media storage before deployment.

Open:

- Portfolio: `http://127.0.0.1:3000`
- Admin foundation: `http://127.0.0.1:3000/admin`
- Portfolio API: `http://127.0.0.1:3000/api/portfolio`
- Health API: `http://127.0.0.1:3000/api/health`

## Production build

```bash
npm run build
npm start
```

The admin route is currently a visual and architectural foundation. Authentication, persistent database storage, image uploads, and publishing controls are intentionally reserved for the next phase, when requirements are confirmed.
