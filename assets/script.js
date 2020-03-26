var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
var clearWeather = $(".weatherDetails")

today = mm + '/' + dd + '/' + yyyy;




$(document).ready(function() {

// When button is clicked it provides weather detail about city 
$("button").on("click", function(event) {

    event.preventDefault();
var Location = $("#Region").val();

// Here we are building the URL we need to query the database
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var nextUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+Location+",us&units=imperial&mode=json&appid=" + APIKey;
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+Location+",America&units=imperial&appid=" + APIKey;

    fiveDayForecast(nextUrl)
    currentForecast(queryURL)
    searchHistory(Location)



  })


 

//Allow user to see previous searches 
function searchHistory(Location){
  
if ($(".recent").textContent == $("#Region").val()){  
    return 
}
// appends user search result to id #history on html page
else  {
  
var recentsearch = $("<div>").text(Location)
recentsearch.addClass("recent")
recentsearch.attr("data-name", $("#Region").val())
$("#history").prepend(recentsearch)



}
}


// this function return current weather info on user input
function currentForecast(queryURL){
  $(".city").empty()
// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "current"
  .then(function(current) {


  //appends data retrieved from the api to classes under the main class current Day 
    $(".city").html("<h1>" + current.name + " " +today+ "<img src='http://openweathermap.org/img/w/"+current.weather[0].icon+".png'>" + current.weather[0].description);
    $(".temp").html("Temperature (F): " + current.main.temp + "&deg;F");
    $(".humidity").html("Humidity: " + current.main.humidity+"%");
    $(".wind").html("Wind Speed: " + current.wind.speed + " MPH");
    
  

  
  });

}

// this function returns forecast for the next five days
function fiveDayForecast(nextUrl){
// Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: nextUrl,
    method: "GET"
  })


 // We store all of the retrieved data inside of an object called "fiveDay"
  .then(function(fiveDay) {
    
    

   //create variables for data retreived from api for five day forecast  
  var day1temp = (fiveDay.list[0].main.temp) ;
  var day1humid = (fiveDay.list[0].main.humidity);
  var day1time =  (fiveDay.list[0].dt_txt)
  var day2temp = (fiveDay.list[8].main.temp) ;
  var day2humid = (fiveDay.list[8].main.humidity);
  var day2time =  (fiveDay.list[8].dt_txt)
  var day3temp = (fiveDay.list[16].main.temp) ;
  var day3humid = (fiveDay.list[16].main.humidity);
  var day3time =  (fiveDay.list[16].dt_txt)
  var day4temp = (fiveDay.list[24].main.temp) ;
  var day4humid = (fiveDay.list[24].main.humidity);
  var day4time =  (fiveDay.list[24].dt_txt)
  var day5temp = (fiveDay.list[32].main.temp) ;
  var day5humid = (fiveDay.list[32].main.humidity);
  var day5time =  (fiveDay.list[32].dt_txt)

  //appends the data retrieved for five day to classes that fall under the main class fiveDay
  $("h3").text("Five Day Forecast:")
  $(".day1").html( day1time.substring(0,11) + "<img src='http://openweathermap.org/img/w/"+fiveDay.list[0].weather[0].icon+".png'>" +  " Temp(F): " + day1temp +"&deg;F" + "\n Humidity: "  + day1humid +"%" );
  $(".day2").html( day2time.substring(0,11) + "<img src='http://openweathermap.org/img/w/"+fiveDay.list[8].weather[0].icon+".png'>" +  " Temp(F): " + day2temp +"&deg;F"+ "\n Humidity: " + day2humid +"%");
  $(".day3").html(day3time.substring(0,11) + "<img src='http://openweathermap.org/img/w/"+fiveDay.list[16].weather[0].icon+".png'>" + " Temp(F): " + day3temp +"&deg;F"+ "\n Humidity: "  + day3humid +"%" );
  $(".day4").html(day4time.substring(0,11)+ "<img src='http://openweathermap.org/img/w/"+fiveDay.list[24].weather[0].icon+".png'>" +  " Temp(F): " + day4temp + "&deg;F" +"\n Humidity: "  + day4humid +"%");
  $(".day5").html(day5time.substring(0,11) + "<img src='http://openweathermap.org/img/w/"+fiveDay.list[32].weather[0].icon+".png'>" + " Temp(F): " + day5temp +"&deg;F" + "\n Humidity: "  + day5humid +"%");
 

  })

}
//console.log($(".recent"));

$(document).on("click", ".recent",reloadHistory)

function reloadHistory(){

 
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
  var pastSearch = $("#Region").val()
  pastSearch = $(this).attr("data-name")
  var nextUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+pastSearch+",us&units=imperial&mode=json&appid=" + APIKey;
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+pastSearch+",America&units=imperial&appid=" + APIKey;
  fiveDayForecast(nextUrl)
  currentForecast(queryURL)
  
  
  

}


}
)



