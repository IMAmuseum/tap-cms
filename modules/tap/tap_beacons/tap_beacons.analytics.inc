<?php
/**
 * @file
 * Analytics for beacons.
 */

/**
 * Function to create admin section for beacons
 */
function tap_beacons_analytics_section() {

    // Clear cache so new data will appear automatically
    cache_clear_all('theme_registry', 'cache', TRUE);

    drupal_add_js('https://www.google.com/jsapi');

    // Set up styles and JS file to be used on beacon admin pages
    drupal_add_css(drupal_get_path('module', 'tap_beacons') . '/css/tap_beacons_style.css');
    drupal_add_js(drupal_get_path('module', 'tap_beacons') . '/js/tap_beacons_charts.js');



    return theme('tap_beacons_analytics_content');
}

/**
 * Implements hook_preprocess().
 */
function tap_beacons_preprocess(&$variables, $hook){
    $variables['beacon_events_table'] = tap_beacons_analytics_beacon_events();
}

/**
 * Function to create admin section for beacons events
 */
function tap_beacons_analytics_beacon_events() {

    // Set number of display items
    $per_page = 50;

    // Configure the table header columns
    $header = array(
        array('data' => 'Event ID',         'field' => 'beacon_event_id',   'sort' => 'DESC'),
        array('data' => 'Event',            'field' => 'event',             'sort' => 'DESC'),
        array('data' => 'Mobile Device ID', 'field' => 'mobile_device_id',  'sort' => 'DESC'),
        array('data' => 'Beacon Name',      'field' => 'name',              'sort' => 'DESC'),
        array('data' => 'TX Power',         'field' => 'beacon_tx_power',   'sort' => 'DESC'),
        array('data' => 'Range',            'field' => 'beacon_range',      'sort' => 'DESC'),
        array('data' => 'Accuracy',         'field' => 'beacon_accuracy',   'sort' => 'DESC'),
        array('data' => 'Timestamp',        'field' => 'timestamp',         'sort' => 'DESC'),
    );

    // Build query
    $query = db_select('tap_beacons_beacon_event', 'e')
        ->extend('TableSort')
        ->extend('PagerDefault');

    $query->join('tap_beacons_beacon_event_beacon_status', 'j', 'e.beacon_event_id = j.beacon_event_id');
    $query->join('tap_beacons_beacon_status', 's', 's.beacon_status_id = j.beacon_status_id');
    $query->join('tap_beacons', 'b', 'b.beacon_id = s.beacon_id');
    $query->fields('e', array('beacon_event_id', 'event', 'mobile_device_id', 'timestamp'))
        ->fields('b', array('name'))
        ->fields('s', array('beacon_status_id', 'beacon_tx_power', 'beacon_range', 'beacon_accuracy'));
    $query->limit($per_page)
        ->orderByHeader($header);

    if(isset($_GET['beacon']) && $_GET['beacon'] != ""){
        $beacon = $_GET['beacon'];

        $query->condition('b.beacon_id', $beacon, '=');
    }

    // Execute the query
    $results = $query->execute();

    // Configure the table rows
    $rows = array();
    $options = array();
    foreach ($results as $row) {
        $timestamp = format_date($row->timestamp, 'custom', 'm/d/Y H:i:s');

        $rows[] = array(
            $row->beacon_event_id,
            $row->event,
            $row->mobile_device_id,
            $row->name,
            $row->beacon_tx_power,
            $row->beacon_range,
            round($row->beacon_accuracy, 4),
            $timestamp
        );
    }

    // Set up output as table
    $output['table']  = array(
        '#theme' => 'table',
        '#header' => $header,
        '#rows' => $rows,
        '#empty' => t('No data found'),
        '#attributes' => array(
            'class' => array('tap-beacons-table')
        )
    );

    // Add the pager
    $output['pager'] = array(
        '#theme' => 'pager',
    );

    return $output;
}

/**
 * Function to create admin section for interaction events
 */
function tap_beacons_analytics_user_events() {

    // Set number of display items
    $per_page = 50;

    // Configure the table header columns
    $header = array(
        array('data' => 'Event ID',         'field' => 'event_id',          'sort' => 'DESC'),
        array('data' => 'Event',            'field' => 'event',             'sort' => 'DESC'),
        array('data' => 'Mobile Device ID', 'field' => 'mobile_device_id',  'sort' => 'DESC'),
        array('data' => 'Stop ID',          'field' => 'stop_nid',          'sort' => 'DESC'),
        array('data' => 'Timestamp',        'field' => 'timestamp',         'sort' => 'DESC'),
    );

    // Build query
    $query = db_select('tap_beacons_interaction_event', 'i')
        ->extend('PagerDefault')
        ->extend('TableSort');

    $query->fields('i', array('event_id','event','stop_nid','mobile_device_id','timestamp'));
    $query->limit($per_page)
        ->orderByHeader($header);

    // Execute the query
    $results = $query->execute()->fetchAll();

    // Configure the table rows
    $rows = array();
    foreach ($results as $row) {
        $timestamp = format_date($row->timestamp, 'custom', 'm/d/Y H:i:s');

        $rows[] = array(
            $row->event_id,
            $row->event,
            $row->mobile_device_id,
            $row->stop_nid, $timestamp
        );
    }

    // Set up output as table
    $output['table']  = array(
        '#theme' => 'table',
        '#header' => $header,
        '#rows' => $rows,
        '#empty' => t('No data found'),
        '#attributes' => array(
            'class' => array('tap-beacons-table')
        )
    );

    // Add the pager
    $output['pager'] = array(
        '#theme' => 'pager',
    );

    return $output;
}