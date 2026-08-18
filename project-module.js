(function(){
  'use strict';

  var root;
  var S={area:'overview',view:'summary',project:'PRJ-0148',selectedRisk:'RSK-121',selectedDeliverable:'DEL-014',toast:''};

  var projects=[
    {id:'PRJ-0148',name:'Digital Service Release 2',code:'DSR2',programme:'Service Access Programme',portfolio:'Service Modernisation',pm:'Aisha Morgan',sponsor:'Chief Service Officer',stage:'Execution',start:'May 2026',end:'Feb 2027',budget:'R126m',spent:'R78m',pct:62,schedule:'Amber',cost:'Green',benefit:'On track',method:'Hybrid (Agile within stage-gated envelope)',description:'Second release of the digital service platform: self-service refresh, digital forms and a notification centre. Delivered through 8 two-week iterations inside a stage-gated envelope.'},
    {id:'PRJ-0161',name:'Identity Platform Renewal',code:'IDR',programme:'Digital Foundations Programme',portfolio:'Operational Resilience',pm:'Thabo Nkosi',sponsor:'Chief Information Officer',stage:'Mobilisation',start:'Jun 2026',end:'Nov 2027',budget:'R142m',spent:'R18m',pct:12,schedule:'Green',cost:'Green',benefit:'On track',method:'Stage-gated (PRINCE2-aligned)',description:'Replaces the shared identity platform underpinning customer-facing services. Six-stage delivery with an architecture gate at Gate 2.'},
    {id:'PRJ-0127',name:'Case Data Remediation',code:'CDR',programme:'Information Quality Programme',portfolio:'Data & Insight',pm:'Amina Patel',sponsor:'Chief Data Officer',stage:'Execution',start:'Feb 2026',end:'Nov 2026',budget:'R54m',spent:'R41m',pct:76,schedule:'Red',cost:'Amber',benefit:'At risk',method:'Waterfall',description:'Remediates historical case data quality and enforces validation controls at capture. Currently 31 days behind plan; recovery decision at Executive Committee.'},
    {id:'PRJ-0156',name:'Service Design Academy',code:'SDA',programme:'Service Access Programme',portfolio:'Workforce Capability',pm:'Peter Mokoena',sponsor:'Chief People Officer',stage:'Execution',start:'Feb 2026',end:'Dec 2026',budget:'R19m',spent:'R8m',pct:47,schedule:'Green',cost:'Green',benefit:'On track',method:'Cohort-based programme delivery',description:'Builds an internal cadre of accredited service designers through five cohorts, each accredited on defined outcomes.'}
  ];

  var wbs=[
    {code:'1',name:'Project management',owner:'A. Morgan',start:'01 May 26',finish:'26 Feb 27',effort:'820h',status:'In progress'},
    {code:'1.1',name:'Governance & reporting',owner:'A. Morgan',start:'01 May 26',finish:'26 Feb 27',effort:'320h',status:'In progress'},
    {code:'1.2',name:'Risk & assurance',owner:'M. Sithole',start:'01 May 26',finish:'26 Feb 27',effort:'220h',status:'In progress'},
    {code:'2',name:'Discovery & design',owner:'C. Els',start:'12 May 26',finish:'30 Aug 26',effort:'1,240h',status:'Complete'},
    {code:'2.1',name:'Journey mapping',owner:'C. Els',start:'12 May 26',finish:'12 Jun 26',effort:'340h',status:'Complete'},
    {code:'2.2',name:'Service blueprint',owner:'C. Els',start:'15 Jun 26',finish:'30 Jul 26',effort:'420h',status:'Complete'},
    {code:'2.3',name:'Access flow design',owner:'C. Els',start:'01 Aug 26',finish:'22 Aug 26',effort:'480h',status:'Rework'},
    {code:'3',name:'Platform build',owner:'D. van Wyk',start:'15 Jul 26',finish:'30 Nov 26',effort:'3,860h',status:'In progress'},
    {code:'3.1',name:'Self-service refresh',owner:'D. van Wyk',start:'15 Jul 26',finish:'30 Oct 26',effort:'1,720h',status:'In progress'},
    {code:'3.2',name:'Digital forms engine',owner:'H. Adams',start:'01 Aug 26',finish:'15 Nov 26',effort:'1,180h',status:'In progress'},
    {code:'3.3',name:'Notification centre',owner:'J. Modise',start:'01 Sep 26',finish:'30 Nov 26',effort:'960h',status:'In progress'},
    {code:'4',name:'Integration',owner:'R. Botha',start:'01 Sep 26',finish:'15 Dec 26',effort:'980h',status:'Not started'},
    {code:'5',name:'Test & release',owner:'K. Naidu',start:'15 Nov 26',finish:'28 Feb 27',effort:'1,340h',status:'Not started'},
    {code:'5.1',name:'System testing',owner:'K. Naidu',start:'15 Nov 26',finish:'15 Jan 27',effort:'560h',status:'Not started'},
    {code:'5.2',name:'User acceptance',owner:'S. Radebe',start:'20 Jan 27',finish:'20 Feb 27',effort:'440h',status:'Not started'},
    {code:'5.3',name:'Cutover',owner:'K. Naidu',start:'22 Feb 27',finish:'28 Feb 27',effort:'340h',status:'Not started'}
  ];

  var milestones=[
    {name:'Design authority sign-off',planned:'22 Aug 26',forecast:'22 Aug 26',status:'Amber',type:'Design',owner:'C. Els'},
    {name:'Baseline approval',planned:'30 Sep 26',forecast:'30 Sep 26',status:'Green',type:'Governance',owner:'A. Morgan'},
    {name:'Integration handover',planned:'15 Dec 26',forecast:'20 Dec 26',status:'Amber',type:'Delivery',owner:'R. Botha'},
    {name:'UAT complete',planned:'20 Feb 27',forecast:'20 Feb 27',status:'Green',type:'Delivery',owner:'S. Radebe'},
    {name:'Go-live',planned:'28 Feb 27',forecast:'28 Feb 27',status:'Green',type:'Release',owner:'K. Naidu'}
  ];

  var team=[
    {name:'Aisha Morgan',role:'Project Manager',capacity:'100%',start:'May 26',end:'Feb 27',rate:'internal',status:'Confirmed'},
    {name:'Michelle Sithole',role:'Assurance & PMO',capacity:'50%',start:'May 26',end:'Feb 27',rate:'internal',status:'Confirmed'},
    {name:'Christoph Els',role:'Service Design Lead',capacity:'80%',start:'May 26',end:'Sep 26',rate:'internal',status:'Confirmed'},
    {name:'Devon van Wyk',role:'Solution Architect',capacity:'60%',start:'Jun 26',end:'Feb 27',rate:'internal',status:'Confirmed'},
    {name:'Hannah Adams',role:'Full-stack Lead',capacity:'100%',start:'Jul 26',end:'Feb 27',rate:'external · Contoso',status:'Confirmed'},
    {name:'John Modise',role:'Full-stack Engineer',capacity:'100%',start:'Aug 26',end:'Feb 27',rate:'external · Contoso',status:'Confirmed'},
    {name:'Rui Botha',role:'Integration Lead',capacity:'80%',start:'Sep 26',end:'Feb 27',rate:'internal',status:'Requested'},
    {name:'Kavi Naidu',role:'Test Manager',capacity:'80%',start:'Nov 26',end:'Feb 27',rate:'internal',status:'Confirmed'},
    {name:'Sifiso Radebe',role:'UAT Lead',capacity:'50%',start:'Jan 27',end:'Feb 27',rate:'business',status:'Pending'},
    {name:'Nomsa Zulu',role:'Change & Adoption',capacity:'60%',start:'Nov 26',end:'Mar 27',rate:'internal',status:'Confirmed'},
    {name:'External · Contoso',role:'Delivery partner',capacity:'2 pods',start:'Jul 26',end:'Feb 27',rate:'R6.4m',status:'Contracted'},
    {name:'External · Accenture',role:'Assurance partner',capacity:'0.4 FTE',start:'Sep 26',end:'Feb 27',rate:'R1.9m',status:'Contracted'}
  ];

  var raid={
    risks:[
      {id:'RSK-121',title:'Access flow rework may push design authority a second time',likelihood:'Medium',impact:'Medium',score:9,owner:'C. Els',response:'Two design walk-throughs booked with security before submission.',status:'Mitigating',opened:'11 Aug'},
      {id:'RSK-124',title:'External developer availability dips in Dec 26',likelihood:'Medium',impact:'High',score:12,owner:'A. Morgan',response:'Ring-fence Contoso pod through contract clause; internal backfill identified.',status:'Open',opened:'02 Aug'},
      {id:'RSK-127',title:'UAT scenarios not yet agreed with business',likelihood:'High',impact:'Medium',score:12,owner:'S. Radebe',response:'UAT workshop scheduled 10 Sep; scenarios frozen 30 Sep.',status:'Open',opened:'09 Aug'},
      {id:'RSK-131',title:'Notification volume may exceed capacity of shared queue',likelihood:'Low',impact:'High',score:8,owner:'D. van Wyk',response:'Load model complete · scale test in October cycle.',status:'Monitoring',opened:'05 Aug'}
    ],
    actions:[
      {id:'ACT-208',title:'Rework access flow with security review',owner:'C. Els',due:'21 Aug',status:'In progress',age:4},
      {id:'ACT-211',title:'Confirm Rui Botha allocation with resource manager',owner:'A. Morgan',due:'19 Aug',status:'Blocked',age:8},
      {id:'ACT-215',title:'Book UAT scenario workshop',owner:'S. Radebe',due:'20 Aug',status:'Open',age:2},
      {id:'ACT-218',title:'Schedule design authority resubmission',owner:'A. Morgan',due:'22 Aug',status:'Open',age:3},
      {id:'ACT-220',title:'Prepare Programme Board pack',owner:'M. Sithole',due:'20 Aug',status:'In progress',age:5}
    ],
    issues:[
      {id:'ISS-092',title:'Design authority declined proposed access flow',owner:'C. Els',opened:'14 Aug',severity:'Medium',status:'Rework',age:4},
      {id:'ISS-094',title:'Environment refresh took an extra 3 days',owner:'D. van Wyk',opened:'08 Aug',severity:'Low',status:'Closed',age:10},
      {id:'ISS-097',title:'Contoso onboarding checklist missed two items',owner:'A. Morgan',opened:'11 Aug',severity:'Low',status:'Closed',age:7}
    ],
    decisions:[
      {id:'DEC-018',date:'12 Aug 26',decision:'Adopt notification centre pattern from ID platform',authority:'Design authority',rationale:'Removes duplicate build; reuses proven pattern.'},
      {id:'DEC-019',date:'05 Aug 26',decision:'Deliver access flow refresh in a two-week iteration ahead of build',authority:'Project Manager',rationale:'De-risks the design authority decision and unblocks build sooner.'},
      {id:'DEC-020',date:'26 Jul 26',decision:'Contoso two-pod pattern',authority:'Sponsor',rationale:'Best fit for hybrid delivery in the tranche window.'},
      {id:'DEC-021',date:'14 Jul 26',decision:'UAT will be run in three iterations, not one',authority:'Project Manager',rationale:'Reduces business capacity impact and shortens defect closure loop.'},
      {id:'DEC-022',date:'02 Jul 26',decision:'Deploy notification centre to dedicated queue',authority:'Design authority',rationale:'Isolates load from shared platform.'}
    ]
  };

  var deliverables=[
    {id:'DEL-011',name:'Service blueprint · Digital access',accept:'C. Els',by:'Business Design',status:'Accepted',accepted:'30 Jul 26'},
    {id:'DEL-012',name:'Reference architecture',accept:'D. van Wyk',by:'Architecture Council',status:'Accepted',accepted:'12 Aug 26'},
    {id:'DEL-013',name:'Access flow design (v2)',accept:'C. Els',by:'Design Authority',status:'Rework',accepted:'—'},
    {id:'DEL-014',name:'Self-service module (build 3)',accept:'D. van Wyk',by:'Product Owner',status:'In review',accepted:'—'},
    {id:'DEL-015',name:'Digital forms engine',accept:'H. Adams',by:'Product Owner',status:'In progress',accepted:'—'},
    {id:'DEL-016',name:'Notification centre',accept:'J. Modise',by:'Product Owner',status:'In progress',accepted:'—'},
    {id:'DEL-017',name:'Integration API v2',accept:'R. Botha',by:'Integration authority',status:'Not started',accepted:'—'},
    {id:'DEL-018',name:'System test report',accept:'K. Naidu',by:'Test lead',status:'Not started',accepted:'—'},
    {id:'DEL-019',name:'UAT sign-off pack',accept:'S. Radebe',by:'Business',status:'Not started',accepted:'—'},
    {id:'DEL-020',name:'Cutover & rollback plan',accept:'K. Naidu',by:'Change board',status:'Not started',accepted:'—'}
  ];

  var statusReports=[
    {id:'STA-014',period:'12 Aug 26 – 18 Aug 26',schedule:'Amber',cost:'Green',scope:'Green',issued:'—',status:'In draft'},
    {id:'STA-013',period:'29 Jul 26 – 11 Aug 26',schedule:'Amber',cost:'Green',scope:'Green',issued:'12 Aug 26',status:'Issued'},
    {id:'STA-012',period:'15 Jul 26 – 28 Jul 26',schedule:'Green',cost:'Green',scope:'Green',issued:'29 Jul 26',status:'Issued'},
    {id:'STA-011',period:'01 Jul 26 – 14 Jul 26',schedule:'Green',cost:'Green',scope:'Green',issued:'15 Jul 26',status:'Issued'},
    {id:'STA-010',period:'17 Jun 26 – 30 Jun 26',schedule:'Green',cost:'Green',scope:'Green',issued:'01 Jul 26',status:'Issued'}
  ];

  var documents=[
    {name:'Project charter · DSR2',type:'Charter',version:'v1.2',owner:'A. Morgan',updated:'05 May 26'},
    {name:'Business case · DSR2',type:'Business case',version:'v3.1',owner:'Portfolio Office',updated:'12 Apr 26'},
    {name:'Delivery plan',type:'Plan',version:'v2.4',owner:'A. Morgan',updated:'14 Aug 26'},
    {name:'RACI matrix',type:'Governance',version:'v1.0',owner:'M. Sithole',updated:'02 Jun 26'},
    {name:'Solution architecture',type:'Architecture',version:'v2.0',owner:'D. van Wyk',updated:'12 Aug 26'},
    {name:'Access flow (v2)',type:'Design',version:'v0.9',owner:'C. Els',updated:'14 Aug 26'},
    {name:'Risk register',type:'RAID',version:'live',owner:'M. Sithole',updated:'14 Aug 26'},
    {name:'Test strategy',type:'Test',version:'v1.0',owner:'K. Naidu',updated:'25 Jul 26'},
    {name:'Change control log',type:'Change',version:'live',owner:'M. Sithole',updated:'12 Aug 26'},
    {name:'Cutover plan',type:'Release',version:'v0.4',owner:'K. Naidu',updated:'01 Aug 26'},
    {name:'Communications plan',type:'Change',version:'v1.1',owner:'N. Zulu',updated:'20 Jul 26'}
  ];

  var areas=[
    {id:'overview',label:'Overview'},
    {id:'plan',label:'Plan'},
    {id:'team',label:'Team'},
    {id:'financials',label:'Financials'},
    {id:'raid',label:'RAID'},
    {id:'deliverables',label:'Deliverables'},
    {id:'status',label:'Status reports'},
    {id:'documents',label:'Documents'}
  ];
  var views={
    overview:[['summary','Summary'],['health','Health'],['charter','Charter']],
    plan:[['schedule','Schedule'],['wbs','Work breakdown'],['milestones','Milestones']],
    team:[['roster','Team roster'],['allocations','Allocations'],['ramp','Ramp plan']],
    financials:[['summary','Financial summary'],['budget','Budget & actuals'],['forecast','Forecast & EAC']],
    raid:[['risks','Risks'],['actions','Actions'],['issues','Issues'],['decisions','Decisions']],
    deliverables:[['list','Deliverables list'],['acceptance','Acceptance evidence']],
    status:[['reports','Reports'],['trend','Trend']],
    documents:[['library','Library'],['history','Version history']]
  };

  function esc(v){return String(v==null?'':v).replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c];});}
  function rag(v){var c=v==='Green'||v==='On track'?'g':v==='Red'||v==='At risk'?'r':v==='Amber'?'a':'n';return '<span class="sx-rag '+c+'"><i>●</i>'+esc(v)+'</span>';}
  function chip(v,c){return '<span class="sx-chip '+(c||'')+'">'+esc(v)+'</span>';}
  function card(title,body,sub,cls){return '<section class="sx-card '+(cls||'')+'"><div class="sx-cardh"><h3>'+title+'</h3>'+(sub?'<span class="sub">'+sub+'</span>':'')+'</div><div class="sx-cardb">'+body+'</div></section>';}
  function kpi(label,value,note,tone){return '<div class="sx-kpi '+(tone||'')+'"><span class="k">'+label+'</span><b>'+value+'</b><span class="n">'+note+'</span></div>';}
  function currentProject(){return projects.filter(function(p){return p.id===S.project;})[0]||projects[0];}
  function projectOptions(){return projects.map(function(p){return '<option value="'+p.id+'"'+(S.project===p.id?' selected':'')+'>'+esc(p.name)+' · '+esc(p.programme)+'</option>';}).join('');}
  function donut(segments,w){w=w||140;var c=w/2,r=w/2-8,total=segments.reduce(function(s,x){return s+x[1];},0)||1;var offset=-Math.PI/2;var svg='<svg viewBox="0 0 '+w+' '+w+'" width="'+w+'" height="'+w+'">';segments.forEach(function(seg){var f=seg[1]/total,a=f*Math.PI*2;var x1=c+r*Math.cos(offset),y1=c+r*Math.sin(offset),x2=c+r*Math.cos(offset+a),y2=c+r*Math.sin(offset+a);var big=a>Math.PI?1:0;svg+='<path d="M '+c+' '+c+' L '+x1+' '+y1+' A '+r+' '+r+' 0 '+big+' 1 '+x2+' '+y2+' Z" fill="'+seg[2]+'"/>';offset+=a;});svg+='<circle cx="'+c+'" cy="'+c+'" r="'+(r*0.6)+'" fill="#fff"/><text x="'+c+'" y="'+(c-2)+'" font-size="18" font-weight="800" fill="#0d315c" text-anchor="middle">'+total+'</text><text x="'+c+'" y="'+(c+14)+'" font-size="10" fill="#8a96a8" text-anchor="middle">total</text></svg>';return svg;}
  function legend(items){return '<div class="sx-actions wrap" style="gap:6px 10px;margin-top:8px">'+items.map(function(it){return '<span class="sx-chip" style="background:'+it[1]+'22;color:'+it[1]+';border-color:'+it[1]+'55"><i style="background:'+it[1]+';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px"></i>'+esc(it[0])+' <b style="margin-left:5px">'+it[2]+'</b></span>';}).join('')+'</div>';}

  function render(){
    if(!root)return;
    var h=moduleHeader()+'<div class="sx-shell">'+renderAreas()+'<div class="sx-main">'+renderSubnav()+'<main class="sx-body">'+contextBar()+renderView()+'</main></div></div>';
    if(S.toast)h+='<div class="ppmis-toast" role="status">'+esc(S.toast)+'</div>';
    root.className='sxpf-root';root.innerHTML=h;
  }
  function moduleHeader(){var p=currentProject();return '<div class="px-modhead"><div class="px-mh-ic" style="background:linear-gradient(145deg,#9b3ba6,#c56cd0)"><i class="glyphicon glyphicon-folder-open"></i></div><div class="px-mh-tt"><div class="px-mh-title">Project</div><div class="px-mh-sub">Delivery workspace for a single project</div></div><div class="px-mh-act"><select class="sx-in" style="height:32px;min-width:320px;font-weight:700" onchange="projectApp.selectProject(this.value)">'+projectOptions()+'</select><button class="px-mh-btn" onclick="projectApp.notify(\'Project dashboard opened.\')">Dashboard</button><button class="px-mh-btn" onclick="projectApp.notify(\'Status report drafted from current period data.\')">New status report</button></div></div>';}
  function renderAreas(){var h='<nav class="sx-areas" aria-label="Project areas"><ul>';areas.forEach(function(a){h+='<li><button class="sx-area '+(S.area===a.id?'on':'')+'" onclick="projectApp.go(\''+a.id+'\')"><span class="tx">'+a.label+'</span></button></li>';});h+='</ul></nav>';return h;}
  function renderSubnav(){var h='<nav class="sx-subnav"><div class="sx-subnav-in">';views[S.area].forEach(function(v){h+='<button class="sx-sub '+(S.view===v[0]?'on':'')+'" onclick="projectApp.sub(\''+v[0]+'\')">'+v[1]+'</button>';});return h+'</div></nav>';}
  function contextBar(){var p=currentProject();var name=views[S.area].filter(function(x){return x[0]===S.view;})[0];return '<div class="ppmis-context"><div class="ppmis-context-main"><i>'+esc(p.code)+'</i><div><b>'+esc(p.name)+'</b><span>'+esc(p.id)+' · Programme: '+esc(p.programme)+' · PM: '+esc(p.pm)+' · Stage: '+esc(p.stage)+'</span></div></div><div class="ppmis-context-path">'+esc(p.portfolio)+' &nbsp;›&nbsp; '+esc(p.programme)+' &nbsp;›&nbsp; <strong>'+esc(name?name[1]:'Overview')+'</strong></div></div>';}

  function renderView(){
    if(S.area==='overview')return overviewView();
    if(S.area==='plan')return planView();
    if(S.area==='team')return teamView();
    if(S.area==='financials')return financialsView();
    if(S.area==='raid')return raidView();
    if(S.area==='deliverables')return deliverablesView();
    if(S.area==='status')return statusView();
    return documentsView();
  }

  /* ============== OVERVIEW ============== */
  function overviewView(){
    if(S.view==='health')return healthView();
    if(S.view==='charter')return charterView();
    var p=currentProject();
    var kpis='<div class="sx-kpis">'+
      kpi('Budget',p.budget,'Approved baseline')+
      kpi('Spent to date',p.spent,Math.round(parseInt(p.spent.replace(/[^0-9]/g,''))/parseInt(p.budget.replace(/[^0-9]/g,''))*100)+'% of budget')+
      kpi('Complete',p.pct+'%','Weighted plan progress',p.pct>60?'g':'')+
      kpi('Schedule health',p.schedule,'This period',p.schedule==='Green'?'g':p.schedule==='Amber'?'a':'r')+
      kpi('Cost health',p.cost,'This period',p.cost==='Green'?'g':'a')+
      kpi('Next milestone','22 Aug','Design authority')+
      '</div>';
    var progress='<svg viewBox="0 0 640 90" width="100%" style="border:1px solid #edf1f5;background:#fff">'+
      '<text x="20" y="22" font-size="11" font-weight="700" fill="#0d315c">Plan progress vs baseline</text>'+
      '<rect x="20" y="34" width="600" height="16" fill="#eef2f7"/>'+
      '<rect x="20" y="34" width="'+(p.pct*6)+'" height="16" fill="#2fb4e3"/>'+
      '<line x1="'+(70*6+20)+'" y1="30" x2="'+(70*6+20)+'" y2="54" stroke="#0d315c" stroke-width="2" stroke-dasharray="3 2"/>'+
      '<text x="'+(70*6+20)+'" y="70" font-size="10" fill="#0d315c" text-anchor="middle">Baseline · 70%</text>'+
      '<text x="'+(p.pct*6+20)+'" y="30" font-size="11" font-weight="700" fill="#2fb4e3" text-anchor="middle">Actual '+p.pct+'%</text>'+
      '</svg>';
    var stages='<div class="ppmis-stagebar">'+
      '<div class="ppmis-stage done"><b>Initiation</b><span>Complete</span></div>'+
      '<div class="ppmis-stage done"><b>Planning</b><span>Complete</span></div>'+
      '<div class="ppmis-stage on"><b>Execution</b><span>Current · '+p.pct+'%</span></div>'+
      '<div class="ppmis-stage"><b>Close-out</b><span>Planned Feb 27</span></div>'+
      '</div>';
    var focus='<table class="sx-t"><thead><tr><th>What needs attention</th><th>Type</th><th>Owner</th><th>Due</th></tr></thead><tbody>'+
      '<tr><td><b>Access flow rework</b></td><td>Deliverable</td><td>C. Els</td><td>21 Aug</td></tr>'+
      '<tr><td><b>Design authority resubmission</b></td><td>Milestone</td><td>A. Morgan</td><td>22 Aug</td></tr>'+
      '<tr><td><b>Confirm Rui Botha allocation</b></td><td>Resource</td><td>A. Morgan</td><td>19 Aug</td></tr>'+
      '<tr><td><b>UAT scenario workshop</b></td><td>Planning</td><td>S. Radebe</td><td>20 Aug</td></tr>'+
      '</tbody></table>';
    return kpis+card('Delivery stage',stages,esc(p.method))+card('Progress',progress,'Weighted by deliverable size')+'<div class="ppmis-two"><div>'+card('This week focus',focus,'PM: '+esc(p.pm))+'</div><div>'+card('Project posture','<div class="ppmis-statline"><span>Schedule</span><b>'+rag(p.schedule)+'</b></div><div class="ppmis-statline"><span>Cost</span><b>'+rag(p.cost)+'</b></div><div class="ppmis-statline"><span>Scope</span><b>'+rag('Green')+'</b></div><div class="ppmis-statline"><span>Benefit</span><b>'+rag(p.benefit)+'</b></div><div class="ppmis-statline"><span>Team confidence</span><b>4.1 / 5</b></div><div class="ppmis-statline"><span>Assurance rating</span><b>Amber / Green</b></div>')+card('Sponsor note','<p style="margin:0;color:#43505f;font-size:12.5px;line-height:1.55">Access flow rework is the only material risk to Q3 baseline. Team is on track for the September design authority and October integration handover. Confidence in Feb-27 go-live remains high.</p><div class="sx-actions"><button class="sx-btn primary" onclick="projectApp.go(\'status\',\'reports\')">Open status report</button></div>')+'</div></div>';
  }
  function healthView(){
    var body='<table class="sx-t"><thead><tr><th>Dimension</th><th>Score</th><th>Trend</th><th>Evidence</th><th>Action</th></tr></thead><tbody>'+
      '<tr><td><b>Schedule</b></td><td>'+rag('Amber')+'</td><td>Stable</td><td>Access flow rework · +7 days float used</td><td>Second submission on 22 Aug</td></tr>'+
      '<tr><td><b>Cost</b></td><td>'+rag('Green')+'</td><td>Improving</td><td>R2m under baseline · procurement saving</td><td>Return R2m to programme buffer</td></tr>'+
      '<tr><td><b>Scope</b></td><td>'+rag('Green')+'</td><td>Stable</td><td>1 change approved · notification pattern reuse</td><td>None</td></tr>'+
      '<tr><td><b>Benefit</b></td><td>'+rag('Green')+'</td><td>Stable</td><td>BEN-022 progressing to target</td><td>Confirm at 90-day review</td></tr>'+
      '<tr><td><b>Resource</b></td><td>'+rag('Amber')+'</td><td>Deteriorating</td><td>Integration lead not yet confirmed</td><td>Escalate to resource manager</td></tr>'+
      '<tr><td><b>Risk</b></td><td>'+rag('Amber')+'</td><td>Stable</td><td>2 red · 3 amber</td><td>Monitor UAT scenario risk</td></tr>'+
      '<tr><td><b>Quality</b></td><td>'+rag('Green')+'</td><td>Stable</td><td>0 P1 defects · 4 P2 open</td><td>None</td></tr>'+
      '<tr><td><b>Assurance</b></td><td>'+rag('Green')+'</td><td>Stable</td><td>Independent review Aug: 1 finding</td><td>Action closed 12 Aug</td></tr>'+
      '</tbody></table>';
    return card('Project health',body,'Health rolled up to programme reporting')+card('Confidence and evidence','<div class="ppmis-three"><div><h4>Team confidence</h4><p>Pulse score: 4.1 / 5 (n=17). Themes: capacity of integration team, sponsor engagement improving.</p></div><div><h4>Independent assurance</h4><p>Gate 2 readiness review completed Aug 12. One finding on RAID cadence, closed on 12 Aug.</p></div><div><h4>Baseline discipline</h4><p>Scope, schedule and cost baselines under version control. 1 approved change this tranche.</p></div></div>');
  }
  function charterView(){
    var p=currentProject();
    var scope='<div class="sx-def"><span>Purpose</span><b>'+esc(p.description)+'</b></div><div class="sx-def"><span>In scope</span><b>Self-service refresh, digital forms engine, notification centre, integration with identity service, cutover.</b></div><div class="sx-def"><span>Out of scope</span><b>Contact centre channels (separate project). Legacy IVR retirement.</b></div><div class="sx-def"><span>Assumptions</span><b>Identity platform Gate 2 achieved by 27 Aug 2026. Contoso pod continuity through Dec 2026.</b></div><div class="sx-def"><span>Constraints</span><b>Fixed cutover window: February 2027 weekend 2.</b></div>';
    var succ='<div class="sx-def"><span>Sponsor</span><b>'+esc(p.sponsor)+'</b></div><div class="sx-def"><span>PM</span><b>'+esc(p.pm)+'</b></div><div class="sx-def"><span>Method</span><b>'+esc(p.method)+'</b></div><div class="sx-def"><span>Budget</span><b>'+esc(p.budget)+'</b></div><div class="sx-def"><span>Window</span><b>'+esc(p.start)+' – '+esc(p.end)+'</b></div><div class="sx-def"><span>Success measures</span><b>BEN-022 fulfilment time · BEN-024 digital completion</b></div>';
    return '<div class="ppmis-two"><div>'+card('Scope',scope,'Charter v1.2 · approved 05 May 2026','ppmis-record')+'</div><div>'+card('Governance',succ,'Baseline · v3 approved 26 Jun 2026')+'</div></div>'+card('Approval chain','<div class="ppmis-chain"><button class="ppmis-chain-step active"><small>Portfolio</small><b>Business case</b><span>Approved 12 Apr 26</span></button><button class="ppmis-chain-step"><small>Programme</small><b>Charter</b><span>Approved 05 May 26</span></button><button class="ppmis-chain-step"><small>Design</small><b>Solution architecture</b><span>Approved 12 Aug 26</span></button><button class="ppmis-chain-step"><small>Programme</small><b>Delivery baseline</b><span>Planned 30 Sep 26</span></button><button class="ppmis-chain-step"><small>Business</small><b>Go-live approval</b><span>Planned 25 Feb 27</span></button></div>','Each decision retains rationale, evidence and authority');
  }

  /* ============== PLAN ============== */
  function planView(){
    if(S.view==='wbs')return wbsView();
    if(S.view==='milestones')return milestonesView();
    var months=['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb'];
    var bars=[
      {name:'Discovery & design',start:0,span:4,tone:'#8a7dff',pct:100},
      {name:'Platform build',start:2,span:5,tone:'#2fb4e3',pct:60},
      {name:'Integration',start:4,span:4,tone:'#29c152',pct:15},
      {name:'Test',start:6,span:3,tone:'#f6b916',pct:0},
      {name:'UAT',start:8,span:1,tone:'#ff9d4d',pct:0},
      {name:'Cutover',start:9,span:1,tone:'#e84c3d',pct:0}
    ];
    var w=780,rowH=32,left=180,cell=(w-left)/months.length;
    var svg='<svg viewBox="0 0 '+w+' '+(bars.length*rowH+70)+'" width="100%" style="background:#fff;border:1px solid #edf1f5">';
    months.forEach(function(m,i){var x=left+i*cell;svg+='<line x1="'+x+'" y1="20" x2="'+x+'" y2="'+(bars.length*rowH+40)+'" stroke="#eef2f7"/><text x="'+(x+cell/2)+'" y="16" font-size="10" fill="#8a96a8" text-anchor="middle">'+m+'</text>';});
    bars.forEach(function(b,i){
      var y=32+i*rowH;
      svg+='<text x="12" y="'+(y+18)+'" font-size="11" font-weight="700" fill="#0d315c">'+b.name+'</text>';
      svg+='<rect x="'+(left+b.start*cell)+'" y="'+y+'" width="'+(b.span*cell-4)+'" height="20" fill="'+b.tone+'22" stroke="'+b.tone+'" stroke-width="1"/>';
      if(b.pct>0)svg+='<rect x="'+(left+b.start*cell)+'" y="'+y+'" width="'+((b.span*cell-4)*b.pct/100)+'" height="20" fill="'+b.tone+'"/>';
      svg+='<text x="'+(left+b.start*cell+4)+'" y="'+(y+14)+'" font-size="10" font-weight="700" fill="'+(b.pct>0?'#0d315c':b.tone)+'">'+(b.pct>0?b.pct+'%':'planned')+'</text>';
    });
    svg+='<line x1="'+(left+3.5*cell)+'" y1="20" x2="'+(left+3.5*cell)+'" y2="'+(bars.length*rowH+40)+'" stroke="#e84c3d" stroke-width="2" stroke-dasharray="4 3"/><text x="'+(left+3.5*cell+4)+'" y="'+(bars.length*rowH+55)+'" font-size="10" font-weight="700" fill="#e84c3d">Today · 15 Aug 26</text>';
    svg+='</svg>';
    return card('Delivery schedule',svg,'Bars show planned window · fill shows actual complete');
  }
  function wbsView(){
    var rows=wbs.map(function(w){var indent=(w.code.split('.').length-1)*16;var isSummary=!/\./.test(w.code);return '<tr><td style="padding-left:'+(12+indent)+'px">'+(isSummary?'<b>':'')+esc(w.code)+' · '+esc(w.name)+(isSummary?'</b>':'')+'</td><td>'+esc(w.owner)+'</td><td>'+esc(w.start)+'</td><td>'+esc(w.finish)+'</td><td>'+esc(w.effort)+'</td><td>'+chip(w.status,w.status==='Complete'?'g':w.status==='In progress'?'stage':w.status==='Rework'?'a':'')+'</td></tr>';}).join('');
    return card('Work breakdown structure','<table class="sx-t"><thead><tr><th>Code &amp; name</th><th>Owner</th><th>Start</th><th>Finish</th><th>Effort</th><th>Status</th></tr></thead><tbody>'+rows+'</tbody></table>','Baseline v2 · versioned changes require change control');
  }
  function milestonesView(){
    var body='<table class="sx-t"><thead><tr><th>Milestone</th><th>Type</th><th>Planned</th><th>Forecast</th><th>Variance</th><th>Owner</th><th>Status</th></tr></thead><tbody>'+
      milestones.map(function(m){return '<tr><td><b>'+esc(m.name)+'</b></td><td>'+esc(m.type)+'</td><td>'+esc(m.planned)+'</td><td>'+esc(m.forecast)+'</td><td>'+(m.planned===m.forecast?'—':'<span class="a">+5d</span>')+'</td><td>'+esc(m.owner)+'</td><td>'+rag(m.status)+'</td></tr>';}).join('')+
      '</tbody></table>';
    var timeline='<svg viewBox="0 0 340 220" width="100%" height="220" style="background:#fff">'+
      '<line x1="20" y1="180" x2="330" y2="180" stroke="#cfd8e1"/>'+
      ['Aug','Sep','Oct','Nov','Dec','Jan','Feb'].map(function(m,i){var x=30+i*45;return '<line x1="'+x+'" y1="176" x2="'+x+'" y2="184" stroke="#cfd8e1"/><text x="'+x+'" y="200" font-size="9" fill="#8a96a8" text-anchor="middle">'+m+'</text>';}).join('')+
      milestones.map(function(m,i){var xs=[30,75,150,200,260,320,320];var col=m.status==='Green'?'#29c152':m.status==='Amber'?'#f6b916':'#e84c3d';var y=180-((i%2)*20);return '<circle cx="'+xs[i]+'" cy="'+y+'" r="7" fill="'+col+'"/><line x1="'+xs[i]+'" y1="'+y+'" x2="'+xs[i]+'" y2="'+(y-30-((i%3)*18))+'" stroke="#cfd8e1"/><text x="'+xs[i]+'" y="'+(y-38-((i%3)*18))+'" font-size="9.5" fill="#0d315c" text-anchor="middle" font-weight="700">'+esc(m.name.split(' ')[0])+'</text>';}).join('')+
      '</svg>';
    var vars={Green:0,Amber:0,Red:0};milestones.forEach(function(m){vars[m.status]=(vars[m.status]||0)+1;});
    var stats='<div class="sx-kpis" style="grid-template-columns:repeat(4,1fr)">'+kpi('Milestones',milestones.length.toString(),'Project total')+kpi('On track',(vars.Green||0).toString(),'Green','g')+kpi('At risk',(vars.Amber||0).toString(),'Amber','a')+kpi('Slipped',(vars.Red||0).toString(),'Red',vars.Red?'r':'g')+'</div>';
    return stats+'<div class="ppmis-two"><div>'+card('Project milestones',body,'Milestone slippage triggers a variance analysis before rebaseline')+'</div><div>'+card('Milestone timeline',timeline,'Position by month')+card('Variance analysis','<div class="sx-note warn"><b>Integration handover · +5 days:</b> access flow rework consumed 5 days of float from the design phase; integration start still fits within the tranche window because build had 8 days of buffer.</div>')+'</div></div>';
  }

  /* ============== TEAM ============== */
  function teamView(){
    if(S.view==='allocations')return allocationsView();
    if(S.view==='ramp')return rampView();
    var body='<table class="sx-t"><thead><tr><th>Name</th><th>Role</th><th>Capacity</th><th>Window</th><th>Source</th><th>Status</th></tr></thead><tbody>'+
      team.map(function(t){return '<tr><td><b>'+esc(t.name)+'</b></td><td>'+esc(t.role)+'</td><td>'+esc(t.capacity)+'</td><td>'+esc(t.start)+' – '+esc(t.end)+'</td><td>'+esc(t.rate)+'</td><td>'+chip(t.status,t.status==='Confirmed'?'g':t.status==='Pending'||t.status==='Requested'?'a':t.status==='Contracted'?'stage':'')+'</td></tr>';}).join('')+
      '</tbody></table>';
    return card('Team roster',body,'12 named resources · 2 external partners');
  }
  function allocationsView(){
    var months=['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb'];
    var alloc={'A. Morgan':[100,100,100,100,100,100,100,100,100,100],'M. Sithole':[50,50,50,50,50,50,50,50,50,50],'C. Els':[80,80,80,80,20,0,0,0,0,0],'D. van Wyk':[0,60,60,60,60,60,60,60,40,40],'H. Adams':[0,0,100,100,100,100,100,100,80,80],'J. Modise':[0,0,0,100,100,100,100,100,80,80],'R. Botha':[0,0,0,0,80,80,80,60,60,60],'K. Naidu':[0,0,0,0,0,20,80,80,80,80],'S. Radebe':[0,0,0,0,0,0,0,0,50,50],'N. Zulu':[0,0,0,0,0,0,60,60,60,60]};
    var table='<div class="sx-scroll"><table class="sx-t"><thead><tr><th>Name</th>';months.forEach(function(m){table+='<th style="text-align:center">'+m+'</th>';});table+='</tr></thead><tbody>';
    Object.keys(alloc).forEach(function(k){table+='<tr><td><b>'+k+'</b></td>';alloc[k].forEach(function(v){var tone=v===0?'#f5f7fa':v<50?'#eef8ee':v<80?'#fef8e6':v<=100?'#e5f4fb':'#fbe6e6';table+='<td style="background:'+tone+';text-align:center;font-weight:'+(v>0?700:400)+'">'+(v||'')+'</td>';});table+='</tr>';});table+='</tbody></table></div>';
    /* Team size curve */
    var teamSize=months.map(function(_,i){return Object.keys(alloc).reduce(function(s,k){return s+(alloc[k][i]>0?1:0);},0);});
    var maxTs=Math.max.apply(null,teamSize);
    var trend='<svg viewBox="0 0 340 180" width="100%" height="180" style="background:#fff">'+
      '<line x1="30" y1="20" x2="30" y2="140" stroke="#cfd8e1"/><line x1="30" y1="140" x2="330" y2="140" stroke="#cfd8e1"/>'+
      months.map(function(m,i){var x=45+i*30;return '<text x="'+x+'" y="158" font-size="9" fill="#8a96a8" text-anchor="middle">'+m+'</text>';}).join('')+
      '<polyline points="'+teamSize.map(function(v,i){var x=45+i*30,y=140-(v/maxTs)*110;return x+','+y;}).join(' ')+'" fill="none" stroke="#2fb4e3" stroke-width="2.4"/>'+
      teamSize.map(function(v,i){var x=45+i*30,y=140-(v/maxTs)*110;return '<circle cx="'+x+'" cy="'+y+'" r="3" fill="#2fb4e3"/><text x="'+x+'" y="'+(y-6)+'" font-size="9" fill="#0d315c" text-anchor="middle" font-weight="700">'+v+'</text>';}).join('')+
      '</svg>';
    var stats='<div class="sx-kpis" style="grid-template-columns:repeat(4,1fr)">'+kpi('Team members',Object.keys(alloc).length.toString(),'Individually allocated')+kpi('Peak size',maxTs.toString(),'in Q4 2026','g')+kpi('Internal','8','67% of team')+kpi('External','4','Contoso · Accenture · UAT · assurance')+'</div>';
    return stats+card('Monthly allocation (%)',table,'Heatmap: darker cells indicate higher allocation this month')+'<div class="ppmis-two"><div>'+card('Team size curve',trend,'Number of people allocated per month')+'</div><div>'+card('Allocation policy','<div class="ppmis-statline"><span>Maximum concurrent %</span><b>100</b></div><div class="ppmis-statline"><span>Minimum notice for change</span><b>2 weeks</b></div><div class="ppmis-statline"><span>External approvals via</span><b>Procurement</b></div><div class="ppmis-statline"><span>Reassignment cadence</span><b>Monthly</b></div><div class="ppmis-statline"><span>Escalation</span><b>Resource manager</b></div>')+'</div></div>';
  }
  function rampView(){
    var stages=[
      {stage:'Discovery',people:['A. Morgan','M. Sithole','C. Els'],output:'Journey maps, blueprint, access flow',size:3},
      {stage:'Design',people:['C. Els','D. van Wyk','H. Adams'],output:'Solution architecture, module designs',size:5},
      {stage:'Build',people:['H. Adams','J. Modise','D. van Wyk'],output:'Self-service module, forms engine, notifications',size:8},
      {stage:'Integration',people:['R. Botha','D. van Wyk'],output:'API v2, contract tests, environment cutovers',size:9},
      {stage:'Test',people:['K. Naidu','H. Adams','J. Modise'],output:'System test, defect closure, performance baseline',size:9},
      {stage:'UAT',people:['S. Radebe','K. Naidu','N. Zulu'],output:'UAT sign-off, business readiness',size:8},
      {stage:'Cutover',people:['K. Naidu','A. Morgan','N. Zulu'],output:'Go-live, hypercare handover to Operations',size:6}
    ];
    var body='<table class="sx-t"><thead><tr><th>Stage</th><th>Core team</th><th>Primary output</th></tr></thead><tbody>'+
      stages.map(function(s){return '<tr><td><b>'+esc(s.stage)+'</b></td><td>'+s.people.map(function(p){return chip(p,'');}).join(' ')+'</td><td class="mut">'+esc(s.output)+'</td></tr>';}).join('')+
      '</tbody></table>';
    var maxs=Math.max.apply(null,stages.map(function(s){return s.size;}));
    var curve='<svg viewBox="0 0 340 200" width="100%" height="200" style="background:#fff">'+
      '<line x1="30" y1="20" x2="30" y2="160" stroke="#cfd8e1"/><line x1="30" y1="160" x2="330" y2="160" stroke="#cfd8e1"/>'+
      stages.map(function(s,i){var x=55+i*40;return '<text x="'+x+'" y="180" font-size="9" fill="#8a96a8" text-anchor="middle">'+s.stage+'</text>';}).join('')+
      '<polygon points="'+stages.map(function(s,i){var x=55+i*40,y=160-(s.size/maxs)*130;return x+','+y;}).join(' ')+' 55,160 265,160 265,160" fill="#2fb4e344" stroke="#2fb4e3" stroke-width="2"/>'+
      stages.map(function(s,i){var x=55+i*40,y=160-(s.size/maxs)*130;return '<circle cx="'+x+'" cy="'+y+'" r="4" fill="#2fb4e3"/><text x="'+x+'" y="'+(y-8)+'" font-size="10" font-weight="700" fill="#0d315c" text-anchor="middle">'+s.size+'</text>';}).join('')+
      '</svg>';
    return card('Ramp plan',body,'Team composition changes by stage · onboarding lead-time is 2 weeks')+'<div class="ppmis-two"><div>'+card('Team size by stage',curve,'Number of people active per stage')+'</div><div>'+card('Onboarding checklist','<ul class="sx-list" style="margin:0"><li>Security clearance and access granted</li><li>Environment and tools provisioned</li><li>Project induction (charter, roles, RACI)</li><li>Assigned buddy for first two weeks</li><li>Confirmation of allocation with home team lead</li></ul>')+card('Offboarding checklist','<ul class="sx-list" style="margin:0"><li>Handover of outputs and evidence</li><li>Lessons captured</li><li>Access revoked</li><li>Notification to home team</li></ul>')+'</div></div>';
  }

  /* ============== FINANCIALS ============== */
  function financialsView(){
    if(S.view==='budget')return budgetView();
    if(S.view==='forecast')return forecastView();
    var p=currentProject();
    var kpis='<div class="sx-kpis">'+kpi('Baseline',p.budget,'Approved')+kpi('Actual to date',p.spent,'62% of baseline')+kpi('Committed','R92m','Contracts & POs')+kpi('Forecast at completion','R124m','−R2m against baseline','g')+kpi('CPI','1.04','Cost efficient','g')+kpi('SPI','0.92','Behind schedule','a')+'</div>';
    var cats=[
      ['Labour · internal',28,18,28,28],
      ['Labour · external',44,28,42,42],
      ['Software licences',14,11,14,14],
      ['Infrastructure',18,11,16,18],
      ['Services & consulting',16,9,14,16],
      ['Contingency',6,1,2,6]
    ];
    var body='<table class="sx-t"><thead><tr><th>Category</th><th>Baseline</th><th>Actual</th><th>Committed</th><th>Forecast</th><th>Variance</th></tr></thead><tbody>'+
      cats.map(function(c){var v=c[1]-c[4];var vLbl=v===0?'—':(v>0?'<span class="g">−R'+v+'m</span>':'<span class="r">+R'+Math.abs(v)+'m</span>');return '<tr><td><b>'+esc(c[0])+'</b></td><td>R'+c[1]+'m</td><td>R'+c[2]+'m</td><td>R'+c[3]+'m</td><td>R'+c[4]+'m</td><td>'+vLbl+'</td></tr>';}).join('')+
      '<tfoot><tr><td>Total</td><td>R126m</td><td>R78m</td><td>R116m</td><td>R124m</td><td class="g">−R2m</td></tr></tfoot></tbody></table>';
    var donutSeg=cats.map(function(c,i){var col=['#2fb4e3','#f6b916','#8a7dff','#29c152','#e84c3d','#7c8b9c'][i];return [c[0],c[1],col];});
    var catDonut='<div style="text-align:center;padding:6px 0">'+donut(donutSeg,150)+'</div>'+legend(cats.map(function(c,i){var col=['#2fb4e3','#f6b916','#8a7dff','#29c152','#e84c3d','#7c8b9c'][i];return [c[0],col,'R'+c[1]+'m'];}));
    return kpis+card('Cost by category',body,'Actuals reconciled through finance system on 14 Aug')+'<div class="ppmis-two"><div>'+card('Baseline composition',catDonut,'By cost category')+'</div><div>'+card('Financial position','<div class="ppmis-statline"><span>% of baseline consumed</span><b>62%</b></div><div class="ppmis-statline"><span>% complete (plan)</span><b>62%</b></div><div class="ppmis-statline"><span>Spend efficiency</span><b>On plan</b></div><div class="ppmis-statline"><span>Committed vs remaining</span><b>92% / 8%</b></div><div class="ppmis-statline"><span>Contingency remaining</span><b>R5m of R6m</b></div><div class="ppmis-statline"><span>Last reconciliation</span><b>14 Aug 2026</b></div>')+'</div></div>';
  }
  function budgetView(){
    var months=['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb'];
    var baseline=[6,10,15,18,16,14,14,12,10,11];
    var actual=[7,11,14,17,0,0,0,0,0,0];
    var forecast=[7,11,14,17,16,14,14,12,10,9];
    var svg='<svg viewBox="0 0 640 220" width="100%" style="border:1px solid #edf1f5;background:#fff">';
    svg+='<rect x="0" y="0" width="640" height="220" fill="#fbfcfe"/>';
    for(var i=0;i<5;i++){var y=30+i*35;svg+='<line x1="55" y1="'+y+'" x2="620" y2="'+y+'" stroke="#eef2f7"/>';}
    months.forEach(function(m,i){var x=64+i*58;svg+='<text x="'+x+'" y="215" font-size="10" fill="#8a96a8" text-anchor="middle">'+m+'</text>';});
    baseline.forEach(function(v,i){var x=64+i*58-8,h=v*8;svg+='<rect x="'+x+'" y="'+(200-h)+'" width="6" height="'+h+'" fill="#8a96a8"/>';});
    actual.forEach(function(v,i){if(v===0)return;var x=64+i*58,h=v*8;svg+='<rect x="'+x+'" y="'+(200-h)+'" width="6" height="'+h+'" fill="#2fb4e3"/>';});
    forecast.forEach(function(v,i){if(actual[i]!==0)return;var x=64+i*58+8,h=v*8;svg+='<rect x="'+x+'" y="'+(200-h)+'" width="6" height="'+h+'" fill="#f6b916"/>';});
    svg+='</svg>';
    var leg='<div class="sx-actions" style="margin-top:6px"><span class="sx-chip"><i style="background:#8a96a8;width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px"></i>Baseline</span><span class="sx-chip"><i style="background:#2fb4e3;width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px"></i>Actual</span><span class="sx-chip"><i style="background:#f6b916;width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px"></i>Forecast</span></div>';
    /* Cumulative curve */
    var bCum=[],aCum=[],cum=0,cumA=0;
    baseline.forEach(function(v){cum+=v;bCum.push(cum);});
    actual.forEach(function(v,i){if(v===0){aCum.push(null);}else{cumA+=v;aCum.push(cumA);}});
    var maxCum=Math.max.apply(null,bCum);
    var cumSvg='<svg viewBox="0 0 340 200" width="100%" height="200" style="background:#fff">'+
      '<line x1="30" y1="20" x2="30" y2="160" stroke="#cfd8e1"/><line x1="30" y1="160" x2="330" y2="160" stroke="#cfd8e1"/>'+
      months.map(function(m,i){var x=45+i*28;return '<text x="'+x+'" y="178" font-size="9" fill="#8a96a8" text-anchor="middle">'+m+'</text>';}).join('')+
      '<polyline points="'+bCum.map(function(v,i){var x=45+i*28,y=160-(v/maxCum)*130;return x+','+y;}).join(' ')+'" fill="none" stroke="#8a96a8" stroke-width="2" stroke-dasharray="4 3"/>'+
      '<polyline points="'+aCum.filter(function(v){return v!==null;}).map(function(v,i){var x=45+i*28,y=160-(v/maxCum)*130;return x+','+y;}).join(' ')+'" fill="none" stroke="#2fb4e3" stroke-width="2.4"/>'+
      '<text x="200" y="30" font-size="10" fill="#8a96a8">— Baseline cumulative</text><text x="200" y="46" font-size="10" fill="#2fb4e3">— Actual cumulative</text>'+
      '</svg>';
    return card('Budget vs actual vs forecast (R m per month)',svg+leg,'Monthly cash spend')+'<div class="ppmis-two"><div>'+card('Cumulative spend',cumSvg,'Sums to project baseline of R126m')+'</div><div>'+card('Cash flow observations','<div class="ppmis-statline"><span>Actual vs baseline (YTD)</span><b class="a">+R2m</b></div><div class="ppmis-statline"><span>Largest overspend month</span><b>Jul (R+1m)</b></div><div class="ppmis-statline"><span>Largest saving month</span><b>—</b></div><div class="ppmis-statline"><span>Forecast to baseline gap</span><b class="g">−R2m</b></div><div class="ppmis-statline"><span>Next invoice cycle</span><b>28 Aug</b></div>')+'</div></div>';
  }
  function forecastView(){
    var body='<table class="sx-t"><thead><tr><th>Period</th><th>EV</th><th>PV</th><th>AC</th><th>SPI</th><th>CPI</th><th>EAC</th><th>Change</th></tr></thead><tbody>'+
      '<tr><td>Jun 26</td><td>R14m</td><td>R14m</td><td>R14m</td><td>1.00</td><td>1.00</td><td>R126m</td><td>—</td></tr>'+
      '<tr><td>Jul 26</td><td>R28m</td><td>R30m</td><td>R28m</td><td>0.93</td><td>1.00</td><td>R126m</td><td>—</td></tr>'+
      '<tr><td>Aug 26</td><td>R42m</td><td>R46m</td><td>R44m</td><td>0.91</td><td>0.95</td><td>R128m</td><td class="a">+R2m</td></tr>'+
      '<tr><td>Aug 26 (updated)</td><td>R48m</td><td>R52m</td><td>R47m</td><td>0.92</td><td>1.02</td><td>R124m</td><td class="g">−R2m</td></tr>'+
      '</tbody></table>';
    var trend='<svg viewBox="0 0 340 200" width="100%" height="200" style="background:#fff">'+
      '<line x1="30" y1="20" x2="30" y2="160" stroke="#cfd8e1"/><line x1="30" y1="160" x2="330" y2="160" stroke="#cfd8e1"/>'+
      ['Jun','Jul','Aug','Aug*'].map(function(m,i){var x=60+i*80;return '<text x="'+x+'" y="180" font-size="10" fill="#8a96a8" text-anchor="middle">'+m+'</text>';}).join('')+
      '<line x1="30" y1="80" x2="330" y2="80" stroke="#8a96a8" stroke-width="2" stroke-dasharray="4 3"/>'+
      '<text x="335" y="82" font-size="10" fill="#8a96a8">R126m</text>'+
      '<polyline points="60,80 140,80 220,72 300,88" fill="none" stroke="#f6b916" stroke-width="2.4"/>'+
      ['R126m','R126m','R128m','R124m'].map(function(v,i){var x=60+i*80,ys=[80,80,72,88][i];return '<circle cx="'+x+'" cy="'+ys+'" r="4" fill="#f6b916"/><text x="'+x+'" y="'+(ys-8)+'" font-size="10" fill="#0d315c" font-weight="700" text-anchor="middle">'+v+'</text>';}).join('')+
      '</svg>';
    var narrative='<p style="margin:0;color:#43505f;font-size:12.5px;line-height:1.55">EAC improved to R124m after procurement saving on Contoso contract renewal and reduction in one licence bundle. Schedule remains behind plan; SPI is expected to improve after the access flow rework completes.</p>';
    var callouts='<div class="sx-note ok"><b>−R2m saving locked</b> — return to programme buffer at the next status cycle.</div><div class="sx-note warn"><b>SPI 0.92</b> — behind schedule, recovering. Watch for continued improvement after 22 Aug.</div>';
    return card('Earned value & EAC',body,'EAC uses CPI-based projection with schedule adjustment')+'<div class="ppmis-two"><div>'+card('EAC trend',trend,'Forecast at completion over recent reviews')+card('EAC commentary',narrative,'')+'</div><div>'+card('Signals for the sponsor',callouts,'From the current period')+'</div></div>';
  }

  /* ============== RAID ============== */
  function raidView(){
    if(S.view==='actions')return actionsView();
    if(S.view==='issues')return issuesView();
    if(S.view==='decisions')return decisionsView();
    var rows=raid.risks.map(function(r){return '<tr class="ppmis-table-row '+(S.selectedRisk===r.id?'selected':'')+'" onclick="projectApp.selectRisk(\''+r.id+'\')"><td>'+esc(r.id)+'</td><td><b>'+esc(r.title)+'</b></td><td>'+esc(r.likelihood)+' · '+esc(r.impact)+'</td><td><span class="ppmis-score">'+r.score+'</span></td><td>'+esc(r.owner)+'</td><td>'+chip(r.status,r.status==='Open'?'a':r.status==='Mitigating'?'stage':'')+'</td></tr>';}).join('');
    var detail=raid.risks.filter(function(r){return r.id===S.selectedRisk;})[0]||raid.risks[0];
    var d='<div class="ppmis-record-title">'+esc(detail.title)+'</div><div class="ppmis-record-ref">'+esc(detail.id)+' · opened '+esc(detail.opened)+'</div><div class="sx-def"><span>Likelihood</span><b>'+esc(detail.likelihood)+'</b></div><div class="sx-def"><span>Impact</span><b>'+esc(detail.impact)+'</b></div><div class="sx-def"><span>Score</span><b>'+detail.score+'</b></div><div class="sx-def"><span>Owner</span><b>'+esc(detail.owner)+'</b></div><div class="sx-def"><span>Response</span><b>'+esc(detail.response)+'</b></div><div class="sx-def"><span>Status</span><b>'+esc(detail.status)+'</b></div><div class="sx-actions"><button class="sx-btn primary" onclick="projectApp.notify(\'Risk update captured against '+esc(detail.id)+'\')">Add update</button><button class="sx-btn" onclick="projectApp.notify(\'Risk escalated to programme.\')">Escalate</button></div>';
    return '<div class="ppmis-two"><div>'+card('Risk register','<table class="sx-t"><thead><tr><th>ID</th><th>Risk</th><th>L × I</th><th>Score</th><th>Owner</th><th>Status</th></tr></thead><tbody>'+rows+'</tbody></table>','Select a row to view detail')+'</div><div>'+card('Risk detail',d,'Traceable to project decisions','ppmis-record')+'</div></div>';
  }
  function actionsView(){
    var rows=raid.actions.map(function(a){return '<tr><td>'+esc(a.id)+'</td><td><b>'+esc(a.title)+'</b></td><td>'+esc(a.owner)+'</td><td>'+esc(a.due)+'</td><td>'+a.age+' d</td><td>'+chip(a.status,a.status==='Open'?'a':a.status==='In progress'?'stage':a.status==='Blocked'?'r':'g')+'</td></tr>';}).join('');
    var byStatus={};raid.actions.forEach(function(a){byStatus[a.status]=(byStatus[a.status]||0)+1;});
    var byOwner={};raid.actions.forEach(function(a){byOwner[a.owner]=(byOwner[a.owner]||0)+1;});
    var stats='<div class="sx-kpis" style="grid-template-columns:repeat(4,1fr)">'+kpi('Open actions',raid.actions.length.toString(),'This period')+kpi('Blocked',(byStatus.Blocked||0).toString(),'Requires escalation',byStatus.Blocked?'r':'g')+kpi('In progress',(byStatus['In progress']||0).toString(),'Owner working','g')+kpi('Avg age',Math.round(raid.actions.reduce(function(s,a){return s+a.age;},0)/raid.actions.length)+' d','From open')+'</div>';
    var ownerList='<div class="ppmis-statline"><span>&nbsp;</span><b>Open</b></div>'+Object.keys(byOwner).map(function(o){return '<div class="ppmis-statline"><span>'+esc(o)+'</span><b>'+byOwner[o]+'</b></div>';}).join('');
    var statusDist='<div style="text-align:center;padding:6px 0">'+donut(Object.keys(byStatus).map(function(k,i){return [k,byStatus[k],['#f6b916','#2fb4e3','#e84c3d','#29c152'][i]];}),140)+'</div>'+legend(Object.keys(byStatus).map(function(k,i){return [k,['#f6b916','#2fb4e3','#e84c3d','#29c152'][i],byStatus[k]];}));
    return stats+'<div class="ppmis-two"><div>'+card('Actions','<table class="sx-t"><thead><tr><th>ID</th><th>Action</th><th>Owner</th><th>Due</th><th>Age</th><th>Status</th></tr></thead><tbody>'+rows+'</tbody></table>','Actions closed at status review; new actions captured in period')+'<div class="sx-actions"><button class="sx-btn primary" onclick="projectApp.notify(\'New action captured.\')">New action</button></div></div><div>'+card('By status',statusDist,'Snapshot')+card('By owner',ownerList,'Actions per owner')+'</div></div>';
  }
  function issuesView(){
    var rows=raid.issues.map(function(i){return '<tr><td>'+esc(i.id)+'</td><td><b>'+esc(i.title)+'</b></td><td>'+esc(i.owner)+'</td><td>'+esc(i.opened)+'</td><td>'+i.age+' d</td><td>'+chip(i.severity,i.severity==='High'?'r':i.severity==='Medium'?'a':'')+'</td><td>'+chip(i.status,i.status==='Rework'?'a':i.status==='Closed'?'g':'')+'</td></tr>';}).join('');
    var open=raid.issues.filter(function(i){return i.status!=='Closed';}).length;
    var closed=raid.issues.filter(function(i){return i.status==='Closed';}).length;
    var stats='<div class="sx-kpis" style="grid-template-columns:repeat(4,1fr)">'+kpi('Open issues',open.toString(),'Being worked','a')+kpi('Closed this month',closed.toString(),'Resolved','g')+kpi('Avg time to close','5.2 d','Rolling 30 days')+kpi('High severity',raid.issues.filter(function(i){return i.severity==='High';}).length.toString(),'Priority')+'</div>';
    var sevDist={};raid.issues.forEach(function(i){sevDist[i.severity]=(sevDist[i.severity]||0)+1;});
    var sevDonut='<div style="text-align:center;padding:6px 0">'+donut([['High',sevDist.High||0,'#e84c3d'],['Medium',sevDist.Medium||0,'#f6b916'],['Low',sevDist.Low||0,'#29c152']],140)+'</div>'+legend([['High','#e84c3d',sevDist.High||0],['Medium','#f6b916',sevDist.Medium||0],['Low','#29c152',sevDist.Low||0]]);
    var burndown='<svg viewBox="0 0 340 160" width="100%" height="160" style="background:#fff">'+
      '<line x1="30" y1="20" x2="30" y2="130" stroke="#cfd8e1"/><line x1="30" y1="130" x2="330" y2="130" stroke="#cfd8e1"/>'+
      ['W28','W29','W30','W31','W32','W33'].map(function(w,i){var x=60+i*50;return '<text x="'+x+'" y="150" font-size="9" fill="#8a96a8" text-anchor="middle">'+w+'</text>';}).join('')+
      '<polyline points="60,60 110,55 160,70 210,50 260,45 310,35" fill="none" stroke="#e84c3d" stroke-width="2.4"/>'+
      '<polyline points="60,90 110,80 160,75 210,60 260,50 310,40" fill="none" stroke="#29c152" stroke-width="2.4"/>'+
      '<text x="180" y="40" font-size="10" fill="#e84c3d">Opened</text><text x="240" y="75" font-size="10" fill="#29c152">Closed</text>'+
      '</svg>';
    return stats+'<div class="ppmis-two"><div>'+card('Issue log','<table class="sx-t"><thead><tr><th>ID</th><th>Issue</th><th>Owner</th><th>Opened</th><th>Age</th><th>Severity</th><th>Status</th></tr></thead><tbody>'+rows+'</tbody></table>','Issues promoted to programme when they cross project boundaries')+'</div><div>'+card('Severity',sevDonut,'Current')+card('Open vs closed (weekly)',burndown,'6-week rolling')+'</div></div>';
  }
  function decisionsView(){
    var rows=raid.decisions.map(function(d){return '<tr><td>'+esc(d.date)+'</td><td>'+esc(d.id)+'</td><td><b>'+esc(d.decision)+'</b></td><td>'+esc(d.authority)+'</td><td class="mut">'+esc(d.rationale)+'</td></tr>';}).join('');
    var byAuth={};raid.decisions.forEach(function(d){byAuth[d.authority]=(byAuth[d.authority]||0)+1;});
    var authList=Object.keys(byAuth).map(function(a){return '<div class="ppmis-statline"><span>'+esc(a)+'</span><b>'+byAuth[a]+'</b></div>';}).join('');
    var timeline='<div class="sx-audit">'+raid.decisions.map(function(d){return '<div class="row"><b>'+esc(d.decision)+'</b><span class="w">'+esc(d.date)+' · '+esc(d.authority)+' · '+esc(d.id)+'</span></div>';}).join('')+'</div>';
    return '<div class="ppmis-two"><div>'+card('Decisions','<table class="sx-t"><thead><tr><th>Date</th><th>ID</th><th>Decision</th><th>Authority</th><th>Rationale</th></tr></thead><tbody>'+rows+'</tbody></table>','Retained for audit and lessons')+'</div><div>'+card('By authority',authList,'Who has decided')+card('Decision trail',timeline,'Most recent first')+'</div></div>';
  }

  /* ============== DELIVERABLES ============== */
  function deliverablesView(){
    if(S.view==='acceptance')return acceptanceView();
    var rows=deliverables.map(function(d){return '<tr class="ppmis-table-row '+(S.selectedDeliverable===d.id?'selected':'')+'" onclick="projectApp.selectDeliverable(\''+d.id+'\')"><td>'+esc(d.id)+'</td><td><b>'+esc(d.name)+'</b></td><td>'+esc(d.accept)+'</td><td>'+esc(d.by)+'</td><td>'+chip(d.status,d.status==='Accepted'?'g':d.status==='Rework'?'a':d.status==='In review'?'stage':d.status==='In progress'?'':'')+'</td><td>'+esc(d.accepted)+'</td></tr>';}).join('');
    return card('Deliverables','<table class="sx-t"><thead><tr><th>ID</th><th>Deliverable</th><th>Accepter</th><th>Acceptance body</th><th>Status</th><th>Accepted</th></tr></thead><tbody>'+rows+'</tbody></table>','Acceptance criteria tied to each deliverable · evidence in library');
  }
  function acceptanceView(){
    var d=deliverables.filter(function(x){return x.id===S.selectedDeliverable;})[0]||deliverables[0];
    var body='<div class="ppmis-record-title">'+esc(d.name)+'</div><div class="ppmis-record-ref">'+esc(d.id)+' · accepter: '+esc(d.accept)+'</div><div class="sx-def"><span>Acceptance body</span><b>'+esc(d.by)+'</b></div><div class="sx-def"><span>Acceptance criteria</span><b>Functional coverage 100% · non-functional benchmarks met · zero P1 defects · accessibility review completed</b></div><div class="sx-def"><span>Evidence provided</span><b>Test report v0.9 · security review letter · design walkthrough recording</b></div><div class="sx-def"><span>Status</span><b>'+esc(d.status)+'</b></div><div class="sx-actions"><button class="sx-btn primary" onclick="projectApp.notify(\'Acceptance recorded for '+esc(d.id)+'\')">Record acceptance</button><button class="sx-btn" onclick="projectApp.notify(\'Rework request captured with detail.\')">Request rework</button></div>';
    var audit='<div class="sx-audit"><div class="row"><b>14 Aug 26 · Review returned to author</b><span class="w">Design authority · rework required on step 3</span></div><div class="row"><b>12 Aug 26 · Independent review issued</b><span class="w">Assurance partner · one finding</span></div><div class="row"><b>11 Aug 26 · Evidence pack completed</b><span class="w">Author · uploaded to document library</span></div><div class="row"><b>08 Aug 26 · Draft submitted</b><span class="w">Author · initial version</span></div></div>';
    var checklist='<ul class="sx-list" style="margin:0"><li>All acceptance criteria evaluated with pass/fail evidence</li><li>Independent review report attached</li><li>Author has responded to review findings</li><li>Accepter has signed the acceptance form</li><li>Deliverable version and evidence version match</li></ul>';
    return '<div class="ppmis-two"><div>'+card('Acceptance detail',body,'Acceptance retains evidence with sign-off','ppmis-record')+card('Audit trail',audit,'Traceable per deliverable')+'</div><div>'+card('Acceptance checklist',checklist,'Every deliverable follows this checklist')+card('Related evidence','<div class="ppmis-statline"><span>Test report</span><b>v0.9 · 14 Aug</b></div><div class="ppmis-statline"><span>Security review</span><b>signed · 12 Aug</b></div><div class="ppmis-statline"><span>Accessibility review</span><b>signed · 12 Aug</b></div><div class="ppmis-statline"><span>Design walkthrough recording</span><b>uploaded · 11 Aug</b></div>')+'</div></div>';
  }

  /* ============== STATUS REPORTS ============== */
  function statusView(){
    if(S.view==='trend')return trendView();
    var rows=statusReports.map(function(s){return '<tr><td>'+esc(s.id)+'</td><td>'+esc(s.period)+'</td><td>'+rag(s.schedule)+'</td><td>'+rag(s.cost)+'</td><td>'+rag(s.scope)+'</td><td>'+esc(s.issued)+'</td><td>'+chip(s.status,s.status==='In draft'?'a':'g')+'</td><td><button class="sx-btn sm" onclick="projectApp.notify(\''+esc(s.id)+' opened.\')">Open</button></td></tr>';}).join('');
    var draftHighlights='<div class="sx-audit"><div class="row"><b>Schedule</b><span class="w">Amber · access flow rework · +7d float used</span></div><div class="row"><b>Cost</b><span class="w">Green · R2m saving on procurement</span></div><div class="row"><b>Scope</b><span class="w">Green · 1 change approved this period</span></div><div class="row"><b>RAID</b><span class="w">2 new risks · 3 actions closed · 0 issues promoted</span></div><div class="row"><b>Next period</b><span class="w">Design authority resubmission · UAT scoping</span></div></div>';
    var next='<div class="ppmis-statline"><span>Next report due</span><b>19 Aug 2026</b></div><div class="ppmis-statline"><span>Distribution</span><b>Programme office · Sponsor</b></div><div class="ppmis-statline"><span>Signed by</span><b>PM (A. Morgan)</b></div><div class="ppmis-statline"><span>Storage</span><b>Programme evidence pack</b></div>';
    return card('Status reports','<table class="sx-t"><thead><tr><th>ID</th><th>Period</th><th>Schedule</th><th>Cost</th><th>Scope</th><th>Issued</th><th>Status</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>','Status reports feed the programme highlight report')+'<div class="ppmis-two"><div>'+card('Current period highlights (STA-014 draft)',draftHighlights,'PM draft · not yet issued')+'</div><div>'+card('Next issue',next,'Reporting rhythm')+card('Sign-off flow','<div class="ppmis-chain" style="grid-template-columns:repeat(4,1fr)"><button class="ppmis-chain-step active"><small>1</small><b>PM draft</b><span>Facts and RAG</span></button><button class="ppmis-chain-step"><small>2</small><b>PMO check</b><span>Consistency</span></button><button class="ppmis-chain-step"><small>3</small><b>Sponsor review</b><span>Narrative</span></button><button class="ppmis-chain-step"><small>4</small><b>Issue</b><span>Distribution</span></button></div>')+'</div></div>';
  }
  function trendView(){
    var periods=['P8','P9','P10','P11','P12','P13','P14'];
    var series=[['Schedule','#2fb4e3',[1,1,1,1,2,2,2]],['Cost','#29c152',[1,1,1,1,1,1,1]],['Scope','#f6b916',[1,1,1,1,1,1,1]]];
    var svg='<svg viewBox="0 0 640 220" width="100%" style="border:1px solid #edf1f5;background:#fff"><rect x="0" y="0" width="640" height="220" fill="#fbfcfe"/>';
    ['Green','Amber','Red'].forEach(function(l,i){var y=140-i*40;svg+='<line x1="55" y1="'+y+'" x2="620" y2="'+y+'" stroke="#eef2f7"/><text x="45" y="'+(y+4)+'" font-size="10" fill="#8a96a8" text-anchor="end">'+l+'</text>';});
    periods.forEach(function(p,i){var x=90+i*80;svg+='<text x="'+x+'" y="200" font-size="10" fill="#8a96a8" text-anchor="middle">'+p+'</text>';});
    series.forEach(function(s,si){var pts=s[2].map(function(v,i){var x=90+i*80,y=140-((v-1)*(-40));return x+','+y;}).join(' ');svg+='<polyline points="'+pts+'" fill="none" stroke="'+s[1]+'" stroke-width="2.4"/>';s[2].forEach(function(v,i){var x=90+i*80,y=140-((v-1)*(-40));svg+='<circle cx="'+x+'" cy="'+y+'" r="3" fill="'+s[1]+'"/>';});});
    svg+='</svg>';
    var leg='<div class="sx-actions" style="margin-top:6px">';series.forEach(function(s){leg+='<span class="sx-chip" style="background:'+s[1]+'22;color:'+s[1]+';border-color:'+s[1]+'55"><i style="background:'+s[1]+';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px"></i>'+s[0]+'</span>';});leg+='</div>';
    var stats='<div class="sx-kpis" style="grid-template-columns:repeat(4,1fr)">'+kpi('Periods green','5','of 7','g')+kpi('Periods amber','2','P13, P14','a')+kpi('Periods red','0','—','g')+kpi('Deteriorating','Schedule','since P12')+'</div>';
    return stats+card('Health trend across recent status reports',svg+leg,'Movement from Green to Amber on schedule aligned with access flow rework')+card('What changed at each RAG movement','<div class="sx-audit"><div class="row"><b>P12 → P13 · Schedule Green → Amber</b><span class="w">Access flow returned for rework by design authority</span></div><div class="row"><b>Cost stable</b><span class="w">Procurement saving locked in P13</span></div><div class="row"><b>Scope stable</b><span class="w">Change control cadence unchanged</span></div></div>');
  }

  /* ============== DOCUMENTS ============== */
  function documentsView(){
    if(S.view==='history')return historyView();
    var rows=documents.map(function(d){return '<tr><td><b>'+esc(d.name)+'</b></td><td>'+esc(d.type)+'</td><td>'+esc(d.version)+'</td><td>'+esc(d.owner)+'</td><td>'+esc(d.updated)+'</td><td><button class="sx-btn sm" onclick="projectApp.notify(\''+esc(d.name)+' opened.\')">Open</button></td></tr>';}).join('');
    var byType={};documents.forEach(function(d){byType[d.type]=(byType[d.type]||0)+1;});
    var byOwner={};documents.forEach(function(d){byOwner[d.owner]=(byOwner[d.owner]||0)+1;});
    var typeDonut='<div style="text-align:center;padding:6px 0">'+donut(Object.keys(byType).map(function(k,i){return [k,byType[k],['#2fb4e3','#f6b916','#8a7dff','#29c152','#e84c3d','#7c8b9c','#39c1d1','#d24e79'][i%8]];}),150)+'</div>'+legend(Object.keys(byType).map(function(k,i){return [k,['#2fb4e3','#f6b916','#8a7dff','#29c152','#e84c3d','#7c8b9c','#39c1d1','#d24e79'][i%8],byType[k]];}));
    var ownerList=Object.keys(byOwner).map(function(o){return '<div class="ppmis-statline"><span>'+esc(o)+'</span><b>'+byOwner[o]+'</b></div>';}).join('');
    return '<div class="ppmis-two"><div>'+card('Document library','<table class="sx-t"><thead><tr><th>Name</th><th>Type</th><th>Version</th><th>Owner</th><th>Updated</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>','All artefacts under version control')+'</div><div>'+card('By type',typeDonut,documents.length+' documents in total')+card('By owner',ownerList,'Documents per owner')+'</div></div>';
  }
  function historyView(){
    var body='<table class="sx-t"><thead><tr><th>Date</th><th>Document</th><th>Version</th><th>Change</th><th>By</th></tr></thead><tbody>'+
      '<tr><td>14 Aug 26</td><td>Access flow</td><td>v0.9</td><td>Second draft after security walk-through</td><td>C. Els</td></tr>'+
      '<tr><td>14 Aug 26</td><td>Risk register</td><td>live</td><td>RSK-124 added; RSK-127 raised to score 12</td><td>M. Sithole</td></tr>'+
      '<tr><td>14 Aug 26</td><td>Delivery plan</td><td>v2.4</td><td>Access flow shifted by 3 days; UAT window unchanged</td><td>A. Morgan</td></tr>'+
      '<tr><td>12 Aug 26</td><td>Solution architecture</td><td>v2.0</td><td>Approved at Architecture Council</td><td>D. van Wyk</td></tr>'+
      '<tr><td>12 Aug 26</td><td>Change control log</td><td>live</td><td>CH-006 approved · reuse notification pattern</td><td>M. Sithole</td></tr>'+
      '<tr><td>05 May 26</td><td>Project charter</td><td>v1.2</td><td>Charter approved at programme board</td><td>A. Morgan</td></tr>'+
      '<tr><td>02 Jun 26</td><td>RACI matrix</td><td>v1.0</td><td>Baseline signed off</td><td>M. Sithole</td></tr>'+
      '<tr><td>25 Jul 26</td><td>Test strategy</td><td>v1.0</td><td>Approved by test lead and PM</td><td>K. Naidu</td></tr>'+
      '</tbody></table>';
    /* Contributor breakdown */
    var contribs={'A. Morgan':2,'M. Sithole':3,'C. Els':1,'D. van Wyk':1,'K. Naidu':1};
    var stats='<div class="sx-kpis" style="grid-template-columns:repeat(4,1fr)">'+kpi('Changes (30d)','8','Across 8 documents')+kpi('Contributors',Object.keys(contribs).length.toString(),'People')+kpi('Live documents','2','Risk register · change log')+kpi('Approvals','3','This month','g')+'</div>';
    var contList=Object.keys(contribs).map(function(k){return '<div class="ppmis-statline"><span>'+esc(k)+'</span><b>'+contribs[k]+' change(s)</b></div>';}).join('');
    return stats+'<div class="ppmis-two"><div>'+card('Recent version history',body,'Traceable back to approved baseline')+'</div><div>'+card('Contributors (30d)',contList,'Change count')+card('Retention policy','<div class="ppmis-statline"><span>Live documents</span><b>Current + prior 3</b></div><div class="ppmis-statline"><span>Baselined documents</span><b>Full history</b></div><div class="ppmis-statline"><span>Archive schedule</span><b>Post project close</b></div><div class="ppmis-statline"><span>Access</span><b>Programme office</b></div>')+'</div></div>';
  }

  function go(area,view){S.area=area;if(view&&views[area].some(function(x){return x[0]===view;}))S.view=view;else S.view=views[area][0][0];render();}
  function notify(msg){S.toast=msg;render();setTimeout(function(){S.toast='';render();},2400);}
  function selectProject(id){S.project=id;render();}
  function selectRisk(id){S.selectedRisk=id;render();}
  function selectDeliverable(id){S.selectedDeliverable=id;render();}
  function openModule(id){if(typeof window.showModule==='function')window.showModule(id);}

  window.projectApp={
    go:go,
    sub:function(v){S.view=v;render();},
    selectProject:selectProject,
    selectRisk:selectRisk,
    selectDeliverable:selectDeliverable,
    notify:notify,
    openModule:openModule
  };

  function mount(){root=document.getElementById('prjRoot');if(!root)return;render();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
