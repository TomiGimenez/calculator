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
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        case '**':
            return power(a, b);
        default:
            return;
    }
}