<div class="tap-beacons-admin">
    <form action="<?php print url("admin/tap/beacons/add"); ?>" method="post" id="tap-beacons-add-beacon-form" class="tap-beacons-add-beacon-form">
        <fieldset class="tap-beacons-fieldset">
            <legend><a href="#addbeacon" id="tap-beacons-add-beacon-btn">Add a Beacon</a></legend>

            <div id="tap-beacons-add-beacon-fields" class="tap-beacons-hidden">
                <div class="general-errors"></div>

                <p>All fields are required.</p>

                <label>
                    Name<br />
                    <input type="text" name="name" id="beacon-name" class="form-text" size="60" data-required="true" />
                    <span class="tap-beacons-error-message"></span>
                </label>

                <label>
                    UUID<br />
                    <input type="text" name="uuid" id="beacon-uuid" class="form-text" size="60" data-required="true" />
                    <span class="tap-beacons-error-message"></span>
                </label>

                <label>
                    Major Number<br />
                    <input type="text" name="major_num" id="beacon-major" class="form-text" size="60" data-required="true" />
                    <span class="tap-beacons-error-message"></span>
                </label>

                <label>
                    Minor Number<br />
                    <input type="text" name="minor_num" id="beacon-minor" class="form-text" size="60" data-required="true" />
                    <span class="tap-beacons-error-message"></span>
                </label>

                <input type="submit" value="Add Beacon" class="form-submit tap-beacons-add-submit" />
            </div>
        </fieldset>
    </form>

    <?php print render($variables['beacons_table']); ?>

</div>
