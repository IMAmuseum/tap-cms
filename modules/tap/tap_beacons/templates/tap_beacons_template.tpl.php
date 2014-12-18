<div id="tap-beacons-admin">
    <div>
        <form id="add-beacon-form">
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

            <br />

            <input type="submit" value="Submit" class="form-submit" />
        </form>
    </div>

    <?php print render($variables['beacons_data']); ?>

</div>