$(document).ready(function() {

        var zindex = 1;
		$('a.link').first().addClass('selected');
	    $('a.link').click(function () { 
		$('#wrapper').scrollTo($(this).attr('href'), 500);
	    $('a.link').removeClass('selected');  
		$(this).addClass('selected');
		return false;
	    });
		
		$('#fileList').fileTree({
			      root: '/MainMenu/',
			      script: 'php/jqueryFileTree.php',
			      expandSpeed: 500,
			      collapseSpeed: 500,
			      multiFolder: true
			    }, function(fileName) {
					$.get('php/getContent.php?fname='+fileName, function(data) {
		$('#filePane').append('<div class="inner"/>');
	    var n = $(".inner").last();
		
	    n.append('<img src="images/deleteButton.png"/>');
	    n.append('<p style="background-color:#db0;color:#fff;text-align:center;border-bottom: 1px solid #a80;">'+fileName+"</p>");
		n.append('<div class="data" style="padding:0.8em;" >'+data+'</div>');
		n.lionbars('dark', false, false, false);//scrollbar
		$(".inner").first().css({"left":"240"});
		n.draggable();
		n.mouseenter(function(){n.css("z-index", zindex++);});
		
		});
	    });	
		
		$('#openFiles').click(function () { 
		$('#openGWin').fadeOut();
		$('#openFilesWin').fadeIn();
		});
		
		$('#openGVariables').click(function () { 
    		$('#openFilesWin').fadeOut();
			$('#openGWin').fadeIn();
			fetchGVariables();
		});
		
		$.ajaxSetup({cache:false});

		$('#gForm').submit(function(event){
			event.preventDefault();
			var newG=$("#gField").val();
			if (newG == "" || $("#gField").length == 0) {
				$('.data').removeHighlight();
			}
			else {
				$.get("php/addGVariable.php?gField=" + newG, function(){
					$('#gVariables').append("<li>" + newG + "<div id='x'>x</div>" + "</li>");
				});}
		});
		
		$('#filePane, #upload').mousedown(function () { 
		$('#openFilesWin').fadeOut();
		$('#openGWin').fadeOut();
		});
		
		$('#upload').click(function () { 
		$('#displaybox').show();
		}); 
		
		$('#closeOverlay').click(function () { 
		$('#displaybox').hide();
		   location.reload();
		});
		
		
		$('#searchForm').submit(function(event) {
			event.preventDefault();
			highLight($('#searchElement').val());
		});//prevent default submit event to refresh the whole page;
		
		$(' .inheritanceWin img, .compositionWin img, .functionWin img').live("click", function(event){
			$(this).parent().remove();
		}); 
		
		$('#filePane .inner img').live("click", function(event){
			$(this).parent().parent().remove();
		});   
		
		$('.highLightWrapper img').live("click", function(event){
			$(this).parent().remove();
		});
		
		//znode sticker remove 
		$('#gVariables li').live("click", function(event){ 
		if (event.target.id != 'x') {
			highLight($(this).text().substring(0, ($(this).text().length - 1)));
			
		}
		});  
		
		$('#gVariables li #x').live("click", function(event){ 
			var target=$(this).parent();
			var gField=target.text().replace("x","");
				$.get("php/removeGVariable.php?gField="+gField,function(){
					target.remove();
				})
		});
				
		
		$('#submit').live("click", function(event){
	          event.preventDefault();
		      ajaxFileUpload();
		});
		
			 
		function fetchGVariables(){
			var gList =  $("#gVariables");
   			gList.html("<div>loading...<\/div>");
    		gList.load("php/getGVariables.php").css("#gVariables a");
		}	 
   
        function ajaxFileUpload()
	{ 
		$.ajaxFileUpload
		(
			{
				url:'php/doajaxfileupload.php',
				secureuri:false,
				fileElementId:'fileToUpload',
				dataType: 'json',
				data:{name:'logan', id:'id'},
				success: function (data, status)
				{
					if(typeof(data.error) != 'undefined')
					{
						if(data.error != '')
						{alert(data.error);}
						else
						{alert(data.msg);}
					}
				},
				error: function (data, status, e)
				{alert(e);}
			}
		)
		return false;

	}
	
	function highLight(element)
	{
		$('.data').removeHighlight();
	    if(($('.data').length>0)&&(element!=''))
		$('.data').highlight(element);
		else $('.data').removeHighlight();
	}
	
	/**box2 znode event binding **/
	
	/**for inheritance**/ 
	$(".node .i").live("click", function(){
	 $('.node').removeClass("nodeSelected"); 	
	$(this).parent().addClass("nodeSelected");
	$('.node').find('.highLightWrapper').remove();  	
	$(".compositionWin, .inheritanceWin, .functionWin").remove();
	$('#canvas').append("<div class='inheritanceWin'/>");
	var inheritanceWin = $(".inheritanceWin").last();
	inheritanceWin.css({ 'background-color':'#FAF046',
	                     'font-size':'11px','position' : 'absolute',
                         'top' : '8px', 'left' :' 6px','width' : '542px',
                         'height' : '550px',
                         '-webkit-box-shadow': '3px 8px 10px rgba(0, 0, 0, 0.5)',
                         'z-index' : '6000',
                         });
    inheritanceWin.append('<img src="images/deleteButton.png"/>');				 
	var className = $.trim($(this).parent().find(".title").val());	
	$.get('php/getPrototype.php?fname=../MainMenu/'+className+'.js', function(data) {
		$('.node .title' ).each(function(index) {
			if ($(this).val() == $(data).html()) {
				var parentNode = $(this).parent();
				parentNode.append("<div class='highLightWrapper'/>");
				var highLightWrapper = parentNode.find('.highLightWrapper');
				    highLightWrapper.css({
						//  'display':'none',
						  'opacity':'0','left':-110+parentNode.width()/2,
	                      'font-size':'10px',
	                      'position' : 'absolute',
	                      'height':'100px','width':'220px',
	                      'z-index':'6000','overflow':'hidden',
                          'background':'transparent url(images/black_arrow.png)',});
				    highLightWrapper.append('<img src="images/deleteButton.png"/>');
	                highLightWrapper.append('<ul id="highLightList"/>');
				parentNode.find('#highLightList').html(data);
				parentNode.find('#highLightList').lionbars('light', false, false, false);//scrollbar
				
				 highLightWrapper.animate({
                         top: '-=97',
						 opacity: '+=1',
                        }, 1500, function() {});
			}
	     });
     });	// get functions and vars in superclasses need to be highlighted. 				 
	inheritanceWin.append("<div class='className' style='background-color:#db0;color:#fff;text-align:center;border-bottom: 1px solid #a80;'>"+className+"</div>");
	$.get('php/getContent.php?fname=/MainMenu/'+className+'.js', function(data) {
	inheritanceWin.append('<div class="sourceCode" style="height:515px;width:530px;padding:0.8em;" >'+data+'</div>');

		$("#highLightList .prototypeFunction").each(function(){
        $('.sourceCode').last().highlight($(this).text().substring(0, ($(this).text().length - 1)));
        });
	    $("#highLightList .prototypeVar").each(function(){
        $('.sourceCode').last().highlight($(this).text());
        });
		$('.sourceCode').last().lionbars('dark', false, false, false);//scrollbar
	});
	inheritanceWin.draggable();
	
 });
 
 /**for composition**/ 
	$(".node .c").live("click", function(){
	var parentNode = $(this).parent();
	$('.node').removeClass("nodeSelected"); 	
	$(this).parent().addClass("nodeSelected");
	$('.node').find('.highLightWrapper').remove();  	
	$(".compositionWin, .inheritanceWin, .functionWin").remove();
	$('#canvas').append("<div class='compositionWin'/>");
	var compositionWin = $(".compositionWin").last();
	compositionWin.css({ 'background-color':'#FAF046',
	                     'font-size':'11px','position' : 'absolute',
                         'top' : '8px', 'left' :' 6px','width' : '542px',
                         'height' : '550px',
                         '-webkit-box-shadow': '3px 8px 10px rgba(0, 0, 0, 0.5)',
                         'z-index' : '6000',
                         });
    compositionWin.append('<img src="images/deleteButton.png"/>');				 
	var className = $.trim($(this).parent().find(".title").val());
	$.get('php/getComposition.php?fname=../MainMenu/'+className+'.js', function(data) {
		parentNode.append("<div class='highLightWrapper'/>");
		var highLightWrapper = parentNode.find('.highLightWrapper');
		highLightWrapper.css({'display':'none'});
		highLightWrapper.append('<ul id="highLightList"/>');
		parentNode.find('#highLightList').html(data);
		
     });
		
	compositionWin.append("<div class='className' style='background-color:#db0;color:#fff;text-align:center;border-bottom: 1px solid #a80;'>"+className+"</div>");
	$.get('php/getContent.php?fname=/MainMenu/'+className+'.js', function(data) {
	compositionWin.append('<div class="sourceCode" style="height:515px;width:530px;padding:0.8em;" >'+data+'</div>');

	    $("#highLightList .composition").each(function(){
        $('.sourceCode').last().highlight($(this).text());
        });
		$('.sourceCode').last().lionbars('dark', false, false, false);//scrollbar
	});
	compositionWin.draggable();
  });
  
  
  /**for function**/
 $(".node .f").live("click", function(){
 	$('.compositionWin, .inheritanceWin, .functionWin').remove();
 	$('#canvas').append("<div class='functionWin'/>");
	var functionWin = $(".functionWin").last();
	functionWin.css({ 'font-size':'12px',
                      'position' : 'absolute',
                      'top' : '20px','left' : '12px',
                      'width' : '250px',
                      'height' : '420px',
                      'background-color' : '#dcdcdc',
                      'z-index' : '6000',
                      '-webkit-box-shadow':'5px 6px 5px #888',
                       });
	functionWin.append('<img src="images/deleteButton.png"/>');				   
	var className = $.trim($(this).parent().find(".title").val());
	functionWin.append("<div class='className' style='font-size:16px;font-style:italic;margin:10px;'>"+className+"</div>");				   
	$.get('php/getFunction.php?classname='+className, function(data) {
		functionWin.append('<div id="functionList" >'+data+'</div>');
		$('.function:first-child').addClass("functionSelected");
		console.log($('.function:first-child'));
		var functionName=$('.functionSelected').text();
		//alert("functionName"+functionName);
		$.get("php/getFunction.php?functionName="+functionName+"&classname="+$(".className").text(),function(data){
		//to do 
		$("textarea.functionDetails").html(data);
	})
		});
		
	functionWin.append("<textarea class='functionDetails' spellcheck='false'/>");
	functionWin.append("<input style ='position : absolute;top : 390px;left:20px' type='submit' value='Submit' id='submitFunction'/>");
	functionWin.append("<input style ='position : absolute;top : 390px;right:20px' type='button' value='Close' id='closefunctionWin'/>");	
 	
 	
 	}); 
 	
 	$('.function').live("click", function(event){
		$('.function').removeClass('functionSelected');
		$(this).addClass('functionSelected');
		//alert($(this).text());
		$.get("php/getFunction.php?functionName="+$(this).text()+"&classname="+$(".className").text(),function(){
			//put the details in the textarea;
			$("textarea.functionDetails").html(data);
		});
		}); 	
		
 	$("input#submitFunction").live("click",function(event){
 		event.preventDefault();
 		$.post("php/updateDetails.php",{classname:$("div.className").text(),functionName:$("li.function.functionSelected").text(),details:$("textarea.functionDetails").val()},function(){
 		alert("updated successfully");
 		});
 	});
	
});
  