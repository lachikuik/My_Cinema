<?php
$user="Axike";
$password="password";

function connect($user, $password){
    try{
        $database = new PDO('mysql:host=localhost;dbname=twitter_academy_bdd',$user,$password);
        $database->exec('SET NAMES "UTF8"');
        return $database;
    } catch (PDOException $e){
        echo 'Erreur : '. $e->getMessage();
        die();
    }
}
$database = connect($user, $password);