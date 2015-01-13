<?php
/**
 * @file
 * Admin settings for beacons.
 */

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
        ->extend('PagerDefault')
        ->extend('TableSort');

    $query->join('tap_beacons_beacon_event_beacon_status', 'j', 'e.beacon_event_id = j.beacon_event_id');
    $query->join('tap_beacons_beacon_status', 's', 's.beacon_status_id = j.beacon_status_id');
    $query->join('tap_beacons', 'b', 'b.beacon_id = s.beacon_id');
    $query->fields('e', array('beacon_event_id', 'event', 'mobile_device_id', 'timestamp'))
        ->fields('b', array('name'))
        ->fields('s', array('beacon_status_id', 'beacon_tx_power', 'beacon_range', 'beacon_accuracy'));
    $query->limit($per_page)
        ->orderByHeader($header);

    // Execute the query
    $results = $query->execute()->fetchAll();

    // Configure the table rows
    $rows = array();
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
    $output = theme('table', array('header' => $header,
                                   'rows' => $rows));

    // Add the pager
    $output .= theme('pager');

    return $output;
}

/**
 * Function to create admin section for interaction events
 */
function tap_beacons_analytics_interaction_events() {

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
    $output = theme('table', array('header' => $header,
                                   'rows' => $rows));

    // Add the pager
    $output .= theme('pager');

    return $output;
}