# OnePlace Project Handoff

Last updated: August 19, 2026
Repository: https://github.com/CaseyVandyke/OnePlace  
Live prototype: https://caseyvandyke.github.io/OnePlace/  
Architecture refactor baseline: commit `93956c3`

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

The approved production direction is a data-minimized reference model: OnePlace
will tell authorized people what exists, where the original is generally kept,
and who to contact without storing the underlying high-risk secrets or records.

Information the eventual product may reference includes:

- The existence, professional holder, and general location of wills, powers of
  attorney, advance directives, and other legal documents
- Financial institutions, account categories, and professional contacts
- Life, disability, health, and long-term-care insurance contacts and categories
- The person or external service responsible for passwords, device access,
  digital accounts, and physical access instructions
- Trusted people, heirs, and access permissions
- Possessions and keepsakes, including who should receive each item
- Personal notes, letters, stories, and audio recordings

The first production release will not store passwords, PINs, recovery codes,
safe combinations, identity documents, uploaded legal or medical records, or
full financial identifiers. Keepsake photos and personal audio remain permitted
private content with explicit access controls.

Institution integrations may be considered later. They are not part of the
current prototype.

## Product personality and visual direction

- Working name: **OnePlace**
- Tone: warm and comforting first, never clinical or gloomy
- Core colors: red, purple, and blue
- The experience should feel like a family journey rather than a recovery app,
  enterprise dashboard, or checklist of death-related chores.
- Progress is meaningful rather than game-like: completed steps light locations
  on the map and illuminate the trail between destinations. The earlier numeric
  **Glow** currency was removed because it had no clear user value.
- On mobile, the setup header summarizes overall progress as the current place
  and chapter (for example, “Basecamp · Chapter 1 of 6”). The full six-stop
  chapter track remains available on larger screens, while the question area
  separately communicates “Question X of 10.”
- The primary audience includes older adults. Readability is a product
  requirement, not a finishing detail.

## Non-negotiable accessibility rules

The user has repeatedly emphasized that most customers may be older adults.
Preserve these rules:

- Supporting text should generally be at least 16px on mobile.
- Important explanatory copy is often 17–19px on mobile.
- Touch targets should be at least 44px, preferably 52–56px for primary actions.
- Do not shrink labels such as “Question 4 of 10,” map locations,
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

### 3. Illuminated path

The map itself communicates progress rather than relying on a mascot or symbolic
object. Completed trail segments illuminate in sequence, and the current
destination pulses without an additional text badge. The persistent trail remains
mounted between questions so each newly completed segment animates smoothly.
Reduced-motion preferences shorten these nonessential transitions.

### 4. Guided setup

The setup uses a map and a series of questions. It currently includes:

1. Identifying who the owner is preparing for
2. Naming the owner's OnePlace
3. Recording whether the owner has a will
4. Recording who holds a will, how to contact them, the original's general
   location, and when that reference was last confirmed—without uploading it
5. Choosing financial institutions the family may need to contact
6. Adding one safe financial reference for each selected institution using a
   nickname, category, contact path, and verification date—without an account
   number, balance, or password
7. Selecting protections, including disability insurance
8. Choosing a first trusted person and preparing an invitation
9. Recording a meaningful possession and intended recipient
10. Leaving a personal voice message

The rendered question count is data-driven. Treat the `questions` array in
`src/constants/journey.js` as authoritative.

Each question is tracked as answered or skipped. Answered questions increase the
guided-setup percentage against the ten available onboarding questions; skipped
questions remain pending and appear in a “Come back to this” list in My Path.
Completing all ten questions therefore displays 100% rather than dividing by
unimplemented future tasks. Post-setup quick steps remain separate milestones.
The first unanswered or skipped question determines the active map destination.
After all onboarding questions are answered, Mount Vault becomes the next
recommended destination for digital-access instructions. The My Path status pill
is derived from this progress and must not use a hard-coded weekday.

### 5. Completion and main app

The prototype main app includes:

- **My path** — calculated progress, the next unfinished task, resumable skipped
  questions, milestones, and achievements
- **My things** — themed destinations for documents, accounts, protections,
  digital access, memories, and possessions
- **My people** — trusted-person access concept
- **Messages** — personal audio-message concept

The map on **My path** is interactive. Every location is a real,
keyboard-accessible button that opens its corresponding main-app section, even
when that location has not been reached yet. Progress controls the illumination,
not navigation. Destination sections provide an explicit **Back to map** action.
The Welcome and guided-setup maps stay informational so they do not introduce
competing navigation during onboarding.

## Map destinations

- **Basecamp** — starting point and essentials
- **Paper Port** — legal documents and important papers
- **Money Meadow** — accounts and finances
- **Safety Harbor** — insurance, protection, medical, and care wishes
- **Kindred Grove** — trusted people and recipients
- **Memory Lake** — stories, notes, and recordings
- **Mount Vault** — external password-manager, device-recovery, and physical
  access contacts or instructions; never the passwords, codes, or keys themselves

