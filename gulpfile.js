var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');
    //concatCss = require('gulp-concat-css');

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

/*gulp.task('concatCss', function () {
    return gulp.src(['app/css/!**!/!*.css', '!app/css/style.min.css', '!app/css/style.css'])
        .pipe(concatCss("concat.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css/allStylesInOne'))
});*/

gulp.task('liveReload', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    })
});

gulp.task('default', ['liveReload', 'sass'], function () {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/css/**/*.css')
});

