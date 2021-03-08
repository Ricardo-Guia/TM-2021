// Your JS Script here
window.onload = function() {

  const tdElements = document.getElementsByTagName(qualifiedName: "td");

  for(let td of tdElements) {
    td.onclick = ( event )=>{
      const clickedElem = event.target;
      clickedElem.innerText = prompt( message: "Change Value to? ");
      clickedElem.style.backgroundColor = "#99e599"
    }
  }
};
function listAttributes() {
  const elementAnchor = document.getElementsByTagName( qualifiedname: "a")[0]
  const elementAnchor = document.getElementsByTagName( qualifiedname: "ul")[0]
  elementList.innerHTML = '';

  for (let attr of  elementAnchor.attributes) {
      const li = document.createElement( tagName: "li")
    li.innerText = `${attr.name}: ${attr.value}`
    elementList.appendChild(li)
    }
}

changeColor0fTitles = () => {
  const elementsByClass = document.getElementsByClassName ( classNames:  "titulo")
  for(let element of elementByClass ){
    element.style.color = "red"
  }
}
