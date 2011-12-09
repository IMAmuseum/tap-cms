<?php
/**
 * @file
 * tap_features.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function tap_features_field_group_info() {
  $export = array();

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_assets|node|tour_audio_stop|form';
  $field_group->group_name = 'group_assets';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_audio_stop';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Assets',
    'weight' => '5',
    'children' => array(
      0 => 'field_tour_audio',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_assets|node|tour_audio_stop|form'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_assets|node|tour_audio_stop|tourml_xml';
  $field_group->group_name = 'group_assets';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_audio_stop';
  $field_group->mode = 'tourml_xml';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Assets',
    'weight' => '3',
    'children' => array(
      0 => 'field_tour_audio',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
      ),
    ),
  );
  $export['group_assets|node|tour_audio_stop|tourml_xml'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_assets|node|tour_image_stop|form';
  $field_group->group_name = 'group_assets';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_image_stop';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Assets',
    'weight' => '4',
    'children' => array(
      0 => 'field_tour_image',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_assets|node|tour_image_stop|form'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_assets|node|tour_image_stop|tourml_xml';
  $field_group->group_name = 'group_assets';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_image_stop';
  $field_group->mode = 'tourml_xml';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Assets',
    'weight' => '3',
    'children' => array(
      0 => 'field_tour_image',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
      ),
    ),
  );
  $export['group_assets|node|tour_image_stop|tourml_xml'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_assets|node|tour_stop_group|form';
  $field_group->group_name = 'group_assets';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_stop_group';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Assets',
    'weight' => '6',
    'children' => array(),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_assets|node|tour_stop_group|form'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_assets|node|tour_stop_group|tourml_xml';
  $field_group->group_name = 'group_assets';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_stop_group';
  $field_group->mode = 'tourml_xml';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Assets',
    'weight' => '4',
    'children' => array(),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
      ),
    ),
  );
  $export['group_assets|node|tour_stop_group|tourml_xml'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_assets|node|tour_video_stop|form';
  $field_group->group_name = 'group_assets';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_video_stop';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Assets',
    'weight' => '4',
    'children' => array(
      0 => 'field_tour_video',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_assets|node|tour_video_stop|form'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_assets|node|tour_video_stop|tourml_xml';
  $field_group->group_name = 'group_assets';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_video_stop';
  $field_group->mode = 'tourml_xml';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Assets',
    'weight' => '3',
    'children' => array(
      0 => 'field_tour_video',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
      ),
    ),
  );
  $export['group_assets|node|tour_video_stop|tourml_xml'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_properties|node|tour_audio_stop|form';
  $field_group->group_name = 'group_properties';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_audio_stop';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Properties',
    'weight' => '3',
    'children' => array(
      0 => 'field_code',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_properties|node|tour_audio_stop|form'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_properties|node|tour_audio_stop|tourml_xml';
  $field_group->group_name = 'group_properties';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_audio_stop';
  $field_group->mode = 'tourml_xml';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Properties',
    'weight' => '2',
    'children' => array(
      0 => 'field_code',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
      ),
    ),
  );
  $export['group_properties|node|tour_audio_stop|tourml_xml'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_properties|node|tour_image_stop|form';
  $field_group->group_name = 'group_properties';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_image_stop';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Properties',
    'weight' => '3',
    'children' => array(
      0 => 'field_code',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_properties|node|tour_image_stop|form'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_properties|node|tour_image_stop|tourml_xml';
  $field_group->group_name = 'group_properties';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_image_stop';
  $field_group->mode = 'tourml_xml';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Properties',
    'weight' => '2',
    'children' => array(
      0 => 'field_code',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
      ),
    ),
  );
  $export['group_properties|node|tour_image_stop|tourml_xml'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_properties|node|tour_stop_group|form';
  $field_group->group_name = 'group_properties';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_stop_group';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Properties',
    'weight' => '4',
    'children' => array(
      0 => 'field_code',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_properties|node|tour_stop_group|form'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_properties|node|tour_stop_group|tourml_xml';
  $field_group->group_name = 'group_properties';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_stop_group';
  $field_group->mode = 'tourml_xml';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Properties',
    'weight' => '3',
    'children' => array(
      0 => 'field_code',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
      ),
    ),
  );
  $export['group_properties|node|tour_stop_group|tourml_xml'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_properties|node|tour_video_stop|form';
  $field_group->group_name = 'group_properties';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_video_stop';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Properties',
    'weight' => '3',
    'children' => array(
      0 => 'field_code',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_properties|node|tour_video_stop|form'] = $field_group;

  $field_group = new stdClass;
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_properties|node|tour_video_stop|tourml_xml';
  $field_group->group_name = 'group_properties';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'tour_video_stop';
  $field_group->mode = 'tourml_xml';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Properties',
    'weight' => '2',
    'children' => array(
      0 => 'field_code',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
      ),
    ),
  );
  $export['group_properties|node|tour_video_stop|tourml_xml'] = $field_group;

  return $export;
}
