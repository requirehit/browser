var pkg = require( '../../package' ),
    l = require( '../tools/logger' )( 'builder:process' ),
    jsStringifier = require( '../tools/js-stringifier' ),
    Promise = require( 'bluebird' ),
    Util = require( 'findhit-util' ),
    fs = Promise.promisifyAll( require( 'fs' ) ),
    bindings = require( './bindings' );

// -----------------------------------------------------------------------------

function builder ( options ) {
  return Promise.all([

    // process defining
    'var process = {};',

    // process version
    'process.version = "' + pkg.version + '";',

    // process init
    fs.readFileAsync( __dirname + '/' + '../../lib/process/init.js' ),

    // process bindings
    Promise.try(function () {
      var bngs = Util.extend(
        {},
        bindings,
        Util.is.Object( options.bindings ) && options.bindings || {}
      );

      return '\n' +
      'Object.defineProperty( process, "_bindings", {' +
        'enumerable: true,' +
        'writable: false,' +
        'value: ' + jsStringifier( bngs ) +
      '});';
    }),

    // script defining
    fs.readFileAsync( __dirname + '/' + '../../lib/process/script.js' ),

    // native-module defining
    fs.readFileAsync( __dirname + '/' + '../../lib/process/native-module.js' ),

    // process post bindings
    fs.readFileAsync( __dirname + '/' + '../../lib/process/post-bindings.js' ),

  ])
  .reduce(function ( entire, part ) {
    return entire + '\n' + part;
  })
  .tap(function () {
    //
    l( "built finished" );
    //
  });
};

builder.defaultOptions = {


  /**
   * Extend bindings of current build by placing your own exports
   *
   * {object}
   */
  bindings: false,

};

module.exports = builder;
