<?php
/**
 * @file
 * Admin settings for graphviz.
 */

function tap_graphviz_admin_form($form, &$form_state) {
    $form['endpoint'] = array(
        '#title'        => t('TourML Endpoint'),
        '#description'  => t('A url to a TourML endpoint to visualize'),
        '#type'         => 'textfield',
    );

    $form['file'] = array(
        '#title'        => t('TourML File'),
        '#description'  => t('Upload a TourML file to visualize'),
        '#type'         => 'file',
    );

    $form['submit'] = array(
        '#type'     => 'submit',
        '#value'    => t('Visualize'),
    );

    if (isset($form_state['image'])) {
        $form['graphviz'] = array(
            '#title'    => t('Graph'),
            '#markup'   => $form_state['image'],
        );
    }

    return $form;
}

function tap_graphviz_admin_form_submit($form, &$form_state) {
    if (!empty($form_state['values']['endpoint'])) {
        $tourml = file_get_contents($form_state['values']['endpoint']);
    } 
    elseif (file_exists($_FILES['files']['tmp_name']['file'])) {
        $tourml = file_get_contents($_FILES['files']['tmp_name']['file']);
    } 
    else {
        return;
    }

    $form_state['image'] = tap_graphviz_image($tourml, FALSE);
    $form_state['rebuild'] = TRUE;
}

function tap_graphviz_admin_settings_form($form, &$form_state) {

    $form['tap_graphviz_type'] = array(
        '#type'     => 'select',
        '#title'    => t('Default Display Type'),
        '#options'  => array(
            'neato' => t('Neato'),
            'dot'   => t('Dot'),
        ),
        '#default_value'    => variable_get('tap_graphviz_type'),
    );

    $form['tour'] = array(
        '#type'     => 'fieldset',
        '#title'    => t('Tour'),
    );
    $form['tour'] += _tap_graphviz_admin_settings('tour');

    $form['stop'] = array(
        '#type'     => 'fieldset',
        '#title'    => t('Stop'),
    );
    $form['stop'] += _tap_graphviz_admin_settings('stop');

    $form['asset'] = array(
        '#type'     => 'fieldset',
        '#title'    => t('Asset'),
    );
    $form['asset'] += _tap_graphviz_admin_settings('asset');

    return system_settings_form($form);
}

function _tap_graphviz_admin_settings($type) {
    $form[$type . '_shape'] = array(
        '#type'             => 'select',
        '#title'            => t('Shape'),
        '#options'          => _shape_options(),
        '#default_value'    => variable_get($type . '_shape', 'box'),
    );

    $form[$type . '_fillcolor'] = array(
        '#type'             => 'textfield',
        '#title'            => t('Fill Color'),
        '#size'             => 8,
        '#default_value'    => variable_get($type . '_fillcolor', '#FFFFFF'),
    );

    return $form;
}

function _shape_options() {
    return array(
        'box'               => t('Box'),
        'polygon'           => t('Polygon'),
        'ellipse'           => t('Ellipse'),
        'oval'              => t('Oval'),
        'circle'            => t('Circle'),
        'point'             => t('Point'),
        'egg'               => t('Egg'),
        'triangle'          => t('Triangle'),
        'plaintext'         => t('Plain Text'),
        'diamond'           => t('Diamond'),
        'trapezium'         => t('Trapezium'),
        'parallelagram'     => t('Parallelagram'),
        'house'             => t('House'),
        'pentagon'          => t('Pentagon'),
        'hexagon'           => t('Hexagon'),
        'septagon'          => t('Septagon'),
        'octagon'           => t('Octagon'),
        'doublecircle'      => t('Double Circle'),
        'doubleoctagon'     => t('Double Octagon'),
        'tripleoctagon'     => t('Triple Octagon'),
        'invtriangle'       => t('Inverted Triangle'),
        'invtrapezium'      => t('Inverted Trapezuim'),
        'invhouse'          => t('Inverted House'),
        'Mdiamond'          => t('Mdiamond'),
        'Msquare'           => t('Msquare'),
        'Mcircle'           => t('Mcircle'),
        'rectangle'         => t('Rectangle'),
        'square'            => t('Square'),
        'none'              => t('None'),
        'note'              => t('Note'),
        'tab'               => t('Tab'),
        'folder'            => t('Folder'),
        'box3d'             => t('3d Box'),
        'component'         => t('Component'),
    );
}
