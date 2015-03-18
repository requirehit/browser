var pkg = require( '../../package' ),
    l = require( '../tools/logger' )( 'builder:global' ),
    Promise = require( 'bluebird' ),
    Util = require( 'findhit-util' ),
    fs = Promise.promisifyAll( require( 'fs' ) );

// -----------------------------------------------------------------------------

function builder ( options ) {
  return Promise.all([

    fs.readFileAsync( __dirname + '/' + '../../lib/global/class.js' ),
    fs.readFileAsync( __dirname + '/' + '../../lib/global/injector.js' ),

  ])
  .reduce(function ( entire, part ) {
    return entire + '\n' + part;
  })
  .tap(function () {
    //
    l( "built finished" );
    //
  });
}

builder.defaultOptions = {

};

module.exports = builder;
