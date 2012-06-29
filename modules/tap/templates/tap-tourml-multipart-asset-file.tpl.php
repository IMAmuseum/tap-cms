<?php foreach ($references as $id => $item): ?>
<?php if($item['field']['#bundle'] == 'tour'): ?>
<tourml:AppResource tourml:id="asset-<?php print $id; ?>" tourml:usage="<?php print $item['name']; ?>"/>
<?php else: ?>
<tourml:AssetRef tourml:id="asset-<?php print $id; ?>" tourml:usage="<?php print $item['name']; ?>"/>
<?php endif; ?>
<?php endforeach; ?>