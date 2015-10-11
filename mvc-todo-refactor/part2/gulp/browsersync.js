var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(global.paths.sass, ['sass']);
    gulp.watch(global.paths.js).on('change', browserSync.reload);
    gulp.watch(global.paths.html).on('change', browserSync.reload);
});

gulp.task('browser-sync-build', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(global.paths.sass, ['sass']);
    gulp.watch(global.paths.html).on('change', browserSync.reload);
});

gulp.task('sass', function() {
    gulp.src(global.paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(global.paths.css))
        .pipe(browserSync.stream());
});
