<?php
include("initiatejson.php");
$request = $database->prepare("SELECT u.id, u.firstname, u.lastname, u.email, u.country, u.city, s.name as subscription
    FROM user u
    LEFT JOIN membership m
        on m.id_user = u.id
    LEFT JOIN subscription s
        on s.id = m.id_subscription
    WHERE ((:id IS NOT NULL AND u.id = :id) 
        OR :id IS NULL)
    ORDER BY u.id");
$request->bindParam(':id', $_GET['idUser']);
if ($request->execute()){
    $table = $request->fetchAll(PDO::FETCH_ASSOC);
    $success = true;
    $data["title"] = $table;
} else {
    echo("une erreur s'est produite");
    return "une erreur s'est produite";
}

reponse_json($success, $data);
?>