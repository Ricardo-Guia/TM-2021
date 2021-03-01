// Your JS Script here
function readText() {
    const inputText = document.getElementById("inputText").value;
    console.log(inputText);
    if (inputText) {
        document.getElementById("viewText").innerText = inputText;
    }

}