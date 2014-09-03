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

			var scp = this;

			// Sets perspective to value stored in settings
			$( this.element ).css( 'perspective', this.settings.stagePerspective + 'px' );

			// Adds handler to automatically resize and redraw coverflow if window resizes
			if( this.settings.autoResize === true ) {
				$( window ).resize( function() {
					scp.resize( this.element );
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

			getCoords: function( pos ) {

				var xp = 0,
				yp = 0,
				zp = 0,
				xe = 0,
				ye = 0,
				ze = 0,
				theta = 0,
				items = $( this.element ).children( '.' + this.settings.cssItemClass ).length;

				if( pos < 0 ) {
					theta = Math.max( pos, -1 );
				} else if( pos > 0 ) {
					theta = Math.min( pos, 1 );
				}

				xp = ( this.settings.xSpread / items * pos ) + ( this.settings.xGap * theta );
				zp = ( this.settings.zSpread / items * Math.abs( pos ) * -1 ) - ( this.settings.zGap * Math.abs( theta ) );

				ye = theta * this.settings.yAngle * -1;

				return {
					xp: xp,
					yp: yp,
					zp: zp,
					xe: xe,
					ye: ye,
					ze: ze
				};

			},

			changePerspective: function( to, dur ) {

				var from = Number( $( this.element ).css( 'perspective' ).replace(/[^-\d\.]/g, '') ) || 0,
				scp = this;

				$( this.element )
					.animate( {
						persp: to - from
					},
					{
						step: function( now ) {

							$( scp.element ).css( 'perspective', ( from + now ) + 'px' );

						},
						duration: dur || this.animationDuration,
						easing: 'swing',
						complete: function() {

							scp._broadcast( {
								type: 'perspective_animation_complete',
								stagePerspective: $( scp.element ).css( 'perspective' )
							} );

						}
					}
					);

			},

		// Private methods

			// Hacky way to dispatch an event with some defaults
			_broadcast: function( options ) {

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