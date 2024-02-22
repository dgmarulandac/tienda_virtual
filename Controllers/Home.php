<?php

    class Home extends Controllers{
            public function __construct()
            {
                parent::__construct();

            }

            public function home()
            {
                $data['page_id'] = 1;
                $data['page_tag'] = "Home";
                $data['page_title'] = "Pagina principal";
                $data['page_name'] = "home";
                $data['page_content'] = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat cupiditate nisi esse doloremque! Ullam doloribus laborum molestias dolorum facere voluptate dolor placeat nam, deleniti eaque rerum iusto nostrum, illo necessitatibus.";
                $this->views->getView($this,"home",$data);
            }    
           
    }

?>