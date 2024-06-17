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
        "responsive": true, 
        "destroy": true, 
        "iDisplayLength": 10,
        "order": [[0, "desc"]]
        });


    var formUsuario = document.querySelector('#formUsuario');
    if (formUsuario) {
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

            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url + '/Usuarios/setUsuario';
            var formData = new FormData(formUsuario);
            request.open('POST', ajaxUrl, true);
            request.send(formData);
            
            request.onreadystatechange = function() {
                if(request.readyState === 4 && request.status === 200) {
                    var response = JSON.parse(request.responseText);
                        if (response.status){
                            $('#modalFormUsuario').modal("hide");
                            formUsuario.reset();
                            swal("Usuarios", response.msg, "success");
                            tableUsuarios.api().ajax.reload(function(){

                            });
                        }else{
                            swal("Error", response.msg, "error");
                        }
                }else{
                    console.log("Error");
                }
            }    
        }
    } else {
        console.error('Formulario #formUsuario no encontrado.');
    }
}, false);



window.addEventListener('load', function(){
    fntRolesUsuario();
    fntVerUsuario();
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
function fntVerUsuario(){
    var btnViewUsuario = document.querySelectorAll(".btnViewUsuario");
    btnViewUsuario.forEach(function(btnViewUsuario){
        btnViewUsuario.addEventListener('click', function(){
            var idUsuario = this.getAttribute("us");
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

            
        })
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