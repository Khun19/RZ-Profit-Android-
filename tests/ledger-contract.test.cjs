const test = require('node:test');
const assert = require('node:assert/strict');

// Test-only contract oracle; this is not the production app ledger or SQLite layer.
function balanced(j) {
  if (!j || !Array.isArray(j.lines) || j.lines.length < 2) throw Error('journal requires at least two lines');
  let d=0,c=0;
  for (const x of j.lines) {
    if (!x.accountId) throw Error('account required');
    if (!Number.isSafeInteger(x.debit) || x.debit<0 || !Number.isSafeInteger(x.credit) || x.credit<0) throw Error('invalid amount');
    if ((x.debit>0)===(x.credit>0)) throw Error('exactly one positive side required');
    d+=x.debit; c+=x.credit;
  }
  if (!Number.isSafeInteger(d)||!Number.isSafeInteger(c)||d<=0||d!==c) throw Error('unbalanced journal');
  return {debit:d,credit:c};
}
function reverse(j) { balanced(j); return {sourceJournalId:j.id,lines:j.lines.map(x=>({accountId:x.accountId,debit:x.credit,credit:x.debit}))}; }
function postOnce(s,key,j) {
  if(s.keys.has(key)) return false;
  balanced(j); s.journals.push(j); s.keys.add(key); return true;
}
function postSale(s,x) {
  const n={stock:{...s.stock},journals:[...s.journals],keys:new Set(s.keys)};
  if(!Number.isSafeInteger(x.quantity)||x.quantity<=0) throw Error('invalid quantity');
  if(!Number.isSafeInteger(n.stock[x.productId])||n.stock[x.productId]<x.quantity) throw Error('insufficient stock');
  balanced(x.revenue); balanced(x.cogs);
  n.stock[x.productId]-=x.quantity;
  postOnce(n,'sale:'+x.id+':revenue',x.revenue); postOnce(n,'sale:'+x.id+':cogs',x.cogs);
  s.stock=n.stock; s.journals=n.journals; s.keys=n.keys;
}
function migrate(old) {
  const products=(old.products||[]).map(p=>({legacyId:p.id,unitCost:p.buy,openingQuantity:p.stock}));
  const sales=(old.sales||[]).map(x=>({legacyId:x.id,revenue:x.revenue,costSnapshot:x.cost,historical:true}));
  const payments=[];
  for(const sale of old.sales||[]) for(const p of sale.payments||[]) payments.push({legacySaleId:sale.id,...p});
  return {products,sales,payments};
}
const revenue={id:'sale-1',lines:[
  {accountId:'cash',debit:1500,credit:0},
  {accountId:'ar',debit:3000,credit:0},
  {accountId:'sales',debit:0,credit:4500}
]};
test('LED-01 balanced multi-line journal is accepted',()=>assert.deepEqual(balanced(revenue),{debit:4500,credit:4500}));
test('LED-02 unbalanced journal is rejected',()=>assert.throws(()=>balanced({lines:[{accountId:'cash',debit:1000,credit:0},{accountId:'sales',debit:0,credit:900}]}),/unbalanced/));
test('LED-03 missing account, negative, fractional and two-sided lines are rejected',()=>{
 for(const line of [{debit:100,credit:0},{accountId:'x',debit:-1,credit:0},{accountId:'x',debit:1.5,credit:0},{accountId:'x',debit:10,credit:10}])
  assert.throws(()=>balanced({lines:[line,{accountId:'offset',debit:0,credit:100}]}));
});
test('LED-04 one-line and zero-value journals are rejected',()=>{
 assert.throws(()=>balanced({lines:[{accountId:'cash',debit:0,credit:0}]}));
 assert.throws(()=>balanced({lines:[{accountId:'cash',debit:0,credit:0},{accountId:'equity',debit:0,credit:0}]}));
});
test('LED-05 reversal swaps sides and remains balanced',()=>{
 const r=reverse(revenue); assert.equal(r.sourceJournalId,'sale-1');
 assert.deepEqual(r.lines,[{accountId:'cash',debit:0,credit:1500},{accountId:'ar',debit:0,credit:3000},{accountId:'sales',debit:4500,credit:0}]);
 assert.deepEqual(balanced(r),{debit:4500,credit:4500});
});
test('LED-06 duplicate source event is idempotent',()=>{
 const s={journals:[],keys:new Set()}; assert.equal(postOnce(s,'sale:1',revenue),true); assert.equal(postOnce(s,'sale:1',revenue),false); assert.equal(s.journals.length,1);
});
test('INV-01 valid sale decrements stock and posts both journals',()=>{
 const s={stock:{p1:10},journals:[],keys:new Set()};
 postSale(s,{id:'1',productId:'p1',quantity:3,revenue,cogs:{lines:[{accountId:'cogs',debit:3000,credit:0},{accountId:'inventory',debit:0,credit:3000}]}});
 assert.equal(s.stock.p1,7); assert.equal(s.journals.length,2);
});
test('INV-02 oversell or invalid journal leaves state unchanged',()=>{
 for(const x of [{id:'o',productId:'p1',quantity:11,revenue,cogs:revenue},{id:'b',productId:'p1',quantity:2,revenue,cogs:{lines:[]}}]){
  const s={stock:{p1:10},journals:[],keys:new Set()}; assert.throws(()=>postSale(s,x)); assert.equal(s.stock.p1,10); assert.equal(s.journals.length,0);
 }
});
test('INV-03 zero, negative, fractional and string quantities are rejected',()=>{
 for(const q of [0,-1,1.5,'2']){const s={stock:{p1:10},journals:[],keys:new Set()};assert.throws(()=>postSale(s,{id:'x',productId:'p1',quantity:q,revenue,cogs:revenue}),/quantity/);assert.equal(s.stock.p1,10);}
});
test('PAY-01 partial receipt reduces receivable, not revenue',()=>{
 const invoice={revenue:4500,paid:1500},next={...invoice,paid:invoice.paid+1000};
 assert.equal(next.revenue,4500);assert.equal(next.paid,2500);assert.equal(next.revenue-next.paid,2000);
});
test('MIG-01 legacy IDs, amounts, cost and payment history are preserved',()=>{
 const x=migrate({products:[{id:'p-old',buy:250,stock:8}],sales:[{id:'s-old',revenue:800,cost:500,payments:[{id:'pay1',amount:300}]}]});
 assert.equal(x.products[0].legacyId,'p-old');assert.equal(x.products[0].openingQuantity,8);
 assert.equal(x.sales[0].legacyId,'s-old');assert.equal(x.sales[0].costSnapshot,500);
 assert.equal(x.payments[0].legacySaleId,'s-old');assert.equal(x.payments[0].amount,300);
});
test('MIG-02 historical sales are not replayed against opening stock',()=>{
 const x=migrate({products:[{id:'p1',buy:100,stock:7}],sales:[{id:'s1',qty:3,revenue:600,cost:300}]});
 assert.equal(x.products[0].openingQuantity,7);assert.equal(x.sales[0].historical,true);
});
test('MIG-03 missing legacy collections migrate to empty arrays',()=>assert.deepEqual(migrate({}),{products:[],sales:[],payments:[]}));
