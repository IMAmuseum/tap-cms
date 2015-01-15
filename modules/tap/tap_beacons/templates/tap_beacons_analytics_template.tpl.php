<div class="tap-beacons-admin">
    <div>
        <form action="/admin/tap/beacons/analytics/" method="get" id="tap-beacons-select-form" class="tap-beacons-add-beacon-form">
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
                    $output = '<p><strong>UUID</strong>: ' . $row->uuid . '<br />';
                    $output .= '<strong>Major Number</strong>: ' . $row->major_num . '<br />';
                    $output .= '<strong>Minor Number</strong>: ' . $row->minor_num . '</p>';

                    print $output;
                }
            }
        ?>

        <div id="events_pie_chart" class="tap-beacons-charts"></div>
        <div id="devices_pie_chart" class="tap-beacons-charts"></div>
        <div id="ranges_pie_chart" class="tap-beacons-charts"></div>
    </div>

    <?php print render($variables['beacon_events_table']); ?>

</div>
