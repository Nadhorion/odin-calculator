let numberA = '';
let numberB = '';
let operation = '';
let result = '';
let calculatorScreen = document.querySelector('#screen');
const calculatorDiv = document.querySelector('#calculator');
calculatorDiv.addEventListener('click', calculatorClickInteraction);
document.addEventListener('keydown', calculatorKeyboardInteraction);

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

function calculatorClickInteraction(event) {
    let buttonClicked = event.target;
    if (buttonClicked.className === "number") {
        numberClicked(buttonClicked);
    } else if (buttonClicked.id === "decimal") {
        decimalClicked();
    } else if (buttonClicked.className === "operator") {
        operatorClicked(buttonClicked);
    } else if (buttonClicked.id === "=") {
        result = evaluate();
        if (isReal(result)) updateScreen(result, true);
    } else if (buttonClicked.id === "clear") {
        clear();
    } else if (buttonClicked.id === "backspace") {
        backspace();
    }
}

function calculatorKeyboardInteraction(event) {
    const keyPressed = event.key;

    // Used to convert a pressed key into an object that 
    // can easily be passed into calculatorClickInteraction() 
    // for handling.
    const keyConvertedObject = {target: 
        {
            className: '',
            id: '',
        }
    };
    const keyConverted = keyConvertedObject.target;
    const numberKeys = Array.from('0123456789');
    const operatorKeys = Array.from('+-*/');
    const equalsKey = '=';
    const decimalKey = '.';
    const backspaceKey = 'Backspace';
    const enterKey = 'Enter';

    if (numberKeys.includes(keyPressed)) {
        keyConverted.className = 'number';
        keyConverted.id = keyPressed;
        calculatorClickInteraction(keyConvertedObject);
    } else if (operatorKeys.includes(keyPressed)) {
        keyConverted.className = 'operator';
        keyConverted.id = keyPressed;
        calculatorClickInteraction(keyConvertedObject);
    } else if (decimalKey === keyPressed) {
        keyConverted.id = keyPressed;
        calculatorClickInteraction(keyConvertedObject);
    } else if (backspaceKey === keyPressed) {
        keyConverted.id = 'backspace';
        calculatorClickInteraction(keyConvertedObject);
    } else if (enterKey === keyPressed || equalsKey === keyPressed) {
        keyConverted.id = '=';
        calculatorClickInteraction(keyConvertedObject);
    }
}

function numberClicked(buttonClicked) {
    if (isReal(result)) clear();
    //If there is no operator saved (clicked), we are still on numberA, else: numberB.
    if (!operation) {
        numberA = (numberA !== '0') ? numberA + buttonClicked.id : buttonClicked.id;
        updateScreen(numberA);
    } else if (operation) {
        numberB = (numberB !== '0') ? numberB + buttonClicked.id : buttonClicked.id;
        updateScreen(numberB);
    } 
}

function decimalClicked() {
    if (isReal(result)) clear();
    if (!operation) {
        if (numberA.includes(".")) return;
        numberA += (!isReal(numberA)) ? "0." : ".";
        updateScreen(numberA);

    } else if (operation) {
        if (numberB.includes(".")) return;
        numberB += (!isReal(numberB)) ? "0." : ".";
        updateScreen(numberB);
    } 
}

function operatorClicked(buttonClicked) {
    if (isReal(result)) clear();
    if (isReal(numberA) && !isReal(numberB)) {
        operation = buttonClicked.id;
    } else if (isReal(numberB)) {
        let currentEvaluation = evaluate();
        let previousOperand = numberB;
        clear();
        numberA = currentEvaluation;
        updateScreen(previousOperand);
        operation = buttonClicked.id;
    } else if (!isReal(numberA)) {
        numberA = '0';
        operation = buttonClicked.id;
    }
}

function evaluate() {
    if (isReal(numberA) && isReal(numberB) && operation) {
        return operate(+numberA, +numberB, operation);
    }
}

function clear() {
    numberA = '';
    numberB = '';
    operation = '';
    result = '';
    updateScreen('0');
}

function backspace() {
    if (isReal(result)) {
        clear()
        return;
    }
    if (isReal(numberB)) {
        numberB = numberB.slice(0,-1);
        if (!isReal(numberB)) numberB = '0';
        updateScreen(numberB);
        return;
    } else if (isReal(numberA) && !isReal(numberB)) {
        numberA = numberA.slice(0,-1);
        if (!isReal(numberA)) numberA = '0';
        updateScreen(numberA);
        return;
    }
}

function isReal(value) {
    return (value === '' || value === undefined) ? false : true;    
}

function updateScreen(value, isResult) {
    let valueForScreen = (isResult) ? Math.floor(value *10000) / 10000 : value;
    calculatorScreen.textContent = valueForScreen;
}



