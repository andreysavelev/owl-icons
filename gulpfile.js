const GULP = require('gulp');
const CSSO = require('postcss-CSSO');
const POSTCSS = require('gulp-postcss');
const CSSNEXT = require('postcss-cssnext');
const BROWSER_SYNC = require('browser-sync').create();

GULP.task('css', function() {
	let plugins = [
	    CSSNEXT({
	    	browsers: ['> 1%'], 
	    	cascade: false
	    }),
	    CSSO
    ];
  
  	return GULP.src('src/*.css')
		.pipe(POSTCSS(plugins))
		.pipe(GULP.dest('css'))
		.pipe(BROWSER_SYNC.stream());
});

// Static Server + watching css/html files
GULP.task('serve', ['css'], function() {

    BROWSER_SYNC.init({
        server: './example'
    });

    GULP.watch('src/*.css', ['css']);
    GULP.watch('example/*.html').on('change', BROWSER_SYNC.reload);
});
