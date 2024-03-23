<?php

$numericRegex = '/^-?\d*\.?\d+$/';

if (isset($_GET['numero1']) && isset($_GET['numero2']) && isset($_GET['operacion'])) {
    // Obtener los valores enviados desde el frontend
    $num1 = floatval($_GET['numero1']);
    $num2 = floatval($_GET['numero2']);
    $operacion = $_GET['operacion'];

    if ((!preg_match($numericRegex, $num1) || !preg_match($numericRegex, $num2)) || $_GET['operacion'] == '' || ($_GET['operacion'] === "division" && $_GET['numero2'] == 0)) {
        echo "Debe suministrar la operacion e ingresar los números correctamente";
    }


    // Definir la URL base de la API externa
    $url_base = 'http://localhost/api/v1/';

    // Se define la URL de la operación correspondiente según la selección del usuario
    switch ($operacion) {
        case 'suma':
            $url = $url_base . 'addition?a=' . $num1 . '&b=' . $num2;
            break;
        case 'resta':
            $url = $url_base . 'substraction?a=' . $num1 . '&b=' . $num2;
            break;
        case 'multiplicacion':
            $url = $url_base . 'mutiplication?a=' . $num1 . '&b=' . $num2;
            break;
        case 'division':
            if ($num2 !== 0) {
                $url = $url_base . 'division?a=' . $num1 . '&b=' . $num2;
            } else {
                echo "No se puede dividir por cero.";
                exit;
            }
            break;
        default:
            // Si la operación no es válida, devolver un mensaje de error
            echo 'Operación no válida';
            exit;
    }

    // Realizar la solicitud a la API externa utilizando file_get_contents
    $response = file_get_contents($url);

    if ($url === 'error') {
        echo 'Operación no válida';
    }

    // Verifcar si la respuesta es válida
    if ($response !== false) {
        // Enviar la respuesta al front-end
        echo $response;
    } else {
        // Si la solicitud falla, devuelve un mensaj ed error
        echo json_encode(array("error" => "Mensaje de error"));
    }
} else {
    echo 'No se han proporcionado todos los parámetros requeridos o hay valores erróneos';
}
