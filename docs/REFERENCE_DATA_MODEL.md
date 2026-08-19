# OnePlace Reference Data Model

Last updated: August 19, 2026

## Purpose

This specification defines the minimum information OnePlace needs to be useful
without becoming a vault for high-risk secrets or source documents. It translates
the data-minimized product boundary in `PRODUCTION_READINESS.md` into concrete
fields and prototype changes.

The central product rule is:

> Store enough context to help an authorized person know what exists, where to
> begin, and who to contact. Do not store the secret or source record required to
> gain access.

## Record design principles

1. **Actionable, not exhaustive.** A reference should identify the resource and
   the next step without copying the underlying record.
2. **Structured before free-form.** Use categories, contacts, dates, and short
   instructions instead of a large general-purpose note whenever possible.
3. **No secret-shaped fields.** OnePlace must not offer fields labeled password,
   PIN, full account number, recovery code, safe combination, or similar.
4. **Minimum identification.** When two resources at the same organization must
   be distinguished, allow a nickname and optionally the final four characters
   of an existing identifier—never the complete identifier.
5. **Owner-only by default.** Creating a reference does not share it. Every grant
   is explicit and item-specific.
6. **Freshness is visible.** Every reference records when it was last verified
   and can become “needs review” without being deleted.
7. **Instructions do not bypass safeguards.** A contact or next step may explain
   the proper process but must not reveal credentials or physical access codes.
8. **Personal content is intentional.** Keepsake photos, personal notes, and
   voice messages are allowed only as deliberate user-created content with clear
   recipient controls.

## Common reference fields

Every important-information reference uses the same core shape. Category-specific
fields extend this core rather than creating unrelated record formats.

| Field | Requirement | Purpose and constraints |
| --- | --- | --- |
| `id` | System | Stable opaque identifier; never derived from private content |
| `onePlaceId` | System | Owning OnePlace workspace |
| `category` | Required | Controlled category such as `legal`, `financial`, `protection`, `digital`, or `physical_access` |
| `type` | Required | Controlled subtype such as `will`, `retirement_account`, or `life_insurance` |
| `title` | Required | Plain-language label such as “Estate plan” or “Fidelity IRA” |
| `status` | Required | `confirmed`, `in_progress`, `not_started`, or `unsure` |
| `institutionName` | Optional | Organization that holds or manages the resource |
| `contactId` | Optional | Linked professional or responsible-person contact |
| `generalLocation` | Optional | Helpful physical description without key, PIN, or combination |
| `nextStep` | Optional | Short, safe instruction for what an authorized person should do |
| `identifierLast4` | Optional | Final four characters only; used solely to distinguish similar records |
| `verifiedAt` | Required after setup | Date the owner last confirmed the reference |
| `reviewIntervalMonths` | Defaulted | Recommended recheck interval; configurable by category |
| `sharingGrants` | Default empty | Explicit trusted relationships allowed to view this reference |
| `createdAt` / `updatedAt` | System | Auditing and synchronization timestamps |
| `deletedAt` | System | Recoverable deletion state before permanent disposal |

The first production slice should omit `identifierLast4`. It can be added only
after usability testing shows that institution, type, and nickname are not
enough to distinguish records.

## Contact record

Contacts are reusable so an attorney, insurance agent, financial institution,
or family member does not need to be copied into every reference.

| Field | Requirement | Constraints |
| --- | --- | --- |
| `displayName` | Required | Person or organization name |
| `contactType` | Required | `trusted_person`, `professional`, `institution`, or `other` |
| `role` | Optional | Examples: estate attorney, insurance agent, executor, family contact |
| `organization` | Optional | Business or institution when the contact is a person |
| `email` | Optional | Minimum needed for contact or invitation |
| `phone` | Optional | Prefer business number for professionals |
| `website` | Optional | Public organization or support URL only; no authenticated deep links or tokens |
| `notes` | Optional and short | Contact preference or office-hours context; no secrets or case details |
| `verifiedAt` | Required after setup | Last time the owner confirmed the contact information |

Do not store birth dates, government identifiers, identity-document images,
authentication answers, or unnecessary addresses for contacts.

## Category fields

### Legal and important papers

Examples include a will, trust, power of attorney, advance directive, deed, and
vehicle title.

Minimum useful fields:

- Document type and current status.
- Professional or organization holding the original, when applicable.
- Contact method for that holder.
- General physical location of the original.
- Date last reviewed or confirmed.
- Safe next step, such as “Contact the estate attorney for the signed original.”
- Explicit trusted-person grants.

Optional fields:

- Document nickname.
- State or jurisdiction in which it was prepared.
- Whether the owner believes a newer version may exist.

