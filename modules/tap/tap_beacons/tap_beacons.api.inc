<?php
/**
 * @file
 * API endpoints to interface with tap beacons.
 */

/**
*Function to create API endpoint for beacon events
*/
function tap_beacons_api_beacon_events() {
    $json = json_decode($_POST['data'], true);

    $token = tap_beacons_get_tokens();

    if($json['token'] == $token['token']) {

        foreach ($json['events'] as $key) {
            $event_query = db_insert('tap_beacons_beacon_event')
                ->fields(array(
                  'event' => $key['event'],
                  'mobile_device_id' => $key['mobile_device_id'],
                  'timestamp' => $key['timestamp'],
                ))
                ->execute();

                foreach ($key['beacons'] as $beacon_key) {
                    $status_query = db_insert('tap_beacons_beacon_status')
                        ->fields(array(
                          'beacon_id' => $beacon_key['beacon_id'],
                          'beacon_tx_power' => $beacon_key['beacon_tx_power'],
                          'beacon_range' => $beacon_key['beacon_range'],
                          'beacon_accuracy' => $beacon_key['beacon_accuracy'],
                        ))
                        ->execute();

                    $event_status_query = db_insert('tap_beacons_beacon_event_beacon_status')
                        ->fields(array(
                          'beacon_event_id' => $event_query,
                          'beacon_status_id' => $status_query,
                        ))
                        ->execute();
                }
        }

    } else {
        echo '<p>You are not authorized to access this page.</p>';
    }
}

/**
*Function to create API endpoint for interaction events
*/
function tap_beacons_api_interaction_events() {

    $json = json_decode($_POST['data'], true);

    $token = tap_beacons_get_tokens();

    if($json['token'] == $token['token']) {

        // Build insert query
        $query = db_insert('tap_beacons_interaction_event')
            ->fields(array(
              'event',
              'stop_nid',
              'mobile_device_id',
              'timestamp',
            ));

        // Build values for storage
        foreach ($json['events'] as $key) {
            $query->values(array(
                  $key['event'],
                  $key['stop_id'],
                  $key['mobile_device_id'],
                  $key['timestamp'],
                ));
        }

        $query->execute();

    } else {
        echo '<p>You are not authorized to access this page.</p>';
    }
}