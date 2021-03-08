// Your JS Script here

function addImage() {
  const imageContainer = document.getElementById( "imageContainer")
  const img = document.createElement( "img")
  img.src = "https://placeimg.com/258/158/" + imageContainer.children.length
  imageContainer.appendChild(img);
  updateCounter(imageContainer)
  }

deleteImage = () => {
  const imageContainer = document.getElementById(  "imageContainer")
  const randomNumber = (Math.floor( Math.random() * (imageContainer.children.length)));
  imageContainer.children[randomNumber].remove()
  updateCounter(imageContainer);
}

updateCounter = (imageContainer) => {
  const span = document.getElementById( "contador")
  span.innerText = imageContainer.children.length.toString()
}
