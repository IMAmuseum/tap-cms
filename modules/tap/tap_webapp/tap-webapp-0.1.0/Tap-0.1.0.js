/*
 * TAP - v0.1.0 - 2012-07-18
 * http://tapintomuseums.org/
 * Copyright (c) 2011-2012 Indianapolis Museum of Art
 * GPLv3
 */

String.prototype.replaceArray = function(find, replace) {
	var replaceString = this;
	for (var i = 0; i < find.length; i++) {
		replaceString = replaceString.replace(find[i], replace);
	}
	return replaceString;
};

String.prototype.toCamel = function(){
    return this.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
		.replace(/\s/g, '')
		.replace(/^(.)/, function($1) { return $1.toLowerCase(); });
};

/*
 * Retrieve attribute based on language
 */
function getAttributeByLanguage(attr) {
	var items = [];
	for(var i = 0; i < attr.length; i++) {
		// get language specific and language neutral
		if(!attr[i].lang || (attr[i].lang && attr[i].lang == tap.language)) {
			items.push(attr[i]);
		}
	}
	// return all items if no language matched
	if(items.length === 0) {
		items = attr;
	}
	return items;
}

/*
 * Load xml document
 */
function loadXMLDoc(url) {
	xhttp = new XMLHttpRequest();
	xhttp.open('GET', url, false);
	xhttp.send();
	return xhttp.responseXML;
}

/*
 * Attempt to make the variable an array
 */
function objectToArray(obj) {
	if(obj === undefined) return;
	return Object.prototype.toString.call(obj) !== '[object Array]' ? [obj] : obj;
}

/*
 * Convert xml to JSON
 */
function xmlToJson(xml, namespace) {
	var obj = true,
		i = 0;
	// retrieve namespaces
	if(!namespace) {
		namespace = ['xml:'];
		for(i = 0; i < xml.documentElement.attributes.length; i++) {
			if(xml.documentElement.attributes.item(i).nodeName.indexOf('xmlns') != -1) {
				namespace.push(xml.documentElement.attributes.item(i).nodeName.replace('xmlns:', '') + ':');
			}
		}
	}

	var result = true;
	if (xml.attributes && xml.attributes.length > 0) {
		var attribute;
		result = {};
		for (var attributeID = 0; attributeID < xml.attributes.length; attributeID++) {
			attribute = xml.attributes.item(attributeID);
			result[attribute.nodeName.replaceArray(namespace, '').toCamel()] = attribute.nodeValue;
		}
	}
	if (xml.hasChildNodes()) {
		var key, value, xmlChild;
		if (result === true) { result = {}; }
		for (var child = 0; child < xml.childNodes.length; child++) {
			xmlChild = xml.childNodes.item(child);
			if ((xmlChild.nodeType & 7) === 1) {
				key = xmlChild.nodeName.replaceArray(namespace, '').toCamel();
				value = xmlToJson(xmlChild, namespace);
				if (result.hasOwnProperty(key)) {
					if (result[key].constructor !== Array) { result[key] = [result[key]]; }
					result[key].push(value);
				} else { result[key] = value; }
			} else if ((xmlChild.nodeType - 1 | 1) === 3) {
				key = 'value';
				value = xmlChild.nodeType === 3 ? xmlChild.nodeValue.replace(/^\s+|\s+$/g, '') : xmlChild.nodeValue;
				if (result.hasOwnProperty(key)) { result[key] += value; }
				else if (xmlChild.nodeType === 4 || value !== '') { result[key] = value; }
			}
		}
	}
	return(result);
}
// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.models === 'undefined'){TapAPI.models = {};}
// TapAPI Namespace Initialization //

// define asset model
TapAPI.models.Asset = Backbone.Model.extend({
	get: function(attr) { // override get method
		if(!this.attributes[attr]) return this.attributes[attr];
		switch(attr) { // retrieve attribute based on language
			case 'tourMetadata':
			case 'propertySet':
			case 'source':
			case 'content':
				return getAttributeByLanguage(objectToArray(this.attributes[attr]));
			default:
				return this.attributes[attr];
		}
	},
	/**
	* Retrieves the property value of a given property name
	* @param  string key The propety name
	* @return string The property value
	*/
	getPropertyByName: function(name) {
		if(_.isUndefined(this.get('propertySet'))) return false;
		var property = _.find(this.get('propertySet'), function(item) {
			return item['name'] === key;
		});
		return _.isUndefined(property) ? false : property.value;
	}
});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.models === 'undefined'){TapAPI.models = {};}
// TapAPI Namespace Initialization //

// define stop model
TapAPI.models.Stop = Backbone.Model.extend({
	get: function(attr) { // override get method
		if(!this.attributes[attr]) return this.attributes[attr];
		switch(attr) {  // retrieve attribute based on language
			case 'tourMetadata':
			case 'propertySet':
			case 'description':
			case 'title':
				return getAttributeByLanguage(this.attributes[attr]);
			default:
				return this.attributes[attr];
		}
	},
	/**
	* Retrieves the property value of a given property name
	* @param  string name The propety name
	* @return string The property value
	*/
	getPropertyByName: function(name) {
		if(_.isUndefined(this.get('propertySet'))) return false;
		var property = _.find(this.get('propertySet'), function(item) {
			return item['name'] === name;
		});
		return _.isUndefined(property) ? false : property.value;
	},
	/**
	* Retrieves all asset models for a stop
	* @return array An array of asset models
	*/
	getAssets: function() {
		if(_.isUndefined(this.get('assetRef'))) return false;
		var assets = [];
		_.each(this.get('assetRef'), function(item) {
			assets.push(tap.tourAssets.get(item.id));
		});
		return _.isEmpty(assets) ? false : assets;
	},
	/**
	* Retrieves an asset with a given usage
	* @param string usage The asset usage
	* @return mixed The asset model
	*/
	getAssetsByUsage: function(usage) {
		if(_.isUndefined(this.get('assetRef'))) return false;
		var assets = [];
		_.each(this.get('assetRef'), function(item) {
			if(item['usage'] === usage) {
				assets.push(tap.tourAssets.get(item.id));
			}
		});
		return _.isEmpty(assets) ? false : assets;
	},
	/**
	* Retrieves a sorted array of connections
	* @return array The connection array ordered by priority in ascending order
	*/
	getSortedConnections: function() {
		if(_.isUndefined(this.get('connections'))) return false;
		return _.sortBy(this.get('connection'), function(connection) {
			return parseInt(connection.priority, 10);
		});
	}
});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.models === 'undefined'){TapAPI.models = {};}
// TapAPI Namespace Initialization //

