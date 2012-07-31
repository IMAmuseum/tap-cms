<?php
/**
 * @file
 * Template functions
 */

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
        $vars['assets'] .= $asset['rendered'];
    }

    foreach ($tour->multipart_assets as $asset) {
        $vars['assets'] .= $asset['rendered'];
    }

    foreach ($tour->connections as $connection) {
        $vars['connections'] .= $connection;
    }
}

function tap_preprocess_tap_tourml_root_stop_entityreference(&$vars) {
    $vars['real_id'] = isset($vars['items'][0]['target_id']) ? $vars['items'][0]['target_id'] : '';
}

/********************************
 * Stops
 */
function tap_preprocess_tap_tourml_stop(&$vars) {
}

/********************************
 * Assets
 */

function tap_preprocess_tap_tourml_asset(&$vars) {
    $properties         = array();
    $vars['source']     = FALSE;
    $vars['content']    = FALSE;

    // Handle File fields
    if (isset($vars['asset']['fid'])) {
        // Media fields nest the file object inside of the asset.
        // So if we run into one we need to merge it into the 
        // parent array.
        if (isset($vars['asset']['file'])) {
            $vars['asset'] = array_merge($vars['asset'], (array)$vars['asset']['file']);
        }
        if ($vars['absolute']) {
            $vars['path'] = file_create_url($vars['asset']['uri']);
        } 
        else {
            $file_path = array_pop(explode('/', $vars['asset']['uri']));
            if (!empty($vars['base_path'])) {
                $file_path = $vars['base_path'] . '/' . $file_path; 
            }
            $vars['path'] = $file_path;
        }
        $vars['source'] = TRUE;
        $vars['source_rights'] = theme('tap_tourml_asset_rights', array('file' => file_load($vars['asset']['fid'])));
    }

    // Handle text fields
    if (isset($vars['asset']['value'])) {
        $vars['content'] = TRUE;
    }

    if (array_key_exists('properties', $vars['asset'])) {
      if (is_array($vars['asset']['properties'])) {
        foreach ($vars['asset']['properties'] as $name => $value) {
          $properties[] = theme('tap_tourml_property', array('name' => $name, 'value' => $value));
        }
      }
    }

    $vars['properties'] = theme('tap_tourml_property_set', array('properties' => $properties));
}

function theme_tap_tourml_asset_file(&$vars) {
    return theme('tap_tourml_asset_ref', $vars);
}

function theme_tap_tourml_asset_image(&$vars) {
    return theme('tap_tourml_asset_ref', $vars);
}

function theme_tap_tourml_asset_text(&$vars) {
    return theme('tap_tourml_asset_ref', $vars);
}

function theme_tap_tourml_asset_text_long(&$vars) {
    return theme('tap_tourml_asset_ref', $vars);
}

function theme_tap_tourml_asset_text_with_summary(&$vars) {
    return theme('tap_tourml_asset_ref', $vars);
}

/********************************
 * multipart Assets
 */

function tap_preprocess_tap_tourml_multipart_asset(&$vars) {
    foreach ($vars['asset'] as $key => &$asset) {
        $properties                         = array();
        $vars['asset'][$key]['source']      = FALSE;
        $vars['asset'][$key]['content']     = FALSE;

        if (isset($asset['fid'])) {
            // Media fields nest the file object inside of the asset.
            // So if we run into one we need to merge it into the 
            // parent array.
            if (isset($asset['file'])) {
                $asset = array_merge($asset, (array)$asset['file']);
            }
            if ($vars['absolute']) {
                $asset['path'] = file_create_url($asset['uri']);
            } 
            else {
                $file_path = array_pop(explode('/', $asset['uri']));
                if (!empty($vars['base_path'])) {
                    $file_path = $vars['base_path'] . '/' . $file_path; 
                }
                $asset['path'] = $file_path;
            }
            $asset['source'] = TRUE;
            $asset['source_rights'] = theme('tap_tourml_asset_rights', array('file' => file_load($asset['fid'])));
        }
        // Handle text fields
        if (isset($asset['value'])) {
            $asset['content'] = TRUE;
        }

        if (array_key_exists('properties', $asset)) {
            if (is_array($asset['properties'])) {
                foreach ($asset['properties'] as $name => $value) {
                    $properties[] = theme('tap_tourml_property', array('name' => $name, 'value' => $value));
                }
            }
        }
        $asset['properties'] = theme('tap_tourml_property_set', array('properties' => $properties));   
    }
}

function tap_preprocess_tap_tourml_multipart_asset_ref(&$vars) {
    $vars['references'] = array();
    foreach ($vars['items'] as $item) {
        $vars['references'][$item['id']] = $item;
    }
}

function theme_tap_tourml_multipart_asset_file(&$vars) {
    return theme('tap_tourml_multipart_asset_ref', $vars);
}

function theme_tap_tourml_multipart_asset_image(&$vars) {
    return theme('tap_tourml_multipart_asset_ref', $vars);
}

function theme_tap_tourml_multipart_asset_text(&$vars) {
    return theme('tap_tourml_multipart_asset_ref', $vars);
}

function theme_tap_tourml_multipart_asset_text_long(&$vars) {
    return theme('tap_tourml_multipart_asset_ref', $vars);
}

function theme_tap_tourml_multipart_asset_text_with_summary(&$vars) {
    return theme('tap_tourml_multipart_asset_ref', $vars);
}

function theme_tap_tourml_multipart_asset_field_collection(&$vars) {
    return theme('tap_tourml_multipart_asset_ref', $vars);
}

/********************************
 * Properties
 */

function tap_preprocess_tap_tourml_property_set(&$vars) {
}

function tap_preprocess_tap_tourml_property(&$vars) {
    $vars['attributes_array'] = $vars['attributes'];
}

