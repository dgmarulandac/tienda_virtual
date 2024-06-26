<?php

    class UsuariosModel extends Mysql
    {
        private $intIdUsuario;
        private $stridentificacion;
        private $strNombre;
        private $strAppelido;
        private $intTelefono;
        private $strEmail;
        private $strPassword;
        private $strToken;
        private $intTipoId;
        private $intStatus;

        public function __construct()
        {
           parent::__construct();
        }

        public function insertUsuario(string $Identificacion, string $Nombre, string $Apellido, int $Telefono, string $Email, string $password, int $TipoDeUsuario, int $Status)
        {
            $this->stridentificacion = $Identificacion;
            $this->strNombre = $Nombre;
            $this->strAppelido = $Apellido;
            $this->intTelefono = $Telefono;
            $this->strEmail = $Email;
            $this->strPassword = $password;
            $this->intTipoId = $TipoDeUsuario;
            $this->intStatus = $Status;
            $return = 0;

            $sql = "SELECT * FROM persona WHERE
                    email_user = '{$this->strEmail}' or identificacion = '{$this->stridentificacion}'";
            $request = $this->select_all($sql);

            if(empty($request))
            {
                $query_insert = "INSERT INTO persona(
                                identificacion, nombres,apellidos, telefono, email_user, password, rolid, status)
                                VALUES (?,?,?,?,?,?,?,?)";
                $arrData = array (
                            $this->stridentificacion,
                            $this->strNombre,
                            $this->strAppelido,
                            $this->intTelefono,
                            $this->strEmail,
                            $this->strPassword,
                            $this->intTipoId,
                            $this->intStatus);
                $request_insert = $this->insert($query_insert, $arrData);
                $return = $request_insert;
            }else{
                $return = "exist";
            }
            return $return;
        }

        public function selectUsuarios(){
            $sql = "SELECT p.idpersona, p.identificacion, p.nombres, p.apellidos, p.telefono, p.email_user, p.status, r.nombrerol
                    FROM persona p
                    INNER JOIN rol r 
                    ON p.rolid = r.idrol
                    WHERE p.status !=0";
                    $request = $this->select_all($sql);
                    return $request;
        }

        public function selectUsuario(int $idpersona){
            $this->intIdUsuario = $idpersona;
            $sql = "SELECT p.idpersona, p.identificacion, p.nombres, p.apellidos, p.telefono, p.email_user,p.nit, 
            p.nombrefiscal, p.direccionfiscal, p.status, r.nombrerol, r.idrol,
            DATE_FORMAT(p.datecreated, '%d-%m-%Y') as fechaRegistro
            FROM persona p
            INNER JOIN rol r
            ON p.rolid = r.idrol
            WHERE p.idpersona = $this->intIdUsuario";
            $request = $this->select($sql);
            return $request;

        }
        
    }
    ?>