The path illuminates between stops as chapters are reached. The current location
uses a restrained halo without an additional marker or text badge. The icon
itself remains stationary so the pulse cannot make nearby map elements shimmer.

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

### Audio recordings

- Guided Question 10 and the Messages page share one browser-native audio
  recorder component.
- The recorder requests microphone access only after the user presses the
  record button, shows elapsed time, stops automatically after five minutes,
  and supports playback, downloading, re-recording, and deletion.
- After recording, the microphone track is muted immediately and retained for
  up to 30 seconds so an immediate re-record does not wait for Safari to reopen
  the hardware. It is fully released after that window, when the recording is
  removed or replaced by a file, and when the recorder unmounts.
- “Record again” returns to the ready-to-record state without capturing. The
  user must explicitly press “Start recording,” and the recorder's capture and
  playback states use the shared screen-entrance animation instead of swapping
  abruptly.
- An audio-file picker provides a fallback when microphone recording is
  unavailable or permission is denied.
- Recordings are held as browser `Blob` objects in session-only React state.
  They are not written to local storage, uploaded, or included in the persisted
  journey-progress metadata.
- Browser microphone access requires a secure context. It works on the HTTPS
  GitHub Pages site; a physical phone visiting a plain `http://192.168...` local
  development address may need to use the audio-file fallback.

### Preview navigation and prototype actions

- Welcome, Introduction, guided Questions, and the main app share the
  `.site-header` CSS class and remain visible with `position: sticky`; do not
  replace this with fixed headers or compensate with page padding.
- On mobile, the main-app navigation and the Welcome account menu use a shared,
  50px hamburger control whose lines morph into a close icon. Menu entrance and
  icon motion respect `prefers-reduced-motion`.
- Header OnePlace logos return to Welcome wherever leaving the current flow is
  appropriate. The Welcome logo itself remains noninteractive because the user
  is already home.
- Login and account creation are still visual prototype actions. They display a
  temporary notice instead of implying authentication exists. Other visibly
  interactive but unavailable controls on My People and Messages use the same
  notice pattern. Remove or replace `AccountActions` and `PrototypeAction` when
  implementing real behavior.
- Main-app destination changes, Welcome, Completion, Introduction slides, and
  question changes use the shared `.screen-enter` treatment for consistent
  page entrances.
- The guided-question header intentionally avoids a points counter. It prioritizes
  the current chapter, the question count, and a larger progress bar instead.
- The key icon on the map is **Mount Vault**, the destination for device access,
  account recovery, and other digital instructions. Its label remains visible on
  the mobile My Path map so the icon is not unexplained.
- The desktop My People orbit remains intact. On mobile it becomes a normal-flow
  list of trusted people and actions so cards do not overlap or create a fragile
  scroll boundary.

## Mobile Safari history

Mobile is expected to be the primary form factor.

Several iterations addressed iPhone Safari behavior:

- Page/question changes reset scroll both immediately before navigation and in a
  layout effect after React commits the next screen. The hook also repeats the
  reset after one rendered frame so physical iOS Safari cannot reapply its old
  scroll anchor after the React commit. Earlier versions that reset on only one
  side of the content replacement, or before Safari's final anchoring pass, did
  not reliably return a long-to-short screen transition to the top.
- Top-level screen navigation allows the existing document to paint once at
  scroll position zero before React replaces it. This prevents WebKit from
  carrying the tapped element's position from a long screen into a shorter one.
- Smooth scrolling was removed because it fought Safari.
- Global overscroll prevention and a top-boundary touch guard were briefly added
  to suppress movement that looked like violent page shaking.
- The journey explanation received special mobile scrolling fixes.
- The map was resized and repositioned to prevent location labels from clipping.
- Map text, question counters, and supporting copy received senior-first size
  increases.

On August 9, 2026, the global overscroll rule and document-wide touch guard from
commit `27b8b21` were removed. They blocked legitimate scrolling inside the
then-current companion picker, and native Safari rubber-banding is expected
behavior. Retain `history.scrollRestoration` and `useScrollToTop` for intentional screen changes,
but do not add global touch interception to suppress native scrolling. Retest
screen transitions and modal scrolling on a physical iPhone after layout changes.

One persistent `.app-shell` `<main>` wraps Welcome, Introduction, Questions,
Completion, and Preview. Individual screens are content sections inside that
shell; they do not replace the outer page layout. The shell uses normal document
flow, and screen height generally comes from content. The verified mobile
Introduction is the deliberate exception: both `.journey-intro-screen` and
`.journey-intro-card` use `min-height: 100vh` so Safari does not expose a gray
canvas beneath a short slide. The card uses `align-content: start`, keeping its
controls directly after the slide content while its cream background fills the
remaining viewport. Do not change that to an `1fr` middle grid row, which pushes
the controls below the visible viewport. Avoid viewport-height calculations,
fixed page containers, overflow locks, overscroll suppression, touch
interception, or additional height-based mobile variants elsewhere. Minimum
heights remain appropriate for accessible buttons and form controls.

