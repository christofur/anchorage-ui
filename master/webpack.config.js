module.exports = {
    //context: __dirname + "/app",
    entry: [

        './router/router.module.js',
        './router/router.constants.js',
        './router/router.config.js',
        './router/router.provider.js',

        './core/core.module.js',
        './core/core.config.js',
        './core/core.route.js',

        './dashboard/dashboard.module.js',
        './dashboard/dashboard.controller.js',
        './dashboard/dashboard.route.js',

        './header/header.module.js',
        './header/header.controller.js',

        './settings/settings.module.js',
        './settings/settings.run.js',

        './sidebar/sidebar.module.js',
        './sidebar/sidebar.directive.js',
        './sidebar/sidebar.run.js',

        './menu/menu.module.js',
        './menu/menu.controller.js',
        './menu/menu.service.js',

        './app.module.js'
    ],
    output: {
        path: '../app/js',
        filename: "app.js"
    }
};