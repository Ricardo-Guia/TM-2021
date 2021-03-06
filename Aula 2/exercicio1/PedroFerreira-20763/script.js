// Your JS Script here

function readInput() {
    var text = document.getElementById('texto').value;
    console.log(texto);

    if (!text) {
        alert('Escreva texto no input');
    } else {
        document.getElementById('textoFromInput').innerText = text;
    }

}