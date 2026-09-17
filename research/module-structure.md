# Module structure and tabs

StratXe module map · 16 September 2026

The high-level StratXe module map derived from the framework, plus the tabs for each module. Distinguishes what **exists** in StratXe today, what needs **redesign**, and what is **new**.

The three things StratXe does **not** have today: portfolio definition, portfolio management, and the adjustments to project/programme management to support them.

---

## 1. Module map

| Module | Status | Framework area |
|---|---|---|
| Strategy & SP (Visioning / Strategic Plan) | Exists | Strategy, SP |
| **Strategic thinking** (outcomes → portfolio pre-definition) | **New** | Between diagnosis and framework |
| **Portfolio** | **New** | Portfolio definition + management |
| APP | Exists | Strategic planning (annual) |
| AOP / Operations | Exists (needs BAU layer) | Strategic planning + operations |
| Programmes | **Redesign** (currently act as departments) | Work management |
| Projects | **Redesign** (add business case, BAU, dependencies, benefits) | Work management |
| Performance | Exists (extend for benefits & data-linked KPIs) | Performance |

---

## 2. Portfolio module tabs

Derived from the framework and the existing portfolio-dashboard walkthrough. Ordering follows the workflow: plan → intake → decide → deliver → measure.

| Tab | Purpose | Key sub-views |
|---|---|---|
| **My Workspace** | Persona-based decision queue: what *this* user must act on | By profile: approvals, governance, reviews; decision trail |
| **Portfolio Dashboard** | Continuous tracking against the portfolio | Capacity · Delivery · Benefits · **Cost**; roll-up **and** roll-down health check |
| **Strategic Plan / Outcomes** | Portfolio's linked SP outcomes and operational KPI mapping | Outcomes; operational measures; KPI links (inherit-from-SP optional) |
| **Portfolio Plans** | The multi-year horizon | Horizon view; plan details; **scenarios** (budgets, resources, assumptions per scenario) |
| **Demand** | Inflow and intake | Demand sources; new-request / business-case assessment; per-portfolio intake rules; backlog |
| **Prioritisation** | Turning demand into authorised work | Scoring model; top-down focus vs bottom-up demand reconciliation |
| **Investments / Approvals** | Authorisation and funding | Approvals workflow; funding ceilings & conditions; funding-release gates (public) |
| **Programmes & Projects** | Composition roll-up | Programme/project inventory; dependencies across programmes/portfolios; health |
| **Resources** | Capacity and allocation | People/capacity; capital/investment; strategic (thinking) capacity; external resources; conflicts |
| **Financials** | Financial performance | Capital allocation; **revenue generation** (new); committed vs disbursed |
| **Benefits Realisation** | Value tracking | Baseline / target / due date; post-closure tracking; benefit-to-fund test |
| **Governance** | Forums and rules | Governance forums per portfolio; decision rights; escalation thresholds; SteerCo rules |
| **Assumptions** | Strategic assumption register | If/then assumptions; validation status; review triggers |

---

## 3. Programmes module redesign

Problem today: programmes are duplicated departments (allocate ownership only). Needed:

| Change | Detail |
|---|---|
| Separate programme from department | Departments/business units become a **reporting dimension** on projects, not the programme itself |
| Delivery programme as coordination layer | Programme = coordinated projects toward a shared benefit; can have sub-programmes; sits under portfolio/sub-portfolio |
| Programme objective & funding | Objective approved; fund allocated to the programme; projects tap it via business case |
| Budget-programme tag | Keep separate from delivery-programme membership |

## 4. Projects module redesign

| Change | Detail |
|---|---|
| Business case first | Define business case before project; drives funding |
| Project types | Billable / non-billable / **BAU** (third layer) |
| Dependencies | Across projects, programmes and portfolios |
| Assumptions | Delivery-level assumptions linked to strategic assumptions |
| Benefits | Defined up front; tracked through and **after** closure |
| Department linkage | Retain project → department/business-unit link |

## 5. Operations / BAU (new layer)

| Component | Detail |
|---|---|
| BAU as a distinct layer | Not a project; same architecture (targets, time, resources) |
| Time & allocation | Time tracking extended to ops; ops-vs-project allocation (e.g. 80/20) |
| BAU targets | Tenders, marketing & comms as continuous delivery with targets |
| Visibility to portfolio | Capacity/cost/constraints surfaced to portfolio decisions |

---

## 6. Build order (MVP)

The MVP is the **foundations**, not full workflow: the ability to define portfolios, structure them into programmes and projects, and apply the governance layer across them.

1. Strategic thinking → outcomes → portfolio definition.
2. Portfolio composition + charter + roadmap.
3. Programmes/projects redesign (business case, types, dependencies).
4. Governance layer (forums, rules, approvals): foundations only.
5. Benefits realisation + performance roll-up.

Everything else (full scenario intelligence, AI diagnostic, revenue financials) builds on this.
