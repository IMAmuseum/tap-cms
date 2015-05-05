<div class="tap-beacons-admin" id="tap-beacons-content-events">
    <form action="<?php print url("admin/tap/beacons/events/content") ?>" method="get" id="tap-beacons-filter-form" class="tap-beacons-add-beacon-form">
        <fieldset class="tap-beacons-fieldset">
            <legend>Filter Results</legend>

            <div class="errors general-errors"></div>

            <div class="tap-beacons-form-item">
                <label for="tap-beacons-select">
                    Select a Stop
                </label>
                <select name="stop" id="beacon-select" class="form-select">
                    <option value="">All Stops</option>
                    <?php
                        foreach ($stop_data as $row) {
                            if(isset($_GET['stop']) && ($_GET['stop'] == $row->stop_nid)){
                                echo '<option value="' . $row->stop_nid . '" selected="selected">' . $row->title . '</option>';
                            } else {
                                echo '<option value="' . $row->stop_nid . '">' . $row->title . '</option>';
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

            <div class="tap-beacons-form-item">
                <a href="#clear" class="tap-beacons-clear-fields">Clear Fields</a>
            </div>
        </fieldset>
    </form>

    <div id="content_events_pie_chart" class="tap-beacons-charts tap-beacons-col-2"></div>
    <div id="content_devices_pie_chart" class="tap-beacons-charts tap-beacons-col-2"></div>

    <?php
        print render($content_table);
    ?>

</div>
