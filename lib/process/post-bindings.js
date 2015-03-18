var notImplementedYet = function () {
      throw new Error( "process method not implemented yet" );
    },
    TODO = function ( object, variable ) {
      Object.defineProperty( object, variable, {
        get: notImplementedYet,
      });
    };

// -----------------------------------------------------------------------------

// Turn process into an event emitter object
process.__proto__ = NativeModule.require( 'events' ).EventEmitter.prototype;

// Export it using global module
global.process = process;

try{
  process.env = process.binding( 'env' );
} catch ( err ) {
  process.env = {};
}

// process.stdout
TODO( process, 'stdout' );

// process.stdin
TODO( process, 'stdin' );

// process.stderr
TODO( process, 'stderr' );

// process.argv
TODO( process, 'argv' );

// process.execPath
TODO( process, 'execPath' );

// process.execArgv
TODO( process, 'execArgv' );

// process.abort()
TODO( process, 'abort' );

// process.chdir(directory)
TODO( process, 'chdir' );

// process.cwd()
TODO( process, 'cwd' );

// process.exitCode
TODO( process, 'exitCode' );

// process.exit([code])
TODO( process, 'exit' );

// process.getgid()
TODO( process, 'getgid' );

// process.setgid(id)
TODO( process, 'setgid' );

// process.getuid()
TODO( process, 'getuid' );

// process.setuid(id)
TODO( process, 'setuid' );

// process.getgroups()
TODO( process, 'getgroups' );

// process.setgroups(groups)
TODO( process, 'setgroups' );

// process.initgroups(user, extra_group)
TODO( process, 'initgroups' );

// process.versions
TODO( process, 'versions' );

// process.config
TODO( process, 'config' );

// process.kill(pid[, signal])
TODO( process, 'kill' );

// process.pid
TODO( process, 'pid' );

// process.title
TODO( process, 'title' );

// process.nextTick(callback)
process.nextTick = function ( callback ) {
  return global.setImmediate( callback );
};

// process.umask([mask])
TODO( process, 'umask' );

// process.hrtime()
TODO( process, 'hrtime' );

// process.mainModule
TODO( process, 'mainModule' );
