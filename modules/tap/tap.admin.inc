<?php

function tap_admin_form() {
    $form['tap_bundle_domain'] = array(
        '#type'             => 'textfield',
        '#title'            => t('Bundle Domain'),
        '#default_value'    => variable_get('tap_bundle_domain'),
    );

    return system_settings_form($form);
}
