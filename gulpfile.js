var gulp = require('gulp'),
    rename = require('gulp-rename'), // Renommage des fichiers
    cssnano = require('gulp-cssnano'), // Minification des CSS
    concatCss = require('gulp-concat-css'), // css concat
    order = require('gulp-sort'),
    concatJs = require('gulp-concat'), // js concat et remplacement link in html
    uglify = require('gulp-uglify'),
    // postcss    = require('gulp-postcss'),
    htmlreplace = require('gulp-html-replace'),
    imageMin = require('gulp-imagemin'),
    gulpsync = require('gulp-sync')(gulp);

// CSS
gulp.task('css', function() {
    return gulp.src('./css/*.css')
        .pipe(order())
        .pipe(concatCss('style.css'))
        .pipe(gulp.dest('./css/minified_css'));
});

gulp.task('css2', function() {
    return gulp.src('./css/minified_css/style.css')
        .pipe(cssnano({ discardComments: { removeAll: true } }, { discardDuplicates: true }, { mergeRules: true }, { minifyGradients: true }, { minifySelectors: true }, { minifyFontValues: true }, { uniqueSelectors: true }, { mergeLonghand: true }, { reduceTransforms: true }, { safe: true }))
        .pipe(gulp.dest('./build/css'));
});

// JS
gulp.task('js', function() {
    return gulp.src(['./js/bootstrap.min.js', './js/countdown.js', './js/functions.js'])
        .pipe(uglify())
        .pipe(concatJs('funk.js'))
        .pipe(gulp.dest('./build/js'))
});


//HTML
gulp.task('html', function() {
    gulp.src('./index.html')
        .pipe(htmlreplace({
            'funkjs': 'js/funk.js',
            'css': 'css/style.css'
        }))
        .pipe(gulp.dest('./build'));
});
// gulp.task('html', function() {
// gulp.src('./404.html')
// .pipe(gulp.dest('./dist'));
// });

// ressources
gulp.task('ressources', function() {
    return gulp.src('./ressources/*.*')
        .pipe(gulp.dest('./dist/ressources'));
});

//FONTS
gulp.task('fonts', function() {
    return gulp.src('./fonts/*.*')
        .pipe(gulp.dest('./dist/fonts'));
});

// "img" = Images optimisées
gulp.task('img', function() {
    return gulp.src(['./images/*.{png,jpg,jpeg,gif,svg}', './images/**/*.{png,jpg,jpeg,gif,svg}'], { base: './' })
        .pipe(imageMin())
        .pipe(gulp.dest('./dist'));
});

//PHP
gulp.task('php', function() {
    return gulp.src('./sendemail.php')
        .pipe(gulp.dest('./dist'));
});

// "prod"
gulp.task('prod', gulpsync.sync(['css', 'css2', 'js', 'js2', 'js3', 'ressources', 'fonts', 'php', 'img']));

// Tâche "watch"
gulp.task('watch', function() {
    gulp.watch('./css/*.css', ['css']);
    gulp.watch('./js/*.js', ['js']);
    gulp.watch('./images/*.{png,jpg,jpeg,gif,svg}', ['img']);

});