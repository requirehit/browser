var logger;

try{
  logger = require( 'debug' );
} catch ( err ) {
  logger = console.log.bind( console );
}

module.exports = function ( scope ) {
  return function ( msg ) {
    logger( 'requirehit-browser:builder:' + scope + ': ' + msg );
  };
};
