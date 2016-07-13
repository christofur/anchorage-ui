//context: __dirname + "/app",
entry: [

    './core/core.module.js',
    './core/core.config.js',
    './core/core.route.js',

    './router/router.module.js',
    './router/router.constants.js',
    './router/router.config.js',
    './router/router.provider.js',

    './dashboard/dashboard.module.js',
    './dashboard/dashboard.controller.js',
    './dashboard/dashboard.route.js',

    './header/header.module.js',
    './header/header.controller.js',

    './settings/settings.module.js',
    './settings/settings.run.js',

    './app.module.js'
],
    module.exports = {
        output: {
            path: '../app/js',
            filename: "app.js"
        }
    };
