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
                $data['page_functions_js'] = "functions_usuarios.js";
                $this->views->getView($this,"usuarios",$data);
            }
            
            public function setUsuario(){
               if($_POST){
                   
                    if (empty($_POST['txtIdentificacion']) || empty($_POST['txtNombre']) || empty($_POST['txtApellido'])
                    || empty($_POST['txtTelefono']) || empty($_POST['txtEmail']) || empty($_POST['listRolid']) || empty($_POST['listStatus'])) 
                    {

                        $arrResponse = array("status" => false, "msg" => 'Datos incorrectos.');
                    }else{
                        $strUsuario = intval($_POST['idUsuario']);
                        $strIdentificacion = strClean($_POST['txtIdentificacion']);
                        $strNombre = ucwords(strClean($_POST['txtNombre']));
                        $strApellido = ucwords(strClean($_POST['txtApellido']));
                        $intTelefono = intVal(strClean($_POST['txtTelefono']));
                        $strEmail = strtolower(strClean($_POST['txtEmail']));
                        $intTipoDeUsuario = intVal(strClean($_POST['listRolid']));
                        $intStatus = intval(strClean($_POST['listStatus']));
                        
                        if($strUsuario == 0){
                            $option = 1;
                            $strPassword = empty($_POST['txtPassword']) ? hash("SHA256", passGenerator()) : hash("SHA256", $_POST['txtPassword']);
                            $request_user = $this->model->insertUsuario($strIdentificacion,
                                                                        $strNombre, 
                                                                        $strApellido, 
                                                                        $intTelefono, 
                                                                        $strEmail, 
                                                                        $strPassword, 
                                                                        $intTipoDeUsuario,
                                                                        $intStatus);
                        } else{
                            $option = 2;
                            $strPassword = empty($_POST['txtPassword']) ? "" : hash("SHA256", $_POST['txtPassword']);
                            $request_user = $this->model->updateUsuario($strUsuario, 
                                                                        $strIdentificacion,
                                                                        $strNombre, 
                                                                        $strApellido, 
                                                                        $intTelefono, 
                                                                        $strEmail, 
                                                                        $strPassword, 
                                                                        $intTipoDeUsuario,
                                                                        $intStatus);

                        }
                       
                        if($request_user >= 0)
                        {
                            if($option == 1){

                                $arrResponse = array('status' => true, 'msg' => 'Datos Guardados correctamente.');

                            }else{
                                
                                $arrResponse = array('status' => true, 'msg' => 'Datos Actualizados correctamente.');
                            }

                        }else if($request_user == 'exist')
                        {

                            $arrResponse = array('status' => false, 'msg' => '¡Atención! el Email o la identificación ya existe, ingrese otro.');

                        }else
                        {
                            $arrResponse = array('status' => false, 'msg' => 'No es posible almacenar los datos .');
                        }
                    }
                    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
               }
               die();

            }

            public function getUsuarios()
            {
                $arrData = $this->model->selectUsuarios();
                //dep($arrData);

                for ($i=0; $i < count($arrData); $i++) { 
                    if ($arrData[$i]['status'] == 1) {
                        
                        $arrData[$i]['status'] = '<span class="badge badge-success">Activo</span>';
                    }else{
                        $arrData[$i]['status'] = '<span class="badge badge-danger">Inactivo</span>';
                    }

                    $arrData[$i]['options'] = '<div class="text-center">
                    
                                                    <button class="btn btn-info btn-sm btnViewUsuario"  onClick="fntVerUsuario('.$arrData[$i]['idpersona'].')" title="Ver usuario"><i class="fa-solid fa-eye"></i></button>
                                                    <button class="btn btn-primary btn-sm btnEditUsuario"  onClick="fntEditUsuario('.$arrData[$i]['idpersona'].')" title="Editar Usuario"><i class="fa-solid fa-pencil"></i></button>
                                                    <button class="btn btn-danger btn-sm btnDelPersona"  onClick="fntDelUsuario('.$arrData[$i]['idpersona'].')" title="Eliminar Persona"><i class="fa-solid fa-trash-can"></i></button>
                                                </div>';
                }
                
                echo json_encode($arrData,JSON_UNESCAPED_UNICODE);
                die();
            }

            public function getUsuario(int $idpersona){

                $idusuario = intval($idpersona);

                if($idusuario > 0){
                    $arrData = $this->model->selectUsuario($idusuario);
                    if(empty($arrData)){
                        $arrResponse = array("status" => false, "msg" => 'Datos no encontrados.');
                    }else {
                        $arrResponse = array("status" => true, "data" => $arrData);
                    }
                    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
                }
                die();
            }

            public function delUsuario () {
                if($_POST){
                    $intIdpersona = intval($_POST['idUsuario']);
                    $requestDelete = $this->model->deleteUsuario($intIdpersona);
                    if($requestDelete)
                    {
                        $arrResponse = array('status' => true, 'msg' => 'Se ha eliminado el usuario.');
                    }else{

                        $arrResponse = array('status' => false, 'msg' => 'Error al eliminar el usuario.');
                    }
                    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
                }
                die();
            }
            
           
    }

?>