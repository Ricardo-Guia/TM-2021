// Your JS Script here
let numbersArray = [];

function addNumber() {
    let number = document.getElementById('inputNumber').value;
    if (number) {
        numbersArray.push(number);
        document.getElementById('textoAdd').innerText = "Adicionados: ";
        document.getElementById('viewNumbers').innerText = numbersArray.join(", ");
        document.getElementById('inputNumber').value = ''
    } else {
        alert('Insira um numero');
    }
    if(numbersArray.length >= 5){
        document.getElementById("btnCalc").style.display = "block";
    }
}

function getBigNumber() {
    if(numbersArray.length >= 5){
    const maxNumber = numbersArray.reduce(function (a, b) {
        return Math.max(a, b);
    });
    document.getElementById('textoMaior').innerText = "Maior número: ";
    document.getElementById('viewBigger').innerText = maxNumber;
    }else{
        alert("Tem que inserir pelo menos 5 números.");
    }
}
