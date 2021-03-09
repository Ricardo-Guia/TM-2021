
const numbersArray = []

function addNumberFromInput() {
    const numberFromInput = document.getElementById("inputNumber").value

    if (numberFromInput) {
        numbersArray.push(numberFromInput)
        document.getElementById("viewerNumber").innerText = numbersArray.join(', ')
        document.getElementById("inputNumber").value = ''
    } else
        alert("Escreva algo no input!")

    if (numbersArray.length >= 5) {
        document.getElementById("calcMaxBox").removeAttribute("hidden")
    }
}

function calculeteMaxNumberFromArray() {
    if (numbersArray.length >= 5) {
        const maxNumber = numbersArray.reduce((a, b) => Math.max(a, b))
        document.getElementById("maxNumber").innerText = maxNumber
    }
}

function clearArray(){
    numbersArray.length= 0
        document.getElementById("calcMaxBox").style.visibility = "hidden"
         document.getElementById("viewerNumber").innerText = ''
        document.getElementById("inputNumber").value = ''
}