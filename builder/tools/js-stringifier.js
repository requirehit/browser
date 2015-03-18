var Util = require( 'findhit-util' );

// -----------------------------------------------------------------------------

module.exports = function jsStringifier ( variable ) {

  if ( Util.is.Function( variable ) ) {
    return '(' + variable.toString() + ')';
  }

  if ( Util.is.Array(variable) ) {
    return '[\n'+
      variable
      .map(function ( variable, key ) {
        return jsStringifier( variable );
      }).join( ',\n' ) +
    ']\n';
  }

  if ( Util.is.Object(variable) ) {
    return '{\n'+
      Object.keys( variable )
      .map(function ( key ) {
        return '"' + key + '"' + ':' + jsStringifier( variable[ key ] );
      }).join( ',\n' ) +
    '}\n';
  }

  // Else, try json.stringify
  return JSON.stringify( variable );
};
