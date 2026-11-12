# Release Authorization Policy

**Status:** Proposed; requires Founder adoption. This policy separates documentation merge, implementation, tax activation and commercial release.

## 1. Four different decisions

1. **Documentation merge:** merges a proposal or governance baseline; does not certify legal correctness or authorize production behavior.
2. **Implementation authorization:** permits engineering work against an approved scope and design.
3. **Tax/legal rule activation:** permits a verified rule to affect user-visible calculations or compliance guidance.
4. **Commercial release/service launch:** permits distribution or service activity within a verified legal and operational boundary.

Passing one decision does not imply the next.

## 2. Gate matrix

| Gate | Documentation merge | Phase 1 implementation | Tax-rule activation | Commercial launch |
|---|---|---|---|---|
| Scope and assumptions explicit | REQUIRED | REQUIRED | REQUIRED | REQUIRED |
| Founder decisions recorded | Required for claims represented as decided; open items may remain clearly marked | REQUIRED | REQUIRED | REQUIRED |
| Primary law/source dossier | Not required for a proposal if unverified items are clearly labelled | Required for requirements relying on law | REQUIRED | REQUIRED where relevant |
| Independent legal review | Not required to merge a non-operative proposal; required before relying on legal conclusions | Required for legal-sensitive design | REQUIRED | REQUIRED for regulated/legal scope |
| Independent accounting/tax review | Not required to merge a non-operative proposal | Required before accounting/tax policy is relied upon | REQUIRED | REQUIRED for tax/accounting claims and services |
| Independent technical review | Scope-dependent; automated checks and owner audit must be disclosed | REQUIRED for material ledger/security/migration changes | Required for rule-engine implementation | REQUIRED for release candidate |
| Exact-head CI and change review | REQUIRED where workflows exist | REQUIRED | REQUIRED | REQUIRED |
| Backup/migration/recovery evidence | Not applicable to documentation-only change | REQUIRED before data migration | Required if tax data/schema affected | REQUIRED |
| Device/release acceptance | Not applicable | As defined by release scope | Required if activated in shipped app | REQUIRED |
| Professional/service authorization | Not applicable to software documentation | Not applicable unless offering services | Verify applicable authority | REQUIRED before offering regulated/professional services |

## 3. PR merge rules for a single-maintainer repository

The Founder may set required approving reviews to zero if permitted by the repository's GitHub plan/settings and if this governance model is deliberately adopted. Compensating controls:
- PR required; no direct unreviewed changes to main;
- exact-head CI checks required and successful;
- branch up-to-date requirement where practical;
- conversations resolved;
- no force-push or branch deletion on protected branches;
- owner self-audit recorded against exact head SHA;
- merge method and resulting main SHA recorded;
- post-merge checks performed.

An owner self-audit is not an independent review. A GitHub technical comment or AI review is not a maintainer approval. If GitHub settings do not enforce a required check, document the limitation and do not claim it is enforced.

## 4. Tax rule safety

Every tax rule must be versioned and scoped by jurisdiction, entity type, tax type, tax period, effective-from/effective-to dates, source instrument, exact provision, reviewer, approval state and test cases. Rules without verified primary source and independent professional sign-off remain `DRAFT` or `UNCONFIRMED` and must not affect production calculations, eligibility, reminders or customer-facing claims.

No automatic tax filing, payment, appeal or legal representation is authorized by this policy. No income concealment, false records or evasion assistance is permitted.

## 5. Stop conditions

Set `HOLD` if there is a material unresolved blocker, source ambiguity, conflicting effective dates, missing professional qualification, independence concern, failed CI, unreviewed migration risk, provenance mismatch or scope creep. Record the reason and evidence needed to resume.

## 6. Revalidation

Re-run affected gates after material changes to code, rules, law, source evidence, entity/tax period, database schema, security posture or release artifact. Retain the prior decision as historical; never silently overwrite or backdate it.