// define tour model
TapAPI.models.Tour = Backbone.Model.extend({
	get: function(attr) { // override get method
		if(!this.attributes[attr]) return this.attributes[attr];
		switch(attr) {  // retrieve attribute based on language
			case 'tourMetadata':
			case 'propertySet':
			case 'description':
			case 'title':
				return getAttributeByLanguage(this.attributes[attr]);
			default:
				return this.attributes[attr];
		}
	}
});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.collections === 'undefined'){TapAPI.collections = {};}
// TapAPI Namespace Initialization //

// define assett collection
TapAPI.collections.Assets = Backbone.Collection.extend({
	model: TapAPI.models.Asset,
	initialize: function(models, id) {
		this.localStorage = new Backbone.LocalStorage(id + '-asset');
	}
});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.collections === 'undefined'){TapAPI.collections = {};}
// TapAPI Namespace Initialization //

// define stop collection
TapAPI.collections.Stops = Backbone.Collection.extend({
	model: TapAPI.models.Stop,
	initialize: function(models, id) {
		this.localStorage = new Backbone.LocalStorage(id + '-stop');
	},
	// retrieve the stop id of a given key code
	getStopByKeycode: function(key) {
		for(var i = 0; i < this.models.length; i++) {
			if(this.models[i].get('propertySet')) {
				for(var j = 0; j < this.models[i].get('propertySet').length; j++) {
					if(this.models[i].get('propertySet')[j].name == 'code' &&
						this.models[i].get('propertySet')[j].value == key) return this.models[i];
				}
			}
		}
		return false;
	}
});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.collections === 'undefined'){TapAPI.collections = {};}
// TapAPI Namespace Initialization //

// define tour collection
TapAPI.collections.Tours = Backbone.Collection.extend({
	model: TapAPI.models.Tour,
	localStorage: new Backbone.LocalStorage('tours'),
	selectTour: function(id) { // load data for the selected tour
		// set the current tour
		tap.currentTour = id;

		// set root stop as the current stop if specified
		if(tap.tours.get(id).get('rootStopRef')) {
			tap.currentStop = tap.tours.get(id).get('rootStopRef').id;
		}

		// create new instance of StopCollection
		tap.tourStops = new TapAPI.collections.Stops(null, id);
		// create new instance of AssetCollection
		tap.tourAssets = new TapAPI.collections.Assets(null, id);

		if (tap.GeoLocation !== null) {
			tap.tourStops.on('reset', TapAPI.geoLocation.stopsReset);
		}

		// load data from local storage
		tap.tourAssets.fetch();		
		tap.tourStops.fetch();

	}
});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.views === 'undefined'){TapAPI.views = {};}
if (typeof TapAPI.views.registry === 'undefined'){TapAPI.views.registry = {};}
// TapAPI Namespace Initialization //

jQuery(function() {

	// Defines the base view for a page
	TapAPI.views.Page = Backbone.View.extend({

		initialize: function(args) {

			_.defaults(this.options, {
				page_title: '',
				back_label: 'Back',
				nav_menu: [
					{ label: 'Menu', prefix: 'tourstoplist' },
					{ label: 'Keypad', prefix: 'tourkeypad' },
					{ label: 'Map', prefix: 'tourmap'}
				],
				active_index: null,
				header_nav: true
			});

			if (this.onInit) {
				this.onInit();
			}
		},

		close: function() {
			this.$el.empty().undelegate();
			this.unbind();
			this.undelegateEvents();
			if (this.onClose){
				this.onClose();
			}
		},

		render: function(event) {

			this.$el.empty();
			this.$el.html(TapAPI.templateManager.get('page')({
				title: this.options.page_title,
				back_label: this.options.back_label,
				header_nav: this.options.header_nav,
				nav_menu: this.options.nav_menu,
				active_index: this.options.active_index,
				tour_id: tap.currentTour
			}));
			this.renderContent();
			return this;

		},

		// Sub-classes should override this function
		renderContent: function() {
			console.log('Warning: abstract TapApi.views.Page::renderContent');
		}

	});
	
});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.views === 'undefined'){TapAPI.views = {};}
if (typeof TapAPI.views.registry === 'undefined'){TapAPI.views.registry = {};}
// TapAPI Namespace Initialization //

// Add this view to the registry
TapAPI.views.registry['tour_audio_stop'] = 'AudioStop';

// TODO: remove this deprecated mapping
TapAPI.views.registry['AudioStop'] = 'AudioStop';

jQuery(function() {

	// Define the AudioStop View
	TapAPI.views.AudioStop = TapAPI.views.Page.extend({

		renderContent: function() {

			var content_template = TapAPI.templateManager.get('audio-stop');

			$(":jqmData(role='content')", this.$el).append(content_template({
				tourStopTitle: this.model.get('title')[0].value
			}));

			var asset_refs = tap.currentStop.get("assetRef");
			

			if (asset_refs) {
				_.each(asset_refs, function(assetRef) {

					var asset = tap.tourAssets.get(assetRef.id);
					var assetSources = asset.get("source");

					_.each(assetSources, function(assetSource) {

						var source_str = "<source src='" + assetSource.uri + "' type='" + assetSource.format + "' />";

						switch(assetSource.format.substring(0,5)) {
							case 'audio':
								$('#audio-player', this.$el).append(source_str);
								break;
							case 'video':
								$('#video-player', this.$el).append(source_str);
								break;
							default:
								console.log('Unsupported format for audio asset:', assetSource);
						}

					}, this);
				}, this);

				// If there are video sources and no audio sources, switch to the video element
				if ($('#video-player source', this.$el).length && !$('#audio-player source', this.$el).length) {
					$('#audio-player', this.$el).hide();
					$('#video-player', this.$el).show();
				}

			}

			return this;
		}
	});
});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.views === 'undefined'){TapAPI.views = {};}
if (typeof TapAPI.views.registry === 'undefined'){TapAPI.views.registry = {};}
// TapAPI Namespace Initialization //

