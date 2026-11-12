# Independent Review & Approval Framework (IRAF)

**Status:** Proposed governance baseline — pending Founder adoption and independent review  
**Applies to:** RZ Profit documentation, software changes, accounting controls, tax-rule research and release decisions  
**Version:** 1.0.0  
**Effective date:** Not effective until the Founder records adoption

## 1. Purpose and limits

IRAF establishes an evidence-led review process that approximates the rigor of independent organizational review for a single-maintainer project. It does not create a statutory regulator, certification body, audit firm, law practice, accounting practice or tax advisory practice. It cannot confer legal authority or replace any review, audit, licence, filing, approval or opinion required by Myanmar law.

The project must never describe an AI-generated review, automated check, web research result or Founder self-audit as an independent human professional approval.

## 2. Review roles and separation

| Role | Scope | Required independence/evidence |
|---|---|---|
| Founder / Product Owner | Product scope, business model, risk appetite, acceptance of residual product risks and final project decision | Signed or attributable decision record; disclose conflicts |
| Independent Legal Reviewer | Myanmar company, contract, regulatory, privacy and legal-scope questions within their competence | Identity and current relevant practising status verified; written scoped opinion/review; conflicts declared |
| Independent Accounting & Tax Reviewer | Accounting policies, ledger controls, tax classification and tax-rule interpretation within competence | Identity and current relevant qualification/practising status verified; written review; conflicts declared |
| Independent Technical Reviewer | Architecture, security, data integrity, migrations, build provenance and test evidence | Separate person/team; relevant experience and conflict declaration; reproducible technical report |
| Automated / AI Review | Static checks, test execution, source discovery, consistency analysis and draft findings | Supporting evidence only; never a human approval |

Where one qualified person is competent in multiple disciplines, that person may provide multiple scoped opinions only if competence, independence and conflicts are documented. Prefer separate legal and accounting reviewers for material legal/tax decisions.

## 3. Approval states

Use only these states:

- `NOT_REQUESTED`: review has not been commissioned.
- `IN_PROGRESS`: evidence gathering or review is active.
- `COMMENTED`: observations supplied; no approval implied.
- `PASS_WITH_LIMITATIONS`: reviewer approves only the explicitly stated scope and limitations.
- `PASS`: reviewer approves the defined scope against stated criteria.
- `CHANGES_REQUIRED`: findings must be resolved before the relevant gate.
- `BLOCKED`: missing evidence, lack of competence/independence, or unresolved material risk.
- `EXPIRED`: approval no longer applies because the source, law, design, data, code or scope changed.

A review is valid only for the exact artifact/version/commit and scope named in its report. Material changes invalidate affected approvals and require reassessment.

## 4. Gate model

### G0 — Scope and Founder decisions
Record product purpose, intended users, jurisdiction, entity/operating model assumptions, whether the product is software-only, service boundaries, data custody, monetization assumptions, offline/cloud/AI boundaries and risk appetite. Unknowns remain `OPEN`; do not fabricate decisions.

### G1 — Primary-source verification
For each legal/tax proposition, record the official source, issuing authority, instrument type, exact provision, publication date, commencement/effective date, amendment history, applicability, retrieval date, original-language copy and file hash. Mark unverified or inaccessible claims `UNCONFIRMED`. Secondary commentary is not a substitute for primary law.

### G2 — Independent legal review
Obtain a scoped written review from a suitably qualified Myanmar legal professional. Confirm identity, current practising status where applicable, competence, independence, conflicts, scope and limitations.

### G3 — Independent accounting and tax review
Obtain a scoped written review from a suitably qualified Myanmar accounting/tax professional. Confirm current qualification and practising status where relevant, competence, independence, conflicts, scope and limitations.

### G4 — Independent technical review
Review the exact commit and evidence package, including architecture, threat model, database invariants, migration/recovery, test coverage, CI, artifact identity and provenance.

### G5 — Founder decision
Founder records accept/reject/defer decisions and explicitly accepts only risks within their authority. Founder cannot waive statutory obligations or convert missing professional evidence into approval.

### G6 — Merge / implementation / activation / release
These are separate decisions. A documentation PR may be mergeable as a clearly labelled proposal before all later implementation or launch gates are satisfied, if its content does not claim those gates are complete. Production tax-rule activation and regulated/professional services remain blocked until their own requirements are met.

## 5. Non-substitution and quorum rules

- No single AI system, automated test suite or web research agent may fill a human professional role.
- Founder self-audit is a governance control, not independent review.
- Legal and accounting/tax approvals are separate; one does not imply the other.
- A technical PASS does not validate legal interpretation or tax calculations.
- No approval may be backdated, inferred from silence, or represented as a statutory certification.
- If no reviewer is available, record `BLOCKED — INDEPENDENT REVIEW NOT OBTAINED`; narrow the scope or defer the affected activity. Do not fabricate a second reviewer.

## 6. Required review package

Every review package must include:
1. Repository, PR, branch and exact commit SHA (or document version).
2. Scope, intended use, exclusions and assumptions.
3. Evidence index and source provenance.
4. Tests/checks, tool versions and results where applicable.
5. Findings classified as `BLOCKER`, `MAJOR`, `MINOR`, or `OBSERVATION`.
6. Limitations, conflicts declaration and reviewer qualifications.
7. Reviewer name, organization, date and signature/traceable confirmation.
8. Approval state, expiry/revalidation triggers and follow-up owner.

## 7. Revalidation triggers

Re-review affected scope when: applicable law changes; an official interpretation is updated; source documents are corrected; a tax period/entity type changes; architecture or accounting policy changes; schema/migration logic changes; a material security incident occurs; the commit changes; or a reviewer qualification/independence concern arises.

## 8. Governance for a single-maintainer repository

The repository may use required approving reviews = 0 if the Founder deliberately adopts that repository policy and compensating controls are documented. This does not create an independent approval. Require PRs, exact-head CI, conversation resolution, protected branch settings appropriate to the plan, owner audit records and a post-merge verification trail. Do not bypass failed checks or conceal a missing independent review.

## 9. Current status

This framework is a proposed governance document. It is not evidence that any reviewer has been appointed, any professional review has occurred, any law has been verified, or any approval gate has passed. Founder adoption and external professional review remain outstanding.
