document.addEventListener('DOMContentLoaded', function(){
    var tableUsuarios;
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

function openModal(){
    document.querySelector('#idUsuario').value="";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML="Guardar";
    document.querySelector('#titleModal').innerHTML="Nuevo Usuario";
    document.querySelector('#formUsuario').reset();
    $('#modalFormUsuario').modal('show');
    }