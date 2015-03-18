var transport = [
  'NODE_ENV',
];

module.exports = transport.map(function ( key ){
  return process.env[ key ] || null;
});
