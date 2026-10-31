const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function loadApp(initialStorage = null, confirmResult = false, promptValues = []) {
  let storedValue = initialStorage;
  const html = fs.readFileSync('app/src/main/assets/index.html', 'utf8');
  const script = html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(script, 'inline application script must exist');
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, {
      id, value: '', textContent: '', innerHTML: '', className: '',
      dataset: {}, addEventListener() {}, classList: { add() {}, remove() {} }
    });
    return elements.get(id);
  };
  const alerts = [];
  const sandbox = {
    document: { getElementById: element, querySelectorAll: () => [] },
    localStorage: { getItem: () => storedValue, setItem: (_key, value) => { storedValue = value; } },
    crypto: { randomUUID: (() => { let i = 0; return () => 'id-' + (++i); })() },
    alert: message => alerts.push(String(message)),
    prompt: () => promptValues.length ? promptValues.shift() : null,
    confirm: () => confirmResult,
    window: null,
    Blob, TextEncoder, URL, setTimeout,
    console
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  const scripts = [...html.matchAll(/<script>([\\s\\S]*?)<\\/script>/g)];
  assert.ok(scripts.length >= 2, 'finance extension script must exist');
  for (const item of scripts) vm.runInContext(item[1], sandbox);
  return { sandbox, element, alerts, getStored: () => storedValue, read: expression => vm.runInContext(expression, sandbox) };
}

test('average unit cost is total capital divided by total quantity', () => {
  const app = loadApp();
  app.element('pName').value = 'Product A';
  app.element('pCapital').value = '10000';
  app.element('pStock').value = '10';
  app.sandbox.addProduct();
  assert.equal(app.read('db.products[0].buy'), 1000);
  assert.equal(app.read('db.products[0].stock'), 10);
});

test('sale records total revenue, COGS, gross/net profit and deducts stock', () => {
  const app = loadApp();
  app.element('pName').value = 'Product A';
  app.element('pCapital').value = '10000';
  app.element('pStock').value = '10';
  app.element('pSell').value = '1500';
  app.sandbox.addProduct();

  app.element('saleProduct').value = 'id-1';
  app.element('saleQty').value = '3';
  app.element('saleRevenue').value = '4500';
  app.element('transport').value = '100';
  app.element('delivery').value = '50';
  app.element('otherExpense').value = '25';
  app.sandbox.saveSale();

  assert.equal(app.read('db.sales[0].revenue'), 4500);
  assert.equal(app.read('db.sales[0].cost'), 3000);
  assert.equal(app.read('db.sales[0].expenses'), 175);
  assert.equal(app.read('db.sales[0].revenue - db.sales[0].cost'), 1500);
  assert.equal(app.read('db.sales[0].revenue - db.sales[0].cost - db.sales[0].expenses'), 1325);
  assert.equal(app.read('db.products[0].stock'), 7);
});

test('each product keeps its own average cost; stock cannot be oversold', () => {
  const app = loadApp();
  for (const [name, capital, stock] of [['A', '10000', '10'], ['B', '6000', '4']]) {
    app.element('pName').value = name;
    app.element('pCapital').value = capital;
    app.element('pStock').value = stock;
    app.sandbox.addProduct();
  }
  assert.equal(app.read('db.products[0].buy'), 1000);
  assert.equal(app.read('db.products[1].buy'), 1500);

  app.element('saleProduct').value = 'id-2';
  app.element('saleQty').value = '5';
  app.element('saleRevenue').value = '10000';
  app.sandbox.saveSale();
  assert.equal(app.read('db.sales.length'), 0);
  assert.equal(app.read('db.products[1].stock'), 4);
  assert.ok(app.alerts.length > 0);
});

test('zero quantity and zero-stock product do not produce a positive unit cost', () => {
  const app = loadApp();
  app.element('pName').value = 'Empty';
  app.element('pCapital').value = '0';
  app.element('pStock').value = '0';
  app.element('pSell').value = '100';
  app.sandbox.addProduct();
  assert.equal(app.read('db.products[0].buy'), 0);
  assert.equal(app.read('db.products[0].stock'), 0);
});


