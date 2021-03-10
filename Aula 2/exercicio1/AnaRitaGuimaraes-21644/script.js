// Your JS Script here

function readImputFromText() {
    const textFromImput = document.getElementById("imputText").value;
    if (textFromImput) {
        document.getElementById("viewerText").innerText = textFromImput;
    } else {
        alert("Escreva algo no imput");
    }
}