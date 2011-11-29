

<?php


$fileName = $_GET['fname'];
$l = 1;
//echo $fileName;

//$fh = fopen("../files/$fileName", "r");

$fh = fopen("../$fileName", "r");
while(true)
{
	$line = fgets($fh);
	if($line == null)break;
//	echo $line; echo'<br/>';
//	echo strip_tags($line, '<script>');echo'<br/>';
 //  echo strip_tags($line);
 echo $l++; echo '&nbsp';echo '&nbsp';echo '&nbsp';echo '&nbsp';
 echo htmlentities($line); echo'<br/>';
}



?>



