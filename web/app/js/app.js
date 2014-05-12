'use strict';

var app = angular.module('app', 
		[
		 'ngRoute',
		 'ui.bootstrap',
		 'jBasisWeb', 'jBasisWeb.controllers', 'jBasisWeb.directives', 'jBasisWeb.filters', 'jBasisWeb.services',
		 'app.controllers', 'app.directives', 'app.filters', 'app.services'
		]).
    run(['jBWService', '$route', '$http', '$log', function (jBWService, $route, $http, $log) {
    	$log.info("app", "app started");
    	
    	$http.get('data/AppMenu.json').success(function(data, status, headers, config) {
    		var mainMenu = MenuItem.create(data);
    		jBWService.setMainMenu(mainMenu);
    		$log.info(angular.toJson(data, true));
    	}).
    	error(function(data, status, headers, config) {
    		// TODO 
    	    alert("Error!!");
    	});
    }]).
    config(['$routeProvider', function ($routeProvider) {
    	// Test
        $routeProvider.when('/test', {
            templateUrl: 'modules/jBasisWeb/partials/home.html'
        });
        $routeProvider.when('/test1', {
            template: '<div class="formContainer rounded-corners shadow">test1</div>'
        });
        $routeProvider.when('/test2', {
            template: '<div class="formContainer rounded-corners shadow">test2</div>'
        });
        $routeProvider.when('/testchild1', {
            template: '<div class="formContainer rounded-corners shadow">testChild1</div>'
        });
        $routeProvider.when('/testchild2', {
            template: '<div class="formContainer rounded-corners shadow">testChild2</div>'
        });
        // Show case
        $routeProvider.when('/showcase', {
        	templateUrl: 'partials/showCase.html'
        });
        
    }]).
    value('EnvironmentInfo', {version: "0.0.0", name: "prototype", lastBuild: "notAvailable"});


// ****** template redefinition *********//

angular.module("template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("template/tabs/tab.html",
	    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
	    "  <a style=\"cursor:pointer;\" ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
	    "</li>\n" +
	    "");
	}]);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("template/tabs/tabset.html",
	    "\n" +
	    "<div class=\"tabbable\" style=\"margin-bottom: 50px;\">\n" +
	    "  <ul class=\"nav {{type && 'nav-' + type}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
	    "  <div class=\"tab-content\" >\n" +
	    "    <div class=\"tab-pane\" style=\"border-left: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd;\"\n" +
	    "         ng-repeat=\"tab in tabs\" \n" +
	    "         ng-class=\"{active: tab.active}\"\n" +
	    "         tab-content-transclude=\"tab\">\n" +
	    "    </div>\n" +
	    "  </div>\n" +
	    "</div>\n" +
	    "");
	}]);