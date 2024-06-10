<?php

    class Mysql extends Conexion
    {
        private $conexion;
        private $strquery;
        private $arrvalues;

        function __construct(){
            $this->conexion = new Conexion();
            $this->conexion = $this->conexion->connect();
        }

        //insert new Register
        public function insert(string $query, array $arrValues)
            {
               $this->strquery = $query;
               $this->arrVAlues = $arrValues;
               $insert = $this->conexion->prepare($this->strquery);
               $resInsert = $insert->execute($this->arrVAlues);
               if($resInsert)
               {
                  $lastInsert = $this->conexion->lastInsertId();
               }else{
                  $lastInsert = 0;
               }
               return $lastInsert; 
            }
         //Return one Register
         public function select(string $query)
         {
            $this->strquery = $query;
            $result = $this->conexion->prepare($this->strquery);
            $result->execute();
            $data = $result->fetch(PDO::FETCH_ASSOC);
            return $data;
         }
         //Return all the registers
         public function select_all(string $query)
         {
            $this->strquery = $query;
            $result = $this->conexion->prepare($this->strquery);
            $result->execute();
            $data = $result->fetchall(PDO::FETCH_ASSOC);
            return $data;
         }
         //update Registers
         public function update (string $query, array $arrvalues)
         {
            $this->strquery = $query;
            $this->arrVAlues = $arrvalues;
            $update = $this->conexion->prepare($this->strquery);
            $resExecute = $update->execute($this->arrVAlues);
            return $resExecute;

         }

         //Delete a Register
         public function delete(string $query)
         {
            $this->strquery = $query;
            $result = $this->conexion->prepare($this->strquery);
            $result->execute();
            return $result;
         }




    }
?>