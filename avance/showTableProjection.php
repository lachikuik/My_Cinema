<?php
include("initiatejson.php");

$request = $database->prepare("SELECT m.id, m.title, m.duration, m.rating, r.name as room, r.seats, ms.date_begin as projection
    FROM movie m
    LEFT JOIN movie_schedule ms
        ON ms.id_movie = m.id
    LEFT JOIN room r
        on r.id = ms.id_room
    WHERE ((:nom IS NOT NULL AND m.title LIKE CONCAT ('%', :nom, '%')) 
        OR :nom IS NULL)
    AND ((:projection IS NOT NULL AND ms.date_begin LIKE CONCAT ('%', :projection, '%')) 
        OR :projection IS NULL) 
    ORDER BY m.id");
$request->bindParam(':nom', $_GET['name']);
$request->bindParam(':projection', $_GET['projection']);
if ($request->execute()){
    $table = $request->fetchAll(PDO::FETCH_ASSOC);
    $success = true;
    $data["title"] = $table;
} else {
    echo("une erreur c'est produite");
    return "une erreur c'est produite";
}

reponse_json($success, $data);
?>