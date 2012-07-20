<?php
/**
 * @file
 * Admin settings for TAP Webapp
 */

function tap_webapp_admin_form() {

    $form['tap_webapp_units'] = array(
        '#type'             => 'select',
        '#title'            => t('System of units'),
        '#description'      => t('Which system of units to use in the UI'),
        '#options'          => array('si' => t('SI'), 'english' => t('English')),
        '#default_value'    => variable_get('tap_webapp_units', 'si')
    );

    return system_settings_form($form);

}