function _theme_tap_tourml_property($vars) {
    $properties = '';
    foreach ($vars['items'] as $item) {
        $properties .= theme('tap_tourml_property', $item);
    }

    return $properties;
}

/**
 * these are all wrappers to _theme_tap_tourml_property() to handle the different field types
 */
function theme_tap_tourml_property_text(&$vars) {
    return _theme_tap_tourml_property($vars);
}

function theme_tap_tourml_property_list_boolean(&$vars) {
    return _theme_tap_tourml_property($vars);
}

function theme_tap_tourml_property_date(&$vars) {
    return _theme_tap_tourml_property($vars);
}

function theme_tap_tourml_property_datetime(&$vars) {
    return _theme_tap_tourml_property($vars);
}

function theme_tap_tourml_property_datestamp(&$vars) {
    return _theme_tap_tourml_property($vars);
}

function theme_tap_tourml_property_number_decimal(&$vars) {
    return _theme_tap_tourml_property($vars);
}

function theme_tap_tourml_property_number_float(&$vars) {
    return _theme_tap_tourml_property($vars);
}

function theme_tap_tourml_property_number_integer(&$vars) {
    return _theme_tap_tourml_property($vars);
}

function theme_tap_tourml_property_list_float(&$vars) {
    return _theme_tap_tourml_property($vars);
}

function theme_tap_tourml_property_list_integer(&$vars) {
    return _theme_tap_tourml_property($vars);
}

function theme_tap_tourml_property_list_text(&$vars) {
    return _theme_tap_tourml_property($vars);
}

function theme_tap_tourml_property_text_long(&$vars) {
    return _theme_tap_tourml_property($vars);
}

function theme_tap_tourml_property_taxonomy_term_reference(&$vars) {
    foreach ($vars['items'] as $id => $item) {
        $vars['items'][$id]['value'] = taxonomy_term_load($item['tid'])->name;
    }
    return _theme_tap_tourml_property($vars);
}

/********************************
 * Titles
 */

function _theme_tap_tourml_title($vars) {
    global $language;

    $properties = '';
    foreach ($vars['items'] as $item) {
        $item['language'] = $language->language;
        $properties .= theme('tap_tourml_title', $item);
    }

    return $properties;
}

function theme_tap_tourml_title_text(&$vars) {
    return _theme_tap_tourml_title($vars); 
}

function theme_tap_tourml_title_text_long(&$vars) {
    return _theme_tap_tourml_title($vars); 
}

/********************************
 * Descriptions
 */

function _theme_tap_tourml_description($vars) {
    global $language;

    $properties = '';
    foreach ($vars['items'] as $item) {
        $item['language'] = $language->language;
        $properties .= theme('tap_tourml_description', $item);
    }

    return $properties;
}

function theme_tap_tourml_description_text(&$vars) {
    return _theme_tap_tourml_description($vars);
}

function theme_tap_tourml_description_text_long(&$vars) {
    return _theme_tap_tourml_description($vars);
}

function theme_tap_tourml_description_text_with_summary(&$vars) {
    return _theme_tap_tourml_description($vars);
}

/********************************
 * Connections
 */

function tap_preprocess_tap_tourml_connection_entityreference(&$vars) {
    foreach ($vars['items'] as $k => $v) {
        $vars['items'][$k]['destId'] = $v['target_id'];
    }
}

/********************************
 * Asset Rights
 */
function tap_preprocess_tap_tourml_asset_rights(&$vars) {
    $file = file_view($vars['file'], 'tourml_xml');
    foreach (element_children($file) as $field_name) {
        $field = $file[$field_name];
        if (empty($field['#formatter'])) continue;

        switch ($field['#formatter']) {
            case 'tap_tourml_copyright':
            case 'tap_tourml_credit_line':
            case 'tap_tourml_expiration':
                if (empty($field['#items'])) continue;
                $vars['items'][] = drupal_render($field);
                break;
        }
    }
}

/********************************
 * Copyright
 */
function _theme_tap_tourml_copyright($vars) {
    $copyright = theme('tap_tourml_copyright', array('value' => $vars['items'][0]['value']));
    return $copyright;
}

function theme_tap_tourml_copyright_text(&$vars) {
    return _theme_tap_tourml_copyright($vars);
}

function theme_tap_tourml_copyright_text_long(&$vars) {
    return _theme_tap_tourml_copyright($vars);
}

function theme_tap_tourml_copyright_text_with_summary(&$vars) {
    return _theme_tap_tourml_copyright($vars);
}

/********************************
 * Credit Line
 */
function _theme_tap_tourml_credit_line($vars) {
    $credit_line = theme('tap_tourml_credit_line', array('value' => $vars['items'][0]['value']));
    return $credit_line;
}

function theme_tap_tourml_credit_line_text(&$vars) {
    return _theme_tap_tourml_credit_line($vars);
}

function theme_tap_tourml_credit_line_text_long(&$vars) {
    return _theme_tap_tourml_credit_line($vars);
}

function theme_tap_tourml_credit_line_text_with_summary(&$vars) {
    return _theme_tap_tourml_credit_line($vars);
}

/********************************
 * Expiration
 */
function _theme_tap_tourml_expiration($vars) {

}

function theme_tap_tourml_expiration_date(&$vars) {
    return _theme_tap_tourml_expiration($vars);
}

function theme_tap_tourml_expiration_datestamp(&$vars) {
    return _theme_tap_tourml_expiration($vars);
}

function theme_tap_tourml_expiration_datetime(&$vars) {
    return _theme_tap_tourml_expiration($vars);
}

/********************************
 * iOS plist file
 */
function tap_preprocess_ios_tourml_xml(&$vars) {
}
