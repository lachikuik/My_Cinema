<?php
require_once("connectBD.php");

$data = json_decode(file_get_contents('php://input'), true);
$idUser = $data["idUser"];

$request = $database->prepare("DELETE ml FROM membership_log as ml
INNER JOIN membership as m
    ON m.id = ml.id_membership
WHERE m.id_user = :idUser;
DELETE FROM membership
    WHERE id_user = :idUser;"

);
$request->bindParam(':idUser', $idUser, PDO::PARAM_INT);

if ($request->execute()){
    $table = $request->fetchAll(PDO::FETCH_ASSOC);
    $success = true;
    $data["title"] = $table;
} else {
    echo("une erreur c'est produite");
    return "une erreur c'est produite";
}
?>