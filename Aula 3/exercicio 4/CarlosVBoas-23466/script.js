//	JS

let imgCounter = 0;

function addImage() {
	const img = document.createElement("img")
	const images = document.getElementById("images")

	img.src = "https://placeimg.com/250/150/" + imgCounter
	imgCounter++

	images.appendChild(img)

}

function delImage() {

}