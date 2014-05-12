'use strict';

angular.module('jBasisWeb.controllers', ['jBasisWeb.services']).
    run(['$log', function ($log) {
    	$log.info("jBasisWeb.controllers injected!!");
    }]);
