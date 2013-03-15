<?php print '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<tourml:TourSet  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xsd="http://www.w3.org/2001/XMLSchema"
	xmlns:tourml="http://tapintomuseums.org/TourML"
	xmlns:xml="http://www.w3.org/XML/1998/namespace"
	xsi:schemaLocation="http://tapintomuseums.org/TourML TourML.xsd">

	<?php foreach($tour_set->tours as $k => $tour) { ?>
	<?php print $tour['rendered']; ?>
	<?php } ?>

</tourml:TourSet>