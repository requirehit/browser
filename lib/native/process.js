var global = require( 'global' ),
    EventEmitter = require( 'events' ).EventEmitter,

    notImplementedYet = function () {
      throw new Error( "process method not implemented yet" );
    };

// -----------------------------------------------------------------------------

var process =
global.process =
module.exports =
  new EventEmitter();


// TODO
// process.stdout
process.stdout = notImplementedYet;

// TODO
// process.stdin
process.stdin = notImplementedYet;

// TODO
// process.stderr
process.stderr = notImplementedYet;

// TODO
// process.argv
process.argv = notImplementedYet;

// TODO
// process.execPath
process.execPath = notImplementedYet;

// TODO
// process.execArgv
process.execArgv = notImplementedYet;

// TODO
// process.abort()
process.abort = notImplementedYet;

// TODO
// process.chdir(directory)
process.chdir = notImplementedYet;

// TODO
// process.cwd()
process.cwd = notImplementedYet;

// TODO
// process.env
process.env = notImplementedYet;

// TODO
// process.exitCode
process.exitCode = notImplementedYet;

// TODO
// process.exit([code])
process.exit = notImplementedYet;

// TODO
// process.getgid()
process.getgid = notImplementedYet;

// TODO
// process.setgid(id)
process.setgid = notImplementedYet;

// TODO
// process.getuid()
process.getuid = notImplementedYet;

// TODO
// process.setuid(id)
process.setuid = notImplementedYet;

// TODO
// process.getgroups()
process.getgroups = notImplementedYet;

// TODO
// process.setgroups(groups)
process.setgroups = notImplementedYet;

// TODO
// process.initgroups(user, extra_group)
process.initgroups = notImplementedYet;

// TODO
// process.version
process.version = notImplementedYet;

// TODO
// process.versions
process.versions = notImplementedYet;

// TODO
// process.config
process.config = notImplementedYet;

// TODO
// process.kill(pid[, signal])
process.kill = notImplementedYet;

// TODO
// process.pid
process.pid = notImplementedYet;

// TODO
// process.title
process.title = notImplementedYet;

// TODO
// process.arch
process.arch = notImplementedYet;

// TODO
// process.platform
process.platform = notImplementedYet;

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

// process.nextTick(callback)
process.nextTick = function ( callback ) {
  return global.setImmediate( callback );
};

// TODO
// process.umask([mask])
process.umask = notImplementedYet;

// process.uptime()
process.uptime = (function () {
  var start = new Date();
  return function () {
    return parseInt( ( new Date() - start ) / 1000 );
  };
})();

// TODO
// process.hrtime()
process.hrtime = notImplementedYet;

// TODO
// process.mainModule
process.mainModule = notImplementedYet;
