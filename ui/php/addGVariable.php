<?php

if (isset($_GET["gField"])){
  $filename="liucaiyun.txt";
  $path="../g_variables/";
  $file = $path.$filename;	 
  $data = $_GET["gField"];
  $data=$data.",";
  file_put_contents($file, $data,FILE_APPEND);
  fclose($file);
  echo $data;
}
?>