<tourml:Asset tourml:id="asset-<?php print $asset['id']; ?>" tourml:type="<?php print $asset['type']; ?>">
    <?php if ($content): ?>
    <tourml:Content>
        <tourml:Data><![CDATA[<?php print $asset['value']; ?>]]></tourml:Data>
        <?php print $properties; ?>
    </tourml:Content>
    <?php endif; ?>
    <?php if ($source): ?>
    <tourml:Source tourml:format="<?php print $asset['filemime']; ?>" tourml:lastModified="<?php print date('c', $asset['timestamp']); ?>" xml:lang="<?php print $language; ?>" tourml:uri="<?php print $path; ?>">
        <?php print $properties; ?>
    </tourml:Source>
    <?php endif; ?>
    <?php if(isset($asset_rights)): ?>
        <?php print $asset_rights; ?>
    <?php endif; ?>
</tourml:Asset>
