<?php
/**
 * @file
 * Admin settings for beacons.
 */

function tap_beacons_admin_section() {

    // Set up styles and JS file to be used on beacon admin pages
    drupal_add_css(drupal_get_path('module', 'tap_beacons') . '/css/tap_beacons_style.css');
    drupal_add_js(drupal_get_path('module', 'tap_beacons') . '/js/tap_beacons_main.js');

    return theme('tap_beacons_admin_content');
}

/**
 * Function for adding beacon data
 */
function tap_beacons_admin_add(){
    $uuid       = $_POST['uuid'];
    $major_num  = $_POST['major_num'];
    $minor_num  = $_POST['minor_num'];

    // Create insert query to add items
    $query = db_insert('tap_beacons')
        ->fields(array(
          'uuid' => $uuid,
          'major_num' => $major_num,
          'minor_num' => $minor_num,
        ));

    $message = 'The beacon has been added.';

    tap_beacons_query_execute($query, $type);
}

/**
 * Function for delete beacon data
 */
function tap_beacons_admin_delete(){
    $id = $_GET['id'];

    // Create delete query to remove items
    $query = db_delete('tap_beacons')
        ->condition('beacon_id', $id);

    $message = 'The beacon has been deleted.';

    tap_beacons_query_execute($query, $type);
}

/**
 * Function for updating beacon data
 */
function tap_beacons_admin_update(){
    $id         = $_GET['id'];
    $uuid       = $_GET['uuid'];
    $major_num  = $_GET['major_num'];
    $minor_num  = $_GET['minor_num'];

    // Create delete query to remove items
    $query = db_update('tap_beacons')
        ->condition('beacon_id', $id)
        ->fields(array(
          'uuid' => $uuid,
          'major_num' => $major_num,
          'minor_num' => $minor_num,
        ));

    $message = 'The beacon has been updated.';

    tap_beacons_query_execute($query, $message);
}

/**
* Function to execute queries.
*/
function tap_beacons_query_execute($query, $message){

    // Use $success to check for errors.
    if ($success = $query->execute()) {
        // Tell the user that the beacon has been deleted.
        drupal_set_message(t($message));
        cache_clear_all('theme_registry', 'cache', TRUE);
    } else {
        // If there's an error, $success will evaluate to FALSE, and the following code will execute.
        drupal_set_message(t('There was an error saving your data. Please try again.'));
    }
}
