<?php
    $file = "../g_variables/liucaiyun.txt";
	$gnames=@file_get_contents($file);
	$names=preg_split("/,/", $gnames);
	foreach($names as $name)
	{
	if($name!=""){
			echo"<li>" . $name. "<div id='x'>x</div>" . "</li>" ;
		
	}
	}
?>