jQuery(function() {

	// Defines the default stop view
	TapAPI.views.Stop = TapAPI.views.Page.extend({
		renderContent: function() {
			var content_template = TapAPI.templateManager.get('stop');

			$(":jqmData(role='content')", this.$el).append(content_template({
				tourStopTitle : this.model.get("title") ? this.model.get("title")[0].value : undefined,
				tourStopDescription : this.model.get('description') ? this.model.get('description')[0].value : undefined
			}));
			return this;

		}
	});
});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.views === 'undefined'){TapAPI.views = {};}
if (typeof TapAPI.views.registry === 'undefined'){TapAPI.views.registry = {};}
// TapAPI Namespace Initialization //

// Add this view to the registry
TapAPI.views.registry['tour_image_stop'] = 'ImageStop';

// TODO: remove this deprecated mapping
TapAPI.views.registry['ImageStop'] = 'ImageStop';

jQuery(function() {

	// Define the ImageStop View
	TapAPI.views.ImageStop = TapAPI.views.Page.extend({

		renderContent: function() {

			var imageUri, iconUri;
			var asset_refs = tap.currentStop.get("assetRef");
			var content_template = TapAPI.templateManager.get('image-stop');

			if (asset_refs) {
				$.each(asset_refs, function() {
					$assetItem = tap.tourAssets.models;
					for(var i=0;i<$assetItem.length;i++) {
						if(($assetItem[i].get('id') == this['id']) && (this['usage'] == "primary" || this['usage'] == "tour_image")){
							imageUri = $assetItem[i].get('source')[0].uri;
						}
						if(($assetItem[i].get('id') == this['id']) && (this['usage']=="icon")){
							iconUri = $assetItem[i].get('source')[0].uri;
						}
					}
				});
			}

			$(":jqmData(role='content')", this.$el).append(content_template({
				tourImageUri : imageUri,
				tourIconUri : iconUri,
				tourStopTitle : tap.currentStop.get("title")[0].value
			}));
			
			var soloPhotoSwipe = $("#soloImage a", this.$el).photoSwipe({
				enableMouseWheel: false,
				enableKeyboard: true,
				doubleTapZoomLevel : 0,
				captionAndToolbarOpacity : 0.8,
				minUserZoom : 0.0,
				preventSlideshow : true,
				jQueryMobile : true
			});
			
			return this;
		}
	});
});
// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.views === 'undefined'){TapAPI.views = {};}
if (typeof TapAPI.views.registry === 'undefined'){TapAPI.views.registry = {};}
// TapAPI Namespace Initialization //

jQuery(function() {

	// Define the Keypad View
	TapAPI.views.Keypad = TapAPI.views.Page.extend({

		events: {
			'tap #gobtn' : 'submit',
			'tap #keypad div .button' : 'writekeycode',
			'tap #delete' : 'clearkeycode'
		},

		onInit: function() {
			this.options.active_index = 'tourkeypad';
		},

		renderContent: function() {
			var content_template = TapAPI.templateManager.get('keypad');

			$(":jqmData(role='content')", this.$el).append(content_template());

		},

		submit: function() {
			// validate tour stop code
			if(!$('#write').html()) return;
			if(!tap.tourStops.getStopByKeycode($('#write').html())){
				tap.router.showDialog('error', 'This is an invalid code. Please enter another.');
				$('#write').html("");
				return;
			}
			$destUrl = "#tourstop/"+tap.currentTour+"/code/"+$('#write').html();
			Backbone.history.navigate($destUrl, true);
		},
		writekeycode: function(e) {
			$('#write').html($('#write').html() + $(e.currentTarget).html());
		},
		clearkeycode: function(e) {
			$('#write').html("");
		},
		close: function() {
			// Override base close function so that events are not unbound
		}
	});
});
// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.views === 'undefined'){TapAPI.views = {};}
if (typeof TapAPI.views.registry === 'undefined'){TapAPI.views.registry = {};}
// TapAPI Namespace Initialization //


/**
 * The MapView supports the display of multiple tours or a single tour
 */

