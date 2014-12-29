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
    // Store query string values
    $uuid       = $_GET['uuid'];
    $major_num  = $_GET['major_num'];
    $minor_num  = $_GET['minor_num'];

    // Create insert query to add items
    $query = db_insert('tap_beacons')
        ->fields(array(
          'uuid' => $uuid,
          'major_num' => $major_num,
          'minor_num' => $minor_num,
        ));

    // Set message to be used for action
    $message = 'The beacon has been added.';

    // Call function to execute query
    tap_beacons_query_execute($query, $message);
}

/**
 * Function for delete beacon data
 */
function tap_beacons_admin_delete(){
    // Store query string values
    $id = $_GET['id'];

    // Create delete query to remove items
    $query = db_delete('tap_beacons')
        ->condition('beacon_id', $id);

    // Create delete query to remove stop -> beacon relationship
    $rel_query = db_delete('tap_stop_beacons')
        ->condition('beacon_id', $id)
        ->execute();

    // Set message to be used for action
    $message = 'The beacon has been deleted.';

    // Call function to execute query
    tap_beacons_query_execute($query, $message);
}

/**
 * Function for updating beacon data
 */
function tap_beacons_admin_update(){
    // Store query string values
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

    // Set message to be used for action
    $message = 'The beacon has been updated.';

    // Call function to execute query
    tap_beacons_query_execute($query, $message);
}

/**
* Function to execute queries.
*/
function tap_beacons_query_execute($query, $message){

    // Check for errors on query submissions
    if ($success = $query->execute()) {
        // Notify the user of the action taken
        drupal_set_message(t($message));

        // Clear cache so new data will appear automatically
        cache_clear_all('theme_registry', 'cache', TRUE);
    } else {
        // If there's an error, let the user know
        drupal_set_message(t('There was an error saving your data. Please try again.'));
    }
}

/**
* Function to set beacon references to certain content types.
*/
function tap_beacons_admin_form($form, &$form_state) {

    // Get content types
    $form['tap_beacons_content_types'] = array(
        '#type' => 'checkboxes',
        '#title' => t('Content types that can be referenced'),
        '#description' => t('The available content types that can be added to this field.'),
        '#default_value' => variable_get('tap_beacons_content_types'),
        '#required' => TRUE,
        '#mulitple' => true,
        '#options' => array_map('check_plain', node_type_get_names())
    );

    return system_settings_form($form, $form_state);
}

