<?php

    class HomeModel extends Mysql
    {
        public function __construct()
        {
           parent::__construct();
        }
        
    }
    //     public function setUser(string $name, int $age)
    //         {
    //             $query_insert = "INSERT INTO usuario(name, age) VALUES(?,?)";
    //             $arrData = array($name, $age);
    //             $request_insert = $this ->insert($query_insert,$arrData);
    //             return $request_insert;
    //         }

    //     public function getUser($id)
    //         {
    //             $sql = "SELECT * FROM usuario WHERE id = $id";
    //             $request = $this->select($sql);
    //             return $request;
    //         }

    //     public function updateUser(int $id, string $name, int $age)
    //         {
    //             $sql = "UPDATE usuario SET name = ?, age = ? WHERE id = $id";
    //             $arrData = array($name, $age);
    //             $request = $this->update($sql, $arrData);
    //             return $request;
    //         }

    //     public function getUsers()
    //         {
    //             $sql = "SELECT * FROM usuario";
    //             $request = $this->select_all($sql);
    //             return $request;
    //         }
     
    //     public function delUser($id)
    //         {
    //             $sql = "DELETE FROM usuario WHERE id = $id";
    //             $request = $this->delete($sql);
    //             return $request;
    //         }
    ?>