(function(){
    'use strict';

    angular
        .module('app.core')
        .run(coreRoute);

    coreRoute.$inject = ['Router'];

    function coreRoute(Router){
        Router.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'core.layout.html'
        });
    }
})();