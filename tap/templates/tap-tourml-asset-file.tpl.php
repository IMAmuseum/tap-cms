<?php foreach ($items as $item): ?>
<tourml:AssetRef tourml:id="asset-<?php print $item['id']; ?>" tourml:usage="<?php print $item['name']; ?>"></tourml:AssetRef>
<?php endforeach; ?>
