<?php
/**
 * @file
 * TAP Forms 
 */

/**
 * Export Form.
 * this form provides an export button to download a TourML xml file from a tour node
 */
function tap_export_tourml_form($form, &$form_state, $node) {
    $form = array();

    $form_state['node'] = $node;

    $form['export_tourml'] = array(
        '#type'     => 'submit',
        '#value'    => t('Export TourML'),
    );

    $form['export_bundle'] = array(
        '#type'     => 'submit',
        '#value'    => t('Export Bundle'),
    );

    return $form;
}

/**
 * Submit function for tap_export_tourml_form
 */
function tap_export_tourml_form_submit($form, &$form_state) {
    $node   =& $form_state['node'];

    module_load_include('inc', 'tap', 'tap.export');

    // Export a downloadable xml file
    if ($form_state['clicked_button']['#value'] == t('Export TourML')) {
        tap_export_tourml($node);
    }

    // Export a downloadable zip file with all assets
    if ($form_state['clicked_button']['#value'] == t('Export Bundle')) {
        drupal_goto('admin/content/' . $node->nid . '/tourml-export');
    }
}
