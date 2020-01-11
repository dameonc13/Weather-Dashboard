var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;



var APIKey = "166a433c57516f51dfab1f7edaed8413";

// var Location = "New York"



$("button").on("click", function(event) {

    event.preventDefault();

    var Location = $("#Region").val();
// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q="+Location+",America&units=imperial&appid=" + APIKey;

var nextUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+Location+",us&units=imperial&mode=json&appid=" + APIKey;

if ($("#history")[0].innerText == $("#Region").val()){
    
    
    return
   
}
else  {
var recentsearch = $("<div>").text(Location)
$("#history").prepend(recentsearch)

}
console.log($("#history"));
console.log($("#Region").val());

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    // Log the queryURL
  
    

    // Log the resulting object
 
   // <img src = "http://openweathermap.org>/img/wn/04d@2x.png" ></img> +
    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " " + today + " " + response.weather[0].icon);
    $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
    $(".humidity").text("Humidity: " + response.main.humidity+"%");
    $(".temp").text("Temperature (F) " + response.main.temp);

  
  });


  $.ajax({
    url: nextUrl,
    method: "GET"
  })



  .then(function(fiveday) {
    
    
  var day1temp = (fiveday.list[0].main.temp) ;
  var day1humid = (fiveday.list[0].main.humidity);
  var day1time =  (fiveday.list[0].dt_txt)
  var day2temp = (fiveday.list[1].main.temp) ;
  var day2humid = (fiveday.list[1].main.humidity);
  var day2time =  (fiveday.list[1].dt_txt)
  var day3temp = (fiveday.list[2].main.temp) ;
  var day3humid = (fiveday.list[2].main.humidity);
  var day3time =  (fiveday.list[2].dt_txt)
  var day4temp = (fiveday.list[3].main.temp) ;
  var day4humid = (fiveday.list[3].main.humidity);
  var day4time =  (fiveday.list[3].dt_txt)
  var day5temp = (fiveday.list[4].main.temp) ;
  var day5humid = (fiveday.list[4].main.humidity);
  var day5time =  (fiveday.list[4].dt_txt)
  $("h3").text("Five Day Forecast:")
  $(".day1").text( "Temp(F)" + day1temp + "\n Humidity: "  + day1humid );
  $(".day2").text("Temp(F)" + day2temp + "\n Humidity: " + day2humid);
  $(".day3").text("Temp(F)" + day3temp + "\n Humidity: "  + day3humid );
  $(".day4").text("Temp(F)" + day4temp + "\n Humidity: "  + day4humid);
  $(".day5").text("Temp(F)" + day5temp + "\n Humidity: "  + day5humid);
  

  })

})


