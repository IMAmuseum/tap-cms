<?php
/**
 * @file
 * tap_features.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function tap_features_strongarm() {
  $export = array();

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_tour';
  $strongarm->value = '4';
  $export['language_content_type_tour'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_tour_audio_stop';
  $strongarm->value = '4';
  $export['language_content_type_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_tour_image_stop';
  $strongarm->value = '4';
  $export['language_content_type_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_tour_set';
  $strongarm->value = '4';
  $export['language_content_type_tour_set'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_tour_video_stop';
  $strongarm->value = '4';
  $export['language_content_type_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_tour';
  $strongarm->value = array(
    0 => 'main-menu',
  );
  $export['menu_options_tour'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_tour_audio_stop';
  $strongarm->value = array(
    0 => 'main-menu',
  );
  $export['menu_options_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_tour_image_stop';
  $strongarm->value = array(
    0 => 'main-menu',
  );
  $export['menu_options_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_tour_set';
  $strongarm->value = array(
    0 => 'main-menu',
  );
  $export['menu_options_tour_set'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_tour_video_stop';
  $strongarm->value = array(
    0 => 'main-menu',
  );
  $export['menu_options_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_tour';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_tour'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_tour_audio_stop';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_tour_image_stop';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_tour_set';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_tour_set'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_tour_video_stop';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_tour';
  $strongarm->value = array(
    0 => 'status',
    1 => 'promote',
  );
  $export['node_options_tour'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_tour_audio_stop';
  $strongarm->value = array(
    0 => 'status',
    1 => 'promote',
  );
  $export['node_options_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_tour_image_stop';
  $strongarm->value = array(
    0 => 'status',
    1 => 'promote',
  );
  $export['node_options_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_tour_set';
  $strongarm->value = array(
    0 => 'status',
    1 => 'promote',
  );
  $export['node_options_tour_set'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_tour_video_stop';
  $strongarm->value = array(
    0 => 'status',
    1 => 'promote',
  );
  $export['node_options_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_tour';
  $strongarm->value = '1';
  $export['node_preview_tour'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_tour_audio_stop';
  $strongarm->value = '1';
  $export['node_preview_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_tour_image_stop';
  $strongarm->value = '1';
  $export['node_preview_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_tour_set';
  $strongarm->value = '1';
  $export['node_preview_tour_set'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_tour_video_stop';
  $strongarm->value = '1';
  $export['node_preview_tour_video_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_tour';
  $strongarm->value = 1;
  $export['node_submitted_tour'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_tour_audio_stop';
  $strongarm->value = 1;
  $export['node_submitted_tour_audio_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_tour_image_stop';
  $strongarm->value = 1;
  $export['node_submitted_tour_image_stop'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_tour_set';
  $strongarm->value = 1;
  $export['node_submitted_tour_set'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_tour_video_stop';
  $strongarm->value = 1;
  $export['node_submitted_tour_video_stop'] = $strongarm;

  return $export;
}
