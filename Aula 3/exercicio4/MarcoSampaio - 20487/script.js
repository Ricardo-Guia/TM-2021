// Your JS Script here
let imgCounter = 0;
addImage = () => {
    imgCounter++;
    let img = document.createElement("img")
    img.src = "https://placeimg.com/250/150/" + imgCounter;

    const images = document.getElementById("imageContainer")
    images.appendChild(img)
}

delImage = () => {

    const images = document.getElementById("imageContainer")
    if (images.children.length > 0) {
        images.children[Math.round(Math.random() * images.children.length)].remove();
    }
}