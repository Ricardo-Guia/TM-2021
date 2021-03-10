// Your JS Script here

let numbersArray = []

function addNumberFromInput() {
    const textFromInput = document.getElementById("inputNumber").value;
    if (textFromInput) {
        numbersArray.push(textFromInput)
        document.getElementById("viewerNumber").innerText = numbersArray.join(", ");
    } else {
        alert("Escreva algo no input");
    }
}

function calculateMaxNumberFromArray() {
    //let counter = 0
    if (numbersArray.length >=5) {
        const maxNumber = numbersArray.reduce((a, b) => Math.max(a, b) );
        document.getElementById("maxNumber").innerText = maxNumber;
    } else {
        alert("Array menor que 5");
    }
}
