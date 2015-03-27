module.exports = function (gulp) {

    var gulp = gulp;
    var browserSync = require('browser-sync');
    var sass        = require('gulp-sass');
    var nodemon = require('gulp-nodemon');
    var inject = require('gulp-inject');

    gulp.task('html-inject', function () {
        return gulp.src('app/views/index.html')
            .pipe(inject(gulp.src('app/views/js/**/*.js'), {
                read: false,
                ignorePath: 'app'
            }))
            .pipe(gulp.dest('app/public'))
    });

    gulp.task('app', ['html-inject','sass','nodemon'] , function () {
        browserSync({
            port: 5000,
            open:false,
            proxy: "http://localhost:3000",
            files: ["app/**"]
        });

        gulp.watch('app/views/scss/*.scss', ['sass']);
    });

    gulp.task('nodemon', function (cb) {
        return nodemon({
            script: 'app/app.js'
        }).on('start', function () {
            cb();
        });
    });

    gulp.task('sass', function() {
        return gulp.src(['app/views/scss/*.scss'])
            .pipe(sass())
            .pipe(gulp.dest("app/views/css"))
    });
};

