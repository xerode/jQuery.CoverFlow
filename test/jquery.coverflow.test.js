;( function ( $, window, document, undefined ) {
	/*
		======== A Handy Little QUnit Reference ========
		http://api.qunitjs.com/

		Test methods:
			module(name, {[setup][ ,teardown]})
			test(name, callback)
			expect(numberOfAssertions)
			stop(increment)
			start(decrement)
		Test assertions:
			ok(value, [message])
			equal(actual, expected, [message])
			notEqual(actual, expected, [message])
			deepEqual(actual, expected, [message])
			notDeepEqual(actual, expected, [message])
			strictEqual(actual, expected, [message])
			notStrictEqual(actual, expected, [message])
			throws(block, [expected], [message])
	*/

	module( 'jQuery#coverflow', {
		// This will run before each test in this module.
		setup: function() {
			this.elems = $( '#COVERFLOW' );
		}
	} );

	test( 'is chainable', function() {
		expect( 1 );

		strictEqual( this.elems.coverflow(), this.elems, 'should be chainable' );
	} );

	test( 'plugin settings extends plugin defaults', function() {

		expect( 13 );

		this.elems.coverflow();

		strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings.stagePerspective, 800, 'should be 800' );
		strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings.xSpread, 200, 'should be 200' );
		strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings.xGap, 200, 'should be 200' );
		strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings.xAngle, 0, 'should be 0' );
		strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings.ySpread, 0, 'should be 0' );
		strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings.yGap, 0, 'should be 0' );
		strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings.yAngle, 45, 'should be 45' );
		strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings.zSpread, 400, 'should be 400' );
		strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings.zGap, 200, 'should be 200' );
		strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings.zAngle, 0, 'should be 0' );
		strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings.animationDuration, 500, 'should be 500' );
		strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings.cssItemClass, 'cf-item', 'should be "cf-item"' );
		strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings.easing, 'swing', 'should be "swing"' );

	} );

	test( 'plugin settings overrides plugin defaults', function() {

		var options = {
			stagePerspective: 400,
			xSpread: 100,
			xGap: 100,
			xAngle: 45,
			ySpread: 100,
			yGap: 100,
			yAngle: 22.5,
			zSpread: 200,
			zGap: 100,
			zAngle: 45,
			animationDuration: 1000,
			cssItemClass: 'custom-cf-item',
			easing: 'linear'
		};

		expect( Object.keys( options ).length );

		this.elems.coverflow( options );

		for( var k in options ) {
			strictEqual( $( '#COVERFLOW' ).data( 'plugin_coverflow' ).settings[ k ], options[ k ], 'should be ' + options[ k ] );
		}

	} );

	test( 'currentItem is available through a public accessor method', function() {
		expect( 1 );

		this.elems.coverflow();

		strictEqual( this.elems.coverflow( 'getCurrentItem' ), 0, 'should be 0' );
	} );

	asyncTest( 'nextItem() is available as a public method, updates currentItem and throws a "complete" event', function() {
		expect( 2 );

		var scp = this;

		this.elems.coverflow();

		this.elems.on( 'complete', function( e ) {
			strictEqual( scp.elems.coverflow( 'getCurrentItem' ), 1, 'should be 1' );
			strictEqual( e.currentItem, 1, 'should be 1' );
			QUnit.start();
		} );

		this.elems.coverflow( 'nextItem' );

	} );

	asyncTest( 'prevItem() is available as a public method, updates currentItem and throws a "complete" event', function() {
		expect( 2 );

		var scp = this;

		this.elems.coverflow();

		this.elems.on( 'complete', function( e ) {
			strictEqual( scp.elems.coverflow( 'getCurrentItem' ), -1, 'should be -1' );
			strictEqual( e.currentItem, -1, 'should be -1' );
			QUnit.start();
		} );

		this.elems.coverflow( 'prevItem' );
	} );

	test( 'resize() is available as a public method and can be overridden', function() {
		expect( 2 );

		this.elems.coverflow();
		strictEqual( this.elems.coverflow( 'resize' ), this.elems, 'should be chainable' );

		$( this.elems ).data( 'plugin_coverflow' ).resize = function() {
			return true;
		};

		strictEqual( this.elems.coverflow( 'resize' ), true, 'should be true' );

	} );

	asyncTest( 'changePerspective() is available as a public method, updates element perspective CSS and throws a "perspective_animation_complete" event', function() {
		expect( 1 );

		this.elems.coverflow();

		this.elems.on( 'perspective_animation_complete', function( e ) {
			strictEqual( e.stagePerspective, '400px', 'should be 400px' );
			QUnit.start();
		} );

		this.elems.coverflow( 'changePerspective', 400, 250 );
	} );

}( jQuery, window, document ) );