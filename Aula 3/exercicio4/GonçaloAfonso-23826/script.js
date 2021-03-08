// Your JS Script here

function addImage(){
  const imageContainer = document.getElementById("imageContainer")
  const img = document.createElement("img")
  img.src = "https://placeimg.com/250/150/X%E2%80%9D" + imageContainer.children.length
  imageContainer.append(img);
  updateCounter(imageContainer);
}

deleteImage = () => {
  const imageContainer = document.getElementById("imageContainer")
  const randomNumber = (Math.floor(Math.random() * (imageContainer.children.length)));
  imageContainer.children[randomNumber].remove()
  updateCounter(imageContainer);
}

updateCounter = (imageContainer) => {
  const span = document.getElementById("contador")
  span.innerText = imageContainer.children.length.toString()
}

