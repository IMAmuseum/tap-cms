<?php

define('TOURML_NS', 'http://www.imamuseum.org/TourML/1.0');

function tap_tourml_view($type, $object, $name = NULL) {
  $tourML = new DOMDocument();

  switch($object->type) {
    case 'tour':
      $tour = $tourML->createElementNS(TOURML_NS, 'Tour');
      $tour->setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
      $tour->setAttribute('xsi:schemaLocation', TOURML_NS);
      $tour->appendChild($tourML->createElement('Title',$object->title));
      $tour->appendChild($tourML->createElement('Description', $object->body['und'][0]['value']));
      $tourML->appendChild($tour);
      tap_get_stops($tourML, $object->nid);
      break;
    case 'tour_image_stop':
    case 'tour_video_stop':
    case 'tour_audio_stop':
      tap_get_stop_tourml($tourML, $object);
      break;
  }

  $tourML->formatOutput = true;
  $output = check_plain($tourML->saveXML());
  return $output;
}

function tap_get_stops($tourML, $nid) {
  $result = db_query('SELECT r.entity_id FROM {field_data_field_tour_reference} r WHERE r.entity_id = :nid', array(':nid' => $nid));
  foreach ($result as $node) {
    tap_get_stop_tourml($tourML, node_load($node));    
  }
}

function tap_get_stop_tourml($tourML, $object) {
  switch($object->type) {
    case 'tour_image_stop':
      $image = $tourML->createElement('ImageStop');
      $image->setAttribute('id', $object->nid);
      $image->setAttribute('code', $object->field_code['und'][0]['value']);
      $image->appendChild($tourML->createElement('Title',$object->title));
      $image->appendChild($tourML->createElement('Description', $object->body['und'][0]['value']));
      $image->appendChild($tourML->createElement('Source', $object->field_tour_image['und'][0]['uri']));
      $tourML->appendChild($image);
      break;
    case 'tour_video_stop':
      $video = $tourML->createElement('VideoStop');
      $video->setAttribute('id', $object->nid);
      $video->setAttribute('code', $object->field_code['und'][0]['value']);
      $video->appendChild($tourML->createElement('Title',$object->title));
      $video->appendChild($tourML->createElement('Description', $object->body['und'][0]['value']));
      $video->appendChild($tourML->createElement('Source', $object->field_tour_video['und'][0]['uri']));
      $tourML->appendChild($video);
      break;
    case 'tour_audio_stop':
      $audio = $tourML->createElement('AudioStop');
      $audio->setAttribute('id', $object->nid);
      $audio->setAttribute('code', $object->field_code['und'][0]['value']);
      $audio->appendChild($tourML->createElement('Title',$object->title));
      $audio->appendChild($tourML->createElement('Description', $object->body['und'][0]['value']));
      $audio->appendChild($tourML->createElement('Source', $object->field_tour_audio['und'][0]['uri']));
      $tourML->appendChild($audio);
      break;
  }
}


function tap_tourml_export($type, $object, $name = NULL) {
  header('Content-type: text/xml');
  $tourML = new DOMDocument();
  $tour = $tourML->createElementNS(TOURML_NS, 'Tour');
  $tour->setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
  $tour->setAttribute('xsi:schemaLocation', TOURML_NS);
  $tour->appendChild($tourML->createElement('Title',$object->title));
  $tour->appendChild($tourML->createElement('Description', $object->body['und'][0]['value']));
  $tourML->appendChild($tour);
  $tourML->formatOutput = true;
  print $tourML->saveXML();
  exit();
}


