let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    document.getElementById('display').textContent = displayValue;
}

function appendNumber(num) {
    if (waitingForSecondOperand) {
        displayValue = num;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

function appendOperator(op) {
    const value = parseFloat(displayValue);

    if (firstOperand === null) {
        firstOperand = value;
    } else if (operator) {
        firstOperand = calculateResult();
        displayValue = String(firstOperand);
    }

    operator = op;
    waitingForSecondOperand = true;
}

function calculateResult() {
    const value = parseFloat(displayValue);

    switch (operator) {
        case '+': return firstOperand + value;
        case '-': return firstOperand - value;
        case '*': return firstOperand * value;
        case '/': return firstOperand / value;
        default: return value;
    }
}

function calculate() {
    if (!operator) return;
    displayValue = String(calculateResult());
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

document.addEventListener('keydown', e => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendDecimal();
    if ('+-*/'.includes(e.key)) appendOperator(e.key);
    if (e.key === 'Enter') calculate();
    if (e.key === 'Escape') clearDisplay();
});
