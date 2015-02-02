jQuery(function($) {

    // Initialize the date/time picker
    $('.datepicker').datetimepicker({
        maxDate: 0
    });

    // Add funcitonality to clear the fields of the form
    $('.tap-beacons-clear-fields').click(function(e) {
        e.preventDefault();

        // Find the form elements and set them to empty
        $('#tap-beacons-filter-form').find('input[type=text], select').val('');
    });

    // Check start and end dates for submission
    $('#tap-beacons-filter-form').submit(function(e){

        // Get values of inputs
        var start = $('#start-date');
        var end = $('#end-date');
        var startComp = new Date( start.val() );
        var endComp = new Date( end.val() );

        // If end is not empty and equals the start date
        if ((endComp != "") && (+startComp === +endComp)) {

            // Let's change the end date to add a day so the user will get some range of time
            var addDay = end.datepicker('getDate', '+1d');
            addDay.setDate(addDay.getDate()+1);
            end.datepicker('setDate', addDay);
        }

        // If the end date is a time prior to the start date, let them know this is wrong
        if (endComp < startComp) {
            $('.general-errors').addClass('tap-beacons-error-message').show().html('The start date must be prior to the end date.');
            start.addClass('tap-beacons-has-error');
            end.addClass('tap-beacons-has-error');
            return false;
        }
    });
});

/********************
    Charting Scripts
*********************/
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(getCharts);

// Function to call funcitons and creat each chart based on if the elements exist in the markup
function getCharts() {
    if (document.getElementById('tap-beacons-beacon-events') != null) {
        drawPie("beacon-events", "Number of Devices Per Event");
        drawPie("beacon-ranges", "Number of Ranges by Proximity");
        drawPie("beacon-devices", "Number of Devices Per Beacon");
        drawColumnChart("beacon-devices-graph", "Devices Over Time");
    }
    if (document.getElementById('tap-beacons-content-events') != null) {
        drawPie("content-events", "Number of Devices Per Event");
        drawPie("content-devices", "Number of Devices Per Stop");
    }
    if (document.getElementById('tap-beacons-stop-events') != null) {
        drawPie("content-events", "Number of Devices Per Event");
        drawPie("content-devices", "Number of Devices");
    }
}

/**
* Function to draw a pie chart
* These charts use the Google Charts API More informaiton is located here:
*       https://google-developers.appspot.com/chart/interactive/docs/gallery/piechart
**/
function drawPie(type, title) {

    var action = Drupal.settings.basePath + 'beacons/api/charts?type=' + type + '&' + window.location.search.substring(1);

    if (jQuery('input[name="stop"]').length) {
        action = action + '&stop=' + jQuery('input[name="stop"]').val();
    }

    var jsonData = jQuery.ajax({
                url: action,
                dataType:"json",
                async: false
            }).responseText;

    var data = new google.visualization.DataTable(jsonData);

    var options = {
        title: title,
        is3D: true
    };

    var chart = new google.visualization.PieChart(document.getElementById(type + '-pie-chart'));
    chart.draw(data, options);
}

/**
* Function to draw a column chart
* These charts use the Google Charts API More informaiton is located here:
*       https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart
**/
function drawColumnChart(type, title) {

    var action = Drupal.settings.basePath + 'beacons/api/charts?type=' + type + '&' + window.location.search.substring(1);

    if (jQuery('input[name="stop"]').length) {
        action = action + '&stop=' + jQuery('input[name="stop"]').val();
    }

    var jsonData = jQuery.ajax({
                url: action,
                dataType:"json",
                async: false
            }).responseText;

    var data = new google.visualization.DataTable(jsonData);

    var options = {
        title: title,
        legend: { position: 'none' },
        hAxis: {
            title: 'Time',
            gridlines: {
                units: {
                    months: {format: ["MM/dd/yy"]},
                    days: {format: ["MM/dd/yyyy"]}
                }
            },
            minorGridlines: {
                units: {
                    months: {format: ["MM/dd/yy"]},
                    days: {format: ["MM/dd/yyyy"]},
                    hours: {format: ["h:mm a"]},
                    minutes: {format: [":mm"]}
                }
            }
        },
        vAxis: {
            title: 'Number of Devices',
            minValue: 0
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById(type + '-line-chart'));
    chart.draw(data, options);
}