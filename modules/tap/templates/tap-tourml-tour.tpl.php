<?php print '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<tourml:Tour  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xsd="http://www.w3.org/2001/XMLSchema"
	xmlns:tourml="http://tourml.org"
	xmlns:xml="http://www.w3.org/XML/1998/namespace"
	xmlns:gml="http://www.opengis.net/gml"
	xsi:schemaLocation="http://tourml.org/TourML.xsd"
	tourml:id="tour-<?php print $tour->tour['real_id']; ?>"
	tourml:lastModified="<?php print date('c', $tour->tour['last_modified']); ?>">
<tourml:TourMetadata>
<?php print $metadata; ?>
</tourml:TourMetadata>
<?php print $stops; ?>
<?php print $assets; ?>
<?php print $connections; ?>
</tourml:Tour>
