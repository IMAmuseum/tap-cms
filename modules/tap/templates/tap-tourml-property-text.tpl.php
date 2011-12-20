<?php foreach ($items as $item): ?>
<tourml:Property tourml:name="<?php print $item['id']; ?>"><?php print $item['value']; ?></tourml:Property>
<?php endforeach; ?>