On August 10, 2026, physical-iPhone Web Inspector measurements identified the
remaining bottom shake. While Safari collapsed its browser chrome, the visual
viewport grew from 660px to 767px and the short page's document height changed
from 1186px to 1220px. No application `scrollTo` call occurred. The 34px document
change came from `env(safe-area-inset-bottom)` being used as in-flow bottom
padding on Welcome, Introduction, Questions, and later the preview-app footer.
Those mobile surfaces now use fixed content padding so their document boundary
remains stable throughout the native Safari toolbar transition. Do not restore a
dynamic safe-area inset to those scroll boundaries without retesting on a
physical iPhone.

On August 20, 2026, iOS Safari continued to render a padded native date input
wider than its single-column form grid despite `width`, `min-width`, and
`max-width` constraints. This matches WebKit bug 301648. Reference date fields
therefore keep the native `input[type='date']` unpadded inside a bordered,
padded `.reference-date-control` wrapper. Do not move that padding back onto the
native input without retesting on a physical iPhone.

Introduction slides and question changes share a subtle 350ms fade and 10px
upward entrance. Introduction content remains keyed, but the guided-question
layout must remain mounted so the trail can transition between progress states.
Question changes alternate equivalent `question-screen-enter-even` and
`question-screen-enter-odd` animation names to replay the entrance without
replacing the map. Key only the question article, not `.journey-layout`; keying
the whole layout prevents the trail illumination from animating. Persistent
navigation remains stationary, and the global reduced-motion rule continues to
reduce these animations.

## Current technical implementation

- React 19
- Vite 8
- Vitest 4 with React Testing Library
- ESLint 9 with React, Hooks, and accessibility checks
- Plain JSX with shared and component-level CSS
- No router
- No backend
- No database
- No authentication
- No external institution APIs
- Sensitive answer content, uploads, photos, and audio recordings remain
  session-only React state.
- Non-sensitive progress metadata (answered/skipped status and completed quick-step
  identifiers) persists in local storage under `oneplace-journey-progress-v1`.
  This metadata is what drives the dashboard percentage, map destination, chapter
  counts, and “Come back to this” list.

Important files:

- `src/app.jsx` — top-level application state and screen orchestration only
- `src/views/` — welcome, onboarding journey, completion, and preview app pages
- `src/components/` — reusable UI, dialogs, map, keepsake photo controls, and
  the shared audio-recorder presentation
- `src/hooks/audio-recorder.js` — microphone permissions, MediaRecorder state,
  stream reuse/release, timers, and recording object-URL cleanup
- `src/hooks/journey-progress.js` — shared progress metadata, local-storage
  persistence, and derived dashboard progress
- `src/components/question-body.jsx` — a small question-type dispatcher; each
  answer type is an independently testable controlled component using `value`
  and `onChange`
- `src/constants/` — static screen content, configuration, and copy
- `src/hooks/` — reusable React behavior such as intentional scroll restoration
- `src/styles/index.css` — shared visual, responsive, accessibility, and animation
  rules
- `src/styles/components/audio-recorder.css` — recorder-specific light, dark,
  responsive, and motion styles
- `vite.config.js` — Vite configuration with relative asset base
- `.github/workflows/deploy-pages.yml` — GitHub Pages deployment
- `README.md` — short public project overview

The source structure follows the conventions used by the local Sparrow React
repositories: lowercase kebab-case filenames, separate views and components,
static configuration in constants, reusable hooks, props destructured in the
component signature, and component exports at the bottom of each module.

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
this file, `README.md`, `src/app.jsx`, and the relevant sections of
`src/styles/index.css`.

## Security and legal boundary

A production OnePlace cannot be created by simply adding a database to this
prototype. It will use the approved data-minimized reference model documented in
`docs/PRODUCTION_READINESS.md` and still requires deliberate architecture and
professional review, including:

- Product and technical controls that discourage or reject prohibited secrets
- Strong user authentication and account recovery
- Encryption in transit and at rest
- Managed envelope encryption and least-privilege key access
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

The formal production scope, initial threat model, architecture requirements,
release gates, and decisions requiring owner approval now live in
`docs/PRODUCTION_READINESS.md`. The minimum useful fields, prohibited-data
boundary, trusted-person grants, and required prototype changes are defined in
`docs/REFERENCE_DATA_MODEL.md`.

1. Choose the authentication experience.
2. Compare backend stacks against the approved data boundary and authentication
   requirements.
3. Build a non-sensitive account-and-reference vertical slice in private staging.
4. Design and test item-level sharing before accepting private information.

## Suggested prompt for a new coding conversation

Copy this into the new account:

> Continue development of the OnePlace React prototype located at
> `/Users/caseyvandyke/oneplace`. First read `PROJECT_HANDOFF.md`, `README.md`,
> `src/app.jsx`, and the relevant parts of `src/styles/index.css`. Preserve the
> senior-first mobile accessibility requirements, the warm map-based journey,
> and all existing Safari scroll protections. Check the Git working tree before
> editing, make the requested change, run `npm run build` and
> `git diff --check`, then commit and push only after verification.
