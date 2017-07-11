/**
 * 主配置
 */
(function() {
    'use strict';

    //app配置
    var mainApp = angular.module('mainApp', ['ngRoute', 'ui.bootstrap']);
    //常量配置
    mainApp.constant('baseUrl', '/PengJu/');
    mainApp.constant('ossUrl', 'http://pengjuwb.oss-cn-shanghai.aliyuncs.com/')
    mainApp.constant('pengJuUrls', {
        "baseUrl": "/PengJu",
        "ossUrl": "http://pengjuwb.oss-cn-shanghai.aliyuncs.com/",
		"testApi": "info/"
});

    //路由配置
	/*
	 mainApp.config(['$routeProvider', function($routeProvider) {
	 $routeProvider.when('/index', {
	 templateUrl: 'pages/index.html'
	 }).when('/contact', {
	 templateUrl: 'pages/contact.html'
	 }).when('/about', {
	 templateUrl: 'pages/about-us.html'
	 }).when('/cases', {
	 templateUrl: 'pages/service.html'
	 }).otherwise({
	 redirectTo: '/index'
	 });
	 }]);*/
})();
/**
 * 公共组件
 */
function openDialog($scope, $modal, content) {
    $modal.open({
        template: '<div class="modal-header">' +
        '<div class="form-inline"> ' +
        '<h4>提示</h4>' +
        '</div>' +
        '<div class="modal-body">' +
        content +
        '</div>' +
        '<div class="modal-footer">' +
        '<button  class="btn btn-success" ng-click="ok()">确定</button>' +
        '</div>',
        controller: function($scope, $modal, $modalInstance){
            $scope.ok= function(){
                $modalInstance.close();
            };
        }
    });
}

/**
 * index页面功能
 */
(function() {
    'use strict';
    var mainApp = angular.module('mainApp');

    var ossUrl = 'http://pengjuwb.oss-cn-shanghai.aliyuncs.com/';
    var sdefineUrl = ossUrl + 'sdefine/';
    var uploadUrl = ossUrl + 'upload/';
//	var testApi  = 'http://106.14.117.12/info/';
    var testApi  = 'info/';

    mainApp.controller('loginContrl', ['$scope', '$http', '$modal', '$timeout', function($scope, $http, $modal, $timeout) {

        //初始化数据
        var initData = function() {
            $scope.btnSubmit = true;
        };

        //登录
        $scope.doSubmit = function() {
            $scope.btnSubmit = false;

            if (validateValue($scope.username) ) {
                openDialog($scope, $modal, "请输入用户名！");
                $scope.btnSubmit = true;
                return;
            }

            if (validateValue($scope.password) ) {
                openDialog($scope, $modal, "请输入密码！");
                $scope.btnSubmit = true;
                return;
            }

            $http({
                method: 'get',
                url: testApi + 'login',
                data: $scope.message
            }).success(function (msg) {
                $scope.btnSubmit = true;
                $scope.message = {};
                // openDialog($scope, $modal, '请保持电话畅通，我们会尽快联系您!');
            }).error(function (msg) {
                $scope.btnSubmit = true;
                openDialog($scope, $modal, "服务器错误，请联系管理员. yongyu_good@126.com");
            })
        };

        function validateValue(name) {
            if (name == undefined || name == "") {
                return true;
            }
            return false;
        }


        /**
         * 提交请求
         */
        $scope.doSubmitCase = function() {

        };

        initData();
    }]);
})();

