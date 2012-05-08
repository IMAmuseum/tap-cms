<!DOCTYPE html>
<html>
<head>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="viewport" content = "width = device-width, initial-scale = 1.0, user-scalable = no" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
	<title>TAP Web</title>

	<link rel="stylesheet" href="<?php print $cssPath; ?>Tap-0.1.0.css" />

	<script src="<?php print $jsPath; ?>external/jquery-1.7.2.js"></script>
	<script src="<?php print $jsPath; ?>external/jquery.mobile-1.1.0.js"></script>
	<script src="<?php print $jsPath; ?>external/underscore-1.3.3.js"></script>
	<script src="<?php print $jsPath; ?>external/json2.js"></script>
	<script src="<?php print $jsPath; ?>external/backbone-0.9.2.js"></script>
	<script src="<?php print $jsPath; ?>external/backbone.localStorage-min.js"></script>
	<script src="<?php print $jsPath; ?>external/klass.js"></script>
	<script src="<?php print $jsPath; ?>external/code.photoswipe.jquery-3.0.4.js"></script>
	<script src="<?php print $jsPath; ?>Tap-0.1.0.js"></script>
	
	<script type="text/javascript">
		localStorage.clear();

		(function($){

			// initialize jqm properties to allow backbone to handle routing
			$.mobile.hashListeningEnabled = false;
			$.mobile.linkBindingEnabled = false;
			$.mobile.pushStateEnabled = false;

			$(document).ready(function() {
				// specify url to tourML document
				tap.url = '<?php print $url; ?>';
				// initialize app
				tap.initApp();
				// initialize router
				app = new AppRouter();
				// start backbone history collection
				Backbone.history.start();
				// override click event for back button
				$('body').find(":jqmData(rel='back')").click(function(e) {
					e.preventDefault();
					window.history.back();
				});

			});
		}(jQuery));
	</script>
