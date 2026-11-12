# RZ Profit — Master Establishment Blueprint

**Status:** P0 foundation proposal; requires founder confirmation and independent Myanmar legal/accounting-professional review before external service launch.  
**Product direction:** Myanmar-first Tax Compliance & Financial Advisory Platform.  
**Planning baseline:** `main` at `385d8d6ff5c3bf56839684d691a76f1c71379c71`.  
**Repository safety:** Documentation-only addition to the existing `feature/myanmar-accounting-tax-foundation` branch. No application code, production tax rules, database migration, `main`, PR #5 or PR #7 changes are authorized by this document.

## 1. Establishment decision

RZ Profit is to be developed as three coordinated but separately governed parts:

1. **RZ Profit Software** — bookkeeping, inventory, accounting records, financial statements, evidence management, tax workpapers, reminders and reporting.
2. **RZ Tax & Accounting Services** — only those bookkeeping, accounting, tax-preparation and advisory services that the operating entity and assigned professionals are legally permitted and competent to provide.
3. **Professional Review Network** — independent qualified accounting, tax, legal and compliance professionals for matters requiring specialist competence, statutory authority or independent review.

The software must not represent itself as a licensed audit firm, legal practice, tax authority representative or certified professional. Service descriptions, signing authority, representation rights and professional titles require Myanmar counsel and relevant professional-body confirmation before launch.

## 2. Mission and permitted outcome

Help a client maintain reliable accounting records, understand financial performance and tax exposure, identify evidence-supported discrepancies and lawful reliefs, and meet applicable filing and payment obligations.

The product may identify **potential** overpayment or relief opportunities. It must not label a saving as confirmed until the relevant primary authority, effective date, taxpayer eligibility, transaction facts and supporting evidence have been checked and an authorized reviewer has approved the treatment.

### Prohibited conduct

- Concealing revenue, assets, beneficial ownership or transactions.
- Fabricating invoices, expenses, contracts, receipts or business purposes.
- Backdating or altering original evidence.
- Duplicate, unsupported or knowingly false deduction/relief claims.
- Misrepresenting an estimate as an official assessment or legal conclusion.
- Automatic submission, payment, objection or appeal without explicit client authorization and required professional approval.

## 3. Initial customer and service scope

### Initial customer segment

Start with owner-managed micro, small and medium businesses operating primarily in Myanmar. Prioritize a controlled single-entity workflow before multi-entity groups, complex cross-border cases or large-enterprise consolidation.

Capture legal form explicitly: sole trader, partnership, company, overseas corporation, public company, small company or another applicable form. Never assume company-specific filing, audit or annual-return duties apply to every customer.

### Initial service catalogue

| Service | Initial scope | Release condition |
|---|---|---|
| Basic bookkeeping | Sales, purchases, expenses, cash, bank, stock and supporting records | Accounting controls and backup tested |
| Accounting reports | Ledger, trial balance and management reports | Balanced posting and reconciliation tests pass |
| Year-end preparation | Closing schedules and draft financial statements | Applicable reporting framework confirmed |
| Tax compliance preparation | Tax workpapers, reconciliations, checklists and draft return support | Rule-by-rule professional approval |
| Tax health check | Potential errors, missing credits, evidence gaps and lawful relief review | Case-specific evidence and reviewer sign-off |
| Advisory | Cash flow, financial performance and lawful scenario analysis | Scope and competence confirmed |
| Audit/legal/authority representation | Referral or coordination only unless proper authority is verified | Separate authorization and qualified practitioner |

## 4. Professional governance and accountability

Every client engagement must identify the responsible service provider, preparer, reviewer, client approver and any external specialist.

| Role | Responsibility | Approval boundary |
|---|---|---|
| Founder / Product Owner | Strategy, budget, service scope and risk acceptance | Cannot override statutory professional requirements |
| Bookkeeper | Capture and reconcile source transactions | Cannot approve own high-risk adjustments |
| Senior Accountant | Ledger review, close and financial statements | Sign-off only within competence and authority |
| Tax Preparer | Prepare computations and filing schedules | Cannot independently approve own tax work |
| Tax Reviewer | Verify law, applicability, evidence and calculations | Independent from preparation where practicable |
| Legal / Compliance Specialist | Legal form, regulatory obligations, engagement and dispute boundaries | Legal conclusions only within professional authority |
| Software / Security Engineer | Data integrity, access control, backup and release evidence | No authority to approve tax treatment |
| Client | Supply complete information and approve engagement/filing | Client approval does not replace professional review |

If staffing does not allow full internal separation, high-risk work must be referred to an independent external reviewer. The system must record any role conflict and compensating review.

## 5. Client lifecycle — mandatory operating flow

```text
Inquiry
  -> Conflict check and service-fit assessment
  -> Legal form, business profile and KYC
  -> Engagement letter, scope, fees and consent
  -> Document request and completeness assessment
  -> Bookkeeping / source-data capture
  -> Bank, cash, AR, AP, stock and payroll reconciliation
  -> Period close and draft financial statements
  -> Accounting review and adjustment approval
  -> Tax reconciliation and applicable rule selection
  -> Evidence-backed tax computation
  -> Lawful relief / potential overpayment review
  -> Independent tax review
  -> Client review and explicit filing authorization
  -> Filing/payment by authorized person or client
  -> Store submitted return, receipt and authority confirmation
  -> Deadline monitoring, audit/query support and retention
```

