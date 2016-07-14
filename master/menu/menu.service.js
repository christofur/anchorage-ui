(function () {

    angular
        .module('app.menu')
        .service('Menu', MenuService);

    function MenuService(){

        var vm = this;

        vm.getItems = getItems;
        vm.addItem = addItem;
        vm.menu = [];

        function getItems(){
            return vm.menu;
        }

        function addItem(item){
            validate(item);
            vm.menu.push(item);
        }

        function validate(item){
            if (!angular.isDefined(item))
                throw new Error('Menu item not defined.');
            if (!angular.isDefined(item.name))
                throw new Error('Menu item name not defined.');
            if (!angular.isDefined(item.order))
                item.order = 0; // order must exists
            // item ok
            return item;
        }

    }

})();