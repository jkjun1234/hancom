const display = document.getElementById('display');

let current = '0';
let previous = null;
let operator = null;
let shouldReset = false;

function updateDisplay(value) {
  // 숫자가 너무 길면 폰트 줄이기
  const len = String(value).length;
  display.style.fontSize = len > 9 ? '36px' : len > 6 ? '48px' : '64px';
  display.value = value;
}

function handleNumber(value) {
  if (shouldReset) {
    current = value;
    shouldReset = false;
  } else {
    current = current === '0' ? value : current + value;
  }
  updateDisplay(current);
}

function handleOperator(op) {
  if (operator && !shouldReset) {
    calculate();
  }
  previous = current;
  operator = op;
  shouldReset = true;
}

function calculate() {
  if (!operator || previous === null) return;

  const a = parseFloat(previous);
  const b = parseFloat(current);
  const ops = { '+': a + b, '-': a - b, '*': a * b, '/': a / b };
  const result = ops[operator];

  current = String(parseFloat(result.toFixed(10)));
  operator = null;
  previous = null;
  shouldReset = true;
  updateDisplay(current);
}

function handleClear() {
  current = '0';
  previous = null;
  operator = null;
  shouldReset = false;
  updateDisplay('0');
}

function handleSign() {
  current = String(parseFloat(current) * -1);
  updateDisplay(current);
}

function handlePercent() {
  current = String(parseFloat(current) / 100);
  updateDisplay(current);
}

function handleDecimal() {
  if (shouldReset) {
    current = '0.';
    shouldReset = false;
  } else if (!current.includes('.')) {
    current += '.';
  }
  updateDisplay(current);
}

document.querySelector('.buttons').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const { action, value } = btn.dataset;

  if (action === 'number') handleNumber(value);
  else if (action === 'operator') handleOperator(value);
  else if (action === 'equal') calculate();
  else if (action === 'clear') handleClear();
  else if (action === 'sign') handleSign();
  else if (action === 'percent') handlePercent();
  else if (action === 'decimal') handleDecimal();
});
