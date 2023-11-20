<?php
include("initiatejson.php");

$request = $database->prepare("SELECT  m.title, ms.date_begin as projection, ms.id 
    FROM movie m
    INNER JOIN movie_schedule ms
        ON ms.id_movie = m.id
    ORDER BY projection desc
    LIMIT 10;");
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