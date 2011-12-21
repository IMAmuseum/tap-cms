<?php print '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<tourml:Tour xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xsd="http://www.w3.org/2001/XMLSchema"
	xmlns:tourml="http://www.imamuseum.org/TourML/2011/11"
	xmlns:xml="http://www.w3.org/XML/1998/namespace"
	xmlns:gml="http://www.opengis.net/gml"
	xsi:schemaLocation="http://www.imamuseum.org/TourML/2011/11 TourML.xsd"
	tourml:id="">

<?php foreach ($tour->stops as $stop) { print $stop; } ?>

<?php foreach ($tour->assets as $asset) { print $asset; } ?>
    
<?php foreach ($tour->connections as $connection) { print $connection; } ?>
</tourml:Tour>
