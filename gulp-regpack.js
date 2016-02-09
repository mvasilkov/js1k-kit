var regpack = require('RegPack');
var gutil = require('gulp-util');
var through = require('through2');    // npm install --save through2

module.exports = function(options) {
  return through.obj(function(file, encoding, callback) {
    var code = file.contents.toString(encoding);
    var compressed = regpack.cmdRegPack(code, options);
    file.contents = new Buffer(compressed, encoding);
    callback(null, file);
  });
};
