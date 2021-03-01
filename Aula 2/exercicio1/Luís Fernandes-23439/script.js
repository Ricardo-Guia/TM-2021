// Your JS Script here

function readInputFromText(){
    const textFromInput = document.getElementById("inputText").value
    if(textFromInput){
        document.getElementById("viewText").innerText = textFromInput
    }
}