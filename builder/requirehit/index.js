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
    "var main = '"+ options.main +"';",
    "var files = "+ jsStringifier( options.files ) +";",
    fs.readFileAsync( __dirname + '/' + '../../lib/requirehit/fs-populator.js' ),
    fs.readFileAsync( __dirname + '/' + '../../lib/requirehit/main-module-loader.js' ),
  ])
  .reduce(function ( entire, part ) {
    return entire + '\n' + part;
  });
}

module.exports = builder;
