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

    drawPie("events");
    drawPie("ranges");
    drawPie("devices");

}

function drawPie(types) {
    var action = '/beacons/api/charts?type=' + types + '&' + window.location.search.substring(1);

    var jsonData = jQuery.ajax({
              url: action,
              dataType:"json",
              async: false
              }).responseText;

    var data = new google.visualization.DataTable(jsonData);

    var options = {
        title: types.toUpperCase(),
        is3D: true
    };

    var chart = new google.visualization.PieChart(document.getElementById(types + '_pie_chart'));

    chart.draw(data, options);
}