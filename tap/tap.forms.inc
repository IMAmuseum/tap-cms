<?php

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

    return $form;
}

/**
 * Submit function for tap_export_tourml_form
 */
function tap_export_tourml_form_submit($form, &$form_state) {
    if ($form_state['clicked_button']['#value'] == t('Export TourML')) {
        $tourml = tap_tourml_render($form_state['node']);
        $title  = check_plain($form_state['node']->title);

        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Content-Type: text/xml');
        header('Content-Disposition: attachment; filename="' . $title . '.xml"');
        die(print $tourml);
    }
}
