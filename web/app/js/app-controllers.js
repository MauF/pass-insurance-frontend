'use strict';

angular.module('app.controllers', ['app.services', 'jBasisWeb.services']).
    run([function () {
        console.info("app.controllers injected!!");
    }]).
    controller('tablesShowCaseCtrl', ['$scope', 'jBWService', 'jBWUtility', '$http', '$modal', '$log', function ($scope, jBWService, jBWUtility, $http, $modal, $log) {
    	jBWUtility.showWorkingArea(true);
    	
    	$scope.title = "Show Case";
    }]).
    controller('appCtrl', ['$location', '$rootScope', '$scope', 'jBWService', 'jBWUtility', '$routeParams', '$http', '$modal', '$log', 'EnvironmentInfo', function ($location, $rootScope, $scope, jBWService, jBWUtility, $routeParams, $http, $modal, $log, EnvironmentInfo) {

    	$rootScope.windowTitle = "PassInsurance";
    	
        $scope.toggleMenu = function () {
            jBWUtility.toggleMenu();
        };

        $scope.selectMenuItem = function (menuItem) {
            jBWUtility.selectMenuItem(menuItem);
        };

        $scope.searchMenuItemByName = function (menuItem, menuItemName) {
            return MenuItem.searchItem(menuItem, menuItemName);
        };

        $scope.isMainMenu = function (menuItem) {
            if (menuItem != null) {
                return menuItem.getName() == jBWService.getMainMenuItem().getName();
            }
            return false;
        };

        $scope.isSelectedMenu = function (menuItem) {
            var isSelectedMenu = false;
            if (menuItem != null) {
                isSelectedMenu = menuItem.getName() == jBWService.getSelectedMenuName();
            }
            return isSelectedMenu;
        };

        $scope.resetMenu = function () {
            jBWService.setSelectedMenuItem(jBWService.getMainMenu());
            jBWService.setSelectedMenuName(jBWService.getSelectedMenuItem().getName());
            jBWService.setPageTitle("");
            jBWService.setBreadCrumbs([]);
        };

        $scope.showInfo = function() {
        	
        	var modalInstance = $modal.open({
                templateUrl: 'partials/webAppInfo.html',
                controller: ['$scope', '$modalInstance', 'EnvironmentInfo', function($scope, $modalInstance, EnvironmentInfo) {
                	    $scope.environmentInfo = EnvironmentInfo;
                        $scope.ok = function() {
                            $modalInstance.close();
                        };

                    }],
                resolve: {
                    items: function() {
                        
                    }
                }
            });

            modalInstance.result.then(function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        
        $scope.home = function() {
        	$scope.resetMenu();
        	$location.path("home");
        };
        
        $scope.todo = function(msg) {
            alert(msg);
        };
        
        $scope.logout = function() {
        	$log.log("logout requested!");
        	var location = $location.$$path;
        	if(!location.indexOf("/login")==0) {
                jBWUtility.showWorkingArea(false);
                jBWUtility.hideMenuFolding(true);
                jBWUtility.hideMenu();
                jBWService.setBreadCrumbs([]);
                jBWService.setPageTitle("");
                jBWService.setHeaderInfo("");

                jBWService.logout();

                $location.path("login");
                $log.log("logout", "logout succeed!! ---> redirect to login");
        	} else {
        		$log.log("logout not needed...you are already in the login page!");
        	}
        	
        };
    }]);
