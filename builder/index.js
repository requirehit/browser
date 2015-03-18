var Util = require( 'findhit-util' ),
    path = require( 'path' ),
    Promise = require( 'bluebird' ),

    l = require( './tools/logger' )( 'builder' );

// -----------------------------------------------------------------------------


/**
 * Builders
 *
 * this object is exposed so requirehit or your app can introduce your own
 * builders
 */
var Builders = exports.Builders = {};

Builders.global = require( './global' );
Builders.process = require( './process' );


/**
 * builder.build - concats builders calls
 *
 * @param  {object} options object with options per builder
 * @return {string}         built script
 */
exports.build = function ( options ) {

  //
  l( "Building..." );
  //

  // Prepare options
  options = Util.is.Object( options ) && options || {};

  return Promise
  .cast( Object.keys( Builders ) )
  .map(function ( name ) {
    var builder = Builders[ name ];

    var bo = Util.is.Object( options[ name ] ) && options[ name ] || {};
    bo.__proto__ = builder.defaultOptions || {};

    //
    l( "Calling builder "+ name );
    //

    return builder( bo );
  })
  .tap(function () {
    //
    l( "Reducing builds into a single one" );
    //
  })
  .reduce(function ( entire, part ) {
    return entire + part;
  })
  .then(function ( entire ) {
    //
    l( "Wrapping built" );
    //

    return '"use strict"; (function ( __global__ ) {\n'+ entire +'\n})( window || global || this );';
  });
};
