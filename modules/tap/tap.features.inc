<?php
/**
 * @file
 * tap.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function tap_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function tap_views_api() {
  return array("version" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function tap_node_info() {
  $items = array(
    'tour' => array(
      'name' => t('Tour'),
      'base' => 'node_content',
      'description' => t('The Tour element is used to describe all content related to a museum tour.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'tour_set' => array(
      'name' => t('Tour Set'),
      'base' => 'node_content',
      'description' => t('A TourSet element may be used as the top-level element of a TourML instance in order to represent one or more tours.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
