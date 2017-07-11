/**
 * Created by nick on 2017/6/24.
 */
/**
 * 主配置
 */
(function() {
    'use strict';

    //app配置
    var mainApp = angular.module('mainApp', ['ngRoute', 'ui.bootstrap']);
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

//	var testApi  = 'http://106.14.117.12/info/';
    var testApi  = 'info/';

    mainApp.controller('managerCtrl', ['$scope', '$http', '$modal', '$timeout', function($scope, $http, $modal, $timeout) {

        $scope.messages = [];

        //提交留言
        $scope.getMessages = function() {
            $http({
                method: 'post',
                url: testApi + 'getAllMessages',
                data: $scope.message
            }).success(function (messages) {
                for(var i = 0; i < messages.length; i ++) {
                    messages[i].id = i + 1;
                }
                $scope.messages = messages;

            }).error(function (msg) {
                openDialog($scope, $modal, "服务器错误，请联系管理员. yongyu_good@126.com");
            })
        };

        $scope.getMessages();


        $scope.clkComplete = function () {
            openDialog($scope, $modal, "complete");
        };

        $scope.clkInvalid = function () {
            openDialog($scope, $modal, "invalid");
        };
    }]);


})();

