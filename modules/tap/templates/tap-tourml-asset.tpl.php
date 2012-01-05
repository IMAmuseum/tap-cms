<tourml:Asset tourml:id="asset-<?php print $asset['fid']; ?>">
    <tourml:Source tourml:format="<?php print $asset['filemime']; ?>" tourml:lastModified="<?php print date('c', $asset['timestamp']); ?>" xml:lang="<?php print $language; ?>" tourml:uri="<?php print $path; ?>">
        <?php print $properties; ?>
    </tourml:Source>
</tourml:Asset>
