<tourml:Asset tourml:id="asset-<?php print $asset['id']; ?>">
    <?php if ($content): ?>
    <tourml:Content><?php print $asset['value']; ?></tourml:Content>
    <?php endif; ?>
    <?php if ($source): ?>
    <tourml:Source tourml:format="<?php print $asset['filemime']; ?>" tourml:lastModified="<?php print date('c', $asset['timestamp']); ?>" xml:lang="<?php print $language; ?>" tourml:uri="<?php print $path; ?>">
        <?php print $properties; ?>
    </tourml:Source>
    <?php endif; ?>
</tourml:Asset>
