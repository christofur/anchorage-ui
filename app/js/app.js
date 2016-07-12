/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	module.exports = __webpack_require__(11);


/***/ },
/* 1 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular
	        .module('app.core', [
	            'app.router',
	            'ngRoute'
	        ]);

	})();

/***/ },
/* 2 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular
	        .module('app.core')
	        .config(coreConfig);

	    coreConfig.$inject = ['$controllerProvider','$compileProvider','$filterProvider','$provide'];

	    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide){
	        var core = angular.module('app.core');

	        //register components

	        core.controller = $controllerProvider.register;
	        core.directive = $compileProvider.directive;
	        core.filter = $filterProvider.register;
	        core.factory = $provide.factory;
	        core.service = $provide.service;
	        core.constant = $provide.constant;
	        core.value = $provide.value;
	    }

	})();

/***/ },
/* 3 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular
	        .module('app.core')
	        .run(coreRoute);

	    coreRoute.$inject = ['Router'];

	    function coreRoute(Router){
	        Router.state('app', {
	            url: '/app',
	            abstract: true,
	            templateUrl: 'core.layout.html'
	        });
	    }
	})();

/***/ },
/* 4 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular
	        .module('app.router', [
	            'ui.router',
	            'oc.lazyLoad'
	        ]);

	})();

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ },
/* 6 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular
	        .module('app.router')
	        .config(routerConfig);

	    routerConfig.$inject = ['$ocLazyLoadProvider','APP_REQUIRES'];

	    function routerConfig($ocLazyLoadProvider, APP_REQUIRES){

	        $ocLazyLoadProvider.config({
	            debug: false,
	            events: true,
	            modules: APP_REQUIRES.modules
	        });

	    }

	})();

/***/ },
/* 7 */
/***/ function(module, exports) {

	(function() {
	    'use strict';

	    angular
	        .module('app.router')
	        .provider('Router', RouterProvider);

	    RouterProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

	    function RouterProvider($locationProvider, $stateProvider, $urlRouterProvider) {


	        var config = {
	            // The paths where html template resides
	            viewsBasePath: 'app/views/',
	            // Automatically prepend views path to all templatesUrl?
	            useViewsBasePath: true,
	            // Set the following to true to enable the HTML5 Mode
	            // You may have to set <base> tag in index and a routing configuration in your server
	            html5Mode: false,
	            // defaults to dashboard
	            defaultRoute: 'dashboard'
	        };

	        // public access to change configuration
	        this.configure = function(cfg) {
	            angular.extend(config, cfg);
	        };


	        $locationProvider.html5Mode(config.html5Mode);

	        $urlRouterProvider.otherwise(config.defaultRoute);

	        this.$get = Router;

	        Router.$inject = ['$rootScope', '$state', '$stateParams', 'APP_REQUIRES'];

	        function Router($rootScope, $state, $stateParams, APP_REQUIRES) {
	            /* jshint validthis:true */




	            var service = {
	                // service access level
	                viewpath: viewpath,
	                resolveFor: resolveFor,
	                state: state,
	                getStates: getStates
	            };

	            init();

	            return service;

	            ///////

	            // wrapper for $stateProvider to simply routes creation
	            function state(name, options) {

	                if (!name) throw new Error('Route name not defined.');

	                if (options.require) {
	                    var require = this.resolveFor.apply(this, options.require);
	                    options.resolve = angular.extend({}, options.resolve, require);
	                }
	                if (options.templateUrl && config.useViewsBasePath)
	                    options.templateUrl = this.viewpath(options.templateUrl);

	                console.info(name);
	                console.info(options);
	                $stateProvider.state(name, options);

	                // allow chain execution
	                return this;
	            }

	            // Set here the base of the
	            // relative path for all views
	            function viewpath(uri) {
	                return config.viewsBasePath + uri;
	            }

	            // Generates a resolve object by passing script names
	            // previously configured in constant.APP_REQUIRES
	            function resolveFor() {
	                var _args = arguments;
	                return {
	                    __deps: ['$ocLazyLoad', '$q', function($ocLL, $q) {
	                        // Creates a promise chain for each argument
	                        var promiseChain = $q.when(1); // empty promise
	                        for (var i = 0, len = _args.length; i < len; i++) {
	                            promiseChain = andThen(_args[i]);
	                        }
	                        return promiseChain;

	                        // creates promise to chain dynamically
	                        function andThen(mod) {
	                            // support a function that returns a promise
	                            if (typeof mod === 'function')
	                                return promiseChain.then(mod);
	                            else {
	                                return promiseChain.then(function() {
	                                    // check if module is defined
	                                    if (!APP_REQUIRES[mod])
	                                        throw new Error('Route resolve: Bad resource name [' + mod + ']');
	                                    // finally, return the load promise
	                                    return $ocLL.load(APP_REQUIRES[mod]);
	                                });
	                            }
	                        }

	                    }]
	                };
	            } // resolveFor

	            function getStates() {
	                return $state.get();
	            }

	            function init() {

	                // Set reference to access them from any scope
	                $rootScope.$state = $state;
	                $rootScope.$stateParams = $stateParams;

	                // auto update document title
	                $rootScope.$on('$stateChangeSuccess',
	                    function(event, toState /*, toParams, fromState, fromParams*/ ) {
	                        // Autoscroll to top
	                        scrollTopMainView();
	                        // Update document title
	                        var title = (toState.title || '');
	                        $rootScope.documentTitle = title; // data bind to <title>
	                    }
	                );
	                // on state not found log to console
	                $rootScope.$on('$stateNotFound',
	                    function(event, unfoundState /*, fromState, fromParams*/ ) {
	                        console.log('State not found: ' + unfoundState.to + unfoundState.toParams + unfoundState.options);
	                    });
	                // on error log to console
	                $rootScope.$on('$stateChangeError',
	                    function(event, toState, toParams, fromState, fromParams, error) {
	                        console.log(error);
	                    });

	            }

	            function scrollTopMainView() {
	                // There must not be more than one <main> element in a document. (http://www.w3schools.com/tags/tag_main.asp)
	                var main = document.querySelector('main');
	                if(main) main.scrollTop = 0;
	            }
	        }
	    }
	})();


/***/ },
/* 8 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular
	        .module('app.dashboard', [
	            'app.router'
	        ]);
	})();

/***/ },
/* 9 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular
	        .module('app.dashboard')
	        .controller('DashboardController', DashboardController);

	    DashboardController.$inject = ['$scope']

	    function DashboardController($scope){
	        var vm = this;
	    }

	})();

/***/ },
/* 10 */
/***/ function(module, exports) {

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

/***/ },
/* 11 */
/***/ function(module, exports) {

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
	            'app.router'
	        ]);

	/*    angular
	        .module('anchorage')
	        .config(function($stateProvider){

	            $stateProvider
	                .state('route1', {
	                    url: "/dashboard",
	                    templateUrl: "app/views/dashboard.html"
	                });
	        })*/

	})();



/***/ }
/******/ ]);