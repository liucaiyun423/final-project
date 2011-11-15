<?php

// list all files in the files directory
foreach(glob("../files/*") as $filename){

  
  $name = preg_split("/\//",$filename);
  

  echo "<li>" . "<a href='#'>" .  $name[2] . "</a>" . "</li>";
}
