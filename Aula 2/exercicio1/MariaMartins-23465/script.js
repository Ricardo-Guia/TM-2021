function readInput(){
    const text = document.getElementById('texto').value;

    document.getElementById('textoFromInput').innerText = text
    if(!text){
        alert("Escreva o texto")
    }else {
        document.getElementById('textoFromInput').innerText = text
    }


}