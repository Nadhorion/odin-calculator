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
function division(a, b) {return a / b; }

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
        
        if (!operation) {
            numberA += buttonClicked.id;
            calculatorScreen.textContent = numberA;
        } else if (operation) {
            numberB += buttonClicked.id;
            calculatorScreen.textContent = numberB;
        }

    } else if (buttonClicked.className === "operator") {

        if (numberA) {
            operation = buttonClicked.id;
        }

    } else if (buttonClicked.id === "=") {

        if (numberA && numberB && operation) {
            result = operate(+numberA, +numberB, operation);
            calculatorScreen.textContent = result;
        }

    } else if (buttonClicked.id === "clear") {

        numberA = '';
        numberB = '';
        operation = '';
        result = '';
        calculatorScreen.textContent = '';

    } else if (buttonClicked.id === "backspace") {

        if (result) return;
        if (numberB) {
            numberB = numberB.slice(0,-1);
            calculatorScreen.textContent = numberB;
            return;
        } else if (numberA && !numberB) {
            numberA = numberA.slice(0,-1);
            calculatorScreen.textContent = numberA;
            return;
        }

    }
    
    //add number to numberA string
    //if target is operator, 

}




