<?php
/**
 * @file
 * tap_features.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function tap_features_views_default_views() {
  $export = array();

  $view = new view;
  $view->name = 'tour_stops';
  $view->description = 'Returns a list of stop groups per tour';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Tour Stops';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'type' => 'type',
    'title' => 'title',
    'field_code' => 'field_code',
    'edit_node' => 'edit_node',
    'delete_node' => 'edit_node',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'type' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'title' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_code' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'edit_node' => array(
      'align' => '',
      'separator' => ', ',
      'empty_column' => 0,
    ),
    'delete_node' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['style_options']['override'] = 1;
  $handler->display->display_options['style_options']['sticky'] = 0;
  $handler->display->display_options['style_options']['empty_table'] = 0;
  /* Field: Content: Type */
  $handler->display->display_options['fields']['type']['id'] = 'type';
  $handler->display->display_options['fields']['type']['table'] = 'node';
  $handler->display->display_options['fields']['type']['field'] = 'type';
  $handler->display->display_options['fields']['type']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['type']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['type']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['type']['alter']['external'] = 0;
  $handler->display->display_options['fields']['type']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['type']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['type']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['type']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['type']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['type']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['type']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['type']['alter']['html'] = 0;
  $handler->display->display_options['fields']['type']['element_label_colon'] = 1;
  $handler->display->display_options['fields']['type']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['type']['hide_empty'] = 0;
  $handler->display->display_options['fields']['type']['empty_zero'] = 0;
  $handler->display->display_options['fields']['type']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['type']['link_to_node'] = 0;
  $handler->display->display_options['fields']['type']['machine_name'] = 0;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['external'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['nid']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['nid']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['html'] = 0;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nid']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['nid']['hide_empty'] = 0;
  $handler->display->display_options['fields']['nid']['empty_zero'] = 0;
  $handler->display->display_options['fields']['nid']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['nid']['link_to_node'] = 0;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title_field']['id'] = 'title_field';
  $handler->display->display_options['fields']['title_field']['table'] = 'field_data_title_field';
  $handler->display->display_options['fields']['title_field']['field'] = 'title_field';
  $handler->display->display_options['fields']['title_field']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['title_field']['alter']['make_link'] = 1;
  $handler->display->display_options['fields']['title_field']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['title_field']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['title_field']['alter']['external'] = 0;
  $handler->display->display_options['fields']['title_field']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['title_field']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['title_field']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['title_field']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['title_field']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['title_field']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['title_field']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['title_field']['alter']['html'] = 0;
  $handler->display->display_options['fields']['title_field']['element_label_colon'] = 1;
  $handler->display->display_options['fields']['title_field']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['title_field']['hide_empty'] = 0;
  $handler->display->display_options['fields']['title_field']['empty_zero'] = 0;
  $handler->display->display_options['fields']['title_field']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['title_field']['field_api_classes'] = 0;
  /* Field: Content: Code */
  $handler->display->display_options['fields']['field_code']['id'] = 'field_code';
  $handler->display->display_options['fields']['field_code']['table'] = 'field_data_field_code';
  $handler->display->display_options['fields']['field_code']['field'] = 'field_code';
  $handler->display->display_options['fields']['field_code']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_code']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_code']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_code']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_code']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_code']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_code']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_code']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_code']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_code']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_code']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_code']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_code']['element_label_colon'] = 0;
  $handler->display->display_options['fields']['field_code']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_code']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_code']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_code']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_code']['field_api_classes'] = 0;
  /* Field: Content: Edit link */
  $handler->display->display_options['fields']['edit_node']['id'] = 'edit_node';
  $handler->display->display_options['fields']['edit_node']['table'] = 'views_entity_node';
  $handler->display->display_options['fields']['edit_node']['field'] = 'edit_node';
  $handler->display->display_options['fields']['edit_node']['label'] = 'Options';
  $handler->display->display_options['fields']['edit_node']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['edit_node']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['edit_node']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['edit_node']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['edit_node']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['edit_node']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['edit_node']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['edit_node']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['edit_node']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['edit_node']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['edit_node']['alter']['html'] = 0;
  $handler->display->display_options['fields']['edit_node']['element_label_colon'] = 0;
  $handler->display->display_options['fields']['edit_node']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['edit_node']['hide_empty'] = 0;
  $handler->display->display_options['fields']['edit_node']['empty_zero'] = 0;
  $handler->display->display_options['fields']['edit_node']['hide_alter_empty'] = 1;
  /* Field: Content: Delete link */
  $handler->display->display_options['fields']['delete_node']['id'] = 'delete_node';
  $handler->display->display_options['fields']['delete_node']['table'] = 'views_entity_node';
  $handler->display->display_options['fields']['delete_node']['field'] = 'delete_node';
  $handler->display->display_options['fields']['delete_node']['label'] = 'delete';
  $handler->display->display_options['fields']['delete_node']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['delete_node']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['delete_node']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['delete_node']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['delete_node']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['delete_node']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['delete_node']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['delete_node']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['delete_node']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['delete_node']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['delete_node']['alter']['html'] = 0;
  $handler->display->display_options['fields']['delete_node']['element_label_colon'] = 0;
  $handler->display->display_options['fields']['delete_node']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['delete_node']['hide_empty'] = 0;
  $handler->display->display_options['fields']['delete_node']['empty_zero'] = 0;
  $handler->display->display_options['fields']['delete_node']['hide_alter_empty'] = 1;
  /* Field: Content: Tour */
  $handler->display->display_options['fields']['field_tour']['id'] = 'field_tour';
  $handler->display->display_options['fields']['field_tour']['table'] = 'field_data_field_tour';
  $handler->display->display_options['fields']['field_tour']['field'] = 'field_tour';
  $handler->display->display_options['fields']['field_tour']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_tour']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_tour']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_tour']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_tour']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_tour']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_tour']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_tour']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_tour']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_tour']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_tour']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_tour']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_tour']['element_label_colon'] = 1;
  $handler->display->display_options['fields']['field_tour']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_tour']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_tour']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_tour']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_tour']['click_sort_column'] = 'target_id';
  $handler->display->display_options['fields']['field_tour']['settings'] = array(
    'link' => 1,
  );
  $handler->display->display_options['fields']['field_tour']['field_api_classes'] = 0;
  /* Sort criterion: Content: Code (field_code) */
  $handler->display->display_options['sorts']['field_code_value']['id'] = 'field_code_value';
  $handler->display->display_options['sorts']['field_code_value']['table'] = 'field_data_field_code';
  $handler->display->display_options['sorts']['field_code_value']['field'] = 'field_code_value';
  /* Contextual filter: Content: Tour (field_tour:target_id) */
  $handler->display->display_options['arguments']['field_tour_target_id']['id'] = 'field_tour_target_id';
  $handler->display->display_options['arguments']['field_tour_target_id']['table'] = 'field_data_field_tour';
  $handler->display->display_options['arguments']['field_tour_target_id']['field'] = 'field_tour_target_id';
  $handler->display->display_options['arguments']['field_tour_target_id']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_tour_target_id']['default_argument_skip_url'] = 0;
  $handler->display->display_options['arguments']['field_tour_target_id']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_tour_target_id']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_tour_target_id']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_tour_target_id']['break_phrase'] = 0;
  $handler->display->display_options['arguments']['field_tour_target_id']['not'] = 0;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 0;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'tour_audio_stop' => 'tour_audio_stop',
    'geo_stop' => 'geo_stop',
    'tour_image_stop' => 'tour_image_stop',
    'tour_stop_group' => 'tour_stop_group',
    'tour_video_stop' => 'tour_video_stop',
  );
  $handler->display->display_options['filters']['type']['group'] = '0';
  $handler->display->display_options['filters']['type']['exposed'] = TRUE;
  $handler->display->display_options['filters']['type']['expose']['operator_id'] = 'type_op';
  $handler->display->display_options['filters']['type']['expose']['label'] = 'Stop Type';
  $handler->display->display_options['filters']['type']['expose']['operator'] = 'type_op';
  $handler->display->display_options['filters']['type']['expose']['identifier'] = 'type';
  $handler->display->display_options['filters']['type']['expose']['reduce'] = 1;
  /* Filter criterion: Content: Code (field_code) */
  $handler->display->display_options['filters']['field_code_value']['id'] = 'field_code_value';
  $handler->display->display_options['filters']['field_code_value']['table'] = 'field_data_field_code';
  $handler->display->display_options['filters']['field_code_value']['field'] = 'field_code_value';
  $handler->display->display_options['filters']['field_code_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_code_value']['expose']['operator_id'] = 'field_code_value_op';
  $handler->display->display_options['filters']['field_code_value']['expose']['label'] = 'Code';
  $handler->display->display_options['filters']['field_code_value']['expose']['operator'] = 'field_code_value_op';
  $handler->display->display_options['filters']['field_code_value']['expose']['identifier'] = 'field_code_value';
  $handler->display->display_options['filters']['field_code_value']['expose']['required'] = 0;
  $handler->display->display_options['filters']['field_code_value']['expose']['multiple'] = FALSE;
  $translatables['tour_stops'] = array(
    t('Master'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Items per page'),
    t('- All -'),
    t('Offset'),
    t('Type'),
    t('Title'),
    t('node/[nid]'),
    t('Code'),
    t('Options'),
    t('delete'),
    t('Tour'),
    t('All'),
    t('Stop Type'),
  );
  $export['tour_stops'] = $view;

  $view = new view;
  $view->name = 'tours_listing';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'tours_listing';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Tours';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['row_plugin'] = 'node';
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = FALSE;
  $handler->display->display_options['empty']['area']['content'] = 'You currently have no tours created.';
  $handler->display->display_options['empty']['area']['format'] = 'filtered_html';
  $handler->display->display_options['empty']['area']['tokenize'] = 0;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['title']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['title']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = 0;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = 0;
  $handler->display->display_options['fields']['title']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['title']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['title']['alter']['html'] = 0;
  $handler->display->display_options['fields']['title']['hide_empty'] = 0;
  $handler->display->display_options['fields']['title']['empty_zero'] = 0;
  $handler->display->display_options['fields']['title']['link_to_node'] = 1;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'tour' => 'tour',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'tours';
  $translatables['tours_listing'] = array(
    t('Master'),
    t('Tours'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Items per page'),
    t('- All -'),
    t('Offset'),
    t('You currently have no tours created.'),
    t('Page'),
  );
  $export['tours_listing'] = $view;

  return $export;
}
