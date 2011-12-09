<?php
/**
 * @file
 * tap_features.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function tap_features_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function tap_features_views_api() {
  list($module, $api) = func_get_args();
  if ($module == "views" && $api == "views_default") {
    return array("version" => "3.0");
  }
}

/**
 * Implements hook_node_info().
 */
function tap_features_node_info() {
  $items = array(
    'tour' => array(
      'name' => t('Tour'),
      'base' => 'node_content',
      'description' => t('The Tour element is used to describe all content related to a museum tour.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'tour_audio_stop' => array(
      'name' => t('Audio Stop'),
      'base' => 'node_content',
      'description' => t('An audio stop on a tour.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'tour_image_stop' => array(
      'name' => t('Image Stop'),
      'base' => 'node_content',
      'description' => t('An image stop on a tour.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'tour_stop_group' => array(
      'name' => t('Stop Group'),
      'base' => 'node_content',
      'description' => t('A collection of stops.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'tour_video_stop' => array(
      'name' => t('Video Stop'),
      'base' => 'node_content',
      'description' => t('A video stop on a tour.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
