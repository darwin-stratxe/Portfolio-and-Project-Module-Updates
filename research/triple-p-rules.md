# Triple-P rules: Portfolio, Programme, Project

Definitional ruleset for the StratXe portfolio layer · 16 September 2026

These rules define and distinguish the three levels (portfolio, programme and project) so the framework, module tabs and nesting logic sit on a settled foundation. Two points they fix up front: whether a programme has its own defined scope and dates, and whether the programme inside a portfolio is the same object as the programme in the APP.

Design principle governing all rules: **governance without delay**: every rule keeps a decision trail without blocking execution unless a block is genuinely required.

---

## 1. The defining matrix

Each level is defined by the answers to the same set of questions. Where the levels differ is the whole point of the table.

| Rule dimension | Portfolio | Programme | Project |
|---|---|---|---|
| **What it is** | An enduring investment/decision domain that groups outcomes and governs the change mix within them | A finite, coordinated set of projects that must be run together to realise a shared benefit | A finite unit of change with a defined deliverable |
| **Reason it exists** | A group of strategic **outcomes** needs cross-cutting investment authority | A **benefit/objective** needs several projects coordinated to be realised | A specific **deliverable/output** needs to be produced |
| **Time boundary** | Enduring identity; **no fixed end**. Governed through dated plans and review cycles; closes only when its mandate ends | **Bounded but derived**: start/end is the coordination window across its projects, not an independently fixed date. Ends when its benefit is realised | **Fixed start and end date** |
| **Scope** | The set of outcomes and the boundary of what change it authorises; scope is a *portfolio composition*, not a deliverable | A defined objective plus the set of coordinated outcomes/benefits it owns; scope = the coordination boundary, **not** a single deliverable | A defined, bounded deliverable with acceptance criteria |
| **Ownership** | Portfolio owner/sponsor + governance forum. Ownership begins here (nothing authorised sits without a portfolio owner) | Programme owner accountable for benefit realisation | Project owner/manager accountable for delivery |
| **Basis of measurement** | Outcome-level KPIs + investment mix, capacity, benefit and value evidence | Benefit/objective achievement rolled up from its projects | Output/deliverable KPIs and delivery performance |
| **Funding** | Holds/authorises the investment envelope; can be billable or non-billable at portfolio level | Allocated a fund to achieve its objective; disburses to projects | Draws on programme (or portfolio) funds via an approved business case |
| **Authorisation to create** | Established at SP time as outcomes are defined; charter approved by sponsor | Defined from the APP once annual focus is set; programme objective approved | Requires a **business case** aligned to the fund's outcome |
| **Governance** | Primary decision-making forum; governance rules/forum configurable per portfolio | Layer of governance/escalation *if* the organisation's maturity needs it; otherwise just a structuring mechanism | Escalates support/decisions up to programme; SteerCo optional per rules |
| **Demand/intake** | Receives demand from SP, APP, AOP and portfolio-originated opportunities; holds backlog, scenarios, prioritisation | Receives prioritised demand allocated top-down; surfaces bottom-up needs | Originates bottom-up demand and dependencies back up |
| **Benefits realisation** | Rolls up programme/project benefits; tests whether funds were allocated correctly | Confirms whether the objective/benefit was achieved; pushes result up to portfolio | Defines benefits up front; tracks them **through and after** closure |
| **Dependencies** | Tracks dependencies **across** programmes and portfolios | Tracks dependencies across its projects and to other programmes | Tracks dependencies to other projects |
| **Assumptions/risk** | Holds strategic assumptions; invalidated assumptions trigger strategic review | Inherits and tests assumptions relevant to its benefit | Manages delivery-level risks |
| **Change/closure** | Restructured or closed when mandate ends; continuous diagnostic mechanism | Closes when benefit realised; may spawn follow-on projects | Closes at deliverable acceptance; benefits may still be tracked post-closure |

---

## 2. Programme definition: scope, dates and placement

**Does a programme have a defined scope and start/end date?**
Yes to scope, qualified on dates. A programme has a **defined objective and scope** (the coordinated benefit it owns), which is what separates it from a loose folder of projects. Its **dates are derived**, not independently fixed: the start/end is the coordination window spanning its constituent projects, and it ends when the benefit is realised. So it is *bounded* (unlike a portfolio, which is enduring) but not *date-first* (unlike a project, which has a fixed start/end set at definition). A folder of unrelated projects does not qualify as a programme.

**Is the portfolio programme the same as the APP programme?**
No. They are **different concepts that must be stored separately**:
- **Budget/APP programme** = a planning and budget-classification construct (and, internally at AIA today, a stand-in for departments). It answers "under which budget line / accountable structure does this sit."
- **Delivery programme** = a portfolio construct: related projects coordinated to realise a shared benefit. It answers "which projects must be run together."

Keep **budget-programme classification separate from delivery-programme membership** (per the DPME finding). A project can carry a budget-programme tag *and* belong to a delivery programme without the two being the same object. This also fixes the current internal problem where "programmes act as departments": departments/business units become a reporting dimension on projects, while delivery programmes sit as a distinct coordination layer.

---

## 3. Structural / nesting rules

The logical containment, stated as rules:

1. A **portfolio** may contain sub-portfolios, delivery programmes, and (by exception, guardrailed) projects.
2. A **delivery programme** may sit directly under a portfolio *or* under a sub-portfolio, and may contain sub-programmes.
3. A **project** normally sits under a programme; it may sit directly under a portfolio only where guardrails allow (small, self-contained change not requiring programme coordination).
4. **Nothing authorised sits outside a portfolio.** Ownership starts at the portfolio; a project cannot exist above the portfolio because there would be no owner (SP has no owner). Apparent "strategic projects" still route through the portfolio that the SP defines.
5. **BAU / operations is a separate layer**, not a project. It is tracked in the same architecture (targets, time, resources) but sits outside the change workflow. Its capacity, cost and constraints remain visible to portfolio decisions. (e.g. tendering, marketing & comms are continuous delivery with targets, not projects.)
6. **Guardrails** define which small/local projects may bypass portfolio governance, so governance does not slow delivery of trivial change.

---

## 4. Public vs private sector configuration

Same core relationships; the rules are *configured* per sector rather than redefined.

| Rule area | Public sector configuration | Private sector configuration |
|---|---|---|
| Outcome basis | Service outcomes, equity, mandatory/legislated obligations | Customer value, margin, growth |
| Funding rule | Funds may be committed at portfolio but **not disbursed** to a programme/project until release conditions met; investment has governance roadblocks by design | Capital allocation plus **revenue generation** tracked, not just cost |
| Planning linkage | Portfolio decisions link to APP annual outputs/targets and AOP activities/budgets | Portfolio integrates with business planning; balances change vs BAU |
| Programme meaning | Distinguish budget programmes (PFMA/DPME) from delivery programmes explicitly | Delivery programmes dominate; budget classification lighter |
| Evidence required | Risk, affordability, capacity, benefit, plus mandate/compliance | Risk, affordability, capacity, benefit, plus commercial return |

All three client types (public, private, and AIA's own project-focused delivery model) share the overarching process; only these configuration layers differ.

---

## 5. Summary

- **Portfolio** = outcomes · enduring · owns the investment mix · the decision forum.
- **Programme** = a benefit · bounded by its projects · coordinates delivery · *not* a department.
- **Project** = a deliverable · fixed dates · needs a business case · tracks benefits past closure.
