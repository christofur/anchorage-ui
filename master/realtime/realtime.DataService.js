(function() {
    'use strict';

    angular
        .module('app.realtime')
        .service('RealtimeData', RealtimeData);

    RealtimeData.$inject = ['$resource'];

    function RealtimeData($resource) {
        this.load = load;

        ////////////////

        var opts = {
            get: {
                method: 'GET',
                isArray: true
            }
        };

        function load(source) {
            return $resource(source, {}, opts).get();
        }
    }
})();
