var today = moment().format("MM/DD/YYYY");
var forecastDate1 = moment().add(1, 'day').format("MM/DD/YYYY");
var forecastDate2 = moment().add(2, 'day').format("MM/DD/YYYY");
var forecastDate3 = moment().add(3, 'day').format("MM/DD/YYYY");
var forecastDate4 = moment().add(4, 'day').format("MM/DD/YYYY");
var forecastDate5 = moment().add(5, 'day').format("MM/DD/YYYY");
var cityLat = '';
var cityLon = '';
var cityList = '';
var city = cityList[cityList.length -1];


function displayCityWeather(event) {
    event.preventDefault();
    city = $('.cityInput').val().trim();
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=f82f3320f3be5227d4c1e1a02d86687b';

    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function (responseWeather) {
      var passLat = responseWeather.coord.lat;
      cityLon = responseWeather.coord.lon;
      cityLat = passLat;
      var iconCode = responseWeather.weather[0].icon;
      var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
      $('.cityName').replaceWith('<h3 class="cityName">' + responseWeather.name + ' (' + today + ') <img src="' + iconUrl + '"></h3>');
      $('.tempSpan').replaceWith('<span class="tempSpan">' + responseWeather.main.temp + ' °F</span>');
      $('.humidSpan').replaceWith('<span class="humidSpan">' + responseWeather.main.humidity + '%</span>');
      $('.windSpan').replaceWith('<span class="windSpan">' + responseWeather.wind.speed + ' MPH</span>');
      $('.cities').append('<button type="button" class="city btn btn-outline-secondary" id="' + responseWeather.name + '">' + responseWeather.name + '</button>');
      displayCityUv() 
      $('.cityInput').val('');
      var cityList = localStorage.getItem('citiesStored');
    cityList = cityList ? cityList.split(',') : [];
    cityList.push(city);
    localStorage.setItem('citiesStored', cityList.toString());
    
    });
    
   
};

function displaySavedWeather(event) {
  event.preventDefault();
  city = this.id;
  var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=f82f3320f3be5227d4c1e1a02d86687b';

  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function (responseWeather) {
    var passLat = responseWeather.coord.lat;
    cityLon = responseWeather.coord.lon;
    cityLat = passLat;
    var iconCode = responseWeather.weather[0].icon;
    var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
    $('.cityName').replaceWith('<h3 class="cityName">' + responseWeather.name + ' (' + today + ') <img src="' + iconUrl + '"></h3>');
    $('.tempSpan').replaceWith('<span class="tempSpan">' + responseWeather.main.temp + ' °F</span>');
    $('.humidSpan').replaceWith('<span class="humidSpan">' + responseWeather.main.humidity + '%</span>');
    $('.windSpan').replaceWith('<span class="windSpan">' + responseWeather.wind.speed + ' MPH</span>');
    displayCityUv() 
    $('.cityInput').val('')
  });
 
};

function displayCityUv() {
  var lat = cityLat;
  var lon = cityLon;
  var queryURL = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=f82f3320f3be5227d4c1e1a02d86687b';

  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function (responseUv) {
    var uvIndex = responseUv.value

    if (uvIndex < 3) {
    $('.uvSpan').replaceWith('<span class="uvSpan"><button type "button" class="uvBtn btn btn-success">' + uvIndex + '</button></span>');
    } else if (uvIndex < 6) {
    $('.uvSpan').replaceWith('<span class="uvSpan"><button type "button" class="uvBtn btn btn-warning">' + uvIndex + '</button></span>');
    } else if (uvIndex < 8) {
    $('.uvSpan').replaceWith('<span class="uvSpan"><button type "button" class="uvBtn btn btn-orange">' + uvIndex + '</button></span>');
    } else if (uvIndex < 11) {
    $('.uvSpan').replaceWith('<span class="uvSpan"><button type "button" class="uvBtn btn btn-danger">' + uvIndex + '</button></span>');
    } else if (uvIndex >= 11) {
    $('.uvSpan').replaceWith('<span class="uvSpan"><button type "button" class="uvBtn btn btn-extreme">' + uvIndex + '</button></span>');
    }
  });

  displayCityForecast()

};