Do not store:

- A scan, photo, or complete text of the document.
- Government identifiers found in the document.
- Notary credentials or signatures.
- Safe combinations, key locations that defeat physical security, or access
  instructions that bypass the proper holder.

### Financial resources

Examples include checking, savings, retirement, brokerage, mortgage, loan,
credit card, recurring bill, and tax-professional relationships.

Minimum useful fields:

- Institution name.
- Resource category.
- Owner-created nickname when multiple resources share the same category.
- Public customer-service or estate/beneficiary contact path.
- Responsible professional or family contact, when applicable.
- Safe next step.
- Last verified date.
- Explicit trusted-person grants.

Optional fields:

- Final four characters of an account identifier, subject to the staged rule in
  the common fields section.
- Ownership category: individual, joint, trust, business, or unsure.
- Whether a beneficiary designation exists: yes, no, or unsure. Do not duplicate
  the beneficiary designation itself.
- For a recurring bill: frequency and whether someone should review, continue,
  or cancel it. Do not store a payment method number.

Do not store:

- Complete account, card, routing, loan, or tax identification numbers.
- Balances, transaction history, statements, tax returns, or uploaded forms.
- Usernames, passwords, PINs, recovery answers, or authentication tokens.
- Card expiration dates or security codes.

### Insurance, benefits, and care planning

Examples include life, disability, health, long-term-care, homeowners, auto, and
employer benefits, plus the existence of an advance directive.

Minimum useful fields:

- Protection category and current status.
- Provider or employer name.
- Agent, benefits office, or claims contact.
- Safe next step for an authorized person.
- Last verified date.
- Explicit trusted-person grants.

Optional fields:

- Owner-created nickname.
- Final four characters of a policy identifier if later usability testing shows
  it is necessary.
- Whether an external beneficiary designation exists: yes, no, or unsure.
- General location of the policy or directive.

Do not store:

- Full policy, member, or group identifiers.
- Coverage amounts, claim details, diagnoses, medications, or clinical records.
- Uploaded policies, explanation-of-benefits documents, or medical directives.

### Digital accounts and devices

Examples include a password manager, Apple or Google legacy-access feature,
email, phone, computer, social account, domain, and cloud storage.

Minimum useful fields:

- Service or device category.
- Service/provider name or device description.
- Approved access path: external password manager, platform legacy contact,
  responsible person, printed instructions, or professional custodian.
- Responsible contact.
- Safe next step.
- Last verified date.
- Explicit trusted-person grants.

Optional fields:

- General location of printed instructions or the device.
- Whether a platform legacy-contact feature is configured: yes, no, or unsure.

Do not store:

- Usernames when they reveal an unnecessary private identifier.
- Passwords, passkeys, recovery codes, device PINs, encryption keys, tokens, or
  security-question answers.
- Instructions that defeat device, platform, or password-manager safeguards.

### Physical access and important locations

Examples include a home safe, safe-deposit box, storage unit, filing cabinet,
and off-site document custodian.

Minimum useful fields:

- Location category and owner-created label.
- General location.
- Institution or custodian contact when applicable.
- Person responsible for the authorized access process.
- Safe next step and last verified date.
- Explicit trusted-person grants.

Do not store:

- Combinations, PINs, alarm codes, hidden-key locations, biometric workarounds,
  complete safe-deposit access credentials, or instructions for bypassing normal
  authorization.

### Possessions and keepsakes

Minimum useful fields:

- Plain-language item description.
- Intended recipient or unresolved recipient status.
- General location.
- Optional personal story or reason for the wish.
- Optional photo that does not expose prohibited identifiers or unrelated
  private material.
- Whether the owner has aligned the wish with an external estate plan: yes, no,
  not needed, or unsure.
- Last verified date and explicit trusted-person grants.

Do not imply that the record transfers ownership or overrides a will, trust, or
other governing legal instrument.

### Personal notes and voice messages

Minimum useful fields:

- Title or prompt.
- Intended recipient or recipients.
- Text or audio content deliberately created for those recipients.
- Created and last-reviewed dates.
- Draft, ready, or archived status.
- Explicit recipient grants and whether download is allowed.

Before recording or writing, remind the owner not to include passwords, codes,
full financial identifiers, government identifiers, or private information about
someone who has not agreed to its inclusion.

## Trusted relationships and grants

A trusted-person invitation and a content grant are separate actions.

### Trusted relationship

- Trusted person's display name.
- Relationship or role.
- Verified email and optional phone.
- Invitation status and expiration.
- Relationship status: pending, active, revoked, or declined.
- Last reviewed date.

### Item grant

