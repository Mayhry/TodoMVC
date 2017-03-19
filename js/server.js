/**
 * Created by Administrator on 2016/12/1 0001.
 */
(function(angular){
	var app = angular.module("myapp.service",[]);

	app.service("$myServer",["$window","$http",function($window,$http){
		var tempData = $window.localStorage;

		var str = tempData.getItem("myData");
		var data = JSON.parse(str || "[]");

		//获取数据
		this.getData = function(){
			return data;
		}
		var newId = this.getData().length==0?-1:this.getData()[this.getData().length-1].id;

		//删除数据
		this.delete = function(id){
			for(var i=0;i<this.getData().length;i++){
				if(this.getData()[i].id == id){
					this.getData().splice(i,1);
					tempData.setItem("myData",JSON.stringify(this.getData()));
					return;
				}
			}
		}

		//添加数据
		this.add = function(task,newId){
			if(!task){
				return;
			}
			var obj = {id:++newId,content:task,completed:false};
			this.getData().push(obj);
			tempData.setItem("myData",JSON.stringify(this.getData()));
		}

		//左下角计数
		this.countNum = function(){
			var len = this.getData().length;
			angular.forEach(this.getData(),function(val,i){
				if(val.completed){
					len--;
				}
			})
			return len;
		}

		//刷新本地数据
		this.refreshLocal = function(data){
			tempData.setItem("myData",JSON.stringify(data));
		}


	}])



})(angular)







