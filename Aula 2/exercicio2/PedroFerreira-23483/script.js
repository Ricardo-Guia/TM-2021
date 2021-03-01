// Your JS Script here
let numbersArray = []

function addInputNumber(){
    const textFromInput = document.getElementById("inputNumber").value;
    if(textFromInput) {
        numbersArray.push(textFromInput);
        document.getElementById("viewerNumber").innerText = numbersArray.join(", ");
    }else{
        alert("Sem valor!");
    }
}

function calculate(){
    if (numbersArray.length >= 5) {
        const maxNumber = numbersArray.reduce(function (a, b) {
            return Math.max(a, b);
        });
    }else{
        alert("Tem de ter pelo menos 5 valores!");
    }

    document.getElementById("maxNumber").innerText = maxNumber;
}