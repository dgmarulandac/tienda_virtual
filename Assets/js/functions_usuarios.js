var tableUsuarios;

document.addEventListener('DOMContentLoaded', function(){

    tableUsuarios = $('#tableUsuarios').dataTable( {
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "Lang/Spanish.json" 
        },
        "ajax": {
            "url": base_url + "/usuarios/getUsuarios",
            "dataSrc": ""
        },
        "columns": [
            {"data": "idpersona"},
            {"data": "identificacion"},
            {"data": "nombres"},
            {"data": "apellidos"},
            {"data": "telefono"},
            {"data": "email_user"},
            {"data": "nombrerol"},
            {"data": "status"},
            {"data": "options"}
        ],
        'dom': 'lBfrtip',
        'buttons':[
            {
                "extend": "copyHtml5",
                "text": "<i class='far fa-copy'></i> Copiar",
                "titleAttr": "Copiar",
                "className": "btn btn-secondary"
            },
            {
                "extend": "excelHtml5",
                "text": "<i class='far fa-file-excel'></i> Excel",
                "titleAttr": "Exportar Excel",
                "className": "btn btn-success"
            },
            {
                "extend": "pdfHtml5",
                "text": "<i class='far fa-file-pdf'></i> PDF",
                "titleAttr": "Exportar PDF",
                "className": "btn btn-danger"
            },
            {
                "extend": "csvHtml5",
                "text": "<i class='far fa-file-csv'></i> CSV",
                "titleAttr": "Exportar a CSV",
                "className": "btn btn-info"
            }
        ],
        "responsive": true, 
        "destroy": true, 
        "iDisplayLength": 10,
        "order": [[0, "desc"]]
        });


    var formUsuario = document.querySelector('#formUsuario');
    
        formUsuario.onsubmit = function(e){
            e.preventDefault();
            
            var strIdentificacion = document.querySelector('#txtIdentificacion').value;
            var strNombre = document.querySelector('#txtNombre').value;
            var strApellido = document.querySelector('#txtApellido').value;
            var intTelefono = document.querySelector('#txtTelefono').value;
            var strEmail = document.querySelector('#txtEmail').value;
            var intTipoDeUsuario = document.querySelector('#listRolid').value;
            var intStatus = document.querySelector('#listStatus').value;
            var strPassword = document.querySelector('#txtPassword').value;

            if(strIdentificacion === '' || strApellido === '' || strNombre === '' || intTelefono === '' || strEmail === '' || intTipoDeUsuario === '' || intStatus === ''){
                swal("Atención", "Todos los campos son obligatorios.", "error");
                return false;
            }

            let elementsValid = document.getElementsByClassName("valid");
            for (let i = 0; i < elementsValid.length; i++){
                if(elementsValid[i].classList.contains('is-invalid')){
                    swal("Atención", "por favor verifique los campos en rojo.", "error");
                    return false;
                }
            }

            
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url+'/Usuarios/setUsuario'; 
            var formData = new FormData(formUsuario);
            request.open("POST",ajaxUrl,true);
            request.send(formData);
            
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    var objData = JSON.parse(request.responseText);
                    if(objData.status)
                    {
                        $('#modalFormUsuario').modal("hide");
                        formUsuario.reset();
                        swal("Usuarios", objData.msg ,"success");
                        tableUsuarios.api().ajax.reload();
                    }else{
                        swal("Error", objData.msg , "error");
                    }
                }
            }

        }
    
}, false);



window.addEventListener('load', function(){
    fntRolesUsuario();
    // fntVerUsuario();
    // fntEditUsuario();
    // fntDelUsuario();
}, false);


