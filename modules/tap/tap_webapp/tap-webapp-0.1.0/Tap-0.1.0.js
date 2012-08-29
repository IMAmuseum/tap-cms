/*
 * TAP - v0.1.0 - 2012-08-28
 * http://tapintomuseums.org/
 * Copyright (c) 2011-2012 Indianapolis Museum of Art
 * GPLv3
 */

function AnalyticsTimer(category, variable, opt_label) {
  this.category = category;
  this.variable = variable;
  this.label = opt_label ? opt_label : undefined;
  this.start_time = null;
  this.elapsed = 0;
  this.min_threshold = null;
  this.max_threshold = null;
  this.min_clamp = false;
  this.max_clamp = true;
  return this;
}

AnalyticsTimer.prototype.start = function() {
  this.start_time = new Date().getTime();
  return this;
};

AnalyticsTimer.prototype.stop = function() {
  if (this.start_time !== null) {
    this.elapsed = this.elapsed + (new Date().getTime()) - this.start_time;
    this.start_time = null;
  }
  return this;
};

AnalyticsTimer.prototype.reset = function() {
  this.elapsed = 0;
  return this;
};

AnalyticsTimer.prototype.send = function() {

  this.stop(); // update the timer

  // If threshold criteria are not met, do not send
  if (
    ((this.min_threshold === null) || this.min_clamp || (this.elapsed >= this.min_threshold)) &&
    ((this.max_threshold === null) || this.max_clamp || (this.elapsed <= this.max_threshold))
  ) {

    // At this point, we should clamp
    if ((this.min_threshold !== null) && (this.elapsed < this.min_threshold)) this.elapsed = this.min_threshold;
    if ((this.max_threshold !== null) && (this.elapsed > this.max_threshold)) this.elapsed = this.max_threshold;

    window._gaq.push(['_trackTiming', this.category, this.variable, this.elapsed, this.label]);

  }

  this.start(); // keep the timer running

  return this;

};
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
	parse: function(response) {
		response.propertySet = new TapAPI.collections.PropertySet(
			response.propertySet,
			{id: response.id}
		);

		if (response.source) {
			response.source = new TapAPI.collections.Sources(
				response.source,
				{
					id: response.id,
					asset: this
				}
			);
		}

		if (response.content) {
			response.content = new TapAPI.collections.Content(
				response.content,
				{
					id: response.id,
					asset: this
				}
			);
		}

		return response;
	},
	getSourcesByPart: function(part) {
		if (_.isUndefined(this.get('source'))) return undefined;

		var sources, models;
		sources = this.get('source').where({"part": part, "lang": tap.language});
		if (sources.length === 0) {
			sources = this.get('source').where({"part": part});
		}
		if (sources.length) {
			models = sources;
		}
		return models;
	},
	getContentsByPart: function(part) {
		if (_.isUndefined(this.get('content'))) return undefined;

		var contents, models;
		contents = this.get('content').where({"part": part, "lang": tap.language});
		if (contents.length === 0) {
			contents = this.get('content').where({"part": part});
		}
		if (contents.length) {
			models = contents;
		}
		return models;
	},
	getSourcesByFormat: function(format) {
		if (_.isUndefined(this.get('source'))) return undefined;

		var sources, models;
		sources = this.get('source').where({"format": format, "lang": tap.language});
		if (sources.length === 0) {
			sources = this.get('source').where({"format": format});
		}
		if (sources.length) {
			models = sources;
		}
		return models;
	},
	getContentsByFormat: function(format) {
		if (_.isUndefined(this.get('content'))) return undefined;

		var contents, models;
		contents = this.get('content').where({"format": format, "lang": tap.language});
		if (contents.length === 0) {
			contents = this.get('content').where({"format": format});
		}
		if (contents.length) {
			models = contents;
		}
		return models;
	}
});
// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.models === 'undefined'){TapAPI.models = {};}
// TapAPI Namespace Initialization //

// define asset model
TapAPI.models.Content = Backbone.Model.extend({
	initialize: function() {
		//parse never gets called due to this not being in localstorage as its own record
		this.set('propertySet', new TapAPI.collections.PropertySet(
			this.get('propertySet'),
			{id: this.id}
		));

		if (this.get('data').value) {
			this.set('data', this.get('data').value);
		}
	},
	getAsset: function() {
		return this.collection.asset;
	},
	save: function() {
		this.collection.asset.save();
	},
	defaults: {
		'lang': undefined,
		'propertySet': undefined,
		'data': undefined,
		'format': undefined,
		'lastModified': undefined,
		'part': undefined
	}
});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.models === 'undefined'){TapAPI.models = {};}
// TapAPI Namespace Initialization //

// define asset model
TapAPI.models.Property = Backbone.Model.extend({
	defaults: {
		'name': undefined,
		'value': undefined,
		'lang': undefined
	}
});

// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.models === 'undefined'){TapAPI.models = {};}
// TapAPI Namespace Initialization //