test('legacy localStorage products and historical sale snapshots remain readable and unchanged', () => {
  const legacy = {
    products: [{ id: 'legacy-p', name: 'Legacy Product', buy: 250, sell: 400, stock: 8 }],
    sales: [{
      id: 'legacy-s', productId: 'legacy-p', name: 'Legacy Product',
      qty: 2, price: 400, revenue: 800, cost: 500,
      transport: 10, delivery: 5, other: 0, expenses: 15,
      date: '2026-10-30', time: '10:00:00', note: 'legacy record'
    }]
  };
  const app = loadApp(JSON.stringify(legacy));
  assert.equal(app.read('db.products[0].buy'), 250);
  assert.equal(app.read('db.products[0].sell'), 400);
  assert.equal(app.read('db.sales[0].revenue'), 800);
  assert.equal(app.read('db.sales[0].cost'), 500);
  assert.equal(app.read('db.sales[0].expenses'), 15);
  assert.equal(app.read('profit(db.sales[0])'), 285);

  app.sandbox.persist();
  const saved = JSON.parse(app.getStored());
  assert.equal(saved.products[0].id, 'legacy-p');
  assert.equal(saved.sales[0].id, 'legacy-s');
  assert.equal(saved.sales[0].cost, 500);
  assert.equal(saved.sales[0].revenue, 800);
});

test('voiding a sale restores stock and removes its revenue from totals', () => {
  const app = loadApp(null, true);
  app.element('pName').value = 'Product A';
  app.element('pCapital').value = '10000';
  app.element('pStock').value = '10';
  app.sandbox.addProduct();

  app.element('saleProduct').value = 'id-1';
  app.element('saleQty').value = '3';
  app.element('saleRevenue').value = '4500';
  app.sandbox.saveSale();

  assert.equal(app.read('db.products[0].stock'), 7);
  assert.equal(app.read('db.sales.length'), 1);
  const saleId = app.read('db.sales[0].id');
  app.sandbox.voidSale(saleId);

  assert.equal(app.read('db.products[0].stock'), 10);
  assert.equal(app.read('db.sales.length'), 0);
  assert.equal(app.element('totalRevenue').textContent, '0 ကျပ်');
});


test('new sales record separates revenue from cash received and records partial payment', () => {
  const app = loadApp();
  app.element('pName').value = 'Debt Product';
  app.element('pCapital').value = '5000';
  app.element('pStock').value = '10';
  app.sandbox.addProduct();
  app.element('saleProduct').value = 'id-1';
  app.element('saleQty').value = '2';
  app.element('saleRevenue').value = '4000';
  app.element('salePaid').value = '1500';
  app.element('paymentMethod').value = 'mobile';
  app.sandbox.saveSale();
  assert.equal(app.read('db.sales[0].revenue'), 4000);
  assert.equal(app.read('db.sales[0].paidAmount'), 1500);
  assert.equal(app.read('db.sales[0].payments[0].method'), 'mobile');
  assert.equal(app.read('db.sales[0].revenue - db.sales[0].paidAmount'), 2500);
  assert.equal(app.read('db.products[0].stock'), 8);
});

test('receiving a partial debt payment reduces outstanding balance without changing revenue', () => {
  const app = loadApp(null, false, ['1000', 'cash']);
  app.element('pName').value = 'Debt Product';
  app.element('pCapital').value = '5000';
  app.element('pStock').value = '10';
  app.sandbox.addProduct();
  app.element('saleProduct').value = 'id-1';
  app.element('saleQty').value = '1';
  app.element('saleRevenue').value = '3000';
  app.element('salePaid').value = '500';
  app.sandbox.saveSale();
  const id = app.read('db.sales[0].id');
  app.sandbox.receivePayment(id);
  assert.equal(app.read('db.sales[0].revenue'), 3000);
  assert.equal(app.read('db.sales[0].paidAmount'), 1500);
  assert.equal(app.read('db.sales[0].revenue - db.sales[0].paidAmount'), 1500);
});

test('standalone business expenses are persisted separately from sales revenue', () => {
  const app = loadApp();
  app.element('expenseTitle').value = 'Shop rent';
  app.element('expenseAmount').value = '25000';
  app.element('expenseMethod').value = 'cash';
  app.element('expenseDate').value = '2026-10-31';
  app.sandbox.saveExpense();
  assert.equal(app.read('db.expenses.length'), 1);
  assert.equal(app.read('db.expenses[0].amount'), 25000);
  assert.equal(app.read('db.sales.length'), 0);
});

test('legacy sales without payment metadata are not incorrectly counted as new debt', () => {
  const legacy = { products: [], sales: [{ id: 'old', name: 'Old', revenue: 800, cost: 500, expenses: 0, date: '2026-10-30', qty: 2 }] };
  const app = loadApp(JSON.stringify(legacy));
  assert.equal(app.read('db.expenses.length'), 0);
  assert.equal(app.read('due(db.sales[0])'), 0);
});
