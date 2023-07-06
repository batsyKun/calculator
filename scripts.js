
const numBtn = document.querySelectorAll("[data-num]");
const period = document.getElementById("period");
const display = document.getElementById("display");
const operator = document.querySelectorAll("[data-op]");
const displayMini = document.getElementById("miniDisplay");
const clrAll = document.getElementById("clrAll");
const clr = document.getElementById("clr");




period.addEventListener("click", () => addPeriod());
clr.addEventListener("click", () => display.textContent = display.textContent.slice(0, -1));
numBtn.forEach((button) => button.addEventListener("click", () => addNum(button.textContent)));
operator.forEach((button) => button.addEventListener("click", () => miniDisplayFn(button.textContent)));
clrAll.addEventListener("click", ()=> {
    display.textContent = "" ;
    displayMini.textContent = "";
})


let num;
let operands;
let operators;
function miniDisplayFn(operator) {
    if(operator != "=") addNum(operator);
    else if (operator == "=") {
        let displayContent1 = display.textContent;
        if (displayContent1.endsWith('*') || displayContent1.endsWith('/') || displayContent1.endsWith('+') || displayContent1.endsWith('-')) {    
            displayContent1 = displayContent1.slice(0, -1);
            console.log(displayContent1)
            display.textContent = displayContent1;}
            num = display.textContent;
            operands = num.split(/[-+*/]/);
            operators = num.match(/[-+*/]/g);
            let sum = parseFloat(operands[0]);
            for(let i = 0; i < operators.length; i++){
                console.log(operands[i+1]);
                let currentOperand = parseFloat(operands[i+1]);
                let currentOperator = operators[i]
                if (currentOperator === "+") {
                    sum += currentOperand;
                    console.log(sum)
                } else if (currentOperator === "-") {
                    sum -= currentOperand;
                } else if (currentOperator === "*") {
                    sum *= currentOperand;
                } else if (currentOperator === "/") {
                    sum /= currentOperand;
                }
            }
            let formattedResult = sum.toString();
            if (formattedResult.includes(".")) {
              formattedResult = Number(sum.toFixed(2)).toString();
              displayMini.textContent = formattedResult;
            }
        else{
            displayMini.textContent = sum;
        }        } 
}
let lastItem = ""
function addNum(num) {
    let displayContent = display.textContent;
    if(displayContent.startsWith("-")){
        displayContent = "0" + display.textContent;
        display.textContent = displayContent
    }
    
    if(num == "*" || num == "+" || num == "/" || num == "-"){
        if (displayContent.endsWith('*') || displayContent.endsWith('/') || displayContent.endsWith('+') || displayContent.endsWith('-')) {
            displayContent = displayContent.slice(0, -1);
            display.textContent = displayContent;
        }
    }
    display.append(num);
}
function addPeriod() {
    const numbers = display.textContent.split(/[-+*/]/);
    const lastNumber = numbers[numbers.length - 1];
    if(!lastNumber.includes(".")){
        display.append(".")
    }
}

