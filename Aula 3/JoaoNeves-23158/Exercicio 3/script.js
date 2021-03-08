window.onload = function(){
    const TdElement = document.getElementsByTagName("td");
    for (let td of TdElement){
        td.onclick= function(element){
            const result=prompt("Novo Valor?");
            element.target.style.backgroundColor="#99e599";
            element.target.innerText=result;
        }
    }
}

function readAttributes() {
    const elem = document.getElementsByTagName("a")[0];
    const el = document.createElement("h3");
    el.setAttribute("class","titulo" )
    el.innerText="Atributos";
    document.getElementById("lista").appendChild(el);
    for (let att of elem.attributes) {
        const liElement = document.createElement("li");
        liElement.innerText = `${att.name}: ${att.value}`;
        document.getElementById("lista").appendChild(liElement);
    }
}

function changeColor() {
    const elements = document.getElementsByClassName("titulo");
    for (let elem of elements) {
        elem.style.color = "red";
    }
}