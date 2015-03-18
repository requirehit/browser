/**
 * global - native module
 *
 * object used to share global objects
 * should extend browser's default global, such as window.
 *
 * Whis will be used also for defining globals inside modules, where each
 * module will access to their own `global` scope
 *
 * Useful to have controlled global registers and avoid memleaks.
 *
 * Usage:
 *
 * var global = require( 'global' ),
 *     window = global.scope();
 *
 * global.test1 = 'abc';
 * global.test2 = 'def';
 * window.test2 = 'ghi';
 * window.jQuery = 'jQuery';
 *
 * window.test1 will be 'abc'
 * window.test2 will be 'ghi';
 * window.jQuery will be 'jQuery';
 * global.jQuery will be undefined;
 *
 * Which means that we can "trick" modules such as jQuery and others to avoid
 * global variables exposure.
 *
 */

function Global () {}

Global.prototype = { __proto__: __global__ };
Global.prototype.Global = Global;

Global.prototype.scope = function ( origin ) {
  var scope = { __proto__: this };

  if ( typeof origin === 'object' ) {
    for ( var i in origin ) {
      scope[ i ] = origin[ i ];
    }
  }

  scope.window =
  scope.global =
  scope.GLOBAL =
    scope;

  return scope;
};

Global.prototype.injectHere = function () {
  try {
    GLOBAL = this;
  } catch ( err ) {
    var GLOBAL = this;
  }

  try {
    global = this;
  } catch ( err ) {
    var global = this;
  }

  try {
    window = this;
  } catch ( err ) {
    var window = this;
  }
};
