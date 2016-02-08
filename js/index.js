var key = "bc76abe3cf7c317079238221d84d336b";
var weatherApiUrl = "";
var temp = 0;
var highTemp = 0;
var lowTemp = 0;
var shownTemp = 0;
var metric = true;
var rain = false;
city = "";
var mood = "";
var currentTime = moment().format('HH');
var timeOfDay = "";
var unit = "°C";
var tempString = "";
//h:mm:ss in case you wanted to go back to thing before.
//this function returns whether it's morning, arvo, or evening so you can always return this based on whatever your local user's time is.
function checkTimeOfDay(num) {
  if (num < 12) {
    timeOfDay = "Morning";
    return timeOfDay;
  }
  if ((num >= 12) && (num <= 17)) {
    timeOfDay = "Afternoon";
    return timeOfDay;

  } else {
    timeOfDay = "Evening";
    return timeOfDay;
  }
}


$(document).ready(function() {

  checkTimeOfDay(currentTime);
  $("#time").html("Good " + timeOfDay + "!");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      // the above is figuring out lat and long positions
      weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=" + key;

      $.getJSON(weatherApiUrl, function(json) {
        //logging into API and getting intel.
        shownTemp = convertTemp(json.main.temp).toFixed(1);
        highTemp = convertTemp(json.main.temp_max).toFixed(1);
        lowTemp = convertTemp(json.main.temp_min).toFixed(1);
        country = json.sys.country;
        city = json.name;
        mood = json.weather[0].main;
        console.log(mood);

        if (mood == "Rain") {
          $("#rain").html("Also, it's going to rain today, so if I were you, I'd bring an umbrella.");
        }

        ///////////////////
        $('#fButton').click(function() {
    metric = false;
    shownTemp = convertTemp(json.main.temp).toFixed(1);
    highTemp = convertTemp(json.main.temp_max).toFixed(1);
    lowTemp = convertTemp(json.main.temp_min).toFixed(1);
          $('#temp').html("It's currently  " + shownTemp + " " + unit + " out there in " + city + ", but it might reach lows of " + lowTemp + " " + unit + ", or highs of " + highTemp + " " + unit + ".");
        });

//this and the function above both basically reconvert all the values based on metric changing. so happy it works :') (even tho it's probably made up 100% of spaghetti)
        $('#cButton').click(function() {
    metric = true;
    shownTemp = convertTemp(json.main.temp).toFixed(1);
    highTemp = convertTemp(json.main.temp_max).toFixed(1);
    lowTemp = convertTemp(json.main.temp_min).toFixed(1);
          $('#temp').html("It's currently  " + shownTemp + " " + unit + " out there in " + city + ", but it might reach lows of " + lowTemp + " " + unit + ", or highs of " + highTemp + " " + unit + ".");
        });

        if ((country == "US") || (country == "CR") || (country == "MM")) {
          metric = false;
        }

        //had to move this down here as metric only gets changed deep in the belly of the code.
        function convertTemp(num) {
          if (metric == true) {
            num = num - 273.15;
            unit = "°C"
            return num;
          }
          if (metric == false) {
            num = num * 9 / 5 - 459.67;
            unit = "°F";
            return num;
          }
        }

        tempString = ("It's currently  " + shownTemp + " " + unit + " out there in " + city + ", but it might reach lows of " + lowTemp + " " + unit + ", or highs of " + highTemp + " " + unit + ".");
 $("#temp").html(tempString);

        function howColdIsIt() {
          var lowTempMetric =((json.main.temp_min) - 273.15).toFixed(1);
          if (lowTempMetric <= 0) {
$("#advice").html("It's freezing today! Put on your warmest clothes.");
$("#img1").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/beanie.png");         
$("#p1").html("Beanie");            
$("#img2").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/gloves.png");         
$("#p2").html("Gloves");   
$("#img3").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/jacket.png");         
$("#p3").html("Jacket");  
$("#suggestion").html("Maybe you should think about wearing these.");
          }

          if ((lowTempMetric > 0) && (lowTempMetric < 10)) {
            $("#advice").html("It's pretty cold today. Probably grab your favourite scarf, just in case.");
 $("#img1").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/buttonShirt.png");         
$("#p1").html("Button-up Shirt");            
$("#img2").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/gloves.png");         
$("#p2").html("Gloves");   
$("#img3").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/jacket.png");         
$("#p3").html("Jacket");
$("#suggestion").html("Maybe you should think about wearing these.");
          }

          if ((lowTempMetric >= 10) && (lowTempMetric < 20)) {
            $("#advice").html("It's a bit chilly. If you normally get really cold, you should bring a jumper or something else warm. ");
$("#img1").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/dress.png");         
$("#p1").html("Dress");            
$("#img2").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/tshirt.png");         
$("#p2").html("T-shirt");   
$("#img3").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/jacket.png");         
$("#p3").html("Jacket");
$("#suggestion").html("Maybe you should think about wearing these.");
          }

          if ((lowTempMetric >= 20) && (lowTempMetric < 30)) {
            $("#advice").html("It's going to be pretty warm today! Shorts/skirt weather for sure. Never forget the old saying, \"Sun's out, guns out\"." );
$("#img1").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/bikini.png");         
$("#p1").html("Bikini");            
$("#img2").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/shorts.png");         
$("#p2").html("Shorts");   
$("#img3").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/suncream.png");         
$("#p3").html("Suncream");
$("#suggestion").html("Maybe you should think about wearing these.");
          }

          if ((lowTempMetric >= 30) && (lowTempMetric < 40)) {
            $("#advice").html("It's shaping up to be a scorcher. Find a pool, and some suncream. And maybe your favourite drink as well.");
$("#img1").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/bikini.png");         
$("#p1").html("Bikini");            
$("#img2").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/boardshorts.png");         
$("#p2").html("Boardshorts");   
$("#img3").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/suncream.png");         
$("#p3").html("Sun Cream");
$("#suggestion").html("Maybe you should think about wearing these.");
          }
          
if (lowTempMetric >= 40) {
$("#advice").html("You're probably on the surface of the sun. Hope you've got some solar shielding.");
  $("#img1").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/bikini.png");         
$("#p1").html("Bikini");            
$("#img2").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/boardshorts.png");         
$("#p2").html("Boardshorts");   
$("#img3").attr("src", "http://www.scottgangemi.com/jjabrams/iconsWeather/suncream.png");         
$("#p3").html("Sun Cream");
$("#suggestion").html("Maybe you should think about wearing these.");
          
          }

        }
        howColdIsIt();

      });
      //if in doubt, you've ALWAYS gotta put a http:// in front. duh.
    })
  }
});
//the lesson is, ALWAYS INDENT YOUR CODE and check to make sure you've closed everything properly.