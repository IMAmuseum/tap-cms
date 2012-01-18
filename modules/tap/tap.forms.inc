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
    $title  = preg_replace('/\s+/', '', check_plain($node->title));

    // Export a downloadable xml file
    if ($form_state['clicked_button']['#value'] == t('Export TourML')) {
        $tourml = tap_tourml_render($node);
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Content-Type: text/xml');
        header('Content-Disposition: attachment; filename="' . $title . '.xml"');
        die(print $tourml);
    }

    // Export a downloadable zip file with all assets
    if ($form_state['clicked_button']['#value'] == t('Export Bundle')) {
        // Check for presense of zip extension
        if (!class_exists('ZipArchive')) {
            drupal_set_message("You must install the php zip extension to export bundles.", 'error');
            return;
        }

        // Delete old bundle from node
        if (isset($node->field_tour_bundle[$node->language][0]['fid'])) {
            $file = file_load($node->field_tour_bundle[$node->language][0]['fid']);
            $file->status = 0;
            file_field_delete_file($node->field_tour_bundle[$node->language][0], 'field_tour_bundle', 'node', $node->nid);
            unset($node->field_tour_bundle[$node->language][0]);
        }

        $path = file_directory_temp() . "/$title-bundle.zip";

        // If we have a stale tmp file delete it
        if (file_exists($path)) {
            unlink($path);
        }

        $bundle = _zip_init($path, ZIPARCHIVE::CREATE);

        $bdir = "$title.bundle";
        $bundle->addEmptyDir($bdir);

        // Add tourml document
        $settings = array(
            'return_object' => TRUE,
            'absolute'      => FALSE,
        );
        $tourml         = tap_tourml_render($node, $settings);
        $operations[]   = array('tap_export_bundle_string', array($path, $bdir, $tourml->getTourML()));

        // Add file assets
        foreach($tourml->assets as $asset) {
            if (isset($asset['fid'])) {
                $operations[] = array('tap_export_bundle_asset', array($path, $bdir, $asset['uri']));
            }
        }

        $operations[]   = array('tap_export_bundle_tour_save', array($node, $path));

        $batch = array(
            'title'         => t('TourML Bundle Export'),
            'operations'    => $operations,
            'finished'      => 'tap_export_bundle_finish',
            'file'          => drupal_get_path('module', 'tap') . '/tap.batch.inc',
        );

        batch_set($batch);
    }
}
