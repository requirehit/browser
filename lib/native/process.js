var global = require( 'global' ),
    EventEmitter = require( 'events' ).EventEmitter;

// -----------------------------------------------------------------------------

var process =
global.process =
module.exports =
  new EventEmitter();

// process.stdout
// process.stdin
// process.stderr
// process.argv
// process.execPath
// process.execArgv
// process.abort()
// process.chdir(directory)
// process.cwd()
// process.env
// process.exitCode
// process.exit([code])
// process.getgid()
// process.setgid(id)
// process.getuid()
// process.setuid(id)
// process.getgroups()
// process.setgroups(groups)
// process.initgroups(user, extra_group)
// process.version
// process.versions
// process.config
// process.kill(pid[, signal])
// process.pid
// process.title
// process.arch
// process.platform
// process.memoryUsage()

// process.nextTick(callback)
process.nextTick = function ( callback ) {
  return global.setImmediate( callback );
};

// process.umask([mask])

// process.uptime()
process.uptime = (function () {
  var start = new Date();
  return function () {
    return parseInt( ( new Date() - start ) / 1000 );
  };
})();

// process.hrtime()
// process.mainModule
