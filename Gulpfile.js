var gulp = require('gulp');
var closureCompiler = require('gulp-closure-compiler');
var browserSync = require('browser-sync').create();

var regpack = require('./gulp-regpack');
var shim = require('./gulp-shim');

gulp.task('compress', function() {
  var canvas = true;
  var webgl = false;
  var audio = false

  return gulp.src('input.js')
    .pipe(closureCompiler({
      compilerPath: 'bower_components/closure-compiler/compiler.jar',
      fileName: 'build.js',
      compilerFlags:{
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
      }
    }))
    .pipe(regpack({
  		withMath: false,
  		hash2DContext: !webgl,
  		hashWebGLContext: webgl,
  		hashAudioContext: audio,
  		contextVariableName: 'c',
  		contextType: webgl ? 1 : 0,
  		reassignVars: true,
  		varsNotReassigned: ['a', 'b', 'c', 'd', 'g'],
  		crushGainFactor: 1,
  		crushLengthFactor: 0,
  		crushCopiesFactor: 0,
  		crushTiebreakerFactor: 1,
  		wrapInSetInterval: false,
  		timeVariableName: ""
		}))
    .pipe(shim({
      canvas_shim: canvas,
      webgl: webgl,
      max_width: 0,
      max_height: 0,
      max_100p: true,
      center_canvas: false,
      reload_onorientationchange: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('js-watch', ['compress'], function(cb){
  browserSync.reload();
  cb();
});

gulp.task('serve', ['compress'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "shim.html"
        }
    });
    gulp.watch("input.js", ['js-watch']);
});

gulp.task('default', ['compress']);
