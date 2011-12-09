<?php


 // $lines = file('../MainMenu/player.js');
 
 $fileName = $_GET['fname'];
 $lines = file($fileName);
 $num=0;
 
 //echo $fileName;
 //if(!file_exists('../$fileName')) {die("Class not found! Be sure to input correct class name!");}
 //else  {$lines = file('../$fileName');}
 
 $prototypeName=''; 
 $prototypePath='';
 $prototypeFunctionName='';
 
 foreach ($lines as $line_num => $line) 
 { 
    $position1 = strpos($line, 'function(');
    $position2 = strpos($line, 'this.');
    $position3 = strpos($line, '.prototype');
    $position4 = strpos($line, 'new');

          if (($position3 == true)&&($position4 == true)){
             
                $prototypes = explode("new", $line);
                $prototype = explode('()',$prototypes[1]);
                $p = explode(';',$prototype[0]);
                $prototypeName = trim($p[0]);}
           
 }
 
// echo $prototypeName;  echo "<br/>\n";echo "<br/>\n";
 $prototypePath = '../MainMenu/' . $prototypeName . '.js';
 echo "<li class='prototypeClassName' style='color:gray'>" .$prototypeName . '</li>';
 
 if ($prototypeName != '')
 {
  $prototypeLines = file($prototypePath);
  
     foreach ($prototypeLines as $prototypLine_num => $prototypeLine) 
     { 
              $position1 = strpos($prototypeLine, 'function(');
              $position2 = strpos($prototypeLine, 'this.');
              $position3 = strpos($prototypeLine, '(');
              
              if (($position1 == true)&&($position2 == true)) 
              {
                   $prototypes = explode('=', $prototypeLine);
                 //  $prototype = explode('this.',$prototypes[0]);
                 //  $prototypeFunctionName = trim($prototype[1]);
                   $prototypeFunctionName = trim($prototypes[0]);
                   echo "<li class='prototypeFunction'>" . $prototypeFunctionName .'()'. '</li>';
              }
              if(($position3 == true)&&($num<2)){$num++;}
              if($num<2)
              {
                 if (($position3 == false)&&($position2 == true)) 
                    {
                      $prototypes = explode('=', $prototypeLine);
                      $prototypeVarName = trim($prototypes[0]);
                      echo "<li class='prototypeVar'>" . $prototypeVarName . '</li>';
                    }
              }
     }
 }



?>			