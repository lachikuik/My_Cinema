<?php
require_once("connectBD.php");

$data = json_decode(file_get_contents('php://input'), true);
$id = $data["id"];
$date = $data["date"];

$request = $database->prepare("INSERT INTO movie_schedule(id_movie, id_room, date_begin)
    VALUES (:idMovie, 1, :date);"
);
$request->bindParam(':idMovie', $id, PDO::PARAM_INT);
$request->bindParam(':date', $date);

if ($request->execute()){
    $table = $request->fetchAll(PDO::FETCH_ASSOC);
    $success = true;
    $data["title"] = $table;
} else {
    echo("une erreur c'est produite");
    return "une erreur c'est produite";
}

?>