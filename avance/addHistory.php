<?php
require_once("connectBD.php");

$data = json_decode(file_get_contents('php://input'), true);
$idUser = $data["idUser"];
$idSession = $data["idSession"];
$request = $database->prepare("INSERT INTO membership_log(id_membership, id_session)
    VALUES ((SELECT id FROM membership where id_user = :idUser ), :idSession);"
);
$request->bindParam(':idUser', $idUser, PDO::PARAM_INT);
$request->bindParam(':idSession', $idSession);

if ($request->execute()){
    $table = $request->fetchAll(PDO::FETCH_ASSOC);
    $success = true;
    $data["title"] = $table;
} else {
    echo("une erreur c'est produite");
    return "une erreur c'est produite";
}
?>