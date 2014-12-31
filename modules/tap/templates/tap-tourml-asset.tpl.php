<tourml:Asset tourml:id="asset-<?php print $asset['id']; ?>" tourml:type="<?php print $asset['type']; ?>">
    <?php if ($content): ?>
    <tourml:Content tourml:format="<?php if (isset($asset['filemime'])) print $asset['filemime']; ?>" xml:lang="<?php print $language; ?>">
        <?php if (isset($asset['filemime']) && $asset['filemime'] == 'text/xml'): ?>
            <tourml:Data><?php print $asset['value']; ?></tourml:Data>
        <?php else : ?>
            <tourml:Data><![CDATA[<?php print $asset['value']; ?>]]></tourml:Data>
        <?php endif; ?>
        <?php print $properties; ?>
    </tourml:Content>
    <?php endif; ?>
    <?php if ($source): ?>
    <tourml:Source tourml:format="<?php print $asset['filemime']; ?>" tourml:lastModified="<?php print date('c', $asset['timestamp']); ?>" xml:lang="<?php print $language; ?>" tourml:uri="<?php print $path; ?>">
        <?php if(isset($source_rights)): ?>
            <?php print $source_rights; ?>
        <?php endif; ?>
        <?php print $properties; ?>
    </tourml:Source>
    <?php endif; ?>
</tourml:Asset>
