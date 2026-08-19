# OnePlace Production Readiness

Last updated: August 19, 2026

## Purpose

This document defines the work required to turn the OnePlace interface prototype
into a production product for iPhone, iPad, and desktop browsers. It is the
working agreement for product scope, security, architecture, accessibility,
testing, and release readiness.

OnePlace currently contains fictional demonstration data. Until every required
production gate in this document is satisfied, it must not accept real legal,
financial, identity, credential, medical, or estate information.

## Product outcome

OnePlace helps an owner organize important information and intentionally share
specific items with people they trust. The product should remain reassuring,
plain-spoken, and senior-first while treating the underlying information as
highly sensitive.

The production product will use one shared React experience delivered through:

1. A responsive HTTPS web application for desktop and mobile browsers.
2. An iOS and iPadOS application built from the React application with a native
   container such as Capacitor.
3. A shared, authenticated backend API and secure storage layer.

This approach preserves the existing React work while allowing the iOS release
to use native capabilities where they materially improve the experience. It
does not prevent small, purpose-built Swift components from being added later.

## Current state

The prototype already demonstrates:

- The welcome and guided onboarding journey.
- A map-based progress experience.
- Questions covering documents, finances, protections, trusted people,
  possessions, and personal messages.
- Browser camera/photo selection and audio recording.
- Responsive mobile and desktop presentations.
- Senior-first sizing, touch targets, reduced-motion handling, and deliberate
  mobile Safari scroll protections.
- Component tests, linting, and production builds.

The prototype does not yet have:

- Accounts, authentication, or authorization.
- A backend API or production database.
- Durable answer, file, photo, or audio storage.
- Encryption and production key management.
- Real trusted-person invitations or sharing.
- Data export, account deletion, audit history, or recovery controls.
- Native iOS packaging or App Store configuration.
- Production monitoring, incident response, or legal policies.

## First production release

### Included

- Account creation, sign-in, sign-out, and secure account recovery.
- Owner profile and basic preferences.
- The guided OnePlace journey.
- Documents and document-location records.
- Financial-institution and account reference information.
- Insurance and protection information.
- Trusted people and owner-controlled invitations.
- Possessions and keepsakes with photos.
- Personal notes and audio messages.
- Draft saving and reliable cross-device synchronization.
- Explicit, item-level sharing and revocation.
- A trusted-person view containing only items currently shared with that person.
- Download/export of an owner's information.
- In-app account and data deletion.
- Responsive desktop web application.
- iPhone and iPad application distributed through the App Store.

### Excluded from the first release

- Automatic access triggered by a reported death or incapacity.
- Verification of death certificates, medical incapacity, or legal authority.
- Multi-party approval, waiting periods, or dispute adjudication.
- Direct banking, insurance, health-record, or government integrations.
- Password-manager replacement or automatic credential entry.
- Legal-document generation or claims that an in-app wish is legally binding.
- Paid plans until the retention costs and App Store business model are agreed.

The first release uses living, owner-controlled sharing. Event-triggered access
is deferred because it requires a separate legal, identity, fraud, and dispute
model. The data model should not prevent that capability from being added later.

## Users and authorization

### Owner

The owner creates and organizes information, invites trusted people, decides
which individual items they can access, reviews access, and can revoke access.

### Trusted person

A trusted person has their own authenticated account. They can see only the
specific items an owner has actively shared with them. An invitation alone must
not reveal private data or grant broad access.

### Support and operations

Support personnel must not receive routine access to user content. Any narrowly
approved operational access must be time-limited, attributable, auditable, and
visible under an internal access policy.

## Data classification

| Class | Examples | Minimum handling |
| --- | --- | --- |
| Restricted | Credentials, vault codes, identity documents, legal documents, financial identifiers, medical directives, private recordings | Strong encryption, least-privilege access, explicit sharing, access audit, protected logs, strict retention |
| Confidential | Names, emails, relationships, possessions, recipients, locations, notes | Encryption, authorization, explicit sharing, deletion and export support |
| Operational | Account state, consent records, invitation status, file metadata, audit events | Integrity protection, access controls, retention policy |
| Public | Marketing copy, support content, App Store information | Normal publishing controls |

Restricted content must never appear in analytics events, application logs,
crash reports, support tickets, URLs, notification text, or email previews.

## Initial domain model

The production model should distinguish ownership from access instead of putting
a shared-user identifier directly on every record.

- `User`: account identity and authentication state.
- `OnePlace`: the owner's private workspace.
- `Profile`: owner-facing name and preferences.
- `JourneyResponse`: a structured response to an onboarding question.
- `Item`: a common record for documents, accounts, protections, possessions,
  instructions, notes, and messages.
- `FileObject`: encrypted file, photo, or audio metadata and storage reference.
- `TrustedRelationship`: the relationship between an owner and trusted person.
- `Invitation`: expiring, single-use invitation state.
- `Grant`: item-level permission from an owner to a trusted relationship.
- `AuditEvent`: security-relevant access or mutation without sensitive content.
- `ConsentRecord`: accepted policy version and relevant permissions.

