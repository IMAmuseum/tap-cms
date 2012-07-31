<?php
/**
 * @file
 * Admin settings for TAP Webapp
 */

function tap_webapp_admin_form() {

    $form['tap_webapp_units'] = array(
        '#type'             => 'select',
        '#title'            => t('System of units'),
        '#description'      => t('Which system of units should be used in the UI?'),
        '#options'          => array('si' => t('SI'), 'english' => t('English')),
        '#required'         => TRUE,
        '#default_value'    => variable_get('tap_webapp_units', 'si')
    );

    $default = variable_get('tap_webapp_navbar_items', array(
        'tourstoplist' => 'tourstoplist', 
        'tourkeypad' => 'tourkeypad', 
        'tourmap' => 'tourmap')
    );

    $form['tap_webapp_navbar_items'] = array(
        '#type'             => 'select',
        '#title'            => t('Default navigation bar items'),
        '#description'      => t('Which items should be shown by default?'),
        '#required'         => TRUE,
        '#multiple'         => TRUE,
        '#options'          => array('tourstoplist' => t('Menu'), 'tourkeypad' => t('Keypad'), 'tourmap' => t('Map')),
        '#default_value'    => $default
    );

    return system_settings_form($form);

}
