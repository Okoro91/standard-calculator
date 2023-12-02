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

    if(operator && firstDigit){
        secondDisplay.value  = `${firstDigit}  ${operator}`;
        firstDisplay.value = firstDigit;
    }

    if(secondDigit){
        secondDisplay.value  = `${firstDigit}  ${operator}`;
        firstDisplay.value = secondDigit;
    }

   
    if (result !== null) {

        if (result % 1 !== 0) {
            
            result = parseFloat(result.toFixed(6));
        }
            firstDisplay.value = result;
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

function handleInput(inputValue) {

    const isForwardSlash = inputValue === '/' || event.key === '/' || event.keyCode === 111 || event.key === 'Divide';

    if ((inputValue >= '0' && inputValue <= '9') || inputValue === '.') {
        
        if (inputValue === '.' && (secondDigit.includes('.') || firstDigit.includes('.'))) {

                            return;
                        }
                        
                        if(result !== null && !varifyOperator){
                            clearButton();
                        }
            
                        if(operator){
                            secondDigit += inputValue;
                        }else{
                            firstDigit += inputValue;
                        }
    } else if (inputValue === '+' || inputValue === '-' || inputValue === '*' || isForwardSlash || inputValue === '%') {
       
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
                        
                        if(firstDigit){
                          operator = inputValue;
                        }
                        
    } else if (inputValue === '=' || inputValue === 'Enter') {
       
        if (firstDigit && operator && secondDigit) {
                            evaluatePair();
                             varifyOperator = false;
                             zeroDivision();
                             updateDisplay();
                        }
    } else if (inputValue === 'CE' || inputValue === 'Escape') {
       
        clearButton();
    } else if (inputValue === 'DEL' || inputValue === 'Backspace') {
        
        removeCharacter();
    } else if (inputValue === '±') {
        
        toggleSign();
    }
   
    updateDisplay();
}


document.addEventListener('keydown', function(event) {
    
    const keyValue = event.key || String.fromCharCode(event.keyCode);

    handleInput(keyValue);
});


buttons.forEach(button => {
    button.addEventListener('click', function() {
        
        const buttonValue = button.textContent;

        handleInput(buttonValue);
    });
});


