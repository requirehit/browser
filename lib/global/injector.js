var _global = new Global();

// by default we do not expose requirehit global on browser's global
// this is only here for low-level debug proposes
// __global__.requirehit = _global;

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
