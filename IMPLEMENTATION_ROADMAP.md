# Implementation roadmap and acceptance gates

This roadmap intentionally avoids a big-bang rewrite.

## Phase 0 — Baseline and safety foundation
- Keep current `main` stable.
- Independently resolve PR #5's Redmi acceptance and review gates.
- Characterize current behavior with regression tests.
- Add architecture, requirements, tax-source governance and baseline audit documentation.
- No destructive migration, no auto-merge, no production tax-rate activation.

Exit: baseline SHA and open PR disposition recorded; tests cover all current sales/payment/stock flows.

## Phase 1 — Data safety and accounting foundation
- Design SQLite schema and versioned migrations.
- Implement backup/restore, integrity check and recovery test before migration.
- Add organization profile, fiscal year, chart of accounts and journal entry workflow.
- Add decimal-safe money library and balanced-journal invariant.
- Preserve legacy sales/stock system while adding accounting postings behind feature flags.
- Build trial balance and general ledger; reconcile opening balances with user approval.

Exit: migration tests pass; no legacy record loss; every posted journal balances; restore test passes.

## Phase 2 — Documents and evidence
- Add document import and immutable original storage.
- Add SHA-256, metadata, OCR adapter and extraction review queue.
- Add duplicate invoice and invoice/payment/ledger matching.
- Link each accepted tax adjustment to evidence.

Exit: OCR never auto-posts; duplicate and mismatch tests pass; source documents can be exported and restored.

## Phase 3 — Financial statements
- Periodic trial balance, profit and loss, balance sheet and cash-flow statement.
- Month-end and year-end close with controlled adjustments.
- Inventory, fixed assets and depreciation schedules.
- Reconciliation and comparative reports.

Exit: statements reconcile to ledger and balance sheet balances for validated fixtures.

## Phase 4 — Myanmar tax compliance engine
- Tax rule registry and source provenance.
- Taxable-income reconciliation from accounting profit.
- Verified income tax, CT, SGT, WHT and other applicable tax modules, one at a time.
- Tax credits, advance payments, filing checklist and return schedules.
- Tax calculation snapshots and reproducible tests per tax year.

Exit: every active rule reviewed against primary authority; CPA/tax professional sign-off required before production use.

## Phase 5 — Lawful tax planning and assessment review
- Deductibility and non-deductibility checks.
- Tax depreciation and loss schedules.
- Incentive eligibility and scenario comparison.
- Assessment notice comparison, discrepancy report and review/appeal calendar.
- Draft evidence-backed representation pack.

Exit: no savings estimate without assumptions, rule citation and evidence status; all submissions require user/professional approval.

## Phase 6 — Professional and enterprise
- Multi-branch, role-based access and maker-checker.
- Consolidation and multi-currency.
- Advanced audit packs, API integrations and optional secure cloud OCR.
- Framework support based on Myanmar Accountancy Council applicability.

## Release gates for every phase

- Scope review and threat/privacy review.
- Unit, integration, migration and regression tests.
- Exact-head CI and APK package validation.
- Provenance: PR head SHA = build SHA; artifact hash and workflow run recorded.
- No merge until review gates pass; device acceptance separate from emulator/CI.
- No claim of CPA/ACCA compliance or tax-law correctness without independent qualified review.
