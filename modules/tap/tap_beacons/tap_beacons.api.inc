<?php
/**
 * @file
 * API endpoints to interface with tap beacons.
 */

/**
*Function to create API endpoint for beacon events
*/
function tap_beacons_api_beacon_events() {

    // Grab sent JSON data
    $json = json_decode($_POST['data'], true);

    // Get stored token
    $token = tap_beacons_get_tokens();

    // Check if token matches token sent
    if($json['token'] == $token['token']) {

        // Loop through each event
        foreach ($json['events'] as $key) {

            // Store event data
            $event_query = db_insert('tap_beacons_beacon_event')
                ->fields(array(
                  'event' => $key['event'],
                  'mobile_device_id' => $key['mobile_device_id'],
                  'timestamp' => $key['timestamp'],
                ))
                ->execute();

                // Loop through each beacon associated with the event
                foreach ($key['beacons'] as $beacon_key) {

                    // Store the beacon statuses
                    $status_query = db_insert('tap_beacons_beacon_status')
                        ->fields(array(
                          'beacon_id' => $beacon_key['beacon_id'],
                          'beacon_tx_power' => $beacon_key['beacon_tx_power'],
                          'beacon_range' => $beacon_key['beacon_range'],
                          'beacon_accuracy' => $beacon_key['beacon_accuracy'],
                        ))
                        ->execute();

                    // Get the unique IDs of the event and beacon status. Then, store them in another table.
                    $event_status_query = db_insert('tap_beacons_beacon_event_beacon_status')
                        ->fields(array(
                          'beacon_event_id' => $event_query,
                          'beacon_status_id' => $status_query,
                        ))
                        ->execute();
                }
        }

    } else {
        // If the tokens don't match, send a response
        echo '<p>You are not authorized to access this page.</p>';
    }
}

/**
*Function to create API endpoint for interaction events
*/
function tap_beacons_api_interaction_events() {

    // Grab sent JSON data
    $json = json_decode($_POST['data'], true);

    // Get stored token
    $token = tap_beacons_get_tokens();

    // Check if token matches token sent
    if($json['token'] == $token['token']) {

        // Build query to insert interaction event data
        $query = db_insert('tap_beacons_interaction_event')
            ->fields(array(
              'event',
              'stop_nid',
              'mobile_device_id',
              'timestamp',
            ));

        // Store the values that need to be added to the table
        foreach ($json['events'] as $key) {
            $query->values(array(
                  $key['event'],
                  $key['stop_id'],
                  $key['mobile_device_id'],
                  $key['timestamp'],
                ));
        }

        // Execute query to store all the data in bulk
        $query->execute();

    } else {
        // If the tokens don't match, send a response
        echo '<p>You are not authorized to access this page.</p>';
    }
}