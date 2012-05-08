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
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function tap_features_views_api() {
  return array("version" => "3.0");
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
    'tour_set' => array(
      'name' => t('Tour Set'),
      'base' => 'node_content',
      'description' => t('A TourSet element may be used as the top-level element of a TourML instance in order to represent one or more tours.'),
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

/**
 * Implements hook_strongarm().
 */
function tap_features_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_tour';
  $strongarm->value = 0;
  $export['comment_anonymous_tour'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_tour_audio_stop';
  $strongarm->value = 0;
  $export['comment_anonymous_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_tour_image_stop';
  $strongarm->value = 0;
  $export['comment_anonymous_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_tour_set';
  $strongarm->value = 0;
  $export['comment_anonymous_tour_set'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_tour_stop_group';
  $strongarm->value = 0;
  $export['comment_anonymous_tour_stop_group'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_tour_video_stop';
  $strongarm->value = 0;
  $export['comment_anonymous_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_tour';
  $strongarm->value = 1;
  $export['comment_default_mode_tour'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_tour_audio_stop';
  $strongarm->value = 1;
  $export['comment_default_mode_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_tour_image_stop';
  $strongarm->value = 1;
  $export['comment_default_mode_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_tour_set';
  $strongarm->value = 1;
  $export['comment_default_mode_tour_set'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_tour_stop_group';
  $strongarm->value = 1;
  $export['comment_default_mode_tour_stop_group'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_tour_video_stop';
  $strongarm->value = 1;
  $export['comment_default_mode_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_tour';
  $strongarm->value = '50';
  $export['comment_default_per_page_tour'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_tour_audio_stop';
  $strongarm->value = '50';
  $export['comment_default_per_page_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_tour_image_stop';
  $strongarm->value = '50';
  $export['comment_default_per_page_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_tour_set';
  $strongarm->value = '50';
  $export['comment_default_per_page_tour_set'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_tour_stop_group';
  $strongarm->value = '50';
  $export['comment_default_per_page_tour_stop_group'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_tour_video_stop';
  $strongarm->value = '50';
  $export['comment_default_per_page_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_tour';
  $strongarm->value = 1;
  $export['comment_form_location_tour'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_tour_audio_stop';
  $strongarm->value = 1;
  $export['comment_form_location_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_tour_image_stop';
  $strongarm->value = 1;
  $export['comment_form_location_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_tour_set';
  $strongarm->value = 1;
  $export['comment_form_location_tour_set'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_tour_stop_group';
  $strongarm->value = 1;
  $export['comment_form_location_tour_stop_group'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_tour_video_stop';
  $strongarm->value = 1;
  $export['comment_form_location_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_tour';
  $strongarm->value = '1';
  $export['comment_preview_tour'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_tour_audio_stop';
  $strongarm->value = '1';
  $export['comment_preview_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_tour_image_stop';
  $strongarm->value = '1';
  $export['comment_preview_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_tour_set';
  $strongarm->value = '1';
  $export['comment_preview_tour_set'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_tour_stop_group';
  $strongarm->value = '1';
  $export['comment_preview_tour_stop_group'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_tour_video_stop';
  $strongarm->value = '1';
  $export['comment_preview_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_tour';
  $strongarm->value = 1;
  $export['comment_subject_field_tour'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_tour_audio_stop';
  $strongarm->value = 1;
  $export['comment_subject_field_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_tour_image_stop';
  $strongarm->value = 1;
  $export['comment_subject_field_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_tour_set';
  $strongarm->value = 1;
  $export['comment_subject_field_tour_set'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_tour_stop_group';
  $strongarm->value = 1;
  $export['comment_subject_field_tour_stop_group'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_tour_video_stop';
  $strongarm->value = 1;
  $export['comment_subject_field_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_tour';
  $strongarm->value = '0';
  $export['comment_tour'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_tour_audio_stop';
  $strongarm->value = '0';
  $export['comment_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_tour_image_stop';
  $strongarm->value = '0';
  $export['comment_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_tour_set';
  $strongarm->value = '0';
  $export['comment_tour_set'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_tour_stop_group';
  $strongarm->value = '0';
  $export['comment_tour_stop_group'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_tour_video_stop';
  $strongarm->value = '0';
  $export['comment_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_tour';
  $strongarm->value = '0';
  $export['language_content_type_tour'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_tour_audio_stop';
  $strongarm->value = '0';
  $export['language_content_type_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_tour_image_stop';
  $strongarm->value = '0';
  $export['language_content_type_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_tour_set';
  $strongarm->value = '0';
  $export['language_content_type_tour_set'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_tour_stop_group';
  $strongarm->value = '0';
  $export['language_content_type_tour_stop_group'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_tour_video_stop';
  $strongarm->value = '0';
  $export['language_content_type_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_tour';
  $strongarm->value = array(
    0 => 'main-menu',
  );
  $export['menu_options_tour'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_tour_audio_stop';
  $strongarm->value = array(
    0 => 'main-menu',
  );
  $export['menu_options_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_tour_image_stop';
  $strongarm->value = array(
    0 => 'main-menu',
  );
  $export['menu_options_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_tour_set';
  $strongarm->value = array(
    0 => 'main-menu',
  );
  $export['menu_options_tour_set'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_tour_stop_group';
  $strongarm->value = array(
    0 => 'main-menu',
  );
  $export['menu_options_tour_stop_group'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_tour_video_stop';
  $strongarm->value = array(
    0 => 'main-menu',
  );
  $export['menu_options_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_tour';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_tour'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_tour_audio_stop';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_tour_image_stop';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_tour_set';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_tour_set'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_tour_stop_group';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_tour_stop_group'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_tour_video_stop';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_tour';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_tour'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_tour_audio_stop';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_tour_image_stop';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_tour_set';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_tour_set'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_tour_stop_group';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_tour_stop_group'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_tour_video_stop';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_tour';
  $strongarm->value = '1';
  $export['node_preview_tour'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_tour_audio_stop';
  $strongarm->value = '1';
  $export['node_preview_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_tour_image_stop';
  $strongarm->value = '1';
  $export['node_preview_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_tour_set';
  $strongarm->value = '1';
  $export['node_preview_tour_set'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_tour_stop_group';
  $strongarm->value = '1';
  $export['node_preview_tour_stop_group'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_tour_video_stop';
  $strongarm->value = '1';
  $export['node_preview_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_tour';
  $strongarm->value = 1;
  $export['node_submitted_tour'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_tour_audio_stop';
  $strongarm->value = 1;
  $export['node_submitted_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_tour_image_stop';
  $strongarm->value = 1;
  $export['node_submitted_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_tour_set';
  $strongarm->value = 1;
  $export['node_submitted_tour_set'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_tour_stop_group';
  $strongarm->value = 1;
  $export['node_submitted_tour_stop_group'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_tour_video_stop';
  $strongarm->value = 1;
  $export['node_submitted_tour_video_stop'] = $strongarm;

  return $export;
}
