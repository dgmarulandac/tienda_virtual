<?php  headerAdmin($data); 
       getModal('modalUsuarios', $data);
?>
    
     <main class="app-content">
      <div class="app-title">
        <div>
        <h1><i class="fa-solid fa-user-tag"></i></i> <?php echo $data['page_title']?>
            <button class="btn btn-primary" type="button" onclick="openModal();"><i class="fa-solid fa-circle-plus"></i> Nuevo</button>
        </h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="<?php echo base_url()?>/usuarios"><?php echo $data['page_title']?></a></li>
        </ul>
      </div>
      
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <div class="tile-body">
              <div class="table-responsive">
                <table class="table table-hover table-bordered" id="tableUsuarios">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Identificacion</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Teléfono</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Status</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
<?php footerAdmin($data);?>
