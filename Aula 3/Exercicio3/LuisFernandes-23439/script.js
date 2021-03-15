// Your JS Script here
window.onload = function(){
	const tdElements = document.getElementsByTagName("td")
	for(let td of tdElements){
		td.onclick = (event)=>{
			const clickedElement = event.target;
			clickedElement.innerText = prompt("Change value to:");
			clickedElement.style.background = "#99e599"
		}
	}
};

function listAttributes(){
	const elementAnchor = document.getElementsByTagName("a")[0]
	const elementList = document.getElementsByTagName("ul")[0]
	elementList.innerHTML='';
	console.log(elementAnchor)
	for(let attr of elementAnchor.attributes){
		const li = document.createElement("li")
		li.innerText = `${attr.name}: ${attr.value}`
		elementList.appendChild(li)
	}
}

function changeColorOfTitles(){
	const elementsByClass = document.getElementsByClassName("titulo")
	for(let element of elementsByClass){
		element.style.color = "red"
	}
}