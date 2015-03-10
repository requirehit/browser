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

Global.prototype = { __proto__: window || Window && new Window() || {} };
Global.prototype.Global = Global;

  global =
  GLOBAL =
  module.exports = new Global();

Global.prototype.scope = function () {
  return { __proto__: this };
};
