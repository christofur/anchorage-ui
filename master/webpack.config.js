module.exports = {
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

        './app.module.js'
    ],
    output: {
        path: '../app/js',
        filename: "app.js"
    }
};