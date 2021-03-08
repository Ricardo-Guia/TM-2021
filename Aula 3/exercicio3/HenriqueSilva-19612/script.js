// Your JS Script here

function v_link() {
  const linkElement = document.getElementsByTagName('a')[0];
  const listOfProps = document.getElementsByTagName('ul')[0];

  for (let i=0; i< linkElement.attributes.length;i++){
    const item = linkElement.attributes[i]
    listOfProps.appendChild(createLi(item.name,item.value))
  }


  // listOfProps.appendChild(createLi("id",linkElement))
  // listOfProps.appendChild(createLi("href",linkElement))
  // listOfProps.appendChild(createLi("type",linkElement))
  // listOfProps.appendChild(createLi("target",linkElement))
}

window.onload = function(){
   for(let elem of document.getElementsByTagName('td')){
    elem.onclick =(clickedEvent) => {
      const response = prompt("Novo valor do TD?");
      const elementHtmlTD = clickedEvent.target
      elementHtmlTD.style.background="green";
      elementHtmlTD.innerText=response;

    }
  }
}

function createLi(paramName,linkElement){
  const itemOfProps = document.createElement("li");
  itemOfProps.innerText =paramName+": " +linkElement
  return itemOfProps
}

function changeColor(){
  for(let elem of document.getElementsByClassName('titulo')){
    elem.style.color="red";
  }
}
