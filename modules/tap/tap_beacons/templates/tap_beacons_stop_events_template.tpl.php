<div class="tap-beacons-admin" id="tap-beacons-stop-events">
    <form action="<?php print url("node/" . $node->nid . "/events") ?>" method="get" id="tap-beacons-select-form" class="tap-beacons-add-beacon-form">
        <fieldset class="tap-beacons-fieldset tap-beacons-fieldset-stops">
            <legend>Filter Results</legend>

            <input type="hidden" name="stop" id="tap-beacon-stop-input" value="<?php print $node->nid ?>" />

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

    <div id="content-events-pie-chart" class="tap-beacons-charts tap-beacons-col-2"></div>
    <div id="content-devices-pie-chart" class="tap-beacons-charts tap-beacons-col-2"></div>

    <?php
        print render($stop_table);
    ?>

</div>
