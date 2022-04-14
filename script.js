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