A workflow stage cannot be marked complete if its mandatory evidence or approval is missing. Incomplete documents must be shown as missing; the system must not infer or fabricate values.

## 6. Client onboarding and document checklist

### Business profile

- Legal name, trading name, legal form and registration identifiers.
- Business activities, locations, branches and operating period.
- Directors, owners and beneficial ownership information where legally required.
- Tax registrations, taxpayer identifiers and applicable tax types.
- Fiscal year, accounting framework and reporting currency.
- Prior returns, assessments, payments, tax debts, audits, disputes and notices.
- Related-party, overseas customer/supplier, foreign currency and remittance activity.
- Engagement scope, fee agreement, confidentiality and consent.

Collect only information necessary for the engagement, restrict access, and define retention/deletion periods after legal review.

### Evidence checklist

- Bank statements, cash records and payment processor/mobile-money statements.
- Sales and purchase invoices, credit notes, receipts, contracts and delivery evidence.
- Customer and supplier balances and settlement evidence.
- Payroll, employee records and withholding support.
- Stock counts, inventory movement, wastage and obsolescence records.
- Fixed-asset register, acquisition/disposal evidence and depreciation schedules.
- Loans, interest, leases and financing agreements.
- Foreign exchange rates, remittance and cross-border transaction evidence.
- Prior tax returns, assessments, tax credits, withholding certificates and payment receipts.
- Relevant DICA, IRD, licensing and other authority correspondence.

## 7. Accounting and financial reporting policy

- Use a controlled chart of accounts and double-entry ledger.
- Store monetary values using decimal-safe arithmetic and explicit currency/precision rules.
- Require every posted journal to balance.
- Preserve source records and immutable audit events for create, edit, approve, post, reverse, import, export and close.
- Correct posted entries through reversal/adjustment, not silent deletion.
- Maintain period locks and authorized reopening.
- Reconcile bank, cash, receivables, payables, inventory, fixed assets, payroll and tax balances.
- Produce draft trial balance, profit and loss, balance sheet, cash flow and supporting schedules.
- Distinguish **Prepared**, **Reviewed**, **Client Approved** and **Finalized** states.
- Do not call a preparation/review report an independent audit opinion.

The applicable Myanmar financial reporting framework must be selected by entity classification and effective date. Secondary reports about standards adoption are not sufficient; obtain and review the original MAC notification and professional interpretation before activating framework-specific rules.

## 8. Tax knowledge and rule governance

Each tax rule must be versioned by jurisdiction, tax type, taxpayer/entity eligibility, business activity, tax year, reporting period and effective date.

Required rule metadata:

- Issuer, instrument title/number and source classification.
- Original official source URL and captured original document.
- Publication date, commencement/effective date and applicable period.
- Exact section, paragraph, schedule or page.
- Eligibility, thresholds, exceptions, transitional rules and calculation method.
- Rounding, currency and boundary conditions.
- Last checked date, preparer, independent reviewer and approval date.
- Status: `DRAFT`, `UNCONFIRMED`, `ACTIVE`, `AMENDED` or `REPEALED`.
- Superseded rule reference and immutable source hash.

### Rule activation gate

A tax rule may not be production-active until all conditions pass:

1. Readable primary authority captured.
2. Instrument identity and effective date verified.
3. Taxpayer and transaction applicability confirmed.
4. Exceptions, thresholds and transitional provisions documented.
5. Independent qualified reviewer approval recorded.
6. Unit, boundary, regression and worked-example tests pass.
7. Rule version and source hash are attached to every computation.

AI may summarize source documents, classify records and draft explanations. AI output alone cannot establish a tax rate, legal interpretation, relief eligibility, filing deadline or approval.

## 9. Lawful tax optimization controls

Every proposed tax adjustment or saving must include:

- The legal authority and applicable version.
- The actual business transaction and commercial purpose.
- Original supporting evidence and payment/settlement trace where relevant.
- Accounting-to-tax reconciliation and calculation steps.
- Eligibility and limitation checks.
- Potential impacts on other taxes, cash flow and reporting.
- Evidence completeness and uncertainty status.
- Preparer and independent reviewer decisions.

Use labels such as `POTENTIAL_DISCREPANCY`, `EVIDENCE_INCOMPLETE`, `REVIEW_REQUIRED`, `APPROVED` and `REJECTED`. Never display an unreviewed estimate as guaranteed tax savings.

## 10. Security, privacy and operational controls

- Default to local/offline processing for client financial records where feasible.
- Do not upload client documents to cloud AI/OCR without explicit informed consent and disclosure of provider, purpose, processing region, retention and deletion constraints.
- Enforce least-privilege role-based access, MFA for privileged accounts and tenant/entity isolation.
- Encrypt sensitive data in transit and at rest where supported by the deployment architecture.
- Maintain tamper-evident access and activity logs.
- Test encrypted backup, restore, integrity verification and disaster recovery.
- Establish incident response, access revocation, retention and deletion procedures.
- Review cross-border data processing, hosting and cybersecurity obligations with Myanmar counsel before enabling external services.

