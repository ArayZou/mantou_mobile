'use strict';

module.exports = function (gulp) {

    var browserSync = require('browser-sync');

    var inject = require('gulp-inject');
    gulp.task('html-inject', function () {
        return gulp.src('app/*.html')
            .pipe(inject(gulp.src('app/js/**/*.js'), {
                read: false,
                ignorePath: 'app'
            }))
            .pipe(gulp.dest('.cache'));
    });

    gulp.task('web', ['html-inject'] , function () {
        browserSync({
            server: {
                baseDir: [
                    '.cache',
                    'app'
                ]
            },
            startPath: '/',
            port: 5000
        });

        gulp.watch("app/js/**/*.js");
    });
};
