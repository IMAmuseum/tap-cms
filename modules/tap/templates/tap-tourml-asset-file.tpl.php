<?php foreach ($items as $item): ?>
<tourml:AssetRef tourml:id="<?php print $item['fid']; ?>" tourml:usage="<?php print $item['id']; ?>"></tourml:AssetRef>
<?php endforeach; ?>
