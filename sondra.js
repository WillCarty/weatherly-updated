function retrieveWeather(lat,long) {
    var darkSkyApi = 'https://api.darksky.net/forecast/833fa8991b5ee77acbfdf88f7d770ee7/ ' + lat + ', ' + long ;
    var condition = {
        url:
        darkSkyApi,
        dataType: 'jsonp',
        success: retrieve_Complete
    };

$.ajax(condition);

}

function retrieve_Complete(result) {
    console.log("It's " + result.currently.time + '.');

    var humanTime = new Date(result.currently.time * 1000);
    console.log(humanTime)
}

function getLatLong_Complete(result) {
    var lat = result.results["0"].geometry.location.lat;
    var long = result.results["0"].geometry.location.lng;
    console.log('Latitude and Longitude are ' + lat + ", " + long + ".");
}

function getLatLong(city,state,zipcode) {
    var address = "";
    if (zipcode.length !=0) {
        address = zipcode.trim();
    }
    else if ( city.length !=0 && state !=0) {
        address = city.trim() + ", " + state;
    }
    else {
        return;
    }




var googleApi = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&keyAIzaSyAJ26HH37c3QHc0Ede-f-ZXA_C1HvL981E";
var getInfo = {
    url: googleApi,
    success: getLatLong_Complete
};

$.ajax(getInfo);
}



function getZip_Click() {
    var zipcode = $("#lookup").val();
    console.log('This is your area zipcode ' + zipcode + '.');
    getLatLong('','',zipcode);
}
  
   



$(function() {
    $("#add").on("click", getZip_Click)
    
});