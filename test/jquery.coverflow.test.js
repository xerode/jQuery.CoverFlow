( function( $ ) {
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
			this.elems = $( '#qunit-fixture' ).children();
		}
	} );

	test( 'is chainable', function() {
		expect( 1 );
		// Not a bad test to run on collection methods.
		strictEqual( this.elems.coverflow(), this.elems, 'should be chainable' );
	} );

	test( 'plugin settings extends plugin defaults', function() {
		expect( 6 );
		//
		this.elems.coverflow( '#COVERFLOW' );
		strictEqual( 800, this.elems.coverflow.settings.stagePerspective, 'should be 800' );
		strictEqual( 200, this.elems.coverflow.settings.xSpread, 'should be 200' );
		strictEqual( 200, this.elems.coverflow.settings.xGap, 'should be 200' );
		strictEqual( 400, this.elems.coverflow.settings.zSpread, 'should be 400' );
		strictEqual( 200, this.elems.coverflow.settings.zGap, 'should be 200' );
		strictEqual( 45, this.elems.coverflow.settings.angle, 'should be 45' );
	} );

	test( 'plugin settings overrides plugin defaults', function() {

		var options = {
			stagePerspective: 400,
			xSpread: 100,
			xGap: 100,
			zSpread: 200,
			zGap: 100,
			angle: 22.5
		};

		expect( Object.keys( options ).length );

		this.elems.coverflow( '#COVERFLOW', options );

		for( var k in options ) {
			strictEqual( options[ k ], this.elems.coverflow.settings[ k ], 'should be ' + options[ k ] );
		}

	} );

	test( 'currentItem is available through an accessor method', function() {
		expect( 1 );
		// Not a bad test to run on collection methods.
		strictEqual( 0, this.elems.coverflow( 'getCurrentItem' ), 'should be 0' );
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

} ( jQuery ) );