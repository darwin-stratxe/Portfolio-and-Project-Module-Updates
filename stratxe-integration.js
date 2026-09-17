(function () {
  "use strict";
  var key = "stratxe-integration-demo-v1",
    saved,
    storageAvailable = true;
  try {
    saved = JSON.parse(localStorage.getItem(key) || "null");
  } catch (_) {
    storageAvailable = false;
  }
  var store = window.StratxeIntegrationModel.createStore(saved),
    message = "",
    error = false;
  var viewNames = {
    model: "Integration model",
    mandate: "Portfolio mandate",
    intake: "Shared intake",
    decision: "Investment decision",
    delivery: "Delivery & AOP",
    benefits: "Results & benefits",
    interfaces: "Module interfaces",
  };
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }
  function money(v) {
    return "R" + Number(v).toLocaleString("en-ZA");
  }
  function button(text, action, extra, disabled) {
    return (
      '<button type="button" class="si-button" data-si-action="' +
      action +
      '" ' +
      (extra || "") +
      (disabled ? " disabled" : "") +
      ">" +
      text +
      "</button>"
    );
  }
  function link(text, view) {
    return button(text, "navigate", 'data-si-view="' + view + '"');
  }
  function card(title, body, note) {
    return (
      '<section class="si-card"><h3>' +
      title +
      "</h3>" +
      (note ? '<p class="si-muted">' + note + "</p>" : "") +
      body +
      "</section>"
    );
  }
  function table(head, rows) {
    return (
      '<div class="si-table-wrap" tabindex="0" role="region" aria-label="Scrollable records"><table><thead><tr>' +
      head
        .map(function (h) {
          return '<th scope="col">' + h + "</th>";
        })
        .join("") +
      "</tr></thead><tbody>" +
      rows
        .map(function (r) {
          return (
            "<tr>" +
            r
              .map(function (c) {
                return "<td>" + c + "</td>";
              })
              .join("") +
            "</tr>"
          );
        })
        .join("") +
      "</tbody></table></div>"
    );
  }
  function badge(text) {
    return '<span class="si-badge">' + esc(text) + "</span>";
  }
  function metrics(items) {
    return (
      '<div class="si-metrics">' +
      items
        .map(function (x) {
          return (
            "<div><span>" +
            x[0] +
            "</span><strong>" +
            x[1] +
            "</strong><small>" +
            x[2] +
            "</small></div>"
          );
        })
        .join("") +
      "</div>"
    );
  }
  function sourceLink(anchor) {
    return (
      '<a href="index.html#' + anchor + '">Read the supporting research ↗</a>'
    );
  }
  function modelView() {
    return (
      '<div class="si-heading"><p class="si-eyebrow">StratXe integration hypothesis</p><h2>One strategic direction. Connected investment decisions.</h2><p>SP defines direction. APP expresses annual commitments. AOP organises departmental execution. Portfolio selects and balances change across all three.</p></div>' +
      '<figure class="si-figure"><a href="assets/stratxe-organisational-context.png" target="_blank" rel="noopener"><img src="assets/stratxe-organisational-context.png" alt="Proposed StratXe organisational model: SP, portfolio, programmes and projects supported by APP, AOP and recurring operations" width="4189" height="1636"></a><figcaption>PowerPoint concept supplied by the research author · Select to view full size.</figcaption></figure>' +
      '<div class="si-note"><strong>Connected responsibilities, not a strict parent–child hierarchy.</strong> APP and AOP inform and support portfolio decisions. A project can stand alone or belong to a programme. Daily operations remain operational work; their capacity and results are visible to portfolio management.</div>' +
      '<div class="si-two">' +
      card(
        "Planning and accountability",
        "<dl><dt>SP · five-year direction</dt><dd>SO-01 · Faster, consistent tender screening.</dd><dt>APP · annual commitments</dt><dd>APP-26-04 · Pilot adopted by three departments.</dd><dt>AOP · activities and resources</dt><dd>Departmental commitments linked to the same project.</dd></dl>",
      ) +
      card(
        "Portfolio and coordinated delivery",
        "<dl><dt>Portfolio</dt><dd>Mandate, intake, investment decisions and review.</dd><dt>Programmes and projects</dt><dd>Coordinate related change and deliver accepted capability.</dd><dt>Benefits</dt><dd>Use validated evidence to guide subsequent investment.</dd></dl>",
      ) +
      "</div>" +
      card(
        "Walk through one cross-department investment",
        '<p>Three departments identify the same tender-screening need. Reconcile their requests, compare a feasible pilot with a full rollout, record an authorised decision, and follow one project into operations.</p><div class="si-actions">' +
          link("1 · Define the mandate", "mandate") +
          link("2 · Reconcile requests", "intake") +
          link("3 · Compare and decide", "decision") +
          "</div><p>" +
          sourceLink("tender-example") +
          "</p>",
      )
    );
  }
  function mandateView() {
    return (
      card(
        "PF-SVC-01 · Service Modernisation",
        "<p>An enduring capability portfolio serving Procurement, Compliance and Business Development. The FY2026 plan is a versioned view of this portfolio, not a new portfolio identity.</p>" +
          table(
            ["Record", "Proposed content", "Decision or owner"],
            [
              [
                "Strategic plan · 4.1",
                "SO-01 · faster, consistent tender screening; SP 2026–2030, version 1",
                "Executive sponsor · Chief Operating Officer",
              ],
              [
                "Charter · 4.2",
                "Cross-department service change; BAU execution stays with departments",
                "Portfolio forum; sponsor and manager named",
              ],
              [
                "Roadmap · 4.3",
                "Q3: assess and authorise → Q4: shared pilot → Q1 2027: review benefit",
                "Version 1 · later rollout is a separate decision",
              ],
              [
                "Management plan · 5.1",
                "Three intake routes; proportionate assessment; quarterly and exception reviews",
                "PMO maintains controls and decision records",
              ],
              [
                "Definition · 5.2",
                "Candidate and existing change; one primary portfolio per pilot project",
                "Portfolio manager reconciles the inventory",
              ],
              [
                "Optimisation / authorisation / oversight · 5.3–5.5",
                "Compare scenarios; confirm delegated authority; monitor conditions and exceptions",
                "Forum recommends or authorises within delegation",
              ],
              [
                "Performance / supply and demand / value · 6.1–6.3",
                "Delivery confidence, BAU reservations, benefit forecasts and validated evidence",
                "Portfolio uses results owned by Performance",
              ],
              [
                "Communication / information · 7.1–7.2",
                "Who receives decisions, when, and with what evidence",
                "Shared records and version history",
              ],
            ],
          ) +
          '<div class="si-note">The numbers refer to PMI’s Third Edition. APP and AOP are StratXe integration inputs, not PMI process numbers.</div><div class="si-actions">' +
          link("Open shared intake", "intake") +
          sourceLink("portfolio-capabilities") +
          "</div>",
      ) +
      card(
        "Programme is a delivery choice",
        "<p>The pilot is one standalone project. If later work requires related projects with shared benefits and dependencies, establish a delivery programme. Keep budget-programme classification separate from delivery-programme membership.</p>",
      )
    );
  }
  function intakeView(s) {
    var rows = s.requests.map(function (r, i) {
      return [
        esc(r.id),
        esc(r.title),
        esc(r.origin),
        esc(r.department),
        badge(r.type),
        r.type === "BAU"
          ? "Operations backlog · outside change selection"
          : i < 3
            ? s.consolidated
              ? "Linked to INV-TS-001; origin retained"
              : "Potential overlap · tender screening"
            : "New candidate · needs separate assessment",
      ];
    });
    return (
      card(
        "One request register · three entry routes",
        "<p>Strategy, departments and portfolio management can all propose work. The same triage controls apply. Recurring work is routed to Operations.</p>" +
          table(
            [
              "Request",
              "Need",
              "Origin",
              "Accountable area",
              "Type",
              "Disposition",
            ],
            rows,
          ) +
          '<div class="si-actions">' +
          button(
            s.consolidated
              ? "Three origins retained · one investment"
              : "Reconcile the three tender-screening requests",
            "consolidate",
            "",
            s.consolidated || !!s.project,
          ) +
          link("Assess INV-TS-001", "decision") +
          "</div>",
      ) +
      card(
        "Capture a proposal",
        '<form data-si-form="request"><div class="si-form-grid"><label>Request title<input name="title" required maxlength="160" placeholder="Describe the proposed work"></label><label>Origin<select name="origin"><option>Strategy</option><option>Department / AOP</option><option>Portfolio</option></select></label><label>Accountable department or sponsor<input name="department" required maxlength="100" placeholder="Name the responsible area"></label><label>Work type<select name="type"><option>Change</option><option>BAU</option></select></label></div><button class="si-button si-primary" type="submit">Add to the register</button></form><p class="si-muted">New requests remain separate candidates. The connected pilot uses REQ-TS-01 to REQ-TS-03 only.</p>',
      )
    );
  }
  function decisionView(s) {
    var candidate = store.scenario(),
      locked = !!s.project;
    return (
      metrics([
        ["Investment", "INV-TS-001", esc(s.status)],
        [
          "Available before this decision",
          store.capacity() + " days",
          "100 gross − BAU − 10 leave/reserve − 50 committed",
        ],
        ["Scenario demand", candidate.days + " days", esc(candidate.label)],
        [
          "Funding required",
          money(candidate.cost),
          "Confirmed envelope: R180,000",
        ],
      ]) +
      card(
        "Compare a shared pilot with a full rollout",
        "<p>Choose the scope that fits the funding and specialist capacity available this period. A higher score cannot override an infeasible allocation.</p>" +
          '<form data-si-form="configure"><fieldset ' +
          (locked ? "disabled" : "") +
          '><legend>Scenario and implementation conditions</legend><div class="si-form-grid"><label>Investment scenario<select name="scenario"><option value="phased" ' +
          (s.scenario === "phased" ? "selected" : "") +
          '>Shared pilot first · 20 days · R150,000</option><option value="full" ' +
          (s.scenario === "full" ? "selected" : "") +
          '>Full rollout now · 35 days · R260,000</option></select></label><label>BAU reservation (specialist days)<input name="bau" type="number" min="0" max="100" step="1" required value="' +
          s.bau +
          '"></label></div><label class="si-check"><input name="resourceConfirmed" type="checkbox" ' +
          (s.resourceConfirmed ? "checked" : "") +
          '> Resource owners confirm the proposed departmental allocations.</label><label class="si-check"><input name="financeConfirmed" type="checkbox" ' +
          (s.financeConfirmed ? "checked" : "") +
          '> Finance confirms funding for the selected scope.</label><label class="si-check"><input name="sponsorConfirmed" type="checkbox" ' +
          (s.sponsorConfirmed ? "checked" : "") +
          '> Sponsor accepts accountability; the forum has delegated authority.</label><button type="submit" class="si-button">Save assessment and conditions</button></fieldset></form><p class="si-muted">These are role confirmations for the demonstration, not live approvals. The authorised snapshot is locked after approval.</p>',
      ) +
      card(
        "Record the investment decision",
        "<p>" +
          esc(candidate.description) +
          "</p><p>" +
          (s.consolidated
            ? "The three source requests are linked to this investment."
            : "<strong>First reconcile the overlapping requests in Shared intake.</strong>") +
          "</p>" +
          (locked
            ? '<div class="si-note">' +
              esc(s.project.id) +
              ' is the single authorised delivery record. No duplicate project is created.</div><div class="si-actions">' +
              link("Follow delivery and AOP", "delivery") +
              "</div>"
            : '<form data-si-form="decision"><label>Rationale and conditions<textarea name="rationale" rows="3" required maxlength="1200" placeholder="Explain the trade-off, approved scope or review trigger."></textarea></label><div class="si-actions"><button class="si-button si-primary" name="outcome" value="approve" type="submit">Authorise pilot</button><button class="si-button" name="outcome" value="defer" type="submit">Defer</button><button class="si-button" name="outcome" value="reject" type="submit">Reject</button></div></form>'),
      ) +
      trail(s)
    );
  }
  function trail(s) {
    return card(
      "Decision history",
      s.decisions.length
        ? table(
            ["Decision", "Action / authority", "Rationale", "Snapshot"],
            s.decisions
              .slice()
              .reverse()
              .map(function (d) {
                return [
                  esc(d.id) +
                    "<br><small>" +
                    esc(new Date(d.at).toLocaleString()) +
                    "</small>",
                  "<strong>" +
                    esc(d.action) +
                    "</strong><br>" +
                    esc(d.authority),
                  esc(d.rationale),
                  esc(d.scenario) +
                    "<br>" +
                    d.days +
                    " days · " +
                    money(d.cost),
                ];
              }),
          )
        : "<p>No decisions recorded. Assessment is not authorisation.</p>",
    );
  }
  function deliveryView(s) {
    if (!s.project)
      return card(
        "Delivery starts with an authorised investment",
        '<p>The three requests are candidates. Authorisation will create one project linked to SP, APP and departmental AOP commitments.</p><div class="si-actions">' +
          link("Review the investment decision", "decision") +
          "</div>",
      );
    var p = s.project;
    return (
      metrics([
        ["Canonical project", p.id, esc(p.status)],
        ["Primary portfolio", p.portfolio, "Service Modernisation"],
        ["Programme membership", "Standalone", "A programme is optional"],
        ["Approved pilot", money(p.budget), p.days + " specialist days"],
      ]) +
      card(
        "One project · three departmental views",
        table(
          ["Department", "AOP commitment", "Allocation", "Linked record"],
          p.allocations.map(function (a) {
            return [
              esc(a.department),
              a.department === "Procurement"
                ? "Lead pilot and accept the operational capability"
                : a.department === "Compliance"
                  ? "Define and test common screening controls"
                  : "Pilot common screening of opportunities",
              a.days + " days",
              p.id,
            ];
          }),
        ) +
          '<p>These allocations partition the approved 20 days. Portfolio totals count the project once. Routine tender reviews continue in Operations.</p><div class="si-actions">' +
          button(
            "Open Projects context",
            "module",
            'data-si-module="project"',
          ) +
          button("Open AOP context", "module", 'data-si-module="aop"') +
          "</div>",
      ) +
      card(
        "Delivery controls",
        '<div class="si-actions">' +
          button(
            "Start authorised delivery",
            "start",
            "",
            s.status !== "Authorised",
          ) +
          button(
            "Raise a dependency exception",
            "exception",
            "",
            s.status !== "In delivery" || s.exception,
          ) +
          "</div>" +
          (s.exception
            ? '<div class="si-note si-warning">A specialist dependency is delayed. Portfolio review is required; the APP target is unchanged.</div><form data-si-form="resolve"><label>Recovery decision and impact<textarea name="rationale" required maxlength="1200" placeholder="Record the recovery action and implications for annual commitments."></textarea></label><button class="si-button" type="submit">Record recovery decision</button></form>'
            : "") +
          '<form data-si-form="accept"><label class="si-check"><input type="checkbox" name="accepted" ' +
          (s.status !== "In delivery" || s.exception ? "disabled" : "") +
          '> Procurement accepts the pilot capability, support responsibility and benefit ownership.</label><button class="si-button" type="submit" ' +
          (s.status !== "In delivery" || s.exception ? "disabled" : "") +
          '>Record operational acceptance</button></form><div class="si-actions">' +
          link("Review results and benefits", "benefits") +
          "</div>",
      ) +
      trail(s)
    );
  }
  function benefitsView(s) {
    return card(
      "BEN-TS-01 · Reduce screening time",
      "<p>Benefit owner: Head of Procurement. The demonstration baseline is 10 days; the target is 5 days. Official indicator results remain under the existing performance owner.</p>" +
        metrics([
          ["Baseline", "10 days", "Illustrative starting point"],
          ["Target", "5 days", "Unchanged by project status"],
          [
            "Validated demo result",
            s.result ? esc(s.result.days) + " days" : "Not recorded",
            s.result
              ? s.result.days <= 5
                ? "Target met"
                : "Target not yet met"
              : "Evidence required",
          ],
          [
            "Capability",
            esc(s.status),
            "Delivery completion is not outcome achievement",
          ],
        ]) +
        '<form data-si-form="result"><fieldset ' +
        (s.status !== "Accepted" ? "disabled" : "") +
        '><legend>Record the post-delivery review</legend><div class="si-form-grid"><label>Measured average screening time (days)<input type="number" name="days" min="0.1" max="365" step="0.1" required value="' +
        (s.result ? s.result.days : "") +
        '"></label><label>Evidence reference and measurement period<input name="evidence" required maxlength="400" value="' +
        esc(s.result ? s.result.evidence : "") +
        '" placeholder="e.g. Pilot review, Jan 2027, sample of 30 cases"></label></div><label class="si-check"><input name="validated" type="checkbox"> Performance owner has validated the demonstration result.</label><button type="submit" class="si-button si-primary">Save validated demo result</button></fieldset></form>' +
        (s.status !== "Accepted"
          ? '<p class="si-muted">Operational acceptance is required before this post-delivery review.</p>'
          : "") +
        (s.result
          ? '<div class="si-note"><strong>' +
            (s.result.days <= 5
              ? "Maintain the control and review sustained performance."
              : "Review the remaining benefit gap before further investment.") +
            "</strong><p>Evidence: " +
            esc(s.result.evidence) +
            ". Portfolio can recommend an operational adjustment or further change; it cannot silently revise the target.</p></div>"
          : "") +
        '<div class="si-actions">' +
        button(
          "Open Performance context",
          "module",
          'data-si-module="performance"',
        ) +
        link("Return to portfolio decision", "decision") +
        "</div>",
    );
  }
  function interfacesView() {
    return (
      card(
        "The integration contract",
        table(
          ["Module / owner", "Supplies", "Receives"],
          [
            [
              "SP",
              "Outcome ID, strategy version and direction",
              "Coverage, contribution and feasibility feedback",
            ],
            [
              "APP",
              "Target ID, period, approved commitments and changes",
              "Delivery confidence; proposed changes for planning approval",
            ],
            [
              "Structure",
              "Department and accountable role IDs",
              "Cross-department participation without changing line ownership",
            ],
            [
              "Operations / AOP",
              "Requests, BAU reservations and confirmed resources",
              "Authorised work and departmental allocation lines",
            ],
            [
              "Programmes / Projects",
              "Forecasts, dependencies, risks and handover evidence",
              "Authorised scope, funding and conditions",
            ],
            [
              "Performance",
              "Validated results, evidence and measurement period",
              "Benefit contribution links and review needs",
            ],
            [
              "Finance / resource authorities",
              "Funding, actuals and confirmed availability",
              "Proposed allocations and changes for confirmation",
            ],
          ],
        ) +
          '<div class="si-note">One canonical project; multiple views. Keep portfolio identity separate from annual plans. Version strategy links, decisions and funding commitments. Do not duplicate spend when rolling project totals into programmes and portfolios.</div><p>' +
          sourceLink("integration-contract") +
          "</p>",
      ) +
      card(
        "What the research changes",
        table(
          ["Evidence", "Application here"],
          [
            [
              "Boles’ Enterprise Management Framework (2009)",
              "Map responsibilities onto existing modules; no mandatory new menu hierarchy.",
            ],
            [
              "South African DPME guidance",
              "Keep SP / APP / AOP ownership; distinguish budget and delivery programmes.",
            ],
            [
              "UK GovS 002 v2.1",
              "Integrate business planning, portfolio decisions, BAU constraints and value review.",
            ],
            [
              "Microsoft CSS and United Illuminating cases",
              "Shared governance can coexist with departmental delivery; introduce it incrementally.",
            ],
          ],
        ) +
          "<p>" +
          sourceLink("sector-evidence") +
          "</p>",
      ) +
      card(
        "Implementation sequence",
        "<ol><li>Confirm mandates, decision authority and source records.</li><li>Pilot the shared portfolio register and three-route intake.</li><li>Connect authorisation to one delivery record and confirmed allocations.</li><li>Return delivery and validated performance evidence for review.</li><li>Add deeper scenarios and annual rollover after the basic links work.</li></ol><p>Production APIs, permissions, durable audit records and financial reconciliation require implementation and validation with the StratXe team.</p>",
      )
    );
  }
  function render(view) {
    var s = store.get();
    var content = {
      model: modelView,
      mandate: mandateView,
      intake: intakeView,
      decision: decisionView,
      delivery: deliveryView,
      benefits: benefitsView,
      interfaces: interfacesView,
    };
    return (
      '<div class="si-root"><div class="si-demo"><span><strong>Connected demonstration</strong> · Illustrative records · ' +
      (storageAvailable
        ? "Saved in this browser only"
        : "Session only; browser storage unavailable") +
      ' · No live StratXe connection</span><a href="index.html">Research ↗</a>' +
      button("Reset demo", "reset-prompt") +
      '</div><div id="si-feedback" role="status" aria-live="polite" tabindex="-1" class="si-feedback ' +
      (error ? "si-error" : "") +
      '" ' +
      (!message ? "hidden" : "") +
      ">" +
      esc(message) +
      '</div><div class="si-step-label">' +
      esc(viewNames[view] || viewNames.model) +
      "</div>" +
      (content[view] || modelView)(s) +
      "</div>"
    );
  }
  function open(view) {
    if (window.showModule) window.showModule("portfolio");
    window.ppmis.go("integration", view || "model");
  }
  function persist() {
    try {
      localStorage.setItem(key, JSON.stringify(store.get()));
    } catch (_) {
      storageAvailable = false;
    }
  }
  function refresh() {
    if (window.ppmis.refresh) window.ppmis.refresh();
    updateContexts();
  }
  function act(action, data) {
    try {
      store.dispatch(action, data);
      persist();
      error = false;
      message =
        {
          request: "Request added; its origin and classification are retained.",
          configure: "Assessment and implementation conditions saved.",
          consolidate:
            "Three source requests now reference one investment. No source request was deleted.",
          approve:
            "Pilot authorised. PRJ-TS-001 is available in Projects and departmental AOP contexts.",
          result:
            "Validated demonstration result saved; the target is unchanged.",
          reset: "Demonstration reset to its initial candidates.",
        }[action] || "Demonstration record updated.";
    } catch (e) {
      error = true;
      message = e.message;
    }
    if (error) {
      var feedback = document.getElementById("si-feedback");
      if (feedback) {
        feedback.hidden = false;
        feedback.className = "si-feedback si-error";
        feedback.textContent = message;
        feedback.focus();
      }
    } else {
      refresh();
      var f = document.getElementById("si-feedback");
      if (f) f.focus();
    }
  }
  function context(module) {
    var s = store.get(),
      p = s.project;
    var info = {
      sp: [
        "SO-01 · SP 2026–2030",
        "Faster, consistent tender screening. Portfolio mandate PF-SVC-01 links to this outcome; project progress does not replace the outcome measure.",
        "mandate",
      ],
      app: [
        "APP-26-04 · annual commitment",
        "Pilot adopted by three departments. Portfolio review informs execution; changing this commitment still requires planning approval.",
        "decision",
      ],
      aop: [
        "Departmental commitments · one shared project",
        p
          ? p.id +
            " · Procurement 10 days, Compliance 5 days, Business Development 5 days. Each department references the same delivery record."
          : "The tender-screening proposal is awaiting investment authorisation. No project allocation is committed yet.",
        "delivery",
      ],
      project: [
        p ? p.id + " · " + p.title : "Tender-screening delivery link",
        p
          ? p.status +
            " · " +
            money(p.budget) +
            " · 20 specialist days · standalone project in PF-SVC-01."
          : "A delivery record appears here once INV-TS-001 is authorised. Candidate requests remain in Portfolio.",
        "delivery",
      ],
      program: [
        "Programme coordination is optional",
        "The tender-screening pilot is a standalone project. Create a delivery programme only when related projects require joint benefit and dependency management. Budget programmes remain a separate classification.",
        "mandate",
      ],
      performance: [
        "BEN-TS-01 · screening time",
        s.result
          ? "Validated demo result: " +
            s.result.days +
            " days. Baseline 10 days; target 5 days. Evidence: " +
            s.result.evidence
          : "No validated pilot result recorded. Baseline 10 days; target 5 days. Delivery completion alone does not establish benefit achievement.",
        "benefits",
      ],
      structure: [
        "Shared ownership links",
        "One sponsor and project lead; three contributing departments. Portfolio membership does not change reporting lines.",
        "interfaces",
      ],
      portfolio: [
        p ? p.id + " · connected pilot" : "INV-TS-001 · connected pilot",
        "Status: " +
          s.status +
          ". This record is shared with planning, departmental execution and delivery contexts.",
        "decision",
      ],
    }[module] || [
      "Connected investment",
      "Review the integration contract.",
      "interfaces",
    ];
    return (
      '<div class="si-root si-context"><div><span class="si-eyebrow">Connected tender-screening example</span><h3>' +
      esc(info[0]) +
      "</h3><p>" +
      esc(info[1]) +
      "</p><small>Illustrative browser demonstration; existing workspace records below remain separate examples.</small></div>" +
      link("Open connected record →", info[2]) +
      "</div>"
    );
  }
  function updateContexts() {
    [
      "sp",
      "app",
      "aop",
      "project",
      "program",
      "performance",
      "structure",
    ].forEach(function (id) {
      var panel = document.getElementById(id + "Module");
      if (!panel) return;
      var host = document.getElementById("si-context-" + id);
      if (!host) {
        host = document.createElement("div");
        host.id = "si-context-" + id;
        panel.insertBefore(host, panel.firstChild);
      }
      host.innerHTML = context(id);
    });
  }
  document.addEventListener("click", function (event) {
    var target = event.target.closest("[data-si-action]");
    if (!target) return;
    var action = target.dataset.siAction;
    if (action === "navigate") {
      message = "";
      open(target.dataset.siView);
    } else if (action === "module") window.showModule(target.dataset.siModule);
    else if (action === "reset-prompt") {
      var d = document.getElementById("si-reset-dialog");
      if (!d) {
        d = document.createElement("dialog");
        d.id = "si-reset-dialog";
        d.className = "si-root si-reset-dialog";
        d.innerHTML =
          '<h2>Reset this demonstration?</h2><p>This removes only the tender-screening demo requests, decisions and results saved in this browser. The other prototype workspaces are unaffected.</p><div class="si-actions">' +
          button("Keep my demo", "reset-cancel") +
          button("Reset demonstration", "reset-confirm") +
          "</div>";
        document.body.appendChild(d);
      }
      d.showModal();
    } else if (action === "reset-cancel")
      document.getElementById("si-reset-dialog").close();
    else if (action === "reset-confirm") {
      document.getElementById("si-reset-dialog").close();
      act("reset");
    } else act(action);
  });
  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form.dataset.siForm) return;
    event.preventDefault();
    var data = {};
    new FormData(form).forEach(function (v, k) {
      data[k] = v;
    });
    var action = form.dataset.siForm;
    if (action === "decision")
      action = event.submitter ? event.submitter.value : "approve";
    act(action, data);
  });
  window.stratxeIntegration = { render: render, context: context, open: open };
  function boot() {
    updateContexts();
    if (location.hash === "#integration") open("model");
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
