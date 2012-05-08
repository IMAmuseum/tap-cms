<?php

/**
 * @file
 * Hooks related to TAP.
 */

/**
 * Allow alteration of assets before rendering
 * @param $item
 * The asset item passed by reference
 */
function hook_tourml_asset(&$item) {
    $item['new_property'] = TRUE;
}

/**
 * Implements hook_tourml_asset()
 *
 * @param $asset.
 *
 * @return $asset. An altered asset object
 *
 * Use this hook to render assets.  The geofield
 * module stores its data in $asset['wkt'] so
 * we can check against this value to determine
 * that we have a geofield, and act upon it.
 */
function tap_geo_tourml_asset($asset) {
    // Handle geofield fields
    if (isset($asset['wkt'])) {
        geofield_load_geophp();

        $geometry = geoPHP::load($asset['wkt'], 'wkt');
        if ($geometry) {
            $asset['value'] = $geometry->out('json');
        }   
    }   

    return $asset;
}

/**
 * Implements hook_tourml_asset_alter()
 *
 * Use this hook to define properties on an asset
 */
function tap_geo_tourml_asset_alter(&$tour, &$item) {
    // Handle Geofields
    if (isset($item['wkt'])) {
        $item['properties'] = array(
            'centroid' => $item['lat'] . ',' . $item['lon'],
            'bbox' => $item['left'] . ',' . $item['right'] . ',' . $item['bottom'] . ',' . $item['top'],
        );  
    }   
}

