// Your JS Script here
let imgCounter = 0;

function addImage() {
    imgCounter++;
    let img = document.createElement("img")
    img.src="https://placeimg.com/250/150" + imgCounter

    const imagens = document.getElementById("imageContainer")
    imagens.appendChild(img)

}

function delImage() {
    const imagens = document.getElementById("imageContainer")
    imagens.children[0].remove()
}