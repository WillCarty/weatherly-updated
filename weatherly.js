var areaName;



//******Recieve Lat and Long
function addressLookup_Complete(result) {
    var lat = result.results[0].geometry.location.lat;
    var long = result.results[0].geometry.location.lng;
    areaName = result.results[0].address_components[1].short_name + "," +
               result.results[0].address_components[2].short_name;
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

    var data = {
        time: new Date(result.currently.time * 1000),
        lrgTemp: Math.round((result.currently.temperature)) + "&deg",
        crntCond: (result.currently.summary),
        tempMin: Math.round((result.daily.data[0].temperatureMin)) + "&deg",
        rainChance: (result.daily.data[0].precipProbability),
        maxTemp: Math.round ((result.daily.data[0].temperatureMax)) + "&deg",
        minText: ("Min"),
        rainChancetext: ("Rain Chance"),
        maxText: ("Max"),
        icon:(result.currently.icon)
    };

    postCard(data);
    chooseCard(data);
}

//************Background Switch
function chooseCard(data){

var icon= (data.icon);
 switch(icon){
case "clear-day":  {$("#weatherCard").addClass("clearCard");
                     break
}                 
                     
case "clear-night": {$("#weatherCard").addClass("clearNightcard");
                     break
}
                     
case "rain":       {$("#weatherCard").addClass("rainCard"); 
                     break
}             
                     
case "snow":       {$("#weatherCard").addClass("snowCard");
                     break
}               
                    
case "sleet":      {$("#weatherCard").addClass("sleetCard");
                     break
}                     
                    
case "wind":       {$("#weatherCard").addClass("windCard");
                     break
}
case "fog":        {$("#weatherCard").addClass("fogCard");
                     break
}              

case "cloudy":      {$("#weatherCard").addClass("cloudyCard");
                     break
}

case "partly_cloudy_day":      {$("#weatherCard").addClass("partCloudyamCard");
                     break 
}
case "partly_cloudy_night":      {$("#weatherCard").addClass("partCloudypmCard");
                     break 
}

 }


console.log(icon);

}

//********** Generate New Card
function generateCard(data) {
    var weatherData = $("#newCard").html();

    weatherData = weatherData.replace("@@City@@", areaName);
    weatherData = weatherData.replace("@@date/time@@", data.time);
    weatherData = weatherData.replace("@@lrgDegree@@", data.lrgTemp);
    weatherData = weatherData.replace("@@cond@@", data.crntCond);
    weatherData = weatherData.replace("@@minTemp@@", data.tempMin);
    weatherData = weatherData.replace("@@rain%@@", data.rainChance + "%");
    weatherData = weatherData.replace("@@maxTemp@@", data.maxTemp);
    weatherData = weatherData.replace("@@Min@@", data.minText);
    weatherData = weatherData.replace("@@rainChance@@", data.rainChancetext);
    weatherData = weatherData.replace("@@Max@@", data.maxText);
    return weatherData;

}

function postCard(weatherData) {
    var html = generateCard(weatherData);
    $('#newCard2').append(html);



}
//***********Hide button
$(document).ready(function () {
    $(document).on('mouseenter', '.divbutton', function () {
        $(this).find(":button").show();
    }).on('mouseleave', '.divbutton', function () {
        $(this).find(":button").hide();
    });
});
(function(){ $('#cardRemove').on('click', removeCard()
     
             
)})
function removeCard(){
    $("#weatherCard").remove()
}