Every owned record must include stable identifiers, creation and update times,
and a deletion state. Authorization must be enforced by the backend on every
request; hiding a control in React is not authorization.

## Architecture requirements

### Shared client

- Continue using React and JavaScript.
- Introduce real URL routing before authentication so browser navigation, deep
  links, refresh, and App Store universal links have predictable behavior.
- Keep view rendering separate from API, storage, authentication, and native
  device integrations.
- Put network access behind a typed or runtime-validated API client boundary.
- Keep platform-specific behavior behind small adapters rather than branching
  throughout views.
- Preserve normal document flow and all verified Safari scroll protections.

### Web delivery

- Host the production web application separately from the public GitHub Pages
  prototype.
- Require HTTPS, secure headers, a restrictive content security policy, and
  environment-specific configuration.
- Never place secrets in the Vite bundle or client environment variables.

### iOS delivery

- Prove the React build inside a Capacitor iOS shell before production migration
  is complete.
- Use native integrations for camera, photo library, microphone, files, secure
  token storage, sharing, and biometric re-entry where appropriate.
- Provide complete permission-denied, interrupted-upload, and offline states.
- Add custom Swift only where a native capability or quality requirement cannot
  be satisfied cleanly by the shared application.

### Backend

- Use a versioned HTTPS API.
- Use a production relational database such as PostgreSQL rather than a shared
  SQLite file.
- Store files in private object storage, never in the public web deployment.
- Verify authorization for the requested resource and action on every endpoint.
- Use short-lived sessions or access tokens with secure rotation and revocation.
- Process uploads with file-type validation, size limits, malware scanning, and
  safe download headers.
- Use queued background work for email, media processing, deletion, and other
  retryable tasks.

## Threat model

### Assets to protect

- User identity and account access.
- Legal, financial, medical, and credential-related content.
- Photos, documents, and audio recordings.
- Encryption keys and recovery material.
- Trusted-person relationships and permissions.
- Audit evidence and consent history.

### Trust boundaries

1. The user's browser or iOS device.
2. The public internet between client and API.
3. The backend application and job workers.
4. The database, object storage, key service, email service, and monitoring
   providers.
5. Owner-to-trusted-person invitations and sharing.
6. Administrative and support access.

### Primary threats and required responses

| Threat | Required response |
| --- | --- |
| Stolen password or session | Strong authentication, rate limits, breached-password checks, secure session rotation, device/session revocation, optional MFA or passkeys |
| Invitation forwarded or intercepted | Random single-use token, short expiration, recipient verification, no private content in invitation, explicit acceptance |
| Trusted person accesses too much | Deny-by-default item grants, backend enforcement, clear access review, immediate revocation, auditable access |
| Broken object-level authorization | Central authorization policy, negative authorization tests, opaque identifiers, security review |
| Malicious or disguised upload | Allowlisted types, size limits, content inspection, malware scanning, private storage, safe content disposition |
| Sensitive information leaks through telemetry | Structured log allowlist, redaction, no answer bodies or file names in analytics/crash reports |
| Database or storage compromise | Encryption at rest, private networking and buckets, least-privilege service identities, key separation, monitored access |
| Lost or compromised device | Short reauthentication window for restricted content, biometric re-entry on iOS, session management, remote revocation |
| Permanent accidental deletion | Confirmation, recoverable deletion window where appropriate, encrypted backups, tested restore process |
| Insider access | Least privilege, audited and time-bound support access, separation of duties, alerts for privileged activity |
| Dependency or build compromise | Locked dependencies, automated dependency review, protected releases, reproducible CI build records |
| Owner loses account access | Deliberate recovery process that resists social engineering and documents the limits of encrypted-data recovery |

### Threats deferred with excluded features

False death reports, fraudulent incapacity claims, coercive activation, competing
heirs, invalid legal authority, and jurisdictional disputes are not solved in
the first release. Event-triggered access cannot ship until those threats have a
reviewed product, legal, and operational response.

## Encryption decision

Encryption in transit and at rest is mandatory. A deeper decision remains open:

### Option A: service-managed content encryption

The service can decrypt content for an authorized user. This is simpler for
recovery, search, previews, support, and future sharing workflows, but a backend
or privileged-access compromise can expose readable content.

### Option B: client-side or zero-knowledge content encryption

Content is encrypted before upload and the service does not normally possess the
decryption material. This provides a stronger privacy boundary, but makes
recovery, sharing, search, multi-device access, and post-event access much more
complex. Lost keys may make data permanently unrecoverable.

This decision must be made before storing real restricted content because it
changes the schema, sharing model, recovery experience, native client, and
operational capabilities.

## Authentication decision

The authentication design must cover:

- Email verification.
- Password, passkey, or passwordless sign-in.
- MFA expectations for restricted information.
- Secure account and device recovery.
- Session listing and revocation.
- Rate limiting and abuse protection.
- Sign in with Apple requirements if qualifying third-party identity providers
  are offered in the iOS application.
- In-app account deletion.

An authentication provider may manage identity, but OnePlace remains responsible
for its authorization and item-sharing model.

## Privacy and legal requirements

Before real-user testing:

