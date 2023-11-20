<?php
include("initiatejson.php");
$request = $database->prepare("SELECT u.id, u.firstname, u.lastname, u.email, u.country, u.city, s.name as subscription
    FROM user u
    LEFT JOIN membership m
        on m.id_user = u.id
    LEFT JOIN subscription s
        on s.id = m.id_subscription
    WHERE ((:nom IS NOT NULL AND u.lastname LIKE CONCAT ('%', :nom, '%')) 
        OR :nom IS NULL)
    AND ((:firstname IS NOT NULL AND u.firstname LIKE CONCAT ('%', :firstname, '%')) 
        OR :firstname IS NULL) 
    ORDER BY u.id");
$request->bindParam(':nom', $_GET['name']);
$request->bindParam(':firstname', $_GET['firstname']);
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