# RZ Profit baseline audit

Audit date: 2026-11-12  
Baseline branch: `main`  
Baseline commit: `385d8d6ff5c3bf56839684d691a76f1c71379c71`

## Current product

- Android app: Java Activity + Android WebView; main application UI and business logic live in `app/src/main/assets/index.html`.
- Package: `com.rz.profit`; version `1.0.0`; target SDK 35.
- Current records: products, sales, payments, expenses, pricing settings.
- Persistence: one JSON document in WebView `localStorage` under `rz_profit_manager_v1`.
- Export: CSV export to Downloads through a JavaScript bridge.
- Automated tests: Node.js VM tests for core inventory, sales, payment, debt, voiding and fixed-price calculations.
- CI: `.github/workflows/android-apk.yml` tests, builds debug APK, checks package and records source/build SHA and artifact SHA-256.

## Findings and risks

### P0 — Accounting integrity / persistence
1. The current data model is a sales-and-stock ledger, not double-entry accounting. It cannot yet produce a defensible trial balance, balance sheet or cash-flow statement.
2. A single mutable localStorage JSON object is not an adequate long-term accounting ledger: it lacks transactional writes, schema migrations, robust backup/restore, access control and tamper-evident audit history.
3. CSV export is useful but is not a complete backup format and does not preserve immutable source documents, evidence links, journal postings or tax calculation versions.
4. Existing sales/payment records must remain readable. Migration must be additive, deterministic, tested against legacy fixtures and reversible from a verified backup.

### P0 — Tax correctness
1. Current expense entries do not record supplier identity, invoice number, tax invoice status, business purpose, evidence file, tax category, tax-year rule version or review status.
2. There is no distinction between accounting treatment and tax treatment.
3. No versioned Myanmar tax rules, assessment reconciliation, tax credit register, tax-loss schedule or appeal deadline register exists.
4. Tax calculations must not be implemented from summaries or news articles alone. Each rule needs primary-source authority, effective dates, applicability conditions, reviewer and tests.

### P1 — Document intelligence
1. The app has no document repository or OCR pipeline.
2. There is no duplicate invoice detection or invoice-to-payment-to-ledger reconciliation.
3. OCR output must remain a proposed extraction until a human confirms it; original files must never be overwritten.

### P1 — Security / operational
1. The current app stores financial data locally without an explicit encrypted backup workflow.
2. The INTERNET permission is currently used for externally imported fonts; future tax-source updates must use authenticated, integrity-checked packages and must never execute remote code.
3. No company/branch/user roles or reviewer approval workflow exists.

## Existing GitHub state observed

- Only open PR at audit time: PR #5, fixed-unit pricing and 500-kyat rounding.
- PR #5 exact-head CI run #39 passed 14 tests and built the APK, but its own description records Redmi physical-device acceptance as pending. Codex review failed due to usage limits; there is no completed human review recorded in the PR review list.
- PR #5 is not merged. Do not treat its branch code as part of `main`.
- Existing feature branches are divergent from `main`; do not merge or delete them as part of this foundation work without separate review.
- The new accounting/tax foundation branch is based on the exact `main` SHA above. No changes are made to `main`.

## Required baseline gates before feature coding

- Close or explicitly disposition PR #5 through its own physical-device and review process.
- Add characterization tests for current localStorage schema and every existing financial workflow.
- Define the legacy-data migration and backup/restore contract before changing persistence.
- Establish a separate accounting ledger; do not infer historical journal entries silently from incomplete legacy records.
