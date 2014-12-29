jQuery(function($) {

    // Add data to DB
    $('#tap-beacons-add-beacon-form').submit(function(e){
        e.preventDefault();

        // Add validation to form.
        $(".tap-beacons-error-message").html("");
        $(".has-error").removeClass("has-error");
        var hasError = false;

        // Check if required fields are filled in
        $('input[data-required=true]').each(function(){

            $this = $(this);

            if( !$this.val() ){
                $this.siblings(".tap-beacons-error-message").html('Please fill out this field.');
                $this.addClass("has-error");
                hasError = true;
            }
        });

        // Return false if any errors exist
        if(hasError == true) {
            $('.has-error').first().focus();
            return false;
        }

        // Get data and set up acton url
        var formData = $(this).serialize();
        var action = $(this).attr("action") + "&" + formData;

        // Send to ajax function
        submitData(action);
    });

    // Delete data from DB
    $('.tap-beacons-delete-btn').click(function(e){
        e.preventDefault();

        // Get href to set as ajax action
        var action = $(this).attr('href');

        // Ask user to confirm their decision to delete the item.
        var choice = confirm("Are you sure you want to delete this item? This action cannot be undone.");

        // If confirmed, send ajax request.
        if (choice) {
            submitData(action);
        }
    });

    // Update data to DB
    $('.tap-beacons-update-btn').click(function(e){
        e.preventDefault();

        // Hit cancel on any items that may be open, so only one item can be edited at a time
        $('.tap-beacons-cancel-btn').click();

        // Get action of item
        var action = $(this).attr('href');

        // Store TR parent
        var tr = $(this).parent().parent().parent();

        // Store each cell element
        var cell_uuid   = tr.children('td:nth-child(1)').find('.uuid'),
            cell_major  = tr.children('td:nth-child(2)'),
            cell_minor  = tr.children('td:nth-child(3)'),
            cell_save   = tr.children('td:nth-child(4)');

        // Store initial value of cells
        var current_uuid = cell_uuid.html(),
            current_major = cell_major.html(),
            current_minor = cell_minor.html();

        // Convert values into inputs so user can make changes
        cell_uuid.html( '<input type="text" id="uuid" value="'  + current_uuid  + '" class="form-text tap-beacons-table-input"/>');
        cell_major.html('<input type="text" id="major" value="' + current_major + '" class="form-text tap-beacons-table-input"/>');
        cell_minor.html('<input type="text" id="minor" value="' + current_minor + '" class="form-text tap-beacons-table-input"/>');

        // Add new operations for save and cancel
        cell_save.append('<div class="tap-beacons-operations-save">' +
            '<input type="submit" value="Save" class="form-submit tap-beacons-update-submit" /> | ' +
            '<a href="#cancel" class="tap-beacons-cancel-btn">cancel</a></div>');

        // Hide initial operations
        tr.find('.tap-beacons-operations').hide();

        // Set save button actions
        cell_save.find('.tap-beacons-update-submit').bind('click', function(){

            // Get new values of inputs
            var uuid = $('#uuid').val(),
                major = $('#major').val(),
                minor = $('#minor').val();

            // TODO: Add validation to edit data.

            // Setup url to process new data
            action = action +
                "&uuid=" + uuid +
                "&major_num=" + major +
                "&minor_num=" + minor;

            // Send to ajax function
            submitData(action);
        });

        // Set cancel link actions
        cell_save.find('.tap-beacons-cancel-btn').bind('click', function(e){
            e.preventDefault();

            //Restore initial values
            cell_uuid.html(current_uuid);
            cell_major.html(current_major);
            cell_minor.html(current_minor);

            // Show initial operations
            $('.tap-beacons-operations').show();

            // Remove unneeded save and cancel
            $('.tap-beacons-operations-save').remove();
        });
    });

    // Function to submit ajax data
    function submitData(action) {
        $.ajax({
            url: action,
            type: "GET",
            success: function(data){
                location.reload();
            },
            error: function(data){
            }
        });
    }
});