<div class="tap-beacons-admin" id="tap-beacons-beacon-events">
    <form action="<?php print url("admin/tap/beacons/events/beacon") ?>" method="get" id="tap-beacons-select-form" class="tap-beacons-add-beacon-form">
        <fieldset class="tap-beacons-fieldset">
            <legend>Filter Results</legend>

            <div class="tap-beacons-form-item">
                <label for="tap-beacons-select">
                    Select a Beacon
                </label>
                <select name="beacon" id="tap-beacons-select" class="form-select">
                    <option value="">All Beacons</option>
                    <?php
                        foreach ($beacons_data as $row) {
                            if(isset($_GET['beacon']) && ($_GET['beacon'] == $row->beacon_id)){
                                echo '<option value="' . $row->beacon_id . '" selected="selected">' . $row->name . '</option>';
                            } else {
                                echo '<option value="' . $row->beacon_id . '">' . $row->name . '</option>';
                            }
                        }
                    ?>
                </select>
            </div>

            <div class="tap-beacons-form-item">
                <label for="start-date">Start Date</label>
                <input type="text" class="datepicker form-text" id="start-date" name="startdate" value="<?php if(isset($_GET['startdate'])) print $_GET['startdate']; ?>" />
            </div>

            <div class="tap-beacons-form-item">
                <label for="end-date">End Date</label>
                <input type="text" class="datepicker form-text" id="end-date" name="enddate" value="<?php if(isset($_GET['enddate'])) print $_GET['enddate']; ?>" />
            </div>

            <div class="tap-beacons-form-item">
                <input type="submit" value="Update" class="form-submit" />
            </div>
        </fieldset>
    </form>

    <?php
        foreach ($beacons_data as $row) {
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

    <?php
        print render($beacon_table);
    ?>

</div>
