// Your JS Script here

function listAttributes(){
    const elementAnchor = document.getElementsByTagName("a")[0]
    const elementList = document.getElementsByTagName("ul")[0]


    for (let attr of elementAnchor.attributes){
        const li = document.createElement("li")
        li.innerText = `${attr.name}: ${attr.value}`
        elementList.appendChild(li)
    }
}

function changeColorOfTitles(){
    const elementsByClass = document.getElementsByClassName("titulo");
    for(let element of elementsByClass){
        element.style.color = "red"
    }
}

window.onload = function (){
    const tdElements = document.getElementsByTagName("td")
    for(let td of tdElements){
        td.onclick = (event)=>{
            const clickedElement = event.target
            const response = prompt("Change value to? ")
            clickedElement.innerText = response
            clickedElement.style.background = "#99e599"
        }
    }
}