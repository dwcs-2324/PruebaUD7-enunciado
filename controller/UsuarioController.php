<?php

class UsuarioController {

    const VIEW_FOLDER = "user";

    public $page_title;
    public $view;
    private UsuarioServicio $usuarioServicio;

    public function __construct() {
        $this->view = self::VIEW_FOLDER . DIRECTORY_SEPARATOR . 'login';
        $this->page_title = '';
        $this->usuarioServicio = new UsuarioServicio();
    }

    

    
    public function loginJSON() {
        //Para simplificar la implementación del ejemplo de SPA vamos a obviar la redirección en caso de que ya haya iniciado sesión


        $this->page_title = 'Inicio de sesión';
        $this->view = self::VIEW_FOLDER . DIRECTORY_SEPARATOR . 'login';

        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (isset($data["email"]) && isset($data["pwd"]) && isset($data["rol"])) {
                $email = $data["email"];
                $pwd = $data["pwd"];
                $rolId = $data["rol"];

                $userResult = $this->usuarioServicio->login($email, $pwd, $rolId);

                if ($userResult == null) {
                    $response["error"] = true;
                    return json_encode($response);
                } else {
                    //                c) Se guardará en la sesión (1 punto)
                    //
                    //    El id del usuario
                    //    El id del rol seleccionado
                    //    El email del usuario
                    //    El tiempo de último acceso con time()
                    SessionManager::iniciarSesion();
                    $_SESSION["userId"] = $userResult->getId();
                    $_SESSION["email"] = $userResult->getEmail();
                    $_SESSION["roleId"] = $rolId;
                    $_SESSION["ultimoAcceso"] = time();
                    // $this->redirectAccordingToRole();

                    $response["userId"] = $userResult->getId();
                    $response["email"] = $userResult->getEmail();
                    //2.a)
                    $response["rolId"] = $rolId;
                    return json_encode($response);
                }
            } else {
                //400 Bad Request
                http_response_code(400);
                $response["error"] = true;
                return json_encode($response);
            }
        } catch (Exception $ex) {

            //400 Bad Request
            http_response_code(400);
            $response["error"] = true;
            return json_encode($response);
        }
    }

    public function logout() {
        SessionManager::cerrarSesion();
        $response["error"] = false;
        return json_encode($response);
    }

  
 

    public function getRoles() {
        $app_roles = $this->usuarioServicio->getRoles();
        return json_encode($app_roles);
    }



    public function checkEmail() {
        $response["available"] = false;

        try {
            /*e) Modifica el método checkEmail en UsuarioController para que extraiga el objeto JSON enviado en la petición POST anterior. El método devuelve un objeto JSON  {'available':true} o {'available':false} en función de la disponibilidad. Si los parámetros de entrada no son correctos devolverá código 400 y {'available':false} (1 punto)*/



            
            if (isset($data["email"])) {
                $available = $this->usuarioServicio->isEmailAvailable($data["email"]);
                $response["available"] = $available;
            } else {
                //400 Bad Request
                http_response_code(400);
            }
        } catch (\Exception $e) {
            echo "Ha ocurrido una excepción " . $e->getMessage();
            //500 Internal Server Error
            http_response_code(500);
        }
        return json_encode($response);
    }

}
