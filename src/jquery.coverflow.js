/*
 * jQuery CoverFlow
 *
 *
 * Copyright (c) 2014 Paul Bennett
 * Licensed under the OSL license.
 */

// the semi-colon before function invocation is a safety net against concatenated scripts and/or other plugins which may not be closed properly.
;( function ( $, window, document, undefined ) {

	// Create the defaults once
	var pluginName = 'coverflow',
	defaults = {
		stagePerspective: 800,
		xSpread: 200,
		xGap: 200,
		xAngle: 0,
		ySpread: 0,
		yGap: 0,
		yAngle: 45,
		zSpread: 400,
		zGap: 200,
		zAngle: 0,
		animationDuration: 500,
		autoResize: true,
		cssItemClass: 'cf-item'
	};

	// The actual plugin constructor
	function Plugin( element, options ) {

		// Private properties
			this._currentItem = 0;

			this._defaults = defaults;
			this._name = pluginName;

		// Public properties
			this.element = element;
			this.settings = $.extend( {}, defaults, options );


		// Fire off init() method
			this.init();

	}

	Plugin.prototype = {

		init: function () {

			if( this.settings.autoResize === true ) {
				$( window ).resize( function() {
					this.resize( this.element );
				} );
			}

		},

		// Public methods

			getCurrentItem: function() {
				return this._currentItem;
			},

			nextItem: function() {
				this._currentItem += 1;
				this._broadcast( {
					type: 'complete'
				} );

			},

			prevItem: function() {
				this._currentItem -= 1;
				this._broadcast( {
					type: 'complete'
				} );
			},

			resize: function( elem ) {
				$( elem ).children( '.' + this.settings.cssItemClass ).each( function( i, el ) {
					$( el ).css( 'left', ( $( elem ).innerWidth() * 0.5 ) + 'px' );
					$( el ).css( 'top', ( $( elem ).innerHeight() * 0.5 ) + 'px' );
					$( el ).children().css( 'margin-left', ( $( el ).innerWidth() * -0.5 ) + 'px' );
					$( el ).children().css( 'margin-top', ( $( el ).innerHeight() * -0.5) + 'px' );
				} );
			},

		// Private methods

			// Hacky way to dispatch an event with some defaults
			_broadcast: function( options ) {

				console.log( 'throwing' );

				$( this.element ).trigger( $.extend(
					{},
					{
						type: 'event',
						currentItem: this._currentItem,
						time: new Date()
					},
					options
				) );

			}

	};

	// You don't need to change something below:
	// A really lightweight plugin wrapper around the constructor, preventing against multiple instantiations and allowing any public function (ie. a function whose name doesn't start with an underscore) to be called via the jQuery plugin,
	// e.g. $(element).defaultPluginName('functionName', arg1, arg2)
	$.fn[ pluginName ] = function ( options ) {

		var args = arguments;

		// Is the first parameter an object (options), or was omitted, instantiate a new instance of the plugin.
		if( options === undefined || typeof options === 'object' ) {

			return this.each( function () {

				// Only allow the plugin to be instantiated once, so we check that the element has no plugin instantiation yet
				if( ! $.data( this, 'plugin_' + pluginName ) ) {
					// if it has no instance, create a new one, pass options to our plugin constructor and store the plugin instance in the elements jQuery data object.
					$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
				}

			} );
		// If the first parameter is a string and it doesn't start with an underscore or "contains" the `init`-function, treat this as a call to a public method.
		} else if( typeof options === 'string' && options[ 0 ] !== '_' && options !== 'init' ) {

			// Cache the method call to make it possible to return a value
			var returns;

			this.each( function() {

				var instance = $.data( this, 'plugin_' + pluginName );

				// Tests that there's already a plugin-instance and checks that the requested public method exists
				if( instance instanceof Plugin && typeof instance[ options ] === 'function' ) {

					// Call the method of our plugin instance and pass it the supplied arguments.
					returns = instance[ options ].apply( instance, Array.prototype.slice.call( args, 1 ) );

				}

				// Allow instances to be destroyed via the 'destroy' method
				if( options === 'destroy' ) {
					$.data( this, 'plugin_' + pluginName, null );
				}

			} );

			// If the earlier cached method gives a value back return the value, otherwise return this to preserve chainability.
			return returns !== undefined ? returns : this;
		}
	};

}( jQuery, window, document ) );