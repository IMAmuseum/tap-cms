<div class="tap-beacons-admin">
    <div>
        <form action="/?q=admin/tap/beacons/add" method="post" id="tap-beacons-add-beacon-form" class="tap-beacons-add-beacon-form">
            <label>
                UUID<br />
                <input type="text" value="" name="uuid" id="beacon-uuid" class="form-text" size="60" />
            </label>

            <label>
                Major Number<br />
                <input type="text" value="" name="major_num" id="beacon-major" class="form-text" size="60" />
            </label>

            <label>
                Minor Number<br />
                <input type="text" value="" name="minor_num" id="beacon-minor" class="form-text" size="60" />
            </label>

            <input type="submit" value="Add Beacon" class="form-submit tap-beacons-add-submit" />
        </form>
    </div>

    <?php print render($variables['beacons_data']); ?>

</div>