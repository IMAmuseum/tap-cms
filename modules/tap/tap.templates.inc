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

function tap_preprocess_tap_tourml_asset_file(&$vars)
{
    //dpm($vars);
}

/**
 * Properties
 */
function tap_preprocess_tap_tourml_property(&$vars) {
    $vars['attributes'] = drupal_attributes($vars['attributes']);
}

function _theme_tap_tourml_property($vars) {
    $properties = '';
    foreach($vars['items'] as $item) {
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
    foreach($vars['items'] as $id => $item) {
        $vars['items'][$id]['value'] = taxonomy_term_load($item['tid'])->name;
    }
    return _theme_tap_tourml_property($vars);
}

/**
 * Titles
 */
function _theme_tap_tourml_title($vars) {
    global $language;

    $properties = '';
    foreach($vars['items'] as $item) {
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

/**
 * Descriptions
 */
function _theme_tap_tourml_description($vars) {
    global $language;

    $properties = '';
    foreach($vars['items'] as $item) {
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

/**
 * Connections
 */
function tap_preprocess_tap_tourml_connection_node_reference(&$vars)
{
    
    foreach($vars['items'] as $k => $v)
    {
        $vars['items'][$k]['destId'] = $v['nid'];
    }
}

function tap_preprocess_tap_tourml_title_text(&$vars)
{
    global $language;
    $vars['language'] = $language->language;
    //dpm($vars);
}

