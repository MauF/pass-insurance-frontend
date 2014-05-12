'use strict';

angular.module('jBasisWeb.services', []).
    run(['$log', function ($log) {
    	$log.info("jBasisWeb.services injected!!");
    }]).
    service('jBWService', ['$rootScope', '$http', '$location', '$log', function ($rootScope, $http, $location, $log) {

        function init() {
            $rootScope.windowTitle = "JBasisWeb";
            $rootScope.pageTitle = "";
            $rootScope.headerInfo = "";
            $rootScope.showTitleBar = false;
            $rootScope.showContent = false;
            $rootScope.subPageTitle = "";
            $rootScope.menuItems = [];
            $rootScope.hideMenuFolding = false;
            $rootScope.showWorkingArea = false;
            $rootScope.loadingMsg = "Loading...";
            $rootScope.initExecuted = true;
        }

        if (!$rootScope.initExecuted) {
            init();
        }

        function fillBreadCrumbs(menuItem) {
            var breadcrumbs = [menuItem];
            if (menuItem.father != null) {
                var fatherItem = MenuItem.searchItemFromItems(getMenuItems(), menuItem.father);
                var items = fillBreadCrumbs(fatherItem);
                for (var index in items) {
                    breadcrumbs.push(items[index]);
                }
            }
            return breadcrumbs;
        }

        function removeAllVolatileMenuItems(menuItem) {
            var volatileChildren = menuItem.getVolatileChildren();
            for (var index in volatileChildren) {
                var volatileMenuItem = volatileChildren[index];
                removeAllVolatileMenuItems(volatileMenuItem);
                MenuItem.deleteItem(getMenuItems(), volatileMenuItem);
            }
        }
        
        function setShowTitleBar(showTitleBar) {
            $rootScope.showTitleBar = showTitleBar;
        }

        function getShowTitleBar() {
            return $rootScope.showTitleBar;
        }
        
        function setShowContent(showContent) {
            $rootScope.showContent = showContent;
        }

        function getShowContent() {
            return $rootScope.showContent;
        }
        
        function setSubPageTitle(subPageTitle) {
            $rootScope.subPageTitle = subPageTitle;
        }

        function getSubPageTitle() {
            return $rootScope.subPageTitle;
        }

        function setWindowTitle(windowTitle) {
            $rootScope.windowTitle = windowTitle;
        }

        function getWindowTitle() {
            return $rootScope.pageTitle;
        }

        function setPageTitle(pageTitle) {
            $rootScope.pageTitle = pageTitle;
        }

        function getPageTitle() {
            return $rootScope.pageTitle;
        }

        function setHeaderInfo(headerInfo) {
            $rootScope.headerInfo = headerInfo;
        }

        function getHeaderInfo() {
            return $rootScope.headerInfo;
        }

        $rootScope.isMenuOpen = true;

        function setMenuOpen(menuOpen) {
            $rootScope.isMenuOpen = menuOpen;
        }

        function isMenuOpen() {
            return $rootScope.isMenuOpen;
        }

        function getMenuItems() {
            return $rootScope.menuItems;
        }

        function getMainMenu() {
            return $rootScope.mainMenu;
        }
        function setMainMenu(mainMenu) {
            $rootScope.mainMenu = mainMenu;
            setSelectedMenuItem(mainMenu);
            setMainMenuItem(mainMenu);
            $rootScope.menuItems = fillMenuItems(mainMenu);
            setBreadCrumbs(fillBreadCrumbs(mainMenu));
        }

        function setMainMenuItem(mainMenuItem) {
            $rootScope.mainMenuItem = mainMenuItem;
        }

        function getMainMenuItem() {
            return $rootScope.mainMenuItem;
        }

        function setSelectedMenuItem(selectedMenuItem) {
            $rootScope.selectedMenuItem = selectedMenuItem;
        }

        function getSelectedMenuItem() {
            return $rootScope.selectedMenuItem;
        }

        function setSelectedMenuName(selectedMenuName) {
            $rootScope.selectedMenuName = selectedMenuName;
        }

        function getSelectedMenuName() {
            return $rootScope.selectedMenuName;
        }

        function fillMenuItems(menuItem) {
            var menuItems = [menuItem];
            for (var index in menuItem.getChildren()) {
                var child = menuItem.getChildren()[index];
                var childrenFound = fillMenuItems(child);
                for (var index in childrenFound) {
                    menuItems.push(childrenFound[index]);
                }
            }
            return menuItems;
        }

        function setBreadCrumbs(breadCrumbs) {
            $rootScope.breadCrumbs = breadCrumbs;
        }

        function getBreadCrumbs() {
            return $rootScope.breadCrumbs;
        }

        function alreadyExistBreadCrumb(menuItem) {
            for (var index in getBreadCrumbs()) {
                var breadCrumb = getBreadCrumbs()[index];
                if (breadCrumb == null) {
                    var a = "";
                }
                if (breadCrumb.name == menuItem.name) {
                    return true;
                }
            }
            return false;
        }

        function addBreadCrumb(menuItem) {
            if (!alreadyExistBreadCrumb(menuItem)) {
                getBreadCrumbs().push(menuItem);
            }
        }

        function getUserLoggedIn() {
            // TODO create a service for the login/authentication
            var userLoggedIn = $rootScope.userLoggedIn;
            if(userLoggedIn == null) {
                return null;
            }
            return new User(userLoggedIn);
        }

        function setUserLoggedIn(userLoggedIn) {
            // TODO create a service for the login/authentication
            $rootScope.userLoggedIn = userLoggedIn;
        }
        
        function login(username, password) {
        	 var endPoint = "/passinsurance/rest";
             var user={"username": username, "password": password};
             return $http({method: 'POST', url: endPoint + '/authentication/checkUser/', params: '', data: user, cache: true});
		}

        function setInitExecuted(initExecuted) {
            $rootScope.initExecuted = initExecuted;
        }

        function isInitExecuted() {
            return $rootScope.initExecuted;
        }

        function logout() {
            $rootScope.initExecuted = false;
        }

        function showWorkingArea(showWorkingArea) {
            $rootScope.showWorkingArea = showWorkingArea;
        }

        function checkLogin() {
//            temporary disabled
//            var userLoggedIn = getUserLoggedIn();
//
//            if (userLoggedIn == null) {
//                $log.log("checkLogin() -->" + $location.path(), "no user logged in found ---> redirect to gatekeeper");
//                var path = $location.path();
//                var search = $location.search();
//                $location.replace();
//                $location.path("gatekeeper").search("path", path).search("search", search);
//                return false;
//            }
//
//            setHeaderInfo("User: " + userLoggedIn.name);

            return true;
        }

        return  {
            getMenuItems: getMenuItems,
            setShowTitleBar: setShowTitleBar,
            getShowTitleBar: getShowTitleBar,
            setShowContent: setShowContent,
            getShowContent: getShowContent,
            setSubPageTitle: setSubPageTitle,
            getSubPageTitle: getSubPageTitle,
            getMainMenu: getMainMenu,
            setMainMenu:setMainMenu,
            setMainMenuItem: setMainMenuItem,
            getMainMenuItem: getMainMenuItem,
            setSelectedMenuItem: setSelectedMenuItem,
            getSelectedMenuItem: getSelectedMenuItem,
            setSelectedMenuName: setSelectedMenuName,
            getSelectedMenuName: getSelectedMenuName,
            setWindowTitle: setWindowTitle,
            getWindowTitle: getWindowTitle,
            getPageTitle: getPageTitle,
            setPageTitle: setPageTitle,
            setHeaderInfo: setHeaderInfo,
            getHeaderInfo: getHeaderInfo,
            isMenuOpen: isMenuOpen,
            setMenuOpen: setMenuOpen,
            showWorkingArea: showWorkingArea,
            fillBreadCrumbs: fillBreadCrumbs,
            fillMenuItems: fillMenuItems,
            removeAllVolatileMenuItems: removeAllVolatileMenuItems,
            addBreadCrumb: addBreadCrumb,
            setBreadCrumbs: setBreadCrumbs,
            getBreadCrumbs: getBreadCrumbs,
            getUserLoggedIn: getUserLoggedIn,
            setUserLoggedIn: setUserLoggedIn,
            setInitExecuted: setInitExecuted,
            isInitExecuted: isInitExecuted,
            checkLogin: checkLogin,
            login: login,
            logout: logout
        };
    }]).
    service('jBWUtility', ['$rootScope', 'jBWService', '$location', '$log', function ($rootScope, jBWService, $location, $log) {
        return {
            toggleMenu: function () {
                if (jBWService.isMenuOpen()) {
                    this.hideMenu();
                }
                else {
                    this.showMenu();
                }
            },
            hideMenu: function () {
                if (jBWService.isMenuOpen()) {
                    angular.element(document.getElementById("foldingmenu")).attr("src", 'images/jbasisweb/unfoldMenu.png');
                    angular.element(document.getElementById("body")).css("left", "0px");
                    angular.element(document.getElementById("menufolding")).css("left", "0px");
                    angular.element(document.getElementById("header-content-top-left")).css("margin-left", "23px");
                    angular.element(document.getElementById("menuvoices")).css("width", "0px");
                    angular.element(document.getElementById("menu")).css("width", "0px");
                    angular.element(document.getElementById("menu")).css("overflow-y", "hidden");
                    jBWService.setMenuOpen(false);
                }
            },
            showMenu: function () {
                if (!jBWService.isMenuOpen()) {
                    angular.element(document.getElementById("menufolding")).css("left", "205px");
                    angular.element(document.getElementById("foldingmenu")).attr("src", 'images/jbasisweb/foldMenu.png');
                    angular.element(document.getElementById("body")).css("left", "205px");
                    angular.element(document.getElementById("menuvoices")).css("width", "205px");
                    angular.element(document.getElementById("menu")).css("width", "205px");
                    angular.element(document.getElementById("menu")).css("padding-left", "0px");
                    angular.element(document.getElementById("body")).css("left", "205px");
                    angular.element(document.getElementById("menu")).css("overflow-y", "auto");
                    angular.element(document.getElementById("header-content-top-left")).css("margin-left", (angular.element(document.getElementById("menu").width + 23) + "px"));
                    jBWService.setMenuOpen(true);
                }
            },
            hideMenuFolding: function (hideMenuFolding) {
                angular.element(document.getElementById("foldingmenu")).css("visibility", hideMenuFolding ? "hidden" : "visible");
            },
            showWorkingArea: function (showWorkingArea) {
            	$log.log("jBWUtility.showWorkingArea", "---> " + showWorkingArea);
                jBWService.showWorkingArea(showWorkingArea);
            },
            selectMenuItem: function (menuItem) {
                if (!menuItem.isAVolatileMenuItem()) {
                    jBWService.removeAllVolatileMenuItems(menuItem);
                }

                if (menuItem.hasChildren()) {
                    jBWService.setSelectedMenuItem(menuItem);
                }
                jBWService.setSelectedMenuName(menuItem.getName());
                jBWService.setPageTitle(menuItem.getLabel());
                jBWService.setBreadCrumbs(jBWService.fillBreadCrumbs(menuItem).reverse());

                $location.path(menuItem.path);
                if (menuItem.search != null) {
                    $location.search(menuItem.search);
                }

                return jBWService.getBreadCrumbs();
            }

        };
    }]);