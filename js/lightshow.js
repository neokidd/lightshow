
//每页显示case个数
var per_page_num = 4;

//全部Case的分页总数
var info_page_num = 0;
//最新Case的分页总数
var new_page_num = 0;
//最热Case的分页总数
var hot_page_num = 0;

var getLocalstorage = function(key){
	return localStorage.getItem(key);
}

var setLocalstorage = function(key,value){
	localStorage.setItem(key,value);
}

var getId = function(key){
	return document.getElementById(key);
}

var showLoadButton = function(page,page_num){
	if(page >= page_num){
		getId("load_more").style.display = "none";
		getId("alert_move_down").style.display = "block";
	}else{
		getId("load_more").style.display = "block";
		getId("load_more").innerHTML = "上拉加载";
		getId("alert_move_down").style.display = "none";
	}
}

var showcaseInfoForSearch = [];

var getAllShowcaseForSearch = function(){
	$.ajax({
	   	type: "POST",
	   	url: "http://lightappshowcaseserver.duapp.com/caseInfo.php",
	   	async:false,
	   	dataType: "json",
	   	success: function(data){
			for(i=0;i<data.list.length;i++){
				showcaseInfoForSearch.push([data.list[i].name,data.list[i].pinyin,data.list[i].id,data.list[i].link,data.list[i].icon,data.list[i].pic,data.list[i].searchlink]);
				// getId("all_showcase").innerHTML = getId("all_showcase").innerHTML+"<div class='hero-item has-example is-hidden' id='"+data.list[i].id+"'><a href='"+data.list[i].link+"'><p class='example-title'>"+data.list[i].name+"</p><img class='title-icon' src='"+data.list[i].icon+"' /><img class='title-tilt' src='"+data.list[i].pic+"' /></a><a class='gotoSearch' href='"+data.list[i].searchlink+"'>查看搜索展现</a></div>";
			}
	   	}
 	});	  
}


//点击统计
var showcaseClickCount = function(id,link){
	data={
		id: id,
	}

	$.ajax({
	   	type: "POST",
	   	url: "http://lightappshowcaseserver.duapp.com/stats.php",
	   	async:false,
	   	data:data,
	   	dataType: "json",
	   	success: function(data){
	   		// console.log("djflakjl!");
	   	}
	});

	window.location.href= link;
}


//获取showcase列表
var getShowcaseInfo = function(page){

	data = {
		num:per_page_num,
		page:page,
		needtotle:1,
	};

	$.ajax({
	   	type: "POST",
	   	url: "http://lightappshowcaseserver.duapp.com/caseInfo.php",
	   	async:false,
	   	data:data,
	   	dataType: "json",
	   	success: function(data){
			for(i=0;i<data.list.length;i++){
				getId("all_showcase").innerHTML = getId("all_showcase").innerHTML+"<div class='hero-item has-example is-hidden' id='"+data.list[i].id+"'><a href='javascript:;' onclick='showcaseClickCount("+data.list[i].id+",\""+data.list[i].link+"\")'><p class='example-title'>"+data.list[i].name+"</p><img class='title-icon' src='"+data.list[i].icon+"' /><img class='title-tilt' src='"+data.list[i].pic+"' /></a><a class='gotoSearch' href='"+data.list[i].searchlink+"'>查看搜索展现</a></div>";
			}
			info_page_num = data.num;

			var all_showcase = getId("all_showcase");
			var msnry = new Masonry(all_showcase);
			imagesLoaded(all_showcase, function() {
				msnry.layout();

				if(getLocalstorage("current_active_tab")=="all_showcase"){
					showLoadButton(page,info_page_num);
				}

				setLocalstorage("current_page",parseInt(getLocalstorage("current_page"))+1);
			});
			

						
	   	}
 	});	  
}


//获取最新列表
var getNewShowcaseInfo = function(page){
	data = {
		order:"ct",
		num:per_page_num,
		page:page,
		needtotle:1,
	};

	$.ajax({
	   	type: "POST",
	   	// url: "http://172.22.150.253/lightappshowcase/caseInfo.php",
	   	url: "http://lightappshowcaseserver.duapp.com/caseInfo.php",
	   	async:false,
	   	data:data,
	   	dataType: "json",
	   	success: function(data){
			for(i=0;i<data.list.length;i++){
//				showcaseInfo.push([data[i].id,data[i].link,data[i].name,data[i].icon,data[i].pic,data[i].searchlink,data[i].pinyin]);
				getId("new_showcase").innerHTML = getId("new_showcase").innerHTML+"<div class='hero-item has-example is-hidden' id='"+data.list[i].id+"'><a href='javascript:;' onclick='showcaseClickCount("+data.list[i].id+",\""+data.list[i].link+"\")'><p class='example-title'>"+data.list[i].name+"</p><img class='title-icon' src='"+data.list[i].icon+"' /><img class='title-tilt' src='"+data.list[i].pic+"' /></a><a class='gotoSearch' href='"+data.list[i].searchlink+"'>查看搜索展现</a></div>";

				// getId("new_showcase").innerHTML = getId("new_showcase").innerHTML+"<div class='hero-item has-example is-hidden' id='"+data.list[i].id+"'><a href='"+data.list[i].link+"'><p class='example-title'>"+data.list[i].name+"</p><img class='title-icon' src='"+data.list[i].icon+"' /><img class='title-tilt' src='"+data.list[i].pic+"' /></a><a class='gotoSearch' href='"+data.list[i].searchlink+"'>查看搜索展现</a></div>";
			}

			new_page_num = data.num;

			var new_showcase = document.querySelector('#new_showcase');
			var msnry = new Masonry(new_showcase);
			imagesLoaded(new_showcase, function() {
				 msnry.layout();
				 if(getLocalstorage("current_active_tab")=="new_showcase"){
					 showLoadButton(page,new_page_num);
				}
				setLocalstorage("current_new_page",parseInt(getLocalstorage("current_new_page"))+1);
			});

			
	   	}
 	});	  
}

