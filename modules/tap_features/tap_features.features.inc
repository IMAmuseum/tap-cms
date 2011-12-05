<?php
/**
 * @file
 * tap_features.features.inc
 */

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
      'name' => t('Tour Audio Stop'),
      'base' => 'node_content',
      'description' => t('An audio stop on a tour.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'tour_image_stop' => array(
      'name' => t('Tour Image Stop'),
      'base' => 'node_content',
      'description' => t('An image stop on a tour.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'tour_stop_group' => array(
      'name' => t('Tour Stop Group'),
      'base' => 'node_content',
      'description' => t('A collection of stops.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'tour_video_stop' => array(
      'name' => t('Tour Video Stop'),
      'base' => 'node_content',
      'description' => t('A video stop on a tour.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
