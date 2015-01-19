jQuery(function($) {
    $('.datepicker').datepicker({ maxDate: (0) });
});

/********************
    Charting Scripts
*********************/
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(getCharts);

function getCharts() {
    if (document.getElementById('tap-beacons-beacon-events') != null){
        drawPie("beacon-events", "Events");
        drawPie("beacon-ranges", "Ranges");
        drawPie("beacon-devices", "Devices Per Beacon");
    }
    if (document.getElementById('tap-beacons-content-events') != null){
        drawPie("content-events", "Events");
        drawPie("content-devices", "Devices Per Stop");
    }
}

function drawPie(type, title) {
    var action = Drupal.settings.basePath + 'beacons/api/charts?type=' + type + '&' + window.location.search.substring(1);

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