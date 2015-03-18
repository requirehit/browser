var global = require( 'global' );

// -----------------------------------------------------------------------------

global.console =
module.exports =
  global.console ||
  (function () {
    throw new Error( "We need to implement a console here!!" );
  })();
