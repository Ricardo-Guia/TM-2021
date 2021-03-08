// Your JS Script here
function addImage(){
    const img = document.createElement("img")
    const imageContainer = document.getElementById("imageContainer")

    img.src = "https://placeimg.com/250/150/10" + imageContainer.children.length
    imageContainer.appendChild(img);
    updateCounter(imageContainer);
}

function removeImage(){
    const imageContainer = document.getElementById("imageContainer")
    var randomNumber1 = Math.floor(Math.random()*(imageContainer.children.length))
    imageContainer.children[randomNumber1].remove()
    updateCounter(imageContainer);
}
updateCounter = (imageContainer) =>{
    const span = document.getElementById("contador")
    span.innerText = imageContainer.children.length.toString()
}