(function(){
  'use strict';

  var root;
  var S={area:'overview',view:'summary',program:'PGM-0041',toast:''};

  var programs=[
    {id:'PGM-0041',name:'Service Access Programme',portfolio:'Service Modernisation',outcome:'Faster, simpler services',manager:'N. Dlamini',sponsor:'Chief Operating Officer',budget:'R486m',spent:'R251m',start:'Apr 2026',close:'Sep 2028',tranche:'Tranche 2 of 4',health:'a',projects:6,benefits:4,risks:9,description:'Coordinated set of digital, service-design and workforce projects that improve end-to-end service turnaround for high-volume services.'},
    {id:'PGM-0037',name:'Digital Foundations Programme',portfolio:'Operational Resilience',outcome:'Trusted digital channels',manager:'J. Botha',sponsor:'Chief Information Officer',budget:'R620m',spent:'R241m',start:'Jan 2026',close:'Dec 2028',tranche:'Tranche 1 of 3',health:'g',projects:5,benefits:3,risks:6,description:'Replaces the identity, integration and hosting foundations that all customer-facing services depend on.'},
    {id:'PGM-0048',name:'Information Quality Programme',portfolio:'Data & Insight',outcome:'Better use of information',manager:'M. Khan',sponsor:'Chief Data Officer',budget:'R231m',spent:'R156m',start:'Jul 2025',close:'Mar 2027',tranche:'Tranche 3 of 3',health:'r',projects:4,benefits:3,risks:8,description:'Improves the completeness and reliability of the case, customer and product data that other programmes depend on.'}
  ];

  var projectsByProgram={
    'PGM-0041':[
      {id:'PRJ-0148',name:'Digital Service Release 2',pm:'A. Morgan',stage:'Execution',start:'May 2026',end:'Feb 2027',budget:'R126m',spent:'R78m',schedule:'Amber',cost:'Green',benefit:'On track',pct:62,next:'Design authority · 22 Aug'},
      {id:'PRJ-0149',name:'Digital Service Release 3',pm:'A. Morgan',stage:'Planning',start:'Nov 2026',end:'Aug 2027',budget:'R98m',spent:'R6m',schedule:'Green',cost:'Green',benefit:'On track',pct:8,next:'Baseline · 30 Sep'},
      {id:'PRJ-0156',name:'Service Design Academy',pm:'P. Mokoena',stage:'Execution',start:'Feb 2026',end:'Dec 2026',budget:'R19m',spent:'R8m',schedule:'Green',cost:'Green',benefit:'On track',pct:47,next:'Cohort 3 · 30 Aug'},
      {id:'PRJ-0163',name:'Branch Kiosk Rollout',pm:'S. Radebe',stage:'Execution',start:'Jul 2026',end:'Apr 2027',budget:'R74m',spent:'R31m',schedule:'Amber',cost:'Amber',benefit:'At risk',pct:38,next:'Site 12 go-live · 27 Aug'},
      {id:'PRJ-0169',name:'Contact Centre Modernisation',pm:'K. Naidu',stage:'Mobilisation',start:'Sep 2026',end:'Jul 2027',budget:'R112m',spent:'R2m',schedule:'Green',cost:'Green',benefit:'On track',pct:3,next:'PMO onboarding · 05 Sep'},
      {id:'PRJ-0175',name:'Field Force Mobility',pm:'T. Zulu',stage:'Initiation',start:'Nov 2026',end:'Oct 2027',budget:'R57m',spent:'R0.4m',schedule:'Green',cost:'Green',benefit:'On track',pct:1,next:'Charter · 12 Sep'}
    ],
    'PGM-0037':[
      {id:'PRJ-0161',name:'Identity Platform Renewal',pm:'T. Nkosi',stage:'Mobilisation',start:'Jun 2026',end:'Nov 2027',budget:'R142m',spent:'R18m',schedule:'Green',cost:'Green',benefit:'On track',pct:12,next:'Gate 2 · 27 Aug'},
      {id:'PRJ-0162',name:'Integration Bus Consolidation',pm:'D. Fourie',stage:'Execution',start:'Feb 2026',end:'May 2027',budget:'R94m',spent:'R41m',schedule:'Green',cost:'Green',benefit:'On track',pct:44,next:'API cutover 4 · 09 Sep'},
      {id:'PRJ-0164',name:'Hybrid Cloud Migration',pm:'L. Peters',stage:'Execution',start:'Jan 2026',end:'Sep 2027',budget:'R168m',spent:'R110m',schedule:'Amber',cost:'Green',benefit:'On track',pct:59,next:'Workload wave 5 · 03 Sep'},
      {id:'PRJ-0170',name:'Zero-Trust Network Segmentation',pm:'S. Cele',stage:'Execution',start:'May 2026',end:'Feb 2027',budget:'R76m',spent:'R38m',schedule:'Green',cost:'Green',benefit:'On track',pct:52,next:'Segment 3 · 18 Sep'},
      {id:'PRJ-0177',name:'Observability & SRE Uplift',pm:'M. Steyn',stage:'Planning',start:'Oct 2026',end:'Jun 2027',budget:'R140m',spent:'R2m',schedule:'Green',cost:'Green',benefit:'On track',pct:2,next:'Vendor selection · 22 Sep'}
    ],
    'PGM-0048':[
      {id:'PRJ-0127',name:'Case Data Remediation',pm:'A. Patel',stage:'Execution',start:'Feb 2026',end:'Nov 2026',budget:'R54m',spent:'R41m',schedule:'Red',cost:'Amber',benefit:'At risk',pct:76,next:'Recovery plan · 20 Aug'},
      {id:'PRJ-0131',name:'Master Data Governance',pm:'R. Adams',stage:'Execution',start:'Apr 2026',end:'Apr 2027',budget:'R48m',spent:'R23m',schedule:'Amber',cost:'Green',benefit:'On track',pct:47,next:'Steward onboarding · 28 Aug'},
      {id:'PRJ-0138',name:'Customer 360 Data Model',pm:'S. Mahlangu',stage:'Execution',start:'Mar 2026',end:'Feb 2027',budget:'R71m',spent:'R44m',schedule:'Amber',cost:'Amber',benefit:'On track',pct:58,next:'Model review · 04 Sep'},
      {id:'PRJ-0144',name:'Real-time Analytics Platform',pm:'V. Reddy',stage:'Planning',start:'Sep 2026',end:'Aug 2027',budget:'R58m',spent:'R1m',schedule:'Green',cost:'Green',benefit:'On track',pct:2,next:'Vendor RFI · 18 Sep'}
    ]
  };

  var dependencies=[
    {predecessor:'Identity Platform Renewal',output:'Approved target architecture',successor:'Digital Service Release 2',by:'30 Sep 2026',owner:'Architecture lead',status:'Amber'},
    {predecessor:'Integration Bus Consolidation',output:'API v3 published',successor:'Digital Service Release 3',by:'15 Jan 2027',owner:'Integration lead',status:'Green'},
    {predecessor:'Case Data Remediation',output:'Validated customer dataset',successor:'Contact Centre Modernisation',by:'20 Feb 2027',owner:'Data programme lead',status:'Red'},
    {predecessor:'Service Design Academy',output:'12 accredited service designers',successor:'Branch Kiosk Rollout',by:'31 Oct 2026',owner:'Capability lead',status:'Green'},
    {predecessor:'Hybrid Cloud Migration · Wave 5',output:'Production workloads live',successor:'Field Force Mobility',by:'30 Nov 2026',owner:'Cloud programme lead',status:'Amber'}
  ];

  var risks=[
    {id:'RSK-114',title:'Data engineering capacity conflict in Q2',project:'Case Data Remediation',likelihood:'High',impact:'High',score:16,owner:'Programme manager',mitigation:'Sequence self-service dependency after remediation; procure two external specialists.',status:'Open'},
    {id:'RSK-118',title:'Kiosk device supply lead-time extended by 6 weeks',project:'Branch Kiosk Rollout',likelihood:'Medium',impact:'High',score:12,owner:'Procurement lead',mitigation:'Split order across two vendors; refresh site sequencing plan.',status:'Open'},
    {id:'RSK-121',title:'Cutover freeze may collide with month-end',project:'Digital Service Release 2',likelihood:'Medium',impact:'Medium',score:9,owner:'Release manager',mitigation:'Move cutover forward by seven days; confirm with Operations.',status:'Mitigating'},
    {id:'RSK-105',title:'Service Design Academy vendor concentration',project:'Service Design Academy',likelihood:'Low',impact:'High',score:8,owner:'Capability lead',mitigation:'Second-source cohort delivery from Q1 2027 onwards.',status:'Monitoring'}
  ];

  var issues=[
    {id:'ISS-088',title:'Two sites failed compliance walk-through',project:'Branch Kiosk Rollout',severity:'High',opened:'12 Aug',owner:'Site delivery lead',action:'Re-inspect and re-baseline the two sites; move rollout to Sept.',status:'Open',age:6},
    {id:'ISS-090',title:'Legacy data extract produced 4% record loss',project:'Case Data Remediation',severity:'High',opened:'09 Aug',owner:'Data lead',action:'Rerun extract using the corrected mapping table; validate with data steward.',status:'Under fix',age:9},
    {id:'ISS-092',title:'Design authority declined proposed access flow',project:'Digital Service Release 2',severity:'Medium',opened:'14 Aug',owner:'Design lead',action:'Rework flow with security lead; return to design authority on 22 Aug.',status:'Rework',age:4}
  ];

  var benefits=[
    {id:'BEN-022',name:'Reduce service fulfilment time',project:'Digital Service Release 2',owner:'Head of Service Operations',baseline:'12 days',target:'5 days',current:'7.4 days',confidence:'Green',due:'Q2 2027'},
    {id:'BEN-024',name:'Increase self-service completion',project:'Digital Service Release 2',owner:'Head of Digital Services',baseline:'42%',target:'75%',current:'58%',confidence:'Amber',due:'Q4 2027'},
    {id:'BEN-028',name:'Reduce branch queue time',project:'Branch Kiosk Rollout',owner:'Head of Retail',baseline:'32 min',target:'12 min',current:'26 min',confidence:'Amber',due:'Q2 2027'},
    {id:'BEN-033',name:'Improve accredited service designers',project:'Service Design Academy',owner:'Head of People',baseline:'6',target:'24',current:'14',confidence:'Green',due:'Q4 2026'}
  ];

  var governance=[
    {date:'22 Aug 2026',forum:'Programme Board',decision:'Approve Tranche 2 baseline for Digital Service Release 2',rationale:'Design authority has confirmed the revised access flow; capacity is available in Q3.',authority:'Programme Sponsor',status:'Scheduled'},
    {date:'27 Aug 2026',forum:'Design Authority',decision:'Identity Platform target architecture',rationale:'Reference architecture and integration contracts are ready for review.',authority:'Chief Architect',status:'Ready'},
    {date:'04 Sep 2026',forum:'Steering Committee',decision:'Rebalance R14m from deferred scope to Branch Kiosk contingency',rationale:'Two-site compliance issue and supplier lead-time extension.',authority:'Programme Sponsor',status:'Pack in draft'},
    {date:'20 Aug 2026',forum:'Executive Committee',decision:'Case Data Remediation recovery funding · R8m',rationale:'Recovery plan preserves the benefit date and unblocks two dependent projects.',authority:'Executive Committee',status:'Escalated'}
  ];

  var forumsHistory=[
    {date:'25 Jul 2026',forum:'Programme Board',decision:'Approve Cohort 3 of Service Design Academy',authority:'Programme Sponsor'},
    {date:'10 Jul 2026',forum:'Steering Committee',decision:'Extend Branch Kiosk Rollout window by one month',authority:'Programme Sponsor'},
    {date:'26 Jun 2026',forum:'Executive Committee',decision:'Approve Programme baseline (v3)',authority:'Executive Committee'}
  ];

  var financials={
    quarters:['Q1 26','Q2 26','Q3 26','Q4 26','Q1 27','Q2 27','Q3 27','Q4 27'],
    baseline:[38,68,84,72,60,54,50,60],
    actual:[41,72,86,0,0,0,0,0],
    forecast:[41,72,86,74,62,52,48,58]
  };

  var areas=[
    {id:'overview',label:'Overview'},
    {id:'projects',label:'Projects'},
    {id:'roadmap',label:'Roadmap'},
    {id:'benefits',label:'Benefits'},
    {id:'dependencies',label:'Dependencies'},
    {id:'risks',label:'Risks & Issues'},
    {id:'financials',label:'Financials'},
    {id:'governance',label:'Governance'}
  ];
  var views={
    overview:[['summary','Programme summary'],['health','Health & posture'],['workspace','Programme workspace']],
    projects:[['list','Project list'],['board','Project board'],['tranches','Tranches']],
    roadmap:[['timeline','Timeline'],['milestones','Milestones'],['releases','Release plan']],
    benefits:[['map','Benefits map'],['tracking','Tracking'],['reviews','Realisation reviews']],
    dependencies:[['register','Register'],['network','Network view']],
    risks:[['risks','Risk register'],['issues','Issue log'],['heatmap','Heatmap']],
    financials:[['summary','Financial summary'],['plan','Cost plan'],['forecast','Forecasts']],
    governance:[['forums','Forums & decisions'],['gates','Gates'],['reports','Programme reports']]
  };

  function esc(v){return String(v==null?'':v).replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c];});}
  function rag(v){var c=v==='Green'||v==='On track'?'g':v==='Red'||v==='At risk'?'r':v==='Amber'?'a':'n';return '<span class="sx-rag '+c+'"><i>●</i>'+esc(v)+'</span>';}
  function chip(v,c){return '<span class="sx-chip '+(c||'')+'">'+esc(v)+'</span>';}
  function card(title,body,sub,cls){return '<section class="sx-card '+(cls||'')+'"><div class="sx-cardh"><h3>'+title+'</h3>'+(sub?'<span class="sub">'+sub+'</span>':'')+'</div><div class="sx-cardb">'+body+'</div></section>';}
  function kpi(label,value,note,tone){return '<div class="sx-kpi '+(tone||'')+'"><span class="k">'+label+'</span><b>'+value+'</b><span class="n">'+note+'</span></div>';}
  function currentProgram(){return programs.filter(function(p){return p.id===S.program;})[0]||programs[0];}
  function programOptions(){return programs.map(function(p){return '<option value="'+p.id+'"'+(S.program===p.id?' selected':'')+'>'+esc(p.name)+'</option>';}).join('');}

  /* Small reusable visual helpers */
  function donut(segments,w){
    w=w||150;var c=w/2,r=w/2-8,total=segments.reduce(function(s,x){return s+x[1];},0)||1;var offset=-Math.PI/2;var svg='<svg viewBox="0 0 '+w+' '+w+'" width="'+w+'" height="'+w+'">';
    segments.forEach(function(seg){var f=seg[1]/total,a=f*Math.PI*2;var x1=c+r*Math.cos(offset),y1=c+r*Math.sin(offset),x2=c+r*Math.cos(offset+a),y2=c+r*Math.sin(offset+a);var big=a>Math.PI?1:0;svg+='<path d="M '+c+' '+c+' L '+x1+' '+y1+' A '+r+' '+r+' 0 '+big+' 1 '+x2+' '+y2+' Z" fill="'+seg[2]+'"/>';offset+=a;});
    svg+='<circle cx="'+c+'" cy="'+c+'" r="'+(r*0.6)+'" fill="#fff"/><text x="'+c+'" y="'+(c-2)+'" font-size="18" font-weight="800" fill="#0d315c" text-anchor="middle">'+total+'</text><text x="'+c+'" y="'+(c+14)+'" font-size="10" fill="#8a96a8" text-anchor="middle">total</text></svg>';
    return svg;
  }
  function legend(items){return '<div class="sx-actions wrap" style="gap:6px 10px;margin-top:8px">'+items.map(function(it){return '<span class="sx-chip" style="background:'+it[1]+'22;color:'+it[1]+';border-color:'+it[1]+'55"><i style="background:'+it[1]+';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px"></i>'+esc(it[0])+' <b style="margin-left:5px">'+it[2]+'</b></span>';}).join('')+'</div>';}
  function sparkline(vals,w,h,color){
    w=w||160;h=h||42;var mn=Math.min.apply(null,vals),mx=Math.max.apply(null,vals);
    var pts=vals.map(function(v,i){var x=4+i*((w-8)/(vals.length-1||1));var y=h-4-(vals.length===1?h/2:((v-mn)/(mx-mn||1))*(h-8));return x+','+y;}).join(' ');
    return '<svg viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'"><polyline points="'+pts+'" fill="none" stroke="'+(color||'#2fb4e3')+'" stroke-width="2"/><circle cx="'+pts.split(' ').pop().split(',')[0]+'" cy="'+pts.split(' ').pop().split(',')[1]+'" r="3" fill="'+(color||'#2fb4e3')+'"/></svg>';
  }
  function tinyBar(pct,color){return '<div style="height:6px;background:#eef2f7;border-radius:3px;overflow:hidden;min-width:60px"><div style="width:'+pct+'%;height:100%;background:'+(color||'#2fb4e3')+'"></div></div>';}

  function render(){
    if(!root)return;
    var h=moduleHeader()+'<div class="sx-shell">'+renderAreas()+'<div class="sx-main">'+renderSubnav()+'<main class="sx-body">'+contextBar()+renderView()+'</main></div></div>';
    if(S.toast)h+='<div class="ppmis-toast" role="status">'+esc(S.toast)+'</div>';
    root.className='sxpf-root';root.innerHTML=h;
  }
  function moduleHeader(){var p=currentProgram();return '<div class="px-modhead"><div class="px-mh-ic" style="background:linear-gradient(145deg,#5b4dbf,#7c68e8)"><i class="glyphicon glyphicon-tasks"></i></div><div class="px-mh-tt"><div class="px-mh-title">Program</div><div class="px-mh-sub">Coordinated delivery of related projects to achieve an outcome</div></div><div class="px-mh-act"><select class="sx-in" style="height:32px;min-width:280px;font-weight:700" onchange="programApp.selectProgram(this.value)">'+programOptions()+'</select><button class="px-mh-btn" onclick="programApp.notify(\'Programme dashboard opened.\')">Dashboard</button><button class="px-mh-btn" onclick="programApp.notify(\'Programme report generated from current data.\')">Reports</button></div></div>';}
  function renderAreas(){var h='<nav class="sx-areas" aria-label="Programme areas"><ul>';areas.forEach(function(a){h+='<li><button class="sx-area '+(S.area===a.id?'on':'')+'" onclick="programApp.go(\''+a.id+'\')"><span class="tx">'+a.label+'</span></button></li>';});h+='</ul></nav>';return h;}
  function renderSubnav(){var h='<nav class="sx-subnav"><div class="sx-subnav-in">';views[S.area].forEach(function(v){h+='<button class="sx-sub '+(S.view===v[0]?'on':'')+'" onclick="programApp.sub(\''+v[0]+'\')">'+v[1]+'</button>';});return h+'</div></nav>';}
  function contextBar(){var p=currentProgram();var name=views[S.area].filter(function(x){return x[0]===S.view;})[0];return '<div class="ppmis-context"><div class="ppmis-context-main"><i>PG</i><div><b>'+esc(p.name)+'</b><span>'+esc(p.id)+' · Portfolio: '+esc(p.portfolio)+' · Manager: '+esc(p.manager)+' · '+esc(p.tranche)+'</span></div></div><div class="ppmis-context-path">Portfolio &nbsp;›&nbsp; '+esc(p.portfolio)+' &nbsp;›&nbsp; <strong>'+esc(name?name[1]:'Overview')+'</strong></div></div>';}

  function renderView(){
    if(S.area==='overview')return overviewView();
    if(S.area==='projects')return projectsView();
    if(S.area==='roadmap')return roadmapView();
    if(S.area==='benefits')return benefitsView();
    if(S.area==='dependencies')return dependenciesView();
    if(S.area==='risks')return risksView();
    if(S.area==='financials')return financialsView();
    return governanceView();
  }

  /* ============== OVERVIEW ============== */
  function overviewView(){
    if(S.view==='health')return healthView();
    if(S.view==='workspace')return workspaceView();
    var p=currentProgram();
    var kpis='<div class="sx-kpis">'+kpi('Programme budget',p.budget,'Approved · '+p.tranche)+kpi('Spent to date',p.spent,'52% of approved')+kpi('Projects',p.projects.toString(),'In flight')+kpi('Benefits',p.benefits.toString(),'Being tracked','g')+kpi('Open risks',p.risks.toString(),'2 above tolerance','a')+kpi('Next decision','22 Aug','Programme Board')+'</div>';
    var about='<div class="sx-def"><span>Purpose</span><b>'+esc(p.description)+'</b></div><div class="sx-def"><span>Outcome contribution</span><b>'+esc(p.outcome)+'</b></div><div class="sx-def"><span>Sponsor</span><b>'+esc(p.sponsor)+'</b></div><div class="sx-def"><span>Programme manager</span><b>'+esc(p.manager)+'</b></div><div class="sx-def"><span>Window</span><b>'+esc(p.start)+' – '+esc(p.close)+'</b></div>';
    var focus='<table class="sx-t"><thead><tr><th>What needs attention</th><th>Where</th><th>Why</th><th>Due</th></tr></thead><tbody>'+
      '<tr><td><b>Design authority decision</b></td><td>Digital Service Release 2</td><td>Access flow rework must be signed off before baseline</td><td>22 Aug</td></tr>'+
      '<tr><td><b>Recovery decision</b></td><td>Case Data Remediation</td><td>Milestone 31 days late; benefit date at risk</td><td>20 Aug</td></tr>'+
      '<tr><td><b>Supplier lead-time</b></td><td>Branch Kiosk Rollout</td><td>Kiosk devices delayed by six weeks</td><td>27 Aug</td></tr>'+
      '</tbody></table>';
    var tranches='<div class="ppmis-stagebar"><div class="ppmis-stage done"><b>Tranche 1</b><span>Foundations · Closed</span></div><div class="ppmis-stage on"><b>Tranche 2</b><span>Digital release · In flight</span></div><div class="ppmis-stage"><b>Tranche 3</b><span>Branch & mobility · Q1 27</span></div><div class="ppmis-stage"><b>Tranche 4</b><span>Optimisation · Q3 27</span></div></div>';
    return kpis+card('Programme tranches',tranches,'Delivery is grouped into tranches so benefits can be realised progressively')+'<div class="ppmis-two"><div>'+card('About this programme',about,'Approved baseline · '+p.tranche)+card('Attention this week',focus,'Owner: '+esc(p.manager))+'</div><div>'+card('Programme posture','<div class="ppmis-statline"><span>Schedule health</span><b>'+rag('Amber')+'</b></div><div class="ppmis-statline"><span>Cost health</span><b>'+rag('Green')+'</b></div><div class="ppmis-statline"><span>Benefit confidence</span><b>'+rag('Amber')+'</b></div><div class="ppmis-statline"><span>Capacity pressure</span><b class="a">Data engineering</b></div><div class="ppmis-statline"><span>Assurance rating</span><b>Amber / Green</b></div><div class="ppmis-statline"><span>Last board</span><b>25 Jul 2026</b></div>','Current period')+card('Sponsor message','<p style="margin:0;color:#43505f;font-size:12.5px;line-height:1.55">The programme has recovered its schedule position after the Q2 architecture reset. The two remaining exposures are supplier lead-time for kiosk devices and the case data recovery, both being managed through the next board.</p><div class="sx-actions"><button class="sx-btn primary" onclick="programApp.go(\'governance\',\'forums\')">Open governance</button></div>')+'</div></div>';
  }
  function healthView(){
    var dims=[
      ['Schedule','Amber','Improving','2 of 6 projects behind plan','Recovery plan for PRJ-0127; baseline reset for PRJ-0163',65],
      ['Cost','Green','Stable','Within tolerance across all projects','Continue quarterly forecast reviews',85],
      ['Scope','Green','Stable','4 change requests approved this tranche','None',88],
      ['Benefits','Amber','Deteriorating','BEN-024 lagging target','Increase adoption effort in branches',60],
      ['Resources','Amber','Stable','Data engineering over capacity','External sourcing plan submitted',62],
      ['Risk','Amber','Improving','2 red risks · 4 amber','Escalate RSK-114 to portfolio',58],
      ['Assurance','Green','Stable','Internal audit review closed with 2 findings','Actions on track',82]
    ];
    var body='<table class="sx-t"><thead><tr><th>Dimension</th><th>Score</th><th>Trend</th><th>Signal</th><th>Action</th></tr></thead><tbody>'+
      dims.map(function(d){return '<tr><td><b>'+esc(d[0])+'</b></td><td>'+rag(d[1])+'</td><td>'+esc(d[2])+'</td><td>'+esc(d[3])+'</td><td>'+esc(d[4])+'</td></tr>';}).join('')+
      '</tbody></table>';
    /* Composite health score gauge */
    var avg=Math.round(dims.reduce(function(s,d){return s+d[5];},0)/dims.length);
    var gauge='<svg viewBox="0 0 180 110" width="180" height="110"><path d="M 20 100 A 70 70 0 0 1 160 100" fill="none" stroke="#eef2f7" stroke-width="14"/><path d="M 20 100 A 70 70 0 0 1 '+(20+140*avg/100)+' '+(100-Math.sin(Math.PI*avg/100)*70)+'" fill="none" stroke="#f6b916" stroke-width="14"/><text x="90" y="82" font-size="30" font-weight="800" fill="#0d315c" text-anchor="middle">'+avg+'</text><text x="90" y="102" font-size="10" fill="#8a96a8" text-anchor="middle">composite health</text></svg>';
    var trend=[68,66,64,64,65,63,64,66];
    var trendSvg=sparkline(trend,200,60,'#2fb4e3');
    var side='<div style="text-align:center;padding:6px 0">'+gauge+'</div><div class="sx-def"><span>Composite score</span><b>'+avg+' / 100</b></div><div class="sx-def"><span>Trend (8 periods)</span><b>+2 pts</b></div><div style="text-align:center;padding-top:4px">'+trendSvg+'</div><div class="sx-def"><span>Green dimensions</span><b>3 of 7</b></div><div class="sx-def"><span>Amber dimensions</span><b>4 of 7</b></div><div class="sx-def"><span>Red dimensions</span><b>0 of 7</b></div>';
    var confidence='<div class="ppmis-statline"><span>Team pulse (n=42)</span><b>4.0 / 5</b></div><div class="ppmis-statline"><span>Sponsor engagement</span><b>Weekly</b></div><div class="ppmis-statline"><span>Independent assurance</span><b>Amber / Green</b></div><div class="ppmis-statline"><span>Audit findings open</span><b>0</b></div><div class="ppmis-statline"><span>Change control cadence</span><b>On plan</b></div>';
    return '<div class="ppmis-two"><div>'+card('Programme health posture',body,'Health rolls up from underlying project reporting and governance evidence')+card('Delivery confidence signals',confidence,'Beyond the RAG picture')+'</div><div>'+card('Composite health',side,'Weighted across seven dimensions')+card('Rating movement','<div class="ppmis-statline"><span>28 Jul</span><b>63 · Amber</b></div><div class="ppmis-statline"><span>04 Aug</span><b>64 · Amber</b></div><div class="ppmis-statline"><span>11 Aug</span><b>65 · Amber</b></div><div class="ppmis-statline"><span>18 Aug</span><b>'+avg+' · Amber</b></div>','Weekly rating')+'</div></div>';
  }
  function workspaceView(){
    var mywork='<table class="sx-t"><thead><tr><th>Task</th><th>Type</th><th>Related</th><th>Due</th><th></th></tr></thead><tbody>'+
      '<tr><td><b>Sign off Tranche 2 baseline</b></td><td>Decision</td><td>PRJ-0148</td><td>22 Aug</td><td><button class="sx-btn primary sm" onclick="programApp.notify(\'Baseline pack opened.\')">Open</button></td></tr>'+
      '<tr><td><b>Review Case Data recovery plan</b></td><td>Assurance</td><td>PRJ-0127</td><td>20 Aug</td><td><button class="sx-btn sm" onclick="programApp.notify(\'Recovery plan opened.\')">Open</button></td></tr>'+
      '<tr><td><b>Approve external data engineering sourcing</b></td><td>Resource</td><td>CAP-DATA</td><td>18 Aug</td><td><button class="sx-btn sm" onclick="programApp.notify(\'Sourcing note opened.\')">Open</button></td></tr>'+
      '<tr><td><b>Sponsor update</b></td><td>Communication</td><td>Programme Board</td><td>19 Aug</td><td><button class="sx-btn sm" onclick="programApp.notify(\'Sponsor update draft opened.\')">Open</button></td></tr>'+
      '<tr><td><b>Prepare Portfolio decision pack</b></td><td>Decision</td><td>WR-1042</td><td>21 Aug</td><td><button class="sx-btn sm" onclick="programApp.notify(\'Pack opened.\')">Open</button></td></tr>'+
      '</tbody></table>';
    var activity='<ul class="sx-list" style="margin:0"><li><b>14 Aug</b> — Design authority declined access flow; rework requested by 22 Aug.</li><li><b>13 Aug</b> — Two branch sites failed compliance walk-through.</li><li><b>12 Aug</b> — Cohort 3 of Service Design Academy graduated 8 designers.</li><li><b>10 Aug</b> — Executive Committee escalated Case Data Remediation recovery decision.</li><li><b>08 Aug</b> — Integration Bus cutover 3 completed with zero incidents.</li><li><b>05 Aug</b> — Portfolio approved rebalancing of R14m to Branch Kiosk contingency.</li></ul>';
    var week='<div class="sx-audit">'+
      '<div class="row"><b>Mon 18 Aug</b><span class="w">Sourcing sign-off · Team stand-up</span></div>'+
      '<div class="row"><b>Tue 19 Aug</b><span class="w">Sponsor 1:1 · Communications draft</span></div>'+
      '<div class="row"><b>Wed 20 Aug</b><span class="w">Case Data recovery review · Exec Committee</span></div>'+
      '<div class="row"><b>Thu 21 Aug</b><span class="w">Portfolio decision pack finalisation</span></div>'+
      '<div class="row"><b>Fri 22 Aug</b><span class="w">Programme Board · Design authority</span></div>'+
      '</div>';
    return '<div class="ppmis-two"><div>'+card('Programme manager work list',mywork,'Decisions, assurance and coordination actions')+card('Recent activity',activity,'Past 7 days')+'</div><div>'+card('Week ahead',week,'Programme manager calendar')+card('Communication cadence','<div class="ppmis-statline"><span>Sponsor 1:1</span><b>Weekly · Tue 08:00</b></div><div class="ppmis-statline"><span>Programme Board</span><b>Monthly · 4th Fri</b></div><div class="ppmis-statline"><span>Portfolio update</span><b>Monthly</b></div><div class="ppmis-statline"><span>Team stand-up</span><b>Mon, Wed, Fri</b></div><div class="ppmis-statline"><span>All-hands</span><b>Fortnightly</b></div>','Rhythm of engagement')+'</div></div>';
  }

  /* ============== PROJECTS ============== */
  function projectsView(){
    var list=projectsByProgram[S.program]||[];
    if(S.view==='board')return projectsBoard(list);
    if(S.view==='tranches')return tranchesView();
    var rows=list.map(function(p){return '<tr><td><button class="ppmis-link" onclick="programApp.openProject(\''+p.id+'\')">'+esc(p.name)+'</button><span class="mut">'+esc(p.id)+' · PM: '+esc(p.pm)+'</span></td><td>'+chip(p.stage,'stage')+'</td><td>'+esc(p.start)+' – '+esc(p.end)+'</td><td>'+esc(p.budget)+'<span class="mut">Spent '+esc(p.spent)+'</span></td><td><div class="ppmis-meter"><i class="'+(p.pct>80?'good':p.pct>40?'':'mid')+'" style="width:'+p.pct+'%"></i></div><span class="mut" style="font-size:10.5px">'+p.pct+'% complete</span></td><td>'+rag(p.schedule)+'</td><td>'+rag(p.cost)+'</td><td>'+rag(p.benefit)+'</td><td>'+esc(p.next)+'</td></tr>';}).join('');
    var counts={g:0,a:0,r:0};list.forEach(function(p){var k=p.schedule==='Green'?'g':p.schedule==='Amber'?'a':'r';counts[k]++;});
    var totalBudget=list.reduce(function(s,p){return s+parseInt(p.budget.replace(/[^0-9]/g,''));},0);
    var totalSpent=list.reduce(function(s,p){return s+parseFloat(p.spent.replace(/[^0-9.]/g,''));},0);
    var kpis='<div class="sx-kpis">'+kpi('Projects',list.length.toString(),'In flight')+kpi('Total budget','R'+totalBudget+'m','Rolled up')+kpi('Spent',Math.round(totalSpent)+'m','R units')+kpi('Green schedule',counts.g.toString(),'On plan','g')+kpi('Amber schedule',counts.a.toString(),'Behind plan','a')+kpi('Red schedule',counts.r.toString(),'Intervention',counts.r?'r':'g')+'</div>';
    var attention='<div class="ppmis-statline"><span>Next design authority</span><b>22 Aug · PRJ-0148</b></div><div class="ppmis-statline"><span>Next gate</span><b>27 Aug · PRJ-0161</b></div><div class="ppmis-statline"><span>Recovery in progress</span><b>PRJ-0127</b></div><div class="ppmis-statline"><span>Awaiting resource</span><b>PRJ-0175 · Field Force</b></div><div class="ppmis-statline"><span>Fastest progress</span><b>PRJ-0148 · +12%</b></div>';
    return kpis+'<div class="ppmis-two"><div>'+card('Projects in this programme','<div class="sx-scroll"><table class="sx-t"><thead><tr><th>Project</th><th>Stage</th><th>Window</th><th>Budget</th><th>Progress</th><th>Schedule</th><th>Cost</th><th>Benefit</th><th>Next control</th></tr></thead><tbody>'+rows+'</tbody></table></div><div class="sx-actions"><button class="sx-btn primary" onclick="programApp.openModule(\'project\')">Open Project module</button><button class="sx-btn" onclick="programApp.notify(\'Programme status refreshed from latest approved project updates.\')">Refresh from project updates</button></div>',list.length+' projects · rolled up into programme reporting')+'</div><div>'+card('Where the programme needs attention',attention,'This week')+card('Delivery mix','<div style="text-align:center;padding:6px 0">'+donut([['Execution',list.filter(function(p){return p.stage==='Execution';}).length,'#2fb4e3'],['Planning',list.filter(function(p){return p.stage==='Planning';}).length,'#8a7dff'],['Mobilisation',list.filter(function(p){return p.stage==='Mobilisation';}).length,'#f6b916'],['Initiation',list.filter(function(p){return p.stage==='Initiation';}).length,'#29c152']],150)+'</div>'+legend([['Execution','#2fb4e3',list.filter(function(p){return p.stage==='Execution';}).length],['Planning','#8a7dff',list.filter(function(p){return p.stage==='Planning';}).length],['Mobilisation','#f6b916',list.filter(function(p){return p.stage==='Mobilisation';}).length],['Initiation','#29c152',list.filter(function(p){return p.stage==='Initiation';}).length]]),'By stage')+'</div></div>';
  }
  function projectsBoard(list){
    var stages={'Initiation':[],'Planning':[],'Mobilisation':[],'Execution':[]};
    list.forEach(function(p){if(stages[p.stage])stages[p.stage].push(p);});
    var lanes='<div class="ppmis-board">';
    Object.keys(stages).forEach(function(st){lanes+='<section class="ppmis-lane"><h4>'+st+' <span>'+stages[st].length+'</span></h4>';stages[st].forEach(function(p){lanes+='<article><b>'+esc(p.name)+'</b><small>'+esc(p.id)+' · '+esc(p.pm)+'</small>'+chip(p.schedule,p.schedule==='Green'?'g':p.schedule==='Amber'?'a':'r')+' <span class="mut" style="font-size:10px">'+p.pct+'% · '+esc(p.budget)+'</span></article>';});lanes+='</section>';});
    lanes+='</div>';
    var counts={};list.forEach(function(p){counts[p.stage]=(counts[p.stage]||0)+1;});
    var strip='<div class="sx-kpis">'+kpi('Initiation',(counts['Initiation']||0).toString(),'Charter, mandate')+kpi('Planning',(counts['Planning']||0).toString(),'Baseline in preparation')+kpi('Mobilisation',(counts['Mobilisation']||0).toString(),'Onboarding, environments')+kpi('Execution',(counts['Execution']||0).toString(),'Delivering','g')+'</div>';
    return strip+card('Project board',lanes,'Project workflow across programme delivery stages')+card('Flow signals','<div class="ppmis-three"><div><h4>Cycle time</h4><p>Median stage duration is 11 weeks; Digital Foundations project pods complete Execution in ~24 weeks.</p></div><div><h4>Throughput</h4><p>2 projects moved between stages this month (Contact Centre → Mobilisation, Cohort 2 → Complete).</p></div><div><h4>Blocked</h4><p>1 project blocked pending resource allocation (Field Force). Escalated to resource manager.</p></div></div>');
  }
  function tranchesView(){
    var t='<table class="sx-t"><thead><tr><th>Tranche</th><th>Period</th><th>Focus</th><th>Projects</th><th>Benefits realised</th><th>Status</th></tr></thead><tbody>'+
      '<tr><td><b>Tranche 1 · Foundations</b></td><td>Apr 2026 – Sep 2026</td><td>Common capability, service design uplift</td><td>2</td><td>Adoption baseline established</td><td>'+chip('Closed','g')+'</td></tr>'+
      '<tr><td><b>Tranche 2 · Digital release</b></td><td>Oct 2026 – Jun 2027</td><td>Digital Service Release 2 + kiosk pilot</td><td>3</td><td>Turnaround time and branch queue</td><td>'+chip('In flight','stage')+'</td></tr>'+
      '<tr><td><b>Tranche 3 · Branch & mobility</b></td><td>Jul 2027 – Feb 2028</td><td>Contact centre and field-force enablement</td><td>2</td><td>Channel efficiency and field productivity</td><td>'+chip('Planned','')+'</td></tr>'+
      '<tr><td><b>Tranche 4 · Optimisation</b></td><td>Mar 2028 – Sep 2028</td><td>Digital Service Release 3 and analytics adoption</td><td>2</td><td>Volume shift and satisfaction</td><td>'+chip('Planned','')+'</td></tr>'+
      '</tbody></table>';
    var invest='<div class="ppmis-statline"><span>Tranche 1 (closed)</span><b>R74m · realised R7m benefit</b></div><div class="ppmis-statline"><span>Tranche 2 (active)</span><b>R187m · R42m realised</b></div><div class="ppmis-statline"><span>Tranche 3 (planned)</span><b>R169m · R98m expected</b></div><div class="ppmis-statline"><span>Tranche 4 (planned)</span><b>R56m · R74m expected</b></div>';
    var benefitCurve='<svg viewBox="0 0 340 160" width="100%" height="160" style="background:#fff"><line x1="30" y1="20" x2="30" y2="130" stroke="#cfd8e1"/><line x1="30" y1="130" x2="320" y2="130" stroke="#cfd8e1"/>'+
      '<rect x="50" y="115" width="42" height="15" fill="#29c15288"/><rect x="120" y="70" width="42" height="60" fill="#2fb4e388"/><rect x="190" y="35" width="42" height="95" fill="#8a7dff44"/><rect x="260" y="12" width="42" height="118" fill="#f6b91644"/>'+
      '<text x="71" y="150" font-size="10" fill="#43505f" text-anchor="middle">T1</text><text x="141" y="150" font-size="10" fill="#43505f" text-anchor="middle">T2</text><text x="211" y="150" font-size="10" fill="#43505f" text-anchor="middle">T3</text><text x="281" y="150" font-size="10" fill="#43505f" text-anchor="middle">T4</text>'+
      '<text x="71" y="110" font-size="10" fill="#0d315c" text-anchor="middle" font-weight="700">R7m</text><text x="141" y="65" font-size="10" fill="#0d315c" text-anchor="middle" font-weight="700">R42m</text><text x="211" y="30" font-size="10" fill="#0d315c" text-anchor="middle" font-weight="700">R98m</text><text x="281" y="7" font-size="10" fill="#0d315c" text-anchor="middle" font-weight="700">R74m</text>'+
      '<text x="12" y="24" font-size="9" fill="#8a96a8">R100m</text><text x="16" y="132" font-size="9" fill="#8a96a8">0</text></svg>';
    return '<div class="ppmis-two"><div>'+card('Programme tranches',t,'Tranches group delivery so benefits are realised progressively rather than at the end')+card('Investment by tranche',invest,'Baseline v3 · approved 26 Jun 2026')+'</div><div>'+card('Benefit realisation curve',benefitCurve,'Cumulative expected benefit per tranche')+card('Tranche gate criteria','<ul class="sx-list" style="margin:0"><li>Capability delivered and accepted by operational owner</li><li>Adoption metric achieved (per tranche threshold)</li><li>Benefit measurement in place and baselined</li><li>Assurance rating Green or Amber</li><li>Sponsor confirms next tranche readiness</li></ul>')+'</div></div>';
  }

  /* ============== ROADMAP ============== */
  function roadmapView(){
    if(S.view==='milestones')return milestonesView();
    if(S.view==='releases')return releasesView();
    var list=projectsByProgram[S.program]||[];
    var quarters=['Q1 26','Q2 26','Q3 26','Q4 26','Q1 27','Q2 27','Q3 27','Q4 27'];
    var h='<div class="ppmis-roadmap"><div class="head">Project / period</div>';
    quarters.forEach(function(q){h+='<div class="head">'+q+'</div>';});
    function startCol(dateStr){
      var map={'Jan':0,'Feb':0,'Mar':0,'Apr':1,'May':1,'Jun':1,'Jul':2,'Aug':2,'Sep':2,'Oct':3,'Nov':3,'Dec':3};
      var m=dateStr.split(' ')[0],y=dateStr.split(' ')[1];
      var col=map[m]+(y==='2027'?4:0);return col;
    }
    list.forEach(function(p){
      var s=startCol(p.start),e=startCol(p.end),span=Math.max(1,e-s+1);
      h+='<div class="name">'+esc(p.name)+'<span class="mut" style="font-size:9.5px;font-weight:400">'+esc(p.id)+'</span></div>';
      for(var i=0;i<8;i++){
        if(i===s){h+='<div class="bar project" style="grid-column:span '+span+'">'+esc(p.stage)+' · '+p.pct+'%</div>';i+=span-1;}
        else h+='<div class="blank"></div>';
      }
    });
    h+='</div>';
    return card('Programme roadmap',h,'Project sequencing across the programme window')+'<div class="ppmis-two"><div>'+card('Key programme milestones','<div class="sx-audit"><div class="row"><b>Design authority · Access flow</b><span class="w">22 Aug 2026 · Digital Service Release 2</span></div><div class="row"><b>Gate 2 · Identity Platform</b><span class="w">27 Aug 2026 · Programme dependency</span></div><div class="row"><b>Kiosk go-live · Site 12</b><span class="w">27 Aug 2026 · Branch Kiosk Rollout</span></div><div class="row"><b>Tranche 2 baseline</b><span class="w">30 Sep 2026 · Programme</span></div><div class="row"><b>Case Data cutover</b><span class="w">30 Nov 2026 · Dependency</span></div><div class="row"><b>Tranche 2 close</b><span class="w">30 Jun 2027 · Programme</span></div></div>')+'</div><div>'+card('Roadmap constraints','<div class="sx-note warn">Digital Service Release 3 cannot start baseline before the Identity Platform architecture gate on 27 Aug 2026. If the gate moves, Release 3 mobilisation moves with it.</div><div class="sx-note">Branch Kiosk Rollout depends on Cohort 2 of the Service Design Academy (accredited designers by 30 Sep 2026).</div>')+'</div></div>';
  }
  function milestonesView(){
    var body='<table class="sx-t"><thead><tr><th>Milestone</th><th>Project</th><th>Type</th><th>Planned</th><th>Forecast</th><th>Variance</th><th>Status</th></tr></thead><tbody>'+
      '<tr><td><b>Access flow decision</b></td><td>Digital Service Release 2</td><td>Design authority</td><td>22 Aug 2026</td><td>22 Aug 2026</td><td>—</td><td>'+rag('Amber')+'</td></tr>'+
      '<tr><td><b>Gate 2 · Identity</b></td><td>Identity Platform Renewal</td><td>Programme gate</td><td>27 Aug 2026</td><td>27 Aug 2026</td><td>—</td><td>'+rag('Green')+'</td></tr>'+
      '<tr><td><b>Kiosk go-live · Site 12</b></td><td>Branch Kiosk Rollout</td><td>Delivery milestone</td><td>27 Aug 2026</td><td>03 Sep 2026</td><td class="a">+7d</td><td>'+rag('Amber')+'</td></tr>'+
      '<tr><td><b>Case data cutover</b></td><td>Case Data Remediation</td><td>Cutover</td><td>15 Oct 2026</td><td>30 Nov 2026</td><td class="r">+46d</td><td>'+rag('Red')+'</td></tr>'+
      '<tr><td><b>Tranche 2 baseline</b></td><td>Programme</td><td>Programme milestone</td><td>30 Sep 2026</td><td>30 Sep 2026</td><td>—</td><td>'+rag('Green')+'</td></tr>'+
      '<tr><td><b>Release 2 pilot</b></td><td>Digital Service Release 2</td><td>Release</td><td>28 Feb 2027</td><td>15 Mar 2027</td><td class="a">+15d</td><td>'+rag('Amber')+'</td></tr>'+
      '</tbody></table>';
    var timeline='<svg viewBox="0 0 340 220" width="100%" height="220" style="background:#fff">'+
      '<line x1="20" y1="200" x2="330" y2="200" stroke="#cfd8e1"/>'+
      ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'].map(function(m,i){var x=30+i*40;return '<line x1="'+x+'" y1="196" x2="'+x+'" y2="204" stroke="#cfd8e1"/><text x="'+x+'" y="215" font-size="9" fill="#8a96a8" text-anchor="middle">'+m+'</text>';}).join('')+
      /* milestones */
      '<circle cx="35" cy="200" r="6" fill="#f6b916"/><text x="35" y="185" font-size="9" fill="#43505f" text-anchor="middle">Access</text>'+
      '<circle cx="45" cy="200" r="6" fill="#29c152"/><text x="55" y="170" font-size="9" fill="#43505f" text-anchor="middle">Gate 2</text>'+
      '<circle cx="60" cy="200" r="6" fill="#f6b916"/><text x="72" y="155" font-size="9" fill="#43505f" text-anchor="middle">Kiosk</text>'+
      '<circle cx="130" cy="200" r="6" fill="#e84c3d"/><text x="130" y="185" font-size="9" fill="#43505f" text-anchor="middle">Cutover</text>'+
      '<circle cx="90" cy="200" r="6" fill="#29c152"/><text x="102" y="140" font-size="9" fill="#43505f" text-anchor="middle">T2 baseline</text>'+
      '<circle cx="260" cy="200" r="6" fill="#f6b916"/><text x="260" y="185" font-size="9" fill="#43505f" text-anchor="middle">Pilot</text>'+
      '</svg>';
    var stats='<div class="sx-kpis" style="grid-template-columns:repeat(3,1fr)">'+kpi('Total milestones','6','This tranche')+kpi('On track','2','Green','g')+kpi('At risk / slipped','4','Amber+Red','a')+'</div>';
    return card('Programme milestones',body,'Milestone slippage is analysed for benefit and dependency impact before rebaseline')+'<div class="ppmis-two"><div>'+card('Milestone timeline',timeline,'Next six months')+'</div><div>'+card('Position',stats,'This tranche')+card('Slippage causes','<ul class="sx-list" style="margin:0"><li>Case data cutover: extract quality issue triggered a re-run and validation cycle.</li><li>Kiosk site 12: two additional compliance walk-throughs required.</li><li>Release 2 pilot: knock-on effect of the Q3 architecture reset.</li></ul>')+'</div></div>';
  }
  function releasesView(){
    var body='<table class="sx-t"><thead><tr><th>Release</th><th>Scope</th><th>Owner</th><th>Planned</th><th>Cutover window</th><th>Status</th></tr></thead><tbody>'+
      '<tr><td><b>Release 2 · Digital services</b></td><td>Self-service refresh, digital forms, notification centre</td><td>Digital Service Release 2</td><td>28 Feb 2027</td><td>Mar 2027 weekend 2</td><td>'+chip('On track','g')+'</td></tr>'+
      '<tr><td><b>Kiosk wave 1</b></td><td>12 branches</td><td>Branch Kiosk Rollout</td><td>03 Sep 2026</td><td>Weeknights</td><td>'+chip('At risk','a')+'</td></tr>'+
      '<tr><td><b>Cohort 3 · Service Design Academy</b></td><td>8 accredited designers</td><td>Service Design Academy</td><td>30 Aug 2026</td><td>—</td><td>'+chip('Ready','g')+'</td></tr>'+
      '<tr><td><b>Data cutover · Customer 360</b></td><td>Case data re-extract and validation</td><td>Case Data Remediation</td><td>30 Nov 2026</td><td>Nov 2026 weekend 4</td><td>'+chip('Rescheduled','a')+'</td></tr>'+
      '<tr><td><b>Kiosk wave 2</b></td><td>10 branches</td><td>Branch Kiosk Rollout</td><td>15 Nov 2026</td><td>Weeknights</td><td>'+chip('Planned','')+'</td></tr>'+
      '</tbody></table>';
    var calendar='<div class="sx-audit">'+
      '<div class="row"><b>Aug 2026</b><span class="w">Cohort 3 · Kiosk site 12</span></div>'+
      '<div class="row"><b>Sep 2026</b><span class="w">Kiosk wave 1 close · Cohort 4 start</span></div>'+
      '<div class="row"><b>Nov 2026</b><span class="w">Data cutover · Kiosk wave 2</span></div>'+
      '<div class="row"><b>Feb 2027</b><span class="w">Release 2 · Cohort 5 accreditation</span></div>'+
      '<div class="row"><b>Mar 2027</b><span class="w">Release 2 cutover · Weekend 2</span></div>'+
      '</div>';
    var readiness='<div class="ppmis-statline"><span>Environments</span><b>Ready · staged</b></div><div class="ppmis-statline"><span>Change advisory board</span><b>Aligned</b></div><div class="ppmis-statline"><span>Rollback plans</span><b>Signed off · 3 of 5</b></div><div class="ppmis-statline"><span>Comms plan</span><b>Approved</b></div><div class="ppmis-statline"><span>Hypercare cover</span><b>2 weeks per release</b></div>';
    return '<div class="ppmis-two"><div>'+card('Release plan',body,'Coordinated cutover windows across projects')+card('Release readiness signals',readiness,'Across all planned releases')+'</div><div>'+card('Release calendar',calendar,'Next 8 months')+card('Cutover governance','<p style="margin:0;color:#43505f;font-size:12.5px;line-height:1.55">Every cutover follows the standard programme release governance: dress rehearsal, go/no-go, hypercare handover to Operations, and a formal release close-out. The programme office coordinates conflicting windows.</p>')+'</div></div>';
  }

  /* ============== BENEFITS ============== */
  function benefitsView(){
    if(S.view==='tracking')return benefitsTracking();
    if(S.view==='reviews')return benefitsReviews();
    var b='<div class="ppmis-benefit head"><span>Benefit</span><span>Baseline</span><span>Target</span><span>Current</span><span>Confidence</span></div>';
    benefits.forEach(function(x){b+='<div class="ppmis-benefit"><b>'+esc(x.name)+'<span class="mut">'+esc(x.id)+' · '+esc(x.project)+' · '+esc(x.owner)+'</span></b><span>'+esc(x.baseline)+'</span><span>'+esc(x.target)+'</span><span>'+esc(x.current)+'</span>'+rag(x.confidence)+'</div>';});
    var contribChart='<svg viewBox="0 0 340 180" width="100%" height="180"><line x1="30" y1="20" x2="30" y2="150" stroke="#cfd8e1"/><line x1="30" y1="150" x2="330" y2="150" stroke="#cfd8e1"/>'+
      [['BEN-022',75,'#2fb4e3'],['BEN-024',60,'#f6b916'],['BEN-028',48,'#8a7dff'],['BEN-033',72,'#29c152']].map(function(b,i){var x=60+i*70;var h=b[1]*1.2;return '<rect x="'+(x-15)+'" y="'+(150-h)+'" width="30" height="'+h+'" fill="'+b[2]+'"/><text x="'+x+'" y="165" font-size="9" fill="#43505f" text-anchor="middle">'+b[0]+'</text><text x="'+x+'" y="'+(148-h)+'" font-size="10" font-weight="700" fill="#0d315c" text-anchor="middle">'+b[1]+'%</text>';}).join('')+
      '</svg>';
    return card('Programme benefits map',b,'Benefits align to the programme outcome and are owned by operational leaders')+'<div class="ppmis-two"><div>'+card('How benefits combine','<div class="ppmis-three"><div><h4>Contribution</h4><p>Each project delivers capability that combines with others; benefits are measured at programme level.</p></div><div><h4>Ownership</h4><p>The programme manager coordinates; benefit ownership sits with the operational leader accountable for the outcome.</p></div><div><h4>Realisation</h4><p>Benefits continue to be tracked after project closure, through tranche reviews.</p></div></div>')+'</div><div>'+card('Progress towards target',contribChart,'% of target achieved · current period')+'</div></div>';
  }
  function benefitsTracking(){
    var quarters=['Q1 26','Q2 26','Q3 26','Q4 26','Q1 27','Q2 27','Q3 27','Q4 27'];
    var data={'BEN-022':[12,11.4,10.6,9.3,8.1,7.4,6.6,5.5],'BEN-024':[42,45,49,53,56,58,63,68],'BEN-028':[32,31,30,29,28,26,22,17],'BEN-033':[6,7,9,11,12,14,18,22]};
    var svg='<svg viewBox="0 0 640 220" width="100%" style="border:1px solid #edf1f5;background:#fff"><rect x="0" y="0" width="640" height="220" fill="#fbfcfe"/>';
    for(var i=0;i<5;i++){var y=30+i*35;svg+='<line x1="55" y1="'+y+'" x2="620" y2="'+y+'" stroke="#eef2f7"/>';}
    quarters.forEach(function(q,i){var x=60+i*72;svg+='<text x="'+x+'" y="215" font-size="10" fill="#8a96a8" text-anchor="middle">'+q+'</text>';});
    var series=[['BEN-022','#2fb4e3'],['BEN-024','#f6b916'],['BEN-028','#8a7dff'],['BEN-033','#29c152']];
    series.forEach(function(s){
      var vals=data[s[0]];var max=Math.max.apply(null,vals),min=Math.min.apply(null,vals);
      var pts=vals.map(function(v,i){var x=60+i*72,y=30+150*(1-(v-min)/(max-min||1));return x+','+y;}).join(' ');
      svg+='<polyline points="'+pts+'" fill="none" stroke="'+s[1]+'" stroke-width="2.4"/>';
      vals.forEach(function(v,i){var x=60+i*72,y=30+150*(1-(v-min)/(max-min||1));svg+='<circle cx="'+x+'" cy="'+y+'" r="3" fill="'+s[1]+'"/>';});
    });
    svg+='</svg>';
    var leg='<div class="sx-actions wrap" style="margin-top:6px">';series.forEach(function(s){var b=benefits.filter(function(x){return x.id===s[0];})[0];if(b)leg+='<span class="sx-chip" style="background:'+s[1]+'22;color:'+s[1]+';border-color:'+s[1]+'55"><i style="background:'+s[1]+';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px"></i>'+esc(b.name)+'</span>';});leg+='</div>';
    var summary='<div class="sx-kpis" style="grid-template-columns:repeat(4,1fr)">'+kpi('Tracked benefits','4','All owned')+kpi('At/above target','1','BEN-022','g')+kpi('Trending to target','2','BEN-024, BEN-033','g')+kpi('Below trajectory','1','BEN-028','a')+'</div>';
    return summary+card('Benefit tracking',svg+leg,'Quarterly measurement against baseline and target')+card('Where measurement lives','<div class="ppmis-three"><div><h4>Operational systems</h4><p>Measurement is drawn from customer, case and workforce systems — not manually re-keyed.</p></div><div><h4>Assurance</h4><p>Independent monthly assurance of measurement definitions and evidence.</p></div><div><h4>Adoption evidence</h4><p>Where the operational lever depends on adoption (BEN-024, BEN-028), a separate adoption metric is tracked.</p></div></div>');
  }
  function benefitsReviews(){
    var body='<table class="sx-t"><thead><tr><th>Review</th><th>Related benefit</th><th>Operational owner</th><th>Evidence</th><th>Due</th><th>Status</th></tr></thead><tbody>'+
      '<tr><td><b>Tranche 1 benefit review</b></td><td>All Tranche 1 benefits</td><td>Chief Operating Officer</td><td>Programme evidence pack</td><td>Closed 10 Jul 2026</td><td>'+chip('Complete','g')+'</td></tr>'+
      '<tr><td><b>90-day post-Release-1 review</b></td><td>BEN-022 · Fulfilment time</td><td>Head of Service Operations</td><td>Turnaround and channel-use report</td><td>16 Aug 2026</td><td>'+chip('Overdue','r')+'</td></tr>'+
      '<tr><td><b>30-day adoption review · Kiosk pilot</b></td><td>BEN-028 · Branch queue</td><td>Head of Retail</td><td>Queue-time telemetry</td><td>29 Aug 2026</td><td>'+chip('Due','a')+'</td></tr>'+
      '<tr><td><b>Tranche 2 benefit review</b></td><td>Tranche 2 benefits</td><td>Programme Sponsor</td><td>Programme benefits dossier</td><td>30 Jun 2027</td><td>'+chip('Scheduled','')+'</td></tr>'+
      '</tbody></table>';
    var checklist='<ul class="sx-list" style="margin:0">'+
      '<li>Measurement definition unchanged since baseline</li>'+
      '<li>Data source approved by data steward</li>'+
      '<li>Adoption evidence collected and reviewed</li>'+
      '<li>Benefit owner has signed the reading</li>'+
      '<li>Any deviation has a documented cause and next-step</li>'+
      '</ul>';
    var cadence='<div class="ppmis-statline"><span>30-day adoption</span><b>Every capability</b></div><div class="ppmis-statline"><span>90-day value</span><b>Every capability</b></div><div class="ppmis-statline"><span>Tranche review</span><b>End of tranche</b></div><div class="ppmis-statline"><span>Post-programme</span><b>+12 months</b></div>';
    return '<div class="ppmis-two"><div>'+card('Benefits realisation reviews',body,'Benefits continue to be tracked after project closure through programme reviews')+card('Review cadence',cadence,'Common across all programmes')+'</div><div>'+card('Review evidence checklist',checklist,'Required at every review')+card('Overdue action','<div class="sx-note bad">The 90-day post-Release-1 review is overdue. The evidence is available in Performance but has not been signed by the operational owner. Follow-up on 19 Aug.</div><div class="sx-actions"><button class="sx-btn primary" onclick="programApp.notify(\'Follow-up sent to benefit owner.\')">Notify owner</button></div>')+'</div></div>';
  }

  /* ============== DEPENDENCIES ============== */
  function dependenciesView(){
    if(S.view==='network')return networkView();
    var body='<table class="sx-t"><thead><tr><th>Predecessor</th><th>Required output</th><th>Successor</th><th>Required by</th><th>Owner</th><th>Status</th></tr></thead><tbody>'+
      dependencies.map(function(d){return '<tr><td>'+esc(d.predecessor)+'</td><td>'+esc(d.output)+'</td><td>'+esc(d.successor)+'</td><td>'+esc(d.by)+'</td><td>'+esc(d.owner)+'</td><td>'+rag(d.status)+'</td></tr>';}).join('')+
      '</tbody></table>';
    var stats='<div class="sx-kpis" style="grid-template-columns:repeat(4,1fr)">'+kpi('Total dependencies',dependencies.length.toString(),'Registered')+kpi('Green',dependencies.filter(function(d){return d.status==='Green';}).length.toString(),'On plan','g')+kpi('Amber',dependencies.filter(function(d){return d.status==='Amber';}).length.toString(),'At risk','a')+kpi('Red',dependencies.filter(function(d){return d.status==='Red';}).length.toString(),'Blocked','r')+'</div>';
    return stats+card('Dependency register',body,'Cross-project and cross-programme dependencies with impact and owner')+card('Escalation','<div class="sx-note warn"><b>Case Data Remediation → Contact Centre Modernisation:</b> the current 31-day delay puts the Contact Centre mobilisation date at risk. A portfolio decision is required to either resequence the mobilisation or add data engineering capacity.</div><div class="sx-actions"><button class="sx-btn primary" onclick="programApp.notify(\'Programme escalation submitted to Portfolio Forum.\')">Escalate to portfolio</button></div>');
  }
  function networkView(){
    var edges=dependencies.map(function(d){return '<tr><td><b>'+esc(d.predecessor)+'</b></td><td style="text-align:center;font-size:14px;color:#8a96a8">➜</td><td>'+esc(d.successor)+'</td><td class="mut">'+esc(d.output)+'</td><td>'+rag(d.status)+'</td></tr>';}).join('');
    var chains='<div class="sx-audit">'+
      '<div class="row"><b>Chain A · Identity → Digital services</b><span class="w">Identity Platform → Release 2 → Release 3</span></div>'+
      '<div class="row"><b>Chain B · Data → Channels</b><span class="w">Case Data → Customer 360 → Contact Centre</span></div>'+
      '<div class="row"><b>Chain C · People → Adoption</b><span class="w">Service Design Academy → Kiosk Rollout</span></div>'+
      '<div class="row"><b>Chain D · Cloud → Mobility</b><span class="w">Hybrid Cloud → Field Force</span></div>'+
      '</div>';
    return card('Dependency network','<table class="sx-t"><thead><tr><th>Predecessor</th><th></th><th>Successor</th><th>What passes</th><th>Health</th></tr></thead><tbody>'+edges+'</tbody></table>','Programme dependencies visible across tranches and portfolios')+'<div class="ppmis-two"><div>'+card('Load-bearing chains',chains,'Chains that carry programme risk')+'</div><div>'+card('Cross-programme impact','<div class="ppmis-statline"><span>Chain A movement</span><b>+1 quarter to Release 3</b></div><div class="ppmis-statline"><span>Chain B movement</span><b>Blocks Contact Centre</b></div><div class="ppmis-statline"><span>Chain C movement</span><b>Limits kiosk rollout pace</b></div><div class="ppmis-statline"><span>Chain D movement</span><b>Field Force onboarding shifts</b></div><div class="sx-actions"><button class="sx-btn primary" onclick="programApp.notify(\'Cross-programme sync opened with Digital Foundations.\')">Sync with dependency owners</button></div>')+'</div></div>';
  }

  /* ============== RISKS & ISSUES ============== */
  function risksView(){
    if(S.view==='issues')return issuesView();
    if(S.view==='heatmap')return heatmapView();
    var body='<table class="sx-t"><thead><tr><th>ID</th><th>Risk</th><th>Project</th><th>L × I</th><th>Score</th><th>Owner</th><th>Mitigation</th><th>Status</th></tr></thead><tbody>'+
      risks.map(function(r){return '<tr><td>'+esc(r.id)+'</td><td><b>'+esc(r.title)+'</b></td><td>'+esc(r.project)+'</td><td>'+esc(r.likelihood)+' · '+esc(r.impact)+'</td><td><span class="ppmis-score">'+r.score+'</span></td><td>'+esc(r.owner)+'</td><td class="mut">'+esc(r.mitigation)+'</td><td>'+chip(r.status,r.status==='Open'?'a':'')+'</td></tr>';}).join('')+
      '</tbody></table>';
    var top='<div class="sx-audit">'+risks.sort(function(a,b){return b.score-a.score;}).slice(0,3).map(function(r){return '<div class="row"><b>'+esc(r.title)+'</b><span class="w">'+esc(r.id)+' · score '+r.score+' · '+esc(r.owner)+'</span></div>';}).join('')+'</div>';
    var counts={High:0,Medium:0,Low:0};risks.forEach(function(r){counts[r.likelihood]++;});
    var stats='<div class="sx-kpis" style="grid-template-columns:repeat(4,1fr)">'+kpi('Open risks',risks.length.toString(),'Programme register')+kpi('Above tolerance','2','Score > 12','a')+kpi('Mitigating','1','Actions in flight','g')+kpi('New this period','1','Added since 11 Aug')+'</div>';
    return stats+'<div class="ppmis-two"><div>'+card('Programme risk register',body,'Risks scored on 5×5 · escalated when above tolerance')+'</div><div>'+card('Top exposures',top,'Highest scored risks')+card('Risk management cadence','<div class="ppmis-statline"><span>Risk workshop</span><b>Fortnightly</b></div><div class="ppmis-statline"><span>Owner review</span><b>Weekly</b></div><div class="ppmis-statline"><span>Board reporting</span><b>Monthly</b></div><div class="ppmis-statline"><span>Escalation trigger</span><b>Score ≥ 12</b></div><div class="sx-actions"><button class="sx-btn primary" onclick="programApp.notify(\'New risk captured against programme register.\')">New risk</button><button class="sx-btn" onclick="programApp.go(\'risks\',\'heatmap\')">Open heatmap</button></div>')+'</div></div>';
  }
  function issuesView(){
    var body='<table class="sx-t"><thead><tr><th>ID</th><th>Issue</th><th>Project</th><th>Severity</th><th>Age</th><th>Owner</th><th>Action</th><th>Status</th></tr></thead><tbody>'+
      issues.map(function(x){return '<tr><td>'+esc(x.id)+'</td><td><b>'+esc(x.title)+'</b></td><td>'+esc(x.project)+'</td><td>'+chip(x.severity,x.severity==='High'?'r':'a')+'</td><td>'+x.age+' d</td><td>'+esc(x.owner)+'</td><td class="mut">'+esc(x.action)+'</td><td>'+chip(x.status,x.status==='Open'?'r':x.status==='Under fix'?'a':'')+'</td></tr>';}).join('')+
      '</tbody></table>';
    var sev={High:0,Medium:0,Low:0};issues.forEach(function(i){sev[i.severity]=(sev[i.severity]||0)+1;});
    var stats='<div class="sx-kpis" style="grid-template-columns:repeat(4,1fr)">'+kpi('Open issues',issues.length.toString(),'Programme log')+kpi('High severity',(sev.High||0).toString(),'Priority','r')+kpi('Avg age',Math.round(issues.reduce(function(s,i){return s+i.age;},0)/issues.length)+' d','From open date')+kpi('Closed this month','4','Resolution rate 57%','g')+'</div>';
    var dist='<div style="text-align:center;padding:4px 0">'+donut([['High',sev.High||0,'#e84c3d'],['Medium',sev.Medium||0,'#f6b916'],['Low',sev.Low||0,'#29c152']],140)+'</div>'+legend([['High','#e84c3d',sev.High||0],['Medium','#f6b916',sev.Medium||0],['Low','#29c152',sev.Low||0]]);
    var aging='<div class="ppmis-statline"><span>0–7 days</span><b>'+issues.filter(function(i){return i.age<=7;}).length+' issue(s)</b></div><div class="ppmis-statline"><span>8–14 days</span><b>'+issues.filter(function(i){return i.age>7&&i.age<=14;}).length+' issue(s)</b></div><div class="ppmis-statline"><span>15+ days</span><b>'+issues.filter(function(i){return i.age>14;}).length+' issue(s)</b></div>';
    return stats+'<div class="ppmis-two"><div>'+card('Programme issue log',body,'Issues are actioned within their project; those with programme impact appear here')+'</div><div>'+card('Severity distribution',dist,'Open issues')+card('Aging',aging,'By age since open')+'</div></div>';
  }
  function heatmapView(){
    var cells=[];
    for(var i=0;i<5;i++)cells.push([0,0,0,0,0]);
    risks.forEach(function(r){var l={High:4,Medium:3,Low:2}[r.likelihood]||2;var im={High:4,Medium:3,Low:2}[r.impact]||2;cells[4-l][im-1]++;});
    var grid='<table class="sx-t" style="text-align:center"><thead><tr><th></th><th>Impact 1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody>';
    for(var y=0;y<5;y++){grid+='<tr><td><b>Likelihood '+(5-y)+'</b></td>';for(var x=0;x<5;x++){var v=cells[y][x];var risk=(5-y)*(x+1);var tone=risk>=15?'#f2c7c6':risk>=8?'#fbe5c4':risk>=4?'#f4efb2':'#cfe9d3';grid+='<td style="background:'+tone+';color:#2a3543;font-weight:'+(v?800:400)+'">'+(v||'')+'</td>';}grid+='</tr>';}
    grid+='</tbody></table>';
    var topRisks='<div class="sx-audit">'+risks.sort(function(a,b){return b.score-a.score;}).map(function(r){return '<div class="row"><b>'+esc(r.title)+'</b><span class="w">'+esc(r.id)+' · '+esc(r.project)+' · score '+r.score+'</span></div>';}).join('')+'</div>';
    return '<div class="ppmis-two"><div>'+card('Risk heatmap',grid,'Count of risks in each likelihood × impact cell')+card('Above tolerance','<div class="sx-note warn">RSK-114 (data engineering capacity) and RSK-118 (kiosk supply lead-time) sit above the programme risk tolerance of 12 and require action or escalation.</div>')+'</div><div>'+card('All programme risks',topRisks,'Sorted by score')+card('Tolerance policy','<div class="ppmis-statline"><span>Programme tolerance</span><b>Score 12</b></div><div class="ppmis-statline"><span>Escalate above</span><b>15</b></div><div class="ppmis-statline"><span>Review frequency</span><b>Fortnightly</b></div>')+'</div></div>';
  }

  /* ============== FINANCIALS ============== */
  function financialsView(){
    if(S.view==='plan')return costPlanView();
    if(S.view==='forecast')return forecastView();
    var p=currentProgram();
    var chart='<svg viewBox="0 0 640 220" width="100%" style="border:1px solid #edf1f5;background:#fff">';
    chart+='<rect x="0" y="0" width="640" height="220" fill="#fbfcfe"/>';
    for(var i=0;i<5;i++){var y=30+i*35;chart+='<line x1="55" y1="'+y+'" x2="620" y2="'+y+'" stroke="#eef2f7"/>';}
    financials.quarters.forEach(function(q,i){var x=80+i*72;chart+='<text x="'+x+'" y="215" font-size="10" fill="#8a96a8" text-anchor="middle">'+q+'</text>';});
    var series=[['Baseline','#8a96a8',financials.baseline],['Actual','#2fb4e3',financials.actual],['Forecast','#f6b916',financials.forecast]];
    series.forEach(function(s,si){s[2].forEach(function(v,i){if(v===0)return;var x=64+i*72+si*8,h=v*1.8;chart+='<rect x="'+x+'" y="'+(180-h)+'" width="7" height="'+h+'" fill="'+s[1]+'"/>';});});
    chart+='</svg>';
    var leg='<div class="sx-actions" style="margin-top:6px">';series.forEach(function(s){leg+='<span class="sx-chip" style="background:'+s[1]+'22;color:'+s[1]+';border-color:'+s[1]+'55"><i style="background:'+s[1]+';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px"></i>'+s[0]+'</span>';});leg+='</div>';
    var kpis='<div class="sx-kpis">'+kpi('Approved',p.budget,'Programme baseline')+kpi('Spent',p.spent,'52% of approved')+kpi('Forecast','R492m','+R6m against baseline','a')+kpi('EAC variance','+R6m','1.2% over','a')+'</div>';
    return kpis+card('Quarterly spend',chart+leg,'Baseline / actual / forecast by quarter');
  }
  function costPlanView(){
    var list=projectsByProgram[S.program]||[];
    var rows=list.map(function(p){return '<tr><td><b>'+esc(p.name)+'</b><span class="mut">'+esc(p.id)+'</span></td><td>'+esc(p.budget)+'</td><td>'+esc(p.spent)+'</td><td>'+p.pct+'%</td><td>'+esc(p.budget)+'</td><td>'+rag(p.cost)+'</td></tr>';}).join('');
    var total=list.reduce(function(s,p){return s+parseInt(p.budget.replace(/[^0-9]/g,''));},0);
    /* Compact variance chart */
    var vChart='<svg viewBox="0 0 340 200" width="100%" height="200" style="background:#fff">'+list.map(function(p,i){var y=20+i*28;var bud=parseInt(p.budget.replace(/[^0-9]/g,''));var w=Math.min(280,bud*1.4);return '<text x="10" y="'+(y+13)+'" font-size="10" fill="#43505f">'+esc(p.id)+'</text><rect x="80" y="'+y+'" width="'+w+'" height="16" fill="#e3edf6"/><rect x="80" y="'+y+'" width="'+(w*p.pct/100)+'" height="16" fill="'+(p.cost==='Green'?'#29c152':p.cost==='Amber'?'#f6b916':'#e84c3d')+'"/><text x="'+(80+w+5)+'" y="'+(y+13)+'" font-size="10" font-weight="700" fill="#0d315c">'+esc(p.budget)+'</text>';}).join('')+'</svg>';
    var top='<div class="sx-audit">'+list.filter(function(p){return p.cost!=='Green';}).map(function(p){return '<div class="row"><b>'+esc(p.name)+'</b><span class="w">'+esc(p.id)+' · cost health '+p.cost+' · spent '+p.spent+' of '+p.budget+'</span></div>';}).join('')+'</div>';
    return card('Cost plan by project','<table class="sx-t"><thead><tr><th>Project</th><th>Baseline</th><th>Actual to date</th><th>Complete</th><th>Forecast</th><th>Cost health</th></tr></thead><tbody>'+rows+'<tfoot><tr><td>Total</td><td>R'+total+'m</td><td>—</td><td>—</td><td>R'+total+'m</td><td>—</td></tr></tfoot></tbody></table>','Financial baseline is agreed with the Sponsor and revised through formal change')+'<div class="ppmis-two"><div>'+card('Spend and health by project',vChart,'Colour follows cost health · fill shows % of baseline consumed')+'</div><div>'+card('Watch list',top,'Projects with cost health worse than Green')+card('Recovery levers','<ul class="sx-list" style="margin:0"><li>Reallocate contingency held at programme level</li><li>Defer discretionary scope within tranche</li><li>Re-negotiate variable components of external contracts</li><li>Escalate to portfolio for cross-programme reallocation</li></ul>')+'</div></div>';
  }
  function forecastView(){
    var body='<table class="sx-t"><thead><tr><th>Project</th><th>Previous forecast</th><th>Current</th><th>Movement</th><th>Reason</th><th>Decision</th></tr></thead><tbody>'+
      '<tr><td><b>Case Data Remediation</b></td><td>R54m</td><td>R62m</td><td class="r">+R8m</td><td>Recovery team + extended testing</td><td>Executive approval required</td></tr>'+
      '<tr><td><b>Branch Kiosk Rollout</b></td><td>R74m</td><td>R76m</td><td class="a">+R2m</td><td>Two additional site fit-outs</td><td>Programme absorbs within tolerance</td></tr>'+
      '<tr><td><b>Digital Service Release 2</b></td><td>R126m</td><td>R124m</td><td class="g">−R2m</td><td>Procurement saving</td><td>May be reallocated</td></tr>'+
      '<tr><td><b>Service Design Academy</b></td><td>R19m</td><td>R19m</td><td>—</td><td>Cohort model stable</td><td>None</td></tr>'+
      '</tbody></table>';
    var trend='<svg viewBox="0 0 340 200" width="100%" height="200" style="background:#fff">'+
      '<line x1="30" y1="20" x2="30" y2="160" stroke="#cfd8e1"/><line x1="30" y1="160" x2="330" y2="160" stroke="#cfd8e1"/>'+
      ['Feb','Apr','Jun','Aug'].map(function(m,i){var x=60+i*80;return '<text x="'+x+'" y="180" font-size="10" fill="#8a96a8" text-anchor="middle">'+m+'</text>';}).join('')+
      '<polyline points="60,120 140,110 220,105 300,100" fill="none" stroke="#8a96a8" stroke-width="2" stroke-dasharray="4 3"/>'+
      '<polyline points="60,120 140,105 220,88 300,72" fill="none" stroke="#f6b916" stroke-width="2.4"/>'+
      '<circle cx="60" cy="120" r="3" fill="#8a96a8"/><circle cx="300" cy="72" r="4" fill="#f6b916"/>'+
      '<text x="240" y="60" font-size="10" font-weight="700" fill="#0d315c">Forecast +R6m</text>'+
      '<text x="240" y="112" font-size="9" fill="#8a96a8">Baseline</text>'+
      '</svg>';
    var callouts='<div class="sx-note bad"><b>+R8m · Case Data Remediation</b> — recovery funding requires Executive Committee approval on 20 Aug.</div><div class="sx-note warn"><b>+R2m · Branch Kiosk Rollout</b> — absorbed within programme contingency (R4m remains).</div><div class="sx-note ok"><b>−R2m · Digital Service Release 2</b> — procurement saving; will be returned to programme buffer.</div>';
    return card('Forecast movements',body,'Movements feed programme affordability and portfolio decision packs')+'<div class="ppmis-two"><div>'+card('EAC trend',trend,'Programme forecast over the last four review cycles')+'</div><div>'+card('Movement callouts',callouts,'Traceable to decisions')+'</div></div>';
  }

  /* ============== GOVERNANCE ============== */
  function governanceView(){
    if(S.view==='gates')return gatesView();
    if(S.view==='reports')return reportsView();
    var upcoming='<table class="sx-t"><thead><tr><th>Date</th><th>Forum</th><th>Decision</th><th>Rationale</th><th>Authority</th><th>Status</th></tr></thead><tbody>'+
      governance.map(function(g){var c=g.status==='Ready'?'g':g.status==='Escalated'?'r':g.status==='Scheduled'?'stage':'';return '<tr><td>'+esc(g.date)+'</td><td>'+esc(g.forum)+'</td><td><b>'+esc(g.decision)+'</b></td><td class="mut">'+esc(g.rationale)+'</td><td>'+esc(g.authority)+'</td><td>'+chip(g.status,c)+'</td></tr>';}).join('')+
      '</tbody></table>';
    var history='<table class="sx-t"><thead><tr><th>Date</th><th>Forum</th><th>Decision</th><th>Authority</th></tr></thead><tbody>'+
      forumsHistory.map(function(h){return '<tr><td>'+esc(h.date)+'</td><td>'+esc(h.forum)+'</td><td>'+esc(h.decision)+'</td><td>'+esc(h.authority)+'</td></tr>';}).join('')+
      '</tbody></table>';
    return card('Upcoming decisions',upcoming,'Pack owner: Programme Office · pack deadline is two working days before forum')+card('Decision history',history,'Retained with rationale, conditions, authority and connected records');
  }
  function gatesView(){
    var gates=[
      {gate:'Gate 2',project:'Identity Platform Renewal',purpose:'Architecture approval',date:'27 Aug 2026',status:'Ready',conditions:'Reference architecture and security controls to be walked through',score:88},
      {gate:'Gate 3',project:'Digital Service Release 2',purpose:'Baseline approval',date:'30 Sep 2026',status:'At risk',conditions:'Design authority decision required',score:62},
      {gate:'Gate 4',project:'Case Data Remediation',purpose:'Cutover readiness',date:'15 Nov 2026',status:'Deferred',conditions:'Data validation and rollback tested',score:34},
      {gate:'Gate 5',project:'Branch Kiosk Rollout',purpose:'Wave 1 close',date:'15 Dec 2026',status:'Planned',conditions:'Adoption evidence from 12 sites',score:58},
      {gate:'Gate 6',project:'Integration Bus Consolidation',purpose:'API v3 launch',date:'15 Jan 2027',status:'Planned',conditions:'All API cutovers complete',score:70}
    ];
    var body='<table class="sx-t"><thead><tr><th>Gate</th><th>Project</th><th>Purpose</th><th>Planned</th><th>Readiness</th><th>Status</th><th>Conditions</th></tr></thead><tbody>'+
      gates.map(function(g){var tone=g.status==='Ready'?'g':g.status==='At risk'?'a':g.status==='Deferred'?'r':'';var barCol=g.score>75?'#29c152':g.score>50?'#f6b916':'#e84c3d';return '<tr><td><b>'+esc(g.gate)+'</b></td><td>'+esc(g.project)+'</td><td>'+esc(g.purpose)+'</td><td>'+esc(g.date)+'</td><td>'+tinyBar(g.score,barCol)+' <span class="mut" style="font-size:10.5px">'+g.score+'%</span></td><td>'+chip(g.status,tone)+'</td><td class="mut">'+esc(g.conditions)+'</td></tr>';}).join('')+
      '</tbody></table>';
    var timeline='<svg viewBox="0 0 340 200" width="100%" height="200" style="background:#fff">'+
      '<line x1="20" y1="170" x2="330" y2="170" stroke="#cfd8e1"/>'+
      ['Aug','Sep','Oct','Nov','Dec','Jan'].map(function(m,i){var x=40+i*55;return '<line x1="'+x+'" y1="166" x2="'+x+'" y2="174" stroke="#cfd8e1"/><text x="'+x+'" y="188" font-size="10" fill="#8a96a8" text-anchor="middle">'+m+'</text>';}).join('')+
      gates.map(function(g,i){var xs=[40,95,150,205,260,315];var col=g.status==='Ready'?'#29c152':g.status==='At risk'?'#f6b916':g.status==='Deferred'?'#e84c3d':'#8a96a8';return '<circle cx="'+xs[i]+'" cy="170" r="8" fill="'+col+'"/><text x="'+xs[i]+'" y="'+(140-((i%3)*24))+'" font-size="10" fill="#43505f" text-anchor="middle" font-weight="700">'+esc(g.gate)+'</text><line x1="'+xs[i]+'" y1="'+(146-((i%3)*24))+'" x2="'+xs[i]+'" y2="162" stroke="#cfd8e1" stroke-dasharray="2 2"/>';}).join('')+
      '</svg>';
    var stats='<div class="sx-kpis" style="grid-template-columns:repeat(3,1fr)">'+kpi('Gates ahead',gates.length.toString(),'Programme window')+kpi('Ready',gates.filter(function(g){return g.status==='Ready';}).length.toString(),'Green','g')+kpi('At risk / deferred',gates.filter(function(g){return g.status==='At risk'||g.status==='Deferred';}).length.toString(),'Action needed','a')+'</div>';
    return stats+card('Programme gates',body,'Gates apply consistently across projects · progress requires evidence, not opinion')+'<div class="ppmis-two"><div>'+card('Gate timeline',timeline,'Next six months · marker colour follows readiness')+'</div><div>'+card('Gate assurance policy','<div class="ppmis-statline"><span>Evidence pack lead-time</span><b>10 working days</b></div><div class="ppmis-statline"><span>Independent review</span><b>Every gate</b></div><div class="ppmis-statline"><span>Sign-off authority</span><b>Programme Board</b></div><div class="ppmis-statline"><span>Deferral trigger</span><b>Any red condition</b></div><div class="ppmis-statline"><span>Post-gate action tracking</span><b>Weekly · 4 wks</b></div>')+'</div></div>';
  }
  function reportsView(){
    var body='<table class="sx-t"><thead><tr><th>Report</th><th>Audience</th><th>Frequency</th><th>Last issued</th><th>Next due</th><th></th></tr></thead><tbody>'+
      '<tr><td><b>Programme highlight report</b></td><td>Programme Sponsor</td><td>Fortnightly</td><td>07 Aug 2026</td><td>21 Aug 2026</td><td><button class="sx-btn primary sm" onclick="programApp.notify(\'Highlight report drafted from current period data.\')">Draft</button></td></tr>'+
      '<tr><td><b>Steering committee pack</b></td><td>Programme Board</td><td>Monthly</td><td>25 Jul 2026</td><td>22 Aug 2026</td><td><button class="sx-btn sm" onclick="programApp.notify(\'Board pack template opened.\')">Open</button></td></tr>'+
      '<tr><td><b>Portfolio update</b></td><td>Portfolio Forum</td><td>Monthly</td><td>08 Aug 2026</td><td>05 Sep 2026</td><td><button class="sx-btn sm" onclick="programApp.notify(\'Portfolio update drafted.\')">Open</button></td></tr>'+
      '<tr><td><b>Executive dashboard</b></td><td>Executive Committee</td><td>Monthly</td><td>08 Aug 2026</td><td>05 Sep 2026</td><td><button class="sx-btn sm" onclick="programApp.notify(\'Executive dashboard refreshed.\')">Open</button></td></tr>'+
      '<tr><td><b>Statutory report contribution</b></td><td>Public Accounts</td><td>Quarterly</td><td>Q1 2026</td><td>Q2 2026</td><td><button class="sx-btn sm" onclick="programApp.notify(\'Statutory contribution package prepared.\')">Open</button></td></tr>'+
      '</tbody></table>';
    var calendar='<div class="sx-audit">'+
      '<div class="row"><b>Fri 21 Aug</b><span class="w">Highlight report · Sponsor</span></div>'+
      '<div class="row"><b>Fri 22 Aug</b><span class="w">Steering committee pack · Board</span></div>'+
      '<div class="row"><b>Fri 05 Sep</b><span class="w">Portfolio update · Portfolio Forum</span></div>'+
      '<div class="row"><b>Fri 05 Sep</b><span class="w">Executive dashboard · ExCo</span></div>'+
      '<div class="row"><b>End Sep</b><span class="w">Statutory Q2 contribution</span></div>'+
      '</div>';
    var distribution='<div class="ppmis-statline"><span>Sponsor</span><b>Highlight · Board pack</b></div><div class="ppmis-statline"><span>Programme Board</span><b>Board pack</b></div><div class="ppmis-statline"><span>Portfolio Forum</span><b>Portfolio update</b></div><div class="ppmis-statline"><span>Executive Committee</span><b>Executive dashboard</b></div><div class="ppmis-statline"><span>Public Accounts</span><b>Statutory contribution</b></div>';
    return card('Programme reports',body,'Reports draw from the same evidence used in planning, delivery and benefits')+'<div class="ppmis-two"><div>'+card('Reporting calendar',calendar,'Next four weeks')+'</div><div>'+card('Distribution',distribution,'By audience')+'</div></div>';
  }

  function go(area,view){S.area=area;if(view&&views[area].some(function(x){return x[0]===view;}))S.view=view;else S.view=views[area][0][0];render();}
  function notify(msg){S.toast=msg;render();setTimeout(function(){S.toast='';render();},2400);}
  function selectProgram(id){S.program=id;render();}
  function openProject(id){if(typeof window.showModule==='function'){window.showModule('project');}notify('Project '+id+' opened in the Project module.');}
  function openModule(id){if(typeof window.showModule==='function')window.showModule(id);}

  window.programApp={
    go:go,
    sub:function(v){S.view=v;render();},
    selectProgram:selectProgram,
    notify:notify,
    openProject:openProject,
    openModule:openModule
  };

  function mount(){root=document.getElementById('pgmRoot');if(!root)return;render();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
