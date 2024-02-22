<?php

class Conexion{
    //Declaramos variables estas son privadas no se pueden acceder en otras clases
    
    private $conect;

    public function __construct(){
        $connectionString = "mysql:host=".DB_HOST. ";dbname=".DB_NAME.";.DB_CHARSET."; //parametros de conexion
        try{
            $this->conect = new PDO($connectionString,DB_USER, DB_PASSWORD); //le pasamos a la conexion el usuario y el password
            $this->conect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //con esto se detecta los errores
            //echo  "Conexion Exitosa";
        }catch(Exception $e){
            $this->conect = "Error de conexión";
            echo "Error: ".$e->getmessage();
        }
    }

    public function connect()
    {
        return $this->conect;
    }
}

?>