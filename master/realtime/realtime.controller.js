(function(){
    'use strict';

    angular
        .module('app.realtime')
        .controller('RealtimeController', RealtimeController);

    RealtimeController.$inject = ['$scope']

    function RealtimeController($scope){
        var vm = this;
    }

})();