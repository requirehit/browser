
// We have a reference to this, so i think it should be created here
process.moduleLoadList = [];

// process.binding
process.binding = function ( id ) {
  var bs = process._bindings || {};

  var binding = bs[ id ];

  if ( ! binding ) {
    throw new Error( "requested binding not found" );
  }

  process.moduleLoadList.push('Binding ' + id);

  return binding;
};


// process.memoryUsage()
process.memoryUsage = function () {
  var memory = console.memory;

  if ( ! memory ) {
    throw new Error( "not under a V8 engine" );
  }

  return {
    rss: memory.jsHeapSizeLimit,
    heapTotal: memory.totalJSHeapSize,
    heapUsed: memory.usedJSHeapSize,
  };
};


// TODO
process.platform = undefined; // 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
process.arch = undefined; // 'arm', 'ia32', or 'x64'

// process.uptime()
process.uptime = (function () {
  var start = new Date();
  return function () {
    return parseInt( ( new Date() - start ) / 1000 );
  };
})();


// process.versions
process.versions = {};
process.versions.node = '0.12.1';
process.versions.requirehit = process.version;
