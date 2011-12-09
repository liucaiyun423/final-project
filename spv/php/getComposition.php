<?php

//  $lines = file('../MainMenu/level.js');
//  $lines = file('../MainMenu/ApplicationManager.js');
 // $lines = file('../MainMenu/Main.js');
 // $lines = file('../MainMenu/GameObjectManager.js');
 // $lines = file('../MainMenu/AnimatedGameObject.js');

 //echo $fileName;
 //if(!file_exists('../$fileName')) {die("Class not found! Be sure to input correct class name!");}
 //else  {$lines = file('../$fileName');}
 
 $fileName = $_GET['fname'];
 $lines = file($fileName);
 
 
 
 $compositonLine=''; 

 
 foreach ($lines as $line_num => $line) 
 { 

    $position1 = strpos($line, '().');
    $position2 = strpos($line, 'new');
    $position3 = strpos($line, 'Date().getTime();');

          if (($position1 == true)&&($position2 == true)&&($position3 == false))
         {   
            $compositions = explode("new", $line);
            echo "<li class='composition'>". $compositions[1] . '</li>';
         }   
         
           
 }



?>			