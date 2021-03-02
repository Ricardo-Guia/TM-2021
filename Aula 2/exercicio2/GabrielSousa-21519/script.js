const numberInput = document.getElementById("numberInput");
const numberDisplay = document.getElementById("numberDisplay");
const calcDisplay = document.getElementById("calcDisplay");
let numberArray = [];

document.getElementById("buttonAddNumbers").addEventListener('click', () => {
  !numberInput.value ? alert("Insira um numero!") : (() => {
    numberArray.push(parseInt(numberInput.value))
    numberDisplay.innerText += numberInput.value + ","
  })()
})

document.getElementById("buttonCalcNumbers").addEventListener("click", () => {
  numberArray.length < 5 ? alert("Inserir no minimo 5 numeros!") : calcDisplay.textContent = "Maior Numero: " + numberArray.reduce((a, b) => {
    return Math.max(a, b);
  })
})