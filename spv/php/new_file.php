<?php
phpinfo();
$contentstring=file_get_contents('../jsonFiles/test.json');
$obj=json_decode($contentstring);
$classname= $obj->class2;//if $class_details=$obj->classname not null,search functions in source code;
	foreach ($classname as $key => $value) {
			foreach ($value as $k => $v) {
						echo "$k is $v<br/>";//print out all the functions and associated details;
			}
}
	
	
	//shows how to add an element into an array ,then converted to jsonstring for storation;
$summery=array();
$person = array ('firstname' => 'Richard','lastname' => 'Castera');
$person['gender'] = 'female';
$p = (object) $person;
$summery["person1"]=$p;
$s=(object)$summery;
$jsonString=json_encode($summery);
echo "jsonstring: $jsonString";
//echo "$p->firstname </br>"; // Will print 'Richard'	
//echo "$p->lastname  </br>";

var_dump($summery);
?>