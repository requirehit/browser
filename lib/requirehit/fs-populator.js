var fs = NativeModule.require( 'fs' );
Object.keys( files ).forEach(function ( file ) {
  fs.writeFileSync( file, files[ file ] );
});
