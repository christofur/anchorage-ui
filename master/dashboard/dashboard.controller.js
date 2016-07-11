(function(){
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject['$scope']

    function DashboardController($scope){
        var vm = this;
    }

})();