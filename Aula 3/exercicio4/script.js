const IMAGE_REPOSITORY = "https://placeimg.com/250/150/"


function addImg(){
    const boxImg = document.getElementById("boxImg")
    const imgInBox = document.getElementById("imgInBox")
    const img = document.createElement("img")
    img.setAttribute("src", IMAGE_REPOSITORY + randomNumber(0))
    boxImg.appendChild(img)
    imgInBox.innerText = getSizeContainer(boxImg)
}

function removeImg(){
    const boxImg = document.getElementById("boxImg")
    const imgInBox = document.getElementById("imgInBox")
    const randomChildren = randomNumber(0,getSizeContainer(boxImg))
    boxImg.children[randomChildren].remove()
    imgInBox.innerText = getSizeContainer(boxImg)
}

function getSizeContainer(container){
    return container.children.length
}

function randomNumber(first, final= 100){
    return Math.floor((Math.random() * final) + first)
}