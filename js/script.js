document.getElementById("btns").addEventListener("click", function (event) {
	let input1 = document.getElementById("numero1").value;
	let input2 = document.getElementById("numero2").value;
	let inputChecked = document.getElementsByName("inlineRadioOptions");
	event.preventDefault();
	let seleccionado = "";

	for (let i = 0; i < inputChecked.length; i++) {
		if (inputChecked[i].checked) {
			seleccionado = inputChecked[i].value;
			break;
		}
	}

	if (seleccionado !== "") {
		alert("El valor es: " + seleccionado);
	} else {
		alert("Debe seleccionar un valor");
		return;
	}

	if (!isNaN(inputNumero) && inputNumero !== "" && inputNumero > 0) {
		alert("El valor es un número válido: " + inputNumero);
	} else {
		alert("El valor no es un número válido.");
	}
});

function realizarOperacion() {
	var input1 = document.getElementById("numero1").value;
	var input2 = document.getElementById("numero2").value;
	var operacion = document.getElementById("operacion").value;

	// Envío de datos mediante Fetch API
	fetch("../services/calculate.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `numero1=${input1}&numero2=${input2}&operacion=${operacion}`,
	})
		.then((response) => response.text())
		.then((data) => {
			document.getElementById("resultado").innerHTML = data;
		})
		.catch((error) => {
			console.error("Error al realizar la solicitud:", error);
		});
}
