var pkg = require( '../../package' ),
    l = require( '../tools/logger' )( 'builder:process' ),
    jsStringifier = require( '../tools/js-stringifier' ),
    Promise = require( 'bluebird' ),
    Util = require( 'findhit-util' ),
    fs = Promise.promisifyAll( require( 'fs' ) );

// -----------------------------------------------------------------------------

function builder ( options ) {

  if ( Util.isnt.String( options.main ) || ! options.main ) {
    throw new TypeError( "please provide a main file" );
  }

  if ( Util.isnt.Object( options.files ) ) {
    throw new TypeError( "please provide an object with files" );
  }

  return Promise.all([
    "var files = "+ jsStringifier( options.files ) +";",
    "Object.keys( files ).forEach(function ( file ) { NativeModule.require( 'fs' ).writeFileSync( file, files[ file ] ); });",
    "NativeModule.require( 'module' )._load( '"+ options.main +"', null, true );"
  ])
  .reduce(function ( entire, part ) {
    return entire + '\n' + part;
  });
}

module.exports = builder;
