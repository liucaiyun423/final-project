<?php
//get the global variable name to be removed;
  $filename="liucaiyun.txt";
  $path="../g_variables/";
  $file = $path.$filename;	
if (isset($_GET["gField"])){
  $data = $_GET["gField"];
  $data=$data.",";
}
// read all global variables from file,remove;
	$gnames=@file_get_contents($file);
	$gnames=preg_replace("/$data/", "", $gnames);
	file_put_contents($file, $gnames);
?>