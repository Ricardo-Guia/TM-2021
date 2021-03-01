// Your JS Script here

const textInput = document.getElementById("textInput");

const botao = document.getElementById("botao");

const textDisplay = document.getElementById("textDisplay");

botao.addEventListener("click", () => {
  !textInput.value ? alert("Adicione texto") : textDisplay.innerText = textInput.value
})