jQuery(function() {

	// Define the Map View
	TapAPI.views.Map = TapAPI.views.Page.extend({

		onInit: function() {
			console.log('MapView.initialize');

			this.options.active_index = 'tourmap';

			this.tile_layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>',
				maxZoom: 18
			});

			this.map = null;
			this.stop_markers = {};
			this.stop_popups = {};
			this.position_marker = null;
			this.view_initialized = false;
			this.LocationIcon = L.Icon.extend({
				iconUrl: tap.base_path + 'images/icon-locate.png',
				shadowUrl: null,
				iconSize: new L.Point(24, 24),
				iconAnchor: new L.Point(12, 12)
			});
			this.MarkerIcon = L.Icon.extend({
				iconUrl: tap.base_path + 'images/marker.png',
				shadowUrl: tap.base_path + 'images/marker-shadow.png',
				iconSize: new L.Point(25,41),
				iconAnchor: new L.Point(12,41)
			});
			this.marker_icon = new this.MarkerIcon();

			_.defaults(this.options, {
				'init-lat': 39.829104,
				'init-lon': -86.189504,
				'init-zoom': 2,
				'units': 'si'
			});
		},

		renderContent: function() {
			var content_template = TapAPI.templateManager.get('tour-map');

			//$(":jqmData(role='page')", this.$el).attr('id', 'tour-map-page');
			$(":jqmData(role='content')", this.$el).addClass('map-content').append(content_template());

			$(":jqmData(role='page')").live('pageshow', {map_view: this}, function(e) {
				e.data.map_view.resizeContentArea();
				if (e.data.map_view.map === null) {
					e.data.map_view.initMap();
				}
			});

			$(window).bind('orientationchange resize', this.resizeContentArea);

		},


		initMap: function() {

			//$(this.el).html(this.template());
			this.map = new L.Map('tour-map');

			this.map.addLayer(this.tile_layer);

			// First, try to set the view by locating the device
			//this.map.locateAndSetView(this.options['init-zoom']);
			if (TapAPI.geoLocation !== null) {
				if (TapAPI.geoLocation.latest_location !== null) {

					this.options['init-lat'] = TapAPI.geoLocation.latest_location.coords.latitude;
					this.options['init-lon'] = TapAPI.geoLocation.latest_location.coords.longitude;

					if (this.position_marker === null) {
						this.position_marker = new L.Marker(
							new L.LatLng(this.options['init-lat'], this.options['init-lon']),
							{icon: new this.LocationIcon()}
						);
						this.map.addLayer(this.position_marker);
					}

				}
			}

			this.map.setView(
				new L.LatLng(this.options['init-lat'], this.options['init-lon']),
				this.options['init-zoom']
			);

			// Find stops with geo coordinate assets
			for (var i = 0; i<this.options.stops.size(); i++) {

				var tour_stop = this.options.stops.at(i);
				var asset_refs = tour_stop.get('assetRef');
				var result = _.each(
					asset_refs,
					this.plotTourStopMarker,
					{
						stop: tour_stop,
						map_view: this
					}
				);

			}

			TapAPI.geoLocation.on("gotlocation", this.onLocationFound, this);

			return this;
		},


		// Plot a single tour stop marker on the map
		// @note Assumes that the context is set to { stop: (StopModel), map_view: (MapView) }
		plotTourStopMarker: function(asset_ref) {

			// Make sure this is a geo asset reference
			if ((asset_ref === undefined) || (asset_ref.usage != 'geo')) return;

			// Parse the contents of the asset
			asset = tap.tourAssets.get(asset_ref.id);
			var data = $.parseJSON(asset.get('content')[0].data.value);

			if (data.type == 'Point') {

				var marker_location = new L.LatLng(data.coordinates[1], data.coordinates[0]);
				var marker = new L.Marker(marker_location, { icon: this.map_view.marker_icon });
				var template = TapAPI.templateManager.get('tour-map-marker-bubble');

				var popup = new L.Popup();
				popup.setLatLng(marker_location);

				var d_content = '';
				if (this.stop.get('distance')) {
					d_content = 'Distance: ' + this.map_view.formatStopDistance(this.stop.get('distance'));
				}

				popup.setContent(template({
					'title': this.stop.get('title')[0].value,
					'tour_id': tap.currentTour,
					'stop_id': this.stop.id,
					'distance': d_content
				}));

				this.map_view.stop_popups[this.stop.id] = popup;

				marker.stop_id = this.stop.id;
				marker.addEventListener('click', this.map_view.onMarkerSelected, this.map_view);

				this.map_view.stop_markers[this.stop.id] = marker;
				this.map_view.map.addLayer(marker);

			}

			// Update the marker bubble when the distance to a stop changes
			this.stop.on('change:distance', function(stop) {

				var d_content = '';
				if (stop.get('distance')) {
					d_content = 'Distance: ' + this.formatStopDistance(stop.get('distance'));
				}

				this.stop_popups[stop.id].setContent(template({
					'title': stop.get('title')[0].value,
					'tour_id': tap.currentTour,
					'stop_id': stop.get('id'),
					'distance': d_content
				}));


			}, this.map_view);

		},


		// When a marker is selected, show the popup
		// Assumes that the context is set to (MapView)
		onMarkerSelected: function(e) {
			this.map.openPopup(this.stop_popups[e.target.stop_id]);
		},


		onLocationFound: function(position) {

			//console.log('onLocationFound', position);
			var latlng = new L.LatLng(position.coords.latitude, position.coords.longitude);

			if (this.position_marker === null) {

				this.position_marker = new L.Marker(latlng, {icon: new this.LocationIcon()});
				this.map.addLayer(this.position_marker);

			} else {

				this.position_marker.setLatLng(latlng);

			}

		},


		onLocationError: function(e) {

			console.log('onLocationError', e);

			// TODO: hide the position marker?

		},


		formatStopDistance: function(d) {

			if (this.options.units == 'si') {

				if (d < 1000) {
					return d.toFixed(2) + ' m';
				} else {
					return (d/1000).toFixed(2) + ' km';
				}

			}

		},


		resizeContentArea: function() {
			var content, contentHeight, footer, header, viewportHeight;
			window.scroll(0, 0);
			var tour_map_page = $(":jqmData(role='page')");
			header = tour_map_page.find(":jqmData(role='header'):visible");
			footer = tour_map_page.find(":jqmData(role='footer'):visible");
			content = tour_map_page.find(":jqmData(role='content'):visible");
			viewportHeight = $(window).height();
			contentHeight = viewportHeight - header.outerHeight() - footer.outerHeight();
			tour_map_page.find(":jqmData(role='content')").first().height(contentHeight);
		},


		onClose: function() {
			$(window).unbind('orientationchange resize', this.resizeContentArea);
		}

	});

});
// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.views === 'undefined'){TapAPI.views = {};}
if (typeof TapAPI.views.registry === 'undefined'){TapAPI.views.registry = {};}
// TapAPI Namespace Initialization //

// Add this view to the registry
TapAPI.views.registry['tour_stop_group'] = 'StopGroup';

// TODO: remove this deprecated mapping
TapAPI.views.registry['StopGroup'] = 'StopGroup';

jQuery(function() {

	// Define the StopGroup view
	TapAPI.views.StopGroup = TapAPI.views.Page.extend({

		renderContent: function() {
			var content_template = TapAPI.templateManager.get('stop-group');
			var template_args = {
				tourStopTitle : this.model.get('title')[0].value
			};

			var description = this.model.get("description");
			if (description !== undefined) {
				template_args['description'] = description[0].value;
			} else {
				template_args['description'] = '';
			}

			$(":jqmData(role='content')", this.$el).append(content_template(template_args));

			var connections = this.model.get('connection');
			var listContainer = this.$el.find("#stop-list");
			_.each(connections, function(connection) {
				var stop = tap.tourStops.get(connection.destId);
				if (stop) {
					var stopView = new TapAPI.views.StopGroupListItem({
						model: stop
					});
					listContainer.append(stopView.render().$el);
				}
			});

		}
	});

	// setup an individual view of a tour
	TapAPI.views.StopGroupListItem = Backbone.View.extend({
		tagName: 'li',
		template: TapAPI.templateManager.get('stop-group-list-item'),
		render: function() {
			this.$el.html(this.template({
				title: this.model.get('title') ? this.model.get('title')[0].value : undefined,
				id: this.model.get('id'),
				tourId: tap.currentTour
			}));
			return this;
		}
	});
});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.views === 'undefined'){TapAPI.views = {};}
if (typeof TapAPI.views.registry === 'undefined'){TapAPI.views.registry = {};}
// TapAPI Namespace Initialization //


