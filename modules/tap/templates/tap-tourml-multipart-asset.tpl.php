<tourml:Asset tourml:id="asset-<?php print $asset_id; ?>">
    <?php foreach($asset as $part): ?>
        <?php if ($part['content']): ?>
        <tourml:Content tourml:part="<?php print $part['name']; ?>">
            <tourml:Data><?php print $part['value']; ?></tourml:Data>
            <?php print $part['properties']; ?>
        </tourml:Content>
        <?php endif; ?>
        <?php if ($part['source']): ?>
        <tourml:Source tourml:format="<?php print $part['filemime']; ?>" tourml:lastModified="<?php print date('c', $part['timestamp']); ?>" 
            xml:lang="<?php print $language; ?>" tourml:uri="<?php print $part['path']; ?>" tourml:part="<?php print $part['name']; ?>">
            <?php print $part['properties']; ?>
        </tourml:Source>
        <?php endif; ?>
    <?php endforeach; ?>
</tourml:Asset>
