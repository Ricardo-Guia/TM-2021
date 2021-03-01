// Your JS Script here
let numbersArray = []

function addNumber() {

    const number = document.getElementById("numberInput").value;
    if(number) {
        numbersArray.push(number);
        document.getElementById("numbersAdded").innerHTML = numbersArray.join(', '); //.toString
    }
}

function calculate() {

    if (numbersArray.length >= 5) {
        const maxNumber = numbersArray.reduce(function (a, b) { //Func Nomal
            return Math.max(a, b);
        });
        //const maxNumberV2 = numbersArray.reduce((a, b) => Math.max(a, b)); //ArrowFunction
        // as duas func fazem o mesmo
        document.getElementById("maxNumberViewer").innerHTML = maxNumber;
    }
}