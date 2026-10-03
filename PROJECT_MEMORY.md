# Sherhan Portfolio — Project Memory

Last updated: 2026-10-04

## Project concept

Sherhan Hossain is an architect. This project is his interactive portfolio website: a playful, retro/editorial interface inspired by the supplied Dribbble reference while remaining tailored to architecture. The experience should feel polished enough for client presentation, stay within a single viewport, and make the work gallery the primary scrollable element.

## Visual and interaction direction

- Retro, cartoon-like editorial layout with strong black outlines, warm paper, coral, cyan, red, pink, and yellow.
- Full-screen yellow introduction with the selected “Panel Reveal” animation.
- Intro sequence reveals the name first, then descriptor and Enter Studio control.
- Main portfolio stays fixed in the viewport; the work rail is a seamless, automatic horizontal loop that pauses while hovered or keyboard-focused so cards remain clickable.
- Work cards open the corresponding project inside the full personal-portfolio experience.
- Navigation icons show labels on hover.
- Social icons link to LinkedIn, Instagram, and email.
- Portfolio, résumé, and contact panels open modal experiences.
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

## October 2026 interaction and admin milestone

- Simplified hero navigation to Home and About only, with improved alignment.
- Connected About to the supplied `public/resume.png` in a scrollable retro résumé window.
- Replaced the manual work rail with a duplicated, seamless automatic marquee; removed View More and the scroll instruction.
- Built a full personal-portfolio browser with six service categories, square project tiles, responsive layout, project metadata, and full-screen multi-image slideshow views.
- Made work-reel cards route directly into their corresponding portfolio-project view.
- Added a visitor contact form with server validation and local prototype message persistence.
- Added the bottom-right retro `S` owner/admin entry point.
- Added first-time owner setup: assigned-email validation, expiring verification code, username/password creation, scrypt password hashing, signed HTTP-only session cookies, login, logout, and protected `/admin` access.
- Added time-aware dashboard greeting based on the visitor computer clock.
- Added an authenticated project publishing form with title, category, description, serial, location, year, and multi-image uploads. Locally published projects feed both the public work reel and personal portfolio.
- Added `.env.example` for the assigned admin email and production session secret.
- Email verification displays its code only in local development. Production email delivery remains intentionally unconfigured until provider credentials are supplied.

## October 2026 visual refinement

- Centered the Home and About controls evenly between the profile portrait and Let’s Talk action.
- Standardized the About window label to plain English `RESUME`.
- Replaced the pale work-marquee edge fades with narrow retro coral, yellow, and cyan patterned rails.
- Simplified the project-browser heading to `PERSONAL PORTFOLIO` and redesigned category filtering as numbered, color-coded discipline tabs with a live visible-project count.

## October 2026 portfolio browser and album refinement

- Replaced the colorful work-reel edge rails with narrow translucent paper fades so projects appear to pass naturally through a restrained window.
- Reduced `PERSONAL PORTFOLIO` to a compact single-line window heading.
- Replaced the permanently visible category tabs with a `CATEGORY` pop-up selector. `All categories` is the unnumbered default; the six real disciplines are numbered `01` through `06`.
- Removed the `GALLERY` metadata row from individual project views.
- Expanded every sample project to three images so the album interaction can be evaluated immediately.
- Rebuilt the project viewer as a mouse- and touch-swipe photo album with bidirectional page-turn animation, previous/next buttons, an image counter, and a folded-corner `DRAG / SWIPE TO TURN` cue.
- Disabled native image dragging inside the album so desktop swipe gestures remain reliable.

## October 2026 responsive album polish

- Simplified the automatic work reel to an unobstructed image flow with only solid three-pixel side edges, removing the translucent white overlay bars.
- Updated project serial numbers to a cleaner monospaced typographic treatment.
- Colored the `PORTFOLIO` word in the Personal Portfolio heading with the same coral-red used by the close control.
- Replaced the project viewer's previous/next arrows, instruction strip, and page counter with a retro spiral album binding and a minimal folded page-corner cue.
- Made forward and backward navigation use mirrored page-turn animations while retaining mouse-drag and touch-swipe gestures.
- Hardened project-title and metadata wrapping so long content remains inside the viewer grid on desktop and mobile.
- Reinforced the `ABOUT / RESUME` window label contrast so every character remains legible.

## October 2026 album counter and owner-access refinement

- Added the current/total image count (for example, `3/10`) directly inside the folded bottom-right album-page corner without changing the approved page-turn interaction.
- Assigned `caffinixtech@gmail.com` as the initial portfolio owner email.
- Redesigned the owner entry screen around `THE SECRET PLACE`, with a tactile retro Back to Studio button, concise non-owner guidance, and a simplified `AUTHORISED OWNER ONLY` notice.
- Renamed first-time setup messaging to `Manage your studio` and improved the account-switch action typography.
- Documented the future Gmail SMTP environment-variable handover; no SMTP credentials or secrets are committed to the repository.

