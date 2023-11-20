<?php
include("initiatejson.php");

$request = $database->prepare("SELECT m.id, m.title, m.director, m.duration, m.release_date, m.rating, d.name as distributor, g.name as genre
    FROM movie m
    INNER JOIN distributor d
        ON d.id = m.id_distributor
    LEFT JOIN movie_genre mg
        on mg.id_movie = m.id
    LEFT JOIN genre g
        on g.id = mg.id_genre
    WHERE ((:nom IS NOT NULL AND m.title LIKE CONCAT ('%', :nom, '%')) 
        OR :nom IS NULL)
    AND ((:distributor IS NOT NULL AND d.name LIKE CONCAT ('%', :distributor, '%')) 
        OR :distributor IS NULL)
    AND ((:genre IS NOT NULL AND g.name LIKE CONCAT ('%', :genre, '%')) 
        OR :genre IS NULL)   
    ORDER BY m.id");
$request->bindParam(':nom', $_GET['name']);
$request->bindParam(':distributor', $_GET['distributor']);
$request->bindParam(':genre', $_GET['genre']);
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