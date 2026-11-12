# Legal and regulatory register — Myanmar

Research snapshot: 12 November 2026. This is a product requirements register, not a legal opinion. The official law text and notices applicable to each entity and period must be checked before production activation.

## Source hierarchy and evidence labels

Use these labels in the app and source register:
- **PRIMARY_LAW** — enacted law, regulation, notification or order with legal effect.
- **OFFICIAL_GUIDANCE** — IRD, DICA, MAC or other authority forms, FAQs and instructions; guidance is not automatically legislation.
- **PROFESSIONAL_COMMENTARY** — tax/legal/accounting firm analysis.
- **NEWS_REPORT** — a lead requiring primary-source confirmation.
- **UNVERIFIED_REPORT** — taxpayer/community anecdote; never use as a tax rule.

Record issuer, title, instrument number, publication date, commencement/effective date, tax year/reporting period, jurisdiction, exact section/page, source URL, captured file hash, last checked date, reviewer and superseded-by reference.

## Companies and corporate reporting

Primary references:
- Myanmar Companies Law 2017, Pyidaungsu Hluttaw Law No. 29, dated 6 December 2017: https://www.myco.dica.gov.mm/documentation/mm/MCL.en-US.pdf
- Myanmar Companies Law entry in Myanmar Law Information System: https://www.mlis.gov.mm/mLsView.do%3Bjsessionid=713D54937717F7678D237A19618037B5?lawordSn=10800
- Myanmar Companies Regulations 2018: https://www.dica.gov.mm/wp-content/uploads/2024/06/company_regulations_2018_eng_0.pdf
- DICA Annual Return / section 97 material: https://www.dica.gov.mm/wp-content/uploads/2024/06/form_ar_-_97_annual_return_clean.pdf

Product requirements:
- Organization profile must distinguish company, overseas corporation, small company, public company, partnership, sole trader and other legal forms. Do not assume Companies Law obligations apply to every business type.
- Maintain statutory registers and compliance dates as configurable obligations, not generic accounting reminders.
- Support financial records, annual financial statements, audit status, board/member approval and annual return evidence where applicable.
- Model related parties, beneficial ownership and group relationships only to the extent legally relevant and with restricted access.
- DICA filing requirements and tax filing requirements are separate calendars and must not be conflated.
- A filing deadline must link to the applicable legal provision or official current notice and entity applicability.

The Companies Law text includes provisions on keeping financial records, financial reports and audit. The exact retention period, exceptions, audit exemptions and filing obligations must be verified against the current consolidated law and regulations by Myanmar counsel before being encoded as mandatory deadlines.

## Tax law and administration

Primary sources:
- IRD laws index (includes 2026 Union Taxation Law): https://www.ird.gov.mm/laws/union-taxation-law
- IRD tax administration law index: https://www.ird.gov.mm/laws/tax-administration-law
- IRD tax forms and assessment notices: https://www.ird.gov.mm/forms/income-tax/assessment
- IRD Digital Library: https://digitallibrary.ird.gov.mm/policyandlaw.php
- 2026 UTL is reported as National Defence and Security Council Law No. 18/2026, enacted 15 March 2026, effective 1 April 2026: https://www.presoffministry.gov.mm/en/news/28367
- DFDL Myanmar Tax Guide 2026, published 28 September 2026 (secondary commentary): https://www.dfdl.com/insights/content-hub/publications/tax-guides/myanmar-tax-guide-2026

Tax engine rules:
- Store accounting profit, taxable income, tax base, tax rate, credits, penalties and payments as separate components.
- Tax type and return periods must be configured by entity, business activity, registration and applicable year.
- A tax estimate is not an assessment; an assessment is not proof of correctness.
- Track assessments, amended assessments, notices, service dates, objections/reviews, appeals, payment demands and payment receipts independently.
- Do not hard-code one appeal deadline for all tax matters. Determine the exact instrument, statute, section, current amendments and service date.
- Distinguish arithmetic error, omitted credit, classification dispute, eligibility dispute, interpretation dispute and late-filing/penalty dispute.
- Tax overpayment is only confirmed after evidence and current law support it; until then label it "potential discrepancy".

## Accounting standards and professional framework

Sources:
- MAC legal framework and official notification archive: https://www.oagmac.gov.mm/my/mac-legal-framework
- IFRS Foundation Myanmar jurisdiction profile (profile last updated 17 April 2019; historical and potentially stale): https://www.ifrs.org/use-around-the-world/use-of-ifrs-standards-by-jurisdiction/view-jurisdiction/myanmar/
- VDB Loi commentary on MAC Notification 19/2026 (16 March 2026) and MSME standard effective FY2027–2028: https://www.vdb-loi.com/mm_publications/adoption-of-ifrs-for-micro-small-and-medium-sized-entities-starting-from-fy2027-2028/
- Global New Light of Myanmar report on MAC adoption: https://www.gnlm.com.mm/mac-adopts-ifrs-for-msmes/

Important conflict / verification gate:
- The IFRS Foundation jurisdiction profile is dated 2019 and cannot settle 2026 applicability.
- Secondary sources report MAC Notification 19/2026 dated 16 March 2026 and applicability from FY2027–2028. The original notification should be downloaded from MAC/OAG and reviewed before this becomes an active framework rule.
- Do not describe all SMEs as automatically subject to one framework without checking entity classification, public-interest status, the exact notification and any transition/early-adoption clauses.
- Accounting framework is not tax law. Tax computations require their own adjustments even when books follow IFRS/MFRS.

## Digital and cybersecurity laws

Sources:
- Myanmar Cybersecurity Law No. 1/2025, published 1 January 2025; secondary legal analysis reports it came into effect 30 July 2025 following implementing notification: https://www.tilleke.com/insights/myanmar-cybersecurity-law-takes-effect/
- Myanmar government portal record for Cyber Security Law: https://myanmar.gov.mm/communication/document
- Electronic Transactions Law (2004) and amendments, including 2021 amendment record: https://www.mlis.gov.mm/mLsView.do;jsessionid=7D02C63E2E64C281E6E6AC6CA1445665?lawordSn=1098 and https://www.myanmar-law-library.org/law-library/laws-and-regulations/laws/myanmar-laws-1988-until-now/state-administration-council-2021/myanmar-laws-2021/state-administration-council-law-no-07-2021-law-amending-the-electronic/

Legal analysis reports no general standalone data-protection law as at 11 February 2026, but this does not remove obligations under sectoral laws, contracts, cybersecurity rules or other applicable legislation: https://www.dlapiperdataprotection.com/?t=law&c=MM

Implementation rule:
- Do not claim compliance or non-compliance solely from a generic privacy checklist. Maintain a legal review register for data categories, processing, transfers, cloud hosting, incident reporting and retention.
- Default to local-only data processing. Obtain explicit informed consent for optional cloud OCR/AI and explain provider, purpose, region, retention and deletion limits.
- Legal review is required before enabling cross-border transfers or hosting sensitive accounting data externally.

## Tax rule activation gate

A Myanmar tax rule cannot be production-active unless:
1. Primary source is captured and readable.
2. Instrument and effective date are verified.
3. Entity/sector/transaction applicability is mapped.
4. Exceptions, thresholds, rounding and transitional provisions are recorded.
5. At least one independent qualified reviewer approves it.
6. Unit, boundary, regression and example tests pass.
7. Rule version and source hash are retained with every calculation.
