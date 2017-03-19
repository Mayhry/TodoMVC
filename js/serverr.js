/**
 * Created by Administrator on 2016/12/1 0001.
 */

"use strict";

var http = require("http");

var url = require("url");

var server = http.createServer(function(request,response){
	var p = url.parse(request.url,true).query;
	response.writeHead(200, {
		"Content-Type": "text/plain; charset=utf-8",
		"Access-Control-Allow-Origin": "*"
	});
	var data=[
		{id:0,content:"吃饭",completed:false},
		{id:1,content:"睡觉",completed:true},
		{id:2,content:"打豆豆",completed:false},
		{id:3,content:"学习",completed:true}
	];
	var str = p.callback + "("+JSON.stringify(data)+")";

	response.end();

})
server.listen("3000","127.0.0.1",function(error){
	console.log("http://127.0.0.1:3000,已经启动.."+error);
})

