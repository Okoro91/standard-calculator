const buttons = document.querySelectorAll('button');
let firstDisplay = document.querySelector('#display2');
let secondDisplay = document.querySelector('#display1');



 let add = (a, b) => a + b;
 let subtract = (a, b) => a - b;
 let multiply = (a, b) => a * b;
 let divide = (a, b) => a / b;
 let modulos = (a, b) => a % b;
 
 let firstDigit = '';
 let secondDigit = '';
 let operator = '';

 
 let operate = function(num1, num2, operator) {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        return divide(num1, num2);
    } else if (operator === '%') {
        return modulos(num1, num2);
    } else {
        console.error("Invalid operator");
        return 'error'; 
    }
};


   

let updateDisplay = function() {

    if(firstDigit){
        firstDisplay.value = firstDigit;
    }

    if(operator){
        secondDisplay.value  = `${firstDigit}  ${operator}`;
        firstDisplay.value = firstDigit;
    }

    if(secondDigit){
        secondDisplay.value  = `${firstDigit}  ${operator}`;
        firstDisplay.value = secondDigit;
    }

   
    if (result !== null) {
            firstDisplay.value = result.toString();
            secondDisplay.value  = `${firstDigit}  ${operator}  ${secondDigit}  =`;

    }

    if (typeof result === 'string'){

        if(secondDigit === ''){
            secondDisplay.value  = `${firstDigit}  ${operator}`;
            firstDisplay.value = firstDigit;
        }else{
            secondDisplay.value  = `${firstDigit}  ${operator}`;
            firstDisplay.value = secondDigit;
        }

    }

       

}

let removeCharacter = function() {
   let currentValue = firstDisplay.value;
   if(firstDigit === firstDisplay.value){
    firstDigit = currentValue.slice(0, -1);
    firstDisplay.value = currentValue.slice(0, -1);
   }else if(secondDigit === firstDisplay.value){
    secondDigit = currentValue.slice(0, -1);
    firstDisplay.value = currentValue.slice(0, -1);
   }
    updateDisplay(); 
};






let clearButton = function() {
    firstDigit = '';
    secondDigit = '';
    operator = '';
    result = null;
    firstDisplay.value = '';
    secondDisplay.value = '';
}

let zeroDivision = function() {
    if (secondDigit === '0' && operator === '/') {
        clearButton();
        firstDisplay.value = 'cannot div. by zero';
    }
}

let evaluatePair = function() {
    if (firstDigit && operator && secondDigit) {
        result = operate(parseFloat(firstDigit), parseFloat(secondDigit), operator);

        if(result.toString().includes('.')){
            result = result.toFixed(6)
        }
        varifyOperator = true;
    }
}

let toggleSign = function() {
    if (result !== null) {
        result = -result;
        updateDisplay();
    } else if (secondDigit !== '') {
        secondDigit = (parseFloat(secondDigit) * -1).toString();
        updateDisplay();
    } else if (firstDigit !== '') {
        firstDigit = (parseFloat(firstDigit) * -1).toString();
        updateDisplay();
    }
};

let result = null; 
let varifyOperator = false; 

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonValue = button.textContent;

        if ((buttonValue >= '0' && buttonValue <= '9') || buttonValue === '.') {

            if (buttonValue === '.' && (secondDigit.includes('.') || firstDigit.includes('.'))) {

                return;
            }
            
            if(result !== null && !varifyOperator){
                clearButton();
            }

            if(operator){
                secondDigit += buttonValue;
            }else{
                firstDigit += buttonValue;
            }
            
        } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/' || buttonValue === '%') {
            
            if (result !== null) {
                evaluatePair();
                firstDigit = result.toString();
                secondDigit = '';
                result = '';
                varifyOperator = true;
            }

            if (operator && secondDigit) {
                evaluatePair();
            }
            
            operator = buttonValue;
        
        } else if (buttonValue === '=') {

            if (firstDigit && operator && secondDigit) {
                evaluatePair();
                 varifyOperator = false;
                 zeroDivision();
                updateDisplay();
            }
        } else if(buttonValue === 'CE'){
            clearButton();
        }else if (buttonValue === 'DEL'){
            removeCharacter();
        }else if(buttonValue === '±'){
            toggleSign();
            console.log('i am a ghost');
        }

        updateDisplay();
    });
});