## October 2026 GitHub Pages client preview

- Published the latest `shovon_dev` portfolio presentation as a GitHub Pages client-review build at `https://shovon25657.github.io/Sherhan/`.
- Added a conditional Next.js static-export configuration with the repository base path, while preserving the normal full-stack local build.
- Updated the Pages workflow to deploy on pushes to `shovon_dev` without modifying `main`.
- Kept the résumé and profile assets working under the GitHub repository sub-path.
- In the static preview, the contact form opens a pre-filled email draft. Server-only admin authentication, persistence, and API actions remain in the source branch and require a Node-capable production host.

## October 2026 movable owner access

- Made the floating `S` owner/admin button draggable with mouse, pen, or touch while preserving a normal click to open owner login.
- The chosen position is kept inside the viewport, re-clamped after window resizing, and remembered in that visitor's browser with local storage.
- This interaction is currently local-only and awaits client approval before committing or publishing.

## October 2026 owner email verification

- Confirmed that every first-time visitor sees the movable `S` owner button in the bottom-right corner; only an explicitly saved visitor position overrides that default.
- Connected first-time owner setup to Gmail SMTP using Nodemailer and the assigned `caffinixtech@gmail.com` address.
- Kept verification codes numeric and six digits long, with a five-minute expiry and one-time use.
- Added a responsive retro HTML verification email plus a plain-text fallback, with the subject `Hey Sherhan — entering your secret place?`.
- SMTP credentials remain server-only environment variables. Local development still shows a clearly labeled development code when SMTP has not yet been configured; production never exposes a code in the response.
- Created and configured the dedicated `Sherhan Portfolio SMTP` Google App Password locally, then verified end-to-end delivery to `caffinixtech@gmail.com`. Gmail rendered the retro message correctly and the live API response did not expose the verification code.
- Refined the email subject and retro heading to `Hey Sherhan! Entering your secret place?`, and made the numeric code a single selectable value. Email clients block clipboard scripts, so the message labels the code for press-and-hold or normal selection/copy instead of showing a non-functional button.
- Standardised tactile hover/focus motion across the owner-authentication actions and renamed the sign-in action to `ENTER MY SPACE`.
- Added a real clipboard control beside the public contact email and a download control in the résumé window.
- Refined those controls after review: the résumé action is now a compact retro `DOWNLOAD?` text button beside the close button, and the contact copy action is a small icon-only control with accessible copied feedback.
- Reset the local owner record so the first-time email verification and credential-creation flow can be tested again; the assigned Gmail address and SMTP credentials remain configured locally for delivery.
- Owner sessions are now accepted only while a matching owner record exists, so resetting setup also invalidates any previously issued browser session.
- Added an in-place resend control beside the verification-code field. It issues a fresh email/code, invalidates the previous code, restarts the five-minute validity window, and exposes a `Send code again` hover/focus label.
- Increased the spacing and legibility of the résumé `DOWNLOAD?` action, and reduced the contact-email copy control to a tiny icon aligned with the email text.

## Remaining work / future decisions

1. Add the temporary Gmail App Password to local/server environment variables, test real verification delivery, then replace those values with the client's Gmail credentials at handover.
2. Choose a production database and migrate the local `.data` prototype storage into it.
3. Choose cloud image storage/transformation; local `public/uploads` is development-only and not durable on serverless hosting.
4. Replace placeholder social/contact URLs and sample project data with final client content.
5. Build edit/delete, drag ordering, draft preview, and publishing controls for existing projects.
6. Add dashboard controls for services, tools, profile, résumé, links, and site settings.
7. Add rate limiting, password reset/recovery, verification attempt limits, audit logging, and a production auth review.
8. Select production hosting that supports the Next.js server runtime; the GitHub Pages URL is the client-facing visual preview and cannot run the APIs or admin backend.
9. Revisit optional copyright-free intro audio only if the client requests it.

## Guardrails for future changes

- Preserve the current landing-page layout and theme unless the user explicitly requests a redesign.
- The landing page itself should not scroll; layered portfolio and résumé experiences may scroll within their own windows.
- Keep the work rail as an automatic infinite loop, with hover/focus pause for reliable project selection.
- Keep the Panel Reveal intro as the selected animation.
- Do not add automatic music without explicit approval.
- Do not modify or deploy the `main` branch unless explicitly requested.
- Keep this file updated after meaningful implementation or product decisions.