jQuery(function() {

	// Define the stop list view
	TapAPI.views.StopList = TapAPI.views.Page.extend({

		onInit: function() {
			this.options.active_index = 'tourstoplist';
		},

		renderContent: function() {
			var content_template = TapAPI.templateManager.get('tour-stop-list');

			$(":jqmData(role='content')", this.$el).append(content_template());

			// TODO: figure out a better way to avoid rendering again
			//if ($('li', this.$el).length == tap.tourStops.models.length) return;

			_.each(tap.tourStops.models, function(stop) {

				// If in codes-only mode, abort if the stop does not have a code
				if (tap.config.StopListView.codes_only) {
					var code = undefined;
					_.each(stop.get('propertySet'), function(prop) {
						if (prop.name == 'code') code = prop.value;
					});
					if (code === undefined) return;
				}

				var item = new TapAPI.views.StopListItem({model: stop});
				$('#tour-stop-list', this.$el).append(item.render().el);
				
			}, this);

		}

	});

	// Define the item view to populate this list
	TapAPI.views.StopListItem = Backbone.View.extend({

		tagName: 'li',
		template: TapAPI.templateManager.get('tour-stop-list-item'),

		render: function() {
			$(this.el).html(this.template({
				title: this.model.get('title') ? this.model.get('title')[0].value : undefined,
				stop_id: this.model.get('id'),
				tour_id: tap.currentTour
			}));
			return this;
		}

	});

});
// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.views === 'undefined'){TapAPI.views = {};}
if (typeof TapAPI.views.registry === 'undefined'){TapAPI.views.registry = {};}
// TapAPI Namespace Initialization //

jQuery(function() {

	// Define the TourDetails View
	TapAPI.views.TourDetails = TapAPI.views.Page.extend({

		onInit: function() {
			this.options.page_title = this.model.get('title')[0].value;
			this.options.header_nav = false;
		},

		renderContent: function() {
			var content_template = TapAPI.templateManager.get('tour-details');

			$(":jqmData(role='content')", this.$el).append(content_template({
				tour_index: tap.config.default_index,
				tour_id: this.model.id,
				publishDate: this.model.get('publishDate') ? this.model.get('publishDate')[0].value : undefined,
				description: this.model.get('description') ? this.model.get('description')[0].value : undefined,
				stopCount: tap.tourStops.length,
				assetCount: tap.tourAssets.length
			}));

		}

	});

});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.views === 'undefined'){TapAPI.views = {};}
if (typeof TapAPI.views.registry === 'undefined'){TapAPI.views.registry = {};}
// TapAPI Namespace Initialization //

jQuery(function() {

	// The tour list view displays a list of all tours
	TapAPI.views.TourList = TapAPI.views.Page.extend({

		onInit: function() {
			this.options.page_title = 'Tour List';
			this.options.header_nav = false;
		},

		renderContent: function() {
			var content_template = TapAPI.templateManager.get('tour-list');

			$(":jqmData(role='content')", this.$el).append(content_template);

			// iterate through all of the tour models to setup new views
			_.each(this.model.models, function(tour) {
					$('#tour-list', this.$el).append(new TapAPI.views.TourListItem({model: tour}).render().el);
			}, this);
			$('#tour-list').listview('refresh'); // refresh listview since we generated the data dynamically

		}

	});

	// setup an individual view of a tour
	TapAPI.views.TourListItem = Backbone.View.extend({
		tagName: 'li',
		template: TapAPI.templateManager.get('tour-list-item'),
		render: function() {
			$(this.el).html(this.template({
				title: this.model.get('title') ? this.model.get('title')[0].value : undefined,
				id: this.model.get('id')
			}));
			return this;
		}
	});

});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.views === 'undefined'){TapAPI.views = {};}
if (typeof TapAPI.views.registry === 'undefined'){TapAPI.views.registry = {};}
// TapAPI Namespace Initialization //

// Add this view to the registry
TapAPI.views.registry['tour_video_stop'] = 'VideoStop';

// TODO: remove this deprecated mapping
TapAPI.views.registry['VideoStop'] = 'VideoStop';

jQuery(function() {

	// Define the VideoStop View
	TapAPI.views.VideoStop = TapAPI.views.Page.extend({

		renderContent: function() {
			var content_template = TapAPI.templateManager.get('video-stop');

			$(":jqmData(role='content')", this.$el).append(content_template({
				tourStopTitle: this.model.get('title')[0].value
			}));

			var asset_refs = tap.currentStop.get("assetRef");

			if (asset_refs) {
				_.each(asset_refs, function(assetRef) {
					var asset = tap.tourAssets.get(assetRef.id);
					var assetSources = asset.get("source");

					_.each(assetSources, function(assetSource){
						$('video', this.$el).append("<source src='" + assetSource.uri + "' type='" + assetSource.format + "' />");
					}, this);
				}, this);
			}

			return this;
		}
	});
});