function displayCityForecast() {
  var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=f82f3320f3be5227d4c1e1a02d86687b';
  $('.forecastBlocks').empty()
  $('.forecastHeader').replaceWith('<h3 class="forecastHeader">5-Day Forcast:</h3>');
  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function (responseForecast) {
    var iconCode = responseForecast.list[7].weather[0].icon;
    var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
  $('.forecastBlocks').append('<button type="button" class="forecast btn btn-primary"><h5>'
  + forecastDate1 + 
  '</h5><img src="'
   + iconUrl + 
   '"><p>Temp: '
   + responseForecast.list[7].main.temp + 
   ' °F</p><p>Humidity: '
   + responseForecast.list[7].main.humidity +
   '%</p></button>');
  
   var iconCode = responseForecast.list[15].weather[0].icon;
   var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
   $('.forecastBlocks').append('<button type="button" class="forecast btn btn-primary"><h5>'
   + forecastDate2 + 
   '</h5><img src="'
     + iconUrl + 
  '"><p>Temp: '
  + responseForecast.list[15].main.temp + 
  ' °F</p><p>Humidity: '
  + responseForecast.list[15].main.humidity +
  '%</p></button>');
 
  var iconCode = responseForecast.list[23].weather[0].icon;
  var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
  $('.forecastBlocks').append('<button type="button" class="forecast btn btn-primary"><h5>'
  + forecastDate3 + 
  '</h5><img src="' + iconUrl + 
 '"><p>Temp: '
 + responseForecast.list[23].main.temp + 
 ' °F</p><p>Humidity: '
 + responseForecast.list[23].main.humidity +
 '%</p></button>');

 var iconCode = responseForecast.list[31].weather[0].icon;
 var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
 $('.forecastBlocks').append('<button type="button" class="forecast btn btn-primary"><h5>'
 + forecastDate4 + 
 '</h5><img src="'+ iconUrl + 
'"><p>Temp: '
+ responseForecast.list[31].main.temp + 
' °F</p><p>Humidity: '
+ responseForecast.list[31].main.humidity +
'%</p></button>');

var iconCode = responseForecast.list[39].weather[0].icon;
var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
$('.forecastBlocks').append('<button type="button" class="forecast btn btn-primary"><h5>'
  + forecastDate5 + 
  '</h5><img src="'+ iconUrl + 
'"><p>Temp: '
+ responseForecast.list[39].main.temp + 
' °F</p><p>Humidity: '
+ responseForecast.list[39].main.humidity +
'%</p></button>');

  });
    

};

function renderCities() {

  if (localStorage.citiesStored == null) {
    return; 
  } else {
    cityList = localStorage.citiesStored.split(',');
  for (var i = 0; i < cityList.length; i++) {
    $('.cities').append('<button type="button" class="city btn btn-outline-secondary" id="' + cityList[i] + '">' + cityList[i] + '</button>');
  }
  city = cityList[cityList.length - 1];
  var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=f82f3320f3be5227d4c1e1a02d86687b';

    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function (responseWeather) {
      var passLat = responseWeather.coord.lat;
      cityLon = responseWeather.coord.lon;
      cityLat = passLat;
      var iconCode = responseWeather.weather[0].icon;
      var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
      $('.cityName').replaceWith('<h3 class="cityName">' + responseWeather.name + ' (' + today + ') <img src="' + iconUrl + '"></h3>');
      $('.tempSpan').replaceWith('<span class="tempSpan">' + responseWeather.main.temp + ' °F</span>');
      $('.humidSpan').replaceWith('<span class="humidSpan">' + responseWeather.main.humidity + '%</span>');
      $('.windSpan').replaceWith('<span class="windSpan">' + responseWeather.wind.speed + ' MPH</span>');
      displayCityUv() 
      $('.cityInput').val('');
});
  }
};

renderCities();
$(document).on('click', '.searchBtn', displayCityWeather);
$(document).on('click', '.city', displaySavedWeather);
$(document).on('click', '.clear', function() {
  localStorage.clear();
  $('.cities').empty();
  });