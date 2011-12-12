<?php
function getJsonObj($classname){
		$detail_file="../jsonFunction/functionDetails.json";
		$jsonString=@file_get_contents($detail_file);
		if($jsonString!=null){
			$jsonArray=json_decode($jsonString);//string to obj
			
		}
		return $jsonArray;
}
function add_detail($classname,$functionname,$detail){
			$jsonObj=getJsonObj($classname);
			
			$classObj=$jsonObj->$classname;
			
			$classObj->$functionname=$detail;
			
			$jsonObj->$classname=$classObj;
			$newSummeryString=json_encode($jsonObj);
			$detail_file="../jsonFunction/functionDetails.json";
			file_put_contents($detail_file, $newSummeryString);	
				
}
$classname=$_POST["classname"];
$functionName=$_POST["functionName"];
$details=$_POST['details'];
add_detail($classname,$functionName,$details);
?>
