


function addressLookup_Complete(result) {
    var lat = result.results[0].geometry.location.lat;
    var long = result.results[0].geometry.location.lng;
    console.log("The lat and long is " + lat + ", " + long);
    getWeather(lat, long);
}


//google lat and long
function addressLookup(city, state, address) {
    // Create the address.
    var addLocation = "";
    if (address.length != 0) {
        addLocation = address.trim();
    }
    else if (city.length != 0 && state != 0) {
        addLocation = city.trim() + ", " + state;
    }
    else {
        return;

    }


    //compiling the url for
    var googleTag = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addLocation + "&key=AIzaSyBZfkXozgEve7U6AezGLYljEVMRR-EFUuo";

    var request = {
        url: googleTag,
        success: addressLookup_Complete
    };

    $.ajax(request);
}



function lookupLocation_click() {
    var pcode = $("#address").val();
    addressLookup("", "", pcode);

}
//*******************Click event
$(function () {
    $("#lookupLocation").on("click", lookupLocation_click);

});


function getWeather(lat, long) {
    var darkSky = "https://api.darksky.net/forecast/ed7be92607845014ac1b22c8b2dcb545/" + lat + "," + long;
    var weather = {
        url: darkSky,
        dataType: "jsonp",
        success: weather_Complete
    };

    $.ajax(weather);
}



function weather_Complete(result) {
    console.log("It is currently " + result.timezone + ".");
var time= new Date(result.currently.time * 1000);
    console.log(time);
    console.log("It is currently " + result.currently.temperature + ".");
    console.log("It is currently " + result.hourly.summary + ".");
    console.log("It is currently " + result.daily.data[0].temperatureMin + ".");
    console.log("It is currently " + result.daily.data[0].precipProbability+ ".");
    console.log("It is currently " + result.daily.data[0].temperatureMax+ ".");
  var city= (result.timezone);
  var lrgTemp=(result.currently.temperature);
  var crntCond=(result.hourly.summary);
  var tempMin=(result.daily.data[0].temperatureMin);
  var rainChance=(result.daily.data[0].precipProbability);
  console.log(city);
  console.log(lrgTemp);



        
    }



    
    



