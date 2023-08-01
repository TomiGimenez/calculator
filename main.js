let firstOperand = "";
let secondOperand = "";
let operator = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll('#number-button');
const operatorButtons = document.querySelectorAll('#operator-button');
const equalsButton = document.querySelector('#equals-button');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const pointButton = document.querySelector('#point-button');
const screen = document.querySelector('#calculator-screen');

numberButtons.forEach((button) =>
    button.addEventListener('click', () => 
    appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
    button.addEventListener('click', setOperator)
);

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
pointButton.addEventListener('click', appendPoint);

function appendNumber(number) {
    if (screen.textContent === "0" || shouldResetScreen) resetScreen();
    screen.textContent += number;
}

function resetScreen() {
    screen.textContent = "";
    shouldResetScreen = false;
}

function clear() {
    screen.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    operator = null;
}

function appendPoint() {
    if (shouldResetScreen) {
        resetScreen();
        screen.textContent = "0";
    }
    if (screen.textContent.includes(".")) return;
    screen.textContent += ".";
}

function deleteNumber() {
    screen.textContent = screen.textContent.toString().slice(0, -1);
}

function setOperator(operatorButton) {
    if (operator !== null) evaluate();
    firstOperand = screen.textContent;
    operator = operatorButton.target.textContent;
    shouldResetScreen = true;
}

function evaluate() {
    if (operator === null || shouldResetScreen) return;
    if (operator === "÷" && screen.textContent === "0") return;
    secondOperand = screen.textContent;
    screen.textContent = operate(operator, firstOperand, secondOperand);
    operator = null;
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
function factorial(n) {
    if (n === 0) return 1;
    let product = 1;
    for (n; n > 0; n--) {
        product *= n;
    }
    return product;
};

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '÷':
            if (b === 0) return null;
            else return divide(a, b);
        case '^':
            return power(a, b);
        case '!':
            return factorial(a);
        default:
            return null;
    }
}