<script>
    const base_url = "<?php echo base_url()?>"
</script>
<!-- Essential javascripts for application to work-->
<script src="<?php echo media()?>/js/jquery-3.3.1.min.js"></script>
    <script src="<?php echo media()?>/js/popper.min.js"></script>
    <script src="<?php echo media()?>/js/bootstrap.min.js"></script>
    <script src="<?php echo media()?>/js/main.js"></script>
    <script src="<?php echo media()?>/js/fontawesome.js"></script>
    
    <!-- The javascript plugin to display page loading on top-->
    <!-- <script src="js/plugins/pace.min.js"></script> -->
    <!-- Page specific javascripts-->
    <script type="text/javascript" src="<?php echo media()?>/js/plugins/sweetalert.min.js"></script>
    
    <!-- Data table plugin-->
    <script type="text/javascript" src="<?php echo media()?>/js/plugins/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="<?php echo media()?>/js/plugins/dataTables.bootstrap.min.js"></script>
    <script type="text/javascript" src="<?php echo media()?>/js/plugins/bootstrap-select.min.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.html5.min.js"></script>
    
    <script src="<?php echo media()?>/js/functions_admin.js"></script>
    <script src="<?= media();?>/js/<?= $data['page_functions_js']; ?>"></script>
    
</body>
</html>

