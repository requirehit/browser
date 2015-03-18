var Util = require( 'findhit-util' ),
    path = require( 'path' ),
    Promise = require( 'bluebird' ),

    Logger = require( './tools/logger' ),

    l = Logger( 'builder' );

// -----------------------------------------------------------------------------


/**
 * Logger
 *
 * this metod is exposed so other builders could use it easily
 */
exports.Logger = Logger;


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

  // Prepare options
  options = Util.is.Object( options ) && options || {};
  options.__proto__ = exports.build.defaultOptions;

  var builders = Util.extend( {},
    Builders,
    Util.is.Object( options.Builders ) && options.Builders || {}
  );

  //
  l( "Building..." );
  //

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


/**
 * Default options for .build method
 */
exports.build.defaultOptions = {

  /**
   * Add builders to build process, needed to inject adapter's builders
   */
  Builders: undefined,

};
