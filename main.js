const numberButtons = document.querySelectorAll('#number-button');
const operatorButtons = document.querySelectorAll('#operator-button');
const equalsButton = document.querySelector('#equals-button');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const pointButton = document.querySelector('#point-button');
const screen = document.querySelector('#calculator-screen');

let firstOperand = "";
let secondOperand = "";
let operator = null;
let shouldResetScreen = false;


numberButtons.forEach((button) =>
    button.addEventListener('click', () => 
    appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
    button.addEventListener('click', setOperator)
);

equalsButton.addEventListener('click', getScore);
clearButton.addEventListener('click', clearScreen);
deleteButton.addEventListener('click', deleteNumber);
pointButton.addEventListener('click', setPoint);

function appendNumber(number) {
    if (screen.textContent === "0" || shouldResetScreen === true) resetScreen();
    screen.textContent += number;
}

function setOperator(operatorButton) {
    if (operator === null) {
        firstOperand = screen.textContent;
        operator = operatorButton.target.textContent;
    } else {
        operator = operatorButton.target.textContent;
        getScore();
    }
    shouldResetScreen = true;
}

function getScore() {
    secondOperand = screen.textContent;
    firstOperand = operate(operator, firstOperand, secondOperand);
    secondOperand = "";
    screen.textContent = firstOperand;
}

function clearScreen() {
    screen.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    operator = null;
}

function resetScreen() {
    {
      screen.textContent = "";
      shouldResetScreen = false;
    }
}

function deleteNumber() {}

function setPoint() {
    if (screen.textContent.includes(".") || screen.textContent === "") return;
    screen.textContent += ".";
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
        case '/':
            return divide(a, b);
        case '^':
            return power(a, b);
        case '!':
            return factorial(a);
        default:
            return;
    }
}