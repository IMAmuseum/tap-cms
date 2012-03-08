<?php foreach ($references as $id => $usage): ?>
<tourml:AssetRef tourml:id="asset-<?php print $id; ?>" tourml:usage="<?php print $usage; ?>"></tourml:AssetRef>
<?php endforeach; ?>