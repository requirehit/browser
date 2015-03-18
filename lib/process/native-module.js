// Copyright "Junglecloud, Lda.", "Joyent, Inc." and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function NativeModule ( id ) {
  this.filename = id + '.js';
  this.id = id;
  this.exports = {};
  this.loaded = false;
}

global.NativeModule = NativeModule;

NativeModule._source = process.binding( 'natives' );
NativeModule._cache = {
  'native_module': NativeModule,
  'global': _global,
};

NativeModule.require = function ( id ) {

  var cached = NativeModule.getCached( id );
  if (cached) {
    return cached.exports;
  }

  if (!NativeModule.exists(id)) {
    throw new Error('No such native module ' + id);
  }

  process.moduleLoadList.push('NativeModule ' + id);

  var nativeModule = new NativeModule(id);

  nativeModule.cache();
  nativeModule.compile();

  return nativeModule.exports;
};

NativeModule.getCached = function ( id ) {
  return NativeModule._cache[id];
}

NativeModule.exists = function ( id ) {
  return NativeModule._source.hasOwnProperty( id );
}

NativeModule.getSource = function ( id ) {
  return NativeModule._source[ id ];
}

NativeModule.prototype.compile = function () {
  var source = NativeModule.getSource( this.id );
  var script = new Script( source );

  this.global = global.scope({
    exports: this.exports,
    require: NativeModule.require,
    module: this,
    filename: this.filename,
    __filename: this.filename,
    __dirname: undefined,
  });

  script.runInContext( this.global )();

  this.loaded = true;
};

NativeModule.prototype.cache = function () {
  NativeModule._cache[this.id] = this;
};
