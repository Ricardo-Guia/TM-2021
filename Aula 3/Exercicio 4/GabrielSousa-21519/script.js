// Your JS Script here

window.onload = () => {
  let imageCounter = 0
  let imageCounterDisplay = document.getElementById('imageCounter')
  const imageContainer = document.getElementById('imageContainer')
  let idArray = []

  //Adds as the Id of the img tag the random number it got, updates the counter and pushes to the array the ID the img got.
  addImage = () => {
    let randomInt = getRandomInt(10000)
    let urlString = 'https://placeimg.com/250/150/' + randomInt
    let newImage = document.createElement('img')
    newImage.src = urlString
    newImage.id = randomInt
    imageContainer.append(newImage)
    idArray.push(randomInt)
    imageCounter++
    imageCounterDisplay.innerText = "Numero de Imagens : " + imageCounter
  }

  //Gets a random index and compares the Id's of all the img tags with the ids from the idArray
  //If it gets a match, it updates the counter, splices the array and removes that element on the DOM
  removeImage = () => {
    let randomIndex = getRandomInt(idArray.length)
    for (let elem of document.getElementsByTagName('img')) {
      if (parseInt(elem.id) === idArray[randomIndex]) {
        imageCounter--
        imageCounterDisplay.innerText = 'Numero de Imagens : ' + imageCounter
        idArray.splice(randomIndex, 1)
        elem.remove()
      }
    }
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
}