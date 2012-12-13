<?php
/**
 * @file
 * Admin settings for TAP Webapp
 */

function tap_webapp_admin_form($form, &$form_state) {

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

    $default = variable_get('tap_webapp_default_theme', NULL);
    $custom_theme = t('none');
    if ($default !== NULL) {
        $file = file_load($default);
        if (!empty($file)) $custom_theme = $file->filename;
    }

    $form['tap_webapp_default_theme'] = array(
        '#type'             => 'file',
        '#title'            => t('Upload custom default theme'),
        '#description'      => t('Replaces the current custom default theme'),
        '#prefix'           => t('Current custom default theme:') . ' ' . $custom_theme
    );

    $form['#submit'][] = 'tap_webapp_admin_form_submit';

    return system_settings_form($form, $form_state);

}


function tap_webapp_admin_form_submit($form, &$form_state) {

    $dest = 'public://';
    $file = file_save_upload(
        'tap_webapp_default_theme', 
        array('file_validate_extensions' => array('css')), 
        $dest
    );

    if (is_object($file)) {

        // Remove the previous file
        $old_file = file_load(variable_get('tap_webapp_default_theme', -1));
        if (!empty($old_file)) file_delete($old_file);

        $form_state['values']['tap_webapp_default_theme'] = $file->fid;
        variable_set('tap_webapp_default_theme', $file->fid);

    }    

}
