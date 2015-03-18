var _global = new Global();

try {
  GLOBAL = _global;
} catch ( err ) {
  var GLOBAL = _global;
}

try {
  global = _global;
} catch ( err ) {
  var global = _global;
}

try {
  window = _global;
} catch ( err ) {
  var window = _global;
}
