const displayCurrent    = document.querySelector('.display__current');
const displayExpression = document.querySelector('.display__expression');

let currentInput  = '0';
let previousInput = '';
let operator      = null;
let shouldReset   = false;  // 다음 숫자 입력 시 현재 값 초기화 여부

function updateDisplay(value) {
  displayCurrent.textContent = value;
  displayCurrent.classList.remove('is-updated');
  void displayCurrent.offsetWidth;          // reflow → animation 재실행
  displayCurrent.classList.add('is-updated');
}

function handleNumber(value) {
  if (shouldReset) {
    currentInput = value;
    shouldReset  = false;
  } else {
    if (currentInput.replace('-', '').length >= 9) return; // 최대 9자리
    currentInput = currentInput === '0' ? value : currentInput + value;
  }
  updateDisplay(currentInput);
}

function handleDecimal() {
  if (shouldReset) { currentInput = '0'; shouldReset = false; }
  if (currentInput.includes('.')) return;
  currentInput += '.';
  updateDisplay(currentInput);
}

function handleOperator(op) {
  if (operator && !shouldReset) calculate(false);  // 연속 연산: 3 + 4 + → 7 +
  previousInput = currentInput;
  operator      = op;
  shouldReset   = true;
  displayExpression.textContent = `${previousInput} ${operator}`;
  document.querySelectorAll('.key--op').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.value === op);
  });
}

function calculate(showEquals = true) {
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(curr) || !operator) return;

  let result;
  switch (operator) {
    case '÷': result = curr === 0 ? 'Error' : prev / curr; break;
    case '×': result = prev * curr;  break;
    case '−': result = prev - curr;  break;
    case '+': result = prev + curr;  break;
  }

  if (showEquals) {
    displayExpression.textContent = `${previousInput} ${operator} ${currentInput} =`;
  }

  currentInput = result === 'Error' ? 'Error' : String(parseFloat(result.toFixed(10)));
  operator     = null;
  shouldReset  = true;
  document.querySelectorAll('.key--op').forEach(btn => btn.classList.remove('is-active'));
  updateDisplay(currentInput);
}

function handleClear() {
  currentInput  = '0';
  previousInput = '';
  operator      = null;
  shouldReset   = false;
  displayExpression.textContent = '';
  document.querySelectorAll('.key--op').forEach(btn => btn.classList.remove('is-active'));
  updateDisplay('0');
}

function handleSign() {
  if (currentInput === '0' || currentInput === 'Error') return;
  currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
  updateDisplay(currentInput);
}

function handlePercent() {
  if (currentInput === 'Error') return;
  currentInput = String(parseFloat(currentInput) / 100);
  updateDisplay(currentInput);
}

document.querySelector('.keypad').addEventListener('click', (e) => {
  const key = e.target.closest('.key');
  if (!key) return;

  switch (key.dataset.action) {
    case 'number':   handleNumber(key.dataset.value); break;
    case 'decimal':  handleDecimal();                 break;
    case 'operator': handleOperator(key.dataset.value); break;
    case 'equals':   calculate();                     break;
    case 'clear':    handleClear();                   break;
    case 'sign':     handleSign();                    break;
    case 'percent':  handlePercent();                 break;
  }
});
