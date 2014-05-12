'use strict';

function User(obj) {

    if(obj instanceof Object) {
        this.name = obj.name;
    } else {
        this.name = obj;
    }

    this.getName = function () {
        return this.name;
    };
}

function MenuItem(name, label, path, search) {
    this.name = name;
    this.label = label;
    this.path = path;
    this.search = search == {} ? null : search;
    this.children = [];
    this.volatileChildren = [];
    this.isVolatile = false;

    this.father = null;

    this.setName = function (name) {
        this.name = name;
    };

    this.getName = function () {
        return this.name;
    };

    this.setLabel = function (label) {
        this.label = label;
    };

    this.getLabel = function () {
        return this.label;
    };

    this.setPath = function (path) {
        this.route = path;
    };

    this.getPath = function () {
        return this.path;
    };

    this.getChildren = function () {
        return this.children;
    };

    this.getVolatileChildren = function () {
        return this.volatileChildren;
    };

    this.getChildByName = function (childName) {
        for (var i = 0; i < this.getChildren().length; i++) {
            var menuItem = this.getChildren()[i];
            if (menuItem.getName() == childName)
                return  menuItem;
        }
        return null;
    };

    this.getVolatileChildByName = function (childName) {
        for (var i = 0; i < this.getVolatileChildren().length; i++) {
            var menuItem = this.getVolatileChildren()[i];
            if (menuItem.getName() == childName)
                return  menuItem;
        }
        return null;
    };

    this.addChild = function (child) {
        child.father = this.getName();
        this.getChildren().push(child);
    };

    this.addChildren = function (children) {
        if (children instanceof Array) {
            for (var i = 0; i < children.length; i++) {
                this.addChild(children[i]);
            }
        }
    };

    this.addVolatileChild = function (child) {
        child.father = this.getName();
        child.isVolatile = true;
        this.getVolatileChildren().push(child);
    };

    this.addVolatileChildren = function (children) {
        if (children instanceof Array) {
            for (var i = 0; i < children.length; i++) {
                this.addVolatileChild(children[i]);
            }
        }
    };

    this.hasChildren = function () {
        return this.getChildren().length > 0;
    };

    this.isAVolatileMenuItem = function () {
        return this.isVolatile;
    };
};

MenuItem.deleteItem = function (menuItems, menuItemToDelete) {
    for (var index in menuItems) {
        var menuItem = menuItems[index];
        if(menuItem.getName() == menuItemToDelete.getName()) {
            menuItems.splice(index, 1);
            break;
        }
    }
    return menuItems;
};

MenuItem.searchItemFromItems = function (menuItems, menuName) {
    for (var index in menuItems) {
        var child = menuItems[index];
        var menuItem = MenuItem.searchItem(child, menuName);
        if (menuItem != null)
            return menuItem;
    }
    return null;
};

MenuItem.searchItem = function (menuItem, menuName) {
    if (menuItem.getName() == menuName) {
        return menuItem;
    }
    for (var index in menuItem.getChildren()) {
        return MenuItem.searchItem(menuItem.getChildren()[index], menuName);
    }
    return null;
};

MenuItem.create = function(data) {
	// TODO enhance
	var root = new MenuItem(data.name,data.label,data.path,data.search);
	
	for (var index in data.children) {
		var child = data.children[index];
		var childMenu =  MenuItem.create(child);
		root.addChild(childMenu);
    }
	return root;
};

