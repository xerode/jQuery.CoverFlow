/*
 * jQuery CoverFlow
 *
 *
 * Copyright (c) 2014 Paul Bennett
 * Licensed under the OSL license.
 */

( function( $ ) {

	$.fn.coverflow = function( action, options ) {

		switch( action ) {

			default:
				init( options );

		}

		return this;

	};

	// Plugin properties default values
	var defaults = {
		stagePerspective: 800,
		xSpread: 200,
		xGap: 200,
		zSpread: 400,
		zGap: 200,
		angle: 45
	};

	// Plugin properties
	$.fn.coverflow.settings = {};

	// Plugin private methods

	function init( options ) {
		$.fn.coverflow.settings = $.extend( defaults, options );
	};

	//

	// Collection method.
	$.fn.awesome = function() {
		return this.each( function( i ) {
			// Do something awesome to each selected element.
			$( this ).html( 'awesome' + i );
		} );
	};

	// Static method.
	$.awesome = function( options ) {
		// Override default options with passed-in options.
		options = $.extend( {}, $.awesome.options, options );
		// Return something awesome.
		return 'awesome' + options.punctuation;
	};

	// Static method default options.
	$.awesome.options = {
		punctuation: '.'
	};

	// Custom selector.
	$.expr[ ':' ].awesome = function( elem ) {
		// Is this element awesome?
		return $( elem ).text().indexOf( 'awesome' ) !== -1;
	};

}( jQuery ) );