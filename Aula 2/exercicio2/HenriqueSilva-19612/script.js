// Your JS Script here

let numbersArray=[]

function adicionar() {
  const number = document.getElementById("numero").value
  numbersArray.push(number)
  document.getElementById("numbersADD").innerHTML = numbersArray.join(',')

}

function calcular() {
  const maxNumber = numbersArray.reduce(function (a,b){
    return Math.max(a,b)
  })
  document.getElementById("maiorNumber").innerText=maxNumber
}
