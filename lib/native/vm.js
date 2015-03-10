var global = require( 'global' );

// -----------------------------------------------------------------------------

var util = require('util');

function Script( code, options ) {

  Object.defineProperty( 'code', {
    enumerable: true,
    writable: false,
    value: code,
  });

  this.fn = new Function( code );

  Object.defineProperty( 'options', {
    enumerable: true,
    writable: false,
    value: typeof options === 'object' && options || {},
  });

  this.options.__proto__ = Script.defaultOptions;

}

Script.isContext = function ( sandbox ) {
  return sandbox instanceof global.Global;
};

Script.makeContext = function ( sandbox ) {
  return global.scope( sandbox );
}

Script.prototype = {};

Script.prototype.runInContext = function ( sandbox, options ) {
  return this.fn.apply( sandbox );
};

Script.prototype.runInThisContext = function(options) {
  return this.runInContext( global, options );
};

// The binding provides a few useful primitives:
// - ContextifyScript(code, { filename = "evalmachine.anonymous",
//                            displayErrors = true } = {})
//   with methods:
//   - runInThisContext({ displayErrors = true } = {})
//   - runInContext(sandbox, { displayErrors = true, timeout = undefined } = {})
// - makeContext(sandbox)
// - isContext(sandbox)
// From this we build the entire documented API.

exports.Script = Script;

exports.createScript = function(code, options) {
  return new Script(code, options);
};

exports.createContext = function(sandbox) {
  if (util.isUndefined(sandbox)) {
    sandbox = {};
  } else if (binding.isContext(sandbox)) {
    return sandbox;
  }

  binding.makeContext(sandbox);
  return sandbox;
};

exports.runInDebugContext = function(code) {
  return binding.runInDebugContext(code);
};

exports.runInContext = function(code, contextifiedSandbox, options) {
  var script = new Script(code, options);
  return script.runInContext(contextifiedSandbox, options);
};

exports.runInNewContext = function(code, sandbox, options) {
  var script = new Script(code, options);
  return script.runInNewContext(sandbox, options);
};

exports.runInThisContext = function(code, options) {
  var script = new Script(code, options);
  return script.runInThisContext(options);
};

exports.isContext = Script.isContext;
