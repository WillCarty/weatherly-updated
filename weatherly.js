

function darksky_Complete(result) {
    console.log("Latitude " + result.latitude);
    console.log("Longitude " + result.longitude);
    console.log("Current Temperature " + result.currently.temperature);
    console.log("Current Weather " + result.currently.summary);
    var hour1 = (result.hourly.data[0]);
    var time = new Date(result.currently.time * 1000);
    console.log("Current time " + time);




    $(function () {
        var request = {
            url: "https://api.darksky.net/forecast/f77b16737234e09531e914bc27eba71d/37.8267,-122.4233",
            dataType: "jsonp",
            success: darksky_Complete
        }
        

    });
    $.ajax(request);
};

function geocode_Complete(results){
    console.log(results.location.lat);
    
}
$(function(){
var location={
            url:"https://maps.googleapis.com/maps/api/geocode/json?address=41465 &key=AIzaSyBZfkXozgEve7U6AezGLYljEVMRR-EFUuo",
            dataType:"jsonp",
            geocode_Complete

        }




});
