<?php
/**
 * @file
 * Admin settings for TAP
 */

function tap_admin_form() {
    // Get available fields for building connections 
    $options = array('' => '---');
    $fields = _field_info_collate_fields();
    foreach ($fields['fields'] as $field) {
        if ($field['type'] == 'entityreference') {
            $options[$field['field_name']] = $field['field_name'];
        }
    }
    

    $form['tap_connection_field'] = array(
        '#type'             => 'select',
        '#title'            => t('Stop Connection Field'),
        '#description'      => t('This is the EntityReference field that will be used to build connections between stops'),
        '#options'          => $options,
        '#default_value'    => variable_get('tap_connection_field'),
    );

    $form['tap_bundle_domain'] = array(
        '#type'             => 'textfield',
        '#title'            => t('Bundle Domain'),
        '#default_value'    => variable_get('tap_bundle_domain'),
    );

    return system_settings_form($form);
}
