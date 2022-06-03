const resultSelector = document.querySelector(".result h2");
const plus = document.querySelector(".num.plus");
const minus = document.querySelector(".num.minus");
const submit = document.querySelector(".submit");
const reset = document.querySelector(".reset");
const temp = document.querySelector(".temp");
const nums = document.querySelectorAll(".num");

let text = document.querySelector(".result h2");

let numStack = [];
let operStack = [];
let operation = []


let num = '';
let result='';


function handleOperate() {
    for(let i=operation.length;i>0;i--) {
        const item = operation.pop();
        if(!isNaN(item)) {
            numStack.push(item);
        }else if(item=='*' || item=='/'){
            if(item=='*') {
                const num1 = Number(operation.pop());
                const num2 = Number(numStack.pop());
                result = num1*num2;
                numStack.push(result);
            }
            if(item=='/') {
                const num1 = Number(operation.pop());
                const num2 = Number(numStack.pop());
                result = num1/num2;
                numStack.push(result);
            }
        }else {
            operStack.push(item)
        }
    }
}

function finalOperate(){
    while(operStack.length) {
        const op = operStack.pop();
        if(op=='+') {
            const num1 = Number(numStack.pop());
            const num2 = Number(numStack.pop());
            result = num1+num2;
            numStack.push(result)
            console.log(numStack);
        }    
        if(op=='-') {
            const num1 = Number(numStack.pop());
            const num2 = Number(numStack.pop());
            result = num1-num2;
            numStack.push(result)
        }    
        text.innerText=result;
    }
}
let tempNum = '';
nums.forEach((el,index)=>{
    el.addEventListener("click", (e)=>{
        const value = e.target.value;
        if(!isNaN(value)) { //숫자면
            num+= value;
            if(num.length > 1){//두자리수이면
                operation.pop();
                operation.push(num);
            }else{
                operation.push(value);
                text.innerText +=value;    
            }
            tempNum+=value;
        }else{ //문자를 만나면
            num='';
            operation.push(value);
            text.innerText+=value;
            tempNum+=value;
        }
        console.log(operation.join(""))
        text.innerText=tempNum;
    })
})

submit.addEventListener("click", ()=>{
    handleOperate()
    finalOperate();
    temp.innerText=tempNum;
})

reset.addEventListener("click", ()=>{
    numStack = [];
    operStack = [];
    operation = []
    num = '';
    result='';
    temp.innerText='0';
    text.innerText='';
})