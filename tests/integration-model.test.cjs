const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const M = require('../integration-model.js');
function prepared() {
  const s=M.createStore();
  s.dispatch('consolidate');
  s.dispatch('configure',{scenario:'phased',bau:20,resourceConfirmed:true,financeConfirmed:true,sponsorConfirmed:true});
  return s;
}
test('approval requires reconciled demand and all implementation conditions',()=>{
  const s=M.createStore();
  assert.throws(()=>s.dispatch('approve',{rationale:'pilot'}),/Reconcile/);
  s.dispatch('consolidate');
  assert.throws(()=>s.dispatch('approve',{rationale:'pilot'}),/Confirm sponsor/);
  assert.equal(s.get().project,null);
});
test('capacity and funding constraints cannot be bypassed by confirmation',()=>{
  const s=prepared();
  s.dispatch('configure',{scenario:'phased',bau:30,resourceConfirmed:true,financeConfirmed:true,sponsorConfirmed:true});
  assert.equal(s.capacity(),10);
  assert.throws(()=>s.dispatch('approve',{rationale:'pilot'}),/capacity/);
  s.dispatch('configure',{scenario:'full',bau:0,resourceConfirmed:true,financeConfirmed:true,sponsorConfirmed:true});
  assert.equal(s.capacity(),40);
  assert.throws(()=>s.dispatch('approve',{rationale:'full rollout'}),/funding envelope/);
  assert.equal(s.get().decisions.length,0);
});
test('one canonical project survives reload with allocations counted once',()=>{
  const s=prepared();s.dispatch('approve',{rationale:'Pilot fits this quarter; expansion needs another decision.'});
  assert.equal(s.get().requests.length,3);
  assert.equal(s.get().project.allocations.reduce((sum,a)=>sum+a.days,0),s.get().project.days);
  const restored=M.createStore(JSON.parse(JSON.stringify(s.get())));
  assert.equal(restored.get().project.id,'PRJ-TS-001');
  assert.throws(()=>restored.dispatch('approve',{rationale:'repeat'}),/already/);
  assert.throws(()=>restored.dispatch('configure',{scenario:'full',bau:0}),/already/);
  assert.equal(restored.get().decisions.length,1);
});
test('deferred and rejected candidates retain rationale without becoming delivery',()=>{
  for(const action of ['defer','reject']) {
    const s=prepared();s.dispatch(action,{rationale:'Review after the next capacity release.'});
    assert.equal(s.get().project,null);assert.equal(s.get().decisions.length,1);
    assert.throws(()=>s.dispatch('start'),/authorised project/);
  }
});
test('delivery exceptions block acceptance; benefits require validated post-handover evidence',()=>{
  const s=prepared();s.dispatch('approve',{rationale:'Pilot approved.'});s.dispatch('start');s.dispatch('exception');
  assert.throws(()=>s.dispatch('accept',{accepted:true}),/exception resolved/);
  assert.throws(()=>s.dispatch('result',{days:6,evidence:'Review',validated:true}),/acceptance/);
  s.dispatch('resolve',{rationale:'Resequence testing within the approved allocation.'});s.dispatch('accept',{accepted:true});
  assert.throws(()=>s.dispatch('result',{days:6,evidence:'Review'}),/validation/);
  s.dispatch('result',{days:6,evidence:'January pilot sample',validated:true});
  assert.equal(s.get().result.target,5);assert.equal(s.get().result.days,6);assert.equal(s.get().project.status,'Completed');
});
test('all origins preserve request identity and BAU classification',()=>{
  const s=M.createStore();
  for(const origin of ['Strategy','Department / AOP','Portfolio']) s.dispatch('request',{title:'Additional proposal',origin,department:'Owner',type:'Change'});
  s.dispatch('request',{title:'Review tenders daily',origin:'Department / AOP',department:'Operations',type:'BAU'});
  assert.equal(new Set(s.get().requests.map(x=>x.id)).size,7);
  assert.equal(s.get().requests.at(-1).type,'BAU');
  assert.equal(s.get().consolidated,false);
});
test('UI views render without browser APIs or raw user HTML',()=>{
  const saved=prepared();saved.dispatch('request',{title:'<img src=x onerror=alert(1)>',origin:'Strategy',department:'A & B',type:'Change'});
  const sandbox={window:{StratxeIntegrationModel:M},localStorage:{getItem:()=>JSON.stringify(saved.get())},document:{readyState:'loading',addEventListener:()=>{}},console};
  vm.createContext(sandbox);vm.runInContext(fs.readFileSync(require.resolve('../stratxe-integration.js'),'utf8'),sandbox);
  for(const name of ['model','mandate','intake','decision','delivery','benefits','interfaces']) assert.match(sandbox.window.stratxeIntegration.render(name),/si-root/);
  const html=sandbox.window.stratxeIntegration.render('intake');
  assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('<img src=x'));
  for(const name of ['sp','app','aop','program','project','performance','structure']) assert.match(sandbox.window.stratxeIntegration.context(name),/Connected tender-screening/);
});
