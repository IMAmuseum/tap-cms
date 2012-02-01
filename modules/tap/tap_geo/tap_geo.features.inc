<?php
/**
 * @file
 * tap_geo.features.inc
 */

/**
 * Implements hook_node_info().
 */
function tap_geo_node_info() {
  $items = array(
    'geo_stop' => array(
      'name' => t('Geo Stop'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
