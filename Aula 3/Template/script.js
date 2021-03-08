// Your JS Script here

window.onload = function (element){
  const tdElement = document.getElementsByTagName("td");

  for(let td of tdElement){
    td.onclick=( event ) => {
      const clicledElem = event.target;
      clicledElem.innerText = prompt("change Value to?");
      clicledElem.style.backgroundColor = "#99e599"
    }
  }
}

function listAttributes(){
  const elementAnchor = document.getElementsByTagName("a")[0]
  const elementList = document.getElementsByTagName("ul")[0]
  elementList.innerHTML='';
  for(let attr of elementAnchor.attributes){
    const li = document.createElement("li")
    li.innerText = `${attr.name}: ${attr.value}`
    elementList.appendChild(li)
  }


}
changeColorOfTitles = () => {

  const elementsByClass = document.getElementsByClassName("Titulo")
  for (let element of elementsByClass){
    element.style.color = "red"


  }
}
