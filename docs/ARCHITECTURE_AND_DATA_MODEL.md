# Architecture and data model

Status: proposed target architecture for staged implementation.

## Architecture principles

1. Keep the Android app offline-first. Financial data remains on-device by default.
2. Separate presentation, accounting domain, tax rules, document processing and persistence.
3. Keep the tax calculation engine deterministic. Same input + same rule version must yield the same result.
4. Store money as integer minor units where currency precision allows, or validated decimal strings; never use JavaScript `Number` for authoritative ledger arithmetic.
5. Original documents and posted accounting records are immutable. Corrections use superseding versions or reversal/adjustment entries.
6. Tax rules are data with source provenance and effective dates, not constants scattered through UI code.
7. AI/OCR outputs are untrusted suggestions until reviewed and confirmed.

## Target logical modules

- UI: dashboard, documents, sales/purchases, ledger, assets, tax center, reports, settings.
- Domain: accounting, inventory, payments, tax computation, tax planning, period close.
- Persistence: SQLite database with schema migrations and transaction boundaries; app-private document storage; encrypted export/backup.
- Integrations: optional OCR/AI adapter and tax-rule update importer. No remote code execution.
- Evidence: source registry, document hashes, rule citations, calculation snapshots and audit log.

## Proposed core entities

| Entity | Key fields / purpose |
|---|---|
| Organization | id, legal_name, entity_type, TIN, registration, base_currency, fiscal_calendar |
| Branch | id, organization_id, name, address, active |
| FiscalPeriod | id, organization_id, start_date, end_date, status, closed_at |
| Account | id, organization_id, code, name, account_type, parent_id, tax_mapping |
| JournalEntry | id, organization_id, period_id, date, reference, narration, status, source_type, source_id |
| JournalLine | id, journal_entry_id, account_id, debit_minor, credit_minor, currency, exchange_rate_ref |
| Party | id, organization_id, party_type, name, TIN, contact, address |
| SourceDocument | id, organization_id, file_hash, mime_type, original_name, storage_uri, imported_at, status |
| DocumentExtraction | id, document_id, extractor_version, extracted_json, confidence, review_status |
| EvidenceLink | id, document_id, journal_line_id or tax_adjustment_id, relationship, reviewer_id |
| TaxRule | id, jurisdiction, tax_type, rule_code, effective_from, effective_to, source_id, status, version |
| TaxRuleSource | id, publisher, title, URL, published_at, source_class, captured_hash, verified_by |
| TaxCalculation | id, organization_id, period_id, tax_type, rule_version, inputs_hash, result, assumptions, reviewed_by |
| TaxAdjustment | id, tax_calculation_id, account_or_source_ref, adjustment_type, amount, legal_basis, evidence_status, approval_status |
| TaxPayment | id, organization_id, tax_type, tax_period, amount, payment_date, receipt_document_id, credit_status |
| TaxAssessment | id, organization_id, tax_type, tax_period, notice_document_id, assessed_amount, due_date, status |
| FixedAsset | id, organization_id, asset_code, description, acquisition_date, cost, disposal_date, business_use |
| DepreciationSchedule | id, asset_id, framework, method, rate, period, book_amount, tax_amount, rule_ref |
| AuditEvent | id, actor, action, entity_type, entity_id, before_hash, after_hash, timestamp, reason |

## Ledger invariants

- Every posted journal entry balances: total debits = total credits for each applicable currency/base-currency representation.
- Posted entries cannot be edited or deleted; reverse and repost with an audit link.
- Closed periods reject ordinary posting; controlled adjustment workflow only.
- Tax calculation snapshots retain the exact input set, rule version, rounding method and source references.
- Evidence status is explicit: missing, imported, extracted, reviewed, accepted, rejected.
- A tax adjustment cannot be marked accepted without its rule reference and required evidence.
- Import and posting operations are idempotent.

## Legacy migration

Current `rz_profit_manager_v1` data is a single localStorage JSON object. It is not a double-entry ledger.

Migration must:
1. Create a verified backup before any schema change.
2. Preserve original JSON and its hash as a migration source.
3. Import products, sales, payment events and expenses as legacy operational records.
4. Mark opening balances and historical journal entries as unverified until reconciled; do not manufacture missing payment dates, invoices, tax classifications or opening equity.
5. Generate opening journal proposals for user/accountant approval only.
6. Keep legacy IDs and source references to support traceability.
7. Test migration with empty, partial, malformed and representative legacy fixtures; failure must leave original data intact.

## Persistence decision

Replace localStorage as the authoritative accounting store with SQLite (Room or a carefully tested SQLiteOpenHelper implementation). Keep WebView localStorage only for non-critical UI preferences. Store source documents in app-private files and reference them by immutable IDs and hashes. Provide encrypted backup/export and tested restore before moving live user data.

## Security

- App-private storage; encryption for backup archives and sensitive document data.
- Android Keystore-backed key handling where supported.
- Do not log TINs, bank details, invoice contents or personal data.
- Explicit user consent before any cloud processing.
- Signed/versioned tax-rule bundles; verify signature and source manifest before import.
- Audit trail detects modification; do not describe a local hash chain as absolute tamper-proof protection against a device owner/root attacker.
