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
function tap_beacons_api_content_events() {

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
    case 'beacon-ranges':
        $data = tap_beacons_build_beacon_ranges_json();
        break;

    case 'beacon-devices':
        $data = tap_beacons_build_beacon_devices_json();
        break;

    case 'beacon-events':
        $data = tap_beacons_build_beacon_events_json();
        break;

    case 'content-events':
        $data = tap_beacons_build_content_events_json();
        break;

    case 'content-devices':
        $data = tap_beacons_build_content_devices_json();
        break;
    }

    // Print json
    print $data;
}

/**
* Function to build query for beacon ranges JSON
*/
function tap_beacons_build_beacon_ranges_json(){

    // Build query
    $query = db_select('tap_beacons_beacon_event', 'e');
    $query->join('tap_beacons_beacon_event_beacon_status', 'j', 'e.beacon_event_id = j.beacon_event_id');
    $query->join('tap_beacons_beacon_status', 's', 's.beacon_status_id = j.beacon_status_id');
    $query->addField('s', 'beacon_range', 'keyItem');
    $query->addExpression('COUNT(s.beacon_range)', 'value');
    $query->groupBy('s.beacon_range');
    $query->condition('e.event', 'ranged', '=');

    $data = tap_beacons_build_json($query);

    return $data;
}

/**
* Function to build query for beacon devices JSON
*/
function tap_beacons_build_beacon_devices_json(){

    // Build query
    $query = db_select('tap_beacons_beacon_event', 'e');
    $query->join('tap_beacons_beacon_event_beacon_status', 'j', 'e.beacon_event_id = j.beacon_event_id');
    $query->join('tap_beacons_beacon_status', 's', 's.beacon_status_id = j.beacon_status_id');
    $query->join('tap_beacons', 'b', 'b.beacon_id = s.beacon_id');
    $query->addField('b', 'name', 'keyItem');
    $query->addExpression('COUNT(DISTINCT e.mobile_device_id)', 'value');
    $query->groupBy('s.beacon_id');

    $data = tap_beacons_build_json($query);

    return $data;
}

/**
* Function to build query for beacon events JSON
*/
function tap_beacons_build_beacon_events_json(){

    // Build query
    $query = db_select('tap_beacons_beacon_event', 'e');
    $query->join('tap_beacons_beacon_event_beacon_status', 'j', 'e.beacon_event_id = j.beacon_event_id');
    $query->join('tap_beacons_beacon_status', 's', 's.beacon_status_id = j.beacon_status_id');
    $query->addField('e', 'event', 'keyItem');
    $query->addExpression('COUNT(DISTINCT e.mobile_device_id)', 'value');
    $query->groupBy('e.event');

    $data = tap_beacons_build_json($query);

    return $data;
}

/**
* Function to build query for content events JSON
*/
function tap_beacons_build_content_events_json(){

    // Build query
    $query = db_select('tap_beacons_interaction_event', 'e');
    $query->addField('e', 'event', 'keyItem');
    $query->addExpression('COUNT(DISTINCT e.mobile_device_id)', 'value');
    $query->groupBy('e.event');

    $data = tap_beacons_build_json($query);

    return $data;
}

/**
* Function to build query for content devices JSON
*/
function tap_beacons_build_content_devices_json(){

    // Build query
    $query = db_select('tap_beacons_interaction_event', 'e');
    $query->join('node', 'n', 'n.nid = e.stop_nid');
    $query->addField('n', 'title', 'keyItem');
    $query->addExpression('COUNT(DISTINCT e.mobile_device_id)', 'value');
    $query->groupBy('e.stop_nid');

    $data = tap_beacons_build_json($query);

    return $data;
}

/**
* Function to build events JSON
*/
function tap_beacons_build_json($query){

    if(isset($_GET['beacon']) && $_GET['beacon'] != ""){
        $query->condition('s.beacon_id', $_GET['beacon'], '=');
    }

    if(isset($_GET['stop']) && $_GET['stop'] != ""){
        $query->condition('e.stop_nid', $_GET['stop'], '=');
    }

    if(isset($_GET['startdate']) && $_GET['startdate'] != ""){
        $query->condition('e.timestamp', strtotime(urldecode($_GET['startdate'])), '>');
    }

    if(isset($_GET['enddate']) && $_GET['enddate'] != ""){
        $query->condition('e.timestamp', strtotime(urldecode($_GET['enddate']) . " 23:59"), '<=');
    }

    $results = $query->execute();

    $data = '{
        "cols": [
            {"label":"Key","type":"string"},
            {"label":"Value","type":"string"}
        ],
        "rows": [';

    // Configure the table rows
    $rows = array();
    foreach ($results as $row) {
        $data .= '{"c":[{"v":"' . ucwords($row->keyItem) . '"},{"v":' . $row->value .'}]},';
    }

    $data = rtrim($data, ",") . ']}';

    return $data;
}