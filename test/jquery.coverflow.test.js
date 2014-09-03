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

		expect( 11 );

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
			animationDuration: 1000
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

	test( 'nextItem is available as a public method and updates currentItem', function() {
		expect( 1 );

		this.elems.coverflow();
		this.elems.coverflow( 'nextItem' );
		strictEqual( this.elems.coverflow( 'getCurrentItem' ), 1, 'should be 1' );
	} );

	test( 'prevItem is available as a public method and updates currentItem', function() {
		expect( 1 );

		this.elems.coverflow();
		this.elems.coverflow( 'prevItem' );
		strictEqual( this.elems.coverflow( 'getCurrentItem' ), -1, 'should be -1' );
	} );

	/*
	module( 'jQuery#awesome', {
		// This will run before each test in this module.
		setup: function() {
			this.elems = $( '#qunit-fixture' ).children();
		}
	} );

	test( 'is chainable', function() {
		expect( 1 );
		// Not a bad test to run on collection methods.
		strictEqual( this.elems.awesome(), this.elems, 'should be chainable' );
	} );

	test( 'is awesome', function() {
		expect( 1 );
		strictEqual( this.elems.awesome().text(), 'awesome0awesome1awesome2', 'should be awesome' );
	} );

	module( 'jQuery.awesome' );

	test( 'is awesome', function() {
		expect( 2 );
		strictEqual( $.awesome(), 'awesome.', 'should be awesome' );
		strictEqual( $.awesome( { punctuation: '!' } ), 'awesome!', 'should be thoroughly awesome' );
	});

	module( ':awesome selector', {
		// This will run before each test in this module.
		setup: function() {
			this.elems = $('#qunit-fixture').children();
		}
	} );

	test( 'is awesome', function() {
		expect( 1 );
		// Use deepEqual & .get() when comparing jQuery objects.
		deepEqual( this.elems.filter( ':awesome' ).get(), this.elems.last().get(), 'knows awesome when it sees it' );
	});
	*/

}( jQuery, window, document ) );