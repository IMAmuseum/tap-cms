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
            $('.general-errors').addClass('tap-beacons-error-message').show().html('The start date must be before the end date.');
            start.addClass('tap-beacons-has-error');
            end.addClass('tap-beacons-has-error');
            return false;
        }
    });

    if ($('#tap-beacons-beacon-events').length > 0) {
        drawPie("donut", "beacon_events", "Devices Per Event");
        drawPie("donut", "beacon_ranges", "Ranges by Proximity");
        drawPie("donut", "beacon_devices", "Devices Per Beacon");
        drawColumnChart("beacon_devices_graph", "Devices Over Time");
    }

    if ($('#tap-beacons-content-events').length > 0) {
        drawPie("donut", "content_events", "Devices Per Event");
        drawPie("donut", "content_devices", "Devices Per Stop");
    }

    if ($('#tap-beacons-stop-events').length > 0) {
        drawPie("donut", "content_events", "Devices Per Event");
        drawPie("donut", "content_devices", "Devices");
    }

});

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");

    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");

        if(pair[0] == variable){
            return pair[1];
        }
    }
    return(false);
}

/********************
    Charting Scripts
*********************/

/**
* Function to draw a pie chart
**/
function drawPie(chart, type, title) {

    var action = Drupal.settings.basePath + 'beacons/api/charts?type=' + type + '&' + window.location.search.substring(1);

    if (jQuery('input[name="stop"]').length) {
        action = action + '&stop=' + jQuery('input[name="stop"]').val();
    }

    var json;

    jQuery.ajax({
        url: action,
        dataType:"json",
        async: false,
        success : function(data) {
            window.json = data;
        }
    });

    var chart = c3.generate({
        bindto: '#' + type + "_pie_chart",
        data: {
            columns: window.json,
            type : chart
        },
        legend: {
            position: 'right'
        },
        donut: {
            title: title
        }
    });
}

/**
* Function to draw a column chart
**/
function drawColumnChart(type, title) {

    var action = Drupal.settings.basePath + 'beacons/api/charts?type=' + type + '&' + window.location.search.substring(1);

    if (jQuery('input[name="stop"]').length) {
        action = action + '&stop=' + jQuery('input[name="stop"]').val();
    }

    var json, date;

    jQuery.ajax({
        url: action,
        dataType:"json",
        async: false,
        success : function(data) {
            window.json = data;
        }
    });

    if(window.json[0][1].length > 10) {
        date = '%Y-%m-%d %H:%M';
    } else {
        date = '%Y-%m-%d';
    }

    var chart = c3.generate({
        bindto: '#' + type + "_bar_chart",
        data: {
            x: 'Date/Time',
            xFormat: date,
            columns: window.json,
            type: 'bar'
        },
        legend: {
            hide: true
        },
        bar: {
            width: {
                ratio: 0.3
            }
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: date
                }
            }
        }
    });
}



