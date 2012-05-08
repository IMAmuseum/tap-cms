/*
 * TAP - v0.1.0 - 2012-05-08
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
	if (xml.nodeType === Node.TEXT_NODE) { // text
		obj = xml.nodeValue.replace(/^\s+|\s+$/g, '');
	} else {
		if (xml.nodeType === 1) { // element
			// do attributes
			if (xml.attributes.length > 0) {
				var attribute;
				obj = {};
				for (i = 0; i < xml.attributes.length; i++) {
					attribute = xml.attributes.item(i);
					obj[attribute.nodeName.replaceArray(namespace, '').toCamel()] = attribute.nodeValue;
				}
			}
		}

		// do children
		if (xml.hasChildNodes()) {
			var key, value, item;
			if (obj === true) { obj = {}; }
			for (i = 0; i < xml.childNodes.length; i++) {
				item = xml.childNodes.item(i);
				key = item.nodeType === 3 ? 'value' : item.nodeName.replaceArray(namespace, '').toCamel();
				value = xmlToJson(item, namespace);
				if(value.length !== 0 && key !== '#comment') { // ignore empty nodes and comments
					if (obj.hasOwnProperty(key)) {
						if(item.nodeType === 3) {
							obj[key] += value;
						} else {
							if (obj[key].constructor !== Array) {
								obj[key] = [obj[key]];
							}
							obj[key].push(value);
						}
					} else if (item.nodeType !== 3 || value !== '') {
						obj[key] = value;
					}
				}
			}
		}
	}
	return(obj);
}

// define asset model
TapAssetModel = Backbone.Model.extend({
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
	}
});

// define stop model
TapStopModel = Backbone.Model.extend({
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

// define tour model
TapTourModel = Backbone.Model.extend({
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

// define assett collection
TapAssetCollection = Backbone.Collection.extend({
	model: TapAssetModel,
	initialize: function(models, id) {
		this.localStorage = new Backbone.LocalStorage(id + '-asset');
	}
});

// define stop collection
TapStopCollection = Backbone.Collection.extend({
	model: TapStopModel,
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

// define tour collection
TapTourCollection = Backbone.Collection.extend({
	model: TapTourModel,
	localStorage: new Backbone.LocalStorage('tours'),
	selectTour: function(id) { // load data for the selected tour
		// set the current tour
		tap.currentTour = id;

		// set root stop as the current stop if specified
		if(tap.tours.get(id).get('rootStopRef')) {
			tap.currentStop = tap.tours.get(id).get('rootStopRef').id;
		}

		// create new instance of StopCollection
		tap.tourStops = new TapStopCollection(null, id);
		// create new instance of AssetCollection
		tap.tourAssets = new TapAssetCollection(null, id);

		// load data from local storage
		tap.tourStops.fetch();
		tap.tourAssets.fetch();
	}
});

Backbone.View.prototype.close = function () {
	if(document.getElementById('audioPlayer')) document.getElementById('audioPlayer').pause();
	if(document.getElementById('videoPlayer')) document.getElementById('videoPlayer').pause();
	
	this.$el.empty().undelegate();
	this.unbind();
	this.undelegateEvents();
	if (this.onClose){
		this.onClose();
	}
};
jQuery(function() {
	// setup a tour stop Audio view
	window.TourStopAudioView = Backbone.View.extend({
		el: $('#tour-stop').find(":jqmData(role='content')"),
		template: _.template($('#tour-stop-audio-tpl').html()),
		render: function() {
			var mp3AudioUri, oggAudioUri, wavAudioUri;

			if($stop["attributes"]["assetRef"]){
				_.each($stop.get("assetRef"), function(assetRef) {
					var asset = tap.tourAssets.get(assetRef.id);
					var assetSources = asset.get("source");

					_.each(assetSources, function(assetSource){
						switch (assetSource.format) {
							case 'audio/mp3':
							case 'audio/mpeg':
								mp3AudioUri = assetSource.uri;
								break;
							case 'audio/ogg':
								oggAudioUri = assetSource.uri;
								break;
							case 'audio/wav':
								wavAudioUri = assetSource.uri;
								break;
						}
					});
				});
			}

			this.$el.html(this.template({
				tourStopMp3Audio : mp3AudioUri,
				tourStopOggAudio : oggAudioUri,
				tourStopWavAudio : wavAudioUri,
				tourStopTitle : $stop["attributes"]["title"][0].value
			}));
			return this;
		}
	});
});

jQuery(function() {
	// setup a tour stop view
	window.TourStopView = Backbone.View.extend({
		el: $('#tour-stop').find(":jqmData(role='content')"),
		template: _.template($('#tour-stop-tpl').html()),
		render: function() {
			this.$el.html(this.template({
				tourStopTitle : $stop.get("title") ? $stop.get("title")[0].value : undefined,
				tourStopDescription : $stop.get('description') ? $stop.get('description')[0].value : undefined
			}));
			return this;
		}
	});
});

jQuery(function() {
	// setup a tour stop Gallery view
	window.TourStopGalleryView = Backbone.View.extend({
		el: $('#tour-stop').find(":jqmData(role='content')"),
		template: _.template($('#tour-gallery-tpl').html()),
		render: function() {
			this.$el.html(this.template({
				tourStopTitle : $stop["attributes"]["title"][0].value
			}));
			var myPhotoSwipe = $("#Gallery a").photoSwipe({
				enableMouseWheel: false,
				enableKeyboard: true,
				doubleTapZoomLevel : 0,
				captionAndToolbarOpacity : 0.8,
				minUserZoom : 0.0,
				jQueryMobile : true
			});
			return this;
		}
	});
});

jQuery(function() {
	// setup a tour stop Geo view
	window.TourStopGeoView = Backbone.View.extend({
		el: $('#tour-stop').find(":jqmData(role='content')"),
		template: _.template($('#tour-stop-geo-tpl').html()),
		render: function() {
			$(this.el).html(this.template({
				tourStopTitle : $stop["attributes"]["title"][0].value
			}));
			return this;
		}
	});
});

jQuery(function() {
	// setup a tour stop Image view
	window.TourStopImageView = Backbone.View.extend({
		el: $('#tour-stop').find(":jqmData(role='content')"),
		template: _.template($('#tour-stop-image-tpl').html()),
		render: function() {
			var imageUri, iconUri;

			if($stop["attributes"]["assetRef"]){
				$.each($stop["attributes"]["assetRef"], function() {
					$assetItem = tap.tourAssets.models;
					for(var i=0;i<$assetItem.length;i++) {
						if(($assetItem[i].get('id') == this['id']) && (this['usage'] == "primary" || this['usage'] == "tour_image")){
							imageUri = $assetItem[i].attributes.source[0].uri;
						}
						if(($assetItem[i].get('id') == this['id']) && (this['usage']=="icon")){
							iconUri = $assetItem[i].attributes.source[0].uri;
						}
					}
				});
			}

			this.$el.html(this.template({
				tourImageUri : imageUri,
				tourIconUri : iconUri,
				tourStopTitle : $stop["attributes"]["title"][0].value
			}));

			var soloPhotoSwipe = $("#soloImage a").photoSwipe({
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
jQuery(function() {
	// setup a tour keypad view
	window.TourKeypadView = Backbone.View.extend({
		el: $('#tour-keypad').find(":jqmData(role='content')"),
		template: _.template($('#tour-keypad-tpl').html()),
		events: {
			'tap #gobtn' : 'submit',
			'tap #keypad div button' : 'writekeycode',
			'tap #delete' : 'clearkeycode'
		},
		submit: function() {
			// validate tour stop code
			if(!$('#write').html()) return;
			if(!tap.tourStops.getStopByKeycode($('#write').html())){
				$.mobile.changePage('#error_invalidCode', 'pop', true, true);
				$('#write').html("");
				return;
			}
			$destUrl = "#tourstop/"+this.options+"/"+$('#write').html();
			Backbone.history.navigate($destUrl, true);
		},
		writekeycode: function(e) {
			$('#write').html($('#write').html() + $(e.currentTarget).html());
		},
		clearkeycode: function(e) {
			$('#write').html("");
		},
		render: function() {
			this.$el.html(this.template({}));
			return this;
		}
	});
});
jQuery(function() {
	// setup a tour stop Object view
	window.TourStopObjectView = Backbone.View.extend({
		el: $('#tour-stop').find(":jqmData(role='content')"),
		template: _.template($('#tour-stop-object-tpl').html()),
		render: function() {
			$(this.el).html(this.template({
				tourStopTitle : $stop["attributes"]["title"][0].value
			}));
			return this;
		}
	});
});

jQuery(function() {
	// setup a detailed view of a tour
	window.TourDetailedView = Backbone.View.extend({
		el: $('#tour-details').find(":jqmData(role='content')"),
		template: _.template($('#tour-details-tpl').html()),
		render: function() {
			var currentTour = tap.tours.get(tap.currentTour);

			$(this.el).html(this.template({
				publishDate: currentTour.get('publishDate') ? currentTour.get('publishDate')[0].value : undefined,
				description: currentTour.get('description') ? currentTour.get('description')[0].value : undefined,
				stopCount: tap.tourStops.length,
				assetCount: tap.tourAssets.length
			}));
			return this;
		}
	});
});

jQuery(function() {
	// setup a simple view to handle listing all tours
	window.TourListView = Backbone.View.extend({
		el: $('#tour-list'),
		initialize: function() {
			this.$el.empty();
			this.model.bind('reset', this.render);
		},
		render: function(event) {
			// iterate through all of the tour models to setup new views
			_.each(this.model.models, function(tour) {
					$(this.el).append(new TourListItemView({model: tour}).render().el);
			}, this);
			$(this.el).listview('refresh'); // refresh listview since we generated the data dynamically
		}
	});

	// setup an individual view of a tour
	window.TourListItemView = Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#tour-list-item-tpl').html()),
		render: function() {
			$(this.el).html(this.template({
				title: this.model.get('title') ? this.model.get('title')[0].value : undefined,
				id: this.model.get('id')
			}));
			return this;
		}
	});
});

jQuery(function() {
	// setup a tour stop Video view
	window.TourStopVideoView = Backbone.View.extend({
		el: $('#tour-stop').find(":jqmData(role='content')"),
		template: _.template($('#tour-stop-video-tpl').html()),
		render: function() {
			var mp4ViedoUri, oggVideoUri;
			if($stop["attributes"]["assetRef"]){
				_.each($stop.get("assetRef"), function(assetRef) {
					var asset = tap.tourAssets.get(assetRef.id);
					var assetSources = asset.get("source");

					_.each(assetSources, function(assetSource){
						switch (assetSource.format) {
							case 'video/mp4':
								mp4VideoUri = assetSource.uri;
								break;
							case 'video/ogg':
								oggVideoUri = assetSource.uri;
								break;
						}
					});
				});
			}

			this.$el.html(this.template({
				tourStopTitle : $stop["attributes"]["title"][0].value,
				tourStopMp4Video : mp4VideoUri,
				tourStopOggVideo : oggVideoUri
			}));

			return this;
		}
	});
});

jQuery(function() {
	// setup a tour stop Web view
	window.TourStopWebView = Backbone.View.extend({
		el: $('#tour-stop').find(":jqmData(role='content')"),
		template: _.template($('#tour-stop-web-tpl').html()),
		render: function() {
			$(this.el).html(this.template({
				tourStopTitle : $stop["attributes"]["title"][0].value
			}));
			return this;
		}
	});
});

jQuery(function() {
	AppRouter = Backbone.Router.extend({
		// define routes
		routes: {
			'': 'list',
			'tour/:id': 'tourDetails',
			'tourkeypad/:id': 'tourKeypad',
			'tourstop/:id/:keycode': 'tourStop'
		},
		bookmarkMode:false,
		showView: function(selector, view) {
			if (tap.currentView){
				tap.currentView.close();
			}
			$(selector).html(view.render().el);
			tap.currentView = view;
			return view;
		},
		list: function() {
			// have jqm change pages
			$.mobile.changePage('#tours', {transition: 'fade', reverse: true, changeHash: false});
			// setup list view of all the tours and render
			this.tourListView = new TourListView({model: tap.tours});
			tap.currentView = this.tourListView;
			this.tourListView.render();

		},
		tourDetails: function(id) {
			// set the selected tour
			tap.tours.selectTour(id);
			// have jqm change pages
			$.mobile.changePage('#tour-details', { transition: 'fade', reverse: false, changeHash: false});
			// change the page title
			$('#tour-details #page-title').html(tap.tours.get(tap.currentTour).get('title')[0].value);
			// attach the tour id to the get started button
			$('#tour-details #start-tour-id').attr("href", "#tourkeypad/"+id);
			// setup detailed view of tour and render
			this.tourDetailedView = new TourDetailedView();
			app.showView('#content', this.tourDetailedView);
		},
		tourKeypad: function(id) {
			// set the selected tour
			tap.tours.selectTour(id);
			// have jqm change pages
			$.mobile.changePage('#tour-keypad', { transition: 'fade', reverse: false, changeHash: false});
			// change the page title
			$('#tour-details #page-title').html(tap.tours.get(tap.currentTour).get('title')[0].value);
			// setup detailed view of keypad and render
			this.tourKeypadView = new TourKeypadView(id);
			app.showView('#content', this.tourKeypadView);
		},
		tourStop: function(id, keycode) {
			// set the selected tour
			tap.tours.selectTour(id);
			// have jqm change pages
			$.mobile.changePage('#tour-stop', { transition: 'fade', reverse: false, changeHash: false});
			// change the page title
			$('#tour-stop #page-title').html(tap.tours.get(tap.currentTour).get('title')[0].value);
			// setup detailed view of tour and render
			$stop = tap.tourStops.getStopByKeycode(keycode);
			switch($stop["attributes"]["view"]) {  // Set appropriate tour stop view type
				case 'StopGroup':
				case 'tour_stop_group':
					this.tourStopView = new TourStopView();
					app.showView('#content', this.tourStopView);
					return;
				case 'ImageStop':
				case 'tour_image_stop':
					this.tourStopImageView = new TourStopImageView();
					app.showView('#content', this.tourStopImageView);
					return;
				case 'GalleryStop':
					this.tourStopGalleryView = new TourStopGalleryView();
					app.showView('#content', this.tourStopGalleryView);
					return;
				case 'VideoStop':
				case 'tour_video_stop':
					this.tourStopVideoView = new TourStopVideoView();
					app.showView('#content', this.tourStopVideoView);
					return;
				case 'AudioStop':
				case 'tour_audio_stop':
					this.tourStopAudioView = new TourStopAudioView();
					app.showView('#content', this.tourStopAudioView);
					return;
				case 'WebStop':
					this.tourStopWebView = new TourStopWebView();
					app.showView('#content', this.tourStopWebView);
					return;
				case 'ObjectStop':
					this.tourStopObjectView = new TourStopObjectView();
					app.showView('#content', this.tourStopObjectView);
					return;
				case 'GeoStop':
					this.tourStopGeoView = new TourStopGeoView();
					app.showView('#content', this.tourStopGeoView);
					return;
				default:
					this.tourStopView = new TourStopView();
					app.showView('#content', this.tourStopView);
					return;
			}
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

	_.extend(tap, Backbone.Events);
	/*
	 * Takes care of storing/loading data in local storage and initializing
	 * the tour collection.
	 */
	tap.initApp = function() {
		// trigger tap init start event
		tap.trigger('tap.init.start');

		// create new instance of tour collection
		tap.tours = new TapTourCollection();

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
			propertySet: data.tourMetadata && data.tourMetadata.propertySet ? objectToArray(data.tourMetadata.property) : undefined,
			publishDate: data.tourMetadata && data.tourMetadata.publishDate ? objectToArray(data.tourMetadata.publishDate) : undefined,
			rootStopRef: data.tourMetadata && data.tourMetadata.rootStopRef ? data.tourMetadata.rootStopRef : undefined,
			title: data.tourMetadata && data.tourMetadata.title ? objectToArray(data.tourMetadata.title) : undefined
			// description: objectToArray(data.description),
			// lastModified: data.lastModified,
			// propertySet: objectToArray(data.propertySet.property),
			// publishDate: objectToArray(data.publishDate),
			// rootStopRef: objectToArray(data.rootStopRef),
			// title: objectToArray(data.title)
		});

		var i, j;
		// create new instance of StopCollection
		var stops = new TapStopCollection(null, data.id);
		// load tour models
		var numStops = data.stop.length;
		for (i = 0; i < numStops; i++) {
			var connections = [];
			var numConnections = data.connection.length;
			for(j = 0; j < numConnections; j++) {
				if(data.connection[j].srcId == data.stop[i].id) {
					connections.push({priority: data.connection[j].priority, destId: data.connection[j].destId});
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
		var assets = new TapAssetCollection(null, data.id);
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
