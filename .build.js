var builder = require( './builder' ),
    Promise = require( 'bluebird' ),
    UglifyJS = require( 'uglify-js' ),
    fs = Promise.promisifyAll( require( 'fs' ) );

// -----------------------------------------------------------------------------

builder.build({
  requirehit: {
    main: '/index.js',
    files: {
      '/index.js': 'exports.test = "lola"; console.log(exports);',
    }
  },
})
.then(function ( code ) {
  fs.writeFileSync( './dist.js', code );
/*
  var minified = UglifyJS.minify( code, {
    fromString: true,
    compress: true,
  });
*/
  //fs.writeFileSync( './dist.min.js', minified.code );

  fs.writeFileSync( './dist.html', '<script src="dist.js"></script>' );
  //fs.writeFileSync( './dist.min.html', '<script src="dist.min.js"></script>' );

});
