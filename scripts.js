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

function isProperNumber() {}

let numberA = null;
let numberB = null;
let operation = '';


