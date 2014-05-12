'use strict';

angular.module('app.services', ['ngCookies']).
    run([function () {
        console.info("app.services injected!!");
    }]).
    service('appService', ['$cookieStore', '$rootScope', '$http', '$location', function ($cookieStore, $rootScope, $http, $location) {
        return  {
        
        };
    }]);