function fntRolesUsuario(){
    var ajaxUrl = base_url + '/Roles/getSelectRoles';
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET",ajaxUrl,true);
    request.send();

    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            document.querySelector('#listRolid').innerHTML = request.responseText;
            document.querySelector('#listRolid').value = 1;
            $('#listRolid').selectpicker('render');
        }
    }
}
function fntVerUsuario(idpersona){
            var idUsuario = idpersona;
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUser = base_url+'/Usuarios/getUsuario/' + idUsuario;
            request.open("GET", ajaxUser, true);
            request.send();

            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    var objData = JSON.parse(request.responseText);
                    if(objData.status)
                        {
                            var estadousuario = objData.data.status == 1 ?
                            '<span class="badge badge-success">Activo</span>':
                            '<span class="badge badge-danger">Inactivo</span>';
                            document.querySelector("#celIdentificacion").innerHTML = objData.data.identificacion;
                            document.querySelector("#celNombre").innerHTML = objData.data.nombres;
                            document.querySelector("#celApellido").innerHTML = objData.data.apellidos;
                            document.querySelector("#celTelefono").innerHTML = objData.data.telefono;
                            document.querySelector("#celEmail").innerHTML = objData.data.email_user;
                            document.querySelector("#celStatus").innerHTML = estadousuario;
                            document.querySelector("#celTipodeUsuario").innerHTML = objData.data.nombrerol;
                            document.querySelector("#celFechaRegistro").innerHTML = objData.data.fechaRegistro;
                            $('#modalViewUser').modal('show');
                        }else{
                            swal("Error", objData.msg, "error");
                        }
                }
            }

            
        
}

function fntEditUsuario(idpersona){
   
            document.querySelector('#titleModal').innerHTML="Actualizar Usuario";
            document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
            document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
            document.querySelector('#btnText').innerHTML="Actualizar";

            var idUsuario = idpersona;
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUser = base_url+'/Usuarios/getUsuario/' + idUsuario;
            request.open("GET", ajaxUser, true);
            request.send();

            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    var objData = JSON.parse(request.responseText);
                    if(objData.status)
                        {
                            document.querySelector("#idUsuario").value = objData.data.idpersona;
                            document.querySelector("#txtIdentificacion").value = objData.data.identificacion;
                            document.querySelector("#txtNombre").value = objData.data.nombres;
                            document.querySelector("#txtApellido").value = objData.data.apellidos;
                            document.querySelector("#txtTelefono").value = objData.data.telefono;
                            document.querySelector("#txtEmail").value = objData.data.email_user;
                            document.querySelector("#listRolid").value = objData.data.idrol;
                            $('#listRolid').selectpicker('render');
                            document.querySelector("#listStatus").value = objData.data.status;
                            $('#listStatus').selectpicker('render');
                            
                        }else{
                            swal("Error", objData.msg, "error");
                        }
                }
                $('#modalFormUsuario').modal('show');
            }
}

function fntDelUsuario(idpersona){
            var idUsuario = idpersona;
            swal({
                title: "Eliminar Usuario",
                text: "¿Realmente quiere eliminar el Usuario?",
                type:  "warning",
                showCancelButton: true,
                confirmButtonText: "Si, elminar!",
                cancelButtonText: "No, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function(isConfirm){
                
                if(isConfirm){
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxUrl = base_url+'/Usuarios/delUsuario/';
                    var strData = "idUsuario="+idUsuario;
                    request.open("POST", ajaxUrl, true);
                    request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                    request.send(strData);

                    request.onreadystatechange = function(){
                        if(request.readyState == 4 && request.status == 200){
                            var objData = JSON.parse(request.responseText);
                            if(objData.status)
                            {
                                swal("Elminar!", objData.msg, "success");
                                tableUsuarios.api().ajax.reload(function(){
                                   
                                   
                                });
                            }else{
                                swal("Atención!", objData.msg, "error");
                            }
                        }
                    }

                }
            })
}

function openModal(){
    document.querySelector('#idUsuario').value="";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML="Guardar";
    document.querySelector('#titleModal').innerHTML="Nuevo Usuario";
    document.querySelector('#formUsuario').reset();
    $('#modalFormUsuario').modal('show');
    }