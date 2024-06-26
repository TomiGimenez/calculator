let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll('#number-button');
const operatorButtons = document.querySelectorAll('#operator-button');
const factorialButton = document.querySelector('#factorial-button');
const equalsButton = document.querySelector('#equals-button');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const pointButton = document.querySelector('#point-button');
const lastOperationScreen = document.querySelector('#lastOperationScreen');
const currentOperationScreen = document.querySelector('#currentOperationScreen');

window.addEventListener('keydown', handleKeyboardInput);
equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
pointButton.addEventListener('click', appendPoint);

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
);

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen) {
        if (currentOperation) {
            resetScreen();
        } else {
        resetScreen();
        lastOperationScreen.textContent = '';
        }
    }
    currentOperationScreen.textContent += number;
}

function resetScreen() {
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
}

function clear() {
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (currentOperationScreen.textContent === '') currentOperationScreen.textContent = "0";
    if (currentOperationScreen.textContent.includes('.')) return;
    currentOperationScreen.textContent += '.';
}

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true;

    if (currentOperation === '!') {
        console.log("dentro");
        currentOperationScreen.textContent = roundResult(
            operate('!', firstOperand, 0)
        );
        lastOperationScreen.textContent = `${firstOperand} ${currentOperation} =`
        currentOperation = null;
        shouldResetScreen = true;
    }

}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
        alert("You can't divide by 0!")
        return;
    }
    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null;
    shouldResetScreen = true; // Borra currentOperationScreen al escribir un numero nuevo despues de una operacion
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendPoint();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷';
    if (keyboardOperator === '*') return 'x';
    if (keyboardOperator === '-') return '-';
    if (keyboardOperator === '+') return '+';
}
// Funcion suma
function add(a, b) {
    return a + b;
};
// Funcion resta
function substract(a, b) {
    return a - b;
};
// Funcion multiplicacion
function multiply(a, b) {
    return a * b;
};
// Funcion division
function divide(a, b) {
    return a / b;
};
// Funcion potencia
function power(a,b) {
    return a**b;
};
// Funcion potencia
function factorial(a) {
    if (a === 0) return 1;
    let product = 1;
    for (let i = a; i > 0; i--) {
        product *= i;
    }
    return product;
};

function operate(operator, a, b) {
    a = Number(a);
    if (operator === '!') {
        return factorial(a);
    }
    b = Number(b);
    switch(operator.toLowerCase()) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            if (b === 0) return null;
            else return divide(a, b);
        case '^':
            return power(a, b);
        default:
            return null;
    }
}