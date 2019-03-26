<?php
    if(isset($_POST['login'])){
        $connection= new mysqli('localhost','root','','login');

        $email = $connection->real_escape_string($_POST['emailPHP']);

        $password = md5($connection->real_escape_string($_POST['passwordPHP']));

        $data=$connection->query("SELECT id FROM users WHERE email='$email' AND password='$password' ");

        if($data->nun_rows>0){
            exit('login success');
        }else{
            exit('please check');
        }
    }


?>
<html>
    <head>
        <title>sdfg</title>
    </head>
    <body>
        <form  method="post" action="main.php">
            <input type="text" id="email" placeholder="Email.." >
            <input type="password" id="password" placeholder="Password.." >
            <input type="button"  value="Log In" id="Login">
        </form>
        <script
  src="http://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
  <script>
      $(document).ready(function(){
       $('#login').on("click", function () {
            var email=$("#email").val();
            var password=$("#password").val();
            console.log(password);
        });
      });
  </script>
    </body>
</html>