//获取最热
var getHotShowcaseInfo = function(page){

	data = {
		type:1,
		num:per_page_num,
		page:page,
		needtotle:1,
	};

	$.ajax({
	   	type: "POST",
	   	// url: "http://172.22.150.253/lightappshowcase/caseInfo.php",
	   	url: "http://lightappshowcaseserver.duapp.com/caseInfo.php",
	   	async:false,
	   	data:data,
	   	dataType: "json",
	   	success: function(data){
			for(i=0;i<data.list.length;i++){
//				showcaseInfo.push([data[i].id,data[i].link,data[i].name,data[i].icon,data[i].pic,data[i].searchlink,data[i].pinyin]);
				getId("hot_showcase").innerHTML = getId("hot_showcase").innerHTML+"<div class='hero-item has-example is-hidden' id='"+data.list[i].id+"'><a href='javascript:;' onclick='showcaseClickCount("+data.list[i].id+",\""+data.list[i].link+"\")'><p class='example-title'>"+data.list[i].name+"</p><img class='title-icon' src='"+data.list[i].icon+"' /><img class='title-tilt' src='"+data.list[i].pic+"' /></a><a class='gotoSearch' href='"+data.list[i].searchlink+"'>查看搜索展现</a></div>";

				// getId("hot_showcase").innerHTML = getId("hot_showcase").innerHTML+"<div class='hero-item has-example is-hidden' id='"+data.list[i].id+"'><a href='"+data.list[i].link+"'><p class='example-title'>"+data.list[i].name+"</p><img class='title-icon' src='"+data.list[i].icon+"' /><img class='title-tilt' src='"+data.list[i].pic+"' /></a><a class='gotoSearch' href='"+data.list[i].searchlink+"'>查看搜索展现</a></div>";
			}

			hot_page_num = data.num;

			var hot_showcase = document.querySelector('#hot_showcase');
			var msnry = new Masonry(hot_showcase);
			imagesLoaded(hot_showcase, function() {
				msnry.layout();
				if(getLocalstorage("current_active_tab")=="hot_showcase"){
					showLoadButton(page,hot_page_num);
				}
				
				setLocalstorage("current_hot_page",parseInt(getLocalstorage("current_hot_page"))+1);
			});
	   	}
 	});	  
}


var showSettingContainer = function(){

	if(getId("setting_container").style.display == "block"){
		getId("setting_container").style.display = "none";
		getId("setting").src =  "/assets/setting.png";	
	}else{
		getId("setting_container").style.display = "block";
		getId("setting").src =  "/assets/delete.png";
	}
}

//搜索框展现，并调整展现container的位置
var showSearchContainer = function(){

	if(getId("setting_container").style.display == "block"){
		getId("setting_container").style.display = "none";
		getId("setting").src =  "/assets/setting.png";	
	}
	
	if(getId("search_container").style.display == "block"){
		getId("search_container").style.display = "none";	
	}else{
		getId("search_container").style.display = "block";	
	}	
}

//搜索用户输入的应用并跳转到相应的位置
var searchShowCaseInArray = function(caseName){

	getId("search_showcase").innerHTML = "";
    if(caseName){
        var flag = false;
        for(i=0;i<showcaseInfoForSearch.length;i++){
        	for(i=0;i<showcaseInfoForSearch.length;i++){
				if(showcaseInfoForSearch[i][0].indexOf(caseName) != -1 || showcaseInfoForSearch[i][1].indexOf(caseName) != -1){
					getId("search_showcase").innerHTML = getId("search_showcase").innerHTML+"<div class='hero-item has-example is-hidden' id='"+showcaseInfoForSearch[i][2]+"'><a href='"+showcaseInfoForSearch[i][3]+"'><p class='example-title'>"+showcaseInfoForSearch[i][0]+"</p><img class='title-icon' src='"+showcaseInfoForSearch[i][4]+"' /><img class='title-tilt' src='"+showcaseInfoForSearch[i][5]+"' /></a><a class='gotoSearch' href='"+showcaseInfoForSearch[i][6]+"'>查看搜索展现</a></div>";
					flag = true;
				}
			}
			var search_showcase = document.querySelector('#search_showcase');
			imagesLoaded(search_showcase, function() {
				msnry = new Masonry(search_showcase);
			});   
        } 
        if(!flag){
            alert("没有找到相应应用！");
        }     
    }else{
    	alert("请输入应用名！");
    }
                              
};

