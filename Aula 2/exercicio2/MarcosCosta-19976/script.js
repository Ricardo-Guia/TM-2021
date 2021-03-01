// Your JS Script here

let addNumber = [];

function pushArray() {
  const number = document.getElementById('numero').value
  addNumber.push(number)
  document.getElementById('arryNumb').innerText = addNumber.toString()
}

function maiorNum() {
  if (addNumber.length < 5) {
    alert("Adiciona pelo menos 5 numeros");
    return

    var number = addNumber.reduce((a, b) => Math.max(a, b));

    document.getElementById('maiorNumb').innerText = number.toString()
  }
}
