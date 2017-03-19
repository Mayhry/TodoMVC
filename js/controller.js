/**
 * Created by Jasy_He on 2016/12/20 09：23.
 */
(function(angular){

	var app=angular.module("myapp.controller",["myapp.service"]);

	app.controller("testController",["$scope","$location","$myServer",function($scope,$location,$myServer){

		//监测url
		$scope.newUrl = $location;
		$scope.$watch('newUrl.url()',function(newVal){
			if(newVal == '/active'){
				$scope.isCompleted = {completed:false};
			}else if(newVal == '/completed'){
				$scope.isCompleted = {completed:true};
			}else {
				$scope.isCompleted = {};
			}
		})

		$scope.data = $myServer.getData();
		//删除
		$scope.del = function(id){
			$myServer.delete(id);
		};
		//添加
		$scope.task = "";
		$scope.add = function(){
			if($scope.data.length != 0){
				$scope.newId = $scope.data[$scope.data.length-1].id;
			}else{
				$scope.newId = -1;
			}
			$myServer.add($scope.task,$scope.newId);
			$scope.task = "";
		}

		//编辑状态
		$scope.isEditing = -1;
		$scope.dbClick = function(id){
			$scope.isEditing = id;
		}
		$scope.blurEditing = function(){
			$scope.isEditing = -1;
			$myServer.refreshLocal($scope.data);
		}

		//左下角计数
		$scope.num = function(){
			return $myServer.countNum();
		}

		//筛选
		$scope.isCompleted = {};
		$scope.active = function(){
			$scope.isCompleted = {completed:false};
			$myServer.refreshLocal($scope.data);
		}
		$scope.completed = function(){
			$scope.isCompleted = {completed:true};
			$myServer.refreshLocal($scope.data);
		}
		$scope.all = function(){
			$scope.isCompleted = {};
			$myServer.refreshLocal($scope.data);
		}

		//全选
		$scope.allChecked = function(){
			if($scope.num()==0){
				angular.forEach($scope.data,function(val,i){
					val.completed = false;
				})
			}else {
				angular.forEach($scope.data,function(val,i){
					val.completed = true;
				})
			}
			 $myServer.refreshLocal($scope.data);
		}

		//清除完成
		$scope.clearCompleted = function(){
			for(var i=$scope.data.length-1;i>=0;i--){
				if($scope.data[i].completed){
					$scope.data.splice(i,1);
				}
			}
			 $myServer.refreshLocal($scope.data);
		}
	}])
})(angular)

