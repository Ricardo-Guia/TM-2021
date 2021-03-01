// Your JS Script here

let addednumbers = [];

function pushArray() {
	const number = document.getElementById("numbers").value
	addednumbers.push(number)

	document.getElementById("arrayNumbers").innerText = addednumbers.toString()
}

function calcMax() {
	if (addednumbers.length > 4) {
		const maxNumber = addednumbers.reduce((a, b) => Math.max(a, b));

		document.getElementById("maxNumber").innerText = maxNumber
	} else {
		alert("São necessarios pelo menos 5 numeros, neste momento tem " + addednumbers.length)
	}
}