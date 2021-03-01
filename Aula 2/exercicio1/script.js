
    function readInput(){
    var text = document.getElementById('texto').value;

    if(!text){
        alert("Escreve algo");
    }else{
        document.getElementById('textoFromInput').innerText = text;
    }


}