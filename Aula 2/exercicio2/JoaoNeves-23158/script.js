// Your JS Script here
numbers = [];

function readNumber() {
    const input = document.getElementById("inputText").value;
    if (input) {
        numbers.push(input);
    }

    document.getElementById("viewNumbers").innerText = document.getElementById("viewNumbers").innerText + input + ', '
}

function calculate() {
    if (numbers.length > 5) {
        const max = numbers.reduce(function (a, b) {
            return Math.max(a, b);
        });
        document.getElementById("viewNumber").innerText = 'Maior Número: ' + max;
    } else {
        document.getElementById("viewNumber").innerText = 'São necessários pelo menos 5 números'
    }
}