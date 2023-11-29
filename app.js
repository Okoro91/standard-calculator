 const button = document.querySelectorAll('button');
 const firstDisplay = document.querySelector('#display1');
 const secondDisplay = document.querySelector('#display2');

 let add = (a, b) => a + b;
 let subtract = (a, b) => a - b;
 let multiply = (a, b) => a * b;
 let divide = (a, b) => a / b;
 let modulos = (a, b) => a % b;
 
 let firstDigit;
 let seconDigit;
 let assignment;

 let operate = function(num1, num2, assign){

    if(assign === add){
       return add(num1, num2);
    }else if(assign === subtract){
       return subtract(num1, num2);
    }else if(assign === multiply){
       return multiply(num1, num2);
    }else if(assign === divide){
       return divide(num1, num2);
    }else if(assign === modulos){
       return modulos(num1, num2);
    }
 }

 console.log(operate(10, 8, modulos));