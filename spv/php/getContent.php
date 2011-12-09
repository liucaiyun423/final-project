

<?php


$fileName = $_GET['fname'];

$l = 1;

//$fh = fopen("../$fileName", "r");

if(!file_exists("../$fileName"))
  {die("Class not found! Be sure to input correct class name!");}
else
  {$fh = fopen("../$fileName", "r");}
while(true)
  {
	$line = fgets($fh);
	if($line == null)break;
//	echo $line; echo'<br/>';
//	echo strip_tags($line, '<script>');echo'<br/>';
 //  echo strip_tags($line);
 echo $l++; echo '&nbsp';
 echo htmlentities($line); echo'<br/>';
  }


?>



