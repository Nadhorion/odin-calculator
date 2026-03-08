let numberA = '';
let numberB = '';
let operation = '';
let result = '';
let calculatorScreen = document.querySelector('#screen');
const calculatorDiv = document.querySelector('#calculator');
calculatorDiv.addEventListener('click', calculatorInteraction);

function addition(a, b) { return a + b; }
function subtraction(a, b) { return a - b; }
function multiplication(a, b) { return a * b; }
function division(a, b) {
    if (b === 0) {
        alert("Are ya tryna kill me!?...Impossible.");
        return "Division by 0 :("
    };
    return a / b; 
}

function operate(a, b, operator) {

    switch(operator) {
        case '+':
            return addition(a, b);
        case '-':
            return subtraction(a, b);
        case '*':
            return multiplication(a, b);
        case '/':
            return division(a, b);
        default:
            console.log('Not getting proper operator. Formatting?');
    }
}

function calculatorInteraction(event) {
    let buttonClicked = event.target;
    if (buttonClicked.className === "number") {
        numberClicked(buttonClicked);
    } else if (buttonClicked.id === "decimal") {
        decimalClicked();
    } else if (buttonClicked.className === "operator") {
        operatorClicked(buttonClicked);
    } else if (buttonClicked.id === "=") {
        result = evaluate();
        if (!(result === '')) updateScreen(result);
    } else if (buttonClicked.id === "clear") {
        clear();
    } else if (buttonClicked.id === "backspace") {
        backspace();
    }
}

function numberClicked(buttonClicked) {
    if (!(result === '')) clear();
    //If there is no operator saved (clicked), we are still on numberA, else: numberB.
    if (!operation) {
        numberA += buttonClicked.id;
        updateScreen(numberA);
    } else if (operation) {
        numberB += buttonClicked.id;
        updateScreen(numberB);
    } 
}

function decimalClicked() {
    if (!(result === '')) clear();
    if (!operation) {
        if (numberA.includes(".")) return;
        numberA += (!numberA) ? "0." : ".";
        updateScreen(numberA);
    } else if (operation) {
        if (numberB.includes(".")) return;
        numberB += (!numberB) ? "0." : ".";
        updateScreen(numberB);
    } 
}

function operatorClicked(buttonClicked) {
    if (numberA && !numberB) {
        operation = buttonClicked.id;
    } else if (numberB) {
        let currentEvaluation = evaluate();
        let previousOperand = numberB;
        clear();
        numberA = currentEvaluation;
        updateScreen(previousOperand);
        operation = buttonClicked.id;
    }
}

function evaluate() {
    if (numberA && numberB && operation) {
        return operate(+numberA, +numberB, operation);
    }
    return '';
}

function clear() {
    numberA = '';
    numberB = '';
    operation = '';
    result = '';
    updateScreen('0');
}

function backspace() {
    if (result) return;
    if (numberB) {
        numberB = numberB.slice(0,-1);
        updateScreen(numberB);
        return;
    } else if (numberA && !numberB) {
        numberA = numberA.slice(0,-1);
        updateScreen(numberA);
        return;
    }
}

function updateScreen(value, isOperand) {
    calculatorScreen.textContent = value;
}



