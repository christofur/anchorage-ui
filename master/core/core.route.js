(function(){
    'use strict';

    angular
        .module('app.core')
        .run(coreRoute);

    coreRoute.$inject = ['Router'];

    function coreRoute(Router){

        Router.state('app', {
            url: '/app/',
            abstract: false,
            templateUrl: 'core.layout.html'
        });
    }
})();