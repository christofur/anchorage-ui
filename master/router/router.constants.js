(function(){
    'use strict';

    angular
        .module('app.router')
        .constant('APP_REQUIRES', {
            'modernizr': {
                files: ['vendor/modernizr/modernizr.custom.js']
            }
        });

})();