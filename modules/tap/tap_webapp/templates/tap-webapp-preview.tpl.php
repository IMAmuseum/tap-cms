<!DOCTYPE html>
<html>
<head>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="viewport" content = "width = device-width, initial-scale = 1.0, user-scalable = no" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
	<title>TAP Web</title>

	<link rel="stylesheet" href="<?php print $webapp_css_path; ?>" />

	<script type='text/javascript'>console.log('Clearing local storage'); localStorage.clear();</script>
    <script type='text/javascript' src="<?php print $webapp_dependencies_path; ?>"></script>
    <script type='text/javascript' src="<?php print $webapp_js_path; ?>"></script>
	
	<script type="text/javascript">
		(function($){

			$(document).ready(function() {

				// initialize app
				tap.initApp("<?php print $tourml_path; ?>", {
					units: '<?php print variable_get('tap_webapp_units', 'si'); ?>',
					navbar_items: <?php print json_encode($default_navbar_items); ?>
				});
				// start backbone history collection
				Backbone.history.start();

			});
		}(jQuery));
	</script>
</head>
<body>
	<!-- Content is injected here by backbone -->
</body>
</html>