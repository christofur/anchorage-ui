(function () {
    'use strict';

    angular.module('app.menu')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['Menu']


    function MenuController(Menu){

        var vm = this;

        activate();

        function activate(){
            vm.items = Menu.getItems();

            //Dummy code
            var menuItem = {
                name: 'Dashboard',
                sref: 'app.dashboard',
                order: 1,
                // iconclass: 'ion-radio-waves',
                imgpath: 'app/img/icons/radio-waves.svg'
            };

            Menu.addItem(menuItem);

        }



    }

})();