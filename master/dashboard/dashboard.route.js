(function(){
    'use strict';

    angular
        .module('app.core')
        .run(dashboardRoute);

    dashboardRoute.$inject = ['Router'];

    function dashboardRoute(Router){

        Router.state('dashbaord', {
            url: '/dashboard',
            title: 'Dashboard',
            templateUrl: 'dashboard.html'
        });
    }
})();