- Publish a privacy policy and terms of service.
- Define retention, deletion, export, backup, and legal-request procedures.
- Inventory every collected field and every third-party recipient.
- Create an incident-response plan and user-notification process.
- Review estate, incapacity, medical, insurance, and informal-wish language with
  qualified counsel.
- State clearly that OnePlace does not create or replace a will, trust, power of
  attorney, advance directive, or other legal instrument.
- Establish age eligibility and supported jurisdictions.

## Accessibility requirements

Production acceptance includes:

- WCAG 2.2 AA review for the responsive web application.
- VoiceOver testing on physical iPhone and iPad hardware.
- Keyboard-only navigation on desktop.
- Text resizing and Dynamic Type strategy without clipped controls.
- Minimum 44-point touch targets, with primary actions preferably larger.
- Clear focus, error, loading, success, and permission states.
- Sufficient contrast in normal, selected, disabled, and map states.
- Reduced-motion support for map, page, menu, and progress animation.
- Plain-language content review appropriate for older adults.

Accessibility regressions block release.

## Verification strategy

- Unit tests for domain rules, validation, and authorization policies.
- Component tests for forms, errors, permissions, and accessible interaction.
- API integration tests using a real test database and object-storage boundary.
- End-to-end tests for account creation, journey saving, upload, sharing,
  revocation, export, and deletion.
- Negative authorization tests attempting cross-account and unshared access.
- Physical-device testing for current and supported iPhone/iPad versions.
- Desktop testing in Safari, Chrome, Edge, and Firefox.
- Network interruption, expired session, denied permission, storage quota, and
  large-file testing.
- Automated dependency, secret, and static security scanning in CI.
- Independent security review before restricted information is accepted.

## App Store readiness

Before submission, OnePlace must have:

- A complete, stable application and live review backend.
- An Apple Developer account, bundle identifier, signing, and App Store Connect
  record.
- App icon, screenshots, descriptions, support contact, and privacy-policy URL.
- Accurate microphone, camera, photo-library, file, and notification usage copy.
- Privacy manifest and required-reason API declarations.
- Accurate App Privacy disclosures, including third-party SDK behavior.
- In-app account deletion and any required Sign in with Apple support.
- A reviewer account or approved complete demonstration mode.
- TestFlight feedback, crash reporting, and launch monitoring.
- Enough native and product value that the application is not merely a website
  inside an iOS container.

Official references:

- [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/)
- [Privacy manifests](https://developer.apple.com/documentation/bundleresources/privacy-manifest-files)
- [Required-reason APIs](https://developer.apple.com/documentation/bundleresources/describing-use-of-required-reason-api)
- [Capacitor documentation](https://capacitorjs.com/docs)

## Release gates

### Gate 1: product and threat model approved

- First-release scope approved.
- Encryption model approved.
- Authentication and recovery approach approved.
- Owner-controlled sharing behavior approved.
- Data inventory and threat model reviewed.

### Gate 2: production foundation verified

- Separate development, test, staging, and production environments.
- Authentication, authorization, database, object storage, encryption, audit,
  deletion, backup, monitoring, and CI foundations tested.
- No real user content in development or the public prototype.

### Gate 3: first-release workflows complete

- Prototype-only controls replaced or removed.
- All included workflows persist and synchronize correctly.
- Sharing, revocation, export, and deletion work end to end.
- Accessible loading, error, empty, offline, and permission states complete.

### Gate 4: security, accessibility, and legal review complete

- Security assessment findings resolved.
- Accessibility acceptance criteria passed.
- Privacy and legal documents approved.
- Restore, incident, and account-recovery procedures exercised.

### Gate 5: release candidates approved

- Responsive web release verified in production-like hosting.
- iOS release verified through TestFlight on supported physical devices.
- App Store metadata and disclosures reviewed against actual behavior.
- Support and monitoring are ready before public launch.

## Open decisions requiring owner approval

1. **Encryption:** service-managed encryption or client-side/zero-knowledge
   encryption for restricted content.
2. **Authentication:** passkeys/passwordless, password plus MFA, or a hybrid.
3. **Backend stack:** hosting, PostgreSQL, object storage, email, queues, and
   monitoring providers.
4. **Sharing:** whether every grant is immediate and revocable in version one,
   and whether recipients may download shared files.
5. **Recovery:** what can be recovered if credentials or encryption keys are
   lost, and what security tradeoff is acceptable.
6. **Native scope:** which capabilities must be present in the first App Store
   release beyond camera, microphone, files, secure re-entry, and sharing.
7. **Business model:** free beta duration, eventual subscription structure, and
   required storage limits.
8. **Jurisdictions:** where the initial product will be offered and legally
   reviewed.

## Immediate next work

The next working session should resolve the first three open decisions in this
order:

1. Choose the encryption and recovery model.
2. Choose the authentication experience.
3. Compare production backend stacks against those requirements.

After those decisions, document the selected architecture and build a small
vertical slice in a private staging environment: create an account, save one
non-sensitive journey response, sign out, sign back in, and retrieve it. Do not
start with file, photo, audio, credential, or trusted-person data.
