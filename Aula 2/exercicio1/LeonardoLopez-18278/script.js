// Your JS Script here
function readInputFromText() {
    let textFromInput = document.getElementById('inputText').value;
    console.log(textFromInput);
    if (textFromInput) {
        document.getElementById('viewerText').innerText = textFromInput;
    } else {
        alert("Insira um valor no input");
    }
}
