const values = [["Plus", "Minus", "Equals", "Divide", "Multiply", "Point"], ["+","-","=","/","X","."]];
const view = {
    elem: document.getElementById("viewport"),
    content: [],
};
function Multiply(a,b){
    return (a*b);
}
function Divide(a,b){
    return (a/b);
}
function Plus(a,b){
    return (a+b);
}
function Minus(a,b){
    return (a-b);
}
const funcs = [["+", "-", "/", "X"], [Plus, Minus, Divide, Multiply]];
let temponaryResult = 0;
function find(elem){
    if(Boolean(parseInt(elem)) || elem === "0"){
        return elem;
    }
    for(let i = 0; i < values[0].length; i++){
        if(elem === values[0][i]){
            return values[1][i];
        }
    }
}
function findFunc(elem){
    for(let i = 0; i < funcs[0].length; i++){
        if(elem === funcs[0][i]){
            return funcs[1][i];
        }
    }
}
function sizeUpdate(){
    const width = document.querySelector('.Button').clientWidth;
    view.elem.style.fontSize = (width * 0.625).toString() + "px";
    view.elem.style.lineHeight = width + "px";
    for(elem of document.getElementsByClassName("Button")){
        elem.style.fontSize = (width * 0.625).toString() + "px";
        elem.style.lineHeight = width + "px";
    }
}
function addEvents(){
    const buttons = document.getElementsByClassName("Button");
    for(elem of buttons){
        elem.addEventListener("click", function(ev){
            
            const temp = ev.target;
            const ch = find(temp.id.split("button")[1]);
            const len = view.content.length;
            if(ch !== "="){
                if(Boolean(parseFloat(view.content[len-1])) || Boolean(parseFloat(ch)))
                {
                    if((!Boolean(parseFloat(ch)) || !Boolean(parseFloat(view.content[len-1]))) && ch !=='.'){
                        view.content.push(ch);
                        
                    }
                    else{
                        view.content[len-1] += ch;
                    }
                    
                }               
                else{
                    view.content[len-1] = (ch);
                }
                
            }
            else{
                let result = 0;
                let que = [];
                let j = 0;
                for(let i = 0; i < view.content.length; i++){
                    // if(!Boolean(parseInt(view.content[i])) && j !== 0 ){
                    if(view.content[i] === que[0] && j !== 0){
                        result = findFunc(view.content[i])(parseFloat(view.content[i-1]), parseFloat(view.content[i+1]));
                        view.content[i+1] = result.toString();
                        view.content.splice(i-1, 2);
                        i = 0;
                        j++;
                        que.splice(0,1);
                    }
                    if(j === 0){
                        if(!Boolean(parseFloat(view.content[i]))){
                            que.push(view.content[i]);
                        }
                        if( i === view.content.length -1){
                            i = 0;
                            j++;
                            for(let t = 0; t < que.length; t++){
                                if((que[t+1] === "/" || que[t+1] === "X") && (que[t] ==="+" || que[t] ==="-" ) && t !== que.length - 1){
                                    let tmp = que[t];
                                    que[t] = que[t+1];
                                    que[t+1] = tmp;
                                }
                            }
                        }
                        
                    }
                }
                view.content.splice(0, view.content.length);
                view.content.push(result);
            }
            view.elem.textContent = view.content.join("");
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    sizeUpdate();
    addEvents();
    const buttons = document.getElementsByClassName("Button");
    for(elem of buttons){
        temp = elem.id.split("button")[1];
        elem.textContent = find(temp);        
    }
    document.getElementById("viewport").addEventListener("click", function(){
        view.content.splice(0, view.content.length);
        view.elem.textContent = view.content.join("")
    });
});

window.addEventListener("resize", sizeUpdate);