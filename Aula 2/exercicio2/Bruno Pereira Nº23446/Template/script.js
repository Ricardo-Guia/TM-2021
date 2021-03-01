// Your JS Script here

let numbersArray = []

function addNumber() {

    const number= document.getElementById("numberInput").value
    if (number) {
        numbersArray.push(number)
        document.getElementById("numbersAdded").innerHTML = numbersArray.join(', ')
    }
}

function calculate(){

    const maxNumber = numbersArray.reduce(function (a, b) {
        return Math.max(a, b)
    })

    document.getElementById("maxNumberViewer").innerText = maxNumber

}