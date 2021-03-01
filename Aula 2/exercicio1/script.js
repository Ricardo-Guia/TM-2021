
    function readInput(){
    var text = document.getElementById('texto').value;

    if(!text){
        alert("Escreve algo")
    }

        document.getElementById('textoFromInput').innerText = text
    }