<?php

// list all files in the files directory
foreach(glob("../files/*") as $filename){

  
  $name = preg_split("/\//",$filename);
  
 // $n = preg_split('/\./', $name[2], -1 , PREG_SPLIT_NO_EMPTY);

//  echo "<li>" . "<a href='#'>" .  $n[0] . "</a>" . "</li>"; //this will not show file extension name
  echo "<li>" . "<a href='$name[2]'>" .  $name[2] . "</a>" . "</li>";//this will show file extension name
}
