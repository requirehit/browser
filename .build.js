var builder = require( './builder' ),
    Promise = require( 'bluebird' ),
    fs = Promise.promisifyAll( require( 'fs' ) );

// -----------------------------------------------------------------------------

builder.build()
.then(function ( content ) {
  fs.writeFileSync( './dist.js', content );
});
