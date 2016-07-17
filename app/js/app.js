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
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	module.exports = __webpack_require__(29);


/***/ },
/* 1 */
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
/* 2 */
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
/* 3 */
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
/* 4 */
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
	            defaultRoute: 'app/'
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
/* 5 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular
	        .module('app.core', [
	            'app.router',
	            'ngRoute',
	            'ui.bootstrap'
	        ]);

	})();

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular
	        .module('app.core')
	        .run(coreRoute);

	    coreRoute.$inject = ['Router'];

	    function coreRoute(Router){

	        Router.state('app', {
	            url: '/app/',
	            abstract: false,
	            templateUrl: 'core.layout.html'
	        });
	    }
	})();

/***/ },
/* 8 */
/***/ function(module, exports) {

	(function() {
	    'use strict';

	    angular
	        .module('app.colors', []);

	})();


/***/ },
/* 9 */
/***/ function(module, exports) {

	(function() {
	    'use strict';

	    angular
	        .module('app.colors')
	        .constant('APP_COLORS', {
	            'gray-darker':            '#263238',
	            'gray-dark':              '#455A64',
	            'gray':                   '#607D8B',
	            'gray-light':             '#90A4AE',
	            'gray-lighter':           '#ECEFF1',

	            'primary':                '#448AFF',
	            'success':                '#4CAF50',
	            'info':                   '#03A9F4',
	            'warning':                '#FFB300',
	            'danger':                 '#F44336'
	        })
	        ;
	})();


/***/ },
/* 10 */
/***/ function(module, exports) {

	(function() {
	    'use strict';

	    angular
	        .module('app.core')
	        .run(colorsRun);

	    colorsRun.$inject = ['$rootScope', 'Colors'];

	    function colorsRun($rootScope, Colors) {

	        // Allows to use branding color with interpolation
	        // <tag attribute="{{ colorByName('primary') }}" />
	        $rootScope.colorByName = Colors.byName;

	    }

	})();


/***/ },
/* 11 */
/***/ function(module, exports) {

	(function() {
	    'use strict';

	    angular
	        .module('app.colors')
	        .service('Colors', Colors);

	    Colors.$inject = ['APP_COLORS'];

	    function Colors(APP_COLORS) {
	        this.byName = byName;

	        ////////////////

	        function byName(name) {
	            var color = APP_COLORS[name];
	            if (!color && materialColors) {
	                var c = name.split('-'); // red-500, blue-a100, deepPurple-500, etc
	                if (c.length)
	                    color = (materialColors[c[0]] || {})[c[1]];
	            }
	            return (color || '#fff');
	        }
	    }

	})();


/***/ },
/* 12 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular
	        .module('app.dashboard', []);
	})();

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular
	        .module('app.dashboard')
	        .run(dashboardRoute);

	    dashboardRoute.$inject = ['Router'];

	    function dashboardRoute(Router){

	        Router.state('app.dashboard', {
	            url: 'dashboard/',
	            title: 'Dashboard',
	            templateUrl: 'dashboard.html'
	        });
	    }
	})();

/***/ },
/* 15 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular
	        .module('app.realtime', [
	            'ngResource',
	            'app.colors',
	            'angular-flot'
	        ]);
	})();

/***/ },
/* 16 */
/***/ function(module, exports) {

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


/***/ },
/* 17 */
/***/ function(module, exports) {

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


/***/ },
/* 18 */
/***/ function(module, exports) {

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

/***/ },
/* 19 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular.module('app.header',
	        []);

	})();

/***/ },
/* 20 */
/***/ function(module, exports) {

	(function() {
	    'use strict';

	    angular
	        .module('app.header')
	        .controller('HeaderController', HeaderController)
	        .controller('HeaderModalController', HeaderModalController)
	        .controller('HeaderModalSearchController', HeaderModalSearchController);

	    HeaderController.$inject = ['$uibModal'];

	    function HeaderController($uibModal) {
	        var vm = this;

	        activate();

	        ////////////////

	        function activate() {
	            // Header Search
	            vm.openModalSearch = function() {

	                var modalSearchInstance = $uibModal.open({
	                    animation: true,
	                    templateUrl: 'app/views/header-search.html',
	                    controller: 'HeaderModalSearchController as mod',
	                    // position via css class
	                    windowClass: 'modal-top',
	                    backdropClass: 'modal-backdrop-soft',
	                    // sent data to the modal instance (injectable into controller)
	                    resolve: {
	                        data: function() {
	                            return {
	                                title: 'Search'
	                            };
	                        }
	                    }
	                });

	                modalSearchInstance.result.then(function( /*data*/ ) {
	                    // use data from modal here
	                }, function() {
	                    // Modal dismissed
	                });
	            };

	            // Settings panel (right sidebar)
	            vm.openModalBar = function() {

	                var modalBarInstance = $uibModal.open({
	                    animation: true,
	                    templateUrl: 'app/views/settings.html',
	                    controller: 'HeaderModalController as mod',
	                    // position via css class
	                    windowClass: 'modal-right',
	                    backdropClass: 'modal-backdrop-soft',
	                    // sent data to the modal instance (injectable into controller)
	                    resolve: {
	                        data: function() {
	                            return {
	                                title: 'Settings'
	                            };
	                        }
	                    }
	                });

	                modalBarInstance.result.then(function( /*data*/ ) {
	                    // use data from modal here
	                }, function() {
	                    // Modal dismissed
	                });
	            };

	        }
	    }

	    HeaderModalController.$inject = ['$uibModalInstance', 'data'];

	    function HeaderModalController($uibModalInstance, data) {
	        var vm = this;

	        activate();

	        ////////////////

	        function activate() {

	            vm.modalTitle = data.title;

	            vm.close = function() {
	                $uibModalInstance.close( /* data for promise*/ );
	            };

	            vm.cancel = function() {
	                $uibModalInstance.dismiss('cancel');
	            };
	        }
	    }

	    HeaderModalSearchController.$inject = ['$uibModalInstance', '$timeout', 'data'];

	    function HeaderModalSearchController($uibModalInstance, $timeout, data) {
	        var vm = this;

	        activate();

	        ////////////////

	        function activate() {

	            vm.modalTitle = data.title;

	            // input autofocus
	            $timeout(function() {
	                document.querySelector('.header-input-search').focus();
	            }, 300);

	            vm.close = function() {
	                $uibModalInstance.close( /* data for promise*/ );
	            };

	            vm.cancel = function() {
	                $uibModalInstance.dismiss('cancel');
	            };
	        }
	    }

	})();


/***/ },
/* 21 */
/***/ function(module, exports) {

	(function(){
	    'use strict';

	    angular.module('app.settings',
	        []);
	})();

/***/ },
/* 22 */
/***/ function(module, exports) {

	(function() {
	    'use strict';

	    angular
	        .module('app.settings')
	        .run(settingsRun);

	    settingsRun.$inject = ['$rootScope'];

	    function settingsRun($rootScope) {

	        var themes = [
	            'theme-1',
	            'theme-2',
	            'theme-3',
	            'theme-4',
	            'theme-5',
	            'theme-6',
	            'theme-7',
	            'theme-8',
	            'theme-9',
	        ]

	        // Global Settings
	        // -----------------------------------
	        $rootScope.app = {
	            name: 'Anchorage',
	            description: 'Umbraco Dashboard',
	            year: ((new Date()).getFullYear()),
	            layout: {
	                rtl: false
	            },
	            sidebar: {
	                over: false,
	                showheader: true,
	                showtoolbar: true,
	                offcanvas: false
	            },
	            header: {
	                menulink: 'menu-link-slide'
	            },
	            footerHidden: false,
	            viewAnimation: 'ng-fadeInLeftShort',
	            theme: themes[0],
	            currentTheme: 0
	        };

	        $rootScope.themes = themes;

	    }

	})();

/***/ },
/* 23 */
/***/ function(module, exports) {

	(function () {
	    'use strict';

	    angular
	        .module('app.sidebar', []);
	})();

/***/ },
/* 24 */
/***/ function(module, exports) {

	(function () {
	    'use strict';


	    angular.module('app.sidebar')
	        .directive('sidebarNav', sidebarNav);

	    sidebarNav.$inject = [];

	    function sidebarNav() {
	        return {
	            restrict: 'EAC',
	            link: link
	        };

	        function link(scope, element) {

	            element.on('click', function(event) {
	                var item = getItemElement(event);
	                // check click is on a tag
	                if (!item) return;

	                var ele = angular.element(item),
	                    liparent = ele.parent()[0];

	                var lis = ele.parent().parent().children(); // markup: ul > li > a
	                // remove .active from childs
	                lis.find('li').removeClass('active');
	                // remove .active from siblings ()
	                angular.forEach(lis, function(li) {
	                    if (li !== liparent)
	                        angular.element(li).removeClass('active');
	                });

	                var next = ele.next();
	                if (next.length && next[0].tagName === 'UL') {
	                    ele.parent().toggleClass('active');
	                    event.preventDefault();
	                }
	            });

	        }

	        // find the a element in click context
	        // doesn't check deeply, asumens two levels only
	        function getItemElement(event) {
	            var element = event.target,
	                parent = element.parentNode;
	            if (element.tagName.toLowerCase() === 'a') return element;
	            if (parent.tagName.toLowerCase() === 'a') return parent;
	            if (parent.parentNode.tagName.toLowerCase() === 'a') return parent.parentNode;
	        }
	    }

	})();

/***/ },
/* 25 */
/***/ function(module, exports) {

	(function () {

	    angular
	        .module('app.sidebar')
	        .run(sidebarRun);

	    sidebarRun.$inject = ['$rootScope', '$window', '$document', '$timeout', 'APP_MEDIAQUERY'];

	    function sidebarRun($rootScope, $window, $document, $timeout, APP_MEDIAQUERY) {
	        // Sidebar API for mobile
	        $rootScope.toggleSidebar = toggleSidebarState;
	        $rootScope.closeSidebar = function() {
	            toggleSidebarState(false);
	        };
	        $rootScope.openSidebar = function() {
	            toggleSidebarState(true);
	        };

	        // Sidebar offcanvas API for desktops
	        $rootScope.toggleSidebarOffcanvasVisible = function(state) {
	            $rootScope.sidebarOffcanvasVisible = angular.isDefined(state) ? state : !$rootScope.sidebarOffcanvasVisible;
	        };

	        // ESC key close sidebar
	        $document.on('keyup',function(e) {
	            if (e.keyCode == 27) {
	                $timeout(function() {
	                    $rootScope.toggleSidebarOffcanvasVisible(false);
	                });
	            }
	        });

	        // Considerations for different APP states

	        // on mobiles, sidebar starts off-screen
	        if (isMobileScreen()) $timeout(function() {
	            toggleSidebarState(false);
	        });

	        // hide sidebar when open a new view
	        $rootScope.$on('$stateChangeStart', function() {
	            if (isMobileScreen())
	                toggleSidebarState(false);
	            // Always hide offscreen sidebar when route change
	            else
	                $rootScope.toggleSidebarOffcanvasVisible(false);
	        });

	        // remove desktop offcanvas when app changes to mobile
	        // so when it returns, the sidebar is shown again
	        $window.addEventListener('resize', function() {
	            if (isMobileScreen())
	                $rootScope.toggleSidebarOffcanvasVisible(false);
	        });

	        ///////

	        function toggleSidebarState(state) {
	            //  state === true -> open
	            //  state === false -> close
	            //  state === undefined -> toggle
	            $rootScope.sidebarVisible = angular.isDefined(state) ? state : !$rootScope.sidebarVisible;
	        }

	        function isMobileScreen() {
	            return $window.innerWidth < APP_MEDIAQUERY.desktop;
	        }
	    }

	})();

/***/ },
/* 26 */
/***/ function(module, exports) {

	(function () {
	    'use strict';

	    angular.module('app.menu',
	        []);
	})();

/***/ },
/* 27 */
/***/ function(module, exports) {

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
	            Menu.addItem({
	                name: 'Dashboard',
	                sref: 'app.dashboard',
	                order: 1,
	                // iconclass: 'ion-radio-waves',
	                imgpath: 'app/img/icons/radio-waves.svg'
	            });

	            Menu.addItem({
	                name: 'Realtime Updates',
	                sref: 'app.realtime',
	                order: 2,
	                // iconclass: 'ion-radio-waves',
	                imgpath: 'app/img/icons/radio-waves.svg'
	            });

	        }



	    }

	})();

/***/ },
/* 28 */
/***/ function(module, exports) {

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

/***/ },
/* 29 */
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
	            'app.router',
	            'app.dashboard',
	            'app.realtime',
	            'app.header',
	            'app.settings',
	            'app.menu'
	        ]);

	})();



/***/ }
/******/ ]);