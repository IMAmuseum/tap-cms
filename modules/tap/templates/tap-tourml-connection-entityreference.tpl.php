<?php foreach ($items as $item): ?>
<tourml:Connection tourml:srcId="stop-<?php print $item['srcId']; ?>" tourml:destId="stop-<?php print $item['destId']; ?>" tourml:priority="<?php print $item['priority']; ?>" />
<?php endforeach; ?>
