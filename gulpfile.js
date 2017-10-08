const gulp=require('gulp'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-clean-css'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    collector = require('gulp-rev-collector'),
    concat = require('gulp-concat');
var uglifyOptions = {
        mangle: {
            keep_fnames: true
        },
        compress: {
            sequences: 20,
            join_vars: true
        },
        ie8: true
    },
    cleanOptions = {
        compatibility: {
            properties: {
                ieFilters: true,
                merging: true
            },
            colors: {
                opacity: true
            },
            units: {
                rem: true,
                vw: true
            }
        },
        keepSpecialComments: '*'
    };
    
gulp.task('css', function() {
    return gulp.src('src/css/**/*.css')
        .pipe(changed('dist/css'))
        .pipe( cleancss(cleanOptions) )
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest('rev-css-manifest.json'))
        .pipe(gulp.dest('src/rev'));
});
gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(changed('dist/js'))
        .pipe(uglify(uglifyOptions))
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest('rev-js-manifest.json'))
        .pipe(gulp.dest('src/rev'));
});
gulp.task('rev', function() {
    return gulp.src(['src/rev/*.json', 'dist/pages/*.html'])
        .pipe( collector({
            replaceReved: true,
            dirReplacecements: {
                'css': 'dist/css/',
                'js': 'dist/css/'
            }
        }) )
        .pipe(gulp.dest('dist/pages'));
});
gulp.task('concat', function(){
    return gulp.src(['src/css/base.css', 'src/css/component/footer.css', 'src/css/component/header.css', 'src/css/component/nav.css', 'src/css/component/subheader.css', 'src/css/module/search.css'])
        .pipe( cleancss(cleanOptions) )
        .pipe( concat('search.css') )
        .pipe(rev())
        .pipe(gulp.dest('dist/css/module'))
        .pipe(rev.manifest('rev-css-manifest.json'))
        .pipe(gulp.dest('src/rev'));
});


// 压缩图片
const imagemin = require('imagemin'),
    imageminJpegtran = require('imagemin-jpegtran')({
        progressive: true
    }),
    imageminPngquant = require('imagemin-pngquant')({
        quality: '75',
        posterize: 8
    });

gulp.task('imagemin', function() {
    gulp.src('src/image/*.{png,jpg}')
        .pipe(cache(imagemin({
            use: [imageminJpegtran, imageminPngquant]
        })))
        .pipe(gulp.dest('dist/image'));
});