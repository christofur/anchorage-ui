(function() {
    'use strict';

    angular
        .module('app.realtime')
        .controller('RealtimeController', RealtimeController);

    RealtimeController.$inject = ['$scope', 'RealtimeData', '$timeout', 'Colors'];

    function RealtimeController($scope, RealtimeData, $timeout, Colors) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            // REALTIME
            // -----------------------------------
            vm.realTimeOptions = {
                series: {
                    lines: {
                        show: true,
                        fill: true,
                        fillColor: {
                            colors: ['#3F51B5', '#3F51B5']
                        }
                    },
                    shadowSize: 0 // Drawing is faster without shadows
                },
                grid: {
                    show: false,
                    borderWidth: 0,
                    minBorderMargin: 20,
                    labelMargin: 10
                },
                xaxis: {
                    tickFormatter: function() {
                        return '';
                    }
                },
                yaxis: {
                    min: 0,
                    max: 110
                },
                legend: {
                    show: true
                },
                colors: ['#3F51B5']
            };

            // Generate random data for realtime demo
            var data = [],
                totalPoints = 300;

            update();

            function getRandomData() {
                if (data.length > 0)
                    data = data.slice(1);
                // Do a random walk
                while (data.length < totalPoints) {
                    var prev = data.length > 0 ? data[data.length - 1] : 50,
                        y = prev + Math.random() * 10 - 5;
                    if (y < 0) {
                        y = 0;
                    } else if (y > 100) {
                        y = 100;
                    }
                    data.push(y);
                }
                // Zip the generated y values with the x values
                var res = [];
                for (var i = 0; i < data.length; ++i) {
                    res.push([i, data[i]]);
                }
                return [res];
            }

            function update() {
                vm.realTimeData = getRandomData();
                $timeout(update, 30);
            }
            // end random data generation

        }
    }
})();
