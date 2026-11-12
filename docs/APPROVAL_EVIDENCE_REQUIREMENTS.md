# Approval Evidence Requirements

## 1. Evidence quality levels

- **E0 — Assertion:** verbal statement or unsupported claim. Not approval evidence.
- **E1 — Discovery:** search result, website listing, secondary article or AI research note. Useful for leads, not final legal/professional verification.
- **E2 — Primary record:** official law, gazette, regulator/professional-body record, official register extract or reproducible test output with retrieval date and provenance.
- **E3 — Independent assessment:** qualified independent reviewer has examined E2 evidence and the exact project artifact, documented findings and signed/traceably confirmed a scoped conclusion.
- **E4 — Operational verification:** implementation/release evidence confirms the approved design is correctly implemented for the exact build, environment and version.

Evidence level is not a universal legal ranking. The competent authority's formal decision or statutory instrument remains controlling where required.

## 2. Primary legal and tax source dossier

For each legal proposition capture:
- exact title and instrument number;
- issuing authority and instrument type (Act, amendment, rule, notification, order, official guidance);
- original-language source and official URL;
- publication date and commencement/effective date;
- exact section/provision and applicable entity/tax period;
- amendment/repeal/consolidation history;
- date accessed, archived copy and SHA-256;
- translation provenance, if translated;
- unresolved ambiguity and professional reviewer decision.

If the original source is inaccessible, mark `PRIMARY_SOURCE_UNAVAILABLE`. If only a translation or commentary exists, mark `SECONDARY_ONLY`. If dates or versions conflict, mark `CONFLICTING_SOURCE_DATA`. Such entries must not activate production tax calculations.

## 3. Technical evidence package

Record repository, PR, branch, exact head SHA, base SHA, workflow/run IDs, workflow definition revision, check names and conclusions, dependency/toolchain versions, artifact IDs and SHA-256, test reports, migration/backup/restore results, security findings and known limitations. CI PASS is not device acceptance or professional approval.

## 4. Signed review report requirements

A signed report must state:
- reviewer identity, organization and verifiable qualifications;
- current practising status verification method and date, where relevant;
- independence/conflict declaration;
- exact scope, exclusions and standard/criteria applied;
- artifact/version/commit SHA;
- evidence list and review method;
- findings with severity and remediation;
- conclusion: PASS, PASS_WITH_LIMITATIONS, CHANGES_REQUIRED or BLOCKED;
- limitations and reliance restrictions;
- signature or traceable authenticated confirmation and date;
- expiry/revalidation triggers.

## 5. Integrity and privacy

Store reports in a restricted repository location or controlled external evidence store. Keep a hash and metadata in the register. Do not commit personal identity documents, signatures, customer records, tax IDs, credentials or sensitive client files into a public repository. Public PRs should contain sanitized evidence summaries and non-sensitive verification metadata only.
