//main function
window.onload=function(){
    let operator ="";
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
                operatorbtns.forEach(btn=>btn.disabled=true);
            }
    });
});

//clears the screen
    const clearscr = document.querySelector("#clear");
    clearscr.addEventListener("click",()=>{
        clearDisplay();
        operatorbtns.forEach(btn=>btn.disabled=false);});

//backspace one character
    const backspace = document.querySelector("#back");
    backspace.addEventListener("click",()=>{
        displayText.textContent=displayText.textContent.slice(0,-1);
        if(!hasOperator(displayText.textContent))
        operatorbtns.forEach(btn=>btn.disabled=false);
    });

//equal button
const equalbtn = document.querySelector("#equal");
equalbtn.addEventListener("click",()=>{
    doTheCalculations();
});
//answer function
function doTheCalculations(){
    displayText.textContent=equate(displayText.textContent);
    if(equate(displayText.textContent)==69)alert("Nice");
    operatorbtns.forEach(btn=>btn.disabled=false);
}
//point button
const point = document.querySelector("#point");
point.addEventListener("click",()=>{
    decideWhetherToAddPoint();
}); 

//point function 
function decideWhetherToAddPoint(){
    if(!(displayText.textContent.includes("."))){
        if(isNumber(displayText.textContent.charAt(
            displayText.textContent.length-1
        )))displayText.textContent+=".";
}else if(hasOperator(displayText.textContent)){
    let op = whichOperator(displayText.textContent); 
    let index = displayText.textContent.indexOf(op+"");
    let secondNum = displayText.textContent.slice(
        index+1,displayText.textContent.length);
        if(!(secondNum.includes("."))&&
        isNumber(displayText.textContent.charAt(
            displayText.textContent.length-1
        )))
        displayText.textContent+=".";
}
}
//keyboard buttons
document.addEventListener("keydown",(event)=>{
    if((isNumber(event.key)||isOperator(event.key))&&(event.key!=="."))
        displayText.textContent+=event.key;
    else if(event.key==="Backspace")
        displayText.textContent=displayText.textContent.slice(0,-1);
    else if(event.key===".")decideWhetherToAddPoint();
    else if(event.key==="="||"Enter")doTheCalculations();
});
}    
//Helpful functions

//checks if the given char is number
function isNumber(n){
    return /^\d$/.test(n.toString());
}

//checks if given char is operator or empty space or a point
function isOperator(s){
    return s==="."||s===""||s==="+"||s==="-"||s==="*"||s==="/";
}
//clears whole display
function clearDisplay(){
    const display =document.querySelector("#display");
    display.textContent="";
}

// equates a question
function equate(qn){
    let qnArr = qn.split("");
    let operator , numbers;
    for(let i=0;i<qnArr.length;i++){
        if(!(isNumber(qnArr[i])||qnArr[i]==".")){
            operator=qnArr[i];
        }
    }
    numbers = qn.split(""+operator);
    return operate(operator,...numbers);
}
//rounds off to 6 digits
function roundOff(num){
    return parseFloat(Number(num).toFixed(6));
}
//takess operator and 2 numbers and returns the answer
function operate(operator,a,b){
    let anum=parseFloat(a);
    let bnum=parseFloat(b);
    switch(operator){
        case "+":
            if(!bnum)return anum;
            return roundOff(anum+bnum);
        case "-":
            if(!bnum)return anum;
            return roundOff(anum-bnum);   
        case "*":
            if(!bnum)return anum;
            return roundOff(anum*bnum); 
        case "/":
            if(bnum==0){alert("Bruh");clearDisplay();return ;}
            if(!bnum)return anum;
            return roundOff(anum/bnum);        
        default:
            if(anum)return anum;
            break;
    }
}
//dotcount
function dotcount(s){
    let arr=s.split("");
    let count=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]===".")count++;
    }
    return count;
}
//if string contains an operator
function hasOperator(s){
    for(let i=0;i<s.length;i++){
        if(isOperator(s[i])&&s[i]!="."){
            return true;
        }
    }
    return false;
}
//which operator does it have
function whichOperator(s){
    for(let i=0;i<s.length;i++){
        if(isOperator(s[i])&&s[i]!="."){
            return s[i];
        }
    }
    return "";
}