<?php
/**
 * @file
 * API endpoints to interface with tap beacons.
 */

/**
* Function to create API endpoint for beacon events
*/
function tap_beacons_api_beacon_events() {

    // Grab sent JSON data
    $json = json_decode($_POST['data'], true);

    // Get stored token
    $token = variable_get('tap_beacons_token', '');

    // Check if token matches token sent
    if(empty($token) || $json['token'] == $token) {

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
* Function to create API endpoint for interaction events
*/
function tap_beacons_api_interaction_events() {

    // Grab sent JSON data
    $json = json_decode($_POST['data'], true);

    // Get stored token
    $token = variable_get('tap_beacons_token', '');

    // Check if token matches token sent
    if(empty($token) || $json['token'] == $token) {

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
            $key['stop_id'] = str_replace("stop-","", $key['stop_id']);

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

/**
* Function to create API endpoint for sending reporting data
*/
function tap_beacons_api_chart_data(){

    $data = "";

    // Check the type being called and use the appropriate function
    switch ($_GET['type']) {
    case 'ranges':
        $data = tap_beacons_build_ranges_json();
        break;

    case 'devices':
        $data = tap_beacons_build_devices_json();
        break;

    case 'events':
        $data = tap_beacons_build_events_json();
        break;
    }

    // Print json
    print $data;
}

/**
* Function to build ranged JSON
*/
function tap_beacons_build_ranges_json(){

    // Build query
    $query = db_select('tap_beacons_beacon_status', 's');
    $query->fields('s', array('beacon_range'));
    $query->addExpression('COUNT(s.beacon_range)', 'beacon_range_count');
    $query->groupBy('s.beacon_range');

    if(isset($_GET['beacon']) && ($_GET['beacon'] != "")){
        $query->condition('s.beacon_id', $_GET['beacon'], '=');
    }

    $results = $query->execute();

    $data = '{
        "cols": [
            {"label":"Ranges","type":"string"},
            {"label":"Beacons","type":"string"}
            ],
        "rows": [';

    // Configure the table rows
    $rows = array();
    foreach ($results as $row) {
        $data .= '{"c":[{"v":"' . ucwords($row->beacon_range) . '"},{"v":' . $row->beacon_range_count .'}]},';
    }

    $data = rtrim($data, ",") . ']}';

    return $data;
}

/**
* Function to build devices JSON
*/
function tap_beacons_build_devices_json(){

    // Build query
    $query = db_select('tap_beacons_beacon_event', 'e');
    $query->join('tap_beacons_beacon_event_beacon_status', 'j', 'e.beacon_event_id = j.beacon_event_id');
    $query->join('tap_beacons_beacon_status', 's', 's.beacon_status_id = j.beacon_status_id');
    $query->join('tap_beacons', 'b', 'b.beacon_id = s.beacon_id');
    $query->fields('b', array('name'));
    $query->addExpression('COUNT(DISTINCT e.mobile_device_id)', 'mobile_device_count');
    $query->groupBy('s.beacon_id');

    $results = $query->execute();

    $data = '{
        "cols": [
            {"label":"Beacons","type":"string"},
            {"label":"Devices","type":"string"}
        ],
        "rows": [';

    // Configure the table rows
    $rows = array();
    foreach ($results as $row) {
        $data .= '{"c":[{"v":"' . ucwords($row->name) . '"},{"v":' . $row->mobile_device_count .'}]},';
    }

    $data = rtrim($data, ",") . ']}';

    return $data;
}

/**
* Function to build events JSON
*/
function tap_beacons_build_events_json(){

    // Build query
    $query = db_select('tap_beacons_beacon_event', 'e');
    $query->join('tap_beacons_beacon_event_beacon_status', 'j', 'e.beacon_event_id = j.beacon_event_id');
    $query->join('tap_beacons_beacon_status', 's', 's.beacon_status_id = j.beacon_status_id');
    $query->fields('e', array('event'));
    $query->addExpression('COUNT(DISTINCT e.mobile_device_id)', 'mobile_device_count');
    $query->groupBy('e.event');

    if(isset($_GET['beacon']) && ($_GET['beacon'] != "")){
        $query->condition('s.beacon_id', $_GET['beacon'], '=');
    }

    $results = $query->execute();

    $data = '{
        "cols": [
            {"label":"Beacons","type":"string"},
            {"label":"Devices","type":"string"}
        ],
        "rows": [';

    // Configure the table rows
    $rows = array();
    foreach ($results as $row) {
        $data .= '{"c":[{"v":"' . ucwords($row->event) . '"},{"v":' . $row->mobile_device_count .'}]},';
    }

    $data = rtrim($data, ",") . ']}';

    return $data;
}

