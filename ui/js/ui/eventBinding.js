$(document).ready(function() {

	    $('a.link').click(function () {  
		$('article').scrollTo($(this).attr('href'), 400);
		$('#box2').append('<embed width="100%" height="100%" src="Znode/index.html"/>');
	    $('a.link').removeClass('selected');  
		$(this).addClass('selected');
		return false;
	    });  
		
		$('#open').click(function () { 
		  fetchFiles();
		$('#openWin').fadeIn();
		});
		$('#fileContent, #upload').click(function () { 
		$('#openWin').fadeOut();
		});
		$('#upload').click(function () { 
		$('#displaybox').show();
		}); 
		$('#closeOverlay').click(function () { 
		$('#displaybox').hide();
		}); 
		$('#fileContent .inner img').live("click", function(event){ 
		$(this).parent().remove();
		});  
		
        $("#files li").live("click", function(event){
		event.preventDefault();
		var fileName=$(this).children().attr('href');
		$.get('php/getContent.php?fname='+fileName, function(data) {
		$('#fileContent').append('<div class=inner/>');
	    var n = $(".inner").last();
	    n.append('<img src="images/db.png"/>');
	    n.append('<p style="background-color:#db0;color:#fff;text-align:center;border-bottom: 1px solid #a80;">'+fileName+"</p>");
		n.append('<div style="padding:0.8em;" >'+data+'</div>');
		$(".inner").first().css({"left":"240"});
		n.resizable();
		n.draggable();
		});
		}); 
		
		$('#submit').live("click", function(event){
	          event.preventDefault();
		      ajaxFileUpload();
		});
		
	     function fetchFiles(){
  	        var fileList =  $("#files");
              fileList.load("php/getFiles.php");
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
	
	});
  