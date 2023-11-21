//all functions used by calculator

function sum (x, y){
    return x+y;
}

function difference (x, y){
    return x-y;
}

function product (x, y){
    return x*y;
}

function quotient (x, y){
    return x/y;
}

function operate (operator, x , y){
    x = parseFloat(x);
    y = parseFloat(y);
    switch(operator){
        case '+':
            return Math.round((sum(x,y)+Number.EPSILON)*100)/100;
        case '-':
            return Math.round((difference(x,y)+Number.EPSILON)*100)/100;
        case 'x':
            return Math.round((product(x,y)+Number.EPSILON)*100)/100;
        case '÷':
            if (y==0) {
                if (annoyed == true) return "I said no...";
                annoyed = true;
                return 'No...';
            }
            return Math.round((quotient(x,y)+Number.EPSILON)*100)/100;
    }

}

let x = 0, y = 0;
let operator = '';
let solved = true;
let annoyed = false;

const numbers = document.querySelectorAll('.number');
const decimal = document.querySelector('#decimal');
const operators = document.querySelectorAll('.operator');
const currentNum = document.querySelector('#currentNum');
const previousNum = document.querySelector('#previousNum');

//for the number and decimal buttons
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if(currentNum == "No...") currentNum.textContent='';
        if(solved == true) currentNum.textContent=''; //when equal sign was used, will create new expression;
        solved = false;
        if(number.textContent==="."){
            currentNum.textContent += ".";
            number.disabled = true;
            return;
        }
        currentNum.textContent += number.textContent;
    });
});

//for each operator symbol, excluding equal sign
operators.forEach((symbol) => {
    symbol.addEventListener('click', () => {
        decimal.disabled = false;
        if (solved == true) return "";
        if(previousNum.textContent == ''){
            x = currentNum.textContent;
            operator = symbol.textContent;
            previousNum.textContent = currentNum.textContent+' '+symbol.textContent;
            currentNum.textContent = '';
        } else if(currentNum.textContent == ''){
            operator = symbol.textContent;
            let expression = previousNum.textContent.split('');
            expression.pop();
            previousNum.textContent = expression.join('') + operator;
        } else {
            y = currentNum.textContent;
            if(y == 0 && operator == "÷") {
                currentNum.textContent = operate(operator, x, y);
                previousNum.textContent = '';
                x = '';
                y = '';
                solved = true;
                return;
            }
            previousNum.textContent = operate(operator, x, y);
            currentNum.textContent = '';
            x = previousNum.textContent;
            operator = symbol.textContent;
            previousNum.textContent += ' '+operator;
        }
    });
});

//for the equals sign; makes a new expression after sovling;
const equals = document.querySelector('#equals');
equals.addEventListener('click', ()=>{
    solved = true;
    if(currentNum.textContent == '') return '';
    y = currentNum.textContent;
    previousNum.textContent = '';
    currentNum.textContent = operate(operator, x, y);
    y = 0;
    decimal.disabled = false;
})

const clear = document.querySelector('#clear');
clear.addEventListener('click', ()=>{
    let expression = currentNum.textContent.split('');
    expression.pop();
    currentNum.textContent = expression.join('');
});

const allClear = document.querySelector('#allClear');
allClear.addEventListener('click', () => {
    currentNum.textContent = '';
    previousNum.textContent = '';
    x = 0;
    y = 0;
    operator = 0;
    solved = false;
    annoyed = false;
})