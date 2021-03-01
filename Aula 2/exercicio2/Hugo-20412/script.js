// Your JS Script here
const numbers = []
add = () => {
    const textLabel = document.getElementById("text");
    const input = document.getElementById("numbers");

    numbers.push(parseInt(input.value))

    textLabel.innerText = "Adicionados: " + numbers.toString()
}

calculate = () => {
    if (numbers.length < 5) {
        alert("Tem apenas " + numbers.length + " numeros, precisa de 5")
        return
    }
    const textLabel = document.getElementById("max")
    let max = 0
    numbers.map((number) => {
        if (number > max) {
            max = number
        }
    })
    textLabel.innerText = "Maior é: " + max
}