<div class="tap-beacons-admin" id="tap-beacons-content-events">
    <div>
        <form action="<?php print url("admin/tap/beacons/events/content") ?>" method="get" id="tap-beacons-select-form" class="tap-beacons-add-beacon-form">
            <label>
                Choose a Stop to reduce the results.<br />
                <select name="stop" id="beacon-select" class="form-select">
                    <option value="">All Stops</option>
                    <?php
                        foreach ($variables['stop_data'] as $row) {
                            if(isset($_GET['stop']) && ($_GET['stop'] == $row->stop_nid)){
                                echo '<option value="' . $row->stop_nid . '" selected="selected">' . $row->title . '</option>';
                            } else {
                                echo '<option value="' . $row->stop_nid . '">' . $row->title . '</option>';
                            }
                        }
                    ?>
                </select>
            </label>
        </form>

        <div id="content-events-pie-chart" class="tap-beacons-charts tap-beacons-col-2"></div>
        <div id="content-devices-pie-chart" class="tap-beacons-charts tap-beacons-col-2"></div>
    </div>

    <?php
        $event = tap_beacons_analytics_content_events();
        print render($event);
    ?>

</div>
