# OnePlace

Everything that matters, ready for the people who matter.

OnePlace is a polished product concept for creating a private, shareable index
of what matters, where it can be found, and who can help. It is not intended to
store passwords, access codes, full financial identifiers, identity documents,
or uploaded legal and medical records. This repository contains fictional
demonstration data only.

The guided journey illuminates the trail across the family map as the user
completes thoughtful, manageable steps.

## Continue the project

Read [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md) before continuing development in
a new account or coding conversation. It records the product decisions, current
flow, mobile accessibility requirements, security boundaries, and recommended
next steps.

The production scope, threat model, release gates, and unresolved architecture
decisions are tracked in
[docs/PRODUCTION_READINESS.md](docs/PRODUCTION_READINESS.md).
The category-by-category field rules and approved reference model are in
[docs/REFERENCE_DATA_MODEL.md](docs/REFERENCE_DATA_MODEL.md).

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run lint
npm test
npm run build
npm run preview
```

## Source structure

- `src/app.jsx` owns top-level screen state and routing between product areas.
- `src/views/` contains the onboarding journey and preview application pages.
- `src/components/` contains reusable UI shared across views.
- `src/constants/` contains static product content and configuration.
- `src/hooks/` contains reusable React behavior.
- `src/styles/` contains shared and component-specific CSS.

## Publish with GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. The included workflow builds and publishes the site automatically.

## Important

This is an interface prototype, not a production security system. Do not add
real documents, credentials, vault codes, or personal information. A real
product would require dedicated encrypted storage, authentication, recovery,
verification, auditing, and professional security and legal review.
