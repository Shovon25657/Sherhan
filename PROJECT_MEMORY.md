# Sherhan Portfolio — Project Memory

Last updated: 2026-10-02

## Project concept

Sherhan Hossain is an architect. This project is his interactive portfolio website: a playful, retro/editorial interface inspired by the supplied Dribbble reference while remaining tailored to architecture. The experience should feel polished enough for client presentation, stay within a single viewport, and make the work gallery the primary scrollable element.

## Visual and interaction direction

- Retro, cartoon-like editorial layout with strong black outlines, warm paper, coral, cyan, red, pink, and yellow.
- Full-screen yellow introduction with the selected “Panel Reveal” animation.
- Intro sequence reveals the name first, then descriptor and Enter Studio control.
- Main portfolio stays fixed in the viewport; the horizontal work rail responds to wheel input with smooth momentum.
- Work cards open project details in a modal with one click.
- Navigation icons show labels on hover.
- Social icons link to LinkedIn, Instagram, and email.
- Portfolio and contact panels open modal experiences.
- Profile image uses `public/dp.jpg` and is deliberately enlarged/cropped for visibility.
- No intro sound is currently included. Sound was explored and deliberately postponed.

## Technical foundation

- Framework: Next.js with the App Router.
- Frontend: React client component plus the existing handcrafted CSS animation/design system.
- Backend foundation: Next.js Route Handlers under `app/api`.
- Admin foundation: `/admin`, with overview cards and a staged implementation roadmap.
- Public content endpoints: `/api/portfolio` and `/api/health`.
- Static profile asset: `public/dp.jpg`.
- Current development branch: `shovon_dev`.
- Existing GitHub Pages production site remains on `main`; this migration does not deploy or replace it.

## Work completed before the Next.js migration

- Built the architecture portfolio prototype in React/Vite.
- Matched the supplied retro portfolio reference closely.
- Added the Panel Reveal intro and Enter Studio transition.
- Added hover labels to navigation icons.
- Enlarged and aligned the profile photo.
- Added ten sample architecture projects.
- Added project, portfolio, and contact modals.
- Added smooth momentum-based horizontal work scrolling.
- Published the earlier Vite build to GitHub Pages from `main`.

## Work completed in this migration

- Replaced Vite runtime/build scripts with Next.js.
- Added App Router root layout and portfolio page.
- Preserved the existing visual experience as a client-rendered portfolio component.
- Added a responsive admin-dashboard foundation.
- Added initial server API routes for health and portfolio content.
- Added shared portfolio-data scaffolding for future database integration.
- Updated documentation and ignore rules for Next.js.

## Remaining work / future decisions

1. Confirm exactly which fields the owner should edit in the admin dashboard.
2. Choose authentication provider and define owner/admin roles.
3. Choose a production database and model projects, services, tools, profile, social links, and site settings.
4. Choose image storage and transformation service for project uploads.
5. Replace placeholder social/contact URLs and sample project data with final client content.
6. Connect the public portfolio to database-backed content.
7. Build create/edit/delete, ordering, draft preview, and publishing controls.
8. Add validation, loading/error states, audit-safe destructive actions, and access protection.
9. Select hosting that supports the Next.js server runtime; GitHub Pages cannot run server Route Handlers or a dynamic admin backend.
10. Revisit optional copyright-free intro audio only if the client requests it.

## Guardrails for future changes

- Preserve the current landing-page layout and theme unless the user explicitly requests a redesign.
- The page itself should not scroll during the portfolio experience; only the work rail should horizontally scroll.
- Keep the Panel Reveal intro as the selected animation.
- Do not add automatic music without explicit approval.
- Do not modify or deploy the `main` branch unless explicitly requested.
- Keep this file updated after meaningful implementation or product decisions.