</head>
<body>
	<!-- tour listing page -->
	<div data-role="page" id="tours">
		<div data-role="header">
			<h1 id="page-title">Tours</h1>
		</div> 	
		<div data-role="content">
			<ul id="tour-list" class="ui-listview" data-inset="true" data-role="listview"></ul>
		</div>
	</div>
	<!-- tour details page -->
	<div data-role="page" id="tour-details">
		<div data-role="header">
			<a data-rel="back">Tours</a>
			<h1 id="page-title"></h1>
		</div> 	
		<div class="">
			<br /><br />
			<a href="#tourkeypad/" id="start-tour-id" data-role="button" data-theme="b">Start Tour</a>
		</div>
		<div data-role="content">

		</div>
	</div>
	<!-- tour keypad page -->
	<div data-role="page" id="tour-keypad">
		<div data-role="header">
			<a data-rel="back">Tour Info</a>
			<h1 id="page-title">Enter a Code</h1>
			<a data-theme="b" href="assets/video/tap_IMA_help_vid.mp4">Help</a>
		</div> 	
		<div data-role="content">

		</div>
	</div>
	<!-- tour stop page -->
	<div data-role="page" id="tour-stop">
		<div data-role="header">
			<h1 id="page-title"></h1>
			<a data-rel="back">Keypad</a>
		</div> 	
		<div data-role="content">

		</div>
	</div>
	<!-- Error: invalid tour stop code -->
	<div data-role="dialog" id="error_invalidCode">
		<div data-role="header" data-theme="d">
			<h1></h1>
		</div>
		<div data-role="content" data-theme="c" align="center">
			<p>This is an invalid code.  Please enter another.</p>
			<a href="#" data-role="button" data-rel="back" data-theme="b">Close</a>       
		</div>
	</div>
	<!-- templates -->
	<script type="text/template" id="tour-list-item-tpl">    
		<a href="#tour/<%= id %>"><%= title %></a>
	</script>
	<script type="text/template" id="tour-details-tpl">
			<div>
				<%= description %>
			</div>
	</script>
	<script type="text/template" id="tour-gallery-tpl">
	<ul id="Gallery">
		<li><a href="assets/images/001.jpg"><img src="assets/images/icons/001.ico" alt="Image 01" /></a></li>
		<li><a href="assets/images/002.jpg"><img src="assets/images/icons/002.ico" alt="Image 02" /></a></li>
		<li><a href="assets/images/003.jpg"><img src="assets/images/icons/003.ico" alt="Image 03" /></a></li>
		<li><a href="assets/images/004.jpg"><img src="assets/images/icons/004.ico" alt="Image 04" /></a></li>
		<li><a href="assets/images/005.jpg"><img src="assets/images/icons/005.ico" alt="Image 05" /></a></li>
		<li><a href="assets/images/006.jpg"><img src="assets/images/icons/006.ico" alt="Image 06" /></a></li>
	</ul>
	</script>
	<script type="text/template" id="tour-keypad-tpl">
		<fieldset class="ui-grid-b" id="keypad">
				<div class="ui-block-a" id="writeStyle"><div class="ui-bar" id="write"></div></div>
				<div class="ui-block-b"><div class="ui-bar ui-bar-d" id="gobtn">Go</div></div>
				<div class="ui-block-a"><button class="ui-bar ui-bar-d">1</button></div>
				<div class="ui-block-b"><button class="ui-bar ui-bar-d">2</button></div>	 
				<div class="ui-block-b"><button class="ui-bar ui-bar-d">3</button></div>  
				<div class="ui-block-a"><button class="ui-bar ui-bar-d">4</button></div>
				<div class="ui-block-b"><button class="ui-bar ui-bar-d">5</button></div>	 
				<div class="ui-block-b"><button class="ui-bar ui-bar-d">6</button></div>  
				<div class="ui-block-a"><button class="ui-bar ui-bar-d">7</button></div>
				<div class="ui-block-b"><button class="ui-bar ui-bar-d">8</button></div>	 
				<div class="ui-block-b"><button class="ui-bar ui-bar-d">9</button></div>  
				<div class="ui-block-a"><button class="ui-bar ui-bar-d">0</button></div>
				<div class="ui-block-b" id="clearStyle"><div class="ui-bar ui-bar-d" id="delete">Clear</div></div>
		</div>
	</script>
	<script type="text/template" id="tour-stop-tpl">
			<div style="width:100%;">
				<stoptitle><%= tourStopTitle %></stoptitle><br />
				<stopdescription><%= tourStopDescription %></stopdescription><br />
			</div>
	</script>
	<script type="text/template" id="tour-stop-image-tpl">
			<div id="soloImage">
				<a href="<%= tourImageUri %>"><img src="<%= tourImageUri %>" alt="Image 01" class="primaryImg" /></a><br />
				<stoptitle><%= tourStopTitle %></stoptitle><br />
			</div>
	</script>
	<script type="text/template" id="tour-stop-video-tpl">
			<div>
				<video width="95%" controls="controls" autoplay="autoplay" id="videoPlayer" poster="assets/images/tapPoster.png">
					<source src="<%= tourStopOggVideo %>" type="video/ogg" />
					<source src="<%= tourStopMp4Video %>" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
	</script>
	<script type="text/template" id="tour-stop-audio-tpl">
			<div>
				<%= tourStopTitle %><br /><br /><br />
				<audio autoplay controls="controls" id="audioPlayer" style="width:100%">
					<source src="<%= tourStopOggAudio %>" type="audio/ogg" />
					<source src="<%= tourStopMp3Audio %>" type="audio/mp3" />
					<source src="<%= tourStopWavAudio %>" type="audio/wav" />
					Your browser does not support the audio element.
				</audio>
			</div>
	</script>
	<script type="text/template" id="tour-stop-web-tpl">
			<div style="width:100%;">
				<stoptitle><%= tourStopTitle %></stoptitle><br />
			</div>
	</script>
	<script type="text/template" id="tour-stop-object-tpl">
			<div style="width:100%;">
				<stoptitle><%= tourStopTitle %></stoptitle><br />
			</div>
	</script>
	<script type="text/template" id="tour-stop-geo-tpl">
			<div style="width:100%;">
				<stoptitle><%= tourStopTitle %></stoptitle><br />
			</div>
	</script>
	<!-- /templates -->
</body>
</html>