var tableRoles;

document.addEventListener('DOMContentLoaded', function() {
    tableRoles = $('#tableRoles').dataTable( {
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "Lang/Spanish.json" 
        },
        "ajax": {
            "url": base_url + "/Roles/getRoles",
            "dataSrc": ""
        },
        "columns": [
            {"data": "idrol"},
            {"data": "nombrerol"},
            {"data": "descripcion"},
            {"data": "status"},
            {"data": "options"}
        ],
        "responsive": true, 
        "destroy": true, 
        "iDisplayLength": 10,
        "order": [[0, "desc"]]
        });
        
        
        //Nuevo Rol
        var formRol = document.querySelector('#formRol');
    formRol.onsubmit = function(e){
        e.preventDefault();
        //console.log("Formulario enviado");
        var intIdRol = document.querySelector('#idRol').value;
        var strNombre = document.querySelector('#txtNombre').value;
        var strDescription = document.querySelector('#txtDescription').value;
        var intStatus = document.querySelector('#listStatus').value;
        if (strNombre == '' || strDescription == '' || intStatus == '')
        {
            swal("Atención", "Todos los campos son obligatorios.", "error");
            return false;
        }
        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = base_url+'/Roles/setRol';
        var formData = new FormData(formRol);
        request.open("POST", ajaxUrl, true);
        request.send(formData);

        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){

                var objData = JSON.parse(request.responseText);
                if(objData.status){
                    $('#modalFormRol').modal("hide");
                    formRol.reset();
                    swal("Roles de Usuario", objData.msg, "success");
                    tableRoles.api().ajax.reload(function(){
                        // fntEditRol();
                        // fntDelRol();
                        // fntPermisos();
                        });
                }else{
                    swal("Error", objData.msg, "error");
                    }
            }
        }
        
        }
    
        });

        $('#tableRoles').DataTable(); // Inicialización de DataTables dentro de DOMContentLoaded

        function openModal(){
        document.querySelector('#idRol').value="";
        document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
        document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
        document.querySelector('#btnText').innerHTML="Guardar";
        document.querySelector('#titleModal').innerHTML="Nuevo Rol";
        document.querySelector('#formRol').reset();
        

        $('#modalFormRol').modal('show');
        }

    window.addEventListener('load', function() {
    //     fntEditRol();
    //     fntDelRol();
    // fntPermisos();

    }, false);
    
    
    function fntEditRol(idrol){            
            document.querySelector('#titleModal').innerHTML ="Actualizar Rol";
            document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate"); 
            document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
            document.querySelector('#btnText').innerHTML ="Actualizar";

            var idrol = idrol;
            //console.log(idrol)
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl  = base_url+'/roles/getRol/'+idrol;
            request.open("GET",ajaxUrl ,true);
            request.send();
        
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    
                    var objData = JSON.parse(request.responseText);
                    if(objData.status)
                    {
                        document.querySelector("#idRol").value = objData.data.idrol;
                        document.querySelector("#txtNombre").value = objData.data.nombrerol;
                        document.querySelector("#txtDescription").value = objData.data.descripcion;
        
                        if(objData.data.status == 1)
                        {
                            var optionSelect = '<option value="1" selected class="notBlock">Activo</option>';
                            }else{
                                var optionSelect = '<option value="2" selected class="notBlock">Inactivo</option>';
                        }
                        var htmlSelect = `${optionSelect}
                                          <option value="1">Activo</option>
                                          <option value="2">Inactivo</option>
                                        `;
                        document.querySelector("#listStatus").innerHTML = htmlSelect;
                        $('#modalFormRol').modal('show');
                    }else{
                        swal("Error", objData.msg , "error");
                    }
                }
            }
    } 
    
    function fntDelRol(idrol){
                var idrol = idrol;
                swal({
                    title: "Eliminar Rol",
                    text: "¿Realmente quiere eliminar el Rol?",
                    type:  "warning",
                    showCancelButton: true,
                    confirmButtonText: "Si, elminar!",
                    cancelButtonText: "No, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    
                    if(isConfirm){
                        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                        var ajaxUrl = base_url+'/roles/delRol/';
                        var strData = "idrol="+idrol;
                        request.open("POST", ajaxUrl, true);
                        request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                        request.send(strData);

                        request.onreadystatechange = function(){
                            if(request.readyState == 4 && request.status == 200){
                                var objData = JSON.parse(request.responseText);
                                if(objData.status)
                                {
                                    swal("Elminar!", objData.msg, "success");
                                    tableRoles.api().ajax.reload(function(){
                                       
                                    });
                                }else{
                                    swal("Atención!", objData.msg, "error");
                                }
                            }
                        }

                    }
                })
    }
    
    
    function fntPermisos(idrol) {
                var idrol = idrol;
                var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                var ajaxUrl = base_url + '/Permisos/getPermisos/' + idrol;
                request.open("GET", ajaxUrl, true);
                request.send();
    
                request.onreadystatechange = function () {
                    if (request.readyState == 4 && request.status == 200) {
                        document.querySelector('#contentAjax').innerHTML = request.responseText;
                        $('.modalPermisos').modal('show');
                        document.querySelector('#formPermisos').addEventListener('submit', fntSavePermisos, false)
                    }
                }
    }
    
    function fntSavePermisos(evnet){
        evnet.preventDefault();
        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = base_url+'/Permisos/setPermisos'; 
        var formElement = document.querySelector("#formPermisos");
        var formData = new FormData(formElement);
        request.open("POST",ajaxUrl,true);
        request.send(formData);
    
        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                var objData = JSON.parse(request.responseText);
                if(objData.status)
                {
                    swal("Permisos de usuario", objData.msg ,"success");
                }else{
                    swal("Error", objData.msg , "error");
                }
            }
        }
        
    }
    


