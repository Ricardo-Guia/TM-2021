window.onload = function (){
    const tdElements = document.getElementsByTagName("td")
    for(let td of tdElements){
        td.onclick = ( event )=>{
            const clickedElem = event.target;
            const response = prompt("Change value to?")
            clickedElem.innerText = response;
            clickedElem.style.backgroundColor = "#99e599"
        }

    }
}

function listAttributes(){
    const elementAnchor = document.getElementsByTagName("a")[0]
    const elementList = document.getElementsByTagName("ul")[0]

    for(let attr of elementAnchor.attributes){
        const li = document.createElement("li")
        li.innerText = `${attr.name}: ${attr.value}`        //acento
        elementList.appendChild(li)
    }
}

function changeColorOfTitles(){
    const elementByClass = document.getElementsByClassName("titulo")
    for(let element of elementByClass){
        element.style.color = "#99e599"
    }
}