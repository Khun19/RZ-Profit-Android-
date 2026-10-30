const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function loadApp() {
  const html = fs.readFileSync('app/src/main/assets/index.html', 'utf8');
  const script = html.match(/<script>([\\s\\S]*?)<\\/script>/);
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
    localStorage: { getItem: () => null, setItem() {} },
    crypto: { randomUUID: (() => { let i = 0; return () => 'id-' + (++i); })() },
    alert: message => alerts.push(String(message)),
    prompt: () => null,
    confirm: () => false,
    window: {},
    Blob, TextEncoder, URL, setTimeout,
    console
  };
  vm.createContext(sandbox);
  vm.runInContext(script[1], sandbox);
  return { sandbox, element, alerts, read: expression => vm.runInContext(expression, sandbox) };
}

test('average unit cost is total capital divided by total quantity', () => {
  const app = loadApp();
  app.element('pName').value = 'Product A';
  app.element('pCapital').value = '10000';
  app.element('pStock').value = '10';
  app.element('pSell').value = '1500';
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
    app.element('pSell').value = '2000';
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
