<?php
/**
 * @file
 * Admin settings for beacons.
 */

/**
 * Function to create admin section for beacons events
 */
function tap_beacons_analytics_beacon_events() {

    // Query stop data to create links back to related stops
    $query = db_select('tap_beacons_beacon_event', 'e');
    $query->join('tap_beacons_beacon_event_beacon_status', 'j', 'e.beacon_event_id = j.beacon_event_id');
    $query->join('tap_beacons_beacon_status', 's', 's.beacon_status_id = j.beacon_status_id');
    $query->join('tap_beacons', 'b', 'b.beacon_id = s.beacon_id');
    $query->fields('e', array('beacon_event_id', 'event', 'mobile_device_id', 'timestamp'))
        ->fields('b', array('name'))
        ->fields('s', array('beacon_status_id', 'beacon_tx_power', 'beacon_range', 'beacon_accuracy'));
    $result = $query->execute()->fetchall();

    $row_array = array();

    // Loop through each row and store the formatted data
    foreach ($result as $row) {
        $timestamp = format_date($row->timestamp, 'custom', 'm/d/Y H:i:s');

        $row_array[] = array($row->beacon_event_id, $row->event, $row->mobile_device_id, $row->name, $row->beacon_tx_power, $row->beacon_range, $row->beacon_accuracy, $timestamp);
    }

    $header = array(t('Event ID'), t('Event'), t('Mobile Device ID'), t('Beacon Name'), t('TX Power'), t('Range'), t('Accuracy'), t('Timestamp'));

    $output = tap_beacons_table_pager($header, $row_array);

    return $output;
}

/**
 * Function to create admin section for interaction events
 */
function tap_beacons_analytics_interaction_events() {

    // Query interaction data to create table
    $result = db_select('tap_beacons_interaction_event', 'i')
        ->fields('i', array('event_id','event','stop_nid','mobile_device_id','timestamp'))
        ->execute()
        ->fetchAll();

    $row_array = array();

    // Loop through each row and store the formatted data
    foreach ($result as $row) {
        $timestamp = format_date($row->timestamp, 'custom', 'm/d/Y H:i:s');

        $row_array[] = array($row->event_id, $row->event, $row->stop_nid, $row->mobile_device_id, $timestamp);
    }

    $header = array(t('ID'), t('Event'), t('Stop ID'), t('Mobile Device ID'), t('Timestamp'));

    $output = tap_beacons_table_pager($header, $row_array);

    return $output;
}