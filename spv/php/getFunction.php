<?php
	/*
	 * {
	 * 	"class1":{"class1func1":"details1"，"class1funct2":"details2"}
	 * 	"class2":{"class2func1":"details1","class2funct2":"details2"}
	 * 	}
	 * object {} 			array []
	 * property "perpertyname":"perpertyvale" ,seperated by ",";
	 */
	
//given the filename fetch an array contains all the functions
$functionName="";


function getJsonObj($classname){
		$detail_file="../jsonFunction/functionDetails.json";
		$jsonString=@file_get_contents($detail_file);
		if($jsonString!=null){
			$jsonArray=json_decode($jsonString);//string to obj
			
		}
		return $jsonArray;
}
    
function sort_functions_from_sourcecode($classname){
$functions=new stdClass();
		$fileName="../MainMenu/$classname.js";
 		//$lines = file($fileName);
		if(!file_exists("$fileName"))
  {die("Class not found! Be sure to input correct class name!");}
else
  {$lines = file($fileName);}
		foreach ($lines as $line_num => $line) 
 		{ 
    		$position1 = strpos($line, 'function(');
    		$position2 = strpos($line, 'this.');
          		if (($position1 == true)&&($position2 == true))
         		{   
            		$all_functions = explode('=', $line);
            		$function = trim($all_functions[0]);
            		$functionNames = explode('.', $function);
            		$functionName = $functionNames[1];
					$functionName=$functionName.'()';
					$functions->$functionName="enter details here";
         		}   
 		}
		
 		$summeryObj=getJsonObj($classname);
		$summeryObj->$classname=$functions;
		$newSummeryString=json_encode($summeryObj);
		
		
		$detail_file="../jsonFunction/functionDetails.json";
		file_put_contents($detail_file, $newSummeryString);
		//return get_functions($classname);
 	} 

function get_functions($classname){
$functions=new stdClass();
		$summery=getJsonObj($classname);
		if($summery==null){
			sort_functions_from_sourcecode($classname);
			$summery=getJsonObj($classname);
		}
		$functions=$summery->$classname;
		if($functions==null){
			sort_functions_from_sourcecode($classname);
			$summery=getJsonObj($classname);
					$functions=$summery->$classname;
			
		}
		return $functions;//object	
}


 $classname=$_GET["classname"];
 if(isset($_GET["functionName"])){
 $functionName=$_GET["functionName"];
 }
 if($classname!=null){
 	 $functions=get_functions($classname);	
 }
 if($functions==null){
 	die("file doesn't exist!");
 }
 foreach($functions as $property => $property_value)
 {	 
	 if($functionName==""){
 	 echo "<li class='function'>$property</li>";
 }	 else {
 	if($functionName==$property){
 	 echo "$property_value";
	 }
 	}
 }
  
?>			