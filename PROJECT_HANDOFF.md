# OnePlace Project Handoff

Last updated: August 5, 2026
Repository: https://github.com/CaseyVandyke/OnePlace  
Live prototype: https://caseyvandyke.github.io/OnePlace/  
Current handoff baseline: commit `a8166f9`

## Read this first

This document is the durable context for continuing OnePlace in a new OpenAI
account or a new development conversation. Read it before changing the product.

OnePlace is currently a polished, front-end-only product concept. It uses
fictional demonstration data and must not be treated as a secure place for real
documents, passwords, financial information, or vault codes.

## Product vision

OnePlace is a warm, approachable place for someone to organize everything their
family or trusted people may need after their death or incapacity.

The person preparing their affairs is the primary customer. Trusted people are
secondary users tied to the owner's account. They should only receive access to
specific information the owner explicitly shares, and only at the time or under
the conditions the owner chooses.

Information the eventual product may organize includes:

- Wills, identification, powers of attorney, and other legal documents
- Bank, retirement, investment, debt, and bill information
- Life, disability, health, and long-term-care insurance
- Advance directives and care wishes
- Passwords, device access, digital accounts, and vault codes
- Trusted people, heirs, and access permissions
- Possessions and keepsakes, including who should receive each item
- Personal notes, letters, stories, and audio recordings

Institution integrations may be considered later. They are not part of the
current prototype.

## Product personality and visual direction

- Working name: **OnePlace**
- Tone: warm and comforting first, never clinical or gloomy
- Core colors: red, purple, and blue
- The experience should feel like a family journey rather than a recovery app,
  enterprise dashboard, or checklist of death-related chores.
- Gamification is meaningful rather than childish: users earn **Glow**, light
  locations on a map, complete small steps, and travel with a friendly golden
  retriever puppy guide between destinations.
- The primary audience includes older adults. Readability is a product
  requirement, not a finishing detail.

## Non-negotiable accessibility rules

The user has repeatedly emphasized that most customers may be older adults.
Preserve these rules:

- Supporting text should generally be at least 16px on mobile.
- Important explanatory copy is often 17–19px on mobile.
- Touch targets should be at least 44px, preferably 52–56px for primary actions.
- Do not shrink labels such as “Question 4 of 10,” “You are here,” map locations,
  descriptions, navigation labels, or form helper text.
- Text on cream, white, purple, and map backgrounds must meet practical contrast
  expectations. Avoid pale gray or translucent text for information people need
  to act on.
- Test at narrow iPhone widths, not only in a desktop browser.
- Prevent labels from overlapping, clipping at map edges, or running into one
  another.
- Honor reduced-motion preferences where animation is nonessential.

## Experience flow

### 1. Welcome

The landing page introduces the value proposition and offers:

- “Build my OnePlace”
- A route to preview the existing concept
- Reassurance that users can go at their own pace, control access, and pause

### 2. Journey explanation

A short, multi-screen introduction explains how the journey works before the
user begins. Mobile page changes must return to the top.

### 3. Puppy guide

A single friendly golden retriever puppy is built into the journey as the user’s
guide. There is no character-selection or naming step; after the short
introduction, the user moves directly into guided setup. The puppy appears on
the welcome map, travels between destinations, celebrates progress, and remains
present in the main app. Short visual bark bubbles appear occasionally near the
puppy. A completed step or new destination triggers one contextual phrase, then
the puppy returns to simple “Woof!” and “Arf!” bubbles until the next action.
The bubbles are disabled when the user prefers reduced motion.

### 4. Guided setup

The setup uses a map and a series of questions. It currently includes:

1. Identifying who the owner is preparing for
2. Naming the owner's OnePlace
3. Recording whether the owner has a will
4. Uploading a will or recording where the original is kept
5. Choosing everyday financial institutions
6. Adding one identifying account detail
7. Selecting protections, including disability insurance
8. Choosing a first trusted person and preparing an invitation
9. Recording a meaningful possession and intended recipient
10. Leaving a personal voice message

The rendered question count is data-driven. Treat the `questions` array in
`src/App.jsx` as authoritative.

### 5. Completion and main app

The prototype main app includes:

- **My path** — progress, today’s small task, milestones, and achievements
- **My things** — themed destinations for documents, accounts, protections,
  digital access, memories, and possessions
- **My people** — trusted-person access concept
- **Messages** — personal audio-message concept

## Map destinations

- **Basecamp** — starting point and essentials
- **Paper Port** — legal documents and important papers
- **Money Meadow** — accounts and finances
- **Safety Harbor** — insurance, protection, medical, and care wishes
- **Kindred Grove** — trusted people and recipients
- **Memory Lake** — stories, notes, and recordings
- **Mount Vault** — passwords, vault codes, devices, and digital keys

The puppy guide visibly moves between stops. The movement was intentionally slowed so
the user can see it after the page returns to the top. The current location has
a pulsing treatment and a large “You are here” badge.

## Recently implemented features

### Trusted-person invitations

The trusted-person question supports two concept-only choices:

- Prepare an email invitation
- Generate a private demo code

No real email is sent and the code is not secure. The interface explicitly says
that access is not granted automatically.

### Disability insurance

“Disability insurance” is now part of the Safety Harbor protection checklist.
The protection milestone and My Things copy also mention disability coverage.

