<?php

    class Permisos extends Controllers{
            public function __construct()
            {
                parent::__construct();

            }

            public function getPermisos(int $idrol)
            {
                $rolid = intval($idrol);
                if ($idrol > 0) 
                {
                    $arrModulos = $this->model->selectModulos();
                    $arrPermisosRol = $this->model->selectPermisosRol($rolid);
                    
                    $arrPermisos = array('r' =>0, 'w' =>0, 'u' =>0, 'd' =>0);
                    $arrPermisoRol = array('idrol' => $rolid );
                    
                    if(empty($arrPermisosRol))
                    {
                        for ($i=0; $i < count($arrModulos); $i++) { 
                            $arrModulos[$i]['permisos'] = $arrPermisos;                        }
                    }else{
                        for ($i=0; $i < count($arrModulos) ; $i++) { 
                            $arrPermisos = array(   'r' => $arrPermisosRol[$i]['r'],
                                                    'w' => $arrPermisosRol[$i]['w'],
                                                    'u' => $arrPermisosRol[$i]['u'],
                                                    'd' => $arrPermisosRol[$i]['d'],
                                                );
                            if ($arrModulos[$i]['idmodulo'] == $arrPermisosRol[$i]['moduloid']) 
                            {
                                $arrModulos[$i]['permisos'] = $arrPermisos;
                            }
                        }
                    }

                    $arrPermisoRol['modulos'] = $arrModulos;
                    $html = getModal("modalPermisos", $arrPermisoRol);
                    //dep($arrPermisoRol);
                }
                die();
            } 

            public function setPermisos()
            {
                if($_POST)
                {

                    $intIdrol = intval($_POST['idrol']);
                    $modulos = $_POST['modulos'];

                    $this->model->deletePermisos($intIdrol);

                    foreach ($modulos as $modulo){
                        $idModulo = $modulo['idmodulo'];
                        $r = empty($modulo['r']) ? 0 : 1;
                        $w = empty($modulo['w']) ? 0 : 1;
                        $u = empty($modulo['u']) ? 0 : 1;
                        $d = empty($modulo['d']) ? 0 : 1;
                        $requestPermiso = $this->model->insertPermisos($intIdrol, $idModulo, $r, $w, $u, $d);
                    }
                    if($requestPermiso > 0)
                    {
                        $arrResponse = array('status' => true, 'msg' => 'Permisos asignados correctamente.');
                    }else{
                        $arrResponse = array('status' => false, 'msg' => 'No es posible asignar los permisos.');
                    }
                    echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
                }
                die();
            }
             
           
    }

?>