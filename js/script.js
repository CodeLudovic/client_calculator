const URL_PROXY_SERVER = "http://localhost/api/services";
import Swal from "sweetalert2";
document.getElementById("btns").addEventListener("click", function (event) {
	event.preventDefault();

	let input1 = document.getElementById("numero1").value;
	let input2 = document.getElementById("numero2").value;
	let inputChecked = document.getElementsByName("inlineRadioOptions");
	let operacion = "";

	for (let i = 0; i < inputChecked.length; i++) {
		if (inputChecked[i].checked) {
			operacion = inputChecked[i].value;
			break;
		}
	}

	if (input1 !== "" && input2 !== "" && !isNaN(input1) && !isNaN(input2)) {
		if (operacion !== "") {
			if (operacion === "division" && input2 === 0) {
				alert(
					"el divisor no puede ser nulo, vacio. letra, caracter o igual a cero."
				);
			} else {
				realizarOperacion(operacion);
			}
		} else {
			alert("Debe seleccionar la operacion que se aplicara en a los numeros.");
			return;
		}
	} else {
		alert(
			"Debe ingresar el numero 1 y el numero 2, recuerde, deben ser numeros y no texto ni caracteres especiales."
		);
		return;
	}
});

function realizarOperacion(operacion) {
	let input1 = document.getElementById("numero1").value;
	let input2 = document.getElementById("numero2").value;

	// Envío de datos mediante Fetch API -> Promesa, otra opcion mas practica de hacer peticiones y de nmanera nativa.
	// fetch("../services/calculate.php", {
	// 	method: "POST",
	// 	headers: {
	// 		"Content-Type": "application/x-www-form-urlencoded",
	// 	},
	// 	body: `numero1=${input1}&numero2=${input2}&operacion=${operacion}`,
	// })
	// 	.then((response) => response.text())
	// 	.then((data) => {
	// 		document.getElementById("resultado").innerHTML = data;
	// 	})
	// 	.catch((error) => {
	// 		console.error("Error al realizar la solicitud:", error);
	// 	});

	$.ajax({
		url: "./services/calculate.php",
		method: "GET",
		dataType: "json",
		data: {
			numero1: input1,
			numero2: input2,
			operacion: operacion,
		},
		success: function (response) {
			const { message } = response;
			if (message === "Ruta no encontrada") {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: message,
				});
			}
		},
		error: function (xhr, status, error) {
			console.error(xhr.responseText);
		},
	});
}
