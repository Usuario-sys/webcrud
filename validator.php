<?php

include("db.php");

if (isset($_POST["username"]) && isset($_POST["password"])) {
    $USUARIO = $_POST["username"];
    $PASSWORD = $_POST["password"];

    // Preparar la consulta para prevenir inyección SQL
    $stmt = $CONEXION->prepare("SELECT * FROM user WHERE User = ? AND password = ?");
    $stmt->bind_param("ss", $USUARIO, $PASSWORD);
    $stmt->execute();
    $RESULTADO = $stmt->get_result();

    $FILAS = $RESULTADO->num_rows;

    if ($FILAS) {
        header("location: home.html");
    } else {
        header("location: index.html?error=auth");
        exit();
    }
    $stmt->close();
    mysqli_close($CONEXION);
} else {
    header("location: index.html?error=missing");
    exit();
}
