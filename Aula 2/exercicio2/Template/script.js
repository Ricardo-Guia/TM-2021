// Your JS Script here

let addedNumbers = [];

function pushArray(){
    const number = document.getElementById("numbers").value;
    addedNumbers.push(number);

     document.getElementById("arrayNumbers").innerText=addedNumbers.toString();

}

function calculateMaxNumber(){
    if(addedNumbers.length>=5){
        const maxNumber = addedNumbers.reduce((a,b) => Math.max(a,b));

        document.getElementById("maxNumber").innerText=maxNumber;
    }else{
        alert("tem de inserir pelo menos 5 numeros")
    }

}