//对电子邮件的验证
var isEmail = function(){
	var userEmail = getId("user_email").value;
	var eMailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

	if(!userEmail){
		getId("error_alert").style.display = "block";
		getId("error_alert").innerHTML = "请您输入Email！";	
		// getId("user_email").focus();
		return false;
	}else{
		if(!eMailReg.test(userEmail)){
			getId("error_alert").style.display = "block";
			getId("error_alert").innerHTML = "请输入有效的Email！";
			// getId("user_email").focus();
			return false;
		}else{
			getId("error_alert").style.display = "none";
			return true;
		}
	}	

}

var contentIsEmpty = function(){
	var content = getId("feedback_content").value;

	if(!content){
		getId("error_alert").style.display = "block";
		getId("error_alert").innerHTML = "说点什么吧！";	
		// getId("user_email").focus();
		return false;
	}else{
		getId("error_alert").style.display = "none";
		return true;
	}
}

var send_feedback = function(){
	var userEmail = getId("user_email").value;
	var content = getId("feedback_content").value;

	data = {
		email:userEmail,
		content:content
	};
	if(isEmail() && contentIsEmpty()){
		getId("error_alert").style.display = "none";

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


//tab切换响应
function tabClick(){
    if($(this).hasClass('activeTab')) 
            return;
    $('.hd ul li').removeClass('activeTab');

    $(this).addClass('activeTab');
    var tabId = $(this).attr('tabId');

    getId(getLocalstorage("current_active_tab")).style.display = "none";

    if(tabId == "new_showcase"){
    	if(window.localStorage){
			setLocalstorage("current_active_tab","new_showcase");
		}

		var new_showcase = document.querySelector('#new_showcase');
		var msnry = new Masonry(new_showcase);
		imagesLoaded(new_showcase, function() {
			msnry.layout();
		});

		showLoadButton(getLocalstorage("current_new_page"),new_page_num);

		// getId("body").srcollTop = "5px";

    }else if(tabId == "hot_showcase"){
    	if(window.localStorage){
			setLocalstorage("current_active_tab","hot_showcase");
		}
		var hot_showcase = document.querySelector('#hot_showcase');
		var msnry = new Masonry(hot_showcase);
		imagesLoaded(hot_showcase, function() {
			msnry.layout();
		});

		showLoadButton(getLocalstorage("current_hot_page"),hot_page_num);
    }else if(tabId == "all_showcase"){
    	if(window.localStorage){
			setLocalstorage("current_active_tab","all_showcase");
		}

		var all_showcase = document.querySelector('#all_showcase');
		var msnry = new Masonry(all_showcase);
		imagesLoaded(all_showcase, function() {
			msnry.layout();
		});
		showLoadButton(getLocalstorage("current_page"),info_page_num);
    }else{
    	if(window.localStorage){
			setLocalstorage("current_active_tab","search_container");
		}

		getId("search_showcase").innerHTML = "";
		getId("gover_search_key").value = "";
		getId("load_more").style.display = "none";
		getId("alert_move_down").style.display = "none";
    }

    getId(tabId).style.display = "block";

};

$(document).ready(function(){
    $('.hd ul li').click(tabClick);
});


var loadMoreCase = function(){

	if(getLocalstorage("current_active_tab") == "all_showcase"){
		current_page = getLocalstorage("current_page");
		page_num = info_page_num;
	}else if(getLocalstorage("current_active_tab") == "new_showcase"){
		current_page = getLocalstorage("current_new_page");
		page_num = new_page_num;
	}else{
		current_page = getLocalstorage("current_hot_page");
		page_num = hot_page_num;
	}

	if(current_page < page_num || current_page == page_num){
		if(getLocalstorage("current_active_tab") == "all_showcase"){
			getShowcaseInfo(parseInt(current_page));
			
		}else if(getLocalstorage("current_active_tab") == "new_showcase"){
			getNewShowcaseInfo(parseInt(current_page));
			
		}else{
			getHotShowcaseInfo(parseInt(current_page));
			
		}
	}
}

//上拉加载
$(document).ready(function(){
    var range = 5;             //距下边界长度/单位px
    $(window).scroll(function(){
        var totalHeight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
        // console.log($(document).height() + "-----" +totalHeight);
        if(($(document).height()-range) <= totalHeight){
           loadMoreCase();
        }
    });
});



