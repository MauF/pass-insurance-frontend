'use strict';

angular.module('app.filters', []).
    run([function () {
        console.info("app.filters injected!!");
    }]).filter('startFrom', [function() {
        return function(input, start) {         
            return input.slice(start);
        };
    }]);
