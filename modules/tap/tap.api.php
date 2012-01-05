<?php

/**
 * @file
 * Hooks related to TAP.
 */

/**
 * Allow creation of extra properties to media assets
 *
 * @param $item
 * The asset item to enact upon
 * 
 * @return Array
 * Return an array of key/value properties to be rendered with the asset
 */
function hook_tourml_asset_properties($item) {
    list($type, $ext) = explode('/', $item['filemime']);
    switch($type) {
        case 'image':
            $path = drupal_realpath($item['uri']);
            $attr = image_get_info($path);
            return array(
                array(
                    'name'  => 'width',
                    'value' => $attr['width'],
                ),
                array(
                    'name'  => 'height',
                    'value' => $attr['height'],
                ),
            );
    }
}
