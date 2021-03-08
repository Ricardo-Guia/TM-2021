window.onload = function(){
    let tdElements = document.getElementsByTagName("td");
    for(let td of tdElements){
        td.onclick=(event)=>{
            const tdClicked=event.target;
            const response = prompt("Insira o novo valor:");
            tdClicked.innerHTML = response;
            tdClicked.style.backgroundColor = "#99e599";
        }
    }
}

function listAtt() {
    const elementAnchor = document.getElementsByTagName("a")[0];
    let ulElement = document.getElementsByTagName("ul")[0];

    ulElement.innerHTML="";
    for (let attr of elementAnchor.attributes) {
        const li = document.createElement("li");
        li.innerText = `${attr.name}: ${attr.value}`;
        ulElement.appendChild(li);
    }
}

function changeTitleColor(){
    const elementByClass = document.getElementsByClassName('titles')
    for(let element of elementByClass){
        element.style.color="red";
    }
}