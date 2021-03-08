// Your JS Script here

let imgCounter = 0;

function addImage() {
    imgCounter++;
    let img = document.createElement("img")
    img.src="https://placeimg.com/250/150/"+imgCounter

    const images = document.getElementById("imageContainer")
    images.appendChild(img)
}

function delImage() {
    const images = document.getElementById("imageContainer")
    images.children[Math.floor(Math.random() * images.children.length)].remove()
    imgCounter--;
}
