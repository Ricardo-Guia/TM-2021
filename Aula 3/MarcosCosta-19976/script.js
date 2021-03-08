// Your JS Script here

function getAttributes() {
  var linkElement = document.getElementsByTagName('a')[0];
  var listOfProps = document.getElementsByTagName('ul')[0];

  for (let i = 0; i < linkElement.attributes.length; i++) {
    var item = linkElement.attributes[i]
    listOfProps.appendChild(createdLi(item.name, item.value))
  }
}

function createdLi(paramName, linkElement) {
  const itemOfProps = document.createElement("li");
  itemOfProps.innerText = paramName + ":" + linkElement
  return itemOfProps

}


function changeColorTitles() {
  for (let elem of document.getElementsByClassName('titulo')) {
    elem.style.color="red"
  }
}
window.onload = function (){
  for (let elem of document.getElementsByTagName('td')){
    elem.onclick = (clickedEvent )=>{
      const response = prompt("Novo valor do TD?");
      const elementHTMLTD = clickedEvent.target
      elementHTMLTD.style.backgroundColor = 'green';
      elementHTMLTD.innerText = response;
    }
  }
}
