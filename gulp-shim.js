var gulputil = require("gulp-util");
var fs = require("fs");
var Vinyl = require("vinyl");
var through = require("through2");

module.exports = function(opts) {
	return through.obj(function(file, encoding, callback) {
		opts.file = file;
		opts.script = file.contents;
    var shimFile = new Vinyl({
      cwd: file.cwd,
      base: file.base,
      path: 'shim.html',
      contents: new Buffer(gulputil.template(fs.readFileSync(__dirname + "/shim.html"), opts))
    });

    this.push(shimFile);

		callback();
	});
};
