/* ── 계산 상태 ─────────────────────────────────────── */
const displayCurrent    = document.querySelector('.display__current');
const displayExpression = document.querySelector('.display__expression');
const keypad            = document.querySelector('.keypad');

let currentInput  = '0';
let previousInput = '';
let operator      = null;
let shouldReset   = false;

/* ── 이력 관리 ────────────────────────────────────── */
const HISTORY_KEY = 'calculator-history';
const HISTORY_LIMIT = 50;
let history = [];

const historyToggle   = document.getElementById('historyToggle');
const historyPanel    = document.getElementById('historyPanel');
const historyList     = document.getElementById('historyList');
const historyEmpty    = document.getElementById('historyEmpty');
const historyPin      = document.getElementById('historyPin');
const historyClearBtn = document.getElementById('historyClearBtn');

const HISTORY_PINNED_KEY = 'calculator-history-pinned';
let historyPinned = false;
let hoverTimeout = null;

function loadHistory() {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    history = saved ? JSON.parse(saved) : [];
  } catch (e) {
    history = [];
  }

  try {
    const savedPinned = localStorage.getItem(HISTORY_PINNED_KEY);
    historyPinned = savedPinned === 'true';
  } catch (e) {
    historyPinned = false;
  }

  updatePinButton();
  updatePanelVisibility();
}

function saveHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function addToHistory(expr, result) {
  history.unshift({ expression: expr, result: result });
  if (history.length > HISTORY_LIMIT) history.pop();
  saveHistory();
}

function updatePinButton() {
  historyPin.setAttribute('aria-pressed', String(historyPinned));
  if (historyPinned) {
    historyPin.classList.add('is-pinned');
  } else {
    historyPin.classList.remove('is-pinned');
  }
}

function updatePanelVisibility() {
  if (historyPinned) {
    historyPanel.classList.add('is-pinned');
    document.body.classList.add('history-pinned');
  } else {
    historyPanel.classList.remove('is-pinned');
    document.body.classList.remove('history-pinned');
  }
}

function renderHistory() {
  historyList.innerHTML = '';

  if (history.length === 0) {
    historyEmpty.hidden = false;
  } else {
    historyEmpty.hidden = true;
    history.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = 'history-list__item';
      li.innerHTML = `
        <span class="history-list__expression">${item.expression}</span>
        <span class="history-list__arrow">→</span>
        <span class="history-list__result">${item.result}</span>
      `;
      li.addEventListener('click', () => restoreFromHistory(item.result));
      historyList.appendChild(li);
    });
  }
}

function restoreFromHistory(result) {
  currentInput = String(result);
  previousInput = '';
  operator = null;
  shouldReset = true;
  displayExpression.textContent = '';
  document.querySelectorAll('.key--op').forEach(btn => btn.classList.remove('is-active'));
  updateDisplay(currentInput);
}

function showPanel() {
  renderHistory();
  if (!historyPinned) {
    historyPanel.classList.add('is-hovered');
  }
}

function hidePanel() {
  if (!historyPinned) {
    historyPanel.classList.remove('is-hovered');
  }
}

function togglePin() {
  historyPinned = !historyPinned;
  localStorage.setItem(HISTORY_PINNED_KEY, String(historyPinned));
  updatePinButton();
  updatePanelVisibility();
  if (historyPinned) {
    renderHistory();
  }
}

// 호버 이벤트: historyToggle과 historyPanel 중 하나에 마우스가 있으면 표시
historyToggle.addEventListener('mouseenter', () => {
  if (!historyPinned) {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    showPanel();
  }
});

historyToggle.addEventListener('mouseleave', () => {
  if (!historyPinned) {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => hidePanel(), 150);
  }
});

historyPanel.addEventListener('mouseenter', () => {
  if (!historyPinned) {
    if (hoverTimeout) clearTimeout(hoverTimeout);
  }
});

historyPanel.addEventListener('mouseleave', () => {
  if (!historyPinned) {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => hidePanel(), 150);
  }
});

historyToggle.addEventListener('click', () => {
  if (!historyPinned) {
    if (!historyPanel.classList.contains('is-hovered')) {
      showPanel();
    } else {
      hidePanel();
    }
  }
});

