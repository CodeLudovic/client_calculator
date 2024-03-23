<?php

$numericRegex = '/^-?\d*\.?\d+$/';

if (isset($_POST['numero1']) && isset($_POST['numero2']) && isset($_POST['operacion'])) {
    // Obtener los valores enviados desde el frontend
    $num1 = floatval($_POST['numero1']);
    $num1 = floatval($_POST['numero2']);
    $operacion = $_POST['operacion'];

    if ((!preg_match($numericRegex, $num1) || !preg_match($numericRegex, $num2)) || $_POST['operacion'] == '' || ($_POST['operacion'] === "division" && $_POST['numero2'] == 0)) {
        echo "Debe suministrar la operacion e ingresar los números correctamente";
    }


    // Definir la URL base de la API externa
    $url_base = 'http://localhost/api/v1/';

    // Definir la URL de la operación correspondiente según la selección del usuario
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
                break;
            } else {
                $url = 'error';
            }
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

    // Verificar si la respuesta es válida
    if ($response !== false) {
        // Enviar la respuesta al frontend
        echo $response;
    } else {
        // Si la solicitud falla, devuelve un mensaj ed error
        echo 'Error al realizar la solicitud a la API externa';
    }
} else {
    echo 'No se han proporcionado todos los parámetros requeridos o hay valores erróneos';
}
