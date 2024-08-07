const regras = [["a", "ai"], ["e", "enter"], ["i", "imes"], ["o", "ober"], ["u", "ufat"]];
const characters = " 1234567890!@#$%¨&*()-_=+'\"|\\,<.>;:/?°~^´`[{]}§abcdefghijklmnopqrstuvwxyz\n";
const mensagem = "Digite o texto que você deseja criptografar ou descriptografar";

var textPreCript = "";
var textPosCript = "";

const textarea = document.getElementById("text-crip");
const resultPanel = document.getElementById("result");

document.getElementById("cript").onclick = ()=>{
    
    textPreCript = textarea.value;
    let criptText = criptografar(textarea.value);
    textPosCript = criptText;    

    if(typeof criptText == "boolean"){

        resultPanel.querySelector("img").style.display = "inline-block";
        resultPanel.querySelector("h3").style.display = "block";
        resultPanel.querySelector("p").textContent = mensagem;        
        resultPanel.querySelector("button").style.display = "none";
        resultPanel.style.justifyContent = "center";
        
    }else{

        resultPanel.querySelector("img").style.display = "none";
        resultPanel.querySelector("h3").style.display = "none";
        resultPanel.querySelector("p").textContent = criptText;    
        resultPanel.querySelector("button").style.display = "block";
        resultPanel.style.justifyContent = "space-between";
        textarea.value = "";

    }

}

document.getElementById("descript").onclick = ()=>{

    textPreCript = textarea.value;
    let descriptText = descriptografar(textarea.value);    
    textPosCript = descriptText;    

    if(typeof descriptText == "boolean"){
        
        resultPanel.querySelector("img").style.display = "inline-block";
        resultPanel.querySelector("h3").style.display = "block";
        resultPanel.querySelector("p").textContent = mensagem;
        resultPanel.querySelector("button").style.display = "none";
        resultPanel.style.justifyContent = "center";

    }else{

        resultPanel.querySelector("img").style.display = "none";
        resultPanel.querySelector("h3").style.display = "none";
        resultPanel.querySelector("p").textContent = descriptText;
        resultPanel.querySelector("p").className = "text-result";
        resultPanel.querySelector("button").style.display = "block";
        resultPanel.style.justifyContent = "space-between";
        textarea.value = "";

    }    


}

document.getElementById("clear").onclick = ()=>{

    textarea.value = "";

}

document.getElementById("copy").onclick = ()=>{

    let result = document.createElement("textarea");    
    result.value = document.getElementById("text-result").textContent;    
    result.style.position = "fixed";
    result.style.left = "-9999px";    
    document.body.appendChild(result);
    result.focus();
    result.select();    

    document.execCommand("copy")

    document.body.removeChild(result);

}

document.getElementById("color-circule").onclick = ()=>{

    let circule = document.getElementById("color-circule");

    if(circule.className.includes("light")){

        parseLight();

    }else{

        parseDark();

    }

}

/**@param {string} text  */
function criptografar(text){

    let criptText = "";       
    let empty = 0;

    for(let ii = 0; ii<text.length; ii++){

        if(text[ii] == text[ii].toUpperCase() && !characters.includes(text[ii]) || text.length == 0){
            console.log(!characters.includes(text[ii]));
            console.log("|"+text[ii]+"|");
            console.log(ii);
            return false;
        }

        for(let cc = 0; cc<regras.length; cc++){               

            if(text[ii] == regras[cc][0]){
                if(text[ii] == " ") empty++;
                criptText += regras[cc][1];                
                break;
            }else if(cc == regras.length-1){
                if(text[ii] == " ") empty++;                
                criptText += text[ii];                
                break;
            }

        }            

    }        

    if(empty == text.length || empty == criptText.length) return false;

    return criptText; 

}

/**@param {string} text  */
function descriptografar(text){
    
    let descriptText = "";     
    let empty = 0;  

    for(let ii = 0; ii<text.length; ii++){

        if(text[ii] == text[ii].toUpperCase() && !characters.includes(text[ii]) || text.length == 0){
            console.log(!characters.includes(text[ii]));
            console.log("|"+text[ii]+"|");
            console.log(ii);
            return false;
        }

        if(text[ii] == " ") empty++;

        for(let cc = 0; cc<regras.length; cc++){               

            if(regras[cc][1] == text.substring(ii, ii+regras[cc][1].length)){
                descriptText += regras[cc][0];
                ii += regras[cc][1].length-1;
                break;

            }else if(cc == regras.length-1){

                descriptText += text[ii];                
                break;

            }

        }            

    }        

    if(text.length == empty) return false;

    return descriptText;

}


function parseLight(){

    document.querySelector("main").className = "main-light"
    document.getElementById("icon-aviso").className = "icon-aviso-light";
    document.getElementById("buttons").className = "buttons-light";
    document.getElementById("result").className = "result-light";
    document.querySelector("footer").className = "footer-light";
    document.getElementById("color-circule").className = "color-circule-dark"

}

function parseDark(){

    document.querySelector("main").className = "main-dark"
    document.getElementById("icon-aviso").className = "icon-aviso-dark";
    document.getElementById("buttons").className = "buttons-dark";
    document.getElementById("result").className = "result-dark";
    document.querySelector("footer").className = "footer-dark";
    document.getElementById("color-circule").className = "color-circule-light"

}