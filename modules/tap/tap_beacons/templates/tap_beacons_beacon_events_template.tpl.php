<div class="tap-beacons-admin" id="tap-beacons-beacon-events">
    <div>
        <form action="<?php print url("admin/tap/beacons/events/beacon") ?>" method="get" id="tap-beacons-select-form" class="tap-beacons-add-beacon-form">
            <label>
                Choose a beacon to reduce the results.<br />
                <select name="beacon" id="beacon-select" class="form-select">
                    <option value="">All Beacons</option>
                    <?php
                        foreach ($variables['beacons_data'] as $row) {
                            if(isset($_GET['beacon']) && ($_GET['beacon'] == $row->beacon_id)){
                                echo '<option value="' . $row->beacon_id . '" selected="selected">' . $row->name . '</option>';
                            } else {
                                echo '<option value="' . $row->beacon_id . '">' . $row->name . '</option>';
                            }
                        }
                    ?>
                </select>
            </label>
        </form>

        <?php
            foreach ($variables['beacons_data'] as $row) {
                if(isset($_GET['beacon']) && ($_GET['beacon'] == $row->beacon_id)){
                    $output = '<p><strong>UUID:</strong> ' . $row->uuid . '<br />';
                    $output .= '<strong>Major Number:</strong> ' . $row->major_num . '<br />';
                    $output .= '<strong>Minor Number:</strong> ' . $row->minor_num . '<br />';
                    $output .= '<strong>Content associated to this beacon:</strong> ';

                    $stops = tap_beacons_get_stops_as_links($row->beacon_id);

                    $output .= implode(', ', $stops);

                    $output .= '</p>';
                    print $output;
                }
            }
        ?>

        <div id="beacon-events-pie-chart" class="tap-beacons-charts tap-beacons-col-3"></div>
        <div id="beacon-devices-pie-chart" class="tap-beacons-charts tap-beacons-col-3"></div>
        <div id="beacon-ranges-pie-chart" class="tap-beacons-charts tap-beacons-col-3"></div>
    </div>

    <?php
        $event = tap_beacons_analytics_beacon_events();
        print render($event);
    ?>

</div>
