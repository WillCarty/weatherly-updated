var areaName;



//******Recieve Lat and Long
function addressLookup_Complete(result) {
    var lat = result.results[0].geometry.location.lat;
    var long = result.results[0].geometry.location.lng;
    areaName = result.results[0].formatted_address;

    getWeather(lat, long);
   
}


//google lat and long clean up loop
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


    //compiling the url for darkSky from google
    var googleTag = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addLocation + "&key=AIzaSyBZfkXozgEve7U6AezGLYljEVMRR-EFUuo";

    var request = {
        url: googleTag,
        success: addressLookup_Complete
    };

    $.ajax(request);
}


//******Textbox Var storage
function lookupLocation_click() {
    var pcode = $("#address").val();
    addressLookup("", "", pcode);

}
//*******************Click event
$(function () {
    $("#lookupLocation").on("click", lookupLocation_click);

});
//***************Call darkSky

function getWeather(lat, long) {
    var darkSky = "https://api.darksky.net/forecast/ed7be92607845014ac1b22c8b2dcb545/" + lat + "," + long;
    var weather = {
        url: darkSky,
        dataType: "jsonp",
        success: weather_Complete
    };

    $.ajax(weather);
}

//*************Recieve weather Data

function weather_Complete(result) {
    console.log("It is currently " + result.timezone + ".");
    var time = new Date(result.currently.time * 1000);
    var city = (result.timezone);
    var lrgTemp = (result.currently.temperature);
    var crntCond = (result.hourly.summary);
    var tempMin = (result.daily.data[0].temperatureMin);
    var rainChance = (result.daily.data[0].precipProbability);
    var maxTemp = (result.daily.data[0].temperatureMax);
    var minText = ("Min");
    var rainChancetext = ("Rain Chance");
    var maxText = ("Max");

    //*************Texting function deleted during final check.
    console.log(areaName);
    console.log(lrgTemp);
    console.log(time);
    console.log(crntCond);
    console.log(tempMin);
    console.log(rainChance);
    console.log(maxTemp);
    console.log(minText);
    console.log(rainChancetext);
    console.log(maxText);
    generateCard(city, time);

    //*******




    //****************Click Event #2 Generate Card
    $(function () {
        $("#lookupLocation").on("click", generateCard())
    });
}
//********** Generate New Card
function generateCard(city, time, lrgTemp, crntCond, tempMin, rainChance, maxTemp, minText, rainChancetext, maxText, area) {
    var weatherData = $("#newCard").html();

    weatherData = weatherData.replace("@@City@@", area);
    weatherData = weatherData.replace("@@date/time@@", time);
    weatherData = weatherData.replace("@@lrgDegree@@", lrgTemp);
    weatherData = weatherData.replace("@@cond@@", crntCond);
    weatherData = weatherData.replace("@@minTemp@@", tempMin);
    weatherData = weatherData.replace("@@rain%@@", rainChance);
    weatherData = weatherData.replace("@@maxTemp@@", maxTemp);
    weatherData = weatherData.replace("@@min@@", minText);
    weatherData = weatherData.replace("@@rainChance@@", rainChancetext);
    weatherData = weatherData.replace("@@Max@@", maxText);

    postGeneratedcard();

    return weatherData;


}



function postGeneratecard() {
    console.log("test");

};

                                    // The divs will automatically wrap because of Bootstrap knowing it's a col-md-3.
                                //  var html = generateCard(sampleData);
                                    //$("#cards").append(html);










