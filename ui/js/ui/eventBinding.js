$(document).ready(function() {
        $('#wrapper').scrollTo($('#box1'), 300);
        var zindex = 1;
		$('a.link').first().addClass('selected');
	    $('a.link').click(function () { 
		$('#wrapper').scrollTo($(this).attr('href'), 500);
	//	$('#box2').append('<embed width="100%" height="100%" src="Znode/index.html"/>');
	    $('a.link').removeClass('selected');  
		$(this).addClass('selected');
		return false;
	    });
		
		$('#fileList').fileTree({
			      root: '/files/',
			      script: 'php/jqueryFileTree.php',
			      expandSpeed: 500,
			      collapseSpeed: 500,
			      multiFolder: true
			    }, function(fileName) {
			       // alert(fileName);
					$.get('php/getContent.php?fname='+fileName, function(data) {
		$('#filePane').append('<div class="inner"/>');
	    var n = $(".inner").last();
	    n.append('<img src="images/deleteButton.png"/>');
	    n.append('<p style="background-color:#db0;color:#fff;text-align:center;border-bottom: 1px solid #a80;">'+fileName+"</p>");
		n.append('<div class="data" style="padding:0.8em;" >'+data+'</div>');
		$(".inner").first().css({"left":"240"});
		n.resizable().draggable();
		n.mouseenter(function(){n.css("z-index", zindex++);});
		});
	    });	
		
		$('#openFiles').click(function () { 
		//  fetchFiles();
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
		});
		
		
		$('#searchForm').submit(function(event) {
			event.preventDefault();
			highLight($('#searchElement').val());
		});//prevent default submit event to refresh the whole page;
		
		$('#filePane .inner img').live("click", function(event){
			$(this).parent().remove();
		});  
		 
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
		
	     function fetchFiles(){
  	        var fileList =  $("#files");
              fileList.load("php/getFiles.php");
			 }
			 
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
	
	});
  