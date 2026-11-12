# Quality assurance and acceptance criteria

## Financial correctness

- Money arithmetic uses integer minor units or a decimal library with explicit scale and rounding.
- Every posted journal entry balances; debits equal credits.
- Trial balance totals reconcile to the ledger.
- Balance sheet assets equal liabilities plus equity.
- Profit and loss reconciles to retained earnings/period close according to the selected accounting framework.
- Cash-flow statement reconciles to cash and cash equivalents.
- Inventory movement, valuation and cost of goods sold reconcile to stock subledger.
- AR/AP ageing reconciles to control accounts.
- Bank reconciliation exposes every unmatched item; no silent write-off.
- Tax computation reconciles accounting profit to taxable income with traceable adjustments.
- Every tax credit and payment is applied once only; duplicate credits are blocked.

## Document correctness

- OCR extraction is never automatically treated as confirmed evidence.
- User can correct OCR values; original remains immutable.
- Duplicate detection catches exact file hash and likely duplicate business identifiers.
- Evidence-to-ledger and evidence-to-tax-adjustment links survive export and restore.
- Corrupt/unsupported files fail safely without app crash or partial ledger posting.

## Migration and recovery

- Fixtures include empty store, legacy schema, partially populated records, malformed JSON, large inventory, partial sale/payment and cancelled sale.
- Migration is atomic and idempotent.
- A failed migration leaves original data intact.
- Backup is verified before and after restore by archive integrity, document hashes, record counts and ledger invariants.
- Test device loss/reinstall restore, insufficient storage, interrupted export and app upgrade.
- Never silently invent opening balances or historical journals from legacy operational data.

## Security and privacy

- Test storage, logs, clipboard, screenshots, exported files, WebView bridge, navigation, TLS and backup paths.
- Test unauthorized role access, maker-checker separation, period lock and audit trail.
- Fuzz document import and malformed data.
- Run OWASP MASVS-aligned review and dependency/SBOM/security scans.
- Verify no financial source documents or secrets leak into CI logs/artifacts.

## Usability and accessibility

- Burmese and English content; consistent numeric grouping and Myanmar Kyat display.
- Support Myanmar Unicode and common Android keyboards.
- Text scaling, screen readers, adequate touch targets, visible focus, clear contrast and error messages.
- Avoid color-only status indicators; provide text labels and accessible descriptions.
- Clear date format and financial-year range on every report.
- Low-memory and low-storage behavior tested on representative Android devices.
- Offline core workflows remain usable without network.

## CI and release

- Unit tests, integration tests, migration tests, security checks and APK build run on exact PR head.
- Verify package ID, version, manifest permissions, APK SHA-256 and build provenance.
- Emulator acceptance and physical-device acceptance are separate gates.
- Redmi physical test evidence records device model, Android/API, install, launch, create/edit, close/reopen persistence, backup/restore, sales/stock/debt regression, crash/logcat and screenshot.
- No auto-merge until all required checks, human review and acceptance gates pass.
- Publish release notes and known limitations; never claim CPA/ACCA certification or tax correctness without competent independent validation.

## Definition of Done

A phase is complete only when its documented requirements, implementation, tests, evidence, reviewer approval and rollback/restore path all pass. A document-only PR is not a completed feature implementation.
