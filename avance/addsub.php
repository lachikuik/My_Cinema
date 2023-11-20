<?php
require_once("connectBD.php");

$data = json_decode(file_get_contents('php://input'), true);
$idUser = $data["idUser"];
$idSubscription = $data["idSubscription"];

$request = $database->prepare("INSERT INTO membership(id_user, id_subscription)
    VALUES (:idUser, :idSubscription);"
);
$request->bindParam(':idUser', $idUser, PDO::PARAM_INT);
$request->bindParam(':idSubscription', $idSubscription, PDO::PARAM_INT);

if ($request->execute()){
    $table = $request->fetchAll(PDO::FETCH_ASSOC);
    $success = true;
    $data["title"] = $table;
} else {
    echo("une erreur c'est produite");
    return "une erreur c'est produite";
}

?>