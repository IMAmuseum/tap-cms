jQuery(function($) {
    $('#tap-beacons-select-form select').change(function(){
        $('#tap-beacons-select-form').submit();
    });
});

/********************
    Charting Scripts
*********************/
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(getChart);

function getChart() {

    drawPie("events", "Events");
    drawPie("ranges", "Ranges");
    drawPie("devices", "Devices Per Beacon");

}

function drawPie(types, title) {
    var action = Drupal.settings.basePath + 'beacons/api/charts?type=' + types + '&' + window.location.search.substring(1);

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

    var chart = new google.visualization.PieChart(document.getElementById(types + '_pie_chart'));

    chart.draw(data, options);
}