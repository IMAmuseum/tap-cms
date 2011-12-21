<?php

function tap_preprocess_tap_tourml_tour(&$vars) {
    $tour                   = $vars['tour'];
    $vars['metadata']       = '';
    $vars['stops']          = '';
    $vars['assets']         = '';
    $vars['connections']    = '';

    if (isset($tour->tour['items'])) {
        foreach ($tour->tour['items'] as $tour_item) {
            $vars['metadata'] .= $tour_item;
        }
    }

    foreach ($tour->stops as $stop) {
        $vars['stops'] .= $stop;
    }

    foreach ($tour->assets as $asset) {
        $vars['assets'] .= $asset;
    }

    foreach ($tour->connections as $connection) {
        $vars['connections'] .= $connection;
    }
}

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