- Reference or personal-content identifier.
- Trusted relationship identifier.
- Permission: `view` or `view_and_download` where download is supported.
- Grant status: active or revoked.
- Granted, revoked, and last-accessed timestamps.

The default is no grants. Inviting someone must not automatically share existing
or future content. A trusted person must never discover unshared item titles,
categories, counts, contacts, or metadata.

## Freshness and review behavior

OnePlace is useful only if its references remain dependable.

- New records receive a sensible review interval based on category.
- The dashboard shows references that need confirmation without calling them
  invalid.
- A user can confirm “Still correct” without editing every field.
- Changing a contact can offer to update linked references after confirmation.
- Trusted people should see when a shared reference was last verified.
- Stale references remain private and accessible but are clearly labeled.

Suggested initial review intervals:

| Category | Review interval |
| --- | --- |
| Legal documents and care planning | 12 months |
| Financial resources and recurring bills | 6 months |
| Insurance and benefits | 12 months |
| Digital access paths and devices | 6 months |
| Trusted people and grants | 6 months |
| Possessions and personal messages | 12 months or owner-selected |

These are product defaults, not legal or financial advice.

## Safety controls

### Interface controls

- Place a short, visible safety statement near every financial, digital-access,
  document-location, and physical-access form.
- Use specific examples of permitted content rather than vague “do not enter
  sensitive information” language.
- Remove general document upload controls.
- Constrain last-four fields to four characters and never silently expand them.
- Label personal audio and photos as private content, not as harmless metadata.
- Explain who can currently see a record at the point of saving and sharing.

Recommended safety copy:

> Add a helpful reference, not the secret itself. Never enter a password, access
> code, full account number, Social Security number, or safe combination.

### Technical controls

- Validate both client and server input lengths and recognized prohibited
  identifier formats.
- Reject unsupported document uploads rather than relying on file extensions.
- Do not send private field values to third-party analytics or external content
  scanners.
- Redact request bodies, query strings, contact details, and media names from
  logs and error reporting.
- Rate-limit creation, invitation, authentication, and export operations.
- Test that unshared records and metadata cannot be inferred through APIs.

Pattern detection can reduce accidental entry but cannot prove that free-form
text contains no secret. Product copy, narrow fields, and data minimization are
the primary controls.

## Current prototype changes

The following changes are required before the prototype represents the approved
product direction:

| Current area | Required change |
| --- | --- |
| Question 4: will upload | Replace upload/photo controls with document status, holder/contact, general location, and last-verified fields |
| Question 5: institutions | Remove copy suggesting passwords may be added later; describe a safe inventory of institutions and resource categories |
| Question 6: identifying detail | Replace the encryption promise with reference guidance; initially collect nickname, institution, resource category, contact path, and last verified date without last four |
| Question 7: protections | Keep the category selection, then allow provider/contact references without policy details |
| Question 8: trusted person | Preserve explicit no-access-by-default behavior; replace demo invitations only when real authentication exists |
| Question 9: possessions | Add last verified and estate-plan alignment; keep the existing legal reminder and optional photo |
| Question 10: voice message | Keep recording, add recipient selection and a reminder not to include secrets or third-party private information |
| Mount Vault | Rename supporting copy around external password-manager, device-recovery, and responsible-person paths; never imply codes are stored |
| My Things | Describe references rather than documents or account details being “safely organized” in OnePlace |

Preserve the existing map journey, senior-first accessibility requirements,
screen-entrance motion, reduced-motion behavior, and verified Safari scroll
protections while making these changes.

## First vertical-slice record

The first backend-connected record should be deliberately low risk:

```js
{
	category: 'legal',
	type: 'will',
	title: 'Estate plan',
	status: 'confirmed',
	institutionName: 'Mountain View Estate Law',
	contactId: 'contact_professional_1',
	generalLocation: 'Original held by the estate attorney',
	nextStep: 'Contact the estate attorney and ask for the signed original.',
	verifiedAt: '2026-08-19',
	sharingGrants: []
}
```

The slice is complete when an owner can create this reference, sign out, sign
back in, retrieve it, edit it, and delete it without any other account being able
to discover its existence or metadata.

## Acceptance checklist

- Every stored field has a stated product purpose.
- Prohibited information has no dedicated field or upload path.
- Required safety copy is visible without opening help text.
- New references are owner-only by default.
- Last-verified state is present and understandable.
- Structured fields cover the primary use case without requiring a general note.
- An authorized person can identify the proper contact and next step without a
  password, complete identifier, uploaded source record, or access code.
- A trusted person cannot infer the existence of unshared records.
- Personal audio and photos have explicit recipients and download controls.
- Deletion, export, audit, and retention behavior are defined before production.
