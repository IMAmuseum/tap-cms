<?php

function tap_preprocess_file_tourml_xml(&$vars) {
    //dpm($vars);
}

function tap_preprocess_tap_tourml_description_text_with_summary(&$vars)
{
    //dpm($vars);
}

function tap_preprocess_tap_tourml_asset_file(&$vars)
{
    //dpm($vars);
}

function tap_preprocess_tap_tourml_property_text(&$vars)
{
    //dpm($vars);
}

function tap_preprocess_tap_tourml_connection_node_reference(&$vars)
{
    
    foreach($vars['items'] as $k => $v)
    {
        $vars['items'][$k]['destId'] = $v['nid'];
    }
}