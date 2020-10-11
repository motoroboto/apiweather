var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
var cityLat = '';
var cityLon = '';


function displayCityWeather(event) {
    event.preventDefault();
    var city = $('.cityInput').val().trim();
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=f82f3320f3be5227d4c1e1a02d86687b';

    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function (responseWeather) {
      var passLat = responseWeather.coord.lat;
      cityLon = responseWeather.coord.lon;
      cityLat = passLat;
      console.log('weather data response:', responseWeather);
      var iconCode = responseWeather.weather[0].icon;
      var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
      $('.cityName').replaceWith('<h3 class="cityName">' + responseWeather.name + ' (' + date + ') <img src="' + iconUrl + '"></h3>');
      $('.tempSpan').replaceWith('<span class="tempSpan">' + responseWeather.main.temp + '°F</span>');
      $('.humidSpan').replaceWith('<span class="humidSpan">' + responseWeather.main.humidity + '%</span>');
      $('.windSpan').replaceWith('<span class="windSpan">' + responseWeather.wind.speed + ' MPH</span>');
      $('.cities').append('<button type="button" class="city btn btn-outline-secondary ' + responseWeather.name + '">' + responseWeather.name + '</button>');
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
    console.log('UV data response:', responseUv)
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
  var city = $('.cityInput').val().trim();
  var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=f82f3320f3be5227d4c1e1a02d86687b';


  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function (responseForecast) {
    console.log('Forecast Data response:', responseForecast)
  });
    


};

$(document).on('click', '.searchBtn', displayCityWeather);