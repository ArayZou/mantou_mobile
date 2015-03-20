'use strict';

module.exports = function (gulp) {

    var browserSync = require('browser-sync');

    function browserSyncInit(baseDir, files, browser) {
        browser = browser === undefined ? 'default' : browser;

        browserSync.instance = browserSync.init(files, {
            notify: false,
            startPath: '/',
            server: {
                baseDir: baseDir
            },
            browser: browser,
            port: 5000
        });

    }

    gulp.task('ionic', function () {
        browserSyncInit([
            'app'
        ], [
            'app/*.html',
            'app/js/**/*.js',
            'app/css/**/*.css',
            'app/img/**/*'
        ]);
    });
};