historyPin.addEventListener('click', togglePin);

historyClearBtn.addEventListener('click', () => {
  if (confirm('계산 기록을 모두 삭제하시겠어요?')) {
    history = [];
    saveHistory();
    renderHistory();
  }
});

/* ── 계산 로직 ────────────────────────────────────── */
function updateDisplay(value) {
  displayCurrent.textContent = value;
  displayCurrent.classList.toggle('is-error', value === 'Error');
  displayCurrent.classList.remove('is-updated');
  void displayCurrent.offsetWidth;
  displayCurrent.classList.add('is-updated');
}

function handleNumber(value) {
  if (shouldReset) {
    currentInput = value;
    shouldReset = false;
  } else {
    if (currentInput.replace('-', '').length >= 9) return;
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
  if (currentInput === 'Error') return;
  if (operator && !shouldReset) calculate(false);
  previousInput = currentInput;
  operator = op;
  shouldReset = true;
  displayExpression.textContent = `${previousInput} ${operator}`;
  document.querySelectorAll('.key--op').forEach((btn) => {
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
    case '×': result = prev * curr; break;
    case '−': result = prev - curr; break;
    case '+': result = prev + curr; break;
  }

  if (showEquals) {
    displayExpression.textContent = `${previousInput} ${operator} ${currentInput} =`;
    // 이력 기록: 최종 결과만 (showEquals === true일 때)
    if (result !== 'Error') {
      const resultStr = String(parseFloat(result.toFixed(10)));
      addToHistory(`${previousInput} ${operator} ${currentInput}`, resultStr);
    }
  }

  currentInput = result === 'Error' ? 'Error' : String(parseFloat(result.toFixed(10)));
  operator = null;
  shouldReset = true;
  document.querySelectorAll('.key--op').forEach((btn) => btn.classList.remove('is-active'));
  updateDisplay(currentInput);
}

function handleClear() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  shouldReset = false;
  displayExpression.textContent = '';
  document.querySelectorAll('.key--op').forEach((btn) => btn.classList.remove('is-active'));
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

function handleBackspace() {
  if (currentInput === 'Error' || shouldReset) return;
  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
  updateDisplay(currentInput);
}

keypad.addEventListener('click', (e) => {
  const key = e.target.closest('.key');
  if (!key) return;

  switch (key.dataset.action) {
    case 'number':   handleNumber(key.dataset.value); break;
    case 'decimal':  handleDecimal(); break;
    case 'operator': handleOperator(key.dataset.value); break;
    case 'equals':   calculate(); break;
    case 'clear':    handleClear(); break;
    case 'sign':     handleSign(); break;
    case 'percent':  handlePercent(); break;
  }
});

/* ── 키보드 입력 ────────────────────────────────── */
const OPERATOR_KEYS = { '+': '+', '-': '−', '*': '×', 'x': '×', 'X': '×', '/': '÷' };

function flashKey(key) {
  const btn = document.querySelector(`[data-key="${CSS.escape(key)}"]`);
  if (!btn) return;
  btn.classList.add('is-pressed');
  setTimeout(() => btn.classList.remove('is-pressed'), 120);
}

document.addEventListener('keydown', (e) => {
  // 시트가 열려 있으면 Escape는 시트 닫기 우선
  if (e.key === 'Escape' && !historySheet.hidden) {
    e.preventDefault();
    closeHistory();
    return;
  }

  const { key } = e;

  if (/^[0-9]$/.test(key)) {
    handleNumber(key);
    flashKey(key);
  } else if (key === '.') {
    handleDecimal();
    flashKey('.');
  } else if (key in OPERATOR_KEYS) {
    if (key === '/') e.preventDefault();
    handleOperator(OPERATOR_KEYS[key]);
    flashKey(key === 'x' || key === 'X' ? '*' : key);
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    calculate();
    flashKey('Enter');
  } else if (key === 'Backspace') {
    e.preventDefault();
    handleBackspace();
  } else if (key === 'Escape' || key === 'Delete') {
    handleClear();
    flashKey('Escape');
  } else if (key === '%') {
    handlePercent();
    flashKey('%');
  }
});

/* ── 초기화 ────────────────────────────────────── */
loadHistory();
