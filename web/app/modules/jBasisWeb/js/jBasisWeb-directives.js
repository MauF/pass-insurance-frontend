'use strict';

angular.module('jBasisWeb.directives', ['jBasisWeb.services']).
    run(['$log', function($log){
    	$log.info("jBasisWeb.directives injected!!");
    }]);
