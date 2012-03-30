<?php

class TourML {
    public $assets              = array();
    public $multipart_assets    = array();
    public $stops               = array();
    public $connections         = array();
    public $nid                 = null;
    public $tour                = null;
    public $tourml              = null;
    public $settings            = array();

    public function __construct($nid, $settings)
    {
        $this->nid      = $nid;
        $this->settings = $settings;
        $this->settings += array(
            'absolute'  => TRUE,
            'base_path' => '',
        );
    }
    
    public function getTourML()
    {
        $stopNodes = $this->loadStopNodes();
        
        $this->processStops($stopNodes);
        
        // Stops have been rendered, now render assets
        $this->processAssets();

        $this->tourml = theme('tap_tourml_tour', array('tour' => $this));
        return $this->tourml;
    }
    
    protected function loadStopNodes()
    {
        $stopNodes = array();
        $node = node_load($this->nid);
        
        if ($node->type === 'tour')
        {
            // Find all referenced nodes to this tour
            $results = db_select('field_data_field_tour', 'ref')
                ->fields('ref', array('entity_id'))
                ->condition('entity_type', 'node')
                ->condition('field_tour_target_id', $node->nid)
                ->execute()
                ->fetchAll();
            
            $nids = array();
            // Build an array of stop nodes
            foreach($results as $result) 
            {
                $nids[] = $result->entity_id;
            }
            
            $this->tour = $this->processMetadata($node);
            $stopNodes  = node_load_multiple($nids);
        } else {
            $stopNodes = array($node);
        }
        
        return $stopNodes;
    }
    
    protected function processStops(&$nodes) {
        foreach($nodes as $node) {
            $this->processStop($node);
        }
    }
    
    protected function processAssets()
    {
        global $language;

        foreach($this->assets as $k => $asset) {
            $asset = module_invoke_all('tourml_asset', $asset);
            $this->assets[$k]['rendered'] = theme('tap_tourml_asset', array(
	           'asset' => $asset, 
	           'language' => $language->language, 
	           'absolute' => $this->settings['absolute'], 
	           'base_path' => $this->settings['base_path']
			));
        }

        foreach($this->multipart_assets as $k => $asset) {
            $asset = module_invoke_all('tourml_multipart_asset', $asset);
            $this->multipart_assets[$k]['rendered'] = theme('tap_tourml_multipart_asset', array(
                'asset_id' => $k,
                'asset' => $asset, 
                'language' => $language->language, 
                'absolute' => $this->settings['absolute'], 
                'base_path' => $this->settings['base_path']
            ));
        }
    }

    protected function processStop(&$node) {
        if (!isset($this->stops[$node->nid])) {
	        $stop = $this->processMetadata($node);
            //Render the stop
            $this->stops[$node->nid] = theme('tap_tourml_stop', $stop); 
        }
    }

