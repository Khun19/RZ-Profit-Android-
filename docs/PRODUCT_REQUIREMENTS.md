# RZ Profit — Myanmar Accounting & Tax Intelligence PRD

Status: foundation proposal; requirements require user and Myanmar tax-professional validation.  
Product direction: offline-first, Myanmar-first accounting and lawful tax-burden review platform.

## Product objective

Help businesses and accounting professionals maintain reliable books, understand their tax exposure, detect calculation or assessment discrepancies, identify legally available deductions and incentives, and prepare evidence-backed submissions. The product must reduce avoidable overpayment and compliance risk, not facilitate concealment, fictitious expenses, false invoices, duplicate claims or tax evasion.

## Target users

1. Micro, small and medium businesses and owner-managed businesses.
2. Medium and large companies, multi-branch operators and finance teams.
3. Accountants, CPA/ACCA professionals, auditors and tax consultants.

Start with a robust single-entity SME workflow, but design entity boundaries and permissions so enterprise capabilities can be added without rewriting the ledger.

## Core capabilities

### A. Accounting
- Configurable chart of accounts and double-entry journals.
- General ledger, journal register, trial balance and period close.
- Sales, purchases, receivables, payables, cash, bank and payment allocations.
- Inventory valuation and cost of goods sold; retain current average-cost behavior until an explicit migration/reconciliation is approved.
- Fixed assets register, accounting depreciation and disposal.
- Month-end and year-end closing with locked periods and controlled adjustments.
- Financial statements: profit and loss, balance sheet, cash-flow statement, changes in equity, trial balance and supporting schedules.
- Myanmar Kyat as base currency initially; multi-currency support requires explicit exchange-rate source, date and approval.

### B. Document intelligence
- Import PDF, JPG, PNG, CSV, XLSX and DOCX where supported.
- Preserve original file bytes, original filename, import timestamp, uploader and SHA-256.
- OCR/extraction for supplier/customer, TIN if present, invoice number, dates, line items, amounts, tax amounts and currency.
- Human review of extracted fields before posting.
- Duplicate detection using file hash and normalized document identifiers.
- Match invoice ↔ payment/bank transaction ↔ journal entry.
- Flag missing, inconsistent, expired or unsupported evidence; never silently invent missing values.

### C. Tax compliance
- Versioned rules by jurisdiction, tax type, fiscal year, effective date and entity eligibility.
- Separate accounting profit from taxable income.
- Computations and schedules for income tax, commercial tax, specific goods tax, withholding tax, capital gains and other applicable taxes as verified for the entity and period.
- Advance tax, withholding credits, tax payments, refunds and carry-forward schedules.
- Return preparation checklist, filing calendar, evidence bundle and reconciliation.
- Tax assessment / demand notice comparison with the entity's own return and records.

### D. Lawful tax planning and dispute support
- Deductibility review with business purpose, invoice/receipt, payment proof, tax treatment and applicable rule.
- Depreciation scenario comparison using only legally supported asset classes, rates, methods and effective dates.
- Eligibility checks for SME, MIC, SEZ, treaty, donation or other reliefs only when current primary authority and conditions are available.
- Loss utilization schedule with source-year, loss type, expiry and restrictions.
- Tax credit and double-counting detection.
- Assessment discrepancy report, document checklist, draft factual representation and appeal / review deadline tracker.
- Show potential savings as estimates with assumptions and confidence; do not label as approved tax relief until validated.

### E. Audit and professional workflow
- Immutable audit events for create, edit, approve, post, reverse, import, export and close actions.
- Maker-checker approval for journals, tax adjustments and returns.
- Role separation: owner, bookkeeper, accountant, reviewer, auditor/read-only.
- Period lock and reversal entries; no destructive deletion of posted financial records.
- Evidence provenance for every tax adjustment and material figure.
- Exportable audit pack with calculations, source documents, rule references and approvals.

### F. Reporting
- Daily, monthly, quarterly and annual management reports.
- Financial statements and tax reconciliation reports.
- Cash-flow forecast, receivables/payables ageing, stock valuation and expense analysis.
- PDF and XLSX exports with report period, entity, currency, generation time and rule version.

## Non-functional requirements

- Offline-first operation for bookkeeping and document capture.
- No cloud upload of financial documents by default.
- Explicit consent and secure transport for optional cloud OCR or AI.
- Decimal-safe money calculations; never use binary floating point for ledger amounts.
- Idempotent imports and postings.
- Backup/restore with integrity verification and clear recovery instructions.
- Burmese and English labels; dates and fiscal periods explicit.
- Accessibility and usable on low/mid-range Android devices.
- Tax engine deterministic and testable; AI can extract, classify and explain but cannot post or approve tax treatment autonomously.

## Out of scope / prohibited

- Hiding sales, fabricating expenses, false invoices, backdating evidence or manipulating records to evade tax.
- Automatic filing, payment or appeal submission without explicit user confirmation and professional review.
- Claiming an assessment is unlawful solely because it is high or differs from an estimate.
- Treating an OCR guess, news report or AI answer as binding law.
