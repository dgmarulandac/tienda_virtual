<?php

    class RolesModel extends Mysql
    {
        public $intIdRol;
        public $strRol;
        public $strDescription;
        public $intStatus;

        public function __construct()
        {
           parent::__construct();
        }

        public function selectRoles()
        {
            //Extrae los roles de la base de datos
            $sql = "SELECT * FROM rol WHERE status != 0";
            $request = $this->select_all($sql);
            return $request;
        }

        public function insertRol(string $rol, string $description, int $status) {
            $return = "";
            $this->strRol = $rol;
            $this->strDescripcion = $description; // Corregido el nombre de la propiedad
            $this->intStatus = $status;
        
            // Código para verificar si existe el Rol
            $sql = "SELECT * FROM rol WHERE nombrerol = '{$this->strRol}' ";
            $request = $this->select_all($sql);
        
            if (empty($request)) {
                $query_insert  = "INSERT INTO rol(nombrerol,descripcion,status) VALUES(?,?,?)";
                $arrData = array($this->strRol, $this->strDescripcion, $this->intStatus);
                $request_insert = $this->insert($query_insert, $arrData);
                $return = $request_insert;
            } else {
                $return = "exist";
            }
            return $return;
        }
        
        
    }
    ?>