    protected function processMetadata($node) {
        node_build_content($node, 'tourml_xml');
        $stop               = array();
        $stop['real_id']    = $node->nid;
        $stop['items']      = array();
        $stop['view']		= $node->type;
        $properties         = array();
        $hasTitleField      = false;

        // Loop thru renderable fields
        foreach(element_children($node->content) as $field_name) {

            $field =& $node->content[$field_name];
            if (isset($field['#formatter']) && strpos($field['#formatter'], 'tap_tourml') !== false)
            {
                // Key an ID for the property.  This data is not
                // available deep into the theme layer and we might
                // need it later
                foreach($field['#items'] as $k => $item) {
                    $field['#items'][$k]['name'] = _anti_field($field['#field_name']);
                }

                // Determine how a field should be rendered
                switch($field['#formatter'])
                {
                    case 'tap_tourml_property':
                        // Build an array of rendered properties that can be added to a propertySet later
                        if (!empty($field['#items'])) {
                            module_invoke_all('tourml_property', $field);
                            $properties[] = drupal_render($field);
                        }
                        break;
                    case 'tap_tourml_multipart_asset':
                        $prefix = $field['#bundle'] . '-' . $field['#field_name'] . '-' . $field['#object']->nid;
                        // special handling for field collection module field
                        if($field['#field_type'] == 'field_collection') {
                            foreach($field['#items'] as &$collection) {
                                $id = $prefix . $collection['value'];
                                // retrieve the field collection entity
                                $entity = field_collection_item_load($collection['value']);
                                // retrieve the field instances for this field collection
                                $instances = field_info_instances('field_collection_item', $field['#field_name']);
                                // iterate over all the fields attached to the entity
                                foreach($instances as $field_name => $settings) {
                                    foreach($entity->{$field_name}['und'] as $key => $item) {
                                        // set reference id
                                        $collection['id'] = $id;
                                        $uid = (isset($item['fid'])) ? $item['fid'] : $key;
                                        // unique key for field in set
                                        $part_id = $prefix . $field_name . '-' . $uid;
                                        $item['name'] = $field_name;
                                        $item['properties'] = module_invoke_all('tourml_asset_properties', $item);
                                        $this->multipart_assets[$id][$part_id] = $item;
                                    }
                                }
                            }
                        } else {
                            $id = $prefix . $node->nid;                            
                            // Build an array of assets that will be rendered after all stops
                            foreach($field['#items'] as $key => &$item) {
                                $part_id = (isset($item['fid'])) ? $item['fid'] : $key;
                                $part_id = $prefix . $part_id;

                                $item['id'] = $id;
                                $item['properties'] = module_invoke_all('tourml_asset_properties', $item);
                                $this->multipart_assets[$id][$part_id] = $item;
                            }
                        }
                        $stop['items'][] = drupal_render($field);
                        break;
                    case 'tap_tourml_asset':
                        if (empty($field['#items'])) break;
                        $prefix = $field['#bundle'] . '-' . $field['#field_name'] . '-' . $field['#object']->nid;

                        // Build an array of assets that will be rendered after all stops
                        foreach($field['#items'] as $key => &$item) {
                            $item['id'] = (isset($item['fid'])) ? $item['fid'] : $key;
                            $item['id'] = $prefix . $item['id'];

                            // If this asset doesnt exist in our main object we need to process it
                            if (!isset($this->assets[$item['id']])) {
                                $item['properties'] = module_invoke_all('tourml_asset_properties', $item);
                                $this->assets[$item['id']] = $item;
                            }
                        }
                        $stop['items'][] = drupal_render($field);
                        break;
                    case 'tap_tourml_connection':
                        $ConnectionPriority = 0;
                        foreach($field['#items'] as $k => $v)
                        {
                            // add referenced node to tourml
                            $target_node = node_load($v['target_id']);
                            $this->processStop($target_node);

                            $field['#items'][$k]['priority'] = ++$ConnectionPriority;
                            $field['#items'][$k]['srcId'] = $node->nid;
                        }
                        $this->connections[] = drupal_render($field);
                        break;
                    case 'tap_tourml_root_stop':
                    case 'tap_tourml_description':
                        $stop['items'][] = drupal_render($field);
                        break;
                    case 'tap_tourml_title':
                        $hasTitleField = true;
                        array_unshift($stop['items'], drupal_render($field));
                        break;
                }
            }
        }
        
        //If no title field specified by TourML display, use the node title
        if (!$hasTitleField)
        {
            array_unshift($stop['items'], theme('tap_tourml_title_text', array('items' => array(array('value' => $node->title))))); //TODO: needs discussion
        }

        // Render properties for a stop
        if (!empty($properties))
        {
            $stop['items'][] = theme('tap_tourml_property_set', array('properties' => $properties));
        }

        return $stop;
    }

    public function validate() {
        if (empty($this->tourml)) {
            $this->getTourML();
        }        
        //TODO: trying out validation, this needs some work and probably moved into the TourML class
        if ($doc->schemaValidate("https://raw.github.com/IMAmuseum/tourml/master/TourML.xsd"))
        {
            drupal_set_message("TourML is valid", 'status');
        } else {
            drupal_set_message("TourML does not validate", 'warning');
        }
    }
}