## 11. Establishment workstreams and phase gates

| Phase | Workstream | Required deliverables | Exit gate |
|---|---|---|---|
| P0 | Vision, service scope and governance | This blueprint, service catalogue, role matrix, risk register | Founder scope decision and professional review plan |
| P1 | Legal and professional establishment | Legal-form decision, registration checklist, professional-scope opinion, engagement templates | Counsel/professional confirmation of permitted services |
| P2 | Business operations | Entity registration evidence, bank/finance controls, SOPs, fee and complaint process | Operational readiness review |
| P3 | Accounting foundation | Data model, double-entry ledger, migration and backup contracts | Legacy preservation, balanced journals and restore tests |
| P4 | Financial statements | Close process, statement mapping, reconciliations and review report | Statements reconcile to approved ledger fixtures |
| P5 | Tax compliance engine | Source registry, versioned rules, tax workpapers and calendar | Every enabled rule independently approved and tested |
| P6 | Document intelligence | Original-file storage, hash, OCR review and evidence links | No OCR auto-post; missing/duplicate evidence tests pass |
| P7 | Advisory and optimization | Scenario analysis, relief checks and dispute workflow | Every released recommendation evidence-backed and reviewed |
| P8 | Client practice and security | Client portal/workflow, RBAC, MFA, backup and incident controls | Security and recovery acceptance passes |
| P9 | Pilot and release | Pilot reports, defects, professional sign-offs and release dossier | All launch gates pass; controlled rollout authorized |

Phases may overlap for research and documentation, but dependent production capabilities must not be activated before their predecessor gates pass.

## 12. P0 deliverables and acceptance criteria

P0 is complete only when:

- [ ] Product mission and prohibited conduct are approved by the founder.
- [ ] Initial target customer and legal-form boundaries are documented.
- [ ] Initial service catalogue and exclusions are approved.
- [ ] Software, service-provider and professional-review responsibilities are separated.
- [ ] Role matrix and maker-checker policy are approved.
- [ ] Client lifecycle and mandatory evidence checklist are documented.
- [ ] Legal/professional questions requiring Myanmar counsel or MAC/IRD-related expertise are listed with owners.
- [ ] Risk register covers tax correctness, professional authority, data privacy, security, continuity and conflicts.
- [ ] No unsupported licensing, audit, legal representation or tax guarantee claim appears in product/service copy.
- [ ] A documented decision is made before P1 legal establishment work begins.

## 13. Initial risk register

| Risk | Consequence | Required control |
|---|---|---|
| Unverified tax law or effective date | Incorrect tax computation | Primary-source rule activation gate |
| Wrong entity classification | Wrong filing/audit obligations | Legal-form-specific onboarding and review |
| Unsupported tax relief | Penalty, interest or dispute | Evidence-backed maker-checker review |
| Incomplete legacy records | Incorrect opening balances | Characterization, backup and client-approved migration |
| Data loss or tampering | Financial harm and loss of trust | Immutable audit events and tested backup/restore |
| Unauthorized disclosure | Confidentiality and legal exposure | Least privilege, tenant isolation and incident response |
| Professional scope exceeded | Invalid or unauthorized service | Counsel review, competence boundary and referral |
| Reviewer conflict | Undetected error | Independent review or external specialist |
| AI hallucination | False legal/accounting advice | Source citations, deterministic calculations and human approval |
| Missed filing/payment date | Penalties and client harm | Verified calendar, reminders and client acknowledgement |

## 14. Governance KPIs

- On-time filing rate for engagements within scope.
- Reconciliation completion rate and unresolved difference count.
- Missing-evidence rate at review and filing stages.
- Tax computations amended due to preparer/reviewer error.
- Potential overpayment cases resolved with verified evidence.
- Lawful relief claims approved, rejected and pending.
- Zero tax advice or return released without required review.
- Zero posted journals without balanced entries and audit trail.
- Legal update verification latency.
- Backup restore test success and security incidents.
- Complaints, correction time and client retention.

## 15. Immediate next actions

1. Founder confirms initial customer segment, service scope and operating model.
2. Myanmar counsel/accounting professional reviews legal form, permitted service descriptions, signing/representation authority, applicable standards and data obligations.
3. Convert confirmed requirements into a P1 legal-establishment checklist and operating manual.
4. Review PR #6 foundation documents as a set and keep all unverified legal/tax items explicitly non-production.
5. Continue PR #7 test-only contract work separately; do not represent contract tests as a production database/ledger.
6. Preserve PR #5 as an independent fixed-pricing/device-acceptance workflow.
7. Do not modify `main`, enable tax calculations, migrate client data or launch paid professional services until the corresponding gates pass.

## 16. Authority and limitation

This blueprint is a product and operating-model specification, not legal, tax, accounting or audit advice. Laws, notifications, professional rules, filing procedures and data obligations must be checked against current primary authority and the facts of each client. Final legal and professional decisions belong to appropriately qualified and authorized practitioners.
