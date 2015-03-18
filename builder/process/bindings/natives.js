var l = require( '../../tools/logger' )( 'bindings:natives' ),
    fs = require( 'fs' );

// -----------------------------------------------------------------------------

var nativesPath = __dirname +'/'+ '../../../lib/natives/';

// -----------------------------------------------------------------------------


//
l( "fetching natives" );
//
fs
.readdirSync( nativesPath )
.filter(function ( filename ) {
  return filename.substr( -3 ) === '.js';
})
.forEach(function ( filename ){
  var name = filename.substr( 0, filename.length - 3 );

  //
  l( "exporting "+ name );
  //

  // export natives as functions
  exports[ name ] = new Function( fs.readFileSync( nativesPath + filename ) );

});
