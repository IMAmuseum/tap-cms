<tourml:Asset tourml:id="asset-<?php print $asset['fid']; ?>">
    <tourml:Source tourml:format="<?php print $asset['filemime']; ?>" tourml:lastModified="<?php print date('c', $asset['timestamp']); ?>" xml:lang="en" tourml:uri="<?php print $asset['uri']; ?>" />
</tourml:Asset>
