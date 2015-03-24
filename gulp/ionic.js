'use strict';

module.exports = function (gulp) {

    var browserSync = require('browser-sync');
    var sass        = require('gulp-sass');
    var reload      = browserSync.reload;

    var inject = require('gulp-inject');
    gulp.task('html-inject', function () {
        return gulp.src('app/*.html')
            .pipe(inject(gulp.src('app/js/**/*.js'), {
                read: false,
                ignorePath: 'app'
            }))
            .pipe(gulp.dest('.cache'))
            .pipe(reload({stream: true}));
    });

    gulp.task('web', ['html-inject','sass'] , function () {
        browserSync({
            server: {
                baseDir: [
                    '.cache',
                    'app'
                ]
            },
            startPath: '/',
            port: 5000,
            open:false
        });

        gulp.watch('app/scss/*.scss', ['sass']);
        gulp.watch(['app/js/**/*.js','app/**/*.html'],['html-inject']);
    });

    gulp.task('sass', function() {
        return gulp.src(['app/scss/*.scss'])
            .pipe(sass())
            .pipe(gulp.dest("app/css"))
            .pipe(reload({stream: true}));
    });
};
