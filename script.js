
window.onload=function(){
    let operator ="";
    let first,second;
    let displayText = document.querySelector("#display");
    clearDisplay();
    //Buttons action Listner 
    const buttons = Array.from(document.querySelectorAll(".buttons"));
    //numbers
    const numberbtns = buttons.filter((button)=>{
    return button.id[0]==="n";
    });
    numberbtns.forEach(btn=> {
        btn.addEventListener("click",()=>{
            displayText.textContent += btn.id[1];
    });
});
    //operators
    const operatorbtns = buttons.filter((button)=>{
        return button.id[0]==="o";
    });
    operatorbtns.forEach(btn=> {
        btn.addEventListener("click",()=>{
            if(!(isOperator(displayText.textContent.charAt(
                displayText.textContent.length-1
            )))){
                displayText.textContent += btn.id[1];
            }
    });
});
//checks if given char is operator
function isOperator(s){
    return s===""||s==="+"||s==="-"||s==="*"||s==="/";
}

//clears the screen
    const clearscr = document.querySelector("#clear");
    clearscr.addEventListener("click",clearDisplay);
//backspace one character
    const backspace = document.querySelector("#back");
    backspace.addEventListener("click",()=>{
        displayText.textContent=displayText.textContent.slice(0,-1);
    });

}

function clearDisplay(){
    const display =document.querySelector("#display");
    display.textContent="";
}

function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
function mul(a,b){
    return a*b;
}
function div(a,b){
    return a/b;
}
function roundOff(num){
    return Math.round(num);
}
function operate(operator,a,b){
    switch(operator){
        case "+":
            return add(a,b);
        case "-":
            return sub(a,b);   
        case "*":
            return mul(a,b); 
        case "/":
            return div(a,b);        
        default:
            break;
    }
}