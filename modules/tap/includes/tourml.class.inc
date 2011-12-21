<?php

class TourML {
    public $assets      = array();
    public $stops       = array();
    public $connections = array();
    public $nid         = null;

    public function __construct($nid)
    {
        $this->nid = $nid;
    }
    
    public function getTourML()
    {
        $stopNodes = $this->loadStopNodes();
        
        $this->processStops($stopNodes);
        
        // Stops have been rendered, now render assets
        $this->processAssets();

        return theme('tap_tourml_tour', array('tour' => $this));
    }
    
    protected function loadStopNodes()
    {
        $stopNodes = array();
        $node = node_load($this->nid);
        
        if ($node->type === 'tour')
        {
            // Find all referenced nodes to this tour
            $results = db_select('field_data_field_tour_reference', 'ref')
                ->fields('ref', array('entity_id'))
                ->condition('field_tour_reference_nid', $node->nid)
                ->execute()
                ->fetchAll();
            
            $nids = array();
            // Build an array of stop nodes
            foreach($results as $result) 
            {
                $nids[] = $result->entity_id;
            }
            
            $stopNodes = node_load_multiple($nids);
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
        foreach($this->assets as $k => $asset) {
            $this->assets[$k] = theme('tap_tourml_asset', array('asset' => $asset));
        }
    }

    protected function processStop(&$node) {
        node_build_content($node, 'tourml_xml');
        $stop          = array();
        $stop['id']    = $node->nid;
        $properties    = array();
        $hasTitleField = false;
        
        // Loop thru renderable fields
        foreach(element_children($node->content) as $field_name) {
            $field =& $node->content[$field_name];

            if (isset($field['#formatter']) && strpos($field['#formatter'], 'tap_tourml') !== false)
            {
                // Key an ID for the property.  This data is not
                // available deep into the theme layer and we might
                // need it later
                foreach($field['#items'] as $k => $item) {
                    $field['#items'][$k]['id'] = _anti_field($field['#field_name']);
                }

                // Determine how a field should be rendered
                switch($field['#formatter'])
                {
                    case 'tap_tourml_property':
                        // Build an array of rendered properties that can be added to a propertySet later
                        $properties[] = drupal_render($field);
                        break;
                    case 'tap_tourml_asset':
                        // Build an array of assets that will be rendered after all stops
                        foreach($field['#items'] as $item) {
                            if (!isset($this->assets[$item['fid']])) {
                                $this->assets[$item['fid']] = $item;
                            }
                            $stop['items'][] = drupal_render($field);
                        }
                        break;
                    case 'tap_tourml_connection':
                        $ConnectionPriority = 0;
                        foreach($field['#items'] as $k => $v)
                        {
                            $field['#items'][$k]['priority'] = ++$ConnectionPriority;
                            $field['#items'][$k]['srcId'] = $node->nid;
                        }
                        $this->connections[] = drupal_render($field);
                        break;
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
        if (count($properties))
        {
            $stop['items'][] = theme('tap_tourml_property_set', array('properties' => $properties));
        }
        
        //Render the stop
        $this->stops[] = theme('tap_tourml_stop', $stop);
    }
}
