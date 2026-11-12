# Myanmar tax rules governance

Status: research baseline only. Not legal advice and not yet a production tax ruleset.

## Source hierarchy

1. Primary law: enacted Union Taxation Law, Tax Administration Law, Income Tax Law, Commercial Tax Law, Specific Goods Tax Law, rules, notifications, orders and official IRD forms/notices.
2. Official administrative material: IRD announcements, filing guidance, published forms, official FAQs and government gazette.
3. Professional commentary: PwC, DFDL, VDB Loi and qualified Myanmar tax practitioners.
4. News and taxpayer reports: leads for investigation only; never a standalone legal basis for a tax computation.

## Current research references

- IRD laws: https://www.ird.gov.mm/laws
- IRD announcements: https://www.ird.gov.mm/announcements
- Union Taxation Law 2026 PDF previously located: https://www.ird.gov.mm/storage/laws/6a6b496e035ea-utl2026.pdf
- PwC Myanmar corporate deductions: https://taxsummaries.pwc.com/myanmar/corporate/deductions
- PwC Myanmar corporate tax administration: https://taxsummaries.pwc.com/myanmar/corporate/tax-administration
- VDB Loi Myanmar Tax Booklet 2025–2026: https://www.vdb-loi.com/wp-content/uploads/2025/11/Myanmar-Tax-Booklet_2025-2026.pdf
- VDB Loi commentary on IFRS for SMEs: https://www.vdb-loi.com/mm_publications/adoption-of-ifrs-for-micro-small-and-medium-sized-entities-starting-from-fy2027-2028/

## Research caveats

- The 2026 Union Taxation Law is reported as effective from 1 April 2026. The complete schedules, related notifications and amendments must be reviewed before any rule is activated.
- The prior research summary reported a qualifying SME exemption threshold of MMK 20 million annual net profit for three consecutive years under the 2026 law. Eligibility conditions and exact statutory wording must be independently verified from the full official text before implementation.
- PwC and VDB Loi materials are secondary commentary and may contain historical periods. Do not carry FY2025–2026 thresholds or rates into FY2026–2027 without checking current primary law.
- The reported IFRS for SMEs transition from FY2027–2028 requires direct verification against the Myanmar Accountancy Council's original notification and entity applicability.
- Tax depreciation rates, loss utilization, donations, withholding tax, advance tax, filing deadlines and appeal periods must each be validated against the applicable primary source and tax period.

## TaxRule publication lifecycle

Draft → source captured → legal text extracted → applicability mapped → independent professional review → test cases passed → approved → effective → superseded/withdrawn.

Every rule must record:
- jurisdiction and tax type;
- entity types, sectors and conditions;
- effective_from / effective_to and relevant tax year;
- exact source title, issuing authority, publication date, URL, page/section/paragraph;
- captured source hash and review timestamp;
- computation formula, rounding, thresholds, exceptions and required evidence;
- reviewer identity/qualification and approval state;
- unit tests, boundary tests and regression fixtures.

No rule is production-active if the primary source, effective date, eligibility or test coverage is missing.

## Assessment and dispute handling

- Compare the demand notice with filed return, tax payment credits, withholding certificates, books and source documents.
- Separate arithmetic mismatch, missing credit, eligibility issue, classification dispute, interpretation issue and late-filing/penalty issue.
- Display disputed amount as a potential discrepancy, not a confirmed overcharge.
- Capture notice date, service date, response deadline, applicable review/appeal route, extension status and proof of submission.
- Deadline rules must be sourced by notice type and current law; never hard-code one universal 30/90-day timer.
- Draft submissions are factual working papers and require taxpayer/qualified professional review before filing.

## Ethical and compliance boundary

The system may help claim genuine deductible expenses, credits, incentives and reliefs; correct arithmetic/classification errors; and challenge unsupported assessments. It must block or flag fabricated documents, concealed revenue, duplicate deductions, personal expenses presented as business expenses, backdating and false declarations.
