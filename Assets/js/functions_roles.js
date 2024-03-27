var tableRoles;

document.addEventListener('DOMContentLoaded', function(){
    tableRoles = $('#tableRoles').dataTable( {
		"aProcessing":true,
		"aServerSide":true,
        "language": {
        	"url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": " "+base_url+"/Roles/getRoles",
            "dataSrc":""
        },
        "columns":[
            {"data":"idrol"},
            {"data":"nombrerol"},
            {"data":"descripcion"},
            {"data":"status"},
            {"data":"options"}
        ],
        "responsive": true,
        "destroy": true,
        "iDisplayLength": 10,
        "order":[[0,'desc']]  
    });

    //Nuevo Rol
    var formRol = document.querySelector('#formRol');
    formRol.onsubmit = function(e){
        e.preventDefault();
        //console.log("Formulario enviado");

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
    $('#modalFormRol').modal('show');
}

window.addEventListener('load', function() {
    fntEditRol();
    }, false);
    
    
function fntEditRol(){
    var btnEditRol = document.querySelectorAll(".btnEditRol");
    btnEditRol.forEach(function(btnEditRol) {
        btnEditRol.addEventListener('click', function(){
        
        document.querySelector('#titleModal').innerHTML ="Actualizar Rol";
        document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate"); 
        document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
        document.querySelector('#btnText').innerHTML ="Actualizar";
    
        $('#modalFormRol').modal('show');

        });
    });
}
