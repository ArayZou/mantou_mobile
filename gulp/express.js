module.exports = function (gulp) {
    var gulp = gulp,
        server = require('gulp-develop-server'),
        plugins = require('gulp-load-plugins')();

    // 启动
    gulp.task('express', ['server', 'server:restart'], function () {
        console.log('express server start');
    });
    // start express server
    gulp.task('server', function () {
        server.listen({path: './express/app.js'});
    });

    // restart server if app.js changed
    gulp.task('server:restart', function () {
        gulp.watch(['./express/app.js', './express/router.js', './express/controllers/*.js', './express/models/*.js', './express/middlewares/*.js', './express/views/*.hbs', './express/views/partials/*.hbs'], server.restart);
    });
};

