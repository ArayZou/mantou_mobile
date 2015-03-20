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
        server.listen({path: './nodejs/app.js'});
    });

    // restart server if app.js changed
    gulp.task('server:restart', function () {
        gulp.watch(['./nodejs/app.js', './nodejs/router.js', './nodejs/controllers/*.js', './nodejs/models/*.js', './nodejs/middlewares/*.js', './nodejs/views/*.hbs', './nodejs/views/partials/*.hbs'], server.restart);
    });
};

