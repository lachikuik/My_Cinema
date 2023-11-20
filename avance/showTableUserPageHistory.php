<?php
include("initiatejson.php");
$request = $database->prepare("SELECT u.id, u.firstname, u.lastname, mo.title, r.name as room, ms.date_begin 
    FROM user u
    LEFT JOIN membership m
        on m.id_user = u.id
    LEFT JOIN membership_log ml
        on ml.id_membership = m.id
    LEFT JOIN movie_schedule ms
        on ms.id = ml.id_session
    LEFT JOIN room r
        on r.id = ms.id_room
    LEFT JOIN movie mo
        on mo.id = ms.id_movie
    WHERE u.id = :id
    ORDER BY ms.date_begin");
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