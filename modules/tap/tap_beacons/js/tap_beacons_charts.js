jQuery(function($) {
    $('.datepicker').datetimepicker({
        maxDate: 0
    });

    $('.tap-beacons-clear-fields').click(function(e){
        e.preventDefault();

        $('#tap-beacons-filter-form').find('input[type=text], select').val('');
    });
});

/********************
    Charting Scripts
*********************/
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(getCharts);

function getCharts() {
    if (document.getElementById('tap-beacons-beacon-events') != null){
        drawPie("beacon-events", "Number of Devices Per Event");
        drawPie("beacon-ranges", "Number of Ranges by Proximity");
        drawPie("beacon-devices", "Number of Devices Per Beacon");
        drawColumnChart("beacon-devices-graph", "Devices Over Time");
    }
    if (document.getElementById('tap-beacons-content-events') != null){
        drawPie("content-events", "Number of Devices Per Event");
        drawPie("content-devices", "Number of Devices Per Stop");
    }
    if (document.getElementById('tap-beacons-stop-events') != null){
        drawPie("content-events", "Number of Devices Per Event");
        drawPie("content-devices", "Number of Devices");
    }
}

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