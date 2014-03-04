
var showcaseInfo = [];

// showcaseInfo.push(["1","http://zhilianzhaopin.duapp.com","智联招聘","assets/zhilianzhaoping_logo.png","assets/zhilianzhaopin.jpg","http://zhilianzhaopin.duapp.com","zhilianzhaopin"]);
// showcaseInfo.push(["2","http://datarecovery.duapp.com","联想3C服务","assets/lianxiang3c_logo.png","assets/lianxiang3c.jpg","http://datarecovery.duapp.com","lianxiang3cfuwu"]);
// showcaseInfo.push(["2","http://datarecovery.duapp.com","联想3C服务","assets/lianxiang3c_logo.png","assets/lianxiang3c.jpg","http://datarecovery.duapp.com","lianxiang3cfuwu"]);
// showcaseInfo.push(["2","http://datarecovery.duapp.com","联想3C服务","assets/lianxiang3c_logo.png","assets/lianxiang3c.jpg","http://datarecovery.duapp.com","lianxiang3cfuwu"]);

//获取showcase列表
var getShowcaseInfo = function(){
	$.ajax({
	   	type: "POST",
	   	url: "http://lightappshowcaseserver.duapp.com/caseInfo.php",
	   	async:false,
	   	dataType: "json",
	   	success: function(data){
	  //  		showcaseInfo.push("1","http://zhilianzhaopin.duapp.com","智联招聘","assets/zhilianzhaoping_logo.png","assets/zhilianzhaopin.jpg","http://zhilianzhaopin.duapp.com","zhilianzhaopin");
			// showcaseInfo.push("2","http://datarecovery.duapp.com","联想3C服务","assets/lianxiang3c_logo.png","assets/liangxiang3c.jpg","http://datarecovery.duapp.com","lianxiang3cfuwu");
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
                window.location.href = window.location.pathname+"#"+showcaseInfo[i][0];
                document.getElementById("search_container").style.display = "none";
                document.getElementById("top_wrapper").style.marginTop= "50px";

                document.body.scrollTop = (document.body.scrollTop-90);
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

window.onload = function(){
	var tid = $(location.hash.toString());
	if(tid.length){
		setTimeout(function(){
			// console.log(tid.position().top);
			$("body").scrollTop(tid.position().top||0);
		},600);
		
	}	
}

//对电子邮件的验证
var isEmail = function(){
	var userEmail = document.getElementById("user_email").value;
	var eMailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

	if(!userEmail){
		document.getElementById("error_alert").style.display = "block";
		document.getElementById("error_alert").innerHTML = "请您输入Email！";	
		// document.getElementById("user_email").focus();
		return false;
	}else{
		if(!eMailReg.test(userEmail)){
			document.getElementById("error_alert").style.display = "block";
			document.getElementById("error_alert").innerHTML = "请输入有效的Email！";
			// document.getElementById("user_email").focus();
			return false;
		}else{
			document.getElementById("error_alert").style.display = "none";
			return true;
		}
	}	

}

var contentIsEmpty = function(){
	var content = document.getElementById("feedback_content").value;

	if(!content){
		document.getElementById("error_alert").style.display = "block";
		document.getElementById("error_alert").innerHTML = "说点什么吧！";	
		// document.getElementById("user_email").focus();
		return false;
	}else{
		document.getElementById("error_alert").style.display = "none";
		return true;
	}
}

var send_feedback = function(){
	var userEmail = document.getElementById("user_email").value;
	var content = document.getElementById("feedback_content").value;

	data = {
		email:userEmail,
		content:content
	};
	if(isEmail() && contentIsEmpty()){
		document.getElementById("error_alert").style.display = "none";

		$.ajax({
		   	type: "POST",
		   	url: "http://lightappshowcaseserver.duapp.com/submitComment.php",
		   	data:data,
		   	async:false,
		   	dataType: "json",
		   	success: function(data){
				if(data.res){
					window.location.href = "/index.html";
				}else{
					alert(data.msg);
				}	
		   	}
 		});
	}
		
}