jQuery(function() {
	AppRouter = Backbone.Router.extend({
		// define routes
		views: {},
		routes: {
			'': 'list',
			'tour/:tour_id': 'tourDetails',
			'tourkeypad/:tour_id': 'tourKeypad',
			'tourstop/:tour_id/:stop_id': 'tourStopById',
			'tourstop/:tour_id/code/:stop_code': 'tourStopByCode',
			'tourmap/:tour_id': 'tourMap',
			'tourstoplist/:tour_id': 'tourStopList'
		},
		bookmarkMode:false,


		initialize:function () {
			//console.log('AppRouter::initialize');
			$('#back-button').live('click', function(e) {
				e.preventDefault();
				window.history.back();
				return false;
			});
			this.firstPage = true;
		},

		list: function() {

			this.changePage(new TapAPI.views.TourList({model: tap.tours}));

		},

		/**
		 * Route to the tour details
		 * @param id The id of the tour
		 */
		tourDetails: function(id) {

			tap.tours.selectTour(id);
			this.changePage(new TapAPI.views.TourDetails({model: tap.tours.get(tap.currentTour)}));

		},

		/**
		 * Route to the keypad
		 * @param id The id of the tour
		 */
		tourKeypad: function(id) {

			tap.tours.selectTour(id);
			this.changePage(new TapAPI.views.Keypad({
				model: tap.tours.get(tap.currentTour),
				page_title: "Enter a code"
			}));

		},

		/**
		 * Route to a stop
		 */
		tourStop: function() {

			var api_class = TapAPI.views.registry[tap.currentStop.get('view')];
			if (api_class === undefined) {
				console.log('View not in registry: ', tap.currentStop.get('view'));
				api_class = 'Stop';
			}

			this.changePage(new TapAPI.views[api_class]({
				model: tap.currentStop,
				page_title: tap.tours.get(tap.currentTour).get('title')[0].value
			}));

		},

		/**
		 * Route to a stop by stop ID
		 **/
		tourStopById: function(tour_id, stop_id) {

			// set the selected tour
			tap.tours.selectTour(tour_id);
			tap.currentStop = tap.tourStops.get(stop_id);
			this.tourStop();

		},

		/**
		 * Route to a stop by stop code
		 */
		tourStopByCode: function(tour_id, stop_code) {

			// set the selected tour
			tap.tours.selectTour(tour_id);
			tap.currentStop = tap.tourStops.getStopByKeycode(stop_code);
			this.tourStop();

		},


		/**
		 * Route to the tour list
		 * @param id The id of the tour
		 */
		tourStopList: function(id) {

			// set the selected tour
			tap.tours.selectTour(id);
			this.changePage(new TapAPI.views.StopList({model: tap.tours.get(tap.currentTour)}));

		},


		/**
		 * Route to the tour map
		 * Certain parameters are determined here in the router to leave open the possibility of 
		 * plotting markers for several tours on the same map
		 */
		tourMap: function(id) {


			// Determine which stops to display
			tap.tours.selectTour(id);
			var map_options = {
				'stops': tap.tourStops
			};

			// Look to see if a location is defined for the tour to use as the initial map center
			var tour = tap.tours.get(tap.currentTour);
			_.each(tour.get('appResource'), function(resource) {

				// Make sure this is a geo asset reference
				if ((resource === undefined) || (resource.usage != 'geo')) return;

				asset = tap.tourAssets.get(resource.id);
				var data = $.parseJSON(asset.get('content')[0].data.value);

				if (data.type == 'Point') {
					map_options['init-lon'] = data.coordinates[0];
					map_options['init-lat'] = data.coordinates[1];
				}

			});

			// Look to see if the initial map zoom level is set
			_.each(tour.get('propertySet'), function(property) {
				if (property.name == 'initial_map_zoom') {
					map_options['init-zoom'] = property.value;
				}
			});

			// Set the current view
			this.changePage(new TapAPI.views.Map(map_options));

		},

		changePage: function(page) {

			// Close the current view to unbind events, etc.
			if (tap.currentView !== undefined) {
				tap.currentView.close();
			}

			tap.currentView = page;

			$(page.el).attr('data-role', 'page');
			page.render();
			$('body').append($(page.el));
			var transition = $.mobile.defaultPageTransition;

			// We don't want to slide the first page
			if (this.firstPage) {
				transition = 'none';
				this.firstPage = false;
			}
			$.mobile.changePage($(page.el), {changeHash:false, transition: transition});

			// The old page is removed from the DOM by an event handler in jqm-config.js

		},

		showDialog: function(id, content) {

			var dialog = TapAPI.templateManager.get('dialog')({
				id: id,
				content: content
			});
			$('body').append(dialog);
			$.mobile.changePage('#' + id, {changeHash:false, transition:'pop'});

		}

	});
});

