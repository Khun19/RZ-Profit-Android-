# Security, privacy and threat model

## Data classification

- Restricted: TINs, identity documents, bank account details, payroll, tax returns, source invoices, contracts and credentials.
- Confidential: financial statements, ledgers, customer/supplier balances, tax computations and business plans.
- Internal: application diagnostics and non-sensitive configuration.
- Public: published law, official forms and public tax guidance.

Collect the minimum data required. Do not put financial document contents, TINs or bank details into analytics, crash reports or general logs.

## Threats

- Lost or stolen phone; device shared among staff.
- Rooted/compromised device or malicious accessibility service.
- Malicious or malformed PDF/image/Office document.
- Unauthorized export, screenshot, clipboard or share-sheet leakage.
- Backup theft or restore to wrong organization.
- SQL injection / unsafe WebView JavaScript bridge.
- Remote source compromise or malicious tax-rule bundle.
- OCR prompt injection or hostile text embedded in uploaded documents.
- Insider edits, deletion, fabricated evidence or unauthorized journal approval.
- Supply-chain compromise of Gradle dependencies and CI actions.

## Controls

- Android app-private storage; scoped storage for user-selected imports/exports.
- SQLite transactions, foreign keys, constraints and migration integrity checks.
- Encrypt sensitive local data where practical; protect encryption keys using Android Keystore. Do not invent or hard-code cryptographic keys.
- Encrypted, authenticated backup archive with key recovery design and clear warning that losing the key may make backups unrecoverable.
- Minimize exported data; require explicit confirmation and optionally re-authentication before full backup or tax-pack export.
- WebView: disable unnecessary file/content access, restrict navigation and cleartext traffic, validate origins, expose only minimal JavaScript bridge methods, validate all inputs and avoid dynamic code loading.
- Network: TLS, strict endpoint allow-list, no cleartext HTTP for sensitive traffic, no credentials in URLs.
- Tax-rule packages: signed manifest, source URL, version, effective date, content hash, reviewer approval and rollback path; never execute remote code.
- Audit events: append-only application-level records, hash chaining where useful, periodic signed/exported checkpoints; state clearly that a rooted device owner can still tamper with local storage.
- Role-based access and maker-checker approvals for multi-user mode.
- Dependency pinning, lockfiles, SBOM, secret scanning, CodeQL or equivalent, reproducible build metadata and least-privilege GitHub Actions permissions.
- No production data in test fixtures or CI artifacts.

## Privacy and cloud processing

Default: no financial documents leave the device.

If cloud processing is added:
- Explain exactly which fields/files are sent, purpose, processor, region, retention and deletion path.
- Obtain opt-in consent for each optional processing category.
- Allow local-only use when the user declines.
- Do not send raw documents to AI unless explicitly enabled.
- Redact personal identifiers where possible.
- Review cross-border transfer, cybersecurity, contractual and sector-specific obligations with Myanmar counsel before launch.

## Mobile security assurance

Use OWASP MASVS as a requirements and test baseline, especially storage, cryptography, authentication/authorization, network communication, platform interaction, code quality and resilience:
https://mas.owasp.org/MASVS/
Use the corresponding Mobile Application Security Testing Guide for test cases:
https://mas.owasp.org/MASTG/

## Incident response

- Security contact and vulnerability disclosure process.
- Incident severity levels, evidence preservation and containment procedure.
- Revoke sessions/tokens where applicable; rotate signing and API credentials if compromised.
- Provide user-facing notice and legally required reporting only after counsel confirms applicable rules.
- Restore from verified backup and document recovery point/time.
