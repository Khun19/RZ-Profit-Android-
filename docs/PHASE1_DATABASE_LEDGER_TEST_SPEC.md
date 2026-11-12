# Phase 1 — Database & Double-Entry Ledger Test Specification

Status: Draft contract / pre-implementation gate  
App: RZ Profit Android, package com.rz.profit  
Baseline main SHA: 385d8d6ff5c3bf56839684d691a76f1c71379c71  
CI command: node --test tests/*.test.cjs

## 1. Purpose and boundaries

This specification defines executable domain-contract checks before a production database or ledger is implemented. It does not claim SQLite, a production ledger engine, cloud sync or financial reports already exist.

The app currently stores business data in WebView localStorage under rz_profit_manager_v1. This PR adds tests and a specification only. It does not migrate or mutate user data.

## 2. Core invariants

1. Every posted journal has at least two lines and a positive total.
2. Every line references an account and has exactly one positive side.
3. Debit total equals credit total. Store exact integer minor units or a reviewed decimal representation; binary floating-point is not authoritative.
4. Posted journals are immutable; corrections use linked reversal journals.
5. Source-event posting is idempotent.
6. Revenue, cash received, receivables, COGS and inventory are distinct.
7. Receipts do not recognize sales revenue a second time.
8. Stock cannot become negative. Stock movement and journals commit or roll back atomically.
9. Historical sales are not replayed against opening stock during migration.
10. Migration retains legacy IDs, amounts, dates, cost snapshots, payments and source backup evidence.
11. Opening-balance journals require user or qualified accountant approval.
12. Closed periods reject posting; close/reopen is audited and permissioned.

## 3. Proposed relational model

| Table | Purpose / key fields |
|---|---|
| organizations | id, name, entity_type, TIN, base_currency |
| branches | id, organization_id, name |
| fiscal_periods | id, organization_id, start_date, end_date, status |
| accounts | id, organization_id, code, name, account_type, normal_balance, parent_id |
| parties | id, organization_id, party_type, name, TIN |
| products | id, organization_id, legacy_id, name, unit_cost, active |
| inventory_movements | id, product_id, movement_type, quantity_delta, unit_cost, source_type, source_id |
| sales | id, organization_id, legacy_id, sale_number, customer_id, occurred_at, status, total_amount |
| sale_lines | id, sale_id, product_id, quantity, unit_price, cost_snapshot |
| payments | id, organization_id, party_id, direction, amount, method, occurred_at, legacy_id |
| payment_allocations | id, payment_id, document_type, document_id, allocated_amount |
| expenses | id, organization_id, legacy_id, category_id, amount, payment_status, evidence_id |
| journal_entries | id, organization_id, fiscal_period_id, entry_date, source_type, source_id, status, reversal_of_id |
| journal_lines | id, journal_entry_id, account_id, party_id, debit_minor, credit_minor, memo |
| documents | id, file_hash, filename, mime_type, storage_uri |
| evidence_links | id, document_id, entity_type, entity_id, relationship |
| audit_events | id, actor_id, action, entity_type, entity_id, before_hash, after_hash |
| migration_batches | id, source_hash, schema_version, status, started_at, completed_at |
| migration_records | id, batch_id, entity_type, legacy_id, new_id, review_status |

### SQLite constraints

- Enable foreign keys on every connection.
- Unique indexes for organization-scoped account codes, sale numbers and migration batch/entity/legacy ID.
- Check debit and credit are non-negative; exactly one side is positive.
- Validate aggregate balance at post time inside a transaction; a row-level CHECK cannot enforce a cross-row sum.
- Enforce posted-journal immutability at the data-access layer and test at the database boundary.
- Index organization, date, status, source reference, product and party foreign keys.

## 4. Journal examples

Sale MMK 4,500, cash received MMK 1,500, receivable MMK 3,000:

| Account | Debit | Credit |
|---|---:|---:|
| Cash | 1,500 | — |
| Accounts Receivable | 3,000 | — |
| Sales Revenue | — | 4,500 |
| Total | 4,500 | 4,500 |

COGS MMK 3,000:

| Account | Debit | Credit |
|---|---:|---:|
| Cost of Goods Sold | 3,000 | — |
| Inventory | — | 3,000 |
| Total | 3,000 | 3,000 |

Later receipt of MMK 1,000 debits Cash and credits Accounts Receivable, not Sales Revenue.

## 5. Executable test catalogue

File: tests/ledger-contract.test.cjs. It contains test-only reference-contract checks, not production database integration tests. Existing CI already runs node --test tests/*.test.cjs and discovers this new file.

| ID | Test | Expected |
|---|---|---|
| LED-01 | Balanced multi-line journal | Accept |
| LED-02 | Unbalanced journal | Reject |
| LED-03 | Missing account, negative/fractional amount, both sides set | Reject |
| LED-04 | One-line or zero-value journal | Reject |
| LED-05 | Reversal | Swap debit/credit; remains balanced |
| LED-06 | Duplicate source event | One posting only |
| INV-01 | Valid sale | Decrement stock; post revenue and COGS |
| INV-02 | Oversell or invalid journal | No state mutation |
| INV-03 | Invalid quantity | Reject |
| PAY-01 | Partial receipt | Receivable falls; revenue unchanged |
| MIG-01 | Legacy IDs, amounts, cost and payments | Preserved |
| MIG-02 | Historical sales and opening stock | No stock replay |
| MIG-03 | Missing legacy collections | Safe empty result |

## 6. Required production integration tests

Before real migration, add Android/SQLite integration tests for schema creation/upgrades, foreign keys, unique constraints, crash rollback, immutable journals, persistent idempotency, backup hashes, restore/recovery, real legacy fixtures, record-count and amount reconciliation, opening stock review, Trial Balance, Balance Sheet, P&L, AR/AP and inventory reconciliation.

## 7. Migration safety

1. Read rz_profit_manager_v1 without mutation.
2. Export a source snapshot and calculate SHA-256.
3. Validate JSON and record counts.
4. Import to a new SQLite database in a transaction.
5. Preserve legacy IDs and source values; map every legacy ID to its new ID.
6. Treat current product stock as opening quantity. Never replay historical sales against it.
7. Retain historical sales as historical records pending accounting review.
8. Reconcile counts, totals, payments and stock.
9. Require approval before opening-balance journals.
10. Cut over only after tests and recovery checks pass; retain backup and rollback path.

Any failure leaves original localStorage untouched and blocks cutover.

## 8. CI and scope control

- Existing workflow command includes this file automatically; no workflow YAML changes are required.
- No Android app source, workflow, secrets, production database or user data is changed.
- Existing calculation tests and these new tests must pass on exact PR head.
- This PR does not authorize APK release, production migration, changes to PR #5 or PR #6, or merge to main.
- Automated CI and assistant review are not human maintainer approval.