if (!tap) {
	var tap = {};
	tap.tours = {};
	tap.tourAssets = {};
	tap.tourStops = {}; // initialize tour stop
	tap.language = 'en'; // set default language
	tap.currentStop = ''; // id of the current stop
	tap.currentTour = ''; // id of the current tour

	var script_src = $('head script').last().attr('src');
	if (script_src.indexOf('Init.js') >= 0) {
		tap.base_path = '';
	} else {
		// In deployment
		tap.base_path = script_src.substring(0, script_src.lastIndexOf('/')) + '/';
		console.log('TAP.js base path: ' + tap.base_path);
	}

	_.extend(tap, Backbone.Events);
	/*
	 * Takes care of storing/loading data in local storage and initializing
	 * the tour collection.
	 * @param url The url to the TourML document
	 * @param config Optional configuration object
	 */
	tap.initApp = function(url, config) {

		tap.url = url;

		if (config === undefined) config = {};
		tap.config = _.defaults(config, {
			default_index: 'tourstoplist',
			StopListView: {
				codes_only: true
			}
		});

		// trigger tap init start event
		tap.trigger('tap.init.start');

		// create new instance of tour collection
		tap.tours = new TapAPI.collections.Tours();

		tap.tours.fetch();

		// populate local storage if this is a first run
		if(!tap.tours.length) {
			// load tourML
			var tourML = xmlToJson(loadXMLDoc(tap.url));
			var i, len;
			if(tourML.tour) { // Single tour
				tap.initModels(tourML.tour);
			} else if(tourML.tourSet && tourML.tourSet.tourRef) { // TourSet w/ external tours
				len = tourML.tourSet.tourRef.length;
				for(i = 0; i < len; i++) {
					var data = xmlToJson(loadXMLDoc(tourML.tourSet.tourRef[i].uri));
					tap.initModels(data.tour);
				}
			} else if(tourML.tourSet && tourML.tourSet.tour) { // TourSet w/ tours as children elements
				len = tourML.tourSet.tour.length;
				for(i = 0; i < len; i++) {
					tap.initModels(tourML.tourSet.tour[i]);
				}
			}
		}
		// trigger tap init end event
		tap.trigger('tap.init.end');

		// initialize router
		tap.router = new AppRouter();
		
	};
    
	/*
	 * Initialize models with data
	 */
	tap.initModels = function(data) {
		// create new tour
		tap.tours.create({
			id: data.id,
			appResource: data.tourMetadata && data.tourMetadata.appResource ? objectToArray(data.tourMetadata.appResource) : undefined,
			//appResource: objectToArray(data.appResource),
			connection: objectToArray(data.connection),
			description: data.tourMetadata && data.tourMetadata.description ? objectToArray(data.tourMetadata.description) : undefined,
			lastModified: data.tourMetadata && data.tourMetadata.lastModified ? data.tourMetadata.lastModified : undefined,
			propertySet: data.tourMetadata && data.tourMetadata.propertySet ? objectToArray(data.tourMetadata.propertySet.property) : undefined,
			publishDate: data.tourMetadata && data.tourMetadata.publishDate ? objectToArray(data.tourMetadata.publishDate) : undefined,
			rootStopRef: data.tourMetadata && data.tourMetadata.rootStopRef ? data.tourMetadata.rootStopRef : undefined,
			title: data.tourMetadata && data.tourMetadata.title ? objectToArray(data.tourMetadata.title) : undefined
		});

		var i, j;
		// create new instance of StopCollection
		var stops = new TapAPI.collections.Stops(null, data.id);
		// load tour models
		var numStops = data.stop.length;
		for (i = 0; i < numStops; i++) {
			var connections = [];
			if(!_.isUndefined(data.connection)) {
				for(j = 0; j < data.connection.length; j++) {
					if(data.connection[j].srcId == data.stop[i].id) {
						connections.push({priority: data.connection[j].priority, destId: data.connection[j].destId});
					}
				}
			}
			stops.create({
				id: data.stop[i].id,
				connection: connections,
				view: data.stop[i].view,
				description: objectToArray(data.stop[i].description),
				propertySet: data.stop[i].propertySet ? objectToArray(data.stop[i].propertySet.property) : undefined,
				assetRef: objectToArray(data.stop[i].assetRef),
				title: objectToArray(data.stop[i].title)
			});
		}

		// create new instance of AssetCollection
		var assets = new TapAPI.collections.Assets(null, data.id);
		// load asset models
		var numAssets = data.asset.length;
		for (i = 0; i < numAssets; i++) {
			// modifiy source propertySet child to match similar elements
			if(data.asset[i].source && data.asset[i].source) {
				var propertySet = [];
				var numSources = data.asset[i].source.length;
				for (j = 0; j < numSources; j++) {
					if(data.asset[i].source[j].propertySet) {
						data.asset[i].source[j].propertySet = data.asset[i].source[j].propertySet.property;
					}
				}
			}
			assets.create({
				assetRights: objectToArray(data.asset[i].assetRights),
				content: objectToArray(data.asset[i].content),
				id: data.asset[i].id,
				source: objectToArray(data.asset[i].source),
				propertySet: data.asset[i].propertySet ? objectToArray(data.asset[i].propertySet.property) : undefined
			});
		}
		// clear out the temporary models
		stops.reset();
		assets.reset();
	};
}

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
// TapAPI Namespace Initialization //

jQuery(function() {

	// Check for geolocation support
	if (!navigator.geolocation) return;

	TapAPI.geoLocation = {

		latest_location: null,

		locate: function() {

			navigator.geolocation.getCurrentPosition(
				TapAPI.geoLocation.locationReceived,
				TapAPI.geoLocation.locationError
			);

		},

		locationReceived: function(position) {
			//console.log('got location', position);
			TapAPI.geoLocation.latest_location = position;
			TapAPI.geoLocation.computeStopDistance(position);
			TapAPI.geoLocation.trigger('gotlocation', position);
		},

		locationError: function(error) {
			console.log('locationError', error);
		},

		// When the stop collection is reset, check for geo assets
		stopsReset: function() {

			_.each(tap.tourStops.models, function(stop) {

				if (stop.get('location') === undefined) {

					var geo_assets = stop.getAssetsByUsage('geo');
					if (geo_assets) {

						// Parse the contents of the asset
						var data = $.parseJSON(geo_assets[0].get('content')[0].data.value);

						if (data.type == 'Point') {
							stop.set('location', new L.LatLng(data.coordinates[1], data.coordinates[0]));
						}

					}

				}

			});

		},

		computeStopDistance: function(position) {

			var latlon = new L.LatLng(position.coords.latitude, position.coords.longitude);

			_.each(tap.tourStops.models, function(stop) {

				var stop_location = stop.get('location');
				if (stop_location !== undefined) {
					var d = latlon.distanceTo(stop_location);
					stop.set('distance', d);
				}

			});

		}

	};

	_.extend(TapAPI.geoLocation, Backbone.Events);

	TapAPI.geoLocation.locate();
	setInterval(TapAPI.geoLocation.locate, 5000);

});
// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.templates === 'undefined'){TapAPI.templates = {};}
// TapAPI Namespace Initialization //