### Possessions and keepsakes

Possessions are included in two places:

1. A gentle onboarding question asks for one meaningful possession, recipient,
   location, and optional personal note.
2. **My Things → Possessions & keepsakes** opens a dedicated editable list with
   add, edit, and remove controls.
3. Each keepsake can include a photo taken with a phone camera or chosen from
   the device, both during onboarding and from the dedicated keepsake list.
   Photo previews remain only in the current browser session and reset with the
   rest of the prototype state.

The page includes a reminder that personal wishes are useful but important gifts
should also appear in a will or trust and be reviewed with an estate
professional.

## Mobile Safari history

Mobile is expected to be the primary form factor.

Several iterations addressed iPhone Safari behavior:

- Page/question changes reset scroll to the top.
- Smooth scrolling was removed because it fought Safari.
- Global overscroll prevention and a top-boundary touch guard were added to
  prevent pull-to-refresh behavior that looked like violent page shaking.
- The journey explanation received special mobile scrolling fixes.
- The map was resized and repositioned to prevent location labels and the
  “You are here” badge from clipping.
- Map text, question counters, and supporting copy received senior-first size
  increases.

The most recent pull-to-refresh fix is in commit `27b8b21`. It should still be
retested on a physical iPhone after future layout changes. Do not casually
remove the `history.scrollRestoration`, overscroll, touch-boundary, or
`useScrollToTop` logic without reproducing the original issue first.

## Current technical implementation

- React 19
- Vite 8
- Vitest 4 with React Testing Library
- ESLint 9 with React, Hooks, and accessibility checks
- Plain JSX and one main stylesheet
- No router
- No backend
- No database
- No authentication
- No external institution APIs
- State is local React state and resets after refresh

Important files:

- `src/App.jsx` — application data, screens, components, and interactions
- `src/styles.css` — all visual, responsive, accessibility, and animation rules
- `vite.config.js` — Vite configuration with relative asset base
- `.github/workflows/deploy-pages.yml` — GitHub Pages deployment
- `README.md` — short public project overview

The app is intentionally compact for concept iteration. Before building a real
product, split screens and data models into maintainable modules.

## Local development

From the existing computer:

```sh
cd /Users/caseyvandyke/oneplace
npm install
npm run dev
```

Production verification:

```sh
npm run lint
npm test
npm run build
git diff --check
```

Pushing to `main` triggers the GitHub Pages workflow:

```sh
git add <changed-files>
git commit -m "Describe the change"
git push origin main
```

The existing local repository and GitHub repository remain available even when
the OpenAI account changes. A new coding conversation should start by reading
this file, `README.md`, `src/App.jsx`, and the relevant sections of
`src/styles.css`.

## Security and legal boundary

A production OnePlace cannot be created by simply adding a database to this
prototype. It will require deliberate architecture and professional review,
including:

- Strong user authentication and account recovery
- Encryption in transit and at rest
- Preferably client-side or zero-knowledge encryption for highly sensitive data
- Key management that prevents ordinary administrators from reading secrets
- Fine-grained item-level permissions
- Auditable sharing, revocation, and access history
- Trusted-person identity verification
- A carefully designed incapacity/death activation process
- Waiting periods, challenge mechanisms, and protection against false claims
- Secure document storage and malware scanning
- Backup, retention, deletion, and disaster-recovery policies
- Privacy, estate-law, insurance, and jurisdiction-specific legal review
- A clear distinction between informal wishes and legally binding instruments

Do not add real secrets or personal documents to the public GitHub Pages
prototype.

## Open product questions

These decisions still need deeper product work:

1. How is access activated after death or incapacity?
2. What evidence is required, and who verifies it?
3. Can two or more trusted people be required to agree?
4. Should certain information unlock immediately while other items have a
   waiting period?
5. How can an owner revoke access or replace a trusted person?
6. Which possession wishes are informal, and which must be synchronized with a
   will or trust?
7. How should conflicts between the app and legal documents be surfaced?
8. Which institution integrations provide enough value to justify their
   security and maintenance burden?
9. What information should remain discoverable if encryption keys are lost?
10. What does a trusted person see before activation, after activation, and
    after access expires?

## Recommended next steps

1. Test the latest onboarding and possessions experience on a physical iPhone.
2. Add a persistent data model using fictional local data before selecting a
   production backend.
3. Design item-level sharing controls and the trusted-person recipient view.
4. Prototype the death/incapacity activation and dispute flow without real data.
5. Conduct a complete WCAG-focused accessibility review.
6. Create a formal threat model before accepting any sensitive information.
7. Only after the security model is agreed, evaluate storage, authentication,
   email, verification, and institution APIs.

## Suggested prompt for a new coding conversation

Copy this into the new account:

> Continue development of the OnePlace React prototype located at
> `/Users/caseyvandyke/oneplace`. First read `PROJECT_HANDOFF.md`, `README.md`,
> `src/App.jsx`, and the relevant parts of `src/styles.css`. Preserve the
> senior-first mobile accessibility requirements, the warm map-based journey,
> and all existing Safari scroll protections. Check the Git working tree before
> editing, make the requested change, run `npm run build` and
> `git diff --check`, then commit and push only after verification.
