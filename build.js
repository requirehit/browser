var pkg = require( './package' ),
    fs = require( 'fs' ),
    l = function ( l ) { console.log( "requirehit-browser: " + l ); };

// -----------------------------------------------------------------------------

var nativePath = 'lib/native/';

// -----------------------------------------------------------------------------

var output = [];

//
l( "Creating dist/ dir" );
//
try{
  fs.mkdirSync( 'dist/', 0777 );
}catch( err ){}


//
l( "Fetching native modules files" );
//
fs
  .readdirSync( nativePath )
  .filter(function ( filename ) {
    return filename.substr( -3 ) === '.js';
  })
  .forEach(function ( filename ){
    output.push(
      'NativeModule._source["'+ filename +'"] = ' +
      JSON.stringify(
        fs.readFileSync( nativePath + filename ) + ''
      ) +
      ';'
    );
  });


//
l( "Wrapping output so we don't leak anything out of scope" );
//
output.unshift(
  "(function () {\n"
);
output.push(
  "})()"
);


//
l( "saving into dist/browser.js" );
//
fs.writeFileSync( 'dist/browser.js', output.join( "\n" ) );


// TODO
// uglify it
