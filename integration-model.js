(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.StratxeIntegrationModel = factory();
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';
  function initial() {
    return { version: 1, consolidated: false, status: 'Candidate', scenario: 'phased', bau: 20,
      resourceConfirmed: false, financeConfirmed: false, sponsorConfirmed: false,
      requests: [
        { id: 'REQ-TS-01', title: 'Common tender-screening workflow', origin: 'Department / AOP', department: 'Procurement', type: 'Change' },
        { id: 'REQ-TS-02', title: 'Tender eligibility and compliance checks', origin: 'Department / AOP', department: 'Compliance', type: 'Change' },
        { id: 'REQ-TS-03', title: 'Shared tender opportunity screening', origin: 'Department / AOP', department: 'Business Development', type: 'Change' }
      ], decisions: [], project: null, result: null, exception: false };
  }
  var scenarios = {
    phased: { label: 'Shared pilot first', days: 20, cost: 150000, delivery: 'Q4 2026 pilot', description: 'One common screening workflow, piloted across three departments. Later expansion needs a new decision.' },
    full: { label: 'Full rollout now', days: 35, cost: 260000, delivery: 'Q4 2026 full rollout', description: 'Exceeds the current specialist and funding envelopes; do not authorise without a revised plan.' }
  };
  function createStore(saved) {
    var s = initial();
    if (saved && saved.version === 1 && Array.isArray(saved.requests) && Array.isArray(saved.decisions) && scenarios[saved.scenario] && Number.isFinite(saved.bau) && saved.bau >= 0 && saved.bau <= 100 && ['Candidate','Deferred','Rejected','Authorised','In delivery','Paused','Accepted'].indexOf(saved.status) !== -1) {
      s = JSON.parse(JSON.stringify(saved));
    }
    function log(action, rationale, authority) {
      s.decisions.push({ id: 'DEC-TS-' + String(s.decisions.length + 1).padStart(3, '0'), at: new Date().toISOString(), action: action, rationale: rationale, authority: authority, scenario: scenarios[s.scenario].label, days: scenarios[s.scenario].days, cost: scenarios[s.scenario].cost });
    }
    function reason(value) { if (!value || !value.trim()) throw new Error('Record a rationale before making this decision.'); return value.trim(); }
    function pending() { if (s.project) throw new Error('This investment already has an authorised delivery record. Review the existing project.'); }
    return {
      get: function () { return JSON.parse(JSON.stringify(s)); },
      capacity: function () { return 100 - s.bau - 10 - 50; },
      scenario: function () { return scenarios[s.scenario]; },
      dispatch: function (action, data) {
        data = data || {};
        if (action === 'reset') { s = initial(); return this.get(); }
        if (action === 'request') {
          if (!data.title || !data.title.trim() || !data.department || !data.department.trim()) throw new Error('Enter a request title and an accountable department or sponsor.');
          if (['Strategy','Department / AOP','Portfolio'].indexOf(data.origin) < 0 || ['Change','BAU'].indexOf(data.type) < 0) throw new Error('Choose a valid origin and work type.');
          s.requests.push({ id: 'REQ-TS-' + String(s.requests.length + 1).padStart(2, '0'), title: data.title.trim(), department: data.department.trim(), origin: data.origin, type: data.type });
        } else if (action === 'consolidate') {
          pending(); s.consolidated = true;
        } else if (action === 'configure') {
          pending();
          if (!scenarios[data.scenario]) throw new Error('Select an available investment scenario.');
          var bau = Number(data.bau);
          if (!Number.isFinite(bau) || bau < 0 || bau > 100) throw new Error('BAU must be between 0 and 100 specialist days.');
          s.scenario = data.scenario; s.bau = bau;
          s.resourceConfirmed = !!data.resourceConfirmed; s.financeConfirmed = !!data.financeConfirmed; s.sponsorConfirmed = !!data.sponsorConfirmed;
        } else if (action === 'approve') {
          pending(); var why = reason(data.rationale); var scenario = scenarios[s.scenario];
          if (!s.consolidated) throw new Error('Reconcile the three overlapping requests in Intake first.');
          if (this.capacity() < scenario.days) throw new Error('Insufficient specialist capacity. Select a feasible scenario or revise the BAU reservation.');
          if (scenario.cost > 180000) throw new Error('This scenario exceeds the R180,000 funding envelope.');
          if (!s.resourceConfirmed || !s.financeConfirmed || !s.sponsorConfirmed) throw new Error('Confirm sponsor ownership, departmental allocations and funding before authorising implementation.');
          s.status = 'Authorised';
          s.project = { id: 'PRJ-TS-001', title: 'Shared tender-screening pilot', portfolio: 'PF-SVC-01', programme: null, status: 'Authorised', days: scenario.days, budget: scenario.cost, allocations: [{ department: 'Procurement', days: 10 }, { department: 'Compliance', days: 5 }, { department: 'Business Development', days: 5 }] };
          log('Authorise pilot', why, 'Portfolio forum · within delegated ceiling');
        } else if (action === 'defer' || action === 'reject') {
          pending(); var rationale = reason(data.rationale);
          s.status = action === 'defer' ? 'Deferred' : 'Rejected';
          log(s.status, rationale, 'Portfolio forum');
        } else if (action === 'start') {
          if (!s.project || s.status !== 'Authorised') throw new Error('An authorised project is required before delivery can start.');
          s.status = s.project.status = 'In delivery'; log('Start delivery', 'Funding and resource conditions confirmed; approved scope only.', 'Project lead');
        } else if (action === 'exception') {
          if (s.status !== 'In delivery') throw new Error('Start delivery before raising an exception.');
          s.exception = true; log('Escalate delivery exception', 'Specialist dependency is delayed; assess the APP commitment before any target change.', 'Project lead');
        } else if (action === 'resolve') {
          if (!s.exception) throw new Error('There is no open exception to review.');
          log('Continue with recovery action', reason(data.rationale), 'Portfolio forum'); s.exception = false;
        } else if (action === 'accept') {
          if (s.status !== 'In delivery' || s.exception) throw new Error('Delivery must be in progress with its exception resolved before operational acceptance.');
          if (!data.accepted) throw new Error('Confirm operational acceptance of the pilot.');
          s.status = 'Accepted'; s.project.status = 'Completed'; log('Operational acceptance', 'Procurement accepts the pilot capability and owns the benefit review.', 'Operational owner · Procurement');
        } else if (action === 'result') {
          if (s.status !== 'Accepted') throw new Error('Complete operational acceptance before recording the post-delivery result.');
          var days = Number(data.days);
          if (data.days === '' || !Number.isFinite(days) || days <= 0 || days > 365) throw new Error('Enter a measured average between 0 and 365 days.');
          if (!data.evidence || !data.evidence.trim() || !data.validated) throw new Error('Provide an evidence reference and confirm validation by the performance owner.');
          s.result = { days: days, evidence: data.evidence.trim(), at: new Date().toISOString(), owner: 'Head of Procurement', target: 5, baseline: 10 };
          log('Record validated demo result', data.evidence.trim(), 'Performance owner · Procurement');
        } else throw new Error('Unknown integration action.');
        return this.get();
      }
    };
  }
  return { createStore: createStore, initial: initial, scenarios: scenarios };
});
