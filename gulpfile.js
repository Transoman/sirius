var syntax        = 'scss'; // Syntax: sass or scss;

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browsersync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		rsync         = require('gulp-rsync'),
		svgstore      = require('gulp-svgstore'),
		svgmin        = require('gulp-svgmin'),
		cheerio       = require('gulp-cheerio'),
		rename        = require('gulp-rename'),
		plumber       = require('gulp-plumber');
		gulpCopy 	  = require('gulp-copy');

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: 'built'
		},
		notify: false,
		// open: false,
		// tunnel: true,
		// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	// return gulp.src('src/'+syntax+'/**/*.'+syntax+'')
	return gulp.src('src/scss/main.scss')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('built/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('js', function() {
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js',
		'src/libs/jquery/jquery.popupoverlay.js',
		'src/libs/slick/slick.min.js',
		// 'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		'src/libs/jquery-popup-overlay/jquery.popupoverlay.js',
		'src/libs/jquery-mask-plugin/dist/jquery.mask.min.js',
		'src/libs/jquery-validation/dist/jquery.validate.min.js',
    'src/libs/fancybox/jquery.fancybox.js',
		'src/js/common.js' // Always at the end
		])
	.pipe(plumber())
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('built/js'))
	.pipe(browsersync.reload({ stream: true }))
});


gulp.task('copy-webfonts', function () {
    return gulp.src([
        'src/libs/fontawesome/webfonts/*.*',
        'src/fonts/*.*'

    ])
        .pipe(gulp.dest('built/webfonts/'));
});

/*gulp.task('rsync', function() {
	return gulp.src('app/!**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**!/Thumbs.db', '**!/!*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});*/

gulp.task('watch', ['styles', 'js', 'browser-sync'], function() {
	gulp.watch('src/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['src/js/**/*.js'], ['js']);
	gulp.watch('built/*.html', browsersync.reload)
});

//--------------------------------svg-sprite-----------------------------
/*gulp.task('symbols', function() {
  return gulp.src('app/img/icon/!*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(cheerio({
      run: function($) {
        $('[fill]').removeAttr('fill');
        $('[style]').removeAttr('style');
        $('[class]').removeAttr('class');
        $('title').remove();
        $('defs').remove();
        $('style').remove();
        $('svg').attr('style', 'display:none');
      }
    }))
    .pipe(rename('symbols.html'))
    .pipe(gulp.dest('app/img'));
});*/

gulp.task('default', ['watch']);
