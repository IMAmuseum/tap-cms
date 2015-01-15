<div class="tap-beacons-admin">
    <div>
        <form action="<?php print url("admin/tap/beacons/tokens"); ?>" method="post" id="tap-beacons-add-token-form" class="tap-beacons-add-beacon-form">
            <div class="general-errors"></div>
            <input type="hidden" name="token_id" value="<?php (isset($variables['token_data'])) ? print '1' : print render($variables['token_data']['id']); ?>" />
            <label>
                Add a token for applications to send data to API end points.<br />
                <input type="text" value="<?php print render($variables['token_data']['token']); ?>" name="token" id="beacon-token" class="form-text" size="60" data-required="true" />
                <span class="tap-beacons-error-message"></span>
            </label>

            <input type="submit" value="Add Token" class="form-submit tap-beacons-add-submit" />
        </form>
    </div>

    <div>
        <form action="<?php print url("admin/tap/beacons/add"); ?>" method="post" id="tap-beacons-add-beacon-form" class="tap-beacons-add-beacon-form">
            <div class="general-errors"></div>
            <p>All fields are required to add a new beacon.</p>
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
        </form>
    </div>

    <?php print render($variables['beacons_table']); ?>

</div>
