(function(){
    'use strict';

    angular
        .module('app.realtime')
        .run(realtimeRoute);

    realtimeRoute.$inject = ['Router'];

    function realtimeRoute(Router){

        Router.state('app.realtime', {
            url: 'realtime/',
            title: 'Realtime',
            templateUrl: 'realtime.html'
        });
    }
})();