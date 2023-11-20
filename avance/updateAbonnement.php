<?php
require_once("connectBD.php");

$data = json_decode(file_get_contents('php://input'), true);
$idUser = $data["idUser"];
$idSubscription = $data["idSubscription"];

$request = $database->prepare("UPDATE membership
    SET id_subscription = :idSubscription
    WHERE id_user = :idUser;"
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