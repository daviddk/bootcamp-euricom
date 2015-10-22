var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gp_concat = require('gulp-concat'),
    gp_uglify = require('gulp-uglify');


gulp.task('connect', function () {
  nodemon({
    script: 'server/server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('concat', function(){
    return gulp.src('./app/scripts/**/*.js')
        .pipe(gp_concat('concat.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./app/dist'));
});

gulp.task('serve', ['connect']);
