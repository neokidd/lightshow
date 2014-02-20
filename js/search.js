
//图片onload后重新计算layout
$(function(){
    var imgs = $("img");
    for(var i=0,len=imgs.length;i<len;i++){
        var container = document.querySelector('#container');
        var msnry = Masonry.data( container );
        var img_length = imgs.length - 1;
        if(i==len-1){
        	imgs[i].onload = function(){
        		msnry.layout();	           
        	}	
        }     
    }
});

var showcaseInfo = [];

//获取showcase列表
var getShowcaseInfo = function(){
	$.ajax({
	   	type: "POST",
	   	url: "http://lightappshowcaseserver.duapp.com/caseInfo.php",
	   	async:false,
	   	dataType: "json",
	   	success: function(data){
			for(i=0;i<data.length;i++){
				showcaseInfo.push([data[i].id,data[i].link,data[i].name,data[i].icon,data[i].pic,data[i].searchlink,data[i].pinyin]);
			}	
	   	}
 	});	  
}


var showSettingContainer = function(){

	if(document.getElementById("search_container").style.display == "block"){
		document.getElementById("search_container").style.display = "none";
        document.getElementById("top_wrapper").style.marginTop= "50px";		
	}

	if(document.getElementById("setting_container").style.display == "block"){
		document.getElementById("setting_container").style.display = "none";	
	}else{
		document.getElementById("setting_container").style.display = "block";
	}
}

//搜索框展现，并调整展现container的位置
var showSearchContainer = function(){

	document.body.scrollTop = "0px";

	if(document.getElementById("setting_container").style.display == "block"){
		document.getElementById("setting_container").style.display = "none";	
	}
	
	if(document.getElementById("search_container").style.display == "block"){
		document.getElementById("search_container").style.display = "none";
        document.getElementById("top_wrapper").style.marginTop= "50px";		
	}else{
		document.getElementById("search_container").style.display = "block";
		document.getElementById("top_wrapper").style.marginTop= "20px";	
	}	
}

//搜索用户输入的应用并跳转到相应的位置
var searchShowCaseInArray = function(caseName){
    if(caseName){
        var flag = false;
        for(i=0;i<showcaseInfo.length;i++){
            if(caseName == showcaseInfo[i][2]){ 
            	console.log("one:"+ document.body.scrollTop);              
                window.location.href = window.location.pathname+"#"+showcaseInfo[i][0];
                document.getElementById("search_container").style.display = "none";
                document.getElementById("top_wrapper").style.marginTop= "50px";
                console.log("two:"+ document.body.scrollTop); 
                console.log("there:"+ (document.body.scrollTop-80)); 

                // document.body.scrollTop = (document.body.scrollTop-80)+"px";
                flag = true;
                break; 
            }    
        } 
        if(!flag){
            alert("Sorry！没有找到相应应用！");
        }     
    }else{
    	alert("请输入应用名！");
    }
                              
};


