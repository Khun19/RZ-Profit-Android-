# Document intelligence, evidence and records workflow

## Scope

RZ Profit must inspect source documents and explain what can and cannot be concluded. OCR is an extraction aid, not proof of authenticity or legal deductibility.

## Supported document classes

- Sales invoice / tax invoice / receipt / credit note / debit note.
- Purchase invoice / supplier receipt / delivery note / goods received note.
- Bank statement / transfer receipt / cheque / cash deposit record.
- Payroll register / payslip / employment agreement / withholding certificate.
- Tax return / tax payment receipt / TIN registration / IRD notice / assessment / demand / objection / appeal outcome.
- DICA company registration / annual return / financial statements / board or member resolution.
- Asset purchase / lease / loan / interest statement / insurance / customs and import-export documents.
- Inventory count sheet / stock movement / damaged or lost stock report.
- Contract, service agreement, related-party agreement and other supporting evidence.

## Ingestion pipeline

1. Import original bytes from camera, file picker or share sheet.
2. Preserve original file unchanged; compute SHA-256; record original name, MIME type, size, import time, source and user.
3. Virus/malware scan where available; quarantine unsupported or suspicious files.
4. Classify document type with confidence and allow user correction.
5. OCR/extract candidate fields with extractor name/version, page and bounding-box provenance, language and confidence.
6. Present extracted data in a review queue; user confirms or corrects every material field.
7. Detect duplicates using exact hash plus normalized issuer, document number, date, currency and amount.
8. Match document to party, purchase/sale, bank transaction, inventory movement, journal and tax adjustment.
9. Post only after validation and approval; retain links to original evidence and review event.
10. Export originals and metadata together in backup/audit packs.

## Evidence statuses

UNPROCESSED → EXTRACTED → NEEDS_REVIEW → ACCEPTED or REJECTED → LINKED → ARCHIVED.

Accepted evidence must not be overwritten. Corrections create a new extraction version and audit event. Rejected evidence remains available with reason unless retention law or user-authorized deletion policy requires otherwise.

## Data fields

- Issuer and recipient legal names; TIN if present; address if required.
- Document number, document type, issue date, supply/delivery date, due date.
- Currency, net amount, tax amount by tax type, gross amount, exchange rate and source.
- Line item, quantity, unit, unit price, discount, tax classification and totals.
- Payment method, payment reference, bank transaction ID, paid amount and date.
- Business purpose, related account, supplier/customer, branch and cost centre.
- OCR confidence, reviewer, review time, evidence source and SHA-256.

Never infer a missing TIN, date, amount, signature, invoice number or tax rate. Show unknown values as unknown.

## Integrity and fraud indicators

Flag for review:
- Same invoice number reused for different suppliers or amounts.
- Exact or near-duplicate scans.
- Arithmetic mismatch between line items and totals.
- Invoice date outside the accounting period.
- Payment amount/date not reconciling to invoice.
- Supplier identity/TIN mismatch.
- Unusual round-number patterns or repeated invoices.
- Expense lacking business purpose or proof of payment where required.
- Personal or owner expenses coded as business expenses.
- Altered PDF metadata or image editing signals, as indicators only.

These indicators are not proof of fraud. Do not automatically reject genuine documents or accuse a person.

## Reconciliation outputs

For each document, show:
- Original evidence and SHA-256.
- Extracted versus user-confirmed fields.
- Related ledger entry and payment.
- Tax treatment proposed, legal rule and evidence requirement.
- Missing/contradictory information.
- Reviewer decision and timestamp.

## Retention and deletion

- Retention period is a configurable legal policy by entity, document and tax type; do not hard-code one universal period.
- Support legal hold and export before deletion.
- Deletion of a source document must be blocked if it is linked to an open tax review, audit, dispute, statutory retention period or legal hold unless an authorized legal process permits it.
- Backup/restore must preserve evidence hashes and links.
