const URL_PROXY_SERVER = "http://localhost/api/services";

let input1 = document.getElementById("numero1");
let input2 = document.getElementById("numero2");
let inputRes = document.getElementById("respuesta");
let btnBorrar = document.getElementById("btnDelete");

document.getElementById("btns").addEventListener("click", function (event) {
	event.preventDefault();
	let inputChecked = document.getElementsByName("inlineRadioOptions");
	let operacion = "";

	for (let i = 0; i < inputChecked.length; i++) {
		if (inputChecked[i].checked) {
			operacion = inputChecked[i].value;
			break;
		}
	}
	if (
		input1.value !== "" &&
		input2.value !== "" &&
		!isNaN(input1.value) &&
		!isNaN(input2.value)
	) {
		if (operacion !== "") {
			if (operacion === "division" && input2.value === 0) {
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

input1.addEventListener("change", function () {
	inputRes.className = "";
	inputRes.classList.add("hiddenDiv");
	btnBorrar.classList.remove("btn-visible");
	btnBorrar.classList.add("btn-hide");
});
input2.addEventListener("change", function () {
	inputRes.className = "";
	inputRes.classList.add("hiddenDiv");
	btnBorrar.classList.remove("btn-visible");
	btnBorrar.classList.add("btn-hide");
});

function realizarOperacion(operacion) {
	// Envío de datos mediante Fetch API -> Promesa, otra opcion mas practica de hacer peticiones y de nmanera nativa.
	//
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

	// Envío de datos mediante XMLHttpRequest mediante AJAX.
	$.ajax({
		url: "./services/calculate.php",
		method: "GET",
		dataType: "json",
		data: {
			numero1: input1.value,
			numero2: input2.value,
			operacion: operacion,
		},
		success: function (response) {
			const { message } = response;
			if (message === "Ruta no encontrada") {
				alert("Error en la API Externa.");
			}
			const { respuesta } = response;
			inputRes.style.visibility = "visible";
			inputRes.innerHTML = respuesta;
			inputRes.classList.add(
				"rounded-2",
				"border-1",
				"p-2",
				"form-control",
				"is-valid",
				"width",
				"mt-2",
				"visibleDiv"
			);
			btnBorrar.classList.remove("btn-hide");
			btnBorrar.classList.add("btn-visible");
		},
		error: function (xhr, status, error) {
			alert("Error al realizar la solicitud: no es posible dividir entre 0");
		},
	});
}
