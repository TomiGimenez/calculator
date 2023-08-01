const numberButtons = document.querySelectorAll('#number-button');
const operatorButtons = document.querySelectorAll('#operator-button');
const equalsButton = document.querySelector('#equals-button');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const pointButton = document.querySelector('#point-button');
const screen = document.querySelector('#calculator-screen');

let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

window.addEventListener('keydown', setInput);
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
    currentOperation = null;
}

function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (screen.textContent === "") screen.textContent = "0";
    if (screen.textContent.includes(".")) return;
    screen.textContent += ".";
}

function deleteNumber() {
    screen.textContent = screen.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = screen.textContent;
    currentOperation = operator;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === "÷" && screen.textContent === "0") {
        alert("You can't divide by 0!")
        clear();
        return;
    }
    secondOperand = screen.textContent;
    screen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function setInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === ".") appendPoint();
    if (e.key === "=" || e.key === "Enter") evaluate();
    if (e.key === "Backspace") deleteNumber();
    if (e.key === "Escape") clear();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
        setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === "/") return "÷";
    if (keyboardOperator === "*") return "x";
    if (keyboardOperator === "-") return "-";
    if (keyboardOperator === "+") return "+";
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