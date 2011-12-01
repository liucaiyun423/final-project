$(function(){
  
  var graph = new NodeGraph();
  
  // consider moving to NodeGraph
  $("#canvas").mouseup(function(e){
       var children = $(e.target).children();
       if (children.length > 0){
         var type = children[0].tagName;
         if (type == "desc" || type == "SPAN"){
           graph.addNodeAtMouse();
         }
       }
  });
  
  // ui code
  var openWin = $("#openWin");
  openWin.hide();
 
  $(".btn").mouseenter(function(){
    $(this).animate({"backgroundColor" : "white"}, 200);
  }).mouseleave(function(){
    $(this).animate({"backgroundColor" : "#efefef"});
  });
  
  $("#inheritance").click(function(){
  	//graph.type="inheritance";
  	graph.changeType("inheritance");
  	//alert("changed to:"+graph.type);
  });
  $("#composition").click(function(){
  	//graph.type="composition";
  	graph.changeType("composition");
  	//alert("changed to:"+graph.type);
  });
  
  $("#clear").click(function(){
    graph.clearAll();
  });
   
  $("#save").click(saveFile);
  
  function saveFile(){  
    $.post("php/save.php", {data:graph.toJSON(), name:'GameObject'}, function(data){
      alert("Your file was saved.");
    });
  }
  
  $("#canvas").mousedown(function(){
    openWin.fadeOut();
  });
  
  $("#nameForm").submit(function(e){
    e.preventDefault();
  //  saveFile();
  });
  
  $.getJSON("jsonFiles/" + 'GameObject' + ".json", {n:Math.random()}, function(data){
       graph.fromJSON(data);
	   filename.val(name);
	   });


  
});