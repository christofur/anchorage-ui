/*!
 *
 * Anchorage-UI
 *
 */

// APP START
// -----------------------------------

(function() {
    'use strict';

    angular
        .module('anchorage', [
            'app.core',
            'app.router',
            'app.dashboard',
            'app.realtime',
            'app.header',
            'app.settings',
            'app.menu'
        ]);

})();

