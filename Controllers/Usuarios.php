<?php

    class Usuarios extends Controllers{
            public function __construct()
            {
                parent::__construct();

            }

            public function Usuarios()
            {
               
                $data['page_tag'] = "Usuarios";
                $data['page_title'] = "USUARIOS <small>Tienda Virtual</small>";
                $data['page_name'] = "usuarios";
                $this->views->getView($this,"usuarios",$data);
            }
            
            public function setUsuario(){
               if($_POST){

                    if (empty($_POST['txtIdentificacion']) || empty($_POST['txtNombre']) || empty($_POST['txtApellido'])
                    || empty($_POST['txtTelefono']) || empty($_POST['txtEmail']) || empty($_POST['listRolid']) || empty($_POST['listStatus'])) {

                        $arrResponse = array("status" => false, "msg" => 'Datos incorrectos.');
                    }else{
                      
                        $strIdentificacion = strClean($_POST['txtIdentificacion']);
                        $strNombre = ucwords(strClean($_POST['txtNombre']));
                        $strApellido = ucwords(strClean($_POST['txtApellido']));
                        $intTelefono = intVal(strClean($_POST['txtTelefono']));
                        $strEmail = strtolower(strClean($_POST['txtEmail']));
                        $intTipoDeUsuario = intVal(strClean($_POST['listRolid']));
                        $intStatus = intval(strClean($_POST['listStatus']));
                        
                        $strPassword = empty($_POST['txtPassword']) ? hash("SHA256", passGenerator()) : hash("SHA256", $_POST['txtPassword']);

                        $request_user = $this->model->insertUsuario($strIdentificacion, $strNombre, $strApellido, $intTelefono, $strEmail, $strPassword, $intTipoDeUsuario, $intStatus);

                        if($request_user > 0)
                        {
                            $arrResponse = array("status" => true, "msg" => 'Datos Guardados correctamente.');

                        }else if($request_user == 'exist')
                        {
                            $arrResponse = array("status" => false, "msg" => '¡Atención! el Email o la identificación ya existe, ingrese otro.');

                        }else
                        {
                            $arrResponse = array("status" => false, "msg" => 'No es posible almacenar los datos .');
                        }
                    }
                    echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
               }
               die();

            }
           
    }

?>