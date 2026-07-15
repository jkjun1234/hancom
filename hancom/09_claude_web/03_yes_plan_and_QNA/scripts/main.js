const display = document.getElementById('current');
const expression = document.getElementById('expression');

let current = '0';
let prev = null;
let operator = null;
let shouldReset = false;

function updateDisplay() {
  display.textContent = current;
  // 숫자 길이에 따라 폰트 크기 조정
  display.classList.remove('small', 'xsmall');
  if (current.length > 9) display.classList.add('xsmall');
  else if (current.length > 7) display.classList.add('small');
}

function handleDigit(val) {
  if (shouldReset) {
    current = val;
    shouldReset = false;
  } else {
    if (current === '0') current = val;
    else if (current.length < 12) current += val;
  }
  updateDisplay();
}

function handleDot() {
  if (shouldReset) {
    current = '0.';
    shouldReset = false;
    updateDisplay();
    return;
  }
  if (!current.includes('.')) {
    current += '.';
    updateDisplay();
  }
}

function handleOperator(op) {
  // 이전 연산 이어서 계산
  if (prev !== null && !shouldReset) {
    calculate();
  }
  prev = parseFloat(current);
  operator = op;
  shouldReset = true;

  expression.textContent = `${formatNum(prev)} ${op}`;

  // 선택된 연산자 버튼 하이라이트
  document.querySelectorAll('.btn.op').forEach(b => b.classList.remove('active'));
  const opBtn = [...document.querySelectorAll('.btn.op')].find(b => b.dataset.value === op);
  if (opBtn) opBtn.classList.add('active');
}

function calculate() {
  if (prev === null || operator === null) return;

  const a = prev;
  const b = parseFloat(current);
  let result;

  if (operator === '÷') {
    result = b === 0 ? 'Error' : a / b;
  } else if (operator === '×') {
    result = a * b;
  } else if (operator === '+') {
    result = a + b;
  } else if (operator === '-') {
    result = a - b;
  }

  expression.textContent = `${formatNum(a)} ${operator} ${formatNum(b)} =`;

  current = result === 'Error' ? 'Error' : formatNum(result);
  prev = null;
  operator = null;
  shouldReset = true;

  document.querySelectorAll('.btn.op').forEach(b => b.classList.remove('active'));
  updateDisplay();
}

function formatNum(n) {
  if (typeof n !== 'number') return n;
  // 소수점 처리: 부동소수점 오차 제거
  const str = parseFloat(n.toPrecision(10)).toString();
  return str;
}

function handleClear() {
  current = '0';
  prev = null;
  operator = null;
  shouldReset = false;
  expression.textContent = '';
  document.querySelectorAll('.btn.op').forEach(b => b.classList.remove('active'));
  updateDisplay();
}

function handleSign() {
  if (current === '0' || current === 'Error') return;
  current = current.startsWith('-') ? current.slice(1) : '-' + current;
  updateDisplay();
}

function handlePercent() {
  if (current === 'Error') return;
  current = formatNum(parseFloat(current) / 100);
  updateDisplay();
}

// 버튼 이벤트 위임
document.querySelector('.buttons').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;

  const action = btn.dataset.action;

  if (action === 'digit')    handleDigit(btn.dataset.value);
  if (action === 'dot')      handleDot();
  if (action === 'operator') handleOperator(btn.dataset.value);
  if (action === 'equals')   calculate();
  if (action === 'clear')    handleClear();
  if (action === 'sign')     handleSign();
  if (action === 'percent')  handlePercent();
});

// 키 → 버튼 매핑
const keyMap = {
  '0':'[data-value="0"]', '1':'[data-value="1"]', '2':'[data-value="2"]',
  '3':'[data-value="3"]', '4':'[data-value="4"]', '5':'[data-value="5"]',
  '6':'[data-value="6"]', '7':'[data-value="7"]', '8':'[data-value="8"]',
  '9':'[data-value="9"]', '.':'[data-action="dot"]',
  '+':'[data-value="+"]', '-':'[data-value="-"]',
  '*':'[data-value="×"]', '/':'[data-value="÷"]',
  'Enter':'[data-action="equals"]', '=':'[data-action="equals"]',
  'Escape':'[data-action="clear"]', '%':'[data-action="percent"]',
};

function flashButton(selector) {
  const btn = document.querySelector(selector);
  if (!btn) return;
  btn.classList.add('key-press');
  setTimeout(() => btn.classList.remove('key-press'), 120);
}

// 키보드 지원
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') handleDigit(e.key);
  if (e.key === '.')  handleDot();
  if (e.key === '+')  handleOperator('+');
  if (e.key === '-')  handleOperator('-');
  if (e.key === '*')  handleOperator('×');
  if (e.key === '/')  { e.preventDefault(); handleOperator('÷'); }
  if (e.key === 'Enter' || e.key === '=') calculate();
  if (e.key === 'Escape') handleClear();
  if (e.key === '%')  handlePercent();

  if (keyMap[e.key]) flashButton(keyMap[e.key]);
});