// define asset model
TapAPI.models.Source = Backbone.Model.extend({
	initialize: function() {
		//parse never gets called due to this not being in localstorage as its own record
		this.set('propertySet', new TapAPI.collections.PropertySet(
			this.get('propertySet'),
			{id: this.id}
		));
	},
	getAsset: function() {
		return this.collection.asset;
	},
	save: function() {
		this.collection.asset.save();
	},
	defaults: {
		'lang': undefined,
		'propertySet': undefined,
		'uri': undefined,
		'format': undefined,
		'lastModified': undefined,
		'part': undefined
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
			case 'description':
			case 'title':
				if (this.attributes[attr].length === 0) return undefined;

				var value, property;

				property = _.find(this.attributes[attr], function(item) {
					return item.lang === tap.language;
				});

				if (!property && tap.language !== tap.defaultLanguage) {
					property = _.find(this.attributes[attr], function(item) {
						return item.lang === tap.defaultLanguage;
					});
				}

				if (!property) {
					property = _.find(this.attributes[attr], function(item) {
						return item.lang === undefined || item.lang === "";
					});
				}

				if (property) {
					value = property.value;
				}

				return value;
			default:
				return this.attributes[attr];
		}
	},
	parse: function(response) {
		response.propertySet = new TapAPI.collections.PropertySet(
			response.propertySet,
			{id: response.id}
		);

		return response;
	},
	/**
	* Retrieves all asset models for a stop
	* @return array An array of asset models
	*/
	getAssets: function() {
		if(_.isUndefined(this.get('assetRef'))) return undefined;
		var assets = [];
		_.each(this.get('assetRef'), function(item) {
			assets.push(tap.tourAssets.get(item.id));
		});
		return _.isEmpty(assets) ? undefined : assets;
	},
	/**
	* Retrieves an asset with a given usage
	* @param string usage The asset usage
	* @return mixed The asset model
	*/
	getAssetsByUsage: function(usage) {
		if(_.isUndefined(this.get('assetRef'))) return undefined;
		var assets = [];
		_.each(this.get('assetRef'), function(item) {
			if(item['usage'] === usage) {
				assets.push(tap.tourAssets.get(item.id));
			}
		});
		return _.isEmpty(assets) ? undefined : assets;
	},
	getAssetsByType: function(type) {
		if(_.isUndefined(this.get('assetRef'))) return undefined;
		if (!_.isArray(type)) {
			type = [type];
		}
		var assets = [];
		_.each(this.get('assetRef'), function(item) {
			var asset = tap.tourAssets.get(item.id);
			if (_.indexOf(type, asset.get('type')) > -1) {
				assets.push(asset);
			}
		});
		return _.isEmpty(assets) ? undefined : assets;
	},
	/**
	* Retrieves a sorted array of connections
	* @return array The connection array ordered by priority in ascending order
	*/
	getSortedConnections: function() {
		if(_.isUndefined(this.get('connections'))) return undefined;
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
			case 'description':
			case 'title':
				if (this.attributes[attr].length === 0) return undefined;

				var value, property;

				property = _.find(this.attributes[attr], function(item) {
					return item.lang === tap.language;
				});

				if (!property && tap.language !== tap.defaultLanguage) {
					property = _.find(this.attributes[attr], function(item) {
						return item.lang === tap.defaultLanguage;
					});
				}

				if (!property) {
					property = _.find(this.attributes[attr], function(item) {
						return item.lang === undefined || item.lang === "";
					});
				}

				if (property) {
					value = property.value;
				}
				
				return value;
			default:
				return this.attributes[attr];
		}
	},
	parse: function(response) {
		response.propertySet = new TapAPI.collections.PropertySet(
			response.propertySet,
			{id: response.id}
		);

		return response;
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

// define sources collection
TapAPI.collections.Content = Backbone.Collection.extend({
	model: TapAPI.models.Content,
	initialize: function(models, options) {
		this.localStorage = new Backbone.LocalStorage(options.id + '-source');
		this.asset = options.asset;
	}
});
// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.collections === 'undefined'){TapAPI.collections = {};}
// TapAPI Namespace Initialization //

// define assett collection
TapAPI.collections.PropertySet = Backbone.Collection.extend({
	model: TapAPI.models.Property,
	initialize: function(models, options) {
		this.localStorage = new Backbone.LocalStorage(options.id + '-propertyset');
	},
	getValueByName: function(propertyName) {
		var property, value;
		property = this.where({"name": propertyName, "lang": tap.language});
		if (property.length === 0) {
			property = this.where({"name": propertyName});
		}
		if (property.length) {
			value = property[0].get('value');
		}
		return value;
	}
});
// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.collections === 'undefined'){TapAPI.collections = {};}
// TapAPI Namespace Initialization //

// define sources collection
TapAPI.collections.Sources = Backbone.Collection.extend({
	model: TapAPI.models.Source,
	initialize: function(models, options) {
		this.localStorage = new Backbone.LocalStorage(options.id + '-source');
		this.asset = options.asset;
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
			var code = this.models[i].get('propertySet').where({"name":"code", "value":key});
			if (code.length) {
				return this.models[i];
			}
		}
		return undefined;
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

		if (tap.currentTour == id) return;

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

		// load data from local storage
		tap.tourAssets.fetch();
		tap.tourStops.fetch();

		tap.trigger("tap.tour.selected");
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

			// TODO: check for an index menu setting in the current tour

			// Check for a default app index menu setting
			var navbar_items = null;
			if (tap.config.navbar_items !== undefined) {
				navbar_items = tap.config.navbar_items;
			} else {
				navbar_items = [
					{ label: 'Menu', endpoint: 'tourstoplist' },
					{ label: 'Keypad', endpoint: 'tourkeypad' },
					{ label: 'Map', endpoint: 'tourmap'}
				];
			}

			var header_nav_default = true;
			var footer_nav_default = false;
			if (tap.config.navbar_location !== undefined) {
				if (tap.config.navbar_location == 'footer') {
					header_nav_default = false;
					footer_nav_default = true;
				}
			}

			_.defaults(this.options, {
				page_title: '',
				back_label: 'Back',
				nav_menu: navbar_items,
				active_index: null,
				header_nav: header_nav_default,
				footer_nav: footer_nav_default
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
				footer_nav: this.options.footer_nav,
				nav_menu: this.options.nav_menu,
				active_index: this.options.active_index,
				tour_id: tap.currentTour
			}));
			this.renderContent();

			// Set width on the index selector control group so that it can center
			$(document).ready(function() {
				var w = 0;
				$items = $('#index-selector a').each(function() {
					w += $(this).outerWidth();
				});
				$('#index-selector .ui-controlgroup-controls').width(w);
			});

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

		onInit: function() {

			if (tap.audio_timer === undefined) {
				tap.audio_timer = new AnalyticsTimer('AudioStop', 'played_for', tap.currentStop.id);
			}
			tap.audio_timer.reset();
			console.log('init');

		},

		renderContent: function() {

			var content_template = TapAPI.templateManager.get('audio-stop');
			var contentContainer = this.$el.find(":jqmData(role='content')");

			// Find the transcription if one exists
			var assets = this.model.getAssetsByUsage("transcription");
			var transcription = null;
			if (assets !== undefined) {
				transcription = assets[0].get('content').at(0).get('data');
			}

			// Find the poster image if one exists
			var poster_image_path = null;
			assets = this.model.getAssetsByUsage("image");
			if (assets !== undefined) {
				poster_image_path = assets[0].get('source').at(0).get('uri');
			}

			// Render from the template
			contentContainer.append(content_template({
				tour_stop_title: this.model.get('title'),
				transcription: transcription,
				poster_image_path: poster_image_path
			}));

			// Add click handler on the transcription toggle button
			this.$el.find('#trans-button').click(function() {
				var t = $('.transcription').toggleClass('hidden');
				if (t.hasClass('hidden')) {
					$('.ui-btn-text', this).text('Show Transcription');
					_gaq.push(['_trackEvent', 'AudioStop', 'hide_transcription']);
				} else {
					$('.ui-btn-text', this).text('Hide Transcription');
					_gaq.push(['_trackEvent', 'AudioStop', 'show_transcription']);
				}
			});

			assets = this.model.getAssetsByType(["tour_audio", "tour_video"]);

			if (assets) {

				var audioPlayer = this.$el.find('#audio-player');
				var videoPlayer = this.$el.find('#video-player');
				var videoAspect;

				_.each(assets, function(asset) {
					var sources = asset.get('source');

					// Add sources to the media elements
					sources.each(function(source){
						var source_str = "<source src='" + source.get('uri') + "' type='" + source.get('format') + "' />";

						switch(source.get('format').substring(0,5)) {
							case 'audio':
								audioPlayer.append(source_str);
								break;
							case 'video':
								videoPlayer.append(source_str);
								
								break;
							default:
								console.log('Unsupported format for audio asset:', assetSource);
						}
					});
				});

				var mediaOptions = {};
				var mediaElement = null;

				// If there are video sources and no audio sources, switch to the video element
				if (videoPlayer.find('source').length && !audioPlayer.find('source').length) {

					audioPlayer.remove();
					this.$el.find('.poster-image').remove();
					videoPlayer.show();
					mediaOptions.defaultVideoWidth = '100%';
					mediaOptions.defaultVideoHeight = 270;

					mediaElement = videoPlayer;

				} else {

					videoPlayer.remove();
					mediaOptions.defaultAudioWidth = '100%';
					//mediaOptions.defaultAudioHeight = 270;

					mediaElement = audioPlayer;

				}

				mediaElement.mediaelementplayer(mediaOptions);

				mediaElement[0].addEventListener('loadedmetadata', function() {
					tap.audio_timer.max_threshold = mediaElement[0].duration * 1000;
				});

				mediaElement[0].addEventListener('play', function() {
					_gaq.push(['_trackEvent', 'AudioStop', 'media_started']);
					tap.audio_timer.start();
				});

				mediaElement[0].addEventListener('pause', function() {
					_gaq.push(['_trackEvent', 'AudioStop', 'media_paused']);
					tap.audio_timer.stop();
				});

				mediaElement[0].addEventListener('ended', function() {
					_gaq.push(['_trackEvent', 'AudioStop', 'media_ended']);
				});

			}

			return this;
		},

		onClose: function() {

			// Send information about playback duration when the view closes
			tap.audio_timer.send();

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

			this.$el.find(":jqmData(role='content')").append(content_template({
				tourStopTitle : this.model.get("title") ? this.model.get("title") : undefined,
				tourStopDescription : this.model.get('description') ? this.model.get('description') : undefined
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

			var asset_refs = tap.currentStop.get("assetRef");
			var content_template = TapAPI.templateManager.get('image-stop');
			var imageTemplate = TapAPI.templateManager.get('image-stop-item');

			if (asset_refs) {
				this.$el.find(":jqmData(role='content')").append(content_template());

				var gallery = this.$el.find("#Gallery");

				$.each(asset_refs, function(assetRef) {
					var asset = tap.tourAssets.get(this.id);

					if (this.usage === "image_asset") {
						var templateData = {};
						var sources = asset.get('source');
						var content = asset.get('content');
						sources.each(function(source) {
							switch (source.get('part')) {
								case "image_asset_image":
									templateData.fullImageUri = source.get("uri") ? source.get("uri") : '';
									break;
								case "thumbnail":
									templateData.thumbUri = source.get("uri") ? source.get("uri") : '';
									break;
							}
						});
						content.each(function(contentItem) {
							console.log(contentItem);
							switch(contentItem.get("part")) {
								case "title":
									templateData.title = contentItem.get("data");
									break;
								case "caption":
									templateData.caption = contentItem.get("caption");
									break;
							}
						});

						gallery.append(imageTemplate(templateData));
					}
				});

				var photoSwipe = this.$el.find('#Gallery a').photoSwipe({
					enableMouseWheel: false,
					enableKeyboard: true,
					doubleTapZoomLevel : 0,
					captionAndToolbarOpacity : 0.8,
					minUserZoom : 0.0,
					preventSlideshow : true,
					jQueryMobile : true
				});
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

			this.options.active_index = 'tourmap';

			this.tile_layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>',
				maxZoom: 18
			});

			this.map = null;
			this.stop_markers = {};
			this.stop_icons = {};
			this.stop_popups = {};
			this.stop_bounds = null;
			this.position_marker = null;
			this.view_initialized = false;

			this.location_icon = L.divIcon({
				className: 'location-icon'
			});

			this.stop_icon = L.divIcon({
				className: 'stop-icon'
			});

			_.defaults(this.options, {
				'init-lat': null,
				'init-lon': null,
				'init-zoom': 2
			});

		},

		renderContent: function() {

			TapAPI.geoLocation.startLocating();

			var content_template = TapAPI.templateManager.get('tour-map');

			//$(":jqmData(role='page')", this.$el).attr('id', 'tour-map-page');
			$(":jqmData(role='content')", this.$el).addClass('map-content').append(content_template());

			$(":jqmData(role='page')").live('pageshow', {map_view: this}, function(e) {
				e.data.map_view.resizeContentArea();
				if (e.data.map_view.map === null) {
					e.data.map_view.initMap();
				}
				setTimeout(e.data.map_view.resizeContentArea, 2000);
			});

			$(window).bind('orientationchange resize', this.resizeContentArea);

		},


		initMap: function() {

			this.map = new L.Map('tour-map');

			this.map.addLayer(this.tile_layer);

			// Add the stop markers
			_.each(this.options['stops'].models, this.plotTourStopMarker, this);
			TapAPI.geoLocation.active_stop_collection = this.options['stops'];

			// Determine the bounding region
			_.each(this.stop_markers, function(marker) {

				var l = marker.getLatLng();
				if (this.stop_bounds === null) {
					this.stop_bounds = new L.LatLngBounds(l,l);
				} else {
					this.stop_bounds.extend(l);
				}

			}, this);

			// Set the viewport based on settings
			if ((this.options['init-lat'] === null) || (this.options['init-lon'] === null)) {
				if (this.stop_bounds !== null) {
					this.map.fitBounds(this.stop_bounds);
				} else {
					this.map.setView(L.latLng(0,0), this.options['init-zoom']);
				}
			} else {
				this.map.setView(
					new L.LatLng(this.options['init-lat'], this.options['init-lon']),
					this.options['init-zoom']
				);
			}

			// At this point the stop markers should be added to the map
			// We can augment them with the distance labels
			_.each(this.options['stops'].models, function(stop) {
				tap.tours.selectTour(stop.get('tour'));
				if (stop.getAssetsByUsage('geo') === undefined) return;
				this.updateStopMarker(stop);
			}, this);

			if (TapAPI.geoLocation.latest_location !== null) {
				this.onLocationFound(TapAPI.geoLocation.latest_location);
			}
			TapAPI.geoLocation.on("gotlocation", this.onLocationFound, this);

			return this;
		},


		generateBubbleContent: function(stop, formatted_distance) {

			if (formatted_distance === undefined) {
				if (stop.get('distance')) {
					formatted_distance = TapAPI.geoLocation.formatDistance(stop.get('distance'));
				}
			}

			var template = TapAPI.templateManager.get('tour-map-marker-bubble');
			return template({
				'title': stop.get('title'),
				'tour_id': stop.get('tour'),
				'stop_id': stop.get('id'),
				'distance': (formatted_distance === undefined) ? '' : 'Distance: ' + formatted_distance,
				'stop_lat': stop.get('location').lat,
				'stop_lon': stop.get('location').lng
			});

		},


		// Plot a single tour stop marker on the map
		// @note Assumes that the context is set to { stop: (StopModel), map_view: (MapView) }
		plotTourStopMarker: function(stop) {

			// Make sure the proper tour is active
			tap.tours.selectTour(stop.get('tour'));

			// Find the geo assets for this stop
			var geo_assets = stop.getAssetsByUsage('geo');
			if (geo_assets === undefined) return;

			// Parse the contents of the first geo asset
			var content = geo_assets[0].get('content');
			if (content === undefined) return;
			var data = $.parseJSON(content.at(0).get('data'));

			if (data.type == 'Point') {

				var stop_icon = L.divIcon({
					className: 'stop-icon ' + stop.id
				});

				var marker_location = new L.LatLng(data.coordinates[1], data.coordinates[0]);
				var marker = new L.Marker(marker_location, { icon: stop_icon });

				var popup = new L.Popup();
				popup.setLatLng(marker_location);
				popup.setContent(this.generateBubbleContent(stop));
				this.stop_popups[stop.id] = popup;

				marker.stop_id = stop.id;
				marker.addEventListener('click', this.onMarkerSelected, this);

				this.stop_icons[stop.id] = stop_icon;
				this.stop_markers[stop.id] = marker;
				this.map.addLayer(marker);

			}

			// Update the marker bubble when the distance to a stop changes
			stop.on('change:distance', this.updateStopMarker, this);

		},


		updateStopMarker: function(stop) {

			var formatted_distance = undefined;
			if (stop.get('distance')) {
				formatted_distance = TapAPI.geoLocation.formatDistance(stop.get('distance'));
			}

			this.stop_popups[stop.id].setContent(this.generateBubbleContent(stop), formatted_distance);

			// Update the stop icon
			var distance_label = $('.stop-icon.' + stop.id + ' .distance-label');

			if (distance_label.length === 0) {
				template = TapAPI.templateManager.get('tour-map-distance-label');
				$('.stop-icon.' + stop.id).append(template({
					distance: formatted_distance
				}));
			} else {
				distance_label.html(formatted_distance);
			}

		},


		// When a marker is selected, show the popup
		// Assumes that the context is set to (MapView)
		onMarkerSelected: function(e) {

			_gaq.push(['_trackEvent', 'Map', 'marker_clicked', e.target.stop_id]);

			this.map.openPopup(this.stop_popups[e.target.stop_id]);

			$('.marker-bubble-content .directions a').on('click', function() {
				_gaq.push(['_trackEvent', 'Map', 'get_directions', e.target.stop_id]);
			});

		},


		onLocationFound: function(position) {

			//console.log('onLocationFound', position);
			var latlng = new L.LatLng(position.coords.latitude, position.coords.longitude);

			if (this.position_marker === null) {

				this.position_marker = new L.Marker(latlng, {icon: this.location_icon});
				this.position_marker.bindPopup('You are here');
				this.map.addLayer(this.position_marker);

				this.position_marker.addEventListener('click', function() {
					_gaq.push(['_trackEvent', 'Map', 'you_are_here_clicked']);
				});

			} else {

				this.position_marker.setLatLng(latlng);

			}

		},


		onLocationError: function(e) {

			console.log('onLocationError', e);

			// TODO: hide the position marker?

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
			TapAPI.geoLocation.stopLocating();
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
				tourStopTitle : this.model.get('title')
			};

			var description = this.model.get("description");
			if (description !== undefined) {
				template_args['description'] = description;
			} else {
				template_args['description'] = '';
			}

			this.$el.find(":jqmData(role='content')").append(content_template(template_args));

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
				title: this.model.get('title') ? this.model.get('title') : undefined,
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

		events: {
			'change #proximity-toggle': 'onToggleProximity'
		},

		onInit: function() {

			this.options = _.defaults(this.options, {
				active_index: 'tourstoplist',
				codes_only: true,
				enable_proximity_order: true,
				sort: 'default'
			});

			// Turn off proximity ordering if the tour has no geolocated stops
			var geo = false;
			_.each(tap.tourStops.models, function(stop) {
				if (stop.getAssetsByUsage('geo') !== undefined) {
					geo = true;
				}
			});
			if (geo === false) {
				this.options.enable_proximity_order = false;
			}

			if (this.options.enable_proximity_order) {
				TapAPI.geoLocation.on("gotlocation", this.onLocationFound, this);
			}

			this.stoplistitems = {};

			tap.tourStops.comparator = this.sortByCode;
			tap.tourStops.sort();

		},

		renderContent: function() {
			var content_template = TapAPI.templateManager.get('tour-stop-list');

			this.$el.find(":jqmData(role='content')").append(content_template({
				enable_proximity_order: this.options.enable_proximity_order
			}));

			// TODO: figure out a better way to avoid rendering again
			//if ($('li', this.$el).length == tap.tourStops.models.length) return;

			var listContainer = this.$el.find('#tour-stop-list');
			
			this.addStopsToList(listContainer);

			if (this.options.enable_proximity_order) {
				TapAPI.geoLocation.startLocating();
			}

		},


		addStopsToList: function(listContainer) {

			_.each(tap.tourStops.models, function(stop) {

				// If in codes-only mode, abort if the stop does not have a code
				if (this.options.codes_only) {
					var code = stop.get('propertySet').where({"name":"code"});
					if (!code.length) return;
				}

				var item = this.stoplistitems[stop.id];
				if (item === undefined) {
					item = new TapAPI.views.StopListItem({model: stop});
					this.stoplistitems[stop.id] = item;
					listContainer.append(item.render().el);

					if (stop.get('nearest')) {
						item.$el.addClass('nearest');
					}

					if (this.options.enable_proximity_order) {
						stop.on("change:distance", this.onStopDistanceChanged, item);
						stop.on("change:nearest", this.onNearestStopChanged, item);
					}

				} else {
					listContainer.append(item.render().el);
				}
	
			}, this);

			$('#tour-stop-list').listview('refresh');

		},


		sortByCode: function(stop) {
			var code = stop.get('propertySet').where({"name":"code"});
			if (!code.length) return 10000;
			return code[0].get('value');
		},

		sortByDistance: function(stop) {
			var d = stop.get('distance');
			return (d === undefined) ? -1 : d;
		},

		onToggleProximity: function() {

			if (this.options.sort == 'default') {
				this.options.sort = 'proximity';
				tap.tourStops.comparator = this.sortByDistance;
				tap.tourStops.sort();
			} else {
				this.options.sort = 'default';
				tap.tourStops.comparator = this.sortByCode;
				tap.tourStops.sort();
			}

			var listContainer = this.$el.find('#tour-stop-list');
			for (var view in this.stoplistitems) {
				this.stoplistitems[view].remove();
				delete this.stoplistitems[view]; // Force recreation
				this.stoplistitems[view] = undefined;
			}

			this.addStopsToList(listContainer);

		},

		onStopDistanceChanged: function(stop, distance) {

			var item = $('#stoplistitem-' + stop.get('id') + ' .ui-btn-text a', '#tour-stop-list');
			var span = $('span.distance', item);
			if (span.length) {
				span.html(TapAPI.geoLocation.formatDistance(distance));
			} else {
				item.append("<span class='distance'>" + TapAPI.geoLocation.formatDistance(distance) + "</span>");
			}

		},


		onNearestStopChanged: function(stop) {

			if (stop.get('nearest')) {
				this.$el.addClass('nearest');
			} else {
				this.$el.removeClass('nearest');
			}

		},


		onLocationFound: function(position) {

			//console.log('onLocationFound', position);
			var latlng = new L.LatLng(position.coords.latitude, position.coords.longitude);

		},


		onClose: function() {
			TapAPI.geoLocation.stopLocating();
		}

	});

	// Define the item view to populate this list
	TapAPI.views.StopListItem = Backbone.View.extend({

		tagName: 'li',
		template: TapAPI.templateManager.get('tour-stop-list-item'),
		render: function() {
			this.$el.attr('id', 'stoplistitem-' + this.model.get('id'));
			this.$el.html(this.template({
				title: this.model.get('title') ? this.model.get('title') : undefined,
				stop_id: this.model.get('id'),
				tour_id: tap.currentTour,
				distance: TapAPI.geoLocation.formatDistance(this.model.get('distance'))
			}));
			$('#tour-stop-list').listview('refresh');
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
			this.options.page_title = this.model.get('title');
			this.options.header_nav = false;
			this.options.footer_nav = false;
		},

		renderContent: function() {
			var content_template = TapAPI.templateManager.get('tour-details');

			this.$el.find(":jqmData(role='content')").append(content_template({
				tour_index: tap.config.default_nav_item,
				tour_id: this.model.id,
				publishDate: this.model.get('publishDate') ? this.model.get('publishDate') : undefined,
				description: this.model.get('description') ? this.model.get('description') : undefined,
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
			this.options.footer_nav = false;
		},

		renderContent: function() {
			var content_template = TapAPI.templateManager.get('tour-list');

			this.$el.find(":jqmData(role='content')").append(content_template);

			var tourList = this.$el.find('#tour-list');
			// iterate through all of the tour models to setup new views
			_.each(this.model.models, function(tour) {
				tourList.append(new TapAPI.views.TourListItem({model: tour}).render().el);
			}, this);
			$('#tour-list').listview('refresh'); // refresh listview since we generated the data dynamically

		}

	});

	// setup an individual view of a tour
	TapAPI.views.TourListItem = Backbone.View.extend({
		tagName: 'li',
		template: TapAPI.templateManager.get('tour-list-item'),
		render: function() {
			this.$el.html(this.template({
				title: this.model.get('title') ? this.model.get('title') : undefined,
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

		onInit: function() {

			if (tap.video_timer === undefined) {
				tap.video_timer = new AnalyticsTimer('VideoStop', 'played_for', tap.currentStop.id);
			}
			tap.video_timer.reset();

		},

		renderContent: function() {

			var content_template = TapAPI.templateManager.get('video-stop');

			// Find the transcription if one exists
			var assets = this.model.getAssetsByUsage("transcription");
			var transcription = null;
			if (assets !== undefined) {
				transcription = assets[0].get('content').at(0).get('data');
			}

			// Find the poster image if one exists
			var poster_image_path = tap.config['default_video_poster'];
			assets = this.model.getAssetsByUsage("image");
			if (assets !== undefined) {
				poster_image_path = assets[0].get('source').at(0).get('uri');
			}

			// Render from the template
			this.$el.find(":jqmData(role='content')").append(content_template({
				tourStopTitle: this.model.get('title'),
				transcription: transcription,
				poster_image_path: poster_image_path
			}));

			// Add click handler on the transcription toggle button
			this.$el.find('#trans-button').click(function() {
				var t = $('.transcription').toggleClass('hidden');
				if (t.hasClass('hidden')) {
					$('.ui-btn-text', this).text('Show Transcription');
					_gaq.push(['_trackEvent', 'VideoStop', 'hide_transcription']);
				} else {
					$('.ui-btn-text', this).text('Hide Transcription');
					_gaq.push(['_trackEvent', 'VideoStop', 'show_transcription']);
				}
			});

			assets = this.model.getAssetsByType("tour_video");
			
			if (assets.length) {

				var videoContainer = this.$el.find('video');
				_.each(assets, function(asset) {
					var sources = asset.get("source");
					sources.each(function(source) {
						videoContainer.append("<source src='" + source.get('uri') + "' type='" + source.get('format') + "' />");
					});
				});

				videoContainer[0].addEventListener('loadedmetadata', function() {
					tap.video_timer.max_threshold = videoContainer[0].duration * 1000;
				});

				videoContainer[0].addEventListener('play', function() {
					_gaq.push(['_trackEvent', 'VideoStop', 'media_started']);
					tap.video_timer.start();
				}, this);

				videoContainer[0].addEventListener('pause', function() {
					_gaq.push(['_trackEvent', 'VideoStop', 'media_paused']);
					tap.video_timer.stop();
				});

				videoContainer[0].addEventListener('ended', function() {
					_gaq.push(['_trackEvent', 'VideoStop', 'playback_ended']);
				});

			}

			return this;
		},

		onClose: function() {

			// Send information about playback duration when the view closes
			tap.video_timer.send();

		}

	});
});

jQuery(function() {
	AppRouter = Backbone.Router.extend({
		// define routes
		views: {},
		routes: {
			'': 'list',
			'map': 'map',
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


		/**
		 * Route to the tour listing
		 */
		list: function() {

			this.changePage(new TapAPI.views.TourList({model: tap.tours}));

		},


		/**
		 * Route to the overall map view
		 */
		map: function() {

			var map_options = {
				stops: new TapAPI.collections.Stops()
			};

			// Find all of the geolocated stops in the tour set
			_.each(tap.tours.models, function(tour) {
				tap.tours.selectTour(tour.id);
				_.each(tap.tourStops.models, function(stop) {
					var assets = stop.getAssetsByUsage('geo');
					if (assets !== undefined) {
						map_options['stops'].add(stop);
					}
				});
			});

			// Set the current view
			this.changePage(new TapAPI.views.Map(map_options));

			$('#index-selector').replaceWith("<h1 id='page-title' class='ui-title'>Map</h2>");

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
			var options = {
				model: tap.tours.get(tap.currentTour)
			};
			if (tap.config.StopListView !== undefined) {
				options = _.extend(options, tap.config.StopListView);
			}
			this.changePage(new TapAPI.views.StopList(options));

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
				var content = asset.get('content');
				if (content === undefined) return;
				var data = $.parseJSON(content.at(0).get('data'));

				if (data.type == 'Point') {
					map_options['init-lon'] = data.coordinates[0];
					map_options['init-lat'] = data.coordinates[1];
				}

			});

			// Look to see if the initial map zoom level is set
			_.each(tour.get('propertySet').models, function(property) {
				if (property.get('name') == 'initial_map_zoom') {
					map_options['init-zoom'] = property.get('value');
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

			page.$el.attr('data-role', 'page');
			page.render();
			$('body').append(page.$el);
			var transition = $.mobile.defaultPageTransition;

			// We don't want to slide the first page
			if (this.firstPage) {
				transition = 'none';
				this.firstPage = false;
			}

			// Track the page view with Google Analytics
			if (tap.config.analytics_id !== null) {
				var url = Backbone.history.getFragment();
				_gaq.push(['_trackPageview', "/#"+url]);
			}

			$.mobile.changePage(page.$el, {changeHash:false, transition: transition});

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
	tap.language = 'en'; // set default user language
	tap.defaultLanguage = 'en'; // the default language to fallback to
	tap.currentStop = ''; // id of the current stop
	tap.currentTour = ''; // id of the current tour

	var _gaq = _gaq || []; // Google Analytics queue

	//get the users language
	var userLang = (navigator.language) ? navigator.language : navigator.userLanguage;
	tap.language = userLang.split("-")[0];

	// Determine the base path so that complete paths can be defined where needed
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

		/*
		 * When editing the default configuration, the documentation should be updated.
		 * https://github.com/IMAmuseum/tap-web-app/wiki/Configuring-the-web-app
		 */
		tap.config = _.defaults(config, {
			navbar_items: [
				{ label: 'Menu', endpoint: 'tourstoplist' },
				{ label: 'Keypad', endpoint: 'tourkeypad' },
				{ label: 'Map', endpoint: 'tourmap'}
			],
			geolocation: {
				enableHighAccuracy: true
			},
			navbar_location: 'header',
			default_nav_item: 'tourstoplist',
			default_video_poster: 'assets/images/tapPoster.png',
			units: 'si',
			analytics_id: null
		});

		tap.initAnalytics();

		// configure any events
		if (TapAPI.geoLocation !== undefined) {
			tap.on('tap.tour.selected', TapAPI.geoLocation.parseCurrentStopLocations);
		}

		// trigger tap init start event
		tap.trigger('tap.init.start');

		// create new instance of tour collection
		tap.tours = new TapAPI.collections.Tours();

		tap.tours.fetch();

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
		// trigger tap init end event
		tap.trigger('tap.init.end');

		// initialize router
		tap.router = new AppRouter();
	};

	/*
	 * Initialize models with data
	 */
	tap.initModels = function(data) {
		// check to see if the tour has been updated
		var tour = tap.tours.get(data.id);
		if (tour && Date.parse(data.lastModified) <= Date.parse(tour.get('lastModified'))) return;

		// create new instance of StopCollection
		var stops = new TapAPI.collections.Stops(null, data.id);
		// create new instance of AssetCollection
		var assets = new TapAPI.collections.Assets(null, data.id);

		// remove existing models for this tour
		if (tap.tours.get(data.id)) {
			tap.tours.get(data.id).destroy();
			stops.fetch();
			stops.each(function(stop) {
				stop.destroy();
			});
			assets.fetch();
			assets.each(function(asset) {
				asset.destroy();
			});
		}

		tap.trigger('tap.init.create-tour', {id: data.id});

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
				title: objectToArray(data.stop[i].title),
				tour: data.id
			});
		}

		// load asset models
		var numAssets = data.asset.length;
		for (i = 0; i < numAssets; i++) {
			// modifiy source propertySet child to match similar elements
			if(data.asset[i].source) {
				data.asset[i].source = objectToArray(data.asset[i].source);
				var numSources = data.asset[i].source.length;
				for (j = 0; j < numSources; j++) {
					if(data.asset[i].source[j].propertySet) {
						data.asset[i].source[j].propertySet = objectToArray(data.asset[i].source[j].propertySet.property);
					}
				}
			}
			if(data.asset[i].content) {
				data.asset[i].content = objectToArray(data.asset[i].content);
				var numContent = data.asset[i].content.length;
				for (j = 0; j < numContent; j++) {
					if(data.asset[i].content[j].propertySet) {
						data.asset[i].content[j].propertySet = objectToArray(data.asset[i].content[j].propertySet.property);
					}
				}
			}

			assets.create({
				assetRights: objectToArray(data.asset[i].assetRights),
				content: data.asset[i].content,
				id: data.asset[i].id,
				source: data.asset[i].source,
				propertySet: data.asset[i].propertySet ? objectToArray(data.asset[i].propertySet.property) : undefined,
				type: data.asset[i].type
			});
		}
		// clear out the temporary models
		stops.reset();
		assets.reset();
	};

	/**
	 * Initializes Google Analytics
	 */
	tap.initAnalytics = function() {

		if (tap.config.analytics_id === null) return;

		_gaq.push(["_setAccount",tap.config.analytics_id]);

		(function(d,t){
			var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
			g.async=1;
			g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
			s.parentNode.insertBefore(g,s);
		}(document,"script"));

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
		watch: null,
		nearest_stop: null,
		active_stop_collection: null,

		locate: function() {

			navigator.geolocation.getCurrentPosition(
				TapAPI.geoLocation.locationReceived,
				TapAPI.geoLocation.locationError,
				{
					enableHighAccuracy: tap.config.geolocation.enableHighAccuracy
				}
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

		// Parse the current stop locations. Should be triggered when a new tour is selected.
		parseCurrentStopLocations: function() {

			_.each(tap.tourStops.models, function(stop) {

				if (stop.get('location') === undefined) {

					var geo_assets = stop.getAssetsByUsage('geo');
					if (geo_assets) {

						// Parse the contents of the asset
						var content = geo_assets[0].get('content');
						if (content === undefined) return;
						var data = $.parseJSON(content.at(0).get('data'));

						if (data.type == 'Point') {
							stop.set('location', new L.LatLng(data.coordinates[1], data.coordinates[0]));
						}

					}

				}

			});

		},

		computeStopDistance: function(position) {

			var latlon = new L.LatLng(position.coords.latitude, position.coords.longitude);


			var nearest = null;
			var stops = tap.tourStops;
			if (this.active_stop_collection !== null) {
				stops = this.active_stop_collection;
			}

			_.each(stops.models, function(stop) {

				var stop_location = stop.get('location');
				if (stop_location !== undefined) {
					var d = latlon.distanceTo(stop_location);
					stop.set('distance', d);
					if ((nearest === null) || (d < nearest.get('distance'))) {
						nearest = stop;
					}
				}

			});

			if (nearest !== null) {
				if (this.nearest_stop === null) {
					this.nearest_stop = nearest;
				} else if (this.nearest_stop != nearest) {
					// update
					this.nearest_stop.set('nearest', false);
				}
				nearest.set('nearest', true);
			}

		},

		startLocating: function(delay) {

			this.watch = navigator.geolocation.watchPosition(
				TapAPI.geoLocation.locationReceived,
				TapAPI.geoLocation.locationError,
				{
					enableHighAccuracy: tap.config.geolocation.enableHighAccuracy
				}
			);

		},

		stopLocating: function() {

			navigator.geolocation.clearWatch(this.watch);

			if (this.nearest_stop !== null) {
				this.nearest_stop.set('nearest', false);
				this.nearest_stop = null;
			}
		},


		formatDistance: function(d) {

			if (d === undefined) return '';

			if (tap.config.units == 'si') {

				if (d < 100) {
					return parseInt(d, 10) + ' m';
				} else if (d < 10000) {
					return (d/1000).toFixed(2) + ' km';
				} else {
					return parseInt(d/1000, 10) + ' km';
				}

			} else {
				
				// Assume it's English
				var feet = 3.28084 * d;
				if (feet > 52800) { // > 10 miles
					return parseInt(feet/5280, 10) + ' mi';
				} if (feet > 528) { // > .1 miles
					return (feet/5280).toFixed(2) + ' mi';
				} else {
					return parseInt(feet, 10) + ' ft';
				}

			}

		}

	};

	_.extend(TapAPI.geoLocation, Backbone.Events);

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
( tour_stop_title )+
'</div>\n\t<audio id="audio-player" autoplay controls="controls">\n\t\t<p>Your browser does not support the audio element.</p>\n\t</audio>\t\n\t<video id="video-player" autoplay controls="controls" style=\'display:none;\'\n\t';
 if (poster_image_path !== null) { 
;__p+='\n\t\tposter=\''+
( poster_image_path )+
'\'\n\t';
 } 
;__p+='\n\t>\n\t\t<p>Your browser does not support the video element.</p>\n\t</video>\n\t';
 if (poster_image_path !== null) { 
;__p+='\n\t\t<img class="poster-image" src="'+
( poster_image_path )+
'" />\n\t';
 } 
;__p+='\n\t';
 if (transcription !== null) { 
;__p+='\n\t\t<div id=\'trans-button\' data-role=\'button\' class=\'ui-mini\'>Show Transcription</div>\n\t\t<div class=\'transcription hidden\'><p>'+
( transcription )+
'</p></div>\n\t';
 } 
;__p+='\t\n</div>';
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
TapAPI.templates['image-stop-item'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\t<li>\n\t\t<a href="'+
( fullImageUri )+
'" rel="external"><img src="'+
( thumbUri )+
'" alt="'+
( title )+
'" title="'+
( title )+
'" /></a>\n\t\t<div>'+
( title )+
'</div>\n\t</li>\n';
}
return __p;
}
TapAPI.templates['image-stop'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul id="Gallery" class="ui-grid-b">\n</ul>\n';
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
__p+='<div data-role="header" data-id="tap-header" data-position="fixed">\n\t<a id=\'back-button\' data-rel="back" data-mini="true">'+
( back_label )+
'</a>\n\t';
 if (header_nav) { 
;__p+='\n\t<div id=\'index-selector\' data-role="controlgroup" data-type="horizontal" data-mini="true">\n\t\t';
 _.each(nav_menu, function(item) { 
;__p+='\n\t\t<a data-role="button" '+
( (active_index == item.endpoint) ? 'data-theme="b"' : "" )+
' href=\'#'+
( item.endpoint )+
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
;__p+='\n</div>\n<div data-role="content">\n</div>\n';
 if (footer_nav) { 
;__p+='\n<div data-role="footer" data-id="tap-footer" data-position="fixed">\n\t<div data-role="navbar">\n\t\t<ul>\n\t\t\t';
 _.each(nav_menu, function(item) { 
;__p+='\n\t\t\t<li><a '+
( (active_index == item.endpoint) ? 'data-theme="b"' : "" )+
' href=\'#'+
( item.endpoint )+
'/'+
( tour_id )+
'\'>'+
( item.label )+
'</a></li>\n\t\t\t';
 }); 
;__p+='\n\t\t</ul>\n\t</div>\n</div>\n';
 } 
;__p+='';
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
TapAPI.templates['tour-map-distance-label'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'distance-label-container\'>\n<div class=\'distance-label\'>'+
( distance )+
'</div>\n</div>';
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
'\'>View stop</a></div>\n\t<div class=\'directions\'>\n\t\t<a href=\'http://maps.google.com/maps?saddr=Current%20Location&daddr='+
( stop_lat )+
','+
( stop_lon )+
'\'>Get Directions</a>\n\t</div>\n</div>';
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
'\n';
 if (distance !== '') { 
;__p+='\n<span class=\'distance\'>'+
( distance )+
'</span>\n';
 } 
;__p+='\n</a>';
}
return __p;
}
TapAPI.templates['tour-stop-list'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul id="tour-stop-list" class="ui-listview" data-inset="true" data-role="listview"></ul>\n';
 if (enable_proximity_order) { 
;__p+='\n<div data-role="fieldcontain" id=\'proximity-container\'>\n<label for="proximity-toggle">Distance ordering:</label>\n<select name="proximity-toggle" id="proximity-toggle" data-role="slider">\n\t<option value="off">Off</option>\n\t<option value="on">On</option>\n</select> \n</div>\n';
}
;__p+='';
}
return __p;
}
TapAPI.templates['video-stop'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'tour-stop video\'>\n\t<div class=\'title\'>'+
( tourStopTitle )+
'</div>\n\t<video id="video-player" controls="controls" autoplay="autoplay"\n\t';
 if (poster_image_path !== null) { 
;__p+='\n\t\tposter=\''+
( poster_image_path )+
'\'\n\t';
 } 
;__p+='\n\t>\n\t\t<p>Your browser does not support the video tag.</p>\n\t</video>\n\t';
 if (transcription !== null) { 
;__p+='\n\t\t<div id=\'trans-button\' data-role=\'button\' class=\'ui-mini\'>Show Transcription</div>\n\t\t<div class=\'transcription hidden\'><p>'+
( transcription )+
'</p></div>\n\t';
 } 
;__p+='\n</div>\n';
}
return __p;
}