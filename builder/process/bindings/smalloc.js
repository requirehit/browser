
exports.alloc = function ( obj, n, type ) {

  if ( Object.keys( obj ).length !== 0 ) {
    throw new TypeError( "object already has external array data" );
  }

  for( var i = 0; i < n; i++ ) {
    obj[ i ] = 0x0;
  }

  return obj;
};