angular.module('jBasisWeb', ['ngRoute', 'jBasisWeb.controllers', 'jBasisWeb.directives', 'jBasisWeb.filters', 'jBasisWeb.services']).
    run(['jBWService', 'jBWUtility', '$rootScope', '$log', function (jBWService, jBWUtility, $rootScope, $log) {
    	$log.info("jBasisWeb injected!!");
        // Menu definitions
        // var logoutMenu = new MenuItem("logoutMn", "Logout", "login", {});
//        var homeMenu = new MenuItem("mainMn", "Home", "home", {});
        // homeMenu.addChildren([logoutMenu]);

//        jBWService.setMainMenu(homeMenu);
        
        
//        $rootScope.$on('$routeChangeStart', function(event, next, current) {
//        	if (jBWService.checkLogin()) {
//        		jBWUtility.showWorkingArea(true);
//                jBWUtility.showMenu();
//                jBWUtility.hideMenuFolding(false);
//        	} else {
//        		
//        	}
//        });

//        $rootScope.$on('$routeChangeSuccess', function(event, next, current){
////        	alert('$routeChangeSuccess');
//        });
//
//        $rootScope.$on('routeChangeError', function(event, next, current){
////        	alert('routeChangeError');
//        });

        
    }]).
    config(function ($provide, $httpProvider) {
    	  
    	  // Intercept http calls.
    	  $provide.factory('RgiHttpInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
    	    return {
    	      // On request success
    	      request: function (config) {
//    	         $log.log(config); // Contains the data about the request before it is sent.
    	         $rootScope.loading = true;
    	        // Return the config or wrap it in a promise if blank.
    	        return config || $q.when(config);
    	      },
    	 
    	      // On request failure
    	      requestError: function (rejection) {
//    	         $log.log(rejection); // Contains the data about the error on the request.
    	    	  $rootScope.loading = false;
    	        // Return the promise rejection.
    	        return $q.reject(rejection);
    	      },
    	 
    	      // On response success
    	      response: function (response) {
//    	         $log.log(response); // Contains the data from the response.
    	    	  $rootScope.loading = false;
    	        // Return the response or promise.
    	        return response || $q.when(response);
    	      },
    	 
    	      // On response failture
    	      responseError: function (rejection) {
//    	         $log.log(rejection); // Contains the data about the error.
    	    	  $rootScope.loading = false;
    	        // Return the promise rejection.
    	        return $q.reject(rejection);
    	      }
    	    };
    	  }]);
    	 
    	  // Add the interceptor to the $httpProvider.
    	  $httpProvider.interceptors.push('RgiHttpInterceptor');
    	 
    	}).
    config(['$routeProvider', function ($routeProvider, $location) {
        $routeProvider.when('/gatekeeper', {
            template: '<div></div>',
            controller: ['$location', '$rootScope', '$scope', 'jBWService', 'jBWUtility', '$routeParams', '$log', function ($location, $rootScope, $scope, jBWService, jBWUtility, $routeParams, $log) {
                jBWUtility.showWorkingArea(false);
                $log.log("gatekeeper", $location.absUrl());

                var userLoggedIn = jBWService.getUserLoggedIn();

                
                if (userLoggedIn == null) {
                	$log.log("gatekeeper", "no user logged in found ---> redirect to login");
                    $location.path("login");
                } else {
                    var redirect = null;
                    if ($routeParams.path == "unknown") {
                        redirect = "home";
                        $log.log("gatekeeper", "user logged in found: " + userLoggedIn.getName() + " [the previous route doesn't exist] ---> redirect to " + redirect);
                    } else {
                        redirect = $routeParams.name;
                        $log.log("gatekeeper", "user logged in found: " + userLoggedIn.getName() + " ---> redirect to " + $routeParams.name);
                    }

                    $location.path(redirect);
                }

            }]
        });

        $routeProvider.when('/logout', {
            template: '<div></div>',
            controller: ['$location', '$rootScope', '$scope', 'jBWService', 'jBWUtility', '$routeParams', '$log', function ($location, $rootScope, $scope, jBWService, jBWUtility, $routeParams, $log) {
                $log.log("logout", $location.absUrl());
                jBWUtility.showWorkingArea(false);
                jBWUtility.hideMenuFolding(true);
                jBWUtility.hideMenu();
                jBWService.setBreadCrumbs([]);
                jBWService.setPageTitle("");
                jBWService.setHeaderInfo("");

                jBWService.logout();

                $location.path("home");
                $log.log("logout", "logout succeed!! ---> redirect to home");
            }]
        });

        $routeProvider.when('/login', {
            templateUrl: 'modules/jBasisWeb/partials/login.html',
            controller: ['$location', '$rootScope', '$scope', 'jBWService', 'jBWUtility', '$routeParams', '$log', function ($location, $rootScope, $scope, jBWService, jBWUtility, $routeParams, $log) {
          
                var init = function () {
                    $log.log("login", "init application");
                    jBWUtility.showMenu();
                    jBWUtility.hideMenuFolding(false);
                    jBWService.setPageTitle("Login");
                    
                    jBWService.setShowContent(true);

                    $log.log("login - mainMenuItem", angular.toJson($scope.mainMenuItem, true));

                    jBWService.setInitExecuted(true);
                };


                $log.log("login", $location.absUrl());
                jBWUtility.hideMenuFolding(true);
                jBWUtility.hideMenu();
                jBWUtility.showWorkingArea(true);
                jBWService.setBreadCrumbs([]);
                jBWService.setPageTitle("Login");
                jBWService.setShowContent(true);
                
                $scope.showInfo = true;

                $scope.title = "Login";
                $scope.usernameLbl = "Username";
                $scope.passwordLbl = "Password";
                $scope.okBtn = {name: "okBtn", value: "OK", title: "Login..."};
                $scope.clearBtn = {name: "clearBtn", value: "CLEAR", title: "Clear fields..."};
                
                $scope.username = "adminen";
                $scope.password = "b";

                $scope.tryToLogin = function () {
//                	jBWService.login($scope.username, $scope.password).
//                	success(function(data, status, headers, config) {
//                		 if(status === 404) {
//                             alert("error!!! status: " + status);
//                         } else if(status === 401) {
//                        	 $log.log("login", "Wrong UserName or Password...");
//                             alert("Wrong UserName or Password...");
//                         } else {
//                        	 jBWService.setUserLoggedIn(new User($scope.username));
//                             jBWService.setHeaderInfo("User: " + jBWService.getUserLoggedIn().getName());
//                             init();
//                             $log.log("login", "login succeed!! ---> redirect to home");
//                             $location.path("home");
//                         }
//                	}).
//                	error(function(data, status, headers, config){
//                		$log.log("login", "Wrong UserName or Password...");
//                        alert("Wrong UserName or Password...");
//                	});
                	
                    
                    if (($scope.username == "admin" || $scope.username == "adminen") && $scope.password == "b") {
                        jBWService.setUserLoggedIn(new User($scope.username));
                        jBWService.setHeaderInfo("User: " + jBWService.getUserLoggedIn().getName());
                        init();
                        $log.log("login", "login succeed!! ---> redirect to home");
                        $location.path("home");
                    } else {
                        $log.log("login", "Wrong UserName or Password...");
                        alert("Wrong UserName or Password...");
                    }
                };

                $scope.clearFields = function () {
                    $scope.username = "";
                    $scope.password = "";
                };

            }]
        });

        $routeProvider.when('/home', {
        	templateUrl: 'modules/jBasisWeb/partials/home.html',
            controller: ['$location', '$rootScope', '$scope', 'jBWService', 'jBWUtility', '$routeParams', '$log', function ($location, $rootScope, $scope, jBWService, jBWUtility, $routeParams, $log) {
                $log.log("home", $location.absUrl());

                if (jBWService.checkLogin()) {
                    jBWUtility.showWorkingArea(true);
                    jBWUtility.showMenu();
                    jBWUtility.hideMenuFolding(false);
                    $scope.home();
                    jBWService.setPageTitle("Home");
                    jBWService.setShowContent(false);
                    
                    $scope.showLogout = true;
                    
                    
                }
            }]
        });

        $routeProvider.when('/error', {
            templateUrl: 'modules/jBasisWeb/partials/error.html',
            controller: ['$location', '$rootScope', '$scope', 'jBWService', 'jBWUtility', '$routeParams', '$log', function ($location, $rootScope, $scope, jBWService, jBWUtility, $routeParams, $log) {
                $log.log("error", $location.absUrl());
                jBWUtility.showWorkingArea(true);
                jBWUtility.hideMenu();
                jBWUtility.hideMenuFolding(true);
                $scope.errorMsg = "This route '" + $location.path() + "' doesn't exist!!!";
            }]
        });
        
        $routeProvider.otherwise({
            redirectTo: function(routeParams, path, search) {
            	if(!path) {
            		return '/home';
            	} else {
            		alert("This route '" + path + "' doesn't exist!!! \r\n You will be redirect to the home page...");
            		return '/home';
            	}
            }
        });

//        $routeProvider.otherwise({
//                template: '<div/>',
//                controller: ['$location', '$rootScope', '$scope', 'jBWService', 'jBWUtility', '$route', '$routeParams', '$log', function ($location, $rootScope, $scope, jBWService, jBWUtility, $route, $routeParams, $log) {
//                	jBWUtility.showWorkingArea(false);
//                    var selectedMenuItem = jBWService.getSelectedMenuItem();
//                    var errorMsg = "unknown route!!";
//                    if (selectedMenuItem != null) {
//                        errorMsg = "This route '" + selectedMenuItem.path + "' defined into the: '" + selectedMenuItem.getName() + "' menuItem is not defined!!!";
//                    }
//                    $log.log("$routeProvider.otherwise branch", errorMsg);
//                    $location.path("gatekeeper");
//                }]
//            }
//        );
    }]);