TapAPI.templateManager = {

        get : function(templateName) {
                if (TapAPI.templates[templateName] === undefined) {
                        $.ajax({
                                async : false,
                                dataType : 'html',
                                url : 'js/backbone/templates/' + templateName + '.tpl.html',
                                success : function(data, textStatus, jqXHR) {
                                        TapAPI.templates[templateName] = _.template(data);
                                }
                        });
                }

                return TapAPI.templates[templateName];
        }

};
// TapAPI Namespace Initialization //
if (typeof TapAPI === "undefined"){TapAPI = {};}
if (typeof TapAPI.templates === "undefined"){TapAPI.templates = {};}
// TapAPI Namespace Initialization //
TapAPI.templates['audio-stop'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'tour-stop audio\'>\n\t<div class=\'title\'>'+
( tourStopTitle )+
'</div>\n\t<audio id="audio-player" autoplay controls="controls">\n\t\t<p>Your browser does not support the audio element.</p>\n\t</audio>\t\n\t<video id="video-player" autoplay controls="controls" style=\'display:none;\'>\n\t\t<p>Your browser does not support the video element.</p>\n\t</video>\n</div>';
}
return __p;
}
TapAPI.templates['dialog'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div data-role="dialog" id="'+
( id )+
'">\n\t<div data-role="header" data-theme="d">\n\t\t<h1></h1>\n\t</div>\n\t<div data-role="content" data-theme="c" align="center">\n\t\t'+
( content )+
'\n\t</div>\n</div>';
}
return __p;
}
TapAPI.templates['image-stop'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="soloImage">\n\t<a href="'+
( tourImageUri )+
'"><img src="'+
( tourImageUri )+
'" alt="Image 01" class="primaryImg" /></a>\n\t<div class=\'title\'>'+
( tourStopTitle )+
'</div>\n</div>';
}
return __p;
}
TapAPI.templates['keypad'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<fieldset class="ui-grid-b" id="keypad" data-theme=\'d\'>\n\t<div class="ui-block-a" id="writeStyle">\n\t\t<div class="ui-bar" id="write"></div>\n\t</div>\n\t<div class="ui-block-b">\n\t\t<div class="ui-bar ui-bar-d" id="gobtn">Go</div>\t\n\t</div>\n\t<div class="ui-block-a"><div class="button ui-bar ui-bar-d">1</div></div>\n\t<div class="ui-block-b"><div class="button ui-bar ui-bar-d">2</div></div>\t \n\t<div class="ui-block-b"><div class="button ui-bar ui-bar-d">3</div></div>  \n\t<div class="ui-block-a"><div class="button ui-bar ui-bar-d">4</div></div>\n\t<div class="ui-block-b"><div class="button ui-bar ui-bar-d">5</div></div>\t \n\t<div class="ui-block-b"><div class="button ui-bar ui-bar-d">6</div></div>  \n\t<div class="ui-block-a"><div class="button ui-bar ui-bar-d">7</div></div>\n\t<div class="ui-block-b"><div class="button ui-bar ui-bar-d">8</div></div>\t \n\t<div class="ui-block-b"><div class="button ui-bar ui-bar-d">9</div></div>  \n\t<div class="ui-block-a"><div class="button ui-bar ui-bar-d">0</div></div>\n\t<div class="ui-block-b" id="clearStyle">\n\t\t<div class="ui-bar ui-bar-d" id="delete">Clear</div>\n\t</div>\n</fieldset>\n';
}
return __p;
}
TapAPI.templates['page'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div data-role="header">\n\t<a id=\'back-button\' data-rel="back">'+
( back_label )+
'</a>\n\t';
 if (header_nav) { 
;__p+='\n\t<div id=\'index-selector\' class=\'ui-title\' data-role="controlgroup" data-type="horizontal" data-mini="true">\n\t\t';
 _.each(nav_menu, function(item) { 
;__p+='\n\t\t<a data-role="button" '+
( (active_index == item.prefix) ? 'data-theme="b"' : "" )+
' href=\'#'+
( item.prefix )+
'/'+
( tour_id )+
'\'>'+
( item.label )+
'</a>\n\t\t';
 }); 
;__p+='\n\t</div>\n\t';
 } else { 
;__p+='\n\t<h1 id="page-title">'+
( title )+
'</h1>\n\t';
 } 
;__p+='\n</div>\n<div data-role="content">\n</div>\n<!--\n<div data-role="footer">\n</div>\n-->';
}
return __p;
}
TapAPI.templates['stop-group-list-item'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#tourstop/'+
( tourId )+
'/'+
( id )+
'">'+
( title )+
'</a>\n';
}
return __p;
}
TapAPI.templates['stop-group'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'tour-stop stop-group\' style="width:100%;">\n\t<div class=\'title\'>'+
( tourStopTitle )+
'</div>\n\t<div class=\'description\'>'+
( description )+
'</div>\n\t<ul id="stop-list" class="ui-listview" data-inset="true" data-role="listview"></ul>\n</div>\n';
}
return __p;
}
TapAPI.templates['stop'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'stop\' style="width:100%;">\n\t<div class=\'title\'>'+
( tourStopTitle )+
'</div>\n\t<div class=\'description\'>'+
( tourStopDescription )+
'</div>\n</div>\n';
}
return __p;
}
TapAPI.templates['tour-details'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="">\t\t\t\n\t<a href="#'+
( tour_index )+
'/'+
( tour_id )+
'" id="start-tour" data-role="button" data-theme="b">Start Tour</a>\n</div>\n<div class=\'tour-details\'>\n\t'+
( description )+
'\n</div>\n';
}
return __p;
}
TapAPI.templates['tour-list-item'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#tour/'+
( id )+
'">'+
( title )+
'</a>\n';
}
return __p;
}
TapAPI.templates['tour-list'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul id="tour-list" class="ui-listview" data-inset="true" data-role="listview"></ul>';
}
return __p;
}
TapAPI.templates['tour-map-marker-bubble'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'marker-bubble-content\'>\n\t<div class=\'title\'>'+
( title )+
'</div>\n\t<div class=\'distance\'>'+
( distance )+
'</div>\n\t<div class=\'view-button\'><a href=\'#tourstop/'+
( tour_id )+
'/'+
( stop_id )+
'\'>View stop</a></div>\n\t<div class=\'directions\'>Get Directions</div>\n</div>';
}
return __p;
}
TapAPI.templates['tour-map'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id=\'tour-map\'>Unable to display the map</div>';
}
return __p;
}
TapAPI.templates['tour-stop-list-item'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href=\'#tourstop/'+
( tour_id )+
'/'+
( stop_id )+
'\'>'+
( title )+
'</a>';
}
return __p;
}
TapAPI.templates['tour-stop-list'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul id="tour-stop-list" class="ui-listview" data-inset="true" data-role="listview"></ul>';
}
return __p;
}
TapAPI.templates['video-stop'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'tour-stop video\'>\n\t<div class=\'title\'>'+
( tourStopTitle )+
'</div>\n\t<video id="video-player" poster="assets/images/tapPoster.png" controls="controls" autoplay="autoplay">\n\t\t<p>Your browser does not support the video tag.</p>\n\t</video>\n</div>\n';
}
return __p;
}