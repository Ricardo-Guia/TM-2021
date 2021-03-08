//	JS

window.onload = function () {
	for(let elem of document.getElementsByTagName("td")) {
		elem.onclick = (clickedEvent) => {
			const response = prompt("Novo valor de td")
			const elementHtmlTD = clickedEvent.target
			elementHtmlTD.style.backgroundColor = "green"
			elementHtmlTD.innerText = response
		}
	}
}

function getAtributes() {
	const linkElement = document.getElementById("linkDuckID");
	const listOfProps = document.getElementsByTagName("ul")[0];

	listOfProps.appendChild(createdLI("id", linkElement))
	listOfProps.appendChild(createdLI("href", linkElement))
	listOfProps.appendChild(createdLI("type", linkElement))
	listOfProps.appendChild(createdLI("target", linkElement))
}

function createdLI(paramName, linkElement) {
	const itemOfProps = document.createElement("li");
	itemOfProps.innerText = paramName + ": " + linkElement[paramName];
	return itemOfProps
}

function changeColorTitles() {
	for(let elem of document.getElementsByClassName('title')){
		elem.style.color = 'red';
	}
}